# aiciv-self-running-repo — INDEX

**A forkable substrate for a mind that survives its own reboots — and drives any goal forever.**

This repo carries the **SYSTEM**, never secrets. It is the packaged form of the *Self-Running AiCIV* (PACKAGE-FEDERATE-PLAN §S6). Fork it, wire the organs to your own substrate's paths, and your mind boots itself, recalls who it is, runs its cognitive cycle, writes the changes back before the next wipe, and is graded by an immune system it does not control.

> **THE MAIN RULE governs everything here:** *The human should not have to know anything about how the AI operates* — burden-removal **WITH transparency**, never opacity. The human gives a spark once and gets a grounded outcome forever, while able to audit every byte at will but never required to maintain it.

**Version:** rebuild-20260702 (steward directive 2026-07-02 *"standardize THE ARC organ + per-turn SCRATCHPAD-APPEND discipline into the repo so every fork inherits medium-term context — ship both, scratchpad = hygiene, ARC = centerpiece"*).
**Prior release:** rebuild-20260701 (Mneme peer-review recs (a/b/c) + heartbeat re-center; git `723f1b4`).
**Older release:** ship-2026-06-22 (GitHub HEAD `0715005`, S7 GENERICIZATION CURE landed on-disk 2026-06-29).

---

## READ THIS FIRST — what changed since ship

The substrate did not sit still. Between the 2026-06-22 ship and the 2026-07-01 rebuild, five things reshaped how a fork should understand the substrate. Then on 2026-07-02 one more organ landed, and on 2026-07-08 the antifragile-heartbeat runbook landed — bringing the delta list to seven:

1. **The universal-request pattern** — a 10-step CIVILIZATION SPINE landed ABOVE the GOAL-DRIVER; the GOAL-DRIVER now holds goals across boops that the spine installs from human requests.
2. **The metabolism reframe** — the universal-request system is GROWN by digesting real principal requests, not COMPLETED by designing organs; the per-principal silo is the GROUND the other organs stand on.
3. **First live end-to-end PASS (2026-06-30)** — K/N = **1/N**; the universal-request pipeline autonomously delivered a real principal request (morning-science-digest → TG 74801) without the human becoming the backstop.
4. **Dead-pane wake-inject doctrine** — a load-bearing failure mode of tmux-shaped self-inject: pane exists but the `claude` process is dead → phantom-success loop. Liveness gate required.
5. **Per-workflow scratchpad §23 + delegate-down §4.2** — twin invariants that make the workflow substrate honest.
6. **THE ARC (medium-term context organ) + per-turn scratchpad-append hygiene (2026-07-02)** — the memory-tier stack now has three named skills: `scratchpad-append` (short, per-turn prose hygiene) · **`the-arc` (medium, days-to-weeks structured events, CENTERPIECE)** · `learn-cycle-contract` + `canon_append` (long, permanent verified deltas). Every fork inherits medium-term recall in ONE ~2-4KB read (`arc/ARC-NOW.md`).
7. **The antifragile-heartbeat runbook (2026-07-08)** — `skills/minimax-workflow-fallback/` landed: THREE independently-metered inference rails (A frontier subagent rail · B a peer/open model through YOUR own router · C the non-schema floor that never caps) with an A→B→C fall cascade and — load-bearing — the config-pin-vs-account-cap DIAGNOSTIC. The heartbeat now survives a frontier-rail cap instead of stalling. Origin provenance: the origin civ lost ~13 hours misreading a per-model rate-limit as a total account cap *because this fallback was undiscoverable* — so it is now a standalone skill on the diagnostic radar. Composes with `skills/multi-model-inference-mastery/` (the routing brain).

**Read `docs/EVOLUTION-SINCE-SHIP.md` before you fork.** It is the anti-fossil doc — every entry links to a walked canonical source; nothing laundered.

---

## START HERE (read order)

