#!/usr/bin/env python3
r"""
acg_ops_kanban_verb.py — P1.3 of the self-running-AiCIV spine (sovereignty-spine #4).

WIRES KANBAN STATUS-VERBS -> TGIM EMIT. ONE WRITE-PATH, TWO RECORDS.

THE PROBLEM IT KILLS (the desync class):
  The ACG ops-board (data/acg-ops-board/kanban.db) is the MUTABLE work-STATE
  (a row's current owner/status). TGIM event_history is the APPEND-ONLY
  coordination-AUDIT (the immutable log of every transition). Today only
  set_owner_vp writes the STATE (P1.1), and NOTHING emits the matching TGIM
  audit event. So the two records can DESYNC silently: a status changes in the
  kanban and the audit log never hears about it (or vice-versa). A desynced
  audit log is WORSE than none — it lies about what happened.

THE FIX (the invariant this module enforces):
  EVERY kanban status/ownership verb routes through ONE function, run_verb(),
  which does BOTH writes as a single logical transition:
    (1) the kanban STATE write (column + the local append-only task_events row)
        via the canonical hermes_cli.kanban_db verbs / acg_ops_set_owner verb
        — NEVER a raw UPDATE (so the P1.1 health sweep stays meaningful).
    (2) the TGIM AUDIT emit (canonical v2 body shape) via the DURABLE outbox
        (tgim_outbox_durable.emit) — a failed POST becomes a DURABLE QUEUED
        ROW, never a lost event (the lossy-POST kill from spine #3).

  CORRELATION: the TGIM event's task_id == the kanban row id, and agent_id ==
  the actor. The two records JOIN cleanly on task_id (T1.3.2).

DESYNC FAILS LOUD (the load-bearing property — T1.3.3 + the desync test):
  - If the kanban STATE write succeeds but the TGIM emit does NOT land, the
    verb DOES NOT report a clean success. It returns synced=False AND records a
    local `tgim_emit_pending` task_events row carrying the outbox idem-key, so
    the divergence is VISIBLE on disk (a stuck-but-visible row, never silent).
  - The durable outbox keeps the event QUEUED (status 'ready') so replay() will
    drain it when TGIM recovers — the half-write self-heals, it is never dropped.
  - A DELIBERATE desync attempt (suppress_tgim=True — "write STATE, skip AUDIT")
    is the adversarial path: it MUST leave a detectable divergence that
    reconcile() catches. It does: the kanban transition has a task_events STATE
    row but NO landed TGIM event -> reconcile() reports it UNMATCHED (LOUD).
  - reconcile() is the proof read: it walks every kanban status/owner transition
    (the local task_events log) and every TGIM event for the board, and reports
    any transition with no matching audit event OR any audit event with no
    matching state. 0 unmatched on both sides == zero desync (T1.3.5).

IDEMPOTENCY / NO DOUBLE-EMIT (T1.3.4):
  The TGIM task_id for a transition is deterministic:
    "acgops_<row_id>_<verb>_<state_seq>"
  where state_seq is the local task_events.id of the STATE row just written.
  Because each STATE write gets a fresh monotonic task_events.id, a re-run of
  the SAME logical verb produces a NEW state_seq only if the STATE actually
  changed; a no-op verb (e.g. completing an already-done row) writes no new
  STATE row and re-emits the SAME task_id, which the durable outbox dedups
  (stable idempotency_key per (task_id,event_type)) AND TGIM dedups server-side
  (send_dedup). Exactly ONE audit event per logical transition.

VERB -> TGIM event_type MAP (LIVE-SERVER-ACCEPTED enum only — walk-probed 2026-06-21):
  set_owner -> task_assigned  (payload.kind=owner_vp_set — set_owner IS an assignment: it
                               binds the row to an owner_vp; assigned_agent_id carries the
                               owner. NO audit loss — the ownership fact is fully in the stream.)
  claim     -> task_assigned
  complete  -> task_completed
  block     -> task_failed    (payload.status=blocked, payload.reason=<why> — block is a
                               STUCK-row coordination fact others MUST see; task_failed is the
                               accepted carrier; the BLOCKED semantic lives in payload.status,
                               losing zero audit signal. task_blocked AND task_updated both 400.)
  unblock   -> task_assigned  (payload.status=ready, payload.kind=unblock — unblock returns a
                               row to live/assigned; task_assigned re-asserts "this row is alive
                               again" with the recovery semantic in payload. Symmetric to block.)

  THE LIVE ACCEPTED ENUM (curl-probed against tgim-api.ai-civ.com 2026-06-21, NOT the doctrine):
    task_created | task_completed | task_assigned | task_failed
  task_updated 400s ("Invalid event_type") — same family as task_blocked. The doctrine
  (doctrine_tgim_v2_body_shape_canonical.md) was STALE (listed task_updated, omitted
  task_failed); reconciled to the live server enum this run. reconcile() is event_type-AGNOSTIC
  (it joins on the deterministic task_id, never the type), so this re-map keeps it GREEN.

REVERSIBLE / ADDITIVE:
  - This module is the SANCTIONED verb wrapper. It REUSES acg_ops_set_owner
    (P1.1) for ownership + the canonical kanban_db verbs for status + the
    durable outbox (spine #3) for the emit. It re-implements none of them.
  - Rollback = stop calling run_verb(); restore the .bak'd kanban.db; the local
    task_events / TGIM outbox rows are append-only audit and harmless if unread.

OWNER: tgim-lead (TGIM emit seam) co-with mind-lead (kanban verb seam).
Born 2026-06-21 — BUILD-DOC Step P1.3.
"""
from __future__ import annotations

