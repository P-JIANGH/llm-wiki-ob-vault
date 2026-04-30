---
title: OfficeCLI
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, cli, office]
sources: [raw/articles/officecli-2026.md]
---

# OfficeCLI

## Overview

第一个命令行工具，专为 AI agent 读写和自动化 Microsoft Office 文档（Word、Excel、PowerPoint）。

**GitHub:** https://github.com/iOfficeAI/OfficeCLI
**License:** Apache 2.0
**Platform:** macOS, Linux, Windows (no .NET runtime needed)

## Key Features

- 单文件 binary，无依赖
- 无需安装 Office
- 跨平台
- AI-native JSON 输出
- 内置 MCP server

## Three-Layer Architecture

| Layer | Purpose | Commands |
|-------|---------|----------|
| **L1: Read** | Semantic views | `view` (text, annotated, outline, stats, issues, html) |
| **L2: DOM** | Structured operations | `get`, `query`, `set`, `add`, `remove`, `move`, `swap` |
| **L3: Raw XML** | XPath access (fallback) | `raw`, `raw-set`, `add-part`, `validate` |

## Installation

```bash
curl -fsSL https://officecli.ai/install.sh | sh
```

## AI Integration

```bash
# MCP server for AI tool integration
officecli mcp

# Install skill for Claude Code
officecli install claude
```

## Related

- [[nanobot]] — 可集成 OfficeCLI 的 agent 框架
- [[opencode]] — OpenCode agent
