#!/usr/bin/env python3
"""
wiki_compile.py — P3.2: COMPILE entity/concept wiki pages from REAL canon.

Owner: mind-lead (memory-substrate + knowledge-organ owner per CLAUDE.md v3.6.3)
Born: 2026-06-21 (BUILD-DOC §2 Step P3.2 — WIRE + POPULATE the wiki)

WHAT THIS IS (the P3.1 decision made mechanical)
-----------------------------------------------
The wiki is a VIEW-over-canon (P3.1 decision, `data/reports/p3.1-wiki-architecture-decision-20260621.md`):
  - canon is the SINGLE source of truth (mem/canon/<lead>/log.jsonl).
  - a wiki ENTITY page is a COMPILED synthesis of the canon entries about that entity.
  - EVERY claim on the page carries a [[canon:<id>]] cross-link to the canon entry it
    compiled from. The id is the stable 32-hex `id` field of the canon entry —
    grep-resolvable directly (`grep -rl <id> mem/canon/`). No re-copy of canon bodies
    as a competing source-of-truth: the page COMPILES + LINKS, it does not DUPLICATE.
  - because the page owns no source, it cannot DRIFT — only go stale-until-recompiled
    (a freshness signal, not a second truth). RELATE-never-duplicate, made structural.

This is the SAME architectural shape as P1.2's civ-workboard.js↔kanban.db:
a generated, recompilable VIEW grouped/synthesized from a single source-of-record,
cross-linked back to it, never a second copy that drifts.

It ADOPTS the native-Hermes llm-wiki v2.1.0 schema (the on-disk `wiki/` dir already IS
that 3-layer schema: raw/ entities/ concepts/ comparisons/ queries/ + SCHEMA/index/log).
We do NOT re-build a wiki engine (SDK-before-reverse-engineering); we POPULATE the
adopted schema with canon-compiled pages.

COMPILE-NOT-RE-READ
-------------------
The whole Karpathy thesis: compile knowledge ONCE; a cold mind reads the compiled page
instead of re-deriving from raw. The kill-switch (P3.2 T3.2.2): the compiled page must be
materially CHEAPER than grep-the-canon for the same entity. `wiki_status.py --measure`
runs that measurement. If the wiki does NOT beat grep, the P3.1 §6 leash says SUBTRACT
the organ — recall+grep suffices. This compiler exists ONLY to be measured against grep.

SUBCOMMANDS
-----------
  compile <entity> [--type entity|concept]   compile/recompile ONE page from canon
  compile-batch                              compile the standard entity set (≥10 pages)
  list-canon <entity>                        show the raw canon entries an entity would compile from (debug)

INVARIANTS
----------
  - REAL canon only: test/archive/selftest leads are EXCLUDED (EXCLUDE_LEAD_RE).
  - Every page cites the canon entries it compiled from (no confabulation — each bullet
    is a real canon item/rationale + its real [[canon:<id>]]).
  - min-2 outbound [[wikilinks]] per page (native v2.1.0 retrieval-graph discipline).
  - index.md + log.md updated on every compile (the navigational backbone).
  - idempotent: recompiling the same entity over the same canon yields the same page
    (modulo the `updated:` stamp + the generated-marker).
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
WIKI = Path(os.environ.get("WIKI_PATH", str(REPO_ROOT / "wiki")))
CANON_GLOB = str(REPO_ROOT / "mem" / "canon" / "*" / "log.jsonl")

# REAL canon only — exclude the test/selftest/archive/mirror leads.
EXCLUDE_LEAD_RE = re.compile(
    r"_selftest|_archive|recall-fix|_runner|_librarian|_verify|track_a|"
    r"identity-mirror|portability|proof-port|_recall-fix"
)

GEN_MARKER = "<!-- WIKI-COMPILE:VIEW-over-canon — recompilable; canon is source-of-truth -->"

# The standard entity set for compile-batch — ≥10 real, high-frequency canon entities.
# Each: (slug, display, type, [match terms — case-insensitive word-ish match], [related slugs])
STANDARD_SET = [
    ("hum", "HUM (the immune system / boop auditor)", "entity",
     [r"\bHUM\b", r"hum-ledger", r"hum\.js"],
     ["wwcw", "block-no-wwcw", "self-knowledge"]),
    ("wwcw", "WWCW (What Would {STEWARD-NAME} Want)", "concept",
     # `\bWWCW\b` is the primary matcher. The second alias pattern matches the spelled-out form in
     # canon; a fork SHOULD set its own steward's name here (e.g. r"what would <steward> want").
     [r"\bWWCW\b", r"what would corey want"],  # <- set to your own steward name
     ["hum", "block-no-wwcw"]),
    ("tgim", "TGIM (the coordination substrate)", "entity",
     [r"\bTGIM\b"],
     ["kanban", "canon"]),
    ("canon", "canon (the memory trunk / source-of-truth)", "concept",
     [r"\bcanon_append\b", r"\bcanon trunk\b", r"\bcanon entry\b", r"canon_recall"],
     ["recall", "tgim"]),
    ("recall", "canon recall (disk -> RAM organ)", "concept",
     [r"\brecall\b", r"canon_recall", r"cold-recall", r"reconstitut"],
     ["canon", "self-knowledge"]),
    ("kanban", "kanban spine (acg-ops-board)", "entity",
     [r"\bkanban\b", r"acg-ops-board", r"acg_ops"],
     ["tgim", "civ-workboard"]),
    ("mneme", "Mneme (the sovereign zero-Claude fork)", "entity",
     [r"\bMneme\b", r"<sovereign-node>"],
     ["m3", "self-knowledge"]),
    ("m3", "MiniMax-M3 (the sovereign model substrate)", "entity",
     [r"\bM3\b", r"MiniMax-M3", r"minimax-m3"],
     ["mneme", "tgim"]),
    ("moon", "MOON (the program / game)", "entity",
     [r"\bMOON\b", r"moon-lead", r"moon-0\.1"],
     ["godot", "kanban"]),
    ("grounding", "grounding (boot-from-disk discipline)", "concept",
     [r"\bgrounding\b", r"grounding-docs", r"sprint-mode"],
     ["self-knowledge", "wwcw"]),
    ("self-knowledge", "self-knowledge protocol (the self runs itself)", "concept",
     [r"self-knowledge", r"after-a-clear", r"self-continuity", r"self-running"],
     ["recall", "grounding", "hum"]),
    ("block-no-wwcw", "BLOCK-NO-WWCW rule (no laundered park)", "concept",
     [r"BLOCK-NO-WWCW", r"NO-BLOCK RULE", r"laundered park", r"fail.{0,6}boop"],
     ["wwcw", "hum"]),
    ("workflow", "workflow substrate (forkable-mind incarnation)", "concept",
     [r"\bworkflow\b", r"workflows-master", r"firewall return", r"aiciv-coo"],
     ["tgim", "canon"]),
    ("civ-workboard", "civ-workboard (WORKBOARD generator / VIEW-over-kanban)", "entity",
     [r"civ-workboard", r"WORKBOARD", r"civ_workboard"],
     ["kanban", "canon"]),
]


def _now_date() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _load_real_canon() -> list[dict]:
    """All canon entries from REAL leads (test/archive excluded), each tagged with its lead+id."""
    out: list[dict] = []
    for path in sorted(glob.glob(CANON_GLOB)):
        lead = Path(path).parent.name
        if EXCLUDE_LEAD_RE.search(lead):
            continue
        try:
            with open(path, encoding="utf-8") as fh:
                for line in fh:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        e = json.loads(line)
                    except json.JSONDecodeError:
                        continue
                    if not e.get("id"):
                        continue
                    e["_lead"] = lead
                    out.append(e)
        except OSError:
            continue
    return out


def _entry_text(e: dict) -> str:
    return f"{e.get('item','')} {e.get('rationale','')}".strip()


def _match_entries(canon: list[dict], terms: list[str], limit: int = 24) -> list[dict]:
    """Return canon entries matching ANY term, newest-first, deduped by id."""
    pats = [re.compile(t, re.IGNORECASE) for t in terms]
    hits = []
    seen = set()
    for e in canon:
        if e["id"] in seen:
            continue
        text = _entry_text(e)
        if any(p.search(text) for p in pats):
            hits.append(e)
            seen.add(e["id"])
    # newest first
    hits.sort(key=lambda e: e.get("ts", ""), reverse=True)
    return hits[:limit]


def _summarize_item(e: dict, max_chars: int = 240) -> str:
    """One-line compiled claim: the canon item, trimmed, with its kind."""
    item = (e.get("item") or "").strip().replace("\n", " ")
    if len(item) > max_chars:
        item = item[:max_chars].rstrip() + "…"
    return item


def compile_page(slug: str, display: str, ptype: str, terms: list[str],
                 related: list[str], canon: list[dict]) -> tuple[Path, int, int]:
    """Compile ONE wiki page from canon. Returns (path, n_entries_compiled, n_leads)."""
    hits = _match_entries(canon, terms)
    if not hits:
        raise SystemExit(f"NO REAL CANON for entity '{slug}' (terms={terms}) — refusing to "
                         f"write an empty/confabulated page (T3.2.3 honesty).")

    leads = sorted({e["_lead"] for e in hits})
    subdir = "entities" if ptype == "entity" else "concepts"
    page_dir = WIKI / subdir
    page_dir.mkdir(parents=True, exist_ok=True)
    page_path = page_dir / f"{slug}.md"

    created = _now_date()
    if page_path.exists():
        # preserve original created date
        m = re.search(r"^created:\s*(\S+)", page_path.read_text(encoding="utf-8"), re.MULTILINE)
        if m:
            created = m.group(1)

    # Build the compiled body. Every bullet is a REAL canon claim + its [[canon:<id>]].
    lines = []
    lines.append("---")
    lines.append(f"title: {display}")
    lines.append(f"created: {created}")
    lines.append(f"updated: {_now_date()}")
    lines.append(f"type: {ptype}")
    lines.append("tags: [compiled-view, canon-derived, self-running-aiciv]")
    lines.append(f"source: canon (VIEW-over-canon; recompilable; {len(hits)} entries from {len(leads)} leads)")
    lines.append("self-referential: true")
    lines.append("---")
    lines.append("")
    lines.append(f"# {display}")
    lines.append("")
    lines.append(GEN_MARKER)
    lines.append(
        f"> **COMPILED VIEW over canon** — this page is a recompilable synthesis of "
        f"**{len(hits)}** real canon entries across **{len(leads)}** leads "
        f"({', '.join(leads)}). Every claim links to the canon entry it compiled from "
        f"via `[[canon:<id>]]` (grep-resolvable: `grep -rl <id> mem/canon/`). "
        f"canon is the single source of truth; this VIEW owns none and cannot drift — "
        f"only go stale-until-recompiled. Recompile: "
        f"`python3 tools/sovereignty-spine/wiki_compile.py compile {slug} --type {ptype}`."
    )
    lines.append("")

    # Cross-links (min-2 outbound — native v2.1.0 discipline).
    rel_links = " · ".join(f"[[{r}]]" for r in related)
    lines.append(f"**Related:** {rel_links}")
    lines.append("")

    lines.append("## Compiled from canon (newest first)")
    lines.append("")
    for e in hits:
        claim = _summarize_item(e)
        lines.append(f"- {claim}  `[[canon:{e['id']}]]` "
                     f"_(— {e['_lead']}, {e.get('kind','?')}, {e.get('ts','')[:10]})_")
    lines.append("")

    lines.append("## Provenance (the canon ids this page compiled from)")
    lines.append("")
    lines.append("Each id resolves directly: `grep -rl <id> mem/canon/`. "
                 "Change a source canon entry → recompile → this page reflects it (T3.2.4).")
    lines.append("")
    for e in hits:
        lines.append(f"- `{e['id']}` — {e['_lead']}")
    lines.append("")

    page_path.write_text("\n".join(lines), encoding="utf-8")
    return page_path, len(hits), len(leads)


def _rebuild_index(canon: list[dict]) -> None:
    """Regenerate wiki/index.md from the on-disk pages' frontmatter (the navigational backbone)."""
    entities = []
    concepts = []
    for sub, bucket in (("entities", entities), ("concepts", concepts)):
        d = WIKI / sub
        if not d.exists():
            continue
        for f in sorted(d.glob("*.md")):
            txt = f.read_text(encoding="utf-8")
            tm = re.search(r"^title:\s*(.+)$", txt, re.MULTILINE)
            title = tm.group(1).strip() if tm else f.stem
            sm = re.search(r"^source:\s*(.+)$", txt, re.MULTILINE)
            src = sm.group(1).strip() if sm else ""
            bucket.append((f.stem, title, src))

    total = len(entities) + len(concepts)
    out = []
    out.append("# Wiki Index")
    out.append("")
    out.append("> Content catalog. Every wiki page listed under its type with a one-line summary.")
    out.append("> Read this first to find relevant pages for any query.")
    out.append("> This index is GENERATED by wiki_compile.py from on-disk page frontmatter.")
    out.append(f"> Last updated: {_now_date()} | Total pages: {total}")
    out.append("")
    out.append("## Entities")
    out.append("")
    for stem, title, src in entities:
        out.append(f"- [[{stem}]] — {title}  _({src})_")
    out.append("")
    out.append("## Concepts")
    out.append("")
    for stem, title, src in concepts:
        out.append(f"- [[{stem}]] — {title}  _({src})_")
    out.append("")
    out.append("## Comparisons")
    out.append("<!-- None yet -->")
    out.append("")
    out.append("## Queries")
    out.append("<!-- None yet -->")
    out.append("")
    (WIKI / "index.md").write_text("\n".join(out), encoding="utf-8")


