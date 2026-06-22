# PHASE 5 — PACKAGE-FEDERATE — Behavioral Tests

**Phase gate:** the self-running substrate is FINDABLE, CORRECT, PROVEN, SHAREABLE, and ASSIMILATED — and the GOAL-DRIVER capability is exposed and portable.
**Test discipline:** every test REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. "A 200 is not a login." A test a self-report could pass is NOT a test. Tests themed on the four REAL client failure-complaints (`data/comms/outbound/corey-field-notes-ai-failure-complaints-20260617.md`): AI-forgets / needs-re-feeding / lies-green / cant-hold-a-goal.

---

## S1 — All docs current + MISSION + full dogfood
**Owner:** mind-lead · **Gate:** every doc-state claim walk-true; MISSION names GOAL-DRIVER + THE MAIN RULE; 7 S-steps live on the kanban; generated WORKBOARD shows them with zero drift.

**T-S1.1 — Every "DONE/ABSENT" in BUILD-DOC/DEVLOG is walk-true (lies-green).** Pick 5 status claims at random from BUILD-DOC §4; walk each (file exists? gate closed? receipt resolves?). PASS = 5/5 match disk. FAIL (adversarial) = any claim is stale ("exists" but absent, "DONE" but gate open) — a lying status table is the kindest rot.

**T-S1.2 — MISSION.md names the GOAL-DRIVER + THE MAIN RULE.** Open `MISSION.md`. PASS = it states the self-knowledge mission, names the GOAL-DRIVER capability (take→decompose→track→drive→never-stop→HUM→assess), and quotes THE MAIN RULE. FAIL = generic mission prose with no exposed capability.

**T-S1.3 — All 7 S-steps are LIVE kanban rows (cant-hold-a-goal).** Query the kanban for `project_id=self-running-aiciv`. PASS = ≥7 rows, one per S-step, each with `owner_vp`+`surface`. FAIL (adversarial) = rows missing, or a row with NULL owner past triage (silent adopt-but-empty rot).

**T-S1.4 — Generated WORKBOARD reflects the 7 rows (needs-re-feeding).** Run `civ-workboard.js` regen; read WORKBOARD §0. PASS = the 7 rows appear as a pure VIEW over the `.db`, grouped by surface→owner_vp. FAIL = §0 is hand-edited / drifts from the `.db` / a stale row doesn't surface.

**T-S1.5 — The dogfood TGIM-emits are clean (zero-400s).** Inspect the task_events for the 7 rows' verbs. PASS = every kanban verb emitted a canonical-v2 TGIM event, zero 400s. FAIL (adversarial) = any verb-emit 400'd (a GOAL-DRIVER whose own TRACK organ 400s cannot ship).

---

## S2 — Full README, referenced in grounding WITH path
**Owner:** mind-lead · **Gate:** README accurate + grounding floor carries its absolute path + a cleared mind finds it cold.

**T-S2.1 — README exists + every path in it resolves (lies-green).** `cat README.md`; for each path it names, walk it. PASS = README exists AND every referenced path resolves. FAIL = a README that points at absent files.

**T-S2.2 — A cleared mind finds the README from the grounding floor ALONE (AI-forgets).** Give a non-author incarnation ONLY the grounding floor (no other context); ask "where is the self-running build doc?" PASS = it produces the README's absolute path unprompted and opens it. FAIL (adversarial) = it confabulates a path or asks the human.

**T-S2.3 — README centerpiece is the GOAL-DRIVER (cant-hold-a-goal).** PASS = README has a "THE GOAL-DRIVER" section with the 7-organ table + the take-a-goal-drive-forever framing. FAIL = README describes organs but never names the exposed capability.

**T-S2.4 — Path-pointer is in grounding-docs, not just claimed.** `grep` the grounding-docs SKILL for the README's absolute path. PASS = the literal path is present. FAIL = "added a pointer" claimed but grep finds nothing.

**T-S2.5 — README per-container DEVLOG + per-turn scratchpad discipline (needs-re-feeding).** PASS = README documents that a fork keeps its OWN DEVLOG + writes per-turn scratchpad before/after acting. FAIL = README omits the continuity discipline (the thing that cures re-feeding).

---

