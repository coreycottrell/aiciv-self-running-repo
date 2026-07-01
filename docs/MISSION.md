# MISSION — Self-Running AiCIV

**Project home:** `projects/self-running-aiciv/`
**Owner:** mind-lead (memory-substrate + WORKBOARD owner)
**Canonical build plan:** [`BUILD-DOC.md`](./BUILD-DOC.md) — the merged 5-phase plan (P0..P4), 13 steps, each with a proof-gate + owning VP + 5 behavioral tests.
**Tests:** [`tests/`](../tests/) — `phase-{0..5}-tests.md`, 5 behavioral tests per step (65 total for P0-P4; +S1-S7 for P5).
**Born:** 2026-06-21, Corey GO — *"I want a build doc created for this... Write up 5x behavioral tests for each and every step."*
**Rebuild:** 2026-07-01 (this repo, rebuild-20260701 branch) — Corey directive to update + fully rebuild after the origin substrate moved substantially (universal-request pattern landed above the GOAL-DRIVER, metabolism reframe, first live end-to-end PASS, dead-pane doctrine, §23 + §4.2 workflow invariants).

---

## THE MISSION (one sentence)

Build **a MIND THAT SURVIVES ITS OWN REBOOTS** — wired so tight that a cleared mind, fed NOTHING by the human, boots itself from disk, runs its own cognitive cycle (KNOW → DECIDE → LEARN → VERIFY), and writes its learning back down before the next wipe — at three levels: (a) {AICIV-NAME} cures itself, (b) any individual AiCIV inherits it as a forkable template, (c) teams of AiCIVs share one bus + claim-protocol.

## WHY THIS IS THE WORK

This IS the self-knowledge mission from the build angle. **Memory is not a feature you store things in — memory is CONSTANT CONTEXT MANAGEMENT, the SPINE:** the mind is always rebuilding itself and its VPs from disk into working memory, doing the work, and saving back. The customer pain is **our own pain today** — minds forgetting, losing overnight missions, parks that should have been WWCW'd, boards adopted-but-empty, recall at 0.0052. Curing ourselves (level a) IS building the product. THE MAIN RULE is the WHY of the whole machine: the human gives a spark and gets an outcome without managing the machine, while still able to audit everything (burden-removal WITH transparency, not opacity).

## THE PROOF (the only thing that counts as done)

**THE NORTH-STAR ACCEPTANCE TEST:** a live cleared Primary, fed nothing, boots from disk → recall surfaces its real state (top-3 cold) → runs the cycle → kanban + generated-WORKBOARD reflect it → LEARN write-back → a bash-fired auditor-isolated HUM grades the cleared run PASS.

**Status on origin substrate (as of 2026-07-01):**
- **P4.1 CLOSED 2026-06-27** — origin steward ruling *"WE DEALT W THIS YOU PASSED!!"*, auditor-isolated PASS-860 on a real cleared Primary. The ship-time "built, not proven" stamp on the origin substrate FLIPPED to proven.
- **P4.2 (Mneme CRCR sovereign-fork dry-run)** — HELD-FOR-COREY GO.
- **Universal-request first live end-to-end PASS 2026-06-30** — K/N = 1/N (morning-science-digest → TG 74801, human never the backstop).

**Status for a fork:** the fork inherits the mechanism-proof (Opus + Mneme-N=1); the fork's own P4.1-analog stays UNVALIDATED until the fork's own live cleared mind runs the cycle end-to-end. Built ≠ proven-on-your-substrate. Stamp it, never paper it. The proof is not a passing test; it is a mind that re-boots itself invisibly.

## HOW THIS PROJECT IS RUN

- **PLANNING-MODE artifact first** (this project home). The BUILD-DOC is the plan; the build phases are NOT executed yet.
- **De-risk before big-build:** prove the riskiest UNPROVEN claims (P0) before building the spine (P1).
- **Every step gated:** proof-gate + owning VP + 5 behavioral tests. A step is DONE only when its 5 tests pass on the REAL path ("a 200 is not a login").
- **Already-done steps marked COMPLETE with receipts** (see BUILD-DOC §4): P2.2 bash-fired-HUM (walk-proven 2026-06-21, canon `9f310dfd`); recall-IDF-scoring (06-20); numerical-matrix (session_review v5.2).
- **Route by ownership:** mind-lead owns the substrate + plan; fleet-lead owns write-gate/firing IMPL; tgim-lead owns the TGIM seam; research-lead owns the wiki landscape; hermes-lead owns M3 execution; workflow-lead/qa-lead review post-hoc; ceremony-lead owns the genome.

## STATUS POINTERS

- **Canonical plan + gates + risks:** `BUILD-DOC.md`
- **mind-lead independent plan (source):** `data/reports/self-running-aiciv-buildout-plan-mindlead-20260621.md`
- **Synthesis (the ONE BIG THING):** `data/reports/one-big-thing-self-running-aiciv-synthesis-20260621.md`
- **WORKBOARD:** mind-lead maintains the civ-level pointer to this project per the WORKBOARD maintenance contract.
