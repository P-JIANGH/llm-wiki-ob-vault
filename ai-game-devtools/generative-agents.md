---
title: Generative Agents
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, agent, game, simulation, research, memory]
sources: [raw/articles/ai-game-devtools/generative-agents.md]
---

# Generative Agents

Stanford research project (Park et al., UIST 2023) creating **interactive simulacra of human behavior** — LLM-powered NPCs that exhibit believable daily routines, social interactions, and emergent behaviors in a 2D sandbox town called "Smallville."

## Overview

25 AI-driven personas live in a sandbox environment, each with unique personalities, memories, and relationships. The core innovation is the **cognitive architecture** that mirrors human memory processes: perception of surroundings, retrieval of relevant memories, planning next actions, executing them, and periodically **reflecting** to synthesize insights from experience.

The project was a seminal influence on [[ai-town]] (a16z-infra) and [[cat-town]], both of which forked and simplified this architecture for easier deployment.

## Architecture

### Cognitive Pipeline (per game step)
1. **Perceive** — detect nearby events within vision radius (filtered by `att_bandwidth` and `retention`)
2. **Retrieve** — fetch relevant memories from Memory Stream based on perceived events
3. **Plan** — generate long-term and short-term plans (triggered on new day)
4. **Execute** — convert plan to concrete tile navigation + action
5. **Reflect** — triggered by importance threshold, generates insight thoughts from accumulated experiences

### Memory Stream (AssociativeMemory)
Long-term memory modeled as a stream of ConceptNodes with SPO (subject-predicate-object) triples, embeddings, poignancy scores, and keywords. Three node types:
- **event**: Observations and actions
- **thought**: Reflections and insights (depth tracks evidence chain)
- **chat**: Conversations with other agents

### Reflection Module
Generative reflection: selects focal points via GPT → retrieves relevant nodes → generates 5 insights as new thought nodes. Each insight has 30-day expiration.

### Environment
- Django web server serving 2D tile map
- Two base simulations: 25-agent "Smallville" and 3-agent demo
- Save/replay/compress workflows for simulation data

## Key Implementation Details

- **No agent framework dependencies** — pure Python + OpenAI API
- **Memory persistence** — JSON spatial memory + CSV associative memory + JSON scratch
- **GPT prompts** drive all cognitive steps (perceive, retrieve, plan, reflect)
- **Poignancy scoring** determines which memories trigger reflection
- Simulation runs via `python reverie.py` CLI, browser visualization at `localhost:8000`

## Related

- Inspired [[ai-town]] (a16z fork, simplified)
- Inspired [[cat-town]] (cat-themed fork)
- Related cognitive architecture in [[stanford-generative-agents]]
- Same domain as [[agentsims]] (both simulate agents in game environments)
- Related to [[agent-group-chat]] (multi-agent social simulation)
