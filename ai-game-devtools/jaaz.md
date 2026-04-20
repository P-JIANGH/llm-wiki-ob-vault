---
title: Jaaz
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [agent, tool, llm, multimodal, open-source, image-generation, video-generation]
sources: [raw/articles/ai-game-devtools/jaaz.md]
---

# Jaaz

Open-source multimodal canvas creative agent — an open-source alternative to `Canva` and [[Manus]] focused on privacy and local deployment. Provides an infinite canvas for visual storyboarding combined with AI agents that generate images and videos from natural language.

## Overview

Jaaz is positioned as the world's first open-source multimodal canvas creative agent. It targets content creators who want Canva-like functionality with full privacy control and local execution capability. The project supports both cloud API providers (GPT-4o, Midjourney, VEO3, Kling, Seedance, Flux) and local inference via Ollama + ComfyUI.

## Key Features

| Feature | Description |
|---------|-------------|
| **One-Prompt Generation** | Image/video from text prompts; GPT-4o, Midjourney, VEO3, Kling, Seedance, Flux |
| **Magic Canvas** | Prompt-free creation via sketching — AI interprets drawings and generates instantly |
| **Infinite Canvas** | Unlimited visual storyboarding with real-time collaboration |
| **AI Agent System** | Chat-driven object insertion, style transfer, logic control; multi-character coherence |
| **Local Deployment** | Fully offline or hybrid (Ollama + APIs); Windows & macOS |
| **Privacy-First** | Local-first, no data leaves device, AGPL open-source |

## Architecture

### Frontend
- **Framework**: React 19 + TypeScript + Vite + Tailwind CSS 4
- **Canvas**: [tldraw](https://github.com/tldraw/tldraw) (infinite canvas)
- **State**: Zustand + TanStack Query
- **Real-time**: Socket.io-client

### Backend
- **Framework**: Python 3.12+ / FastAPI + Uvicorn
- **Agent Orchestration**: LangGraph 0.4.8 + LangChain
- **LLM Integration**: LangChain-Ollama + LangChain-OpenAI
- **Real-time**: python-socketio

### Provider Integrations
**Image**: Jaaz API, ComfyUI, OpenAI (DALL-E), Replicate, Volces, Wavespeed
**Video**: Volces, Video base provider
**Tool Scripts**: generate_image_by_flux_*, generate_video_by_kling_*, generate_video_by_hailuo_02_*, etc.

## Technology Stack

- **Agent Framework**: LangGraph (stateful, multi-agent orchestration) — cf. [[langchain]] for broader ecosystem
- **Local LLM**: Ollama integration via LangChain-Ollama
- **Canvas**: tldraw — open-source infinite canvas
- **Image Generation**: Flux, Midjourney, DALL-E, ComfyUI (local)
- **Video Generation**: Kling, VEO3, Seedance, Hailuo

## Comparison with Similar Tools

| Dimension | Jaaz | `Canva` | [[Manus]] |
|-----------|------|-----------|-----------|
| License | AGPL (open-source) | Proprietary | Proprietary |
| Local部署 | ✅ Full offline | ❌ Cloud only | ❌ Cloud only |
| Multimodal Canvas | ✅ Infinite canvas | ✅ Limited | ❌ |
| Agent Orchestration | LangGraph-based | ❌ | ✅ |
| Unity/Game Engine | Via ComfyUI pipeline | ❌ | ❌ |

## License

AGPL v3 (enterprise cloud edition with commercial licensing available)

## Links

- Website: https://jaaz.app
- GitHub: https://github.com/11cafe/jaaz
- Discord: https://discord.gg/dS7kuT66wc
