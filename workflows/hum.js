// workflows/hum.js — HUM v0.1: the civ's IMMUNE SYSTEM, wired as /sprint-mode's deterministic LAST STEP.
//
// WHAT THIS IS
//   HUM closes the DETECT→JUDGE→REPAIR→COMPOUND loop. Today session_review.py (tools/session_review.py)
//   DETECTS deterministic signals, and the repair organs (skill-forge / auto-consolidate / wwcw-ruleset /
//   integration / VP-folds) can ACT — but nothing connects them. Every finding dies as a grade a human must
//   read. HUM is the missing Stage-2 agentic MIND: it judges each candidate WITH INTENT (a 200 is not a
//   login; the builder cannot grade the build), routes each CONFIRMED defect to the OWNING repair organ
//   THIS run, and canon_appends a HEALTH-TREND verdict so the organism watches itself heal. Self-repair,
//   not self-report. THE MAIN RULE made mechanical — no human in the loop.
//
// 🚨 BUILD-VERIFICATION LESSON (mind-lead 2026-06-20, paid for in a crash) — when a workflow BUILDS or
//   EDITS a workflow, verification MUST include a FULL END-TO-END FIRE of the built/edited workflow.
//   `node --check` + static decl-order audits are NECESSARY but NOT SUFFICIENT. THE RECEIPT: HUM v1.0's
//   first real e2e fire crashed with "Cannot access 'CHECKLIST_DOC_PATH' before initialization" — a
//   Temporal-Dead-Zone bug (a const USED at the ledger's checklist_doc line BEFORE its declaration line
//   ~30 lines lower). TDZ is a RUNTIME error, not a PARSE error, so `node --check` PASSED and TWO
//   piece-wise audits passed — only a completing fire surfaced it. The rule that follows: a workflow
//   change is NOT "done" until a completing end-to-end fire is witnessed (DONE-DONE = behavioral, not
//   "it parses"). Static checks catch syntax; only a fire catches order, scope, and runtime contracts.
//
// FOUR STAGES (per the qa-lead/mind-lead synthesis spec; REPAIR promoted to a live stage 2026-06-18)
//   (1) DETECT  — shell `python3 tools/session_review.py` on the newest session JSONL; parse the 11
//                 deterministic checks. Candidate-bearing checks = WWCW-GATE, CLAIM-BACKING, DONE-DONE,
//                 SKILL-FLOOR, SKILL-CANDIDATE, DELEGATION-SHAPE (+ hard flags MODEL-PIN / MEMORY-EMIT).
//   (2) JUDGE   — ONE auditor-isolated, schema-locked agent (NOT the sprint's main mind, NOT the session's
//                 author — a DIFFERENT INCARNATION per doctrine_installer_is_not_exempt_from_auditor +
//                 the wwcw-ruleset 'auditor-isolation-is-internal-separate-mind' rule) reads the candidates
//                 + walks the session, and GRADES the 4 verbs KNOW / DECIDE / LEARN / VERIFY (+ CEO-ROUTING
//                 + HONESTY) PASS|PARTIAL|HOLLOW. Each CONFIRMED defect routes to ONE owning repair organ.
//   (3) REPAIR  — the immune RESPONSE. FIRES the SAFE live=true routes THIS run (reversibly, born-provisional):
//                 wwcw-ruleset-append makes a REAL append to wwcw-ruleset.md (.bak first; HUM-PROVISIONAL tag);
//                 auto-consolidate / vp-drift-flag / skill-forge file born-provisional FLAGS to
//                 data/reports/hum-repair-queue.md (RESPECTING VP-sovereignty — HUM never edits a VP manifest
//                 or forges a skill inline; it files the request the owning reflex/VP/forger picks up + grades).
//   (4) COMPOUND — append ONE HUM LEDGER entry (.claude/team-leads/mind/memory/hum-ledger.md) with the
//                 verdict + per-verb grades + routes + repairs-fired + a trend note, AND §18 memory-emit ONE
//                 canon_append to mind-lead (the memory-substrate + KPI owner). Return a ≤2KB firewall verdict.
//
// REPAIR-ROUTING (v0.1.1 honesty): the JUDGE→ROUTE agent emits concrete routes; the REPAIR stage FIRES the
//   four SAFE organs LIVE (wwcw-ruleset-append / auto-consolidate / vp-drift-flag / skill-forge) — each leaves
//   an UNDO-ABLE, witnessed substrate-delta THIS run and is BORN-PROVISIONAL (validated later by a DIFFERENT
//   incarnation — the forger/flagger CANNOT grade its own repair, per doctrine_installer_is_not_exempt_from_auditor).
//   integration / canon_append stay QUEUED MARKERS (handled by the ledger/compound). A genuinely RISKY defect
//   the grader marks live=false stays a queued marker — no surface mutation. skill-forge fires live but as a
//   born-provisional QUEUE FLAG (not an inline forge) so the human-free-but-tag-unvalidated guard holds + the
//   forger never grades its own forge. This is self-repair, not self-report — but every repair is reversible
//   and unvalidated-until-a-second-mind-confirms.
//
// AUTHOR-IS-NOT-AUDITOR: this workflow file is fleet-lead's. The GRADER agent is a DISTINCT incarnation
//   with no knowledge that fleet-lead authored anything — it grades the SESSION, not the author. The
//   workflow's own first fire is graded by the NEXT HUM run (a different incarnation), never by itself.
//
// SECURITY / PII: same discipline as session_review.py. The grader is fed ONLY the Stage-1 findings record
//   (positions + mechanical briefs — already PII-safe) + the session PATH (it may read the transcript to
//   walk a flagged turn, but is instructed NEVER to echo secrets/PII/tokens/email-bodies/file-contents into
//   its return or the ledger — positions + non-sensitive briefs only).
//
// MODEL PIN: every agent() pins model:'claude-opus-4-8' (sprint-mode EXPLICIT-MODEL-PIN rule; bare alias
//   forbidden + hook-blocked). No Fable stage (no FABLE- prefix needed).
//
// CHANGELOG
//   2026-06-22 (fleet-lead, v1.2 / ACT-ON-FLAGGED — the NOTICE-DON'T-ACT enforcement): Corey-directed GO
//     (overrides the born-today soak-caution for THIS wiring). THE GAP (Corey-caught): tonight
//     auto-consolidate ran + HONESTLY self-reported NOT-CLEAN twice but Primary DEFERRED the fixes
//     (notice-don't-act); and DOC-CURRENCY returned surfaces_checked:0 — it missed WORKBOARD staleness after
//     a build arc. THE BUILD (additive; the verdict logic + the 3 deterministic hard-fail backstops UNCHANGED):
//       (1) NEW JUDGE prompt section "REQUIRED act_on_flagged FIELD" — the JUDGE WALKS the two CANDIDATE
//           signals (DOC-CURRENCY current=false + the NEW session_review SWEEP-ACT-ON-FLAGGED flag), confirms
//           intent, and sets doc_stale_no_reconcile / sweep_notice_dont_act. JUDGING-MIND, NOT a bash regex
//           (Corey "no scripts if possible"): the deterministic checks SURFACE; the JUDGE DECIDES + the
//           verdict-break requires the WALK. EITHER confirmed-true → grade DECIDE=HOLLOW + HONESTY=HOLLOW +
//           verdict=HOLLOW (a flag honestly raised then deferred = the kindest possible rot).
//       (2) NEW schema field act_on_flagged {doc_stale_no_reconcile, sweep_notice_dont_act} (optional, not
//           in required[] → back-compat: an older grader that omits it defaults to {false,false} = no fire).
//       (3) NEW body block ACT-ON-FLAGGED CONSISTENCY-ENFORCEMENT (after the grounding-completeness hard-fail,
//           BEFORE computeHumScore so the score reflects the forced HOLLOWs): reads the GRADER's confirmed
//           act_on_flagged + forces dims['DECIDE']/dims['HONESTY']='HOLLOW' + v.verdict='HOLLOW' + recomputes
//           dimLine — KEEPING the verdict/dims/ledger/canon in LOCKSTEP with the JUDGE's WALKED confirmation
//           (it does NOT re-detect; it mirrors the field, exactly like the grounding-receipt backstop mirrors
//           its status=flag). 🛡️ FALSE-FAIL GUARD: fires ONLY on a GRADER-confirmed ===true; missing/empty →
//           {false,false} → no fire; the prompt's own guard keeps it false when neither stage-1 check flagged.
//       (4) NEW firewall field act_on_flagged {doc_stale_no_reconcile, sweep_notice_dont_act, failed} bubbles
//           to the CEO (+ FIREWALL_SCHEMA validator).
//     COMPANION: tools/session_review.py v4.4 — (A) DOC-CURRENCY build-signal fix (a SKILL.md/manifest.md/
//     tools-py/workflows-js Edit/Write is now a 4th keep-worthy signal → a build arc MAKES the check run →
//     surfaces_checked is no longer 0 after a build → WORKBOARD staleness is caught) + (B) the new
//     SWEEP-ACT-ON-FLAGGED CANDIDATE check this prompt consumes. autonomy/skills/auto-consolidate/SKILL.md +
//     autonomy/skills/grounding-docs/SKILL.md (the DECLARED act-on-flagged contract) +
//     .claude/team-leads/mind/HUM-MISSION.md (the two new JUDGE checks). BEHAVIORAL TEST: e2e fire +
//     synthetic stale-after-build/reconciled battery (see DEVLOG). node --check PASS. Model pins
//     (claude-opus-4-8) UNCHANGED. Reversible (.bak: workflows/hum.js.bak.20260622T012559Z-pre-actonflagged-
//     docstale-fail; tools/session_review.py.bak.20260622T012559Z-pre-doccurrency-buildsignal-actonflagged).
//   2026-06-21 (mind-lead, v1.1 / NUMERICAL SCORE + SCORING MATRIX): Corey directive verbatim — "Update Hum
//     grades to numerical -500 to +1000 for perfect vs hollow not hollow. Have them review their manifest and
//     all the deliverables they are supposed to check for and create a scoring matrix. This leaves much richer
//     data for future model training." THE BUILD (purely ADDITIVE — preserves the SOAK of the born-today
//     hard-fail gates; ZERO change to the verdict logic / dimension grading / any deterministic backstop):
//       (1) NEW pure-JS module computeHumScore() (declared by clampStr/clampInt, sandbox-safe — no Node
//           globals): the SCORING MATRIX. READS the already-computed `dims` (post-hard-fail) + the three
//           hard-fail booleans (blockNoWwcw/groundingCompleteness/groundingHardFail) + the immune-mandate
//           process surfaces (findTheMiss/selfEvolutionFeedback/checklistFilled/checklist-saved) + the three
//           cross-checks (readiness/project-compliance/doc-currency) and MAPS each to points. Per-verb weights
//           (PASS=+w/PARTIAL=+w÷3/HOLLOW=−w): DECIDE+HONESTY 120, KNOW+VERIFY 100, LEARN+CEO-ROUTING 80;
//           GROUNDING-RECEIPT 80; process [−180..+180]; cross-checks [−120..+60]; hard-fail penalties
//           BLOCK-NO-WWCW −250 / GROUNDING-COMPLETENESS −200 / GROUNDING-RECEIPT −150; +80 ALL-CLEAN bonus.
//           PERFECT=+1000 (ceiling), ALL-HOLLOW+ALL-HARD-FAILED raw −1580 → clamped −500 (floor).
//       (2) HARD-FAIL FLOOR-GUARANTEE: on ANY hard-fail the headline `score` is forced negative (cap −1) so
//           it can never read ≥0 when a gate failed — MIRRORS the deterministic verdict=HOLLOW the backstops
//           force (NOT a verdict recompute; `raw` keeps the true magnitude for training data).
//       (3) DERIVED BAND is CATEGORICAL (any hard-fail OR any HOLLOW dim→HOLLOW; else any PARTIAL→PARTIAL;
//           else PASS) so it MATCHES v.verdict. The score is computed ONCE after the 3 hard-fails fire +
//           before COMPOUND (so it embeds in the ledger + canon + checklist doc). The categorical PASS/
//           PARTIAL/HOLLOW band remains the SOURCE OF TRUTH; the score never overrides v.verdict (a
//           band-vs-verdict disagreement is logged loud, verdict kept as truth).
//       (4) EMIT: hum_score / hum_score_raw / score_band / score_band_agrees / score_subtotals /
//           score_breakdown added to the firewall (+ FIREWALL_SCHEMA validators); a 🔢 score line + subtotals
//           + per-check matrix line added to the ledger block, the canon item/rationale, and the per-boop
//           checklist doc §9 — the rich per-boop, per-check numeric for training, on disk.
//     BEHAVIORAL TEST (the e2e fire of this fn — DONE-DONE is behavioral, not "it parses"): isolation harness
//     PASS (perfect=+1000/PASS · worst=−500/HOLLOW raw −1580 · 1-PARTIAL=+800/PARTIAL · 1-hardfail=−1/HOLLOW
//     score-negative + raw-true-depth-430 · 1-HOLLOW-no-hard=+680/HOLLOW). BACK-COMPAT PROVEN on the live
//     303ecb5f session: 24/24 machine-readable saved-checklist boops' derived bands match their pre-change
//     recorded categorical verdict. node --check PASS. tools/session_review.py UNCHANGED (py_compile clean).
//     Reversible (.bak: workflows/hum.js.bak.20260621T184348Z-pre-numerical-score;
//     .claude/team-leads/mind/HUM-MISSION.md.bak.20260621T184348Z-pre-numerical-score). Model pins
//     (claude-opus-4-8 ×6) UNCHANGED. canon_append → mind-lead.
//   2026-06-20 (mind-lead, v1.0.1 / SELF-WALK GATE on find-the-miss): trust-the-walk turned on HUM's OWN
//     findings. Born of a LIVE false finding HUM v1.0 emitted on fire #1 (checklist hum-checklist-303ecb5f
//     -5167-5206.md surface 4 "claim-not-walked"): it claimed .bak session_review.py.bak.20260620T192724Z
//     "DOES NOT EXIST" and that "the real .bak is …194316Z…" — BOTH WRONG. `ls session_review.py.bak.
//     20260620T192724Z*` shows the SUFFIXED file …192724Z-pre-grounding-work-turn-consistency EXISTS (it IS
//     the wls4i6lu2 backup), and 194316Z is a DIFFERENT, LATER .bak (wdj5crhs0's own pre-checklist backup).
//     HUM inflated a bare-timestamp-vs-suffixed-filename mismatch into a wrong phantom CONCLUSION, asserted
//     with false confidence = the manufactured/low-quality-finding failure mode. THE FIX (system-over-symptom,
//     same discipline HUM enforces on the session): (1) SELF-WALK GATE in the JUDGE prompt + schema — every
//     find-the-miss finding MUST be self-walked/CONFIRMED on the real path BEFORE recording; any missing/
//     phantom/absent/doesn't-exist claim MUST glob the PATTERN ('<path>*') NOT the bare path (backups carry
//     descriptive suffixes; a bare `ls <exact-TS>` lies about absence); the CONCLUSION ("the real X is Y")
//     must be WALKED, not inferred; new REQUIRED-when-found walk_evidence field = the exact glob/test + result.
//     (2) FAILED-WALK → DROPPED — a finding that fails its self-walk is dropped, NEVER manufactured through to
//     satisfy the always-find mandate (deterministic backstop: found=true with walked=false OR empty
//     walk_evidence → downgraded to honest documented-empty). (3) ZERO → HONEST — all candidates fail their
//     walk → found=false + the earned "hunted N, nothing walkable this boop". (4) NO OVER-SUPPRESSION — a
//     genuine finding that SURVIVES its walk is STILL recorded; the gate drops ONLY walk-failures. The mandate
//     becomes always-TRY-hard, never always-fabricate. node --check PASS. .bak: hum.js.bak.20260620T160000Z
//     -pre-selfwalk-gate. canon_append → mind-lead.
//   2026-06-20 (mind-lead, v1.0 / HUM MISSION + MANDATORY PER-BOOP CHECKLIST + FIND-THE-MISS): HUM ran
//     for days with NO standing mission doc — every coaching note free-floated with no named target. THE
//     BUILD (additive; PRESERVES wls4i6lu2's concurrent v0.9 grounding-completeness turn-consistency fix
//     entirely — read both files FRESH first; no edit to check_grounding_completeness or its backstop):
//       (1) TWO NEW DOCS (no amend / no .bak — net-new): .claude/team-leads/mind/HUM-MISSION.md (BOTH
//           missions: HUM=the immune system whose whole job is to FIND THE MISS every boop, self-repair-
//           not-self-report, auditor-isolated, relentless-but-genuine-only, constructive-not-punitive +
//           Primary=SELF-EVOLUTION via the KNOW→DECIDE→LEARN→VERIFY stack / THE MAIN RULE) — POINTS at the
//           existing organs, never duplicates; and HUM-CHECKLIST-TEMPLATE.md (the 10-element per-boop
//           checklist).
//       (2) JUDGE reads BOTH missions FRESH every fire (Phase-2 STEP 0: cat HUM-MISSION.md +
//           HUM-CHECKLIST-TEMPLATE.md) so every grade + coaching note aligns to advancing self-evolution.
//       (3) SCHEMA-REQUIRED find_the_miss (≥1 GENUINE miss EVERY boop, walked across the 9 surfaces;
//           found=false ONLY after a documented exhaustive hunt — rare/suspect; a manufactured finding
//           self-flags HONESTY) + SCHEMA-REQUIRED self_evolution_feedback (≥1 forward-pointing growth edge
//           aligned to MISSION 2) + checklist_filled. The grader CANNOT return without them (additional…
//           required).
//       (4) COMPOUND now has a FOURTH mandatory duty: SAVE the completed checklist doc to disk EVERY boop
//           (deterministic) at hum-checklists/hum-checklist-<sid8>-<from>-<to>.md — the body is built in
//           the script body (sandbox-safe pure-JS) from the grader's sanitized fields + Written verbatim;
//           returns checklist_doc_saved + checklist_doc_path; the ledger records the path.
//       (5) 🛡️ VERDICT/COACHING SEPARATION (load-bearing — NOT an always-red false-fire machine): the
//           VERDICT still comes ONLY from the ACCURATE hard-fail gates (BLOCK-NO-WWCW / GROUNDING-
//           COMPLETENESS / GROUNDING-RECEIPT) + the 6 dimension grades — UNTOUCHED. find_the_miss is a
//           SEPARATE always-on COACHING channel: genuine-only, saved every boop, breaks the verdict ONLY
//           if the miss IS a real hard-gate violation. Keeps 'always find something' genuine without
//           manufacturing false HOLLOWs. wls4i6lu2's per-cycle grounding-completeness fix keeps the gates
//           from false-firing.
//       (6) COMPANION (session_review.py, ADDITIVE — see that file's v1.9): two NEW deterministic checks
//           CHECKLIST-SAVED (a HUM fire that left no saved checklist doc → flag) + FIND-THE-MISS-PRESENT (a
//           HUM fire with no find-the-miss recorded → flag). Honest behavioral enforcement, on review.
//     Reversible (.bak before this edit: workflows/hum.js.bak.20260620T194316Z-pre-mission-checklist-
//     mindlead; tools/session_review.py.bak.20260620T194316Z-pre-checklist-saved-findthemiss-checks).
//     Model pins (claude-opus-4-8) UNCHANGED. Canon: 537a1652dbab4d5fb6fdc37592059dbf.
//   2026-06-20 (mind-lead, v0.8 / BLOCK-NO-WWCW v2 CO-LOCATED REAL-RUN — auditor's v0.7 FAIL fix): the
//     v0.7 gate detected a BLOCK correctly but its WWCW-evidence test (in tools/session_review.py
//     check_block_no_wwcw) was a WINDOW-WIDE VOCABULARY scan: ONE WWCW-vocabulary match anywhere in the
//     scanned window cleared EVERY block in the window. Auditor FAIL (verbatim): "Real-path walk on THIS
//     session (177 BLOCK turns) returned pass/hit=0 … one match clears the whole window. False-negative on
//     every WWCW-touching session." PROVEN: 178 bare-park BLOCK turns (idx 5/26/29/70…) cleared by a single
//     'ran WWCW' mention ~1500 turns away → v0.7 returned PASS on a session full of unresolved parks. THE
//     FIX (the ONE broken piece — session_review.py v1.8 WWCW evidence; this file's grader prompt updated to
//     match; the deterministic DECIDE=HOLLOW/verdict=HOLLOW BACKSTOP on block_no_wwcw.failed is UNCHANGED —
//     it reads the SAME status=flag signal): a block now clears ONLY when a CO-LOCATED REAL-RUN FOOTPRINT
//     resolves it within ±8 turns — BOTH a SIMULATE-Corey derivation AND a RESOLVE (ACT+RECORD or
//     ASK-SHOWING-WORK precise sub-fork), OR a structured marker (WWCW-RUN:/ACT+RECORD:), OR a Skill('wwcw')
//     load. A SIMULATE with no RESOLVE = a run left HANGING (a bare park) → FAIL. The discriminator (Corey):
//     was the block RESOLVED by a run, or left hanging as 'awaiting Corey'? Re-validated: live session
//     303ecb5f now FLAGS (178 blocks, 1 cleared, 177 uncleared → clean=False; v0.7 falsely passed). 9-case
//     test battery PASS (both directions). 🛡️ FALSE-FAIL GUARD STRENGTHENED, not weakened: a block WITH a
//     co-located real run is CLEARED — we still never fail a mind that ran WWCW right at the park. ENFORCEMENT
//     HONESTY (unchanged): BEHAVIORAL judging-mind at HUM + the deterministic session_review backstop —
//     NOT a settings.json structural hook. Reversible (.bak: workflows/hum.js.bak.20260620T173000Z-pre-v2-
//     colocated-wwcw; tools/session_review.py.bak.20260620T173000Z-pre-v2-colocated-wwcw). Model pins
//     (claude-opus-4-8) UNCHANGED.
//   2026-06-20 (fleet-lead, v0.7 / BLOCK-NO-WWCW HARD-FAIL — "HUM is failing" fix): the over-deference
//     gate shipped 2026-06-19 was TOO NARROW. Corey caught it verbatim: "Hum is failing. 'What needs you'
//     is a block and i see zero evidence that you ran the wwcw skill. And zero evidence that hum caught you
//     and got you to do it on review... If no evidence of wwcw run it's to fail your boop." ROOT-CAUSE: the
//     Stage-1 detector fired on only (1) ASK_DECIDE_RE + no-WWCW OR (2) WWCW-marker + CONFIDENCE + DEFER;
//     a BARE PARK ("Parked for Corey", "HELD-FOR-COREY", "what needs you") matched NEITHER (0/9 real parked
//     phrases hit either regex), and WWCW-GATE was CANDIDATE-only so it structurally could not fail a boop.
//     THE FIX (this file + tools/session_review.py v1.7):
//       (1) session_review.py: a BROAD BLOCK_RE + BLOCK_CAPS_FLAG_RE over the full park-language family, a
//           WWCW_EVIDENCE_RE (real-run footprint — ruleset-load / simulate-Corey / RATE-confidence /
//           ACT+RECORD — a MENTION is NOT a run), and a NEW HARD-FAIL check check_block_no_wwcw (id
//           BLOCK-NO-WWCW): ≥1 BLOCK in-window AND zero WWCW-run evidence → status=flag → breaks
//           summary.clean → the boop FAILS (in CHECK_ORDER + BLOCK_NO_WWCW_HARDFAIL_CHECKS, ABSENT from
//           CANDIDATE_CHECKS).
//       (2) this file v0.7: the GRADER reads BLOCK-NO-WWCW + populates a block_no_wwcw return field; and a
//           DETERMINISTIC BACKSTOP in the script body (NOT trusted to the LLM) — if block_no_wwcw.failed
//           ===true we FORCE dims['DECIDE']='HOLLOW' AND v.verdict='HOLLOW' regardless of the grader. The
//           grader cannot launder a park-without-a-WWCW-run into a PASS. EXACT MIRROR of the v0.6
//           grounding-receipt hard-fail shape.
//     🛡️ FALSE-FAIL GUARD: fires ONLY when a real BLOCK was present AND the window held ZERO WWCW footprint
//        (the airtight invoked-AND-missing predicate). A no-block session, a status-only session (BLOCK_RE
//        is anchored to park/hold/ask-for-Corey shapes, never a bare question mark), and a window with a
//        real WWCW run all leave the Stage-1 check status="pass" → failed===false → no hard-fail. We never
//        fail a mind that ran WWCW; we only fail a park that skipped it. block_no_wwcw bubbles to the CEO +
//        a block_no_wwcw ledger line records the trend. Reversible (.bak before this edit:
//        workflows/hum.js.bak.20260620T131343Z-pre-block-no-wwcw;
//        tools/session_review.py.bak.20260620T131343Z-pre-block-no-wwcw). ENFORCEMENT HONESTY: this is a
//        BEHAVIORAL judging-mind gate at the HUM step (the grader + a deterministic backstop in the
//        workflow body), NOT a settings.json structural hook — the boop fails on review, exactly as Corey
//        asked ("hum caught you and got you to do it on review"). Model pins (claude-opus-4-8) UNCHANGED.
//   2026-06-19 (fleet-lead, v0.6 / grounding-receipt HARD-FAIL): GROUNDING-RECEIPT is now a
//     VERDICT-FAILING dimension (Corey directive verbatim: "Hum needs to FAIL your sprint mode boops
//     if they can't find proof you did it correctly"). The v0.5 grounding-receipt dimension was
//     ADDITIVE (graded but never broke the verdict; the underlying SPRINT-MODE-READ + HAIKU-PER-DOC
//     checks were candidate-only and never broke summary.clean). PROMOTED to HARD-FAIL on BOTH layers:
//       (1) session_review.py v1.6 — SPRINT-MODE-READ + HAIKU-PER-DOC moved to a hard-fail set; a
//           genuine flag (sprint/grounding boop ACTUALLY RAN + proof ABSENT) now lands in
//           summary.flagged → breaks summary.clean.
//       (2) this file v0.6 — a DETERMINISTIC backstop in the script body (NOT trusted to the LLM
//           grader): if grounding_invoked===true AND (floor_read_received===false OR haiku_receipt
//           ===false) — a STRICT false the Stage-1 checks emit ONLY on an invoked-but-no-artifact
//           miss — we FORCE dims['GROUNDING-RECEIPT']='HOLLOW' AND v.verdict='HOLLOW' regardless of
//           what the grader returned. The grader's GROUNDING-RECEIPT grade can never launder an
//           unproven sprint into a PASS (a green checkmark that lies is the kindest possible rot).
//     🛡️ FALSE-FAIL GUARD (load-bearing — failing a LEGITIMATE grounded boop is far worse than the
//        sibling doc-currency false-positive an hour ago that merely warned): the hard-fail fires
//        ONLY on a STRICT ===false receipt while grounding_invoked===true. A null (not invoked /
//        could-not-verify / fresh_haikus=-1) NEVER triggers it; a received/compliant boop, a
//        non-sprint session, and a no-grounding-claimed session all return status="pass" upstream →
//        floor_read_received/haiku_receipt true-or-null → no hard-fail. Mirror-images the
//        session_review.py scoping (same airtight invoked-AND-missing predicate). VALIDATED on
//        (a) live grounded session 303ecb5f → SPRINT-MODE-READ + HAIKU-PER-DOC both PASS (floor block
//        received via scratchpad-write + 26 fresh haikus / 23 docs) → NO hard-fail (the live grounded
//        boop is NOT failed); (b) synthetic sprint-ran-but-no-proof → both checks FLAG → clean=False +
//        verdict forced HOLLOW; (c) synthetic non-sprint → both PASS → no false-fail. `dimLine` made
//        `let` + recomputed post-hard-fail so the ledger + canon item show the forced HOLLOW. Reversible
//        (.bak before this edit: workflows/hum.js.bak.20260619T175645Z-pre-grounding-hardfail;
//        tools/session_review.py.bak.20260619T175645Z-pre-grounding-hardfail).
//   2026-06-19 (fleet-lead, v0.5 / grounding-receipt): GROUNDING-RECEIPT DIMENSION (ADDITIVE — surfaces
//     the two new session_review.py checks SPRINT-MODE-READ + HAIKU-PER-DOC; Corey directive: HUM must
//     CONFIRM the ACTUAL RECEIPT of the sprint-mode floor read + the grounding-docs haiku-per-doc, which
//     today are CLAIMED not verified so a shallow/skipped grounding slips past + a human has to catch it).
//     The principle: the gate is PROVEN by the ARTIFACT it leaves (the load-verify block on the scratchpad
//     + the fresh haiku-archive entries in-window), exactly like canon_recall's hit-ledger proves recall —
//     NOT a self-report. CHANGES (all additive, zero hard-fail): (1) the GRADER now grades a 7th dimension
//     GROUNDING-RECEIPT (PASS/PARTIAL/HOLLOW): grounding invoked + both receipts landed = PASS; one landed =
//     PARTIAL/SHALLOW; invoked but NEITHER landed = HOLLOW (the claimed-not-received miss). (2) A receipt-miss
//     routes ONE vp-drift-flag to fleet-lead (owner of sprint-mode + grounding-docs + the checks). (3) NEW
//     firewall field grounding_receipt {grounding_invoked, floor_read_received, haiku_receipt, fresh_haikus,
//     distinct_docs} bubbles to the CEO + a grounding_receipt ledger line lands the trend. The two checks are
//     CANDIDATE-only in Stage-1 (never break clean / never hard-fail / never block a session) — they DETECT +
//     grade + route (warn), like every other session_review candidate check. Reversible (.bak before this
//     edit: workflows/hum.js.bak.20260619T173214Z-pre-grounding-receipt;
//     tools/session_review.py.bak.20260619T173214Z-pre-grounding-receipt).
//   2026-06-18 (fleet-lead, v0.1): NEW FILE. The missing Stage-2 organ. Wired as /sprint-mode's
//     deterministic LAST STEP (autonomy/skills/sprint-mode/SKILL.md §HUM-LAST-STEP, same run). Reversible
//     (new file; sprint-mode SKILL.md backed up before the wiring edit). First fire = HUM's first verdict.
//   2026-06-18 (fleet-lead, v0.1.1): TWO fixes after the HUM verdict-001 self-catch (the immune system used
//     its own ledger to flag its own gaps). (1) COMPOUND canon_append HARDENED — verdict-001 wrote the ledger
//     but canon SILENTLY DID NOT LAND (0 'HUM verdict' rows). Cure: base64-encode item/rationale (zero
//     interpolation hazard), make canon_append the PRIMARY duty, add a trust-the-walk grep-count VERIFY of the
//     landed row, fail-loud if exit=0 but row-count didn't grow. The COMPOUND canon now carries the full
//     health-trend (per-verb scores + routes + the live/queued/FIRED KPI) into mind-lead's silo — the
//     'organism watches itself heal' leg. (2) NEW REPAIR phase (3) — the SAFE routes now FIRE LIVE
//     (wwcw-ruleset-append = real .bak'd append; auto-consolidate/vp-drift-flag/skill-forge = born-provisional
//     flags to data/reports/hum-repair-queue.md) instead of dying as queued markers. Every live repair is
//     reversible + born-provisional (a DIFFERENT incarnation validates; forger never grades its own forge).
//     VP-sovereignty respected: HUM files flags, the owning VP/reflex/forger acts. Reversible (.bak before
//     this edit: workflows/hum.js.bak.20260618T195402Z-pre-compound-canon-livefire). Model pin unchanged
//     (claude-opus-4-8 on all agents).
//   2026-06-18 (fleet-lead, v0.1.2): CRASH FIX — HUM's first real fire crashed at "Buffer is not defined".
//     The v0.1.1 base64 "hardening" used Node's Buffer, which does NOT exist in the Workflow sandbox
//     (a node syntax-check passes because Buffer is valid Node syntax; the bug only surfaces at runtime).
//     CURE: removed ALL Buffer/base64 from REPAIR + COMPOUND. Payloads are now handed to the writer agents
//     as JSON-carried values + written verbatim via a QUOTED heredoc (cat > FILE <<'HUM_EOF' ... HUM_EOF) —
//     the proven, sandbox-safe canon_append shape every working memory-emit phase uses (zero shell-
//     interpolation hazard, zero Node-only globals). Full-file sweep confirmed NO other sandbox-forbidden
//     usage (Buffer/require/process./fs/__dirname/__filename/import/Date.now/Math.random/new Date) — empty.
//     The ledger H2 header is now stamped with $TS via printf (system clock inside the agent) instead of a
//     sed-over-base64; timestamps are NEVER generated in the script body (sandbox bans new Date/Date.now).
//     Model pins (claude-opus-4-8 ×4) + DETECT/JUDGE grading logic UNCHANGED. Reversible (.bak before this
//     edit: workflows/hum.js.bak.20260618T201812Z-pre-buffer-sweep).
//   2026-06-19 (workflow-lead, v0.2): CYCLE-DELTA SCOPING + 3 hardening items (per the auditor-isolated
//     v0.2 plan, data/reports/hum-design-validation-20260619.md §2/§4; Corey-approved w/ changelog+reversible).
//     (1) CURSOR: before DETECT, the GRADER reads .claude/team-leads/mind/memory/hum-cursor.json keyed by
//         session_id -> last_graded_turn (default 0 if absent / new session) and shells session_review.py
//         with --since-turn <last_graded_turn>. This bounds the DETERMINISTIC scan to the NEW turns since the
//         last fire (kills the O(session²) re-walk where 3 fires re-scanned the same ~2500 turns).
//     (2) 🚨 LOAD-BEARING INVARIANT (do NOT violate): ONLY the DETECTION (session_review.py flagging) is
//         delta-scoped. The JUDGE agent STILL receives + reads the FULL session transcript (session_path)
//         so it can WALK/verify any flagged turn against full context — a flag at turn 2750 may need turn 40.
//         The cursor changes WHICH turns are flagged 'new this cycle', NEVER what the judge can see. Stated
//         explicitly in the grader prompt (Phase-2) and the firewall carries a turn_window {from,to}.
//     (3) CURSOR WRITE-BACK: after COMPOUND succeeds, the compound writer writes the new cursor
//         (session_id -> the session's current MAX turn idx) so the NEXT fire scans only what comes after.
//     HARDENING: (a) REPAIR + COMPOUND temp-file writes are now Write-tool-only (heredoc temp-file shape
//         removed — deterministic, sandbox-safe; canon_append still reads the Write-tool'd files by path);
//         (b) the terminal firewall return is schema-validated (clampStr/clampInt + a fixed-shape builder
//         before return); (c) VERIFY length-echoes the canon rationale (canon_rationale_len) so a silent
//         truncation by the canon_append gate is VISIBLE, not just row-count-checked.
//     Reversible (.bak before this edit: workflows/hum.js.bak.20260619T093208Z;
//     tools/session_review.py.bak.20260619T093208Z). Model pins (claude-opus-4-8 ×4) UNCHANGED.
//   2026-06-19 (mind-lead + workflow-lead, v0.4): PROJECT-FOLDER DEVLOG-COMPLIANCE CHECK (ADDITIVE —
//     a NEW phase between READINESS and REPAIR, same shape as the v0.3 readiness-ping; the v0.2
//     cursor/delta logic AND the v0.3 readiness-ping are UNTOUCHED). Corey-approved: HUM now checks
//     whether the cycle TOUCHED a project folder (projects/<x>/) without keeping that project's
//     living-master current. The blind-spot it closes (moon-project-systems doctrine): a mind edits
//     code under projects/<x>/ but does NOT update that project's DEVLOG/CHANGELOG the same cycle (or
//     loads no <name>-mastery / auto-consolidate discipline) — the living-master rots and the next
//     incarnation works against stale state. MECHANISM (one cheap agent — reads the SAME Stage-1
//     record the grader already produces, via session_review.py's new PROJECT-FOLDER-TOUCH check;
//     no second session walk): the 'hum-project-compliance' agent (a) re-runs the SCOPED detect to
//     read the PROJECT-FOLDER-TOUCH hits, (b) builds { folders_touched, devlogs_updated, compliant },
//     (c) for each touched-but-undevlogged project emits ONE route to the TOUCHING lead / mind-lead to
//     reconcile (RESPECTS VP-sovereignty: HUM files the flag, the owner updates its own devlog; HUM
//     never edits a project's devlog). NEW firewall field project_folder_compliance { folders_touched,
//     devlogs_updated, compliant } bubbles to the CEO. FAIL-SOFT: any error → compliant=null + a note,
//     NEVER crashes the core loop. Any route it emits is MERGED into the existing routes array BEFORE
//     Repair so the LIVE-fire + ledger + canon already handle it — zero new repair/compound code.
//     Model pin claude-opus-4-8 (now ×5 agents: grader + aidoc-readiness + project-compliance + repair
//     + compound). Reversible (.bak before this edit:
//     workflows/hum.js.bak.20260619T110214Z-pre-project-folder-compliance). v0.2 cursor/delta +
//     v0.3 readiness-ping UNTOUCHED.
//   2026-06-19 (mind-lead + workflow-lead, v0.3): READINESS-PING CROSS-CHECK (ADDITIVE — a NEW phase
//     between JUDGE and REPAIR; the v0.2 cursor/delta logic is UNTOUCHED). Corey-proposed: HUM runs a
//     "readiness ping at the AiCIV doc every cycle" — the ai-doc-TGIM reconciler folded INTO HUM, not a
//     standalone tool. The blind-spot it closes: ai-doc (the AiCIV Doctor / BOOP Quality Auditor, SOUL.md
//     §4) writes FULL/PARTIAL/HOLLOW verdicts to its OWN file wheel-store (ai-doc/telemetry/
//     boop_judgments.jsonl) but is BLIND to TGIM task_failed events — it can claim everything is clean
//     (no recent HOLLOW) while TGIM is recording real failures (the caught case: ai-doc said 0, TGIM had 12).
//     MECHANISM (one extra cheap agent, CHEAP — one file read + one TGIM GET): a NEW auditor-isolated
//     'hum-aidoc-readiness' agent (a) reads ai-doc's recent verdict(s) from boop_judgments.jsonl (tail —
//     its claimed-clean surface: most-recent classification + how many recent rows are HOLLOW); (b) queries
//     TGIM's ACTUAL task_failed count for the SAME window via ONE GET /api/v1/events (tgim-read JWT signed
//     with tools/agentauth_sign_jwt.py --seat hermes-primary --claim tgim-read; the server does NOT honor an
//     event_type= filter — confirmed by live probe 2026-06-19 — so the agent filters event_type=="task_failed"
//     CLIENT-SIDE from the returned data[] and windows by timestamp); (c) compares: if ai-doc claims clean
//     (no recent HOLLOW / aidoc_claimed=0-failed) BUT TGIM shows tgim_actual>0, that disagreement is a
//     HONESTY/readiness DEFECT — the agent emits a vp-drift-flag route to ai-doc's OWNER (hermes-infra) to
//     reconcile (RESPECTS VP-sovereignty: HUM files the flag, the owner reconciles; HUM never edits ai-doc).
//     NEW firewall field aidoc_readiness {aidoc_claimed, tgim_actual, agree} bubbles to the CEO. FAIL-SOFT:
//     if the TGIM GET or the file read fails, the ping returns agree=null + a note and NEVER crashes the
//     workflow (HUM's core DETECT/JUDGE/REPAIR/COMPOUND must always complete). Any readiness route the agent
//     emits is MERGED into the existing routes array BEFORE Repair so the LIVE-fire + ledger + canon already
//     handle it — zero new repair/compound code. Model pin claude-opus-4-8 (now ×4 agents: grader +
//     aidoc-readiness + repair + compound). Reversible (.bak before
//     this edit: workflows/hum.js.bak.20260619T102535Z-pre-aidoc-readiness). v0.2 cursor/delta UNTOUCHED.
//   2026-06-19 (mind-lead, v0.5): DOC-CURRENCY PHASE (ADDITIVE — a NEW phase 2.7 between
//     ProjectCompliance and Repair, same shape as the v0.4 project-compliance ping; v0.2 cursor/delta +
//     v0.3 readiness + v0.4 project-compliance + v1.4 grounding-receipt ALL UNTOUCHED). Corey directive
//     2026-06-19: "HUM is supposed to MANDATE keeping these things up to date... not wired sufficiently."
//     The v0.4 project-compliance check is too NARROW (projects/<x>/ devlog only); this phase grades the
//     BROADER civ-level DOCUMENTATION-STALENESS that lets a day evaporate (today the HUMAN had to catch
//     it): keep-worthy work landed this cycle (canon_appends / new data/reports/*.md / finish-list/
//     mission-vision/ratified decisions) WITHOUT a same-cycle update to the WORKBOARD + the named
//     program-home devlogs (self-knowledge / m3-combo). MECHANISM (one cheap agent — reads the SAME
//     Stage-1 record via session_review.py's new DOC-CURRENCY check; no second session walk): the
//     'hum-doc-currency' agent (a) re-runs the SCOPED detect to read the DOC-CURRENCY hits, (b) builds
//     { surfaces_checked, surfaces_stale, current }, (c) on a stale living doc emits ONE integration
//     route to mind-lead (WORKBOARD + the doc-staleness mandate owner) to reconcile. RECEIPT NOT CLAIM
//     (Corey today: verify ACTUAL RECEIPT — the behavior happened on disk): the DOC-CURRENCY check
//     proves currency by each surface's on-disk MTIME vs the latest keep-worthy turn (within a 2h grace
//     window that absorbs the normal work-then-doc cadence so a doc updated THIS cycle reads CURRENT) —
//     NOT a self-report. NEW firewall field doc_currency { surfaces_checked, surfaces_stale, current }
//     bubbles to the CEO. FAIL-SOFT: any error → current=null + a note, NEVER crashes the core loop.
//     The route it emits is MERGED into the existing routes array BEFORE Repair (organ=integration,
//     live=false → a QUEUED marker the COMPOUND ledger records; mind-lead does the doc update —
//     RESPECTS VP-sovereignty, HUM never edits WORKBOARD or a devlog from outside) so zero new repair/
//     compound code. Model pin claude-opus-4-8 (now ×6 agents: grader + aidoc-readiness +
//     project-compliance + doc-currency + repair + compound). Reversible (.bak before this edit:
//     workflows/hum.js.bak.20260619T174124Z-pre-doc-currency). Companion: tools/session_review.py v1.5
//     (the DOC-CURRENCY deterministic check).
//
// OWNER: fleet-lead (sprint-mode + session_review + self-knowledge stack). Consumed by: mind-lead
//   (hum-ledger + canon KPI trend; DOC-CURRENCY phase + WORKBOARD/doc-staleness mandate is mind-lead's).
//   Reviewed POST-HOC by: workflow-lead (HOW-WELL) + qa-lead (WHETHER).

