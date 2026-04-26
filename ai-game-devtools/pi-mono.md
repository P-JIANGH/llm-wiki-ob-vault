---
title: pi-mono
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [ai, llm, agent, cli, typescript, monorepo]
sources: [raw/articles/ai-game-devtools/pi-mono.md]
---

# pi-mono

AI agent toolkit monorepo by [[badlogic]] (Mario Zechner). Provides a coding agent CLI, unified multi-provider LLM API, TUI/web UI libraries, Slack bot, and vLLM pod management.

## Packages

| Package | Description |
|---------|-------------|
| [[pi-coding-agent]] | Interactive terminal coding agent |
| [[pi-ai]] | Unified multi-provider LLM API |
| `pi-tui` | Terminal UI library with differential rendering |
| `pi-web-ui` | Web components for AI chat interfaces |
| `pi-mom` | Slack bot delegating to coding agent |
| `pi-pods` | CLI for vLLM GPU pod deployment |

## Architecture

pi-mono uses a layered architecture:
- **[[pi-ai]]** — Provider abstraction layer (20+ LLM providers)
- **[[pi-coding-agent]]** — Agent runtime + CLI on top of pi-ai
- **TUI/Web UI** — Presentation layer

## pi-coding-agent Core Design

See [[pi-coding-agent]] for full details.

### Session Management

Sessions stored as append-only JSONL trees in `~/.pi/agent/sessions/`:
- Each entry has `id`/`parentId` for tree structure
- `leafId` pointer tracks current position
- Supports in-place branching without losing history
- Compaction system handles long sessions via summarization

### Tool System

Default tools: `read`, `write`, `edit`, `bash`, `grep`, `find`, `ls`. Extensible via:
- **Extensions** (TypeScript modules in `~/.pi/agent/extensions/`)
- **Skills** (agent skills standard, auto-load or `/skill:name`)
- **Custom tools** via extension API

### Extension Architecture

Extension system exposes 60+ event types:
- `BeforeAgentStartEvent`, `AgentStartEvent`, `AgentEndEvent`
- `BeforeProviderRequestEvent`, `AfterProviderResponseEvent`
- `ToolCallEvent` types (BashToolCallEvent, ReadToolCallEvent, etc.)
- Session lifecycle: `SessionStartEvent`, `SessionShutdownEvent`, `SessionCompactEvent`
- Tree navigation: `NavigateTreeEvent`, `BeforeForkEvent`

Extensions register via factory pattern with async initialization support.

## Development Rules

See [[AGENTS.md]] conventions:
- No `any` types, check `node_modules` for real types
- Never inline/dynamic imports for types
- `npm run check` after changes (NOT dev/build/test)
- Per-package CHANGELOGs under `## [Unreleased]`
- `lgtmi`/`lgtm` approval system for contributors

## Key Design Decisions

### Intentional Omissions
- No MCP built-in (build as extension)
- No sub-agents (use tmux or extensions)
- No permission popups (use containers)
- No plan mode (write plans to files)
- No built-in to-dos (use TODO.md)

### Multiple Modes
- Interactive (default TUI)
- Print (`-p`) — single response and exit
- JSON (`--mode json`) — JSONL output
- RPC (`--mode rpc`) — stdin/stdout process integration
- SDK — embeddable in applications

## Related

- [[hermes-agent]] — Another production agent framework
- [[autoresearch]] — Karpathy's autonomous LLM research framework
- [[gstack]] — AI software factory pattern
