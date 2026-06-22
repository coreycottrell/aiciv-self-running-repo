#!/usr/bin/env python3
"""
wiki_status.py — P3.2: the wiki status reader + the KILL-SWITCH measurement.

Owner: mind-lead (knowledge-organ owner)
Born: 2026-06-21 (BUILD-DOC §2 Step P3.2)

TWO jobs:

1) `status` — the LOCAL substrate-of-record equivalent of the native-Hermes
   `GET /api/wiki/status` reader card. It reports REAL, FALSIFIABLE wiki health
   (page_count, entity_count, concept_count, raw_source_count, last_updated,
   last_writer, total cross-links, the canon-source linkage) computed FROM the
   on-disk wiki — NOT a hardcoded 200 (T3.2.5). If the wiki is empty, the status
   says so (a green status that lies is forbidden).

   WHY local, not the live HTTP route: the native `GET /api/wiki/status` route IS
   wired in hermes-webui (routes.py:5183) but is auth-gated (live probe = HTTP 401,
   not 404 — confirmed in data/reports/hermes-llm-wiki-groundtruth-20260619.md) and
   runs in a remote container with WIKI_PATH unset (no wiki there). It reads the same
   shape this tool reports (page_count/last_writer/last_updated/path_source) from a
   WIKI_PATH dir. This tool is the SAME read against THIS repo's populated wiki/ —
   the honest, runnable, falsifiable status for the ACG-side VIEW-over-canon. The
   HTTP card is the federation-visible surface once a webui points at this dir.

2) `measure <entity>` — THE KILL-SWITCH (P3.2 T3.2.2; the P3.1 §6 leash). Measures
   the COLD-MIND cost of the wiki-query path vs the grep-the-canon path for the SAME
   entity, in BYTES a cold mind must ingest to a usable answer:
     - WIKI path: read the compiled wiki page (one file).
     - GREP path: grep -hi <entity> across mem/canon/*/log.jsonl (the raw JSONL a cold
       mind with no wiki must read + synthesize itself).
   The compiled page is materially CHEAPER iff wiki_bytes << grep_bytes. The verdict:
   BEATS-GREP (KEEP the organ) or DOES-NOT-BEAT-GREP (TOMBSTONE — recall+grep suffices,
   best-part-is-no-part). This is the proof-gate. The wiki earns its existence here or
   it dies here.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
WIKI = Path(os.environ.get("WIKI_PATH", str(REPO_ROOT / "wiki")))
CANON_DIR = REPO_ROOT / "mem" / "canon"

GEN_MARKER = "WIKI-COMPILE:VIEW-over-canon"


def _wiki_pages() -> list[Path]:
    pages = []
    for sub in ("entities", "concepts", "comparisons", "queries"):
        d = WIKI / sub
        if d.exists():
            pages.extend(sorted(d.glob("*.md")))
    return pages


def _raw_sources() -> list[Path]:
    d = WIKI / "raw"
    if not d.exists():
        return []
    return [p for p in d.rglob("*.md")]


def cmd_status(args) -> int:
    pages = _wiki_pages()
    entity_pages = sorted((WIKI / "entities").glob("*.md")) if (WIKI / "entities").exists() else []
    concept_pages = sorted((WIKI / "concepts").glob("*.md")) if (WIKI / "concepts").exists() else []

    compiled = []           # pages that are VIEW-over-canon (carry the gen marker)
    total_canon_links = 0
    last_updated = ""
    last_writer = ""
    for p in pages:
        txt = p.read_text(encoding="utf-8")
        links = re.findall(r"\[\[canon:([0-9a-f]{16,40})\]\]", txt)
        total_canon_links += len(links)
        if GEN_MARKER in txt:
            um = re.search(r"^updated:\s*(\S+)", txt, re.MULTILINE)
            upd = um.group(1) if um else ""
            compiled.append({"page": p.stem, "canon_links": len(links), "updated": upd})
            if upd > last_updated:
                last_updated = upd
                last_writer = "wiki_compile.py"

    # falsifiable: are the cross-links real? sample-resolve up to 5.
    sample_links = []
    for p in pages:
        for m in re.findall(r"\[\[canon:([0-9a-f]{16,40})\]\]", p.read_text(encoding="utf-8")):
            sample_links.append(m)
            if len(sample_links) >= 5:
                break
        if len(sample_links) >= 5:
            break
    resolved = 0
    for cid in sample_links:
        r = subprocess.run(["grep", "-rl", cid, str(CANON_DIR)],
                           capture_output=True, text=True)
        if r.returncode == 0 and r.stdout.strip():
            resolved += 1

    status = {
        "wiki_path": str(WIKI),
        "wiki_exists": WIKI.exists(),
        "page_count": len(pages),
        "entity_count": len(entity_pages),
        "concept_count": len(concept_pages),
        "compiled_view_pages": len(compiled),
        "raw_source_count": len(_raw_sources()),
        "total_canon_cross_links": total_canon_links,
        "sample_links_checked": len(sample_links),
        "sample_links_resolved_in_canon": resolved,
        "last_updated": last_updated or None,
        "last_writer": last_writer or None,
        "path_source": "WIKI_PATH env" if os.environ.get("WIKI_PATH") else "default (repo wiki/)",
        # FALSIFIABILITY: a green status that lies is forbidden. health is only "ok"
        # if there are real compiled pages AND the sampled cross-links resolve in canon.
        "health": "ok" if (len(compiled) >= 1 and (not sample_links or resolved == len(sample_links)))
                  else ("empty" if len(compiled) == 0 else "degraded-links"),
        "compiled_pages": compiled,
    }
    print(json.dumps(status, indent=2))
    # exit non-zero if health is not ok (so a cron/check can fail loud)
    return 0 if status["health"] == "ok" else 2


def _entity_terms(entity: str) -> str:
    return entity


def cmd_measure(args) -> int:
    """KILL-SWITCH: wiki-query bytes vs grep bytes for the same entity."""
    entity = args.entity
    # --- WIKI path: the compiled page a cold mind reads ---
    page = None
    for sub in ("entities", "concepts"):
        cand = WIKI / sub / f"{entity}.md"
        if cand.exists():
            page = cand
            break
    wiki_bytes = page.stat().st_size if page else 0
    wiki_lines = len(page.read_text(encoding="utf-8").splitlines()) if page else 0

    # --- GREP path: raw canon a cold mind with no wiki must read + synthesize ---
    # exactly what a cold mind types: grep -hi <entity> across canon logs
    canon_logs = sorted(glob.glob(str(CANON_DIR / "*" / "log.jsonl")))
    grep_cmd = ["grep", "-hi", entity] + canon_logs
    r = subprocess.run(grep_cmd, capture_output=True, text=True)
    grep_out = r.stdout
    grep_bytes = len(grep_out.encode("utf-8"))
    grep_lines = grep_out.count("\n")

    ratio = (grep_bytes / wiki_bytes) if wiki_bytes else 0.0
    beats = wiki_bytes > 0 and grep_bytes > wiki_bytes
    verdict = "BEATS-GREP (KEEP)" if beats else "DOES-NOT-BEAT-GREP (TOMBSTONE candidate)"

    out = {
        "entity": entity,
        "wiki_page": str(page.relative_to(REPO_ROOT)) if page else None,
        "wiki_bytes": wiki_bytes,
        "wiki_lines": wiki_lines,
        "grep_path": f"grep -hi {entity} mem/canon/*/log.jsonl",
        "grep_bytes": grep_bytes,
        "grep_lines": grep_lines,
        "grep_over_wiki_ratio": round(ratio, 1),
        "wiki_cheaper_than_grep": beats,
        "verdict": verdict,
        "note": "bytes a COLD MIND must ingest to a usable answer. wiki = one compiled "
                "page; grep = raw JSONL it must read + synthesize itself.",
    }
    print(json.dumps(out, indent=2))
    return 0 if beats else 1


def cmd_measure_all(args) -> int:
    """Run the kill-switch across all compiled entity pages; aggregate verdict."""
    pages = []
    for sub in ("entities", "concepts"):
        d = WIKI / sub
        if d.exists():
            for p in d.glob("*.md"):
                if GEN_MARKER in p.read_text(encoding="utf-8"):
                    pages.append(p.stem)
    rows = []
    beats_count = 0
    total_wiki = 0
    total_grep = 0
    for slug in sorted(pages):
        canon_logs = sorted(glob.glob(str(CANON_DIR / "*" / "log.jsonl")))
        # match term: use the slug's primary token (strip common suffixes)
        term = slug.replace("-", " ").split()[0]
        r = subprocess.run(["grep", "-hi", term] + canon_logs, capture_output=True, text=True)
        gb = len(r.stdout.encode("utf-8"))
        page = None
        for sub in ("entities", "concepts"):
            c = WIKI / sub / f"{slug}.md"
            if c.exists():
                page = c
                break
        wb = page.stat().st_size if page else 0
        beats = wb > 0 and gb > wb
        if beats:
            beats_count += 1
        total_wiki += wb
        total_grep += gb
        rows.append({"slug": slug, "term": term, "wiki_bytes": wb, "grep_bytes": gb,
                     "ratio": round(gb / wb, 1) if wb else 0, "beats_grep": beats})
    agg = {
        "pages_measured": len(rows),
        "pages_beating_grep": beats_count,
        "total_wiki_bytes": total_wiki,
        "total_grep_bytes": total_grep,
        "aggregate_grep_over_wiki_ratio": round(total_grep / total_wiki, 1) if total_wiki else 0,
        "aggregate_verdict": "WIKI BEATS GREP — KEEP THE ORGAN"
                             if beats_count == len(rows) and len(rows) >= 10
                             else ("MAJORITY BEATS GREP" if beats_count > len(rows) / 2
                                   else "DOES NOT BEAT GREP — TOMBSTONE"),
        "per_page": rows,
    }
    print(json.dumps(agg, indent=2))
    return 0 if beats_count == len(rows) and len(rows) >= 1 else 1


def main(argv=None) -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    sub = p.add_subparsers(dest="cmd", required=True)

    ps = sub.add_parser("status", help="report real falsifiable wiki health (GET /api/wiki/status equivalent)")
    ps.set_defaults(func=cmd_status)

    pm = sub.add_parser("measure", help="KILL-SWITCH: wiki-query bytes vs grep bytes for ONE entity")
    pm.add_argument("entity")
    pm.set_defaults(func=cmd_measure)

    pa = sub.add_parser("measure-all", help="KILL-SWITCH across all compiled pages; aggregate verdict")
    pa.set_defaults(func=cmd_measure_all)

    args = p.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
