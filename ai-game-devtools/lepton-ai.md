---
title: Lepton AI
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, framework, python, tool]
sources: [raw/articles/ai-game-devtools/lepton-ai.md]
---

# Lepton AI

## Overview
A Pythonic framework for simplifying AI service building. Converts research and modeling code into deployable AI services with minimal boilerplate. CLI tool `lep`.

## Key Features

- **Photon abstraction** — Core class that turns any Python code into a REST API service via `@Photon.handler` decorator
- **HuggingFace model launcher** — One-liner `lep photon runlocal -m hf:model-name` to serve models
- **Prebuilt examples** — Llama, SDXL, Whisper, and more
- **AI-tailored features** — Autobatching, background jobs, streaming
- **Pythonic client** — Auto-generates typed Python client from running service
- **Cloud deployment** — Full cloudrun, workspace, deployment, storage CLI via `lep`
- **Apache 2.0** license

## Architecture

```
leptonai/
├── photon/         # Photon class, handler decorator, autobatching
│   ├── hf/        # HuggingFace pipeline integration
│   ├── vllm/      # vLLM inference backend
│   └── prebuilt/  # Ready-made photon handlers
├── cli/           # `lep` command implementation (deployment, job, storage)
├── client.py      # Python client SDK
├── cloudrun/      # Cloud-side runtime
├── api/           # FastAPI-based HTTP layer
└── util/          # Helpers
```

## Technology Stack

- **Web:** FastAPI + uvicorn
- **HTTP:** httpx (HTTP/2)
- **Compute:** Ray (distributed)
- **LLM:** HuggingFace transformers/diffusers, vLLM
- **Python:** 3.9–3.13

## Game Dev Relevance

Can be used to quickly deploy game AI services — NPC dialogue models, image generation (SDXL), speech recognition (Whisper), or custom game logic as Photons. The lightweight local mode (`runlocal`) is useful for prototyping game AI backends without cloud infrastructure.

## Compared to Similar Tools

| | Lepton AI | [[ai-game-devtools/jan]] | [[ai-game-devtools/gpt4all]] |
|---|---|---|---|
| Type | Framework + Cloud | Local app | Local runtime |
| Language | Python | Rust+React | C++/Python |
| Model serving | HF + vLLM | llama.cpp/MLX | llama.cpp |
| Local UI | No (CLI-focused) | Yes (Electron) | Yes (GUI) |
| Cloud deploy | Yes | No | No |
| License | Apache 2.0 | Apache 2.0 | GPL |

## Related Links

- GitHub: https://github.com/leptonai/leptonai
- Docs: https://docs.nvidia.com/dgx-cloud/lepton
- Examples: https://github.com/leptonai/examples
