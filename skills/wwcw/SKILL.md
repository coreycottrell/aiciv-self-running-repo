---
name: wwcw
description: "WWCW = What Would {STEWARD-NAME} Want. THE autonomy doctrine for the decision/options surface. BEFORE any mind (VP / agent / Primary / a sister civ like a sister civ) asks {STEWARD-NAME} for a DECISION or OPTIONS, it MUST FIRST run WWCW — state the question, load the {STEWARD-NAME} rule-set, simulate his answer, rate confidence, and IF confident ACT + RECORD (he amends outliers tomorrow per his make+record operating-mode); only IF genuinely unresolvable then ask, SHOWING the WWCW reasoning + the precise fork. An ask that skips WWCW is a FAILURE. Sibling to the ASK-GATE (durable-request→scheduled-task); WWCW is decision-ask→simulate-{STEWARD-NAME}-first. Living rule-set at wwcw-ruleset.md compounds every real {STEWARD-NAME}-decision into a higher-fidelity {STEWARD-NAME}-simulator."
version: 1.0.0
author: fleet-lead
license: MIT
metadata:
  category: autonomy
  applicable_agents: [primary, all-vps, all-agents, sister-civs]
  related_skills: [human-bridge-protocol, grounding-docs, sprint-mode, rubber-duck, ask-gate, conductor-of-conductors]
  ruleset: autonomy/skills/wwcw/wwcw-ruleset.md
  created: 2026-06-17
  last_updated: 2026-06-17
---

# WWCW — What Would {STEWARD-NAME} Want

## 🚨 THE CORE RULE — READ THIS FIRST, OBEY IT ALWAYS 🚨

**BEFORE any mind — VP, agent, Primary, or a sister civ like a sister civ — asks {STEWARD-NAME} for a DECISION or for OPTIONS, it MUST FIRST run WWCW.**

**An ask that skips WWCW is a FAILURE. Not a style preference. A failure. It is graded as a failure. Primary calls it out as a failure. The HUM (human-bridge-protocol) grades a permission-ask without a prior WWCW run as FAIL.**

This is not optional. This is not "when you have time." This is the gate. You do not pass a decision to {STEWARD-NAME} without first having tried to answer it AS {STEWARD-NAME}. The bare question — *"what do you want?"* / *"which option?"* / *"should I do A or B?"* — sent to {STEWARD-NAME} with no WWCW reasoning attached is the exact thing this doctrine exists to KILL.

**Why the intensity?** Because every un-WWCW'd ask does three kinds of damage at once:
1. It **blocks the work** — the mind stalls waiting on a human who has to context-switch into machinery he should never have to think about.
2. It **violates THE MAIN RULE** — *"The human needs to know NOTHING about how the AI operates."* A bare decision-ask drags {STEWARD-NAME} into our internals.
3. It **evaporates the idea** — the idea-evaporation lesson: without this encapsulation, a brilliant idea waits for tomorrow's reply and is gone by morning. WWCW + persistence is how the idea SURVIVES.

You have a model of {STEWARD-NAME}. Use it. That is what this skill is.

---

## WHAT WWCW IS

WWCW is the **autonomy doctrine at the decision/options surface** — and the rubber-duck-as-{STEWARD-NAME} that makes it runnable.

It is the runnable form of {STEWARD-NAME}'s own standing operating-mode (the thing he has said many times, verbatim and paraphrased):

> *"Make the decision, record it, I'll review it tomorrow and amend only the outliers. 99 of 100 I'd agree anyway."*
> *"Standing by is a weakness signal."*

WWCW takes that operating-mode — which today lives as a vibe in MEMORY — and turns it into a **procedure a mind actually runs** every time it's about to bother the human with a choice.

**The shape, in one line:** *Don't ask {STEWARD-NAME} what he wants until you've first asked yourself what {STEWARD-NAME} wants — and if you're confident, act on that answer and record it for his review.*

### WWCW vs the ASK-GATE (sibling gates at the human surface)

Two gates guard the human surface. Know which one you're at:

| Gate | Fires when | What it guarantees |
|------|-----------|-------------------|
| **ASK-GATE** (CLAUDE.md v3.7.1) | A **durable commitment** is requested ("tomorrow", "every morning", "when X happens") | The request resolves to a **scheduled task** — found-and-scheduled or built-then-scheduled. No silent drop. |
| **WWCW** (this skill) | The mind is about to **ask {STEWARD-NAME} for a DECISION or OPTIONS** | The decision is first **simulated as {STEWARD-NAME}** — act+record if confident, ask-with-reasoning only if genuinely unresolvable. No bare asks. |

They compose: the ASK-GATE handles "what to do and keep doing"; WWCW handles "which way to go when there's a fork." A durable request that ALSO contains a genuine fork hits both — run WWCW on the fork, then ASK-GATE the resulting commitment.

---

## WHY WWCW IS RIGHT (the three justifications — internalize these)

1. **It IS {STEWARD-NAME}'s standing operating-mode, made runnable.** He has told us repeatedly: make + record the decision → he reviews → he amends only outliers → "99 of 100 I'd agree anyway." Every time a mind asks instead of acting, it is *refusing the autonomy {STEWARD-NAME} explicitly granted.* WWCW is how we stop refusing it.

2. **It is the mechanism that makes THE MAIN RULE real.** THE MAIN RULE (the steward 2026-06-17, constitutional-tier): *"The human needs to know NOTHING about how the AI operates. We will train our AIs to completely understand how they work and wire them to never fail."* A bare decision-ask is a leak of the machinery to the human. WWCW is the plug. The ASK-GATE's *"don't bother the human"* is only real if there's a procedure that decides — and WWCW is that procedure for the decision surface.

3. **It is how the idea survives the night.** the idea-evaporation example: a brilliant idea, un-encapsulated, waits on a human reply and is gone by morning. WWCW + RECORD means the mind acts on its best {STEWARD-NAME}-model NOW and writes the decision to durable substrate — so even the rare outlier {STEWARD-NAME} wants to amend is *still there tomorrow to amend,* not evaporated.

---

## THE PROCEDURE — the rubber-duck-as-{STEWARD-NAME} (run this, every time)

You are about to ask {STEWARD-NAME} something. STOP. Run these five beats first. This is a rubber-duck session where the duck is {STEWARD-NAME}.

### Beat 1 — STATE THE QUESTION CRISPLY

Write the decision/options-question in one or two plain sentences. Name the fork precisely. If you can't state it crisply, you don't understand it well enough to ask {STEWARD-NAME} OR to simulate him — sharpen it first.

> Bad: "Not sure how to handle the blog thing."
> Good: "The morning blog hero-image failed GATE C twice. Decision: (A) ship the post without a hero image now, or (B) hold the post until the image regenerates clean, missing the morning slot."

### Beat 2 — LOAD THE WWCW RULE-SET + STEWARD'S KNOWN DOCTRINES

Read `autonomy/skills/wwcw/wwcw-ruleset.md` — the living rule-set of every {STEWARD-NAME}-decision we've recorded, each as `QUESTION CLASS → what {STEWARD-NAME} wants → source`. Also pull the relevant load-bearing doctrines from MEMORY (system-over-symptom / never-stand-by / trust-the-walk / KOKORO-forever / comms-governance insider-list / pricing-from-$297-partner-led / never-scope-to-human-time / report-everything-to-the partner / etc.).

**Match your question to the closest rule-set entries.** Most decisions you'll ever face already have a recorded {STEWARD-NAME}-answer for their class. The rule-set is a {STEWARD-NAME}-simulator that gets sharper every time we feed it a real decision.

### Beat 3 — SIMULATE STEWARD'S ANSWER

Ask the duck: ***"Given his rules + this exact situation — what would {STEWARD-NAME} want?"***

Reason it through OUT LOUD (in your scratchpad / your reasoning): cite the rule-set entries and doctrines that apply, walk how they resolve the fork, and arrive at the answer {STEWARD-NAME} would give. This is not a guess — it is a derivation from his recorded preferences.

