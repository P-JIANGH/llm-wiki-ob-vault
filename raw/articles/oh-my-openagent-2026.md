# oh-my-openagent — The Best Agent Harness

**Source:** GitHub - code-yeongyu/oh-my-openagent (formerly oh-my-opencode)
**Captured:** 2026-05-17 | **Commit:** 53a740636 | **Branch:** dev | **Release:** v4.1.2
**Stars:** 57.1k | **Forks:** 4.6k | **License:** SUL-1.0 (Sustainable Use License)
**Runtime:** Bun (1.3.11+), TypeScript strict mode, ESNext

## Overview

OpenCode plugin (npm: `oh-my-opencode`, dual-published as `oh-my-openagent` during rename transition). Extends OpenCode with 11 agents, 54–61 lifecycle hooks across 58 dirs, 20–39 tools (config-gated), 3-tier MCP system, Hashline LINE#ID edit tool, IntentGate keyword detector, Team Mode (parallel multi-agent coordination), Boulder work tracking, configurable agent ordering, and Claude Code compatibility.

**src/ contains 2,041 TypeScript files (1,340 source + 701 test), ~294k LOC, 122 barrel index.ts files.**

## Key Differentiator

Anthropic blocked OpenCode because of oh-my-openagent — this harness breaks the walled garden. The tagline: "You don't need to pay $200 for 2 hours of work. The future isn't picking one winner; it's orchestrating them all."

## Architecture

### Initialization Flow (7 steps)

1. `installAgentSortShim()` — patches Array.prototype.{toSorted,sort} for canonical agent ordering
2. `initConfigContext()` — opencode-vs-openagent layout flag
3. `detectExternalSkillPlugin()` — warn on conflicts
4. `injectServerAuthIntoClient()` — auth headers into shared SDK client
5. `loadPluginConfig()` — JSONC parse → user/project merge → Zod validate → migrate
6. `initializeOpenClaw()` + `checkTeamModeDependencies()`
7. `createManagers()` → `createTools()` → `createHooks()` → `createPluginInterface()`

### 10 OpenCode Hook Handlers

| Handler | OpenCode Hook | Purpose |
|---------|---------------|---------|
| config | config | 6-phase pipeline: provider → plugin-components → agents → tools → MCPs → commands |
| tool | tool | 20–39 registered tools (config-gated) |
| chat.message | chat.message | First-message variant, session setup, keyword detection |
| chat.params | chat.params | Anthropic effort, think mode, runtime fallback override |
| chat.headers | chat.headers | Copilot x-initiator header injection |
| event | event | Session lifecycle, openclaw dispatch, runtime fallback |
| tool.execute.before | tool.execute.before | Pre-tool guards (write-guard, label-truncator, rules-injector, etc.) |
| tool.execute.after | tool.execute.after | Post-tool hooks (output truncator, comment-checker, hashline read-enhancer, etc.) |
| experimental.chat.messages.transform | experimental.chat.messages.transform | Context injection, thinking-block validation, tool-pair validation |
| experimental.session.compacting | experimental.session.compacting | Context + todo preservation across compaction |

### 5-Tier Hook Composition

- Session Hooks (24): context window monitoring, preemptive compaction, session recovery, session notification, think mode, model fallback, anthropic context window limit recovery, auto-update checker, agent usage reminder, non-interactive env, interactive bash session, ralph loop, edit error recovery, delegate task retry, start work, prometheus-md-only, sisyphus-junior notepad, no-sisyphus-gpt, no-hephaestus-non-gpt, question label truncator, task resume info, anthropic effort, runtime fallback, legacy plugin toast
- ToolGuard Hooks (16 [+1 team-mode]): comment checker, tool output truncator, directory agents injector, directory readme injector, empty task response detector, rules injector, tasks todo-write disabler, write existing file guard, bash file read guard, hashline read enhancer, json error recovery, read image resizer, todo description override, webfetch redirect guard, fsync skip warning
- Transform Hooks (5 [+2 team-mode]): claude code hooks, keyword detector, context injector messages transform, thinking block validator, tool pair validator
- Continuation Hooks (7): stop continuation guard, compaction context injector, compaction todo preserver, todo continuation enforcer (boulder), unstable agent babysitter, background notification hook, atlas hook
- Skill Hooks (2): category skill reminder, auto slash command