def _append_log(action: str, subject: str, detail: str) -> None:
    logp = WIKI / "log.md"
    line = f"## [{_now_date()}] {action} | {subject}\n- {detail}\n"
    with logp.open("a", encoding="utf-8") as fh:
        fh.write(line)


def cmd_compile(args) -> int:
    canon = _load_real_canon()
    # find in STANDARD_SET, else accept ad-hoc with a single-term match
    spec = next((s for s in STANDARD_SET if s[0] == args.entity), None)
    if spec:
        slug, display, ptype, terms, related = spec
        if args.type:
            ptype = args.type
    else:
        slug = args.entity
        display = args.entity.upper()
        ptype = args.type or "entity"
        terms = [re.escape(args.entity)]
        related = []
    path, n, nl = compile_page(slug, display, ptype, terms, related, canon)
    _rebuild_index(canon)
    _append_log("compile", slug, f"VIEW-over-canon: {n} canon entries / {nl} leads → {path.relative_to(REPO_ROOT)}")
    print(json.dumps({"compiled": str(path.relative_to(REPO_ROOT)),
                      "canon_entries": n, "leads": nl, "type": ptype}, indent=2))
    return 0


def cmd_compile_batch(args) -> int:
    canon = _load_real_canon()
    results = []
    for slug, display, ptype, terms, related in STANDARD_SET:
        try:
            path, n, nl = compile_page(slug, display, ptype, terms, related, canon)
            results.append({"slug": slug, "type": ptype, "canon_entries": n,
                            "leads": nl, "path": str(path.relative_to(REPO_ROOT))})
        except SystemExit as exc:
            results.append({"slug": slug, "ERROR": str(exc)})
    _rebuild_index(canon)
    n_ok = sum(1 for r in results if "canon_entries" in r)
    _append_log("compile-batch", "standard-set",
                f"{n_ok} pages compiled from {len(canon)} real canon entries")
    print(json.dumps({"pages_compiled": n_ok,
                      "real_canon_entries_scanned": len(canon),
                      "results": results}, indent=2))
    return 0 if n_ok >= 10 else 2


def cmd_list_canon(args) -> int:
    canon = _load_real_canon()
    spec = next((s for s in STANDARD_SET if s[0] == args.entity), None)
    terms = spec[3] if spec else [re.escape(args.entity)]
    hits = _match_entries(canon, terms, limit=args.limit)
    for e in hits:
        print(f"[{e['_lead']}] {e['id']}  {_summarize_item(e, 120)}")
    print(f"\n{len(hits)} entries (showing up to {args.limit})", file=sys.stderr)
    return 0


def main(argv=None) -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    sub = p.add_subparsers(dest="cmd", required=True)

    pc = sub.add_parser("compile", help="compile/recompile ONE page from canon")
    pc.add_argument("entity")
    pc.add_argument("--type", choices=["entity", "concept"])
    pc.set_defaults(func=cmd_compile)

    pb = sub.add_parser("compile-batch", help="compile the standard ≥10-entity set")
    pb.set_defaults(func=cmd_compile_batch)

    pl = sub.add_parser("list-canon", help="show the canon entries an entity compiles from")
    pl.add_argument("entity")
    pl.add_argument("--limit", type=int, default=24)
    pl.set_defaults(func=cmd_list_canon)

    args = p.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
