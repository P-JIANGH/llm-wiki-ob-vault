# pi-mono GitHub Repository

**URL:** https://github.com/badlogic/pi-mono
**License:** MIT
**Author:** badlogic (Mario Zechner)
**Stars:** (not captured)
**Commits:** 3,805+
**Releases:** 203

## Overview

AI agent toolkit monorepo: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods.

## Packages

| Package | npm | Description |
|---------|-----|-------------|
| `@mariozechner/pi-ai` | Unified LLM API | 20+ providers (OpenAI/Anthropic/Google/Mistral/Groq/Cerebras/xAI/OpenRouter/Vercel/MiniMax等) |
| `@mariozechner/pi-agent-core` | Agent runtime | Tool calling, state management |
| `@mariozechner/pi-coding-agent` | Interactive CLI | Terminal coding harness |
| `@mariozechner/pi-tui` | Terminal UI | Differential rendering TUI library |
| `@mariozechner/pi-web-ui` | Web components | AI chat interface web components |
| `@mariozechner/pi-mom` | Slack bot | Delegates to coding agent |
| `@mariozechner/pi-pods` | CLI | vLLM GPU pod deployment management |

## pi-ai Provider Support

### Subscriptions (OAuth)
- Anthropic Claude Pro/Max
- OpenAI ChatGPT Plus/Pro (Codex)
- GitHub Copilot
- Google Gemini CLI
- Google Antigravity

### API Keys
- Anthropic, OpenAI, Azure OpenAI, Google Gemini, Vertex
- Amazon Bedrock, Mistral, Groq, Cerebras, xAI
- OpenRouter, Vercel AI Gateway, ZAI
- OpenCode Zen, OpenCode Go
- Hugging Face, Fireworks, Kimi For Coding, MiniMax
- Any OpenAI-compatible (Ollama, vLLM, LM Studio)

## Development Rules (AGENTS.md)

### Style
- Short, concise answers
- No emojis in commits/issues/PRs
- No fluff or filler text

### Code Quality
- No `any` types unless necessary
- Check `node_modules` for external API types before guessing
- Never use inline/dynamic imports for types
- Never downgrade code to fix type errors — upgrade dependencies
- Keybindings must be configurable (no hardcoded `matchesKey(keyData, "ctrl+x")`)

### Commands
- `npm run check` after code changes (NOT npm run dev/build/test)
- `npx tsx ../../node_modules/vitest/dist/cli.js --run test/specific.test.ts` for specific tests
- Never commit unless user asks

### Contribution Gate
- `lgtmi` → approves future issues
- `lgtm` → approves future issues + PR rights
- New issues/PRs from new contributors auto-closed

### Changelog
- Per-package: `packages/*/CHANGELOG.md`
- `## [Unreleased]` section, immutable after release

## Adding a New LLM Provider

Requires changes across 7 files:
1. `packages/ai/src/types.ts` — Add to `Api`, `StreamOptions`, `ApiOptionsMap`, `KnownProvider`
2. `packages/ai/src/providers/` — Create provider file with `stream<>()` and `streamSimple<>()` functions
3. Additional files in providers registry and type mappings

## Session Storage

Sessions stored as JSONL in `~/.pi/agent/sessions/`, organized by working directory. Tree structure with `id`/`parentId` for branching.

## Extension System

Extensions are TypeScript modules placed in:
- `~/.pi/agent/extensions/`
- `.pi/extensions/`
- Installed pi packages

Capabilities: custom tools, commands, keyboard shortcuts, event handlers, UI components, custom providers.
