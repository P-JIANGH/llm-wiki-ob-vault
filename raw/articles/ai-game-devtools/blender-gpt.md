# BlenderGPT — Raw Source

**URL:** https://github.com/gd3kr/BlenderGPT
**Captured:** 2026-04-18

## README Summary

BlenderGPT is a Blender add-on that integrates OpenAI's GPT-4/GPT-3.5 into Blender's UI, allowing users to control Blender using natural language commands. Blender can be controlled using Python scripts, and GPT-4 can generate these scripts from simple English.

### Installation
1. Clone/download as ZIP
2. Install via Blender's Add-ons manager
3. Enable "GPT-4 Blender Assistant"
4. Set OpenAI API key in addon preferences

### Usage
- Open sidebar (N key) in 3D View → "GPT-4 Assistant" tab
- Type natural language command (e.g., "create a cube at the origin")
- Click Execute to generate and execute Blender Python code

### Requirements
- Blender 3.1+ (addon supports 2.82+)
- OpenAI API key

## Key Source Files

### `__init__.py` (Main Plugin Entry)
- Plugin name: "GPT-4 Blender Assistant"
- Blender version: 2.82.0+
- Author: Aarya (@gd3kr)
- Version: 2.0.0
- Category: Object
- Location: 3D View > UI > GPT-4 Blender Assistant

**System Prompt** enforces:
- Respond in markdown code blocks only
- Prefer importing entire modules
- No destructive mesh operations
- No cap_ends, no extra setup beyond what's asked
- Python code only, no explanations

**Classes:**
- `GPT4_PT_Panel` — Sidebar panel with chat history, model selector, input field
- `GPT4_OT_Execute` — Sends message to OpenAI, receives code, executes via `exec()`
- `GPT4_OT_ShowCode` — Opens generated code in Blender's Text Editor
- `GPT4_OT_DeleteMessage` — Removes chat history entries
- `GPT4_OT_ClearChat` — Clears all chat history
- `GPT4AddonPreferences` — Stores API key (password field)

### `utilities.py` (Helper Functions)
- `get_api_key()` — Retrieves API key from addon preferences
- `init_props()` / `clear_props()` — Scene property lifecycle (chat history, model selector, input, button state)
- `generate_blender_code()` — Calls OpenAI ChatCompletion API with:
  - System prompt + last 10 messages of chat history
  - Streaming response, max 1500 tokens
  - Extracts code from markdown backticks
  - Strips `python` language tag
- `split_area_to_text_editor()` — Splits current area to show Text Editor

### `requirements.txt`
- `openai==0.27.2` (legacy API, pre-v1 client)

## Architecture Notes
- Uses legacy OpenAI API (v0.27.2, `ChatCompletion.create` with streaming)
- Chat history stored as Blender scene PropertyGroup (persists per session)
- Code execution via Python `exec()` in Blender's runtime
- GPT model selection: GPT-4 or GPT-3.5-Turbo (enum property)
- Safety: system prompt restricts destructive operations, but no sandbox — `exec()` runs with full Blender Python API access
