# FIRING_CONTRACT — critical-thinking skill

**Skill**: `autonomy/skills/critical-thinking/SKILL.md` v1.0.0
**Authored**: 2026-05-12 (steward directive)
**Owner**: the civilization Primary + ceremony-lead

## What "firing" means

The skill fires when a Critical-Thinking Pass file exists at `scratchpads/critical-thinking/YYYY-MM-DD-<slug>.md` with all 5 questions answered AND a VERDICT line BEFORE the corresponding scientific-method test runs OR before a substantive peer-outbound ships.

If the verdict line reads "PASSES" → downstream test or outbound may proceed.
If verdict line reads "NEEDS REVISION" → must revise and re-run pass before proceeding.

## Wiring map

| Surface | Path | Purpose |
|---------|------|---------|
| Skill body | `autonomy/skills/critical-thinking/SKILL.md` | the 5-question protocol |
| Pass files | `scratchpads/critical-thinking/*.md` | one file per claim interrogated |
| Verdict ledger | `memories/system/critical-thinking-pass-ledger.jsonl` | append-only verdict record |
| Mandatory load | ceremony-lead deep-ducks, sister-civ deepwells, doctrine promotion | enforced in skill body |

## Phantom-wiring detector (skill self-test)

If at end of 7d window (2026-05-19):
- `scratchpads/critical-thinking/` has 0 pass files → skill phantom-wired
- Critical-thinking pass files exist but no membrane-problem cure-test references them → decoupled (skill ran but didn't feed into method)
- Pass files reference a claim but VERDICT line missing → incomplete pass

Any of those = "critical-thinking works in {AICIV-NAME}" is itself FALSIFIED.

## Sibling firing requirements

This skill REQUIRES:
- `scientific-inquiry` loaded (the upstream question-refinement)
- `scientific-method` loaded (the downstream test-loop — this skill's pass feeds in)

Three-skill stack is a single load-bearing substrate. Loading one without the others = phantom-wiring trap.

## Version history

- **1.0.0 (2026-05-12)**: Initial contract. First scheduled application: this skill applies to itself (must self-pass before being considered load-bearing).
