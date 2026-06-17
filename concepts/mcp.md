---
title: MCP (Model Context Protocol)
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [ai, llm, protocol, agent, api]
sources: []
---

# MCP (Model Context Protocol)

[[llm-integration]] | [[agent]]

## Overview

MCP (Model Context Protocol) is an open protocol developed by Anthropic that enables AI models to connect with external data sources and tools in a standardized way. It provides a universal interface for LLM tool use.

## Key Design

- **Client-server architecture**: LLM client connects to MCP servers
- **Standardized tool schema**: Tools described in a universal JSON format
- **Server registry**: Pre-built servers for filesystem, web, database, etc.
- **Bidirectional communication**: Both tool calls and data fetching

## Relationship to Other Projects

- Used by [[claude-code]] for its built-in tools
- Alternative to OpenAI's function calling and LangChain tool interfaces
- [[mcp-system]] concept page covers the internal architecture of MCP-based systems

## References

- Specification: https://modelcontextprotocol.io/
