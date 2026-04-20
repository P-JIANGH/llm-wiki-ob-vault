---
title: ChatDev 2.0 (DevAll)
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, agent, multi-agent, workflow, game-dev, tool]
sources: [raw/articles/ai-game-devtools/chatdev.md]
---

# ChatDev 2.0 (DevAll)

## Overview

**ChatDev 2.0 (DevAll)** is a **Zero-Code Multi-Agent Platform** for "Developing Everything" by [OpenBMB](https://github.com/OpenBMB). It enables users to rapidly build and execute customized multi-agent systems through simple YAML configuration — no coding required. Users define agents, workflows, and tasks to orchestrate complex scenarios across data visualization, 3D generation, deep research, and `game-dev`.

The original ChatDev (v1.x) operated as a **Virtual Software Company**, using specialized agents (CEO, CTO, Programmer, Art Director, etc.) for automated end-to-end software development. That legacy version is preserved on the [`chatdev1.0`](https://github.com/OpenBMB/ChatDev/tree/chatdev1.0) branch.

## Key Facts

| | |
|---|---|
| **Organization** | OpenBMB (THU & Beijing Academy of Artificial Intelligence) |
| **License** | MIT |
| **Repository** | github.com/OpenBMB/ChatDev |
| **Latest Release** | v2.0 (DevAll), Jan 7, 2026 |
| **Stack** | Python 3.12+ (FastAPI/uv), Vue 3 + Vite (frontend) |
| **Key Paper** | *Multi-Agent Collaboration via Evolving Orchestration*, NeurIPS 2025 |

## Capabilities

ChatDev 2.0 ships with featured **YAML workflow templates** in `yaml_instance/`:

| Category | Workflows | Example Prompt |
|----------|-----------|----------------|
| **Data Visualization** | `data_visualization_basic.yaml`, `data_visualization_enhanced.yaml` | "Create 4–6 high-quality PNG charts for my large real-estate transactions dataset." |
| **3D Generation** *(Blender + blender-mcp required)* | `blender_3d_builder_simple.yaml`, `blender_3d_builder_hub.yaml` | "Please build a Christmas tree." |
| **Game Development** | `GameDev_v1.yaml`, `ChatDev_v1.yaml` | "Please help me design and develop a Tank Battle game." |
| **Deep Research** | `deep_research_v1.yaml` | "Research about recent advances in LLM-based agent RL" |
| **Teach Video** | `teach_video.yaml` | "讲一下什么是凸优化" |

### Python SDK

```python
from runtime.sdk import run_workflow

result = run_workflow(
    yaml_file="yaml_instance/demo.yaml",
    task_prompt="Summarize the attached document in one sentence.",
    attachments=["/path/to/document.pdf"],
    variables={"API_KEY": "sk-xxxx"}
)
# Available on PyPI: chatdev 0.1.0
```

## Architecture

```
├── server/         # FastAPI backend (port 6400)
├── runtime/        # Agent abstraction & tool execution
├── workflow/       # Multi-agent orchestration logic
├── entity/         # Agent/workflow configuration files
├── functions/      # Custom Python tool functions
├── frontend/       # Vue 3 web console (port 5173)
└── yaml_instance/  # Runnable YAML workflow configs
```

## Technical Highlights

- **Puppeteer-style paradigm** (2025): Learnable central orchestrator optimized with RL — a key evolution from ChatDev 1.0's fixed role assignment
- **MacNet** (Jun 2024): Supports DAG-based collaboration networks for **1000+ agents**
- **Iterative Experience Refinement (IER)** (May 2024): Agents improve from past experience
- **Experiential Co-Learning**: Shared learning module across agent instances
- **Python SDK on PyPI**: `pip install chatdev`
- **Docker Compose** deployment out of the box

## Research Lineage

| Year | Paper / Milestone |
|------|-------------------|
| 2023 | ChatDev: Communicative Agents for Software Development (arXiv:2307.07924) |
| 2023 | Experiential Co-Learning preprint |
| 2024 | Iterative Experience Refinement |
| 2024 | MacNet: Scaling to 1000+ agents |
| 2025 | Puppeteer-style paradigm with RL-optimized orchestrator |
| 2025 | *Multi-Agent Collaboration via Evolving Orchestration* — **NeurIPS 2025** |
| 2026 | ChatDev 2.0 (DevAll) — zero-code platform |

## Related

- [[openbmb]] — Research organization behind ChatDev, also behind [[voxcpm]] and MiniCPM
- [[babyagi]] — Another autonomous task-decomposition agent framework
- [[agentgpt]] — Browser-based autonomous agent platform
- [[aios]] — Agent operating system with LLM kernel abstraction

## See Also

- [ChatDev GitHub](https://github.com/OpenBMB/ChatDev)
- [blender-mcp](https://github.com/ahujasid/blender-mcp) — Required for 3D generation workflows
