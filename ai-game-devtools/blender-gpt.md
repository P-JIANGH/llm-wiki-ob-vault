---
title: BlenderGPT
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, blender, code-generation, open-source, ai, llm]
sources: [raw/articles/ai-game-devtools/blender-gpt.md]
---

# BlenderGPT

**GitHub:** [gd3kr/BlenderGPT](https://github.com/gd3kr/BlenderGPT)
**Author:** Aarya (@gd3kr)
**Version:** 2.0.0
**License:** MIT (per LICENSE.md)

## Overview

BlenderGPT is a **Blender add-on** that integrates OpenAI's GPT-4/GPT-3.5 directly into Blender's UI. Users type natural language commands (e.g., "create 10 cubes in random locations") and the plugin generates and executes Blender Python code automatically, enabling non-programmers to control Blender through conversation.

## Key Features

- **Natural Language → Blender Python:** Describe what you want in plain English, get executable code
- **Chat Interface:** Sidebar panel with full chat history, model selector, and execute button
- **Streaming Generation:** Real-time token streaming from OpenAI API with live console output
- **Code Viewer:** Generated code opens in Blender's Text Editor for inspection and manual edits
- **Model Selection:** Choose between GPT-4 (more capable) or GPT-3.5-Turbo (faster, cheaper)
- **Chat History Context:** Last 10 messages sent as conversation context for follow-up commands

## Technical Architecture

| Component | Detail |
|-----------|--------|
| **Platform** | Blender 2.82.0+ (tested on 3.1+) |
| **Language** | Python (Blender addon) |
| **AI Backend** | OpenAI ChatCompletion API (legacy v0.27.2) |
| **Execution** | Python `exec()` in Blender's runtime |
| **State** | Scene PropertyGroup (chat history, model, input) |
| **Safety** | System prompt restrictions only — no sandbox |

### System Prompt Constraints

The system prompt enforces strict code-only responses:
- Markdown code blocks only, no explanations
- Import entire modules, not partial
- No destructive mesh operations
- No extra setup beyond what's asked (no cameras, render settings, etc.)

## Security Note

The plugin executes AI-generated code via Python `exec()` with full Blender Python API access. While the system prompt attempts to restrict destructive operations, there is **no sandbox** — generated code runs with the same permissions as any Blender script. Users should review generated code before execution.

## Comparison with Related Tools

| Tool | Approach | Difference |
|------|----------|------------|
| [[ai-shader]] | GPT → Unity GLSL shaders | Targets Unity shaders, not Blender scripting |
| [[dream-textures]] | Stable Diffusion in Blender | Generates textures via diffusion, not code |
| [[blender-controlnet]] | ControlNet + Blender pipeline | Focuses on image generation pipeline control |
| [[ai-command]] | GPT → Unity C# commands | Same author (keijiro), targets Unity C# |

## Use Cases in Game Development

1. **Rapid Prototyping** — Generate scene layouts, object arrays, test geometry without writing code
2. **Learning Blender API** — See how natural language maps to bpy calls
3. **Procedural Content** — Create parameterized generators via conversation
4. **Pipeline Automation** — Script repetitive tasks through natural language

## Dependencies

- `openai==0.27.2` (legacy API — uses `ChatCompletion.create`, not the v1+ client)
- OpenAI API key (configured in addon preferences or `OPENAI_API_KEY` env var)
