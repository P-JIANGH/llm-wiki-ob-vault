---
title: DeepSeek-TUI
created: 2026-04-30
updated: 2026-05-04
type: entity
tags: [ai, agent, llm, coding-agent, deepseek, tui, rust, tool]
sources: [~/DeepSeek-TUI/README.md, ~/DeepSeek-TUI/docs/ARCHITECTURE.md, ~/DeepSeek-TUI/docs/COMPETITIVE_ANALYSIS.md, ~/DeepSeek-TUI/docs/MODES.md, ~/DeepSeek-TUI/docs/MCP.md, ~/DeepSeek-TUI/docs/TOOL_SURFACE.md, ~/DeepSeek-TUI/docs/SUBAGENTS.md, ~/DeepSeek-TUI/PROMPT_ANALYSIS.md, ~/DeepSeek-TUI/AGENTS.md, ~/DeepSeek-TUI/docs/MEMORY.md, ~/DeepSeek-TUI/docs/ACCESSIBILITY.md, ~/DeepSeek-TUI/docs/RUNTIME_API.md, ~/DeepSeek-TUI/docs/OPERATIONS_RUNBOOK.md, ~/DeepSeek-TUI/TAKEOVER_PROMPT.md, ~/DeepSeek-TUI/v0.8.8-coordinator-prompt.md, ~/DeepSeek-TUI/Cargo.toml]
---

# DeepSeek-TUI

Terminal-native coding agent built around DeepSeek V4's 1M-token context and prefix cache. Single binary (Rust), no Node/Python runtime required. **v0.8.9** (workspace version, 2026).

## What It Is

DeepSeek TUI is a **keyboard-driven TUI coding agent** that gives DeepSeek frontier models direct access to your workspace — reading/editing files, running shell commands, managing git, searching the web, orchestrating sub-agents — all through a fast terminal interface.

**Built for DeepSeek V4** (`deepseek-v4-pro` / `deepseek-v4-flash`) with 1M-token context windows and native thinking-mode (chain-of-thought) streaming.

## Key Features

### Core Agent Capabilities
- **Native RLM** (`rlm_query` tool) — fans out 1–16 cheap `deepseek-v4-flash` children in parallel for batched analysis/decomposition
- **Thinking-mode streaming** — shows DeepSeek's chain-of-thought as it reasons in real time
- **Full tool suite** — file ops, shell, git, web search/browse, apply-patch, sub-agents, MCP servers
- **1M-token context** — automatic intelligent compaction when context fills up

### Interaction Modes
- **Plan** — read-only exploration, no file/shell mutations
- **Agent** — interactive with approval for shell + paid tools
- **YOLO** — auto-approved all tools, for trusted repos
- **Reasoning effort tiers** — `off → high → max` via Shift+Tab

### Unique Capabilities (vs OpenCode / Codex CLI)
- **RLM** — sandboxed Python REPL with `llm_query()` helpers for batch/bulk LLM processing; no equivalent in competitors
- **Automations** — scheduled recurring tasks with cron-style RRULE recurrence
- **Durable tasks** — restart-aware persistent task objects with evidence tracking (gate runs, PR attempts)
- **Turn revert** — undo workspace changes per turn via side-git snapshots (`/restore`, `revert_turn`)
- **Data validation** — JSON/TOML validation tool
- **Finance** — live stock/crypto quotes
- **Web run** — headless browser interaction
- **Inline LSP diagnostics** — post-edit diagnostics from rust-analyzer, pyright, gopls, clangd, typescript-language-server

### Security & Extensibility
- **MCP protocol** — connect to Model Context Protocol servers for extended tooling
- **Lifecycle hooks** — pre/post tool execution hooks (stdout, jsonl, webhook)
- **Skills system** — plugin/skill loading from `~/.deepseek/skills/`, `.agents/skills/`, `.opencode/skills/`, `.claude/skills/`
- **SSRF protection** for `fetch_url` — hostname validation, DNS pinning, blocked internal IP ranges
- **Project-config keys denied** at workspace scope — prevents malicious `.deepseek/config.toml` overrides

