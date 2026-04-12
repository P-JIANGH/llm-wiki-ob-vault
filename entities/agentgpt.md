---
title: AgentGPT
created: 2026-04-12
updated: 2026-04-12
type: entity
tags: [tool, llm, agent]
sources: [raw/articles/ai-game-devtools/agentgpt.md]
---

# AgentGPT

> 🤖 Assemble, configure, and deploy autonomous AI Agents in your browser.

## Overview

AgentGPT is an open-source web-based platform that lets users configure and deploy autonomous AI agents directly from the browser. Users name a custom AI agent and define a goal — the agent then autonomously breaks down the goal into tasks, executes them, and iterates on the results.

**Website:** https://agentgpt.reworkd.ai
**Demo:** https://agentgpt.reworkd.ai
**Documentation:** https://reworkd.ai/docs

## Key Facts

| Attribute | Detail |
|-----------|--------|
| Repository | reworkd/AgentGPT |
| License | Open source |
| Stack | Next.js (frontend + backend) |
| Deployment | Docker, localhost (port 3000) |
| Localization | English, Simplified Chinese, Hungarian |
| Releases | 12 official releases |
| Commit count | 1,500+ |

## Architecture

The repository is organized into several key modules:

- **`next/`** — Main Next.js application (the web UI)
- **`cli/`** — Command-line interface tooling
- **`db/`** — Database configurations
- **`platform/`** — Platform-level components
- **`docs/`** — Documentation
- **`scripts/`** — Build and deployment automation

Deployment is available via Docker Compose or local setup scripts (`setup.sh` / `setup.bat`).

## How It Works

1. User names an agent and defines a goal in the browser UI
2. Agent autonomously decomposes the goal into sub-tasks
3. Agent executes tasks, learns from results, and iterates
4. Results are displayed in real-time in the browser

Requires API key configuration (e.g., OpenAI API key) before use.

## Related条目

- [[hermes-agent]] — Another autonomous agent framework with tool registry and persistent async loop
- [[ai-game-devtools-catalog]] — The broader AI game dev tools catalog where AgentGPT is listed under the LLM category
- [[autoresearch]] — Karpathy's autonomous LLM research framework
- [[langchain]] — LLM application framework that AgentGPT draws from conceptually

## 来源

- GitHub: https://github.com/reworkd/AgentGPT
- Live Demo: https://agentgpt.reworkd.ai
