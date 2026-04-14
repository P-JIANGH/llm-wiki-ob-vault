# 01 Project — Source Summary

> Cloned from: https://github.com/OpenInterpreter/01
> Clone date: 2026-04-15
> License: AGPL

## Overview

The **01** is an open-source platform for intelligent voice-controlled devices, inspired by Rabbit R1 and the Star Trek computer. Powered by [Open Interpreter](https://github.com/OpenInterpreter/open-interpreter), it provides a natural language voice interface for computers.

**Core claim:** "The #1 open-source voice interface."

## Key Facts

- License: AGPL
- Language: Python (>=3.10, <3.12)
- Package version: 0.0.14
- Uses [Open Interpreter](https://github.com/OpenInterpreter/open-interpreter) as the core LLM agent
- Server options: Light (ESP32/low-power) and LiveKit (high-power)
- Clients: Desktop, Android/iOS, ESP32, Light Python

## Architecture

```
software/
├── main.py              # CLI entry point (typer)
├── pyproject.toml       # Poetry project config
└── source/
    ├── server/          # Server implementations
    │   ├── server.py    # Main server module
    │   ├── livekit/     # LiveKit server (worker.py, multimodal.py)
    │   └── profiles/    # Profile configurations
    └── clients/
        ├── esp32/       # ESP32 client
        ├── light-python/# Light Python client
        └── mobile/      # Mobile client
```

## Dependencies (key)

- `open-interpreter[os,server]` — core LLM agent execution
- `livekit` + `livekit-agents` — real-time voice communication
- `livekit-plugins-deepgram` — speech recognition (STT)
- `livekit-plugins-openai` — OpenAI Realtime API
- `livekit-plugins-silero` — voice activity detection
- `livekit-plugins-elevenlabs` — TTS
- `realtimetts` + `realtimestt` — real-time TTS/STT
- `pywebview` — desktop GUI
- `ngrok` — tunneling for expose mode

## Capabilities

- Execute code on the host machine
- Browse the web
- Manage files
- Control third-party software

## Design Principles (from CONTEXT.md)

1. Be minimal (programmer-friendly and end-user friendly)
2. Develop standards compatible with other popular systems
3. Resonate strongly with a niche (startups or education)
4. Be affordable (under $100, ideally under $70 for basic unit)
5. Be open-source

## Safety

Experimental — lacks basic safeguards. Until 1.0 stable release, only run on devices without sensitive info or paid service access.

## Similar Projects Referenced

- UNIX, Linux, Raspberry Pi, Arduino — design/education philosophy references
- Pebble — cited as failure due to unclear singular vision
- Pinephone — mentioned for open-source tradeoffs