### Sessions & Durability
- **Session save/resume** — checkpoint and resume long sessions
- **Workspace rollback** — side-git pre/post-turn snapshots without touching repo's `.git`
- **Crash recovery** — offline queue persisted to `~/.deepseek/sessions/checkpoints/offline_queue.json`
- **HTTP/SSE runtime API** — `deepseek serve --http` for headless agent workflows

## Architecture: Dispatcher → TUI → Engine → Tools

```
User Interface
  TUI (ratatui) | One-shot Mode | Config/CLI
         ↓
Core Engine
  Agent Loop (core/engine.rs)
  Session | Turn Mgmt | Tool Orchestration
         ↓
Tool & Extension Layer
  Tools (shell, file, git, web, sub-agents, MCP) | Skills | Hooks | MCP Servers
         ↓
Runtime API + Task Management
  HTTP/SSE Runtime API | Persistent Task Manager
         ↓
LLM Layer
  LLM Client Abstraction → DeepSeek Client (OpenAI-compatible Chat Completions API)
```

### Core Crates (workspace members)
- **`crates/core`** — agent loop, session management, turn orchestration, capacity flow guardrails
- **`crates/tui-core`** — event-driven TUI state machine scaffold
- **`crates/tui`** — main TUI binary with ratatui, LSP subsystem, RLM sandbox
- **`crates/agent`** — model/provider registry (ModelRegistry) for resolving model IDs to endpoints
- **`crates/config`** — config loading, profiles, env var precedence, per-project overlay
- **`crates/execpolicy`** — approval/sandbox policy engine
- **`crates/hooks`** — lifecycle hooks (stdout, jsonl, webhook) for pre/post tool events
- **`crates/mcp`** — MCP client + stdio server for Model Context Protocol tool servers
- **`crates/state`** — SQLite thread/session persistence layer
- **`crates/app-server`** — HTTP/SSE + JSON-RPC app server transport for headless workflows
- **`crates/secrets`** — OS keyring integration for API key storage
- **`crates/tools`** — shared tool invocation primitives (tool result/error/capability types)
- **`crates/protocol`** — request/response framing and protocol types
- **`crates/cli`** — `deepseek` dispatcher binary entry point (clap, routing)

**Dependency graph (bottom-up):**
```
Layer 0 (leaves): deepseek-protocol, deepseek-config, deepseek-state, deepseek-tui-core
Layer 1: deepseek-tools, deepseek-mcp, deepseek-hooks, deepseek-execpolicy
Layer 2: deepseek-agent
Layer 3: deepseek-core
Layer 4: deepseek-app-server, deepseek-tui
Layer 5: deepseek-tui-cli (deepseek dispatcher)
```

### LLM Integration
- Uses DeepSeek's OpenAI-compatible Chat Completions API: `https://api.deepseek.com/v1/chat/completions`
- Also supports: `deepseek-v4-pro`, `deepseek-v4-flash`, NVIDIA NIM, Fireworks, SGLang (self-hosted)
- Streaming-first for responsiveness

### Tool System
- **File ops:** `read_file`, `list_dir`, `write_file`, `edit_file`, `apply_patch`
- **Search:** `grep_files` (pure-Rust regex, no `rg` shell-out), `file_search`, `web_search`, `fetch_url`
- **Shell:** `exec_shell`, `exec_shell_wait`, `exec_shell_interact`, `exec_shell_cancel`, `task_shell_start`, `task_shell_wait`
- **Git:** `git_status`, `git_diff`, `github_issue_context`, `github_pr_context`, `github_comment`, `github_close_issue`
- **Tasks:** `task_create`, `task_list`, `task_read`, `task_cancel`, `checklist_write`, `checklist_add/update/list`
- **Verification:** `task_gate_run` — run verification command and attach structured evidence to durable task
- **PR attempts:** `pr_attempt_record`, `pr_attempt_list`, `pr_attempt_read`, `pr_attempt_preflight`
- **Automations:** `automation_create`, `automation_list`, `automation_update`, `automation_pause/resume/delete`, `automation_run`
- **Sub-agents:** `agent_spawn`, `agent_result`, `agent_assign`, `agent_cancel`, `resume_agent`, `agent_list`, `agent_send_input`, `agent_resume`
- **Parallel fan-out comparison:**
  - `agent_spawn` — full sub-agent loop, 10 concurrent default (max 20), thousands of tokens per task, minutes wall-clock
  - `rlm_query` — one-shot non-streaming, 16 children max, ~hundreds of tokens, seconds wall-clock

