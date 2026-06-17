# Perplexica (now Vane) — Raw Source

> Source: https://github.com/ItzCrazyKns/Perplexica
> Cloned: 2026-04-14
> Note: Repository has been renamed to "Vane" but original URL Perplexica still redirects.

## README Summary

Vane (formerly Perplexica) is a **privacy-focused AI answering engine** that runs entirely on the user's own hardware. It combines knowledge from the internet with support for local LLMs (Ollama) and cloud providers (OpenAI, Claude, Groq), delivering accurate answers with cited sources while keeping searches private.

### Features
- Support for all major AI providers (Ollama, OpenAI, Claude, Gemini, Groq, etc.)
- Smart search modes: Speed Mode, Balanced Mode, Quality Mode
- Multiple search sources: web, discussions, academic papers
- Widgets for quick info (weather, calculations, stock prices)
- Web search powered by SearxNG (privacy-preserving meta-search)
- Image and video search
- File uploads (PDFs, text, images) for Q&A
- Domain-specific search
- Smart suggestions
- Discover feature for browsing trending content
- Search history (stored locally)
- API endpoint for developer integration

### Installation
- Docker (recommended): Single container with bundled SearxNG
- Non-Docker: Node.js + npm build
- One-click deploy: Sealos, RepoCloud, ClawCloud, Hostinger

### Architecture (from docs/architecture/README.md)
Next.js application with these key components:
1. **User Interface** — web chat UI with citations
2. **API Routes** — POST /api/chat, POST /api/search, GET /api/providers
3. **Agents and Orchestration** — question classification → parallel research + widgets → answer generation with citations
4. **Search Backend** — SearxNG meta-search for web results
5. **LLMs** — used for classification, answering, citation generation
6. **Embedding Models** — semantic search over uploaded files
7. **Storage** — Drizzle ORM for chat/message persistence

### Tech Stack
- Next.js (React framework)
- TypeScript
- Drizzle ORM (database)
- SearxNG (meta-search engine)
- Tailwind CSS
- Docker for deployment

### License
MIT License

### Key Directories
- src/app/api/ — API routes (chat, search, providers)
- src/app/agents/ — AI agent orchestration
- src/app/models/ — LLM provider integrations
- src/lib/ — utility functions
- searxng/ — SearxNG configuration