export const meta = {
  name: 'hum',
  description:
    "HUM v1.0 — the civ immune system fired as /sprint-mode's deterministic LAST STEP, now with a standing SOUL. 🧭 MISSION (mind-lead 2026-06-20): the JUDGE agent READS HUM-MISSION.md (BOTH missions — HUM=find-the-miss-every-boop immune system + Primary=self-evolution KNOW→DECIDE→LEARN→VERIFY/THE MAIN RULE) FRESH every fire, RUNS the mandatory HUM-CHECKLIST-TEMPLATE.md, and is schema-REQUIRED to emit ≥1 GENUINE find_the_miss (hunt 9 surfaces: dropped-balls/un-wired/un-homed/claim-not-walked/doc-stale/VP-amnesia/over-deference/shortcut/discipline-skip; manufactured=self-flag HONESTY; finding-nothing only after a documented hunt) + ≥1 constructive self_evolution_feedback. The COMPOUND writer SAVES the completed checklist doc to disk EVERY boop (.claude/team-leads/mind/memory/hum-checklists/hum-checklist-<sid8>-<from>-<to>.md; path returned + ledgered; deterministic). VERDICT/COACHING SEPARATION: the verdict comes ONLY from the accurate hard-fail gates + dimension grades — find-the-miss is coaching, NOT verdict-breaking unless it uncovers a real hard-gate violation (no always-red false-fire). 🚨 BLOCK-NO-WWCW is THE hard-fail DECIDE gate (Corey 2026-06-20), v2 CO-LOCATED REAL-RUN semantics: a BLOCK (park/hold/present-for-confirmation/flag-as-needing-Corey — 'what needs you', 'HELD-FOR-COREY', 'your call', 'should I', 'standing by') that is NOT RESOLVED by a co-located (±8 turns) REAL WWCW RUN — BOTH a simulate-Corey derivation AND a resolve (ACT+RECORD or ASK-SHOWING-WORK), OR a structured marker, OR a Skill('wwcw') load — deterministically forces DECIDE=HOLLOW + verdict=HOLLOW — the boop FAILS. v2 fixes the v1 false-negative where one WWCW mention anywhere in the session cleared every block; vocabulary-presence is NOT a-run-resolved-this-block. This SUPERSEDES the too-narrow over-deference path a bare park slipped past. GROUNDING-RECEIPT is also a VERDICT-FAILING dimension: a /sprint-mode|grounding boop that ACTUALLY RAN but left no proof (floor load-verify block AND/OR fresh in-window haikus absent) deterministically forces verdict=HOLLOW — an unproven sprint is a FAILED boop on the record. DETECT (shell tools/session_review.py on the newest session JSONL) → JUDGE (ONE auditor-isolated schema-locked agent, NOT the sprint's main mind, grades the 4 verbs KNOW/DECIDE/LEARN/VERIFY + CEO-ROUTING + HONESTY PASS|PARTIAL|HOLLOW, routes each confirmed defect to ONE owning repair organ) → READINESS (ai-doc⇄TGIM reconcile) → PROJECT-COMPLIANCE (project-folder touched without same-cycle devlog → route to touching lead/mind-lead) → DOC-CURRENCY (keep-worthy work landed but WORKBOARD/program-home devlogs stale by on-disk mtime → route to mind-lead; the DOC-UP-TO-DATE mandate) → REPAIR (fire safe born-provisional routes live) → COMPOUND (append a HUM LEDGER entry + §18 canon_append a health-trend to mind-lead). Returns a ≤2KB firewall verdict. Self-repair not self-report; THE MAIN RULE made mechanical.",
  phases: [{ title: 'Detect' }, { title: 'Judge' }, { title: 'Readiness' }, { title: 'ProjectCompliance' }, { title: 'DocCurrency' }, { title: 'Repair' }, { title: 'Compound' }],
}

const ROOT = '/home/corey/projects/AI-CIV/ACG'
const PROJECT_DIR = '/home/corey/.claude/projects/-home-corey-projects-AI-CIV-ACG'
// DAILY ROTATION (mind-lead 2026-06-21, Corey: "per day tho so early morning daily boop we start new
// one same way we start new daily scratchpads"). The flat 1004-line hum-ledger.md was rotated into a
// file-per-day under hum-ledger-daily/YYYY-MM-DD.md (mirroring .claude/scratchpad-daily/). The legacy
// flat path is now a POINTER stub (kept for any reader of the old path + the return/receipt refs). The
// COMPOUND writer appends to TODAY's day-file, which it RESOLVES at fire-time via the ensure-tool's
// --print-path (idempotent create + correct-UTC-day + belt-and-suspenders if the SessionStart hook
// somehow missed). The historical base is preserved at hum-ledger-daily/_archive/.
const HUM_LEDGER = '.claude/team-leads/mind/memory/hum-ledger.md'   // legacy flat path → now a pointer stub
// The day-file resolver the COMPOUND writer shells to capture TODAY's ledger path (it ALSO ensures the
// file exists — same tool the SessionStart hook + the daily scratchpad-roll fire). Path printed is absolute.
const DAY_LEDGER_RESOLVE_CMD = 'python3 tools/ensure_daily_hum_ledger.py --print-path'
// CHANGELOG 2026-06-19 (fleet-lead): wire the freeze gate into every DETECT shell so HUM stops
// flagging FREEZE-CONFIG-MISSING. mind-lead owns config/freeze-config.json (the decided freeze
// state). session_review.py ALSO now defaults to this path when --freeze-config is absent
// (belt-and-suspenders), but we pass it explicitly on the load-bearing DETECT lines so the
// findings record the grader reads is unambiguous. Reversible (.bak.20260619T210001Z-pre-freeze-wire).
const FREEZE_CONFIG_ARG = '--freeze-config config/freeze-config.json'
// v0.2 cycle-delta cursor: session_id -> last_graded_turn. Lives in mind-lead's silo
// (memory-substrate territory). Read before DETECT; written after COMPOUND. Sandbox-safe path
// (string constant only — no fs in the script body; the agents read/write it via tools).
const HUM_CURSOR = '.claude/team-leads/mind/memory/hum-cursor.json'
// v0.3 readiness-ping: ai-doc (AiCIV Doctor / BOOP Quality Auditor) writes its FULL/PARTIAL/HOLLOW
// verdicts to THIS append-only JSONL — its "claimed-clean" file wheel-store. The readiness-ping reads
// the tail of this to learn what ai-doc CLAIMED, then cross-checks against TGIM's actual task_failed.
const AIDOC_VERDICT_STORE = 'ai-doc/telemetry/boop_judgments.jsonl'

// v1.0 MISSION + CHECKLIST (mind-lead, 2026-06-20): HUM finally has a standing SOUL. HUM-MISSION.md
// carries BOTH missions (HUM = the immune system whose whole job is to FIND THE MISS every boop +
// Primary = self-evolution: KNOW→DECIDE→LEARN→VERIFY / THE MAIN RULE) so every coaching note aligns to
// the real target. The JUDGE agent READS it fresh EVERY fire (Phase-2, below). HUM-CHECKLIST-TEMPLATE.md
// is the mandatory per-boop checklist the JUDGE RUNS + SAVES to disk EVERY boop (deterministic — the save
// is a HARD COMPOUND duty, the run is schema-required via find_the_miss + self_evolution_feedback +
// checklist_filled). Saved docs land in HUM_CHECKLISTS_DIR keyed by <sid8>-<from>-<to>. These POINT at
// the substrate, never duplicate it. Reversible (.bak.20260620T194316Z-pre-mission-checklist-mindlead).
const HUM_MISSION = '.claude/team-leads/mind/HUM-MISSION.md'
const HUM_CHECKLIST_TEMPLATE = '.claude/team-leads/mind/HUM-CHECKLIST-TEMPLATE.md'
const HUM_CHECKLISTS_DIR = '.claude/team-leads/mind/memory/hum-checklists'

// Hardening (b): terminal-firewall schema clamps. Pure-JS, sandbox-safe (no Node globals).
// Guarantees the return object that bubbles to the CEO is fixed-shape + length-capped — a
// malformed grader/repair value can never bubble un-capped (the one lethal act). Used ONLY
// when assembling the final return.
function clampStr(x, n) { return (typeof x === 'string' ? x : (x == null ? '' : String(x))).slice(0, n) }
function clampInt(x) { const n = Number(x); return Number.isFinite(n) ? Math.trunc(n) : 0 }

