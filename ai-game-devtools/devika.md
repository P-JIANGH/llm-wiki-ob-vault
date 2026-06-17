---
title: Devika
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, open-source, agent, llm]
sources: [raw/articles/ai-game-devtools/devika.md]
---

# Devika

## Overview

**Devika** (stitionai/devika) is an advanced AI software engineer that understands high-level human instructions, breaks them into steps, researches information, and writes code. It is modeled after Devin by Cognition AI, aiming to be an open-source alternative targeting SWE-bench benchmarks.

Website: https://github.com/stitionai/devika
License: MIT

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | MIT |
| **Language** | Python, TypeScript (UI) |
| **Frontend** | Bun + TypeScript |
| **Backend** | Flask + Python 3.10-3.11 |
| **Target** | SWE-bench benchmarks (open-source Devin) |

## Architecture

Devika uses an **agent-based architecture** with a central `Agent` core orchestrating specialized sub-agents:

| Agent | Role |
|-------|------|
| `Planner` | Generates step-by-step plans from user prompts |
| `Researcher` | Extracts search queries, ranks/filters for relevance |
| `Coder` | Generates code based on plan + researched context |
| `Runner` | Executes code in sandboxed environment |
| `Feature` | Implements new features incrementally |
| `Patcher` | Debug and fixes issues |
| `Reporter` | Generates PDF reports |
| `Decision` | Handles special commands (git clone, browser) |
| `Formatter` | Extracts clean info from crawled content |
| `InternalMonologue` | Tracks agent "thinking" process |

## Key Features

- 🤖 **Multi-LLM support**: Claude 3, GPT-4, Gemini, Mistral, Groq, Ollama (local)
- 🌐 **Web browsing**: Playwright-powered browser automation
- 💻 **Multi-language coding**: Python, JavaScript, and more
- 📊 **Agent state tracking**: Real-time visualization of agent thinking
- 🔌 **Extensible**: Modular agent + service architecture
- 🗄️ **Persistence**: SQLite + SQLModel for projects/conversation history
- 📦 **Services**: GitHub integration, Netlify deployment

## Tech Stack

- **Backend**: Python 3.10-3.11, Flask, SQLModel, Playwright
- **Frontend**: Bun, TypeScript, Flask-SocketIO
- **LLM Providers**: OpenAI, Anthropic, Google, Mistral, Groq, Ollama
- **Search**: Bing Search API, Google Search API, DuckDuckGo
- **Persistence**: SQLite

## Dependencies

flask, flask-cors, sqlmodel, playwright, openai, anthropic, google-generativeai, mistralai, groq, ollama, duckduckgo-search, GitPython, netlify-py, xhtml2pdf, pdfminer.six, Jinja2, tiktoken

## Related

- [[auto-gpt]] — another autonomous AI agent framework (CLI-focused)
- [[babyagi]] — task-driven autonomous agent framework
- [[agent-loop]] — core execution loop pattern
- [[aios]] — AI agent operating system with LLM kernel abstraction
