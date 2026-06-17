# OfficeCLI - AI-Native Office Suite

> Source: https://github.com/iOfficeAI/OfficeCLI
> Fetched: 2026-04-28

## Overview

**OfficeCLI** is the world's first command-line tool purpose-built for AI agents to read, edit, and automate Microsoft Office documents (Word, Excel, PowerPoint).

> **"Give any AI agent full control over Word, Excel, and PowerPoint -- in one line of code."**

### Key Characteristics
- **Open-source** (Apache 2.0)
- **Single binary** - no dependencies, no .NET runtime required
- **No Office installation needed** - works entirely standalone
- **Cross-platform** - macOS, Linux, Windows
- **AI-native** with JSON output and path-based element access

## Quick Start

### For AI Agents (One-Line Setup)
```bash
curl -fsSL https://officecli.ai/SKILL.md
```
The skill file auto-installs the binary and teaches the agent all commands.

### For Humans
```bash
# One-line install
curl -fsSL https://officecli.ai/install.sh | sh
officecli --version  # verify installation
```

## Installation

### Binary Downloads (GitHub Releases)

| Platform | Binary |
|----------|--------|
| macOS Apple Silicon | `officecli-mac-arm64` |
| macOS Intel | `officecli-mac-x64` |
| Linux x64 | `officecli-linux-x64` |
| Linux ARM64 | `officecli-linux-arm64` |
| Windows x64 | `officecli-win-x64.exe` |
| Windows ARM64 | `officecli-win-arm64.exe` |

### Build from Source
Requires .NET 10 SDK (only for compilation). Output is self-contained; .NET is embedded in the binary.

## Supported Formats & Capabilities

| Format | Read | Modify | Create |
|--------|------|--------|--------|
| Word (.docx) | ✅ | ✅ | ✅ |
| Excel (.xlsx) | ✅ | ✅ | ✅ |
| PowerPoint (.pptx) | ✅ | ✅ | ✅ |

### Word Capabilities
Paragraphs, runs, tables, styles, headers/footers, images (PNG/JPG/GIF/SVG), equations, comments, footnotes, watermarks, bookmarks, TOC, charts, hyperlinks, sections, form fields, content controls (SDT), fields (22 types + MERGEFIELD/REF/PAGEREF/SEQ/STYLEREF/DOCPROPERTY/IF), OLE objects, document properties

### Excel Capabilities
Cells with `$Sheet:A1` addressing, 150+ built-in functions with auto-evaluation, `_xlfn.` auto-prefix for dynamic-array functions, sheets, tables, multi-key sorting, conditional formatting, charts (box-whisker, pareto with auto-sort), pivot tables (multi-field, date grouping, calculated fields), slicers, named ranges, data validation, sparklines, comments, autofilter, shapes, OLE objects, CSV/TSV import

### PowerPoint Capabilities
Slides with header/footer toggles, shapes (pattern fill, blur, hyperlinks), images (4 fill modes: stretch/contain/cover/tile), tables, charts, animations, morph transitions, 3D models (.glb), slide zoom, equations, themes, connectors, video/audio, groups, notes, OLE objects, placeholders

## Three-Layer Architecture

Start simple, go deep when needed:

| Layer | Purpose | Commands |
|-------|---------|----------|
| **L1: Read** | Semantic views | `view` (text, annotated, outline, stats, issues, html) |
| **L2: DOM** | Structured operations | `get`, `query`, `set`, `add`, `remove`, `move`, `swap` |
| **L3: Raw XML** | XPath access (fallback) | `raw`, `raw-set`, `add-part`, `validate` |

## Command Reference

| Command | Description |
|---------|-------------|
| `create` | Create blank .docx, .xlsx, or .pptx |
| `view` | View content (modes: outline, text, annotated, stats, issues, html) |
| `get` | Get element and children (`--depth N`, `--json`) |
| `query` | CSS-like query (`[attr=value]`, `:contains()`, `:has()`) |
| `set` | Modify element properties |
| `add` | Add element (or clone with `--from <path>`) |
| `remove` | Remove an element |
| `move` | Move element (`--to`, `--index`, `--after`, `--before`) |
| `swap` | Swap two elements |
| `validate` | Validate against OpenXML schema |
| `view <file> issues` | Enumerate issues (text overflow, missing alt text, formula errors) |
| `batch` | Multiple operations in one cycle (`--commands`, `--force`) |
| `merge` | Template merge - replace `{{key}}` with JSON data |
| `watch` | Live HTML preview with auto-refresh |
| `mcp` | Start MCP server for AI tool integration |
| `raw` / `raw-set` | View/modify raw XML via XPath |
| `open` / `close` | Resident mode (keep document in memory) |
| `install` | Install binary + skills (`all`, `claude`, `cursor`, etc.) |
| `config` | Get or set configuration |

## AI Integration

### MCP Server
Built-in Model Context Protocol server - exposes all operations as tools over JSON-RPC.

```bash
officecli mcp
```

### Skill Installation
```bash
# For Claude Code
officecli install claude
# For Cursor
officecli install cursor
# For all agents
officecli install all
```

## Performance: Resident Mode

Every command auto-starts a resident on first access (60s idle timeout) — file-lock conflicts are automatically avoided. Explicit `open`/`close` is still recommended for longer sessions (12min idle):

```bash
officecli open report.docx
officecli set report.docx ... # no file I/O overhead
officecli close report.docx
```

## SKILL.md Integration

OfficeCLI provides a SKILL.md at `https://officecli.ai/SKILL.md` for AI agent integration. This allows AI agents like Claude Code to use OfficeCLI with zero configuration.

## License

Apache License 2.0 - Copyright 2026 OfficeCli (https://OfficeCli.AI)
