# LLocalSearch

Source: https://github.com/nilsherzig/LLocalSearch  
License: MIT  
Tech Stack: Go (backend), SvelteKit + TypeScript + TailwindCSS (frontend), Ollama (LLM), ChromaDB (vector DB)

## Overview

LLocalSearch is a fully local AI search agent that runs Large Language Models (like ChatGPT alternatives) with tool-use capabilities for internet search. It allows LLMs to recursively search the web for current information without requiring API keys or external services.

> [!WARNING]  
> This version has not been under development for over a year. The author is working on a rewrite/relaunch within a private beta.

## Key Features

- 🕵‍♀ **Completely local** — No API keys required, privacy-respecting
- 💸 **Low hardware requirements** — Runs on "low end" hardware (demo uses a 300€ GPU)
- 🤓 **Transparent research** — Live logs and source links show what information answers are based on
- 🤔 **Follow-up questions** — Supports conversational follow-ups
- 📱 **Mobile friendly** — Responsive design
- 🌓 **Dark/light mode** — Theme support

## Architecture

### Backend (Go)
- **Language**: Go 1.22
- **Framework**: Custom API server with langchaingo (forked)
- **LLM Integration**: Ollama for local LLM inference
- **Vector Database**: ChromaDB for RAG (Retrieval-Augmented Generation)
- **Key Modules**:
  - `agentChain.go` — Agent orchestration and chain management
  - `apiServer.go` — HTTP API server
  - `llm_tools/` — Tool implementations for web search
  - `lschains/` — Chain configurations
  - `utils/` — Utility functions

### Frontend (SvelteKit)
- **Framework**: SvelteKit 2.0 with Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS with typography plugin
- **Build**: Static adapter support

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Development**: Dev container support with hot reload
- **Deployment**: Self-hosted via Docker Compose

## Tool System

The agent uses tools that allow it to:
1. Search the internet for current information
2. Recursively use tools based on gathered information
3. Provide source links and live logs for transparency

## Roadmap (Historical)

### In Progress
- LLama3 support (langchaingo stop word handling)
- Interface overhaul (Obsidian-inspired layout)
- Chat histories and recent conversations

### Planned
- User accounts for private RAG data
- Google Drive and Confluence integrations
- Long-term memory with per-user Vector DB namespaces

## Dependencies

### Backend
- github.com/tmc/langchaingo (forked) — LLM chains and agents
- github.com/amikos-tech/chroma-go — ChromaDB client
- github.com/microcosm-cc/bluemonday — HTML sanitization
- github.com/ledongthuc/pdf — PDF processing

### Frontend
- SvelteKit + Vite for build tooling
- TailwindCSS for styling
- TypeScript for type safety

## Installation

### Docker (Recommended)
```bash
git clone git@github.com:nilsherzig/LLocalSearch.git
cd LLocalSearch
# Edit .env if needed for custom Ollama setup
docker-compose up -d
```

See Ollama_Guide.md for Ollama connection setup.

## Project Philosophy

The project addresses concerns about AI search manipulation by big media through "preferred publisher programs". It provides a less discriminatory, self-hosted alternative where users control their search experience without commercial influence on result ranking.