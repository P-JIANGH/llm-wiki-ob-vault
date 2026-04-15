# Atomic Agents — Raw Source

**Project:** [KennyVaneetvelde/atomic_agents](https://github.com/KennyVaneetvelde/atomic_agents)
**License:** MIT
**Version:** 2.7.5 (pyproject.toml)
**Cloned:** 2026-04-15

---

## README Summary

Atomic Agents is a lightweight and modular Python framework for building Agentic AI pipelines. Built on [Instructor](https://github.com/jxnl/instructor) (structured LLM outputs) and [Pydantic v2](https://docs.pydantic.dev/latest/) (data validation).

**Core philosophy:** Single-purpose, reusable, composable, predictable components. LEGO-like building blocks for AI.

### Monorepo Structure

```
atomic-monorepo/
├── atomic-agents/        # Core framework (PyPI: atomic-agents)
├── atomic-assembler/     # CLI tool "atomic" (TUI via Textual)
├── atomic-examples/      # Example projects
├── atomic-forge/         # Downloadable tools (calculator, searxng_search, etc.)
└── docs/                 # Sphinx documentation
```

### Core Architecture

**AtomicAgent** — generic agent class typed with input/output schemas:
```python
from atomic_agents import AtomicAgent, AgentConfig, BaseIOSchema
agent = AtomicAgent[InputSchema, OutputSchema](config=AgentConfig(...))
```

**Key modules:**
- `atomic_agents/agents/` — AtomicAgent class, AgentConfig, BasicChatInputSchema
- `atomic_agents/base/` — BaseIOSchema, BaseTool, BaseToolConfig
- `atomic_agents/context/` — SystemPromptGenerator, ChatHistory
- `atomic_agents/connectors/` — MCP support
- `atomic_agents/lib/` — Extended components, factories, utils
- `atomic_agents/memory/` — Memory management
- `atomic_agents/prompting/` — Prompt engineering
- `atomic_agents/services/` — Service integrations

**Key design patterns:**
- Schema-driven: all I/O validated via Pydantic
- Chaining: output_schema of Agent A aligns with input_schema of Agent B
- Context Providers: inject dynamic runtime context into system prompts
- Hooks system: monitoring, error handling, retry mechanisms

**Dependencies:** instructor==1.14.5, pydantic>=2.11.0, rich, textual, litellm, mcp[cli], pyyaml, requests, gitpython

**Provider support (via Instructor):** OpenAI, Anthropic, Groq, Mistral, Cohere, Gemini, Ollama, and any Instructor-compatible provider.

**Execution modes:** sync (`agent.run()`), async (`agent.run_async()`), streaming (`agent.run_stream()`)

**CLI:** `atomic` command launches TUI for browsing/downloading tools from atomic-forge

---

## pyproject.toml Key Fields

```
version = 2.7.5
requires-python = ">=3.12"
dependencies = [
  "instructor==1.14.5",
  "pydantic>=2.11.0,<3.0.0",
  "rich>=13.7.1",
  "textual>=5.3.0",
  "mcp[cli]>=1.6.0",
  "litellm>=1.50.0",
]
```

---

## __init__.py Exports

```python
from .agents.atomic_agent import AtomicAgent, AgentConfig, BasicChatInputSchema, BasicChatOutputSchema
from .base import BaseIOSchema, BaseTool, BaseToolConfig
```

---

## Examples Available

- `quickstart/` — basic chatbot, custom schema, multi-provider
- `deep-research/` — research agent
- `web-search-agent/` — web search integration
- `rag-chatbot/` — RAG pattern
- `youtube-summarizer/` — transcript summarization
- `orchestration-agent/` — multi-tool orchestration
- `mcp-agent/` — MCP integration
- `hooks-example/` — hook system with retry

---

## Differences from Similar Frameworks

Atomic Agents emphasizes **predictability and developer control** over autonomous multi-agent systems. Unlike LangChain agents or AutoGPT, every component has typed input/output contracts. Designed for production where consistency matters more than autonomous flexibility.
