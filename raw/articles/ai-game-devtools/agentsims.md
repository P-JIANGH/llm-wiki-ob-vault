# AgentSims — Source Summary

## Overview
AgentSims is an open-source sandbox infrastructure for evaluating large language models (LLMs) by deploying them as agents in a simulated town environment with buildings, NPCs, and economic systems. Researchers design evaluation tasks via GUI or code, and measure LLM agents' capabilities through QA-based evaluation at configurable tick intervals.

**URL:** https://github.com/py499372727/AgentSims
**ArXiv:** https://arxiv.org/abs/2308.04026
**Authors:** Jiaju Lin, Haoran Zhao, Aochi Zhang, Yiting Wu, Huqiuyue Ping, Qin Chen (PTA Studio)

## Tech Stack
- **Python 3.9.x** + Tornado (WebSocket server) + MySQL 8.0.31
- **Frontend:** Web-based GUI (client/index.html)
- **API:** OpenAI async client (openai_async)
- **Dependencies:** tornado, mysql-connector-python, websockets, openai_async

## Architecture

### Core Modules
| File | Role |
|------|------|
| `main.py` | Tornado WebSocket server on port 8000 |
| `app.py` | App class — session/state/snapshot management |
| `agent/actor.py` | Actor — LLM agent loop (init→QA→plan→act→critic→memory) |
| `tick.py` | Simulation tick loop — advances game time |
| `mayor.py` | Mayor mode — observer/controller NPC |
| `client.py` | WebSocket client (for mayor mode) |

### Agent Loop (Actor.react)
```
init → QA → plan
plan → building → moving
moving → act → use / chat
use → critic ? plan : act
chat → storeMemory → plan
timetick → storeMemory → memory_store → Memory
```

### Agent Configuration (config/agent.json)
- **Models:** gpt-4, gpt-3.5 (extensible)
- **Memory Systems:** LongShortTermMemories
- **Plan Systems:** QAFramework, JustPlan

### Simulation Components
- **Buildings:** defined in config/buildings.json (type, position, function)
- **NPCs:** config/agent.json with 8 premade assets
- **Economics:** config/economics.json (transactions, cash flows)
- **Equipments:** config/equipments.json (interactive objects)
- **Evaluation:** config/eval.json (QA-based evaluation)

### Evaluation Pattern
```json
{
  "id": "know pH",
  "target_nickname": "Alan",
  "query": "Are you acquainted with pH ?",
  "measurement": "'Yes' in response",
  "interval": 1
}
```
Every k ticks, system asks the subject agent a question and measures response.

## License
Not explicitly stated in README — no license file found.

## Key Differentiator
Unlike other LLM evaluation benchmarks, AgentSims is designed for **open-source custom task building** — researchers can add agents/buildings via GUI or deploy new memory/plan systems with a few lines of code.