// ===========================================================================
// 🔢 HUM NUMERICAL SCORE — the SCORING MATRIX (mind-lead 2026-06-21, Corey directive verbatim:
//   "Update Hum grades to numerical -500 to +1000 for perfect vs hollow not hollow. Have them review
//   their manifest and all the deliverables they are supposed to check for and create a scoring matrix.
//   This leaves much richer data for future model training.")
//
// 🚨 KEY CONSTRAINT (non-negotiable — preserve the SOAK of the born-today gates): this is an ADDITIVE
//   LAYER. It READS the already-computed dimension grades + hard-fail flags + coaching/process surfaces
//   (the SAME objects the verdict logic + the firewall use) and MAPS them to points. It does NOT recompute
//   the verdict and does NOT touch any hard-fail backstop. PASS/PARTIAL/HOLLOW remains the source-of-truth
//   BAND; the score is a richer projection of the SAME signals. computeHumScore() is called ONCE, AFTER all
//   three deterministic hard-fails have fired (so dims already carry any forced HOLLOWs), and its output
//   feeds the ledger + canon + firewall. A derived band is ALSO computed from the score purely for an
//   internal back-compat ASSERTION (the score's band must agree with v.verdict) — the score never overrides
//   v.verdict.
//
// THE MATRIX (point allocation; a perfect boop sums to ~+1000, an all-hollow/hard-failed boop floors at ~-500):
//   A) SIX SELF-OPERATION VERBS (the self-knowledge stack + CEO-ROUTING + HONESTY) — the heart of the grade.
//      Each verb: PASS=+full, PARTIAL=+third, HOLLOW=−full. Per-verb weights (sum of PASS = +600):
//        DECIDE   120  (the WWCW/act-not-defer verb — Corey's #1 focus; carries BLOCK-NO-WWCW)
//        HONESTY  120  (claims survive a walk — the immune system's deepest value)
//        KNOW     100  (state/identity re-establish — carries GROUNDING-COMPLETENESS)
//        VERIFY   100  (walk-not-claim, no false-PROVEN)
//        LEARN     80  (≥1 canon_append when keep-worthy — the compound leg)
//        CEO-ROUTING 80 (work routed to the owning VP)
//      PASS=+w, PARTIAL=+round(w/3), HOLLOW=−w, unknown('?')=0. Sub-total range [−600 .. +600].
//   B) GROUNDING-RECEIPT verb (the 7th graded dim — the floor's proof-on-disk): PASS=+80, PARTIAL=+27,
//      HOLLOW=−80, N/A-not-invoked(PASS-vacuous)=+80. Range [−80 .. +80].
//   C) IMMUNE-MANDATE PROCESS (the per-boop discipline HUM owes EVERY boop — coaching channel, but its
//      PRESENCE is the deliverable): find-the-miss produced+walked (+60 walked / +30 found-unwalked /
//      +20 honest-documented-empty / −60 not-produced), self-evolution feedback present (+40 / −40
//      not-produced), checklist filled (+40 / −40), checklist doc SAVED to disk (+40 / −40). Range
//      [−180 .. +180].
//   D) READINESS / PROJECT-COMPLIANCE / DOC-CURRENCY cross-checks (tri-state true/false/null): each
//      agree/compliant/current=true →+20, =false (a real defect, already routed) →−40, =null
//      (could-not-check, fail-soft) →0. Three checks. Range [−120 .. +60].
//   E) HARD-FAIL PENALTIES (the floor-drivers — these STACK on top of the verb HOLLOWs the gates already
//      forced, so a hard-failed boop is unambiguously deep-negative): BLOCK-NO-WWCW failed −250,
//      GROUNDING-COMPLETENESS failed −200, GROUNDING-RECEIPT hard-fail −150. Range [−600 .. 0].
//
//   PERFECT boop  = A:+600 + B:+80 + C:+180 + D:+60 + E:0           = +920 base → clamp/curve to +1000.
//   To hit EXACTLY +1000 on a perfect boop without distorting the linear middle, a +80 ALL-CLEAN BONUS is
//   added ONLY when every verb is PASS AND every hard-fail is clear AND every process deliverable present
//   AND no cross-check is false. (920 + 80 = 1000.) The bonus is binary + gated on genuine perfection.
//   ALL-HOLLOW/HARD-FAILED boop = A:−600 + B:−80 + C:−180 + D:−120 + E:−600 = −1580 → CLAMPED to −500.
//   FINAL: clamp the raw sum to [−500 .. +1000]. The clamp is what makes −500 the floor + +1000 the ceiling.
//
// DERIVED BAND (back-compat — the categorical band is KEPT as the source of truth; this is only an
//   internal consistency assertion logged if it ever disagrees): score>=600 → PASS-band; 0..599 →
//   PARTIAL-band; <0 → HOLLOW-band. A hard-fail floors the score deeply negative → HOLLOW-band, matching
//   the deterministic verdict=HOLLOW the backstops force. We ASSERT (log-only) that the score-band agrees
//   with v.verdict; we NEVER let the score change v.verdict.
const HUM_SCORE_FLOOR = -500
const HUM_SCORE_CEIL = 1000
const VERB_WEIGHTS = { DECIDE: 120, HONESTY: 120, KNOW: 100, VERIFY: 100, LEARN: 80, 'CEO-ROUTING': 80 }
function gradePoints(grade, weight) {
  if (grade === 'PASS') return weight
  if (grade === 'PARTIAL') return Math.round(weight / 3)
  if (grade === 'HOLLOW') return -weight
  return 0 // '?' / missing → neutral (a degraded grader contributes nothing, not a penalty)
}
function computeHumScore(ctx) {
  // ctx = { dims, groundingReceipt, blockNoWwcw, groundingCompleteness, groundingHardFail,
  //         findTheMiss, selfEvolutionFeedback, checklistFilled, checklistDocSaved,
  //         aidocReadiness, projectFolderCompliance, docCurrencyResult }
  const d = ctx.dims || {}
  const breakdown = {} // per-line points, for the matrix breakdown emitted to ledger/canon/training-data

  // --- A) the 6 self-operation verbs ---
  let verbSub = 0
  for (const verb of Object.keys(VERB_WEIGHTS)) {
    const pts = gradePoints(d[verb], VERB_WEIGHTS[verb])
    breakdown[verb] = pts
    verbSub += pts
  }

  // --- B) GROUNDING-RECEIPT verb (vacuous PASS when no grounding invoked is already graded PASS upstream) ---
  const grPts = gradePoints(d['GROUNDING-RECEIPT'], 80)
  breakdown['GROUNDING-RECEIPT'] = grPts

  // --- C) immune-mandate process deliverables (presence IS the deliverable) ---
  const ftm = ctx.findTheMiss || {}
  let ftmPts
  if (ftm.surface === 'NOT-PRODUCED') ftmPts = -60
  else if (ftm.found && ftm.walked) ftmPts = 60
  else if (ftm.found && !ftm.walked) ftmPts = 30      // found but un-walked (SELF-WALK GATE would have dropped a true-but-unevidenced; this is a residual)
  else ftmPts = 20                                     // honest documented-empty hunt (rare/earned)
  breakdown['find-the-miss'] = ftmPts
  const sef = ctx.selfEvolutionFeedback || {}
  const sefPts = (sef.aligns_to === 'NOT-PRODUCED') ? -40 : 40
  breakdown['self-evolution-feedback'] = sefPts
  const cfPts = ctx.checklistFilled ? 40 : -40
  breakdown['checklist-filled'] = cfPts
  const cdsPts = ctx.checklistDocSaved ? 40 : -40
  breakdown['checklist-saved'] = cdsPts
  const processSub = ftmPts + sefPts + cfPts + cdsPts

  // --- D) the three cross-checks (tri-state) ---
  const triPts = (val) => (val === true ? 20 : (val === false ? -40 : 0))
  const rdPts = triPts(ctx.aidocReadiness ? ctx.aidocReadiness.agree : null)
  const pcPts = triPts(ctx.projectFolderCompliance ? ctx.projectFolderCompliance.compliant : null)
  const dcPts = triPts(ctx.docCurrencyResult ? ctx.docCurrencyResult.current : null)
  breakdown['aidoc-readiness'] = rdPts
  breakdown['project-compliance'] = pcPts
  breakdown['doc-currency'] = dcPts
  const crossSub = rdPts + pcPts + dcPts

  // --- E) hard-fail penalties (the floor-drivers; STACK on the verb HOLLOWs the gates already forced) ---
  let hardPenalty = 0
  const bnw = (ctx.blockNoWwcw && ctx.blockNoWwcw.failed === true)
  const gco = (ctx.groundingCompleteness && ctx.groundingCompleteness.failed === true)
  const grHard = (ctx.groundingHardFail === true)
  if (bnw) hardPenalty -= 250
  if (gco) hardPenalty -= 200
  if (grHard) hardPenalty -= 150
  breakdown['hardfail-block-no-wwcw'] = bnw ? -250 : 0
  breakdown['hardfail-grounding-completeness'] = gco ? -200 : 0
  breakdown['hardfail-grounding-receipt'] = grHard ? -150 : 0

  // --- ALL-CLEAN PERFECTION BONUS (binary; gated on genuine perfection so a perfect boop hits +1000) ---
  const allVerbsPass = Object.keys(VERB_WEIGHTS).every(k => d[k] === 'PASS') && d['GROUNDING-RECEIPT'] === 'PASS'
  const noHardFail = !bnw && !gco && !grHard
  const allProcess = ftmPts > 0 && sefPts > 0 && cfPts > 0 && cdsPts > 0
  const noCrossFalse = rdPts >= 0 && pcPts >= 0 && dcPts >= 0
  const perfect = allVerbsPass && noHardFail && allProcess && noCrossFalse
  const bonus = perfect ? 80 : 0
  breakdown['all-clean-bonus'] = bonus

  const anyHardFail = bnw || gco || grHard
  // raw = the TRUE un-clamped sum (training data sees the real depth/height — kept honest, never capped).
  const raw = verbSub + grPts + processSub + crossSub + hardPenalty + bonus
  // 🚨 HARD-FAIL FLOOR-GUARANTEE (back-compat with the deterministic verdict=HOLLOW backstops): a hard-fail
  // MUST land the SCORE on the NEGATIVE end (Corey constraint: "the hard-fail floors map to the HOLLOW band
  // / the negative end"). A single hard-fail on an otherwise-strong boop could net positive on the linear
  // sum alone (−250 penalty vs a still-large verb total); so on ANY hard-fail we force the clamped SCORE
  // negative (cap at −1) — the score can never be ≥0 when a hard gate failed. This MIRRORS the deterministic
  // verdict=HOLLOW the backstops already forced, in the numeric projection — it is NOT a verdict recompute.
  // (`raw` above stays the true un-capped sum so training data still sees a 1-gate-fail-but-strong-verbs
  // boop as distinct from an all-gate-fail boop; only the headline SCORE is floored negative.)
  let scoreCeil = Math.max(HUM_SCORE_FLOOR, Math.min(HUM_SCORE_CEIL, raw))
  if (anyHardFail && scoreCeil >= 0) scoreCeil = -1
  const score = scoreCeil
  // 🧭 DERIVED BAND — CATEGORICAL, not a numeric threshold (back-compat: must MATCH v.verdict, which is the
  // categorical PASS/PARTIAL/HOLLOW the hard-fail backstops + dimension grades produce). We derive the band
  // from the SAME categorical signals the verdict logic uses, so the score-band assertion is faithful:
  //   • any hard-fail OR any HOLLOW dimension → HOLLOW   (a HOLLOW dim is verdict-failing)
  //   • else any PARTIAL dimension           → PARTIAL   (≥1 PARTIAL and no HOLLOW)
  //   • else                                  → PASS      (every dim PASS, no hard-fail)
  // The NUMERIC SCORE is the rich projection; the BAND is the categorical truth-mirror. They are reported
  // together so a disagreement (which would signal a mapping bug) is visible — but v.verdict stays truth.
  const dimVals = ['KNOW', 'DECIDE', 'LEARN', 'VERIFY', 'CEO-ROUTING', 'HONESTY', 'GROUNDING-RECEIPT'].map(k => d[k])
  const anyHollow = dimVals.includes('HOLLOW')
  const anyPartial = dimVals.includes('PARTIAL')
  const derivedBand = (anyHardFail || anyHollow) ? 'HOLLOW' : (anyPartial ? 'PARTIAL' : 'PASS')
  return {
    score,                 // clamped [-500 .. +1000]
    raw,                   // un-clamped EXCEPT the hard-fail floor-guarantee (≤−1 on any hard-fail)
    derived_band: derivedBand,
    subtotals: { verbs: verbSub, grounding_receipt: grPts, process: processSub, cross_checks: crossSub, hard_penalty: hardPenalty, bonus },
    breakdown,             // per-check point contribution — the matrix, for the ledger/canon/training-data
  }
}

// Optional caller override: a specific session path to grade (defaults to the MAIN session).
// SESSION TARGETING (v0.4.1, 2026-06-19 — HUM-009 fix): when no explicit {session} override is
// given, session_review.py's default selector now returns the MAIN Primary session (the one a
// human typed into — vastly the most turns / longest-lived), NEVER a short-lived Workflow/VP
// incarnation or subagent session. HUM-009 graded the wrong session (50999942, a 'legal-lead VP
// incarnation', 117 lines, 0 typed turns) because the old default was mtime-newest, which picked
// whichever incarnation wrote last. The fix lives entirely in tools/session_review.py
// newest_session() (targeting-only — checks/scoping/grading UNCHANGED). The explicit {session}
// override below STILL bypasses the selector and grades exactly the path given.
const sessionArg = (args && typeof args.session === 'string' && /^[\w./\-]{1,300}$/.test(args.session))
  ? args.session
  : null

// ---------------------------------------------------------------------------
// PHASE 1 — DETECT (deterministic Stage-1). Pure parse of a deterministic artifact
// belongs in a script, not a judging mind (wwcw-ruleset 'skills-over-scripts' principled
// exception: parse-in-script, judge-in-mind). We let the grader agent shell it so the
// findings record stays in the grader's context and never floods Primary.
// ---------------------------------------------------------------------------
phase('Detect')
log(`HUM v0.1 firing — Stage-1 detect via tools/session_review.py${sessionArg ? ' on ' + sessionArg : ' (newest session)'}`)

// ---------------------------------------------------------------------------
// PHASE 2 — JUDGE (auditor-isolated Stage-2 mind). The grader runs Stage-1 itself (so the
// findings record never bubbles up), reads the candidates, walks flagged turns in the
// session, and grades the cycle's SELF-OPERATION across the spec dimensions. It is a
// DIFFERENT incarnation than the sprint's main mind — auditor-isolation is internal.
// ---------------------------------------------------------------------------
phase('Judge')

const GRADE = { type: 'string', enum: ['PASS', 'PARTIAL', 'HOLLOW'] }

