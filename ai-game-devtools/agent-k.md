---
title: Agent K
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, llm, ai, open-source]
sources: [raw/articles/ai-game-devtools/agent-k.md]
---

# Agent K

**The autoagentic AGI.** AgentK is a self-evolving AGI made of collaborating agents that can create new agents as needed to complete user tasks. Built on [[LangGraph]] + [[LangChain]].

## Overview

Agent K ("K" = kernel) aims to be the minimum viable set of agents and tools to bootstrap itself, then grow its own mind organically. Agents and tools are plain Python files in `agents/` and `tools/` directories, making progress easy to track and contribute to.

## Architecture

### Kernel Agents

| Agent | Role | Key Responsibility |
|-------|------|--------------------|
| **Hermes** | Orchestrator | Interacts with humans, plans, assigns tasks, coordinates agents |
| **AgentSmith** | Architect | Creates and maintains new agents, equips them with tools, writes/runs smoke tests |
| **ToolMaker** | Developer | Creates and refines tools for the agent ecosystem |
| **WebResearcher** | Knowledge | Online research for up-to-date information |

### Tool Suite

File I/O: `read_file`, `write_to_file`, `overwrite_file`, `delete_file`
Shell: `run_shell_command`
Web: `duck_duck_go_web_search`, `duck_duck_go_news_search`, `fetch_web_page_content`, `fetch_web_page_raw_html`
Meta: `assign_agent_to_task`, `list_available_agents`, `request_human_input`

### Self-Evolution

AgentSmith designs new agents as Python files in `agents/` and writes corresponding smoke tests in `tests/agents/`. After writing, it runs the tests to verify functionality. New agents can recursively assign tasks to ToolMaker for new tools they need.

## Tech Stack

- **Framework**: LangGraph 0.2.0 + LangChain community
- **State**: LangGraph `StateGraph` + `MessagesState`, SQLite checkpointing
- **LLM**: OpenAI GPT-4o (default), Anthropic Claude, Ollama (local)
- **Web**: DuckDuckGo search via Selenium + unstructured
- **Runtime**: Docker container isolation

## Differentiators

Unlike static agent frameworks, Agent K's agents can **write new agents** at runtime. The system starts with a minimal kernel and bootstraps capability by creating specialized agents on demand. [[AutoGen]] and [[MetaGPT]] use pre-defined agent roles; Agent K's [[AgentSmith]] dynamically synthesizes new agent types.

## License

MIT

## Links

- GitHub: https://github.com/mikekelly/AgentK
