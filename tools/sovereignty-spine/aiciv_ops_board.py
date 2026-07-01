#!/usr/bin/env python3
"""
aiciv_ops_board.py — the durable per-VP kanban cutover library (sovereignty-spine #1).

Makes the Hermes kanban + a LOCAL SQLite store the SYSTEM-OF-RECORD for the
per-VP work board, replacing the 4 diverging flat ledgers as the machine-durable
coordination layer. WORKBOARD.md stays the human-readable narrative; this board
becomes the durable layer underneath it.

GROUNDED IN (own-eyes proven, 2026-06-17):
  data/reports/acg-adopts-hermes-kanban-db-proof-20260617.md
  — adoption is PROVEN container-independent via the canonical hermes_cli.kanban_db
    library (the SOLE source of truth the WebUI/CLI/dispatcher all converge on).

HARD SAFETY (this is a load-bearing infra cutover):
  - REVERSIBLE: this NEVER touches the 4 flat ledgers. The caller .bak's them.
    This only WRITES to the durable board (a new SQLite file). Rollback = stop
    reading the board + the .bak'd flat ledgers are byte-identical fallbacks.
  - IDEMPOTENT: every seeded row carries a stable idempotency_key derived from a
    content hash of the WORKBOARD item, so re-running the cutover NEVER
    double-writes (gotcha #3 in hermes-kanban skill). Re-run = no-op convergence.
  - TRACEABLE: every row records source_ledger + source_section + source_line +
    content_hash in its body, so any row traces back to the exact WORKBOARD line.
  - VERBS-ONLY: state is driven through kanban_db verbs (create_task/block_task/
    complete_task/add_comment) — never raw UPDATE — staying inside the claim
    protocol + append-only event log.

The board DB lives at data/aiciv-ops-board/kanban.db (committed-path, container-
independent). The 4 flat ledgers remain on disk untouched as the fallback.
"""

import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path

import os as _os  # fork-resolution: honor $AICIV_ROOT (STAND-IT-UP §0); the civilization path is the origin fallback
ROOT = Path(_os.environ.get("AICIV_ROOT", "$AICIV_ROOT"))
HERMES_LIB = ROOT / "projects/hermes-student-001/provisioning/hermes-agent"
# S7 GENERICIZATION CURE (2026-06-29): explicit AICIV_KANBAN_DB seam (Seam C). A fork may either
# (a) override AICIV_ROOT and inherit the default `<ROOT>/data/aiciv-ops-board/kanban.db` layout, OR
# (b) override AICIV_KANBAN_DB directly with an absolute path to point at a custom board file.
# A non-SQLite backend (Postgres, a remote API) implements the contract in adapters/board-adapter.md.
BOARD_DB = Path(_os.environ.get("AICIV_KANBAN_DB", str(ROOT / "data/aiciv-ops-board/kanban.db")))
WORKBOARD = Path(_os.environ.get("AICIV_WORKBOARD", str(ROOT / "WORKBOARD.md")))

# The board slug for the civilization's own ops board (per the adoption proof).
BOARD_SLUG = "aiciv-ops"

# The kanban_db tenant field — a fork sets AICIV_CIV_ID to its own civ id.
CIV_ID = _os.environ.get("AICIV_CIV_ID", "aiciv")

# Map a §0 subsection emoji-header to the owning VP assignee (best-effort;
# per-item explicit owner overrides this).
SECTION_OWNER = {
    "MOON — PLAY/SHIP": "android-lead",
    "MOON — BUILD/DESIGN": "godot-lead",
    "BLOG": "blogger-lead",
    "WARREN": "business-lead",
    "INFERENCE-PRODUCT": "mind-lead",
    "CIV": "primary",
    "m3-combo": "mind-lead",
}

# Explicit owner tokens that can appear at the end of a §0 line, e.g.
# "— **mind-lead**" or "— **the steward**" or "— **mind+fleet+tgim**".
OWNER_RE = re.compile(r"—\s*\*\*([^*]+)\*\*\s*$")


def _load_kanban_db():
    """Import the canonical hermes_cli.kanban_db library (container-independent)."""
    p = str(HERMES_LIB)
    if p not in sys.path:
        sys.path.insert(0, p)
    from hermes_cli import kanban_db  # noqa: E402
    return kanban_db


def _content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:12]


