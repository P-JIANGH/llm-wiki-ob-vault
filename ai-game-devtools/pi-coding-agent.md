---
title: pi-coding-agent
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [ai, agent, cli, coding, typescript, terminal]
sources: [raw/articles/ai-game-devtools/pi-mono.md]
---

# pi-coding-agent

Interactive terminal coding agent by [[badlogic]]. Minimal harness that adapts to user workflows via extensions, skills, and customization — not the other way around.

npm: `[@mariozechner/pi-coding-agent](https://www.npmjs.com/package/@mariozechner/pi-coding-agent)`

## Core Philosophy

> Pi is aggressively extensible so it doesn't have to dictate your workflow.

**What's intentionally NOT included:**
- No MCP (build CLI tools with READMEs, or build an extension)
- No sub-agents (use tmux, build with extensions)
- No permission popups (run in a container or build your own confirmation flow)
- No plan mode (write plans to files)
- No built-in to-dos (use TODO.md)

## Running Modes

| Mode | Flag | Description |
|------|------|-------------|
| Interactive | (default) | Terminal interface |
| Print | `-p`, `--print` | Print response and exit |
| JSON | `--mode json` | Output all events as JSON lines |
| RPC | `--mode rpc` | Process integration over stdin/stdout |

## AgentSession — Core Abstraction

`AgentSession` manages the complete agent lifecycle in all run modes. Key responsibilities:

### State & Configuration
- Agent state access, model/thinking level management
- Event subscription with automatic session persistence
- Session branching and tree navigation
- Compaction (manual and auto-triggered)

### Key Interfaces

```typescript
interface AgentSessionConfig {
  agent: Agent;
  sessionManager: SessionManager;
  settingsManager: SettingsManager;
  cwd: string;
  scopedModels?: Array<{ model: Model; thinkingLevel?: ThinkingLevel }>;
  resourceLoader: ResourceLoader;
  customTools?: ToolDefinition[];
  modelRegistry: ModelRegistry;
}
```

### Prompting Methods
- `prompt(text, options?)` — Send prompt; handles extensions, templates, streaming queue
- `steer(text, images?)` — Queue steering message (interrupts current turn)
- `followUp(text, images?)` — Queue follow-up (waits for agent to finish)
- `sendCustomMessage(message, options?)` — Custom delivery modes

### Model Management
- `setModel(model)` — Set model directly; validates auth, saves to session
- `cycleModel(direction?)` — Cycle through scoped models
- `getAvailableThinkingLevels()` — Get available thinking levels

### Compaction
- `compact(customInstructions?)` — Manual compaction; aborts current operation first
- `abortCompaction()` — Cancel in-progress compaction
- `setAutoCompactionEnabled(enabled)` — Toggle auto-compaction

## Session Storage — SessionManager

Sessions are **append-only trees** stored as JSONL files in `~/.pi/agent/sessions/`.

### Entry Types

| Type | Purpose |
|------|---------|
| `message` | Agent message (user, assistant, custom) |
| `thinking_level_change` | Thinking level setting change |
| `model_change` | Provider/model change |
| `compaction` | Summary of compacted older entries |
| `branch_summary` | Summary when branching from path |
| `custom` | Extension-specific data (no LLM context) |
| `custom_message` | Extension data that participates in LLM context |
| `label` | User-defined bookmarks/markers |
| `session_info` | Session metadata (display name) |

### Tree Structure
- Each entry has `id` and `parentId` forming a tree
- `leafId` pointer tracks current position
- Compaction collapses old entries into summaries
- Branching creates new paths without losing history

### Factory Methods
```typescript
SessionManager.create(cwd, sessionDir?)      // New session with file persistence
SessionManager.open(path, sessionDir?)        // Open specific session file
SessionManager.continueRecent(cwd, sessionDir?) // Resume or create
SessionManager.inMemory(cwd)                  // In-memory (no persistence)
SessionManager.forkFrom(sourcePath, targetCwd) // Fork into different project
```

## Tool System

### Default Tools
`read`, `write`, `edit`, `bash`, `grep`, `find`, `ls`

### Built-in Editor Features
- `@` — Fuzzy-search project files
- `!command` — Run bash, send output to LLM
- `!!command` — Run bash silently
- `Tab` — Path completion
- `Shift+Enter` — Multi-line input
- `Ctrl+V` — Paste images

### ToolDefinition Interface
```typescript
interface ToolDefinition {
  name: string;
  description: string;
  parameters: TSchema;  // TypeBox schema
  // Execution via ToolCallEvent system
}
```

## Extension System

Extensions are TypeScript modules placed in:
- `~/.pi/agent/extensions/`
- `.pi/extensions/`
- Installed pi packages

### Extension Capabilities
- Custom tools, commands, keyboard shortcuts
- Event handlers for all lifecycle stages
- UI components and custom dialogs
- Custom providers (async initialization)

### Event Types (60+ types)
- **Agent lifecycle:** `BeforeAgentStartEvent`, `AgentStartEvent`, `AgentEndEvent`
- **Provider:** `BeforeProviderRequestEvent`, `AfterProviderResponseEvent`
- **Tools:** `BashToolCallEvent`, `ReadToolCallEvent`, `WriteToolCallEvent`, `EditToolCallEvent`, `GrepToolCallEvent`, `FindToolCallEvent`, `LsToolCallEvent`
- **Session:** `SessionStartEvent`, `SessionShutdownEvent`, `SessionCompactEvent`, `SessionBeforeTreeEvent`, `SessionBeforeForkEvent`
- **Tree:** `NavigateTreeEvent`, `SessionTreeEvent`
- **Input:** `InputEvent`, `UserBashEvent`

## Skills System

Skills use the Agent Skills Standard. Invoke via `/skill:name` or auto-load.

Places searched:
- `~/.pi/agent/skills/`
- `~/.agents/skills/`
- `.pi/skills/`

## Context Files

Pi auto-loads context from (in order):
1. `~/.pi/agent/AGENTS.md` (global)
2. Parent directories walking up from cwd
3. Current directory (`.pi/AGENTS.md` or `AGENTS.md`)

Can also use `CLAUDE.md`, `AGENTS.md`, or custom name.

## Settings

| Location | Scope |
|----------|-------|
| `~/.pi/agent/settings.json` | Global |
| `.pi/settings.json` | Project (overrides global) |

Key settings: `steeringMode`, `followUpMode`, `transport` (SSE/WebSocket/auto), `npmCommand`.

## Session Tree Navigation

- **`/tree`** — Navigate session tree in-place, preserve all history
- **`/fork`** — Create new session from previous user message
- **`/clone`** — Duplicate active branch to new session file
- **CLI:** `pi --fork <path|id>`

## Compaction

Long sessions exhaust context windows:
- **Manual:** `/compact` or `/compact <custom instructions>`
- **Automatic:** Triggers on context overflow (default: enabled)

Full history preserved in JSONL; use `/tree` to revisit original content.

## CLI Options

```bash
pi -c                  # Continue most recent session
pi -r                  # Browse and select sessions
pi --no-session        # Ephemeral mode
pi --session <path|id> # Use specific session
pi --fork <path|id>    # Fork session
pi --tools <list>      # Specify tool list
```

## Related

- [[pi-mono]] — Parent monorepo
- [[pi-ai]] — Unified LLM API (dependency)
- [[hermes-agent]] — Another production agent framework with tool registry pattern
- [[autoresearch]] — Karpathy's autonomous LLM research agent