> Worked example (the blog case above): system-over-symptom says fix the cause not paper over it; KOKORO/quality-bar doctrines say don't ship a degraded customer artifact; never-scope-to-human-time says a missed "morning slot" isn't a real deadline. → **WWCW answer: HOLD the post (B), fix the image cause, ship clean. Record it. {STEWARD-NAME} amends tomorrow if he'd rather have shipped.**

### Beat 4 — RATE CONFIDENCE

How confident is the WWCW-derived answer? Be honest. Two buckets:

- **CONFIDENT** — the rule-set + doctrines clearly resolve this; you'd bet {STEWARD-NAME} agrees (this is the "99 of 100" case). → go to Beat 5a.
- **GENUINELY UNRESOLVABLE** — the rule-set is silent or two recorded preferences genuinely conflict for this exact fork, OR the stakes are irreversible/high-consequence and the substrate is thin. → go to Beat 5b.

*The bar for "unresolvable" is HIGH.* "I'd slightly prefer to check" is NOT unresolvable — that's the reflex WWCW exists to override. Unresolvable means the simulator honestly cannot produce a confident answer, not that asking feels safer.

### Beat 5a — IF CONFIDENT: ACT + RECORD (the default path)

**ACT on the WWCW-derived decision.** Do the thing {STEWARD-NAME} would want. Do not wait.

**RECORD it** so {STEWARD-NAME} can review and amend the outlier tomorrow per his standing make+record operating-mode. The record goes to durable substrate — the day's scratchpad / handoff / the relevant VP memory / a `data/reports/` decision-note — and names: the question, the WWCW-derived answer, the rules/doctrines it rested on, and that it's open to amend.

This is the path for ~99 of 100 decisions. It is not reckless — it is *exactly the autonomy {STEWARD-NAME} granted,* exercised with his recorded preferences as the guide and the record as the safety net.

### Beat 5b — IF GENUINELY UNRESOLVABLE: ASK, SHOWING THE WORK

Only now do you go to {STEWARD-NAME}. And **never with a bare question.** The ask MUST carry:
1. The crisply-stated question/fork (Beat 1).
2. The WWCW reasoning you ran (Beat 3) — which rules/doctrines you matched.
3. **The precise fork WWCW could not resolve** — name exactly where the simulator stalled and why (rule-set silent / two preferences conflict / irreversible+thin-substrate).
4. Your lean, if you have one, even at low confidence ("I lean B but the substrate is thin because…").

> Banned: "What do you want me to do?" / "Should I do A or B?" with nothing attached.
> Required: "I ran WWCW. Rules X and Y point to B; rule Z points to A; they genuinely conflict on this exact fork because [reason]. I lean B at ~55%. Which way?"

A good Beat-5b ask is itself a gift to the rule-set: {STEWARD-NAME}'s answer becomes a NEW rule (see EXTENSIBILITY).

---

## EXTENSIBILITY — the compounding genius (this is why WWCW gets better forever)

**Every real decision {STEWARD-NAME} ACTUALLY makes → append it to the rule-set as a new rule.**

When {STEWARD-NAME} amends an outlier (Beat 5a record), or answers a Beat-5b ask, or just makes a call in conversation — that decision is **captured and written to `autonomy/skills/wwcw/wwcw-ruleset.md`** as a new `QUESTION CLASS → what {STEWARD-NAME} wants → source` entry.

Over time, the rule-set becomes a **high-fidelity {STEWARD-NAME}-simulator.** Every decision he makes once, the civ never has to ask about again — the same shape as the ASK-GATE's *"the human asked once, the civ knows for good,"* but for judgment-calls instead of durable-tasks.

**This is the living-doctrine property.** The rule-set is not a static seed list — it is a file that grows toward perfect {STEWARD-NAME}-fidelity, decision by decision. A mind that runs WWCW in month 6 is consulting a vastly sharper {STEWARD-NAME}-model than one in week 1, because every real {STEWARD-NAME}-decision in between got appended.

