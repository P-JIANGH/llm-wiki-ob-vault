---
title: 01 Project
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, open-source, agent, llm, python]
sources: [raw/articles/ai-game-devtools/01-project.md]
---

# 01 Project

## Overview

**01** (OpenInterpreter/01) is an open-source platform for building intelligent voice-controlled devices, inspired by the Rabbit R1 and Star Trek computer. Powered by [[open-interpreter]], it provides a natural language voice interface that executes code, browses the web, manages files, and controls software on the host machine.

Website: https://01.openinterpreter.com/
Documentation: https://01.openinterpreter.com/
GitHub: https://github.com/OpenInterpreter/01

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | AGPL |
| **Language** | Python (>=3.10, <3.12) |
| **Package Version** | 0.0.14 |
| **Core Engine** | Open Interpreter (LLM agent) |
| **STT** | Deepgram (via LiveKit) |
| **TTS** | ElevenLabs (via LiveKit) |
| **Real-time Comm** | LiveKit |

## Architecture

```
software/
├── main.py               # CLI entry (typer)
├── pyproject.toml        # Poetry project config
└── source/
    ├── server/           # Server implementations
    │   ├── server.py     # Main server
    │   ├── livekit/      # LiveKit RTF server (worker.py, multimodal.py)
    │   └── profiles/     # Behavior profiles (LLM, system prompt config)
    └── clients/          # Client implementations
        ├── esp32/        # ESP32 embedded client
        ├── light-python/ # Lightweight Python client
        └── mobile/       # Android & iOS client
```

**Two server tiers:**
- **Light Server** — optimized for ESP32 and low-power embedded devices
- **LiveKit Server** — full-featured for devices with more processing power, supports OpenAI Realtime API multimodal

**Two client tiers:**
- **Light** — minimal footprint for embedded/hardware deployments
- **Standard** — desktop/mobile with GUI (pywebview)

## Technology Stack

- **Core agent:** [[open-interpreter]] — executes Python, shell commands, browsers
- **Voice stack:** LiveKit (real-time communication) + Deepgram (STT) + ElevenLabs/Silero (TTS)
- **Desktop GUI:** pywebview
- **Tunneling:** ngrok (for `--expose` public URL mode)
- **CLI framework:** typer
- **Python packaging:** Poetry

## Capabilities

- Natural language voice control of a computer
- Code execution (Python, shell)
- Web browsing
- File management
- Third-party software control
- Multi-profile configuration (customize LLM, system prompt, behavior)

## Design Principles

From `CONTEXT.md`:
1. **Minimal** — programmer-friendly and end-user-friendly
2. **Standards-compatible** — interoperate with popular systems
3. **Niche-focused** — either startups (build+sell devices) or education (like Raspberry Pi/Arduino)
4. **Affordable** — basic unit under $100, ideally under $70
5. **Open-source** — full source available

## Comparison to Similar Tools

| Dimension | 01 Project | Rabbit R1 | Rabbit OS |
|-----------|-----------|-----------|-----------|
| **License** | AGPL | Proprietary | Proprietary |
| **Core engine** | Open Interpreter | LAM (proprietary) | LAM (proprietary) |
| **Hardware** | Build-your-own / ESP32 | Proprietary device | Proprietary device |
| **Extensibility** | Full code execution | Limited | Limited |

## Related Projects

- [[open-interpreter]] — the core LLM agent powering 01
- [[Auto-GPT]] — autonomous agent framework (code execution)
- [[AgentGPT]] — browser-based agent deployment platform
- [[LivePortrait]] — voice-driven avatar (related TTS/avatar tech)
- `Hugging Face API Unity Integration` — Unity game engine AI integration pattern

## Safety

> [!IMPORTANT]
> Experimental. Lacks basic safeguards. Until stable 1.0, only run on devices without sensitive information or paid service access.
