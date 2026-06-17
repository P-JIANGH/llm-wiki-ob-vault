---
title: DeepSeek-Reasonix (Reasonix)
created: 2026-05-25
updated: 2026-05-25
type: entity
tags: [agent, agent-framework, cli, tui, typescript, deepseek, tool-calling, mcp, memory, coding, open-source]
sources: [raw/articles/deepseek-reasonix-2026.md]
---

# DeepSeek-Reasonix (Reasonix)

> DeepSeek-native terminal coding agent engineered around prefix-cache stability. MIT license, Node ≥22, ~5.2k stars.
> GitHub: [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

## Overview

**Reasonix** is a terminal-first AI coding agent built specifically for the [[deepseek]] API. Unlike generic frameworks that support multiple providers, Reasonix is **DeepSeek-only by design** — every abstraction is justified by a DeepSeek-specific behavior or economic property. The core thesis: **cache stability isn't a feature you turn on; it's an invariant the loop is designed around.**

In real-world usage, Reasonix achieves **99.82% cache hit rates** (435M input tokens, ~$12/day on v4-flash vs ~$61 without cache). This is not DeepSeek's cache working alone — it's the result of four client-side mechanisms that keep the byte prefix stable across long sessions.

| Attribute | Value |
|---|---|
| Author | esengine (Yuhua Hui) |
| License | MIT |
| Language | TypeScript 5.6+ (ESM) |
| Node | ≥22 |
| Version | 0.50.1 (2026-05-24) |
| Stars | ~5,200+ |
| Commits | 1,353 (since 2026-04-21) |
| LOC | ~76K TypeScript |
| Tests | 231 Vitest files |

## Three Pillars

### Pillar 1 — Cache-First Loop

The context is partitioned into three regions with strict invariants:

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

**Four mechanisms:**
1. **`ImmutablePrefix`** — system prompt + tool specs frozen at session start; same byte sequence every turn
2. **`AppendOnlyLog`** — turns only append; no reorder or edit-in-place
3. **`VolatileScratch`** — chain-of-thought lives outside the cached prefix so it never poisons the next hit
4. **Auto-compact** — older turns fold into a summary *appended* to the prefix; the prefix itself isn't rewritten

**Parallel tool dispatch:** Tools declare `parallelSafe?: boolean`. Read-only filesystem tools, web tools, memory recall, and subagent spawns are parallel-safe by default (chunked via `Promise.allSettled`). Mutating tools stay serial.

### Pillar 2 — Tool-Call Repair

Four-pass pipeline for DeepSeek-specific failure modes:

| Pass | Problem | Solution |
|---|---|---|
| `flatten` | Schemas with >10 params or depth >2 | Auto-detected, presented in dot-notation, re-nested on dispatch |
| `scavenge` | Tool-call JSON emitted inside `<think>` | Regex + JSON parser sweeps `reasoning_content` for forgotten calls |
| `truncation` | Unbalanced JSON due to `max_tokens` hit | Detects and repairs by closing braces or requesting continuation |
| `storm` | Same tool called repeatedly with identical args | Sliding window suppression + reflection turn injection |

### Pillar 3 — Cost Control

Four complementary mechanisms (none require manual tuning in common case):

1. **Tiered defaults (flash-first):** `flash` (v4-flash, 1×) → `auto` (flash→pro on hard turns, 1-3×) → `pro` (v4-pro, ~12×). Auxiliary calls hard-code `v4-flash + effort=high`.
2. **Turn-end auto-compaction:** Tool results exceeding 3000 tokens are shrunk at turn end. Proactive 40% context-ratio threshold fires pre-emptively.
3. **Model selection (`/model`):** Explicit sticky switch. Pre-0.50.0 had `/pro` one-shot arming — removed for persistent selection.
4. **Model self-report (`<<<NEEDS_PRO>>>`):** Model decides when a task exceeds its tier. Emits marker as first line → system aborts flash and retries on pro.

**Cost transparency:** Per-turn and session costs are color-coded in the TUI: green <$0.05, yellow $0.05–0.20, red ≥$0.20.

## Architecture

### Core Loop (`src/loop.ts`, ~1022 LOC)

`CacheFirstLoop` orchestrates the three pillars. Key components:
- **`ContextManager`** — handles fold thresholds and compaction
- **`dispatchToolCallsChunked`** — parallel-safe tool grouping
- **`ToolCallRepair`** — Pillar 2 pipeline integration
- **`SessionStats`** — per-turn cost/cache accounting
- **`streamModelResponse`** — SSE streaming with usage extraction

### Memory System

Three layers of memory, all pinned into the immutable prefix:

| Layer | Scope | File | Max Size |
|---|---|---|---|
| Project memory | Per-project | `REASONIX.md` / `AGENTS.md` / `AGENT.md` | 8000 chars |
| User memory | Global + Project | `~/.reasonix/memory/{global,<hash>}/` | 4000 chars index |
| Global freeform | Global | `~/.reasonix/REASONIX.md` | 8000 chars |

Memory types: `user`, `feedback`, `project`, `reference`. Each entry has YAML frontmatter with `priority: low|medium|high` and optional `expires: project_end`.

### Skills System

Markdown playbooks with YAML frontmatter:
- `description:` — required, appears in the pinned skills index
- `runAs: inline|subagent` — inline enters parent log; subagent spawns isolated child loop
- `allowed-tools:` — scopes the child registry to specific tool names
- `model:` — subagent model override

Compatible with Claude-format skills (`.claude/skills/<name>/SKILL.md`). Built-in skills: `explore`, `research`.

### Tool Registry

Native tools (filesystem, shell, memory, skills, subagent, plan, todo, choice, web) + MCP-bridged tools. Key features:
- **Sandbox enforcement:** Filesystem tools scoped to launch directory; paths outside are refused
- **Read-before-edit gate:** `edit_file` / `multi_edit` refuse targets not read this session
- **SEARCH/REPLACE format:** Exact byte-match required; trailing whitespace or wrong indent = mismatch
- **Shell gating:** `run_command` requires user approval; allowlist supports exact-prefix matching

### MCP Client

Full MCP client supporting three transports:
- **stdio** — local subprocess servers
- **SSE** — server-sent events over HTTP
- **Streamable HTTP** — HTTP POST with streaming responses

Features: progress notifications, tool/resource/prompt listing, result flattening, timeout handling (default 60s).

### Hooks

Shell-command lifecycle hooks on four events:
- `PreToolUse` — can block tool execution (exit 2 = block)
- `PostToolUse` — observation/logging
- `UserPromptSubmit` — can block user prompt (exit 2 = block)
- `Stop` — cleanup

Project scope (`<project>/.reasonix/settings.json`) takes precedence over global (`~/.reasonix/settings.json`).

### Dashboard

Embedded HTTP server (default 127.0.0.1, ephemeral token). React SPA served from the CLI process. Desktop client (Tauri) bundles the same dashboard surface — one React app renders across CLI, browser, and desktop.

## CLI Surface

### Subcommands

| Command | Purpose |
|---|---|
| `reasonix code [dir]` | Code-mode TUI (default) |
| `reasonix chat` | Chat-only, no filesystem |
| `reasonix run "task"` | Headless one-shot (CI-friendly) |
| `reasonix doctor` | Health check |
| `reasonix sessions [name]` | List/resume sessions |
| `reasonix replay <transcript>` | Re-render without API calls |
| `reasonix diff <a> <b>` | Compare transcripts |
| `reasonix stats` | Cost/cache breakdown |
| `reasonix mcp <list|search|install|inspect>` | MCP management |
| `reasonix index` | Build semantic index |

### Slash Commands (TUI)

| Category | Commands |
|---|---|
| Chat ops | `/help`, `/new`, `/retry`, `/compact`, `/stop`, `/copy` |
| Setup | `/model`, `/language`, `/theme` |
| Info | `/status`, `/cost`, `/context`, `/stats`, `/doctor`, `/keys` |
| Extend | `/mcp`, `/resource`, `/prompt`, `/memory`, `/skill` |
| Code | `/plan`, `/todo`, `/undo`, `/history`, `/show` |

## Design Philosophy

> "Every abstraction is justified by a DeepSeek-specific behavior or economic property. If it's generic, we don't ship it."

**Non-goals (explicit):**
- Multi-provider flexibility
- IDE integration
- Hardest-leaderboard reasoning
- Air-gapped / zero-cost operation
- Multi-agent orchestration as first-class primitive
- RAG / vector retrieval
- Web UI / SaaS

## Comparison

| | Reasonix | Claude Code | Cursor | Aider |
|---|---|---|---|---|
| Backend | DeepSeek | Anthropic | OpenAI/Anthropic | Any |
| License | MIT | Closed | Closed | Apache 2 |
| Cost | Low per task | Premium | Subscription+use | Varies |
| Prefix cache | **Engineered** | N/A | N/A | Incidental |
| Dashboard | Embedded | — | N/A | — |
| Persistent sessions | Per-workspace | Partial | N/A | — |
| MCP / Skills / Hooks | Yes | Yes | Yes | Partial |

## Ecosystem Position

Reasonix sits in the **terminal coding agent** space alongside [[claude-code]], [[opencode]], [[aider]], and [[cursor]]. Its unique positioning:

1. **DeepSeek-exclusive** — unlike multi-provider tools, every layer is tuned to DeepSeek's prefix-cache mechanic
2. **Cost-first** — the entire architecture serves the goal of "cheap enough to leave running"
3. **Open + community-driven** — MIT license, active Discord, `good first issue` tickets with acceptance criteria
4. **Three-surface rendering** — same React dashboard across CLI (Ink TUI), browser, and desktop (Tauri)

## Related Pages

- [[concepts/agent-loop-architecture]] — Agent loop patterns
- [[concepts/agent-design-principles]] — Production-grade agent engineering
- [[entities/deepseek]] — DeepSeek AI company and models
- [[entities/claude-code]] — Anthropic's terminal coding agent
- [[entities/opencode]] — OpenCode multi-agent coding system
- [[concepts/mcp]] — Model Context Protocol
- [[concepts/memory-system]] — Agent memory architecture

## References

- Source: `raw/articles/deepseek-reasonix-2026.md` (synthesized from local codebase + docs + web)
- Official docs: https://esengine.github.io/DeepSeek-Reasonix/
- Architecture: `docs/ARCHITECTURE.md`
- CLI Reference: `docs/CLI-REFERENCE.md`
- DeepSeek API integration docs: https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix
