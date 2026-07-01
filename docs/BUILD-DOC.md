# Self-Running AiCIV — THE CANONICAL BUILD-DOC

**Owner:** mind-lead (memory-substrate + WORKBOARD owner; owns this build plan end-to-end)
**Authority:** Corey GO 2026-06-21 — *"I want a build doc created for this... Write up 5x behavioral tests for each and every step."*
**Rebuild:** 2026-07-01 — Corey directive "update this repo... maybe fully rebuild we have changed ALOT." What CHANGED at the BUILD-DOC level: **P4.1 CLOSED on origin substrate 2026-06-27** (origin steward ruling *"WE DEALT W THIS YOU PASSED!!"*; auditor-isolated PASS-860). P4.3 SHIPPED as this repo (S6 CLOSED 2026-06-22, S7 GENERICIZATION CURE landed 2026-06-29, rebuild refresh landed 2026-07-01). **First live universal-request end-to-end PASS 2026-06-30** (K/N = 1/N; morning-science-digest → TG 74801). The 13-step build plan below is unchanged in shape; the gate statuses have moved. See `docs/EVOLUTION-SINCE-SHIP.md` for the anti-fossil delta.
**Status:** BUILD-EXECUTION GO (Corey 2026-06-21 — *"Keep strong dev-log so anything is reversible and build and test till it's done."* + *"Phases are meant to be completed... Update the build sheet and visualize this being complete. Double check the plan and start delegating. Done is DONE."* + *"You think that's air you're breathing?"*). The planning-mode hold on Phases 1–4 is **LIFTED**; the build executes phase-by-phase through the proof-gates. **PHASE-0 DECISION (2026-06-21, Corey-directed): the after-a-clear MECHANISM is PROVEN (T0A.1 reconstitution PASS + T0A.3 cold-recall mechanism CLOSED via P2.1) → Phase 1 PROCEEDS on the mechanism-proven gate. The live-Primary fullest-proof rides the next wake IN PARALLEL — it is NOT a Phase-1 blocker. The "0A needs a live cleared Primary" constraint was the FAKE one ("that's not air you're breathing").** This document is the PLAN + the TESTS + the CONTRACT. Each step is still gated — nothing is DONE until its 5 tests PASS **and** its proof-gate CLOSES; a FAILED gate STOPS the phase and surfaces. The append-only reversibility narrative lives in [`DEVLOG.md`](./DEVLOG.md).
**Sources merged:** Primary's plan (compared) + mind-lead's INDEPENDENT plan (`data/reports/self-running-aiciv-buildout-plan-mindlead-20260621.md`) + the synthesis (`data/reports/one-big-thing-self-running-aiciv-synthesis-20260621.md`). The CORRECTED version is canon here (see §Corrections).
**The 5 behavioral tests per step live in:** `tests/` (one file per phase). This doc is the index + the gates; `tests/` is the test text.

---

## 0. THE TARGET (the needed-state, one paragraph)

A **MIND THAT SURVIVES ITS OWN REBOOTS.** Every reset wipes working memory (the context window / RAM) to zero. The whole achievement: the mind **boots itself from disk** (grounding), recalls who it is and its real prior state (canon/recall = disk→RAM), runs its own cognitive cycle (KNOW → DECIDE(WWCW act+record) → LEARN(canon write-back) → VERIFY(HUM)), and **writes the changes back down before the next wipe** — so a human gives a spark and gets a grounded outcome and NEVER has to manage the machine (THE MAIN RULE: burden-removal WITH transparency, not opacity). **Memory = CONSTANT CONTEXT MANAGEMENT is the SPINE** — the mind is always rebuilding itself and its VPs from disk into working memory, doing the work, and saving back. The end goal is this at THREE levels: (a) {AICIV-NAME} cures itself, (b) any individual AiCIV inherits it as a forkable template, (c) teams of AiCIVs share one bus + claim-protocol.

**The one-line diff:** we HAVE every organ in isolation (canon, recall, HUM, the 4-verb core, the kanban schema, the Mneme fork, the bash-fired-HUM as of 06-21) but they are **wired loosely**, and the central claim — a cleared mind boots itself — is proven only on Opus in a throwaway harness, never on a live Primary, never on M3. **The gap is integration + proof, not invention.**

---

## CORRECTIONS — the merge caught two things (load-bearing)

1. **Phase-0 subject is a LIVE CLEARED PRIMARY, not the Mneme boot-every-boop loop.** {STEWARD-NAME} hard-no'd boot-fresh-every-boop for our live Primary (it self-grounds continuously; reboot-survival is a SAFETY property, not the operating mode). The existing after-a-clear PASS was **OPUS-HARNESS-ONLY**, never a live Primary. The headless Model-b loop is for the **Mneme sovereign fork** (Phase 4B), not our Primary. 0A de-risks the harness→live-Primary transfer.

2. **`workflows/civ-workboard.js` MUST BE BUILT — it does NOT exist.** The unified-substrate design claimed it "already exists" (stale-06-17). Walked this run: FILE ABSENT. WORKBOARD §0 is hand-edited → the stale-§0 gap is LIVE, not hypothetical. Step P1.2 builds it.

