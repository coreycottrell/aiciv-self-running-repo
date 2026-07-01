#!/usr/bin/env python3
r"""
run_p1_3_tests.py — the 5 P1.3 behavioral tests (tests/phase-1-tests.md §P1.3).

REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. Hits the actual verb wrapper
(acg_ops_kanban_verb.run_verb) against REAL board rows (test fixtures created +
deleted by this harness — row count returns to its starting value), the REAL
durable TGIM outbox, and the LIVE TGIM endpoint where reachable. The TGIM-down
test (T1.3.3) forces the transport to fail deterministically (no network
dependence) to prove the fail-loud/queue path.

  T1.3.1  a status verb writes BOTH records (kanban STATE + TGIM AUDIT)
  T1.3.2  task_id + actor correlate across both records (no orphans)
  T1.3.3  TGIM-down does NOT silently half-write (fail-loud + durable queue)
  T1.3.4  no double-emit on a re-run verb (send_dedup / idempotent)
  T1.3.5  reconciliation proves zero desync across N>=10 transitions
           + the DELIBERATE-DESYNC adversarial sub-test (must FAIL LOUD)

Run:  python3 projects/self-running-aiciv/tests/run_p1_3_tests.py
Exit: 0 iff all 5 PASS.
"""
import json
import sqlite3
import sys
import time
from pathlib import Path

ROOT = Path("$AICIV_ROOT")
SPINE = ROOT / "tools/sovereignty-spine"
BOARD_DB = ROOT / "data/acg-ops-board/kanban.db"
OUTBOX_DB = ROOT / "data/tgim-outbox/outbox.db"
HERMES_LIB = ROOT / "projects/hermes-student-001/provisioning/hermes-agent"

sys.path.insert(0, str(SPINE))
sys.path.insert(0, str(HERMES_LIB))
sys.path.insert(0, str(ROOT / "tools"))

import acg_ops_kanban_verb as verbmod  # noqa: E402
from hermes_cli import kanban_db  # noqa: E402

RESULTS = []


def _board_conn():
    c = sqlite3.connect(str(BOARD_DB))
    c.row_factory = sqlite3.Row
    return c


def _row(task_id):
    c = _board_conn()
    try:
        r = c.execute("SELECT id,status,owner_vp FROM tasks WHERE id=?", (task_id,)).fetchone()
        return dict(r) if r else None
    finally:
        c.close()