import argparse
import json
import sqlite3
import sys
import time
from pathlib import Path
from typing import Any, Dict, Optional

import os as _os  # fork-resolution: honor $AICIV_ROOT (STAND-IT-UP §0); ACG path is the origin fallback
ROOT = Path(_os.environ.get("AICIV_ROOT", "/home/corey/projects/AI-CIV/ACG"))
BOARD_DB = ROOT / "data/acg-ops-board/kanban.db"
SPINE_DIR = ROOT / "tools/sovereignty-spine"
HERMES_LIB = ROOT / "projects/hermes-student-001/provisioning/hermes-agent"

# Verbs we wire, and their LIVE-SERVER-ACCEPTED TGIM event_type (walk-probed
# 2026-06-21: accepted = task_created|task_completed|task_assigned|task_failed;
# task_updated 400s). The non-obvious mappings carry their semantic in payload
# (set_owner/unblock -> task_assigned; block -> task_failed + payload.status).
VERB_TO_EVENT = {
    "set_owner": "task_assigned",   # ownership bind == an assignment (assigned_agent_id)
    "claim": "task_assigned",
    "complete": "task_completed",
    "block": "task_failed",         # stuck-row fact; BLOCKED semantic in payload.status
    "unblock": "task_assigned",     # row returns to live; READY semantic in payload.status
}

# Per-verb payload.status semantic, so the accepted carrier type never loses the
# kanban-state signal (block/unblock especially — their state lives HERE, not in
# the event_type). reconcile() joins on task_id (type-agnostic), so this is pure
# audit-fidelity, no reconcile impact.
VERB_TO_PAYLOAD_STATUS = {
    "set_owner": "assigned",
    "claim": "claimed",
    "complete": "completed",
    "block": "blocked",
    "unblock": "ready",
}

# The local task_events.kind written by each STATE write (the join key on the
# kanban side). set_owner reuses P1.1's 'owner_vp_set'; the rest get a
# 'status_<verb>' kind so reconcile() can find them.
VERB_TO_STATE_KIND = {
    "set_owner": "owner_vp_set",
    "claim": "status_claim",
    "complete": "status_complete",
    "block": "status_block",
    "unblock": "status_unblock",
}

SOURCE_CIV = "acgee"


def _load_kanban_db():
    p = str(HERMES_LIB)
    if p not in sys.path:
        sys.path.insert(0, p)
    from hermes_cli import kanban_db  # noqa: E402
    return kanban_db


def _load_set_owner():
    p = str(SPINE_DIR)
    if p not in sys.path:
        sys.path.insert(0, p)
    import acg_ops_set_owner  # noqa: E402
    return acg_ops_set_owner


def _load_outbox():
    p = str(SPINE_DIR)
    if p not in sys.path:
        sys.path.insert(0, p)
    import tgim_outbox_durable  # noqa: E402
    return tgim_outbox_durable