**Sub-agent role taxonomy:**

| Role | Stance | Writes? | Runs shell? | Typical use |
|---|---|---|---|---|
| `general` | flexible, do whatever parent says | yes | yes | default, multi-step tasks |
| `explore` | read-only; map relevant code fast | no | yes (read) | "find every call site of `Foo`" |
| `plan` | analyse and produce strategy | minimal | minimal | "design migration; don't execute" |
| `review` | read-and-grade with severity scores | no | no | "audit this PR for bugs" |
| `implementer` | land specific change, min edit | yes | yes | "rewrite `bar.rs::Foo::bar` to do X" |
| `verifier` | run tests/validation, report outcome | no | yes (test) | "run cargo test, report" |
| `custom` | explicit narrow tool allowlist | depends | depends | locked-down dispatch |

### Data Flow
1. User input → TUI → `core/engine.rs`
2. Message → LLM via streaming client
3. Tool calls extracted from response → dispatched through typed tool registry
4. Pre-execution hooks run
5. Approval requested (non-YOLO)
6. Tool executed (possibly sandboxed on macOS)
7. Post-execution hooks run
8. LSP post-edit hook fires (if file edited and LSP enabled)
9. Results stream back into transcript

## Competitive Position

### Where DeepSeek TUI Excels
- RLM (recursive language model) — batch/bulk LLM processing in Python sandbox
- Finance — live stock/crypto quotes
- Automations — scheduled recurring tasks
- Durable tasks with evidence tracking
- Turn revert via side-git snapshots
- Data validation
- Web run (headless browser)
- Comprehensive git/GitHub operations
- Project map generation

### Gaps vs Competitors (OpenCode, Codex CLI)
1. **LSP tool** (highest priority) — go-to-definition, find references, hover, call hierarchy. OpenCode has it, DeepSeek TUI doesn't (only post-edit diagnostics)
2. **Path-pattern permissions** — granular allow/deny by tool × file path pattern
3. **Persistent memory** — cross-session user preferences and project conventions
4. **Pre/Post-tool-use hooks** (DeepSeek TUI has hooks but not full event surface)
5. **Skill auto-discovery** — multi-location scanning (DeepSeek TUI has partial: `.deepseek/skills/`)
6. **Agent profiles with permission inheritance**
7. **Tool search for MCP** — on-demand MCP tool discovery to avoid context bloat
8. **Shell sandboxing** — macOS Seatbelt, Linux bubblewrap/Landlock

### System Prompt Design ("Mismanaged Genius" Hypothesis)

The system prompt (v0.8.x) has excellent safety rails but was written for a less capable model, treating RLM and sub-agents as **specialty escape hatches** rather than **default strategic tools**. The PROMPT_ANALYSIS.md documents 7 gaps:

1. **RLM framed as last resort** — actually has 3 patterns: CHUNK (long input), BATCH (many items), RECURSE (decomposition + critique). Prompt only acknowledges CHUNK.
2. **Sub-agents as "implementation only"** — contradicts Plan mode which correctly says "spawn read-only sub-agents for parallel investigation". In Agent mode (where most work happens), model underuses parallel exploration.
3. **No "Batch Everything" instinct** — instruction to batch independent tool calls exists but is buried; model fires one tool, waits, fires another even when independent.
4. **Thinking budget too conservative** — "Light" thinking for code generation understates V4's capability. Suggested bump: Medium for single-function, Deep for multi-file refactor.
5. **No "Verify Before Claiming" pattern** — model trusts memory over live tool output, doesn't re-read specific lines before patching.
6. **No composition heuristic for complex work** — model creates plan + checklist but doesn't re-evaluate plan between phases.
7. **Approval mode contradiction** — Agent mode waits for approval on EACH step individually instead of batching.

