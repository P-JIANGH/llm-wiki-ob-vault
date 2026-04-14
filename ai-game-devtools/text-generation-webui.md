---
title: TextGen (text-generation-webui)
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, text-generation, open-source, game-dev, webui, llama-cpp, multimodal]
sources: [raw/articles/ai-game-devtools/text-generation-webui.md]
---

# TextGen (text-generation-webui)

A Gradio-based web UI for running Large Language Models locally. Formerly known as "Oobabooga's Text Generation WebUI". 100% private and offline with zero telemetry. Inspired by [[AUTOMATIC1111/stable-diffusion-webui]].

## Overview

TextGen is a feature-rich browser-based interface for local LLM inference, supporting multiple inference backends, multimodal vision, tool-calling, LoRA fine-tuning, and image generation in a single application. It was partially funded by an a16z grant (August 2023).

## Key Facts

| Fact | Detail |
|------|--------|
| License | MIT (per repository LICENSE file) |
| Language | Python |
| UI Framework | Gradio |
| Main Entry | `server.py` |
| Backends | llama.cpp, ExLlamaV3, Transformers, TensorRT-LLM, ik_llama.cpp |
| a16z Grant | August 2023 |

## Backends & Loaders

TextGen ships with 5 different model loaders:

1. **llama.cpp** — GGUF quantization, CPU/GPU, most portable
2. **ExLlamaV3** — Fast CUDA inference, 2-8 bit quantization
3. **Transformers** — Hugging Face `transformers` library
4. **TensorRT-LLM** — NVIDIA TensorRT optimization
5. **ik_llama.cpp** — Alternative llama.cpp fork

Switching between backends requires no restart. LoRA application is handled by `modules/LoRA.py` across all backends.

## Core Capabilities

### Text Generation
- `instruct` mode (like ChatGPT), `chat-instruct`, and `chat` modes
- Jinja2 prompt templates for instruction-following
- Notebook tab for free-form generation
- Rich sampling parameters (temperature, top-p, top-k, mirostat, DRY, etc.)
- Speculative decoding (draft model + n-gram schemes)

### Multimodal / Vision
- Attach images to chat messages for visual understanding
- `--mmproj` flag for vision model mmproj files
- File attachments: text, PDF, .docx

### Tool Calling & Extensions
- Custom Python function tools during chat
- MCP server support
- Built-in extensions: whisper_stt, silero_tts, coqui_tts, sd_api_pictures, gallery, ngrok, perplexity_colors, google_translate, long_replies, character_bias, send_pictures, superbooga, superboogav2
- Extension system in `modules/extensions.py`

### Fine-tuning
- LoRA fine-tuning on multi-turn chat or raw text datasets
- Training tab with resume support (`modules/training.py`)

### Image Generation
- Dedicated tab for `diffusers` models (e.g., Z-Image-Turbo)
- 4-bit/8-bit quantization, persistent gallery with metadata

### OpenAI-Compatible API
- Chat, Completions, Messages endpoints
- Tool-calling support
- Use as local drop-in replacement for OpenAI/Anthropic APIs
- Enabled via `--api` flag

## Architecture

```
server.py          # Main: Gradio interface, signal handling
modules/
├── models.py      # load_model(), unload_model_if_idle()
├── loaders.py     # Backend loader selection
├── chat.py        # Chat session management
├── prompts.py     # Jinja2 prompt formatting
├── evaluate.py    # Text generation
├── training.py    # LoRA fine-tuning
├── LoRA.py        # LoRA application
├── image_models.py # Multimodal model loading
├── extensions.py  # Extension system
├── reasoning.py   # Chain-of-thought / thinking mode
├── tool_parsing.py # Tool call parsing
├── tool_use.py    # Tool execution
├── api/           # OpenAI-compatible API endpoints
├── llama_cpp_server.py  # llama.cpp server
├── exllamav3.py         # ExLlamaV3 backend
├── tensorrt_llm.py      # TensorRT-LLM backend
└── ui_*.py       # Gradio UI components (chat, parameters, model menu, etc.)
```

## Installation

1. **Portable builds** — Zero setup, just unzip and run. GGUF models only.
2. **One-click installer** — Miniforge/Conda environment, full features.
3. **Manual conda/python** — Custom Python 3.9+ with pip requirements.
4. **Docker** — NVIDIA/AMD/Intel/CPU Dockerfiles provided.

## Relation to Game Development

TextGen can serve as a **local backend for game AI** — NPCs, dialogue systems, quest generation, and tool-augmented game agents. Its OpenAI-compatible API makes it easy to integrate with existing game engines (Unity, Godot, Unreal) via standard HTTP clients. The tool-calling and extension systems allow game-specific function calling (e.g., triggering game events, querying game state).

Supports [[llama-3]], [[qwen3]], [[DeepSeek-Coder]], and other models used in game AI pipelines.

## See Also

- [[AUTOMATIC1111/stable-diffusion-webui]] — Inspiration for TextGen
- [[llama-cpp]] — Primary backend loader (GGUF)
- [[llm-unity-integration]] — Related: Unity LLM integration patterns