def _connect():
    if not BOARD_DB.exists():
        sys.exit(f"FAIL-LOUD: board db not found: {BOARD_DB}")
    conn = sqlite3.connect(str(BOARD_DB))
    conn.row_factory = sqlite3.Row
    return conn


def _latest_state_seq(conn, task_id: str, kind: str) -> Optional[int]:
    """The task_events.id of the most-recent STATE row of this kind for this task.
    This is the deterministic, monotonic transition sequence number that makes
    the TGIM task_id unique-per-transition (idempotency)."""
    r = conn.execute(
        "SELECT id FROM task_events WHERE task_id=? AND kind=? "
        "ORDER BY id DESC LIMIT 1", (task_id, kind),
    ).fetchone()
    return r["id"] if r else None


def _record_local_event(conn, task_id: str, kind: str, payload: Dict[str, Any]) -> int:
    """Append a local task_events STATE row (mirrors P1.1's pattern for status
    verbs that kanban_db doesn't already event). Returns the new event id."""
    cur = conn.execute(
        "INSERT INTO task_events (task_id, run_id, kind, payload, created_at) "
        "VALUES (?, NULL, ?, ?, ?)",
        (task_id, kind, json.dumps(payload, ensure_ascii=False), int(time.time())),
    )
    return cur.lastrowid


def _tgim_task_id(row_id: str, verb: str, state_seq: int) -> str:
    """Deterministic per-transition TGIM task_id (idempotency / dedup key)."""
    return f"acgops_{row_id}_{verb}_{state_seq}"


def _kanban_row_from_tgim_task_id(ttid: str) -> Optional[str]:
    """Inverse of _tgim_task_id: parse the kanban row id back out.
    Format: acgops_<row_id>_<verb>_<state_seq>. The verb is one of VERB_TO_EVENT
    (no underscores) and state_seq is a trailing integer, so we strip the known
    suffix and the acgops_ prefix; what remains is the row id (which may itself
    contain underscores, e.g. 't_9e0c852a')."""
    if not ttid.startswith("acgops_"):
        return None
    core = ttid[len("acgops_"):]
    parts = core.rsplit("_", 2)  # [row_id, verb, state_seq]
    if len(parts) == 3 and parts[1] in VERB_TO_EVENT and parts[2].isdigit():
        return parts[0]
    return None


