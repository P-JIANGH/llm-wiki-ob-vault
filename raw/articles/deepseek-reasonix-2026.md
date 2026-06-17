# DeepSeek-Reasonix (Reasonix) — Source Synthesis

> Synthesized from local codebase analysis + official docs + web research.
> Date: 2026-05-25
> Source: ~/DeepSeek-Reasonix (git clone, 1353 commits, v0.50.1)

## Project Overview

**Reasonix** (npm: `reasonix`, alias: `dsnix`) is a **DeepSeek-native terminal coding agent** built in TypeScript. Its entire architecture is engineered around a single economic invariant: **DeepSeek's prefix-cache stability** — cached input costs ~10% of uncached input. Most generic agent frameworks achieve <20% cache hit rates because they reorder, rewrite, or inject fresh timestamps each turn. Reasonix achieves **99.82% cache hit** in real-world workloads by designing every layer to preserve byte-stable prefixes.

- **Author:** esengine (Yuhua Hui)
- **License:** MIT
- **Stars:** ~5,200+ (GitHub: esengine/DeepSeek-Reasonix)
- **Node requirement:** >= 22
- **Current version:** 0.50.1 (2026-05-24)
- **First commit:** 2026-04-21 (v0.0.1)
- **Total commits:** 1,353 (as of 2026-05-25)
- **LOC:** ~76K TypeScript (src/ + tests/)
- **Tests:** 231 Vitest test files

## Three Pillars

### Pillar 1 — Cache-First Loop

Partitions context into three regions:

```
┌─────────────────────────────────────────┐
│ IMMUTABLE PREFIX                        │ ← fixed for session
│   system + tool_specs + few_shots       │   cache hit candidate
├─────────────────────────────────────────┤
│ APPEND-ONLY LOG                         │ ← grows monotonically
│   [assistant₁][tool₁][assistant₂]...    │   preserves prefix of prior turns
├─────────────────────────────────────────┤
│ VOLATILE SCRATCH                        │ ← reset each turn
│   R1 thought, transient plan state      │   never sent upstream
└─────────────────────────────────────────┘
```

Key invariants:
1. Prefix computed once per session, hashed, and pinned (`ImmutablePrefix`)
2. Log entries serialized in append order; no rewrites (`AppendOnlyLog`)
3. Scratch distilled before any information from it is folded into the log (`VolatileScratch`)
4. Auto-compact: when context approaches cap, older turns fold into a summary *appended* to the prefix — the prefix itself isn't rewritten

**Parallel tool dispatch:** Tools declare `parallelSafe?: boolean`. Consecutive parallel-safe calls are grouped into chunks and raced via `Promise.allSettled`. Read-only filesystem tools, web tools, memory recall, and subagent spawns are parallel-safe by default. Mutating tools stay serial.

### Pillar 2 — Tool-Call Repair

Four-pass pipeline for DeepSeek-specific failure modes:

1. **`flatten`** — Schemas with >10 leaf params or depth >2 are auto-detected and presented to the model in dot-notation form. `dispatch()` re-nests args before calling the user's `fn`.
2. **`scavenge`** — Regex + JSON parser sweeps `reasoning_content` for any tool call the model forgot to emit in `tool_calls`.
3. **`truncation`** — Detects unbalanced JSON and repairs by closing braces or requesting a continuation completion.
4. **`storm`** — Identical `(tool, args)` tuple within a sliding window → suppress the call, inject a reflection turn.

### Pillar 3 — Cost Control (v0.6)

Four complementary mechanisms:

1. **Tiered defaults (flash-first):** `flash` (v4-flash, 1× cost) → `auto` (flash→pro on hard turns, 1-3×) → `pro` (v4-pro, ~12×). All auxiliary calls (summary, subagent, repair retries) hard-code `v4-flash + effort=high`.
2. **Turn-end auto-compaction:** Every tool result exceeding 3000 tokens is shrunk to that cap when a turn ends. Proactive 40% context-ratio threshold runs pre-emptively.
3. **Model selection (`/model`):** Explicit sticky switch between flash and pro. Pre-0.50.0 had `/pro` one-shot arming — removed in favor of persistent selection.
4. **Model self-report escalation (`<<<NEEDS_PRO>>>`):** Model itself decides when a task exceeds its tier. Emits marker as first line → system aborts flash call and retries on pro.

**Real-world benchmark (2026-05-01):** 435M input tokens, 99.82% cache hit, ~$12 instead of ~$61 on v4-flash (97.7% savings).

## Source Code Architecture

