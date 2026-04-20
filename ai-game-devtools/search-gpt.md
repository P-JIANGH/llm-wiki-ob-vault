---
title: SearchGPT
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, cli, api, ai]
sources: [raw/articles/ai-game-devtools/search-gpt.md]
---

# SearchGPT

A lightweight Node.js CLI tool that connects `ChatGPT` (GPT-3.5-turbo) to live Google Search results, enabling internet-aware AI responses beyond the model's training cutoff.

## Overview

SearchGPT is a proof-of-concept by Tobias Büschel that bridges Google Custom Search API with OpenAI's chat completions API. When a user asks a question, the tool fetches live web pages, extracts their text content, and feeds it as context to GPT-3.5-turbo before generating an answer — effectively giving ChatGPT real-time internet access via a terminal interface.

## Key Features

- **Internet-augmented answers**: Searches Google and feeds page content to GPT as context
- **CLI interface**: Interactive terminal REPL via Node.js readline
- **Token-aware**: Uses `gpt-3-encoder` to count and trim context within model token limits
- **Source attribution**: Returns URL references alongside generated answers
- **Zero-setup deploy**: `npx search-gpt` — no install required

## Technical Details

| Aspect | Value |
|--------|-------|
| Version | 1.2.0 |
| License | MIT |
| Runtime | Node.js ≥ 18 |
| Module | ESM (type: module) |
| Model | GPT-3.5-turbo |
| Entry | index.js (~200 lines) |
| Published | npm as `search-gpt` |

## Architecture

Single-file, stateless pipeline:

```
User prompt → Google Custom Search API (top 5 results)
            → Fetch HTML → html-to-text (target <main>)
            → Token count + trim (gpt-3-encoder)
            → OpenAI Chat Completions (gpt-3.5-turbo)
            → Display answer + source URLs
```

Key design choices:
- **Stateless**: No conversation history carried between turns (avoids token limit issues)
- **HTML targeting**: Parses `<main>` element of pages to get primary content
- **Snippets as fallback**: Includes Google snippet text for pages that fail to crawl

## Dependencies

- `chalk` — colored terminal output
- `dotenv` — API key management via .env
- `gpt-3-encoder` — token counting for context trimming
- `html-to-text` — HTML → plain text conversion
- `node-fetch` — HTTP requests (Google Search + page fetch)

## Configuration

Requires three environment variables:
```sh
OPENAI_API_KEY=...
GOOGLE_SEARCH_API_KEY=...
GOOGLE_SEARCH_ID=...
```

Uses Google Programmable Search Engine (free tier available).

## Context in AI Game Dev Tooling

SearchGPT represents an early (2023) `retrieval-augmented generation` pattern implemented as a minimal CLI. It predates dedicated RAG frameworks like [[LangChain]] and [[LlamaIndex]] and demonstrates the core concept: augmenting LLM generation with retrieved web context. In the game dev context, similar patterns are used to give AI NPCs or AI assistants access to game wikis, documentation, or live game state.

## Comparison with Similar Tools

| Tool | Approach | Context |
|------|----------|---------|
| SearchGPT | Google CSE + GPT-3.5 CLI | Earliest simple proof-of-concept |
| [[LangChain]] | Framework with many retrieval backends | Production RAG |
| [[Perplexica]] | Open-source Perplexity clone | Web search + LLM |
| `LLM Answer Engine` | Next.js + web search | Production web app |

## Links

- GitHub: https://github.com/tobiasbueschel/search-gpt
- npm: https://www.npmjs.com/package/search-gpt
