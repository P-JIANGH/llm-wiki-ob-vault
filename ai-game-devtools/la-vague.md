---
title: LaVague
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, agent, web-automation, open-source]
sources: [raw/articles/ai-game-devtools/la-vague.md]
---

# LaVague

> A Large Action Model (LAM) framework for building AI Web Agents.

## Overview

LaVague is an open-source framework for creating AI Web Agents that automate browser-based processes. Given a natural language objective (e.g., "Print installation steps for Hugging Face's Diffusers library"), LaVague agents generate and execute the sequence of web actions needed to accomplish it. Version 1.1.19, Apache-2.0 licensed.

## Architecture

### Core Components

- **World Model** (`world_model.py`): Takes objective + current web page → outputs natural language instructions
- **Action Engine** (`action_engine.py`): Compiles instructions into Selenium/Playwright action code and executes
- **WebAgent** (`agents.py`): Combines WorldModel + ActionEngine into a deployable agent
- **Navigation** (`navigation.py`): Web navigation logic and state management
- **Retrievers** (`retrievers.py`): RAG-based HTML chunk retrieval for context
- **PythonEngine** (`python_engine.py`): Python code generation and execution
- **TokenCounter** (`token_counter.py`): Token usage tracking and cost estimation

### Package Structure

| Package | Purpose |
|---------|---------|
| `lavague-core` | Core agent logic (WorldModel, ActionEngine, WebAgent) |
| `lavague-drivers-selenium` | Selenium WebDriver integration |
| `lavague-drivers-playwright` | Playwright WebDriver integration |
| `lavague-contexts-*` | LLM context providers (OpenAI, Anthropic, Gemini, Fireworks) |
| `lavague-qa` | QA tooling: Gherkin spec → test conversion |
| `lavague-gradio` | Gradio UI demo interface |
| `lavague-server` | Server deployment |

## Supported Drivers

| Feature | Selenium | Playwright | Chrome Extension |
|---------|----------|------------|-----------------|
| Headless agents | ✅ | ⏳ | N/A |
| Handle iframes | ✅ | ✅ | ❌ |
| Open tabs | ✅ | ⏳ | ✅ |
| Highlight elements | ✅ | ✅ | ✅ |

## Key Features

- Customizable LLM providers (default GPT-4o, fully swappable)
- Built-in test runner for benchmarking agent performance
- Token counter for cost estimation
- Logging and debugging tools
- Interactive Gradio demo interface
- Chrome Extension for direct browser control
- RAG-based context retrieval from web page HTML
- Telemetry collection (opt-out via `LAVAGUE_TELEMETRY="NONE"`)

## Usage Example

```python
from lavague.core import WorldModel, ActionEngine
from lavague.core.agents import WebAgent
from lavague.drivers.selenium import SeleniumDriver

selenium_driver = SeleniumDriver(headless=False)
world_model = WorldModel()
action_engine = ActionEngine(selenium_driver)
agent = WebAgent(world_model, action_engine)
agent.get("https://huggingface.co/docs")
agent.run("Go on the quicktour of PEFT")
```

## How It Compares

LaVague's World Model + Action Engine split is architecturally similar to [[ai-game-devtools/devon]]'s Planner/Executor pattern and [[ai-game-devtools/devika]]'s multi-Agent approach. However, LaVague is specifically focused on **web automation** rather than general software engineering, and its action layer integrates directly with Selenium/Playwright browsers.

Unlike [[ai-game-devtools/chrome-gpt]] which layers LangChain on top of Selenium, LaVague uses its own LAM (Large Action Model) approach with a dedicated World Model that reasons about web page state.

## Related Links

- Docs: https://docs.lavague.ai/en/latest/
- GitHub: https://github.com/lavague-ai/LaVague
- Discord: https://discord.gg/SDxn9KpqX9
- BigAction Dataset: https://huggingface.co/BigAction
