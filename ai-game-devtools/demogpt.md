---
title: DemoGPT
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, tool, agent, langchain, streamlit, rag, autonomous-agent, open-source]
sources: [raw/articles/ai-game-devtools/demogpt.md]
---

# DemoGPT

An autonomous AI agent framework for **auto-generative AI application generation**. Given an instruction and title, DemoGPT produces a complete [[Streamlit]] web application through a phased pipeline using [[LangChain]].

## Overview

DemoGPT takes a natural-language instruction (e.g., "create a weather app") and a title, then auto-generates a working [[Streamlit]] app. It also includes **DemoGPT AgentHub** — a standalone library for building custom AI agents with tools, RAG, and React-style reasoning.

**License:** [[MIT]] | **Python:** ^3.8.1 | **Version:** 1.3.6

## Core Pipeline

DemoGPT generates apps through four sequential stages:

| Stage | Description |
|-------|-------------|
| Plan Generation | LLM generates a task plan from the instruction |
| Task Creation | Decomposes plan into executable LangChain tasks |
| Code Snippet Generation | Each task produces code snippets |
| Final Code Assembly | Combines snippets into a working Streamlit app |

The pipeline streams intermediate JSON per stage, including a `done` flag and `code` field in the final output.

## DemoGPT AgentHub

The `demogpt_agenthub` sub-package is a reusable agent library:

- **ToolCallingAgent** — Routes user queries to appropriate tools
- **ReactAgent** — Reasoning + action loop
- **Built-in tools:** TavilySearch, Weather, Wikipedia, Bash, Python, Arxiv, YouTube, StackOverflow, URL, WikiData, Pubmed
- **RAG** — Chroma-based retrieval-augmented generation with combine support
- **LLM adapters** — OpenAI ChatModel interface

```python
from demogpt_agenthub.agents import ToolCallingAgent
from demogpt_agenthub.llms import OpenAIChatModel
from demogpt_agenthub.tools import TavilySearchTool

llm = OpenAIChatModel(model_name="gpt-4o-mini")
agent = ToolCallingAgent(tools=[TavilySearchTool()], llm=llm, verbose=True)
agent.run("What's the weather in New York?")
```

## Architecture

```
demogpt/              # Core app generation pipeline
  app.py              # Streamlit entry point
  chains/             # LangChain chain definitions
  controllers.py      # Pipeline orchestration
  model.py            # Model interface
  prompt.py           # Prompt templates

demogpt_agenthub/    # Reusable agent library
  agents/             # ToolCallingAgent, ReactAgent
  llms/               # LLM adapters
  tools/              # BaseTool + built-in tools
  rag/                # Chroma RAG implementation
  prompts/            # Agent prompts
```

## Technical Stack

- **Framework:** [[LangChain]] >=0.3,<1
- **UI:** [[Streamlit]]
- **RAG:** [[Chroma]] (langchain-chroma)
- **LLM:** OpenAI API via langchain-openai
- **Tools:** Tavily, Wikipedia, Arxiv, YouTube, StackOverflow, Pubmed
- **Parsing:** unstructured, pdf2image, pdfminer-six

## Related Links

- Website: https://demogpt.io
- Documentation: https://docs.demogpt.io
- Streamlit Demo: https://demogpt.streamlit.app
- HuggingFace Spaces: https://huggingface.co/spaces/melihunsal/demogpt

## Compared to Similar Agents

| Feature | DemoGPT | [[Auto-GPT]] | [[ChatDev]] |
|---------|---------|-------------|-------------|
| App generation | Streamlit auto-gen | General task autonomy | Software development |
| Tool ecosystem | LangChain tools | Web search + execution | Terminal + file ops |
| RAG support | Chroma-based | No native RAG | No native RAG |
| Focus | AI app scaffolding | General automation | Collaborative dev |

## Related Wiki Pages

- [[auto-gpt]] — General-purpose autonomous agent
- [[chatdev]] — Collaborative LLM-based software development
- [[langchain]] — Underlying framework for chains and agents
- [[streamlit]] — UI framework for generated apps
