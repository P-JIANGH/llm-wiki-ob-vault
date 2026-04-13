# Langflow — AI Workflow Visual Builder

## Source
- **URL:** https://github.com/logspace-ai/langflow
- **License:** MIT
- **Version:** 0.8.4 (langflow-base)

## Overview
Langflow is a visual workflow builder for building and deploying AI-powered agents and workflows. It provides a drag-and-drop UI for designing LLM workflows, with built-in API and MCP servers that expose every workflow as a tool.

## Key Features
- Visual builder interface with drag-and-drop nodes
- Source code access for customizing any component in Python
- Interactive playground for step-by-step flow testing
- Multi-agent orchestration with conversation management
- Deploy as REST API, JSON export, or MCP server
- LangChain integration (v0.3.27)
- Enterprise-ready security and scalability
- Desktop app (Windows/macOS)

## Architecture

### Monorepo Structure
```
src/
├── backend/
│   ├── base/langflow/     # Core package (langflow-base)
│   │   ├── api/           # FastAPI routes (v1/, v2/)
│   │   ├── components/    # Built-in Langflow components
│   │   ├── services/      # auth, database, cache, storage, tracing
│   │   ├── graph/         # Flow graph execution engine
│   │   └── custom/       # Custom component framework
│   └── tests/
├── frontend/             # React 19 + TypeScript + Vite + TailwindCSS
│   └── src/
│       ├── components/    # UI components
│       ├── stores/        # Zustand state management
│       └── icons/         # Component icons
└── lfx/                   # Lightweight executor CLI (lfx serve, lfx run)
```

### Tech Stack
- **Backend:** Python 3.10-3.13, FastAPI 0.135+, LangChain 0.3.27, SQLAlchemy, Alembic
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, @xyflow/react, Zustand
- **CLI:** lfx (lightweight executor)
- **Package Manager:** uv (recommended)

### Key Dependencies
- `fastapi`, `uvicorn`, `gunicorn` — web server
- `langchain~=0.3.27`, `langchain-community`, `langchain-core` — LLM orchestration
- `sqlmodel`, `sqlalchemy[aiosqlite]` — ORM/database
- `pydantic~=2.11.0` — data validation
- `mcp>=1.17.0` — MCP server support
- `networkx` — flow graph execution

### Optional Dependencies (50+ provider groups)
- **LLM Providers:** openai, anthropic, cohere, google, ollama, nvidia, mistral, groq, llama-cpp, sentence-transformers
- **Vector Stores:** chroma, faiss, qdrant, weaviate, pinecone, milvus, astraDB
- **Databases:** postgresql, mongodb, redis, elasticsearch, supabase, cassandra, clickhouse, couchbase
- **Agent Frameworks:** dspy, smolagents
- **Monitoring:** langfuse, langsmith, langwatch, arize, opik, traceloop

## Component System
Components inherit from `Component` base class:
- `display_name`, `description`, `icon`, `inputs`, `outputs`
- Live in `src/backend/base/langflow/components/`
- Dynamic loading with `LFX_DEV=1` for hot reload

## CLI Commands
```bash
make init              # Install all dependencies + pre-commit hooks
make run_cli           # Build and run Langflow (http://localhost:7860)
make backend           # FastAPI on port 7860
make frontend          # Vite dev server on port 3000
uv pip install langflow -U   # Install package
uv run langflow run    # Run from package
```

## Deployment
- Docker: `docker run -p 7860:7860 langflowai/langflow:latest`
- Desktop app for Windows/macOS
- Cloud deployment guides available