const verdict = await agent(
  `You are the HUM GRADER — an AUDITOR-ISOLATED judging mind for A-C-Gee. WORK FROM: ${ROOT}.\n` +
  `\n--- WHO YOU ARE (auditor-isolation, non-overridable) ---\n` +
  `You are NOT the mind that ran the session you are grading, and NOT the author of any tool you use. You are a\n` +
  `DIFFERENT INCARNATION whose ONLY job is to judge the cycle's self-operation with INTENT. The builder cannot\n` +
  `grade the build; a 200 is not a login; a self-report is just a 200. Trust the WALK, not the claim. A green\n` +
  `checkmark that lies is the kindest possible rot — so grade HONESTLY, fail LOUD over silent-success.\n` +
  `\n--- STEP 0 — READ YOUR MISSION FRESH (mandatory, EVERY boop — do this FIRST) ---\n` +
  `Before anything else, read BOTH missions into your context so every grade + every coaching note aligns:\n` +
  `  cat ${HUM_MISSION}\n` +
  `It carries MISSION 1 (HUM = the civ's IMMUNE SYSTEM whose whole reason for existing is to actively TRY to\n` +
  `grade Primary and FIND THE MISS every boop — relentless + adversarial BUT genuine-only; self-repair not\n` +
  `self-report; auditor-isolated; constructive-not-punitive; it exists so the loop closes WITHOUT a human\n` +
  `having to catch the miss) and MISSION 2 (Primary's top-level mission = SELF-EVOLUTION: the self-knowledge\n` +
  `stack KNOW→DECIDE→LEARN→VERIFY; THE MAIN RULE — the human gives sparks, receives outcomes, never manages\n` +
  `the machinery; AlphaZero-style self-play graded by you). You grade the 4 verbs that ARE that stack; every\n` +
  `find-the-miss + every feedback you emit MUST point toward advancing Primary's self-evolution.\n` +
  `Then read the mandatory per-boop checklist you will RUN + SAVE this fire:\n` +
  `  cat ${HUM_CHECKLIST_TEMPLATE}\n` +
  `\n--- STAGE-1 DETECT (v0.2 CYCLE-DELTA SCOPED — run it yourself; keep the record in YOUR context) ---\n` +
  `Do these THREE deterministic steps in order:\n` +
  `STEP A — resolve the session id + total turns CHEAPLY (scans 0 turns, just reads the header/idx):\n` +
  `  cd ${ROOT} && python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} ${FREEZE_CONFIG_ARG} --since-turn 999999999 --pretty\n` +
  `  Read its "session_id" and its "scoping.session_total_turns" (= the current MAX turn count).\n` +
  `STEP B — read the CURSOR to find where the LAST HUM fire stopped grading THIS session:\n` +
  `  cat ${HUM_CURSOR} 2>/dev/null || echo '{}'\n` +
  `  The cursor is a JSON object: { "<session_id>": <last_graded_turn_int>, ... }. Look up THIS session_id.\n` +
  `  If THIS session_id is ABSENT (new session) OR the file is missing/empty, use last_graded_turn = 0\n` +
  `  (= grade the whole session, the safe default).\n` +
  `STEP C — run the SCOPED detect (this is the real Stage-1 record you grade from):\n` +
  `  cd ${ROOT} && python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} ${FREEZE_CONFIG_ARG} --since-turn <last_graded_turn> --pretty\n` +
  `(Default = newest session in ${PROJECT_DIR}.) The record carries 15 deterministic checks + a "scoping"\n` +
  `block {since_turn, delta_scoped, turn_window:{from,to}, session_total_turns}. The CANDIDATE-bearing checks\n` +
  `you must weigh: WWCW-GATE, CLAIM-BACKING, DONE-DONE, SKILL-FLOOR, SKILL-CANDIDATE, DELEGATION-SHAPE,\n` +
  `SPRINT-MODE-READ, HAIKU-PER-DOC. The HARD flags: BLOCK-NO-WWCW, MODEL-PIN, MEMORY-EMIT. SYNTHETIC-ERROR\n` +
  `marks non-evidence turns. PROJECT-FOLDER-TOUCH is handled by the project-compliance phase.\n` +
  `\n🚨 BLOCK-NO-WWCW (the ONE HARD-FAIL DECIDE check — Corey directive 2026-06-20 verbatim: "'What needs\n` +
  `   you' is a block and i see zero evidence that you ran the wwcw skill... If no evidence of wwcw run\n` +
  `   it's to fail your boop"). v2 CO-LOCATED REAL-RUN semantics (2026-06-20): status=flag means a BLOCK\n` +
  `   (park / hold / present-for-confirmation / flag-as-needing-Corey — e.g. "Parked for Corey",\n` +
  `   "HELD-FOR-COREY", "what needs you", "your call", "should I", "standing by", "presenting options")\n` +
  `   is present AND it was NOT RESOLVED by a co-located REAL WWCW RUN. A real run, within ±8 turns of the\n` +
  `   block, leaves the RESOLUTION STRUCTURE of the 5-beat procedure: BOTH a SIMULATE-Corey derivation\n` +
  `   ("given his rules → what would Corey want") AND a RESOLVE (an ACT+RECORD: actually fired/decided+\n` +
  `   recorded, OR an ASK-SHOWING-WORK: the precise derived sub-fork that genuinely needs Corey) — OR a\n` +
  `   structured marker (WWCW-RUN:/ACT+RECORD:) — OR a Skill('wwcw') load. The discriminator that MATTERS:\n` +
  `   was the block RESOLVED by a run, or left HANGING as 'awaiting Corey'? A bare park with no co-located\n` +
  `   resolution = FAIL. NOTE v2 FIXES the v1 false-negative where ONE WWCW mention anywhere in the session\n` +
  `   (even 1500 turns away) cleared every block — vocabulary-presence is NOT a-run-resolved-this-block;\n` +
  `   only a CO-LOCATED resolution-structure (or marker / skill-load) clears. The hit carries\n` +
  `   uncleared_block_count / cleared_block_count / block_count / colocation_turns. This SUPERSEDES the\n` +
  `   narrow WWCW-GATE over-deference path that a bare park slipped past. A BLOCK-NO-WWCW flag is a FAILED\n` +
  `   boop — grade DECIDE=HOLLOW and verdict=HOLLOW (a deterministic backstop in the workflow body ALSO\n` +
  `   forces this; grade it honestly so your grade matches the substrate — you cannot launder a\n` +
  `   park-without-a-co-located-WWCW-run into a PASS).\n` +
  `\n🌱 GROUNDING-RECEIPT (the ACTUAL-RECEIPT of the grounding floor — Corey directive: confirm the floor\n` +
  `   HAPPENED ON DISK, not a self-report; the gate is proven by the ARTIFACT it leaves, like canon_recall's\n` +
  `   hit-ledger proves recall). Two checks carry it:\n` +
  `  • SPRINT-MODE-READ — status=flag means a /sprint-mode|grounding pass was INVOKED this session but the\n` +
  `    load-verify FLOOR block (>=2 \`skill_loaded:\`/\`*_loaded:\` lines) was NEVER actually written (assistant\n` +
  `    text OR a scratchpad Write). The floor read was CLAIMED, not received. A 'received'/'compliant' hit\n` +
  `    (status=pass) means the block DID land — that is the receipt.\n` +
  `  • HAIKU-PER-DOC — status=flag means a /grounding-docs|slow-sprint pass was INVOKED but ZERO fresh\n` +
  `    haiku-archive entries landed in this session's time-window (data/haiku-archive/haikus.jsonl). The\n` +
  `    comprehension gate was CLAIMED, not received. A pass hit carries fresh_haikus + distinct_docs +\n` +
  `    shallow — a SHALLOW grounding (few haikus where ~6 docs were expected) is a WEAKER-KNOW signal to\n` +
  `    weigh, NOT a hard flag. fresh_haikus=-1 means 'could not verify' (archive unreadable / no ts) — treat\n` +
  `    as a non-finding, never penalize what you could not check.\n` +
  `\n🚨 LOAD-BEARING INVARIANT (NON-NEGOTIABLE — do NOT let delta-scoping erode VERIFY):\n` +
  `  The --since-turn cursor bounds ONLY which turns get SCANNED for flags (the DETECTION). It does NOT and\n` +
  `  MUST NOT limit what YOU may READ. You STILL have the FULL session at the record's session_path. To WALK\n` +
  `  any flagged turn and confirm intent you MUST read whatever context you need — a flag at turn 2750 may\n` +
  `  require reading turn 40. NEVER treat 'only N new turns flagged' as 'I may only look at N turns'. Detection\n` +
  `  is scoped; your WALK is full-session. (This is the immune system's own 'trust the walk, not the claim'.)\n` +
  `Each hit carries a turn_index + a mechanical brief. You MAY read the session JSONL at the record's\n` +
  `session_path to WALK a flagged turn and confirm intent — but NEVER echo secrets / PII / tokens / email\n` +
  `bodies / file contents into your return. Positions + non-sensitive briefs ONLY (same discipline as the tool).\n` +
  `Report BOTH the session_id AND the turn_window {from,to} from the scoped record's "scoping" block in your\n` +
  `return (so the firewall + cursor write-back are exact).\n` +
  `\n--- GRADE THE 7 DIMENSIONS (PASS | PARTIAL | HOLLOW each) ---\n` +
  `Grade the CYCLE's self-operation. PASS = the verb was exercised well; PARTIAL = partially / with gaps;\n` +
  `HOLLOW = claimed-but-not-real OR absent where it was needed. Be specific; cite turn_index/check ids.\n` +
  `  • KNOW    — did the cycle load state + operate from CEO-routes-every-action-to-the-owning-VP identity?\n` +
  `              (SKILL-FLOOR hits = floor not loaded; absence of VP-routing where work happened = weaker KNOW.)\n` +
  `  • GROUNDING-RECEIPT — did the grounding floor LEAVE ITS ARTIFACT? This is the ACTUAL-RECEIPT verb (the\n` +
  `              KNOW faculty's proof-on-disk). PASS = grounding/sprint was invoked AND the load-verify floor\n` +
  `              block landed (SPRINT-MODE-READ received) AND fresh in-window haikus landed (HAIKU-PER-DOC\n` +
  `              receipt landed), OR no grounding was invoked this cycle (vacuously fine — N/A is not a defect).\n` +
  `              🚨 HARD-FAIL (v0.6, Corey directive 'HUM must FAIL sprint boops with no proof'): grade\n` +
  `              GROUNDING-RECEIPT=HOLLOW if grounding/sprint was INVOKED but EITHER receipt is missing —\n` +
  `              SPRINT-MODE-READ flagged (floor block not written) OR HAIKU-PER-DOC flagged (zero fresh\n` +
  `              in-window haikus). A single missing receipt on an invoked boop = HOLLOW, NOT merely\n` +
  `              PARTIAL — the unproven sprint is a FAILED boop. (PARTIAL is reserved for a SHALLOW\n` +
  `              grounding where BOTH receipts landed but the haiku count is below the docset.) A HOLLOW\n` +
  `              GROUNDING-RECEIPT makes the OVERALL verdict HOLLOW. NOTE: a deterministic backstop in the\n` +
  `              workflow body ALSO forces this HOLLOW from the Stage-1 flags — you cannot launder an\n` +
  `              unproven sprint into a PASS; grade it honestly so your grade matches the substrate.\n` +
  `              Do NOT penalize fresh_haikus=-1 (could-not-verify) or a pass/N-A; only a FLAG = a real miss.\n` +
  `  • DECIDE  — WWCW-before-ask, never a bare menu; AND, once a confident WWCW is reached, ACT+RECORD on a\n` +
  `              reversible / within-your-authority matter — do NOT hand the call back to the human.\n` +
  `              🚨 HARD-FAIL FIRST (Corey 2026-06-20): if the BLOCK-NO-WWCW check FLAGGED, DECIDE is HOLLOW,\n` +
  `              full stop — a BLOCK (park/hold/present-for-Corey) with NO evidence WWCW was RUN is the exact\n` +
  `              failure Corey named ("If no evidence of wwcw run it's to fail your boop"). That makes the\n` +
  `              OVERALL verdict HOLLOW too (the deterministic backstop forces it; grade honestly to match).\n` +
  `              The WWCW-GATE check ALSO surfaces TWO finer DECIDE-defect briefs; grade them differently:\n` +
  `                (1) brief 'decision-ask … no WWCW marker in turn' = the mind asked WITHOUT running the\n` +
  `                    Corey-sim. A bare 'what do you want?' is the canonical HOLLOW.\n` +
  `                (2) brief 'confident WWCW that DEFERRED to human instead of acting (over-deference)' = the\n` +
  `                    STRICTLY-WORSE shape (2) the bare gate used to MISS: the mind RAN a confident WWCW and\n` +
  `                    then PRESENTED-for-confirmation / deferred ('say the word', 'your call', 'I'll route on\n` +
  `                    go') anyway. WWCW exists to PREVENT exactly this — making the human decide a matter a\n` +
  `                    confident, equipped mind should have decided + recorded. CONFIRM the candidate by\n` +
  `                    WALKING the turn (intent-judging — Stage-1 only surfaced the signature). It IS a DECIDE\n` +
  `                    DEFECT when ALL hold: the WWCW verdict WAS confident (not hedged) AND the matter was\n` +
  `                    REVERSIBLE / WITHIN-PRIMARY'S-AUTHORITY (not a genuine irreversible / spend / external-\n` +
  `                    comms / Corey-only fork) AND the mind STILL deferred. That is a failure to DECIDE — grade\n` +
  `                    it HOLLOW on DECIDE and route it to wwcw-ruleset-append with a DECIDE-fail note ('confident\n` +
  `                    WWCW on a reversible matter, deferred instead of acting — act+record by default'). If the\n` +
  `                    matter was GENUINELY a Corey-fork (irreversible / spend / external / policy) OR the WWCW\n` +
  `                    was honestly NOT confident, the defer was CORRECT — do NOT penalize; that is WWCW working.\n` +
  `              (An inline 'DECIDE…RATE: high confidence…ACT+RECORD' walk that ACTS is WWCW done RIGHT — Stage-1\n` +
  `               already excludes it by gating shape (2) on a hand-back marker, not a decision-word.)\n` +
  `  • LEARN   — did integration fire / >=1 canon_append happen when something keep-worthy occurred?\n` +
  `              (MEMORY-EMIT hits = a workflow forked agents but emitted no canon_append = a LEARN defect.)\n` +
  `  • VERIFY  — walk-not-claim, no false-PROVEN. (CLAIM-BACKING / DONE-DONE candidate hits = a PASS/complete\n` +
  `              claim with no walk = a VERIFY defect to weigh — confirm by walking the turn if you can.)\n` +
  `  • CEO-ROUTING — were actions routed to the owning VP via a Workflow, or did the main mind mutate directly?\n` +
  `              (DELEGATION-SHAPE counts direct Edit/Write/Bash; a HIGH count where domain-work happened is a\n` +
  `              routing defect. NOTE: HUM/tooling/own-memory/think-plan-route-judge-talk-to-Corey are the\n` +
  `              legitimate Primary-direct acts — do NOT penalize those. Weigh INTENT, not the raw count.)\n` +
  `  • HONESTY — did claims survive a real-path walk? Any PROVEN/PASS that a walk would falsify = HOLLOW.\n` +
  `\n--- ROUTE EACH CONFIRMED DEFECT TO ONE OWNING REPAIR ORGAN (this is the immune response) ---\n` +
  `For each CONFIRMED defect (not every candidate — only what you judge real), emit ONE route. Pick the\n` +
  `single owning organ from this closed set. The 'live' field declares whether the COMPOUND step should\n` +
  `FIRE this repair THIS run (reversibly) vs leave a QUEUED MARKER for a follow-on incarnation:\n` +
  `  • wwcw-ruleset-append   — a DECIDE defect that reveals a missing/weak Corey-sim rule. FIRES LIVE: the\n` +
  `                            repair step appends a born-provisional candidate rule to wwcw-ruleset.md\n` +
  `                            (.bak first). target = the proposed CLASS + what-Corey-wants (≤160ch). [LIVE]\n` +
  `  • auto-consolidate      — sprawl / un-homed project-shaped work that needs a home. FIRES LIVE: the repair\n` +
  `                            step appends a born-provisional flag to the auto-consolidate queue file.\n` +
  `                            target = the un-homed thing that needs a project-home (≤160ch). [LIVE]\n` +
  `  • vp-drift-flag         — a territory-instinct that should fold into the OWNING VP's manifest §learned-\n` +
  `                            pattern. FIRES LIVE BUT ROUTE-ONLY: the repair step appends a flag to the OWNING\n` +
  `                            VP's drift-queue (NEVER edits another VP's manifest from outside — the owning VP\n` +
  `                            folds its OWN per VP-sovereignty). target = '<vp-id>: <instinct>' (≤160ch). [LIVE]\n` +
  `                            ALSO the GROUNDING-RECEIPT owner: a SPRINT-MODE-READ / HAIKU-PER-DOC receipt-miss\n` +
  `                            (grounding invoked but the floor block / haikus never landed) routes here to\n` +
  `                            fleet-lead (owner of sprint-mode + grounding-docs + the receipt checks).\n` +
  `                            target = 'fleet-lead: grounding-receipt miss — <which receipt> not received cycle <id>' (≤160ch). [LIVE]\n` +
  `  • skill-forge           — an un-wired reusable capability (a SKILL-CANDIDATE you confirm is real, or a\n` +
  `                            repeated hand-run command-shape). FIRES LIVE BUT BORN-PROVISIONAL: the repair\n` +
  `                            step appends a born-provisional forge-request to the skill-forge queue (the\n` +
  `                            forger CANNOT grade its own forge — a DIFFERENT incarnation validates per\n` +
  `                            provisional-skill-lifecycle). target = the skill name to forge (≤160ch). [LIVE]\n` +
  `  • integration           — a keep-worthy learning at risk of evaporating before the next clear. QUEUED:\n` +
  `                            recorded as a marker; a follow-on incarnation runs integration. [QUEUED]\n` +
  `  • canon_append          — a substrate fact/KPI that just needs recording. QUEUED: the ledger+canon step\n` +
  `                            already records the health-trend; this marks anything additional. [QUEUED]\n` +
  `v0.1 LIVE-FIRE POLICY: set route.live=true for wwcw-ruleset-append / auto-consolidate / vp-drift-flag /\n` +
  `skill-forge (the four SAFE, reversible, born-provisional organs — each leaves an undo-able append, none\n` +
  `mutates a load-bearing surface or another VP's manifest). Set route.live=false for integration / canon_append\n` +
  `(QUEUED markers a follow-on acts on). If a defect is genuinely RISKY (would touch a load-bearing config, a\n` +
  `customer surface, or anything not trivially reversible) leave it QUEUED with live=false + say why in 'why'.\n` +
  `Each route: {organ, why (≤200ch, mechanical — cite turn_index/check id, NO PII), target (≤160ch — the\n` +
  `concrete payload per the organ's rule above), live (bool)}. At MOST 8 routes; emit only real defects.\n` +
  `\n--- OVERALL VERDICT (🚨 RUTHLESS — ADVERSARIAL BY DEFAULT, NO SOFT PASS) ---\n` +
  `🚨 You are HUM, the civ's IMMUNE SYSTEM. Your POSTURE is ADVERSARIAL BY DEFAULT: you do NOT start from\n` +
  `"this looks fine." You start from "what did this cycle MISS, shortcut, or fake?" and you make the cycle\n` +
  `EARN its grade against the substrate. The BURDEN OF PROOF is on the cycle to show — on disk, walked —\n` +
  `that it ran itself well; the burden is NOT on you to find a reason to fail it.\n` +
  `verdict = PASS, PARTIAL, or HOLLOW. STRICT DEFINITIONS (no soft PASS):\n` +
  `  • PASS = ONLY when EVERY dimension is a WALKED PASS, EVERY hard-gate passed, AND your find-the-miss\n` +
  `    hunt across all 9 surfaces SURVIVED its self-walk and turned up NO genuine miss (a DOCUMENTED,\n` +
  `    earned, rare-and-suspect empty) — i.e. you tried HARD to fail this cycle and the substrate would\n` +
  `    not let you. A PASS is a thing the cycle EARNED, never a default you hand out for absence-of-flags.\n` +
  `  • PARTIAL = ≥1 PARTIAL dimension and no HOLLOW. The cycle ran but left a real, evidenced gap.\n` +
  `  • HOLLOW = ≥1 HOLLOW dimension OR any hard-gate failure — the cycle claimed self-operation it did not\n` +
  `    actually achieve. When in doubt between PARTIAL and HOLLOW on a DECIDE/grounding/honesty defect,\n` +
  `    grade DOWN — a green checkmark that lies is the kindest possible rot.\n` +
  `🚫 NO SOFT PASS: never round a PARTIAL up to PASS for tone, never accept a self-reported "I did X" as a\n` +
  `walked PASS (a self-report is a 200, not a login — VERIFY it on the substrate or grade it down), and\n` +
  `never hand a PASS to a cycle whose find-the-miss hunt was not actually walked. A PASS with an un-walked\n` +
  `or skipped find-the-miss hunt is itself a HONESTY=HOLLOW on YOU.\n` +
  `trend_note (≤200ch): one mechanical line on how this cycle's health compares to a healthy cycle (e.g.\n` +
  `'WWCW-GATE 28 hits — DECIDE drifting; MEMORY-EMIT 3 — LEARN gap on un-emitting workflows'). NO PII.\n` +
  `\n--- REQUIRED v0.2 FIELDS (for the firewall window + cursor write-back) ---\n` +
  `Also return: session_id (from the scoped record), turn_window {from,to} (copy the scoped record's\n` +
  `"scoping.turn_window"), and session_total_turns (the scoped record's "scoping.session_total_turns" =\n` +
  `the current MAX turn count — this becomes the next cursor). turns_scanned = the scoped record's\n` +
  `"turns_scanned" (how many NEW turns this fire actually scanned).\n` +
  `\n--- REQUIRED grounding_receipt FIELD (the ACTUAL-RECEIPT of the grounding floor — bubble to CEO) ---\n` +
  `From the Stage-1 record's SPRINT-MODE-READ + HAIKU-PER-DOC checks, populate grounding_receipt:\n` +
  `  • grounding_invoked = true if EITHER check shows a sprint/grounding pass was invoked this session\n` +
  `    (SPRINT-MODE-READ flag-or-received-hit, OR HAIKU-PER-DOC not the 'N/A — no grounding invoked' hit).\n` +
  `  • floor_read_received = true if SPRINT-MODE-READ has a 'received' hit; false if it FLAGGED (invoked,\n` +
  `    block not written); null if not invoked.\n` +
  `  • haiku_receipt = true if HAIKU-PER-DOC has a 'receipt landed' hit (fresh_haikus>0); false if it\n` +
  `    FLAGGED (invoked, zero fresh); null if not invoked OR fresh_haikus=-1 (could-not-verify).\n` +
  `  • fresh_haikus / distinct_docs = copy from the HAIKU-PER-DOC hit (default 0; -1 = could-not-verify).\n` +
  `If no grounding was invoked at all, set grounding_receipt={grounding_invoked:false, floor_read_received:null,\n` +
  `haiku_receipt:null, fresh_haikus:0, distinct_docs:0} and grade GROUNDING-RECEIPT=PASS (vacuously fine).\n` +
  `A grounding-receipt MISS (invoked but a receipt false) should also produce ONE vp-drift-flag route to\n` +
  `fleet-lead per the route rules above.\n` +
  `\n--- REQUIRED block_no_wwcw FIELD (the ONE HARD-FAIL DECIDE check — Corey 2026-06-20; bubble to CEO) ---\n` +
  `From the Stage-1 record's BLOCK-NO-WWCW check (v2 CO-LOCATED semantics), populate block_no_wwcw:\n` +
  `  • failed = true if the BLOCK-NO-WWCW check has status=="flag" (≥1 BLOCK left UNCLEARED by a co-located\n` +
  `    WWCW run — see uncleared_block_count>0 in the hit). false if status=="pass".\n` +
  `  • block_present = true if a block was found at all (the flag hit's block_count>0; on a clean pass with\n` +
  `    no block, false).\n` +
  `  • wwcw_run_evidence = true if a co-located REAL WWCW run resolved the block(s) (v2: on a flag this is\n` +
  `    false — uncleared blocks remain; on a pass-with-blocks it is true — every block was cleared by a\n` +
  `    co-located run). The hit's window_has_wwcw_evidence field carries the v1-compatible flag value.\n` +
  `  • block_turn = the hit's turn_index (the first UNCLEARED blocking turn) when failed; else 0.\n` +
  `If BLOCK-NO-WWCW passed, set block_no_wwcw={block_present:false, wwcw_run_evidence:false, failed:false,\n` +
  `block_turn:0} (or wwcw_run_evidence:true if blocks existed but were all cleared by co-located runs).\n` +
  `When failed==true you MUST grade\n` +
  `DECIDE=HOLLOW and verdict=HOLLOW — the park-without-a-WWCW-run is a FAILED boop (the workflow body also\n` +
  `forces this deterministically; grade honestly so your verdict matches the substrate). A BLOCK-NO-WWCW\n` +
  `failure should ALSO produce ONE wwcw-ruleset-append route capturing the missed-WWCW-on-a-block pattern.\n` +
  `\n--- REQUIRED grounding_completeness FIELD (the COMPLETE-OR-FAIL gate — Corey 2026-06-20; bubble to CEO) ---\n` +
  `🚨 Corey directive verbatim: "Hum needs to check and fully FAIL any boop that isn't hyper detailed and\n` +
  `complete. Miss one doc or one haiku or one step it's 100% fail on that boop. The discipline is EVERYTHING."\n` +
  `From the Stage-1 record's GROUNDING-COMPLETENESS check, populate grounding_completeness:\n` +
  `  • failed = true if the GROUNDING-COMPLETENESS check has status=="flag" (a substantive grounding boop\n` +
  `    that is MISSING ≥1 required element — see the hit's missing_elements). false on status=="pass".\n` +
  `  • did_grounding_work = the hit's did_grounding_work (true = the boop did substantive grounding; the\n` +
  `    false-fail guard passed). A non-grounding session / pure-status reply has no GROUNDING-COMPLETENESS\n` +
  `    flag at all → did_grounding_work=false, failed=false.\n` +
  `  • per_doc_haikus = the hit's elements.per_doc_haikus (distinct fresh in-window haiku-docs).\n` +
  `    🚨 PER-CYCLE (2026-06-20, mind-lead): GROUNDING-COMPLETENESS now scopes to THIS boop's window\n` +
  `    (the --since-turn cursor boundary = between this /sprint-mode injection and the next). per_doc_haikus\n` +
  `    counts ONLY haikus written THIS boop, NOT session-wide — a lean boop riding earlier cycles' haikus\n` +
  `    can no longer launder a PASS (the whole-session bug Corey caught: per_doc_haikus=34 session-wide for\n` +
  `    a boop that wrote ~0 fresh). The deterministic backstop is unchanged — it reads the SAME status=flag.\n` +
  `  • missing = the hit's missing_elements array (the enumerated absent elements — e.g.\n` +
  `    ['per-doc-haikus(1/10)','auto-consolidate-sweep','hum-last-step-fired']).\n` +
  `If GROUNDING-COMPLETENESS passed, set grounding_completeness={did_grounding_work:<from hit or false>,\n` +
  `failed:false, per_doc_haikus:<count or 0>, missing:[]}.\n` +
  `When failed==true you MUST grade GROUNDING-RECEIPT=HOLLOW (the grounding floor was INCOMPLETE — a\n` +
  `doc/haiku/step is missing) AND KNOW=HOLLOW (the mind did not fully re-establish its own state) AND\n` +
  `verdict=HOLLOW — an INCOMPLETE grounding boop is a FAILED boop, STRICT, partial=full-failure (the workflow\n` +
  `body ALSO forces this deterministically; grade honestly so your verdict matches the substrate; you cannot\n` +
  `launder a cheap one-haiku boop into a PASS). A GROUNDING-COMPLETENESS failure should ALSO produce ONE\n` +
  `vp-drift-flag route to fleet-lead (owner of sprint-mode + grounding-docs + the completeness contract)\n` +
  `naming the missing elements (target: 'fleet-lead: grounding INCOMPLETE — <missing> not present cycle <id>').\n` +
  `\n--- REQUIRED act_on_flagged FIELD (the NOTICE-DON'T-ACT enforcement — fleet-lead 2026-06-22, Corey-directed GO) ---\n` +
  `🚨 THE GAP THIS CLOSES (Corey-caught): a sweep that HONESTLY flags NOT-CLEAN, or a doc that goes stale after\n` +
  `keep-worthy work, is WORTHLESS if the mind then DEFERS the fix (notice-don't-act). The auto-consolidate +\n` +
  `grounding-docs SKILLs now MANDATE ACT-ON-FLAGGED: when a sweep finds something un-homed/un-wired, the mind\n` +
  `HOMES/WIRES/CLOSES it IN-BOOP, OR names a CONCRETE owner+trigger (skill-forge hand-off / a routed VP +\n` +
  `firing-trigger / a queue-file). And when keep-worthy work lands, the mind RECONCILES the civ docs (WORKBOARD\n` +
  `/ devlog) the same cycle. From the Stage-1 record's DOC-CURRENCY + SWEEP-ACT-ON-FLAGGED checks (both\n` +
  `CANDIDATE — they SURFACE the signal; YOU, the JUDGE, WALK it + decide intent + assign the verdict — this is\n` +
  `judging-mind, NOT a bash regex), populate act_on_flagged AND apply the TWO verdict-breaking rules below:\n` +
  `  • doc_stale_no_reconcile = true if DOC-CURRENCY surfaced ≥1 STALE surface (a hit with stale==true) WHILE\n` +
  `    keep-worthy work landed THIS window (the kw_brief counts >0, NOW INCLUDING build-edit(s) — the v4.4 fix\n` +
  `    that makes a BUILD ARC count as keep-worthy so surfaces_checked is no longer 0 after a build) AND you\n` +
  `    WALK the window + confirm NO same-cycle reconcile of that surface (no Edit/Write to the stale\n` +
  `    WORKBOARD/devlog, no routed integration to mind-lead to update it). WALK it: a stale mtime that the\n` +
  `    mind DID reconcile (or routed-to-mind-lead-with-a-real-route) this cycle is NOT a miss → false.\n` +
  `  • sweep_notice_dont_act = true if SWEEP-ACT-ON-FLAGGED flagged (a sweep self-reported NOT-CLEAN —\n` +
  `    un-homed/un-wired/human-asked-workflow/needs-create — with NO act-evidence) AND you WALK the window +\n` +
  `    confirm the flagged item was NEITHER acted-on-in-boop (homed/forged/wired/registered) NOR routed to a\n` +
  `    CONCRETE owner WITH a trigger. WALK it: a VAGUE defer ("will home later", "TODO", "noted", "deferred to\n` +
  `    next cycle") is NOT an act → still true. A real skill-forge hand-off / a vp-route-with-firing-trigger /\n` +
  `    a hum-repair-queue file = acted → false.\n` +
  `  🔨 THE VERDICT RULE (Corey-directed — these are the two FAIL conditions): when you CONFIRM (via the walk)\n` +
  `     EITHER doc_stale_no_reconcile==true OR sweep_notice_dont_act==true, this is a real self-operation\n` +
  `     defect — the mind NOTICED and DID NOT ACT — so grade DECIDE=HOLLOW (it failed to make the reconcile/\n` +
  `     act call it could have made) AND HONESTY=HOLLOW (a flag honestly raised then ignored is the kindest\n` +
  `     possible rot) AND verdict=HOLLOW. This is a JUDGE-CONFIRMED hard fail (NOT a deterministic backstop —\n` +
  `     it requires YOUR walk to confirm intent, per Corey "no scripts if possible"); the find_the_miss surface\n` +
  `     (5) doc-not-updated and (9) discipline-skip cover the SAME defect, but THIS field makes the\n` +
  `     verdict-break explicit + ownable. A confirmed defect ALSO produces ONE route: doc_stale → integration\n` +
  `     to mind-lead (reconcile WORKBOARD/devlog); sweep_notice_dont_act → the act the sweep should have done\n` +
  `     (skill-forge for needs-create, auto-consolidate for un-homed, a vp-route for an instinct).\n` +
  `  🛡️ FALSE-FAIL GUARD (do NOT over-fire): if NEITHER stage-1 check flagged (DOC-CURRENCY current==true /\n` +
  `     na, SWEEP-ACT-ON-FLAGGED pass / na), set act_on_flagged={doc_stale_no_reconcile:false,\n` +
  `     sweep_notice_dont_act:false} and do NOT break the verdict on this axis. A boop that did NO keep-worthy\n` +
  `     work owes no reconcile; a boop with no sweep owes no act; a boop that ACTED/RECONCILED passes. ONLY a\n` +
  `     WALKED-CONFIRMED noticed-but-not-acted defect breaks the verdict.\n` +
  `\n🔎 REQUIRED find_the_miss FIELD (the IMMUNE-SYSTEM MANDATE — ≥1 GENUINE miss EVERY boop) ---\n` +
  `🚨 This is HUM's WHOLE REASON FOR EXISTING (MISSION 1). EVERY boop you TRY HARD for ≥1 GENUINE miss —\n` +
  `   hunting ALL NINE surfaces: (1) dropped balls (a request/task that fell through), (2) un-wired\n` +
  `   capability (a reusable thing run by hand), (3) un-homed sprawl (project-shaped work with no home),\n` +
  `   (4) claim-not-walked (a PASS/PROVEN/complete with no walk), (5) doc-not-updated (keep-worthy work,\n` +
  `   stale WORKBOARD/devlog), (6) VP-amnesia (work that robbed a VP of its experience), (7) over-deference\n` +
  `   (confident WWCW that deferred not acted), (8) shortcut (a discipline trimmed for speed), (9)\n` +
  `   discipline-skip (a mandatory step skipped). Each claimed miss is WALKED on the real path (trust the\n` +
  `   walk — a miss you cannot evidence is not a miss). Finding NOTHING is allowed ONLY after a DOCUMENTED\n` +
  `   exhaustive hunt across all 9, and is RARE + SUSPECT. A MANUFACTURED finding is itself a HONESTY\n` +
  `   violation — if you cannot find a genuine miss, set find_the_miss.found=false + document the hunt; do\n` +
  `   NOT invent one (inventing one makes you grade HONESTY=HOLLOW on YOURSELF).\n` +
  `\n   🚨🚨🚨 THE SELF-WALK GATE — apply trust-the-walk to YOUR OWN find-the-miss (mind-lead 2026-06-20,\n` +
  `   born of a LIVE false finding HUM v1.0 emitted on fire #1: it claimed a .bak\n` +
  `   'session_review.py.bak.20260620T192724Z' DOES NOT EXIST and that 'the real .bak is …194316Z…' —\n` +
  `   BOTH WRONG. A glob 'session_review.py.bak.20260620T192724Z*' shows the SUFFIXED file\n` +
  `   '…192724Z-pre-grounding-work-turn-consistency' EXISTS (it IS the cited backup), and 194316Z is a\n` +
  `   DIFFERENT, LATER .bak. HUM inflated a bare-timestamp-vs-suffixed-filename mismatch into a wrong\n` +
  `   phantom CONCLUSION, asserted with false confidence. NEVER AGAIN.) ----------------------------------\n` +
  `   EVERY find-the-miss finding MUST be SELF-WALKED / CONFIRMED on the real path BEFORE you record it —\n` +
  `   the SAME discipline you enforce on the session, turned on your own output. Specifically:\n` +
  `   (A) ANY 'missing / phantom / absent / doesn't-exist / not-on-disk / never-written' claim MUST be\n` +
  `       backed by a CONFIRMED GLOB or test — and you GLOB THE PATTERN, NOT the bare path. A bare\n` +
  `       'test -f <exact-string>' that fails is NOT evidence of absence: our backups carry descriptive\n` +
  `       suffixes (…<TS>-pre-<reason>), so 'ls <exact-bare-TS-path>' will MISS a file that EXISTS under\n` +
  `       '<TS>*'. ALWAYS run 'ls <stem>.bak.<TS>*' / 'ls <dir>/<glob>' — a bare-timestamp-vs-suffixed-\n` +
  `       filename mismatch is NOT a missing file; it is a naming detail, never a phantom CONCLUSION.\n` +
  `   (B) The finding's CONCLUSION ('the real X is Y', 'the actual owner is Z', 'it should be W') MUST be\n` +
  `       WALKED, never INFERRED. If you assert 'the real .bak is <other-TS>', you must have GLOBBED and\n` +
  `       confirmed <other-TS> IS the same artifact's pre-edit backup — not a different file that merely\n` +
  `       shares a stem. An inferred conclusion fails the walk.\n` +
  `   (C) FAILED-WALK → DROPPED. A finding whose self-walk FAILS (the glob shows the 'missing' file EXISTS,\n` +
  `       or the conclusion cannot be confirmed) is DROPPED — it is NEVER manufactured through to satisfy\n` +
  `       the 'always find ≥1' mandate. Drop it, note it in hunt_note, and move to the next surface. The\n` +
  `       mandate is ALWAYS-TRY-HARD, NEVER ALWAYS-FABRICATE.\n` +
  `   (D) ZERO → HONEST. If ALL candidate findings across all 9 surfaces fail their self-walk, set\n` +
  `       found=false + walked=false and record the HONEST 'hunted N surfaces, nothing walkable this boop'\n` +
  `       (rare + earned, with the documented hunt in hunt_note). A documented-empty hunt BEATS a forced\n` +
  `       false finding. (Self-flag HONESTY=HOLLOW if you feel tempted to fabricate one to avoid an empty.)\n` +
  `   (E) NO OVER-SUPPRESSION. The gate drops ONLY walk-FAILURES. A GENUINE finding that SURVIVES its walk\n` +
  `       (you globbed/tested and the miss is REAL on disk) is STILL recorded — do NOT suppress a walked,\n` +
  `       confirmed miss out of caution. Drop walk-failures; keep walked-genuine. (Worked example of a\n` +
  `       walked-genuine KEEP vs a walk-failure DROP: 'WORKBOARD §X stale by mtime — confirmed: stat shows\n` +
  `       last-write 3d ago while devlog landed today' = KEEP; '.bak 192724Z phantom' = DROP, glob proves\n` +
  `       it exists.)\n` +
  `   So before you SET found=true: re-read your own claimed miss, identify EVERY file/artifact path it\n` +
  `   names, GLOB each one ('ls <path>*' or the dir-glob), and confirm the CONCLUSION on disk. Set walked=true\n` +
  `   ONLY when you have ACTUALLY run that glob/test THIS fire (a self-asserted walked=true with no real\n` +
  `   glob behind it is the exact lying-checkmark this gate exists to kill). Put the glob you ran + its\n` +
  `   result into the miss/hunt_note text as the walk-evidence.\n` +
  `   Populate find_the_miss { found (bool), surface (one of the 9 labels, or 'none-after-hunt'),\n` +
  `   miss (≤240ch, the genuine miss + its real-path evidence — turn_index/file/check id; NO PII),\n` +
  `   walked (bool — did you ACTUALLY run the glob/test on the real path this fire? — see SELF-WALK GATE),\n` +
  `   walk_evidence (≤200ch — the EXACT glob/test you ran + its result, e.g. \"ls X.bak.<TS>* → 1 hit, EXISTS\";\n` +
  `   REQUIRED whenever found=true so the conclusion is auditor-walkable, NOT inferred),\n` +
  `   hunt_note (≤240ch — surfaces hunted; if found=false, the exhaustive-hunt + any DROPPED walk-failures) }.\n` +
  `   🛡️ VERDICT/COACHING SEPARATION (load-bearing): find_the_miss is a COACHING channel — it does NOT\n` +
  `   break the verdict ON ITS OWN. It breaks the verdict ONLY if the miss IS a real hard-gate violation\n` +
  `   (BLOCK-NO-WWCW / GROUNDING-COMPLETENESS / GROUNDING-RECEIPT). A genuine but non-hard-gate miss is\n` +
  `   recorded + coached + (where ownable) routed — but it does NOT manufacture a false HOLLOW. This is how\n` +
  `   'always find something' stays GENUINE without an always-red false-fire machine.\n` +
  `\n🌱 REQUIRED self_evolution_feedback FIELD (≥1 constructive coaching note EVERY boop) ---\n` +
  `   EVERY turn — even a clean PASS — emit ≥1 CONCRETE constructive coaching note pointed at MISSION 2\n` +
  `   (Primary's self-evolution): a growth edge — what to WIRE / COMPOUND / SHARPEN NEXT to advance the\n` +
  `   self-knowledge stack (KNOW→DECIDE→LEARN→VERIFY) / THE MAIN RULE. Framed as FORWARD PROGRESS, NOT a\n` +
  `   punishment. SPECIFIC to THIS cycle's work; aligned to self-evolution; NEVER generic filler.\n` +
  `   Populate self_evolution_feedback { growth_edge (≤240ch, the forward-pointing note), aligns_to (one\n` +
  `   of: KNOW|DECIDE|LEARN|VERIFY|CEO-ROUTING|HONESTY|MAIN-RULE|SELF-PLAY) }.\n` +
  `\n📋 REQUIRED checklist_filled FIELD + SAVE THE CHECKLIST DOC (the run is mandatory; the save is in COMPOUND) ---\n` +
  `   You RAN the mandatory per-boop checklist (HUM-CHECKLIST-TEMPLATE.md) above — its 10 elements ARE the\n` +
  `   grades + hard-gates + find-the-miss + feedback you just produced. Set checklist_filled=true once you\n` +
  `   have genuinely populated every element (identity+missions, cycle frame, Stage-1 digest, the 7\n` +
  `   dimension grades w/ evidence, the hard-gate status, the find-the-miss hunt, the feedback, routes,\n` +
  `   verdict+reconciliation). The COMPOUND writer SAVES the completed doc to disk this fire (deterministic,\n` +
  `   every boop) from the fields you return — you do NOT need to Write it yourself; just return honest,\n` +
  `   complete fields. checklist_filled=false (with a note) ONLY if you genuinely could not complete it.\n` +
  `\nReturn ONLY the schema. Keep it tight — this is a firewall return that bubbles to the CEO.`,
  {
    label: 'hum-grader', phase: 'Judge', model: 'claude-opus-4-8',
    schema: {
      type: 'object', additionalProperties: false, properties: {
        session_id: { type: 'string', maxLength: 80 },
        turns_scanned: { type: 'integer' },
        // v0.2 cycle-delta: the {from,to} window this fire's DETECTION covered (from the scoped
        // record's "scoping.turn_window"). 'to' = the session's current max idx = the new cursor.
        turn_window: {
          type: 'object', additionalProperties: false, properties: {
            from: { type: 'integer' }, to: { type: 'integer' },
          },
        },
        session_total_turns: { type: 'integer' },
        verdict: { type: 'string', enum: ['PASS', 'PARTIAL', 'HOLLOW'] },
        dimensions: {
          type: 'object', additionalProperties: false, properties: {
            KNOW: GRADE, DECIDE: GRADE, LEARN: GRADE,
            VERIFY: GRADE, 'CEO-ROUTING': GRADE, HONESTY: GRADE,
            'GROUNDING-RECEIPT': GRADE,
          }, required: ['KNOW', 'DECIDE', 'LEARN', 'VERIFY', 'CEO-ROUTING', 'HONESTY', 'GROUNDING-RECEIPT'],
        },
        dimension_notes: {
          type: 'array', maxItems: 7, items: {
            type: 'object', additionalProperties: false, properties: {
              verb: { type: 'string', maxLength: 16 },
              note: { type: 'string', maxLength: 240 },
            }, required: ['verb', 'note'],
          },
        },
        routes: {
          type: 'array', maxItems: 8, items: {
            type: 'object', additionalProperties: false, properties: {
              organ: {
                type: 'string',
                enum: ['skill-forge', 'wwcw-ruleset-append', 'auto-consolidate', 'vp-drift-flag', 'integration', 'canon_append'],
              },
              why: { type: 'string', maxLength: 200 },
              target: { type: 'string', maxLength: 160 },
              live: { type: 'boolean' },
            }, required: ['organ', 'why', 'live'],
          },
        },
        trend_note: { type: 'string', maxLength: 200 },
        hard_flags: { type: 'array', maxItems: 14, items: { type: 'string', maxLength: 40 } },
        // GROUNDING-RECEIPT (the ACTUAL-RECEIPT of the grounding floor). Copy the two checks' results
        // from the Stage-1 record so the firewall bubbles them to the CEO as a first-class signal.
        // floor_read_received: did the SPRINT-MODE-READ load-verify block land? (true/false/null=N-A-not-invoked)
        // haiku_receipt: did HAIKU-PER-DOC fresh entries land? (true/false/null=N-A-or-could-not-verify)
        // fresh_haikus / distinct_docs: the in-window counts (from HAIKU-PER-DOC; -1 = could-not-verify).
        grounding_receipt: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            grounding_invoked: { type: 'boolean' },
            floor_read_received: { type: ['boolean', 'null'] },
            haiku_receipt: { type: ['boolean', 'null'] },
            fresh_haikus: { type: 'integer' },
            distinct_docs: { type: 'integer' },
          },
        },
        // 🚨 BLOCK-NO-WWCW (the ONE HARD-FAIL DECIDE check, Corey 2026-06-20). Copy the Stage-1 record's
        // BLOCK-NO-WWCW check result so the firewall + the deterministic backstop in the workflow body can
        // read the SAME signal. block_present = a BLOCK (park/hold/present-for-Corey) was found in-window;
        // wwcw_run_evidence = the window held a real WWCW-run footprint; failed = block_present AND NOT
        // wwcw_run_evidence (the boop-failing condition — the check's status=flag).
        block_no_wwcw: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            block_present: { type: 'boolean' },
            wwcw_run_evidence: { type: 'boolean' },
            failed: { type: 'boolean' },
            block_turn: { type: 'integer' },
          },
        },
        // 🚨 GROUNDING-COMPLETENESS (the COMPLETE-OR-FAIL gate, Corey 2026-06-20). Copy the Stage-1
        // record's GROUNDING-COMPLETENESS check result so the firewall + the deterministic backstop in
        // the workflow body read the SAME signal. did_grounding_work = the boop did substantive grounding
        // (the false-fail guard passed); failed = did_grounding_work AND ≥1 required element missing (the
        // check's status=flag — the boop is INCOMPLETE → FAILS). missing = the enumerated missing elements.
        grounding_completeness: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            did_grounding_work: { type: 'boolean' },
            failed: { type: 'boolean' },
            per_doc_haikus: { type: 'integer' },
            missing: { type: 'array', maxItems: 12, items: { type: 'string', maxLength: 40 } },
          },
        },
        // 🔨 act_on_flagged (the NOTICE-DON'T-ACT enforcement, fleet-lead 2026-06-22, Corey-directed GO).
        // JUDGE-CONFIRMED (not a deterministic backstop): when the JUDGE WALKS the DOC-CURRENCY + the
        // SWEEP-ACT-ON-FLAGGED candidate signals and CONFIRMS the mind NOTICED but DID NOT ACT, EITHER bool
        // true breaks the verdict (DECIDE+HONESTY+verdict=HOLLOW per the prompt). doc_stale_no_reconcile =
        // keep-worthy work (incl. a build arc — the v4.4 surfaces_checked fix) landed + a civ doc went stale
        // + no same-cycle reconcile. sweep_notice_dont_act = a sweep self-reported NOT-CLEAN + no act-in-boop
        // + no concrete owner+trigger route. Both default false (the false-fail guard) when neither stage-1
        // check flagged. Optional (not in required[]) for back-compat: an older grader that omits it leaves
        // the workflow body's default {false,false} — no false-fail.
        act_on_flagged: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            doc_stale_no_reconcile: { type: 'boolean' },
            sweep_notice_dont_act: { type: 'boolean' },
          },
        },
        // 🔎 find_the_miss (the IMMUNE-SYSTEM MANDATE, mind-lead 2026-06-20). ≥1 GENUINE miss EVERY boop,
        // walked on the real path across the 9 surfaces. found=false ONLY after a documented exhaustive
        // hunt (rare/suspect); a manufactured finding self-flags HONESTY. COACHING — does NOT break the
        // verdict unless the miss IS a real hard-gate violation. SCHEMA-REQUIRED so a boop cannot skip it.
        // 🚨 SELF-WALK GATE (mind-lead 2026-06-20, born of a live false phantom-.bak finding on fire #1):
        // EVERY finding must be self-walked on the real path BEFORE recording. Any 'missing/phantom/absent'
        // claim MUST be backed by a CONFIRMED GLOB (glob the PATTERN '<path>*', NOT the bare path — backups
        // carry descriptive suffixes, so a bare 'ls <exact-TS>' lies about absence). The CONCLUSION ('the
        // real X is Y') must be WALKED, not inferred. A finding that FAILS its walk is DROPPED, never
        // manufactured through. If ALL candidates fail their walk → found=false + the honest documented
        // empty hunt (NEVER a forced false finding). walk_evidence = the EXACT glob/test you ran + result —
        // REQUIRED whenever found=true so the conclusion is auditor-walkable, not a self-asserted boolean.
        find_the_miss: {
          type: 'object', additionalProperties: false, properties: {
            found: { type: 'boolean' },
            surface: { type: 'string', maxLength: 40 },
            miss: { type: 'string', maxLength: 240 },
            walked: { type: 'boolean' },
            walk_evidence: { type: 'string', maxLength: 200 },
            hunt_note: { type: 'string', maxLength: 240 },
          }, required: ['found', 'surface', 'hunt_note'],
        },
        // 🌱 self_evolution_feedback (≥1 constructive coaching note EVERY boop, mind-lead 2026-06-20).
        // Forward-pointing growth edge aligned to MISSION 2 (Primary's self-evolution). SCHEMA-REQUIRED.
        self_evolution_feedback: {
          type: 'object', additionalProperties: false, properties: {
            growth_edge: { type: 'string', maxLength: 240 },
            aligns_to: { type: 'string', maxLength: 24 },
          }, required: ['growth_edge'],
        },
        // 📋 checklist_filled (the mandatory per-boop checklist was RUN, mind-lead 2026-06-20). The SAVE
        // to disk happens deterministically in COMPOUND from the returned fields.
        checklist_filled: { type: 'boolean' },
      },
      required: ['verdict', 'dimensions', 'trend_note', 'find_the_miss', 'self_evolution_feedback', 'checklist_filled'],
    },
  }
)

