# Dify — Raw Source Summary

> Captured: 2026-04-15
> Source: https://github.com/langgenius/dify (cloned via gitcode.com mirror)

## Project Overview

Dify is an open-source LLM app development platform combining AI workflow, RAG pipeline, agent capabilities, model management, and observability. Its intuitive interface lets users go from prototype to production quickly.

## Architecture

- **Backend API** (`/api`): Python Flask application, Domain-Driven Design, Celery+Redis for async tasks
- **Frontend Web** (`/web`): Next.js + TypeScript + React
- **Docker deployment** (`/docker`): docker-compose for self-hosted deployment

## Key Features

1. **Workflow**: Visual canvas for building and testing AI workflows
2. **Model Support**: 100+ proprietary/open-source LLMs (GPT, Mistral, Llama3, etc.) via dozens of inference providers
3. **Prompt IDE**: Intuitive interface for crafting prompts, comparing model performance
4. **RAG Pipeline**: Document ingestion → retrieval, PDF/PPT support
5. **Agent Capabilities**: LLM Function Calling or ReAct agents, 50+ built-in tools (Google Search, DALL·E, Stable Diffusion, WolframAlpha)
6. **LLMOps**: Logs, performance monitoring, production improvement
7. **Backend-as-a-Service**: All features available via REST API

## Backend Conventions

- Python: Ruff linting/formatting, Pydantic v2, SQLAlchemy ORM, `uv` package manager
- Layered architecture: controller → service → core/domain
- Tenant-aware (tenant_id scoping on all queries)
- TypedDict preferred over dict, no Any, max 120 chars/line, files < 800 lines
- Async via Celery + Redis
- Storage via `extensions.ext_storage`, HTTP via `core.helper.ssrf_proxy`

## License

Dify Open Source License — based on Apache 2.0 with additional conditions:
- Multi-tenant service requires commercial license
- Frontend LOGO/copyright must be preserved
- © 2025 LangGenius, Inc.

## Links

- Docs: https://docs.dify.ai
- Cloud: https://cloud.dify.ai
- Discord: https://discord.gg/FngNHpbcY7
