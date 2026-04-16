# Generative Agents: Interactive Simulacra of Human Behavior

> Source: https://github.com/joonspk-research/generative_agents
> Cloned: 2026-04-16
> Paper: arXiv:2304.03442, UIST 2023

## Overview

Stanford research project (Joon Sung Park et al., 2023) that creates interactive simulacra of human behavior using LLM-powered agents. The agent architecture implements a cognitive pipeline inspired by human memory: perception → retrieval → planning → execution → reflection. Runs in a 2D "Smallville" sandbox with 25 NPCs.

## Architecture

### Core Agent: Persona Class
- `Persona` class in `reverie/backend_server/persona/persona.py`
- Three memory structures:
  - **Spatial Memory** (`spatial_memory.py`): Hierarchical tree structure for location awareness
  - **Associative Memory** (`associative_memory.py`): Memory Stream — events, thoughts, and chats stored as ConceptNodes with subject/predicate/object triples and embeddings
  - **Scratch** (`scratch.py`): Short-term working memory

### Cognitive Modules (in `persona/cognitive_modules/`)
- **perceive.py**: Detects nearby events within vision radius (att_bandwidth) and temporal retention
- **retrieve.py**: Fetches relevant memories for given perceived events
- **plan.py**: Long-term and short-term planning; triggers on new day
- **reflect.py**: Generates insights from accumulated experiences (triggered by importance threshold)
- **execute.py**: Converts plan to concrete navigation/action
- **converse.py**: Handles dialogue with other agents

### Memory Stream (Associative Memory)
- ConceptNodes with: type (event/thought/chat), SPO triple, embedding_key, poignancy score, keywords
- Sequences: `seq_event`, `seq_thought`, `seq_chat` — all stored with temporal ordering
- Keyword → node lookup via `kw_to_event`, `kw_to_thought`, `kw_to_chat` dicts
- Reflection: generates focal points via GPT → retrieves relevant nodes → generates insights as new thought nodes

### Environment
- Django web server (`environment/frontend_server/`) serving a 2D tile map
- Two pre-built simulations: `base_the_ville_n25` (25 agents) and `base_the_ville_isabella_maria_klaus` (3 agents)
- Save/replay/compress simulation workflows

## Key Files
- `reverie/backend_server/reverie.py`: Main simulation server
- `reverie/backend_server/persona/persona.py`: Core Persona class
- `reverie/backend_server/persona/cognitive_modules/reflect.py`: Reflection module (generates insights)
- `reverie/backend_server/persona/memory_structures/associative_memory.py`: Memory Stream implementation
- `reverie/backend_server/persona/prompt_template/run_gpt_prompt.py`: GPT prompt templates
- `environment/frontend_server/`: Django web server for 2D game world

## Dependencies
- OpenAI API (required for GPT calls)
- Python 3.9.12
- Django
- numpy (for embedding similarity)

## Citation
```
Park et al., "Generative Agents: Interactive Simulacra of Human Behavior",
UIST 2023, San Francisco, CA, USA
```

## Authors
Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein
