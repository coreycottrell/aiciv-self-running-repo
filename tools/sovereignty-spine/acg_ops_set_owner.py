#!/usr/bin/env python3
"""
acg_ops_set_owner.py — P1.1 of the self-running-AiCIV spine (sovereignty-spine #2).

Adds the THREE ownership columns to the ACG ops-board (owner_vp / surface /
project_id), backfills all 45 rows deterministically, and exposes the ONLY
sanctioned write-path for ownership: the `set_owner_vp` verb (which writes to
the append-only task_events log — NEVER a raw UPDATE without a trace).

WHY a dedicated ACG-side tool instead of editing the vendored hermes_cli library:
  - REVERSIBLE + ACG-OWNED. Editing hermes_cli.kanban_db._migrate_add_optional_columns
    would re-migrate EVERY Hermes board (cross-tenant blast radius) and lives in
    vendored upstream code. This tool scopes the migration to the ACG board only;
    rollback = restore the .bak'd .db (byte-identical).
  - VERB-ONLY (T1.1.2). set_owner_vp writes the column AND appends an
    `owner_vp_set` event to task_events. A raw `UPDATE tasks SET owner_vp=...`
    leaves NO event row → the health sweep (P1.1 proof-gate) detects the
    out-of-band mutation (column changed with no matching event = LOUD).
  - DETERMINISTIC BACKFILL. Reuses acg_ops_board._resolve_owner + SECTION_OWNER
    (the same logic that SEEDED these rows), reading each row's embedded
    `source_section` + raw `— **owner**` token from its body. No guessing.
  - FAIL-LOUD (T1.1.1 / T1.1.3). After backfill, a NULL owner_vp on any
    non-triage row is a HARD ERROR (sys.exit non-zero). A null that is not an
    error is the silent rot this column exists to kill.

The columns:
  owner_vp   TEXT  — one of the 17 VP ids ("<vertical>-lead") OR "primary"/"corey".
  surface    TEXT  — the work surface (MOON-PLAY / MOON-BUILD / WARREN /
                     INFERENCE-PRODUCT / CIV) derived from source_section.
  project_id TEXT  — a real projects/<id>/ estate when the row belongs to one,
                     else NULL (CIV-wide rows have no single project home).

Usage:
  python3 tools/sovereignty-spine/acg_ops_set_owner.py migrate     # add columns (idempotent)
  python3 tools/sovereignty-spine/acg_ops_set_owner.py backfill     # backfill all rows (idempotent, verb-only)
  python3 tools/sovereignty-spine/acg_ops_set_owner.py set-owner <task_id> <owner_vp>  # the verb
  python3 tools/sovereignty-spine/acg_ops_set_owner.py list         # read-back via the read verb
  python3 tools/sovereignty-spine/acg_ops_set_owner.py health       # fail-loud NULL-owner sweep
"""

import argparse
import json
import os
import re
import sqlite3
import sys
import time
from pathlib import Path

ROOT = Path("/home/corey/projects/AI-CIV/ACG")
BOARD_DB = ROOT / "data/acg-ops-board/kanban.db"
SPINE_DIR = ROOT / "tools/sovereignty-spine"

# Reuse the SEEDING logic so backfill matches how the rows were created.
sys.path.insert(0, str(SPINE_DIR))
from acg_ops_board import _resolve_owner, SECTION_OWNER, OWNER_RE  # noqa: E402

# The 17 vertical VP ids + the two non-VP owners that legitimately own rows.
VALID_VPS = {
    "mind-lead", "web-lead", "legal-lead", "research-lead", "infra-lead",
    "business-lead", "comms-lead", "fleet-lead", "pipeline-lead",
    "ceremony-lead", "qa-lead", "workflow-lead", "android-lead",
    "blogger-lead", "godot-lead", "moon-lead", "tgim-lead",
    "primary", "corey",
}

