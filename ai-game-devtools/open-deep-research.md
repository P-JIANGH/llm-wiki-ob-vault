---
title: Open Deep Research
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/open-deep-research.md]
---

# Open Deep Research

An AI-powered research assistant that performs iterative, deep research on any topic by combining search engines, web scraping, and large language models. Created by [Duet](https://duet.so).

## Overview

Open Deep Research implements a minimal deep research agent — keeps the repo under 500 LoC so it's easy to understand and build on top of. It iteratively refines research directions and generates comprehensive markdown reports with sources.

## Architecture

**Core engine** in `src/deep-research.ts` — recursive BFS-style research loop:
1. LLM generates SERP queries from the research prompt
2. Firecrawl scrapes search results (markdown format)
3. LLM extracts *learnings* + *follow-up questions* from each result
4. If depth > 0, recursively dives deeper with follow-up directions
5. Final pass generates markdown report with all sources

**Model abstraction** in `src/ai/providers.ts` — supports:
- OpenAI `o3-mini` (default, structured outputs)
- DeepSeek R1 via Fireworks AI (`FIREWORKS_KEY`)
- Any OpenAI-compatible endpoint via `OPENAI_ENDPOINT` + `CUSTOM_MODEL`

**Concurrency:** Multiple searches processed in parallel (configurable `FIRECRAWL_CONCURRENCY`, default 2).

## Tech Stack
- **Runtime:** Node.js 22.x
- **LLM SDK:** Vercel AI SDK (`ai` package) with structured output
- **Search/Scraping:** Firecrawl (`@mendable/firecrawl-js`)
- **Text processing:** js-tiktoken (token counting), lodash-es, p-limit

## Usage

```bash
npm start
# → Enter query, breadth (3-10), depth (1-5)
# → Final report saved as report.md or answer.md
```

## Game Dev Relevance

Can be used for [[multi-agent-interactive-classroom]]-style deep research workflows, or as a research engine for `ai-game-devtools` discovery — feeding into game content pipelines by gathering structured knowledge from the web.

## Related

- [[autoresearch]] — Karpathy's autonomous LLM research framework (similar iterative experiment loop)
- [[meta-gpt]] — Multi-agent framework that could incorporate deep research as a capability
- [[devika]] — Devika AI software engineer (similar agent architecture, different domain)
