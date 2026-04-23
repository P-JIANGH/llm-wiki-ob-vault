---
title: AICommand
created: 2026-04-20
updated: 2026-04-23
type: entity
tags: [ai, llm, tool, unity, csharp, automation, open-source]
sources: [raw/articles/ai-game-devtools/aicommand.md]
---

## Overview

**AICommand** is a proof-of-concept Unity Editor plugin that integrates ChatGPT directly into the Unity Editor, enabling natural language control of the editor. Developed by keijiro (Unity Technologies Japan), it generates and executes Unity Editor C# scripts from plain English prompts.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Author | keijiro (Unity Technologies Japan) |
| Platform | Unity Editor 2022.2+ |
| Language | C# |
| License | Unlicense (Public Domain) |
| Backend | OpenAI ChatGPT API |
| Status | Proof-of-concept (author states "definitely not practical") |

## How It Works

1. User enters a natural language prompt in the AI Command window (Window > AI Command)
2. The prompt is wrapped with system instructions instructing the model to generate a Unity Editor script
3. The script is saved to `Assets/AICommandTemp.cs` and triggers an assembly reload
4. After reload, the script executes via the `Edit > Do Task` menu item
5. The temp file is automatically deleted

## Core Architecture

| Component | File | Purpose |
|-----------|------|---------|
| API Models | `OpenAI.cs` | Request/Response/Message data structures for OpenAI Chat API |
| API Client | `OpenAIUtil.cs` | UnityWebRequest wrapper for API calls |
| Editor Window | `AICommandWindow.cs` | Main UI with prompt input, Run button, and execution lifecycle |
| Settings | `AICommandSettings.cs` | ScriptableSingleton for API key storage + Project Settings integration |

## Key Technical Details

**Prompt Engineering:**
The system wraps user prompts with strict instructions:
- Must generate a Unity Editor script
- Must expose functionality as `Edit > Do Task` menu item
- No editor window — executes immediately on invocation
- Must find game objects manually (no selected object assumption)
- Return only script body, no explanations

**Reflection Usage:**
Uses `BindingFlags.Static | BindingFlags.NonPublic` to invoke internal Unity method `ProjectWindowUtil.CreateScriptAssetWithContent`.

**Security:**
API key stored in `UserSettings/AICommandSettings.asset` — must be excluded from version control.

## Limitations

- **Experimental/PoC only** — author explicitly states it's not practical
- ChatGPT frequently generates incorrect code
- May require multiple attempts (repeatedly clicking "Run")
- Common failure mode: NullReferenceException when OpenAI trial expires

## Comparison

| Tool | Scope | Approach |
|------|-------|----------|
| AICommand | Unity Editor | Generate & execute C# editor scripts |
| [[ai-game-devtools/ai-shader]] | Unity | Generate GLSL shaders from natural language |
| [[ai-game-devtools/blender-gpt]] | Blender | Generate Python scripts for Blender |
| [[ai-game-devtools/open-interpreter]] | System-wide | General code execution across environments |
| [[ai-game-devtools/unity-chatgpt]] | Unity | ChatGPT API wrapper for runtime NPC dialogue |

## Game Development Applications

- Rapid editor automation prototyping
- Batch scene modifications via natural language
- Experimental AI-assisted content pipelines
- Educational tool for learning Unity Editor scripting

## Installation

No package manager support. Copy `Assets/Editor/` directory to your Unity project:
1. Clone or download the repository
2. Copy `Assets/Editor/` to your project
3. Set OpenAI API key in Edit > Project Settings > AI Command
4. Open Window > AI Command

## References

- GitHub: https://github.com/keijiro/AICommand
- Related: [[ai-game-devtools/ai-shader]] (same author's shader generation PoC)
- Blog: https://github.com/keijiro (Unity Japan creative technologist)
