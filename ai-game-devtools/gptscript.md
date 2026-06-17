---
title: GPTScript
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, tool, agent, workflow, open-source]
sources: [raw/articles/ai-game-devtools/gptscript.md]
---

# GPTScript

## Overview
GPTScript is an open-source framework by `Acorn Labs` that enables LLMs to interact with and operate various external systems — from local executables to OpenAPI services, SDK libraries, and RAG-based applications. It provides a unified way to connect LLM agents to real-world tools and data.

## Key Facts

| Attribute | Value |
|-----------|-------|
| **License** | Apache License 2.0 |
| **Language** | Go (1.26.2) |
| **Author** | Acorn Labs, Inc. (acorn.io) |
| **Install (macOS/Linux)** | `brew install gptscript` or `curl https://get.gptscript.ai/install.sh \| sh` |
| **Install (Windows)** | `winget install gptscript-ai.gptscript` |
| **Community** | Discord: https://discord.gg/9sSf4UyAMC |

## Use Cases

1. **Chat with local CLI tools** — LLM executes and interacts with command-line programs
2. **Chat with OpenAPI endpoints** — Connect to any REST API with an OpenAPI schema
3. **Chat with local files and directories** — RAG-style file system access
4. **Automated workflows** — Multi-step agentic workflows with tool orchestration

## Architecture

GPTScript's core is organized around several key components:

```
pkg/gptscript/    — Main GPTScript struct (Registry, Runner, Cache, Credentials)
pkg/llm/          — LLM provider registry and abstraction
pkg/runner/       — Script execution runner with authorization
pkg/loader/       — Script loader (includes VCS-based script fetching)
pkg/engine/       — Execution engine
pkg/parser/       — GPTScript .gpt script parser
pkg/builtin/      — Built-in tools (shell, HTTP, file access, etc.)
pkg/openapi/      — OpenAPI schema integration
pkg/mcp/          — Model Context Protocol support
pkg/credentials/  — Credential store factory (API key management)
pkg/cache/        — Caching client
pkg/monitor/      — Execution monitoring / TUI
pkg/remote/       — Remote execution
pkg/daemon/       — Daemon mode
pkg/server/       — Server mode
```

Scripts use the `.gpt` file extension and define tools, prompts, and LLM interactions in a declarative format.

## Technical Highlights

- **LLM Provider Agnostic** — Works with OpenAI API (requires API key configuration)
- **Tool Integration** — Built-in tools for shell execution, HTTP requests, file operations
- **Credential Management** — Secure storage for API keys and secrets
- **Docker Integration** — Uses Docker CLI for containerized tool execution
- **Workspace Isolation** — Executes in isolated workspace directories
- **MCP Support** — Integrates with Model Context Protocol for extended context

## Comparison to Similar Tools

GPTScript is conceptually similar to `OpenAI GPTs` but as a self-hosted, open-source alternative focused on system integration rather than chat assistants. Compared to [[Auto-GPT]], GPTScript is more lightweight and focused on tool-calling rather than autonomous agentic reasoning loops.

## Related Links

- GitHub: https://github.com/gptscript-ai/gptscript
- Documentation: https://docs.gptscript.ai/
- Discord: https://discord.gg/9sSf4UyAMC
