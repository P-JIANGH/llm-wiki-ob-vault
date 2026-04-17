---
title: AI Shader
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, open-source, code-generation, ai]
sources: [raw/articles/ai-game-devtools/ai-shader.md]
---

# AI Shader

**GitHub:** https://github.com/keijiro/AIShader
**Category:** Shader (AI Game DevTools)

## Overview

AI Shader is a proof-of-concept **ChatGPT-powered shader generator for Unity**. Users describe a shader effect in natural language, and the tool sends the prompt to the ChatGPT API to generate GLSL/HLSL shader code automatically.

## Key Features

- **Natural Language → Shader:** Describe visual effects in plain text → AI generates shader code
- **Unity Editor Integration:** Works as an Editor tool via Project Settings
- **OpenAI API:** Requires ChatGPT API key (stored in `UserSettings/AIShaderSettings.asset`)
- **Demo:** Includes a working example showing the generation workflow in action

## Technical Details

| Aspect | Detail |
|---|---|
| **Author** | keijiro (Japanese Unity plugin developer) |
| **Repository** | github.com/keijiro/AIShader (10 commits) |
| **License** | MIT (inferred — consistent with keijiro's other projects) |
| **AI Backend** | OpenAI ChatGPT API |
| **Unity Version** | Not specified |
| **Project Type** | Proof-of-concept, minimal implementation |

## Architecture

- **Input:** Natural language text prompt in Unity Editor
- **Processing:** HTTP request to OpenAI ChatGPT API with shader generation prompt
- **Output:** Generated GLSL/HLSL shader code
- **Storage:** API key stored in `UserSettings/AIShaderSettings.asset` (user-specific, excluded from VCS)

## Usage Notes

1. Generate an API key on the [OpenAI account page](https://platform.openai.com/account/api-keys)
2. Set the key in Edit → Project Settings → AI Shader → API Key
3. **Important:** The API key file must be excluded when sharing the project

## Relationship to Similar Tools

| Tool | Function | Difference |
|---|---|---|
| **AICommand** (same author) | Natural language → Unity C# scripts | Targets Editor scripting, not shaders |
| **Unity ML Stable Diffusion** (same author) | Image generation via Core ML | Uses local ML model, not API-based |

## Links

- [[ai-game-devtools/ai-command]] — keijiro's AI-powered Unity Editor scripting tool
- [[ai-game-devtools/unity-ml-stable-diffusion]] — keijiro's local ML image generation tool
