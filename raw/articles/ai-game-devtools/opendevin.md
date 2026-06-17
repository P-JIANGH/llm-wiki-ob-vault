# OpenHands / OpenDevin

> Source: https://github.com/OpenDevin/OpenDevin (cloned 2026-04-14)

## Overview

OpenHands is an AI-driven software engineering agent (formerly OpenDevin), powered by the SWE-bench benchmark achieving **77.6%** on SWE-bench Lite. The project is MIT-licensed (except `enterprise/` directory), supports Python 3.12-3.13, and is built with Poetry.

## Architecture

### Backend Modules (`openhands/`)

| Module | Purpose |
|--------|---------|
| `agenthub/` | Pluggable agent registry (various agent implementations) |
| `app_server/` | V1 application server (FastAPI-based) |
| `controller/` | Orchestrates agent execution loop |
| `core/` | Core agent loop, state management |
| `critic/` | Self-criticism / error correction |
| `events/` | Event bus and event types |
| `llm/` | LLM abstraction layer (litellm-based) |
| `memory/` | Conversation/session memory (SQLAlchemy + Redis/PostgreSQL) |
| `runtime/` | Sandboxed code execution (Docker, e2b, modal, daytona) |
| `server/` | WebSocket/REST API server |
| `mcp/` | MCP (Model Context Protocol) tool integrations |
| `resolver/` | GitHub issue/PR resolution |
| `storage/` | Database-backed state persistence |

### Key Dependencies

- **LLM**: litellm (unified multi-provider: Claude, GPT, Gemini, etc.), openai=2.8.0
- **Sandbox**: Docker, playwright, pexpect, browsergym-core
- **Runtime**: fastmcp, e2b-code-interpreter, modal, daytona, runloop-api-client
- **Storage**: sqlalchemy (async), asyncpg, redis, pg8000
- **Cloud**: kubernetes, google-cloud-aiplatform, boto3, anthropic (vertex)
- **Enterprise**: Keycloak (auth), Stripe (billing), Alembic (migrations)

## Products

1. **OpenHands SDK** — Python library for composing agents in code, scale to 1000s in cloud
2. **OpenHands CLI** — Terminal interface (Claude Code / Codex style)
3. **OpenHands Local GUI** — SPA React app with REST API (Devin/Jules style)
4. **OpenHands Cloud** — Hosted GUI at app.all-hands.dev (free tier with Minimax)
5. **OpenHands Enterprise** — Self-hosted via Kubernetes; source-available in `enterprise/` dir

## Features

- SWE-bench 77.6% score
- Multi-model via litellm (Claude, GPT, Gemini, DeepSeek, etc.)
- Browser Agent via BrowserGym (playwright)
- GitHub/Jira/Linear/Slack integrations (enterprise)
- Docker/Kubernetes deployment
- MCP tool protocol support
- Theory-of-Mind module (ToM-SWE)
- Chrome extension available

## License

- Core: MIT
- Enterprise/: source-available (proprietary license required after 1 month)
