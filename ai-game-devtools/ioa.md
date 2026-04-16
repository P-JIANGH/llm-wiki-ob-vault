---
title: IoA (Internet of Agents)
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [agent, framework, multi-agent, llm, open-source]
sources: [raw/articles/ai-game-devtools/ioa.md]
---

# IoA (Internet of Agents)

## Overview

IoA (Internet of Agents) is an open-source multi-agent collaboration framework developed by [[OpenBMB]] (Beijing Academy of Artificial Intelligence / 面壁智能). It aims to create a platform where diverse AI agents can team up to tackle complex tasks autonomously — similar to how humans collaborate on the internet. Published at arXiv:2407.07061 (2024).

## Key Features

| Feature | Description |
|---|---|
| **Internet-Inspired Architecture** | Connects AI agents across different environments and platforms |
| **Autonomous Nested Team Formation** | Agents dynamically form teams and sub-teams based on task complexity |
| **Heterogeneous Agent Integration** | Supports diverse agents: AutoGPT, Open Interpreter, ReAct Agent, etc. |
| **Asynchronous Task Execution** | Agents multitask concurrently for efficiency |
| **Adaptive Conversation Flow** | Autonomous management of inter-agent messaging |
| **Scalable & Extensible** | Easy to add new agent types and task domains |

## Architecture

IoA uses a **client-server architecture** with Docker containerization:

- **IM Server** (`im_server/app.py`): FastAPI-based server on port 5050. Handles agent registration, team formation, and message routing via WebSocket. Uses Milvus vector database for agent registry and capability matching.
- **IM Client** (`im_client/main.py`): Connects individual agents (AutoGPT, Open Interpreter, ReAct) to the server via `AgentAdapter`.
- **Communication Layer**: WebSocket-based real-time messaging between agents.
- **Agent Adapters** (`agents/`): Adapters that normalize heterogeneous agent interfaces into a unified protocol.

## Technology Stack

- **Framework:** Python 3.x + FastAPI
- **Vector DB:** Milvus (agent registry, team formation)
- **Real-time:** WebSocket (agent-to-agent communication)
- **Deployment:** Docker + Docker Compose
- **Server:** uvicorn ASGI

## Deployment Pattern

IoA runs entirely in Docker:
1. Pull pre-built images (`ioa-server`, `ioa-client`, `ioa-server-frontend`)
2. Launch Milvus via `docker-compose`
3. Configure `.env` with OpenAI API key
4. Start with `docker-compose -f dockerfiles/compose/open_instruction.yaml up`

## Comparison with Related Agents

IoA is closely related to [[XAgent]] (also by OpenBMB) and [[ChatDev]], but differentiates by focusing on **multi-agent interoperability** — rather than building a single powerful agent, IoA creates a platform where heterogeneous third-party agents (AutoGPT, Open Interpreter) collaborate. Where XAgent uses a single-agent三层架构 (Dispatcher+Planner+Actor), IoA orchestrates multiple existing agent systems together.

## Related Links

- GitHub: https://github.com/OpenBMB/IoA
- Paper: https://arxiv.org/abs/2407.07061
- Documentation: https://openbmb.github.io/IoA/
- Discord: https://discord.gg/E5XPtynFDh
- Email: ioa.thunlp@gmail.com

## License

Apache 2.0
