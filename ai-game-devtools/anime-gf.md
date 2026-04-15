---
title: anime.gf
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, llm, desktop, electron, agent, open-source]
sources: [raw/articles/ai-game-devtools/anime-gf.md]
---

# anime.gf

Open-source desktop LLM frontend with character card system, supporting multiple LLM providers via a unified chat interface.

## Overview

anime.gf is a private & open-source Electron desktop application that provides a character-driven chat UI for LLMs. Users create "character cards" (persona definitions) and chat with them using configurable LLM backends. Early access alpha v0.0.1™® — positioned as "open source waifus on the desktop."

The app is built with [[electron]] + [[React]] + [[TypeScript]], using [[tailwindcss]] for styling, [[better-sqlite3]] for local storage, and [[tRPC]] for type-safe IPC between the main and renderer processes.

## Features

- **Character cards**: Create, drag-drop import/export, edit, delete, restore deleted cards
- **User personas**: Multiple persona profiles per user
- **Chat management**: Reset, delete, rewind (message history), regeneration, continue generation
- **Multi-provider LLM**: OpenAI, Anthropic, Mistral, Together AI + any OpenAI-compatible endpoint (groq, ollama, vllm)
- **Generation settings**: temperature, topP, topK, max reply tokens, max context tokens, custom API URL
- **Jailbreak prompt**: Custom system prompt override for the active chat
- **Themes**: Preset CSS themes (manual CSS editing via source; in-app theme editor is WIP)
- **Auto-updater**: Electron auto-updater since v0.0.2
- **Cross-platform**: Windows (.exe), Linux, macOS binaries included in releases

## Architecture

```
src/
├── renderer/src/
│   ├── app/          # Pages: app.tsx (shell), chats.tsx, create.tsx, collections.tsx
│   │                # Settings: settings.tsx, settings_keys.tsx, settings_chat.tsx,
│   │                # settings_persona.tsx, settings_advanced.tsx, settings_deleted.tsx
│   ├── lib/
│   │   ├── reply.ts  # generate(), regenerate(), continue_() — LLM response flow
│   │   ├── context.ts # Builds conversation context window for LLM
│   │   ├── queries.ts # Database queries via tRPC
│   │   ├── card.ts   # Card import/export (file drag-drop)
│   │   └── store/    # Zustand state stores
│   └── components/   # Sidebar, UI primitives
└── preload/          # IPC bridge (file system, blob, settings APIs)
```

The reply flow: `app.tsx` → user message → `reply.generate()` → `context.get()` (builds conversation window) → `getProvider()` (selects backend) → `provider.getChatCompletion()` → response rendered via `render()`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop framework | Electron |
| Frontend | React 18, TypeScript |
| Build | electron-vite + Vite |
| Styling | Tailwind CSS + Radix UI |
| State | Zustand |
| Database | better-sqlite3 (SQLite) |
| API | tRPC (electron-trpc) |
| Routing | @tanstack/router |
| Forms | react-hook-form + Zod |
| Markdown | react-markdown + remark-gfm |
| Animation | framer-motion |

## License

[[GNU AGPL v3]] — the full source code is available on GitHub.

## Connections

- Related desktop LLM UIs: [[jan]] (local-first), [[llama2-webui]] (browser-based), [[novel]] (AI writing app)
- Related agent frameworks: [[auto-gpt]], [[crewai]], [[langchain]]
- Character-card format overlaps with SillyTavern/Victorum ecosystem (both use JSON card import/export)
