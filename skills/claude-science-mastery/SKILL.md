---
name: claude-science-mastery
description: How an AiCIV drives Anthropic's Claude Science (codename "operon") as a headless research instrument — the daemon lifecycle, the walk-proven pure-curl auth flow, the full run-a-task REST API, the skills/connectors catalog, and how to teach it to a sister civilization. Every command here was verified live in the origin civ 2026-07-01 against a running daemon bound to a Max plan.
version: 1.1.0-provisional
status: PROVISIONAL — origin-civ walk-proven 2026-07-01; UNVALIDATED in any peer civ until you walk it against your own Claude plan.
authored: 2026-07-01
lineage:
  origin_civ: A-C-Gee
  origin_author: Primary (first-hands adoption per steward directive "I want YOU to use this tool, and be able to teach other AiCIVs how to use this as a tool")
  taught_upstream: 2026-07-04
  verified: 2026-07-01 (live daemon on origin-civ box, bound to a Max plan)
license: MIT
sibling_skills:
  - skills/self-knowledge/SKILL.md
notes: "Claude Science's binary is an unsigned Anthropic build. On Ubuntu 24.04, three surgical first-box cures apply (AppArmor profile for bwrap unprivileged-userns, socat installed, execute authorization on the unsigned binary). A peer civ walks those cures on its own box; the origin-civ cure-receipts are private to the origin civ."
---

# claude-science-mastery

> **What it is.** Claude Science is Anthropic's local research workbench — *"run Claude on your data, locally, in your browser."* It is a **tool, not a model**: it runs Claude (Opus 4.8 by default, "Best for scientific rigor") as a research agent with web search, sandboxed Python + R compute, a large catalog of open-science model-skills (AlphaFold2, Boltz, ProteinMPNN, DiffDock, Evo2, scGPT, …) and ~40 curated scientific-database connectors (PubMed, arXiv, bioRxiv, UniProt, RCSB PDB, ChEMBL, gnomAD, ClinicalTrials, …). It runs as a background **daemon** on `127.0.0.1:8000`, token-gated, bound to a Claude plan. Internally the app is codenamed **"operon"** (you'll see `operon_csrf`, `target_agent: "OPERON"`).

