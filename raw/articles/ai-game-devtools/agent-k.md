# Agent K — Source Summary

> Captured: 2026-04-15 from https://github.com/mikekelly/AgentK

## Overview

Agent K is a self-evolving AGI system built from collaborating agents that can create new agents as needed. The "K" stands for kernel — the minimum set of agents and tools necessary to bootstrap and grow its own mind.

## Architecture

### Core Agents (Kernel)

- **Hermes**: Orchestrator — interacts with humans to understand goals, plan, assign tasks, coordinate other agents. Built with LangGraph `StateGraph` + `MessagesState`.
- **AgentSmith**: Architect — creates and maintains other agents, equips them with tools, writes and runs smoke tests. Can recursively create new agent types.
- **ToolMaker**: Developer — creates and refines tools that other agents use to interact with the world.
- **WebResearcher**: Knowledge gatherer — online research for up-to-date information.

### Tool Suite

File tools: `read_file`, `write_to_file`, `overwrite_file`, `delete_file`
Shell: `run_shell_command`
Web: `duck_duck_go_web_search`, `duck_duck_go_news_search`, `fetch_web_page_content`, `fetch_web_page_raw_html`
Meta: `assign_agent_to_task`, `list_available_agents`, `request_human_input`

### Tech Stack

- **Framework**: LangGraph 0.2.0 + LangChain community
- **State management**: LangGraph `StateGraph` with `MessagesState`, SQLite checkpointing
- **LLM providers**: OpenAI (GPT-4o default), Anthropic (Claude), Ollama (local)
- **Web search**: DuckDuckGo
- **Runtime**: Docker container isolation

### Self-Evolution Mechanism

Agents are regular Python files in `agents/` and `tools/` directories. AgentSmith can write new agents and their tests to disk, then run smoke tests to verify. The system bootstraps from a minimal kernel and grows by creating specialized agents on demand.

## Key Files

- `agent_kernel.py` — entry point, bootstraps Hermes
- `config.py` — LLM provider configuration (OpenAI/Anthropic/Ollama)
- `agents/hermes.py` — orchestrator agent (119 lines, LangGraph workflow)
- `agents/agent_smith.py` — agent factory (112 lines)
- `requirements.txt` — langgraph, langchain-*, selenium, duckduckgo-search, python-dotenv

## License

MIT License (LICENSE file present)

## Related

- [[LangGraph]] — workflow framework powering Agent K's agent graphs
- [[AutoGen]] — multi-agent frameworks compared
- [[MetaGPT]] — multi-agent systems with similar role-based collaboration
