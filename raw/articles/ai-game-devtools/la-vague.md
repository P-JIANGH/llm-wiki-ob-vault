# LaVague - AI Web Agent Framework

> Source: https://github.com/lavague-ai/LaVague
> Cloned: 2026-04-14
> License: Apache-2.0

## Overview

LaVague is an open-source Large Action Model (LAM) framework for building AI Web Agents that automate web processes. Given an objective like "Print installation steps for Hugging Face's Diffusers library", LaVague agents generate and execute the sequence of browser actions needed to accomplish it.

## Architecture

### Core Components

- **World Model** (`world_model.py`): Takes an objective + current web page state → outputs natural language instructions
- **Action Engine** (`action_engine.py`): Compiles instructions into executable action code (Selenium/Playwright)
- **WebAgent** (`agents.py`): Combines WorldModel + ActionEngine into a single agent
- **BaseDriver** (`base_driver.py`): Abstract driver interface
- **Navigation** (`navigation.py`): Handles web navigation logic
- **Retrievers** (`retrievers.py`): RAG-based HTML chunk retrieval for context
- **PythonEngine** (`python_engine.py`): Python code generation/execution
- **TokenCounter** (`token_counter.py`): Tracks token usage and cost estimation

### Package Structure

```
lavague-core/           # Core agent logic (WorldModel, ActionEngine, WebAgent)
lavague-drivers-selenium/  # Selenium WebDriver integration
lavague-drivers-playwright/ # Playwright WebDriver integration
lavague-contexts-*      # LLM context providers (OpenAI, Anthropic, Gemini, Fireworks, etc.)
lavague-qa/             # QA tooling (Gherkin spec → test conversion)
lavague-gradio/         # Gradio UI demo
lavague-server/         # Server deployment
```

## Supported Drivers

| Feature         | Selenium | Playwright | Chrome Extension |
|-----------------|----------|------------|-----------------|
| Headless agents | ✅       | ⏳         | N/A             |
| Handle iframes  | ✅       | ✅         | ❌              |
| Open tabs       | ✅       | ⏳         | ✅              |
| Highlight elems | ✅       | ✅         | ✅              |

## Key Features

- Built-in Contexts (configurable LLM providers)
- Test runner for benchmarking agent performance
- Token counter for cost estimation
- Logging and debugging tools
- Interactive Gradio interface
- Chrome Extension for browser interaction
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
agent.demo("Go on the quicktour of PEFT")
```

## LaVague QA

Built on LaVague framework, provides Gherkin spec → test conversion for QA engineers.

## Dependencies

- Python ^3.10.0
- lavague-core ^0.2.31
- lavague-drivers-selenium ^0.2.12
- lavague-contexts-openai ^0.2.0
- lavague-gradio ^0.2.8

## Data Collection

Collects telemetry by default (version, actions, LLM usage, URLs, etc.). Can be disabled with `LAVAGUE_TELEMETRY="NONE"`.

## Related Links

- Docs: https://docs.lavague.ai/en/latest/
- Discord: https://discord.gg/SDxn9KpqX9
- BigAction Dataset: https://huggingface.co/BigAction
