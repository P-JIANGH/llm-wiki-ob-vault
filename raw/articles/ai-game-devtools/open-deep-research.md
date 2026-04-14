# Open Deep Research

> Source: https://github.com/dzhng/deep-research
> Cloned: 2026-04-14
> Author: Duet (duet.so)
> License: MIT (ISC in package.json)

## README Summary

An AI-powered research assistant that performs iterative, deep research on any topic by combining search engines, web scraping, and large language models.

**Goal:** Simplest implementation of a deep research agent — agent refines its research direction over time and deep dives into a topic. Repo size kept under 500 LoC.

## How It Works

Iterative loop:
1. Takes user query + breadth/depth parameters
2. Generates SERP queries using LLM
3. Scrapes results via Firecrawl
4. Processes results to extract learnings + follow-up directions
5. Recursively explores deeper if depth > 0
6. Generates comprehensive markdown report

## Architecture

**Entry point:** `src/run.ts`
**Core engine:** `src/deep-research.ts` (main recursive research loop)
**AI providers:** `src/ai/providers.ts` (model abstraction layer)
**Text processing:** `src/ai/text-splitter.ts`
**Prompts:** `src/prompt.ts`
**API server:** `src/api.ts`

### Key Dependencies
- `@mendable/firecrawl-js` — web search & scraping
- `ai` (Vercel AI SDK) — LLM inference with structured output
- `@ai-sdk/openai` — OpenAI models (o3-mini default)
- `@ai-sdk/fireworks` — Fireworks AI (for DeepSeek R1)
- `lodash-es`, `js-tiktoken` — text processing
- `p-limit` — concurrency control

### Supported Models
- **Default:** OpenAI `o3-mini` (structured outputs)
- **DeepSeek R1:** via Fireworks AI (`FIREWOKS_KEY`)
- **Custom endpoints:** OpenAI-compatible APIs (OpenRouter, Gemini, etc.)

## Features
- Iterative deep research with configurable breadth & depth
- Intelligent query generation from LLM
- Concurrent search processing (configurable limit)
- Smart follow-up question generation
- Comprehensive markdown report with sources
- DeepSeek R1 support via Fireworks

## Config
- `FIRECRAWL_KEY` — Firecrawl API key (search + scraping)
- `OPENAI_KEY` — OpenAI API key
- `FIRECRAWL_BASE_URL` — self-hosted Firecrawl
- `FIREWOKS_KEY` — Fireworks API (for DeepSeek R1)
- `OPENAI_ENDPOINT` / `OPENAI_MODEL` — local LLM
- `CUSTOM_MODEL` — custom OpenAI-compatible model
- `CONCURRENCY_LIMIT` — parallel search limit

## License
MIT