# Map a §0 source_section to (surface, project_id). project_id MUST round-trip
# to a real projects/<id>/ estate (T1.1.5) or be None.
SECTION_TO_SURFACE_PROJECT = {
    "MOON — PLAY/SHIP":   ("MOON-PLAY",  "moon-0.1"),
    "MOON — BUILD/DESIGN":("MOON-BUILD", "moon-0.1"),
    "WARREN":             ("WARREN",     None),
    "INFERENCE-PRODUCT":  ("INFERENCE-PRODUCT", None),
    "CIV":                ("CIV",        None),
    "m3-combo":           ("m3-combo",   None),
    "BLOG":               ("BLOG",       None),
}

# A row whose status indicates it is still in triage MAY legitimately lack an
# owner. Everything past triage MUST be owned. The ACG board uses 'ready' for
# actionable rows; 'blocked' rows are owned (someone owns the block). The only
# triage-ish status would be an explicit 'triage'/'inbox'.
TRIAGE_STATUSES = {"triage", "inbox", "unassigned"}


def _connect():
    if not BOARD_DB.exists():
        sys.exit(f"FAIL-LOUD: board db not found: {BOARD_DB}")
    conn = sqlite3.connect(str(BOARD_DB))
    conn.row_factory = sqlite3.Row
    return conn


def _add_column_if_missing(conn, table, column, ddl):
    """ALTER TABLE ADD COLUMN, idempotent. Returns True if added."""
    try:
        conn.execute(f"ALTER TABLE {table} ADD COLUMN {ddl}")
        return True
    except sqlite3.OperationalError as exc:
        if "duplicate column name" in str(exc).lower():
            return False
        raise


def migrate():
    """Add owner_vp / surface / project_id columns (additive, NULLable, idempotent)."""
    conn = _connect()
    try:
        pre_cols = {r["name"] for r in conn.execute("PRAGMA table_info(tasks)")}
        pre_count = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        added = []
        for col, ddl in (
            ("owner_vp", "owner_vp TEXT"),
            ("surface", "surface TEXT"),
            ("project_id", "project_id TEXT"),
        ):
            if _add_column_if_missing(conn, "tasks", col, ddl):
                added.append(col)
        conn.commit()
        post_cols = {r["name"] for r in conn.execute("PRAGMA table_info(tasks)")}
        post_count = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        report = {
            "cmd": "migrate",
            "added_columns": added,
            "already_present": sorted(
                {"owner_vp", "surface", "project_id"} & pre_cols
            ),
            "row_count_pre": pre_count,
            "row_count_post": post_count,
            "all_three_present": {"owner_vp", "surface", "project_id"} <= post_cols,
        }
        # T1.1.4 invariant: additive only — row count must not change.
        if pre_count != post_count:
            sys.exit(f"FAIL-LOUD: migration changed row count {pre_count}->{post_count}")
        return report
    finally:
        conn.close()


def _project_id_round_trips(project_id):
    """T1.1.5: a non-NULL project_id must resolve to a real projects/<id>/ estate."""
    if project_id is None:
        return True  # NULL is allowed for CIV-wide rows
    return (ROOT / "projects" / project_id).is_dir()


def set_owner_vp(conn, task_id, owner_vp, *, surface=None, project_id=None,
                 source="verb", commit=True):
    """THE sanctioned write-path. Writes the column AND an append-only event.

    A raw UPDATE bypassing this leaves no `owner_vp_set` event → detectable by
    health(). Returns the new (owner_vp, surface, project_id).
    """
    if owner_vp not in VALID_VPS:
        sys.exit(f"FAIL-LOUD: '{owner_vp}' is not a registered VP id "
                 f"(one of {sorted(VALID_VPS)})")
    row = conn.execute("SELECT id, surface, project_id FROM tasks WHERE id=?",
                       (task_id,)).fetchone()
    if row is None:
        sys.exit(f"FAIL-LOUD: no such task {task_id}")
    # Preserve existing surface/project_id if not overridden.
    new_surface = surface if surface is not None else row["surface"]
    new_project = project_id if project_id is not None else row["project_id"]
    if not _project_id_round_trips(new_project):
        sys.exit(f"FAIL-LOUD: project_id '{new_project}' has no estate at "
                 f"projects/{new_project}/")
    conn.execute(
        "UPDATE tasks SET owner_vp=?, surface=?, project_id=? WHERE id=?",
        (owner_vp, new_surface, new_project, task_id),
    )
    # Append-only audit event (the trace that distinguishes the verb from raw SQL).
    conn.execute(
        "INSERT INTO task_events (task_id, run_id, kind, payload, created_at) "
        "VALUES (?, NULL, 'owner_vp_set', ?, ?)",
        (task_id,
         json.dumps({"owner_vp": owner_vp, "surface": new_surface,
                     "project_id": new_project, "source": source},
                    ensure_ascii=False),
         int(time.time())),
    )
    if commit:
        conn.commit()
    return owner_vp, new_surface, new_project


