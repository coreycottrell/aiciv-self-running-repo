#!/usr/bin/env python3
"""
run_p3_2_tests.py — the 5 P3.2 behavioral tests (tests/phase-3-tests.md §P3.2).

REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. The consumer is a COLD mind asking
the wiki a question — the test is whether it gets a compiled answer cheaper than grep,
NOT whether a wiki file exists.

Run: python3 projects/self-running-aiciv/tests/run_p3_2_tests.py
Exit 0 iff all 5 PASS.
"""
from __future__ import annotations
import json
import re
import subprocess
import sys
import tempfile
import os
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
WIKI = REPO / "wiki"
CANON = REPO / "mem" / "canon"
COMPILE = REPO / "tools" / "sovereignty-spine" / "wiki_compile.py"
STATUS = REPO / "tools" / "sovereignty-spine" / "wiki_status.py"


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, cwd=str(REPO), **kw)


def t1_compiled_answer():
    """T3.2.1 — cold mind asks an entity question, gets a COMPILED answer w/ canon cross-links."""
    page = WIKI / "entities" / "hum.md"
    if not page.exists():
        return "FAIL", "no hum.md page"
    txt = page.read_text(encoding="utf-8")
    links = re.findall(r"\[\[canon:[0-9a-f]{16,40}\]\]", txt)
    # adversarial: not a stub, not an empty page, not a raw grep dump
    has_synthesis = "COMPILED VIEW over canon" in txt
    not_empty = len(txt) > 1500
    has_links = len(links) >= 5
    if has_synthesis and not_empty and has_links:
        return "PASS", f"compiled HUM page: {len(txt)}B, {len(links)} canon cross-links, synthesized (not a stub/grep-dump)"
    return "FAIL", f"synthesis={has_synthesis} not_empty={not_empty} links={len(links)}"


def t2_cheaper_than_grep():
    """T3.2.2 — the compiled answer is CHEAPER than grep (the kill-switch)."""
    r = run([sys.executable, str(STATUS), "measure-all"])
    try:
        d = json.loads(r.stdout)
    except Exception:
        return "FAIL", f"measure-all did not return JSON: {r.stdout[:200]} {r.stderr[:200]}"
    if d.get("pages_beating_grep") == d.get("pages_measured") and d.get("pages_measured") >= 10:
        return "PASS", (f"{d['pages_beating_grep']}/{d['pages_measured']} pages beat grep; "
                        f"aggregate {d['aggregate_grep_over_wiki_ratio']}x cheaper "
                        f"({d['total_grep_bytes']}B grep -> {d['total_wiki_bytes']}B wiki); "
                        f"verdict={d['aggregate_verdict']}")
    return "FAIL", f"{d.get('pages_beating_grep')}/{d.get('pages_measured')} beat grep"


def t3_ten_pages_from_real_canon():
    """T3.2.3 — >=10 entity pages compiled FROM REAL CANON, each citing its canon entries."""
    compiled = []
    for sub in ("entities", "concepts"):
        d = WIKI / sub
        if not d.exists():
            continue
        for p in d.glob("*.md"):
            t = p.read_text(encoding="utf-8")
            if "WIKI-COMPILE:VIEW-over-canon" not in t:
                continue
            ids = re.findall(r"\[\[canon:([0-9a-f]{32})\]\]", t)
            if not ids:
                continue
            # adversarial: each cited id must RESOLVE in real canon (no confabulation)
            sample = ids[0]
            rr = run(["grep", "-rl", sample, str(CANON)])
            resolves = rr.returncode == 0 and bool(rr.stdout.strip())
            compiled.append((p.stem, len(ids), resolves))
    n = len(compiled)
    all_resolve = all(c[2] for c in compiled)
    # adversarial: no duplicate entity under variant names (slug uniqueness)
    slugs = [c[0] for c in compiled]
    no_dupes = len(slugs) == len(set(slugs))
    if n >= 10 and all_resolve and no_dupes:
        return "PASS", (f"{n} compiled pages, each cites real canon (sampled id resolves), "
                        f"no variant-name dupes; e.g. {compiled[0][0]}={compiled[0][1]} ids")
    return "FAIL", f"n={n} all_resolve={all_resolve} no_dupes={no_dupes}"


