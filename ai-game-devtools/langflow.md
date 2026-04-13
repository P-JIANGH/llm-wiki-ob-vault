---
title: Langflow
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, agent, workflow, tool, open-source]
sources: [raw/articles/ai-game-devtools/langflow.md]
---

# Langflow

[Langflow](https://github.com/logspace-ai/langflow) is a visual, drag-and-drop workflow builder for creating and deploying AI-powered agents and LLM workflows. It turns every workflow into a deployable REST API or MCP server tool.

## Overview

Langflow provides a visual node-graph interface on top of [[LangChain]], enabling rapid prototyping of complex LLM pipelines without writing code. Developers can also drop into Python source to customize any component. Every flow can be exported as a JSON file for use in Python apps, served as a REST API, or exposed as an MCP server for [[MCP]]-compatible clients.

**License:** MIT | **Version:** 0.8.4 | **Python:** 3.10–3.13

## Key Features

- **Visual builder** — drag-and-drop node graph for designing LLM workflows
- **Interactive playground** — step-by-step execution control for debugging
- **Multi-agent orchestration** — conversation management and retrieval
- **Deploy as API** — every flow becomes a REST endpoint
- **MCP server** — expose flows as tools for MCP clients
- **50+ LLM providers** — OpenAI, Anthropic, Claude, Google, Ollama, Groq, Mistral, local llama-cpp, and more
- **20+ vector stores** — Chroma, FAISS, Qdrant, Weaviate, Pinecone, Milvus, AstraDB, etc.
- **Enterprise-ready** — LangSmith/LangFuse observability, auth, scalable architecture
- **Desktop app** — Windows/macOS standalone with all dependencies bundled

## Architecture

Langflow is a monorepo with three main layers:

| Layer | Tech | Purpose |
|-------|------|---------|
| Backend | Python + FastAPI + LangChain | API routes, component registry, graph execution engine, services |
| Frontend | React 19 + TypeScript + Vite + TailwindCSS | Visual graph editor, playground, component palette |
| CLI (lfx) | Python | Lightweight executor for running flows without the full UI |

The **component system** is built on [[LangChain]]'s component model. Each component (e.g., LLM, retriever, tool) is a Python class with `display_name`, `description`, `inputs`, `outputs`. Components live in `src/backend/base/langflow/components/` and support hot reload during development via `LFX_DEV=1`.

The **graph execution engine** uses [[NetworkX]] to represent flows as directed graphs, executing them via LangChain's chain abstraction.

## Tech Stack

- **Backend:** Python 3.10+, FastAPI 0.135+, LangChain 0.3.27, SQLAlchemy + Alembic, Pydantic 2
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, @xyflow/react (graph), Zustand (state)
- **Package manager:** `uv` (recommended)
- **CLI:** `lfx` — standalone flow executor (`lfx serve`, `lfx run`)

## Related Tools

Langflow competes in the [[LangChain]] ecosystem and broader visual workflow space:

- [[AutoGen]] — Microsoft multi-agent framework; Langflow is more visual, AutoGen is more programmatic
- [[CrewAI]] — multi-agent orchestration with role-based agents; similar goals but different UX philosophy
- [[Dify]] — open-source LLM app development platform with similar visual workflow concept
- [[Flowise]] — another visual LangChain flow builder (JavaScript-based)
- [[ChatDev]] — [[OpenBMB]]'s multi-agent virtual software company platform

## Quick Start

```bash
# Install
uv pip install langflow -U

# Run
uv run langflow run
# → http://127.0.0.1:7860

# Or from source
git clone https://github.com/logspace-ai/langflow
cd langflow
make run_cli
```

## Game Development Relevance

Langflow can orchestrate multi-step game AI pipelines — for example, connecting a character dialogue LLM → [[RAG]] retrieval over game lore → memory component → tool-calling for game state updates. Its [[MCP]] server export makes it particularly relevant for game engines (Unity/Unreal) that speak MCP to connect external AI services.
