---
title: chatGPT-maya
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, code-generation, open-source, ai, python]
sources: [raw/articles/ai-game-devtools/chatgpt-maya.md]
---

# chatGPT-maya

**GitHub:** [LouisRossouw/chatGPT-maya](https://github.com/LouisRossouw/chatGPT-maya)
**License:** Not specified
**Author:** Louis Rossouw (www.LouisRossouw.com)

## Overview

A simple Maya plugin that uses OpenAI ChatGPT (text-davinci-003) to generate Maya Python code from natural language prompts, then executes it directly in Maya via `exec()`. Designed for simple automation tasks — the author notes that complicated requests don't work well, but breaking down steps logically produces usable results.

## Key Features

- **Natural language → Maya Python**: Prefix prompts with "write maya python code with no instructions that: " and get executable code
- **Three actions**: Run (direct exec), Show Script (display in UI), Save Script (write to `MAYA_SCRIPT_PATH`)
- **Maya native UI**: Built entirely with `maya.cmds` — text field input, progress bar, 3-button layout
- **API key via env var**: Reads `OPENAI_API_KEY` from environment
- **Code persistence**: Save generated scripts to `maya_ai_gengen.py` for reuse

## Architecture

| Component | Description |
|-----------|-------------|
| `ChatChatAI` class | Single class encapsulating UI + OpenAI API calls |
| `return_openai()` | Calls `openai.Completion.create()` (legacy API) |
| `push_button_run()` | Executes response via Python `exec()` |
| `main_ui()` | Maya cmds UI: input field, progress bar, Run/Show/Save buttons |

**Dependencies:** `openai` Python package (installed via `mayapy -m pip install openai`)

## Technical Notes

- Uses **text-davinci-003** engine (GPT-3 era, deprecated by OpenAI)
- No conversation history — each request is independent
- `exec(response)` means generated code runs with full Maya Python permissions — security consideration
- `os.startfile()` for directory opening is Windows-only
- No error handling for API failures or malformed code responses
- No code validation before execution

## Comparison with Similar Tools

| Tool | Target DCC | Approach | Modernity |
|------|-----------|----------|-----------|
| **chatGPT-maya** | Maya | Direct `exec()` of GPT-3 output | Legacy (text-davinci-003) |
| [[ai-game-devtools/blender-gpt]] | Blender | GPT-4 → Python code via sidebar UI | More modern API |
| [[ai-game-devtools/blender-mcp]] | Blender | MCP protocol + Claude external agent | Most modern (MCP) |

chatGPT-maya is the Maya equivalent of [[ai-game-devtools/blender-gpt]] — both use natural language to generate DCC automation scripts. However, chatGPT-maya uses the deprecated text-davinci-003 model and lacks modern features like conversation history or code validation.