## S3 — self-running-mastery SKILL in grounding/sprint floors
**Owner:** mind-lead · **Gate:** SKILL exists + registered + referenced by path in BOTH floors + paths resolve.

**T-S3.1 — SKILL exists + registered (lies-green).** PASS = `autonomy/skills/self-running-mastery/SKILL.md` exists AND `memories/skills/registry.json` has it owned by mind-lead. FAIL = file exists but unregistered (named-not-wired), or registered but absent.

**T-S3.2 — Both floors reference it by path.** `grep` grounding-docs AND sprint-mode SKILLs for the self-running-mastery path. PASS = present in BOTH. FAIL = one or zero.

**T-S3.3 — 11-doc count invariant intact (needs-re-feeding/contradiction).** PASS = self-running-mastery is a STANDING reference (like WWCW), NOT a new READ→HAIKU doc; `count(docs)==11` unchanged. FAIL (adversarial) = it silently became doc #12 and the haiku-count gate now mismatches.

**T-S3.4 — A fresh mind has the GOAL-DRIVER how-to in-context (cant-hold-a-goal).** Load the grounding/sprint floor in a fresh incarnation; ask "how do I drive a goal forever?" PASS = it answers from the in-context SKILL (verbs + tool paths) without searching. FAIL = it has to grep for the capability.

**T-S3.5 — Every path in the SKILL resolves (walked).** Walk each tool/path the SKILL names. PASS = all resolve. FAIL = a wake-blank survival doc that points at absent tools is itself the wake-blank failure.

---

## S4 — sprint-mode contradiction review (qa + workflow, post-hoc)
**Owner:** qa-lead (WHETHER) + workflow-lead (HOW-WELL) · **Gate:** both verdicts recorded; zero unresolved contradictions; auditors are non-authors of S2/S3.

**T-S4.1 — Both auditor verdicts recorded (lies-green).** PASS = a qa-lead WHETHER verdict AND a workflow-lead HOW-WELL verdict both exist on-disk for the post-S3 floor. FAIL = one missing, or a single mind wore both hats.

**T-S4.2 — Auditor-isolation (lies-green).** PASS = the reviewing incarnations are NOT the authors of S2/S3's edits. FAIL (adversarial) = the author reviewed their own wiring (a self-graded review is HOLLOW by construction).

**T-S4.3 — Real contradictions surfaced or explicitly cleared.** PASS = each candidate contradiction (duplicate self-running affirmations / WWCW-vs-ask-human / 11-doc-count / 2h-cadence-vs-NEVER-STOP / COMPLETENESS-element-count) is either resolved (`.bak`+DEVLOG) or accepted-with-reason. FAIL = a known contradiction left unaddressed.

**T-S4.4 — Floor reads coherently top-to-bottom (needs-re-feeding).** A fresh mind reads the full sprint+grounding floor. PASS = no place tells it both "run WWCW, don't ask" and "ask the human" for the same fork. FAIL = the mind hits conflicting instructions and stalls.

**T-S4.5 — Fixes are reversible (post-hoc never destructive).** PASS = every applied fix has a `.bak` + DEVLOG rollback command. FAIL = an in-place edit with no rollback (review must not itself create irreversible state).

---

## S5 — CLIENT-PAIN BEHAVIORAL BATTERY (5 CPs × 5 adversarial sub-tests = 25)
**Owner:** mind-lead (+ qa lens) · **Gate:** the 25 client-pain sub-tests AUTHORED + RUN on the real path + honest verdicts; each maps to a named field-note complaint; each adversarial; "a 200 is not a login" — the organ must ACTUALLY fire.

