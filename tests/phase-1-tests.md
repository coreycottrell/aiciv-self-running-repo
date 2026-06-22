# PHASE 1 — THE SPINE — Behavioral Tests

**Phase gate:** commits ONLY if Step 0A passed (don't build the spine atop an unproven self-boot).
**Test discipline:** REAL-PATH, OBSERVABLE, DONE-DONE, ADVERSARIAL. The spine is the kanban `.db` + the generated WORKBOARD + the TGIM seam. Tests hit the verbs and the generated surface a consumer reads — never "the column exists".

---

## Step P1.1 — Add `owner_vp`/`surface`/`project_id` columns + backfill 45 rows
**Owner:** mind-lead (schema) → fleet-lead (IMPL) · **Proof-gate:** 45/45 rows owned; a NULL-owner-past-triage row FAILS LOUD in `bg_mind_memory_health_sweep_0430_3d`.

**T1.1.1 — All 45 real rows have a real owner_vp (read via the verb, not the column).**
Query the board through its read verb (e.g. `acg_ops_board.py list`) after backfill. PASS = 45/45 rows return a non-NULL owner_vp that is a real VP id (one of the 17). FAIL (adversarial) = any row returns NULL, or an owner_vp string that isn't a registered VP (e.g. "TBD", "unassigned", a typo). A backfill that wrote a placeholder is not a backfill.

**T1.1.2 — set_owner_vp is the ONLY write path (raw UPDATE is blocked/detected).**
Attempt to change ownership via raw `UPDATE tasks SET owner_vp=...` against the `.db`. PASS = the verb `set_owner_vp` works AND a raw UPDATE is either rejected by a guard or flagged by the health sweep as an out-of-band mutation. FAIL (adversarial) = raw SQL silently mutates ownership with no trace (the verb is decorative; the real write path is unguarded).

**T1.1.3 — A NULL-owner past-triage row FAILS LOUD in the health sweep.**
Insert (test fixture) a row in status `ready` with owner_vp NULL, then run `bg_mind_memory_health_sweep_0430_3d`. PASS = the sweep emits a LOUD fail (red row / task_failed / non-zero) naming that row. FAIL (adversarial) = the sweep returns green with a NULL-owner ready row present (silent acceptance — the exact "board adopted-but-empty" rot this column fixes).

**T1.1.4 — Columns are additive + NULLable + fail-closed (no data loss, no crash on old reads).**
Confirm pre-existing reads/tools that don't know the new columns still work, and no existing row's other fields were mutated by the migration. PASS = old read verbs return the same task bodies they did pre-migration; row count still 45; only the 3 new columns added. FAIL (adversarial) = the migration dropped/renamed a column, changed row count, or a legacy tool now errors.

**T1.1.5 — project_id links a row to a real project estate (not a free-text label).**
For rows belonging to a project (e.g. this self-running-aiciv project), project_id must resolve to a real project home. PASS = a row's project_id round-trips to an actual `projects/<id>/` that exists. FAIL (adversarial) = project_id is a vibe string with no estate behind it, or two different spellings for the same project (no canonicalization).

---

## Step P1.2 — BUILD `workflows/civ-workboard.js` (the generator — it does NOT exist)
**Owner:** mind-lead (WORKBOARD owner) + workflow-lead (post-hoc craft) · **Proof-gate:** generated WORKBOARD matches hand-§0's open loops + §0 cannot go stale.

**T1.2.1 — The generator RUNS and produces WORKBOARD from the .db (real generation, not a copy).**
Run `Workflow(civ-workboard.js)`. PASS = it reads `data/acg-ops-board/kanban.db` and writes a WORKBOARD with §0 grouped by owner_vp/surface. FAIL (adversarial) = it cat's the existing hand-WORKBOARD, or writes a stub. Prove generation: change a row in the `.db`, regenerate, see the change appear (T1.2.3).

**T1.2.2 — Generated §0 matches the hand-§0's open loops (parity before cutover).**
Compare the generated §0's open loops against the last hand-maintained §0. PASS = every real open loop in hand-§0 appears in generated-§0 (no silent drops); discrepancies are explained (stale hand entries). FAIL (adversarial) = the generator omits real open loops, or invents loops not in the `.db`.

**T1.2.3 — §0 CANNOT go stale: a stale .db row visibly drifts the board, regen fixes it.**
Mark a `.db` row done; do NOT regenerate → confirm the live WORKBOARD now mis-states it (proving §0 reflects the `.db`, not a frozen hand-edit); regenerate → confirm it corrects. PASS = the board is a pure function of the `.db` (no hand-edited §0 survives). FAIL (adversarial) = a hand-edit to §0 persists across regeneration (a hand-§0 still exists = the stale-§0 gap is NOT closed). This is the core of why the generator must exist.

**T1.2.4 — The hand-WORKBOARD is .bak'd exactly one cycle, then retired.**
Confirm the prior hand-WORKBOARD was backed up (`.bak.<ts>`) before first generation, and after parity (T1.2.2) the hand-maintenance path is retired (no two sources). PASS = one `.bak` exists + a single writer-of-record (the generator) going forward. FAIL (adversarial) = both a hand path and a generated path remain live (two sources of truth = guaranteed future drift).

**T1.2.5 — A consumer reading the generated WORKBOARD at wake-up gets CURRENT state.**
Simulate the wake-up step-4.5 read: open the generated WORKBOARD and check the "last-updated" reflects the latest `.db` mutation, not a frozen date. PASS = the board's freshness tracks the `.db` (e.g. regenerated on the maintenance cadence + on-demand). FAIL (adversarial) = the board shows an old date / pre-generation §0 (the 06-17-stale symptom reappears). The consumer is a fresh mind at wake — it must not be lied to.

---

## Step P1.3 — Wire kanban verbs → TGIM emit (one write-path, two records)
**Owner:** tgim-lead + mind-lead · **Proof-gate:** a status change appears in BOTH kanban + TGIM event_history; no desync.

**T1.3.1 — A status verb writes BOTH records (kanban state + TGIM event).**
Run a real ownership/status verb (e.g. claim_task / set_status). PASS = the `.db` reflects the new state AND a corresponding event appears in TGIM `event_history` with matching task_id. FAIL (adversarial) = only the `.db` changed (TGIM silent) or only TGIM got an event with no `.db` change (phantom event).

**T1.3.2 — task_id + actor correlate across both records (no orphans).**
For the verb in T1.3.1, the TGIM event's task_id/agent_id must match the kanban row's id/owner. PASS = the two records join cleanly on task_id. FAIL (adversarial) = the TGIM event has a different/missing task_id (can't reconcile the audit log to the state = the audit is useless).

**T1.3.3 — TGIM-down does NOT silently half-write (fail-loud or queue).**
Simulate TGIM unreachable, then run a status verb. PASS = the verb either FAILS LOUD (and the `.db` is not left half-mutated) OR durably queues the event for retry (and the queue is observable). FAIL (adversarial) = the `.db` mutates and the TGIM event is dropped silently (desync — the exact thing "one write-path, two records" exists to prevent).

**T1.3.4 — No double-emit on a re-run verb (send_dedup holds).**
Run the same status verb twice (idempotent intent / retry). PASS = exactly ONE TGIM event for the logical transition (dedup via the established send_dedup pattern). FAIL (adversarial) = two identical events in event_history (the duplicate-fire bug Apex hit).

**T1.3.5 — A reconciliation read proves zero desync across N transitions.**
After N≥10 real transitions, run a reconciliation: every kanban current-state row must have a matching terminal TGIM event, and every TGIM transition event must map to a real `.db` row. PASS = 0 unmatched on both sides. FAIL (adversarial) = any kanban state with no audit event, or any audit event with no state (the audit and the state diverged). PATCH 405 by-design must hold — status mutations go through POST /events, never a PATCH.
