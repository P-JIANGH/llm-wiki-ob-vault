# Internet of Agents (IoA) — Raw Source

**Source:** https://github.com/OpenBMB/IoA
**License:** Apache 2.0
**Date captured:** 2026-04-16

---

## README Summary

IoA (Internet of Agents) is an open-source framework by [OpenBMB](https://github.com/OpenBMB) for multi-agent collaboration. The paper is at arXiv:2407.07061.

### Key Features
- **Internet-Inspired Architecture:** Connects AI agents across environments
- **Autonomous Nested Team Formation:** Agents form teams and sub-teams autonomously
- **Heterogeneous Agent Integration:** Integrates agents with different skills (AutoGPT, Open Interpreter, etc.)
- **Asynchronous Task Execution:** Agents can multitask efficiently
- **Adaptive Conversation Flow:** Manages agent conversations autonomously
- **Scalable and Extensible:** Easy to add new agent types

### Architecture
- **Server (FastAPI + Milvus):** Handles agent registration, team formation, communication
- **Client:** Connects individual agents (AutoGPT, Open Interpreter, ReAct Agent)
- **Frontend:** Server web UI
- **Communication Layer:** WebSocket-based messaging between agents

### Technology Stack
- Python 3.x
- FastAPI (web framework)
- Milvus (vector database for agent registry/team formation)
- Docker + Docker Compose
- WebSocket (agent communication)
- uvicorn (ASGI server)

### Quick Start
1. Docker-based deployment (pre-built images on Docker Hub)
2. Launch Milvus: `docker-compose -f dockerfiles/compose/milvus.yaml up`
3. Configure `.env` with OpenAI API key
4. Start: `docker-compose -f dockerfiles/compose/open_instruction.yaml up`
5. Test via POST to `http://127.0.0.1:5050/launch_goal`

### Project Structure
```
IoA/
├── common/           # Shared: config, log, registry, types, utils
├── im_client/        # IM client: connects agents to server
├── im_server/        # FastAPI server: agent registry, team formation, communication
├── agents/           # Agent adapters (AutoGPT, Open Interpreter, ReAct)
├── configs/          # Server and client configs
├── dockerfiles/      # Docker build files
├── scripts/          # Test scripts (open_instruction, paper_writing)
└── docs/             # Documentation
```

### Main Modules
- `im_server/app.py` — FastAPI server with WebSocket support, Milvus vector DB
- `im_client/main.py` — Client entry, CommunicationLayer setup, FastAPI endpoint at port 5050
- `common/types.py` — LaunchGoalParam, AgentEntry, AgentMessage, team formation types
- `common/communication_layer.py` — WebSocket-based agent-to-agent messaging
- `agents/agent_adapter.py` — Adapter for heterogeneous agents (AutoGPT, Open Interpreter, ReAct)
