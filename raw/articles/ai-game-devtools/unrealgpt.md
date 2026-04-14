# UnrealGPT — AI Agent Copilot for Unreal Engine 5.6

> **Source:** https://github.com/TREE-Ind/UnrealGPT
> **Captured:** 2026-04-14

---

## Overview

UnrealGPT is an **AI-powered editor copilot plugin** for Unreal Engine 5.6. It runs as a dockable tab inside the UE editor, communicates with OpenAI's GPT models via the Responses API, and can inspect and modify your Unreal project using Python scripts, scene queries, viewport screenshots, and external tools.

- **Engine:** Unreal Engine 5.6
- **Type:** Editor + runtime plugin (`UnrealGPTEditor`, `UnrealGPT`)
- **Category:** AI Agent / Game Development Tool
- **License:** Apache 2.0
- **Author:** TREE Industries

---

## Key Features

### In-Editor Chat Assistant
- Dockable `UnrealGPT` tab under `Window → UnrealGPT`
- `Ctrl+Enter` to send messages

### Scene Understanding & Context Capture
- `Capture Context` button: captures viewport screenshot + JSON scene summary of actors/components
- `scene_query` tool: search actors by class/name/label/component types
- `GetSelectedActorsSummary`: focused summaries of current selection

### Action-Based Agent with Python Tooling
- `python_execute` tool runs Python editor scripts directly in UE
- Built-in `reflection_query` tool to inspect `UClass` properties and functions
- JSON `result` contract: `status`, `message`, rich `details`

### Documentation & Web Tools
- `file_search` tool against a UE 5.6 Python API vector store (OpenAI `file_search`)
- `web_search` tool to query web docs (OpenAI Responses tools)

### Viewport Screenshots & Visual Feedback
- `viewport_screenshot` tool: captures active editor viewport as PNG
- Screenshot shown inline in chat history

### Voice Input (Whisper)
- Press microphone button → records → sends to OpenAI Whisper (`whisper-1`)
- Transcription inserted into chat input for review before sending

### Replicate Content Generation (Optional)
- `replicate_generate` tool for images, 3D, audio, music, speech, video
- Python helpers (`unrealgpt_mcp_import.py`) to import generated files as `Texture2D`, `StaticMesh`, `SoundWave`

### Safety & Guardrails
- Max tool-call iteration count
- Tool result size limits
- Execution timeout for Python code

---

## Architecture

### Modules
- `UnrealGPT` — runtime, minimal skeleton
- `UnrealGPTEditor` — UI, agent client, tools, voice input, settings

### Key Source Files
- `UnrealGPTAgentClient.cpp/h` — Core agent client, tool definitions, request/response handling
- `UnrealGPTSceneContext.cpp/h` — Scene query and context capture
- `UnrealGPTWidget.cpp/h` — SLATE-based chat UI
- `UnrealGPTSettings.cpp/h` — Project settings for API key, model, tools
- `UnrealGPTSseClient.cpp/h` — SSE client for streaming responses
- `UnrealGPTVoiceInput.cpp/h` — Whisper audio transcription
- `UnrealGPTComputerUse.cpp/h` — Stubbed-out computer use tool (disabled for safety)
- `Content/Python/unrealgpt_mcp_import.py` — Python helpers to import generated files as UE assets

### Default Model
- `gpt-5.1` (default)
- Models with native reasoning (`gpt-5.*`, `o1`, `o3`) receive additional reasoning configuration automatically

---

## Configuration (Project Settings → Plugins → UnrealGPT)

- **API:** Base URL override, API endpoint (`https://api.openai.com/v1/responses`), API key
- **Model:** Default model selection
- **Tools:** Toggle Python execution, viewport screenshot, scene summary
- **Replicate:** Optional — enable + API token + per-type model IDs (image/3D/SFX/music/speech/video)
- **Safety:** Execution timeout, max context tokens
- **Context:** Scene summary page size

---

## Dependencies

- UE 5.6.0
- Python Editor Script Plugin (must be enabled)
- OpenAI API key with Responses API + Whisper access
- Optional: Replicate account + API token for content generation

---

## Tools Summary

| Tool | Purpose |
|------|---------|
| `python_execute` | Run Python inside UE editor process |
| `scene_query` | Search actors by class/name/label/component |
| `viewport_screenshot` | Capture editor viewport as PNG |
| `reflection_query` | Inspect UClass schema (properties/functions) |
| `file_search` | Query UE 5.6 Python API vector store |
| `web_search` | Web search via OpenAI Responses |
| `replicate_generate` | Generate images/3D/audio/video via Replicate |
