# TextGen (text-generation-webui) — Source Summary

**Source:** https://github.com/oobabooga/text-generation-webui
**Cloned:** 2026-04-14
**License:** Unknown (repository has LICENSE file)

## Project Overview

TextGen (formerly Oobabooga's Text Generation WebUI) is a Gradio-based web UI for running Large Language Models locally. It is 100% private and offline, with zero telemetry. The project was inspired by AUTOMATIC1111's stable-diffusion-webui.

## Core Features

- **Multiple backends:** llama.cpp, ik_llama.cpp, Transformers, ExLlamaV3, TensorRT-LLM
- **OpenAI/Anthropic-compatible API:** Chat, Completions, Messages endpoints with tool-calling
- **Tool-calling:** Custom Python functions, MCP server support
- **Vision (multimodal):** Attach images to messages
- **File attachments:** Upload text, PDF, .docx documents
- **Training:** Fine-tune LoRAs on multi-turn chat or raw text datasets
- **Image generation:** Dedicated tab for diffusers models (e.g., Z-Image-Turbo)
- **Chat modes:** `instruct`, `chat-instruct`, `chat` with Jinja2 prompt templates
- **Notebook tab:** Free-form text generation
- **Extensions system:** Built-in and user-contributed extensions

## Architecture / Key Modules

```
modules/
├── server.py           # Main entry, Gradio interface creation
├── models.py            # Model loading/unloading (load_model, unload_model_if_idle)
├── loaders.py           # Backend loader selection (llama.cpp, ExLlamaV3, etc.)
├── chat.py              # Chat session management
├── prompts.py           # Prompt formatting (Jinja2 templates)
├── evaluate.py          # Text generation logic
├── training.py          # LoRA fine-tuning
├── LoRA.py              # LoRA application
├── image_models.py      # Multimodal/image model loading
├── extensions.py        # Extension system
├── api/                 # API endpoints (chat, completions, messages)
├── exllamav3.py         # ExLlamaV3 backend
├── llama_cpp_server.py  # llama.cpp server backend
├── tensorrt_llm.py      # TensorRT-LLM backend
├── transformers_loader.py # Transformers backend
├── reasoning.py         # Chain-of-thought / thinking mode
├── tool_parsing.py      # Tool call parsing
├── tool_use.py          # Tool execution
├── ui_*.py              # Gradio UI components (chat, parameters, model menu, etc.)
└── shared.py            # Shared state (model, settings)
```

## Installation Options

1. **Portable builds** (zero setup): Download from releases, unzip and run. GGUF models only.
2. **One-click installer** (Miniforge/Conda): Full feature set including ExLlamaV3, Transformers, training, image generation.
3. **Manual full installation** with conda/python.
4. **Docker:** NVIDIA, AMD, Intel, CPU-only Dockerfiles.

## Notable Command-line Flags

- `--loader`: Choose backend manually (Transformers, llama.cpp, ExLlamav3_HF, ExLlamav3, TensorRT-LLM)
- `--api`, `--public-api`: Enable OpenAI-compatible API
- `--mmproj`: Path to mmproj file for vision models
- `--lora`: Load LoRAs at startup
- `--enable-thinking`, `--reasoning-effort`: Reasoning/thinking mode
- `--extensions`: Load extensions
- `--image-model`: Image generation model selection

## Extensions (built-in)

- `character_bias`, `coqui_tts`, `gallery`, `google_translate`, `long_replies`, `ngrok`, `perplexity_colors`, `sd_api_pictures`, `send_pictures`, `silero_tts`, `superbooga`, `superboogav2`, `whisper_stt`

## Key Design Decisions

- Inspired by AUTOMATIC1111 stable-diffusion-webui
- Modular loader system supporting 5 different backends
- Gradio UI with chat, notebook, training, and image generation tabs
- OpenAI API compatibility enables use as drop-in local API replacement
- Portable builds use GGUF/llama.cpp for broad hardware compatibility
- a16z (Andreessen Horowitz) grant recipient (August 2023)
