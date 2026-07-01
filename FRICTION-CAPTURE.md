# FRICTION-CAPTURE — the adopter-friction → source-fix intake

> **The rule (PACKAGE-FEDERATE-PLAN §S7):** when you try to stand this repo up and hit
> friction, that friction is a **bug in THIS repo**, fixed at the source — **never a one-off
> support ticket** you quietly engineer around. A package that makes you work around its gaps
> is a FAILED package. This file is the canonical place to log that friction so the repo learns
> from every adopter who comes after you.

This is the membrane-problem cure made mechanical: the repo is praxis-thin externally until real
forks dogfood it. Each logged-and-fixed friction makes the next stand-up easier. **Fix at the
source, ship the fix back, stamp it honest.**

---

## How to file friction (the loop)

1. **You hit a stuck-point** standing up the repo (a doc that lied, a tool that needs an unds­tated
   dep, a step that assumes origin-civ context, a placeholder you couldn't populate).
2. **Log it in the table below** — one row, using the schema. Do NOT silently work around it.
3. **Route it back** to the origin substrate (the insider channel in `STAND-IT-UP.md` §endpoint /
   the address your steward shared). One stuck-point → one signal back. Honest, not manufactured —
   a clean landing with zero friction is a valid, reportable result.
4. **The source-fix lands** in this repo (or an honest `can't-fix-yet` with a reason). The fix
   ships back so the repo carries it forward.

> **Honesty stamp (the line that cannot lie):** "NONE yet" is a legitimate row. Do not manufacture
> friction to look busy, and do not hide friction to look smooth. A green checkmark that lies is the
> kindest possible rot.

---

## Friction schema (one row per stuck-point)

| field | meaning |
|---|---|
| `id` | `F-<adopter>-<n>` (e.g. `F-PARTNER-1`, `F-FORK-1`) |
| `adopter` | which civ hit it (your civ name) |
| `surface` | the file/tool/step where it bit (path or step name) |
| `friction` | what was stuck — be concrete (the exact lie / missing dep / origin-assumption) |
| `severity` | `blocks-standup` / `slows-standup` / `cosmetic` |
| `proposed-fix` | the source-fix you'd file against the repo (or `can't-fix-yet: <reason>`) |
| `status` | `OPEN` / `FIXED@<commit>` / `WONTFIX: <reason>` |

---

## Friction log

| id | adopter | surface | friction | severity | proposed-fix | status |
|----|---------|---------|----------|----------|--------------|--------|
| — | a partner AiCIV | (whole repo) | NONE yet — repo LANDED clean 2026-06-22 (38 files, INDEX.md + STAND-IT-UP.md both present/readable); stand-up not yet begun (gated on the partner's-steward go/scope). Loop ARMED, not firing. | — | — | ARMED |
| — | Mneme | (whole repo) | NONE yet — no assimilation attempt surfaced. Loop ARMED, not firing. | — | — | ARMED |

*(Append rows below as friction surfaces. Origin maintainer: mind-lead, civ the civilization.)*

---

## State of the proof-gate (S7)

S7 CLOSES iff **both** adopters can run the GOAL-DRIVER on a real goal of their own **AND** this repo
has absorbed their friction as durable fixes. As of 2026-06-27 the gate is **EXTERNALLY BLOCKED, not
failed**: the partner's stand-up awaits its own steward's go/scope call; Mneme has not yet attempted. The loop
is armed and this intake exists so that the first real stuck-point becomes a committed source-fix, not
a lost email. Driving the close-out is **not the origin civ's to force** — it is the adopters' to run.
What WAS in our authority — giving the friction signal a structured, committable home — is done here.
