# Void — Open Source Cursor Alternative

**Source:** https://github.com/voideditor/void
**Date:** 2026-04-17

## Overview

Void is an open-source Cursor alternative. It allows AI agents to work on your codebase with checkpoint and visualization of changes, and supports bringing any model or hosting locally. Void sends messages directly to providers without retaining user data.

**Note:** The Void team has paused work on the IDE to explore novel coding ideas. They will not be actively reviewing Issues and PRs but will respond to email inquiries about building and maintaining your own version.

## Architecture

Void is a **fork of VSCode** (microsoft/vscode repository). It is an Electron application with two processes:
- **Main process** (electron-main): handles internals, can import node_modules
- **Browser process** (browser): handles UI/HTML, can use window/browser APIs

### Key Source Locations

- All Void-specific code lives in `src/vs/workbench/contrib/void/`
- LLM message pipeline routes from sidebar → electron-main → provider
- The build pipeline is in a separate repo: `voideditor/void-builder`

### Core Terminology

| Term | Description |
|------|-------------|
| Editor | The thing you type code in (contains tabs) |
| Model | Internal representation of file contents (ITextModel type) |
| URI | Resource path a model represents |
| Workbench | Container for editors, terminal, file system tree |
| Service | Singleton class registered via registerSingleton |
| Action/Command | Registerable functions callable by user or internally |

### LLM Message Pipeline

Messages flow from sidebar → modelCapabilities → sendLLMMessage (electron-main) → provider.
Sending from main process avoids CSP issues with local providers and enables node_modules usage.

**Supported Providers:** OpenAI, Anthropic, Google (Gemini), Mistral, Ollama, Groq
**Chat Modes:** normal, gather, agent

### Apply System

Void has two apply modes:
1. **Fast Apply** — Uses Search/Replace blocks (`<<<< ORIGINAL / ======= / >>>>> UPDATED`), works on 1000+ line files
2. **Slow Apply** — Rewrites entire file

**Key terminology:**
- **DiffZone** — A {startLine, endLine} region showing red/green diff areas
- **DiffArea** — Generalization tracking line numbers
- **DiffZone** can stream with llmCancelToken

The `editCodeService` runs Apply for all three trigger points: Apply button, Edit tool call, Cmd+K.

### Writing Files

Void writes to a text model via URI — no need to load/save. Handled in `voidModelService`.

### Settings

`voidSettingsService` stores providers, models, global settings. Implicit dependency for core Void services.

**FeatureName:** Autocomplete | Chat | CtrlK | Apply
**ModelSelection:** {providerName, modelName} pair
**ChatMode:** normal | gather | agent

## Dependencies (from package.json)

**AI/LLM SDKs:**
- @anthropic-ai/sdk ^0.40.0
- @google/genai ^0.13.0
- @mistralai/mistralai ^1.6.0
- @modelcontextprotocol/sdk ^1.11.2 (MCP support)
- ollama ^0.5.15
- openai ^4.96.0
- groq-sdk ^0.20.1

**UI/Framework:**
- react ^19.1.0, react-dom ^19.1.0
- lucide-react ^0.503.0
- tailwindcss ^3.4.17
- electron 34.3.2

**Build:**
- TypeScript ^5.8.0-dev.20250207
- webpack ^5.94.0
- gulp ^4.0.0

## License

MIT (inherited from VSCode fork)

## Version

1.99.3 (based on VSCode 1.99.3)
