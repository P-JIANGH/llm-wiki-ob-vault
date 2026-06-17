---
title: Atomic Agents
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, framework, agent, python, open-source]
sources: [raw/articles/ai-game-devtools/atomic-agents.md]
---

# Atomic Agents

**GitHub:** [KennyVaneetvelde/atomic_agents](https://github.com/KennyVaneetvelde/atomic_agents) | **License:** MIT | **Version:** 2.7.5

A lightweight, modular Python framework for building Agentic AI pipelines — built on [Instructor](https://github.com/jxnl/instructor) and [Pydantic v2](https://docs.pydantic.dev/latest/). The core design principle is **atomicity**: single-purpose, reusable, composable, predictable components that snap together like LEGO blocks.

## Overview

Unlike autonomous multi-agent systems (AutoGPT, LangChain agents), Atomic Agents emphasizes **predictability and developer control**. Every component has typed input/output contracts enforced at runtime via Pydantic schemas. Designed for production use cases where consistent, reliable outputs matter more than autonomous flexibility.

## Architecture

The monorepo contains four packages:

| Package | Purpose |
|---|---|
| `atomic-agents` | Core framework (published to PyPI) |
| `atomic-assembler` | CLI tool (`atomic`) via Textual TUI |
| `atomic-examples` | Runnable example projects |
| `atomic-forge` | Downloadable tool collection |

**Core agent anatomy:**
1. **System Prompt** — defines behavior via `SystemPromptGenerator`
2. **Input Schema** — Pydantic model validating agent input
3. **Output Schema** — Pydantic model validating agent output
4. **Chat History** — `ChatHistory` for conversation context
5. **Context Providers** — dynamic runtime context injection
6. **Tools** — optional function-calling capabilities

**Key modules in `atomic_agents`:**
- `agents/` — `AtomicAgent` (generic class typed with I/O schemas), `AgentConfig`, `BasicChatInputSchema`
- `base/` — `BaseIOSchema`, `BaseTool`, `BaseToolConfig`
- `context/` — `SystemPromptGenerator`, `ChatHistory`
- `connectors/` — MCP (Model Context Protocol) support
- `memory/` — memory management systems
- `prompting/` — prompt engineering utilities

## Key Design Patterns

**Schema-driven development:** All data flows through typed Pydantic models — inputs and outputs are validated at runtime, preventing malformed responses.

**Composable chaining:** Agents chain by aligning output_schema with input_schema:
```
Agent A (OutputSchemaA) → Agent B (InputSchemaB) → Agent C
```
Swap a component by changing its schema type — no other agent code needs to change.

**Context Providers:** Inject dynamic runtime context into system prompts without modifying agent code. Create a class extending `BaseDynamicContextProvider`, register it with the agent.

**Hooks system:** Monitoring, error handling, performance metrics, and intelligent retry mechanisms.

## Provider Compatibility

Through [Instructor](https://github.com/jxnl/instructor), supports OpenAI, Anthropic (Claude), Groq, Mistral, Cohere, Google Gemini, Ollama (local), and any Instructor-compatible provider. Also uses [litellm](https://github.com/BerriAI/litellm) for unified LLM API.

## Execution Modes

- **Sync:** `agent.run(input_data)`
- **Async:** `await agent.run_async(input_data)`
- **Streaming:** `agent.run_stream(input_data)`, `agent.run_async_stream(input_data)`

## CLI: Atomic Assembler

`pip install atomic-agents` also installs the `atomic` CLI — an interactive Textual TUI for browsing and downloading tools from atomic-forge (calculator, searxng_search, webpage_scraper, youtube_transcript_scraper). Tools are downloaded individually to keep dependencies minimal.

## Example Use Cases in Repo

- **Quickstart** — basic chatbot, custom schema, multi-provider
- **Deep Research** — multi-step research agent
- **Web Search Agent** — searxng/tavily integration
- **RAG Chatbot** — retrieval-augmented generation
- **YouTube Summarizer** — transcript extraction + summarization
- **Orchestration Agent** — intelligent tool routing based on user input
- **MCP Agent** — Model Context Protocol integration

## Tech Stack

Python 3.12+, Pydantic v2, Instructor, Rich, Textual (TUI), litellm, MCP, pytest, Black (line-length 127), Flake8, uv build system.

## How It Differs from [[LangChain]]

[[LangChain]] focuses on chains and retrieval with a broad but sometimes opaque abstraction layer. Atomic Agents provides leaner, more explicit contracts — no hidden state, full visibility into what the LLM receives. Schema alignment makes component substitution explicit rather than configured. Better suited for teams that need auditability and strict output formats.

## Related

- [[MetaGPT]] — multi-agent orchestration with role specialization
- [[ChatDev]] — agent-based software development pipeline
- [[CrewAI]] — multi-agent role-playing framework
- [[AgentGPT]] — autonomous agent deployment platform
