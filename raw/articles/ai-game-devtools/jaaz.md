# Jaaz — Open Source Multimodal Canvas Creative Agent

> Source: https://github.com/11cafe/jaaz
> Cloned: 2026-04-16
> License: AGPL

## Overview

Jaaz is the world's first open-source multimodal canvas creative agent — an open-source alternative to Canva and Manus with a focus on privacy and local deployment. It provides an infinite canvas for visual storyboarding combined with AI agents that can generate images and videos from natural language.

## Key Features

- **One-Prompt Image & Video Generation**: GPT-4o, Midjourney, VEO3, Kling, Seedance, Flux
- **Magic Canvas & Magic Video**: Prompt-free creation via sketching and free combination — AI understands and generates instantly
- **Infinite Canvas & Visual Storyboarding**: Unlimited canvas for scene planning, layout linking, real-time collaboration
- **Smart AI Agent System**: Chat to insert objects, transfer styles, control logic; works with local (ComfyUI) & cloud models; maintains multi-character coherence
- **Flexible Deployment**: Fully offline or hybrid (Ollama + APIs); built-in library for media & prompts; Windows & macOS
- **Privacy-First**: Local-first, no data leaves device, open-source, no tracking

## Architecture

### Frontend (React + TypeScript)
- React 19 + TypeScript + Vite + Tailwind CSS 4
- tldraw (infinite canvas)
- Radix UI components
- Zustand (state management)
- TanStack Query (async state)
- Socket.io-client (real-time)

### Backend (Python + FastAPI)
- FastAPI + Uvicorn
- LangGraph + LangChain (agent orchestration)
- LangChain-Ollama + LangChain-OpenAI
- WebSocket support via python-socketio
- SQLite (aiosqlite) for persistence

### Provider Integrations
**Image Providers**: Jaaz API, ComfyUI, OpenAI (DALL-E), Replicate, Volces, Wavespeed
**Video Providers**: Volces, Video base provider
**Tools**: generate_image_by_flux_*, generate_video_by_kling_*, generate_video_by_hailuo_02_*, etc.
**Utils**: ComfyUI execution, image generation core, canvas utilities

## File Structure

```
jaaz/
├── react/              # Frontend (React 19 + TypeScript + Vite)
│   └── package.json     # @jaaz/agent-ui, tldraw, radix-ui, zustand, etc.
├── server/             # Backend (Python + FastAPI)
│   ├── main.py          # FastAPI entry point
│   ├── routers/         # API routes (canvas, tool_confirmation, comfyui_execution)
│   ├── tools/           # Image/video generation tools
│   │   ├── image_providers/  # Per-provider implementations
│   │   ├── video_providers/   # Video provider implementations
│   │   └── video_generation/  # Video generation core
│   └── utils/          # Canvas, HTTP client utilities
├── electron/           # Electron desktop wrapper
└── scripts/            # Build/deployment scripts
```

## Dependencies (Key)

- `langgraph==0.4.8` — Agent orchestration
- `langchain-ollama==0.3.3` — Local LLM integration
- `langchain-openai==0.3.21` — OpenAI API integration
- `openai-agents` — OpenAI agent SDK
- `tldraw` — Infinite canvas
- `socket.io-client` — Real-time communication

## License

AGPL (with enterprise cloud edition available for commercial licensing)

## Links

- Website: https://jaaz.app
- GitHub: https://github.com/11cafe/jaaz
- Discord: https://discord.gg/dS7kuT66wc
