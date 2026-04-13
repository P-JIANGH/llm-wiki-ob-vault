# LLocalSearch — Raw Source

> GitHub: https://github.com/nilsherzig/LLocalSearch
> Cloned: 2026-04-14 via gitcode.com mirror
> License: MIT (inferred from project structure)

## What it is

LLocalSearch is a local AI search agent wrapper around Ollama-running LLMs, enabling them to use tools (web search, web scraping, vector DB retrieval) recursively to answer questions with live internet data.

## Architecture

### Frontend (SvelteKit + TailwindCSS)
- `src/` — SvelteKit app with routes and lib components
- `static/` — Static assets
- `package.json` — SvelteKit ^4.2.7, TailwindCSS ^3.4.1, Vite ^5.1.7, TypeScript ^5
- Mobile-friendly, dark/light mode

### Backend (Go)
- `backend/` — Go 1.22 service
- `agentChain.go` — Core agent loop using langchaingo agents.Executor + ConversationalAgent
- `llm_tools/` — Tool implementations:
  - `simple_websearch.go` — Web search via SearXNG
  - `tool_webscrape.go` — Web scraping tool
  - `tool_search_vector_db.go` — Vector DB search via ChromaDB
- `go.mod` — Uses `github.com/nilsherzig/langchaingo` (forked langchaingo v0.1.8), Ollama SDK, ChromaDB client

### Infrastructure (Docker Compose)
- `backend` — nilsherzig/llocalsearch-backend
- `frontend` — nilsherzig/llocalsearch-frontend (serves on :3000)
- `chromadb` — Vector store for RAG
- `redis` — Session caching
- `searxng` — Privacy-respecting metasearch engine

### Key Dependencies
- langchaingo (tmc/langchaingo) — LLM agent framework with tool calling
- Ollama SDK — Local LLM inference
- ChromaDB — Vector store
- Redis — Session buffer memory

## Features
- Completely local, no API keys required
- Runs on low-end hardware (demo uses 300€ GPU)
- Live logs + source links in answers
- Follow-up question support
- Mobile-friendly, dark/light mode

## Planned
- User accounts + private RAG (upload docs, Google Drive, Confluence)
- Long-term memory per user
- Llama3 support (blocked on langchaingo stop word issue)

## License
MIT (inferred — no explicit LICENSE file found, standard open-source project structure)
