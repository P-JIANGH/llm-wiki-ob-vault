# AI Code Translator — Source Analysis

**Project:** https://github.com/mckaywrigley/ai-code-translator
**Date:** 2026-04-15
**License:** MIT (implied — no LICENSE file found)

## Overview

Next.js web app that uses OpenAI to translate code between programming languages. User supplies their own API key. Simple, focused single-purpose tool.

## Architecture

- **Framework:** Next.js 13.2.4 + React 18.2.0 + TypeScript 5.0.3
- **Styling:** Tailwind CSS 3.3.1 + PostCSS
- **Code Editor:** @uiw/react-codemirror + Tokyo Night theme
- **Streaming:** eventsource-parser for OpenAI SSE streaming
- **Runtime:** Next.js API route with Edge Runtime

## Key Files

### pages/index.tsx
Main UI — two-panel layout (Input / Output). Uses CodeMirror for code blocks and plain textarea for natural language. Model selector (gpt-3.5-turbo / gpt-4), language dropdowns, API key input. Streams translation via fetch to /api/translate, auto-copies output to clipboard.

### pages/api/translate.ts
Edge Runtime API route. Accepts `{ inputLanguage, outputLanguage, inputCode, model, apiKey }`, calls `OpenAIStream()` utility, pipes SSE response directly back to client.

### utils/index.ts
Core logic — `createPrompt()` builds a few-shot prompt with in-context examples for 3 modes:
1. Natural Language → Code (uses `endent` to format the prompt)
2. Code → Natural Language (bullet point explanations)
3. Code → Code (direct translation)

`OpenAIStream()` makes the OpenAI Chat Completions API call with streaming enabled, parses SSE with `eventsource-parser`, and returns a `ReadableStream`.

### Supported Languages
JavaScript, Python, TypeScript, Go, Rust, C++, Java, Ruby, Natural Language (bidirectional)

### Code Length Limits
- gpt-3.5-turbo: 6000 chars max
- gpt-4: 12000 chars max

## Deployment

- `npm run dev` for local development
- `Dockerfile` + `docker-compose.yml` included
- API key stored in localStorage (user provides their own)

## Comparison

Minimal/single-file vs other code translator tools in the catalog. No training, no fine-tuning — pure prompt-based with few-shot examples embedded in the system prompt.
