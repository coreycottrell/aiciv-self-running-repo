# PHASE 3 — THE KNOWLEDGE ORGAN — Behavioral Tests

**Phase gate:** research-FIRST. 3B wires only AFTER 3A's decision lands + P1.2 (canon_index for cross-links).
**Test discipline:** REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. The consumer is a COLD mind asking the wiki a question — the test is whether it gets a compiled answer cheaper than grep, NOT whether a wiki file exists.

---

## Step P3.1 — DISAMBIGUATE the 2nd-brain/LLM-wiki (research-first, BEFORE wiring)
**Owner:** research-lead (landscape) + mind-lead (decide) · **Proof-gate:** a written decision doc names ONE wiki architecture + its relation to canon; qa-lead WHETHER-review.

**T3.1.1 — The 4-way LLM-wiki conflation is resolved to ONE named thing.**
The decision doc must explicitly distinguish the ≥4 things that share the name "LLM-wiki" (Karpathy gist pattern, native-Hermes llm-wiki, {AICIV-NAME} M6.1 notion, {AICIV-NAME} wiki-write skill) and name WHICH ONE we adopt. PASS = each of the 4 is named + dispositioned (adopt / reject / fold), with the chosen one explicit. FAIL (adversarial) = the doc says "the LLM-wiki" without saying which (the conflation survives) — a decision that keeps the ambiguity is not a decision.

**T3.1.2 — The "5-layer second-brain" claim is grounded or retracted.**
The doc must either cite a canonical source for the "5-layer" model OR retract it in favor of the walked 3-layer (compute/runtime/cognitive). PASS = "5-layer" is sourced to a real artifact, or honestly retracted. FAIL (adversarial) = the doc implements/references "5-layer" with no source (building on a phantom architecture).

**T3.1.3 — VIEW-vs-store decided per RELATE-never-duplicate.**
The doc must decide: is the wiki a VIEW over canon, or a parallel store? PASS = it names ONE, with the rationale tied to RELATE-never-duplicate (the constraint points to VIEW). FAIL (adversarial) = it proposes a parallel store that re-copies canon content (duplication — the entries drift from canon = two truths).

**T3.1.4 — The Karpathy==native-Hermes finding drives ADOPT-not-invent.**
PASS = the doc records that Karpathy's pattern IS the native-Hermes llm-wiki (same system, v2.1.0 bundled) and therefore we ADOPT the bundled version rather than build a new one. FAIL (adversarial) = the doc proposes building a fresh wiki engine when a bundled one exists (re-invention — violates SDK-before-reverse-engineering).

**T3.1.5 — qa-lead WHETHER-review actually ran (should this exist at all).**
PASS = a qa-lead post-hoc WHETHER verdict is attached to the decision doc, and it engaged the real question (is a wiki warranted, or is recall+grep enough?). FAIL (adversarial) = a rubber-stamp "looks good" with no engagement, OR no qa-lead review at all (the WHETHER gate is the anti-bloat check — skipping it is how dead organs get built).

---

## Step P3.2 — WIRE + POPULATE the wiki (only after 3A)
**Owner:** mind-lead (substrate) + the bundled Hermes llm-wiki · **Proof-gate:** a cold mind queries the wiki and gets a compiled answer cheaper than grep; ≥10 entity pages compiled from real canon.

**T3.2.1 — A cold mind queries the wiki and gets a COMPILED answer (real consumer path).**
From a cold state, ask the wiki an entity question (e.g. "what is HUM?"). PASS = it returns a compiled, synthesized answer with canon cross-links. FAIL (adversarial) = it returns a 200 with an empty/stub page, or raw grep dump (a 200 is not an answer; an empty entity page is not "populated").

**T3.2.2 — The compiled answer is CHEAPER than grep (the whole justification).**
Measure: wiki-query cost (tokens/time to a usable answer) vs grep-the-canon for the same entity. PASS = wiki is materially cheaper to a usable answer. FAIL (adversarial) = the wiki costs more than grep for no quality gain (a more expensive path to the same answer = the organ is dead weight; subtract it).

**T3.2.3 — ≥10 entity pages compiled FROM REAL CANON (not seeded/fabricated).**
PASS = ≥10 entity pages exist, each traceable to real canon entries (compile-not-re-read), with cross-links to canon_index. FAIL (adversarial) = pages are LLM-confabulated summaries with no canon provenance, or duplicate the same entity under variant names. Each page must cite the canon entries it compiled from.

**T3.2.4 — The wiki is a VIEW: a canon change propagates, no stale duplicate.**
Change a source canon entry, recompile the relevant wiki page. PASS = the page reflects the new canon (it's a view, recompilable). FAIL (adversarial) = the page keeps the old content (it became a frozen duplicate — RELATE-never-duplicate violated, the exact failure 3A's VIEW decision prevents).

**T3.2.5 — `GET /api/wiki/status` reports real health (not a hardcoded 200).**
Hit the status endpoint. PASS = it reports real wiki state (entity count, last-compile, source-canon linkage) that matches the actual populated state. FAIL (adversarial) = it returns a static `{"status":"ok"}` regardless of whether the wiki is empty (a green status that lies — the kindest possible rot). The status must be falsifiable against the real population.
