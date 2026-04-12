---
title: AutoGPT
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, agent, workflow, tool, open-source]
sources: [raw/articles/ai-game-devtools/auto-gpt.md]
---

# AutoGPT

[[AutoGPT]] is a browser-based AI agent platform (183k GitHub stars) for creating, deploying, and managing continuous AI agents that automate complex workflows. Founded by Significant-Gravitas, it evolved from the original autonomous agent project (2023) into a full platform with a block-based visual workflow editor.

## Overview

AutoGPT's new platform features a **block-based visual workflow editor** where agents are constructed by connecting blocks, each performing a single action. The platform targets both self-hosting (Docker) and upcoming cloud beta.

**Dual licensing:**
- `autogpt_platform/` → **Polyform Shield** (commercial use restrictions apply)
- `classic/` and all other portions → **MIT License**

## Architecture

### autogpt_platform (main platform)

| Layer | Tech | Role |
|-------|------|------|
| Frontend | Next.js + TypeScript + Tailwind | Agent Builder, Workflow Editor, Marketplace, Analytics |
| Backend | Python FastAPI + Prisma ORM | REST/WebSocket API, block execution |
| Database | PostgreSQL + pgvector | Workflow storage, vector embeddings |
| Queue | RabbitMQ | Async task processing |
| Auth | JWT + Supabase | User authentication |
| Scanner | ClamAV | File upload virus scanning |

**Key modules:**
- `backend/blocks/` — reusable action blocks (single-task components)
- `backend/executor/` — workflow execution engine
- `autogpt_libs/` — shared Python libraries

### classic/ (legacy agent framework)
- **forge/** — agent building toolkit with boilerplate code
- **benchmark/** — `agbenchmark` agent protocol-compatible testing framework
- **frontend/** — classic GUI
- **CLI** — `./run` command for agent management

## Agent Protocol

AutoGPT uses the [Agent Protocol](https://agentprotocol.ai/) standard by the AI Engineer Foundation, which standardizes communication between agents and frontend/benchmark tools. This makes AutoGPT-compatible agents usable across the broader agent ecosystem.

## Example Workflows

1. **Viral Video Generator**: Reddit trending topics → short-form video generation
2. **YouTube Quote Extractor**: video transcription → AI quote extraction → social media auto-post

## Self-Hosting

Requires: Docker, Node.js 16+, 4+ CPU cores, 8GB+ RAM. One-line installer:
```bash
curl -fsSL https://setup.agpt.co/install.sh -o install.sh && bash install.sh
```

## Related

- [[agentgpt]] — reworkd's browser-deployed AutoGPT variant
- [[autoresearch]] — Karpathy's autonomous LLM research framework
- [[aios]] — AIOS agent operating system
- [[langchain]] — LLM application framework
- [[autogen]] — Microsoft's multi-agent framework
- [[crewai]] — multi-agent orchestration platform
