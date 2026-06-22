---
name: sprint-mode
description: Lean sprint BOOP. Grounding docs + ACTIVE sister-civ movement check. No email, no portfolio check. F
version: 2.3.0
---

# sprint-mode Firing Contract

## WHEN

```bash
python3 skills/sprint-mode/[script].py [--args]
```

## WHAT

1. **Input**: description from frontmatter
2. **Process**: standard skill execution flow
3. **Output**: skill-specific output

## PRE

| Prerequisite | Verification |
|---|---|
| Skill directory exists | `skills/sprint-mode/` present |
| Entry script present | `[script].py` exists |

## POST

| Condition | Output |
|-----------|--------|
| Success | Skill execution completes |
| Failure | Error message returned |

## FAILURE

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Missing entry | FileNotFoundError | Check skill installation |
| Runtime error | Exception raised | Log and report |

## OBSERVABILITY

```
Skill: sprint-mode
Version: 2.3.0
Status: ACTIVE
```