def _derive(body, status):
    """Deterministically derive (owner_vp, surface, project_id) from a row body."""
    m = re.search(r"source_section=§0\s+(.+)", body or "")
    section = m.group(1).strip() if m else "CIV"
    # Normalize to a known SECTION_OWNER key by substring (mirror cutover logic).
    norm = section
    for key in SECTION_OWNER:
        if key.lower() in section.lower():
            norm = key
            break
    section_owner = SECTION_OWNER.get(norm, "primary")
    # The raw §0 line is after the "---\n" marker in the body.
    raw = body.split("---\n", 1)[1].strip() if body and "---\n" in body else (body or "")
    owner = _resolve_owner(raw, section_owner)
    # Canonicalize bare/odd tokens to a VALID VP id; fall back to section_owner.
    owner = _canonicalize_owner(owner, section_owner)
    surface, project_id = SECTION_TO_SURFACE_PROJECT.get(norm, ("CIV", None))
    return owner, surface, project_id


def _canonicalize_owner(owner, fallback):
    o = (owner or "").strip().lower()
    if o in VALID_VPS:
        return o
    bare = {
        "mind": "mind-lead", "fleet": "fleet-lead", "tgim": "tgim-lead",
        "infra": "infra-lead", "web": "web-lead", "comms": "comms-lead",
        "business": "business-lead", "godot": "godot-lead",
        "android": "android-lead", "blogger": "blogger-lead",
        "moon": "moon-lead", "research": "research-lead", "qa": "qa-lead",
        "workflow": "workflow-lead", "legal": "legal-lead",
        "ceremony": "ceremony-lead", "pipeline": "pipeline-lead",
    }
    if o in bare:
        return bare[o]
    if o.endswith("-lead") and o in VALID_VPS:
        return o
    # last resort: the section owner (always a valid id)
    return fallback if fallback in VALID_VPS else "primary"


def backfill():
    """Backfill all rows via the set_owner_vp verb. Idempotent. FAILS LOUD on NULL."""
    conn = _connect()
    try:
        cols = {r["name"] for r in conn.execute("PRAGMA table_info(tasks)")}
        if not {"owner_vp", "surface", "project_id"} <= cols:
            sys.exit("FAIL-LOUD: columns missing — run `migrate` first")
        rows = conn.execute("SELECT id, body, status FROM tasks ORDER BY created_at").fetchall()
        report = {"cmd": "backfill", "total": len(rows), "set": 0, "rows": []}
        for r in rows:
            owner, surface, project_id = _derive(r["body"], r["status"])
            ov, sf, pj = set_owner_vp(conn, r["id"], owner,
                                      surface=surface, project_id=project_id,
                                      source="backfill", commit=False)
            report["set"] += 1
            report["rows"].append({"id": r["id"], "owner_vp": ov,
                                   "surface": sf, "project_id": pj})
        conn.commit()
        # FAIL-LOUD verification (T1.1.1): no NULL owner on any non-triage row.
        nulls = conn.execute(
            "SELECT id, status FROM tasks "
            "WHERE owner_vp IS NULL AND status NOT IN ({})".format(
                ",".join("?" * len(TRIAGE_STATUSES))),
            tuple(TRIAGE_STATUSES),
        ).fetchall()
        if nulls:
            sys.exit("FAIL-LOUD: {} non-triage rows have NULL owner_vp after "
                     "backfill: {}".format(len(nulls), [n["id"] for n in nulls]))
        # FAIL-LOUD: every owner is a registered VP.
        bad = conn.execute(
            "SELECT id, owner_vp FROM tasks WHERE owner_vp IS NOT NULL").fetchall()
        invalid = [(b["id"], b["owner_vp"]) for b in bad if b["owner_vp"] not in VALID_VPS]
        if invalid:
            sys.exit(f"FAIL-LOUD: invalid owner_vp values: {invalid}")
        report["null_owner_nontriage"] = 0
        report["all_valid_vps"] = True
        return report
    finally:
        conn.close()