```
src/
├── client.ts               # DeepSeek client (fetch + SSE streaming)
├── loop.ts                 # CacheFirstLoop (~1022 LOC) — Pillar 1 + 3
├── repair/                 # Pillar 2 pipeline
│   ├── index.ts            # ToolCallRepair orchestrator
│   ├── scavenge.ts         # Extract tool calls from reasoning_content
│   ├── flatten.ts          # Schema flattening for deep/wide params
│   ├── truncation.ts       # Unbalanced JSON repair
│   └── storm.ts            # Repeat-call suppression
├── prompt-fragments.ts     # TUI_FORMATTING_RULES, NEGATIVE_CLAIM_RULE, escalationContract
├── code/
│   ├── prompt.ts           # CODE_SYSTEM_PROMPT — main system prompt for code mode
│   ├── edit-blocks.ts      # SEARCH/REPLACE parser + apply gate
│   ├── checkpoints.ts      # Git-like checkpoint system
│   └── lifecycle.ts        # EngineeringLifecycleRuntime
├── tools/
│   ├── filesystem.ts       # read/list/search/edit/write (sandboxed)
│   ├── shell.ts            # run_command + run_background (JobRegistry)
│   ├── jobs.ts             # Background process registry
│   ├── memory.ts           # remember/forget/list user memories
│   ├── skills.ts           # SKILL.md playbook invocation
│   ├── subagent.ts         # spawn_subagent — isolated child loop
│   ├── plan.ts             # submit_plan review gate
│   ├── todo.ts             # In-session todo tracker
│   ├── choice.ts           # ask_choice user picker
│   └── web.ts              # web_search, web_fetch (Mojeek/SearXNG/Metaso)
├── mcp/
│   ├── client.ts           # MCP client (JSON-RPC 2.0)
│   ├── stdio.ts            # stdio transport
│   ├── sse.ts              # SSE transport
│   ├── streamable-http.ts  # Streamable HTTP transport
│   ├── registry.ts         # MCP tool bridging + result flattening
│   ├── spec.ts             # MCP spec parsing
│   └── inspect.ts          # Server inspection/reporting
├── memory/
│   ├── runtime.ts          # ImmutablePrefix / AppendOnlyLog / VolatileScratch
│   ├── project.ts          # REASONIX.md / AGENTS.md / AGENT.md loader
│   ├── user.ts             # ~/.reasonix/memory/ store (global + project scoped)
│   ├── session.ts          # JSONL session persistence
│   └── subdir.ts           # Per-directory memory annotations
├── skills.ts               # Skill discovery, loading, validation
├── hooks.ts                # Shell-command lifecycle hooks (PreToolUse/PostToolUse/UserPromptSubmit/Stop)
├── telemetry/
│   ├── stats.ts            # SessionStats, TurnStats, cost accounting
│   └── usage.ts            # Cross-session usage aggregation
├── server/                 # Dashboard HTTP server + REST API
├── cli/
│   ├── index.ts            # Commander.js entry
│   ├── commands/           # chat, code, run, stats, sessions, diff, replay, etc.
│   └── ui/                 # Ink 5 (React 18) TUI components
│       ├── App.tsx         # Root Ink component (~4639 LOC)
│       ├── LiveRows.tsx    # Spinner rows (OngoingTool / Status)
│       ├── EventLog.tsx    # Historical row rendering
│       ├── StatsPanel.tsx  # Top bar + cost badges
│       ├── PromptInput.tsx # Cursor-aware multi-line input
│       ├── PlanConfirm.tsx # submit_plan review modal
│       ├── ShellConfirm.tsx# run_command approval modal
│       ├── EditConfirm.tsx # Per-edit review modal
│       ├── markdown.tsx    # Ink-native markdown renderer
│       └── slash/          # 13 per-topic slash command handlers
├── frame/                  # Cell grid → ANSI renderer (TUI log)
├── at-mentions.ts          # @-mention file expansion
├── config.ts               # Config loading, API key management
├── types.ts                # ChatMessage, ToolCall, ToolSpec, etc.
├── version.ts              # Version detection, update checking
├── i18n/                   # EN + zh-CN localization
└── qq/                     # QQ channel integration (bot + access)
```

## Key Design Decisions

