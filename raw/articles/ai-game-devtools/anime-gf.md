# anime.gf — Source Summary

## Project Overview
- **Name**: anime.gf
- **URL**: https://github.com/cyanff/anime.gf
- **Type**: Desktop application (Electron)
- **License**: GNU AGPL v3
- **Description**: Private & open-source LLM frontend for desktop with character card system and multi-provider LLM support.标记为"Open source waifus on the desktop"的早期访问 alpha 产品。

## Tech Stack
- **Framework**: Electron (desktop cross-platform)
- **Frontend**: React 18 + TypeScript
- **Build tool**: electron-vite + Vite
- **UI**: Tailwind CSS + Radix UI components
- **State**: Zustand (React state management)
- **Database**: better-sqlite3 (local SQLite)
- **API layer**: tRPC (type-safe API between main/renderer)
- **Router**: @tanstack/router
- **Forms**: react-hook-form + Zod validation
- **Markdown**: react-markdown + remark-gfm
- **Other**: framer-motion (animations), cmdk (command menu), fuse.js (fuzzy search)

## Key Features
1. **Character Cards**: Create, import/export (drag-drop), edit, delete, restore deleted cards
2. **User Personas**: Multiple persona profiles
3. **Chat Management**: Chat reset, delete, rewind messages, response regeneration, continue generation
4. **Multi-Provider LLM**: OpenAI, Anthropic, Mistral, Together AI + any OpenAI-compatible endpoint (groq, ollama, vllm)
5. **LLM Settings**: temperature, topP, topK, max tokens, max context tokens, custom API URL
6. **Jailbreak Prompt**: Custom system prompt override
7. **Themes**: Preset CSS themes (editable via source)
8. **Auto-updater**: Electron auto-updater (v0.0.2+)
9. **Platforms**: Windows, Linux, macOS

## Architecture (src/renderer/src/)
- `app/app.tsx` — Main app shell with page routing (chats, collections, create, settings)
- `app/chats.tsx` — Chat list and conversation view
- `app/create.tsx` — Character card creation
- `app/collections.tsx` — Card collections management
- `app/settings/settings*.tsx` — Settings panels (API keys, persona, chat, advanced, deleted)
- `lib/reply.ts` — LLM response generation (generate, regenerate, continue_)
- `lib/context.ts` — Chat context building (conversation window management)
- `lib/queries.ts` — Database queries via tRPC
- `lib/card.ts` — Card import/export
- `lib/store/chatStore.ts` — Zustand chat state
- `components/SideBar.tsx` — Navigation sidebar
- `components/ui/` — Radix UI component library

## Platform Layer (src/preload/)
- Preload scripts expose IPC bridge for renderer to access native APIs (file system, blobs, settings)

## Package Info
- **npm name**: `agf`
- **Version**: 0.0.0
- **Author**: moecorp (cyan + snavu)

## Release Info
- Latest: v0.0.2 (2024-05-09)
- Builds: Windows (.exe), Linux, macOS

## Related/Similar
- [[novel]] — AI-first writing app (novel editor)
- [[llama2-webui]] — Text generation web UI (similar LLM chat UI)
- [[jan]] — Local LLM inference platform
