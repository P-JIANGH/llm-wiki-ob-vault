# BlenderMCP — Raw Source

**URL:** https://github.com/ahujasid/blender-mcp
**Captured:** 2026-04-18
**Source:** web_extract (GitHub/gitcode/gitee clone all failed)

## README Summary

BlenderMCP connects Blender to Claude AI via the Model Context Protocol (MCP) for prompt-assisted 3D modeling, scene creation, and manipulation.

### Stats
- ⭐ 18k Stars | 🍴 1.8k Forks | 📜 139 Commits
- Python 100%
- License: MIT
- Author: Siddharth

### Architecture
Two-way socket-based communication between Claude and Blender:
- Object Manipulation: Create, modify, and delete 3D objects
- Material Control: Apply and modify materials/colors
- Scene Inspection: Retrieve detailed scene/object metadata
- Code Execution: Run arbitrary Python code directly in Blender

Components:
1. `addon.py` → Blender addon that runs a local socket server
2. `src/blender_mcp/server.py` → Python MCP server implementation

### Protocol
- JSON over TCP sockets
- Commands: `{"type": "...", "params": {...}}`
- Responses: `{"status": "...", "result": "..."}` or `{"message": "..."}`
- Environment Variables: `BLENDER_HOST` (default "localhost"), `BLENDER_PORT` (default 9876)

### Installation
- Requirements: Blender 3.0+, Python 3.10+, `uv` package manager
- Addon: Download `addon.py` → Blender > Edit > Preferences > Add-ons > Install & enable
- Claude Desktop config: `"mcpServers": { "blender": { "command": "uvx", "args": ["blender-mcp"] } }`

### Version 1.5.5 Highlights
- Added Hunyuan3D & Hyper3D Rodin support
- Viewport screenshots for better scene understanding
- Search & download Sketchfab models
- Poly Haven API integration
- Run Blender MCP on a remote host
- Anonymous telemetry collection

### Security Note
- `execute_blender_code` runs arbitrary Python. Always save work first.
- Telemetry can be disabled via `DISABLE_TELEMETRY=true`

### Key Files
- `addon.py` — Blender addon entry point, socket server
- `src/blender_mcp/server.py` — MCP server implementation
- `src/blender_mcp/` — Server modules for object manipulation, materials, scene inspection
