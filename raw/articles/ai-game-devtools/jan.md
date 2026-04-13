# Jan — Open-source ChatGPT Replacement

## Source
- URL: https://github.com/janhq/jan
- License: Apache 2.0
- Date: 2026-04-14

## Overview
Jan is a desktop application that runs local LLMs 100% offline, providing full control and privacy. Think ChatGPT but private, local, and under complete user control.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Web App (Frontend)                     │
│                      (web-app/)                          │
│  React UI, Chat Interface, Settings Pages, Model Hub     │
└────────────┬─────────────────────────────┬───────────────┘
             │                             │
             ▼                             ▼
  ┌──────────────────────┐      ┌──────────────────────┐
  │     Core SDK         │      │     Extensions       │
  │      (core/)         │      │   (extensions/)      │
  │ • TypeScript APIs    │◄─────│ • Assistant Mgmt     │
  │ • Extension System   │ uses │ • Conversations      │
  │ • Event Bus          │      │ • Downloads          │
  │ • Type Definitions   │      │ • LlamaCPP           │
  └──────────┬───────────┘      └───────────┬──────────┘
             │                              │
             └──────────────┼───────────────┘
                            │
                        Tauri IPC
                        (invoke commands)
                            │
                            ▼
┌───────────────────────────────────────────────────────────┐
│                   Tauri Backend (Rust)                    │
│                      (src-tauri/)                         │
│  Window Mgmt, File System, Process Control, IPC Commands   │
└───────────────────────────┬───────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────┐
│                   Tauri Plugins (Rust)                    │
│                   (src-tauri/plugins/)                     │
│     ┌──────────────────┐        ┌──────────────────┐      │
│     │  Hardware Plugin │        │  LlamaCpp Plugin │      │
│     │  CPU/GPU/Memory  │        │  Process/Model   │      │
│     └──────────────────┘        └──────────────────┘      │
└───────────────────────────────────────────────────────────┘
```

## Key Components

### Core SDK (`/core`)
- TypeScript APIs for extensions and web app
- Extension registration system (`BaseExtension`)
- Event Bus for inter-component communication
- Type definitions and data models

### Extensions (`/extensions`)
- `assistant-extension`: Assistant CRUD operations
- `conversational-extension`: Message handling, conversation state
- `download-extension`: Model downloads with progress tracking
- `llamacpp-extension`: Local model inference via llama.cpp
- `foundation-models-extension`: Model hub integration
- `mlx-extension`: Apple Silicon MLX support
- `rag-extension`: Retrieval-Augmented Generation
- `vector-db-extension`: Vector database integration

### Tauri Backend (`/src-tauri`)
- Rust-based native integration
- Core modules: app, downloads, filesystem, mcp, server, system, threads
- Plugin system for hardware acceleration

### Web App (`/web-app`)
- Next.js documentation site
- Tailwind CSS styling

## Features
- **Local AI Models**: Download and run LLMs (Llama, Gemma, Qwen, GPT-oss etc.) from HuggingFace
- **Cloud Integration**: Connect to GPT (OpenAI), Claude (Anthropic), Mistral, Groq, MiniMax
- **Custom Assistants**: Create specialized AI assistants
- **OpenAI-Compatible API**: Local server at `localhost:1337`
- **Model Context Protocol (MCP)**: Agentic capabilities integration
- **Privacy First**: Everything runs locally when desired

## Build Requirements
- Node.js ≥ 20.0.0
- Yarn ≥ 4.5.3
- Make ≥ 3.81
- Rust (for Tauri)
- macOS Apple Silicon: MetalToolchain

## Distribution
- Windows, macOS, Linux (deb, AppImage, Arm64)
- Microsoft Store, Flathub
- Download from jan.ai or GitHub Releases

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Tauri (Rust)
- LLM Runtime: llama.cpp, MLX (Apple Silicon)
- Build: Yarn, Rolldown
