---
title: LaVague
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [agent, llm, tool, python, open-source, automation, multimodal]
sources: [raw/articles/ai-game-devtools/lavague.md]
---

# LaVague

## Overview

**LaVague** (lavague-ai/LaVague) is an open-source Large Action Model (LAM) framework for building AI Web Agents that automate browser-based tasks from natural language objectives. It uses a multi-modal LLM as a "World Model" to reason about web pages from screenshots, and an "Action Engine" to compile instructions into executable browser automation code.

Developed by Mithril Security. Website/docs: https://docs.lavague.ai

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | Apache 2.0 |
| **Language** | Python |
| **Version** | 1.1.19 (lavague meta-package) |
| **Python** | >= 3.10 |
| **Organization** | Mithril Security / lavague-ai |

## Architecture

```
LaVague/
├── lavague-core/              # Core framework
│   ├── world_model.py         # Multi-modal LLM reasoning
│   ├── action_engine.py       # Instruction dispatcher
│   ├── navigation.py          # NavigationEngine + NavigationControl
│   ├── python_engine.py       # Pure-computation engine
│   ├── base_driver.py         # Driver abstraction
│   ├── extractors.py          # LLM output extraction
│   └── retrievers.py          # HTML RAG retriever
├── lavague-drivers-selenium/  # Selenium WebDriver
├── lavague-drivers-playwright/# Playwright WebDriver
├── lavague-contexts-openai/   # OpenAI LLM + embedding
├── lavague-contexts-anthropic/# Anthropic context
├── lavague-contexts-gemini/   # Google Gemini context
├── lavague-contexts-fireworks/# Fireworks AI context
├── lavague-gradio/            # Gradio demo UI
├── lavague-qa/                # Gherkin → automated QA tests
├── lavague-server/            # WebSocket server
└── lavague-retrievers-cohere/ # Cohere retriever
```

## Core Components

| Component | Role |
|-----------|------|
| **World Model** | Multi-modal LLM (GPT-4V default) reasons from screenshots + objective to produce next-step instructions |
| **Action Engine** | Dispatches instructions to three sub-engines |
| **Navigation Engine** | Complex HTML interactions (click, fill, hover) via RAG over DOM |
| **Python Engine** | Computation tasks without page navigation |
| **Navigation Controls** | Simple commands: WAIT, BACK, SCAN, MAXIMIZE_WINDOW, SWITCH_TAB |

## Driver Support

| Feature | Selenium | Playwright | Chrome Extension |
|---------|----------|------------|------------------|
| Headless | ✅ | ⏳ | N/A |
| Handle iframes | ✅ | ✅ | ❌ |
| Multi-tab | ✅ | ⏳ | ✅ |
| Highlight elements | ✅ | ✅ | ✅ |

## Key Dependencies

- [[llama-index]] — LLM/embedding abstractions, PromptTemplate
- selenium / playwright — browser automation
- Pillow — screenshot processing
- PyYAML — state serialization

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

## Differences from Similar Tools

- **vs [[chrome-gpt|Chrome-GPT]]**: LaVague is a production framework with modular drivers and LLM contexts; Chrome-GPT is an experimental AutoGPT agent directly controlling Chrome via Selenium
- **vs [[agentgpt|AgentGPT]]**: LaVague is developer-focused (Python library) for web automation; AgentGPT is a browser-based platform for general autonomous agents with a GUI
- **vs general RAG**: LaVague uses RAG specifically for HTML element retrieval to ground LLM actions in the DOM, not for document QA

## Telemetry

Collects anonymous usage data by default (version, actions, LLM used, objectives, token costs, success/failure rates). Disable with `LAVAGUE_TELEMETRY=NONE`.

## Links

- GitHub: https://github.com/lavague-ai/LaVague
- Docs: https://docs.lavague.ai
