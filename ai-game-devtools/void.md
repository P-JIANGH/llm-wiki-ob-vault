---
title: Void
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, code, code-completion, code-generation, desktop-app, typescript, ai]
sources: [raw/articles/ai-game-devtools/void.md]
---

# Void

> Open-source Cursor alternative — AI-powered code editor forked from VSCode.

## Overview

Void is an open-source IDE that brings AI agent capabilities directly into the codebase. Users can checkpoint and visualize AI-generated changes, bring any model or host locally, and send messages directly to providers without data retention.

The project is currently **paused** — the team has stopped active development to explore novel coding ideas, though Void continues to run without maintenance.

## Key Facts

| Field | Value |
|-------|-------|
| GitHub | voideditor/void |
| Base | VSCode 1.99.3 fork |
| License | MIT |
| Architecture | Electron (main + browser processes) |
| Key directory | `src/vs/workbench/contrib/void/` |
| Version | 1.99.3 |

## Technical Architecture

### Electron Dual-Process Design
- **Main process** (`electron-main/`): handles internals, imports node_modules, routes LLM messages to avoid CSP issues
- **Browser process** (`browser/`): UI rendering, uses window/browser APIs, no node_modules imports
- **Common** (`common/`): shared code, no special imports

### LLM Message Pipeline
Messages flow: sidebar → modelCapabilities → sendLLMMessage (electron-main) → provider. This design avoids CSP issues with local providers.

**Supported Providers:** OpenAI, Anthropic, Google Gemini, Mistral, Ollama, Groq
**MCP Support:** @modelcontextprotocol/sdk ^1.11.2
**Chat Modes:** normal, gather, agent

### Apply System (Code Modification)
- **Fast Apply**: Search/Replace blocks using `<<<< ORIGINAL / ======= / >>>>> UPDATED` syntax — works on 1000+ line files
- **Slow Apply**: Rewrites entire file
- **DiffZone**: {startLine, endLine} region showing red/green diffs, supports streaming with llmCancelToken
- **DiffArea**: Generalization tracking line numbers
- Single `editCodeService` handles all three triggers: Apply button, Edit tool call, Cmd+K

### Core Services
- `voidSettingsService`: stores providers, models, global settings (implicit dependency for core services)
- `voidModelService`: handles file writing via URI (no load/save needed)
- `editCodeService`: runs Apply with approval state tracking

## Dependencies

| Category | Key Packages |
|----------|-------------|
| LLM SDKs | openai ^4.96.0, @anthropic-ai/sdk ^0.40.0, @google/genai ^0.13.0, ollama ^0.5.15, groq-sdk ^0.20.1, @mistralai/mistralai ^1.6.0 |
| UI | react ^19.1.0, lucide-react ^0.503.0, tailwindcss ^3.4.17 |
| Runtime | electron 34.3.2 |
| Build | TypeScript ^5.8.0, webpack ^5.94.0, gulp ^4.0.0 |

## Differences from Similar Tools

- vs [[ai-game-devtools/bloop]]: Bloop is AI-powered code search; Void is a full AI IDE with inline code editing
- vs [[ai-game-devtools/codegeex4]]: CodeGeeX provides code generation as a model/API; Void integrates LLM directly into the editor UI with diff visualization
- vs [[ai-game-devtools/devon]]: Devon is an AI pair programming assistant (Electron+TUI); Void is a complete VSCode-fork IDE with built-in Apply/diff system
- vs [[cursor]]: Void aims to be the open-source Cursor alternative with similar agent-on-codebase capabilities

## Status

⏸️ **Development Paused** — Team exploring new coding ideas. No active issue/PR review. Email inquiries still answered for building/maintaining your own version.

## Links

- Website: https://voideditor.com
- Discord: https://discord.gg/RSNjgaugJs
- Project Board: https://github.com/orgs/voideditor/projects/2
- Build Pipeline: https://github.com/voideditor/void-builder
- Codebase Guide: VOID_CODEBASE_GUIDE.md