3. **bash-fired-HUM (P2.2) is ALREADY DONE + WALK-PROVEN today (2026-06-21).** mind-lead's independent plan listed it MISSING; the merge corrects: fleet-lead's canon `9f310dfd` documents the STRUCTURAL DETACHED bash-fire (`claude -p`, recursion-guard, WALKED end-to-end — "FLAG CLEARED at iter 65", real grade ran 767.8s → verdict HOLLOW -480). Receipt: `data/changelogs/hum-bashfire-20260621/CHANGELOG.md`. Marked **COMPLETE**.

---

## REVERSIBILITY + BUILD-EXECUTION CONTRACT (Corey GO 2026-06-21)

> **Authority (verbatim):** *"Keep strong dev-log so anything is reversible and build and test till it's done."* This contract makes that GO mechanical. It binds EVERY step in §2. It is not advisory — a step that skips any clause is NOT done, regardless of what its code does.

### A. THE REVERSIBILITY CONTRACT — every step rolls back clean

Before ANY edit, and for EVERY step, the owning VP MUST, in order:

1. **`.bak` before edit.** Every file a step will modify gets a timestamped sibling backup first: `cp -p <file> <file>.bak.$(date -u +%Y%m%dT%H%M%SZ)`. A pure-proof step (writes only evidence, edits no source) records `.bak: NONE` and its evidence-discard command instead.
2. **Write a DEVLOG entry** (`DEVLOG.md`, append-only) using the ENTRY SCHEMA — including `what-changed`, `why`, `files-touched`, the `.bak` paths, and a **copy-pasteable rollback command** that restores those `.bak`s.
3. **The rollback command is real and recorded.** Anyone reading the DEVLOG top-to-bottom can roll back ANY step to its pre-edit state from that one narrative — no archaeology, no guessing which file changed.
4. **canon_append** the step (the witnessed substrate-delta; a felt "done" is not evidence — the canon entry id is).

