# Novel — AI-Powered Notion-Style WYSIWYG Editor

**Source:** https://github.com/steven-tey/novel
**Date:** 2026-04-15
**License:** Apache-2.0

## Overview

Novel is an open-source Notion-style WYSIWYG (What You See Is What You Get) editor with AI-powered autocompletions powered by OpenAI. It is built for React and deployable to Vercel with one click. The editor supports AI text completion as users type, similar to GitHub Copilot but embedded in a block-based rich text editor.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15.1.4 |
| Text Editor | Tiptap 2.11.2 |
| AI Integration | OpenAI API + Vercel AI SDK 3.0.12 |
| Styling | TailwindCSS + Radix UI |
| Deployment | Vercel |
| Storage | Vercel Blob |
| Rate Limiting | Upstash Ratelimit |
| Monorepo | Turborepo 2.3.3 |
| Linting | Biome |

## Architecture (Monorepo)

```
novel/
├── apps/web/              # Next.js web application
│   ├── components.json    # shadcn/ui component config
│   └── package.json       # Depends on: novel (workspace), @ai-sdk/openai, ai
├── packages/
│   ├── headless/          # Core Tiptap editor package (npm publishable)
│   │   ├── src/           # Tiptap extensions + React components
│   │   └── dist/          # Built output (CJS + ESM)
│   └── tsconfig/          # Shared TypeScript configs
├── package.json           # Root: Turborepo + Changesets
├── turbo.json             # Turborepo pipeline config
└── biome.json             # Biome linter config
```

## Key Packages

### `@novel-ai/editor` (packages/headless)

Headless Tiptap editor with AI autocomplete. Peer dependency on React 18+.

**Tiptap Extensions (30+):**
- @tiptap/core, @tiptap/react, @tiptap/starter-kit
- Code block with syntax highlighting (lowlight/highlight.js)
- Image, Link, Placeholder, Task list, KaTeX math, YouTube embed
- Character count, Color, Text style, Underline, Highlight
- Markdown serialization via tiptap-markdown

**Other dependencies:**
- `cmdk` — Command menu (AI autocomplete trigger)
- `jotai` — Atomic state management
- `react-markdown` — Markdown rendering
- `react-moveable` — Drag/resize for embeds
- `tunnel-rat` — RPC state tunnel for headless components

### `apps/web`

Next.js application consuming the headless editor package.

**Key dependencies:**
- `@ai-sdk/openai` — OpenAI model provider
- `ai` v3.0.12 — Vercel AI SDK for streaming completions
- `@vercel/blob` — File/blob storage
- `@vercel/kv` — Redis-like KV storage
- `@upstash/ratelimit` — Rate limiting
- `lucide-react` — Icons
- `sonner` — Toast notifications
- `next-themes` — Dark/light theme

## AI Completions

- Powered by OpenAI (GPT models) via Vercel AI SDK streaming
- Uses `cmdk` command menu to trigger AI autocomplete
- `use-debounce` to avoid excessive API calls
- `@upstash/ratelimit` prevents abuse

## Community Ports (Cross-Framework)

- Svelte port: https://novel.sh/svelte
- Vue port: https://novel.sh/vue
- VSCode Extension: https://novel.sh/vscode (by @bennykok)

## Environment Variables

- `OPENAI_API_KEY` — OpenAI API key
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob storage token

## License

Apache-2.0