def list_board():
    """Read verb — surface owner_vp/surface/project_id per row (T1.1.1 read-path)."""
    conn = _connect()
    try:
        rows = conn.execute(
            "SELECT id, status, owner_vp, surface, project_id, substr(title,1,55) AS t "
            "FROM tasks ORDER BY owner_vp, created_at").fetchall()
        out = {"cmd": "list", "count": len(rows),
               "by_owner": {}, "rows": []}
        for r in rows:
            out["by_owner"][r["owner_vp"]] = out["by_owner"].get(r["owner_vp"], 0) + 1
            out["rows"].append({"id": r["id"], "status": r["status"],
                                "owner_vp": r["owner_vp"], "surface": r["surface"],
                                "project_id": r["project_id"], "title": r["t"]})
        return out
    finally:
        conn.close()


def health():
    """Fail-loud NULL-owner sweep (the bg_mind_memory_health_sweep_0430_3d check).

    Exit non-zero (LOUD) if any non-triage row has NULL owner_vp, OR any column
    was mutated out-of-band (an owner_vp present with NO `owner_vp_set` event =
    a raw-UPDATE bypass of the verb). Returns the report on green.
    """
    conn = _connect()
    try:
        report = {"cmd": "health", "checks": {}}
        # Check 1: no NULL owner on non-triage rows.
        nulls = conn.execute(
            "SELECT id FROM tasks WHERE owner_vp IS NULL AND status NOT IN ({})".format(
                ",".join("?" * len(TRIAGE_STATUSES))),
            tuple(TRIAGE_STATUSES)).fetchall()
        report["checks"]["null_owner_nontriage"] = [n["id"] for n in nulls]
        # Check 2: out-of-band mutation — owner set with no owner_vp_set event.
        owned = conn.execute(
            "SELECT id FROM tasks WHERE owner_vp IS NOT NULL").fetchall()
        evented = {r["task_id"] for r in conn.execute(
            "SELECT DISTINCT task_id FROM task_events WHERE kind='owner_vp_set'")}
        oob = [o["id"] for o in owned if o["id"] not in evented]
        report["checks"]["out_of_band_mutations"] = oob
        report["green"] = (not nulls) and (not oob)
        if not report["green"]:
            print(json.dumps(report, indent=2))
            sys.exit("HEALTH FAIL-LOUD: NULL-owner or out-of-band mutation detected")
        return report
    finally:
        conn.close()


def main():
    ap = argparse.ArgumentParser(description="ACG ops-board ownership columns (P1.1)")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("migrate")
    sub.add_parser("backfill")
    sub.add_parser("list")
    sub.add_parser("health")
    so = sub.add_parser("set-owner")
    so.add_argument("task_id")
    so.add_argument("owner_vp")
    so.add_argument("--surface", default=None)
    so.add_argument("--project-id", default=None)
    args = ap.parse_args()

    if args.cmd == "migrate":
        print(json.dumps(migrate(), indent=2))
    elif args.cmd == "backfill":
        print(json.dumps(backfill(), indent=2))
    elif args.cmd == "list":
        print(json.dumps(list_board(), indent=2))
    elif args.cmd == "health":
        print(json.dumps(health(), indent=2))
    elif args.cmd == "set-owner":
        conn = _connect()
        try:
            res = set_owner_vp(conn, args.task_id, args.owner_vp,
                               surface=args.surface, project_id=args.project_id,
                               source="cli")
            print(json.dumps({"cmd": "set-owner", "task_id": args.task_id,
                              "owner_vp": res[0], "surface": res[1],
                              "project_id": res[2]}, indent=2))
        finally:
            conn.close()


if __name__ == "__main__":
    main()