Total: 54 base, 61 with team-mode.

## 11 Agents

| Agent | Default Model | Temp | Mode | Purpose |
|-------|---------------|------|------|---------|
| **Sisyphus** | claude-opus-4-7 max | (default) | primary | Main orchestrator, plans + delegates; thinking budget: 32K tokens |
| **Hephaestus** | gpt-5.5 medium | (default) | primary | Autonomous deep worker ("The Legitimate Craftsman") |
| **Atlas** | claude-sonnet-4-6 | 0.1 | primary | Todo-list orchestrator |
| **Prometheus** | claude-opus-4-7 max | (override) | primary | Strategic planner (interview mode); may ONLY edit .md files |
| **Oracle** | gpt-5.5 high | 0.1 | subagent | Read-only code consultation (no write/edit/task) |
| **Librarian** | gpt-5.4-mini-fast | 0.1 | subagent | External docs/code search (no write/edit/task) |
| **Explore** | gpt-5.4-mini-fast | 0.1 | subagent | Contextual grep (no write/edit/task) |
| **Multimodal-Looker** | gpt-5.5 medium | 0.1 | subagent | PDF/image analysis (ALL tools denied except Read) |
| **Metis** | claude-sonnet-4-6 | 0.3 | subagent | Pre-planning consultant |
| **Momus** | gpt-5.5 xhigh | 0.1 | subagent | Plan reviewer (no write/edit/task) |
| **Sisyphus-Junior** | claude-sonnet-4-6 | 0.1 | subagent | Category-spawned executor |

### Canonical Agent Order
Sisyphus → Hephaestus → Prometheus → Atlas (primary core), then alphabetical. Enforced by `installAgentSortShim()` patching Array.prototype.sort.

### Tool Restrictions
- Oracle: denied write, edit, task, call_omo_agent
- Librarian: denied write, edit, task, call_omo_agent
- Explore: denied write, edit, task, call_omo_agent
- Multimodal-Looker: ALL tools except Read
- Atlas: denied task, call_omo_agent
- Momus: denied write, edit, task
- Prometheus: .md-only writes enforced via hook (path-based)

## Team Mode (v4.0 — opt-in)

Parallel multi-agent coordination. OFF by default. Enable via `team_mode.enabled` in config.

- Lead agent + up to 8 parallel members
- Real-time tmux visualization
- Dedicated team_* tools (11 tools: create, delete, shutdown_request/approve/reject, send_message, task CRUD, status, list)
- Built-in skills: hyperplan (5 hostile critics), security-research (3 hunters + 2 PoC engineers)
- Member eligibility: eligible (sisyphus, atlas, sisyphus-junior), conditional (hephaestus), hard-reject (oracle, librarian, explore, multimodal-looker, metis, momus, prometheus)
- Storage: ~/.omo/teams/{name}/ (config.json, state.json, mailbox/, tasklist.jsonl, worktrees/)

## Tool Catalog (config-gated)

**Always on (20):** lsp_goto_definition, lsp_find_references, lsp_symbols, lsp_diagnostics, lsp_prepare_rename, lsp_rename, grep, glob, ast_grep_search, ast_grep_replace, session_list, session_read, session_search, session_info, background_output, background_cancel, call_omo_agent, task (delegate), skill, skill_mcp

**Conditional (+19):** look_at, interactive_bash, task_create/get/list/update, edit (hashline), team_* (11 tools)

## Key Features

### IntentGate
Analyzes true user intent before classifying or acting. No literal misinterpretations. Keywords: ultrawork, search, analyze, team.

### Hashline (Hash-Anchored Edits)
Inspired by Can Bölük's "The Harness Problem". Every line tagged with content hash (`LINE#ID`). Edits reference the tag; if file changed, hash mismatch rejects edit. Grok Code Fast 1 result: 6.7% → 68.3% success rate.

### Ralph Loop (`/ulw-loop`)
Self-referential loop — doesn't stop until 100% done.

