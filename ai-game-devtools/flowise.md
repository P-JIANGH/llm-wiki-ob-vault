---
title: Flowise
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, ai, llm, agent, workflow, open-source]
sources: [raw/articles/ai-game-devtools/flowise.md]
---

# Flowise

**Flowise** is an open-source visual drag-and-drop platform for building LLM-powered applications. It provides a low-code UI for creating AI agents, RAG pipelines, and custom workflows without writing code.

## Overview

Flowise is built on top of [[LangChain]] and provides:
- **Visual flow builder** — drag-and-drop canvas for composing LLM chains
- **Pre-built templates** (AgentFlow) — ready-to-use agent workflows
- **RAG pipeline support** — retrieval-augmented generation with vector stores
- **Multi-LLM support** — OpenAI, Anthropic, local models, and more
- **Tool integrations** — web search, API calls, custom functions
- **Credential management** — secure API key storage
- **Docker deployment** — self-host on any infrastructure

## Architecture

Flowise is a **mono repository** (pnpm workspaces) with 5 packages:

| Package | Role |
|---|---|
| `packages/server` | Node.js Express backend — API logic, TypeORM persistence, OCLIF CLI |
| `packages/ui` | React frontend — visual drag-and-drop canvas |
| `packages/components` | LangChain node integrations (nodes/, credentials/, evaluation/) |
| `packages/agentflow` | Pre-built agent flow templates |
| `packages/api-documentation` | Swagger UI auto-generated from Express routes |

## Tech Stack

- **Runtime:** Node.js >= 18.15.0
- **Package Manager:** PNPM
- **Framework:** LangChain.js (underlying LLM orchestration)
- **ORM:** TypeORM
- **CLI:** OCLIF
- **UI:** React
- **Build:** TypeScript + Gulp
- **License:** Apache License 2.0

## Game Development Use Cases

Flowise can power AI-driven game features:
- **NPC dialogue systems** — chain LLMs with tool-use for dynamic conversations
- **Game AI agents** — autonomous agents that plan, search, and execute in-game tasks
- **Dynamic quest generation** — RAG pipelines that pull from story lore to generate quests
- **AI game master** — multi-agent orchestration for tabletop/CRPG game mastering

## Related Tools

Flowise competes with other visual AI workflow platforms:

- [[agentgpt]] — browser-based autonomous agent platform (similar goal, different UX)
- [[chatdev]] — multi-agent software development platform from OpenBMB
- [[babyagi]] — lightweight experimental agent framework
- [[aios]] — AI Agent operating system with LLM kernel abstraction

## Links

- GitHub: https://github.com/FlowiseAI/Flowise
- Docs: https://docs.flowiseai.com/
- Cloud: https://flowiseai.com/
