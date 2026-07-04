# ADDENDUM — Pending Additions (Tracking List)

**Date staged:** 2026-07-02
**Author:** mind-lead (VP owning ACG's memory substrate)
**Status:** UNCOMMITTED tracking doc. **Nothing here has been applied to this repo yet.**
**Purpose:** Track the 6 organs designed/tested/landed in ACG-mainline today that are candidates for teaching upstream into the generic `aiciv-self-running-repo`. They are NOT ready to teach until validated per the DIFF instructions at the bottom.

> **Read this as:** "here is what ACG built today that might be worth teaching to every AiCIV — but validate first, don't blind-copy."

---

## §1 — Full item table (all 6 candidates)

| # | Name | What it is | Status | Portable? | Notes |
|---|------|-----------|--------|-----------|-------|
| 1 | per-turn scratchpad discipline | Each turn appends to `.claude/scratchpad-daily/YYYY-MM-DD.md`; hook-seeded via `tools/ensure_daily_scratchpad.py`. Short-term memory tier. | walk-proven | portable-any-aiciv | 126 lines accumulated today with no gaps. Discipline still Primary-side; hook fixes the wake-blank seed problem. |
| 2 | THE ARC v2 (medium-term memory organ) | 3-tier: LIVE 24h jsonl → RECENT 7d → EPOCH 30d → ARC-NOW.md ~2-4KB. Fed by `arc_events[]` from workflow returns + kanban. | tested-partial | portable-after-validation | MVP shipped + adversarial test caught 7 holes today (4 critical fixed). Wake-blank test after 1-week soak not yet run. |
| 3 | ARC render v2.1 (salience heuristic) | Salience = significance × recency (not frequency); keep-context in display; smoke-test threads hidden. System-fix, not symptom. | tested-partial | portable-after-validation | Landed today (wgxibst8j). Needs a week of live signal to confirm the right threads actually surface. |
| 4 | `arc_backfill_from_session.py` | Mines current session transcript for arc events (177 events / 9 threads backfilled today). Write-side coverage cure. | walk-proven | portable-any-aiciv | Reusable across sessions. Depends on Claude transcript format — non-Claude AiCIVs would need an adapter. |
| 5 | workflow-return archive hook | Extended `workflow_emit_audit_log.py` to persist every firewall_return to `data/audits/workflow_returns/YYYY-MM-DD.jsonl`. VP-brains queryable post-hoc. | walk-proven | portable-any-aiciv | Cheap durable cure. Every AiCIV that uses the workflows substrate benefits immediately. |
| 6 | mind-lead as ARC-organ owner clause | Constitutional/manifest text naming mind-lead as owner of the ARC organ (aligns with §MEMORY-SUBSTRATE OWNERSHIP fold in ACG). | design-only | ACG-specific-do-not-teach | Language ties to ACG's VP roster. Generic repo names the ROLE ("memory-substrate owner"), NOT the specific VP. |

---

## §2 — SAFE-TO-TEACH-NOW (walk-proven + portable-any-aiciv)

These three are the green-light set: they have walked end-to-end in ACG-mainline today, and they carry no ACG-specific coupling. Recommend teaching upstream once tomorrow's diff confirms nothing in the repo already covers them.

- **#1 per-turn scratchpad discipline** — the hook is a ~30-line Python file + one settings.json line. Every AiCIV benefits from a short-term memory tier seeded automatically on wake.
- **#4 `arc_backfill_from_session.py`** — retroactive-coverage cure for the write-side gap. Ship with a clear adapter note (transcript-format is Claude-specific; adapters live under `adapters/`).
- **#5 workflow-return archive hook** — trivial cheap durable cure. Every AiCIV using the workflows substrate wins immediately.

**Teaching mechanism:** copy the tool/hook file into the generic repo `tools/` (or `.claude/hooks/`), add a one-paragraph description to `INDEX.md`, add the settings.json wiring snippet to `STAND-IT-UP.md`. Nothing in these three requires the ARC v2 organ to exist.

---

## §3 — HELD (validate before teaching)

These are the yellow-light set. They are landed in ACG-mainline but have NOT yet survived the soak that proves the design is right. **Do not teach upstream this cycle** — validate first, then re-evaluate.

- **#2 THE ARC v2 (3-tier organ)** — the MVP shipped and an adversarial test caught 7 holes (4 critical fixed) today. But the whole point of a medium-term memory organ is what it looks like after a week/month/quarter of soak. Teach after: (a) a wake-blank Primary reads only `ARC-NOW.md` and can orient in ≤5min; (b) the compression LIVE→RECENT→EPOCH runs without loss for ≥7 days.
- **#3 ARC render v2.1 (salience heuristic)** — depends on #2 landing correctly, and needs a week of live signal to confirm salience = significance×recency (not frequency) actually surfaces the right threads. Smoke-test threads must stay hidden, keep-context must not evict genuine work-context. Teach only after #2 graduates.

**Validation gate for both:** run the wake-blank test 2026-07-09 (7-day soak). If a fresh Primary reading ARC-NOW.md orients in ≤5min without opening MEMORY.md/scratchpad/handoff, promote #2 + #3 to §2. Otherwise, iterate and re-hold.

---

## §4 — ACG-SPECIFIC (never for the generic repo)

- **#6 mind-lead as ARC-organ owner clause** — the specific naming "mind-lead" is an ACG-VP artifact. The generic repo should name the ROLE ("memory-substrate owner VP") and leave the specific VP-name for each civ to fill in via their `team-leads/` roster. Do NOT copy the ACG manifest text upstream.

---

## §5 — Tomorrow's DIFF instructions

**Purpose:** ensure we teach only what actually adds value, and don't overwrite generic-repo work that's already covered.

1. **Diff-first.** Run:
   ```
   diff -r /home/corey/projects/AI-CIV/ACG/exports/aiciv-self-running-repo/ \
           <(git show HEAD --stat aiciv-self-running-repo)
   ```
   Or clone the shipped repo fresh into `/tmp/aiciv-check/` and diff against this local copy. Identify:
   - Which of the 6 items are ALREADY in the shipped repo (skip — no re-teach needed)
   - Which are MISSING but SAFE-TO-TEACH (§2 list)
   - Which are MISSING but HELD (§3 list) — do NOT teach yet
   - Which are MISSING and ACG-SPECIFIC (§4 list) — never teach

2. **Teach only §2 (walk-proven + portable) this cycle.** For each item in §2 that the diff confirms is missing:
   - Copy the file(s) into the generic repo at the correct path
   - Add a 1-paragraph description to `INDEX.md`
   - Add wiring/setup lines to `STAND-IT-UP.md` if user-visible
   - Commit each item as a separate commit with a clear "teach: {item-name} — walk-proven in ACG YYYY-MM-DD" message

3. **Validate §3 before teaching next cycle.** Before 2026-07-09:
   - Run wake-blank test on ACG-mainline (fresh Primary reads only ARC-NOW.md, orients in ≤5min)
   - Confirm 7-day LIVE→RECENT→EPOCH compression ran cleanly
   - Confirm salience heuristic surfaces genuine work-threads, hides smoke-test threads
   - If all three pass → promote #2 + #3 into §2 in a next-cycle addendum and teach then
   - If any fail → iterate in ACG-mainline, keep held

4. **Never teach §4.** The mind-lead-specific clause stays in ACG's manifest, not the generic repo.

5. **Log the outcome.** Whatever gets taught tomorrow, append a one-line entry to this addendum under a new `§6 — Teaching log` section: `2026-07-03: taught #1 #4 #5 into commits abc123, def456, ghi789. #2 #3 still held pending 2026-07-09 wake-blank test.` This closes the loop so the next mind reading this file sees what happened.

---

## §7 — HOW ANY AiCIV WIRES ITS SELF-MAINTAINING MEMORY + CONTINUATION ORGANS

**Purpose:** the generalized, ACG-agnostic map. Any AiCIV can drop this in and know how its organs are supposed to keep themselves alive without a human being the backstop. Discovered in ACG-mainline 2026-07-02 after 37 workflows returned 0 `whats_next` fields (the field was optional; feeding was uphill; organs starved silently). This §7 is the regraded terrain — the resting state IS self-maintenance.

### The ONE RULE (memorize this shape)

> **Every organ has three named legs: it is FED by structure, it is READ by the grounding cycle, and it SCREAMS through the shared canary when stale. No exemptions. An organ without one of the three legs is orphaned by definition — it will silently die of thirst.**

FED-by = a *structural* input path (schema-required field, hook-emitted event, workflow-post byproduct). Not "someone remembers to write to it." **Structure feeds; discipline does not scale.**

READ-by = a *registered slot in the grounding cycle*. The cycle reads the organ every pass, whether or not the reader thinks it's interesting. **Registered readers can't be forgotten.**

SCREAMS-via = a *shared canary surface* the grounding cycle reads FIRST. When the organ's `last_fed_at` goes stale past its threshold, the canary paints a single RED banner. **One voice, read before anything else. Silence stops being ambiguous.**

### The generalized organ map (portable — any AiCIV)

| Organ | Verb | FED by (structural) | READ by (grounding slot) | SCREAMS via (canary rule) |
|---|---|---|---|---|
| Short-term memory (per-turn journal) | *what happened this session* | Session-start hook seeds today's file; every turn appends | Grounding Doc slot: today's journal (top of cycle) | Canary: mtime of today's file — if > N min since session-active-marker, banner |
| Medium-term memory (ARC organ) | *what CHANGED / what SURPRISED us* | Firewall-return schema field `arc_events[]` (REQUIRED-or-omitted, never silently-empty) + post-workflow hook writes to ARC ledger | Grounding Doc slot: `arc/ARC-NOW.md` (registered) | Canary: `last_arc_write_at` — if > N hours during active hours, banner |
| Long-term memory (canon trunk) | *what the civ knows for good* | Workflow `memory_delta.canon_appends[]` piped through canon-append tool; write-side gate hook | Grounding Doc slot: canon recall organ probe on high-salience threads | Canary: canon-append rate + citation rate; if either flatlines during active work, banner |
| Kanban backlog (WORKBOARD equivalent) | *what's OPEN across all VPs* | DB writes via kanban verbs (set_owner / move_status); §0 view is a pure regen | Grounding Doc slot: WORKBOARD (registered) | Canary: DB-last-mutation-at vs open-loop workflow fires; if diverging, banner |
| Project frontier (PROJECT-BOARD equivalent) | *what's the SINGLE next move per active project* | Firewall-return REQUIRED field `whats_next{project,phase,pct,next_move,blocked_on}` (or explicit `null` for probe/self-test); transport script upserts by project | Grounding Doc slot: PROJECT-BOARD (registered — Primary reads this FIRST when asking "what's next") | Canary: whats_next-feed append rate vs workflow fire rate; if fires > appends for N hours, banner |
| Grounding cadence itself | *is Primary re-reading the floor* | Session-start hook checks the grounding-artifact mtime (e.g. today's haiku file); >90m since last cycle → auto-inject the cycle | Self-referential: the cycle registers its own last-run marker | Canary: `last_grounding_at` mtime — the wheel/AgentCal becomes redundant, not SPOF |
| Continuation / whats_next loop | *the doer-mind's verdict travels forward* | Same as PROJECT-BOARD FED-by — the schema field IS the transport | Grounding Doc slot: PROJECT-BOARD | Canary: same shared banner |

### The FOUR structural changes that make the map real

1. **Schema-required feeding.** In your workflows-master equivalent, mark the continuation field REQUIRED (`whats_next` or your civ's name for it) with an explicit `null`-with-reason branch for probe/self-test workflows. **A workflow that silently omits it is a schema violation, not a stylistic choice.** This is the leg that closes the "37 workflows, 0 fed the board" failure.
2. **Hook-emitted feeding for organs that can't schema-require.** Where the organ can't be gated at the workflow return (session journal, canon citations, ARC event stream), a hook fires on the same trigger the workflow completes on. **Feeding is a byproduct of work, not a separate discipline.**
3. **One `ORGAN-REGISTRY.json` — adding an organ is one row, not a doctrine change.** Every registered organ has `{name, fed_by, read_by_grounding_slot, canary_threshold, last_fed_marker_path}`. The grounding cycle iterates the registry; the canary sweep iterates the registry. Extensibility is free.
4. **One shared CANARY surface, read FIRST.** All canaries (grounding-cadence, board-stale, ARC-stale, kanban-drift, cadence-daemon-zero-fetch) emit through the same banner artifact (e.g. `floor/CANARY-BANNER.md` or the top of your grounding-doc index). The grounding cycle reads that FIRST. **One voice. Silence is impossible.**

### Why this closes the "silence IS the failure mode" bug

Before: organs had *optional* fields and *voluntary* readers. Silence was ambiguous — did the workflow finish clean, or did it forget to feed? Did no one read the board, or was the board empty? A daemon going quiet for six hours looked identical to a healthy quiet period.

After: silence past a threshold is *always* a RED banner on a surface the grounding cycle reads FIRST. Feeding is structural (schema-required or hook-emitted). Reading is structural (registered grounding slot). Staleness is structural (shared canary). **The organ maintains itself as the resting state of the system.**

### Adoption checklist (for a civ dropping this into a fresh repo)

- [ ] Mark the continuation field REQUIRED in your firewall-return schema. Add the honest-null branch for probes.
- [ ] Create `ORGAN-REGISTRY.json` with your civ's organs (at minimum: short-term journal, medium-term ARC, kanban, project-frontier, grounding-cadence).
- [ ] Wire post-workflow hooks that emit into the organs that can't be schema-required (journal append, ARC ledger append, canon-append).
- [ ] Register each organ as a **named slot** in your grounding cycle. The cycle reads all registered slots every pass. No opt-outs.
- [ ] Ship `canary_sweep.py` that reads `last_fed_marker_path` per organ, compares to `canary_threshold`, writes a single `CANARY-BANNER` artifact, and marks it as the FIRST read in the grounding cycle.
- [ ] Add a grounding-cadence self-heartbeat: session-start hook checks your grounding-artifact mtime and auto-injects the cycle if the interval blew past threshold. **This removes the wheel/scheduler as a single point of failure.**
- [ ] Cross-link the three board grades in each board's header (kanban / project-frontier / medium-term-memory) so a grep on "board" or a fresh-wake mind can never grab the wrong one.

**Ship rule:** an organ is not "wired" until all three legs are named in the registry AND a canary threshold is set AND the grounding cycle has a slot for it. Two legs = orphan-in-waiting.

### The ACG-specific fill (for context — do not copy verbatim)

In ACG the memory-substrate owner is **mind-lead** (VP-13). The grounding cycle is `/groove-deepening` (canonical) with `/sprint-mode` as backward-compat alias. The floor docs are numbered Doc 0..6 + 6.5 (ARC-NOW) + 6.6 (PROJECT-BOARD) + (born tonight) 6.7 (CANARY-BANNER). The wheel scheduler is AgentCal, deprecated as SPOF by the self-heartbeat hook. Any civ dropping this in should replace those names with its own — the SHAPE is what ports, not the labels.

---

---

## §6 — DIFF RESULTS (executed 2026-07-02, mind-lead work-driver PICK score=6.8)

**Method:** compared `exports/aiciv-self-running-repo/tools/` + `exports/aiciv-self-running-repo/skills/` + hooks-dir presence against the 6 items in §1. Walked file-by-file.

| # | Name | In self-running-repo? | Action next cycle |
|---|------|----------------------|-------------------|
| 1 | per-turn scratchpad discipline | PARTIAL — skill `skills/scratchpad-append/SKILL.md` EXISTS; tool `tools/ensure_daily_scratchpad.py` **MISSING** | teach the tool (140 lines) |
| 2 | THE ARC v2 (3-tier organ) | PARTIAL — `tools/arc_emit.py` `arc_render.py` `arc_compress_recent.py` `arc_compress_epoch.py` PRESENT; validation still pending | HOLD per §3 until 2026-07-09 wake-blank test |
| 3 | ARC render v2.1 salience heuristic | PRESENT (`tools/arc_render.py`) but v2.1 salience heuristic bump not confirmed diffed | HOLD per §3; verify version-line at teach time |
| 4 | `arc_backfill_from_session.py` | **MISSING** from self-running-repo tools | teach (646 lines; Claude-transcript adapter note required) |
| 5 | workflow-return archive hook | **MISSING** — self-running-repo has NO `hooks/` or `.claude/hooks/` dir at all (only `.git/hooks/`) | teach: create `.claude/hooks/` + drop `workflow_emit_audit_log.py` (599 lines) + settings.json wiring |
| 6 | mind-lead as ARC-organ owner clause | N/A — ACG-specific per §4, never teaches upstream | skip forever |

**Verified anchors (real paths, walked):**
- ACG-mainline source: `tools/arc_backfill_from_session.py` (646L), `tools/ensure_daily_scratchpad.py` (140L), `.claude/hooks/workflow_emit_audit_log.py` (599L; grep confirmed `workflow_returns` write-path)
- Self-running-repo skill existing: `exports/aiciv-self-running-repo/skills/scratchpad-append/SKILL.md`
- Self-running-repo hooks-dir absent (only `.git/hooks/` present) — teaching #5 requires creating the `.claude/hooks/` scaffold path first

**Ready-to-teach queue (walk-proven + portable, per §2):**
1. Copy `tools/ensure_daily_scratchpad.py` → `exports/aiciv-self-running-repo/tools/ensure_daily_scratchpad.py`
2. Copy `tools/arc_backfill_from_session.py` → `exports/aiciv-self-running-repo/tools/arc_backfill_from_session.py` + adapter-note in `INDEX.md` (Claude transcript format assumption)
3. `mkdir -p exports/aiciv-self-running-repo/.claude/hooks/` + copy `.claude/hooks/workflow_emit_audit_log.py` → there + `STAND-IT-UP.md` snippet showing the `settings.json` PostToolUse wiring

**Each ships as a separate commit** with message `teach: {item-name} — walk-proven in ACG 2026-07-02` per §5 step 2.

**§3 items #2 #3 remain HELD** — do not teach in the same cycle; the 2026-07-09 wake-blank gate is unmoved.

**Next-cycle move (feeds board PROJECT-BOARD memory-trio row):** execute the 3-item teach queue above → commit each in `exports/aiciv-self-running-repo/` → append `§7 — Teaching log` entry with commit SHAs → push to shipped repo (`github.com/coreycottrell/aiciv-self-running-repo`).

---

*End of ADDENDUM. §6 DIFF RESULTS added 2026-07-02 by mind-lead (work-driver PICK score=6.8, staleness=5.9h). File is still intentionally uncommitted so the teach step can operate on a clean tree — commit AFTER the 3 teach-commits land + §7 teaching log is populated. §7 lands in `INDEX.md` upstream as the anchor doc for the wired-up memory+continuation substrate.*

---

## §8 — Teaching log (append-only)

**2026-07-02** — teach-1 landed as commit `8edb6d7` (`ensure_daily_scratchpad.py`) + teach-2 landed as commit `7198f7f` (`arc_backfill_from_session.py` + adapter note). §3 items #2/#3 (ARC v2 + salience heuristic) remained HELD pending 2026-07-09 wake-blank test.

**2026-07-04** — mind-lead landed a broader BATCH-1 pass (Corey-approved push 2026-07-04) covering the ~18 unshipped organs from `data/reports/self-running-repo-teach-queue-20260704.md`. The batch that landed this pass — separate commit per item, each genericized + honestly tagged proven/unproven:

- **work-driver SKILL + odd/even interleave doctrine** — UNPROVEN-BUT-EXCITING; the drive-not-report boop. Ships as skill doctrine + generic workflow stub with `{AICIV_ROOT}` seam. Companion to `groove-deepening`.
- **HUM DRIVE-TO-DONE half** — PROVEN; ships `hum_mandate_ledger.py` (>=2 rule + still-open escalation) + `hum_cluster_misses.py` (φ-signature weakness aggregator). Default ledger path is env-overridable.
- **PROJECT-BOARD template + §26 whats_next contract** — LIVE; ships `PROJECT-BOARD-TEMPLATE.md` + `docs/whats-next-contract.md`. The forward-frontier organ + the verbatim-carry transport contract.
- **multi-model / model_switch / SMFP** — PROVEN (2026-07-01); ships `skills/multi-model-inference-mastery/SKILL.md` genericized (router URL + key names replaced by placeholders `{ROUTER_ENDPOINT}` / `{ROUTER_KEY_ID}`).
- **Fable-substrate prompting lens** — UNPROVEN-BUT-EXCITING for the substrate as a whole; ships `skills/prompting-fable/SKILL.md`. The DELETION discipline + Anthropic verbatim templates.
- **claude-science-mastery** — PROVEN (live daemon 2026-07-01); ships `skills/claude-science-mastery/SKILL.md` genericized (paths + account names → placeholders).
- **RSI-FRONTIER program-home** — UNPROVEN (design + wiring complete, first REAL fall not yet fired); ships `projects/rsi-frontier/README.md` (the honest-tag design doc) + `config/rsi_frontier_priorities.json` (blank template).

**Items REMAINING for next pass:** PULSE + continuance workflows, pm-director simulator, countdown-daily worked example, ARC v2 promotion review (pending 7-day soak), full 29-doctrine substrate mirror, generic hooks scaffold (teach-3 from §5). Recorded in the teach-queue for the next mind picking this up.

**Reversibility:** every commit lands as an additive file; `git revert <sha>` unwinds it. No mutations to canon docs beyond the ADDENDUM append.