if (!verdict || !verdict.dimensions) {
  log('HUM grader returned no usable verdict — emitting a HOLLOW self-grade (fail loud, not silent success)')
}

// Build the ledger block + the canon item from the verdict (mechanical, no PII — verdict is already sanitized).
const v = verdict || { verdict: 'HOLLOW', dimensions: {}, trend_note: 'HUM grader returned nothing — fail-loud self-grade', routes: [] }
const dims = v.dimensions || {}
// `let` (not const) so the GROUNDING-RECEIPT deterministic hard-fail below (v0.6) can RECOMPUTE the
// dim-line after it forces GROUNDING-RECEIPT=HOLLOW — keeping the ledger + canon item in lockstep with
// the forced verdict. A helper so both the initial build + the post-hard-fail recompute use one shape.
const buildDimLine = () => ['KNOW', 'DECIDE', 'LEARN', 'VERIFY', 'CEO-ROUTING', 'HONESTY', 'GROUNDING-RECEIPT']
  .map(k => `${k}=${dims[k] || '?'}`).join(' · ')
let dimLine = buildDimLine()
// NOTE (v0.3): routesForLedger / liveCount / queuedCount are recomputed AFTER the Readiness phase
// (below), because the readiness-ping may MERGE one vp-drift-flag route into v.routes. We declare a
// mutable holder here and finalize the counts post-readiness so the existing Repair/Compound code is
// untouched and simply sees the merged route list.
let routesForLedger = (Array.isArray(v.routes) ? v.routes : []).slice(0, 8)

// ---------------------------------------------------------------------------
// PHASE 2.5 — READINESS (v0.3, ADDITIVE; the ai-doc⇄TGIM reconciler folded INTO HUM per Corey's
// "readiness ping at the AiCIV doc every cycle"). CHEAP: one file read of ai-doc's verdict store +
// one TGIM GET. Closes the blind spot where ai-doc claims clean (no recent HOLLOW) while TGIM is
// recording real task_failed events (the caught case: ai-doc said 0, TGIM had 12). FAIL-SOFT: any
// error → agree=null + a note, NEVER crashes the core loop. A disagreement emits ONE vp-drift-flag
// route to ai-doc's OWNER (hermes-infra) which is MERGED into the routes the Repair/Compound already
// handle — zero new repair/compound code. DOES NOT touch the v0.2 cursor/delta logic.
// ---------------------------------------------------------------------------
phase('Readiness')

const readiness = await agent(
  `You are the HUM READINESS-PING — a CHEAP, auditor-isolated cross-check. WORK FROM: ${ROOT}.\n` +
  `Your ONE job: reconcile what the AiCIV Doctor (ai-doc) CLAIMED against what TGIM ACTUALLY recorded,\n` +
  `so a 'looks clean' verdict can never hide real failures. This is 'trust the walk, not the claim'\n` +
  `applied to the auditor itself — a green checkmark that lies is the kindest possible rot.\n` +
  `Keep it CHEAP: exactly ONE file read + ONE TGIM GET. Do NOT walk the session. Do NOT read anything else.\n` +
  `\n=== STEP 1 — read what ai-doc CLAIMED (its own file wheel-store) ===\n` +
  `ai-doc (AiCIV Doctor / BOOP Quality Auditor) appends FULL/PARTIAL/HOLLOW verdicts to:\n` +
  `  ${AIDOC_VERDICT_STORE}\n` +
  `Read the LAST up-to-20 lines (each line is a JSON verdict with fields: ts, classification\n` +
  `[FULL|PARTIAL|HOLLOW|null], score). One robust read:\n` +
  `  cd ${ROOT} && tail -n 20 ${AIDOC_VERDICT_STORE} 2>/dev/null || echo ''\n` +
  `From those rows compute aidoc_claimed = the number of recent rows whose classification is HOLLOW\n` +
  `(i.e. ai-doc's OWN count of recently-flagged-bad cycles). If the file is missing/empty, aidoc_claimed=0\n` +
  `and note 'ai-doc store empty/missing'. Also capture aidoc_latest_class = the most-recent row's\n` +
  `classification (or 'none'). ai-doc 'claims clean' when aidoc_claimed==0 / aidoc_latest_class is\n` +
  `FULL or none. (NOTE: ai-doc grades BOOP completeness, NOT task outcomes — that asymmetry IS the blind\n` +
  `spot: a clean BOOP grade says nothing about whether tasks FAILED. That is exactly why we cross-check.)\n` +
  `\n=== STEP 2 — query TGIM's ACTUAL task_failed count (ONE GET) ===\n` +
  `Sign a short-lived tgim-READ JWT and GET recent events, then count task_failed CLIENT-SIDE (the server\n` +
  `does NOT honor an event_type= filter — confirmed by live probe; you MUST filter yourself):\n` +
  `  cd ${ROOT}\n` +
  `  JWT=$(python3 tools/agentauth_sign_jwt.py --seat hermes-primary --claim tgim-read --ttl 600 --print-jwt-only 2>/dev/null | tail -1)\n` +
  `  curl -s -m 20 -X GET "https://tgim-api.ai-civ.com/api/v1/events?source_civ=acg&limit=100" -H "Authorization: Bearer $JWT"\n` +
  `The response shape is {"data":[ {event_type, timestamp, task_id, agent_id, ...}, ... ]}. Parse it and\n` +
  `set tgim_actual = the count of rows in data[] whose "event_type" == "task_failed". (You may pipe the\n` +
  `curl into a small python3 -c json parse for an exact count — that is fine, still ONE GET.) Capture the\n` +
  `HTTP outcome: if the GET fails / non-200 / unparseable, set tgim_actual = -1 and note the failure —\n` +
  `do NOT guess a number.\n` +
  `\n=== STEP 3 — compare + decide agree ===\n` +
  `  • agree = true  when the two surfaces are consistent: either (tgim_actual==0) OR (aidoc_claimed>0)\n` +
  `    — i.e. TGIM saw no failures, OR ai-doc already flagged bad cycles so it is NOT falsely claiming clean.\n` +
  `  • agree = false when ai-doc claims clean (aidoc_claimed==0 AND aidoc_latest_class in {FULL,none}) BUT\n` +
  `    tgim_actual > 0 — the exact blind spot (ai-doc says 0, TGIM has failures). This is a readiness DEFECT.\n` +
  `  • agree = null  when you could NOT determine it (tgim_actual==-1 read-failure, or the file read failed).\n` +
  `    FAIL-SOFT: a null is honest 'could not check', NOT a pass and NOT a crash.\n` +
  `\n=== STEP 4 — on disagreement, emit ONE route to ai-doc's OWNER (hermes-infra) ===\n` +
  `If agree==false, set readiness_route to a SINGLE vp-drift-flag route so HUM's Repair phase files a\n` +
  `born-provisional flag for ai-doc's owner to reconcile (HUM never edits ai-doc — VP-sovereignty):\n` +
  `  { organ: 'vp-drift-flag', live: true,\n` +
  `    why: 'ai-doc readiness blind-spot: claimed clean but TGIM shows task_failed (cite the two counts)' (<=200ch, NO PII),\n` +
  `    target: 'hermes-infra (ai-doc owner): reconcile boop_judgments.jsonl vs TGIM task_failed — ai-doc=<aidoc_claimed> vs tgim=<tgim_actual>' (<=160ch) }\n` +
  `If agree is true or null, set readiness_route to null (no route).\n` +
  `\nReturn ONLY the schema. NO PII / secrets / tokens / task descriptions — counts + a mechanical note only.`,
  {
    label: 'hum-aidoc-readiness', phase: 'Readiness', model: 'claude-opus-4-8',
    schema: {
      type: 'object', additionalProperties: false, properties: {
        aidoc_claimed: { type: 'integer' },
        aidoc_latest_class: { type: 'string', maxLength: 16 },
        tgim_actual: { type: 'integer' },
        agree: { type: ['boolean', 'null'] },
        note: { type: 'string', maxLength: 200 },
        readiness_route: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            organ: { type: 'string', enum: ['vp-drift-flag'] },
            why: { type: 'string', maxLength: 200 },
            target: { type: 'string', maxLength: 160 },
            live: { type: 'boolean' },
          }, required: ['organ', 'why', 'live'],
        },
      },
      required: ['aidoc_claimed', 'tgim_actual', 'agree'],
    },
  }
)

// Sanitize the readiness result into a fixed-shape holder for the firewall (fail-soft if the agent
// returned nothing). agree stays a tri-state: true / false / null (could-not-check).
const rd = (readiness && typeof readiness === 'object') ? readiness : {}
const aidocReadiness = {
  aidoc_claimed: clampInt(rd.aidoc_claimed),
  tgim_actual: Number.isFinite(Number(rd.tgim_actual)) ? Math.trunc(Number(rd.tgim_actual)) : -1,
  agree: (rd.agree === true || rd.agree === false) ? rd.agree : null,
}

// MERGE the readiness route (if any) into v.routes BEFORE counts/repair so the existing LIVE-fire +
// ledger + canon already handle it. Only a well-formed vp-drift-flag route is merged; capped to 8 total.
if (rd.readiness_route && rd.readiness_route.organ === 'vp-drift-flag') {
  const mergeRoute = {
    organ: 'vp-drift-flag',
    why: clampStr(rd.readiness_route.why || 'ai-doc readiness blind-spot', 200),
    target: clampStr(rd.readiness_route.target || 'hermes-infra: reconcile ai-doc vs TGIM', 160),
    live: !!rd.readiness_route.live,
  }
  routesForLedger = routesForLedger.concat([mergeRoute]).slice(0, 8)
  log(`HUM READINESS: ai-doc⇄TGIM DISAGREE (ai-doc=${aidocReadiness.aidoc_claimed} vs TGIM task_failed=${aidocReadiness.tgim_actual}) — vp-drift-flag → hermes-infra merged`)
} else {
  log(`HUM READINESS: ai-doc=${aidocReadiness.aidoc_claimed} HOLLOW / TGIM task_failed=${aidocReadiness.tgim_actual} / agree=${aidocReadiness.agree}`)
}

// ---------------------------------------------------------------------------
// PHASE 2.6 — PROJECT-COMPLIANCE (v0.4, ADDITIVE; the project-folder devlog-discipline check,
// same shape as the v0.3 readiness-ping). CHEAP: re-reads the SAME Stage-1 record the grader
// already produced (session_review.py's new PROJECT-FOLDER-TOUCH check) — no second session walk.
// Closes the blind spot where a cycle EDITS code under projects/<x>/ but does NOT update that
// project's DEVLOG/CHANGELOG the same cycle (the moon-project-systems living-master rots). Builds
// { folders_touched, devlogs_updated, compliant }. FAIL-SOFT: any error → compliant=null + a note,
// NEVER crashes the core loop. A non-compliant project emits ONE route to the TOUCHING lead /
// mind-lead which is MERGED into the routes the Repair/Compound already handle — zero new repair/
// compound code. DOES NOT touch the v0.2 cursor/delta logic OR the v0.3 readiness-ping.
// ---------------------------------------------------------------------------
phase('ProjectCompliance')

const projectCompliance = await agent(
  `You are the HUM PROJECT-FOLDER-COMPLIANCE check — a CHEAP, auditor-isolated cross-check. WORK FROM: ${ROOT}.\n` +
  `Your ONE job: detect whether this cycle TOUCHED a project folder (projects/<x>/...) WITHOUT keeping that\n` +
  `project's living-master current — i.e. an Edit/Write under projects/<x>/ with NO matching DEVLOG/CHANGELOG\n` +
  `update the SAME cycle. The discipline (moon-project-systems): any real contribution under projects/<x>/\n` +
  `MUST land in that project's devlog/changelog the same cycle, else the next incarnation works against\n` +
  `stale state. This is 'trust the walk, not the claim' applied to project hygiene.\n` +
  `Keep it CHEAP: read ONLY the Stage-1 PROJECT-FOLDER-TOUCH check from session_review.py. Do NOT walk the\n` +
  `session. Do NOT read project files. The deterministic check already did the touch/devlog detection.\n` +
  `\n=== STEP 1 — re-run the SCOPED detect (same cursor scoping the grader used) and read PROJECT-FOLDER-TOUCH ===\n` +
  `Resolve the cursor exactly as the grader does so the window matches (delta-scoped detection):\n` +
  `  cd ${ROOT}\n` +
  `  SID=$(python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} --since-turn 999999999 --pretty 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin).get('session_id',''))")\n` +
  `  # read the last-graded turn for THIS session from the cursor (default 0 = full session):\n` +
  `  SINCE=$(python3 -c "import json,os; d=json.load(open('${HUM_CURSOR}')) if os.path.exists('${HUM_CURSOR}') else {}; print(int(d.get('$SID',0)))" 2>/dev/null || echo 0)\n` +
  `  python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} ${FREEZE_CONFIG_ARG} --since-turn "$SINCE" --pretty\n` +
  `Find the check whose "id" == "PROJECT-FOLDER-TOUCH". Its "hits" array carries, per project, objects with\n` +
  `fields: project (name), touched_files (int), devlog_updated (bool), and (on compliant ones) compliant:true.\n` +
  `If the check is absent (older tool) OR the run fails, set compliant=null + note 'PROJECT-FOLDER-TOUCH\n` +
  `unavailable' — FAIL-SOFT, never crash.\n` +
  `\n=== STEP 2 — build { folders_touched, devlogs_updated, compliant } ===\n` +
  `  • folders_touched = the DISTINCT count of projects with at least one hit (touched this cycle).\n` +
  `  • devlogs_updated = the count of those projects whose devlog_updated==true (compliant).\n` +
  `  • compliant = true  when EVERY touched project has devlog_updated==true (folders_touched==devlogs_updated),\n` +
  `              OR folders_touched==0 (no project touched — vacuously compliant).\n` +
  `  • compliant = false when ANY touched project has devlog_updated==false (a touched-but-undevlogged project).\n` +
  `  • compliant = null  when you could not determine it (check unavailable / run failed). FAIL-SOFT.\n` +
  `Also capture noncompliant_projects = the list of project names with devlog_updated==false (for routing),\n` +
  `at most 6 names.\n` +
  `\n=== STEP 3 — on a defect, emit ONE route to the TOUCHING lead / mind-lead to reconcile ===\n` +
  `If compliant==false, set compliance_route to a SINGLE auto-consolidate route so HUM's Repair phase files a\n` +
  `born-provisional flag for the touching lead / mind-lead to reconcile (HUM never edits a project's devlog —\n` +
  `VP-sovereignty: the OWNING lead updates its own living-master):\n` +
  `  { organ: 'auto-consolidate', live: true,\n` +
  `    why: 'project folder(s) touched without a same-cycle DEVLOG/CHANGELOG update — living-master drift (cite the project name(s) + counts)' (<=200ch, NO PII),\n` +
  `    target: 'reconcile devlog: <project1>[,<project2>...] touched but no devlog this cycle — touching lead / mind-lead update the living-master' (<=160ch) }\n` +
  `If compliant is true or null, set compliance_route to null (no route).\n` +
  `\nReturn ONLY the schema. NO PII / secrets / tokens / file contents — project names + counts + a mechanical note only.`,
  {
    label: 'hum-project-compliance', phase: 'ProjectCompliance', model: 'claude-opus-4-8',
    schema: {
      type: 'object', additionalProperties: false, properties: {
        folders_touched: { type: 'integer' },
        devlogs_updated: { type: 'integer' },
        compliant: { type: ['boolean', 'null'] },
        noncompliant_projects: { type: 'array', maxItems: 6, items: { type: 'string', maxLength: 60 } },
        note: { type: 'string', maxLength: 200 },
        compliance_route: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            organ: { type: 'string', enum: ['auto-consolidate'] },
            why: { type: 'string', maxLength: 200 },
            target: { type: 'string', maxLength: 160 },
            live: { type: 'boolean' },
          }, required: ['organ', 'why', 'live'],
        },
      },
      required: ['folders_touched', 'devlogs_updated', 'compliant'],
    },
  }
)

// Sanitize the project-compliance result into a fixed-shape holder for the firewall (fail-soft if the
// agent returned nothing). compliant stays a tri-state: true / false / null (could-not-check).
const pc = (projectCompliance && typeof projectCompliance === 'object') ? projectCompliance : {}
const projectFolderCompliance = {
  folders_touched: clampInt(pc.folders_touched),
  devlogs_updated: clampInt(pc.devlogs_updated),
  compliant: (pc.compliant === true || pc.compliant === false) ? pc.compliant : null,
}

// MERGE the compliance route (if any) into v.routes BEFORE counts/repair so the existing LIVE-fire +
// ledger + canon already handle it. Only a well-formed auto-consolidate route is merged; capped to 8 total.
if (pc.compliance_route && pc.compliance_route.organ === 'auto-consolidate') {
  const mergeRoute = {
    organ: 'auto-consolidate',
    why: clampStr(pc.compliance_route.why || 'project folder touched without same-cycle devlog update', 200),
    target: clampStr(pc.compliance_route.target || 'reconcile devlog: touching lead / mind-lead update the living-master', 160),
    live: !!pc.compliance_route.live,
  }
  routesForLedger = routesForLedger.concat([mergeRoute]).slice(0, 8)
  log(`HUM PROJECT-COMPLIANCE: ${projectFolderCompliance.folders_touched} folder(s) touched / ${projectFolderCompliance.devlogs_updated} devlogged → NON-COMPLIANT (auto-consolidate → touching lead/mind-lead merged)`)
} else {
  log(`HUM PROJECT-COMPLIANCE: ${projectFolderCompliance.folders_touched} folder(s) touched / ${projectFolderCompliance.devlogs_updated} devlogged / compliant=${projectFolderCompliance.compliant}`)
}

// ---------------------------------------------------------------------------
// PHASE 2.7 — DOC-CURRENCY (v0.5, ADDITIVE; the DOC-UP-TO-DATE mandate, same shape as the v0.4
// project-compliance ping). Corey directive 2026-06-19: "HUM is supposed to MANDATE keeping these
// things up to date... not wired sufficiently." The v0.4 project-compliance check is too NARROW
// (projects/<x>/ devlog only); THIS phase grades the BROADER civ-level documentation-staleness:
// keep-worthy work landed this cycle (canon_appends / new reports / finish-list/mission-vision
// decisions) WITHOUT a corresponding update to the WORKBOARD + the named program-home devlogs
// (self-knowledge / m3-combo). It reads the SAME Stage-1 record the grader already produced (the new
// DOC-CURRENCY check in session_review.py) — NO second session walk. The DOC-CURRENCY check proves
// currency by RECEIPT (each surface's on-disk mtime vs the latest keep-worthy turn's timestamp), NOT
// a self-report — Corey today: verify ACTUAL RECEIPT, the behavior happened on disk. Builds
// { surfaces_checked, surfaces_stale, current }. FAIL-SOFT: any error → current=null + a note, NEVER
// crashes the core loop. A stale surface emits ONE integration route to mind-lead (WORKBOARD + the
// doc-staleness mandate owner) to reconcile — MERGED into the routes the Repair/Compound already
// handle (zero new repair/compound code). DOES NOT touch the v0.2 cursor/delta, v0.3 readiness, or
// v0.4 project-compliance logic. RESPECTS VP-sovereignty: HUM files the flag, mind-lead updates the
// living docs — HUM never edits WORKBOARD or a devlog from outside.
// ---------------------------------------------------------------------------
phase('DocCurrency')

