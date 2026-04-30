---
title: oh-my-opencode
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, cli, open-source]
sources: [raw/articles/oh-my-opencode-2026.md]
---

# oh-my-opencode

## Overview

OpenCode 的增强包/插件系统。SUL-1.0 license，TypeScript + Bun，302+ stars。

**GitHub:** https://github.com/opensoft/oh-my-opencode
**License:** SUL-1.0 (Sustainable Use License)
**Stars:** 302+ | **Forks:** 27+
**Package Manager:** Bun

## Architecture

```
oh-my-opencode/
├── src/
│   ├── agents/        # 10 AI agents
│   ├── hooks/         # 31 lifecycle hooks
│   ├── tools/         # 20+ tools
│   ├── features/      # Background agents, Claude Code compat
│   ├── shared/        # 50 cross-cutting utilities
│   ├── cli/           # CLI installer, doctor
│   ├── mcp/           # Built-in MCPs
│   └── config/        # Zod schema, TypeScript types
├── packages/          # 7 platform-specific binaries
└── script/            # build scripts
```

## Agents (10 total)

| Agent | Model | Purpose |
|-------|-------|---------|
| **Sisyphus** | `anthropic/claude-opus-4-5` | Default orchestrator. Plans, delegates, executes. Todo-driven |
| **oracle** | `openai/gpt-5.2` | Architecture, code review, debugging |
| **librarian** | `opencode/big-pickle` | Multi-repo analysis, docs |
| **explore** | `opencode/gpt-5-nano` | Fast codebase grep |
| **multimodal-looker** | `google/gemini-3-flash` | PDF/image/diagram analysis |

Plus 5 planning agents: Prometheus, Metis, Momus (plan validation).

## Key Features

- **Ultrawork Mode**: `ulw` → full automatic mode
- **Prometheus Mode**: Tab → interview-based planning, then `/start-work`
- **31 Lifecycle Hooks**: Full Claude Code compatibility
- **20+ Tools**: LSP refactoring, AST-aware search
- **Built-in MCPs**: Exa (websearch), Context7 (docs), Grep.app (GitHub)
- **7 Platform Binaries**: macOS (ARM64/x64), Linux (x64/ARM64/Alpine), Windows (x64)

## Installation

```bash
bunx oh-my-opencode install
```

## Related

- [[opencode]] — Base project
- [[open-design]] — 上游引用了 oh-my-opencode
