---
title: Assistant CLI
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, tool, cli, openai, chatbot]
sources: [raw/articles/ai-game-devtools/assistant-cli.md]
---

# Assistant CLI

A Node.js CLI tool for integrating with [[OpenAI ChatGPT]] service directly from the terminal, developed by Paolo Di Ciaula.

## Overview

Assistant CLI enables users to interact with ChatGPT without a web browser — both as one-shot queries and continuous conversations. It manages ChatGPT authentication dynamically via Electron browser automation, eliminating the need for manual API key handling.

## Key Features

- **Single-shot mode**: `assistant "your question"` — get an immediate answer
- **Chat mode**: `assistant chat` — interactive conversation with history
- **Browser-based auth**: Uses Electron to automate the ChatGPT web login flow
- **TypeScript**: Written in TypeScript, compiled to JavaScript

## Technical Details

| Aspect | Value |
|--------|-------|
| Version | 1.4.0 |
| License | MIT |
| Runtime | Node.js >= 16 |
| Electron | 22.0.0 |
| Entry point | `./bin/cli` |
| Package name | `assistant-cli` on npm |

## Architecture

The CLI leverages [[Electron]] for browser automation to authenticate with ChatGPT's web service. Rather than using the official OpenAI API (which requires a paid API key), it scrapes the free ChatGPT web interface. The electron layer handles the session cookies and authentication tokens, while the CLI provides a clean terminal interface.

### Core Dependencies

- `axios` — HTTP requests
- `cli-spinner` — Loading indicators
- `node-html-markdown` — Convert ChatGPT HTML responses to readable markdown
- `readline` — Terminal input handling
- `uuid` — Session management

## Comparison to Similar Tools

| Tool | Auth Method | Interface | Game Dev Relevance |
|------|-------------|-----------|-------------------|
| Assistant CLI | Browser automation (ChatGPT web) | Terminal | Terminal-based game dev tools |
| [[AICommand]] | Unity Editor integration | Unity GUI | Direct game engine plugin |
| [[AgentGPT]] | OpenAI API | Web UI | Autonomous agent workflows |
| [[ChatGPTForUnity]] | OpenAI API | Unity C# | Game scripting |

Assistant CLI is unique in that it uses browser automation to access ChatGPT for free, at the cost of stability (ChatGPT web UI availability varies). For game developers who prefer terminal workflows, it provides a lightweight alternative to API-based solutions.

## Related Pages

- [[AICommand]] — Unity integration for ChatGPT
- [[AgentGPT]] — Autonomous AI agent platform
- [[LLMUnity]] — Unity-native LLM integration
- [[ChatGPTForUnity]] — ChatGPT API integration for Unity

## External Links

- [GitHub Repository](https://github.com/diciaup/assistant-cli)
- [npm Package](https://www.npmjs.com/package/assistant-cli)
