# AgentBench — Raw Source

**Project:** https://github.com/thudm/agentbench
**License:** MIT
**Date captured:** 2026-04-15

## README Summary

AgentBench is the first benchmark designed to evaluate LLMs as autonomous agents across 8 distinct environments. It tests LLM-as-Agent capability through:

### Environments (8 tasks)
- **OS (Operating System)** — Ubuntu bash environment, real filesystem operations (SR metric)
- **DB (Database)** — SQL interfaces, multi-table queries via authentic DB (SR metric)
- **KG (Knowledge Graph)** — Freebase KG with 45M+ entities, partial observability (F1 metric)
- **DCG (Digital Card Game)** — Turn-based strategy game "Aquawar" (win-rate metric)
- **LTP (Lateral Thinking Puzzles)** — Yes/No/Irrelevant response game (game progress %)
- **HH (Householding)** — ALFWorld embodied tasks
- **WS (Web Shopping)** — WebShop task
- **WB (Web Browsing)** — Mind2Web task

### Architecture
- `src/client/` — Agent client (API-based models, local models)
- `src/server/` — Task worker server (Docker-based isolation)
- `src/assigner.py` — Task assignment coordinator
- `configs/agents/` — Agent configurations (OpenAI, Anthropic, local LLMs)
- `configs/tasks/` — Task definitions
- `data/` — Per-task data and Dockerfiles
- `extra/docker-compose.yml` — Fully containerized deployment (FC version)

### Key Files
- `requirements.txt` — Python 3.9, older numpy pinned (~1.23.x)
- `src/start_task.py` — Launches task workers (5 per task by default)
- `src/analysis.py` — Results analysis

### AgentBench FC (Function Calling) — Latest (2025.10)
Integrated with AgentRL for end-to-end RL training. Uses function-calling style prompts. Containerized via Docker Compose for: alfworld, dbbench, knowledgegraph, os_interaction, webshop.

### VisualAgentBench (2024.08)
Separate repo for evaluating visual foundation agents (LMMs): VAB-OmniGibson, VAB-Minecraft, VAB-Mobile, VAB-WebArena-Lite, VAB-CSS.

### Leaderboard Results
GPT-4 class models significantly outperform open-source models. Significant gaps remain between models and practical usability.

### Citation
```bibtex
@article{liu2023agentbench,
  title={AgentBench: Evaluating LLMs as Agents},
  author={Xiao Liu et al.},
  year={2023},
  journal={arXiv:2308.03688}
}
```
