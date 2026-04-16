# OpenAgents — Raw Source

## Source
- GitHub: https://github.com/xlang-ai/OpenAgents
- arXiv: https://arxiv.org/abs/2310.10634
- Demo: https://chat.xlang.ai
- Docs: https://docs.xlang.ai
- License: Apache 2.0
- Org: XLang NLP Lab

## Overview
OpenAgents is an open platform for using and hosting language agents in everyday life.
Unlike existing language agent frameworks that focus on proof-of-concept construction,
OpenAgents emphasizes non-expert user access and application-level designs.

Three agents implemented and hosted for free use:
1. **Data Agent** — data analysis with Python/SQL and data tools
2. **Plugins Agent** — 200+ daily tools (shopping, weather, scientific exploration)
3. **Web Agent** — autonomous web browsing via Chrome extension

## Architecture
### System Design
Client-Server architecture with three layers:
- **Frontend**: Next.js + React + Tailwind CSS + TypeScript (port 3000)
  - Chat Web UI optimized for swift responses
  - WeBot Chrome extension for Web Agent
  - i18n support (EN/ZH/JA/KO)
- **Backend**: Flask RESTful APIs (port 8000)
  - MongoDB for persistent storage (user/message/conversation/folder)
  - Redis for caching (max 500MB, LRU eviction)
  - Code execution sandbox (optional Docker container)
- **Real Agents**: "one agent, one folder" design
  - `real_agents/data_agent/` — ConversationalChatAgent + Python code execution
  - `real_agents/plugins_agent/` — ConversationalPluginChatAgent + 200+ plugin registry
  - `real_agents/web_agent/` — ConversationalWebotChatAgent + Chrome extension control
  - `real_agents/adapters/` — shared components (stream parsing, data models, memory, callbacks, AgentExecutor)

### Key Technical Features
- Based on [[LangChain]] code for building real agents
- Streaming response rendering via `display_streaming.py`
- Queue-based code execution via `kernel_publisher.py`
- MongoDB + Redis dual-layer storage (cache + persistent)
- Docker Compose deployment with optional GPU support
- Extensible: add new agents by creating a folder under `real_agents/`
- Auto Plugin Selection using instructor-embedding for tool matching
- Code execution sandbox via Docker (xlang-code-interpreter-python)

### Agent Details
#### Data Agent
- Python/SQL code writing and execution
- Data search, handling, manipulation, visualization
- Uses Jupyter kernel for code execution (local or Docker sandbox)
- Streaming output with image/echarts rendering

#### Plugins Agent
- 200+ third-party plugins (Klarna Shopping, XWeather, Wolfram Alpha)
- Combined plugin usage (e.g., trip planning with Klook + Currency + Weather)
- Auto Plugin Selection — agent intuitively suggests best plugins

#### Web Agent
- Chrome extension for autonomous website navigation
- Google Maps navigation, Twitter posting, Google Form filling
- Controlled via WeBot extension communicating with backend

### Code Structure
```
├── backend/          # Flask backend, MongoDB/Redis, code execution
├── frontend/         # Next.js UI + WeBot Chrome extension
└── real_agents/      # Language agents (one folder per agent)
    ├── adapters/     # Shared components for all agents
    ├── data_agent/   # Data analysis agent
    ├── plugins_agent/# Plugin-based agent
    └── web_agent/    # Web browsing agent
```

### Dependencies
- Python 3.10+, Flask, LangChain, Pydantic
- MongoDB 6.0+, Redis 7.2+
- Next.js (frontend), Docker Compose (deployment)
- Optional: OpenAI API, Anthropic API, Kaggle API

### Deployment
- Source code: Flask backend + Next.js frontend
- Docker: `docker-compose up -d` (Redis + MongoDB + Backend + Frontend)
- Ports: Backend 8000, Frontend 3000

### Notable Milestones
- 2023-08-08: Platform demos released (Data, Plugins, Web agents)
- 2023-08-17: 500 users milestone
- 2023-10-13: Full platform code released
- 2023-10-17: Paper published on arXiv
- 2023-10-18: Lemur model recommended (matching ChatGPT on 15 agent tasks)
- 2023-10-26: 3,000 users milestone
