# AutoGen (microsoft/autogen)

> Source: https://github.com/microsoft/autogen (cloned 2026-04-15)

## Overview

**AutoGen** is a Microsoft Research framework for creating multi-agent AI applications. It enables multiple AI agents to collaborate, either autonomously or alongside humans, to solve complex tasks.

> [!CAUTION]
> **⚠️ Maintenance Mode** — AutoGen is in maintenance mode (as of 2025). It will not receive new features. New users should use [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) instead.

## Architecture

AutoGen uses a **layered, extensible design**:

| Layer | Package | Responsibility |
|-------|---------|----------------|
| Core API | `autogen-core` | Message passing, event-driven agents, local/distributed runtime, cross-language .NET + Python |
| AgentChat API | `autogen-agentchat` | High-level API for rapid prototyping; two-agent chat, group chats |
| Extensions | `autogen-ext` | LLM clients (OpenAI, AzureOpenAI), code execution, MCP tools |

**Ecosystem tools:**
- **AutoGen Studio** (`autogen-studio`) — No-code GUI for prototyping multi-agent workflows at `localhost:8080`
- **AutoGen Bench** (`agbench`) — Benchmarking suite for evaluating agent performance (HumanEval, GAIA, etc.)
- **Magentic-One** (`magentic-one-cli`) — State-of-the-art multi-agent team built on AgentChat + Extensions

## Key Packages

```
agbench/              # Benchmarking suite (linter, run_cmd, tabulate)
autogen-agentchat/   # High-level AgentChat API
autogen-core/         # Core message-passing, event-driven runtime
autogen-ext/          # Extensions (OpenAI client, Azure, code execution, MCP)
autogen-magentic-one/ # Magentic-One multi-agent system
autogen-studio/       # No-code GUI (streamlit-based)
magentic-one-cli/     # CLI for Magentic-One
pyautogen/            # Legacy v0.2 compatibility layer
```

## Installation

```bash
pip install -U "autogen-agentchat" "autogen-ext[openai]"
pip install -U "autogenstudio"  # AutoGen Studio (no-code GUI)
```

Requires Python 3.10+.

## Quick Example (Multi-Agent)

```python
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.tools import AgentTool
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def main():
    client = OpenAIChatCompletionClient(model="gpt-4.1")

    math_agent = AssistantAgent("math_expert", model_client=client,
                                system_message="You are a math expert.")
    math_tool = AgentTool(math_agent, return_value_as_last_message=True)

    chemistry_agent = AssistantAgent("chemistry_expert", model_client=client,
                                      system_message="You are a chemistry expert.")
    chemistry_tool = AgentTool(chemistry_agent, return_value_as_last_message=True)

    assistant = AssistantAgent("assistant", model_client=client,
                                 tools=[math_tool, chemistry_tool],
                                 max_tool_iterations=10)

    result = await assistant.run(task="What is the integral of x^2?")
    print(result)
    await client.close()

asyncio.run(main())
```

## MCP (Model Context Protocol) Integration

```python
from autogen_ext.tools.mcp import McpWorkbench, StdioServerParams

server_params = StdioServerParams(
    command="npx",
    args=["@playwright/mcp@latest", "--headless"],
)
async with McpWorkbench(server_params) as mcp:
    agent = AssistantAgent("browser_assistant", model_client=client,
                           workbench=mcp, max_tool_iterations=10)
```

## License

MIT (community managed, Microsoft Research)

## Related

- Successor: [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)
- Migration: [AutoGen → MAF migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
- Community: [Discord](https://aka.ms/autogen-discord), [GitHub Discussions](https://github.com/microsoft/autogen/discussions)