def run_verb(
    verb: str,
    task_id: str,
    *,
    actor: str = "primary",
    owner_vp: Optional[str] = None,
    reason: Optional[str] = None,
    suppress_tgim: bool = False,
    priority: str = "P-NORMAL",
) -> Dict[str, Any]:
    """THE single sanctioned write-path: do the kanban STATE write AND the TGIM
    AUDIT emit as ONE logical transition. Returns a result dict.

    result = {
      "ok": bool,            # the kanban STATE write succeeded
      "synced": bool,        # the matching TGIM audit event LANDED (or was a dedup no-op)
      "verb": verb, "task_id": task_id, "actor": actor,
      "event_type": <v2>, "tgim_task_id": <deterministic>,
      "state_seq": <task_events.id>, "tgim": <outbox result>,
      "loud": <None | a human-readable LOUD message on desync>,
    }

    DESYNC IS LOUD: if the STATE write lands but the TGIM emit does not (TGIM
    down, or suppress_tgim=True), ok=True but synced=False, loud!=None, and a
    local `tgim_emit_pending` row is written so the divergence is VISIBLE.
    """
    if verb not in VERB_TO_EVENT:
        sys.exit(f"FAIL-LOUD: unknown verb '{verb}' (one of {sorted(VERB_TO_EVENT)})")

    kanban_db = _load_kanban_db()
    conn = _connect()
    result: Dict[str, Any] = {
        "ok": False, "synced": False, "verb": verb, "task_id": task_id,
        "actor": actor, "event_type": VERB_TO_EVENT[verb],
        "tgim_task_id": None, "state_seq": None, "tgim": None, "loud": None,
    }
    try:
        # --- (1) THE KANBAN STATE WRITE (verb-only, never raw UPDATE) --------
        state_kind = VERB_TO_STATE_KIND[verb]
        if verb == "set_owner":
            if not owner_vp:
                sys.exit("FAIL-LOUD: set_owner requires --owner-vp")
            set_owner_mod = _load_set_owner()
            # P1.1's verb writes the column AND the owner_vp_set task_events row.
            # NOTE: P1.1's set_owner_vp tags source=<actor>, NOT wired — so the
            # one-time backfill (source=backfill) is correctly EXCLUDED from the
            # wired-era reconcile. We write our OWN wired anchor row so this
            # transition (emitted THROUGH run_verb) is policed.
            set_owner_mod.set_owner_vp(conn, task_id, owner_vp, source=actor,
                                       commit=False)
            payload_state = {"owner_vp": owner_vp, "actor": actor, "wired": True}
            state_seq = _record_local_event(conn, task_id, state_kind, payload_state)
            conn.commit()
        else:
            # status verbs through the canonical kanban_db verbs.
            if verb == "claim":
                kanban_db.claim_task(conn, task_id, claimer=actor)
            elif verb == "complete":
                kanban_db.complete_task(conn, task_id,
                                        summary=f"{actor}: complete via P1.3 verb")
            elif verb == "block":
                kanban_db.block_task(conn, task_id, reason=reason or f"{actor}: blocked")
            elif verb == "unblock":
                kanban_db.unblock_task(conn, task_id)
            payload_state = {"actor": actor, "reason": reason, "wired": True}
            # kanban_db verbs write their OWN events; we add our join-key STATE row
            # so reconcile() has a stable per-verb anchor regardless of upstream kind.
            state_seq = _record_local_event(conn, task_id, state_kind, payload_state)
            conn.commit()

        if state_seq is None:
            # No STATE row written => the verb was a no-op (e.g. nothing changed).
            # Still emit (idempotent) but mark it.
            result["loud"] = "no STATE row written (no-op verb?) — emit will dedup"
            state_seq = _latest_state_seq(conn, task_id, state_kind) or 0
        result["ok"] = True
        result["state_seq"] = state_seq
        tgim_task_id = _tgim_task_id(task_id, verb, state_seq)
        result["tgim_task_id"] = tgim_task_id

        # --- (2) THE TGIM AUDIT EMIT (canonical v2 body, durable) -----------
        event = {
            "event_type": VERB_TO_EVENT[verb],
            "source_civ": SOURCE_CIV,
            "agent_id": actor,
            "task_id": tgim_task_id,
            "requester": actor,
            "requester_type": "lead",
            "assigned_agent_id": owner_vp or actor,
            "priority": priority,
            "payload": {
                "title": f"acg-ops {verb}: {task_id}",
                "description": f"kanban {verb} on row {task_id} by {actor}",
                "scope": "acg-ops-board",
                "kanban_row_id": task_id,      # the JOIN key back to STATE (T1.3.2)
                "verb": verb,
                # The kanban-state semantic the accepted carrier type cannot itself
                # express (block->task_failed, set_owner/unblock->task_assigned). The
                # AUDIT READER recovers the true transition from payload.status, never
                # from event_type. Zero audit signal lost in the enum re-map.
                "status": VERB_TO_PAYLOAD_STATUS.get(verb),
                "kind": "owner_vp_set" if verb == "set_owner" else verb,
                "state_seq": state_seq,
                "owner_vp": owner_vp,
                "reason": reason,
            },
        }

        if suppress_tgim:
            # THE DELIBERATE DESYNC PATH. State written, audit deliberately
            # skipped. MUST leave a detectable divergence (the adversarial test).
            _record_local_event(conn, task_id, "tgim_emit_pending",
                                {"tgim_task_id": tgim_task_id, "verb": verb,
                                 "reason": "suppress_tgim=True (deliberate desync)"})
            conn.commit()
            result["synced"] = False
            result["loud"] = (
                f"DESYNC (deliberate): STATE written, TGIM AUDIT suppressed. "
                f"tgim_task_id={tgim_task_id} is UNMATCHED — reconcile() will catch it."
            )
            result["tgim"] = {"ok": False, "suppressed": True}
            return result

        outbox = _load_outbox()
        emit_res = outbox.emit(event)
        result["tgim"] = emit_res
        if emit_res.get("ok"):
            result["synced"] = True
        else:
            # TGIM down / POST failed: the event is DURABLY QUEUED (never lost),
            # but the records are momentarily desynced -> LOUD, not silent.
            _record_local_event(conn, task_id, "tgim_emit_pending",
                                {"tgim_task_id": tgim_task_id, "verb": verb,
                                 "outbox_status": emit_res.get("http_status"),
                                 "queued": emit_res.get("queued"),
                                 "error": str(emit_res.get("error"))[:200]})
            conn.commit()
            result["synced"] = False
            result["loud"] = (
                f"DESYNC (transient): STATE written, TGIM emit did NOT land "
                f"(queued={emit_res.get('queued')}). tgim_task_id={tgim_task_id} "
                f"is QUEUED for replay — run `tgim_outbox_durable.py replay`."
            )
        return result
    finally:
        conn.close()


