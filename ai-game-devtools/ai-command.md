---
title: AICommand
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, game-engine, unity, llm, open-source]
sources: [raw/articles/ai-game-devtools/ai-command.md]
---

# AICommand

## Overview

**AICommand** (keijiro/AICommand) is a Unity Editor proof-of-concept integration of ChatGPT that allows controlling the Editor using natural language prompts. Users type a task description → AI generates a Unity C# script → script is executed as a MenuItem → temporary file is deleted.

Author keijiro explicitly states this is **not practical** — ChatGPT frequently generates incorrect code that requires multiple retry attempts.

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **Author** | keijiro (Japanese Unity plugin developer) |
| **Repository** | github.com/keijiro/AICommand (cloned via gitcode.com mirror) |
| **License** | MIT (inferred — keijiro's other projects are MIT) |
| **Unity Version** | Unity 2022.2 or later |
| **Model** | GPT-3.5-Turbo (hardcoded) |
| **Entry** | Window > AI Command |
| **Settings** | Edit > Project Settings > AI Command > API Key |

## Architecture

```
Assets/Editor/
├── OpenAI.cs              # Request/Response data structures (JsonUtility)
├── OpenAIUtil.cs          # HTTP POST via UnityWebRequest to api.openai.com
├── AICommandWindow.cs     # EditorWindow UI + Reflection script creation
└── AICommandSettings.cs   # ScriptableSingleton + SettingsProvider for API Key
```

**Execution flow:**
1. User enters natural language prompt (e.g., "Create 100 cubes at random points")
2. `WrapPrompt()` prepends structural constraints (MenuItem format, no GameObject.FindGameObjectsWithTag, etc.)
3. ChatGPT gpt-3.5-turbo returns C# code
4. `ProjectWindowUtil.CreateScriptAssetWithContent` (Reflection, internal API) writes `Assets/AICommandTemp.cs`
5. Assembly Reload triggers `afterAssemblyReload` event
6. `EditorApplication.ExecuteMenuItem("Edit/Do Task")` runs the generated code
7. `AssetDatabase.DeleteAsset()` removes the temp file

## Technical Highlights

- **Reflection hack:** Uses Unity's non-public `ProjectWindowUtil.CreateScriptAssetWithContent` to create script assets programmatically
- **Fake progress bar:** Uses `Thread.Sleep` polling in a tight loop (keijiro comments "Don't try this at home")
- **ScriptableSingleton:** Settings persist via `UserSettings/AICommandSettings.asset`; keijiro warns to exclude this from version control
- **Single-file distribution:** Entire project is just `Assets/Editor/` directory — can be copied into any Unity project

## Why It's Impractical (Author's Assessment)

- GPT-3.5-Turbo has limited knowledge of Unity Editor API nuances
- Generated code often fails to compile or behaves incorrectly
- No retry mechanism — user must manually press Run multiple times
- Single-shot prompt with no conversation context
- No error recovery or code validation pipeline

## Differences from Related Tools

| Tool | Approach | Platform |
|------|----------|----------|
| **AICommand** | Natural language → Unity Editor script execution | Unity Editor |
| **AIShader** (same author) | Natural language → GLSL shader code | Unity Editor |
| **Unity ChatGPT** | Chat interface for game chat/NPC dialogue | Unity Game Runtime |
| **ChatGPTForUnity** | HTTP API wrapper for ChatGPT | Unity Runtime |

## Related

- [[godot-4]] — alternative open-source game engine with native scripting
- [[ai-shader]] — keijiro's GLSL AI generation tool (related series)
- [[agent-loop]] — core AI agent loop architecture pattern
- [[llm-integration]] — common LLM integration patterns