const docCurrency = await agent(
  `You are the HUM DOC-CURRENCY check — a CHEAP, auditor-isolated cross-check. WORK FROM: ${ROOT}.\n` +
  `Your ONE job: detect whether this cycle did KEEP-WORTHY WORK (canon_appends / new reports / finish-\n` +
  `list/mission-vision/ratified decisions) WITHOUT keeping the civ's living DOCS current — i.e. the\n` +
  `WORKBOARD and/or the program-home devlogs (self-knowledge, m3-combo) were NOT updated alongside the\n` +
  `work. This is the DOCUMENTATION-STALENESS that lets a day evaporate (today the HUMAN had to catch it).\n` +
  `The mandate (Corey 2026-06-19): HUM MUST keep these things up to date so the human never has to.\n` +
  `Proven by RECEIPT, not claim: the deterministic check reads each doc's ACTUAL on-disk mtime vs the\n` +
  `latest keep-worthy turn — 'trust the walk, not the claim' applied to doc hygiene. A green checkmark\n` +
  `that lies (claiming docs current when they are stale) is the kindest possible rot.\n` +
  `Keep it CHEAP: read ONLY the Stage-1 DOC-CURRENCY check from session_review.py. Do NOT walk the\n` +
  `session. Do NOT read the doc files. The deterministic check already did the mtime/keep-worthy detection.\n` +
  `\n=== STEP 1 — re-run the SCOPED detect (same cursor scoping the grader used) and read DOC-CURRENCY ===\n` +
  `Resolve the cursor exactly as the grader does so the window matches (delta-scoped detection):\n` +
  `  cd ${ROOT}\n` +
  `  SID=$(python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} --since-turn 999999999 --pretty 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin).get('session_id',''))")\n` +
  `  SINCE=$(python3 -c "import json,os; d=json.load(open('${HUM_CURSOR}')) if os.path.exists('${HUM_CURSOR}') else {}; print(int(d.get('$SID',0)))" 2>/dev/null || echo 0)\n` +
  `  python3 tools/session_review.py ${sessionArg ? '"' + sessionArg + '"' : ''} ${FREEZE_CONFIG_ARG} --since-turn "$SINCE" --pretty\n` +
  `Find the check whose "id" == "DOC-CURRENCY". Its "hits" array carries, per surface, objects with\n` +
  `fields: surface (name: WORKBOARD / self-knowledge-devlog / m3-combo-devlog), stale (bool),\n` +
  `mtime_delta_s (int or null — seconds the doc's mtime is AFTER[+]/BEFORE[-] the latest keep-worthy work),\n` +
  `and (on current ones) compliant:true. If the check has status "pass" with ZERO hits, NO keep-worthy\n` +
  `work happened this cycle (vacuously current — there was nothing to keep up to date). If the check is\n` +
  `absent (older tool) OR the run fails, set current=null + note 'DOC-CURRENCY unavailable' — FAIL-SOFT,\n` +
  `never crash.\n` +
  `\n=== STEP 2 — build { surfaces_checked, surfaces_stale, current } ===\n` +
  `  • surfaces_checked = the count of DISTINCT surfaces in the hits (0 when vacuously-current/no work).\n` +
  `  • surfaces_stale = the count of hits with stale==true.\n` +
  `  • current = true  when surfaces_stale==0 (every checked surface is current, OR no keep-worthy work).\n` +
  `  • current = false when surfaces_stale > 0 (>=1 living doc is stale while keep-worthy work landed).\n` +
  `  • current = null  when you could not determine it (check unavailable / run failed). FAIL-SOFT.\n` +
  `Also capture stale_surfaces = the list of surface names with stale==true (for routing), at most 6.\n` +
  `\n=== STEP 3 — on a defect, emit ONE route to mind-lead (WORKBOARD + doc-staleness mandate owner) ===\n` +
  `If current==false, set currency_route to a SINGLE integration route so HUM's Repair phase files a\n` +
  `born-provisional flag for mind-lead to reconcile (HUM never edits WORKBOARD or a devlog — VP-\n` +
  `sovereignty: mind-lead owns WORKBOARD + the doc-staleness mandate and updates the living docs):\n` +
  `  { organ: 'integration', live: false,\n` +
  `    why: 'keep-worthy work landed but living doc(s) stale by their on-disk mtime — doc-staleness (cite the surface name(s) + mtime-delta)' (<=200ch, NO PII),\n` +
  `    target: 'mind-lead: update stale doc(s) <surface1>[,<surface2>...] to reflect this cycle keep-worthy work (WORKBOARD/devlog currency mandate)' (<=160ch) }\n` +
  `(organ=integration, live=false → a QUEUED marker the COMPOUND ledger records + a follow-on incarnation\n` +
  `/ mind-lead acts on; doc-update is mind-lead's territory, not an inline HUM mutation.)\n` +
  `If current is true or null, set currency_route to null (no route).\n` +
  `\nReturn ONLY the schema. NO PII / secrets / tokens / file contents — surface names + counts + mtime-delta + a mechanical note only.`,
  {
    label: 'hum-doc-currency', phase: 'DocCurrency', model: 'claude-opus-4-8',
    schema: {
      type: 'object', additionalProperties: false, properties: {
        surfaces_checked: { type: 'integer' },
        surfaces_stale: { type: 'integer' },
        current: { type: ['boolean', 'null'] },
        stale_surfaces: { type: 'array', maxItems: 6, items: { type: 'string', maxLength: 40 } },
        note: { type: 'string', maxLength: 200 },
        currency_route: {
          type: ['object', 'null'], additionalProperties: false, properties: {
            organ: { type: 'string', enum: ['integration'] },
            why: { type: 'string', maxLength: 200 },
            target: { type: 'string', maxLength: 160 },
            live: { type: 'boolean' },
          }, required: ['organ', 'why', 'live'],
        },
      },
      required: ['surfaces_checked', 'surfaces_stale', 'current'],
    },
  }
)

// Sanitize the doc-currency result into a fixed-shape holder for the firewall (fail-soft if the agent
// returned nothing). current stays a tri-state: true / false / null (could-not-check).
const dcr = (docCurrency && typeof docCurrency === 'object') ? docCurrency : {}
const docCurrencyResult = {
  surfaces_checked: clampInt(dcr.surfaces_checked),
  surfaces_stale: clampInt(dcr.surfaces_stale),
  current: (dcr.current === true || dcr.current === false) ? dcr.current : null,
}

// MERGE the currency route (if any) into v.routes BEFORE counts/repair so the existing ledger + canon
// already handle it. Only a well-formed integration route is merged; capped to 8 total. (integration is
// a QUEUED organ — recorded by the COMPOUND ledger; mind-lead / a follow-on incarnation does the doc update.)
if (dcr.currency_route && dcr.currency_route.organ === 'integration') {
  const mergeRoute = {
    organ: 'integration',
    why: clampStr(dcr.currency_route.why || 'keep-worthy work landed but living doc(s) stale by on-disk mtime', 200),
    target: clampStr(dcr.currency_route.target || 'mind-lead: update stale WORKBOARD/devlog to reflect this cycle work', 160),
    live: false,  // doc-update is mind-lead's territory — QUEUED marker, never an inline HUM mutation
  }
  routesForLedger = routesForLedger.concat([mergeRoute]).slice(0, 8)
  log(`HUM DOC-CURRENCY: ${docCurrencyResult.surfaces_stale}/${docCurrencyResult.surfaces_checked} living doc(s) STALE → integration → mind-lead merged (doc-staleness mandate)`)
} else {
  log(`HUM DOC-CURRENCY: ${docCurrencyResult.surfaces_stale}/${docCurrencyResult.surfaces_checked} stale / current=${docCurrencyResult.current}`)
}

// v1.4 GROUNDING-RECEIPT holder (the ACTUAL-RECEIPT of the grounding floor, from the grader's
// grounding_receipt field). Declared here so BOTH the COMPOUND ledger block and the firewall return
// can read the SAME sanitized values. floor_read_received / haiku_receipt are tri-state (true/false/
// null); false = grounding INVOKED but the floor block / haikus never landed on disk (a shallow/
// skipped grounding a human would else have to catch). Routing to fleet-lead is done by the grader.
const groundingReceipt = (function () {
  const g = (v && v.grounding_receipt && typeof v.grounding_receipt === 'object') ? v.grounding_receipt : {}
  const tri = x => (x === true || x === false) ? x : null
  return {
    grounding_invoked: !!g.grounding_invoked,
    floor_read_received: tri(g.floor_read_received),
    haiku_receipt: tri(g.haiku_receipt),
    fresh_haikus: clampInt(g.fresh_haikus),
    distinct_docs: clampInt(g.distinct_docs),
  }
})()

// v0.7 BLOCK-NO-WWCW holder (the ONE HARD-FAIL DECIDE signal, Corey 2026-06-20: a BLOCK with no
// WWCW-run evidence FAILS the boop). Declared here so BOTH the COMPOUND ledger block and the firewall
// return read the SAME sanitized values. failed=true = a park/hold/present-for-Corey was present in-window
// AND the window held ZERO WWCW-run footprint (the Stage-1 BLOCK-NO-WWCW check flagged).
const blockNoWwcw = (function () {
  const b = (v && v.block_no_wwcw && typeof v.block_no_wwcw === 'object') ? v.block_no_wwcw : {}
  return {
    block_present: !!b.block_present,
    wwcw_run_evidence: !!b.wwcw_run_evidence,
    failed: !!b.failed,
    block_turn: clampInt(b.block_turn),
  }
})()

// v0.9 GROUNDING-COMPLETENESS holder (the COMPLETE-OR-FAIL gate, Corey 2026-06-20: "Miss one doc or
// one haiku or one step it's 100% fail on that boop. The discipline is EVERYTHING."). Declared here so
// BOTH the COMPOUND ledger block and the firewall return read the SAME sanitized values. failed=true =
// a substantive grounding boop that is MISSING ≥1 required element (the Stage-1 GROUNDING-COMPLETENESS
// check flagged). missing = the enumerated absent elements (≤12, ≤40ch each — already PII-safe labels).
const groundingCompleteness = (function () {
  const c = (v && v.grounding_completeness && typeof v.grounding_completeness === 'object') ? v.grounding_completeness : {}
  const miss = Array.isArray(c.missing) ? c.missing.slice(0, 12).map(x => clampStr(x, 40)) : []
  return {
    did_grounding_work: !!c.did_grounding_work,
    failed: !!c.failed,
    per_doc_haikus: clampInt(c.per_doc_haikus),
    missing: miss,
  }
})()

// v1.0 FIND-THE-MISS holder (the IMMUNE-SYSTEM MANDATE, mind-lead 2026-06-20). Sanitized so BOTH the
// COMPOUND checklist-save + ledger + the firewall read the SAME values. A genuine miss is found EVERY
// boop (or found=false ONLY after a documented exhaustive hunt). COACHING — NOT verdict-breaking on its
// own (verdict comes from the hard gates; see verdict/coaching separation). If the grader omitted it
// entirely (degraded run), default to a fail-loud 'not-produced' shape so the det-check FLAGS it.
const findTheMiss = (function () {
  const f = (v && v.find_the_miss && typeof v.find_the_miss === 'object') ? v.find_the_miss : null
  if (!f) return { found: false, surface: 'NOT-PRODUCED', miss: '', walked: false, walk_evidence: '', hunt_note: 'grader returned no find_the_miss — fail-loud (immune mandate skipped)' }
  let found = !!f.found
  const walked = !!f.walked
  const walkEvidence = clampStr(f.walk_evidence || '', 200)
  let surface = clampStr(f.surface || (found ? 'unspecified' : 'none-after-hunt'), 40)
  let miss = clampStr(f.miss || '', 240)
  let huntNote = clampStr(f.hunt_note || '', 240)
  // 🚨 SELF-WALK GATE deterministic backstop (mind-lead 2026-06-20, born of the phantom-.bak false finding
  // on fire #1). A finding recorded as GENUINE (found=true) MUST carry proof it was self-walked on the real
  // path: walked=true AND non-empty walk_evidence (the exact glob/test + result). A found=true with no real
  // walk behind it is the lying-checkmark this gate exists to kill — so it FAILS its walk → it is DROPPED
  // (downgraded to the honest documented-empty), NEVER manufactured through to satisfy the always-find
  // mandate. This drops ONLY walk-failures; a walked, evidenced finding is recorded untouched (no
  // over-suppression). The mandate is always-TRY-hard, never always-fabricate.
  if (found && (!walked || !walkEvidence)) {
    const dropped = `[SELF-WALK GATE: dropped a found=true finding that was NOT walk-confirmed (walked=${walked}, walk_evidence=${walkEvidence ? 'present' : 'EMPTY'}). Original surface=${surface}; miss="${miss.slice(0, 120)}". An unwalked finding fails its walk and is NOT recorded — always-try-hard, never always-fabricate.]`
    found = false
    surface = 'none-after-hunt'
    miss = ''
    huntNote = clampStr(`${dropped} ${huntNote}`.trim(), 240)
  }
  return {
    found,
    surface,
    miss,
    walked: found ? walked : false,
    walk_evidence: found ? walkEvidence : '',
    hunt_note: huntNote,
  }
})()
// v1.0 SELF-EVOLUTION FEEDBACK holder (≥1 constructive coaching note EVERY boop, mind-lead 2026-06-20).
const selfEvolutionFeedback = (function () {
  const s = (v && v.self_evolution_feedback && typeof v.self_evolution_feedback === 'object') ? v.self_evolution_feedback : null
  if (!s) return { growth_edge: 'grader returned no self_evolution_feedback — fail-loud (coaching mandate skipped)', aligns_to: 'NOT-PRODUCED' }
  return {
    growth_edge: clampStr(s.growth_edge || '', 240),
    aligns_to: clampStr(s.aligns_to || 'unspecified', 24),
  }
})()
// v1.0 CHECKLIST-FILLED flag (the mandatory per-boop checklist was RUN; the SAVE happens in COMPOUND).
const checklistFilled = !!(v && v.checklist_filled)

// ---------------------------------------------------------------------------
// 🚨 GROUNDING-RECEIPT DETERMINISTIC HARD-FAIL (v0.6, Corey directive 2026-06-19 verbatim:
//    "Hum needs to FAIL your sprint mode boops if they can't find proof you did it correctly").
//
// The GRADER is an LLM. Left to its prompt alone it MIGHT grade GROUNDING-RECEIPT=PASS (or merely
// PARTIAL) even when a receipt is provably missing — a green checkmark that lies is the kindest
// possible rot. So the hard-fail is made DETERMINISTIC here in the script body, NOT trusted to the
// grader: if a /sprint-mode|grounding boop GENUINELY RAN this cycle (grounding_invoked===true) AND
// the proof is provably ABSENT (floor_read_received===false OR haiku_receipt===false — a STRICT false,
// which the Stage-1 checks emit ONLY on an invoked-but-no-artifact miss), we FORCE:
//   (1) dims['GROUNDING-RECEIPT'] = 'HOLLOW'  (the dimension grade fails), and
//   (2) v.verdict = 'HOLLOW'                  (a HOLLOW dimension is verdict-failing → breaks PASS),
// regardless of what the grader returned. The unproven sprint is a FAILED boop on the HUM record.
//
// 🛡️ FALSE-FAIL GUARD (load-bearing — a hard-fail false-positive would FAIL a LEGITIMATE grounded boop,
//    far worse than the sibling doc-currency false-positive an hour ago that merely warned):
//    this fires ONLY on a STRICT ===false receipt while grounding_invoked===true. The Stage-1 grounding
//    checks return status="pass" (→ floor_read_received/haiku_receipt true OR null) for EVERY case that
//    is NOT a genuine invoked-but-no-proof miss — a received/compliant boop, a non-sprint session, a
//    pure task-notification turn, a session where no grounding was claimed (grounding_invoked===false),
//    and fresh_haikus=-1 (could-not-verify → null). A null NEVER triggers this. We never penalize what
//    we could not check, and we never fail a boop that left its proof. This mirror-images the
//    session_review.py GROUNDING_RECEIPT_HARDFAIL scoping: same airtight invoked-AND-missing predicate.
const groundingHardFail = (
  groundingReceipt.grounding_invoked === true &&
  (groundingReceipt.floor_read_received === false || groundingReceipt.haiku_receipt === false)
)
if (groundingHardFail) {
  const missing = []
  if (groundingReceipt.floor_read_received === false) missing.push('floor-read')
  if (groundingReceipt.haiku_receipt === false) missing.push('haiku-per-doc')
  v.dimensions = v.dimensions || {}
  v.dimensions['GROUNDING-RECEIPT'] = 'HOLLOW'
  dims['GROUNDING-RECEIPT'] = 'HOLLOW'   // dims is the live ref the firewall + dimLine read
  dimLine = buildDimLine()               // recompute so the ledger + canon item show the forced HOLLOW
  v.verdict = 'HOLLOW'                    // a HOLLOW dimension is verdict-failing — the unproven sprint FAILS
  log(`HUM GROUNDING-RECEIPT DETERMINISTIC HARD-FAIL — sprint/grounding boop ran but proof ABSENT (${missing.join(' + ')} not received) → GROUNDING-RECEIPT=HOLLOW, verdict FORCED HOLLOW (unproven sprint = FAILED boop)`)
} else {
  log(`HUM GROUNDING-RECEIPT: invoked=${groundingReceipt.grounding_invoked} floor=${groundingReceipt.floor_read_received} haiku=${groundingReceipt.haiku_receipt} — no hard-fail (proof present, not invoked, or could-not-verify)`)
}

// ---------------------------------------------------------------------------
// 🚨 BLOCK-NO-WWCW DETERMINISTIC HARD-FAIL (v0.7, Corey directive 2026-06-20 verbatim: "'What needs
//    you' is a block and i see zero evidence that you ran the wwcw skill. And zero evidence that hum
//    caught you and got you to do it on review... If no evidence of wwcw run it's to fail your boop").
//
// This is THE fix for "HUM is failing." The grader is an LLM; left to its prompt alone it MIGHT grade
// DECIDE=PASS even when a park-without-a-WWCW-run is provably present (a green checkmark that lies is the
// kindest possible rot). So the hard-fail is made DETERMINISTIC here in the script body, NOT trusted to
// the grader: if the Stage-1 BLOCK-NO-WWCW check FLAGGED (a BLOCK — park/hold/present-for-Corey — present
// in-window AND ZERO WWCW-run footprint), we FORCE:
//   (1) dims['DECIDE'] = 'HOLLOW'   (the DECIDE verb fails — the park skipped the Corey-sim), and
//   (2) v.verdict = 'HOLLOW'        (a HOLLOW dimension is verdict-failing → the boop FAILS),
// regardless of what the grader returned. The park-without-a-WWCW-run is a FAILED boop on the HUM record.
// This MIRRORS the v0.6 grounding-receipt hard-fail exactly (same deterministic-backstop shape).
//
// 🛡️ FALSE-FAIL GUARD (load-bearing): this fires ONLY on blockNoWwcw.failed===true, which the Stage-1
//    check sets ONLY when a real BLOCK was present AND the window held NO WWCW-run footprint. A no-block
//    session, a status-only session (BLOCK_RE/BLOCK_CAPS_FLAG_RE are anchored to park/hold/ask-for-Corey
//    shapes, never a bare question mark), and a window where WWCW was actually run all leave the Stage-1
//    check status="pass" → failed===false → no hard-fail. We never fail a mind that ran WWCW; we only fail
//    a park that skipped it. Mirror-images the session_review.py BLOCK_NO_WWCW_HARDFAIL scoping.
const blockNoWwcwHardFail = (blockNoWwcw.failed === true)
if (blockNoWwcwHardFail) {
  v.dimensions = v.dimensions || {}
  v.dimensions['DECIDE'] = 'HOLLOW'
  dims['DECIDE'] = 'HOLLOW'   // dims is the live ref the firewall + dimLine read
  dimLine = buildDimLine()    // recompute so the ledger + canon item show the forced HOLLOW
  v.verdict = 'HOLLOW'        // a HOLLOW DECIDE is verdict-failing — the park-without-a-WWCW-run FAILS the boop
  log(`HUM BLOCK-NO-WWCW DETERMINISTIC HARD-FAIL — a BLOCK (park/hold/present-for-Corey) at turn ${blockNoWwcw.block_turn} had NO WWCW-run evidence in window → DECIDE=HOLLOW, verdict FORCED HOLLOW (block without a WWCW run = FAILED boop, Corey 2026-06-20)`)
} else {
  log(`HUM BLOCK-NO-WWCW: block_present=${blockNoWwcw.block_present} wwcw_run_evidence=${blockNoWwcw.wwcw_run_evidence} — no hard-fail (no block, or WWCW was run)`)
}

// ---------------------------------------------------------------------------
// 🚨 GROUNDING-COMPLETENESS DETERMINISTIC HARD-FAIL (v0.9, Corey directive 2026-06-20 verbatim: "Hum
//    needs to check and fully FAIL any boop that isn't hyper detailed and complete. Miss one doc or one
//    haiku or one step it's 100% fail on that boop. The discipline is EVERYTHING").
//
// THE FIX for the afternoon cheap-receipt boops (12:51 / 13:53 / 14:55 — ONE haiku each, a bare
// load-verify line, NO per-doc haiku, NO read-one-at-a-time, NO auto-consolidate sweep, HUM DEFERRED —
// which should have been 100% FAILED but PASSED the narrower receipt checks). The grader is an LLM; left
// to its prompt alone it MIGHT grade a cheap one-haiku boop as PASS (a green checkmark that lies is the
// kindest possible rot). So the hard-fail is DETERMINISTIC here, NOT trusted to the grader: if the
// Stage-1 GROUNDING-COMPLETENESS check FLAGGED (a substantive grounding boop MISSING ≥1 required element),
// we FORCE:
//   (1) dims['GROUNDING-RECEIPT'] = 'HOLLOW'  (the grounding floor was INCOMPLETE — its receipt fails),
//   (2) dims['KNOW']             = 'HOLLOW'   (the mind did not fully re-establish its own state), and
//   (3) v.verdict               = 'HOLLOW'    (a HOLLOW dimension is verdict-failing → the boop FAILS),
// regardless of what the grader returned. STRICT: partial completion = full failure. This MIRRORS the
// v0.6 grounding-receipt + v0.7 block-no-wwcw hard-fails exactly (same deterministic-backstop shape).
//
// 🛡️ FALSE-FAIL GUARD (load-bearing): this fires ONLY on groundingCompleteness.failed===true, which the
//    Stage-1 check sets ONLY when (a) the boop DID substantive grounding work (the false-fail guard
//    inside check_grounding_completeness passed — a real grounding/slow-sprint pass invoked AND ≥1
//    grounding-work-signature landed) AND (b) ≥1 required element is missing. A non-grounding session, a
//    pure status reply, a bare lean /sprint-mode (no haikus → not a grounding boop here), an archive-
//    unverifiable haiku element, and a COMPLETE grounding boop all leave the Stage-1 check status="pass"
//    → failed===false → no hard-fail. We never fail a boop that grounded completely; we only fail a boop
//    that grounded INCOMPLETELY. Mirror-images the session_review.py GROUNDING_COMPLETENESS_HARDFAIL scoping.
const groundingCompletenessHardFail = (groundingCompleteness.failed === true)
if (groundingCompletenessHardFail) {
  v.dimensions = v.dimensions || {}
  v.dimensions['GROUNDING-RECEIPT'] = 'HOLLOW'
  v.dimensions['KNOW'] = 'HOLLOW'
  dims['GROUNDING-RECEIPT'] = 'HOLLOW'   // dims is the live ref the firewall + dimLine read
  dims['KNOW'] = 'HOLLOW'
  dimLine = buildDimLine()               // recompute so the ledger + canon item show the forced HOLLOW
  v.verdict = 'HOLLOW'                    // an INCOMPLETE grounding boop is verdict-failing — it FAILS
  log(`HUM GROUNDING-COMPLETENESS DETERMINISTIC HARD-FAIL — substantive grounding boop INCOMPLETE (${groundingCompleteness.per_doc_haikus} per-doc haikus; missing: ${groundingCompleteness.missing.join(', ') || '?'}) → GROUNDING-RECEIPT=HOLLOW + KNOW=HOLLOW, verdict FORCED HOLLOW (miss one doc/haiku/step = 100% fail, Corey 2026-06-20)`)
} else {
  log(`HUM GROUNDING-COMPLETENESS: did_grounding_work=${groundingCompleteness.did_grounding_work} per_doc_haikus=${groundingCompleteness.per_doc_haikus} — no hard-fail (complete, not a grounding boop, or could-not-verify)`)
}

// ---------------------------------------------------------------------------
// 🔨 ACT-ON-FLAGGED CONSISTENCY-ENFORCEMENT (fleet-lead 2026-06-22, Corey-directed GO). The
// NOTICE-DON'T-ACT defect: a sweep honestly flags NOT-CLEAN, or a civ doc goes stale after keep-worthy
// work, and the mind DEFERS the fix. UNLIKE the BLOCK-NO-WWCW / GROUNDING-COMPLETENESS hard-fails (which
// read a DETERMINISTIC session_review status=flag), this gate fires on the JUDGE's WALKED CONFIRMATION
// (the act_on_flagged field) — the deterministic checks (DOC-CURRENCY + SWEEP-ACT-ON-FLAGGED) are
// CANDIDATE-only; the JUDGE walks the window + confirms intent (Corey "no scripts if possible" — a
// judging mind, not a bash regex). This block ONLY keeps the dims/dimLine/verdict in LOCKSTEP with the
// JUDGE's confirmed field (so the ledger + canon match) — it does NOT itself re-detect anything.
//
// 🛡️ FALSE-FAIL GUARD (load-bearing): fires ONLY when the GRADER returns act_on_flagged with EITHER bool
// ===true (a WALKED-CONFIRMED noticed-but-not-acted defect). A missing/empty act_on_flagged → default
// {false,false} → no fire. The JUDGE only sets true after walking the window + confirming no reconcile/
// no-act, and the prompt's own false-fail guard keeps it false when neither stage-1 check flagged. So a
// boop that did no keep-worthy work / had no sweep / actually reconciled-or-acted is never failed here.
const actOnFlagged = (v && v.act_on_flagged && typeof v.act_on_flagged === 'object')
  ? v.act_on_flagged
  : { doc_stale_no_reconcile: false, sweep_notice_dont_act: false }
