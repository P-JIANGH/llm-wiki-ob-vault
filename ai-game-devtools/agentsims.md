---
title: AgentSims
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, tool, game-engine]
sources: [raw/articles/ai-game-devtools/agentsims.md]
---

# AgentSims

An open-source sandbox for evaluating large language models (LLMs) by deploying them as agents in a simulated town environment.

## Overview

AgentSims lets researchers test specific LLM capabilities by placing LLM-powered agents in a simulated town with buildings, NPCs, equipment, and an economic system. Evaluation is QA-based — every k ticks the system asks a subject agent a question and measures the response against a configurable ground-truth condition.

**URL:** https://github.com/py499372727/AgentSims
**ArXiv:** [2308.04026](https://arxiv.org/abs/2308.04026)
**Authors:** Jiaju Lin, Haoran Zhao et al. (PTA Studio)
**License:** Not specified

## Technical Stack

- **Backend:** Python 3.9.x, Tornado WebSocket server (port 8000)
- **Database:** MySQL 8.0.31 (multiple `llm_game` databases for snapshot isolation)
- **Frontend:** Web-based GUI (`client/index.html`)
- **LLM API:** openai_async (OpenAI-compatible, supports custom model deployment)
- **Dependencies:** tornado, mysql-connector-python, websockets

## Architecture

### Agent Loop (Actor)

The core agent cycle in `agent/actor.py`:

```
init → QA → plan → building → moving → act → use/chat
use → critic → (success? store_memory + plan : act)
chat → store_memory → plan
timetick → store_memory → Memory
```

Key components:
- **Plan system:** QAFramework or JustPlan
- **Memory system:** LongShortTermMemories (episodic + building/person impressions)
- **Critic:** evaluates action results → success/fail → stores experience

### Configuration Files

| File | Content |
|------|---------|
| `config/agent.json` | 8 premade NPC assets, supported models (gpt-4/gpt-3.5), memory/plan systems |
| `config/buildings.json` | Building types, positions, functions |
| `config/economics.json` | Economic transactions, cash system |
| `config/equipments.json` | Interactive objects within buildings |
| `config/eval.json` | QA evaluation tasks (query + measurement + interval) |
| `config/framework.json` | Agent framework configuration |

### Server Modes

- **tick mode:** advances simulation one tick at a time, triggers agent per-tick actions
- **mayor mode:** observer/controller NPC for sandbox orchestration

## Evaluation Approach

AgentSims uses **task-based QA evaluation** rather than fixed benchmarks. Researchers define:
1. A subject NPC (e.g., "Alan")
2. A natural-language query (e.g., "Are you acquainted with pH?")
3. A measurement function (e.g., `"Yes" in response`)
4. An evaluation interval (every N ticks)

This avoids shortcomings of traditional benchmarks: constrained abilities, vulnerable metrics, and unobjective measurements.

## Differentiator

AgentSims is designed for **open-source custom task building**. Other simulation-based LLM evaluations are typically closed/fixed — AgentSims allows researchers to add agents and buildings via an interactive GUI or deploy new memory/plan subsystems programmatically.

## Related

- [[ai-game-devtools/agentbench]] — multi-environment LLM agent benchmark
- [[ai-game-devtools/generative-agents]] — Stanford sandbox agent simulation (Generative Agents, 2023)
- [[ai-game-devtools/agentscope]] — Alibaba AgentScope multi-agent framework