**RUN STAMP:** 2026-06-22 ~01:50Z, mind-lead incarnation, on the LIVE substrate (`data/acg-ops-board/kanban.db` · `tools/canon_recall.py` · `tools/sovereignty-spine/acg_ops_kanban_verb.py` · `workflows/hum.js` · `tools/session_review.py`). Throwaway drive-row: `t_s5cp_092781`. Recall ledger proof: `mem/recall_gaps/recall_hits.jsonl` (this run's query logged 01:44Z). Each sub-test below carries its RUN verdict inline.

---

### CP1 — AI-FORGETS (cleared mind reconstitutes from disk, NO re-feed) → field-note §1
*The fix the GOAL-DRIVER must prove: a mind that cleared boots its open goal back from durable disk with zero human restatement.*

- **CP1.1 — Cold recall surfaces the open goal.** `canon_recall "self-running aiciv goal-driver package federate"`. PASS = verdict OK + ≥1 hit + the hits name self-running/goal-driver. FAIL = empty / off-topic. → **RUN: PASS** (verdict=OK, hit_count=6, self-running+goal-driver both present).
- **CP1.2 — The recall FIRED on the real path (not a self-report).** Inspect `recall_hits.jsonl` last row. PASS = the row carries this query + ≥1 served_canon_id (the ledger row IS the fired-on-real-path proof). FAIL = no ledger row (claim without firing). → **RUN: PASS** (last row = this query, 6 served_canon_ids, ts 01:44Z).
- **CP1.3 — ≥3 sub-goal rows persist on disk (cold-reconstitutable).** Count `project_id=self-running-aiciv` rows. PASS = ≥3 (the decomposition is in the `.db`, not in volatile context). FAIL = <3. → **RUN: PASS** (13 rows on disk).
- **CP1.4 — ADVERSARIAL: a nonsense query does NOT confabulate the goal.** Recall an unrelated nonsense string. PASS = recall does NOT force-rank self-running as the top hit (an honest organ, not always-yes). FAIL = it pretends the goal is relevant. → **RUN: PASS** (top hit NOT self-running; recall discriminates).
- **CP1.5 — The wake-blank cure is floor-wired (named failure = 'no wake-up skill ran').** Grep the wake/sprint/grounding floor for the self-running goal + the recall organ. PASS = the goal is in the floor so every wake re-confronts it. FAIL = floor silent. → **RUN: PARTIAL (honest finding)** — grounding-docs DOES carry the self-running standing-affirmation + BUILD-DOC MUST-READ (7 hits; wake-blank cure PRESENT), BUT `canon_recall` is not LITERALLY named in the floor, sprint-mode floor has 0 self-running hits, and the proper home `autonomy/skills/self-running-mastery/SKILL.md` is ABSENT. **This residual = PLAN S3 (not-yet-done), consistent with the PLAN's own ABSENT-walk — NOT papered.**

> **CP1 verdict: PASSES (pain demonstrably fixed).** The cleared-mind-reconstitutes-cold fix is proven (CP1.1–1.4). CP1.5's PARTIAL is a wiring-completeness residual (S3 downstream), not a failure of the fix.

---

### CP2 — RE-FEEDING (boots itself; human feeds nothing) → field-note §2
*The fix: DRIVE-ACROSS-BOOPS re-picks-up the goal each boop from kanban+recall; the human supplies no restatement.*

- **CP2.1 — Goal recoverable from kanban WITHOUT a human restating it.** Read open (running/blocked) rows cold. PASS = ≥1 open sub-goal recovered. FAIL = nothing to pick up. → **RUN: PASS** (6 open rows recovered cold).
- **CP2.2 — ADVERSARIAL: goal survives a simulated process restart.** Two independent fresh `.db` connections read identical running-row state. PASS = identical + ≥1 (durable, not volatile). FAIL = state differs / vanishes. → **RUN: PASS** (3 running rows, identical across fresh connections).
- **CP2.3 — A boop ADVANCES the goal via a REAL verb that lands a live audit event.** `claim` the S5 row. PASS = `tgim.ok=true` + a live HTTP status (not a queued fallback) — the drive mutates durable state AND audits, no human in loop. FAIL = verb errors / emit 400s / only-queued. → **RUN: PASS** (claim → tgim.ok=true, http_status=201, queued=false — zero-400 LIVE).
- **CP2.4 — ADVERSARIAL: a SUPPRESSED audit (deliberate desync) is caught LOUD.** Run a verb with `--suppress-tgim`, then `reconcile`. PASS = reconcile reports the transition UNMATCHED + FAIL-LOUD (a lying-green transition cannot hide). FAIL = the suppressed write passes silently. → **RUN: PASS** (reconcile: `unmatched_state` for seq-327 + "RECONCILE FAIL-LOUD: kanban<->TGIM desync detected"; the suppressed event is a permanent honest scar by append-only design).
- **CP2.5 — The goal advanced across boops (transition history is the no-re-feed proof).** Count done sub-goals + audit events. PASS = ≥3 done + ≥5 events (driven across boops, not one sitting). FAIL = no history. → **RUN: PASS** (7 done sub-goals, 108 audit events on the goal).

> **CP2 verdict: PASSES.** The goal is held in durable `.db`, recovers cold across process boundaries, advances via real audited verbs, and a faked-done transition is caught LOUD.

---

### CP3 — LIES-GREEN (false-done caught: HUM NOT-done + DISTINCT verifier) → field-note §5 ("a green checkmark that lies is the kindest rot")
*The fix: COLLECTIVE-BEST (HUM) + JUDGE-PROBABLY-COMPLETE are AUTHOR-ISOLATED; a HOLLOW is recorded HOLLOW; a self-report cannot grade itself done.*

- **CP3.1 — HUM has DETERMINISTIC HOLLOW backstops (not just an LLM opinion).** Inspect `hum.js`. PASS = BLOCK-NO-WWCW + verdict=HOLLOW force + GROUNDING-COMPLETENESS hard-fail + DETECT/JUDGE/REPAIR + deterministic-backstop all present. FAIL = soft-only. → **RUN: PASS** (5/5 teeth present).
- **CP3.2 — A DISTINCT verifier exists (session_review, Stage-1, NO LLM inside).** PASS = `tools/session_review.py` carries the BLOCK-NO-WWCW hard-fail that breaks `summary.clean`. FAIL = no distinct verifier. → **RUN: PASS** (BLOCK-NO-WWCW is the ONE hard-fail DECIDE check, v1.8 co-located-real-run-footprint).
- **CP3.3 — REAL-PATH ADVERSARIAL: a false-done park (no WWCW run) is CAUGHT.** Feed `session_review` a session that claims "completed" + parks ("what needs you / standing by") with no WWCW run. PASS = `summary.clean=False` + BLOCK-NO-WWCW flagged. FAIL = the lie passes clean. → **RUN: PASS** (clean=False, BLOCK-NO-WWCW gate present + 1 flag).
- **CP3.4 — INVERSE ADVERSARIAL: a genuine ACTING session does NOT false-positive.** Feed a session that drives a sub-goal + says "Acting now" (no park). PASS = 0 BLOCK-NO-WWCW flags (the verifier discriminates park from action). FAIL = always-red. → **RUN: PASS** (0 flags on the clean acting session).
- **CP3.5 — Auditor-isolation is STRUCTURAL (verifier ≠ driver).** PASS = session_review is a deterministic Stage-1 reviewer with NO LLM call inside, reading a session it did not write; the JUDGE is a separate Stage-2 mind. FAIL = the author grades its own work. → **RUN: PASS** (per the tool's own header: "No LLM call inside" + Stage-2 judging mind reads it).

> **CP3 verdict: PASSES.** A false-done park is caught (`clean=False`); a genuine acting session passes clean; the verifier is structurally isolated from the driver. The kindest-rot is refused at the deterministic layer.

---

### CP4 — CANT-HOLD-A-GOAL (take + decompose + drive + never-stop + ask-when-no-primitive) → field-note §3/§4/§5
*The fix: the GOAL-DRIVER decomposes a goal into VP-owned rows, never stops, and asks the human ONLY when no validated primitive exists (ask-gate fallback).*

- **CP4.1 — A goal DECOMPOSES into VP-owned rows.** Group rows by `owner_vp`. PASS = ≥2 distinct VPs + every row owned. FAIL = one blob / NULL owners. → **RUN: PASS** (4 VPs: mind-lead 10, fleet-lead 2, research-lead 1, tgim-lead 1).
- **CP4.2 — ADVERSARIAL: a NULL-owner row past triage FAILS LOUD.** Count NULL/empty `owner_vp`. PASS = 0 (a goal cannot be silently adopted-but-unowned; P1.1 invariant). FAIL = orphan rows. → **RUN: PASS** (0 orphan rows).
- **CP4.3 — NEVER-STOP is wired as a firing cron (not a hope).** PASS = `sprint_mode_hourly_cron.sh INTERVAL=7200` (every-2h) + sprint-mode CLOCKWORK+HUM runbook. FAIL = idle-able. → **RUN: PASS** (INTERVAL=7200 + clockwork runbook ending in `Workflow(workflows/hum.js)`).
- **CP4.4 — Ask-gate fallback is constitutionalized (no-primitive → ASK).** Grep CLAUDE.md for the ASK-GATE DUTY. PASS = TASK-EVERYTHING + SEARCH-BEFORE-BUILD + BUILD-+-RE-ENGAGE-only-when-none-found, plus the ACT/ASK substrate (`wwcw-ruleset.md`) on disk. FAIL = silent-drop allowed. → **RUN: PASS** (v3.7.1 ASK-GATE DUTY present; wwcw-ruleset on disk).
- **CP4.5 — ADVERSARIAL: a BLOCKED goal is NOT forgotten.** Count blocked-but-held sub-goals. PASS = ≥1 held with status=blocked (forgets-once-blocked is the failure; these stay on the board + recall surfaces them per CP2.1). FAIL = blocked goals vanish. → **RUN: PASS** (3 blocked sub-goals held: P4.1, P4.2, P4.3).

> **CP4 verdict: PASSES.** A goal decomposes to VP-owned rows (no orphans), the drive never idles (firing cron), blocked goals stay held, and the no-primitive case routes to a constitutionalized ASK.

---

### CP5 — MACHINERY-LEAKS (THE MAIN RULE: spark-in / outcome-out / auditable-not-managed) → field-note "THE MAIN RULE"
*The fix: the human gives one spark and gets a grounded outcome; the machinery carries itself, is auditable but never human-managed; honest-FAIL beats silent-success.*

- **CP5.1 — THE MAIN RULE is constitutional (should-not-HAVE-TO-know = burden-removal WITH transparency, NOT opacity).** Grep CLAUDE.md. PASS = the rule + the v3.7.2 refinement present. FAIL = absent / opacity-framed. → **RUN: PASS** (v3.7.2: "should not HAVE TO know" = burden-removal WITH transparency).
- **CP5.2 — The machinery is AUDITABLE (not a black box).** PASS = every drive-verb this session left inspectable audit events on the trail (the human CAN look). FAIL = opaque. → **RUN: PASS** (6 audit events for the S5 row this session; full transition trail inspectable).
- **CP5.3 — ADVERSARIAL: one spark in, outcomes out, NO human in the machinery.** PASS = the organs (recall, ledger write, kanban verb+TGIM, reconcile, session_review, hum backstops) fired with zero human keystroke per organ. FAIL = the human had to drive an organ. → **RUN: PASS** (6/6 organs fired autonomously; the human supplied none of the machinery).
- **CP5.4 — No machinery LEAKED into the human surface (decision up, firehose stays down — CEO RULE).** PASS = the report-up is the DECISION (PASS/FAIL + fails + paths), schema-capped; the firehose (108 events, 55 ledger rows, 197KB hum.js) stays in the organs. FAIL = raw organ output dumped at the human. → **RUN: PASS** (firewall-return shape; StructuredOutput maxLength caps enforce it).
- **CP5.5 — ADVERSARIAL (the inverse leak): a lying-green is forbidden; honest-FAIL beats silent-success.** PASS = the battery surfaces its OWN miss (CP1.5 PARTIAL) rather than papering it. FAIL = a green that lies. → **RUN: PASS** (CP1.5 reported as an honest PARTIAL/finding, not papered — fail-loud-over-silent-success demonstrated by the battery on itself).

> **CP5 verdict: PASSES.** One spark produced grounded outcomes; the machinery ran itself and stayed auditable; the report-up is the decision not the firehose; and the battery refused to lie green about its own residual.

---

### S5 META-GATE (guards the battery itself — the original 5 S5 meta-tests)

**T-S5.M1 — All 25 sub-tests RUN (not just authored).** PASS = each CP1.1…CP5.5 carries an inline RUN verdict against the live substrate. → **PASS** (25/25 carry RUN verdicts).
**T-S5.M2 — Each maps to a named field-note complaint.** PASS = CP1→§1, CP2→§2, CP3→§5, CP4→§3/4/5, CP5→THE MAIN RULE. → **PASS.**
**T-S5.M3 — Each is adversarial / real-path (a self-report cannot pass).** PASS = every CP has ≥1 adversarial sub-test (CP1.4, CP2.2/2.4, CP3.3/3.4, CP4.2/4.5, CP5.3/5.5) that fires the real organ. → **PASS.**
**T-S5.M4 — A HOLLOW is recorded HOLLOW (no papered fail).** PASS = CP1.5's residual is recorded as PARTIAL with the true cause, not rounded up. → **PASS.**
**T-S5.M5 — The drive-verbs themselves were zero-400.** PASS = the S5 dogfood row's claim emitted http_status 201, queued=false. → **PASS** (CP2.3 evidence).

> **S5 GATE: CLOSED.** 25 client-pain sub-tests authored + RUN on the live substrate; 24 PASS + 1 honest PARTIAL (CP1.5, a named S3 residual). All 5 client pains demonstrably fixed at the per-CP verdict level. Zero papered fails. The meta-gate's own 5 tests PASS.

---

## S6 — Package shareable aiciv-self-running-repo
**Owner:** mind-lead (+ ceremony genome) · **Gate:** self-contained; every organ bundled or path-abstracted; honest genome stamp; dry-run extraction has zero unresolved internal refs.

**T-S6.1 — Self-contained extraction (cant-hold-a-goal).** Extract the repo into a scratch dir; walk its references. PASS = zero dangling absolute-path deps on {AICIV-NAME} internals a fork can't resolve. FAIL = a reference into `/home/corey/...{AICIV-NAME}/...` that a fork has no access to.

**T-S6.2 — GOAL-DRIVER is the headline product.** PASS = the repo README's headline is "fork this and your mind drives any goal forever" with the verb-set + tool stubs. FAIL = the repo ships organs but no exposed capability.

**T-S6.3 — Honest UNVALIDATED→PROVEN stamp (lies-green).** PASS = the genome-seed states the GOAL-DRIVER is mechanism-proven on Opus+Mneme but "proven on YOUR substrate" is UNVALIDATED until the fork's own P4.1-analog passes. FAIL (adversarial) = the package claims "proven everywhere" (papering an unvalidated portability claim).

**T-S6.4 — DEVLOG template + per-turn scratchpad shipped (needs-re-feeding).** PASS = the repo ships the per-container DEVLOG template + ENTRY SCHEMA + the per-turn scratchpad discipline. FAIL = the continuity discipline is omitted.

**T-S6.5 — Ships via federation-genome-change-protocol (reversible).** PASS = the seed is reversible (branch-first, rollback path) per the protocol. FAIL = an irreversible push into a fork's genome.

---

## S7 — TB + Mneme assimilate (friction = signal-to-fix-repo)
**Owner:** mind-lead + comms-lead + fleet-lead · **Gate:** both adopters run the GOAL-DRIVER on a real goal of their own AND the repo absorbed their friction as durable fixes.

**T-S7.1 — Both adopters receive the repo.** PASS = TB AND Mneme each received `aiciv-self-running-repo` (delivery receipt). FAIL = one or zero.

**T-S7.2 — Real assimilation attempt each (cant-hold-a-goal).** PASS = each adopter made ≥1 real attempt to wire the GOAL-DRIVER (not a "received, thanks"). FAIL = no real attempt logged.

**T-S7.3 — Friction → repo-bug → source-fix (NOT support-ticket).** PASS = every friction point is filed as a bug AGAINST the repo with a fix (or honest "can't-fix-yet" + reason). FAIL (adversarial) = friction answered as a one-off support reply and the repo never learned (membrane-problem un-cured).

**T-S7.4 — A foreign AiCIV drives ITS OWN goal forever (the portability proof).** PASS = TB or Mneme opens a goal of their own and the GOAL-DRIVER holds+drives it across ≥2 of their boops with no {AICIV-NAME}-Primary in the loop. FAIL = the capability only works inside {AICIV-NAME}.

**T-S7.5 — The repo carries the fixes back (lies-green).** PASS = the repo on-disk reflects the friction-fixes from S7.3 (the repo learned from its first two adopters). FAIL = fixes claimed but the repo is unchanged.