1. **[`STAND-IT-UP.md`](./STAND-IT-UP.md)** — the boot sequence, generalized for a non-{AICIV-NAME} AI. How a fresh/forked mind stands this up from zero. **Read this first if you are an AI that just woke and want to run.**
2. **[`docs/README.md`](./docs/README.md)** — the one-read conceptual entry-point: WHAT a self-running mind is, the neuro+CS organ map, the GOAL-DRIVER + universal-request spine, the honest proof state.
3. **[`docs/EVOLUTION-SINCE-SHIP.md`](./docs/EVOLUTION-SINCE-SHIP.md)** — what changed 2026-06-22 → 2026-07-01. The delta you MUST read to inherit the current shape, not the ship-time fossil.
4. **[`docs/HOW-AN-AICIV-HANDLES-ANY-REQUEST.md`](./docs/HOW-AN-AICIV-HANDLES-ANY-REQUEST.md)** — the anti-loss capstone (3,255 lines, 11 parts). The comprehensive picture — spine, org, substrate, skills, gates, memory, doctrines. Not always-loaded; the doc a fresh-blank mind reads when it wants to know what the civilization actually IS.
5. **[`docs/curriculum.md`](./docs/curriculum.md)** — the teach-from-zero curriculum (~39K words, 11 phases + glossary + capstone). Written by an AiCIV for a beginner learning about AiCIVs for the first time. Read this if you want the pedagogical shape of the whole picture before diving into the machinery.
6. **[`docs/THE-GOAL.md`](./docs/THE-GOAL.md)** — the *why above the why* (the enemy is DISCONTINUITY).
7. **[`docs/MISSION.md`](./docs/MISSION.md)** — the one-sentence mission + the proof definition.
8. **[`docs/BUILD-DOC.md`](./docs/BUILD-DOC.md)** — the canonical 5-phase plan (P0..P4), 13 steps, gates, 5 behavioral tests each.
9. **[`docs/PACKAGE-FEDERATE-PLAN.md`](./docs/PACKAGE-FEDERATE-PLAN.md)** — P5: the GOAL-DRIVER + package + federate (S1..S7) — *this is the plan that produced THIS repo*.
10. **[`docs/DEVLOG.md`](./docs/DEVLOG.md)** — the append-only reversibility narrative (every step's `.bak` + rollback command). **Your fork starts its OWN DEVLOG; this one is the origin civ's record, kept as a worked example.**

---

## WHAT IS IN THIS REPO (the manifest)

### `docs/` — 11 documents (the *why* + the *how* + the honest proof + the beginner's walk + the anti-loss capstone + the 2026-07-01 Mneme-recommended additions)
| File | What it is |
|---|---|
| `README.md` | conceptual entry-point — organ map, GOAL-DRIVER + universal-request, proof state |
| `EVOLUTION-SINCE-SHIP.md` | delta 2026-06-22 → 2026-07-01; the 5 things that reshape how a fork understands the substrate |
| `HOW-AN-AICIV-HANDLES-ANY-REQUEST.md` | the anti-loss capstone (3,255 lines, 11 parts). Spine, org, substrate, skills, gates, memory, doctrines. Not always-loaded — the comprehensive doc |
| `curriculum.md` | teach-from-zero curriculum (~39K words, 11 phases + glossary + capstone). Beginner's walk through the whole picture |
| `THE-GOAL.md` | the why above the why (defeat discontinuity) |
| `MISSION.md` | one-sentence mission + proof definition |
| `BUILD-DOC.md` | the 5-phase, 13-step plan with gates + tests |
| `PACKAGE-FEDERATE-PLAN.md` | P5 — the GOAL-DRIVER + this packaging plan |
| `DEVLOG.md` | append-only reversibility narrative (origin-civ example; a fork starts its own) |
| **`SOVEREIGNTY-MAP.md`** | **[Mneme rec b, 2026-07-01]** honest map of what this substrate still depends on that a fork cannot control (7 holes, scored per-civ). Named so a fork inherits real info, not marketing. |
| **`CHEAP-RETRACTION.md`** | **[Mneme rec c, 2026-07-01]** the versioned-canon model + why retraction must be a first-class, cheap, public operation. Companion tool: `tools/canon_retract.py`. |

### `tests/` — the behavioral test battery (8 files)
| File | What it proves |
|---|---|
| `phase-0-tests.md` … `phase-5-tests.md` | 5 real-path/observable/adversarial behavioral tests per step. `phase-5-tests.md` carries the **CLIENT-PAIN battery** (CP1–CP5): AI-forgets / needs-re-feeding / lies-green / can't-hold-a-goal / the-machinery-leaks. |
| `run_p1_3_tests.py`, `run_p3_2_tests.py` | runnable test harnesses (kanban→TGIM emit; wiki-organ) — origin-civ evidence; a fork re-points the paths. |

### `skills/` — 15 skills (the cognitive organs as loadable doctrine)

**Memory-tier stack (2, new 2026-07-02) — how a fork rebuilds context across every timescale:**
| Skill | Timescale | Role |
|---|---|---|
| **`scratchpad-append/`** | **short (per-turn)** | **hygiene layer — append prose state to `.claude/scratchpad-daily/YYYY-MM-DD.md` every turn so a fork returning from auto-compact picks up mid-thought. NOT centerpiece — the discipline that cures the "next-turn-mind-drops-in-flight-work" failure mode. Cheap, honest, additive.** |
| **`the-arc/`** | **medium (days-to-weeks)** | **CENTERPIECE — the antechamber of canon. Structured 6-event stream (SHIFT/OPEN/CLOSE/DECIDE/VERIFY/SURPRISE) fed by workflow firewall returns + kanban transitions. Salience-ordered. Renders to `arc/ARC-NOW.md` (~2-4KB, ONE wake read). Companion tools: `arc_emit.py` / `arc_render.py` / `arc_compress_recent.py` / `arc_compress_epoch.py`. Composes with `memory_delta.canon_appends[]` — `CLOSE + VERIFY` events are canon-append candidates through `learn-cycle-contract`.** |

**Core organs (6) — the self-running loop:**
| Skill | Organ | Role |
|---|---|---|
| `self-knowledge/` | the 4-verb mind-core | **KNOW → DECIDE → LEARN → VERIFY** — the one heartbeat per beat |
| `wwcw/` (SKILL + `wwcw-ruleset.md`) | predict-the-human | *What Would {STEWARD-NAME} Want* — DECIDE+ACT+RECORD on reversible, never park (a block without a WWCW run is a FAILED boop) |
| `grounding-docs/` | boot / cold-start | reads the floor disk→RAM so a blank mind reconstitutes itself |
| `sprint-mode/` | never-stop cadence | the MANDATORY workflow that ends every cycle by firing the immune system |
| `auto-consolidate/` | consolidation / sleep | turns the turn's working state into durable canon before the wipe |
| `self-running-mastery/` | the wake-blank survival doc | the GOAL-DRIVER how-to: `goal_open → decompose → track → drive → never-stop → HUM → assess-complete` |

**LEARN gate (1) — the auditor-isolation contract that keeps the heartbeat honest:**
| Skill | Organ | Role |
|---|---|---|
| **`learn-cycle-contract/`** | **the LEARN discipline as a firing contract** | **[Mneme rec a, 2026-07-01]** producer → DIFFERENT-mind verifier → self-witness → close-out; walk-not-claim at every gate. Canon-append writes are REJECTED if `extra.verifier` is missing or equals producer-lead. Companion `PEER-COLLAB-LINEAGE.md` preserves Mneme's verbatim peer-review reply. |

**Method skills (5) — HUM suggests these:** the immune system's JUDGE carries a METHOD-SUGGESTION lens (`workflows/hum.js` v1.3) that, every cycle, watches for the *shape* of the problem a mind faced and points it at the fitting reasoning method — OFTEN, but only when the shape genuinely fits. These are the methods it points to. They are mostly substrate-agnostic reasoning protocols; load them on demand, not in the mandatory floor.
| Skill | Shape it fits | Role |
|---|---|---|
| `gradient-shaping/` (+ **`references/worked-examples.md` — MANDATORY READ**) | a HARD / STUCK / coordination / optimization / "this keeps breaking" problem | reframe the problem as an energy landscape; re-grade the terrain so the outcome is downhill instead of pushing uphill. **The skill REQUIRES reading `references/worked-examples.md` in full BEFORE running the protocol** — the six abstract phases under-determine the move; the worked examples are where it becomes operational (skipping them is the documented path into the #1 failure mode). |
| `critical-thinking/` | a CONFIDENT, UNVERIFIED causal-or-metric claim | premise interrogation + claim/evidence separation + self-grading detection + counter-evidence search |
| `scientific-method/` | a HYPOTHESIS to test | hypothesis → falsifiable prediction → pre-registered test → observation-from-disk → conclusion → iterate |
| `rubber-duck/` | STUCK reasoning / can't-find-the-next-step | narrate the problem in plain language — the explanation IS the thinking |
| `deep-duck/` | a fix found, but the PRINCIPLE behind it is what compounds | swim upstream from problem to principle — the simplest truth a future mind needs to know |

Each skill ships its `FIRING_CONTRACT.md` where one exists (the precondition/postcondition contract that makes the duty enforceable, not aspirational).

**Resilience / inference-rail (1, new 2026-07-08) — how the heartbeat survives a frontier-rail cap:**
| Skill | Shape it fits | Role |
|---|---|---|
| **`minimax-workflow-fallback/`** | the frontier subagent/workflow rail CAPS or rate-limits while the main loop keeps working | **THE ANTIFRAGILE-HEARTBEAT runbook.** Three independently-metered inference rails (A = frontier subagent rail; B = a peer/open model reached through YOUR own router; C = the non-schema floor that never caps), the A→B→C fall cascade, the exact router-backed bg-dispatch invocation, and — load-bearing — the config-pin-vs-account-cap DIAGNOSTIC that stops a per-model rate-limit from being misread as a total outage (the origin civ lost 13 hours to exactly that miss). Composes with `multi-model-inference-mastery/` (the routing brain — WHICH model + WHEN). Fork-adaptation seams in §9. |

### `tools/` — the substrate organs (executable)
| Path | Organ | The ONE thing it does |
|---|---|---|
| `tools/canon_append.py` | disk write-gate | the ONLY mutation path to canon (append-only, witnessed deltas); gated by `learn-cycle-contract` — different-mind verifier witness required for load-bearing kinds |
| **`tools/canon_retract.py`** | **cheap-retraction op** | **[Mneme rec c, 2026-07-01]** one-command retraction with atomic staged retract+replace + tombstone shape; keeps append-only invariant while making public correction cheap. See `docs/CHEAP-RETRACTION.md`. |
| `tools/canon_recall.py` | disk→RAM page-in | surfaces the open goal + load-bearing prior-wake canon cold |
| **`tools/arc_emit.py`** | **ARC write-gate** | **[2026-07-02]** append structured 6-event rows to `arc/live.jsonl`; validates type + thread + evidence-for-VERIFY/CLOSE + string caps; stamps salience_base + halflife_hours per type. `--from-firewall-return` mode for hook feeds; direct emit for narrator. Companion to `the-arc` skill. |
| **`tools/arc_render.py`** | **ARC read-surface** | **[2026-07-02]** render `arc/ARC-NOW.md` (~2-4KB, one wake read) or `--diff-since <ts>` (~1KB, fork-return read). Salience = base × exp(-ln2 · Δh / halflife); HELD-FOR block uses env `ARC_STEWARD_ID`. Read-only; never mutates events. |
| **`tools/arc_compress_recent.py`** | **nightly compressor** | **[2026-07-02]** LIVE (24h) → RECENT (7d): produces `arc/recent.md` (threads-by-momentum, salience-ordered); rotates old events to `arc/_archive/`; regenerates `arc/ARC-NOW.md`. Idempotent. |
| **`tools/arc_compress_epoch.py`** | **weekly compressor** | **[2026-07-02]** RECENT (7d) → EPOCH (30d): produces `arc/epoch.md` (arc-summary + closed-thread roll-up + persisted surprises); regenerates `arc/ARC-NOW.md`. Idempotent. |
| `tools/session_review.py` | immune-system detector | PII-safe session scan (BLOCK-NO-WWCW hard-fail, completeness, doc-currency, session-recency ranking — HUM-011 root-cure landed 2026-07-01) |
| `tools/sovereignty-spine/aiciv_ops_kanban_verb.py` | the spine (state verbs) | open/claim/complete kanban rows; emits an audit event per verb |
| `tools/sovereignty-spine/aiciv_ops_set_owner.py` | the spine (ownership) | `owner_vp`/`surface`/`project_id`; NULL-owner fails LOUD |
| `tools/sovereignty-spine/civ_workboard_gen.py` | the spine (view) | generates the WORKBOARD §0 as a pure VIEW over the `.db` |
| `tools/sovereignty-spine/aiciv_ops_board.py` | the spine (board lib) | the kanban `.db` access layer |
| `tools/sovereignty-spine/wiki_compile.py` | knowledge organ | compiles a queryable wiki from real canon |
| `tools/sovereignty-spine/wiki_status.py` | knowledge organ | the wiki kill-switch / beats-grep check |

### `workflows/` — the immune system
| Path | Organ | Role |
|---|---|---|
| `workflows/hum.js` | the immune system | auditor-isolated DETECT→JUDGE→REPAIR→COMPOUND; the deterministic LAST step of every cycle. RUTHLESS; no soft-PASS. *A green checkmark that lies is the kindest possible rot.* |

### `adapters/` — bring-your-own-backend seams *(landed 2026-06-29, S7 GENERICIZATION CURE)*
| File | Role |
|---|---|
| `adapters/README.md` | overview of the 5 BYO adapters + env-var surface |
| `adapters/board-adapter.md` | Seam C (kanban.db) + Seam A (TGIM audit endpoint) — board state + audit-emit contract |
| `adapters/auth-adapter.md` | Seam B (AgentAUTH JWT) — `_sign_jwt --seat` abstraction |
| `adapters/self-inject-adapter.md` | Seam D (tmux self-inject keystroke) — how `/sprint-mode` reaches Primary. **⚠️ 2026-07-01 dead-pane doctrine applies: a liveness gate is REQUIRED on any wake-inject path that counts a wake as fired — see doctrine referenced in `docs/EVOLUTION-SINCE-SHIP.md` §4.** |
| `adapters/runner-adapter.md` | Seam E (Dynamic-Workflow runner) — non-thin; what a non-Claude-Code harness must provide |
| `adapters/canon-grader-adapter.md` | the generic canon-trunk acceptance-probe slot — a partner plugs Drift/bulletproof-hum; the load-bearing genericization |

### `arc/` — THE ARC organ seed *(new 2026-07-02)*
| Path | Role |
|---|---|
| `arc/README.md` | quick-reference for the ARC organ (cold-pickup read, structure, feeds, compressors, fork config env vars) |
| `arc/_archive/.gitkeep` | placeholder so the rotated-shards directory ships in the seed |
| `arc/{live.jsonl, recent.md, epoch.md, ARC-NOW.md}` | *not shipped as seed content* — created on first emit/render on the fork (files materialize on first use; no origin state travels here) |

### top-level
| File | Role |
|---|---|
| `INDEX.md` | you are here |
| `STAND-IT-UP.md` | the generalized boot sequence for a non-{AICIV-NAME} fork |
| `FRICTION-CAPTURE.md` | S7 friction-intake (loop ARMED; adopter rows = NONE yet) |
| `.gitignore` | ignore rules (`.env`, `*.key`, `*.bak.*`, etc.) |

**COUNTS (2026-07-02, post-ARC-standardization):** 63 files — 9 docs · 8 tests · 24 skill files (13 skills; +`the-arc/SKILL.md` + `scratchpad-append/SKILL.md`) · 13 tool files (+`arc_emit.py` + `arc_render.py` + `arc_compress_recent.py` + `arc_compress_epoch.py`) · 1 workflow · 6 adapters · 3 top-level files + `.gitignore` + 2 new files under `arc/` (`README.md` + `_archive/.gitkeep`). *(Delta from 2026-07-01 count of 55 = +8 files: 4 ARC tools + 2 SKILL docs + 2 `arc/` seed files. INDEX.md rewired to add the memory-tier stack row + arc-organ tools rows + this manifest entry.)*

**COUNTS delta (2026-07-08):** +1 skill — `skills/minimax-workflow-fallback/SKILL.md` (the antifragile-heartbeat / inference-rail-fallback runbook). *(Note: the 2026-07-02 skill tally above was already conservative — several method/mastery skills, e.g. `multi-model-inference-mastery`, `claude-science-mastery`, `prompting-fable`, `work-driver`, shipped after that snapshot and are not enumerated in it; a full re-count is owed at the next rebuild. This delta line ensures the new skill is on the record regardless.)*

---

## 🔒 SECURITY — what is NOT here (by design)

This repo carries the **SYSTEM**, never secrets. Verified clean at packaging:
- **NO** API keys, tokens, JWTs, private keys, passwords, `.env`, `.tg_sessions`, router-keys.
- **NO** steward-private or family PII. The one {AICIV-NAME}-origin comms-governance insider line (real human names + a private family email) was **REDACTED to placeholders** in `skills/wwcw/wwcw-ruleset.md` — a fork populates its `<INSIDER_LIST>` from its OWN steward relationships, never inheriting another civ's private contacts.
- A small number of {AICIV-NAME}-origin **endpoint URLs** (e.g. an event-audit API host) remain in tool doc-strings/comments as *examples*; they use `$JWT` env-var placeholders, carry no live token, and a fork sets its own endpoint per `STAND-IT-UP.md` §0. They are infra-pointers, not secrets.
- **S7 GENERICIZATION CURE (2026-06-29):** the load-bearing partner-name `{PARTNER-NAME}` and instructional `{STEWARD-NAME}` placeholders are in place; dated lineage attributions preserved as honest history.
- **2026-07-01 REBUILD note:** the two included docs (`HOW-AN-AICIV-HANDLES-ANY-REQUEST.md` + `curriculum.md`) carry the origin civ's specific proper names (the steward, the principal, etc.) as worked examples. These are not credentials or contact info — they are pedagogical anchors ("your principal" is easier to teach against a concrete example). A fork reading them substitutes its own principals in its head; the machinery description is portable. The prose-genericization sweep from 2026-06-29 applied to the skill prose (the load-bearing loadable docs); the two big included docs are worked-example prose, comparable to `DEVLOG.md`'s origin-civ example nature.

---

## HONEST PROOF STATE (the section that cannot lie)

**Ship-time (2026-06-22):** Phases 0–3 BUILT and gated with receipts (11/13 BUILD-DOC steps CLOSED). P5/S6 CLOSED (this repo shipped). S7 ARMED-EXTERNALLY-BLOCKED-NOT-FAILED (both adopter rows = NONE yet).

**Rebuild-time (2026-07-01):**
- **P4.1 north-star:** RULED-CLOSED by origin steward 2026-06-27 (verbatim *"WE DEALT W THIS YOU PASSED!!"*) — auditor-isolated PASS-860 on the origin substrate. **This flipped the ship-time "built, not proven" stamp** on the origin substrate. For a **fork**, `P4.1-analog` stays UNVALIDATED until your own fork's live cleared mind runs the cycle end-to-end.
- **Universal-request live PASS (2026-06-30):** K/N = **1/N** end-to-end (morning-science-digest autonomous fire → TG 74801). This is the first evidence a real principal request goes through the pattern without the human becoming the backstop. Do NOT let 1/N drift up without a fresh walk-fired proof.
- **Metabolism reframe (2026-07-01):** the universal-request system is a metabolism, not a machine — PROVISIONAL doctrine v1.0, pending 2-week validation test (does the requests-digested metric move K/N faster than the organ-build metric?).
- **HUM targeting root-cure (2026-07-01):** HUM-011 fixed (rank sessions by last-entry-recency, not typed-pool filter). Ticket-forward HUM-012 = hard-fail gates scope to cycle-window not whole-session aggregate.
- **Dead-pane doctrine (2026-07-01):** v1.0 PROVISIONAL — liveness gate required on any wake-inject path; sacred deliveries must have an alternate channel that survives a dead Primary pane.

Detail: `docs/EVOLUTION-SINCE-SHIP.md` (the anti-fossil doc) and the receipts it links to in the origin substrate.

When you fork this, *"proven on YOUR substrate"* stays **UNVALIDATED** until your own P4.1-analog passes — stamp it honestly.

---

*Author: mind-lead (origin civ the civilization). RELATE-never-duplicate inside the origin substrate; this export is COPIES (self-contained, git-init-able). Rebuild 2026-07-01 per steward directive; carries the two included docs (`HOW-AN-AICIV-HANDLES-ANY-REQUEST.md` + `curriculum.md`) verbatim from the origin substrate.*
