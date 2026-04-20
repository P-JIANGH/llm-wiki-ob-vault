---
title: UnrealGPT
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, agent, llm, tool, game-engine]
sources: [raw/articles/ai-game-devtools/unrealgpt.md]
---

# UnrealGPT — AI Agent Copilot for Unreal Engine

[[UnrealGPT]] is an **AI-powered editor copilot plugin** for `Unreal Engine 5.6`. It runs as a dockable tab inside the UE editor, talks to OpenAI GPT models via the Responses API, and can **inspect and modify your Unreal project** using Python scripts, scene queries, screenshots, and external tools.

## Overview

- **Type:** Editor + runtime `Unreal Engine` plugin
- **Author:** TREE Industries
- **License:** Apache 2.0
- **Engine:** `Unreal Engine` 5.6
- **Category:** `ai-model` / `agent` / Game Development Tool
- **GitHub:** https://github.com/TREE-Ind/UnrealGPT

## Key Features

### In-Editor Chat
- Dockable `UnrealGPT` tab (`Window → UnrealGPT`)
- `Ctrl+Enter` to send; supports voice input (Whisper) and image attachments

### Scene Understanding
- `Capture Context` button: captures viewport screenshot + JSON scene summary
- `scene_query` tool: search actors by class/name/label/component types
- `GetSelectedActorsSummary` for focused selection summaries

### Action-Based Agent with Python Tooling
- `python_execute` runs Python editor scripts directly in UE
- `reflection_query` inspects `UClass` properties and functions for correct type usage
- Agent is instructed to **change the project for you**, not just give instructions

### Optional: Replicate Content Generation
- `replicate_generate` for images, 3D, audio, music, speech, video via Replicate API
- Python helpers (`unrealgpt_mcp_import.py`) import generated files as `Texture2D` / `StaticMesh` / `SoundWave`

### Safety Guardrails
- Max tool-call iteration limit
- Tool result size limits
- Execution timeout for Python code

## Architecture

### Modules
- `UnrealGPT` — runtime, minimal
- `UnrealGPTEditor` — UI (`SUnrealGPTWidget`), agent client, tools, voice input, settings

### Key Components
- `UnrealGPTAgentClient` — Core agent client, tool definitions, OpenAI Responses API integration
- `UnrealGPTSceneContext` — Scene query and context capture
- `UnrealGPTSseClient` — SSE streaming client for response delivery
- `UnrealGPTVoiceInput` — Whisper transcription integration
- `UnrealGPTComputerUse` — Stubbed-out computer use (disabled for safety)
- `Content/Python/unrealgpt_mcp_import.py` — Asset import helpers

### Default Model
- `gpt-5.1` (Responses API); models with native reasoning (`gpt-5.*`, `o1`, `o3`) auto-receive reasoning configuration

## Tools Reference

| Tool | Purpose |
|------|---------|
| `python_execute` | Run Python in UE editor process |
| `scene_query` | Search actors by class/name/label/component |
| `viewport_screenshot` | Capture editor viewport as PNG |
| `reflection_query` | Inspect UClass schema |
| `file_search` | UE 5.6 Python API vector store |
| `web_search` | Web search via OpenAI Responses |
| `replicate_generate` | Content generation via Replicate |

## Related

- [[ai-game-devtools/unreal-engine-5-llama-lora]] — UE 5.1 + Llama LoRA for local UE5 Q&A
- [[ai-game-devtools/unity-chatgpt]] — Unity + ChatGPT integration (similar pattern, different engine)
- [[ai-game-devtools/llmunity]] — Unity LLM integration with GGUF/llama.cpp
- [[ai-game-devtools/chatgpt-api-unity]] — Unity ChatGPT API client with function calling
