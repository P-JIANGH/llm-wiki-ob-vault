# LaVague

Source: https://github.com/lavague-ai/LaVague
License: Apache 2.0

## Overview

LaVague is an open-source Large Action Model (LAM) framework for developing AI Web Agents that automate browser-based processes from natural language objectives.

## Architecture

- **World Model**: Multi-modal LLM (GPT-4V by default) that takes an objective + current web page state (screenshot) and outputs instructions for the next step
- **Action Engine**: "Compiles" instructions into executable action code (Selenium/Playwright/Chrome Extension) and executes them
- **Three Engines**:
  - Navigation Engine: Complex HTML interaction (click, fill forms, etc.)
  - Python Engine: Computing tasks without navigation
  - Navigation Controls: Simple actions (WAIT, BACK, SCAN, MAXIMIZE_WINDOW, SWITCH_TAB)

## Package Structure (Monorepo)

| Package | Purpose |
|---------|---------|
| `lavague-core` | Core framework: WorldModel, ActionEngine, NavigationEngine, PythonEngine, retrievers, extractors |
| `lavague-drivers-selenium` | Selenium WebDriver integration |
| `lavague-drivers-playwright` | Playwright WebDriver integration |
| `lavague-contexts-openai` | OpenAI context (LLM + embedding) |
| `lavague-contexts-anthropic` | Anthropic context |
| `lavague-contexts-gemini` | Google Gemini context |
| `lavague-contexts-fireworks` | Fireworks AI context |
| `lavague-gradio` | Gradio demo UI |
| `lavague-qa` | QA testing tool: Gherkin specs → automated tests |
| `lavague-server` | WebSocket server for remote driver |
| `lavague-retrievers-cohere` | Cohere retriever integration |
| `lavague-tests` | Test runner and benchmarking |

## Key Dependencies

- llama-index (LLM/embedding abstractions, PromptTemplate)
- selenium / playwright (browser automation)
- Pillow (screenshot processing)
- PyYAML (state serialization)
- gradio (optional UI)

## Features

- Natural language → web automation
- Built-in contexts/configurations for different LLM providers
- Test runner for benchmarking agent performance
- Token counter for cost estimation
- Logging and debugging tools
- Chrome Extension driver
- Telemetry collection (opt-out via LAVAGUE_TELEMETRY=NONE)
- QA tool for converting Gherkin specs to tests

## Drivers Support

| Feature | Selenium | Playwright | Chrome Extension |
|---------|----------|------------|------------------|
| Headless | ✅ | ⏳ | N/A |
| Handle iframes | ✅ | ✅ | ❌ |
| Open several tabs | ✅ | ⏳ | ✅ |
| Highlight elements | ✅ | ✅ | ✅ |

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

## Data Collection

Collects telemetry by default: version, actions generated, observations, LLM used, objectives, chain of thoughts, token costs, URLs, success/failure rates. Can be disabled with `LAVAGUE_TELEMETRY=NONE`.
