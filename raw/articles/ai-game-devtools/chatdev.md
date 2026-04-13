# ChatDev 2.0 (DevAll) — Source Summary

> Extracted from: https://github.com/OpenBMB/ChatDev
> Date: 2026-04-13

## Overview

**ChatDev 2.0 (DevAll)** is a **Zero-Code Multi-Agent Platform** for "Developing Everything". Enables users to rapidly build and execute customized multi-agent systems through simple configuration—no coding required. Users can define agents, workflows, and tasks to orchestrate complex scenarios including data visualization, 3D generation, and deep research.

**Legacy Note**: ChatDev 1.0 (Virtual Software Company with CEO/CTO/Programmer agents) moved to [`chatdev1.0`](https://github.com/OpenBMB/ChatDev/tree/chatdev1.0) branch.

## Quick Start

### Prerequisites
| Requirement | Version |
|-------------|---------|
| OS | macOS / Linux / WSL / Windows |
| Python | 3.12+ |
| Node.js | 18+ |
| Package Manager | uv |

### Installation
```bash
# Backend
uv sync

# Frontend
cd frontend && npm install

# Configuration
cp .env.example .env
# Set API_KEY and BASE_URL
```

### Running
```bash
make dev    # Access http://localhost:5173
# or
uv run python server_main.py --port 6400 --reload
cd frontend && VITE_API_BASE_URL=http://localhost:6400 npm run dev

# Docker
docker compose up --build
```

## Featured Workflows

All in `yaml_instance/`:

| Category | Workflow Files | Example |
|----------|---------------|---------|
| Data Visualization | `data_visualization_basic.yaml`, `data_visualization_enhanced.yaml` | "Create 4–6 high-quality PNG charts for my large real-estate transactions dataset." |
| 3D Generation (requires Blender + blender-mcp) | `blender_3d_builder_simple.yaml`, `blender_3d_builder_hub.yaml` | "Please build a Christmas tree." |
| Game Dev | `GameDev_v1.yaml`, `ChatDev_v1.yaml` | "Please help me design and develop a Tank Battle game." |
| Deep Research | `deep_research_v1.yaml` | "Research about recent advances in LLM-based agent RL" |
| Teach Video | `teach_video.yaml` | "讲一下什么是凸优化" |

## Architecture

```
├── server/          # FastAPI backend
├── runtime/         # Agent abstraction & tool execution
├── workflow/        # Multi-agent orchestration logic
├── entity/          # Configuration files
├── functions/       # Custom Python tools
├── frontend/        # Vue 3 Web Console
└── yaml_instance/   # Runnable workflow configs
```

## Python SDK

```python
from runtime.sdk import run_workflow

result = run_workflow(
    yaml_file="yaml_instance/demo.yaml",
    task_prompt="Summarize the attached document in one sentence.",
    attachments=["/path/to/document.pdf"],
    variables={"API_KEY": "sk-xxxx"}
)
# Also available on PyPI: chatdev 0.1.0
```

## Key Publications

| Paper | Year | Venue |
|-------|------|-------|
| Multi-Agent Collaboration via Evolving Orchestration | 2025 | NeurIPS 2025 |
| MacNet: Scaling LLM-based Multi-Agent Collaboration | 2024 | — |
| Iterative Experience Refinement | 2024 | — |
| Experiential Co-Learning | 2023 | — |
| ChatDev: Communicative Agents for Software Development | 2023 | arXiv |

## Key Milestones

| Date | Update |
|------|--------|
| Jan 07, 2026 | ChatDev 2.0 (DevAll) official release |
| Sep 24, 2025 | NeurIPS 2025 paper accepted |
| May 26, 2025 | Puppeteer-style paradigm with RL-optimized central orchestrator |
| Jun 25, 2024 | MacNet: DAG-based collaboration for 1000+ agents |
| May 07, 2024 | Iterative Experience Refinement (IER) |
| Jan 25, 2024 | Experiential Co-Learning Module |
| Dec 28, 2023 | Experiential Co-Learning preprint |
| Nov 02, 2023 | Incremental development feature |
| Oct 26, 2023 | Docker support added |
| Sep 25, 2023 | Git mode available |
| Sep 20, 2023 | Human-Agent-Interaction mode |
| Sep 01, 2023 | Art mode |
| Aug 28, 2023 | System publicly available |

## License
MIT (implied from OpenBMB repos)

## Related
- OpenBMB: research organization behind ChatDev
- [[babyagi]]: another autonomous agent framework for task decomposition
- [[agentgpt]]: browser-based autonomous AI agent platform
