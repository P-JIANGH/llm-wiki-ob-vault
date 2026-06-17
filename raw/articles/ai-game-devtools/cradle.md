# Cradle: Empowering Foundation Agents Towards General Computer Control

> Source: https://github.com/BAAI-Agents/Cradle
> Cloned: 2026-04-15

## Overview

Cradle is a framework by BAAI-Agents (Beijing Academy of Artificial Intelligence) that empowers foundation models to perform complex computer tasks via screenshots as input and keyboard/mouse operations as output — the same interface humans use. Published arXiv 2024.

## Key Facts
- **License:** MIT
- **Python:** 3.10+
- **Paper:** arXiv:2403.03186
- **Authors:** Weihao Tan, Wentao Zhang, Xinrun Xu et al. (BAAI, PKU, NUS)

## Supported Environments
- **Games:** Red Dead Redemption 2 (RDR2), Stardew Valley, Cities: Skylines, Dealer's Life 2
- **Software:** Chrome, Outlook, Capcut, Meitu, Feishu

## Architecture

```
Cradle/
├── cradle/
│   ├── config/         # Configuration
│   ├── environment/    # Per-game env (rdr2, stardew, skylines, dealers, chrome, outlook, capcut...)
│   │   └── [game]/
│   │       ├── atomic_skills/     # Atomic actions (movement, click, etc.)
│   │       ├── composite_skills/  # Combined skills
│   │       ├── skill_registry.py  # Registers all skills
│   │       └── ui_control.py      # Window/focus control
│   ├── gameio/         # GameIO interface wrapping skill registry + UI control
│   ├── memory/         # Memory management
│   ├── planner/        # Action planning, self-reflection (unified interface)
│   ├── provider/       # LLM calls (OpenAI GPT-4o, Claude), object detection, SAM, OCR
│   │   ├── llm/        # LLM providers (OpenAI, Claude, Azure)
│   │   ├── object_detect/  # GroundingDINO, SAM
│   │   ├── module/     # Action planning, self-reflection modules
│   │   └── process/    # Pre/post processing
│   └── runner/         # Per-game execution flow
├── conf/               # JSON configs per env + LLM provider configs
├── res/                # Game resources: prompts, icons, saves
│   └── [game]/prompts/templates/
│       ├── action_planning.prompt
│       ├── information_gathering.prompt
│       ├── self_reflection.prompt
│       └── task_inference.prompt
└── runner.py           # Main entry point
```

## Core Modules

1. **Skill Registry** — Per-game atomic skills (keyboard, mouse, game-state) + composite skills registered in `skill_registry.py`
2. **GameIO** — Wraps skill registry and UI control into a unified interface
3. **Planner** — Unified interface for action planning, self-reflection, task inference using LLM
4. **Provider** — LLM calls (GPT-4o, Claude via API), object detection (GroundingDINO, SAM), OCR (EasyOCR, spaCy)
5. **Memory** — Stores execution history and reflection

## Dependencies
- openai, anthropic (LLM APIs)
- opencv-python, supervision (vision)
- segment-anything (SAM)
- GroundingDINO (object detection)
- easyocr, spacy (OCR/NER)
- pyautogui, pydirectinput, ahk (input control)
- python-dotenv (config)

## Entry Point
```bash
python runner.py --llmProviderConfig ./conf/openai_config.json --envConfig ./conf/env_config_rdr2_main_storyline.json
```

## Migration to New Game
Each game needs custom `atomic_skills`, `composite_skills`, `skill_registry.py`, `ui_control.py`, and prompt templates. RDR2/Stardew require pause-based turn-taking (real-time combat). Cities:Skylines/Dealer's Life 2 run in real-time without pause.
