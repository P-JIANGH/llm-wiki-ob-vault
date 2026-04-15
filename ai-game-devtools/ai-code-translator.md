---
title: AI Code Translator
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, ai, code, open-source]
sources: [raw/articles/ai-game-devtools/ai-code-translator.md]
---

# AI Code Translator

Use AI to translate code from one programming language to another via a web UI.

## Overview

Simple Next.js web app by [mckaywrigley](https://github.com/mckaywrigley) that lets users paste code in one language and get equivalent code in another. Users provide their own OpenAI API key, which is stored in `localStorage`. Supports streaming responses with auto-copy to clipboard.

## Technical Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13.2.4 (Pages Router) |
| Language | TypeScript 5.0.3 |
| Styling | Tailwind CSS 3.3.1 |
| Code Editor | @uiw/react-codemirror + Tokyo Night theme |
| Streaming | eventsource-parser (SSE parsing) |
| API Runtime | Next.js Edge Runtime |
| AI Provider | OpenAI Chat Completions API |

## Key Features

- **3 translation modes:** Code→Code, Code→Natural Language, Natural Language→Code
- **Few-shot prompting:** Hard-coded examples per mode to guide the model
- **Streaming output:** Real-time token-by-token rendering via SSE
- **Auto clipboard copy:** Output automatically copied after completion
- **Model selection:** Toggle between `gpt-3.5-turbo` (6K char limit) and `gpt-4` (12K char limit)
- **Docker support:** Dockerfile + docker-compose.yml for containerized deployment
- **Bidirectional NL:** Natural Language ↔ Code (no Code→Code when one side is NL)

## Supported Languages

JavaScript, Python, TypeScript, Go, Rust, C++, Java, Ruby, Natural Language

## Architecture

```
pages/index.tsx        — Two-panel UI (input/output), model/language selectors
pages/api/translate.ts — Edge Runtime API route, proxies to OpenAI SSE stream
utils/index.ts         — createPrompt() + OpenAIStream(), SSE parsing
components/           — APIKeyInput, CodeBlock, TextBlock, LanguageSelect, ModelSelect
```

## Prompt Strategy

Uses a system prompt with in-context few-shot examples (via `endent` for clean template formatting). Temperature set to 0 for deterministic output. No fine-tuned model required — generic GPT-3.5/GPT-4 handles translation via prompting alone.

## License

No explicit LICENSE file in the repository — MIT implied by convention.

## Related

- [[ai-game-devtools/codegeex4]] — CodeGen series for code translation (THUDM, larger scope)
- [[ai-game-devtools/deepseek-coder]] — DeepSeek code model with translation capabilities
- [[ai-game-devtools/text-generation-webui]] — oobabooga's LLM Web UI with code-related features