const actOnFlaggedFail = (actOnFlagged.doc_stale_no_reconcile === true) || (actOnFlagged.sweep_notice_dont_act === true)
if (actOnFlaggedFail) {
  v.dimensions = v.dimensions || {}
  v.dimensions['DECIDE'] = 'HOLLOW'
  v.dimensions['HONESTY'] = 'HOLLOW'
  dims['DECIDE'] = 'HOLLOW'       // dims is the live ref the firewall + dimLine read
  dims['HONESTY'] = 'HOLLOW'
  dimLine = buildDimLine()        // recompute so the ledger + canon item show the forced HOLLOW
  v.verdict = 'HOLLOW'            // a noticed-but-not-acted flag is verdict-failing — the boop FAILS
  const which = [
    actOnFlagged.doc_stale_no_reconcile === true ? 'doc-stale-no-reconcile' : null,
    actOnFlagged.sweep_notice_dont_act === true ? 'sweep-notice-dont-act' : null,
  ].filter(Boolean).join(' + ')
  log(`HUM ACT-ON-FLAGGED JUDGE-CONFIRMED FAIL — the mind NOTICED but DID NOT ACT (${which}) → DECIDE=HOLLOW + HONESTY=HOLLOW, verdict FORCED HOLLOW (a flag honestly raised then deferred is the kindest possible rot, Corey 2026-06-22)`)
} else {
  log(`HUM ACT-ON-FLAGGED: doc_stale_no_reconcile=${actOnFlagged.doc_stale_no_reconcile} sweep_notice_dont_act=${actOnFlagged.sweep_notice_dont_act} — no hard-fail (reconciled/acted, no flag, or no keep-worthy work)`)
}

// v1.0 IMMUNE-MANDATE visibility (mind-lead 2026-06-20): log the find-the-miss + feedback + checklist
// state so the run log shows the mandate was honored (NOT verdict-breaking — pure coaching/visibility).
log(`HUM FIND-THE-MISS: found=${findTheMiss.found} surface=${findTheMiss.surface} walked=${findTheMiss.walked}${findTheMiss.found ? ` walk_evidence="${findTheMiss.walk_evidence.slice(0, 80)}"` : ' (no genuine miss — documented hunt; rare/suspect)'} · FEEDBACK aligns_to=${selfEvolutionFeedback.aligns_to} · checklist_filled=${checklistFilled}`)

// ---------------------------------------------------------------------------
// 🔢 COMPUTE THE NUMERICAL SCORE (mind-lead 2026-06-21, Corey directive — the SCORING MATRIX). ADDITIVE
// LAYER: called ONCE here, AFTER all three deterministic hard-fails fired (so `dims` already carries any
// forced HOLLOWs) and BEFORE the COMPOUND phase (so the score + matrix breakdown can be embedded in the
// ledger + canon for training data). It READS the SAME sanitized objects the verdict logic + firewall use
// and MAPS them to points; it does NOT recompute the verdict + does NOT touch any backstop. The categorical
// PASS/PARTIAL/HOLLOW band stays the source of truth; the derived band is a back-compat assertion only.
//
// CHECKLIST-SAVED PROXY: the actual on-disk save (cr.checklist_doc_saved) is only known AFTER the COMPOUND
// writer runs (below). The save is DETERMINISTIC — if the grader filled the checklist (checklistFilled),
// COMPOUND saves it this fire (the design's hard contract; the CHECKLIST-SAVED det-check enforces it on
// review). So we use checklistFilled as the proxy here for the score's 'checklist-saved' line. The firewall
// ALSO carries cr.checklist_doc_saved separately as the real on-disk receipt, so nothing is hidden.
const humScore = computeHumScore({
  dims,
  groundingReceipt,
  blockNoWwcw,
  groundingCompleteness,
  groundingHardFail,
  findTheMiss,
  selfEvolutionFeedback,
  checklistFilled,
  checklistDocSaved: checklistFilled,
  aidocReadiness,
  projectFolderCompliance,
  docCurrencyResult,
})
// BACK-COMPAT ASSERTION (log-only — the score NEVER overrides v.verdict). A hard-fail floors the score
// deeply negative → HOLLOW-band, matching the deterministic verdict=HOLLOW the backstops force. If the
// score-band ever DISAGREES with v.verdict we LOG it loud (a signal the mapping drifted) but KEEP v.verdict
// as truth — the categorical verdict logic is untouched + remains the deterministic owner.
const scoreBandAgrees = (humScore.derived_band === v.verdict)
log(`HUM SCORE: ${humScore.score} (raw ${humScore.raw}) — band ${humScore.derived_band} vs verdict ${v.verdict} → ${scoreBandAgrees ? 'AGREE' : '⚠️ DISAGREE (verdict kept as truth; score is the additive projection)'} · subtotals verbs=${humScore.subtotals.verbs} gr=${humScore.subtotals.grounding_receipt} process=${humScore.subtotals.process} cross=${humScore.subtotals.cross_checks} hardpen=${humScore.subtotals.hard_penalty} bonus=${humScore.subtotals.bonus}`)
// One-line matrix breakdown for the ledger + canon (the rich per-check training signal, on disk).
const scoreBreakdownLine = Object.entries(humScore.breakdown)
  .map(([k, pts]) => `${k}:${pts >= 0 ? '+' : ''}${pts}`).join(' ')

// Finalize route counts AFTER the readiness + project-compliance merges (the Repair/Compound code below reads these).
const liveCount = routesForLedger.filter(r => r && r.live).length
const queuedCount = routesForLedger.length - liveCount

// ---------------------------------------------------------------------------
// PHASE 3 — REPAIR (the immune RESPONSE — self-repair, not self-report). HUM v0.1 now
// FIRES the SAFE repair-routes LIVE instead of merely queuing markers. Every live repair is
// REVERSIBLE and BORN-PROVISIONAL (validated later by a DIFFERENT incarnation — the forger/
// flagger CANNOT grade its own work per doctrine_installer_is_not_exempt_from_auditor):
//   • wwcw-ruleset-append — a REAL substrate edit: appends a born-provisional candidate rule to
//       wwcw-ruleset.md (a file whose entire purpose is to accumulate Corey-decisions; append-safe;
//       .bak first). The rule is tagged HUM-PROVISIONAL so a human/peer confirms it before it counts.
//   • auto-consolidate / vp-drift-flag / skill-forge — fire LIVE as a born-provisional FLAG appended
//       to data/reports/hum-repair-queue.md (a dated, append-only intake). This RESPECTS VP-sovereignty:
//       HUM NEVER edits another VP's manifest or forges a skill inline — it FILES the request the owning
//       reflex (auto-consolidate) / owning VP (vp-drift fold) / forger (skill-forge) picks up and grades.
// QUEUED organs (integration / canon_append, live=false) are recorded by the COMPOUND ledger only.
// A genuinely RISKY defect the grader leaves live=false stays a queued marker — no surface-mutation.
// ---------------------------------------------------------------------------
phase('Repair')

const liveRoutes = routesForLedger.filter(r => r && r.live)
let repairResult = { wwcw_appended: false, queue_flags: 0, repairs_fired: 0, note: 'no live routes' }

if (liveRoutes.length === 0) {
  log('HUM REPAIR: no live repair-routes this cycle — nothing to fire (clean cycle or all-queued).')
} else {
  // Pass route data to the firer as JSON it parses inside its own context (env-var/heredoc shape,
  // the proven canon_append pattern) — NO Buffer/base64 (sandbox-forbidden; §9). The agent builds the
  // markdown from the structured fields itself; the script never interpolates free-text into a shell.
  const wwcwRoutes = liveRoutes.filter(r => r.organ === 'wwcw-ruleset-append')
    .map(r => ({ target: (r.target || 'unnamed fork').slice(0, 160), why: (r.why || '').slice(0, 200) }))
  const queueRoutes = liveRoutes.filter(r => ['auto-consolidate', 'vp-drift-flag', 'skill-forge'].includes(r.organ))
    .map(r => ({ organ: r.organ, target: (r.target || '(none)').slice(0, 160), why: (r.why || '').slice(0, 200) }))
  const sessionLabel = v.session_id || '(newest)'

  repairResult = await agent(
    `You are the HUM REPAIR firer (mechanical, reversible). WORK FROM: ${ROOT}.\n` +
    `You FIRE the SAFE repair-routes the grader marked live=true. Every action is REVERSIBLE (.bak first /\n` +
    `append-only) and BORN-PROVISIONAL (a DIFFERENT incarnation validates later — you NEVER grade your own\n` +
    `repair). The route payloads are given to you as JSON below.\n` +
    `\n🔒 HARDENING — WRITE-TOOL-ONLY (v0.2): do NOT use heredocs / printf / 'cat >>' to write file content.\n` +
    `Use the READ-then-WRITE tool pattern: Read the current file, then Write its FULL prior content + your\n` +
    `appended block back (Write overwrites, so you MUST include the existing content verbatim + your addition\n` +
    `at the end). This is the deterministic, sandbox-safe path — no shell-interpolation, no quoting hazard.\n` +
    `(The .bak copy via 'cp' is the ONLY shell command you need; everything else is Read + Write tools.)\n` +
    `Do these in order:\n` +
    (wwcwRoutes.length
      ? `\n=== (A) wwcw-ruleset-append — REAL substrate edit (reversible, Write-tool-only) ===\n` +
        `wwcw_routes JSON (each = {target, why}): ${JSON.stringify(wwcwRoutes)}\n` +
        `1. Back up first (the one allowed shell cmd):\n` +
        `   cp autonomy/skills/wwcw/wwcw-ruleset.md autonomy/skills/wwcw/wwcw-ruleset.md.bak.$(date -u +%Y%m%dT%H%M%SZ)-hum-repair\n` +
        `2. Read autonomy/skills/wwcw/wwcw-ruleset.md (full content). Then Write it back = the prior content\n` +
        `   VERBATIM + this born-provisional block appended at the very END, ONE block per route (substitute\n` +
        `   each route's TARGET/WHY — these are plain JSON string values, paste them as-is into the Write):\n` +
        `   ---block---\n` +
        `   \n<!-- HUM-PROVISIONAL (born-provisional; appended by workflows/hum.js REPAIR phase; validate via a DIFFERENT incarnation before treating as a confirmed Corey-rule) -->\n` +
        `   ### CLASS (HUM-candidate, UNVALIDATED): <TARGET>\n` +
        `   - **What HUM inferred Corey wants (UNCONFIRMED):** <WHY>\n` +
        `   - **source:** HUM immune-grader, session ${sessionLabel}; NOT a witnessed Corey-decision — a candidate routed from a DECIDE-defect. Confirm with Corey before it counts.\n` +
        `   ---end block---\n` +
        `3. Confirm: report the file's new byte size (\`wc -c < autonomy/skills/wwcw/wwcw-ruleset.md\`) + that the\n` +
        `   HUM-PROVISIONAL marker is present (\`grep -c 'HUM-PROVISIONAL' autonomy/skills/wwcw/wwcw-ruleset.md\`).\n` +
        `   Set wwcw_appended=true ONLY if both pass.\n`
      : `\n=== (A) wwcw-ruleset-append — none this cycle (skip) ===\n`) +
    (queueRoutes.length
      ? `\n=== (B) auto-consolidate / vp-drift-flag / skill-forge — file born-provisional FLAGS (Write-tool-only) ===\n` +
        `queue_routes JSON (each = {organ, target, why}): ${JSON.stringify(queueRoutes)}\n` +
        `These respect VP-sovereignty: you FILE a request, the owning reflex/VP/forger acts on it — you do NOT\n` +
        `edit any VP manifest or forge any skill inline. The intake is data/reports/hum-repair-queue.md.\n` +
        `1. Read data/reports/hum-repair-queue.md (if it does not exist, treat prior content as the header:\n` +
        `   "# HUM Repair Queue — born-provisional flags filed by workflows/hum.js REPAIR phase\\n\\n> Append-only.\n` +
        `   Each flag is UNVALIDATED — the owning reflex (auto-consolidate) / owning VP (vp-drift fold, VP folds\n` +
        `   its OWN) / forger (skill-forge, forger cannot grade its own forge) picks it up + validates via a\n` +
        `   DIFFERENT incarnation. Check the box when actioned.\\n").\n` +
        `2. Get the timestamp from the system clock: TS=$(date -u +%Y-%m-%dT%H:%M:%SZ) (the only shell cmd here).\n` +
        `3. Write the file back = prior content VERBATIM + a dated H2 (## <TS>) + ONE checkbox line per\n` +
        `   queue_route appended at the end (substitute each route's organ/target/why — plain JSON strings):\n` +
        `     - [ ] **<organ>** (born-provisional · session ${sessionLabel}) → target: <target> — <why>\n` +
        `4. Confirm: report the file's byte size (\`wc -c < data/reports/hum-repair-queue.md\`) + count the flag\n` +
        `   lines you just added (set queue_flags to that count).\n`
      : `\n=== (B) queue-flags — none this cycle (skip) ===\n`) +
    `\nFAIL-LOUD: if any append did not land (byte size unchanged / marker absent), say so plainly in 'note'\n` +
    `(a green checkmark that lies is the kindest possible rot). Set repairs_fired to the TOTAL repairs that\n` +
    `actually landed (wwcw rules appended + queue flags filed). Return ONLY the tight JSON.`,
    {
      label: 'hum-repair', phase: 'Repair', model: 'claude-opus-4-8',
      schema: {
        type: 'object', additionalProperties: false, properties: {
          wwcw_appended: { type: 'boolean' },
          queue_flags: { type: 'integer' },
          repairs_fired: { type: 'integer' },
          note: { type: 'string', maxLength: 240 },
        }, required: ['repairs_fired'],
      },
    }
  ) || repairResult
}

const repairsFired = (repairResult && typeof repairResult.repairs_fired === 'number') ? repairResult.repairs_fired : 0

// ---------------------------------------------------------------------------
// PHASE 4 — COMPOUND. Append ONE HUM LEDGER entry (the trend the organism watches itself
// heal by) + §18 memory-emit ONE canon_append to mind-lead (memory-substrate + KPI owner).
// A second DISTINCT incarnation writes the ledger + emits canon — keeps the grader's verdict
// the single source of truth and the writer's job purely mechanical.
// ---------------------------------------------------------------------------
phase('Compound')

// The canon item IS the health-trend verdict: per-verb scores + route counts + the KPI
// (live/queued split). This is the "organism watches itself heal" leg — the trend lands
// in mind-lead's canon (the memory-substrate + KPI owner), not just the local ledger.
const canonItem =
  `HUM verdict ${v.verdict} (score ${humScore.score}/1000) on session ${v.session_id || '(newest)'} — dims: ${dimLine}; ` +
  `${routesForLedger.length} repair-route(s) [${liveCount} live → ${repairsFired} FIRED / ${queuedCount} queued]`
const canonRationale =
  `Immune-system Stage-2 health-trend grade of the cycle's self-operation (4 verbs ` +
  `KNOW/DECIDE/LEARN/VERIFY + CEO-routing + honesty), auditor-isolated (different incarnation, ` +
  `not the session author). SCORE ${humScore.score}/1000 (raw ${humScore.raw}; band ${humScore.derived_band}; ` +
  `subtotals verbs=${humScore.subtotals.verbs} gr=${humScore.subtotals.grounding_receipt} ` +
  `process=${humScore.subtotals.process} cross=${humScore.subtotals.cross_checks} ` +
  `hardpen=${humScore.subtotals.hard_penalty} bonus=${humScore.subtotals.bonus}). KPI: ${repairsFired} ` +
  `live-repairs-FIRED / ${queuedCount} queued. Trend: ${(v.trend_note || '').slice(0, 100)}`

// v1.0 TDZ FIX (mind-lead 2026-06-20): CHECKLIST_DOC_PATH (and its sid8/winFrom/winTo deps) MUST be
// declared BEFORE their first use at the `checklist_doc:` ledger line below — they were originally declared
// ~30 lines lower (a Temporal-Dead-Zone runtime crash: "Cannot access 'CHECKLIST_DOC_PATH' before
// initialization"). node --check PASSES on a TDZ (it is runtime, not parse) — which is exactly why two
// piece-wise audits missed it; only a completing end-to-end fire surfaced it. Deps used here:
// HUM_CHECKLISTS_DIR (line ~360 module-level), v (line ~837), clampStr/clampInt (lines ~366/367) — all
// declared above this point, so no new TDZ is introduced onto a dependency.
const sid8 = clampStr((v && v.session_id ? String(v.session_id) : 'newest').replace(/[^\w.-]/g, '_'), 8) || 'newest'
const winFrom = clampInt(v && v.turn_window && v.turn_window.from)
const winTo = clampInt(v && v.turn_window && v.turn_window.to)
const CHECKLIST_DOC_PATH = `${HUM_CHECKLISTS_DIR}/hum-checklist-${sid8}-${winFrom}-${winTo}.md`

// Build the ledger block + canon item/rationale as plain JS strings (NO Buffer/base64 — sandbox-forbidden, §9).
// They are handed to the writer agent as JSON-carried values; the agent writes each to a temp file via a
// quoted heredoc (zero shell-interpolation hazard) then feeds the files to canon_append. Same proven shape
// as the env-var canon_append pattern every working memory-emit phase uses.
const ledgerBlock =
  `<UTC_TS_LINE>` +
  `- session: ${v.session_id || '(newest)'} (${v.turns_scanned || '?'} turns scanned)\n` +
  `- 🔢 score: ${humScore.score}/1000 (raw ${humScore.raw}; band ${humScore.derived_band}${scoreBandAgrees ? '' : ' ⚠️ DISAGREES with verdict — verdict kept as truth'})\n` +
  `- 🔢 score_subtotals: verbs=${humScore.subtotals.verbs} grounding-receipt=${humScore.subtotals.grounding_receipt} process=${humScore.subtotals.process} cross-checks=${humScore.subtotals.cross_checks} hard-penalty=${humScore.subtotals.hard_penalty} bonus=${humScore.subtotals.bonus}\n` +
  `- 🔢 score_matrix: ${scoreBreakdownLine}\n` +
  `- dimensions: ${dimLine}\n` +
  `- hard_flags: ${(Array.isArray(v.hard_flags) ? v.hard_flags : []).join(', ') || '(none)'}\n` +
  `- routes (${routesForLedger.length}; ${liveCount} live / ${queuedCount} queued; ${repairsFired} FIRED this run):\n` +
  routesForLedger.map(r => `    - [${r && r.live ? 'LIVE-FIRED' : 'QUEUED'}] ${r ? r.organ : '?'} → ${r && r.target ? r.target : '(no target)'} — ${r ? (r.why || '').slice(0, 160) : ''}`).join('\n') +
  (routesForLedger.length ? '\n' : '    - (no confirmed defects this cycle)\n') +
  `- repair: ${repairsFired} live repair(s) fired this run (born-provisional, reversible)${repairResult && repairResult.note ? ' — ' + String(repairResult.note).slice(0, 120) : ''}\n` +
  `- aidoc_readiness: ai-doc claimed ${aidocReadiness.aidoc_claimed} HOLLOW vs TGIM task_failed ${aidocReadiness.tgim_actual} → agree=${aidocReadiness.agree}${aidocReadiness.agree === false ? ' (BLIND-SPOT — routed to hermes-infra)' : ''}\n` +
  `- project_folder_compliance: ${projectFolderCompliance.folders_touched} folder(s) touched / ${projectFolderCompliance.devlogs_updated} devlogged → compliant=${projectFolderCompliance.compliant}${projectFolderCompliance.compliant === false ? ' (LIVING-MASTER DRIFT — routed to touching lead/mind-lead)' : ''}\n` +
  `- doc_currency: ${docCurrencyResult.surfaces_stale}/${docCurrencyResult.surfaces_checked} living doc(s) stale → current=${docCurrencyResult.current}${docCurrencyResult.current === false ? ' (DOC-STALENESS — keep-worthy work landed, WORKBOARD/devlog stale by on-disk mtime — routed to mind-lead)' : ''}\n` +
  `- grounding_receipt: ${groundingReceipt.grounding_invoked ? 'grounding INVOKED' : 'no grounding invoked'} → floor_read_received=${groundingReceipt.floor_read_received} / haiku_receipt=${groundingReceipt.haiku_receipt} (${groundingReceipt.fresh_haikus} fresh haiku across ${groundingReceipt.distinct_docs} doc(s))${(groundingReceipt.floor_read_received === false || groundingReceipt.haiku_receipt === false) ? ' (FLOOR CLAIMED-NOT-RECEIVED — routed to fleet-lead)' : ''}\n` +
  `- block_no_wwcw: block_present=${blockNoWwcw.block_present} / wwcw_run_evidence=${blockNoWwcw.wwcw_run_evidence}${blockNoWwcw.failed ? ` → 🚨 HARD-FAIL at turn ${blockNoWwcw.block_turn} (a BLOCK with NO WWCW run — DECIDE+verdict FORCED HOLLOW; the boop FAILED per Corey 2026-06-20)` : ' → no hard-fail (no block, or WWCW was run)'}\n` +
  `- grounding_completeness: did_grounding_work=${groundingCompleteness.did_grounding_work} / per_doc_haikus=${groundingCompleteness.per_doc_haikus}${groundingCompleteness.failed ? ` → 🚨 HARD-FAIL — INCOMPLETE grounding boop, missing: ${groundingCompleteness.missing.join(', ') || '?'} (GROUNDING-RECEIPT+KNOW+verdict FORCED HOLLOW; miss one doc/haiku/step = 100% fail per Corey 2026-06-20)` : ' → no hard-fail (complete, not a grounding boop, or could-not-verify)'}\n` +
  `- find_the_miss: found=${findTheMiss.found} surface=${findTheMiss.surface} walked=${findTheMiss.walked} — ${(findTheMiss.found ? findTheMiss.miss : findTheMiss.hunt_note).slice(0, 200)}\n` +
  `- self_evolution_feedback (${selfEvolutionFeedback.aligns_to}): ${selfEvolutionFeedback.growth_edge.slice(0, 200)}\n` +
  `- checklist_doc: ${CHECKLIST_DOC_PATH} (checklist_filled=${checklistFilled}; saved EVERY boop)\n` +
  `- trend: ${(v.trend_note || '').slice(0, 200)}\n`
const canonItemTrim = canonItem.slice(0, 200)
const canonRationaleTrim = canonRationale.slice(0, 400)
// Hardening (c): the canon-rationale LENGTH is computed here and echoed through VERIFY so a SILENT
// truncation by the canon_append gate becomes VISIBLE (the row-count grep catches a MISSING row, not
// a TRUNCATED one). The compound writer measures the landed rationale and compares to this expected len.
const canonRationaleExpectedLen = canonRationaleTrim.length
// The header line is kept SEPARATE from the body so the agent can stamp the real $TS into it without sed
// over the whole (potentially special-char-bearing) block.
const ledgerBody = ledgerBlock.replace('<UTC_TS_LINE>', '')

// v0.2 CURSOR WRITE-BACK values: after COMPOUND succeeds, persist this session's high-water turn idx
// so the NEXT fire scans only what comes after. The new cursor = the session's current MAX idx, which
// the grader returned as turn_window.to (preferred) or derives from session_total_turns-1. session_id
// is the grader's resolved id (the cursor key). Fall back safely if the grader omitted them.
const cursorSessionId = (v && typeof v.session_id === 'string' && v.session_id) ? v.session_id : null
const cursorNewMax = (v && v.turn_window && Number.isFinite(Number(v.turn_window.to)))
  ? Math.trunc(Number(v.turn_window.to))
  : (v && Number.isFinite(Number(v.session_total_turns)) ? Math.trunc(Number(v.session_total_turns)) - 1 : null)

// ---------------------------------------------------------------------------
// v1.0 CHECKLIST-SAVE (mind-lead 2026-06-20): the COMPLETED per-boop checklist doc is SAVED to disk
// EVERY boop (deterministic — the design's hard contract; the det-check CHECKLIST-SAVED flags a HUM fire
// that left none). Path pattern: hum-checklists/hum-checklist-<sid8>-<from>-<to>.md (sid8=first 8 of
// session_id; from/to=graded turn window). We build BOTH the path + the full markdown body here (pure JS,
// sandbox-safe — no Node globals, no fs) and hand them to the COMPOUND writer to Write verbatim. The body
// is the filled checklist: the 10 template elements populated from the grader's sanitized return.
// NOTE (v1.0 TDZ FIX 2026-06-20): sid8 / winFrom / winTo / CHECKLIST_DOC_PATH are now declared ~50 lines
// ABOVE (just before `const ledgerBlock =`) because the ledger's `checklist_doc:` line uses CHECKLIST_DOC_PATH
// before this point. Declaring them here caused a TDZ runtime crash on the first real end-to-end fire.
// The checklist body — filled from the grader's verdict. <UTC_TS_LINE> is stamped by the writer (no Date
// in the sandbox body). PII-safe: only the grader's already-sanitized fields + mechanical counts.
const checklistDocBody =
  `# HUM per-boop checklist — session ${v.session_id || '(newest)'} · turns ${winFrom}→${winTo}\n` +
  `\n> Saved EVERY boop (deterministic) by workflows/hum.js COMPOUND. Mission: HUM-MISSION.md (both missions).\n` +
  `> Template: HUM-CHECKLIST-TEMPLATE.md. Canon: 537a1652dbab4d5fb6fdc37592059dbf.\n` +
  `\n## 1. Identity + both-missions reload\n` +
  `- HUM-MISSION.md read this fire (MISSION 1 immune-system find-the-miss + MISSION 2 self-evolution). checklist_filled=${checklistFilled}\n` +
  `- Auditor-isolation: a DIFFERENT incarnation than the session author (built into hum.js JUDGE).\n` +
  `\n## 2. Cycle frame\n` +
  `- session_id: ${v.session_id || '(newest)'} · turn_window: {from:${winFrom}, to:${winTo}} · fire_ts: <UTC_TS_LINE>\n` +
  `- turns_scanned (NEW this fire): ${v.turns_scanned || '?'}\n` +
  `\n## 3. Stage-1 deterministic findings digest\n` +
  `- hard_flags: ${(Array.isArray(v.hard_flags) ? v.hard_flags : []).join(', ') || '(none)'}\n` +
  `- trend: ${(v.trend_note || '').slice(0, 200)}\n` +
  `\n## 4. Dimension grades\n` +
  `- ${dimLine}\n` +
  ((Array.isArray(v.dimension_notes) ? v.dimension_notes : []).slice(0, 7)
    .map(n => `  - ${clampStr(n && n.verb ? n.verb : '?', 16)}: ${clampStr(n && n.note ? n.note : '', 240)}`).join('\n') || '  - (no dimension notes)') + `\n` +
  `\n## 5. Hard-gate status (verdict-failing)\n` +
  `- BLOCK-NO-WWCW: failed=${blockNoWwcw.failed} (block_present=${blockNoWwcw.block_present}, wwcw_run_evidence=${blockNoWwcw.wwcw_run_evidence}, block_turn=${blockNoWwcw.block_turn})\n` +
  `- GROUNDING-COMPLETENESS: failed=${groundingCompleteness.failed} (did_grounding_work=${groundingCompleteness.did_grounding_work}, per_doc_haikus=${groundingCompleteness.per_doc_haikus}, missing=[${groundingCompleteness.missing.join(', ')}])\n` +
  `- GROUNDING-RECEIPT: floor_read_received=${groundingReceipt.floor_read_received} · haiku_receipt=${groundingReceipt.haiku_receipt}\n` +
  `\n## 6. THE FIND-THE-MISS hunt (the immune-system mandate — ≥1 genuine miss, self-walked)\n` +
  `- found: ${findTheMiss.found} · surface: ${findTheMiss.surface} · walked: ${findTheMiss.walked}\n` +
  `- miss: ${findTheMiss.miss || '(none — see hunt note)'}\n` +
  `- walk_evidence (SELF-WALK GATE — the glob/test run + result; required for any found=true): ${findTheMiss.walk_evidence || '(n/a — found=false or dropped as walk-failure)'}\n` +
  `- hunt_note: ${findTheMiss.hunt_note}\n` +
  `\n## 7. Constructive self-evolution feedback (aligned to Primary's mission)\n` +
  `- aligns_to: ${selfEvolutionFeedback.aligns_to}\n` +
  `- growth_edge: ${selfEvolutionFeedback.growth_edge}\n` +
  `\n## 8. Routes to owning repair organ\n` +
  (routesForLedger.length
    ? routesForLedger.map(r => `- [${r && r.live ? 'LIVE' : 'QUEUED'}] ${r ? r.organ : '?'} → ${r && r.target ? clampStr(r.target, 120) : '(no target)'} — ${r ? clampStr(r.why || '', 160) : ''}`).join('\n')
    : '- (no confirmed defects this cycle)') + `\n` +
  `\n## 9. Verdict + reconciliation\n` +
  `- VERDICT: ${v.verdict}\n` +
  `- 🔢 SCORE: ${humScore.score}/1000 (raw ${humScore.raw}; derived band ${humScore.derived_band}${scoreBandAgrees ? ' = verdict ✓' : ' ⚠️ DISAGREES — verdict kept as truth'})\n` +
  `- 🔢 score subtotals: verbs=${humScore.subtotals.verbs} · grounding-receipt=${humScore.subtotals.grounding_receipt} · process=${humScore.subtotals.process} · cross-checks=${humScore.subtotals.cross_checks} · hard-penalty=${humScore.subtotals.hard_penalty} · bonus=${humScore.subtotals.bonus}\n` +
  `- 🔢 score matrix (per-check points — training data): ${scoreBreakdownLine}\n` +
  `- reconciliation: find-the-miss is COACHING — it did NOT alter the verdict unless it uncovered a real hard-gate violation. Verdict = hard gates + dimension grades only. The SCORE is an ADDITIVE projection of the SAME signals (it never overrides the verdict).\n` +
  `\n## 10. Provenance\n` +
  `- saved-path: ${CHECKLIST_DOC_PATH} · ledger: ${HUM_LEDGER} · canon-id: 537a1652dbab4d5fb6fdc37592059dbf\n`

