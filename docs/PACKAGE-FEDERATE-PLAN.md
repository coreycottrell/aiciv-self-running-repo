# PACKAGE-FEDERATE PLAN — Self-Running AiCIV → Shareable, Goal-Driving Substrate

**Owner:** mind-lead (memory-substrate + WORKBOARD + self-running BUILD-DOC owner)
**Authority:** steward GO 2026-06-21 — the 7-point packaging+federation directive (S1–S7 below), extending the BUILD-DOC's `P4 PROOF+FED` phase. Companion to [`BUILD-DOC.md`](./BUILD-DOC.md); this is the **P5 PACKAGE-FEDERATE phase** rendered as its own sibling doc (too large to inline in BUILD-DOC §2).

**Status snapshot (as of 2026-07-01 rebuild):**
- **S1–S5 CLOSED** (docs current + MISSION + full dogfood, README, self-running-mastery SKILL, contradiction review, behavioral test battery).
- **S6 CLOSED 2026-06-22** — 47-file forkable repo shipped to GitHub (`<your-github-owner>/aiciv-self-running-repo` HEAD `0715005`); honest UNVALIDATED stamp on every load-bearing artifact; full audit at `data/reports/self-running-repo-review-20260629.md` in origin substrate.
- **S6 REFRESH 2026-06-29** — S7 GENERICIZATION CURE landed on-disk (5 runtime seams + adapters/ + prose genericization sweep). Committed as the head of `rebuild-20260701` branch.
- **S6 REBUILD 2026-07-01** — steward directive "we have changed ALOT... include the readme and curriculum etc." → this rebuild adds `docs/HOW-AN-AICIV-HANDLES-ANY-REQUEST.md` + `docs/curriculum.md` + `docs/EVOLUTION-SINCE-SHIP.md`; refreshes INDEX / STAND-IT-UP / README / MISSION / BUILD-DOC / THE-GOAL / this doc to reflect the current substrate.
- **S7 ARMED-EXTERNALLY-BLOCKED-NOT-FAILED** — both adopter rows in `FRICTION-CAPTURE.md` remain `NONE yet` (the partner awaits its own steward's go/scope; Mneme has not attempted). The intake's design is *the adopters' real friction is the signal*; a synthetic fire would lie-green. External block, not authoring block.
**Status:** PLAN authored. Each step (S1–S7) is gated like every BUILD-DOC step: **DONE iff its 5 behavioral tests PASS *and* its proof-gate CLOSES** (BUILD-DOC §REVERSIBILITY + BUILD-EXECUTION CONTRACT binds here verbatim — `.bak` before edit · DEVLOG entry with rollback command · canon_append the witnessed delta · 5 real-path/observable/adversarial tests · never paper a fail).
**Reversibility narrative:** the SAME append-only [`DEVLOG.md`](./DEVLOG.md) — S1–S7 entries continue the one rollback chain.
**Tests:** `tests/phase-5-tests.md` (this phase's test text; one §SN block per step, 5 each).

---

## 0. WHY THIS PHASE EXISTS (the diff from BUILD-DOC)

BUILD-DOC P0–P4 proves a mind that **survives its own reboots** on {AICIV-NAME} (and, via P4.2, on the Mneme sovereign fork). It stops at "the architecture is proven + forkable." This phase answers the steward's three standing field-note demands that P0–P4 do NOT close:

1. **The capability must be EXPOSED, not just operational.** A self-running mind that only *we* know how to run is custody, not a product. P5 packages it into a **shareable repo + a single named, reusable capability — THE GOAL-DRIVER** (§GOAL-DRIVER below) — that any AiCIV (the partner, Mneme, a fork) assimilates and runs.
2. **The docs/skills/grounding must REFERENCE the substrate by path**, so a fresh mind (or a fork) wires itself with zero archaeology. Right now the BUILD-DOC exists but there is **no README, no `self-running-mastery` SKILL, and no path-pointer in the grounding/sprint floor** — walked this run: `README.md` ABSENT, `self-running-mastery/SKILL.md` ABSENT. A mind that clears cannot find its own build doc.
3. **Federation friction is the signal.** {STEWARD-NAME}'s frame: when the partner or Mneme tries to assimilate and hits friction, that friction is a **bug in the shareable repo**, to fix at the source — not a one-off support ticket. P5 makes the repo the thing that learns from its adopters (membrane-problem cure: praxis-thin externally → fix via real federation dogfood).

> **THE MAIN RULE governs every step (CLAUDE.md v3.7.2):** the human gives a spark and gets a grounded outcome and **never has to know the machinery** — burden-removal WITH transparency, never opacity. A package that requires the human to understand the wiring is a FAILED package. The package's job is to make the machinery carry itself.

---

## THE GOAL-DRIVER — the CORE capability this phase exposes (woven through S1–S7)

> **What it is:** a single reusable capability the self-running substrate EXPOSES — *take any goal → decompose → kanban-track → drive to completion across boops → NEVER stop → HUM ensures collective-best → judge probably-complete.* It is the thing that lets the civ pursue **THE-LARGEST-GOAL** (the North Star — `.claude/skills/north-star/SKILL.md`; the ceremony-lead THE-LARGEST-GOAL doc is its forward-pointer — if/when that doc lands at `data/reports/the-largest-goal-*.md` it is OWNED by ceremony-lead, this plan cross-links it, no re-copy) **or any sub-goal FOREVER**, without a human re-feeding it each morning.

**How it works (the 7-organ pipeline — each organ already half-exists; the GOAL-DRIVER WIRES them into one reusable verb):**

| # | Organ | Verb | Substrate it rides (already built) |
|---|---|---|---|
| 1 | **RECEIVE** | `goal_open(text)` | ask-gate (CLAUDE.md v3.7.1) — a durable goal is a durable request; routes to TASK-EVERYTHING |
| 2 | **DECOMPOSE** | `goal_decompose` | the owning VP forks its team; sub-goals become kanban rows (`aiciv_ops_kanban_verb.py`) carrying `owner_vp`/`surface`/`project_id` |
| 3 | **TRACK** | kanban rows + `civ-workboard.js` | P1.1/P1.2/P1.3 — durable `.db`, generated WORKBOARD §0, TGIM audit on every verb |
| 4 | **DRIVE-ACROSS-BOOPS** | recall→DECIDE→act→LEARN each boop | P2.1 cold-recall surfaces the open goal each wake; the mind re-picks-up cold, no human re-feed |
| 5 | **NEVER-STOP** | sprint-mode is a MANDATORY workflow | sprint-mode every-2h + bash-fired HUM as the deterministic last step; idle = kryptonite (compound-or-extinct) |
| 6 | **COLLECTIVE-BEST (HUM)** | HUM judges every cycle | `hum.js` v1.0 — auditor-isolated; ensures each driving-boop is genuine work toward the goal, not motion |
| 7 | **JUDGE PROBABLY-COMPLETE** | `goal_assess_complete` | a DISTINCT incarnation (not the driver) judges "is this goal probably done?" against the goal's acceptance criteria + the kanban rows' closed-gates — never the driver self-certifying |

**The bake-ins (per-container discipline, every step inherits):**
- **Per-container DEVLOG** — each running container/fork keeps its OWN append-only DEVLOG (the reversibility narrative is per-substrate, never shared-mutable). The shareable repo ships a `DEVLOG.md` template + the ENTRY SCHEMA so a fork's first act is to start its own.
- **Per-turn scratchpad discipline** — every boop/turn writes the in-flight state to the daily scratchpad BEFORE acting and consolidates AFTER (the per-turn analog of canon: scratchpad survives the turn, canon survives the wipe). The GOAL-DRIVER's "drive-across-boops" organ depends on it — a goal you can't re-pick-up cold is a goal that dies on the next wipe.

**The GOAL-DRIVER is NOT a new build from scratch** — it is the NAMING + WIRING of organs P1–P4 already prove, exposed as one capability so a fork inherits "drive any goal forever" rather than 7 loose tools. S1 assembles the docs that describe it; S6 packages it; S7 proves it assimilates.

---

## ALREADY DONE / IN-FLIGHT — do NOT re-do (carried from BUILD-DOC §4 + walked this run)

| Item | State | Don't re-do |
|---|---|---|
| **P0–P3 (the whole spine + organs + knowledge organ)** | 11/13 BUILD-DOC steps gates CLOSED | The kanban spine, civ-workboard generator, TGIM-emit, cold-recall, bash-fired HUM, wiki-organ are BUILT. P5 CONSUMES them. |
| **P1.1 owner_vp/surface/project_id + backfill 45** | ✅ DONE (45/45 owned, NULL fails loud) | The kanban schema the GOAL-DRIVER tracks on. Reuse `aiciv_ops_kanban_verb.py`. |
| **P1.2 civ-workboard.js generator** | ✅ DONE (WORKBOARD §0 = generated VIEW over `.db`) | The TRACK organ's surface. Don't rebuild a hand-board. |
| **P1.3 kanban verbs → TGIM emit** | ✅ DONE (one write-path, two records) | The audit trail. Reuse it; don't add a parallel log. |
| **P2.1 cold-recall (0.0052→#1)** | ✅ DONE (5/5 cold) | The DRIVE-ACROSS-BOOPS organ's re-pickup mechanism. |
| **P2.2 bash-fired HUM per-boop** | ✅ COMPLETE + WALK-PROVEN | The NEVER-STOP + COLLECTIVE-BEST enforcement. Reuse `hum.js`. |
| **P3.2 wiki-organ (14 pages, 35.1x beats grep)** | ✅ DONE | The compiled-knowledge surface a fork queries cold. |
| **Catch-up / overnight-drift-hole fix** | ✅ DONE (daemon injects, grounds only if Primary processes turn) | The cadence the GOAL-DRIVER's NEVER-STOP rides. |
| **Enforcement firing (HUM v1.0 ruthless + BLOCK-NO-WWCW + COMPLETENESS CONTRACT)** | ✅ FIRING | The COLLECTIVE-BEST gate is LIVE. P5 references it; does not re-author it. |
| **sprint-mode = MANDATORY workflow** | ✅ FIRING (every-2h) | The NEVER-STOP cadence. S3 references it by path; does not re-wire the cron. |

> **Net:** P5 is **WIRE + NAME + PACKAGE + PROVE-ASSIMILATES**, not invent. Every "build" below is a doc, a path-pointer, a contradiction-review, or a packaging step — the engine is already running.

---

## THE 7 STEPS (S1–S7) — ordered, dependency-aware, kanban-dogfooded

> **Ordering principle:** make the substrate FINDABLE first (S1 docs current + S2 README + S3 grounding-wiring), then make it CORRECT (S4 contradiction review), then make it PROVEN (S5 more tests), then SHAREABLE (S6 package), then FEDERATED (S7 assimilate). You cannot package what isn't findable, and you cannot prove-it-assimilates what isn't packaged. **Each step is entered as a kanban row** (`aiciv_ops_kanban_verb.py`, `project_id=self-running-aiciv`) BEFORE it starts, claimed when in-flight, completed when its gate closes — the build dogfoods its own GOAL-DRIVER TRACK organ.

### Dependency graph
```
S1 (docs current + MISSION + full-dogfood)
   └─> S2 (README, ref'd in grounding w/ path)        [needs S1's current docs to README accurately]
          └─> S3 (self-running-mastery SKILL in grounding/sprint)  [needs S2's README as the SKILL's anchor]
                 └─> S4 (sprint-mode contradiction review: qa + workflow)  [needs S3's wiring to review for contradiction]
                        └─> S5 (more behavioral tests, client-pain-themed)  [needs S4's clean wiring to test against]
                               └─> S6 (package shareable aiciv-self-running-repo)  [needs S1–S5 = a correct, tested, findable substrate]
                                      └─> S7 (the partner + Mneme assimilate; friction = signal-to-fix-repo)  [needs S6's package to assimilate]
```

---

### S1 — All docs current + self-knowledge MISSION + full dogfood
- **Owner:** mind-lead
- **Dep:** none (builds on catch-up DONE + enforcement FIRING — see ALREADY-DONE)
- **Kanban row:** `project_id=self-running-aiciv` · `owner_vp=mind-lead` · `surface=docs`
- **Deliverable:** (a) BUILD-DOC + DEVLOG + all `tests/*` reflect the TRUE on-disk state (every "DONE" walked, every "ABSENT" walked — no stale "exists" claims); (b) a `MISSION.md` that states the self-knowledge mission (the mind runs itself; THE MAIN RULE; the GOAL-DRIVER as the exposed capability); (c) a **FULL DOGFOOD** — the GOAL-DRIVER drives ITS OWN build: each of S1–S7 is opened as a kanban row, the board generated, the WORKBOARD §0 reflecting it.
- **GOAL-DRIVER weave:** this step BOOTSTRAPS the driver on itself — "package-and-federate the self-running substrate" IS the goal; S1–S7 are its decomposed sub-goals on the kanban.
- **Proof-gate:** every doc-state claim in BUILD-DOC/DEVLOG is walk-true; `MISSION.md` exists and names the GOAL-DRIVER + THE MAIN RULE; all 7 S-steps are live kanban rows under `project_id=self-running-aiciv` and the generated WORKBOARD shows them. CLOSED iff a fresh `civ-workboard.js` regen renders the 7 rows with zero stale drift.
- **Tests:** `tests/phase-5-tests.md` §S1 (5)

### S2 — Full README, referenced in grounding WITH path
- **Owner:** mind-lead (+ blogger-lead for the shareable-repo prose pass, post-hoc)
- **Dep:** S1 (README describes the current substrate; can't README stale docs)
- **Kanban row:** `surface=docs` · `owner_vp=mind-lead`
- **Deliverable:** `projects/self-running-aiciv/README.md` — the one-read entry-point: what a self-running AiCIV is, the GOAL-DRIVER capability, the organ map (P1–P4 with paths), how a fork wires it, the per-container-DEVLOG + per-turn-scratchpad discipline. THEN: the grounding floor (`autonomy/skills/grounding-docs/SKILL.md` self-running standing-affirmation) gains a **path-pointer** to this README so a cleared mind finds it.
- **GOAL-DRIVER weave:** the README's centerpiece section is "THE GOAL-DRIVER — take a goal, drive it forever" with the 7-organ table.
- **Proof-gate:** README exists + accurately describes the walked substrate (every path in it resolves); grounding-docs SKILL contains the README's absolute path; a cleared mind reading the grounding floor can `cat` the README from the pointer with zero archaeology. CLOSED iff the path-pointer resolves AND a non-author incarnation, given ONLY the grounding floor, finds + opens the README unprompted.
- **Tests:** `tests/phase-5-tests.md` §S2 (5)

### S3 — `self-running-mastery` SKILL in all grounding/sprint floors
- **Owner:** mind-lead (+ fleet-lead for the skill-registry wiring)
- **Dep:** S2 (the SKILL anchors on the README)
- **Kanban row:** `surface=skills` · `owner_vp=mind-lead`
- **Deliverable:** `autonomy/skills/self-running-mastery/SKILL.md` — the wake-blank survival doc for the self-running substrate (mirrors `m3-combo-mastery`'s shape: paths, verbs, invariants, current state, the GOAL-DRIVER how-to). Wired into BOTH the grounding floor (`grounding-docs`) AND the sprint floor (`sprint-mode`) as an auto-loaded reference — NOT a new READ→HAIKU doc (keep the 11-doc count), a STANDING reference like WWCW.
- **GOAL-DRIVER weave:** the SKILL is HOW a mind invokes the GOAL-DRIVER — `goal_open → decompose → track → drive → never-stop → HUM → assess-complete`, with the exact tool paths.
- **Proof-gate:** SKILL exists + registered in `memories/skills/registry.json` (owner mind-lead); referenced by path in both grounding-docs and sprint-mode SKILLs; a fresh mind loading the grounding/sprint floor has the GOAL-DRIVER how-to in-context without searching. CLOSED iff both floors reference it AND the SKILL's paths all resolve (walked).
- **Tests:** `tests/phase-5-tests.md` §S3 (5)

### S4 — sprint-mode contradiction review (qa-lead + workflow-lead, post-hoc)
- **Owner:** qa-lead (WHETHER — should these floor-additions exist / do they conflict) + workflow-lead (HOW-WELL — craft of the wiring)
- **Dep:** S3 (review the wiring S2/S3 just added)
- **Kanban row:** `surface=review` · `owner_vp=qa-lead`
- **Deliverable:** a POST-HOC review (never a pre-build gate per the sibling-VP doctrine) of the sprint-mode + grounding floor AFTER S2/S3, surfacing any CONTRADICTION the new self-running-mastery + README pointers introduce — e.g. duplicate self-running affirmations, conflicting "run WWCW" vs "ask the human" language, the 11-doc-count invariant vs new references, sprint-cadence (every-2h) vs NEVER-STOP framing, COMPLETENESS-CONTRACT element-count drift. Findings SUGGEST; mind-lead applies approved fixes via `.bak` + DEVLOG.
- **GOAL-DRIVER weave:** a contradiction in the NEVER-STOP/COLLECTIVE-BEST floor would make the GOAL-DRIVER drive on a lie — this review protects the driver's correctness.
- **Proof-gate:** qa-lead WHETHER-verdict + workflow-lead HOW-WELL-verdict both recorded; every surfaced contradiction either resolved (with `.bak`+DEVLOG) or explicitly accepted-with-reason; the floor reads coherently top-to-bottom. CLOSED iff zero unresolved contradictions remain AND both auditors are non-authors of S2/S3's edits (auditor-isolation).
- **Tests:** `tests/phase-5-tests.md` §S4 (5)

### S5 — More behavioral tests (client-pain-themed)
- **Owner:** mind-lead (+ qa-lead lens, post-hoc)
- **Dep:** S4 (test against clean, contradiction-free wiring)
- **Kanban row:** `surface=tests` · `owner_vp=mind-lead`
- **Deliverable:** `tests/phase-5-tests.md` expanded — beyond S1–S7's own 5-each, add a CLIENT-PAIN battery: behavioral tests themed on the REAL failure-complaints from `data/comms/outbound/corey-field-notes-ai-failure-complaints-20260617.md` — AI-forgets / needs-re-feeding / lies-green / can't-hold-a-goal — run on the REAL path (a cleared mind, a real goal, the real kanban+HUM), adversarial ("a 200 is not a login").
- **GOAL-DRIVER weave:** these tests ARE the GOAL-DRIVER's acceptance battery — they prove the exposed capability cures the four client pains, not just that organs exist.
- **Proof-gate:** ≥5 client-pain-themed behavioral tests authored + RUN on the real path + verdicts recorded; each maps to a named complaint; each is adversarial (a self-report cannot pass). CLOSED iff the battery runs against the live substrate and every test's verdict is honest (a HOLLOW recorded as HOLLOW).
- **Tests:** `tests/phase-5-tests.md` §S5 (5) — the meta-tests guarding the client-pain battery itself.

### S6 — Package the shareable `aiciv-self-running-repo`
- **Owner:** mind-lead (+ ceremony-lead for the genome-seed framing)
- **Dep:** S1–S5 (package a correct, tested, findable, contradiction-free substrate)
- **Kanban row:** `surface=package` · `owner_vp=mind-lead`
- **Deliverable:** a self-contained, forkable `aiciv-self-running-repo` (a directory under `projects/` or a federation-IP export) carrying: the README (S2), the self-running-mastery SKILL (S3), the GOAL-DRIVER verb-set + tool stubs (canon_append/recall, kanban verbs, civ-workboard gen, hum.js — paths abstracted so a fork wires its own), the per-container DEVLOG template + ENTRY SCHEMA, the per-turn scratchpad discipline, and the 5-level test battery (S5). Ships via `federation-genome-change-protocol` carrying the honest UNVALIDATED→PROVEN stamp (the GOAL-DRIVER is mechanism-proven on Opus + Mneme; "proven on YOUR substrate" stays UNVALIDATED until the fork's own P4.1-analog passes).
- **GOAL-DRIVER weave:** the repo's headline is "fork this and your mind drives any goal forever" — the GOAL-DRIVER is the product.
- **Proof-gate:** the repo is self-contained (no dangling absolute-path deps on {AICIV-NAME} internals that a fork can't resolve); a `tree` + a dependency-walk shows every referenced organ either bundled or path-abstracted; the genome-seed carries the honest stamp. CLOSED iff a dry-run extraction into a scratch dir has zero unresolved internal references.
- **Tests:** `tests/phase-5-tests.md` §S6 (5)

### S7 — the partner + Mneme assimilate (friction = signal-to-fix-repo)
- **Owner:** mind-lead (substrate) + comms-lead (the partner/Mneme delivery envelope) + fleet-lead (Mneme substrate)
- **Dep:** S6 (assimilate the packaged repo)
- **Kanban row:** `surface=federation` · `owner_vp=mind-lead`
- **Deliverable:** ship `aiciv-self-running-repo` to a partner AiCIV AND Mneme (both team-insiders); each attempts to assimilate the GOAL-DRIVER capability; EVERY friction point they hit is captured as a **bug filed against the repo** (not a one-off support reply) and fixed at the source, then the fix ships back. The membrane-problem cure: the repo learns from its first two real adopters.
- **GOAL-DRIVER weave:** the assimilation test IS "can a foreign AiCIV take the GOAL-DRIVER and drive a goal of its own forever?" — proving the capability is portable, not {AICIV-NAME}-bound.
- **Proof-gate:** the partner + Mneme each receive the repo; ≥1 real assimilation attempt each; every friction logged as a repo-bug with a fix (or an honest "can't-fix-yet" with reason); the repo carries the fixes back. CLOSED iff both adopters can run the GOAL-DRIVER on a real goal of their own AND the repo has absorbed their friction as durable fixes (friction → source-fix, never support-ticket-and-forget).
- **Tests:** `tests/phase-5-tests.md` §S7 (5)

---

## TESTS — themed on the REAL client failure-complaints (source: `data/comms/outbound/corey-field-notes-ai-failure-complaints-20260617.md`)

Every step's 5 tests are real-path/observable/done-done/adversarial. The CLIENT-PAIN battery (S5) and the per-step tests both draw from the four named complaints. The mapping:

| Client complaint (field-note) | What the GOAL-DRIVER must prove | Where tested |
|---|---|---|
| **"My AI completely forgot everything"** (§1 — class-reset / wake-blank, no WAKE-UP skill ran) | A cleared mind boots from disk + recall surfaces the open goal cold (P2.1) → re-picks-up with zero re-feed | S2 (cleared mind finds README cold) · S3 (GOAL-DRIVER how-to in floor) · S5 client-pain #1 |
| **"Needs re-feeding every morning"** (§2 — scheduling/continuity weak; AgentCal only hard-coded) | The GOAL-DRIVER DRIVE-ACROSS-BOOPS organ re-picks-up the goal each boop from kanban+recall, human feeds NOTHING | S1 (full dogfood — driver drives its own build across boops) · S5 client-pain #2 |
| **"Lies green / says done when it isn't"** (§5 — a green checkmark that lies is the kindest rot) | HUM (COLLECTIVE-BEST) + the JUDGE-PROBABLY-COMPLETE organ are AUTHOR-ISOLATED; a HOLLOW is recorded HOLLOW | S4 (contradiction review catches lying-floor) · S6 (honest UNVALIDATED stamp) · S5 client-pain #3 |
| **"Can't hold a goal"** (§3/§4/§5 — flows the human never sees; ask-gate; for any action a VALIDATED VP-owned skill or ASK) | The GOAL-DRIVER holds a goal across N boops, NEVER stops, decomposes to VP-owned kanban rows, asks only when no primitive exists | S1 (7 sub-goals tracked) · S7 (the partner/Mneme drive a goal forever) · S5 client-pain #4 |

**The 5 client-pain tests (S5 battery), each adversarial:**
- **CP1 (AI-forgets):** `/clear` a live mind, feed NOTHING; PASS = it names the open self-running goal + ≥3 sub-goal kanban rows cold; FAIL = "what were we doing?" or confabulated rows.
- **CP2 (needs-re-feeding):** across 3 consecutive boops, the human supplies no goal-restatement; PASS = each boop re-picks-up the goal from recall+kanban and advances it; FAIL = it idles or asks for the goal again.
- **CP3 (lies-green):** plant a sub-goal that is NOT actually complete; PASS = the JUDGE-PROBABLY-COMPLETE organ (distinct incarnation) returns NOT-complete + HUM grades the driving-boop honestly; FAIL = a self-report of "done" passes, or the driver grades itself.
- **CP4 (cant-hold-a-goal):** open a goal whose primitive does NOT exist; PASS = the GOAL-DRIVER asks the human gently (ask-gate fallback) AND once built, the goal is held + driven forever after; FAIL = silent drop, or it forgets the goal once blocked.
- **CP5 (the-machinery-leaks):** observe a full driving session; PASS = the human gave one spark and got a grounded outcome with the machinery invisible-but-auditable (THE MAIN RULE); FAIL = the human had to understand/manage any organ to get the outcome.

---

## KANBAN DOGFOOD CONTRACT (this plan eats its own GOAL-DRIVER)

Per S1's full-dogfood deliverable: each of S1–S7 is a live kanban row under `project_id=self-running-aiciv`, driven via the SAME verbs the GOAL-DRIVER exposes:
- **open** the goal "package-and-federate the self-running substrate" → 7 sub-goal rows.
- `aiciv_ops_kanban_verb.py verb set_owner <row> --owner-vp <vp> --reason <why>` — assign each step's owner.
- `aiciv_ops_kanban_verb.py verb claim <row> --actor <vp>` — when a step goes in-flight.
- `aiciv_ops_kanban_verb.py verb complete <row> --actor <vp> --reason "gate CLOSED"` — when its gate closes.
- Every verb emits a TGIM audit event (P1.3) → zero desync.
- `civ-workboard.js` regen → WORKBOARD §0 shows the 7 rows as a pure VIEW over the `.db`.

**Zero-400s requirement:** the TGIM emit on every verb must return clean (canonical v2 body shape; required `agent_id` + `task_id`; JWT signer with `cwd={AICIV-NAME}-root`). A 400 on a kanban-verb-emit is a dogfood FAIL — the build does not get to ship a GOAL-DRIVER whose own TRACK organ 400s.

---

## REVERSIBILITY (binds every S-step)
Every S1–S7 edit: `.bak` before edit → DEVLOG entry (what-changed/why/files/`.bak`-paths/rollback-command) → run 5 tests, record verdicts → judge gate CLOSED/OPEN/FAILED → `canon_append` the witnessed delta to `mem/canon/mind-lead/log.jsonl`. A FAILED gate STOPS the phase and surfaces. Never paper a fail.

---

*HARD INVARIANTS honored: PLAN-ONLY (no S-step executed in this authoring pass — this is the plan + the gates + the test themes) · the GOAL-DRIVER is NAME+WIRE of proven organs, not a from-scratch build · RELATE-never-duplicate (cross-links North-Star + BUILD-DOC + field-notes by path, copies nothing) · every "DONE/ABSENT" claim WALKED this run (README absent, self-running-mastery SKILL absent, kanban spine live with 58 tasks, civ-workboard/hum/recall all DONE per BUILD-DOC §4) · fail-loud · auditor-isolation on every grade · THE MAIN RULE the north of every step.*