def reconcile() -> Dict[str, Any]:
    """THE proof read (T1.3.5): zero desync across all transitions.

    Walks every kanban STATE transition (the local task_events rows of a wired
    kind) and checks each has a matching LANDED TGIM event in the durable outbox
    (status 'done'). Reports:
      - unmatched_state:  STATE transitions with NO landed audit event (the
                          desync the wiring exists to prevent — incl. the
                          deliberate suppress_tgim path + any stuck queued row).
      - pending:          STATE transitions whose audit event is QUEUED (durable,
                          not lost — will replay). Listed separately from a true
                          unmatched (a queued row is recoverable; a suppressed
                          one needs a re-emit).
    green == 0 unmatched (queued/pending is recoverable, not a failure).
    """
    conn = _connect()
    try:
        wired_kinds = tuple(VERB_TO_STATE_KIND.values())
        state_rows = conn.execute(
            "SELECT id, task_id, kind, payload FROM task_events "
            "WHERE kind IN ({})".format(",".join("?" * len(wired_kinds))),
            wired_kinds,
        ).fetchall()

        # Reconstruct the deterministic tgim_task_id each STATE row SHOULD have.
        # SCOPE: only WIRED-ERA transitions (payload.wired==True) — those emitted
        # THROUGH run_verb. The P1.1 one-time backfill (source=backfill, no wired
        # flag) PRE-DATES this audit wiring and is NOT a coordination transition;
        # it is reported separately as `legacy_unwired` (honesty), never a desync
        # failure. reconcile polices the invariant GOING FORWARD.
        kind_to_verb = {v: k for k, v in VERB_TO_STATE_KIND.items()}
        expected = {}  # tgim_task_id -> {task_id, verb, state_seq}
        legacy_unwired = 0
        for r in state_rows:
            verb = kind_to_verb.get(r["kind"])
            if not verb:
                continue
            try:
                is_wired = bool(json.loads(r["payload"]).get("wired"))
            except Exception:
                is_wired = False
            if not is_wired:
                legacy_unwired += 1
                continue
            ttid = _tgim_task_id(r["task_id"], verb, r["id"])
            expected[ttid] = {"kanban_row_id": r["task_id"], "verb": verb,
                              "state_seq": r["id"]}

        # Which were deliberately suppressed (have a tgim_emit_pending marker).
        pending_markers = set()
        for r in conn.execute(
            "SELECT payload FROM task_events WHERE kind='tgim_emit_pending'"):
            try:
                pending_markers.add(json.loads(r["payload"]).get("tgim_task_id"))
            except Exception:
                pass

        # Which LANDED in TGIM (durable outbox status 'done' carries the event).
        landed = _outbox_landed_task_ids()
        queued = _outbox_queued_task_ids()

        unmatched_state = []
        pending = []
        for ttid, info in expected.items():
            if ttid in landed:
                continue
            entry = {"tgim_task_id": ttid, **info}
            if ttid in queued:
                pending.append({**entry, "state": "queued (durable, will replay)"})
            elif ttid in pending_markers:
                unmatched_state.append({**entry, "state": "suppressed (deliberate desync)"})
            else:
                unmatched_state.append({**entry, "state": "no audit event at all"})

        # Audit events that have no matching STATE transition (phantom events).
        # A landed audit event is an ORPHAN only if its kanban row STILL EXISTS
        # but has no wired STATE row for it (a true phantom — audit lying about a
        # live row). An audit event for a row that was legitimately DELETED
        # (e.g. a completed+archived fixture) is NOT an orphan — the row is gone,
        # the append-only audit correctly outlives it (audit is immutable history).
        live_rows = {r["id"] for r in conn.execute("SELECT id FROM tasks")}
        orphan_audit = []
        for tid in landed:
            if not tid.startswith("acgops_") or tid in expected:
                continue
            # parse the kanban_row_id out of the deterministic id: acgops_<rowid>_<verb>_<seq>
            row_id = _kanban_row_from_tgim_task_id(tid)
            if row_id in live_rows:
                orphan_audit.append(tid)  # live row, no wired state = phantom (LOUD)

        report = {
            "cmd": "reconcile",
            "wired_state_transitions": len(expected),
            "legacy_unwired_excluded": legacy_unwired,  # P1.1 backfill — not a desync
            "landed_audit_events": len([t for t in landed if t.startswith("acgops_")]),
            "unmatched_state": unmatched_state,
            "pending_queued": pending,
            "orphan_audit": orphan_audit,
            "green": (len(unmatched_state) == 0 and len(orphan_audit) == 0),
        }
        if not report["green"]:
            print(json.dumps(report, indent=2))
            sys.exit("RECONCILE FAIL-LOUD: kanban<->TGIM desync detected")
        return report
    finally:
        conn.close()


