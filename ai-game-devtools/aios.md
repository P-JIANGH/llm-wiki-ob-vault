---
title: AIOS (AI Agent Operating System)
created: 2026-04-12
updated: 2026-04-12
type: entity
tags: [ai, llm, agent, tool, open-source, game-engine]
sources: [raw/articles/ai-game-devtools/aios.md]
aliases: ["AIOS"]

---

# AIOS (AI Agent Operating System)

## Overview

**AIOS** (agiresearch/AIOS) is an AI Agent Operating System that embeds large language models into the operating system layer. It provides infrastructure-level support for developing and deploying LLM-based AI agents, solving scheduling, context switching, memory management, storage management, and tool management problems at the OS level. Accepted by **COLM 2025**.

Website: https://docs.aios.foundation/
GitHub: https://github.com/agiresearch/AIOS
Discord: https://discord.gg/B2HFxEgTJX

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | Open source |
| **Python** | 3.10 - 3.11 |
| **Papers** | AIOS (COLM 2025), Cerebrum (NAACL 2025), A-MEM (arXiv), LiteCUA (arXiv), LSFS (ICLR 2025) |
| **Components** | AIOS Kernel + AIOS SDK (Cerebrum) |
| **Deployment Modes** | Local Kernel, Remote Kernel, Remote Dev, Personal Remote, Personal Virtual |

## Architecture

AIOS consists of two key components:
- **AIOS Kernel** (this repo): Abstraction layer over OS kernel, managing LLM, memory, storage, and tool resources
- **AIOS SDK (Cerebrum)**: For agent developers and users to build/run agent applications

### Core Modules

```
aios/
├── llm_core/       # LLM adapter (OpenAI, DeepSeek, Gemini, Groq, HF, Ollama, vLLM)
├── memory/        # Agent memory management (A-MEM)
├── storage/       # Persistent storage layer
├── tool/          # Tool management (MCP server, virtual env)
├── scheduler/     # Multi-threaded task scheduler (FIFO, Round-Robin)
├── context/       # Context management
├── syscall/       # System call abstraction
└── config/        # Configuration
```

### Scheduler Design

BaseScheduler uses multi-threaded architecture with separate processors for:
- `process_llm_requests()` — LLM inference requests
- `process_memory_requests()` — Memory/retrieval requests
- `process_storage_requests()` — Storage I/O requests
- `process_tool_requests()` — Tool execution requests

Supports FIFO and Round-Robin scheduling strategies.

### Deployment Modes

| Mode | Description |
|------|-------------|
| Mode 1 | Local Kernel — kernel and agents on same machine |
| Mode 2 | Remote Kernel — agents run on resource-constrained devices (mobile/edge) |
| Mode 2.5 | Remote Dev — develop on machine B, run/test on machine A |
| Mode 3 | Personal Remote — per-user persistent AIOS with cross-device sync |
| Mode 4 | Personal Virtual — virtualized, multiple user kernels on same physical machine |

## Tech Stack

- **Language**: Python 3.10-3.11
- **GPU Support**: CUDA (requirements-cuda.txt)
- **LLM Backends**: OpenAI, Anthropic, DeepSeek, Google Gemini, Groq, HuggingFace, Ollama, vLLM, Novita
- **Agent Frameworks**: OpenAGI, AutoGen, Open-Interpreter, MetaGPT
- **Experimental**: Rust rewrite (aios-rs/)

## Key Features

- **Function Calling**: Native support for open-source LLMs (HuggingFace, vLLM, Ollama)
- **Agentic Memory (A-MEM)**: Long-term memory management for agents
- **Terminal UI**: LLM-based semantic file system (ICLR 2025 paper)
- **Computer-use Agent**: VM Controller + MCP Server for sandboxed computer interaction
- **Diffusion Models as Tools**: HuggingFace integration for image generation tools
- **Rust Rewrite (aios-rs/)**: Experimental performance-focused scaffold

## Game Development Relevance

AIOS can serve as the **agent infrastructure layer** for AI-driven game NPCs and game world simulation:
- Multiple NPCs can be managed as separate agents with independent memory and tool access
- Scheduler handles concurrent NPC "thinking" requests (LLM calls) efficiently
- Remote Kernel mode enables running AI agents on game servers with different hardware
- Tool management integrates external game APIs and generation tools
- Computer-use agent architecture can control game test environments via VM

## Related

- [[ai-command]] — Unity plugin for AI command integration in game engines
- [[autogen]] — Microsoft multi-agent framework supported by AIOS
- `openagi` — OpenAGI agent framework integrated with AIOS
- [[agentgpt]] — browser-based autonomous agent platform (similar paradigm)