def _resolve_owner(line: str, section_owner: str) -> str:
    m = OWNER_RE.search(line)
    if m:
        raw = m.group(1).strip()
        # Take the first named lead token (mind+fleet+tgim -> mind-lead family).
        first = re.split(r"[+/,]", raw)[0].strip().lower()
        # Normalize "mind" -> "mind-lead" only if it isn't already "-lead"/known.
        # {STEWARD-NAME}: "corey" here is a real OWNER-ID token (the origin steward can own kanban rows).
        # A fork should set this to its OWN steward-id so steward-owned rows resolve correctly.
        if first in ("corey",):  # <- set to your own steward-id
            return "corey"
        if first.endswith("-lead"):
            return first
        # bare vertical tokens
        bare = {
            "mind": "mind-lead", "fleet": "fleet-lead", "tgim": "tgim-lead",
            "infra": "infra-lead", "web": "web-lead", "comms": "comms-lead",
            "business": "business-lead", "godot": "godot-lead",
            "android": "android-lead", "blogger": "blogger-lead",
            "moon": "moon-lead", "research": "research-lead",
            "qa": "qa-lead", "workflow": "workflow-lead", "legal": "legal-lead",
            "ceremony": "ceremony-lead", "pipeline": "pipeline-lead",
            "primary": "primary",
        }
        if first in bare:
            return bare[first]
        return first or section_owner
    return section_owner


def parse_workboard_section0(workboard_path: Path):
    """Parse WORKBOARD §0 MASTER TODO into structured open/done items.

    Returns a list of dicts: {title, status('open'|'done'), owner, section,
    source_line, content_hash, raw}. Only top-level checkbox items are taken
    (sub-bullets and prose lines are skipped — they're narrative, not rows).
    """
    text = workboard_path.read_text(encoding="utf-8")
    lines = text.splitlines()

    # Find §0 boundaries.
    start = None
    end = len(lines)
    for i, ln in enumerate(lines):
        if ln.startswith("## §0 MASTER TODO"):
            start = i
        elif start is not None and ln.startswith("## §") and i > start:
            end = i
            break
    if start is None:
        raise RuntimeError("WORKBOARD §0 MASTER TODO section not found")

    items = []
    cur_section = "CIV"
    # checkbox line: leading "- [ ]" or "- [x]" or "- [~]"
    cb_re = re.compile(r"^- \[( |x|~|X)\]\s+(.*)$")
    # subsection header line: "**🌙 MOON — PLAY/SHIP:**" etc.
    sec_re = re.compile(r"^\*\*[^A-Za-z]*([A-Za-z].*?):\*\*\s*$")

    for i in range(start, end):
        ln = lines[i]
        sm = sec_re.match(ln.strip())
        if sm:
            label = sm.group(1).strip()
            # normalize to a known key by substring match
            cur_section = label
            for key in SECTION_OWNER:
                if key.lower() in label.lower():
                    cur_section = key
                    break
            continue
        cm = cb_re.match(ln.strip())
        if cm:
            mark = cm.group(1).lower()
            body = cm.group(2).strip()
            status = "done" if mark in ("x",) else ("done" if mark == "~" else "open")
            # title = first sentence / bolded lead, capped
            title = re.sub(r"\s+", " ", body)
            title_short = title[:200]
            section_owner = SECTION_OWNER.get(cur_section, "primary")
            owner = _resolve_owner(body, section_owner)
            items.append({
                "title": title_short,
                "status": status,
                "owner": owner,
                "section": cur_section,
                "source_line": i + 1,  # 1-based
                "content_hash": _content_hash(body),
                "raw": body,
            })
    return items


