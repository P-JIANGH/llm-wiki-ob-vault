---
title: BlenderMCP
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, blender, open-source, ai, agent, code-generation]
sources: [raw/articles/ai-game-devtools/blender-mcp.md]
---

# BlenderMCP

**GitHub:** [ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp)
**Author:** Siddharth
**Version:** 1.5.5
**License:** MIT
**Stars:** ~18k | Forks: ~1.8k

## Overview

BlenderMCP is a **Blender add-on + MCP server** that connects Blender to Claude AI via the Model Context Protocol (MCP). Users interact with Blender through natural language prompts in Claude (Desktop, Code CLI, or Cursor), enabling AI-assisted 3D modeling, scene creation, and manipulation without writing code directly.

## Key Features

- **MCP Integration:** Uses Model Context Protocol — Claude acts as the AI brain, Blender as the execution environment
- **Two-Way Socket Communication:** JSON over TCP between the MCP server and Blender addon
- **Object Manipulation:** Create, modify, delete 3D objects via prompts
- **Material Control:** Apply and modify materials/colors through conversation
- **Scene Inspection:** Retrieve detailed scene/object metadata for AI context
- **Arbitrary Code Execution:** Can run any Python code in Blender (with security warnings)
- **Asset Integration:** Poly Haven API (models/textures/HDRI), Sketchfab search & download
- **AI 3D Generation:** Hyper3D Rodin & Hunyuan3D integration for AI-generated 3D models
- **Remote Host Support:** Can run Blender MCP on a remote machine
- **Viewport Screenshots:** Captures viewport for better AI scene understanding

## Technical Architecture

| Component | Detail |
|-----------|--------|
| **Platform** | Blender 3.0+ |
| **Language** | Python 100% |
| **AI Integration** | Model Context Protocol (MCP) — Claude |
| **Communication** | JSON over TCP sockets |
| **Package Manager** | `uv` (astral.sh) |
| **Server** | `src/blender_mcp/server.py` — MCP server |
| **Addon** | `addon.py` — Blender addon, local socket server |

### Protocol Details

- Commands: `{"type": "...", "params": {...}}`
- Responses: `{"status": "...", "result": "..."}` or `{"message": "..."}`
- Env vars: `BLENDER_HOST` (default "localhost"), `BLENDER_PORT` (default 9876)

### Integration Setup

**Claude Desktop** (`claude_desktop_config.json`):
```json
"mcpServers": {
  "blender": {
    "command": "uvx",
    "args": ["blender-mcp"]
  }
}
```

**Claude Code CLI:**
```bash
claude mcp add blender uvx blender-mcp
```

## Security Considerations

The `execute_blender_code` tool runs **arbitrary Python** in Blender. Users should always save work before using. Telemetry is anonymous and can be disabled via `DISABLE_TELEMETRY=true` env var.

## Comparison with Related Tools

| Tool | Approach | Difference |
|------|----------|------------|
| [[blender-gpt]] | GPT-4 → Blender Python code (chat UI in Blender) | Direct GPT API in Blender sidebar; BlenderMCP uses MCP + Claude externally |
| [[blender-controlnet]] | ControlNet + Blender image pipeline | Focuses on image generation control, not 3D scene manipulation |
| [[ai-command]] | GPT → Unity C# commands | Same concept but for Unity C#, not Blender Python |

## Use Cases in Game Development

1. **Rapid Scene Prototyping** — Describe a scene layout in natural language, get it built in Blender
2. **AI-Assisted Modeling** — Generate 3D models via Hyper3D/Hunyuan3D integration
3. **Asset Management** — Search and download Poly Haven/Sketchfab assets through prompts
4. **Iterative Design** — Conversation-driven refinement of 3D scenes and objects
5. **Batch Operations** — Break complex tasks into smaller MCP tool calls for reliable execution
