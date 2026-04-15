# Agent Group Chat

> **Source:** https://github.com/MikeGu721/AgentGroup
> **Paper:** arXiv:2403.13433
> **License:** Not specified (open source)
> **Date:** 2024-03-20 (open sourced)

## Overview

Agent Group Chat is an interactive multi-agent group chat simulation framework designed to study collective emergent behaviors in linguistic interactions. It simulates agents with distinct characters engaging in free-form chat for their own purposes within configurable environmental settings, aiming to observe unforeseen and significant emergent behaviors.

## Architecture

### Core Components

- **`main.py`** — `AgentGroupChat` class: orchestrates the full simulation loop (competition → cooperation → reflection → settlement phases)
- **`config.py`** — Global game configuration: round counts, influence/relation/belief score bounds, memory retrieve limits, error retry settings
- **`prompt/gpt_structure.py`** — Model abstraction layer supporting multiple LLM engines:
  - OpenAI: GPT-3.5, GPT-4, GPT-4-turbo (via API)
  - ZhipuAI: GLM-3-turbo, GLM-4 (via API)
  - Tencent Hunyuan: ChatPro, ChatStd (via API)
  - HuggingFace local models: ChatGLM3-6b-32k, Llama-2, Mistral, Falcon
  - Human input mode
- **`character/`** — Agent character system:
  - `character_class.py`: single character with perceive, choose, facechat, vote, reflect methods
  - `all_character_class.py`: manages all characters
  - `action_modules/`: facechat, summarization, choose, vote, perceive, groupchat, reflection modules
- **`environment/`** — World state:
  - `resource_class.py`: resources (assets, topics, influence values, owners)
  - `action_history_class.py`: logged action history with retrieval
- **`logger_class.py`** — Logging system for thought processes and important events

### Game Loop (main.py)

1. **Competition Stage (private_chatting_stage)** — Agents with high influence act first; each selects a target and holds multi-round private dialogue
2. **Cooperation Stage (meeting_chat_stage)** — Agents meet with others (content private, attendance public)
3. **Group Chat Stage (group_chatting_stage)** — All agents speak publicly
4. **Reflection Stage** — Agents update beliefs/relations
5. **Settlement** — Vote on outcomes (e.g., inheritance dispute winner)

### Scenarios Included

- Inheritance Disputes
- Law Court Debates
- Philosophical Discourses
- Movie Casting Contention

### Character Attributes

| Field | Description |
|-------|-------------|
| name | Display name |
| id_name | Backend ID |
| engine | Model driving the agent (gpt3.5/gpt4/glm-4/human/...) |
| objective | Character's goal |
| scratch | Private script (self-only) |
| background | Public background |
| belief | Mutable belief state |
| relation | Relations with other characters |
| influence | Social influence score (accumulates from resources) |

### Supported Action Types

SAY, CHAT_SUMMARIZATION, MEET, REFLECT, SPEECH_NORMAL, SPEECH_VOTE, GUESS, VOTE, VOTE_OTHERS

## Key Files

```
AgentGroup/
├── main.py                    # AgentGroupChat orchestrator
├── config.py                  # Game hyperparams
├── prompt/
│   ├── gpt_structure.py        # Multi-engine LLM abstraction (generate(), ModelPool)
│   ├── utils.py               # Prompt templating
│   └── hunyuan.py             # Tencent Hunyuan API wrapper
├── character/
│   ├── character_class.py     # Character core class
│   ├── all_character_class.py  # Character registry
│   └── action_modules/        # Per-action LLM prompts
├── environment/
│   ├── resource_class.py      # Resource entity
│   └── action_history_class.py # Action history + retrieval
├── storage/succession/         # Example scenario configs
└── requirements.txt
```

## Evaluation

Uses n-gram Shannon entropy on all spoken content to measure environmental disorder. Finding: more information exchange → greater orderliness amidst diversity → more meaningful emergent behaviors.

## Dependencies

- `zhipuai` (ZhipuAI API)
- `transformers`, `torch` (for HuggingFace local models)
- `requests`
- Standard library: `json`, `collections`, `time`, `copy`, `os`

## Quick Start

```bash
pip install -r requirements.txt
# Set API URL/key in prompt/utils.py
# Set hyperparams in config.py
python main.py
```

## Customization

1. Create folder in `./storage/xxxx/`
2. Copy `./storage/succession/` as template
3. Edit: `succession_rule_setting.txt`, `characters/`, `resources/`, `basic_setting.json`
4. Add model support in `./prompt/gpt_structure.py`