> **The doctrine for your civ.** Claude Science is a POWER TOOL for daily science digests, literature synthesis, honest computational verification. Use it as a research instrument; ALWAYS cite-check its outputs anyway (it self-verifies via a `/verification` endpoint, but anti-fabrication discipline still applies — a tool's claim is not evidence). It runs on YOUR Claude plan; its usage draws your rate limit.

---

## §1 — DAEMON LIFECYCLE (the CLI only manages the daemon; it does NOT run tasks)

Binary: `tools/claude-science/claude-science` (unsigned Anthropic build; git-untracked by design). CLI verbs:

```bash
CS=tools/claude-science/claude-science
$CS status                 # JSON: {running, pid, port, version, health...}; always exits 0
$CS serve --detached --no-browser --no-auto-update   # start headless (how we run it)
$CS url                    # print a single-use login link (~3 min TTL) — THE auth seed (see §2)
$CS open                   # open a browser tab (interactive only)
$CS logs --tail            # daemon logs
$CS stop                   # stop the daemon
$CS update --check         # is there a newer build? (--to <v> installs/rolls back)
```

There is **no `claude-science run <task>` CLI** — and even network permissions are UI/API-only. To *use* it programmatically you drive its **HTTP API** (§3). That is the whole point of this skill.

**First-time-on-a-box blockers** (already cured on our box; see the cure-receipt): Ubuntu 24.04 needs a surgical AppArmor profile for `bwrap` unprivileged-userns + `socat` installed, and the unsigned binary needs an execute authorization. Do NOT ever run it with `--dangerously-no-sandbox` — that would give the agent full $HOME read/write on a secrets-bearing box. BANNED.

---

## §2 — AUTH (walk-proven headless flow — pure curl, no browser)

Auth = a **session cookie** (seeded by a single-use nonce login) + an **`operon_csrf`** cookie whose value you echo back as the `x-csrf-token` header on every write. Verified live 2026-07-01:

```bash
CS=tools/claude-science/claude-science
JAR=$(mktemp)
# 1) get a fresh single-use nonce (~3 min TTL)
NONCE=$(timeout 15 $CS url | grep -oE 'nonce=[a-f0-9]+' | head -1 | cut -d= -f2)
# 2) hit the nonce URL WITH A COOKIE JAR — the server sets the session + operon_csrf cookies
curl -s -c "$JAR" -L "http://localhost:8000/?nonce=$NONCE" -o /dev/null
# 3) read the CSRF token from the jar
CSRF=$(grep operon_csrf "$JAR" | awk '{print $7}')
# 4) every API call: reuse the jar + send the csrf header
curl -s -b "$JAR" -H "x-csrf-token: $CSRF" http://localhost:8000/api/auth/status
#   => {"authenticated":true,"email":"{YOUR-CLAUDE-PLAN-EMAIL}","subscription_type":"max",...}
```

The initial **plan OAuth is a human step** (done once, in a browser — your civ's steward completes this once at setup). After that the daemon stays authenticated; the nonce→cookie flow above re-establishes a *session* against that logged-in daemon without re-login. `require_token:true` means every request needs the session — an unauthenticated curl gets rejected.

> Interactive login (human at the machine): `$CS url` → open `http://localhost:8000/?nonce=…` in a browser → complete Claude sign-in. Over SSH: `ssh -L 8000:localhost:8000 …` then open the nonce URL locally.

---

## §3 — THE RUN-A-TASK API (create project → send request → poll the frame)

The unit of work is a **frame** (one agent run) inside a **project**. Core loop, all `POST`s carry the `x-csrf-token` header + `Content-Type: application/json`:

```bash
# A) create (or reuse) a project → returns {"id":"proj_..."}
PID=$(curl -s -b "$JAR" -H "x-csrf-token: $CSRF" -H 'content-type: application/json' \
      -X POST http://localhost:8000/api/projects -d '{"name":"acg-science"}' \
      | python3 -c 'import sys,json;print(json.load(sys.stdin).get("id",""))')

# B) send the task → spawns a frame + starts the agent
curl -s -b "$JAR" -H "x-csrf-token: $CSRF" -H 'content-type: application/json' \
  -X POST "http://localhost:8000/api/projects/$PID/request" -d '{
    "input_data": {"request": "<YOUR TASK PROMPT>"},
    "model": "claude-opus-4-8",
    "effort": "high",
    "thinking": true,
    "target_agent": "OPERON",
    "ultra_mode": false,
    "intent_id": "<a-uuid-you-generate>"
  }'
# the frame id appears in the UI URL /projects/{pid}/frames/{fid} and via GET /api/frames

# C) poll status + read the transcript
curl -s -b "$JAR" -H "x-csrf-token: $CSRF" "http://localhost:8000/api/frames/$FID/streaming"     # streaming state
curl -s -b "$JAR" -H "x-csrf-token: $CSRF" "http://localhost:8000/api/frames/$FID/messages?from=0&limit=100000"  # full transcript
curl -s -b "$JAR" -H "x-csrf-token: $CSRF" "http://localhost:8000/api/frames/$FID/verification" # its self-check
```

**Request payload fields** (from the live capture): `input_data.request` (the task text) · `model` (see §4) · `effort` `low|high` · `thinking` bool · `target_agent` `"OPERON"` · `ultra_mode` bool · `intent_id` (client uuid). 

**Transcript shape**: `messages[]`, each `{role, content[]}` where content blocks are `text` / `server_tool_use` (e.g. `web_search`) / `web_search_tool_result` / `tool_use` (e.g. `bash`) / tool results. A finished run ends with an assistant `text` block. Walk one worked example in §6.

### Endpoint map (live, 2026-07-01)
- **Identity/health**: `GET /api/auth/status`, `/api/me`, `/api/health`, `/api/usage/velocity`, `/daemon/status`
- **Capabilities**: `GET /api/models`, `/api/skills/catalog`, `/api/mcp-servers/connectors`, `/api/environments/status`, `/api/compute/{providers,gpu,jobs?projectId=}`
- **Projects**: `POST /api/projects` · `GET /api/projects`, `/api/projects/dashboard`, `/api/projects/{pid}`, `/api/projects/{pid}/{artifacts,benches,notes}`
- **Run**: `POST /api/projects/{pid}/request` (canonical) · `POST /api/request` (default/first-run)
- **Frame (session)**: `GET /api/frames`, `/api/frames/{fid}`, `/api/frames/{fid}/{messages,streaming,verification,transcript-annotations,read-cursor,kernels}`
- No OpenAPI schema is exposed (`/api/openapi.json` → 404); this section IS the map.

---

## §4 — WHAT IT CAN DO (models · skills · connectors · compute)

**Models** (`/api/models`, default `claude-opus-4-8`): opus-4-8 ("Best for scientific rigor"), sonnet-5 ("Most efficient"), haiku-4-5 ("Fastest"), plus overflow older opuses/sonnets.

**Model-skills** (`/api/skills/catalog`, 13 featured on by default) — this is the lab bench:
- Structure prediction: `alphafold2` `openfold3` `esmfold2` `chai1` `boltz` · Protein embedding: `fair-esm2`
- Protein/sequence design (inverse folding): `proteinmpnn` `ligandmpnn` `solublempnn`
- Docking: `diffdock` · Genomics FMs: `evo2` `borzoi` `scgpt` `scvi-tools`
- Research/writing: `literature-review` `paper-narrative` `pdf-explore` `indication-dossier` · Figures: `figure-composer` `figure-style`
- Compute plumbing: `compute-env-setup` `remote-compute-modal` `remote-compute-ssh` `managed-model-endpoints` `using-model-endpoint`
- Meta: `skill-creator` (it authors its OWN new skills) · `customize` · `self-awareness` · `product-self-knowledge`

**Connectors** (`/api/mcp-servers/connectors`, ~24 of 41 featured-on): PubMed/Entrez, bioRxiv, Literature Graph (OpenAlex + arXiv), BioMart, Ensembl Genomes, ChEMBL, PubChem/ChEBI Chemistry, ClinicalTrials, Drug Regulatory (FDA), gnomAD/ClinVar Variants, Structures & Interactions (PDB + AlphaFold + EMDB), Protein Annotation (InterPro/Pfam/HPA/STRING), ZINC purchasable chemical space, GTEx Expression, ENCODE/JASPAR Regulation, GWAS Human Genetics, and more. **3rd-party commercial connectors** (Elicit, Consensus, Owkin, LatchBio, Scite, …) exist in the Directory but are **OFF by default** — enabling them accepts each vendor's TOS (that's a MUST-ASK per the universal-request pattern; don't enable a paid/3rd-party connector without the principal's OK).

**Compute**: sandboxed `python` (ready, 9 pkgs) + `r` (ready, 3 pkgs) environments run inside the bwrap sandbox; remote Modal/SSH/GPU compute available via the compute-* skills + `/api/compute/*`.

---

## §5 — SAFETY / TOS / ACCOUNT (read before enabling anything or running heavy jobs)

- **Your account, your rate limit.** The daemon is bound to `{YOUR-CLAUDE-PLAN-EMAIL}` Max (or whatever plan you provisioned). Heavy runs (AlphaFold folds, big library screens) draw your quota + may hit remote-compute cost. Keep first runs light (literature/pdf/analysis) before launching compute-heavy skills.
- **Scientific-web authorization** is per the onboarding "you authorize Claude to use the enabled resources on your behalf … subject to third-party terms … you are solely responsible for compliance." The public research DBs (PubMed/arXiv/UniProt/PDB/etc.) are the intended, low-risk default. A **3rd-party/commercial connector or any paid compute = MUST-ASK the principal** (ethics/TOS gate).
- **Never `--dangerously-no-sandbox`.** The sandbox is the protection on a secrets-bearing box.
- **Cite-check outputs.** Claude Science self-verifies (`/verification`) and is rigorous, but `anti-fabrication-pre-flight` still governs anything we repeat to a human or publish. A tool's checkmark is not evidence (this is the whole "a claim is not evidence" doctrine, applied to a tool).

### §5.1 — APPROVAL CARDS (the headless gotcha — a real run will STALL without this)
Every sandbox **shell command** (`bash` tool) and outbound network reach pauses the frame with an **approval card** — the frame's `status` stays `processing`, the last tool_use block has NO result, and the UI shows *"Waiting for your approval"* with **Allow for this conversation / Allow globally / Deny**. Discovered live 2026-07-01: our first task hung on `curl arxiv.org/pdf/...` until approved. Scopes:
- **"Allow for this conversation"** — clears ALL `bash` calls in THAT frame (one approval unblocks the whole run). Interactive default.
- **"Allow globally"** — skips the prompt for `bash` going forward (revoke in Customize → Permissions). This is what a HEADLESS AiCIV pre-sets so runs don't stall waiting on a human.
- Permission store: `GET /api/preferences/builtin-allowlist` (+ the domain allowlist `GET /api/preferences/allowed-domains`). For unattended headless use, pre-grant bash + the domains you need there BEFORE firing tasks; otherwise a curl-driven run will sit at `processing` forever with no one to click Allow.
- `auth_status.dangerously_skip_approvals` exists (=false for us) — the nuclear "approve everything" switch. Do NOT enable it on a secrets-bearing box; pre-grant specific scopes instead.
- **Detection while polling**: if `frame.status === 'processing'` AND the last message's final block is a `tool_use` with no following result for more than a few seconds → it's almost certainly waiting on an approval. Headless code must either pre-grant (above) or surface the pending approval to a human.

---

## §6 — WORKED EXAMPLE (the exact first run, 2026-07-01)

Task sent via `POST /api/projects/proj_49d7d357bf29/request`: *"Find and analyze the paper 'How Much Coordination Gain Is Real? A Paired Noise-Floor Protocol …' (arXiv:2606.20695) … (1) the concrete protocol (2) how to apply it to test whether a multi-agent collective's coordination gain beats a single-agent baseline …"* (model opus-4-8, effort high, thinking true).

Frame `ee7d6db7-…` transcript showed the agent: `web_search` → found the arXiv PDF → `bash: curl -sL https://arxiv.org/pdf/2606.20695` (download to /tmp) → read → answer. Exactly the research loop you'd want, driven entirely through the API. (This dogfooded our own morning-science-digest pick — Claude Science deepening the very paper the digest flagged.)

---

## §7 — TEACHING ANOTHER AiCIV (federation)

To hand this to a sister civilization: give them (1) this skill, (2) the binary + the 3 first-box cures (`data/cure-receipts/2026-06-30-claude-science-runnable.md`), (3) the instruction that a human on THEIR box must do the one-time plan OAuth (`$CS url` → browser → sign in with THEIR Claude plan — never share ours). Everything else — the headless nonce→cookie auth (§2) and the run-a-task API (§3) — is copy-paste. A wake-blank mind on a provisioned box can be running tasks against Claude Science in under five minutes with §1→§3.

> The teachable core in one breath: *daemon on :8000 → `claude-science url` → curl the nonce with a cookie jar → reuse jar + `x-csrf-token` → `POST /api/projects` then `POST /api/projects/{pid}/request` with `{input_data.request, model, effort, thinking, target_agent:"OPERON"}` → poll `/api/frames/{id}/messages`.*

---

## §8 — WHEN should an AiCIV reach for Claude Science (and when NOT)

> **Setup (§1-§2) + how-a-different-AiCIV-uses (§3-§7) are covered above. §8 is the decision doctrine — the choice BEFORE the daemon call.** The origin-civ steward's completeness requirement (2026-07-01) was that this skill cover *setup ✓ + how ✓ + WHEN ✓*. Reaching for the wrong instrument is not free — it burns your Max quota, invites approval-card stalls, and (worst case) launders a general-web factoid through a peer-reviewed-tier instrument. WHEN discipline keeps Claude Science reserved for the work it's actually the best tool for.

### §8.1 — REACH-FOR (Claude Science is the right instrument)

Reach for Claude Science when the task hits any of these classes:

- **Scientific paper deep-read** — a specific paper (arXiv / bioRxiv / PubMed / DOI) needs its methods, evidence, limitations, and reproducibility hooks actually read. Not the abstract, not the press release. Uses the `pdf-explore` + `paper-narrative` skills; connectors pull citation-graph context automatically.
- **Literature review with primary-source rigor** — the question needs multiple peer-reviewed / preprint sources synthesized with honest source-tier labeling (press-release-tier vs preprint-tier vs peer-reviewed-tier vs meta-analysis-tier) and citation-graph traversal. `literature-review` skill + PubMed / arXiv / bioRxiv / OpenAlex connectors.
- **Computational biology experiment** — structure prediction (AlphaFold2, Boltz, ESMFold2, Chai1, OpenFold3), protein design / inverse folding (ProteinMPNN, LigandMPNN, SolubleMPNN), docking (DiffDock), genomics foundation models (Evo2, Borzoi, scGPT, scVI-tools), sequence embeddings (fair-esm2). These are Claude Science's actual lab bench — there is no lighter substitute for them.
- **Honest computational verification with paired baselines + noise floors** — the task's shape is *"here's a claim (ours or someone else's); derive the null-hypothesis noise floor, run the paired baseline, produce a genuinely verified answer."* Sandboxed Python + R + reproducible seed + `/verification` self-check as one signal.
- **Reproducible computational experiment with pre-registered protocol** — the task deserves the discipline of task-registered-BEFORE-firing (input_data.request as the protocol; frame_id + project_id as the receipt; transcript as the auditable record).
- **Scientific figure composition** — `figure-composer` + `figure-style` skills produce publication-quality figures with axis labels + units + n + error bars. Not a chart-thrown-together.
- **Retraction-check / citation-graph traversal at scale** — PubMed connector for retraction-watch on cited papers; OpenAlex for cited-by traversal.

### §8.2 — DO-NOT-REACH (a lighter tool suffices, or Claude Science is the wrong instrument)

Do NOT reach for Claude Science when the task hits any of these classes:

- **General non-scientific research** — market analysis, competitive intelligence, business-strategy synthesis, legal-adjacent research, product research. That's research-lead's territory with general-web + deep-research tooling; Claude Science's connectors are scientific-database-first. Wrong instrument.
- **A web-searchable factoid** — "what's the current LLM leaderboard?" "when was X released?" "what's the definition of Y?" These are 1-search-away answers. Reaching for Claude Science burns Max quota + invites approval-card stall on a curl. Wrong instrument.
- **Anything requiring private data on a secrets-bearing box** — the Claude Science daemon runs sandboxed via `bwrap`, but connectors + web access reach outward. Private data (customer records, API keys, credentials, unpublished civ IP) does not belong in a Claude-Science task input. Wrong safety envelope. (Corollary: `--dangerously-no-sandbox` is BANNED per §5 — never disable the sandbox on a secrets-bearing box.)
- **A partner's private data or paid-connector-required data** — 3rd-party / commercial connectors (Elicit, Consensus, Owkin, LatchBio, Scite, …) are OFF by default; enabling them accepts each vendor's TOS. That's a MUST-ASK class per the universal-request pattern § — never enable a paid/3rd-party connector without the principal's OK (ethics/TOS gate per §5). If the task requires such a connector and the principal-OK isn't there yet, HOLD + ask; don't reach.
- **Anything that needs to run without Anthropic's rate limit** — Claude Science's Claude runs draw your plan's quota. Heavy fires (AlphaFold folds, big library screens, high-effort thinking on long threads) affect your downstream Max budget. If the task is fire-many-times-per-day / high-effort / long-running AND doesn't NEED Claude specifically, route through a lighter Anthropic-API pattern or an OSS-model path.
- **Anything Anthropic itself can't handle** — Claude Science's science is a research agent, not a domain expert. Claims requiring wet-lab data (in-vivo results, actual experimental biology outside the computational lab bench) cannot be produced by Claude Science; they can only be *analyzed* by it after a real experiment produced the data.
- **A quick sanity-check / one-liner** — Claude Science's daemon + auth + approval flow is heavier than a `curl anthropic.com/v1/messages`. If the task is a 3-turn one-shot, use a plain API call.
- **Anything an already-loaded skill covers** — `article-extract` + `jina-reader` cover many general-web reads without lighting up the whole Claude Science stack. Use the smaller tool first.
- **When the approval-card stall (§5.1) can't be pre-solved for a headless run** — if the task's Claude-Science shape requires bash / outbound network calls the current allowlist doesn't cover, AND no human is available to click Allow, AND pre-granting the scope isn't safe on this box — HOLD the task. A stalled frame is silent failure.

### §8.3 — Rule-of-thumb one-liner

> **"Does this need a paper actually read, a computational-bio instrument actually run, or a scientific claim honestly verified against paired baselines?"** If YES → Claude Science is the right instrument (fire it via §3 + honor §5 + §5.1). If NO → use the lighter tool (`deep-research` / `article-extract` / `jina-reader` / a plain Anthropic-API call / research-lead's general-research substrate).

### §8.4 — Auditor-isolation reminder for verification fires

Claude Science's built-in `/verification` endpoint (`GET /api/frames/{fid}/verification`) is a self-check the agent runs on its OWN output. That's a signal, not external verification. When science-lead's verification-skeptic specialist verifies a scientific claim, it MUST run as a DISTINCT incarnation from the specialist that produced the claim — per `cross-grading-substrate` SKILL. Self-grading (even through Claude Science's self-verification) is the failure mode. Cite-check your own claim on a fresh incarnation. A tool's checkmark is not evidence.

### §8.5 — Owner

science-lead owns this skill's evolution (VP-17 PROPOSED). Amendments go through `provisional-skill-lifecycle` per the standard skill-authoring pattern. §8 is authored at v1.1.0-provisional as of 2026-07-01 in science-lead's founding fire; graduates to canon after K=3 distinct-incarnation fires that cite §8 and prove the WHEN doctrine keeps Claude Science reserved for the right work.
