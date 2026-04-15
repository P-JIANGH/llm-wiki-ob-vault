---
title: CrewAI
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, agent, framework, python, llm, open-source]
sources: [raw/articles/ai-game-devtools/crewai.md]
---

# CrewAI

## Overview
CrewAI is a standalone Python framework for orchestrating autonomous multi-AI agents. Built from scratch — completely independent of LangChain or other agent frameworks. Designed for both simple task automation and complex enterprise-grade multi-agent systems.

## Key Facts
- **License**: MIT
- **Language**: Python >=3.10 <3.14
- **Package Manager**: UV
- **Repository**: [crewAIInc/crewAI](https://github.com/joaomdmoura/crewAI)
- **Founded**: By João Moura
- **Community**: 100K+ developers certified via learn.crewai.com
- **Enterprise**: CrewAI AMP Suite (Cloud Control Plane + on-premise)

## Architecture

### Two Core Abstractions

**1. Crews** — Teams of autonomous agents with role-based collaboration:
- Natural autonomous decision-making between agents
- Dynamic task delegation and collaboration
- Specialized roles with defined goals and expertise
- Two process types: `Process.sequential` and `Process.hierarchical` (manager agent)

**2. Flows** — Production event-driven workflows:
- Fine-grained control over execution paths
- `@start`, `@listen`, `@router` decorators
- `or_` / `and_` logical operators for conditional branching
- Pydantic `BaseModel` for structured state
- Seamless integration of Crews within Flows

### Monorepo Structure
```
lib/
├── crewai/           # Core framework (Agent, Crew, Task, Process, Flow)
├── crewai-tools/     # Built-in tools (SerperDevTool, etc.)
├── crewai-files/     # File handling
└── devtools/         # Development utilities
```

### Key Modules
| Module | Purpose |
|--------|---------|
| `agent/` | Agent implementation with role/goal/backstory |
| `crew.py` | Crew orchestration |
| `flow/` | Event-driven Flow (@start/@listen/@router) |
| `tasks/` | Task definitions with output_file support |
| `llm.py` / `llms/` | LLM abstraction (OpenAI, Ollama, etc.) |
| `memory/` | Memory system for agents |
| `cli/` | `crewai create/run/install/update` commands |
| `project/` | `@CrewBase` decorator for type-safe crew definition |
| `knowledge/` | Knowledge management |
| `rag/` | RAG capabilities |

## Core Concepts

### Agent
```python
Agent(role="Senior Researcher", goal="Find latest AI developments", backstory="...")
```

### Task
```python
Task(description="Research {topic}", expected_output="List of 10 bullet points", agent=researcher)
```

### Crew
```python
Crew(agents=[researcher, analyst], tasks=[research_task, report_task], process=Process.sequential)
```

### Flow (with state)
```python
class MarketState(BaseModel):
    sentiment: str = "neutral"
    confidence: float = 0.0

class AdvancedFlow(Flow[MarketState]):
    @start()
    def fetch_data(self): ...

    @listen(fetch_data)
    def analyze(self, data): ...

    @router(analyze)
    def route(self): ...
```

## YAML Configuration
Projects generated via `crewai create crew <name>` scaffold with:
- `config/agents.yaml` — agent definitions
- `config/tasks.yaml` — task definitions
- `crew.py` — `@CrewBase` class with `@agent`/`@task`/`@crew` decorators

## LLM Support
- OpenAI (default)
- Ollama (local models)
- LM Studio
- Any OpenAI-compatible API
- Custom fine-tuned models

## Comparison

| Framework | Process Concept | Dependency | Performance |
|-----------|----------------|------------|-------------|
| **CrewAI** | Built-in (Sequential/Hierarchical/Flows) | None (standalone) | 5.76x faster than LangGraph |
| [[autogen]] | Manual orchestration | LangChain-based | — |
| [[chatdev]] | Rigid process | Not production-oriented | — |
| [[metagpt]] | SOP-based roles | LangChain | — |
| LangGraph | Graph-based | LangChain required | Slower, more boilerplate |

## Enterprise: CrewAI AMP Suite
- **Tracing & Observability**: Real-time metrics, logs, traces
- **Unified Control Plane**: Centralized agent/workflow management
- **Security**: Built-in compliance measures
- **Deploy**: Cloud or on-premise

## Telemetry
Anonymous telemetry collected (opt-out via `OTEL_SDK_DISABLED=true`). **Never** collected: prompts, task descriptions, backstories, API keys, responses, or secrets. Optional `share_crew=True` enables deeper telemetry with full crew data.

## Related
- [[autogen]] — Microsoft Research multi-agent framework (maintenance mode)
- [[chatdev]] — OpenBMB zero-code multi-agent platform (rigid process)
- [[metagpt]] — Role-based multi-agent software company framework
- [[auto-gpt]] — Early autonomous agent project
- [[aios]] — AI Agent operating system with LLM kernel abstraction
