---
title: DeepSeek-TUI User Memory
created: 2026-05-04
updated: 2026-05-04
type: concept
tags: [deepseek, tui, memory, persistence, llm, prompt-engineering]
sources: [~/DeepSeek-TUI/docs/MEMORY.md]
---

# DeepSeek-TUI User Memory

A persistent cross-session note file injected into the system prompt every turn. Gives the model durable memory of user preferences and project conventions without repeating them per session.

## Overview

Memory is **opt-in**. When disabled (default), nothing is loaded and the `remember` tool is not surfaced. Zero overhead for users who haven't asked for it.

When enabled: `~/.deepseek/memory.md` is read at every prompt-build call and injected verbatim into the system prompt as an XML block above the volatile-content boundary — inside DeepSeek's prefix cache so it survives turn-over-turn.

## Enabling

```bash
# Via environment
export DEEPSEEK_MEMORY=on

# Via config (~/.deepseek/config.toml)
[memory]
enabled = true
```

Accepted truthy values: `1`, `on`, `true`, `yes`, `y`, `enabled`.

Restart TUI after toggling. Memory file path can be overridden:

```toml
memory_path = "~/.deepseek/memory.md"  # default
```

Or via `DEEPSEEK_MEMORY_PATH` env var (wins over config file).

## Three Ways to Add Notes

### 1. `# ` Composer Prefix (No Turn Fires)

Type a line starting with `#` (but not `##` or `#!`) in the composer:

```
# remember that this repo prefers 4-space indentation
```

The TUI intercepts the input, appends a timestamped bullet to the memory file, and confirms in the status line. **No turn fires** — you can keep typing your real question.

### 2. `/memory` Slash Command

| Subcommand | Effect |
|------------|--------|
| `/memory` or `/memory show` | Show resolved path and current contents inline |
| `/memory path` | Print just the resolved path |
| `/memory clear` | Replace file with empty marker |
| `/memory edit` | Print `${VISUAL:-${EDITOR:-vi}} <path>` to open in editor |
| `/memory help` | Show command-specific help and current path |

### 3. `remember` Tool (Model-Initiated)

When memory is enabled, the model gets an auto-approved `remember` tool:

```json
{
  "name": "remember",
  "description": "Append a durable note to the user memory file...",
  "input_schema": {
    "type": "object",
    "properties": {
      "note": { "type": "string" }
    },
    "required": ["note"]
  }
}
```

Auto-approved because writes are scoped to the user's own memory file — gating would defeat the purpose of automatic memory capture.

The tool description explicitly tells the model: **durable, single-sentence notes only**. Transient task state ("I'm currently editing foo.rs") is harmless but wasteful.

## System Prompt Injection Format

```xml
<user_memory source="/Users/you/.deepseek/memory.md">
- (2026-05-03 22:14 UTC) prefer pytest over unittest
- (2026-05-03 22:31 UTC) this codebase uses 4-space indentation
</user_memory>
```

The block sits above the volatile-content boundary so it stays inside DeepSeek's prefix cache.

## File Format

Plain Markdown with timestamped bullets:

```markdown
- (2026-05-03 22:14 UTC) prefer pytest over unittest
- (2026-05-03 22:31 UTC) this codebase uses 4-space indentation
- (2026-05-04 09:02 UTC) all PRs need 2 reviewers before merge
```

The loader reads the whole file verbatim. Timestamps are convention (not enforced) for human grooming. Files over 100 KiB are loaded but truncated with a marker.

## What Stays Out

| Category | Why Not |
|---------|--------|
| Secrets (API keys, tokens) | Plain text on disk, injected verbatim into system prompt |
| Transient task state | Changes every session; doesn't belong in cross-session memory |
| Conversation snippets | Use the `note` tool instead |
| Long instructions | Use `AGENTS.md` (project-level) or skills (reusable packs) |

## Memory vs Project Instructions

Memory is **user-scoped**, not repo-scoped:

- **Memory** → personal preferences that follow you across repos and sessions
- **Project instructions** (`AGENTS.md`, `.deepseek/instructions.md`) → repo-specific conventions that travel with the codebase

The memory loader currently reads one resolved file path. `@path` imports are not supported.

## Configuration Reference

| Setting | Default | Override |
|---------|---------|----------|
| Memory enabled | `false` | `[memory] enabled = true` or `DEEPSEEK_MEMORY=on` |
| Memory file path | `~/.deepseek/memory.md` | `memory_path = "..."` or `DEEPSEEK_MEMORY_PATH=` |
| Max file size | 100 KiB | (none; truncation marker shown) |

## Sub-Agent Behavior

Sub-agents inherit the user's memory file and can also use the `remember` tool. This means a sub-agent can capture a preference it discovers mid-task, and the parent session (and future sessions) will also know it.

## Privacy

- File lives entirely on your machine in `~/.deepseek/`
- Never uploaded to any cloud service
- Included inline in the system prompt sent to the LLM provider
- Provider-agnostic: switching providers uses the same file
- Per-user, not per-project

## Related

- [[deepseek-tui]] — main entity page
- [[deepseek-tui-coordinator]] — multi-agent sprint pattern
- [[deepseek-tui-runtime-api]] — HTTP/SSE runtime API