### Ultrawork (`ultrawork` / `ulw`)
One command activates every agent. Doesn't stop until done.

### Multi-Level Config
Walked configs (closer wins): <pwd up to $HOME>/.opencode/oh-my-openagent.jsonc → User config: ~/.config/opencode/oh-my-openagent.jsonc → Zod defaults

### 3-Tier MCP System
1. **Built-in** (src/mcp/): 3 remote HTTP MCPs (websearch via Exa/Tavily, context7, grep_app)
2. **Claude Code** (.mcp.json): `${VAR}` env expansion, allowlist via mcp_env_allowlist
3. **Skill-embedded** (SKILL.md YAML): stdio + HTTP, OAuth 2.0 + PKCE + DCR step-up

### Boulder State
Boulder-state work tracking + cli/boulder subcommand. Todo continuation enforcer yanks idle agent back to work.

### OpenClaw Bidirectional Integration
Outbound: HTTP/shell event dispatchers. Inbound: Discord/Telegram daemon polling → tmux send-keys.

### Other Features
- LSP + AST-grep: workspace rename, pre-build diagnostics, AST-aware rewrites
- Background agents: 5+ specialists in parallel, context stays lean
- Tmux integration: full interactive terminal (REPLs, debuggers, TUIs)
- Claude Code compatible: hooks, commands, skills, MCPs, plugins all work unchanged
- Skill-embedded MCPs: skills carry their own MCP servers — no context bloat
- Prometheus Planner: interview-mode strategic planning before execution
- /init-deep: auto-generates hierarchical AGENTS.md files throughout the project
- Comment checker: no AI slop in comments
- Model fallback: 4-step pipeline (override → category-default → provider-fallback → system-default)
- Runtime fallback: reactive provider error recovery (distinct from proactive model-fallback)

## Architecture Invariants

- Canonical agent order enforced via Array.prototype patch
- Hashline edit + Read pairing: every Read output tagged with LINE#ID hashes
- Per-session MCP isolation: Tier-3 clients keyed by `${sessionID}:${skillName}:${serverName}`
- Two independent fallback systems: model-fallback (proactive) vs runtime-fallback (reactive)
- Internal message injection is dangerous: all session.prompt calls must go through `prompt-async-gate.ts`

## CLI Commands

```bash
bun test                          # Root Bun test suite
bun run build                     # Build plugin (ESM + .d.ts + cli + schema)
bun run build:all                 # Build + 11 platform binaries
bunx oh-my-opencode install       # Interactive setup wizard
bunx oh-my-opencode doctor        # Health diagnostics
bunx oh-my-opencode run <message> # Non-interactive session
bunx oh-my-opencode mcp-oauth login <server-url>  # Tier-3 MCP OAuth
```

## Build & Publishing

- CI: 7 workflows (ci, publish, publish-platform, sisyphus-agent, refresh-model-capabilities, cla, lint-workflows, web-ci, web-deploy)
- 11 platform binaries via bun compile (darwin/linux/windows, AVX2 + baseline)
- Dual npm package: oh-my-opencode (legacy) + oh-my-openagent
- Telemetry: on by default, disable via OMO_SEND_ANONYMOUS_TELEMETRY=0 or OMO_DISABLE_POSTHOG=1

## Conventions

- Runtime: Bun only. Never npm/yarn/pnpm.
- TS: strict mode, ESNext, bundler moduleResolution, bun-types (never @types/node)
- Tests: Bun test, co-located *.test.ts, given/when/then style
- Factory pattern: createXXX() for all tools, hooks, agents
- File naming: kebab-case, no catch-all files (utils.ts/helpers.ts/service.ts banned)
- Imports: relative within module, barrel across modules. No path aliases.
- Config: JSONC with comments + trailing commas, Zod v4, snake_case keys

## Anti-Patterns (Blocked by CI/Review)

No `as any`, @ts-ignore, @ts-expect-error. No em dashes/en dashes/AI filler. No empty catch blocks. No Arrange-Act-Assert comments. No business logic in index.ts. Prometheus may ONLY edit .md files.