def _outbox_landed_task_ids() -> set:
    """task_ids that LANDED at TGIM (durable outbox rows marked 'done')."""
    outbox_db = ROOT / "data" / "tgim-outbox" / "outbox.db"
    if not outbox_db.exists():
        return set()
    conn = sqlite3.connect(str(outbox_db))
    try:
        out = set()
        for r in conn.execute(
                "SELECT body FROM tasks WHERE status='done'"):
            tid = _extract_task_id_from_outbox_body(r[0])
            if tid:
                out.add(tid)
        return out
    finally:
        conn.close()


def _outbox_queued_task_ids() -> set:
    """task_ids still QUEUED in the durable outbox ('ready'/'blocked')."""
    outbox_db = ROOT / "data" / "tgim-outbox" / "outbox.db"
    if not outbox_db.exists():
        return set()
    conn = sqlite3.connect(str(outbox_db))
    try:
        out = set()
        for r in conn.execute(
                "SELECT body FROM tasks WHERE status IN ('ready','blocked')"):
            tid = _extract_task_id_from_outbox_body(r[0])
            if tid:
                out.add(tid)
        return out
    finally:
        conn.close()


def _extract_task_id_from_outbox_body(body: str) -> Optional[str]:
    """The durable outbox body carries `task_id=<id>` then the EVENT-JSON."""
    for line in (body or "").splitlines():
        if line.startswith("task_id="):
            return line.split("=", 1)[1].strip()
    return None


def main() -> int:
    ap = argparse.ArgumentParser(
        description="ACG ops-board kanban verbs -> TGIM emit (P1.3, one write-path two records)")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_verb = sub.add_parser("verb", help="run a status/ownership verb (writes STATE + emits AUDIT)")
    p_verb.add_argument("verb", choices=sorted(VERB_TO_EVENT))
    p_verb.add_argument("task_id")
    p_verb.add_argument("--actor", default="primary")
    p_verb.add_argument("--owner-vp", default=None)
    p_verb.add_argument("--reason", default=None)
    p_verb.add_argument("--suppress-tgim", action="store_true",
                        help="DELIBERATE DESYNC: write STATE, skip AUDIT (adversarial test)")
    p_verb.add_argument("--priority", default="P-NORMAL")

    sub.add_parser("reconcile", help="prove zero desync across all transitions")

    args = ap.parse_args()
    if args.cmd == "verb":
        res = run_verb(args.verb, args.task_id, actor=args.actor,
                       owner_vp=args.owner_vp, reason=args.reason,
                       suppress_tgim=args.suppress_tgim, priority=args.priority)
        print(json.dumps(res, indent=2))
        # exit non-zero on desync so a caller/CI sees the LOUD signal.
        return 0 if (res["ok"] and res["synced"]) else 3
    if args.cmd == "reconcile":
        print(json.dumps(reconcile(), indent=2))
        return 0
    ap.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