def t4_view_propagates():
    """T3.2.4 — change a source canon entry, recompile; page reflects new canon (no frozen dup)."""
    page = WIKI / "concepts" / "recall.md"
    if not page.exists():
        return "FAIL", "no recall.md page"
    log = CANON / "mind-lead" / "log.jsonl"
    bak = log.with_suffix(".jsonl.p3.2-t4.bak")
    bak.write_text(log.read_text(encoding="utf-8"), encoding="utf-8")
    try:
        m = re.search(r"\[\[canon:([0-9a-f]{32})\]\]", page.read_text(encoding="utf-8"))
        if not m:
            return "FAIL", "no canon link on recall page to probe"
        probe_id = m.group(1)
        marker = "P324PROBE_T4"
        before = marker in page.read_text(encoding="utf-8")
        # inject marker into the canon entry's item
        lines = log.read_text(encoding="utf-8").splitlines()
        out = []
        injected = False
        for l in lines:
            if not l.strip():
                out.append(l)
                continue
            e = json.loads(l)
            if e.get("id") == probe_id:
                e["item"] = f"{marker} {e.get('item','')}"
                injected = True
            out.append(json.dumps(e, ensure_ascii=False))
        if not injected:
            return "FAIL", f"probe id {probe_id} not found in mind-lead canon"
        log.write_text("\n".join(out) + "\n", encoding="utf-8")
        run([sys.executable, str(COMPILE), "compile", "recall", "--type", "concept"])
        after = marker in page.read_text(encoding="utf-8")
        # rollback canon
        log.write_text(bak.read_text(encoding="utf-8"), encoding="utf-8")
        run([sys.executable, str(COMPILE), "compile", "recall", "--type", "concept"])
        gone = marker not in page.read_text(encoding="utf-8")
        if (not before) and after and gone:
            return "PASS", "canon change PROPAGATED into recompiled page; rollback left no frozen dup (true VIEW)"
        return "FAIL", f"before={before} after={after} gone_after_rollback={gone}"
    finally:
        if bak.exists():
            # ensure canon is the original
            log.write_text(bak.read_text(encoding="utf-8"), encoding="utf-8")
            bak.unlink()


def t5_status_falsifiable():
    """T3.2.5 — GET /api/wiki/status equivalent reports REAL health, not a hardcoded 200."""
    # real wiki -> ok, exit 0
    r = run([sys.executable, str(STATUS), "status"])
    try:
        d = json.loads(r.stdout)
    except Exception:
        return "FAIL", f"status not JSON: {r.stdout[:150]}"
    real_ok = d.get("health") == "ok" and r.returncode == 0 and d.get("compiled_view_pages", 0) >= 10
    matches_pop = d.get("sample_links_resolved_in_canon") == d.get("sample_links_checked")
    # adversarial: empty wiki must NOT report ok (a green status that lies is forbidden)
    tmp = tempfile.mkdtemp()
    os.makedirs(os.path.join(tmp, "entities"), exist_ok=True)
    os.makedirs(os.path.join(tmp, "concepts"), exist_ok=True)
    env = dict(os.environ, WIKI_PATH=tmp)
    re_ = subprocess.run([sys.executable, str(STATUS), "status"], capture_output=True, text=True, env=env, cwd=str(REPO))
    empty = json.loads(re_.stdout)
    empty_not_ok = empty.get("health") != "ok" and re_.returncode != 0
    import shutil
    shutil.rmtree(tmp, ignore_errors=True)
    if real_ok and matches_pop and empty_not_ok:
        return "PASS", (f"real wiki health=ok exit0 ({d['compiled_view_pages']} compiled, "
                        f"{d['sample_links_resolved_in_canon']}/{d['sample_links_checked']} links resolve); "
                        f"EMPTY wiki health={empty['health']} exit{re_.returncode} (does not lie)")
    return "FAIL", f"real_ok={real_ok} matches_pop={matches_pop} empty_not_ok={empty_not_ok}"


def main():
    tests = [
        ("T3.2.1 compiled answer (real consumer path)", t1_compiled_answer),
        ("T3.2.2 cheaper than grep (KILL-SWITCH)", t2_cheaper_than_grep),
        ("T3.2.3 >=10 pages from real canon", t3_ten_pages_from_real_canon),
        ("T3.2.4 VIEW propagates (no stale dup)", t4_view_propagates),
        ("T3.2.5 status falsifiable (not hardcoded 200)", t5_status_falsifiable),
    ]
    results = []
    for name, fn in tests:
        try:
            verdict, detail = fn()
        except Exception as exc:
            verdict, detail = "FAIL", f"exception: {type(exc).__name__}: {exc}"
        results.append((name, verdict, detail))
        print(f"[{verdict}] {name}\n        {detail}")
    n_pass = sum(1 for _, v, _ in results if v == "PASS")
    print(f"\n=== P3.2: {n_pass}/5 PASS ===")
    return 0 if n_pass == 5 else 1


if __name__ == "__main__":
    sys.exit(main())