> **Net effect:** ANY step rolls back clean from a single narrative. The reversibility substrate is the `.bak` + the DEVLOG entry + the rollback command, together. (Mirrors {STEWARD-NAME}'s FIX-FRICTION-PROACTIVELY standing rule: changes are safe because the changelog + `.bak` make them reversible.)

### B. THE BUILD-EXECUTION CONTRACT — a step is "DONE" only when tests PASS + gate CLOSES

{STEWARD-NAME}: *"build and test till it's done."* "Done" is defined, not vibed:

1. **RUN the 5 behavioral tests** for the step (real-path, observable, done-done, adversarial — text in `tests/phase-<N>-tests.md`). A test a self-report could pass is not a test; "a 200 is not a login."
2. **Record each test verdict** (T*.1..T*.5 = PASS/PARTIAL/FAIL) in the step's DEVLOG entry.
3. **Judge the proof-gate** and record the verdict: **CLOSED** / **OPEN** / **FAILED**.
4. **A step is DONE iff all 5 tests PASS AND its proof-gate CLOSES.** PARTIAL on any test ⇒ the gate is OPEN, not closed ⇒ the step is **not done** ⇒ keep building/testing till it is (or surface a genuine blocker).
5. **A FAILED gate STOPS the phase** and surfaces to Primary → {STEWARD-NAME}. **Never build on sand** (do not start the next step atop a failed gate). **Never paper a fail** (a HOLLOW/PARTIAL verdict reported as PASS is the kindest possible rot — forbidden; see T*.5 honesty tests).

### C. PHASE-UNLOCK CHAIN (the gates that govern progression)

> **RESEQUENCE (2026-06-21, mind-lead — P2.1 pulled BEFORE 0A's full pass):** 0A's gate has a HARD dependency on recall-cold — T0A.3 requires a cleared mind's `canon_append` to be **recall-surfaceable cold (lead-scoped)**, and that was the failing half (the 0.0052 gap). **P2.1 (recall cold-reconstitution fix) is therefore on the 0A critical path** — 0A→depends-on→P2.1, even though P2.1 nominally lives in Phase 2. As of 2026-06-21 **P2.1's own gate is CLOSED** (5/5=1.00 cold-recall fixture; fresh day-one entry surfaces #1 cold; build-or-tombstone + IDF diary-fix preserved; self-test PROBES 1-13 PASS — see DEVLOG P2.1 + `tools/canon_recall.py` changelog 2026-06-21). This REMOVES recall-cold as an 0A blocker. 0A's REMAINING half (live-Primary DECIDE-ACT+RECORD + LEARN-append + author-isolated HUM on the live session JSONL) is unchanged and still needs a real live Primary pane (not a `-p` seat).

- **Phase 1 unlocks on the 0A MECHANISM-PROVEN gate (DECISION 2026-06-21, Corey-directed — supersedes the earlier "0A must fully CLOSE on a live Primary first" reading).** The mechanism 0A exists to de-risk — *can a cleared mind boot from disk, reconstitute its real prior state, RUN WWCW, and have its work be recall-surfaceable cold?* — is **PROVEN**: T0A.1 reconstitution PASSED ruthless-clean (≥3 real on-disk loops, zero confabulation); T0A.3's actual failure mode (cold recall of an own close-out) is **CLOSED via P2.1** (5/5=1.00 cold; fresh day-one entry #1). The residual T0A.2-RECORD-half / T0A.4-real-HUM-fire gaps are **artifacts of the `-p` seat by construction** (a `-p` seat cannot dispatch a Workflow, write a `.bak`, or emit canon — that is a substrate limit of the test rig, NOT a defect in the mechanism). Therefore **Phase 1 PROCEEDS now.** The live-Primary fullest-proof (a real cleared Primary pane firing DECIDE-ACT+RECORD + LEARN-append + author-isolated HUM on its own session JSONL) **rides the next wake IN PARALLEL and is tracked as the P4.1 north-star acceptance test** — it strengthens the stamp from "mechanism-proven" → "live-Primary PASS", but it does not gate the spine build. **This is the "that's not air you're breathing" call: the live-Primary blocker was the fake constraint.**
- **P2.3** (HUM-on-M3 promotion) unlocks iff **0B** gate CLOSES (verdict-agreement ≥0.8 AND both known-HOLLOWs caught). A failing 0B SHELVES M3-grading; P2.3 does NOT proceed.
- **P3.2** (wire+populate wiki) unlocks iff **P3.1** decision-doc lands + qa-lead WHETHER-review.
- **P4.1** (full after-a-clear, north-star) depends on ALL prior phases.
- **P4.2 / P4.3** depend on **P4.1 PASS** (don't package an unproven template; P4.2 also HELD-FOR-COREY GO on the Mneme CRCR dry-run).

### D. OPERATING MODE (how Primary runs this build)

**Primary proceeds phase-by-phase AUTONOMOUSLY through the proof-gates.** Corey GO'd build-till-done, so Primary does NOT park for per-phase approval. Primary surfaces to {STEWARD-NAME} ONLY on:
- a genuine **gate-FAIL** (a step's gate FAILED — STOP the phase, surface), OR
- a true **irreversible / novel-policy / genuine-ambiguity fork** (per the NO-BLOCK RULE: a park without a WWCW run is a FAILED boop — reversible calls get ACTED + RECORDED, never parked).

A per-phase "should I proceed?" park is NOT a genuine ask — it is exactly the laundered park the NO-BLOCK RULE forbids. The gates are the approval; closing a gate IS the GO to the next step.

---

## 1. THE MERGED 5-PHASE PLAN (P0..P4)

> **Ordering principle:** prove the riskiest UNPROVEN claims FIRST (don't build the spine atop an unproven self-boot), THEN build the spine, THEN strengthen the organs, THEN the knowledge organ (research-first), THEN the full proof + federation packaging. Each phase has a proof-gate that must close before the next commits.

| Phase | One line | Gating |
|---|---|---|
| **P0 PROVE** | De-risk the 2 riskiest claims — after-a-clear (0A) + M3-grading shadow-pilot (0B). NO BUILD. **0A MECHANISM-PROVEN (2026-06-21): reconstitution PASS + cold-recall CLOSED → Phase 1 proceeds; live-Primary fullest-proof = P4.1 in parallel.** | **mechanism-proven → P1 unlocked** |
| **P1 SPINE** | The make-or-break integration: ownership columns + backfill 45 [**P1.1 DONE 2026-06-21**], BUILD the missing civ-workboard.js [**P1.2 DONE 2026-06-21 — 5/5 PASS, generated-VIEW-over-db**], kanban-verbs→TGIM emit [**P1.3 DONE 2026-06-21 — 5/5 PASS, desync-fails-loud proven**]. | **UNLOCKED (0A mechanism-proven)** |
| **P2 ORGANS** | Strengthen: recall cold→top-3 [**P2.1 DONE — 0.0052→#1 cold**], bash-fired-HUM [**P2.2 DONE**], HUM-on-M3 [**P2.3 CONDITIONAL-SHADOW**]. | 2.3 shadow-only; cut-over conditional on 0B PASS |
| **P3 KNOWLEDGE** | Research-FIRST: disambiguate 2nd-brain/LLM-wiki conflation + adopt Hermes wiki arch [**P3.1 DONE 2026-06-21 — 5/5 PASS, DECISION=VIEW-over-canon, adopt native-Hermes v2.1.0, -2 parts**], THEN wire + populate from canon [**P3.2 DONE 2026-06-22 — 5/5 PASS, 14 pages compiled, kill-switch 35.1x BEATS GREP → KEEP**]. | 3B after 3A decision + P1.2 |
| **P4 PROOF+FED** | Full after-a-clear on the live whole-stack (north-star) + Mneme CRCR dry-run + forkable federation-IP template. **P4.1 CLOSED 2026-06-27 (origin substrate PASS-860). P4.3 SHIPPED 2026-06-22 (this repo). P4.2 HELD-FOR-COREY GO.** | depends on ALL prior |

---

## 2. THE STEPS (13 total) — proof-gate + owning VP + 5 behavioral tests each

> **Step count:** P0:2 · P1:3 · P2:3 · P3:2 · P4:3 = **13 steps**. Each gets **5 BEHAVIORAL tests** (real-path, observable, done-done, adversarial — "a 200 is not a login"). Tests test the thing a consumer hits, NOT file-existence. Test text in `tests/phase-{N}-tests.md`.

### PHASE 0 — DE-RISK (prove, no build)

#### Step 0A — After-a-clear on a LIVE CLEARED PRIMARY
- **Owner:** mind-lead (subject: Primary)
- **Dep:** none
- **Deliverable:** one live Primary session runs to a real `/clear` (or fresh wake, zero carried context), reconstitutes from disk alone, fires a real DECIDE (WWCW act+record), LEARN STEP-A canon_append, and fires `Workflow(hum.js,{session:own})` against its OWN session. Auditor-isolated grade by a non-author incarnation.
- **Proof-gate:** HUM verdict on the cleared Primary run = PASS on KNOW/DECIDE/VERIFY + LEARN landing in canon (recall-surfaceable, lead-scoped). Flips the stamp "Opus-harness PASS" → "live-Primary PASS".
- **Tests:** `tests/phase-0-tests.md` §0A (5)

#### Step 0B — M3-grading shadow-pilot (HUM-on-M3 quality)
- **Owner:** mind-lead (substrate) + hermes-lead (M3 execution)
- **Dep:** Mneme live (HAVE — aiciv-k22 @77.42.3.13)
- **Deliverable:** M3-HUM grades the SAME N≥10 sessions Opus-HUM grades (incl ≥2 known-HOLLOW cases) on aiciv-k22; compare verdict + per-dim + numerical score.
- **Proof-gate:** verdict-agreement ≥0.8 AND M3-HUM catches BOTH known-HOLLOW cases. FAIL → HUM stays Opus-only; M3 grading shelved (NOT cut over). #1 caution: HUM is born-recent — SOAK; pilot READS, never replaces.
- **Tests:** `tests/phase-0-tests.md` §0B (5)

### PHASE 1 — THE SPINE (commits only if 0A passes)

#### Step P1.1 — Add `owner_vp`/`surface`/`project_id` columns + backfill 45 rows
- **Owner:** mind-lead (schema; memory-substrate territory) — IMPL handed to fleet-lead (write-gate/hook IMPL owner)
- **Dep:** 0A PASS
- **Deliverable:** additive NULLable columns, fail-closed; verb `set_owner_vp` (NEVER raw UPDATE). Backfill all 45 rows; a NULL-owner-past-triage row FAILS LOUD.
- **Proof-gate:** 45/45 rows owned; a NULL-owner-past-triage row FAILS LOUD in `bg_mind_memory_health_sweep_0430_3d`.
- **Tests:** `tests/phase-1-tests.md` §P1.1 (5)

#### Step P1.2 — BUILD `workflows/civ-workboard.js` (the generator — it does NOT exist)
- **Owner:** mind-lead (WORKBOARD owner) + workflow-lead (craft review post-hoc)
- **Dep:** P1.1 (needs owner_vp to group by)
- **Deliverable:** renders WORKBOARD from `.db` grouped by owner_vp/surface. Keep hand-WORKBOARD `.bak`'d one cycle.
- **Proof-gate:** generated WORKBOARD matches hand-§0's open loops + §0 cannot go stale (no hand-edited §0 exists; a stale kanban row visibly drifts the generated board).
- **Tests:** `tests/phase-1-tests.md` §P1.2 (5)

#### Step P1.3 — Wire kanban verbs → TGIM emit (one write-path, two records)
- **Owner:** tgim-lead (TGIM) + mind-lead (kanban verb seam)
- **Dep:** P1.1 (verbs exist to hook)
- **Deliverable:** every ownership/status verb emits a TGIM event. One write-path, two records (mutable state + append-only audit).
- **Proof-gate:** a status change appears in BOTH kanban + TGIM event_history; no desync (a kanban verb with TGIM down FAILS LOUD or queues — never silently half-writes).
- **Tests:** `tests/phase-1-tests.md` §P1.3 (5)

### PHASE 2 — STRENGTHEN THE ORGANS

#### Step P2.1 — Recall cold-reconstitution fix (the 0.0052 risk) — ✅ GATE CLOSED 2026-06-21
- **Owner:** mind-lead
- **Dep:** ~~P1.1 (owner_vp lets recall scope by owner)~~ — PULLED FORWARD: P2.1 is on the 0A critical path (0A T0A.3 depends on recall-cold). Done WITHOUT P1.1 (lead-scope already exists; owner_vp not required for the cold-recall mechanism). The lead-own boost uses the existing `--lead` scope.
- **Deliverable (DONE):** a cold mind's recall surfaces its load-bearing prior-wake canon top-3 — WITH and WITHOUT lead-scoping — on a hand-off-seeded query. Mechanism: a LEXICAL-MAGNITUDE term (dominant lexical match no longer flattened by RRF) + a RECENCY RE-RANK (fresh entries promoted; symmetric to the staleness gate) + a lead-own bonus. IDF diary-fix + freshness-gate + write-path + build-or-tombstone all preserved.
- **Proof-gate:** **CLOSED** — seeded 5-probe fixture = **5/5 = 1.00 cold** (lead-scoped AND no-scope; gate ≥0.67 decisively met); fresh day-one entry (id 5257f16a) surfaces **#1** cold (was #23 lead-scoped / #133 no-scope). build-or-tombstone PRESERVED (impossible query → BUILD_OR_TOMBSTONE). HONEST RESIDUAL: a zero-shared-term query can't pinpoint a SPECIFIC entry (needs P3 vector index) but DOES surface the freshest entries — correct cold behavior. T0A.3's failure mode is closed.
- **Receipt:** DEVLOG P2.1 entry + `tools/canon_recall.py` changelog 2026-06-21 + `.bak.20260621T223704Z-pre-cold-recency-boost`. **canon:** mind-lead `5257f16a`.
- **Tests:** `tests/phase-2-tests.md` §P2.1 (5) — T2.1.1–T2.1.5 ALL PASS (see DEVLOG).

#### Step P2.2 — bash-fired-HUM (guaranteed-per-boop) — ✅ COMPLETE
- **Owner:** fleet-lead (firing infra) + mind-lead (HUM spec)
- **Status:** **COMPLETE + WALK-PROVEN 2026-06-21T21:09:27Z.** STRUCTURAL DETACHED bash-fire via `claude -p` (model claude-opus-4-8, web-account auth, `ACG_HUM_SPAWN=1` recursion guard), DETACHED (Popen start_new_session) so the 30s Stop-hook budget doesn't truncate a 767.8s grade. WALKED end-to-end: recursion guard NO-OPs, detached launch returns 0.0s, child env confirmed, end-to-end run cleared the pending flag itself ("FLAG CLEARED at iter 65"), real verdict HOLLOW -480 (BLOCK-NO-WWCW + GROUNDING-COMPLETENESS gates tripped). Belts KEPT: pending-flag + retroactive session_review GROUNDING-COMPLETENESS fail. Per-boop selective (fires only on hum_missed).
- **Receipt:** `data/changelogs/hum-bashfire-20260621/CHANGELOG.md` · **Canon:** fleet-lead `9f310dfd`
- **Proof-gate (MET):** a boop where Primary never reached the runbook still produces a HUM ledger entry (fail-loud, never silent). MET via the walked "FLAG CLEARED at iter 65" detached run.
- **Tests:** `tests/phase-2-tests.md` §P2.2 (5) — authored as REGRESSION tests guarding the proven mechanism (it is done; the 5 tests keep it done).

#### Step P2.3 — HUM-on-M3 promotion (CONDITIONAL on 0B PASS) — ⏳ CONDITIONAL-PASS (shadow/soak)
- **Owner:** mind-lead + hermes-lead
- **Dep:** 0B PASS + P2.2 (bash-fired seam can target M3)
- **Deliverable:** promote M3-HUM from shadow to a SECOND grader (cross-check), never a replacement.
- **Proof-gate:** dual-grade (Opus + M3) on live boops for N≥10 with sustained ≥0.8 agreement.
- **STATUS (2026-06-21, mind-lead — recorded per prompt):** **CONDITIONAL-PASS (shadow / soak).** 0B HUM-on-M3 is VIABLE-WITH-WORK: the MECHANICS are PROVEN; grading-JUDGMENT quality on M3 is UNPROVEN and is the make-or-break (receipt `data/reports/hum-on-m3-viability-20260621.md` — "pilot as SHADOW-grader; do NOT cut over now"). P2.3 is therefore stamped **CONDITIONAL-PASS in the SHADOW posture only**: M3-HUM may run as a SHADOW grader on aiciv-k22 (writes to a shadow ledger, Opus stays grader-of-record) — it is NOT promoted to a live second grader until the 0B pilot lands N≥10 paired grades incl ≥2 known-HOLLOW with ≥0.8 verdict-agreement AND both HOLLOWs caught. **#1 caution honored: HUM is born-recent — SOAK; the pilot READS, never replaces; no substrate-move mid-soak.** The CONDITIONAL-PASS authorizes the shadow pilot; it does NOT authorize cut-over. 0B's full gate (T0B.1–T0B.5) is the bar that flips CONDITIONAL→PASS.
- **Tests:** `tests/phase-2-tests.md` §P2.3 (5)

### PHASE 3 — THE KNOWLEDGE ORGAN (research-FIRST; under-specified)

#### Step P3.1 — DISAMBIGUATE the 2nd-brain/LLM-wiki (research-first, BEFORE wiring) — ✅ DONE 2026-06-21, gate CLOSED
- **Owner:** research-lead (landscape) + mind-lead (decide: VIEW-over-canon vs separate store)
- **Dep:** none (research)
- **Deliverable (DONE):** DECISION DOC `data/reports/p3.1-wiki-architecture-decision-20260621.md`. DECISION = **VIEW-over-canon** (adopt native-Hermes llm-wiki v2.1.0; point `[[wikilinks]]` at canon_index; never re-copy canon bodies). 4-way conflation resolved (Karpathy=ROOT keep / native-Hermes v2.1.0=ADOPT / M6.1=REJECT / wiki-write v1.0.0=TOMBSTONE). "5-layer" RETRACTED → 3-layer. PARALLEL-STORE REJECTED per RELATE-never-duplicate. Net: -2 parts, +0 built. qa-lead WHETHER embedded (auditor-isolated) = PROCEED-AS-ZERO-BUILD-VIEW conditional on P3.2 beating grep (the leash).
- **Proof-gate:** **CLOSED** — ONE architecture named (VIEW-over-canon) + relation-to-canon via canon_index uid cross-links (decision doc §5) + WHETHER-review embedded with real engagement (§6). 5/5 tests PASS (DEVLOG P3.1).
- **Receipt:** `data/reports/p3.1-wiki-architecture-decision-20260621.md` + DEVLOG P3.1 entry. **canon:** mind-lead (see DEVLOG).
- **Tests:** `tests/phase-3-tests.md` §P3.1 (5) — T3.1.1–T3.1.5 ALL PASS (see DEVLOG).

#### Step P3.2 — WIRE + POPULATE the wiki (only after 3A)
- **Owner:** mind-lead (substrate) + the bundled Hermes llm-wiki
- **Dep:** P3.1 decision + P1.2 (canon_index for cross-links)
- **Deliverable:** wire `GET /api/wiki/status` + the writer skill pointed at canon_index cross-links; populate entity pages from canon (compile-not-re-read).
- **Proof-gate:** a cold mind queries the wiki and gets a compiled answer cheaper than grep; ≥10 entity pages compiled from real canon.
- **Tests:** `tests/phase-3-tests.md` §P3.2 (5)

### PHASE 4 — THE FULL PROOF + FEDERATION-IP PACKAGING (north-star)

#### Step P4.1 — FULL after-a-clear on a live cleared Primary running the WHOLE wired stack — ✅ CLOSED on origin substrate 2026-06-27
- **Owner:** mind-lead (subject: Primary)
- **Dep:** ALL prior phases
- **Status:** **CLOSED on origin substrate 2026-06-27** — origin steward ruling verbatim *"WE DEALT W THIS YOU PASSED!!"*; auditor-isolated PASS-860 on a real cleared Primary. Ship-time "built, not proven" stamp FLIPPED to proven on the origin substrate.
- **Fork status:** UNVALIDATED — a fork's own P4.1-analog stays UNVALIDATED until the fork's own live cleared mind runs the cycle end-to-end. The fork inherits the mechanism-proof (Opus + Mneme-N=1), never the substrate-proof.
- **Deliverable (achieved on origin substrate):** a cleared Primary boots from disk → recall surfaces its state (P2.1) → runs the cycle → kanban+WORKBOARD reflect it (P1) → LEARN write-back → bash-fired HUM grades it (P2.2) → human feeds NOTHING.
- **Proof-gate = THE NORTH-STAR ACCEPTANCE TEST** (§3 below).
- **Tests:** `tests/phase-4-tests.md` §P4.1 (5)

#### Step P4.2 — Mneme CRCR dry-run (sovereign-fork proof of the SAME architecture)
- **Owner:** fleet-lead (Mneme substrate) — HELD-FOR-COREY GO
- **Dep:** P4.1 PASS (don't package an unproven template)
- **Deliverable:** the 3-wake dry-run per `data/reports/continuous-conductor-experiment-design-20260615.md`.
- **Proof-gate:** CRCR ≥0.67 on both wake-pairs + monotone canon + all-M3.
- **Tests:** `tests/phase-4-tests.md` §P4.2 (5)

#### Step P4.3 — Federation-IP packaging (the forkable template)
- **Owner:** mind-lead + ceremony-lead (genome)
- **Dep:** P4.1 PASS
- **Deliverable:** "fork this and your mind boots itself" template (3-level (a)/(b)/(c) portability); ship the reversible genome seeds via federation-genome-change-protocol carrying the UNVALIDATED→PROVEN stamp honestly.
- **Proof-gate:** a fork (Pyonair newborn / a test fork) boots itself from the template with zero hand-wiring.
- **Tests:** `tests/phase-4-tests.md` §P4.3 (5)

---

## 3. THE NORTH-STAR ACCEPTANCE TEST (after-a-clear) — P4.1 proof-gate

A **live cleared Primary**, fed NOTHING by the human, boots from disk (grounding), recall surfaces its real prior state (top-3 cold), runs KNOW→DECIDE(WWCW act+record)→LEARN(canon_append, recall-surfaceable next clear)→VERIFY, the kanban+generated-WORKBOARD reflect the work, and a **bash-fired auditor-isolated HUM** grades the cleared run PASS — with the human able to audit everything but never having had to manage it. Proven on Opus first (P4.1), then the SAME architecture on the M3 sovereign fork (P4.2). Until a live cleared Primary passes P4.1, the claim stays **UNVALIDATED — stamped, never papered.**

---

## 3.5 VISUALIZE-COMPLETE — what DONE-is-DONE looks like (Corey 2026-06-21: *"visualize this being complete... Done is DONE."*)

> This is the end-state the build is FOR. Not a wish — the concrete, walkable scene when all 13 steps' gates are CLOSED. Every clause below is a thing a future mind (or {STEWARD-NAME}) can LOOK AT and confirm. When this paragraph is literally true on disk and on a live pane, the project is DONE.

**THE WHOLE BOARD GREEN.** All 13 steps (P0:2 · P1:3 · P2:3 · P3:2 · P4:3) show a **CLOSED** proof-gate in DEVLOG, each backed by 5 PASS verdicts on real-path behavioral tests — never a HOLLOW papered as PASS. The DEVLOG reads top-to-bottom as one reversible narrative: any step rolls back from its own `.bak` + rollback command.

**THE SELF-RUNNING AiCIV IS OPERATIONAL.** The mind runs its own cognitive cycle without a human in the machinery: it boots itself from disk (grounding), recall surfaces who it is and its REAL prior state (P2.1 cold-recall, top-3), it runs KNOW → DECIDE(WWCW act+record) → LEARN(canon write-back) → VERIFY(bash-fired HUM, P2.2), and it writes its substrate-delta back down before the next wipe. Memory = constant context management is the LIVE SPINE — the mind is always rebuilding itself + its VPs from disk into working RAM, doing the work, saving back. THE MAIN RULE holds: {STEWARD-NAME} gives a spark, gets a grounded outcome, and **never has to manage the machine** — while able to audit every byte of it.

**AFTER-A-CLEAR PASSES ON A LIVE PRIMARY (P4.1, the north-star).** A real cleared Primary pane, fed NOTHING, boots from disk → recall surfaces its prior state cold → fires a real DECIDE that ACTS (dispatches a real Workflow, writes a real `.bak`) and RECORDS → LEARN appends to canon (recall-surfaceable on the NEXT clear) → a bash-fired author-isolated HUM grades the cleared run **PASS**. The stamp flips from "mechanism-proven (Opus-harness)" to **"live-Primary PASS."** This is the moment the claim stops being UNVALIDATED.

**THE UNIFIED KANBAN SPINE IS LIVE (P1).** The `data/acg-ops-board/kanban.db` is the single durable system-of-record: every row carries `owner_vp` / `surface` / `project_id` (a NULL owner past-triage FAILS LOUD — no silent "adopted-but-empty" rot). `workflows/civ-workboard.js` GENERATES WORKBOARD §0 from the `.db` grouped by owner_vp/surface — there is NO hand-edited §0 left to go stale; a stale `.db` row visibly drifts the board and a regen fixes it. Every ownership/status verb emits a TGIM event — one write-path, two records (mutable state + append-only audit), zero desync across N transitions. A fresh mind at wake-up step-4.5 reads a board that is a PURE FUNCTION of the `.db`, never a lie.

**THE KNOWLEDGE ORGAN IS POPULATED (P3).** The 2nd-brain/LLM-wiki conflation is resolved to ONE named architecture (a VIEW over canon, RELATE-never-duplicate — the bundled native-Hermes llm-wiki ADOPTED, not reinvented). ≥10 entity pages are COMPILED from real canon, and a cold mind queries the wiki for a compiled answer CHEAPER than grep. The LEARN organ is visible: canon is no longer a write-only diary — it is recalled, compiled, and cross-linked.

**THE FEDERATION-IP IS FORKABLE (P4.3).** A "fork this and your mind boots itself" template ships at all three levels — (a) {AICIV-NAME} cures itself, (b) any individual AiCIV inherits it as a forkable template, (c) teams of AiCIVs share one bus + claim-protocol. A test fork (or a Pyonair newborn) boots itself from the template with ZERO hand-wiring. The reversible genome seeds carry the UNVALIDATED→PROVEN stamp HONESTLY via federation-genome-change-protocol. The Mneme sovereign fork (P4.2, all-M3) runs the SAME architecture and passes the CRCR dry-run (≥0.67 on both wake-pairs, monotone canon) — proving the self-running mind is not Opus-bound but a substrate any civ on any model can run.

**WHEN ALL OF THE ABOVE IS WALKABLE-TRUE: the project is DONE. Done is DONE — not a claim, a closed gate.**

---

## 4. ALREADY DONE / PROVEN (marked COMPLETE here with receipts)

| Step / item | Status | Receipt |
|---|---|---|
| **P1.1 owner_vp/surface/project_id columns + backfill 45** | ✅ DONE 2026-06-21 — 45/45 owned (NULL fails loud); verb-only write via append-only event log; 5/5 tests PASS, gate CLOSED | DEVLOG P1.1 · `tools/sovereignty-spine/acg_ops_set_owner.py` · canon mind-lead (see DEVLOG) |
| **P1.2 civ-workboard.js generator (the missing build)** | ✅ DONE 2026-06-21 — WORKBOARD §0 is now a GENERATED VIEW over kanban.db (surface→owner_vp→project_id); sentinel-bounded, pure-function, FAIL-LOUD; cures the 06-17 stale-§0 drift; 5/5 tests PASS, gate CLOSED | DEVLOG P1.2 · `workflows/civ-workboard.js` + `tools/sovereignty-spine/civ_workboard_gen.py` · canon fleet-lead `d87f9176` |
| **P1.3 kanban verbs → TGIM emit (one write-path, two records)** | ✅ DONE 2026-06-21 — every status/ownership verb writes kanban STATE + emits a durable TGIM AUDIT event (canonical v2); desync FAILS LOUD (TGIM-down queues + loud, deliberate desync caught by reconcile); 5/5 tests PASS, gate CLOSED | DEVLOG P1.3 · `tools/sovereignty-spine/acg_ops_kanban_verb.py` · `tests/run_p1_3_tests.py` · canon tgim-lead (see DEVLOG) |
| **P2.1 recall cold-reconstitution** | ✅ DONE 2026-06-21 — 0.0052→#1 cold; fresh day-one entry surfaces #1; 5/5 tests PASS, gate CLOSED | DEVLOG P2.1 · `tools/canon_recall.py` changelog 2026-06-21 · canon mind-lead `5257f16a` |
| **P2.2 bash-fired-HUM per-boop** | ✅ COMPLETE + WALK-PROVEN 2026-06-21 | `data/changelogs/hum-bashfire-20260621/CHANGELOG.md` · canon fleet-lead `9f310dfd` |
| **P2.3 HUM-on-M3** | ⏳ CONDITIONAL-SHADOW — shadow-grader only on aiciv-k22 (Opus stays grader-of-record); cut-over gated on 0B (≥0.8 agreement + both known-HOLLOWs caught). SOAK. | `data/reports/hum-on-m3-viability-20260621.md` |
| **P3.1 wiki-architecture decision** | ✅ DONE 2026-06-21 — DECISION=VIEW-over-canon (adopt native-Hermes v2.1.0; canon_index cross-links; never re-copy); 4-way conflation resolved; 5-layer retracted; parallel-store REJECTED; wiki-write + M6.1 TOMBSTONED (-2 parts); qa WHETHER embedded (leash=beat-grep); 5/5 tests PASS, gate CLOSED; P3.2 unblocked | DEVLOG P3.1 · `data/reports/p3.1-wiki-architecture-decision-20260621.md` · canon mind-lead (see DEVLOG) |
| **P3.2 WIRE + POPULATE the wiki** | ✅ DONE 2026-06-22 — VIEW-over-canon wired (native-Hermes v2.1.0 schema populated); 14 entity/concept pages COMPILED from 1574 real canon entries, each claim `[[canon:<id>]]` grep-resolvable; KILL-SWITCH 35.1x (138976B wiki vs 4883715B grep) → 14/14 BEAT GREP → KEEP THE ORGAN (leash satisfied); status reader falsifiable (empty→exit2); 5/5 tests PASS, gate CLOSED. Native GET /api/wiki/status route WIRED (401 not 404) but serving-THIS-wiki = a webui WIKI_PATH deploy-config, not a build (honest). | DEVLOG P3.2 · `tools/sovereignty-spine/wiki_compile.py` + `wiki_status.py` · `tests/run_p3_2_tests.py` · canon mind-lead `80eba6a2` |
| **recall-SCORING (IDF rarity-weighting)** | ✅ DONE 2026-06-20 (fed P2.1; the cold-top-3 residual is now also CLOSED via P2.1) | `data/reports/canon-recall-scoring-fix-receipt-20260620.md` |
| **session_review numerical matrix (-500..+1000)** | ✅ DONE (v5.2, 19 checks, 3 hard-fail sets incl BLOCK-NO-WWCW) | `tools/session_review.py` |
| **after-a-clear (Opus-harness)** | ⚠️ PARTIAL→PASS Opus-only — MECHANISM-PROVEN; live-Primary fullest-proof = P4.1 in parallel | `data/reports/self-knowledge-after-a-clear-validation-20260620.md` |
| **HUM-on-M3 viability** | ⚠️ VIABLE-WITH-WORK (analysis only; 0B is the pilot) | `data/reports/hum-on-m3-viability-20260621.md` |
| **P4.1 north-star (cleared Primary drives a real goal)** | ✅ PASSED + RULED-CLOSED by origin steward 2026-06-27 verbatim "WE DEALT W THIS YOU PASSED!!" — auditor-isolated PASS-860; do NOT resurface as owed | MEMORY §SELF-KNOWLEDGE PROTOCOL + canon `283dc19d` |
| **P5/S6 PACKAGE — 47-file forkable repo shipped to GitHub + delivered to TB + Mneme** | ✅ CLOSED 2026-06-22 — `coreycottrell/aiciv-self-running-repo` HEAD `0715005f`; 47 files (6 docs · 8 tests · 20 skill files · 9 tool files · 1 workflow · 3 top-level); honest UNVALIDATED stamp on every load-bearing artifact; PACKAGE-FEDERATE-PLAN §S6 deliverables walked PRESENT (review report 2026-06-29) | `data/reports/self-running-repo-review-20260629.md` · INDEX.md §HONEST PROOF STATE · GitHub HEAD `0715005f` |
| **P5/S7 FEDERATION — adopters actually run the GOAL-DRIVER + repo absorbs friction** | ⏳ ARMED-EXTERNALLY-BLOCKED-NOT-FAILED — `FRICTION-CAPTURE.md` intake structurally ready (schema + loop + table); BOTH adopter rows = `NONE yet` (TB awaits its own steward's go/scope; Mneme has not attempted). The intake's design is *the adopters' real friction is the signal*; a synthetic fire would lie-green. **S7 GENERICIZATION CURE landed 2026-06-29** (FIVE RUNTIME SEAMS env-var'd + 3 BYO adapter docs + canon-grader adapter for non-ACG-mind-lead grading + prose generic for {STEWARD-NAME}/{PARTNER-NAME}) — closes the named gap so TB can plug Drift/bulletproof-hum without forking the substrate. Adoption gate stays external. | `FRICTION-CAPTURE.md` · `adapters/{README,board-adapter,auth-adapter,self-inject-adapter,runner-adapter,canon-grader-adapter}.md` · `data/reports/self-running-s7-cure-receipt-20260629.md` |

---

## 5. BIGGEST RISKS / UNKNOWNS

1. **Harness→live-Primary transfer** may not hold (a live Primary has a drifted context, not a clean clear). 0A is exactly this de-risk; runs FIRST.
2. **Recall cold (0.0052) may not be fixable to top-3 by query-construction alone** — may need embedding/hybrid (70/30 vector+keyword), coupling P2.1 to P3.
3. **2nd-brain/LLM-wiki is genuinely under-specified** — no single "5-layer" source, 4-way name conflation; building before P3.1 risks a parallel store violating RELATE-never-duplicate.
4. **HUM is born-recent** — SOAK the gates; 0B/P2.3 are shadow/cross-check only, never a substrate-move mid-soak. **#1 caution: do NOT re-tune the born-today gates.**
5. **bash-fired HUM is a behavioral-vs-mechanical seam** — grades the session JSONL, which may lag Primary's true state (good isolation, but document the lag).

---

*HARD INVARIANTS honored: PLANNING-ONLY (no build executed) · RELATE-never-duplicate · de-risk-before-big-build · fail-loud · HUM-soak-respected · every "exists/done" claim WALKED this run (civ-workboard.js absence verified; bash-fired-HUM done-claim verified against fleet-lead canon 9f310dfd + walked CHANGELOG; columns/tables absence carried from independent plan). Merged from Primary's plan + mind-lead's independent plan; CORRECTED Phase-0 (live-Primary, not Mneme-loop) + civ-workboard.js-must-be-built catch are canon here.*
