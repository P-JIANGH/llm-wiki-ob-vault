---
title: Cradle
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, game-agent, llm, multimodal, open-source, baai]
sources: [raw/articles/ai-game-devtools/cradle.md]
---

# Cradle

**Cradle** is a foundation model agent framework for general computer control — allowing AI agents to play and interact with games and software by analyzing screenshots and executing keyboard/mouse actions. Developed by the [[BAAI-Agents]] lab at Beijing Academy of Artificial Intelligence, published in arXiv 2024.

## Overview

Cradle takes a unified approach: screenshot → LLM reasoning → action execution. Unlike specialized game bots, Cradle uses the same interface humans do, making it adaptable to any game or software given appropriate skill definitions.

**Supported environments:**
- **Games:** Red Dead Redemption 2, Stardew Valley, Cities: Skylines, Dealer's Life 2
- **Software:** Chrome, Outlook, Capcut, Meitu, Feishu

## Technical Architecture

### Core Components

1. **Skill Registry** — Each game has `atomic_skills` (primitive actions like "press W", "click left mouse") and `composite_skills` (higher-level actions built from atoms). All registered in `skill_registry.py`.

2. **GameIO** — Unified interface wrapping the skill registry and UI control layer.

3. **Planner** — LLM-driven action planning, self-reflection, and task inference. Uses a modular provider system for different LLM backends.

4. **Provider Layer:**
   - `provider/llm/` — OpenAI GPT-4o, Claude (Anthropic), Azure OpenAI
   - `provider/object_detect/` — GroundingDINO + SAM for zero-shot object detection
   - `provider/process/` — Pre/post processing for LLM prompts
   - EasyOCR + spaCy for text extraction

5. **Memory** — Execution history store for reflection and context.

6. **Runner** — Per-environment execution flow (`runner/[env]_runner.py`). Two patterns:
   - **Pause-based** (RDR2, Stardew): Real-time games that pause to wait for LLM response
   - **Real-time** (Cities: Skylines, Dealer's Life 2): No pause needed

### Input/Output
- **Input:** Screenshot frames via `mss` + `opencv-python`
- **Output:** Keyboard/mouse actions via `pyautogui`, `pydirectinput`, `ahk`
- **Control:** Windows (Win32), macOS (pyobjc-Quartz)

### Prompt Templates (per game)
Located in `res/[game]/prompts/templates/`:
- `action_planning.prompt` — What to do next
- `information_gathering.prompt` — What info to extract from screenshot
- `self_reflection.prompt` — Self-critique after actions
- `task_inference.prompt` — Goal decomposition

## Key Differentiators

Unlike [[AI-Town]] (which uses text-based conversation), Cradle operates in **pixel space** — seeing and acting on the actual game UI. Compared to [[AgentSims]], Cradle focuses on single-agent control of commercial games rather than multi-agent social simulation. Cradle is most similar to [[OpenDevin]] in its general computer control approach but specialized for game/software environments.

## License & Setup

- **License:** MIT
- **Python:** 3.10
- **Dependencies:** openai, anthropic, opencv-python, segment-anything, GroundingDINO, easyocr, spacy, pyautogui, ahk
- **Entry:** `python runner.py --envConfig ./conf/env_config_[game].json`

## References

- [GitHub](https://github.com/BAAI-Agents/Cradle)
- [arXiv Paper](https://arxiv.org/abs/2403.03186)
- [Project Website](https://baai-agents.github.io/Cradle/)
