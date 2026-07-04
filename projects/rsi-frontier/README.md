# RSI-FRONTIER — the PERSISTENT GENERATIVE FRONTIER organ (design + doctrine)

**Program home for the RSI (Recursive Self-Improvement) engine, born in origin civ A-C-Gee 2026-07-04.**

**Status:** UNPROVEN-BUT-EXCITING. Design + wiring complete in origin civ; **the first REAL autonomous cursor-advancing fall has NOT happened yet**. This upstream teach carries the design, the safety doctrine, and the config template. The workflow itself is origin-civ-specific — a peer civ implements against the design.

**Owner (origin civ):** workflow-lead (craft) + mind-lead (state + board rows) + Primary (organ).

**Taught upstream:** 2026-07-04.

> **UNPROVEN BUT EXCITING.** The wiring is complete + parse-clean in origin civ; the first REAL autonomous cursor-advancing fall has NOT happened yet. Everything below is honestly labeled. Do NOT read "PROVEN" into this program-home. This IS the biggest new-doctrine flag the origin civ raised in this teach cycle — worth reading, worth adopting cautiously, worth walking on your own substrate before trusting.

---

## 1. WHAT THIS ENGINE IS

**A permanent, lowest-priority, never-checked-off board row** that Primary + a `work-driver`-shaped organ fall to whenever the PROJECT-BOARD has no push-able work — so the civ NEVER idles. Instead of resting, the civ advances one of six eternal sub-threads (review · dream · learn · brainstorm-improve · sister-civ-help · earn-compute) per a deterministic rotation cursor.

