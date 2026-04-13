# BabyAGI UI — Source Analysis

**Repository:** miurla/babyagi-ui  
**URL:** https://github.com/miurla/babyagi-ui  
**Date:** 2026-04-13  
**Source:** GitHub README + package.json analysis

## What It Is

BabyAGI UI is a web-based user interface for running [BabyAGI](https://github.com/yoheinakajima/babyagi) — designed to make it easier to run and develop with BabyAGI in a browser, like ChatGPT. It is a port of BabyAGI with LangChain.js and a custom web UI.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (frontend + API routes) |
| AI/Agent | LangChain.js (v0.0.64) |
| Vector DB | Pinecone (for memory/embedding storage) |
| UI Components | Radix UI |
| Styling | Tailwind CSS |
| Deployment | Vercel (one-click deploy) |

## Key Dependencies

- `langchain: ^0.0.64` — Agent logic
- `@pinecone-database/pinecone: ^0.0.10` — Vector store
- `ai: ^2.1.31` — AI SDK (Vercel AI)
- `openai: ^3.2.1` — OpenAI API client
- `next: ^13.4.16` — Next.js framework
- `@radix-ui/*` — Headless UI components
- `tailwindcss: ^3.3.1` — CSS framework
- `i18next` — Internationalization
- `serpapi` — Google search API (for BabyBeeAGI search tool)

## Architecture

The project is a standard Next.js 13 app:

```
src/
├── components/
│   ├── Agent/        # AgentBlock, TaskBlock, AgentInput, AgentLoading, etc.
│   ├── Sidebar/      # Collapsible sidebar with ExecutionRow, SidebarSettings
│   └── Mobile/      # Navbar for mobile
├── styles/           # globals.css with Tailwind
```

Key components:
- **AgentBlock** — displays agent messages and reasoning
- **TaskBlock** — shows individual tasks in the execution pipeline
- **Sidebar** — collapsible sidebar showing execution history
- **SidebarSettings** — configuration panel (Pinecone index, API keys)
- **AgentInput** — user input field with parallel tasking support

## Features

- [x] Collapsible sidebar
- [x] User input & parallel tasking (BabyDeerAGI-style)
- [x] API updates (gpt-3.5-turbo-0613, gpt-3.5-turbo-16k-0613, gpt-4-0613)
- [x] Skills Class for easy skill creation (BabyElfAGI-style)
- [x] Backend agent logic aggregation
- [x] Frontend hooks for agent handling
- [ ] GPT-4 Turbo support
- [ ] Llama2 model support

## How It Works

1. User enters a goal in the web UI
2. Backend creates a BabyAGI agent using LangChain.js
3. Agent decomposes goal into tasks using OpenAI
4. Tasks are stored in Pinecone for memory/retrieval
5. Results stream back to the UI in real-time
6. Sidebar shows execution history and task status

## Configuration

Requires `.env` file with:
- `OPENAI_API_KEY` — OpenAI API key
- `PINECONE_API_KEY` + `PINECONE_ENVIRONMENT` — Pinecone vector DB
- `SERPAPI_KEY` — Optional, for search tool (BabyBeeAGI)

Pinecone index must be created in advance.

## Differences from BabyAGI (Python)

| Aspect | BabyAGI (Python) | BabyAGI UI |
|--------|-----------------|------------|
| Interface | CLI / Terminal | Web browser |
| Framework | Python / Flask / SQLAlchemy | Next.js / TypeScript |
| Agent | Custom functionz graph | LangChain.js |
| Memory | SQLite | Pinecone (cloud) |
| Deployment | Local / server | Vercel (one-click) |

## Related Projects

- [yoheinakajima/babyagi](https://github.com/yoheinakajima/babyagi) — Original Python BabyAGI
- [babyagi/babydeeragi](https://twitter.com/yoheinakajima/status/1666313838868992001) — Extended version with parallel tasking
- [babyagi/babyelfagi](https://twitter.com/yoheinakajima/status/1678443482866933760) — Extended version with Skills Class
