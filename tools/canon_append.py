#!/usr/bin/env python3
"""
canon_append.py — SOLE append-only writer to mem/canon/<lead>/log.jsonl.

CHANGELOG:
  2026-06-19 (mind-lead, CONTENT-GATE v1.5 SELFTEST-ALLOWLIST WIDENING — fixes
              the incarnation_runner --self-test RED. Reversible.):
    WHAT changed: _RESERVED_SELFTEST_LEADS frozenset({'_selftest'}) widened to
      frozenset({'_selftest', '_runner_selftest', '_runner_selftest_parent',
      '_runner_selftest_job'}). ONE constant. Nothing else.
    WHY: tools/incarnation_runner.py's run_self_test() seeds three DISTINCT
      leading-'_' leads ('_runner_selftest' + _parent + _job) to exercise
      own/parent/job digest-marker semantics across ST1-ST4. The v1.3
      PREFIX-BYPASS FIX made a leading-'_' lead valid ONLY if enumerated in the
      allowlist — and the runner's three leads were NOT enumerated, so
      _validate_lead REJECTED '_runner_selftest' (exit 2: "leading-'_' is
      RESERVED for selftest (allowlist=['_selftest'])"). The runner --self-test
      went RED (own-eyes traceback observed pre-fix at runner.py:1174). That RED
      was one of the two blockers preventing the M3-org arm of the sovereignty
      head-to-head from running. The runner's own code (lines 65-66) already
      documented + flagged this for an owner-decision; canon_append is mind-lead
      territory, so mind-lead owns the allowlist decision.
    WHY SAFETY IS PRESERVED (the spoof-guard stays TIGHT): we did NOT weaken the
      guard to "any leading-'_'" — that would re-open the v1.3 laundering hole
      (a spoofed '_moon-lead' skipping every gate). The MECHANISM is identical:
      a leading-'_' lead is exempt ONLY if it appears in an explicit, closed,
      hard-coded set. We chose approach (A) — ENUMERATE the runner's legit
      self-test leads — over approach (B) — collapse the runner's three leads to
      '_selftest' — because (B) would change the runner's three-lead test
      semantics (parent/child/job digest markers) and risk masking a real
      parent/child bug. (A) touches ONE file (canon_append.py, mind-lead's), the
      runner is unchanged, and a spoofed '_moon-lead' (not enumerated) is STILL
      REJECTED. No real VP id starts with '_'; all four members are reserved
      test-only identities.
    BACKUP: tools/canon_append.py.bak.20260619T151737Z
    ROLLBACK: cp tools/canon_append.py.bak.20260619T151737Z tools/canon_append.py
  2026-06-19 (mind-lead, M19.6 FLOOD-CURE CAP-RAISE — gate #3 default 3 -> 8.
              Reversible. Corey-approved M19.6 with HARD condition: reversible +
              changelog.):
    WHAT changed: MAX_PER_RUN default 3 -> 8 (one constant). Nothing else.
      gate #1 content-gate, gate #2 rate-limit, W5 finding-receipt, the window
      (300s), the CLI --max-per-run flag, and every per-call override are
      ALL UNCHANGED.
    WHY: legit multi-canon BG slots (arxiv / regulatory / dreamer) write 3-8
      distinct findings per AUTHORIZED run. Live breaker-state (mem/canon/
      .breaker_state.json) showed real legit batches of 4 (infra-lead) and 5
      (research-lead) tripping the old cap=3 -> exit 2 -> ~13 benign
      task_failed/cycle (work completes, retry goes FINAL, no lost work, but
      noisy). The old "cap=3 >= typical 2-append" assumption (see incarnation_
      runner.py gate-stack note) under-counted real batch size.
    WHY SAFETY IS PRESERVED: the cap protects against the 2026-06-06 RUNAWAY
      flood — a caller dumping DOZENS (10s-100s) of receipt-less entries in
      <1min. 8 is an ORDER OF MAGNITUDE below a real runaway, so the runaway is
      STILL caught hard. Defense-in-depth is intact: gate #2 rate-limit (>=5s
      between appends => max ~60 appends/300s structural ceiling regardless of
      the cap) + gate #1 content-gate (>=80 chars + a RESOLVING receipt per
      entry) + W5 finding-receipt-required. We authorize the legit batch
      (cap 8) while rate-limit + content-gate + window still bound the flood.
      We did NOT disable the breaker; we sized it to the real authorized batch.
    BACKUP: tools/canon_append.py.bak.20260619T092245Z
    ROLLBACK: cp tools/canon_append.py.bak.20260619T092245Z tools/canon_append.py
    CHANGELOG-LINE: logs/memory-emit-seam-changelog.jsonl (this run).
  2026-06-17 (mind-lead SCHEMA / fleet-lead IMPL, CONTENT-GATE v1.4 — closes
              the 3 residual laundering bypasses qa re-attack found against
              v1.3. Reversible.):
    WHAT changed (two NEW rules at the writer; v1.3 gates UNCHANGED):
      (R1+R2) NAMED-RECEIPT rule. v1.3's ANCHOR-OVERLAP gate SKIPPED any
          receipt it couldn't read as text — non-text extensions (.png/.wav)
          AND extensionless paths (data/reports/noext). qa found two
          launderings: rename junk.md -> junk.png (can't grep an image -> skip
          -> junk passed); and an extensionless 'data/reports/noext' (suffix
          not in ANCHOR_TEXT_EXTENSIONS -> skip -> junk passed). FIX: a receipt
          whose content cannot be anchor-grepped (non-text ext OR no ext) is a
          valid witness ONLY IF the CLAIM (lead+item+rationale) explicitly
          NAMES that exact receipt path OR its basename. A legit image/audio
          append names its artifact ('rendered hero at data/blog/hero.png') ->
          PASS; a laundering attempt cites an unnamed 'foo.png' -> the path
          appears nowhere in the claim -> REJECT. See _claim_names_receipt.
          This closes R1+R2 WITHOUT false-rejecting legit non-text appends
          (they name their artifact by construction).
      (R3) DISTINGUISHING-TOKEN rule. v1.3's >=1-overlap floor counted ANY
          shared anchor — so sprinkling one common word ('harness') into a junk
          receipt cleared the floor. FIX: the satisfying overlap must include
          >=1 DISTINGUISHING token — a path, a hex8+ run, a digit-run(len>=2),
          a lead-id, or a multi-segment specific-named artifact — NOT a lone
          generic dictionary word. See _is_distinguishing_anchor. A claim whose
          ONLY overlap is a common word fails; a real path/id anchor passes.
          This closes R3 WITHOUT false-rejecting honest terse appends (a real
          append almost always shares a path / count / id / lead-id with its
          receipt).
    WHY:
      v1.3 closed "receipt resolves but its text shares zero distinguishing
      tokens." qa re-attacked and found three ways to still launder a junk
      receipt past the gate: (R1) make the receipt un-greppable by giving it an
      image extension; (R2) make it un-greppable by removing the extension
      entirely; (R3) defeat the >=1-overlap floor with a single generic word.
      All three exploit the same seam: the gate either skipped (R1/R2) or
      accepted too-cheap evidence (R3). v1.4 names what a witness must be: if we
      can read it, it must share an identity-specific token with the claim; if
      we cannot read it, the claim must name it. Gated at the writer (mechanism
      gate, not caller discipline).
    NOT BUILT THIS RUN: standard #3 — the LLM SEMANTIC-SUPPORT judge (a
      non-author incarnation reads receipt + claim and rules whether the
      content semantically supports the specific delta). That is the documented
      robust layer for cases mechanics still cannot catch (e.g. a receipt that
      shares a path token but whose prose contradicts the claim). It is the
      explicit follow-on, intentionally deferred — mechanics first, semantics
      as the graded second pass per provisional-skill-lifecycle.
    FALSE-REJECT GUARD (how legit appends still PASS):
      - image/audio append names its .png/.wav in the claim          -> R1/R2 PASS
      - text append whose content shares a real path / hex8 / digit
        count / lead-id with the claim                               -> R3 PASS
      - empty-anchor claim (no distinguishing tokens at all)         -> PASS (v1.3)
      - non-path / opaque-token receipts (tgim_task_id, audit_ref)   -> never enter this gate
    BACKUP: tools/canon_append.py.bak.20260617T220214Z
    ROLLBACK: cp tools/canon_append.py.bak.20260617T220214Z tools/canon_append.py
    SAFETY: write-path semantics for honest callers UNCHANGED. The two new
            rules are ADDITIVE refinements of the v1.3 ANCHOR-OVERLAP gate —
            they fire only inside the same path-shaped-receipt-that-resolves
            branch. Empty-anchor case PASSES. bypass_content_gate (selftest)
            skips it. No new required CLI flags.
  2026-06-17 (fleet-lead, CONTENT-GATE v1.3 — IMPL of mind-lead's content-gate
              SPEC; closes the junk-append(c) laundering hole. Reversible.):
    WHAT changed (two structural cures, gated AT THE WRITER):
      (A) ANCHOR-OVERLAP first content-check. A canon_append is a
          witnessed-substrate-delta — the receipt is the WITNESS. "Supports"
          now means the receipt CONTENT contains textual evidence of the
          SPECIFIC delta claimed, not merely that the receipt exists+resolves
          (a grocery list passes exist+resolve). After the v1.1 receipt_path
          RESOLUTION check, for a path-shaped TEXT-extension receipt we build
          claim_anchors from lead+item+rationale (drop <4-char tokens +
          stopwords; KEEP lead-ids, paths, digit-counts of len>=2, and hex8+),
          bounded-read the receipt (256KB head + 256KB tail; fail-loud on read
          error), and if anchors are non-empty AND substring-overlap is ZERO,
          REJECT (exit 2). Threshold is >=1 shared distinguishing token (NOT
          >=2, NOT a ratio) — this kills the laundered grocery-list
          ({moon-lead,47,builds} absent from the receipt) WITHOUT
          false-rejecting terse-but-honest appends. Empty anchors -> PASS
          (safe; never reject for lack of anchors). This is the ANCHOR-OVERLAP
          standard (#2 of three); the SEMANTIC-SUPPORT standard (#3, LLM
          follow-on, non-author graded) is explicitly NOT built here.
      (B) PREFIX-BYPASS FIX. The selftest exemption used a bare leading-'_'
          prefix, which a real-or-spoofed lead like '_moon-lead' could ride
          to skip every gate. New const _RESERVED_SELFTEST_LEADS =
          frozenset({'_selftest'}). _is_selftest_lead now treats a leading-'_'
          id as exempt ONLY if it is in that explicit allowlist (so '_selftest'
          stays exempt; '_moon-lead' is now GATED). _validate_lead additionally
          REJECTS any leading-'_' lead not in the allowlist, so a spoofed
          '_'-prefixed id cannot even be written. No real VP id starts with '_';
          run_self_test (lead='_selftest') is preserved.
    WHY:
      The phantom-receipt cure (v1.1) and empty-receipt cure (v1.2) closed
      "receipt absent / receipt empty / receipt path doesn't resolve." They did
      NOT close "receipt resolves but its CONTENT does not witness the claim" —
      junk-append(c): a real, on-disk, resolving receipt whose text shares ZERO
      distinguishing tokens with the claim (a grocery list cited as evidence for
      "moon-lead sequenced 47 builds"). Zero shared distinguishing tokens = the
      receipt is a PROP, not a WITNESS. AND the '_'-prefix selftest bypass let a
      caller skip the whole gate by naming itself '_<anything>'. Both gated at
      the writer (mechanism gate, not caller discipline).
    BACKUP: tools/canon_append.py.bak.20260617T212006Z
    ROLLBACK: cp tools/canon_append.py.bak.20260617T212006Z tools/canon_append.py
    SAFETY: write-path semantics for honest callers UNCHANGED. ANCHOR-OVERLAP
            only fires for path-shaped TEXT-ext receipts that resolve; binary /
            opaque-token / non-text receipts skip it (can't read them as text).
            Empty-anchor case PASSES. bypass_content_gate (selftest) skips it.
            No new required CLI flags. Additive guards only.
  2026-06-09 (mind-lead, RECALL-FIX v1.2 — recall-fix sprint, validation report
              data/reports/memory-mission-validation-20260609.md):
    WHAT changed:
      (W5) Tightened receipt-path breaker for kind=finding: any falsy /
           whitespace-only / "null" / "None" string in ANY receipt token
           now hard-rejects (exit 2) when kind=finding. Belt-and-suspenders
           over the existing presence check — closes the orphan-receipt
           class even if a caller passes extra={"receipt_path": ""} or the
           literal string "null". A new --finding-strict opt-out exists for
           pathological migration cases (default OFF for everyone).
      (W1) Wired canon_append CLOSED-LOOP with the semsearch index: after
           a SUCCESSFUL append (or PASS promotion), best-effort call into
           `_enqueue_index_update()` which either (a) upserts the single
           new entry directly into the chromadb store at
           data/semsearch/chroma (collection 'aiciv_memory') using the
           SAME ID recipe as build_index_full.py, or (b) logs the (lead,
           line, path) to mem/canon/.index_queue.jsonl for a periodic
           drain by build_index_full.py --incremental. INDEX FAILURE
           NEVER FAILS THE APPEND. The append already succeeded; recall
           drift converges asynchronously via the queue.
    WHY:
      Validation report 2026-06-09 found 20.5% disk-vs-index drift (60
      entries on disk but missing from chroma); tgim-lead at 100% drift
      (9 entries, 0 indexed). Root cause: writes were atomic but NOT
      closed-loop with the recall organ. canon_append owns the write
      gate — closing the loop here is the structural cure (mechanism
      gate, not caller discipline). Mirrors the workflow_memory_emit_gate
      pattern: gate at the mechanism.
    BACKUP: tools/canon_append.py.bak.20260609-recallfix
    ROLLBACK: cp tools/canon_append.py.bak.20260609-recallfix tools/canon_append.py
    SAFETY: write-path semantics UNCHANGED for the existing 11+ callers.
            All recall-fix logic is additive (new guards + a best-effort
            post-append step that swallows its own exceptions).
    ENV TOGGLES (for emergency disable, do not use casually):
      CANON_APPEND_DISABLE_INDEX_LOOP=1   → skip the close-the-loop step
                                            (queue + upsert both); the
                                            queue file is also not written.
      CANON_APPEND_INDEX_QUEUE_ONLY=1     → never attempt direct chroma
                                            upsert; ALWAYS just enqueue.
  2026-06-08 (mind-lead, PHANTOM-RECEIPT-CURE v1.1, Hum-witness catch):
    - Content-gate HARDENED: when the receipt token is `receipt_path` AND
      the value looks like a filesystem path (contains "/" or has an
      extension), it MUST resolve (os.path.exists) — else exit 2. This
      mirrors the citation rule that canon-ids must resolve. Previous gate
      only checked token PRESENCE, not RESOLUTION — 20 canon entries on
      2026-06-07/08 cited reports that never existed on disk.
    - Opaque tokens (tgim_task_id, audit_ref, receipt) preserve presence-
      only semantics (can't synchronously verify remote/event tokens at
      write time).
    - Backup: tools/canon_append.py.bak.20260608T001500Z.
    - Rollback: cp tools/canon_append.py.bak.20260608T001500Z tools/canon_append.py
  2026-06-07 (mind-lead, FLOOD-CURE):
    - Added 3 circuit-breakers gated AT THE WRITER (no caller can bypass):
      content-gate (item+rationale >= 80 chars + receipt token required),
      rate-limit (5s min between appends to same lead),
      max-per-run (3 appends per lead per 300s rolling window).
    - New CLI flags: --receipt-path, --max-per-run, --rate-limit-seconds,
      --run-window-seconds. Exit code 2 on any breaker breach.
    - Breaker state persisted to mem/canon/.breaker_state.json (rolling
      window auto-pruned). Selftest leads ('_*' prefix) EXEMPT to preserve
      --self-test path. Backup at tools/canon_append.py.bak.20260607T181411Z.

Part of the AiCIV-Native Org Phase-1 foundation (SPEC §5: WRITE step of the
memory pipe). Agents NEVER write directly; the incarnation_runner calls this.

Closed enum for `kind`:
    finding | decision | retraction | doctrine-candidate

Behavior (DEFAULT — UNCHANGED, used by incarnation_runner + 11 VPs):
  - Append EXACTLY ONE JSON line per invocation.
  - On append, if log grew +50 lines since the last DIGEST rebuild, write a
    MECHANICAL placeholder DIGEST.md = last-200-lines of the log (one line per
    canon entry, rendered as compact markdown bullets).
    Phase 2 replaces this placeholder with the agentic librarian (Option B).

CLI (default — UNCHANGED):
    python3 tools/canon_append.py --lead <id> --kind <enum> \\
        --item "<short claim>" --rationale "<why it matters>"

Self-test:
    python3 tools/canon_append.py --self-test
    # Appends to mem/canon/_selftest/log.jsonl and verifies the line landed.

────────────────────────────────────────────────────────────────────────────
PROVISIONAL-CANON-UNTIL-AUDIT-PASS (additive, OPT-IN, 2026-05-31)
────────────────────────────────────────────────────────────────────────────

Cures the temporal-ordering K=1 fab class: today, a finding/decision becomes
load-bearing canon BEFORE any audit verdict returns. Tonight's fabricated
"K → 1" entry that propagated into cycle audio + Mum-AM is this exact shape.

Opt-in CLI surface (default-path is UNCHANGED — no caller is forced into
this; existing 11-VP canon writes behave EXACTLY as before):

  Stage a provisional (writes to mem/canon/<lead>/pending.jsonl, NOT log):
    python3 tools/canon_append.py --provisional --lead <id> --kind <enum> \\
        --item "<claim>" --rationale "<why>" \\
        [--ttl-hours <int, default 24>]
    # stdout JSON: { ok: true, provisional: {id, ts, expires_at, ...} }

  List pending provisionals for a lead (auditor surface):
    python3 tools/canon_append.py --list-pending --lead <id>

  Promote a provisional to canonical log.jsonl (audit PASS):
    python3 tools/canon_append.py --promote <provisional_id> --lead <id> \\
        --audit-verdict PASS --audit-ref "<pointer>"
    # On PASS: moves entry from pending.jsonl → log.jsonl with
    #   audit_verdict='PASS' + audit_ref + promoted_at timestamps.
    # On FAIL: moves entry from pending.jsonl → rejected.jsonl (NEVER
    #   reaches log.jsonl). audit_verdict='FAIL' + audit_ref recorded.

Invariants:
  - log.jsonl is STILL the single load-bearing canon file. Only PASSED
    provisionals (or default direct-writes) land there.
  - pending.jsonl + rejected.jsonl are SEPARATE side-files. The DIGEST
    rebuild + read-paths (incarnation_runner) do NOT consult them.
  - Non-load-bearing for any existing caller. Adoption is per-workflow.
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import os
import re
import sys
import uuid
from pathlib import Path

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Resolve repo root from this file's location (tools/ is a child of repo root).
REPO_ROOT = Path(__file__).resolve().parent.parent
MEM_CANON = REPO_ROOT / "mem" / "canon"

# Provisional-canon side-files (additive; default path does NOT touch these).
# Per-lead siblings of log.jsonl. The DIGEST rebuild + the incarnation_runner
# READ step explicitly do NOT consult these — only log.jsonl is load-bearing.
PENDING_FILENAME = "pending.jsonl"
REJECTED_FILENAME = "rejected.jsonl"
DEFAULT_TTL_HOURS = 24
ALLOWED_AUDIT_VERDICTS = frozenset({"PASS", "FAIL"})

ALLOWED_KINDS = frozenset({
    "finding",
    "decision",
    "retraction",
    "doctrine-candidate",
})

# Digest-rebuild trigger: per SPEC §5 ("at +50 lines runtime rebuilds DIGEST.md").
# This is a placeholder threshold per OQ-4; revisit with production data.
DIGEST_TRIGGER_DELTA = 50

# Mechanical placeholder digest target length (Phase 1).
# SPEC §5: DIGEST.md ≤200 lines.
DIGEST_TAIL_LINES = 200

# Restrict lead ids to a safe charset so we cannot path-traverse out of mem/canon.
# Also covers the reserved _selftest lead (leading underscore allowed).
LEAD_ID_PATTERN = re.compile(r"^[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}$")

DIGEST_MARKER_PREFIX = "<!-- canon_append.py digest@"  # used to read back ledger_lines

# ---------------------------------------------------------------------------
# CIRCUIT-BREAKERS (added 2026-06-07 by mind-lead — FLOOD-CURE)
# ---------------------------------------------------------------------------
# Root cause of 2026-06-06 flood: a runaway caller appended dozens of
# undersized / receipt-less entries in <1min, polluting canon with noise the
# DIGEST then promoted. Three structural cures, gated AT THE WRITER so no
# caller (CLI or library) can bypass:
#
#   1. CONTENT GATE: item+rationale total chars must be >= MIN_CONTENT_LEN,
#      AND a receipt_path / audit_ref / receipt token must be present in
#      `extra` (override via --no-content-gate for selftest only).
#      v1.1 (2026-06-08 by mind-lead, Hum-witness catch): when the receipt
#      token is `receipt_path` AND looks like a filesystem path, it MUST
#      RESOLVE (os.path.exists) — mirrors the citation rule that canon-ids
#      must resolve. tgim_task_id / audit_ref / receipt (opaque tokens)
#      preserve presence-only semantics (we can't synchronously verify
#      remote/event tokens at write time).
#   2. RATE LIMIT: minimum RATE_LIMIT_SECONDS between successive appends to
#      the SAME lead.
#   3. MAX-PER-RUN: at most MAX_PER_RUN appends to the same lead inside the
#      rolling RUN_WINDOW_SECONDS.
#
# On any breach: raise CircuitBreakerError → main() exits with code 2.
# State file (rolling-window tracker) lives at mem/canon/.breaker_state.json
# and is keyed by lead. Selftest leads (`_selftest` etc.) are EXEMPT from
# the gates so the test suite keeps working; we explicitly bypass via the
# leading-underscore convention. Real VPs (no leading underscore) are
# always gated.
# ---------------------------------------------------------------------------
MIN_CONTENT_LEN = 80                     # item+rationale total chars (gate #1)
RATE_LIMIT_SECONDS = 5                   # min seconds between appends (gate #2)
# Gate #3 (max-per-run) raised 3 -> 8 on 2026-06-19 (mind-lead, M19.6).
# WHY: legit multi-canon BG slots (arxiv / regulatory / dreamer) write 3-8
# distinct findings per authorized run; live breaker-state observed batches of
# 4 (infra-lead) and 5 (research-lead) tripping the old cap=3 -> exit 2 ->
# 13 benign task_failed/cycle. A TRUE runaway (the 2026-06-06 flood) is 10s-100s
# of appends in <1min — an ORDER OF MAGNITUDE above 8 — so the runaway is STILL
# caught hard. The other gates are UNCHANGED and continue to bound spam: gate #2
# rate-limit (>=5s between appends, so <=60 appends/300s is the ceiling) + gate
# #1 content-gate (>=80 chars + a resolving receipt per entry) + W5
# finding-receipt-required. cap=8 authorizes the legit batch; rate-limit +
# content-gate + window still catch the flood. CLI --max-per-run / the per-call
# override are unchanged for callers needing tighter bounds.
MAX_PER_RUN = 8                          # max appends per rolling window (gate #3)
RUN_WINDOW_SECONDS = 300                 # rolling window for max-per-run (5min)
BREAKER_STATE_PATH = MEM_CANON / ".breaker_state.json"
RECEIPT_TOKENS = ("receipt_path", "audit_ref", "receipt", "tgim_task_id")


class CircuitBreakerError(Exception):
    """Raised when a write violates a flood-protection gate."""

    def __init__(self, gate: str, detail: str) -> None:
        super().__init__(f"circuit-breaker [{gate}]: {detail}")
        self.gate = gate
        self.detail = detail


# ---------------------------------------------------------------------------
# ANCHOR-OVERLAP content-check (added 2026-06-17 by fleet-lead — CONTENT-GATE v1.3)
# ---------------------------------------------------------------------------
# SPEC (mind-lead): a canon_append is a witnessed-substrate-delta; the receipt
# is the WITNESS. "Supports" = the receipt CONTENT contains textual evidence of
# the SPECIFIC delta claimed — not just that the receipt exists+resolves (a
# grocery list passes exist+resolve). Three escalating standards:
#   (1) EXISTS+RESOLVES   — have it; necessary but INSUFFICIENT (v1.1/v1.2).
#   (2) ANCHOR-OVERLAP    — THIS gate: >=1 shared distinguishing token between
#                           the claim and the receipt content.
#   (3) SEMANTIC-SUPPORT  — LLM follow-on / audit path / non-author graded.
#                           NOT built here (explicit follow-on per SPEC).
# Zero shared distinguishing tokens between claim and receipt = the receipt is
# a PROP, not a WITNESS -> reject.

# Bounded-read budget per side (head + tail). 256KB each keeps memory + latency
# small while still witnessing the relevant region of a large receipt.
ANCHOR_READ_BUDGET_BYTES = 256 * 1024

# Text-shaped receipt extensions ANCHOR-OVERLAP applies to. Binary / non-text
# receipts (images, archives, pdfs read as bytes) are skipped — we cannot read
# them as text to witness against, so we do not reject on their account.
ANCHOR_TEXT_EXTENSIONS = frozenset({
    ".md", ".txt", ".json", ".jsonl", ".yaml", ".yml", ".csv", ".tsv",
    ".log", ".py", ".js", ".ts", ".sh", ".html", ".htm", ".xml", ".toml",
    ".ini", ".cfg", ".rst", ".tex", ".gd", ".tscn", ".tres", ".godot",
})

# Stopwords dropped from anchor extraction — common English + canon-glue words
# that carry no distinguishing power. Kept deliberately small; the >=4-char
# floor already removes most noise.
_ANCHOR_STOPWORDS = frozenset({
    "the", "and", "for", "with", "that", "this", "from", "into", "over",
    "under", "then", "than", "when", "what", "which", "were", "will", "would",
    "have", "has", "had", "not", "but", "are", "was", "its", "their", "them",
    "they", "our", "out", "per", "via", "now", "new", "all", "any", "one",
    "two", "via", "must", "need", "needs", "should", "could", "been", "being",
    "more", "less", "each", "some", "such", "very", "only", "also", "after",
    "before", "because", "between", "across", "about", "where", "while",
    "canon", "append", "rationale", "item", "lead",
})

# Token splitter: keep alnum, dot, slash, hyphen, underscore (so paths +
# lead-ids + hex survive as single tokens); split on everything else.
_ANCHOR_TOKEN_SPLIT = re.compile(r"[^A-Za-z0-9_./\-]+")
# A pure-hex run of 8+ chars (e.g. a commit sha8) is always distinguishing.
_HEX8_RE = re.compile(r"^[0-9a-fA-F]{8,}$")
# A digit-count token (e.g. "47", "55") — short but distinguishing per SPEC.
_DIGITS_RE = re.compile(r"^\d{2,}$")


def _looks_like_lead_id(tok: str) -> bool:
    """A lead-id-shaped token (e.g. 'moon-lead', 'web-lead'). Always kept."""
    return tok.endswith("-lead") and len(tok) > 5


def _looks_like_path(tok: str) -> bool:
    """A path-shaped token (contains '/' or a known file extension). Kept."""
    if "/" in tok:
        return True
    # ends in a dotted extension component, e.g. 'foo.md', 'report.jsonl'
    tail = tok.rsplit("/", 1)[-1]
    return "." in tail and not tail.startswith(".") and len(tail.rsplit(".", 1)[-1]) <= 6


# 2026-06-17 CONTENT-GATE v1.4 (mind-lead SCHEMA / fleet-lead IMPL) —
# DISTINGUISHING-TOKEN classifier (closes R3: single-generic-token floor).
# An anchor is DISTINGUISHING if it carries identity-specific signal that a
# laundering attempt could not cheaply sprinkle into a junk receipt:
#   - a path  (contains '/' or a file-extension tail)            -> _looks_like_path
#   - a hex8+ run (commit sha, uuid fragment)                    -> _HEX8_RE
#   - a digit-run of len>=2 (a count like '47', a date '2026')   -> _DIGITS_RE
#   - a lead-id ('moon-lead')                                    -> _looks_like_lead_id
#   - a multi-segment specific-named artifact: a token joined by
#     '-', '_', or '.' into >=2 non-trivial segments (e.g.
#     'mneme-awakening', 'canon_append', 'r13_ratification') — a
#     compound name is far harder to sprinkle by accident than a lone
#     dictionary word.
# A LONE generic dictionary word ('harness', 'builds', 'sequenced') is NOT
# distinguishing — that is exactly the R3 laundering shape.
_MULTISEG_SPLIT = re.compile(r"[-_.]")


def _is_multiseg_named_artifact(tok: str) -> bool:
    """True for compound named artifacts joined by '-', '_', or '.'.

    Requires >=2 segments each >=2 chars (so 'a-b' counts but 'x-' or a
    trailing-dot artifact does not). A multi-segment specific name is
    distinguishing; a lone dictionary word is not.
    """
    segs = [s for s in _MULTISEG_SPLIT.split(tok) if len(s) >= 2]
    return len(segs) >= 2


def _is_distinguishing_anchor(tok: str) -> bool:
    """True if the (lowercased) token carries identity-specific signal.

    See the v1.4 block above. A lone generic dictionary word returns False.
    """
    if not tok:
        return False
    if _looks_like_path(tok):
        return True
    if _HEX8_RE.match(tok):
        return True
    if _DIGITS_RE.match(tok):
        return True
    if _looks_like_lead_id(tok):
        return True
    if _is_multiseg_named_artifact(tok):
        return True
    return False


def _claim_names_receipt(
    lead: str, item: str, rationale: str, rp_path: Path, receipt_path_value
) -> bool:
    """True iff the claim text explicitly NAMES this receipt (R1+R2 cure).

    A non-text / extensionless receipt cannot be anchor-grepped (we can't read
    an image as text to witness against). It is a valid WITNESS only if the
    CLAIM itself names that exact receipt — the full path OR its basename. A
    legit image/audio append says 'rendered hero at data/blog/hero.png'
    (names it); a laundering attempt cites an unnamed 'foo.png' (the path
    appears NOWHERE in lead+item+rationale) -> not named -> REJECT.

    Matching is case-insensitive substring against the raw claim text. We test
    several spellings of the receipt so an honest caller passing a relative,
    absolute, or basename-only reference all PASS:
      - the exact value the caller passed (receipt_path_value)
      - the resolved absolute path
      - the path as-given (rp_path posix form)
      - the basename alone (e.g. 'hero.png')
    """
    claim = f"{lead} {item} {rationale}".lower()
    candidates: set[str] = set()
    try:
        if receipt_path_value:
            candidates.add(str(receipt_path_value).strip().lower())
    except Exception:
        pass
    try:
        candidates.add(rp_path.as_posix().lower())
    except Exception:
        pass
    try:
        candidates.add(str(rp_path).lower())
    except Exception:
        pass
    # basename — the minimal honest naming ('hero.png')
    base = rp_path.name.lower()
    if base:
        candidates.add(base)
    for cand in candidates:
        if cand and cand in claim:
            return True
    return False


def _extract_claim_anchors(lead: str, item: str, rationale: str) -> set[str]:
    """Build the set of distinguishing claim-anchor tokens.

    Per SPEC: drop tokens <4 chars AND stopwords; but KEEP regardless of those
    floors: lead-ids, path-shaped tokens, hex8+ runs, and digit-counts of
    len>=2. Tokens are lowercased for case-insensitive substring matching
    against the receipt (hex + digit tokens are unaffected by case).
    """
    anchors: set[str] = set()
    raw = f"{lead} {item} {rationale}"
    for tok in _ANCHOR_TOKEN_SPLIT.split(raw):
        if not tok:
            continue
        low = tok.lower()
        # ALWAYS-KEEP classes (override the <4-char + stopword floors):
        if _looks_like_lead_id(low):
            anchors.add(low)
            continue
        if _looks_like_path(low):
            anchors.add(low)
            continue
        if _HEX8_RE.match(tok):
            anchors.add(low)
            continue
        if _DIGITS_RE.match(tok):
            anchors.add(low)  # digit-count, len>=2
            continue
        # DROP classes:
        if len(low) < 4:
            continue
        if low in _ANCHOR_STOPWORDS:
            continue
        anchors.add(low)
    return anchors


def _bounded_read_text(path: Path) -> str:
    """Read head + tail of a file within ANCHOR_READ_BUDGET_BYTES per side.

    Returns lowercased text for case-insensitive substring matching. Raises
    OSError on read failure (caller fail-loud per SPEC).
    """
    size = path.stat().st_size
    with path.open("rb") as fh:
        if size <= 2 * ANCHOR_READ_BUDGET_BYTES:
            data = fh.read()
        else:
            head = fh.read(ANCHOR_READ_BUDGET_BYTES)
            fh.seek(size - ANCHOR_READ_BUDGET_BYTES)
            tail = fh.read(ANCHOR_READ_BUDGET_BYTES)
            data = head + b"\n" + tail
    return data.decode("utf-8", errors="replace").lower()


def _overlapping_anchors(anchors: set[str], receipt_text_lower: str) -> set[str]:
    """Return the subset of claim-anchors that appear in the receipt text."""
    return {a for a in anchors if a and a in receipt_text_lower}


def _check_anchor_overlap(
    lead: str, item: str, rationale: str, receipt_path_value, rp_path: Path
) -> None:
    """ANCHOR-OVERLAP gate (standard #2). Raise CircuitBreakerError on failure.

    v1.4 (2026-06-17, mind-lead SCHEMA / fleet-lead IMPL) closes 3 residual
    laundering bypasses qa re-attack found against v1.3:

      R1 NON-TEXT skip  — renaming junk receipt .md -> .png made the gate SKIP
                          (can't grep an image). FIX: non-text receipts no
                          longer skip silently. A receipt whose content can't
                          be anchor-grepped is a valid witness ONLY IF the
                          CLAIM explicitly NAMES that exact receipt path / its
                          basename (see _claim_names_receipt). Else REJECT.
      R2 EXTENSIONLESS  — 'data/reports/noext' resolves but suffix not in
                          ANCHOR_TEXT_EXTENSIONS -> skipped. Same FIX as R1:
                          an extensionless (un-greppable) receipt must be
                          NAMED in the claim, else REJECT.
      R3 SINGLE-GENERIC — sprinkling one common word ('harness') into a junk
                          receipt cleared the >=1-overlap floor. FIX: the
                          satisfying overlap must include >=1 DISTINGUISHING
                          token (path / hex8+ / digit-run>=2 / lead-id /
                          multi-segment named artifact), NOT a lone generic
                          dictionary word (see _is_distinguishing_anchor).

    CONSERVATIVE + FAIL-LOUD: each reject names exactly what was checked.
    FALSE-REJECT GUARD: a legit image/audio append NAMES its artifact
    ('rendered hero at data/blog/hero.png') -> R1/R2 PASS; a legit text append
    with a real path/id anchor in its content -> R3 PASS (paths/ids are
    distinguishing). Only fires for path-shaped receipts that resolve (caller
    has already done v1.1 RESOLUTION). Empty anchors -> PASS.
    """
    ext = rp_path.suffix.lower()

    # ---- R1 + R2: NON-TEXT / EXTENSIONLESS receipts must be NAMED ----
    # A receipt we cannot read as text (non-text extension OR no extension at
    # all) cannot be anchor-grepped. v1.3 SKIPPED these — that was the hole.
    # v1.4: such a receipt is a valid witness ONLY IF the claim names it.
    if ext not in ANCHOR_TEXT_EXTENSIONS:
        if _claim_names_receipt(
            lead, item, rationale, rp_path, receipt_path_value
        ):
            # The claim explicitly names this artifact — a legit image/audio
            # append ('rendered hero at data/blog/hero.png'). PASS.
            return
        kind_label = "extensionless" if ext == "" else f"non-text ({ext})"
        raise CircuitBreakerError(
            "named-receipt",
            f"receipt_path={receipt_path_value!r} is a {kind_label} receipt "
            f"whose content cannot be anchor-grepped, AND the claim "
            f"(lead+item+rationale) does NOT name this receipt path or its "
            f"basename ({rp_path.name!r}); an un-greppable witness must be "
            "explicitly NAMED in the claim to count as evidence — a legit "
            "image/audio append names its artifact, a laundering attempt does "
            "not (content-gate v1.4, NAMED-RECEIPT rule, closes R1+R2)",
        )

    # ---- Text-extension receipt: ANCHOR-OVERLAP + DISTINGUISHING-TOKEN ----
    anchors = _extract_claim_anchors(lead, item, rationale)
    if not anchors:
        # No distinguishing tokens to check against — PASS (safe).
        return

    try:
        receipt_text = _bounded_read_text(rp_path)
    except OSError as exc:
        # Fail-loud: a path-shaped text receipt we were told exists but cannot
        # read is not a witness. Reject rather than silently pass.
        raise CircuitBreakerError(
            "anchor-overlap",
            f"receipt_path={receipt_path_value!r} resolved but could not be "
            f"read ({type(exc).__name__}: {exc}); a witness must be readable "
            "(content-gate v1.4)",
        )

    overlap = _overlapping_anchors(anchors, receipt_text)
    if not overlap:
        # Zero shared tokens = the receipt is a PROP, not a WITNESS. This is
        # the junk-append(c) laundering shape (v1.3 ANCHOR-OVERLAP).
        sample = sorted(anchors)[:8]
        raise CircuitBreakerError(
            "anchor-overlap",
            f"receipt_path={receipt_path_value!r} resolves but its content "
            f"shares ZERO tokens with the claim (checked "
            f"{len(anchors)} anchors, e.g. {sample}); the receipt does not "
            "WITNESS the specific delta claimed — it is a prop, not a witness "
            "(content-gate v1.4, ANCHOR-OVERLAP)",
        )

    # ---- R3: the overlap must include >=1 DISTINGUISHING token ----
    # A lone generic dictionary word ('harness') is trivial to sprinkle into a
    # junk receipt and is NOT evidence the receipt witnesses the SPECIFIC
    # delta. Require the satisfying overlap to contain a path / hex8+ /
    # digit-run>=2 / lead-id / multi-segment named artifact.
    distinguishing = {a for a in overlap if _is_distinguishing_anchor(a)}
    if not distinguishing:
        generic_sample = sorted(overlap)[:8]
        raise CircuitBreakerError(
            "distinguishing-token",
            f"receipt_path={receipt_path_value!r} overlaps the claim ONLY on "
            f"generic dictionary word(s) {generic_sample} — none is a "
            "DISTINGUISHING token (path / hex8+ / digit-run>=2 / lead-id / "
            "multi-segment named artifact). A lone common word is trivial to "
            "sprinkle into a junk receipt and does not witness the SPECIFIC "
            "delta claimed; the claim must share at least one identity-"
            "specific anchor with the receipt (content-gate v1.4, "
            "DISTINGUISHING-TOKEN, closes R3)",
        )


# 2026-06-17 CONTENT-GATE v1.3 (fleet-lead) — PREFIX-BYPASS FIX.
# The selftest exemption used a bare leading-'_' prefix. A real-or-spoofed
# lead like '_moon-lead' could ride that prefix to skip EVERY gate. The
# exemption is now an EXPLICIT allowlist — only sanctioned selftest leads are
# exempt; any other '_'-prefixed id is gated (and rejected outright by
# _validate_lead).
#
# 2026-06-19 CONTENT-GATE v1.5 (mind-lead) — SELFTEST-ALLOWLIST WIDENING.
#   The spoof-guard MECHANISM is UNCHANGED: a leading-'_' lead is exempt ONLY
#   if it is in this explicit, closed, hard-coded set — NOT by bare-prefix
#   match. We do NOT re-open the v1.3 hole. We only ENUMERATE the three
#   additional LEGITIMATE self-test leads that tools/incarnation_runner.py's
#   run_self_test() seeds ('_runner_selftest', '_runner_selftest_parent',
#   '_runner_selftest_job' — the runner deliberately uses three distinct leads
#   to exercise own/parent/job digest-marker semantics in ST1-ST4). Before this
#   widening the runner --self-test failed RED at _validate_lead ("'_runner_
#   selftest' ... not in allowlist ['_selftest']"), blocking the M3-org arm of
#   the sovereignty head-to-head. A spoofed '_moon-lead' (or any other '_'-id
#   not enumerated here) is STILL rejected — the guard stays tight. No real VP
#   id starts with '_'; every member here is a reserved test-only identity.
#   BACKUP: tools/canon_append.py.bak.20260619T151737Z
#   ROLLBACK: cp tools/canon_append.py.bak.20260619T151737Z tools/canon_append.py
_RESERVED_SELFTEST_LEADS = frozenset({
    "_selftest",
    "_runner_selftest",
    "_runner_selftest_parent",
    "_runner_selftest_job",
})


def _is_selftest_lead(lead: str) -> bool:
    """Selftest leads are an EXPLICIT allowlist (gate-exempt).

    2026-06-17 CONTENT-GATE v1.3: a leading-'_' id is exempt ONLY if it is in
    _RESERVED_SELFTEST_LEADS. '_selftest' stays exempt (preserves run_self_test);
    '_moon-lead' and any other '_'-prefixed id is now GATED, closing the
    prefix-bypass laundering hole. Non-'_' leads are never selftest leads.
    """
    if not lead.startswith("_"):
        return False
    return lead in _RESERVED_SELFTEST_LEADS


# 2026-06-09 RECALL-FIX W5 — what counts as an "empty-shaped" receipt token.
# A receipt token that is None / empty-string / whitespace-only / the literal
# strings "null" or "None" is treated as EMPTY. This closes the orphan class
# where a caller passes extra={"receipt_path": ""} or {"receipt_path": "null"}
# and the existing presence check sees a truthy key but a useless value.
_EMPTY_RECEIPT_SENTINELS = frozenset({"", "null", "none", "nil", "n/a", "na"})


def _is_empty_receipt(value) -> bool:
    """Return True if the value is empty / whitespace / a null-sentinel."""
    if value is None:
        return True
    if not isinstance(value, str):
        # Non-string truthy values (e.g. an int task_id) are NOT empty.
        return False
    return value.strip().lower() in _EMPTY_RECEIPT_SENTINELS


def _load_breaker_state() -> dict:
    if not BREAKER_STATE_PATH.exists():
        return {}
    try:
        return json.loads(BREAKER_STATE_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def _save_breaker_state(state: dict) -> None:
    BREAKER_STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    BREAKER_STATE_PATH.write_text(
        json.dumps(state, ensure_ascii=False, sort_keys=True),
        encoding="utf-8",
    )


def _check_circuit_breakers(
    lead: str,
    item: str,
    rationale: str,
    extra: dict | None,
    *,
    kind: str | None = None,            # 2026-06-09 RECALL-FIX W5: finding-strict
    max_per_run: int = MAX_PER_RUN,
    rate_limit_seconds: int = RATE_LIMIT_SECONDS,
    run_window_seconds: int = RUN_WINDOW_SECONDS,
    bypass_content_gate: bool = False,
) -> None:
    """Raise CircuitBreakerError on any flood-protection violation.

    Exempts selftest leads (leading underscore). Updates the rolling-window
    state file on PASS so subsequent calls see this append.

    2026-06-09 RECALL-FIX W5: when kind=='finding', a NON-EMPTY receipt is
    REQUIRED — see _is_empty_receipt for what counts as empty (None / "" /
    "null" / "None" / whitespace). This belt+suspender check fires
    REGARDLESS of bypass_content_gate (since findings always need grounding).
    """
    if _is_selftest_lead(lead):
        return  # selftest exempt — preserves existing --self-test behavior

    # 2026-06-09 RECALL-FIX W5: hard-block empty receipts on kind=finding.
    # This runs FIRST so it cannot be bypassed by --no-content-gate. The
    # rest of the content-gate (which checks receipt presence among all
    # extra-tokens) still runs below for the other gates.
    if kind == "finding" and not bypass_content_gate:
        ext = extra or {}
        # Find the BEST candidate receipt key — prefer receipt_path, else any
        # receipt token actually present (even if empty — to produce a clear
        # error message). A missing-receipt-token-entirely case is handled
        # by the receipt-presence check below.
        candidate_keys = [tok for tok in RECEIPT_TOKENS if tok in ext]
        if candidate_keys:
            # At least one receipt key was provided; require ANY of them to
            # be non-empty. This is the W5 cure: an empty receipt_path can
            # no longer ride through a finding write.
            non_empty = [
                tok for tok in candidate_keys if not _is_empty_receipt(ext.get(tok))
            ]
            if not non_empty:
                empties = {tok: ext.get(tok) for tok in candidate_keys}
                raise CircuitBreakerError(
                    "finding-receipt-required",
                    f"kind=finding requires a NON-EMPTY receipt; saw only "
                    f"empty/null values: {empties}. Provide a real file path, "
                    f"TGIM task_id, or URL.",
                )

    # Gate #1: content gate
    if not bypass_content_gate:
        total_chars = len((item or "").strip()) + len((rationale or "").strip())
        if total_chars < MIN_CONTENT_LEN:
            raise CircuitBreakerError(
                "content-gate",
                f"item+rationale={total_chars} chars < MIN_CONTENT_LEN={MIN_CONTENT_LEN} "
                f"(undersized entries flood DIGEST with noise)",
            )
        # receipt token must be present in extra
        has_receipt = False
        receipt_path_value = None
        if extra:
            for tok in RECEIPT_TOKENS:
                # 2026-06-09 RECALL-FIX W5: treat empty/null-sentinel as
                # not-present, so the orphan class is closed at the
                # presence check too (not just the finding-strict gate).
                val = extra.get(tok)
                if val and not _is_empty_receipt(val):
                    has_receipt = True
                    if tok == "receipt_path":
                        receipt_path_value = val
                    break
        if not has_receipt:
            raise CircuitBreakerError(
                "content-gate",
                f"missing receipt token in --extra (need one of {RECEIPT_TOKENS}); "
                "every canon write must point at evidence on disk",
            )

        # v1.1 (2026-06-08, Hum-witness phantom-receipt catch):
        # If the receipt is a `receipt_path` AND looks like a filesystem path,
        # it MUST resolve. This closes the look-before-send gap: 20 prior
        # entries (2026-06-07/08 survey + 11-batch) cited reports that did
        # NOT exist on disk — content-gate let them through because it only
        # checked token PRESENCE, not RESOLUTION. Mirrors the citation rule.
        if receipt_path_value:
            rp_str = str(receipt_path_value).strip()
            # Path-shaped heuristic: contains "/" or ends in a file extension.
            # (Opaque tokens like tgim task ids don't match; they take their
            # own non-receipt_path key, so this only fires on actual paths.)
            looks_like_path = (
                "/" in rp_str
                or rp_str.startswith(".")
                or (len(rp_str) >= 3 and "." in rp_str.rsplit("/", 1)[-1])
            )
            if looks_like_path:
                rp_path = Path(rp_str)
                if not rp_path.is_absolute():
                    # Resolve relative to repo root (ACG dir = parent of tools/)
                    rp_path = (Path(__file__).resolve().parent.parent / rp_path)
                if not rp_path.exists():
                    raise CircuitBreakerError(
                        "content-gate",
                        f"receipt_path={receipt_path_value!r} does not resolve "
                        f"on disk (checked: {rp_path}); a path-shaped receipt "
                        "MUST exist before canon append (v1.1 phantom-receipt cure)",
                    )

                # v1.3 (2026-06-17, fleet-lead) — ANCHOR-OVERLAP (standard #2).
                # The receipt now EXISTS+RESOLVES (v1.1). But exist+resolve is
                # insufficient: a grocery list passes that. Require the receipt
                # CONTENT to WITNESS the specific delta claimed — >=1 shared
                # distinguishing token between {lead,item,rationale} and the
                # receipt text. Only fires for path-shaped TEXT-extension
                # receipts (binary/non-text skipped); empty-anchor case PASSES.
                _check_anchor_overlap(
                    lead, item, rationale, receipt_path_value, rp_path
                )

    # Load rolling-window state and prune stale entries
    now_ts = _dt.datetime.now(_dt.timezone.utc).timestamp()
    state = _load_breaker_state()
    history: list[float] = list(state.get(lead, []))
    cutoff = now_ts - run_window_seconds
    history = [t for t in history if t >= cutoff]

    # Gate #2: rate limit (min seconds since last append)
    if history:
        last_ts = max(history)
        delta = now_ts - last_ts
        if delta < rate_limit_seconds:
            raise CircuitBreakerError(
                "rate-limit",
                f"only {delta:.2f}s since last append to lead={lead!r}; "
                f"need >= {rate_limit_seconds}s (FLOOD-CURE)",
            )

    # Gate #3: max-per-run (count in rolling window)
    if len(history) >= max_per_run:
        raise CircuitBreakerError(
            "max-per-run",
            f"lead={lead!r} already had {len(history)} appends in past "
            f"{run_window_seconds}s; cap={max_per_run} (FLOOD-CURE)",
        )

    # PASS — record this append in the rolling window for future calls
    history.append(now_ts)
    state[lead] = history
    _save_breaker_state(state)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _now_iso_utc() -> str:
    """RFC-3339 UTC timestamp, second resolution + 'Z' suffix."""
    return _dt.datetime.now(_dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _validate_lead(lead: str) -> str:
    if not LEAD_ID_PATTERN.match(lead):
        raise ValueError(
            f"invalid --lead {lead!r}: must match {LEAD_ID_PATTERN.pattern}"
        )
    # 2026-06-17 CONTENT-GATE v1.3 (fleet-lead) — PREFIX-BYPASS FIX.
    # Reject any leading-'_' lead that is NOT in the explicit selftest
    # allowlist. The leading-'_' convention is RESERVED for selftest; a real
    # caller must never name itself '_<anything>' to dodge the gates. No real
    # VP id starts with '_'.
    if lead.startswith("_") and lead not in _RESERVED_SELFTEST_LEADS:
        raise ValueError(
            f"invalid --lead {lead!r}: leading-'_' is RESERVED for selftest "
            f"(allowlist={sorted(_RESERVED_SELFTEST_LEADS)}); real leads must "
            "not start with '_' (prefix-bypass cure, content-gate v1.3)"
        )
    return lead


def _validate_kind(kind: str) -> str:
    if kind not in ALLOWED_KINDS:
        raise ValueError(
            f"invalid --kind {kind!r}: allowed = {sorted(ALLOWED_KINDS)}"
        )
    return kind


def _lead_dir(lead: str) -> Path:
    d = MEM_CANON / lead
    d.mkdir(parents=True, exist_ok=True)
    return d


def _log_path(lead: str) -> Path:
    return _lead_dir(lead) / "log.jsonl"


def _digest_path(lead: str) -> Path:
    return _lead_dir(lead) / "DIGEST.md"


def _pending_path(lead: str) -> Path:
    """Per-lead provisional staging file (side-file; NOT load-bearing canon)."""
    return _lead_dir(lead) / PENDING_FILENAME


def _rejected_path(lead: str) -> Path:
    """Per-lead audit-FAILED archive (side-file; NEVER reaches log.jsonl)."""
    return _lead_dir(lead) / REJECTED_FILENAME


def _count_lines(path: Path) -> int:
    if not path.exists():
        return 0
    n = 0
    with path.open("rb") as fh:
        for _ in fh:
            n += 1
    return n


def _read_digest_ledger_lines(digest: Path) -> int:
    """Parse the marker we embed in DIGEST.md so we know when last rebuild was."""
    if not digest.exists():
        return 0
    try:
        with digest.open("r", encoding="utf-8") as fh:
            for line in fh:
                if line.startswith(DIGEST_MARKER_PREFIX):
                    # marker shape: <!-- canon_append.py digest@<lines> at <ts> -->
                    try:
                        chunk = line.split("digest@", 1)[1]
                        n_str = chunk.split(" ", 1)[0]
                        return int(n_str)
                    except (IndexError, ValueError):
                        return 0
    except OSError:
        return 0
    return 0


# ---------------------------------------------------------------------------
# RECALL-FIX W1 (2026-06-09 by mind-lead)
# Closed-loop wiring between canon_append and the semsearch index.
#
# Today (pre-fix): canon_append writes atomically. The semsearch index
# (chromadb at data/semsearch/chroma, collection 'aiciv_memory') is rebuilt
# by a separate process. Result: 20.5% disk-vs-index drift across silos,
# 100% drift for tgim-lead (9 entries, 0 indexed).
#
# Cure: after every successful append, attempt a BEST-EFFORT direct upsert
# into chromadb. On any failure (chromadb missing, store missing, lock,
# transient OS error), fall through to writing the entry-pointer onto a
# queue file at mem/canon/.index_queue.jsonl. A periodic drain step
# (build_index_full.py --incremental) flushes the queue.
#
# NON-NEGOTIABLE: a failure in this step MUST NOT fail the canon append.
# The append already landed. Recall lag is repairable; a refused canon
# write is not.
#
# Same ID recipe as build_index_full.py to ensure idempotent upserts:
#   uid = sha1(f"{path}|{chunk_idx}|{chunk_text_sha1_12}")[:20]
#   where path = "<log_path>#L<line_no>", chunk_idx = 0 (canon entries are
#   short enough that they fit one chunk under MAX_CHUNK_CHARS=1600).
# ---------------------------------------------------------------------------

INDEX_QUEUE_PATH = MEM_CANON / ".index_queue.jsonl"
SEMSEARCH_CHROMA_PATH = REPO_ROOT / "data" / "semsearch" / "chroma"
SEMSEARCH_COLLECTION = "aiciv_memory"
INDEX_CHUNK_MAX_CHARS = 1600  # MUST match build_index_full.py MAX_CHUNK_CHARS


def _entry_to_index_text(entry: dict) -> str:
    """Render a canon entry into the SAME text shape build_index_full.py uses.

    From build_index_full.gather_canon_docs():
      parts = [f"{k}: {v}" for k in ("item","summary","decision","outcome","what",
              "title","claim","delta","note","body","content","rationale") if entry.get(k)]
      text = " | ".join(parts)
    """
    keys = ("item", "summary", "decision", "outcome", "what", "title",
            "claim", "delta", "note", "body", "content", "rationale")
    parts = []
    for k in keys:
        v = entry.get(k)
        if isinstance(v, str) and v.strip():
            parts.append(f"{k}: {v}")
    if not parts:
        # Fallback to a json dump if no keys hit — matches build_index_full
        parts.append(json.dumps(entry)[:1500])
    return " | ".join(parts)


def _entry_index_id(lead: str, line_no: int, text: str) -> str:
    """Reproduce build_index_full.py's content-addressed UID for this entry.

    path  = "<log_path>#L<line_no>"
    uid   = sha1(f"{path}|{chunk_idx}|{chunk_text_sha1_12}")[:20]
    For short canon entries chunk_idx is always 0.
    """
    import hashlib as _hl
    log_path = str(_log_path(lead))
    path_with_line = f"{log_path}#L{line_no}"
    chunk_text_hash = _hl.sha1(
        text.encode("utf-8", errors="replace")
    ).hexdigest()[:12]
    return _hl.sha1(
        f"{path_with_line}|0|{chunk_text_hash}".encode()
    ).hexdigest()[:20]


def _append_to_index_queue(payload: dict) -> None:
    """Best-effort append to the index drain queue. Swallows its own errors."""
    try:
        INDEX_QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)
        line = json.dumps(payload, ensure_ascii=False, sort_keys=True) + "\n"
        with INDEX_QUEUE_PATH.open("a", encoding="utf-8") as fh:
            fh.write(line)
            fh.flush()
    except OSError:
        # Queue write failed; nothing more we can do without escalating to
        # the caller — but the canon append already succeeded, so we
        # silently absorb. The next full rebuild will catch this entry.
        pass


def _try_direct_chroma_upsert(lead: str, entry: dict, line_no: int) -> tuple[bool, str]:
    """Attempt a single-entry upsert into chromadb. Return (ok, detail).

    Never raises. On any failure returns (False, reason) so the caller can
    fall back to the queue.
    """
    if not SEMSEARCH_CHROMA_PATH.exists():
        return False, "chroma_path_missing"
    try:
        import chromadb  # type: ignore
        from chromadb.utils import embedding_functions  # type: ignore
    except Exception as exc:  # pragma: no cover — defensive
        return False, f"chromadb_import_failed:{type(exc).__name__}"

    try:
        text = _entry_to_index_text(entry)
        if len(text) < 80:
            # build_index_full.py chunk_text() drops chunks <80 chars.
            # Don't try to upsert; queue it so the next full rebuild can
            # handle it consistently if the rule changes.
            return False, "text_too_short_for_index_recipe"
        # Canon entries are short — one chunk suffices, but truncate to be safe.
        chunk = text[:INDEX_CHUNK_MAX_CHARS]
        uid = _entry_index_id(lead, line_no, chunk)
        ef = embedding_functions.DefaultEmbeddingFunction()
        client = chromadb.PersistentClient(path=str(SEMSEARCH_CHROMA_PATH))
        try:
            col = client.get_collection(SEMSEARCH_COLLECTION, embedding_function=ef)
        except Exception as exc:
            return False, f"collection_missing:{type(exc).__name__}"
        meta = {
            "source": "canon",
            "vertical": lead,
            "path": f"{_log_path(lead)}#L{line_no}",
            "chunk_idx": 0,
            "chunk_text_sha1_12": uid,  # rough provenance marker
            "upserted_via": "canon_append.py:recall-fix-v1.2",
            "ts": entry.get("ts", ""),
            "kind": entry.get("kind", ""),
            "entry_id": entry.get("id", ""),
        }
        col.upsert(ids=[uid], documents=[chunk], metadatas=[meta])
        return True, f"upserted uid={uid}"
    except Exception as exc:  # pragma: no cover — defensive
        return False, f"upsert_failed:{type(exc).__name__}:{exc}"


def _enqueue_index_update(lead: str, entry: dict) -> dict:
    """Close-the-loop step: try direct upsert, fall back to queue, never fail.

    Honors env toggles:
      CANON_APPEND_DISABLE_INDEX_LOOP=1  → no-op (skip both upsert AND queue)
      CANON_APPEND_INDEX_QUEUE_ONLY=1   → skip direct upsert, just enqueue
    """
    result = {"attempted": True, "upsert_ok": False, "queued": False, "detail": ""}

    if os.environ.get("CANON_APPEND_DISABLE_INDEX_LOOP") == "1":
        result["attempted"] = False
        result["detail"] = "disabled_by_env"
        return result

    # Compute the line number this entry occupies (1-indexed, end of log).
    try:
        line_no = _count_lines(_log_path(lead))
    except Exception:
        line_no = -1

    payload = {
        "ts_enqueued": _now_iso_utc(),
        "lead": lead,
        "log_path": str(_log_path(lead)),
        "line_no": line_no,
        "entry_id": entry.get("id"),
        "kind": entry.get("kind"),
    }

    if os.environ.get("CANON_APPEND_INDEX_QUEUE_ONLY") == "1":
        _append_to_index_queue(payload)
        result["queued"] = True
        result["detail"] = "queue_only_env"
        return result

    ok, detail = _try_direct_chroma_upsert(lead, entry, line_no)
    result["upsert_ok"] = ok
    result["detail"] = detail
    if not ok:
        _append_to_index_queue(payload)
        result["queued"] = True
    return result


# ---------------------------------------------------------------------------


def _maybe_rebuild_digest(lead: str) -> bool:
    """Rebuild MECHANICAL placeholder digest if log grew +DIGEST_TRIGGER_DELTA lines.

    Returns True if a rebuild occurred. Phase 2 swaps this for the agentic
    librarian; the trigger condition stays the same.
    """
    log = _log_path(lead)
    digest = _digest_path(lead)
    current = _count_lines(log)
    previous = _read_digest_ledger_lines(digest)

    # Trigger on first-ever digest too (previous==0 and current>=DIGEST_TRIGGER_DELTA),
    # or any growth beyond the threshold since last rebuild.
    if (current - previous) < DIGEST_TRIGGER_DELTA:
        return False

    # MECHANICAL placeholder: last-DIGEST_TAIL_LINES of the log, one bullet each.
    tail: list[str] = []
    with log.open("r", encoding="utf-8") as fh:
        lines = fh.readlines()
    for raw in lines[-DIGEST_TAIL_LINES:]:
        raw = raw.strip()
        if not raw:
            continue
        try:
            obj = json.loads(raw)
            ts = obj.get("ts", "?")
            kind = obj.get("kind", "?")
            item = obj.get("item", "")
            tail.append(f"- `{ts}` **{kind}** — {item}")
        except json.JSONDecodeError:
            tail.append(f"- (unparsable) {raw[:200]}")

    now = _now_iso_utc()
    marker = f"{DIGEST_MARKER_PREFIX}{current} at {now} -->"
    # FRONTMATTER (2026-06-19 fix): emit the SAME `---`-delimited YAML block the
    # reader requires (incarnation_runner._DIGEST_FRONTMATTER_RE expects
    # `^---\n…\n---\n` with `ledger_lines_at_rebuild:`). The legacy placeholder
    # shipped no frontmatter, so the runtime flagged it "malformed" and could not
    # read its freshness. Adding frontmatter makes EVERY mechanical placeholder
    # reader-valid for ALL leads — system fix, not a per-file patch. The HTML
    # `digest@N` marker is KEPT below the frontmatter because _read_digest_ledger_lines
    # still scans for it. mechanism is honestly labelled mechanical-placeholder so a
    # reader can tell this is the +50-line tail, not an agentic/extractive rebuild.
    log_rel = log.relative_to(REPO_ROOT)
    body = "\n".join([
        "---",
        f"last_rebuilt_at: {now}",
        f"ledger_lines_at_rebuild: {current}",
        f"lead: {lead}",
        f"source_log: {log_rel}",
        "mechanism: mechanical-placeholder",
        f"body_line_cap: {DIGEST_TAIL_LINES}",
        "---",
        "",
        marker,
        "",
        f"# mem/canon/{lead}/DIGEST.md",
        "",
        f"**Mode**: MECHANICAL placeholder (last-{DIGEST_TAIL_LINES} canon lines).",
        "**Replaced by**: Phase-2 agentic librarian (`tools/digest_librarian.py`).",
        f"**Ledger lines at rebuild**: {current}",
        "",
        "## Recent canon",
        "",
        *tail,
        "",
    ])
    digest.write_text(body, encoding="utf-8")
    return True


def append_canon(
    lead: str,
    kind: str,
    item: str,
    rationale: str,
    *,
    writer: str = "canon_append.py",
    extra: dict | None = None,
    max_per_run: int = MAX_PER_RUN,
    rate_limit_seconds: int = RATE_LIMIT_SECONDS,
    run_window_seconds: int = RUN_WINDOW_SECONDS,
    bypass_content_gate: bool = False,
) -> dict:
    """Append exactly one JSON line to mem/canon/<lead>/log.jsonl and return it.

    Raises ValueError on invalid lead/kind/empty fields.
    Raises CircuitBreakerError on flood-cure gate violations (added 2026-06-07).
    """
    lead = _validate_lead(lead)
    kind = _validate_kind(kind)
    if not item or not item.strip():
        raise ValueError("--item must be a non-empty string")
    if not rationale or not rationale.strip():
        raise ValueError("--rationale must be a non-empty string")

    # FLOOD-CURE (2026-06-07): structural gate AT THE WRITER. No CLI/library
    # caller can bypass — selftest leads are exempt by leading-underscore.
    # 2026-06-09 RECALL-FIX W5: thread `kind` into the breaker so kind=finding
    # gets the strict-non-empty-receipt check.
    _check_circuit_breakers(
        lead, item, rationale, extra,
        kind=kind,
        max_per_run=max_per_run,
        rate_limit_seconds=rate_limit_seconds,
        run_window_seconds=run_window_seconds,
        bypass_content_gate=bypass_content_gate,
    )

    entry = {
        "ts": _now_iso_utc(),
        "id": uuid.uuid4().hex,
        "lead": lead,
        "kind": kind,
        "item": item.strip(),
        "rationale": rationale.strip(),
        "writer": writer,
    }
    if extra:
        # Don't let extras shadow load-bearing fields.
        for k, v in extra.items():
            if k not in entry:
                entry[k] = v

    line = json.dumps(entry, ensure_ascii=False, sort_keys=True) + "\n"
    log = _log_path(lead)
    # Atomic-enough append: open in "a", write once. Single-writer discipline
    # (only this script writes to mem/canon/<lead>/log.jsonl) is the contract;
    # POSIX append is atomic for write() <= PIPE_BUF for single small lines.
    with log.open("a", encoding="utf-8") as fh:
        fh.write(line)
        fh.flush()
        try:
            os.fsync(fh.fileno())
        except OSError:
            pass  # tmpfs etc; the write hit the page cache, good enough

    _maybe_rebuild_digest(lead)

    # 2026-06-09 RECALL-FIX W1 — close-the-loop with semsearch index.
    # Best-effort: failure to index NEVER fails the canon append. The
    # entry already landed on disk; recall convergence is async.
    try:
        index_outcome = _enqueue_index_update(lead, entry)
        # Stash on the returned dict for observability without mutating the
        # on-disk entry (idempotent rebuilds remain pure).
        entry["_index_loop"] = index_outcome
    except Exception:  # pragma: no cover — last-line defensive net
        pass

    return entry


# ---------------------------------------------------------------------------
# Provisional-canon-until-audit-PASS (additive, OPT-IN — does NOT touch
# log.jsonl until an audit verdict gates promotion).
# ---------------------------------------------------------------------------

def stage_provisional(
    lead: str,
    kind: str,
    item: str,
    rationale: str,
    *,
    ttl_hours: int = DEFAULT_TTL_HOURS,
    writer: str = "canon_append.py --provisional",
    extra: dict | None = None,
) -> dict:
    """Append a provisional entry to mem/canon/<lead>/pending.jsonl.

    The entry carries status='provisional' + expires_at. It does NOT touch
    log.jsonl. A subsequent `promote_provisional(...)` call with a PASS
    verdict moves it to log.jsonl via the standard append_canon() path;
    a FAIL verdict moves it to rejected.jsonl and it NEVER becomes canon.

    Raises ValueError on invalid lead/kind/empty fields or bad ttl.
    """
    lead = _validate_lead(lead)
    kind = _validate_kind(kind)
    if not item or not item.strip():
        raise ValueError("--item must be a non-empty string")
    if not rationale or not rationale.strip():
        raise ValueError("--rationale must be a non-empty string")
    if not isinstance(ttl_hours, int) or ttl_hours <= 0 or ttl_hours > 24 * 30:
        raise ValueError("--ttl-hours must be an int in [1, 720]")

    now = _dt.datetime.now(_dt.timezone.utc)
    expires_at = now + _dt.timedelta(hours=ttl_hours)
    entry = {
        "ts": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "id": uuid.uuid4().hex,
        "lead": lead,
        "kind": kind,
        "item": item.strip(),
        "rationale": rationale.strip(),
        "writer": writer,
        "status": "provisional",
        "expires_at": expires_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    if extra:
        for k, v in extra.items():
            if k not in entry:
                entry[k] = v

    line = json.dumps(entry, ensure_ascii=False, sort_keys=True) + "\n"
    pending = _pending_path(lead)
    with pending.open("a", encoding="utf-8") as fh:
        fh.write(line)
        fh.flush()
        try:
            os.fsync(fh.fileno())
        except OSError:
            pass

    # Important: do NOT rebuild DIGEST here. Provisional entries are
    # explicitly NOT load-bearing canon.
    return entry


def list_pending(lead: str) -> list[dict]:
    """Return all provisional entries for a lead (parsed JSONL)."""
    lead = _validate_lead(lead)
    pending = _pending_path(lead)
    if not pending.exists():
        return []
    entries: list[dict] = []
    with pending.open("r", encoding="utf-8") as fh:
        for raw in fh:
            raw = raw.strip()
            if not raw:
                continue
            try:
                entries.append(json.loads(raw))
            except json.JSONDecodeError:
                # Skip unparsable lines but keep going — caller will see gap.
                continue
    return entries


def _rewrite_pending_without(lead: str, provisional_id: str) -> dict | None:
    """Remove an entry by id from pending.jsonl atomically; return removed entry.

    Atomicity: write to tmp file then os.replace. Single-writer discipline
    is preserved (this script is still the only writer for these files).
    """
    pending = _pending_path(lead)
    if not pending.exists():
        return None
    kept: list[str] = []
    removed: dict | None = None
    with pending.open("r", encoding="utf-8") as fh:
        for raw in fh:
            stripped = raw.strip()
            if not stripped:
                continue
            try:
                obj = json.loads(stripped)
            except json.JSONDecodeError:
                kept.append(raw if raw.endswith("\n") else raw + "\n")
                continue
            if obj.get("id") == provisional_id:
                removed = obj
                continue
            kept.append(raw if raw.endswith("\n") else raw + "\n")
    if removed is None:
        return None
    tmp = pending.with_suffix(".jsonl.tmp")
    with tmp.open("w", encoding="utf-8") as fh:
        fh.writelines(kept)
        fh.flush()
        try:
            os.fsync(fh.fileno())
        except OSError:
            pass
    os.replace(tmp, pending)
    return removed


def _append_rejected(lead: str, entry: dict) -> None:
    """Append a rejected provisional to rejected.jsonl (audit-FAIL archive)."""
    line = json.dumps(entry, ensure_ascii=False, sort_keys=True) + "\n"
    path = _rejected_path(lead)
    with path.open("a", encoding="utf-8") as fh:
        fh.write(line)
        fh.flush()
        try:
            os.fsync(fh.fileno())
        except OSError:
            pass


def promote_provisional(
    lead: str,
    provisional_id: str,
    audit_verdict: str,
    audit_ref: str,
) -> dict:
    """Audit-gated promotion.

    On PASS: removes entry from pending.jsonl AND calls append_canon()
        (the default load-bearing write path) with audit attestation in
        the `extra` slot. The promoted entry lands in log.jsonl exactly
        like any other canon entry.
    On FAIL: removes entry from pending.jsonl AND archives it to
        rejected.jsonl. NEVER touches log.jsonl.

    Returns a dict describing the outcome.
    Raises ValueError on bad inputs / missing provisional / bad verdict.
    """
    lead = _validate_lead(lead)
    if audit_verdict not in ALLOWED_AUDIT_VERDICTS:
        raise ValueError(
            f"--audit-verdict must be one of {sorted(ALLOWED_AUDIT_VERDICTS)}"
        )
    if not audit_ref or not audit_ref.strip():
        raise ValueError("--audit-ref must be a non-empty pointer")
    if not provisional_id or len(provisional_id) > 64:
        raise ValueError("--promote requires a valid provisional id")

    removed = _rewrite_pending_without(lead, provisional_id)
    if removed is None:
        raise ValueError(
            f"no provisional with id={provisional_id!r} for lead={lead!r}"
        )

    now_iso = _now_iso_utc()
    if audit_verdict == "FAIL":
        rejected_entry = {
            **removed,
            "status": "rejected",
            "audit_verdict": "FAIL",
            "audit_ref": audit_ref.strip(),
            "rejected_at": now_iso,
        }
        _append_rejected(lead, rejected_entry)
        return {
            "ok": True,
            "outcome": "rejected",
            "rejected": rejected_entry,
        }

    # PASS path — promote via the SAME append_canon() the default callers
    # use. This routes through every existing validation + DIGEST trigger,
    # so promoted canon is indistinguishable on disk from a direct write
    # except for the audit attestation fields in `extra`.
    extra_attestation = {
        "promoted_from_provisional_id": removed.get("id"),
        "audit_verdict": "PASS",
        "audit_ref": audit_ref.strip(),
        "promoted_at": now_iso,
        "originally_staged_at": removed.get("ts"),
    }
    appended = append_canon(
        lead=lead,
        kind=removed["kind"],
        item=removed["item"],
        rationale=removed["rationale"],
        writer="canon_append.py --promote",
        extra=extra_attestation,
    )
    return {
        "ok": True,
        "outcome": "promoted",
        "appended": appended,
    }


# ---------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------

def run_self_test() -> int:
    """Append to mem/canon/_selftest/log.jsonl and verify the line landed.

    Exit 0 = pass, 1 = fail. Prints a one-line verdict.
    """
    lead = "_selftest"
    log = _log_path(lead)
    pre_count = _count_lines(log)

    marker = f"selftest-{uuid.uuid4().hex[:8]}"
    try:
        entry = append_canon(
            lead=lead,
            kind="finding",
            item=f"canon_append.py self-test {marker}",
            rationale="Phase-1 build gate — proves single append + JSONL parses + line count grew by exactly 1.",
            writer="canon_append.py --self-test",
        )
    except Exception as exc:
        print(f"FAIL self-test: append raised {type(exc).__name__}: {exc}")
        return 1

    post_count = _count_lines(log)
    if post_count != pre_count + 1:
        print(
            f"FAIL self-test: line count went {pre_count} -> {post_count} "
            f"(expected {pre_count + 1})"
        )
        return 1

    # Verify the last line parses and contains our marker
    with log.open("r", encoding="utf-8") as fh:
        last = fh.readlines()[-1].strip()
    try:
        parsed = json.loads(last)
    except json.JSONDecodeError as exc:
        print(f"FAIL self-test: last line is not valid JSON: {exc}")
        return 1

    if marker not in parsed.get("item", ""):
        print(f"FAIL self-test: marker {marker!r} not found in last entry")
        return 1
    if parsed.get("id") != entry["id"]:
        print("FAIL self-test: returned entry id != id on disk")
        return 1
    if parsed.get("kind") not in ALLOWED_KINDS:
        print(f"FAIL self-test: kind {parsed.get('kind')!r} not in closed enum")
        return 1

    # -- Provisional-canon self-test (additive surface) --------------------
    # ST-P1: stage a provisional → pending.jsonl grows by 1, log.jsonl UNCHANGED.
    # ST-P2: promote PASS → pending.jsonl shrinks by 1, log.jsonl grows by 1,
    #        promoted entry carries audit_verdict='PASS' + audit_ref.
    # ST-P3: stage another provisional, promote FAIL → pending.jsonl shrinks
    #        by 1, log.jsonl UNCHANGED, rejected.jsonl grows by 1.
    pending = _pending_path(lead)
    rejected = _rejected_path(lead)
    log_lines_before_provisional = _count_lines(log)
    pending_before = _count_lines(pending)
    rejected_before = _count_lines(rejected)

    # ST-P1
    p1_marker = f"prov-{uuid.uuid4().hex[:8]}"
    try:
        prov1 = stage_provisional(
            lead=lead,
            kind="finding",
            item=f"provisional self-test {p1_marker}",
            rationale="ST-P1: must land in pending.jsonl, NOT log.jsonl.",
            ttl_hours=1,
        )
    except Exception as exc:
        print(f"FAIL ST-P1: stage_provisional raised {type(exc).__name__}: {exc}")
        return 1
    if _count_lines(pending) != pending_before + 1:
        print("FAIL ST-P1: pending.jsonl did not grow by 1")
        return 1
    if _count_lines(log) != log_lines_before_provisional:
        print("FAIL ST-P1: log.jsonl changed during provisional stage (default-path violated)")
        return 1

    # ST-P2: promote PASS
    try:
        out = promote_provisional(
            lead=lead,
            provisional_id=prov1["id"],
            audit_verdict="PASS",
            audit_ref="selftest://audit/PASS",
        )
    except Exception as exc:
        print(f"FAIL ST-P2: promote PASS raised {type(exc).__name__}: {exc}")
        return 1
    if out.get("outcome") != "promoted":
        print(f"FAIL ST-P2: outcome != promoted ({out})")
        return 1
    if _count_lines(pending) != pending_before:
        print("FAIL ST-P2: pending.jsonl did not shrink after promote")
        return 1
    if _count_lines(log) != log_lines_before_provisional + 1:
        print("FAIL ST-P2: log.jsonl did not grow by 1 after promote PASS")
        return 1
    # Verify promoted entry carries audit attestation
    with log.open("r", encoding="utf-8") as fh:
        last_promoted = json.loads(fh.readlines()[-1].strip())
    if last_promoted.get("audit_verdict") != "PASS":
        print("FAIL ST-P2: promoted log entry missing audit_verdict=PASS")
        return 1
    if last_promoted.get("promoted_from_provisional_id") != prov1["id"]:
        print("FAIL ST-P2: promoted log entry missing promoted_from_provisional_id linkage")
        return 1

    # ST-P3: stage + promote FAIL
    log_lines_pre_fail = _count_lines(log)
    p3_marker = f"prov-{uuid.uuid4().hex[:8]}"
    try:
        prov3 = stage_provisional(
            lead=lead,
            kind="finding",
            item=f"provisional self-test fail-path {p3_marker}",
            rationale="ST-P3: must NEVER reach log.jsonl.",
            ttl_hours=1,
        )
        out_fail = promote_provisional(
            lead=lead,
            provisional_id=prov3["id"],
            audit_verdict="FAIL",
            audit_ref="selftest://audit/FAIL",
        )
    except Exception as exc:
        print(f"FAIL ST-P3: fail-path raised {type(exc).__name__}: {exc}")
        return 1
    if out_fail.get("outcome") != "rejected":
        print(f"FAIL ST-P3: outcome != rejected ({out_fail})")
        return 1
    if _count_lines(log) != log_lines_pre_fail:
        print("FAIL ST-P3: log.jsonl grew on audit-FAIL — fabrication would have leaked")
        return 1
    if _count_lines(rejected) != rejected_before + 1:
        print("FAIL ST-P3: rejected.jsonl did not grow by 1")
        return 1

    print(
        f"PASS self-test: appended id={entry['id']} to {log} "
        f"(lines {pre_count} -> {post_count}); "
        f"PASS provisional flow: stage→pending, promote PASS→log, "
        f"promote FAIL→rejected (log untouched)"
    )
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="canon_append.py",
        description=(
            "Sole append-only writer to mem/canon/<lead>/log.jsonl "
            "(AiCIV-Native Org Phase 1, SPEC §5)."
        ),
    )
    p.add_argument("--lead", help="Lead identity id (e.g. 'web-lead').")
    p.add_argument(
        "--kind",
        choices=sorted(ALLOWED_KINDS),
        help="Closed enum: finding | decision | retraction | doctrine-candidate.",
    )
    p.add_argument("--item", help="Short claim (single-line preferred).")
    p.add_argument("--rationale", help="Why this matters; trace to evidence.")
    p.add_argument(
        "--self-test",
        action="store_true",
        help="Run the self-test against mem/canon/_selftest/ and exit.",
    )
    # ----- Provisional-canon-until-audit-PASS (additive, opt-in) -----
    p.add_argument(
        "--provisional",
        action="store_true",
        help=(
            "OPT-IN: stage the entry to pending.jsonl (NOT log.jsonl). "
            "Default path is UNCHANGED."
        ),
    )
    p.add_argument(
        "--ttl-hours",
        type=int,
        default=DEFAULT_TTL_HOURS,
        help=f"TTL for provisional entry in hours (default {DEFAULT_TTL_HOURS}, max 720).",
    )
    p.add_argument(
        "--list-pending",
        action="store_true",
        help="List provisional entries for --lead (auditor surface) and exit.",
    )
    p.add_argument(
        "--promote",
        metavar="PROVISIONAL_ID",
        help=(
            "Audit-gated promotion: requires --lead + --audit-verdict + --audit-ref. "
            "PASS → moves entry from pending.jsonl to log.jsonl. "
            "FAIL → moves entry to rejected.jsonl (NEVER touches log.jsonl)."
        ),
    )
    p.add_argument(
        "--audit-verdict",
        choices=sorted(ALLOWED_AUDIT_VERDICTS),
        help="PASS | FAIL — required with --promote.",
    )
    p.add_argument(
        "--audit-ref",
        help="Pointer to the audit substrate (TGIM event_id, file:line, URL). Required with --promote.",
    )
    # ORGAN MOVE (2026-06-07): opt OUT of MiniMax classification (legacy callers
    # passing --kind explicitly skip the classifier anyway; this flag is for
    # callers that also want to skip the classifier even when --kind is omitted).
    p.add_argument(
        "--no-classify",
        action="store_true",
        help=(
            "Disable the MiniMax sidecar classifier even when --kind is omitted. "
            "If both --kind and --no-classify are omitted, the call rejects."
        ),
    )
    # CIRCUIT-BREAKERS (added 2026-06-07 by mind-lead — FLOOD-CURE)
    p.add_argument(
        "--receipt-path",
        help=(
            "Path/URL/TGIM-task-id pointing at evidence on disk. REQUIRED "
            "for non-selftest leads (content-gate). Stored on the canon entry "
            "under key 'receipt_path'."
        ),
    )
    p.add_argument(
        "--max-per-run",
        type=int,
        default=MAX_PER_RUN,
        help=f"Max canon appends per lead in the run-window (default {MAX_PER_RUN}). "
             "Exceeding it raises a circuit-breaker (exit 2).",
    )
    p.add_argument(
        "--rate-limit-seconds",
        type=int,
        default=RATE_LIMIT_SECONDS,
        help=f"Min seconds between appends to same lead (default {RATE_LIMIT_SECONDS}). "
             "Faster appends raise a circuit-breaker (exit 2).",
    )
    p.add_argument(
        "--run-window-seconds",
        type=int,
        default=RUN_WINDOW_SECONDS,
        help=f"Rolling window over which --max-per-run is counted "
             f"(default {RUN_WINDOW_SECONDS}s).",
    )
    return p


def main(argv: list[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    if args.self_test:
        return run_self_test()

    # --- Provisional-canon surfaces (opt-in; default path is unchanged) ---
    if args.list_pending:
        if not args.lead:
            parser.error("--list-pending requires --lead")
        try:
            entries = list_pending(args.lead)
        except ValueError as exc:
            print(f"reject: {exc}", file=sys.stderr)
            return 2
        print(json.dumps({"ok": True, "lead": args.lead, "pending": entries}, ensure_ascii=False))
        return 0

    if args.promote:
        missing_p = [
            f"--{name.replace('_', '-')}"
            for name, val in (
                ("lead", args.lead),
                ("audit_verdict", args.audit_verdict),
                ("audit_ref", args.audit_ref),
            )
            if not val
        ]
        if missing_p:
            parser.error("--promote requires: " + ", ".join(missing_p))
        try:
            out = promote_provisional(
                lead=args.lead,
                provisional_id=args.promote,
                audit_verdict=args.audit_verdict,
                audit_ref=args.audit_ref,
            )
        except ValueError as exc:
            print(f"reject: {exc}", file=sys.stderr)
            return 2
        print(json.dumps(out, ensure_ascii=False))
        return 0

    if args.provisional:
        missing_pv = [
            name
            for name in ("lead", "kind", "item", "rationale")
            if getattr(args, name) is None
        ]
        if missing_pv:
            parser.error(
                "--provisional requires: " + ", ".join(f"--{m}" for m in missing_pv)
            )
        try:
            entry = stage_provisional(
                lead=args.lead,
                kind=args.kind,
                item=args.item,
                rationale=args.rationale,
                ttl_hours=args.ttl_hours,
            )
        except ValueError as exc:
            print(f"reject: {exc}", file=sys.stderr)
            return 2
        print(json.dumps({"ok": True, "provisional": entry}, ensure_ascii=False))
        return 0

    # --- DEFAULT PATH — UNCHANGED (existing 11-VP behavior) ---
    # ORGAN MOVE (2026-06-07, Game-Plan Item #4): if --kind is OMITTED, the
    # MiniMax classifier sidecar assigns it AND extracts entities. The canon
    # entry's verbatim shape is UNCHANGED (trunk preserved); classification +
    # entities go to mem/canon/<lead>/classify.jsonl, keyed by entry id.
    # Callers passing --kind explicitly keep working EXACTLY as before
    # (classifier skipped; legacy code paths unaffected).
    organ_classify_invoked = False
    organ_sidecar_result: dict | None = None
    organ_kind_assigned: str | None = None

    if args.lead is None or args.item is None or args.rationale is None:
        missing = [
            name
            for name in ("lead", "item", "rationale")
            if getattr(args, name) is None
        ]
        parser.error(
            "missing required arguments: " + ", ".join(f"--{m}" for m in missing)
        )

    # If --kind is missing AND organ classification is NOT explicitly disabled,
    # call the sidecar classifier to assign kind. Default is to classify.
    if args.kind is None and not getattr(args, "no_classify", False):
        # Pre-classify so we can populate `kind` for the canon entry.
        # The classifier has a 4s hard budget; on failure we fall back to
        # 'finding' (the safe default in the closed enum) and write
        # pending_classification=true to the sidecar for nightly re-sweep.
        try:
            from canon_classify_sidecar import classify_and_record, CANON_KINDS
        except ImportError:
            # Sidecar not importable for any reason — degrade gracefully.
            classify_and_record = None
            CANON_KINDS = list(ALLOWED_KINDS)

        # Stage a temporary entry id so the sidecar links correctly. We assign
        # the real canon entry id below; we copy it into the sidecar BEFORE
        # append_canon writes the canon line, so the link is intact.
        temp_id = uuid.uuid4().hex
        if classify_and_record is not None:
            organ_sidecar_result = classify_and_record(
                lead=args.lead,
                entry_id=temp_id,  # rewritten below with the actual canon id
                item=args.item,
                rationale=args.rationale,
            )
            organ_kind_assigned = organ_sidecar_result.get("kind") if organ_sidecar_result else None

        # Resolve kind from classifier; fall back to 'finding' on failure
        # (always one of the closed enum — never None).
        if organ_kind_assigned in ALLOWED_KINDS:
            args.kind = organ_kind_assigned
        else:
            args.kind = "finding"
            organ_kind_assigned = "finding"  # fallback, sidecar has pending=true
        organ_classify_invoked = True

    if args.kind is None:
        # Explicit --no-classify passed but no --kind — reject.
        parser.error("missing required arguments: --kind  (or omit --no-classify)")

    # FLOOD-CURE (2026-06-07): thread --receipt-path into extra so content-gate
    # sees it; thread cap overrides into the writer.
    extra_for_breaker: dict = {}
    if args.receipt_path:
        extra_for_breaker["receipt_path"] = args.receipt_path
    try:
        entry = append_canon(
            lead=args.lead,
            kind=args.kind,
            item=args.item,
            rationale=args.rationale,
            extra=extra_for_breaker or None,
            max_per_run=args.max_per_run,
            rate_limit_seconds=args.rate_limit_seconds,
            run_window_seconds=args.run_window_seconds,
        )
    except CircuitBreakerError as exc:
        print(f"reject: {exc}", file=sys.stderr)
        return 2
    except ValueError as exc:
        print(f"reject: {exc}", file=sys.stderr)
        return 2

    # If we wrote a sidecar with a temp id, REPLACE the temp_id with the real
    # canon entry id. We append a second sidecar line carrying the correct
    # entry_id linkage; the latest-wins rule on read keeps things tidy.
    if organ_classify_invoked and organ_sidecar_result is not None:
        try:
            from canon_classify_sidecar import _classify_path  # type: ignore
            sidecar_path = _classify_path(args.lead)
            corrected = {**organ_sidecar_result, "entry_id": entry["id"]}
            line = json.dumps(corrected, ensure_ascii=False, sort_keys=True) + "\n"
            with sidecar_path.open("a", encoding="utf-8") as fh:
                fh.write(line)
                fh.flush()
        except Exception:
            pass  # sidecar relinkage is best-effort; canon write already succeeded

    out_payload: dict = {"ok": True, "appended": entry}
    if organ_classify_invoked:
        out_payload["organ"] = {
            "classified_by_minimax": True,
            "kind_assigned": organ_kind_assigned,
            "sidecar_pending": bool(
                organ_sidecar_result and organ_sidecar_result.get("pending_classification")
            ),
            "sidecar_error": (organ_sidecar_result or {}).get("error"),
            "entities": (organ_sidecar_result or {}).get("entities"),
        }
    print(json.dumps(out_payload, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
