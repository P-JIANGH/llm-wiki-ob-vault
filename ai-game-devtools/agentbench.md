---
title: AgentBench
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai-model, benchmark, agent, llm, evaluation, game]
sources: [raw/articles/ai-game-devtools/agentbench.md]
---

# AgentBench

LLM agent benchmark evaluating models across 8 diverse environments — OS, database, knowledge graph, digital card game, lateral thinking puzzles, and 3 embodied/web tasks.

## Overview

**AgentBench** (THUDM, 2023) is the first benchmark designed to evaluate [[LLM]]s as autonomous agents in real-world-style environments. Unlike static NLP benchmarks, it requires models to interact with live systems — executing bash commands, running SQL queries, browsing the web, and playing games — where success depends on planning, tool use, and iterative reasoning.

The benchmark has two major versions:
- **AgentBench v0.2** (original) — REST API-based agent evaluation
- **AgentBench FC** (2025.10) — Function-calling style, integrated with [[AgentRL]], fully containerized via Docker Compose

A separate effort, **[[VisualAgentBench]]** (2024.08), extends the paradigm to visual foundation agents (LMMs) across embodied, GUI, and visual design domains.

## Environments

| Task | Description | Metric | Docker RAM |
|------|-------------|--------|------------|
| OS | Ubuntu bash — filesystem ops, user management | Success Rate | ~500MB |
| DB | SQL — multi-table queries, real MySQL | Success Rate | <500MB |
| KG | Freebase KG — 45M entities, SPARQL interface | F1 | <500MB |
| DCG | "Aquawar" digital card game — turn-based strategy | Win Rate | <500MB |
| LTP | Lateral thinking puzzles — yes/no/irrelevant responses | Progress % | <500MB |
| HH (ALFWorld) | Embodied household tasks in Docker | Success Rate | <500MB |
| WS (WebShop) | Web shopping — browse/search/buy | Success Rate | ~15GB |
| WB (Mind2Web) | Web browsing — real website interaction | Success Rate | ~1GB |

Key resource constraint: `webshop` requires ~16GB RAM to start; `alfworld` leaks memory until worker restart.

## Architecture

```
src/
├── client/          # Agent clients (API LLMs, local LLMs)
│   └── agent_test.py # Verify agent configuration
├── server/          # Task worker pool (Docker-isolated)
├── assigner.py      # Coordinator — assigns tasks to workers
├── start_task.py    # Launches task servers (--config for lite)
└── analysis.py      # Results analysis

configs/
├── agents/          # openai-chat.yaml, api_agents.yaml
├── tasks/           # Task definitions per environment
└── assignments/    # Assignment presets (lite.yaml, etc.)

extra/
└── docker-compose.yml  # FC version: fully containerized stack
```

**Evaluation flow:**
1. Configure API key in `configs/agents/openai-chat.yaml`
2. `python -m src.start_task -a` — launch task workers (5 per task)
3. Wait ~1 min for setup, verify "200 OK"
4. `python -m src.assigner` — run evaluation

For limited-RAM machines: `python -m src.start_task -a --config configs/start_task_lite.yaml` runs 1 worker per task.

## AgentBench FC (Function Calling)

Latest version (2025.10) integrates with [[AgentRL]] for end-to-end multitask and mult-itiner RL training. Uses function-calling style prompts. Containerized via Docker Compose:

```bash
docker compose -f extra/docker-compose.yml up
```

Services: AgentRL Controller + per-task workers (alfworld, dbbench, knowledgegraph, os_interaction, webshop) + Freebase KG server + Redis.

## Key Findings

- **GPT-4 class models** significantly outperform all open-source models across all 8 environments
- Significant **gaps remain** between current models and practical real-world agent usability
- Multi-turn interaction requires ~4k (dev) and ~13k (test) LLM calls respectively
- Open-source models struggle particularly with OS-level commands and long-horizon planning

## Related Projects

- [[AgentRL]] — End-to-end RL framework for LLM agents (integrated in FC version)
- [[VisualAgentBench]] — Visual multimodal agent evaluation
- [[SWE-agent]] — LLM agent for software engineering tasks
- [[AutoGen]] — Multi-agent conversational framework
- [[MetaGPT]] — Multi-agent framework with SOPs for software development

## Links

- GitHub: https://github.com/thudm/agentbench
- Paper: https://arxiv.org/abs/2308.03688
- Leaderboard: https://docs.google.com/spreadsheets/d/e/2PACX-1vRR3Wl7wsCgHpwUw1_eUXW_fptAPLL3FkhnW_rua0O1Ji_GIVrpTjY5LaKAhwO-WeARjnY_KNw0SYNJ/pubhtml
- License: MIT