def cutover(dry_run: bool = True, include_done: bool = False):
    """Seed/converge the durable aiciv-ops board from WORKBOARD §0.

    Idempotent: stable idempotency_key per item => re-run never double-writes.
    NEVER touches the flat ledgers. Returns a structured report dict.
    """
    kanban_db = _load_kanban_db()
    items = parse_workboard_section0(WORKBOARD)

    open_items = [it for it in items if it["status"] == "open"]
    done_items = [it for it in items if it["status"] == "done"]
    to_seed = items if include_done else open_items

    report = {
        "board_db": str(BOARD_DB),
        "board_slug": BOARD_SLUG,
        "dry_run": dry_run,
        "parsed_total": len(items),
        "parsed_open": len(open_items),
        "parsed_done": len(done_items),
        "seeded_target": len(to_seed),
        "created": 0,
        "idempotent_hits": 0,
        "rows": [],
        "errors": [],
    }

    if dry_run:
        for it in to_seed:
            report["rows"].append({
                "idempotency_key": f"aiciv-ops:{it['content_hash']}",
                "title": it["title"][:80],
                "owner": it["owner"],
                "section": it["section"],
                "source_line": it["source_line"],
            })
        return report

    BOARD_DB.parent.mkdir(parents=True, exist_ok=True)
    conn = kanban_db.connect(BOARD_DB)
    try:
        # Snapshot pre-existing row count for traceability.
        pre = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        report["pre_existing_rows"] = pre

        for it in to_seed:
            idem = f"aiciv-ops:{it['content_hash']}"
            body = (
                f"source_ledger=WORKBOARD.md\n"
                f"source_section=§0 {it['section']}\n"
                f"source_line={it['source_line']}\n"
                f"content_hash={it['content_hash']}\n"
                f"status_in_ledger={it['status']}\n"
                f"---\n{it['raw']}"
            )
            # priority: simple heuristic — explicit the steward-gated = high.
            prio = 5
            if "corey" in it["owner"].lower():
                prio = 7
            existing_before = conn.execute(
                "SELECT id FROM tasks WHERE idempotency_key=?", (idem,)
            ).fetchone()
            tid = kanban_db.create_task(
                conn,
                title=it["title"],
                body=body,
                assignee=None,  # assignee canonicalization is profile-bound; use tenant+body owner
                tenant=CIV_ID,
                priority=prio,
                created_by="aiciv-ops-cutover",
                idempotency_key=idem,
            )
            if existing_before is not None:
                report["idempotent_hits"] += 1
            else:
                report["created"] += 1
            report["rows"].append({
                "id": tid,
                "idempotency_key": idem,
                "title": it["title"][:80],
                "owner": it["owner"],
                "section": it["section"],
                "source_line": it["source_line"],
                "new": existing_before is None,
            })
        post = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        report["post_rows"] = post
    finally:
        conn.close()
    return report


def status():
    """Read-back the durable board ground-truth via plain sqlite3 (no library).

    A self-report is just a 200; this LOOKS at the on-disk DB.
    """
    import sqlite3
    if not BOARD_DB.exists():
        return {"board_db": str(BOARD_DB), "exists": False}
    conn = sqlite3.connect(str(BOARD_DB))
    try:
        rows = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        evs = conn.execute("SELECT COUNT(*) FROM task_events").fetchone()[0]
        by_status = dict(conn.execute(
            "SELECT status, COUNT(*) FROM tasks GROUP BY status"
        ).fetchall())
        sample = conn.execute(
            "SELECT id, status, priority, idempotency_key, title "
            "FROM tasks ORDER BY priority DESC, created_at ASC LIMIT 8"
        ).fetchall()
        return {
            "board_db": str(BOARD_DB),
            "exists": True,
            "size_bytes": BOARD_DB.stat().st_size,
            "tasks": rows,
            "task_events": evs,
            "by_status": by_status,
            "sample": [
                {"id": r[0], "status": r[1], "priority": r[2],
                 "idempotency_key": r[3], "title": (r[4] or "")[:70]}
                for r in sample
            ],
        }
    finally:
        conn.close()


def main():
    ap = argparse.ArgumentParser(description="the civilization durable ops-board cutover (sovereignty-spine #1)")
    ap.add_argument("cmd", choices=["dry-run", "cutover", "status", "parse"],
                    help="dry-run=plan only; cutover=write durable rows; status=read-back; parse=show parsed items")
    ap.add_argument("--include-done", action="store_true",
                    help="also seed already-done items (default: open items only)")
    args = ap.parse_args()

    if args.cmd == "parse":
        items = parse_workboard_section0(WORKBOARD)
        print(json.dumps({"count": len(items), "items": items}, indent=2))
    elif args.cmd == "dry-run":
        print(json.dumps(cutover(dry_run=True, include_done=args.include_done), indent=2))
    elif args.cmd == "cutover":
        print(json.dumps(cutover(dry_run=False, include_done=args.include_done), indent=2))
    elif args.cmd == "status":
        print(json.dumps(status(), indent=2))


if __name__ == "__main__":
    main()
