---
title: Novel
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, ai, editor, nextjs, open-source]
sources: [raw/articles/ai-game-devtools/novel.md]
---

# Novel

An open-source Notion-style WYSIWYG editor with AI-powered autocompletions powered by OpenAI.

## Overview

Novel is a block-based rich text editor built on [Tiptap](https://tiptap.dev/) with real-time AI text completion as users type — similar to GitHub Copilot embedded in a Notion-like editing experience. Developed by [Steven Tey](https://github.com/steven-tey), deployable to Vercel with one click. Apache-2.0 licensed.

## Technical Architecture

**Monorepo structure** (Turborepo + Changesets):

| Package | Role |
|---------|------|
| `apps/web` | Next.js 15 web app — UI shell, command palette, AI streaming |
| `packages/headless` | Core Tiptap editor — npm-publishable headless React component |

**Key dependencies:**

- **Editor engine:** Tiptap 2.11 with 30+ extensions (code blocks, images, KaTeX math, YouTube embeds, task lists, markdown serialization)
- **AI layer:** Vercel AI SDK 3.0 + `@ai-sdk/openai` for OpenAI streaming completions; `cmdk` for command-palette-triggered AI
- **Storage:** Vercel Blob for file storage, Upstash KV + Ratelimit for session state
- **Styling:** TailwindCSS + Radix UI + shadcn/ui components
- **State:** Jotai (atomic), `next-themes` (dark/light)

## AI Completion Mechanism

AI completions are triggered through a command menu (`cmdk`) inside the Tiptap editor. The Vercel AI SDK streams responses from OpenAI models. Rate limiting via `@upstash/ratelimit` prevents abuse. Debouncing via `use-debounce` reduces unnecessary API calls.

## Cross-Framework Support

Beyond React, community ports exist for:
- **Svelte:** https://novel.sh/svelte
- **Vue:** https://novel.sh/vue
- **VSCode:** Extension at https://novel.sh/vscode (by @bennykok) — embeds the editor in VSCode

## Game Dev Relevance

Novel is a production-grade reference for building AI-augmented content editors in games:
- In-game narrative/WYSIWYG story editors with AI autocomplete for dialogue, descriptions, quest text
- NPC dialogue editors powered by [[llm-integration]] + [[chatdev]]-style multi-agent pipelines
- Quest/design document editors with AI assistance for game designers

Similar to [[ai-writer]] (BlinkDL's AI writing tool) but with a block-based Notion-style UI rather than raw markdown.

## Related

- [[ai-writer]] — BlinkDL AI writing tool
- [[notebook-ai]] — indentlabs Notion-like AI notebook
- [[longwriter]] — THUDM LongWriter for long-form AI writing
- [[chatgpt-api-unity]] — Unity integration with LLM APIs
