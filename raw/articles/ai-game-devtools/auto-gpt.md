# AutoGPT — AI Agent Platform

**URL:** https://github.com/Significant-Gravitas/AutoGPT
**Stars:** 183k
**License:** MIT (classic portions) / Polyform Shield (autogpt_platform)
**Domain:** AI Agent / Workflow Automation

## Project Overview

AutoGPT is a browser-based AI agent platform that allows users to create, deploy, and manage continuous AI agents for automating complex workflows. It evolved from the original autonomous agent project (2023) into a full platform with a block-based visual workflow editor.

## Architecture

### autogpt_platform (new platform)
- **backend/** — Python FastAPI server
  - `blocks/` — Reusable action blocks (single-task components)
  - `executor/` — Workflow execution engine
  - Prisma ORM + PostgreSQL (pgvector for embeddings)
  - RabbitMQ async queue
  - JWT + Supabase auth
  - ClamAV virus scanning for uploads
- **frontend/** — Next.js + TypeScript
  - Agent Builder (block-based visual editor)
  - Workflow Management
  - Marketplace
  - Monitoring & Analytics
- **autogpt_libs/** — Shared Python libraries

### classic/ (legacy)
- **forge/** — Agent building toolkit with boilerplate
- **benchmark/** — `agbenchmark` — agent protocol-compatible performance testing framework
- **frontend/** — Classic GUI
- **CLI** — `./run` command for agent management

## Key Design Patterns
- **Agent Protocol** standard (AI Engineer Foundation) for frontend/agent communication
- **Block-based workflow** — agents defined as graphs of blocks, each performing a single action
- **Polyform Shield License** on new platform code (commercial use restrictions)
- **MIT License** on classic/legacy components
- Docker + Docker Compose for self-hosting
- Poetry for Python dependency management

## Example Agents
1. Viral Video Generator — reads Reddit → identifies trends → generates short video
2. YouTube Quote Extractor — transcribes videos → AI extracts quotes → auto-posts to social media

## Related Tools
- AgentGPT (reworkd) — browser-deployed variant
- AutoGen (Microsoft) — multi-agent framework
- LangChain — LLM app framework
- CrewAI — multi-agent orchestration