The fix isn't to add more rules but to reframe: parallel-first heuristic, positive sub-agent strategy, RLM as strategic not specialty tool.

### Architectural Patterns
- **vs OpenCode:** Client/server arch (TUI is one client), plugin system (hot-loadable JS/TS), multi-provider
- **vs Codex CLI:** App-server protocol (v2 RPC), feature flag system (60+ flags), Bazel+Cargo dual build, snapshot testing

## Installation

```bash
npm i -g deepseek-tui
deepseek

# or via cargo (Rust 1.85+)
cargo install deepseek-tui-cli --locked   # provides `deepseek`
cargo install deepseek-tui     --locked   # provides `deepseek-tui`

# Auth
deepseek auth set --provider deepseek
```

Prebuilt binaries: Linux x64, Linux ARM64, macOS x64, macOS ARM64, Windows x64.

## Config Files
- `~/.deepseek/config.toml` — main config
- `~/.deepseek/mcp.json` — MCP server config
- `~/.deepseek/skills/` — user skills
- `~/.deepseek/sessions/` — session history
- `~/.deepseek/sessions/checkpoints/` — crash checkpoint + offline queue
- `~/.deepseek/snapshots/` — side-git workspace snapshots
- `~/.deepseek/tasks/` — background task records
- `~/.deepseek/audit.log` — append-only audit log

## Version History
- **v0.8.9** (workspace) — latest
- **v0.8.8** — TUI polish, accessibility (NO_ANIMATIONS=1), sub-agent cap 5→10, load_skill tool, user-memory MVP, SSL_CERT_FILE support
- **v0.8.7** — selection works across transcript, self-update fix
- **v0.8.6** — AGENTS.md bootstrap (/init), inline LSP diagnostics, self-update, /share (session sharing), session save/resume
- **v0.8.5** — SSRF protection, schema-driven config editor, DeepseekCN provider, atomic file writes, panic safety
- **v0.8.0** — shell stability, Windows REPL runtime hardening
- **v0.7.8** — shell detach (Ctrl+B), exec_shell_cancel, Unicode glob fix
- **v0.7.6** — UI localization (ja, zh-Hans, pt-BR), paste burst detection, composer history search, grouped /config editor

## Session Longevity (Critical)

DeepSeek TUI sessions **degrade and crash** if worked sequentially without management. The session accumulates every message and tool result in `api_messages` and `history` with **no automatic pruning** (auto-compaction disabled by default since v0.6.6). Session saves serialize the entire bloated array.

**Survival rules for multi-hour sprints:**

1. **Delegate everything to sub-agents.** Sub-agents start fresh sessions. Parent stays coordinator.
2. **Batch tool calls.** Fire 3 `read_file` + 2 `grep_files` in one turn — dispatcher runs them in parallel.
3. **Compact aggressively at 60% context**, not 80%. A compacted session that stays fast beats a dead session.
4. **Max 3 sequential turns before delegating.** Turn 4 reading files one-by-one = already lost.
5. **Use RLM for batch classification.** `rlm` with `llm_query_batched` does 15 items in one turn.
6. **Check every 3 turns:** context <60%? Sub-agents running? PRs ready?

## RLM Tool Patterns

The `rlm_query` tool (sandboxed Python REPL) has **three distinct use cases**:

| Pattern | When to use | Example |
|---|---|---|
| **CHUNK** | Single input too large for context (>50K tokens) | Process a whole file, transcript, multi-doc corpus |
| **BATCH** | Many independent items needing LLM attention | Classify 20 entries, extract from 30 docs |
| **RECURSE** | Problem benefits from sub-LLM critique | Decomposition + second opinion on reasoning |