def _local_events(task_id, kind=None):
    c = _board_conn()
    try:
        if kind:
            rows = c.execute("SELECT id,kind,payload FROM task_events WHERE task_id=? AND kind=? ORDER BY id",
                             (task_id, kind)).fetchall()
        else:
            rows = c.execute("SELECT id,kind,payload FROM task_events WHERE task_id=? ORDER BY id",
                             (task_id,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        c.close()


def _outbox_row_for(tgim_task_id):
    """Find the durable outbox row whose body carries this tgim task_id."""
    if not OUTBOX_DB.exists():
        return None
    c = sqlite3.connect(str(OUTBOX_DB))
    try:
        for r in c.execute("SELECT id,status,body FROM tasks"):
            for line in (r[2] or "").splitlines():
                if line.strip() == f"task_id={tgim_task_id}":
                    return {"id": r[0], "status": r[1]}
        return None
    finally:
        c.close()


def _outbox_count_for(tgim_task_id):
    if not OUTBOX_DB.exists():
        return 0
    c = sqlite3.connect(str(OUTBOX_DB))
    try:
        n = 0
        for r in c.execute("SELECT body FROM tasks"):
            for line in (r[0] or "").splitlines():
                if line.strip() == f"task_id={tgim_task_id}":
                    n += 1
        return n
    finally:
        c.close()


def _make_fixture(suffix):
    """Create a real board row to act as a test subject. Returns its id."""
    c = kanban_db.connect(BOARD_DB)
    try:
        tid = kanban_db.create_task(
            c, title=f"P1.3 TEST FIXTURE {suffix}",
            body=f"source_section=§0 CIV\n---\nP1.3 test fixture {suffix} — DELETE after",
            tenant="acg", priority=1, created_by="p1.3-test",
            idempotency_key=f"p1.3-test:{suffix}:{int(time.time()*1000)}")
        return tid
    finally:
        c.close()


def _delete_fixtures(ids):
    """Hard-delete the fixture rows + their local events, restoring row count."""
    c = sqlite3.connect(str(BOARD_DB))
    try:
        for tid in ids:
            c.execute("DELETE FROM task_events WHERE task_id=?", (tid,))
            c.execute("DELETE FROM tasks WHERE id=?", (tid,))
        c.commit()
    finally:
        c.close()


def record(name, passed, detail):
    RESULTS.append((name, passed, detail))
    mark = "PASS" if passed else "FAIL"
    print(f"  [{mark}] {name}: {detail}")


# ─────────────────────────────────────────────────────────────────────────────
def main():
    start_rowcount = _board_conn().execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
    print(f"# P1.3 behavioral tests — board starts at {start_rowcount} rows")
    fixtures = []
    try:
        # ── T1.3.1 — a status verb writes BOTH records ───────────────────────
        f1 = _make_fixture("T131"); fixtures.append(f1)
        res = verbmod.run_verb("claim", f1, actor="tgim-lead")
        state_ok = bool(_local_events(f1, "status_claim"))  # kanban STATE row present
        ttid = res["tgim_task_id"]
        ob = _outbox_row_for(ttid)
        # AUDIT present means a durable outbox row exists (landed OR queued — both
        # are "the audit heard about it"; silent-nothing is the only fail).
        audit_ok = ob is not None
        kanban_status = _row(f1)["status"]
        record("T1.3.1",
               state_ok and audit_ok and res["ok"],
               f"kanban STATE row written (status_claim, board status={kanban_status}) "
               f"AND TGIM AUDIT row present in outbox (status={ob['status'] if ob else None}); "
               f"synced={res['synced']}")

        # ── T1.3.2 — task_id + actor correlate across both records ───────────
        # The TGIM event payload carries kanban_row_id == the kanban row id, and
        # agent_id == actor. Prove the join is clean (no orphan).
        ev_payload = json.loads(_local_events(f1, "status_claim")[0]["payload"])
        # Read the actual emitted event JSON back out of the outbox body.
        emitted = _read_emitted_event(ttid)
        join_ok = (
            emitted is not None
            and emitted["payload"]["kanban_row_id"] == f1
            and emitted["agent_id"] == "tgim-lead"
            and emitted["task_id"] == ttid
        )
        record("T1.3.2",
               join_ok,
               f"TGIM event joins to kanban on row_id={f1}, agent_id=tgim-lead, "
               f"tgim_task_id={ttid} (clean join, no orphan)" if join_ok
               else f"JOIN BROKEN: emitted={emitted}")

        # ── T1.3.3 — TGIM-down does NOT silently half-write ─────────────────
        # Force the transport to fail deterministically (monkeypatch post_event),
        # run a real verb, and prove: STATE written + LOUD desync signal +
        # durable QUEUED row (recoverable) — never a silent drop.
        f3 = _make_fixture("T133"); fixtures.append(f3)
        import tgim_event as _te
        orig_post = _te.post_event
        orig_sign = _te.sign_jwt
        _te.post_event = lambda jwt, event, timeout=30: (503, "FORCED TGIM-DOWN for T1.3.3")
        _te.sign_jwt = lambda seat="hermes-primary", ttl=1200: "forced.fake.jwt"
        # outbox imports transport lazily via _transport(); patch the module it pulls
        import tgim_outbox_durable as _ob
        try:
            res3 = verbmod.run_verb("complete", f3, actor="tgim-lead")
        finally:
            _te.post_event = orig_post
            _te.sign_jwt = orig_sign
        state3_ok = bool(_local_events(f3, "status_complete"))
        loud_ok = (res3["ok"] and not res3["synced"] and res3["loud"] is not None)
        ttid3 = res3["tgim_task_id"]
        ob3 = _outbox_row_for(ttid3)
        queued_ok = (ob3 is not None and ob3["status"] in ("ready", "blocked"))
        pending_marker = bool(_local_events(f3, "tgim_emit_pending"))
        record("T1.3.3",
               state3_ok and loud_ok and queued_ok and pending_marker,
               f"TGIM forced-down: STATE written={state3_ok}, LOUD desync signal="
               f"{loud_ok}, durable QUEUED row={queued_ok} (status={ob3['status'] if ob3 else None}), "
               f"local pending-marker={pending_marker} — NOT a silent drop")

        # ── T1.3.4 — no double-emit on a re-run verb (idempotent) ───────────
        # Re-run the SAME logical verb. The deterministic tgim_task_id includes
        # the state_seq; a true re-emit of the SAME transition dedups to ONE
        # outbox row. We re-emit the EXACT same event (same tgim_task_id) and
        # prove the outbox count stays 1.
        ttid1 = res["tgim_task_id"]  # from T1.3.1 (claim on f1)
        before = _outbox_count_for(ttid1)
        # Re-emit the identical event via the outbox directly (same task_id).
        emitted1 = _read_emitted_event(ttid1)
        _ob.emit(emitted1)  # idempotent re-emit of the same transition
        _ob.emit(emitted1)  # twice more for good measure
        after = _outbox_count_for(ttid1)
        record("T1.3.4",
               before == 1 and after == 1,
               f"re-emitting the same transition (tgim_task_id={ttid1}) kept outbox "
               f"count at 1 (before={before}, after 3 emits={after}) — send_dedup holds")

        # ── T1.3.5 — reconciliation proves zero desync across N>=10 ─────────
        # Drive >=10 real transitions across fixtures, then reconcile -> green.
        # THEN the adversarial sub-test: a DELIBERATE desync (suppress_tgim)
        # MUST make reconcile FAIL LOUD (catch the divergence).
        n_fix = []
        for i in range(10):
            fi = _make_fixture(f"T135_{i}"); fixtures.append(fi); n_fix.append(fi)
            verbmod.run_verb("claim", fi, actor="tgim-lead")
        # reconcile must be green (every transition has a landed/queued audit).
        green_before, recon_before = _reconcile_safe()
        # Adversarial: deliberate desync on a fresh fixture.
        fdes = _make_fixture("T135_DESYNC"); fixtures.append(fdes)
        des = verbmod.run_verb("complete", fdes, actor="tgim-lead", suppress_tgim=True)
        green_after, recon_after = _reconcile_safe()
        desync_caught = (green_after is False)  # reconcile FAILED LOUD on the desync
        # the deliberate desync row must appear in unmatched_state
        named = any(u.get("kanban_row_id") == fdes
                    for u in (recon_after or {}).get("unmatched_state", []))
        record("T1.3.5",
               (green_before is True) and desync_caught and named,
               f"reconcile GREEN across >=10 real transitions (green={green_before}); "
               f"then a DELIBERATE desync (suppress_tgim on {fdes}) made reconcile "
               f"FAIL LOUD (caught={desync_caught}, named-the-row={named})")

    finally:
        # Clean up: delete all fixtures, restore the board row count.
        _delete_fixtures(fixtures)
        end_rowcount = _board_conn().execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        print(f"# fixtures deleted; board back to {end_rowcount} rows "
              f"({'restored' if end_rowcount == start_rowcount else 'DRIFT!'})")
        if end_rowcount != start_rowcount:
            record("CLEANUP", False,
                   f"row count drifted {start_rowcount}->{end_rowcount}")

    # ── verdict ──────────────────────────────────────────────────────────────
    passed = sum(1 for _, p, _ in RESULTS if p)
    total = len(RESULTS)
    print(f"\n# P1.3 RESULT: {passed}/{total} PASS")
    for name, p, _ in RESULTS:
        print(f"   {name}: {'PASS' if p else 'FAIL'}")
    return 0 if passed == total else 1


def _read_emitted_event(tgim_task_id):
    """Pull the full emitted event JSON back out of the durable outbox body."""
    if not OUTBOX_DB.exists():
        return None
    c = sqlite3.connect(str(OUTBOX_DB))
    try:
        for r in c.execute("SELECT body FROM tasks"):
            body = r[0] or ""
            if f"task_id={tgim_task_id}" in body and "---EVENT-JSON---" in body:
                return json.loads(body.split("---EVENT-JSON---\n", 1)[1])
        return None
    finally:
        c.close()


def _reconcile_safe():
    """Run reconcile() catching its sys.exit (it exits non-zero on desync).
    Returns (green: bool, report: dict|None)."""
    import io
    import contextlib
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            report = verbmod.reconcile()
        return True, report
    except SystemExit:
        # reconcile printed the report to stdout before exiting; parse it.
        out = buf.getvalue()
        try:
            # the report JSON is everything before the final exit message line
            jstart = out.index("{")
            report = json.loads(out[jstart:])
        except Exception:
            report = None
        return False, report


if __name__ == "__main__":
    sys.exit(main())
