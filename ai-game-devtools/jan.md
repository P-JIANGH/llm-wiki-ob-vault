---
title: Jan — Open-source ChatGPT Replacement
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, desktop-app, open-source, privacy, tauri]
sources: [raw/articles/ai-game-devtools/jan.md]
---

# Jan — Open-source ChatGPT Replacement

## Overview

Jan is a **desktop application that runs local LLMs 100% offline**, providing full control and privacy. Think ChatGPT but private, local, and under complete user control. It supports both local models (via llama.cpp and MLX for Apple Silicon) and cloud models (OpenAI, Anthropic Claude, Mistral, Groq, MiniMax).

## Key Facts

| | |
|---|---|
| **License** | Apache 2.0 |
| **Language** | TypeScript (frontend/core) + Rust (backend) |
| **Framework** | Tauri (Electron alternative) |
| **LLM Runtime** | llama.cpp, MLX (Apple Silicon) |
| **Download** | [jan.ai](https://jan.ai) / GitHub Releases |
| **Platforms** | Windows, macOS, Linux (deb, AppImage, Arm64) |

## Architecture

```
Web App (React/Tailwind)
    ├── Core SDK (TypeScript APIs, Extension System, Event Bus)
    ├── Extensions (assistant, conversation, download, llamacpp, mlx, rag, vector-db)
    └── Tauri IPC (invoke commands)
            └── Tauri Backend (Rust)
                    ├── src-tauri/core: app, downloads, filesystem, mcp, server, system, threads
                    └── src-tauri/plugins: hardware, llamacpp
```

## Features

- **Local AI Models**: Download and run LLMs (Llama, Gemma, Qwen, GPT-oss) from HuggingFace
- **Cloud Integration**: OpenAI GPT, Anthropic Claude, Mistral, Groq, MiniMax
- **Custom Assistants**: Create specialized AI assistants
- **OpenAI-Compatible API**: Local server at `localhost:1337`
- **Model Context Protocol (MCP)**: Agentic capabilities
- **Privacy First**: Everything runs locally

## Extension System

Jan has a modular extension system (`extensions/`):

| Extension | Purpose |
|---|---|
| `assistant-extension` | Assistant CRUD |
| `conversational-extension` | Message/thread handling |
| `download-extension` | Model downloads with progress |
| `llamacpp-extension` | Local inference via llama.cpp |
| `mlx-extension` | Apple Silicon MLX support |
| `rag-extension` | RAG capabilities |
| `vector-db-extension` | Vector DB integration |
| `foundation-models-extension` | Model hub |

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Desktop Framework**: Tauri (Rust)
- **LLM Inference**: llama.cpp (CPU/GPU), MLX (Apple Silicon)
- **Build**: Yarn 4.5.3, Rolldown, Make

## Related Tools

- [[gpt4all]] — Nomic's local LLM platform (similar concept, different implementation)
- `ai-game-devtools/llamacpp-extension` — Llama.cpp integration in Jan
