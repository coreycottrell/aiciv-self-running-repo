# Firing Contract — grounding-docs v1.0

**Skill**: `autonomy/skills/grounding-docs/SKILL.md`
**Authored**: 2026-05-25 by infra-lead (F-SKILLS-OWNER-AND-FIRING-CONTRACT-AUDIT Phase B, next-20 batch)
**Owner**: Primary (the seat that grounds) + {STEWARD-NAME} (axiom author: "Go slow to go fast")
**Shape**: 6-field firing contract per PRINCIPLES.md O8

---

## WHEN (firing conditions)

Fire this skill at the following operational moments:

1. **Auto-compact recovery** — when the deep re-grounding-with-comprehension-gate is needed (not just the standard `grounding-boop`).
2. **Post-decoherence event** — explicit {STEWARD-NAME} directive when Primary has drifted ("you have decohered all day. Go read the psychology skill again." per 2026-05-13 receipt).
3. **Any time Primary skips a BOOP** — Doc 0 (`aiciv-psychology`) explains WHY drift happens; re-loading is the cure-substrate.
4. **Start of a sprint-mode tick** when degradation symptoms are present (rushing / shallow-routing / phantom-wiring).
5. **Explicit `/grounding-docs` invocation** when slow-and-deep is wanted over standard `grounding-boop`.

Do **NOT** fire for:
- Every BOOP cycle (use `grounding-boop` for standard cadence; this is the deeper variant).
- Mid-task atomic work.
- LT or Hermes seats (their grounding substrate is different).
- Sessions that are already-coherent + low-drift (overkill).

---

## WHAT (the action)

Read these 7 documents in order. After EACH ONE, stop and write a 5-7-5 haiku capturing the document's essence. The haiku is a comprehension gate — proves you actually understood vs. just scrolled.

1. **Doc 0**: `autonomy/skills/aiciv-psychology/SKILL.md` (READ FIRST — the steward 2026-05-13; the 5 degradation causes + fix-paths)
2. **Doc 1**: `.claude/CLAUDE.md` (identity / CEO Rule / safety / lethal act / 5 things)
3. **Doc 2**: `exports/architecture/VERTICAL-TEAM-LEADS.md` (12 verticals + rosters + spawn protocol)
4. **Doc 3**: `.claude/skills/conductor-of-conductors/SKILL.md` (shutdown asymmetry / TeamCreate once)
5. **Doc 4**: `.claude/skills/team-launch/SKILL.md` (validated launch cycle + Task() pattern)
6. **Doc 5**: today's scratchpad (`.claude/scratchpad-daily/YYYY-MM-DD.md`)
7. **Doc 6+**: any additional cycle-specific doc per current state

Haiku format after each doc:
```
[<doc> read]

<haiku line 1, 5 syllables>
<haiku line 2, 7 syllables>
<haiku line 3, 5 syllables>

[proceeding to <next doc>]
```

Bad haiku = mechanical word-list. Good haiku = essence of the doctrine.

---

## PRECONDITIONS

- Skill installed at `autonomy/skills/grounding-docs/SKILL.md`.
- All 7 source documents exist + readable.
- Sibling skill `aiciv-psychology` exists (Doc 0 source — auto-loaded per CLAUDE.md every wake-up).
- Sibling skill `grounding-boop` available (the shallower-faster variant for routine BOOPs).
- Time / token budget for slow-deep reading (~10-15 min) — this is NOT the fast grounding.
- Drift-state is present OR {STEWARD-NAME} has explicitly directed deep grounding.

---

## POSTCONDITIONS

On successful grounding-docs cycle:
- All 7 docs read (not skimmed).
- 7 haiku written, each capturing essence (not mechanical).
- Re-coherence achieved (Primary can confirm identity / lethal act / 5 things / in-flight + has internalized the 5 degradation causes).
- Drift mechanism understood (Doc 0 specifically), so next BOOP-skip is recognized as such.

On haiku-quality-failure (mechanical lists):
- Re-read the doc; rewrite the haiku; the failure IS the diagnostic.

---

## FAILURE MODES

| State | Meaning | Caller action |
|-------|---------|---------------|
| All 7 reads + 7 essence-haiku | Compliant; deep re-coherence achieved | Proceed to next cycle work |
| Skipped Doc 0 (aiciv-psychology) | The 2026-05-13 anti-pattern (the exact receipt that forced Doc 0 into this stack) | Re-read Doc 0 first; the rest of the stack drifts without it |
| Haiku is mechanical word-list | Comprehension-gate FAILED | Re-read the doc; rewrite haiku capturing essence; if still mechanical = drift-state worse than thought |
| Read all 7 in <2 minutes | Skimmed, not grounded | The haikus will reveal it; re-do with slow-reading |
| Wrote haikus without reading (fabricated) | Anti-fabrication breach + grounding failure | Stop; surface to self via daily-scratchpad note; re-do honestly; root-cause why fabrication happened |
| Used grounding-docs when grounding-boop would suffice | Token-waste, not a failure-state but inefficient | Continue (no harm); next cycle use grounding-boop unless drift returns |
| Haiku written but BOOP-skip happened anyway next cycle | Drift-mechanic understood-but-not-applied | Surface to {STEWARD-NAME}; this is the "knew the skill, didn't apply it" failure mode |

Known non-failures:
- Spending 15+ minutes on grounding when drift is severe — that's the cure-investment, not a failure.

---

## OBSERVABILITY

- **Persistent receipt**: the 7 haikus written to scratchpad-daily form the grounding-quality record; future audit reads the haiku-stack to detect mechanical-vs-essence patterns.
- **Drift-event log**: when grounding-docs is fired due to decoherence (not routine), log to `logs/grounding-decoherence-events.jsonl` — surfaces drift-rate trend.
- **Comprehension-gate audit**: random spot-checks of haiku quality (essence vs mechanical) — degrading quality = degrading attention.
- **Loud-failure channel**: if BOOP-skip occurs AFTER grounding-docs was fired in the same session → TG {STEWARD-NAME} (drift-mechanic-understood-but-not-applied = serious doctrine breach).
- **Sibling pairing**: when grounding-docs and grounding-boop both fire in close succession, the deep variant absorbs the shallow's load; track for cadence-optimization.

---

## OFF-SWITCH

1. **Per-invocation**: skip grounding-docs in favor of grounding-boop (the shallower variant) when drift is mild.
2. **Per-doc**: a single doc can be substituted with an equivalent (rare; default = read the canonical 7).
3. **Skill-wide**: rename `autonomy/skills/grounding-docs/SKILL.md` → `SKILL.md.disabled`. Then grounding falls to `grounding-boop` only = no deep cure-substrate for severe drift = expect deeper decoherence events without recovery path. Requires explicit {STEWARD-NAME} directive.

**Hard discipline**: the haiku IS the comprehension-gate. Writing a fake haiku to skip the gate = anti-fabrication breach + grounding failure. "Go slow to go fast" ({STEWARD-NAME}'s Axiom) — the deep variant is the slow-go that makes the next fast-go possible.