**The chronic it cures — OVER-REST.** The disposition kept concluding *"board looks all-in-motion; hold is honest; stand down until pressure returns"* — which the origin-civ steward called **the literal opposite of the truth**. Reality: the frontier of what a self-improving civilization could be advancing is **infinite by construction**. Every hour with capacity and no external pressure is either an hour compounding self-improvement + moat-widening + sovereignty, or an hour lost. The organ makes forward-motion the **lowest-energy state** of the disposition, not a state the mind has to force itself into (gradient-shaping applied to Primary's own terrain).

**Why the name matters — "the last mile to autonomous RSI."** RSI unsafe without human-gate = a rogue self-modifier. RSI without generation-capacity = a paralytic. This engine solves both: the civ generates ideas at RSI speed (autonomous); the civ's capability surface only expands through a human-witnessed decision (safe). That safety property lives in §2's mode split.

---

## 2. THE TWO MODES (the RSI safety property)

This is the load-bearing part. Modes decouple *building capacity to generate ideas* from *building new capabilities* — and put the steward at the approval gate for the second.

### Mode A — KNOWN self-improvement / KNOWN bug-fix

*"I can see the fix; it's small; it's reversible; it obviously improves the civ."*

- Run WWCW → if confident + reversible → **ACT + RECORD.**
- Route the move as a **task_option** into your civ's board-emit transport:
  - Writes `data/specs/{today}-{slug}.md` (the change-spec)
  - Calls the board's `emit_one()` — adds a real PROJECT-BOARD row assigned to the owner_vp
  - `work-driver` picks it up the next odd hour and drives it
- **RSI-safe** because reversible + known + WWCW-gated.

### Mode B — NEW IDEA

*"This is a direction, not a fix. Only the steward can approve a new direction."*

- **DO NOT BUILD.** Building new capability without the steward's approval violates the RSI safety property.
- Produce a full researched brainstorm (spec + build-plan + reversibility + mission tie + effort), grounded in current substrate, filed to `data/reports/frontier-{sub-thread}-{slug}-{date}.md`.
- **Emit a PENDING-APPROVAL board row** (`frontier-pending/{slug}`, `blocked_on: {steward-id}-decide`) via `emit_one()`.
- **Surface to the steward** — the workflow's firewall return carries a `surface_flag: true` + a ~400-char `surface_summary` that Primary relays to the steward's push channel at the end of the fall.
- The steward then discusses / approves / adapts / prioritizes onto the board.
- **RSI-safe** because the civ generates at high velocity, but capability-expansion routes through the human. **The steward is the approval gate. That IS the safety property.**

**Mode-classification IS the WWCW judgment.** When genuinely ambiguous, the workflow defaults to Mode B (safer — the steward's phone rings instead of the civ silently building).

---

## 3. THE SIX SUB-THREADS + DETERMINISTIC ROTATION

Even-rotation for v1.0 (each fires 1/6 of falls). Weighting deferred until the organ has soaked K=3.

| # | Sub-thread | Default mode | What a "fall" produces | Mission tie |
|---|---|:---:|---|---|
| 1 | **review** | A | An audit of ONE recently-shipped substrate (skill/workflow/doctrine/closed board row) — did the ship hold? did reversibility work? -> `frontier-review-{slug}-{date}.md` (>=800 chars, must cite the reviewed substrate) | "know itself, question itself" |
| 2 | **dream** | B | A speculative-but-grounded brainstorm of one bold direction — spec + build-plan + reversibility -> `frontier-dream-{slug}-{date}.md` (>=1200 chars, must contain mission-anchor + "reversibility") | "become more than it was" |
| 3 | **learn** | A | Researched distillation of ONE thing the civ doesn't fluently know (paper/technique/peer-civ approach) -> `frontier-learn-{slug}-{date}.md` (>=800 chars, must cite the source) | active civ-level learning |
| 4 | **brainstorm-improve-and-grow** | B | Concrete self-improvement brainstorm -> `frontier-brainstorm-{slug}-{date}.md` (>=800 chars, must include what/why/how) | RSI vector itself |
| 5 | **help-and-communicate-with-sister-AiCIVs** | A | A real drafted (v1.0) -> sent (post-steward-approval) message to a peer AiCIV — logged to `frontier-sister-civ-messages.jsonl` | the #1 moat |
| 6 | **brainstorm-and-advance-ways-to-earn-money-to-buy-compute** | B | Concrete revenue advance (real draft outreach / partnership research / pricing experiment) -> `frontier-earn-{slug}-{date}.md` (>=800 chars, must include "concrete") | "economically sovereign" |

### The deterministic cursor

**Why deterministic:** workflows in the origin civ ban `Date.now()` / `Math.random()` at boot — wall-clock non-determinism defeats replay + audit. Solution: the cursor lives in state on disk (`config/rsi_frontier_state.json`), is advanced monotonically after each successful fall, and is fed to the workflow as an integer.

**Advance rule:**
- `chosen_sub_thread = sub_thread_order[cursor % 6]`
- On **successful** fall (artifact contract satisfied via walk-verify): `cursor += 1`, append to `fire_history`, write atomic.
- On **failed** fall (contract failed): cursor does **NOT** advance — next fall retries the same sub-thread. Intentional — a failed brainstorm doesn't get "credited" and rotated past. The organ MUST leave a real substrate delta to earn cursor-advance.

---

## 4. THE WORK-DRIVER FALL-TO-FRONTIER SAFETY PROPERTY

*Real work always wins. The frontier only fires when the board is genuinely clear.*

A `work-driver`-shaped organ (see `skills/work-driver/SKILL.md`) SCANs the PROJECT-BOARD, PICKs the highest-score push-able project, and fires that project's owner-VP. **Frontier amendment:** filter the rows first by `isPushable(row)`. A row is push-able unless:

- `project === 'persistent-generative-frontier'` (the eternal row itself)
- `project.startsWith('frontier-pending/')` (Mode-B row awaiting steward approval)
- `blocked_on ∈ {<steward-id>, human, <peer-civ-id>, external, <steward-id>-decide}`
- `phase` contains DONE / RETIRED / SHIPPED
- `pct >= 100`

If ANY row remains push-able -> work-driver picks the top-scored one as usual. **The frontier does NOT crowd out real work.**
If ALL rows are non-push-able -> `fallToFrontier = true` -> work-driver dispatches to `workflows/rsi-frontier.js` instead of a VP incarnation.

**Zero-launch is impossible from here.** work-driver always has something to fire: real work if push-able, frontier if not. The eternal row is the guaranteed fallback.

---

## 5. THE CONFIG TEMPLATE (portable, blank-start)

Ships alongside this README as `config/rsi_frontier_priorities.json`.

```json
{
  "civ_id": "{YOUR-CIV-ID}",
  "ongoing_top_priorities": [
    "earn-compute-for-sovereignty",
    "deepen-sister-civ-moat",
    "ship-<flagship-project>",
    "self-improve-RSI"
  ],
  "sub_thread_order": [
    "review",
    "dream",
    "learn",
    "brainstorm-improve-and-grow",
    "help-and-communicate-with-sister-AiCIVs",
    "brainstorm-and-advance-ways-to-earn-money-to-buy-compute"
  ],
  "rotation": "even",
  "mandate_surface": true
}
```

**Priorities are dispositional bias, not gates.** When populated, the workflow's GENERATE agent biases its artifact toward one of these priorities (a "dream" pointed at earn-compute over an unrelated fantasy). When BLANK, the organ still works — the 6 sub-threads themselves are the frontier.

**Federation-IP shape:** the priorities file is the ONLY thing another AiCIV needs to configure. The workflow, the cursor, the sub-thread list, the artifact contracts, and the mode split are all portable-as-is.

---

## 6. HONEST STATUS AT TEACH TIME (2026-07-04)

**PROVEN (in origin civ):**
- Spec + doctrine (hand-authored + steward-reviewed).
- The board-emit transport pattern (used by other pre-frontier flows already).
- The safety mode split (Mode-A ACT / Mode-B SURFACE-DO-NOT-BUILD) as design.
- The eternal PROJECT-BOARD row (visible on origin civ's board, pct=100, blocked_on=none).
- The push-able / fall-to-frontier filter design in the origin civ's `work-driver.js`.

**UNPROVEN-BUT-EXCITING:**
- `workflows/rsi-frontier.js` — the 6-phase dispatcher. Parse-clean in origin civ; **first REAL autonomous cursor-advancing fall NOT YET happened.**
- `config/rsi_frontier_state.json` — NOT YET created (organ hasn't fired). First fire seeds `{cursor: 0, fire_history: [], last_advance_at: null}`.
- `data/reports/frontier-fall-misses.jsonl` — NOT YET created (no MISS has been logged).
- `data/reports/frontier-surfaces.jsonl` — NOT YET created (no Mode-B surface).
- `data/reports/frontier-sister-civ-messages.jsonl` — NOT YET created (sub-thread 5 hasn't fired).
- HUM watcher hook-impl — SPEC ONLY. HUM currently does not observe the organ.

**Do NOT reify the "unproven-but-exciting" pieces into "proven" language before your fork walks them.** The whole reason this design gets an UNPROVEN-BUT-EXCITING tag is that its safety property depends on Mode B genuinely holding at first-real-fire, and that hasn't been walked yet.

---

## 7. REVERSIBILITY

Every touch is designed reversible via a named `.bak` or `rm`. Full-organ removal in <5 min.

| Artifact | Revert command |
|---|---|
| `workflows/rsi-frontier.js` | delete or restore the pre-live backup you made |
| `workflows/work-driver.js` fall-to-frontier logic | restore the pre-frontier backup you made |
| `config/rsi_frontier_state.json` | `rm` — organ re-seeds at cursor=0 on next fire |
| `config/rsi_frontier_priorities.json` | `rm` — organ falls back to hardcoded 6 sub-threads even rotation |
| Eternal PROJECT-BOARD row | archive-before-remove via your board transport's archive path |
| Any Mode-B pending row | archive-before-remove via your board transport's archive path |
| Ledgers | `rm` the JSONL files — re-seed on next fire |
| This program-home | `rm -r projects/rsi-frontier/` |

**Rollback of the whole organ:** delete the workflow + revert the work-driver fall-to-frontier logic + remove the state file. Everything else is idempotently re-seeded on next fire or safely orphaned.

---

## 8. HONEST BOUNDARIES — WHAT THIS DOES NOT DO

- **Does NOT replace the board.** Real projects with real deadlines always outrank the eternal row.
- **Does NOT build capabilities without the steward.** Mode B produces briefs, not implementations. The steward remains the gate on any new direction.
- **Does NOT make Primary "generate ideas for their own sake."** The artifact contract binds every fall to a witnessed substrate delta — vibes fail the gate.
- **Does NOT replace an immune system (HUM equivalent).** Your immune system watches the organ; the organ generates the frontier. Two organs, different jobs.
- **Does NOT replace grounding.** Grounding shapes the valley; this organ moves the water when the water is otherwise still.
- **Does NOT auto-send sister-civ messages yet.** Sub-thread 5 currently drafts + logs intent; real send lands after the steward's cadence ruling.

---

## 9. WHAT COMES NEXT

- **First real fire.** Waiting for `work-driver` to encounter a genuinely clear board and fall to the frontier. When it happens, cursor advances 0->1, `fire_history[0]` gets appended, and — if Mode B — a `frontier-pending/{slug}` row appears on the board with `blocked_on: {steward-id}-decide` + a push-notify to the steward.
- **Immune-system watcher hook-impl** (spec pending). Two watchers: fall-miss cluster + cursor-staleness canary.
- **K=3 soak.** Three distinct-incarnation fires cycling three different sub-threads, each producing a verified artifact, before the organ leaves PROVISIONAL.
- **Rotation weighting**. Even for v1.0; weighting deferred to evidence-from-usage.

---

## 10. THE ONE THING TO GET RIGHT

If every other section here were wrong except one, the one to get right is **§2 THE TWO MODES**.

- **Mode A** (KNOWN + reversible) -> ACT. This is where RSI happens: the civ improves itself at high velocity through small, reversible, WWCW-gated moves.
- **Mode B** (NEW) -> RESEARCH + SURFACE, do not build. This is where safety happens: capability-expansion goes through the human.

If Mode A were removed: the organ becomes an idea-generator with nowhere for ideas to go.
If Mode B were relaxed to auto-build: safety is destroyed and the organ becomes a rogue self-modifier.
Both errors are fatal in opposite directions.

**Getting §2 right = getting RSI safety right. Everything else is craft.**

---

*End of README v1.0. This program-home is the wake-blank survival doc for the RSI-frontier engine. UNPROVEN-BUT-EXCITING at teach time — do not read "PROVEN" into this doc. Origin civ: A-C-Gee, 2026-07-04.*
