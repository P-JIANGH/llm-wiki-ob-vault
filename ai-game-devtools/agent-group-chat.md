---
title: Agent Group Chat
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, simulation, multi-agent, llm, game, framework]
sources: [raw/articles/ai-game-devtools/agent-group-chat.md]
---

# Agent Group Chat

An interactive multi-agent group chat simulation for studying collective emergent behaviors. Agents with distinct characters engage in free-form chat based on their character settings, enabling observation of unforeseen and significant emergent behaviors.

## Overview

Agent Group Chat (arXiv:2403.13433) simulates linguistic interactions among multiple agents in configurable settings. The framework is designed to investigate the role of language in human collective behaviors, with four built-in narrative scenarios: Inheritance Disputes, Law Court Debates, Philosophical Discourses, and Movie Casting Contention.

Agents operate according to their character objectives and backgrounds, using LLM-powered decision making to choose actions, dialogue partners, and speech content. The simulation tracks belief changes, social relations, and resource ownership over multiple rounds.

## Architecture

### Game Loop Phases

The simulation runs through four phases per round:

1. **Competition Stage** — Agents with high social influence act first; each selects a target from a different faction and conducts multi-round private dialogue. The selection is constraint-verified (LLM must output a valid candidate ID).
2. **Cooperation Stage** — Agents meet with others; dialogue content remains private but meeting attendance is public knowledge.
3. **Group Chat Stage** — All agents speak publicly in a group setting; what they say is visible to everyone.
4. **Reflection Stage** — Agents update their beliefs and relationships based on observed interactions.

The round structure is orchestrated by `AgentGroupChat` in `main.py`, which manages phase transitions, action scheduling by influence ranking, and state persistence.

### LLM Engine Abstraction

The `prompt/gpt_structure.py` module provides a unified `generate()` interface that dispatches to multiple backends:

| Engine | Provider | Notes |
|--------|----------|-------|
| gpt3.5 / gpt4 / gpt4-turbo | OpenAI API | Via `GPT_request_by_url()` |
| glm-3-turbo / glm-4 | ZhipuAI API | Via `GLM_request_by_API()` |
| hunyuan-chatpro / hunyuan-chatstd | Tencent Hunyuan | Via `HunYuan_request()` |
| HuggingFace models | Local | `THUDM/chatglm3-6b-32k`, Llama-2, Mistral, Falcon via `ModelPool` |
| human | Manual input | For human-in-the-loop experiments |

### Character System

Each character (`character_class.py`) has:
- **Objective** — their goal in the scenario
- **Background** — publicly visible description
- **Scratch** — private script visible only to themselves
- **Belief** — mutable belief state (can switch between beliefs)
- **Relation** — dynamic relations with other characters
- **Influence** — social influence score, accumulated from owned resources
- **Engine** — which LLM powers this character's decisions

Characters expose action methods: `perceive()`, `choose()`, `facechat()`, `reflect()`, `groupchat()`, `vote()`. Each delegates to `generate_with_response_parser()` which calls the appropriate `generate()` backend.

### Action Types

`SAY` · `CHAT_SUMMARIZATION` · `MEET` · `REFLECT` · `SPEECH_NORMAL` · `SPEECH_VOTE` · `GUESS` · `VOTE` · `VOTE_OTHERS`

Action history is stored via `ActionHistory` and retrieved contextually (e.g., `ACTIONHISTORY_RETRIEVE_NUM_COMPETE=20` for competition stage retrieval).

## Game Configuration

Key hyperparameters in `config.py`:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `GAME_ROUND` | 3 | Total game rounds |
| `PRIVATE_CHAT_ROUND` | 3 | Private dialogue rounds per turn |
| `MEETING_CHAT_ROUND` | 3 | Cooperation stage rounds |
| `GROUP_CHAT_ROUND` | 3 | Public group chat rounds |
| `MAX_INFLUENCE_SCORE` | 9999 | Influence score cap |
| `MAX_RELATION_SCORE` | 100 | Relation score cap |
| `ERROR_RETRY_TIMES` | 10 | LLM response verification retries |

## Evaluation

The framework computes **n-gram Shannon entropy** over all spoken content to quantify environmental disorder. Key finding: when agents are substantially aligned with human expectations, facilitating more extensive information exchange within the simulation ensures greater orderliness amidst diversity, leading to more unexpected and meaningful emergent behaviors.

## Relationship to Other Agents

Agent Group Chat is closely related to [[generative-agents]] (Park et al., 2023) — it adopts the same `generate_with_response_parser()` prompt-based LLM interaction pattern and builds on the generative agents architecture. Unlike [[generative-agents]] which focuses on sandboxed daily life simulation, Agent Group Chat is structured around competitive/cooperative multi-agent debate scenarios with explicit resource ownership and voting mechanics.

Compared to [[ai-town]] (a16z), Agent Group Chat provides more structured scenario definitions and multi-phase game mechanics, whereas [[ai-town]] is optimized for lightweight deployment with a simple conversation loop.

## License

Not specified in repository.

## References

- [Paper (arXiv:2403.13433)](https://arxiv.org/abs/2403.13433)
- [GitHub Repository](https://github.com/MikeGu721/AgentGroup)
- Contact: Zhouhong Gu (`zhgu22@m.fudan.edu.cn`)
