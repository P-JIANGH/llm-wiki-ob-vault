# XAgent - Raw Source

**Source:** https://github.com/OpenBMB/XAgent
**Cloned:** 2026-04-15
**License:** Apache 2.0

## Overview

XAgent is an open-source LLM-driven autonomous agent for automatically solving various tasks. It features a three-component architecture: Dispatcher (task routing), Planner (plan generation/correction), and Actor (tool execution). It uses Docker sandbox for safety and provides both CLI and web GUI.

## Architecture

### Core Components

- **Dispatcher**: Dynamically instantiates and dispatches tasks to different agents; supports adding new agents
- **Planner**: Generates and rectifies plans for tasks; divides tasks into subtasks with milestones
- **Actor**: Conducts actions to achieve goals using tools; can collaborate with humans

### ToolServer (Docker Container)

- **File Editor**: text editing tool
- **Python Notebook**: interactive Python execution
- **Web Browser**: search and visit webpages
- **Shell**: execute bash commands
- **Rapid API**: retrieve and call APIs from Rapid API / ToolBench

### Supporting Modules

- `XAgentServer/` - Web server with nginx, Python backend (FastAPI/express), app frontend
- `ToolServer/` - Docker tool execution environment
- `XAgentGen/` - Agent generation framework
- `XAgent/` - Core agent logic (agent/, workflow/, inner_loop_search_algorithms/, ai_functions/)
- `local_workspace/` - Working directory for agent outputs
- `running_records/` - Stores execution history and logs

## Key Files

| File | Purpose |
|------|---------|
| `run.py` | Main entry point |
| `command.py` / `command_input.py` | CLI interface |
| `start_server.py` | Web server launcher |
| `assets/config.yml` | Main configuration (API keys, model selection) |
| `assets/tasks.yml` | 50+ evaluation tasks across 5 categories |
| `requirements.txt` | Python dependencies |
| `docker-compose.yml` | ToolServer container orchestration |

## Configuration

- Requires OpenAI API key(s) in `assets/config.yml`
- Recommended: `gpt-4-32k` (primary), `gpt-4` (fallback), `gpt-3.5-turbo-16k` (backup)
- Python >= 3.10 required

## Evaluation

- 50+ real-world complex tasks across 5 categories: Search & Report, Coding & Developing, Data Analysis, Math, Life Assistant
- Human preference evaluation: XAgent vs AutoGPT — significant win for XAgent
- Benchmarks: various LLM agent benchmarks

## Related Projects

- ToolBench (OpenBMB) — API collection used by ToolServer's Rapid API tool
- AutoGPT — comparison baseline
- OpenBMB ecosystem (ChatDev, CPM, etc.)
