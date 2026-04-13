---
title: BabyAGI UI
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, llm, agent, web-ui, open-source]
sources: [raw/articles/ai-game-devtools/babyagi-ui.md]
---

# BabyAGI UI

## Overview

**BabyAGI UI** (miurla/babyagi-ui) is a web-based user interface that brings [BabyAGI](https://github.com/yoheinakajima/babyagi) into the browser — think ChatGPT-style UI for running autonomous task-management agents. It is a port of BabyAGI built with **LangChain.js** (instead of Python), **Next.js** for the web layer, and **Pinecone** as the vector memory backend.

**Website:** https://babyagi-ui.vercel.app (demo)  
**GitHub:** https://github.com/miurla/babyagi-ui

## Key Facts

| Attribute | Detail |
|-----------|--------|
| License | MIT |
| Language | TypeScript / Next.js |
| Framework | Next.js 13 (App Router) + LangChain.js v0.0.64 |
| Memory | Pinecone (cloud vector DB) |
| AI Provider | OpenAI API |
| Deployment | Vercel (one-click deploy) |
| UI | Tailwind CSS + Radix UI |

## Architecture

BabyAGI UI is a standard Next.js 13 application:

```
src/
├── components/
│   ├── Agent/          # AgentBlock, TaskBlock, AgentInput, AgentLoading, InfoCard, FirstTimeMessage
│   ├── Sidebar/        # Collapsible sidebar: ExecutionRow, SidebarSettings, SidebarHeader, SidebarFooter
│   └── Mobile/         # Navbar
└── styles/             # Tailwind globals
```

**How the agent loop works:**
1. User enters a goal in the browser UI
2. Next.js API route creates a LangChain.js agent
3. Agent decomposes goal into tasks using OpenAI
4. Tasks stored in Pinecone for memory/retrieval
5. Results stream back to UI in real-time
6. Sidebar tracks execution history and task status

## Tech Stack

| Layer | Technology |
|-------|------------|
| Web Framework | Next.js 13.4 |
| Agent Framework | LangChain.js 0.0.64 |
| Vector DB | Pinecone |
| AI SDK | Vercel AI SDK (`ai` package) |
| OpenAI Client | openai.js 3.2.1 |
| UI Components | Radix UI (headless) |
| Styling | Tailwind CSS 3.3 |
| Search | SerpAPI (for BabyBeeAGI search tool) |

## Key Features

- **Collapsible sidebar** — execution history at a glance
- **Parallel tasking** — BabyDeerAGI-style multi-task execution
- **Skills system** — BabyElfAGI-style extensible skill class
- **Real-time streaming** — AI responses stream to the UI
- **Configurable models** — gpt-3.5-turbo / gpt-4 variants
- **Internationalization** — i18next for multi-language

## Configuration

Requires `.env`:
- `OPENAI_API_KEY` — OpenAI API key
- `PINECONE_API_KEY` + `PINECONE_ENVIRONMENT` — Pinecone vector store
- `SERPAPI_KEY` — Optional, for web search tool

Pinecone index must be pre-created before running.

## Differences from BabyAGI (Python)

| Aspect | BabyAGI (Python) | BabyAGI UI |
|--------|-----------------|------------|
| Interface | CLI / terminal | Web browser |
| Agent framework | Custom `functionz` graph | LangChain.js |
| Memory | SQLite + SQLAlchemy | Pinecone (cloud) |
| Web dashboard | Flask | Next.js (modern) |
| Deployment | Local / self-hosted | Vercel one-click |

## Related

- [[babyagi]] — Original Python BabyAGI (yoheinakajima) with functionz graph framework
- [[agentgpt]] — Browser-based autonomous agent, Next.js stack (comparison)
- [[auto-gpt]] — Another browser-accessible autonomous agent (comparison)
- [[aios]] — Agent OS with LangChain integration