`llm_query_batched` fans out to cheap `deepseek-v4-flash` children in parallel (up to 16), completing in seconds what would take 15 sequential reads.

## Provider Support

DeepSeek TUI supports multiple backends:
- **DeepSeek Platform** (`api.deepseek.com`) — default
- **DeepSeek China** (`api.deepseeki.com`) — for mainland China users, auto-detected via `zh-*` locale
- **NVIDIA NIM** (`deepseek-ai/deepseek-v4-pro`)
- **Fireworks AI** (`accounts/fireworks/models/deepseek-v4-pro`)
- **SGLang** (self-hosted, `localhost:30000`)

### Accessibility
- `NO_ANIMATIONS=1` — startup env var forcing `low_motion=true` + `fancy_animations=false`
- `low_motion` — suppresses spinners, fade-ins, footer drift, active-cell pulse; slows idle redraw to ~120ms
- `calm_mode` — collapses tool-output details; useful for screen readers
- `show_thinking` / `show_tool_details` — per-setting toggles in `/settings`
- Terminal-native: pure text transcript, works with VoiceOver/Orca on macOS/Linux terminals

### User Memory
- Opt-in via `DEEPSEEK_MEMORY=on` or `config.toml [memory] enabled = true`
- Injects `~/.deepseek/memory.md` verbatim into system prompt every turn (above volatile boundary, survives prefix cache)
- Three ways to add: `# ` prefix in composer (no turn fires), `/memory` slash command, `remember` tool (auto-approved)
- File format: timestamped Markdown bullets, max 100 KiB
- Sub-agents inherit memory and can also use `remember`
- [[deepseek-tui-memory]] concept page covers design rationale and tool shape

### Operations Runbook ([[deepseek-tui-runbook]])
- `deepseek doctor --json` — machine-readable health check for workbench integration
- Incident procedures: turn hangs, network offline queue, crash recovery, MCP failures, schema errors
- `~/.deepseek/sessions/checkpoints/` — crash checkpoint + offline queue persistence
- `~/.deepseek/tasks/` — durable background task records
- `Esc`/`Ctrl+C` interrupts turn; `Ctrl+B` detaches foreground shell

### Runtime API (`deepseek serve --http`)
- Local-only HTTP/SSE API on `localhost:7878` (configurable)
- Thread/Turn/Item durable data model with append-only events and monotonic `seq` for replay
- Thread: `archived`, `allow_shell`, `trust_mode`, `auto_approve`, `model`, `mode`, `title`, `system_prompt` all PATCH-able
- Usage aggregation endpoint: token/cost grouped by day/model/provider/thread
- Restart semantics: `in_progress` turns marked `interrupted` on process restart
- [[deepseek-tui-runtime-api]] concept page covers full endpoint reference

### Multi-Agent Sprint Coordinator Pattern ([[deepseek-tui-coordinator]])
- TAKEOVER_PROMPT.md describes a reusable takeover protocol: fresh V4 session takes over a branch that grew too large
- v0.8.8-coordinator-prompt.md describes git-worktree parallel sprint decomposition into 7 streams (A–G)
- Core principle: **parent is coordinator, never implementer**; spawn sub-agents in worktrees, merge in dependency order
- Session survival: max 5 sub-agents, 3-turn rule before delegation, compact at 60%, RLM for batch work
- Parallel spawn strategy: up to 5 concurrent sub-agents, staggered batches
- Conflict prevention: file-level collision tracking across workstreams
- [[deepseek-tui-coordinator]] concept page covers the full sprint pattern

## Related
- [[opencode]] — competitor coding agent
- [[claude-code]] — competitor coding agent
- [[deepseek]] — the model/API provider
- [[coding-agents]] — broader category of AI coding tools
- [[llm-tools]] — tool use patterns in LLMs
- [[deepseek-tui-memory]] — user memory feature design
- [[deepseek-tui-runbook]] — operations and incident response
- [[deepseek-tui-runtime-api]] — HTTP/SSE runtime API reference
- [[deepseek-tui-coordinator]] — multi-agent git-worktree sprint pattern
