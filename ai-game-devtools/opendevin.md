---
title: OpenHands (OpenDevin)
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/opendevin.md]
---

# OpenHands (OpenDevin)

AI-driven autonomous software engineering agent. Formerly known as OpenDevin; rebranded to OpenHands.

## Overview

OpenHands achieves **77.6%** on SWE-bench Lite (top score in the community). It can browse the web, read/write code, execute commands, and solve real GitHub issues end-to-end — similar to Devin/SWE-agent. MIT-licensed core; `enterprise/` directory is source-available (requires paid license after 1 month).

## Products

| Product | Description |
|---------|-------------|
| **SDK** | Python library for composing agents in code; scales to 1000s in cloud |
| **CLI** | Terminal interface (Claude Code / Codex style) |
| **Local GUI** | SPA React + REST API (Devin/Jules-like experience) |
| **Cloud** | Hosted at app.all-hands.dev; free tier with Minimax model |
| **Enterprise** | Self-hosted Kubernetes; source-available; integrates Slack/Jira/Linear/GitHub |

## Architecture

Backend (`openhands/` Python package, 3.12-3.13):

| Module | Purpose |
|--------|---------|
| `agenthub/` | Pluggable agent registry |
| `controller/` | Execution orchestration |
| `core/` | Agent loop and state machine |
| `critic/` | Self-criticism and error correction |
| `llm/` | LLM abstraction via litellm (Claude/GPT/Gemini/DeepSeek…) |
| `runtime/` | Sandboxed execution (Docker, e2b, modal, daytona) |
| `memory/` | Conversation memory (SQLAlchemy + Redis/PostgreSQL) |
| `events/` | Event bus |
| `server/` | WebSocket/REST API |
| `mcp/` | MCP tool protocol integration |
| `resolver/` | GitHub issue/PR resolution |
| `storage/` | Database-backed state persistence |

Frontend: React SPA in `frontend/` (TanStack Query, vitest, i18n).

## Key Technical Details

- **Sandbox**: BrowserGym + Playwright for web browsing agents; Docker, e2b, modal, daytona for code execution
- **Multi-model**: litellm as the unified LLM adapter; pinned openai=2.8.0, anthropic, google-genai
- **Enterprise stack**: Keycloak (auth), Stripe (billing), Alembic (DB migrations), PostHog (analytics), GitHub/GitLab/Jira/Linear/Slack integrations
- **Build**: `make build` (Poetry backend + npm frontend), `make run` for local GUI
- **SWE-bench**: 77.6% on Lite benchmark — competitive with closed-source agents

## Related

- [[devika]] — Another Devin open-source alternative; similar scope
- [[swe-agent]] — Princeton NLP's SWE-bench agent (similar benchmark)
- [[metagpt]] — Multi-agent software company framework with role collaboration
- [[deepseek-r1]] — DeepSeek reasoning model; candidate LLM backend
- [[deepseek-v3]] — DeepSeek V3; another candidate backend

## Links

- GitHub: https://github.com/OpenDevin/OpenDevin
- Docs: https://docs.openhands.dev
- Cloud: https://app.all-hands.dev
- SWE-bench: https://www.swebench.com (77.6% Lite)
- arXiv: https://arxiv.org/abs/2511.03690
