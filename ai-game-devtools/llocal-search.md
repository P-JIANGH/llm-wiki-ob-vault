---
title: LLocalSearch
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, agent, tool, local, open-source, rag]
sources: [raw/articles/ai-game-devtools/llocal-search.md]
---

# LLocalSearch

Local AI search agent that wraps Ollama LLMs with tool-calling capabilities (web search, web scraping, vector retrieval) for recursive research.

## Overview

LLocalSearch is a privacy-respecting, fully local alternative to commercial AI search products. It runs entirely on consumer hardware (reportedly works on a 300€ GPU) with no API keys required. The agent recursively uses tools — calling web search, scraping pages, and querying a vector store — until it can answer the user's question with live citations.

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Frontend | SvelteKit, TailwindCSS, TypeScript, Vite |
| Backend | Go 1.22, langchaingo (forked v0.1.8) |
| LLM | Ollama (any local model, e.g. Llama 3, Mixtral) |
| Vector DB | ChromaDB |
| Memory | Redis (session buffer), conversation window |
| Search | SearXNG (self-hosted metasearch) |

## Architecture

```
User → SvelteKit UI (:3000)
         ↓ HTTP
   Go Backend (agentChain.go)
     ├─ langchaingo agents.Executor
     │   ├─ WebSearch tool (SearXNG)
     │   ├─ WebScrape tool (HTML parsing)
     │   └─ SearchVectorDB tool (ChromaDB)
     ├─ Ollama LLM (via Ollama SDK)
     └─ ChromaDB (RAG namespace per session)
         ↓
   SvelteKit UI (live streaming logs + links)
```

### Agent Loop (`agentChain.go`)
1. Initialize session with system prompt + conversation memory buffer
2. Create ChromaDB namespace for the session (RAG)
3. Executor runs `chains.Run()` with ConversationalAgent + 3 tools
4. Max iterations configurable (prevents infinite loops)
5. After completion, generate 3-word conversation title via LLM
6. Stream all steps back to frontend via HTTP SSE

### Tools
- **WebSearch** — queries SearXNG, returns snippets
- **WebScrape** — downloads + parses HTML, stores in ChromaDB
- **SearchVectorDB** — cosine similarity search against session's ChromaDB namespace

## Key Features
- Completely local (no API keys, no data leaves the machine)
- Live streaming logs show the agent's reasoning steps
- Source links in answers allow users to verify and dive deeper
- Follow-up questions supported via session memory
- Dark/light mode, mobile-friendly UI

## Differences from Similar Tools
- vs [[AutoGPT]]: AutoGPT is Python-based and designed for autonomous task execution; LLocalSearch focuses specifically on web research with live source citation
- vs [[AIOS]]: AIOS is an OS-level LLM kernel with broad scheduling; LLocalSearch is a focused research agent with a SvelteKit UI
- vs [[LangChain]] agents: LLocalSearch uses a Go langchaingo stack with a purpose-built Docker Compose stack (Ollama + ChromaDB + SearXNG)

## Status
- Development paused — author notes it's been over a year without active development
- Rewrite/private beta in progress
- Llama3 support blocked on langchaingo stop word handling

## License
MIT (inferred from project structure, no explicit LICENSE file)

## Related
- [[autogpt]] — Python autonomous agent
- [[aios]] — AI agent OS/kernel
- [[LangChain]] — LLM application framework (Python)
- [[ChatDev]] — Multi-agent development platform