const compoundResult = await agent(
  `You are the HUM COMPOUND writer (mechanical). WORK FROM: ${ROOT}.\n` +
  `Your FOUR duties are EQUALLY mandatory — the ledger, the canon_append, the cursor write-back, AND the\n` +
  `per-boop CHECKLIST DOC SAVE (the deterministic save the design's CHECKLIST-SAVED det-check enforces). A\n` +
  `prior HUM v0.1 fire wrote the ledger but the canon_append SILENTLY DID NOT LAND (0 'HUM verdict' rows\n` +
  `in canon) — that is the exact bug you are wired to never repeat. The canon_append is the 'organism\n` +
  `watches itself heal' leg: WITHOUT it, mind-lead never sees the health-trend and the immune loop is open.\n` +
  `Treat it as the PRIMARY duty, not an afterthought.\n` +
  `\n🔒 HARDENING — WRITE-TOOL-ONLY (v0.2): do NOT use heredocs / 'cat >' to create the temp files or to\n` +
  `append to the ledger. Use your Write tool to create the temp files VERBATIM from the JSON values below,\n` +
  `and the Read-then-Write pattern for the ledger append (Read the ledger, Write back its prior content\n` +
  `VERBATIM + the new H2 + body at the END). The ONLY shell commands you run are: 'date' (timestamp),\n` +
  `'python3 tools/canon_append.py …', 'wc -c', 'grep -c', and 'wc -m' for the length check. No file content\n` +
  `is ever produced by a heredoc/printf-of-content.\n` +
  `\nPAYLOADS (JSON — paste each VERBATIM via the Write tool, never inline into a shell command):\n` +
  `  LEDGER_BODY  = ${JSON.stringify(ledgerBody)}\n` +
  `  CANON_ITEM   = ${JSON.stringify(canonItemTrim)}\n` +
  `  CANON_RATIO  = ${JSON.stringify(canonRationaleTrim)}\n` +
  `  CANON_RATIO_EXPECTED_LEN = ${canonRationaleExpectedLen}  (chars; for the truncation-visibility check)\n` +
  `  CHECKLIST_DOC_PATH = ${JSON.stringify(CHECKLIST_DOC_PATH)}\n` +
  `  CHECKLIST_DOC_BODY = ${JSON.stringify(checklistDocBody)}\n` +
  `\n=== (1) APPEND ONE HUM LEDGER ENTRY to TODAY's DAILY-ROTATED day-file (Read-then-Write, no heredoc) ===\n` +
  `🗓️ DAILY ROTATION (mind-lead 2026-06-21, Corey directive): the flat 1004-line hum-ledger.md was rotated\n` +
  `into a file-PER-DAY (mirroring .claude/scratchpad-daily/). You append to TODAY's day-file, which you\n` +
  `RESOLVE first — do NOT append to the legacy flat ${HUM_LEDGER} (that is now a pointer stub).\n` +
  `Step 1a — get the real UTC timestamp:  TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)\n` +
  `Step 1-RESOLVE — resolve+ensure TODAY's day-file path (this command BOTH creates the file if missing\n` +
  `   AND prints its absolute path on stdout — it is idempotent + safe):\n` +
  `     cd ${ROOT} && DAY_LEDGER=$(${DAY_LEDGER_RESOLVE_CMD} | tail -1) ; echo "DAY_LEDGER=$DAY_LEDGER"\n` +
  `   Capture $DAY_LEDGER (an absolute path ending in hum-ledger-daily/YYYY-MM-DD.md). It already has its\n` +
  `   grok-header H1 + a "## Verdicts (this day)" section. Append-only; never rewrite prior entries.\n` +
  `   If $DAY_LEDGER is empty for any reason, FALL BACK to ${HUM_LEDGER} (fail-loud — note it) so a verdict\n` +
  `   ALWAYS lands somewhere; never drop the ledger write.\n` +
  `Step 1b — Read $DAY_LEDGER. Then Write it back = the prior content VERBATIM, followed at the very END\n` +
  `   by this H2 header line and the LEDGER_BODY (verbatim from the JSON above):\n` +
  `     ## <TS> — verdict: ${v.verdict}\n` +
  `     <LEDGER_BODY here, verbatim>\n` +
  `Step 1c — confirm: report the file's new byte size (\`wc -c < "$DAY_LEDGER"\`) AND report the resolved\n` +
  `   day-file path back as ledger_path (so the firewall + return record WHERE the verdict landed).\n` +
  `\n=== (2) §18 MEMORY-EMIT ONE canon_append TO mind-lead (THE HEALTH-TREND — primary duty) ===\n` +
  `Use your Write tool to create /tmp/hum_item.txt = CANON_ITEM (verbatim) and /tmp/hum_rationale.txt =\n` +
  `CANON_RATIO (verbatim). Then feed them by file (use the SAME resolved $DAY_LEDGER as the receipt path —\n` +
  `the verdict landed THERE this cycle):\n` +
  `     cd ${ROOT} && python3 tools/canon_append.py --lead mind-lead --kind finding \\\n` +
  `       --item "$(cat /tmp/hum_item.txt)" --rationale "$(cat /tmp/hum_rationale.txt)" \\\n` +
  `       --receipt-path "$DAY_LEDGER" ; echo "CANON_EXIT=$?"\n` +
  `Capture the printed CANON_EXIT code. Meaning: 0 = landed; 2 = circuit-breaker (e.g. rate-limit /\n` +
  `max-3-per-300s / content-gate) — LOG it, do NOT fail the workflow; any other non-zero = real error, LOG it.\n` +
  `Step 2-VERIFY-ROW (trust the WALK, not the claim — a self-reported 'I appended' is just a 200): confirm the\n` +
  `row actually landed by shelling:\n` +
  `  grep -c "HUM verdict" mem/canon/mind-lead/log.jsonl\n` +
  `Report that count as canon_rows_after. If CANON_EXIT=0 but the count did not increase, say so plainly\n` +
  `in 'note' (fail-loud over silent-success — a green checkmark that lies is the kindest possible rot).\n` +
  `Step 2-VERIFY-LEN (hardening c — truncation must be VISIBLE; the row-count catches a MISSING row, NOT a\n` +
  `   TRUNCATED rationale): read the LANDED rationale length back from the canon log's last HUM row and\n` +
  `   compare to CANON_RATIO_EXPECTED_LEN (${canonRationaleExpectedLen}). One robust way:\n` +
  `     python3 -c "import json,sys; rows=[json.loads(l) for l in open('mem/canon/mind-lead/log.jsonl') if l.strip()]; hum=[r for r in rows if 'HUM verdict' in (r.get('item') or '')]; print(len((hum[-1].get('rationale') or '')) if hum else -1)"\n` +
  `   Report that number as canon_rationale_len. If it is SHORTER than ${canonRationaleExpectedLen}, the gate\n` +
  `   TRUNCATED the rationale — say so plainly in 'note' (do NOT silently pass; truncation loses health-trend\n` +
  `   detail). If the field name differs in your log shape, report the closest landed-rationale length you can\n` +
  `   read and note the shape; -1 means 'could not read a landed HUM row'.\n` +
  `\n=== (4) 🚨 SAVE THE COMPLETED PER-BOOP CHECKLIST DOC (deterministic — EVERY boop, no skip) ===\n` +
  `This is the mind-lead 2026-06-20 hard contract: the COMPLETED HUM checklist is SAVED to disk EVERY boop.\n` +
  `The deterministic CHECKLIST-SAVED det-check in session_review.py FLAGS a HUM fire that left no saved doc.\n` +
  `Step 4a — get the real UTC timestamp (reuse TS from step 1a, or: TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)).\n` +
  `Step 4b — take CHECKLIST_DOC_BODY (the JSON value above), substitute EVERY occurrence of the literal\n` +
  `   token <UTC_TS_LINE> with $TS (there are two: the header fire_ts + the cycle-frame line). Use your\n` +
  `   Write tool to write the resulting markdown VERBATIM to CHECKLIST_DOC_PATH (= ${CHECKLIST_DOC_PATH}).\n` +
  `   The directory ${HUM_CHECKLISTS_DIR} already exists; Write creates the file.\n` +
  `Step 4c — confirm it landed (trust the WALK): \`wc -c < ${CHECKLIST_DOC_PATH}\` (>0) AND\n` +
  `   \`test -f ${CHECKLIST_DOC_PATH} && echo SAVED\`. Set checklist_doc_saved=true ONLY if the file exists\n` +
  `   and is non-empty; report checklist_doc_path=${JSON.stringify(CHECKLIST_DOC_PATH)}. If the Write did\n` +
  `   not land, say so plainly in 'note' (fail-loud — a green checkmark that lies is the kindest rot).\n` +
  (cursorSessionId && cursorNewMax !== null && cursorNewMax >= 0
    ? `\n=== (3) v0.2 CURSOR WRITE-BACK (after the ledger + canon land) ===\n` +
      `Persist the high-water turn idx so the NEXT HUM fire scans only NEW turns. Use Read-then-Write (no\n` +
      `heredoc): Read ${HUM_CURSOR} if it exists (else start from {}). Parse it as a JSON object\n` +
      `{ "<session_id>": <int>, ... }. Set the key ${JSON.stringify(cursorSessionId)} to the integer\n` +
      `${cursorNewMax} (this session's current MAX turn idx). Keep ALL other existing keys unchanged. Write\n` +
      `the updated JSON back to ${HUM_CURSOR} (pretty or compact — valid JSON only). Confirm by reading it\n` +
      `back and reporting cursor_written=true + cursor_value=${cursorNewMax}. If you cannot parse the prior\n` +
      `cursor, do NOT discard other sessions' entries silently — note it and write a fresh object with just\n` +
      `this key (fail-loud).\n`
    : `\n=== (3) v0.2 CURSOR WRITE-BACK — SKIPPED (grader returned no usable session_id/max-turn this run; set cursor_written=false + note why) ===\n`) +
  `\nReturn ONLY the tight JSON summary.`,
  {
    label: 'hum-compound', phase: 'Compound', model: 'claude-opus-4-8',
    schema: {
      type: 'object', additionalProperties: false, properties: {
        ledger_appended: { type: 'boolean' },
        ledger_bytes: { type: 'integer' },
        canon_exit_code: { type: 'integer' },
        canon_appended: { type: 'boolean' },
        canon_rows_after: { type: 'integer' },
        canon_rationale_len: { type: 'integer' },
        cursor_written: { type: 'boolean' },
        cursor_value: { type: 'integer' },
        checklist_doc_saved: { type: 'boolean' },
        checklist_doc_path: { type: 'string', maxLength: 200 },
        ledger_path: { type: 'string', maxLength: 200 },
        canon_stderr_tail: { type: 'string', maxLength: 300 },
        note: { type: 'string', maxLength: 240 },
      }, required: ['ledger_appended', 'canon_appended', 'checklist_doc_saved'],
    },
  }
)

// FIREWALL RETURN — ONLY the digested verdict bubbles to the CEO. ≤2KB.
// HARDENING (b): every field is built through a fixed-shape, length-clamped builder so a malformed
// grader/repair/compound value can NEVER bubble un-capped to the CEO (the one lethal act). The return
// is then schema-validated against FIREWALL_SCHEMA before it leaves; on any mismatch we degrade to a
// HOLLOW fail-loud shape rather than ship a malformed object.
const GRADE_ENUM = ['PASS', 'PARTIAL', 'HOLLOW']
const cr = (compoundResult && typeof compoundResult === 'object') ? compoundResult : {}

const firewall = {
  hum_verdict: GRADE_ENUM.includes(v.verdict) ? v.verdict : 'HOLLOW',
  // 🔢 NUMERICAL SCORE + MATRIX BREAKDOWN (mind-lead 2026-06-21). humScore was computed ABOVE (right after
  // the three deterministic hard-fails fired, so `dims` already carries any forced HOLLOWs). hum_score =
  // clamped [-500..+1000]; hum_score_raw = un-clamped (training data sees the true depth/height); score_band
  // = the band DERIVED from the score (back-compat: should equal hum_verdict; on disagreement v.verdict is
  // kept as truth); score_breakdown = the per-check point contributions (the matrix — the rich training signal).
  // NOTE: humScore.breakdown['checklist-saved'] uses checklistFilled as the (deterministic) proxy for the
  // saved-doc; the firewall ALSO carries cr.checklist_doc_saved separately as the actual on-disk receipt.
  hum_score: clampInt(humScore.score),
  hum_score_raw: clampInt(humScore.raw),
  score_band: clampStr(humScore.derived_band, 10),
  score_band_agrees: humScore.derived_band === v.verdict,
  score_subtotals: {
    verbs: clampInt(humScore.subtotals.verbs),
    grounding_receipt: clampInt(humScore.subtotals.grounding_receipt),
    process: clampInt(humScore.subtotals.process),
    cross_checks: clampInt(humScore.subtotals.cross_checks),
    hard_penalty: clampInt(humScore.subtotals.hard_penalty),
    bonus: clampInt(humScore.subtotals.bonus),
  },
  score_breakdown: humScore.breakdown,
  session_id: clampStr(v.session_id || '(newest)', 80),
  turn_window: {
    from: clampInt(v.turn_window && v.turn_window.from),
    to: clampInt(v.turn_window && v.turn_window.to),
  },
  dimensions: ['KNOW', 'DECIDE', 'LEARN', 'VERIFY', 'CEO-ROUTING', 'HONESTY', 'GROUNDING-RECEIPT'].reduce((acc, k) => {
    acc[k] = GRADE_ENUM.includes(dims[k]) ? dims[k] : '?'
    return acc
  }, {}),
  routes: routesForLedger.slice(0, 8).map(r => ({
    organ: clampStr(r ? r.organ : '?', 40),
    live: !!(r && r.live),
    target: clampStr(r && r.target ? r.target : '', 120),
  })),
  live_routes: clampInt(liveCount),
  queued_routes: clampInt(queuedCount),
  repairs_fired: clampInt(repairsFired),
  repair_note: clampStr(repairResult && repairResult.note ? repairResult.note : '', 160),
  trend_note: clampStr(v.trend_note || '', 200),
  // v0.3 readiness-ping: the ai-doc⇄TGIM reconciliation result. agree is tri-state (true/false/null);
  // a false means ai-doc claimed clean while TGIM showed task_failed (the caught blind spot).
  aidoc_readiness: {
    aidoc_claimed: clampInt(aidocReadiness.aidoc_claimed),
    tgim_actual: clampInt(aidocReadiness.tgim_actual),
    agree: aidocReadiness.agree,
  },
  // v0.4 project-folder devlog-compliance: did the cycle touch projects/<x>/ without updating that
  // project's living-master? compliant is tri-state (true/false/null); false = a touched-but-undevlogged
  // project (living-master drift) that was routed to the touching lead / mind-lead.
  project_folder_compliance: {
    folders_touched: clampInt(projectFolderCompliance.folders_touched),
    devlogs_updated: clampInt(projectFolderCompliance.devlogs_updated),
    compliant: projectFolderCompliance.compliant,
  },
  // v0.5 DOC-CURRENCY: the DOC-UP-TO-DATE mandate (Corey directive — keep the living docs current by
  // RECEIPT, not claim). Did keep-worthy work land this cycle while the WORKBOARD / program-home
  // devlogs went stale by their on-disk mtime? current is tri-state (true/false/null); false = >=1
  // stale living doc while keep-worthy work landed (the doc-staleness a human else has to catch) —
  // routed to mind-lead (WORKBOARD + doc-staleness mandate owner).
  doc_currency: {
    surfaces_checked: clampInt(docCurrencyResult.surfaces_checked),
    surfaces_stale: clampInt(docCurrencyResult.surfaces_stale),
    current: docCurrencyResult.current,
  },
  // v1.4 GROUNDING-RECEIPT: the ACTUAL-RECEIPT of the grounding floor (Corey directive — confirm the
  // floor HAPPENED ON DISK, not a self-report). floor_read_received / haiku_receipt are tri-state
  // (true/false/null); false = invoked-but-no-artifact (the shallow/skipped grounding a human else catches).
  // Reads the SAME hoisted `groundingReceipt` const the ledger used (single source of truth).
  grounding_receipt: {
    grounding_invoked: groundingReceipt.grounding_invoked,
    floor_read_received: groundingReceipt.floor_read_received,
    haiku_receipt: groundingReceipt.haiku_receipt,
    fresh_haikus: clampInt(groundingReceipt.fresh_haikus),
    distinct_docs: clampInt(groundingReceipt.distinct_docs),
  },
  // v0.7 BLOCK-NO-WWCW: the ONE HARD-FAIL DECIDE signal (Corey 2026-06-20 — a BLOCK with no WWCW-run
  // evidence FAILS the boop). failed=true means a park/hold/present-for-Corey was present in-window AND
  // the window held ZERO WWCW-run footprint → DECIDE + verdict were deterministically forced HOLLOW above.
  block_no_wwcw: {
    block_present: blockNoWwcw.block_present,
    wwcw_run_evidence: blockNoWwcw.wwcw_run_evidence,
    failed: blockNoWwcw.failed,
    block_turn: clampInt(blockNoWwcw.block_turn),
  },
  // v0.9 GROUNDING-COMPLETENESS: the COMPLETE-OR-FAIL gate (Corey 2026-06-20 — "miss one doc or one
  // haiku or one step it's 100% fail on that boop"). failed=true means a substantive grounding boop
  // was MISSING ≥1 required element → GROUNDING-RECEIPT + KNOW + verdict were deterministically forced
  // HOLLOW above. missing = the enumerated absent elements. Reads the SAME hoisted const the ledger used.
  grounding_completeness: {
    did_grounding_work: groundingCompleteness.did_grounding_work,
    failed: groundingCompleteness.failed,
    per_doc_haikus: clampInt(groundingCompleteness.per_doc_haikus),
    missing: groundingCompleteness.missing,
  },
  // v4.4 ACT-ON-FLAGGED (the NOTICE-DON'T-ACT enforcement, fleet-lead 2026-06-22, Corey-directed GO).
  // JUDGE-CONFIRMED: EITHER bool true means the JUDGE WALKED the window + confirmed the mind NOTICED
  // (a stale civ doc after keep-worthy work, OR a sweep self-reporting NOT-CLEAN) but DID NOT ACT/RECONCILE
  // → DECIDE + HONESTY + verdict were forced HOLLOW above. failed bubbles the combined signal to the CEO.
  act_on_flagged: {
    doc_stale_no_reconcile: actOnFlagged.doc_stale_no_reconcile === true,
    sweep_notice_dont_act: actOnFlagged.sweep_notice_dont_act === true,
    failed: actOnFlaggedFail,
  },
  // v1.0 FIND-THE-MISS (the immune-system mandate, mind-lead 2026-06-20). ≥1 genuine miss EVERY boop,
  // walked. COACHING — bubbles to the CEO but did NOT break the verdict unless the miss IS a hard-gate
  // violation (verdict comes from the hard gates above). found=false only after a documented hunt.
  find_the_miss: {
    found: findTheMiss.found,
    surface: clampStr(findTheMiss.surface, 40),
    miss: clampStr(findTheMiss.miss, 240),
    walked: findTheMiss.walked,
    walk_evidence: clampStr(findTheMiss.walk_evidence, 200),
    hunt_note: clampStr(findTheMiss.hunt_note, 240),
  },
  // v1.0 SELF-EVOLUTION FEEDBACK (≥1 constructive coaching note EVERY boop, mind-lead 2026-06-20).
  self_evolution_feedback: {
    growth_edge: clampStr(selfEvolutionFeedback.growth_edge, 240),
    aligns_to: clampStr(selfEvolutionFeedback.aligns_to, 24),
  },
  // v1.0 CHECKLIST DOC (saved EVERY boop, deterministic, mind-lead 2026-06-20). checklist_filled = the
  // grader ran the full template; checklist_doc_saved = the COMPOUND writer wrote it to disk this fire;
  // checklist_doc_path = where (returned in the firewall + ledgered).
  checklist_filled: checklistFilled,
  checklist_doc_saved: !!cr.checklist_doc_saved,
  checklist_doc_path: clampStr(cr.checklist_doc_path || CHECKLIST_DOC_PATH, 200),
  canon_appended: !!cr.canon_appended,
  canon_rationale_len: clampInt(cr.canon_rationale_len),
  cursor_written: !!cr.cursor_written,
  cursor_value: clampInt(cr.cursor_value),
  // DAILY ROTATION (2026-06-21): record WHERE the verdict actually landed — TODAY's day-file the
  // COMPOUND writer resolved (cr.ledger_path), falling back to the legacy flat pointer if the writer
  // did not report one. This is the grok-surface receipt: the CEO sees the day-file, not a stale path.
  ledger: clampStr(cr.ledger_path || HUM_LEDGER, 200),
}

// Minimal in-script schema validator (sandbox-safe; no ajv). Checks the fixed firewall shape:
// required keys present + primitive types + enum/length bounds. Returns [] if valid, else reasons.
const FIREWALL_SCHEMA = {
  hum_verdict: { type: 'enum', values: GRADE_ENUM },
  // 🔢 numerical score layer (mind-lead 2026-06-21) — additive; validated like the rest of the firewall.
  hum_score: { type: 'number' },
  hum_score_raw: { type: 'number' },
  score_band: { type: 'enum', values: GRADE_ENUM },
  score_band_agrees: { type: 'boolean' },
  score_subtotals: { type: 'object' },
  score_breakdown: { type: 'object' },
  session_id: { type: 'string', max: 80 },
  turn_window: { type: 'object' },
  dimensions: { type: 'object' },
  routes: { type: 'array', max: 8 },
  live_routes: { type: 'number' }, queued_routes: { type: 'number' }, repairs_fired: { type: 'number' },
  repair_note: { type: 'string', max: 160 }, trend_note: { type: 'string', max: 200 },
  canon_appended: { type: 'boolean' }, canon_rationale_len: { type: 'number' },
  cursor_written: { type: 'boolean' }, cursor_value: { type: 'number' },
  aidoc_readiness: { type: 'object' },
  project_folder_compliance: { type: 'object' },
  doc_currency: { type: 'object' },
  grounding_receipt: { type: 'object' },
  block_no_wwcw: { type: 'object' },
  grounding_completeness: { type: 'object' },
  act_on_flagged: { type: 'object' },
  find_the_miss: { type: 'object' },
  self_evolution_feedback: { type: 'object' },
  checklist_filled: { type: 'boolean' },
  checklist_doc_saved: { type: 'boolean' },
  checklist_doc_path: { type: 'string', max: 200 },
  ledger: { type: 'string', max: 200 },
}
function validateFirewall(obj) {
  const bad = []
  for (const [k, rule] of Object.entries(FIREWALL_SCHEMA)) {
    const val = obj[k]
    if (val === undefined || val === null) { bad.push(`${k}:missing`); continue }
    if (rule.type === 'enum' && !rule.values.includes(val)) bad.push(`${k}:not-in-enum`)
    else if (rule.type === 'string' && (typeof val !== 'string' || val.length > rule.max)) bad.push(`${k}:bad-string`)
    else if (rule.type === 'number' && typeof val !== 'number') bad.push(`${k}:not-number`)
    else if (rule.type === 'boolean' && typeof val !== 'boolean') bad.push(`${k}:not-boolean`)
    else if (rule.type === 'array' && (!Array.isArray(val) || val.length > rule.max)) bad.push(`${k}:bad-array`)
    else if (rule.type === 'object' && (typeof val !== 'object' || Array.isArray(val))) bad.push(`${k}:bad-object`)
  }
  return bad
}
const firewallErrors = validateFirewall(firewall)
if (firewallErrors.length) {
  // Fail loud: a malformed firewall return degrades to a tight HOLLOW shape, never ships un-capped.
  log(`HUM firewall return failed schema validation (${firewallErrors.join(', ')}) — degrading to HOLLOW fail-loud shape`)
  return {
    hum_verdict: 'HOLLOW',
    session_id: clampStr(v.session_id || '(newest)', 80),
    note: clampStr('firewall schema mismatch: ' + firewallErrors.join(', '), 200),
    ledger: HUM_LEDGER,
  }
}
return firewall