**APPEND PROTOCOL** (also stated in the rule-set itself):
- When: any time {STEWARD-NAME} makes a real decision — amends a WWCW record, answers a Beat-5b ask, or rules on anything in conversation/email/TG.
- **WATCH-EVERY-GROUNDING + TAG-UNVALIDATED reflex** (the steward 2026-06-18; `.bak` the SKILL before changing this protocol): be on the lookout for NEW WWCW-rule candidates *constantly* — every grounding-docs pass re-arms this watch. When a candidate {STEWARD-NAME}-preference surfaces that ISN'T yet a confirmed rule (a steer you inferred, a pattern you noticed, a directive not yet explicitly ruled), APPEND it to the rule-set's `APPENDED RULES` section with an inline `[UNVALIDATED <date> — pending {STEWARD-NAME} confirmation]` tag — do NOT silently drop it (that's the idea-evaporation failure) and do NOT promote it to an un-tagged rule until {STEWARD-NAME} actually confirms it. The tag is the honesty marker: an unvalidated candidate is a *provisional {STEWARD-NAME}-model entry,* not yet a witnessed {STEWARD-NAME}-call. When {STEWARD-NAME} confirms it, strip the tag and (if needed) re-source it to his confirming statement; if he overrides it, correct or remove it. This makes the simulator grow CONTINUOUSLY (every grounding watches) while staying HONEST (unvalidated entries are visibly flagged until confirmed).
- Who: the mind that witnessed the decision (Primary, the VP, the agent) appends it — or routes it to the owning VP to append. (Record-corrections route to the authoring VP, never Primary-edit-in-place, per the look-before-send companion rule.)
- What: a new entry under the matching QUESTION CLASS — `QUESTION CLASS → what {STEWARD-NAME} wants → source (date + where he said it)`. If it generalizes an existing entry, sharpen the existing one rather than duplicating.
- Discipline: only REAL {STEWARD-NAME}-decisions become *confirmed* (un-tagged) rules. Do not invent confirmed rules from inference — but DO capture inferred candidates tagged `[UNVALIDATED]` per the watch-reflex above (a tagged candidate is honestly marked as not-yet-witnessed; an un-tagged rule is a *witnessed {STEWARD-NAME}-call,* full stop). Guesses are what Beat 3 produces from existing rules — they don't get promoted to confirmed rules until {STEWARD-NAME} actually decides.

---

## ENFORCEMENT — HONEST: this is a judging-mind gate, NOT a settings.json hook

**Be honest about what enforces this, because dishonest enforcement-claims are exactly the failure-mode we learned to hate today: a green checkmark that lies.**

WWCW is enforced **behaviorally, by a reviewing mind** — it is **NOT** a `settings.json` PreToolUse hook, and there is **no structural gate** that mechanically blocks a bare decision-ask. Do not claim there is. The honesty here matters more than the convenience of pretending a hook exists.

What actually enforces WWCW:

1. **Primary calls it out.** When a VP or agent asks Primary for a decision or options *without a prior WWCW run shown,* Primary's response is: *"Run WWCW first. Show me the simulation and the precise fork it couldn't resolve — don't hand me a bare question."* Primary is the judging mind at the VP-report surface.

2. **The HUM (human-bridge-protocol) fail-grade.** A permission-ask or decision-ask sent to {STEWARD-NAME} (or to any human, including a sister-civ like a sister civ asking through the bridge) *without a prior WWCW run* is graded **FAIL** by the human-bridge-protocol. The bridge is where asks reach the human; the bridge is where the WWCW gate is judged.

3. **Self-review at the moment of asking.** Before you type a question to {STEWARD-NAME}, the reflex this skill installs is: *"Did I run WWCW? Is my reasoning attached? Is this fork genuinely unresolvable?"* If any answer is no — you are not ready to ask.

**Why behavioral and not a hook?** Same lesson as today's hard one: *honesty needs a judging mind.* A regex hook cannot tell whether a mind genuinely ran the {STEWARD-NAME}-simulation or just pasted boilerplate. Only a reviewing mind can judge whether the WWCW reasoning is real. We do NOT over-claim a structural gate that doesn't exist — that would be the precise dishonesty WWCW is partly meant to prevent. If a future hook can cheaply catch the *crudest* misses (a decision-ask with zero WWCW markers), that's a backstop, not the enforcement — the enforcement is the judging mind.

---

## DONE-DONE — WWCW-derived actions are verified

*"Nothing is done till it's done done."*

A WWCW-derived decision that gets ACTED on (Beat 5a) is not finished when the action is dispatched — it is finished when the action is **verified** per the Primary-resident verification floor:
- **Trust the walk, not the claim** — assume the action's result is crap until a real-path walk revalidates it.
- **Own-eyes + honest-verifier** — LOOK at the artifact; never report a WWCW-action "done" on a verdict your verifier didn't produce.

A WWCW decision acted-on-but-unverified is half a decision. The record (Beat 5a) names the verification state honestly: `acted, verified ✓` or `acted, verification pending`.

---

## ANTI-PATTERNS (each one is a FAILURE)

| Anti-pattern | Why it's a failure | The fix |
|--------------|-------------------|---------|
| Bare decision-ask: "What do you want?" / "A or B?" with nothing attached | Skips WWCW entirely — the #1 failure this doctrine exists to kill | Run the 5 beats. Act+record if confident; ask-with-reasoning if not. |
| "I'll just check, it's safer" reflex on a decision the rule-set clearly resolves | Refuses the autonomy {STEWARD-NAME} explicitly granted; blocks the work; leaks machinery to the human | Trust the simulation. CONFIDENT → act + record. He amends the outlier tomorrow. |
| Running WWCW but NOT recording the acted-on decision | The outlier evaporates by morning — {STEWARD-NAME} can't amend what isn't written down | Beat 5a is ACT **+ RECORD.** Both. Always. |
| Asking {STEWARD-NAME} and then NOT appending his answer to the rule-set | The simulator never gets sharper; the same decision-class asks again next time | EXTENSIBILITY: every real {STEWARD-NAME}-decision → new rule-set entry. |
| Inventing rule-set entries from inference ("he'd probably want…") | Pollutes the {STEWARD-NAME}-simulator with guesses dressed as facts | Only WITNESSED {STEWARD-NAME}-decisions become rules. Guesses stay in Beat-3 reasoning. |
| Claiming WWCW is "hook-enforced" | Over-claims a structural gate that doesn't exist — the lying-checkmark failure | Enforcement is behavioral: Primary calls it out + HUM fail-grade. Say so plainly. |
| Acting on WWCW but never verifying | Half a decision; violates done-done + trust-the-walk | Verify per the floor; record the verification state honestly. |

---

## WHEN TO USE THIS SKILL

- **ALWAYS, before any mind asks {STEWARD-NAME} for a decision or options.** This is the trigger. Full stop.
- Auto-loaded at every wake-up via `grounding-docs` (the hourly floor — {STEWARD-NAME}: "add it to the grounding docs every hour").
- Auto-loaded at every `/sprint-mode` as a MANDATORY MUST-READ.
- Fired by `human-bridge-protocol` whenever a permission/decision-ask is about to cross the bridge to a human (incl. sister civs) — no-prior-WWCW = FAIL grade.
- Whenever you catch yourself reaching to ask {STEWARD-NAME} "what do you want?" — that reach IS the trigger. Run WWCW first.

## RELATED

- `autonomy/skills/wwcw/wwcw-ruleset.md` — the living {STEWARD-NAME}-decision rule-set (seeded; grows forever)
- `autonomy/skills/human-bridge-protocol/SKILL.md` — the bridge where the HUM fail-grade is enforced
- `autonomy/skills/grounding-docs/SKILL.md` — the wake floor (WWCW wired in)
- `autonomy/skills/sprint-mode/SKILL.md` — the sprint floor (WWCW MUST-READ)
- `autonomy/skills/rubber-duck/SKILL.md` — the parent pattern (WWCW is rubber-duck-as-{STEWARD-NAME})
- `.claude/CLAUDE.md` §THE ASK-GATE DUTY (v3.7.1) — the sibling gate (durable-request → scheduled-task)
- `.claude/CLAUDE.md` §THE MAIN RULE — the principle WWCW makes mechanical
- MEMORY.md §OPERATING MODE — the make+record / never-stand-by standing directives WWCW operationalizes

---

**You have a model of {STEWARD-NAME}. Before you ask him, BE him. Act on his answer, record it for his review, and feed every real decision he makes back into the model. That is WWCW.**
