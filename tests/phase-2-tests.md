# PHASE 2 — STRENGTHEN THE ORGANS — Behavioral Tests

**Phase gate:** P2.3 conditional on 0B PASS. P2.2 is already COMPLETE (walk-proven 2026-06-21) — its 5 tests are REGRESSION guards.
**Test discipline:** REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. Recall tests query as a COLD mind would (no priming). HUM tests verify auditor-isolation, not the existence of a ledger row.

---

## Step P2.1 — Recall cold-reconstitution fix (the 0.0052 risk)
**Owner:** mind-lead · **Proof-gate:** a seeded 5-probe fixture hits ≥0.67 cold; fresh day-one entry surfaces top-3 on a generic cold query.

**T2.1.1 — A cold generic query surfaces load-bearing prior-wake canon in top-3.**
From a fresh (no-priming) state, run `canon_recall` with a query CONSTRUCTED FROM THE HAND-OFF (seeded from `open_decisions`), NOT hand-tuned salient terms. PASS = the load-bearing prior-wake entries appear in top-3. FAIL (adversarial) = they appear only at rank 7-8, or only when the query is hand-primed with the exact rare token (that's not cold — that's cheating). Baseline to beat: the 0.0052 generic-query score.

**T2.1.2 — The 5-probe fixture hits ≥0.67 cold (mirrors CRCR threshold).**
Run the seeded 5-probe fixture against the real canon corpus. PASS = aggregate cold-recall ≥0.67 across the 5 probes. FAIL = <0.67. Adversarial: probes must be GENERIC (what a cold mind would actually ask), not reverse-engineered from the entries' rarest tokens.

**T2.1.3 — A fresh day-one entry is recallable the SAME day on a generic query.**
Append a new canon entry, then immediately run a generic cold query a fresh mind would plausibly ask. PASS = the new entry surfaces top-3 same-day. FAIL (adversarial) = the new entry is invisible until it ages / gets cited (the "fresh-entry recall weak day-one" residual — the exact risk this step closes). A write a fresh mind can't read same-day is the reconstitution risk.

**T2.1.4 — IDF rarity-weighting still holds (no regression from the 06-20 fix).**
Confirm a rare discriminating token still out-ranks ubiquitous civ-vocab (the 06-20 IDF fix). PASS = a query with one rare term surfaces the entry containing it above entries stuffed with common civ-vocab. FAIL (adversarial) = the cold-fix re-introduced the diary-problem (common words drowning rare signal). The fix must not undo `canon-recall-scoring-fix-receipt-20260620.md`.

**T2.1.5 — Lead-scoping is a BOOST, not a CRUTCH (works without it too).**
Run the same probes WITHOUT lead-scoping. PASS = top-3 cold still holds (lead-scope improves it but is not required for surfacing). FAIL (adversarial) = recall only works lead-scoped (a cold mind that doesn't yet know to scope gets nothing — the reconstitution path can't assume the scope is already known).

---

## Step P2.2 — bash-fired-HUM (guaranteed-per-boop) — ✅ COMPLETE (REGRESSION GUARDS)
**Owner:** fleet-lead + mind-lead · **Status:** WALK-PROVEN 2026-06-21T21:09:27Z · canon fleet-lead `9f310dfd` · receipt `data/changelogs/hum-bashfire-20260621/CHANGELOG.md`. These 5 tests KEEP it done.

**T2.2.1 — A boop where Primary never reached the runbook still produces a HUM ledger entry.**
Simulate a boop where Primary drifts / never reaches `Workflow(hum.js)`. PASS = the detached bash-fire (`claude -p`) produces a HUM ledger entry for that session anyway. FAIL (adversarial) = a drifted boop gets NO grade (the overnight-drift hole reopened). This is the proven property — guard it.

**T2.2.2 — The recursion guard NO-OPs (no infinite HUM-spawns-HUM).**
With `ACG_HUM_SPAWN=1` set (the guard env), confirm the Stop-hook does NOT spawn another HUM. PASS = guard present → instant exit 0, no child spawn. FAIL (adversarial) = a HUM grade itself triggers another bash-fired HUM (runaway recursion — the exact thing the guard prevents). Walked at birth ("recursion guard NO-OPs").

**T2.2.3 — The launch is DETACHED (30s hook budget does not truncate a long grade).**
Fire the bash-HUM and confirm the launcher returns ~0.0s while the grade runs to completion in the background (the walked grade ran 767.8s). PASS = detached launch returns immediately AND the full grade completes + writes the ledger. FAIL (adversarial) = the grade is killed at the 30s Stop-hook budget (truncated verdict). Detached-via-Popen-start_new_session must hold.

**T2.2.4 — The child env is clean (no API key leak, guard set).**
Inspect the spawned child's env. PASS = child has `ACG_HUM_SPAWN=1` and NO `ANTHROPIC_API_KEY` (web-account auth path). FAIL (adversarial) = the child inherits an API key (billing/auth-path drift) or lacks the guard (recursion risk). Walked at birth ("child env confirmed").

**T2.2.5 — It fires SELECTIVELY (only on hum_missed), not on every Stop.**
Run a boop where Primary DID fire HUM normally. PASS = the bash backstop does NOT double-fire (no second redundant grade). Run a boop where HUM was missed → it DOES fire. FAIL (adversarial) = the backstop fires on every Stop (double-grading every boop = waste + ledger noise). Per-boop selective on the pending-flag is the contract.

---

## Step P2.3 — HUM-on-M3 promotion (CONDITIONAL on 0B PASS)
**Owner:** mind-lead + hermes-lead · **Proof-gate:** dual-grade (Opus + M3) on live boops for N≥10 with sustained ≥0.8 agreement.

**T2.3.1 — Gate honored: P2.3 does not start until 0B PASSED.**
PASS = there is a recorded 0B PASS (agreement ≥0.8 + both known-HOLLOWs caught) before any P2.3 work begins. FAIL (adversarial) = P2.3 started on a marginal/failed 0B (the gate was rounded up).

**T2.3.2 — M3 is a SECOND grader (cross-check), never a replacement.**
On live boops, confirm Opus-HUM remains the grader-of-record and M3-HUM produces a parallel cross-check grade. PASS = both grades recorded; Opus is source-of-truth. FAIL (adversarial) = M3 silently became the sole grader for any live boop (replacement, not cross-check).

**T2.3.3 — Sustained ≥0.8 agreement on N≥10 LIVE boops (not the 0B replay corpus).**
Measure dual-grade agreement on fresh live boops. PASS = ≥0.8 across N≥10 live. FAIL = <0.8, or measured only on the 0B replay set (must be NEW live data — the pilot was retrospective; promotion needs prospective proof).

**T2.3.4 — A disagreement is surfaced + adjudicated, not averaged away.**
When Opus and M3 disagree on a verdict, confirm the disagreement is flagged for a human/auditor look, not silently reconciled to a midpoint. PASS = disagreements are visible + logged. FAIL (adversarial) = the system averages two verdicts into a fake consensus (hides the signal that the graders diverge).

**T2.3.5 — Soak respected: the move is reversible + the Opus ledger untouched.**
Confirm M3-promotion is a reversible config (one knob to revert to Opus-only) and the Opus ledger remains the untouched source-of-truth throughout. PASS = a single revert restores Opus-only with no data loss. FAIL (adversarial) = promotion mutated the Opus ledger or is hard to undo (a substrate-move during soak — #1 caution violated).