1. **DeepSeek-only by design** — Multi-provider flexibility is explicitly a non-goal. Coupling to one backend is the feature.
2. **Terminal-first** — No IDE integration. Diff lives in `git diff`, file tree in `ls`. Dashboard is a companion, not a replacement.
3. **MIT licensed** — vs Claude Code (closed), Cursor (closed), Aider (Apache 2).
4. **SEARCH/REPLACE edit gate** — All file edits go through exact-match SEARCH/REPLACE blocks. The tool refuses unread targets (must `read_file` before `edit_file`).
5. **Skills system** — Markdown playbooks with YAML frontmatter (`description:`, `runAs: inline|subagent`, `allowed-tools:`). Compatible with Claude-format skills (`.claude/skills/`).
6. **Memory system** — Four types: `user`, `feedback`, `project`, `reference`. Global scope (`~/.reasonix/memory/global/`) + project scope (`~/.reasonix/memory/<hash>/`). Pinned into the immutable prefix.
7. **Hooks** — Shell commands on lifecycle events. `PreToolUse` and `UserPromptSubmit` can block (exit 2 = block). Project scope first, then global.
8. **Subagents** — Isolated child loops inheriting parent registry minus `spawn_subagent` + `submit_plan`. Flash+high by default. Used for parallelism and context blow-up scenarios.
9. **Dashboard** — Embedded HTTP server (127.0.0.1 + ephemeral token). React SPA served from CLI. Desktop client (Tauri) bundles the same dashboard.
10. **QQ Channel** — Extend existing session via QQ messages. Not a separate runtime mode.

## Version Evolution

- **v0.0.x** (Apr 21): Pillar 1 end-to-end, repair pipeline, Ink TUI scaffold
- **v0.1** (Apr 21): τ-bench numbers, streaming polish, transcript replay
- **v0.3** (Apr 21): MCP client (stdio + SSE), session persistence
- **v0.4.x** (Apr 21): `reasonix code` with SEARCH/REPLACE, review/auto gate, background jobs, hooks
- **v0.5.x** (Apr 21): V4 model support, skills, memory, subagents
- **v0.6** (May 24): Cost control (flash-first, auto-compaction, `/pro` removed for persistent `/model`), shared prompt fragments, UI refactor
- **v0.50.1** (May 24): Desktop dashboard unified on CLI-hosted React surface, presets removed, persisted usage stats, plan dispatch gate

## Non-Goals (Explicit)

- Multi-provider flexibility
- IDE integration
- Hardest-leaderboard reasoning (Claude Opus still wins some benchmarks)
- Air-gapped / fully-free (requires paid DeepSeek API key)
- Multi-agent orchestration as first-class concept (subagents are cost-reduction, not coordination)
- RAG / vector retrieval
- Web UI / SaaS
- Automatic cost escalation without user-visible announcement

## Comparison Matrix

| Dimension | Reasonix | Claude Code | Cursor | Aider |
|---|---|---|---|---|
| Backend | DeepSeek-only | Anthropic | OpenAI/Anthropic | Any (OpenRouter) |
| License | MIT | Closed | Closed | Apache 2 |
| Cost profile | Low per task | Premium | Subscription + use | Varies |
| Prefix cache | Engineered | N/A | N/A | Incidental |
| Embedded dashboard | Yes | — | N/A (IDE) | — |
| Configurable search | Mojeek/SearXNG/Metaso | — | — | — |
| Persistent sessions | Per-workspace | Partial | N/A | — |
| Plan/MCP/hooks/skills | Yes | Yes | Yes | Partial |
| Web search | Yes | Yes | Yes | Yes |
| Open community | Yes | — | — | Yes |

## Dependencies (Runtime)

- `commander` — CLI framework
- `ink` + `ink-text-input` — React TUI
- `react` ^19.2.6 — UI framework
- `zod` ^4.4.1 — Schema validation
- `undici` ^8.2.0 — HTTP client
- `ws` ^8.20.1 — WebSocket
- `web-tree-sitter` ^0.26.9 — Syntax parsing
- `picomatch` ^4.0.4 — Glob matching
- `node-html-parser` ^7.1.0 — HTML parsing
- `eventsource-parser` ^3.0.0 — SSE parsing
- `cli-highlight` ^2.1.11 — Syntax highlighting

## Build & Dev

- **Build:** `tsup` (bundle to `dist/`)
- **Dev runner:** `tsx`
- **Test:** Vitest 2.x (231 test files)
- **Lint/Format:** Biome 1.9 (2-space, double quotes, semicolons, 100 width)
- **Mutation testing:** Stryker
- **Pre-push gate:** `npm run verify` = build + lint + typecheck + test

## Notable Files

- `docs/ARCHITECTURE.md` — Three pillars deep-dive
- `docs/CLI-REFERENCE.md` — Every subcommand, slash command, keybinding
- `benchmarks/real-world-cache/README.md` — 99.82% cache hit case study
- `benchmarks/tau-bench/` — Synthetic benchmark harness
- `REASONIX.md` — Project working knowledge (stack, layout, commands, conventions)
- `CHANGELOG.md` — Keep a Changelog format, Semver
