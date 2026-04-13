# DemoGPT

> GitHub: https://github.com/melih-unsal/DemoGPT
> Clone date: 2026-04-13
> License: MIT

## Overview

DemoGPT is an autonomous AI agent framework focused on **auto-generative AI app generation** using LangChain. Given an instruction and title, it produces a complete Streamlit application through a phased pipeline.

## Core Pipeline (4 Stages)

1. **Plan Generation** — LLM generates a task plan from the instruction
2. **Task Creation** — Decomposes plan into executable LangChain tasks
3. **Code Snippet Generation** — Each task produces code snippets
4. **Final Code Assembly** — Combines all snippets into a working Streamlit app

## Architecture

- `demogpt/` — Core package (app.py, chains/, controllers.py, model.py, prompt.py)
- `demogpt_agenthub/` — Agent building library:
  - `agents/` — ToolCallingAgent, ReactAgent
  - `llms/` — OpenAIChatModel adapter
  - `tools/` — BaseTool + built-ins (TavilySearch, Weather, Wikipedia, Bash, Python, Arxiv, YouTube, StackOverflow, URL, WikiData, Pubmed)
  - `rag/` — Chroma-based RAG support
  - `prompts/`

## Key Dependencies

LangChain (>=0.3,<1), LangChain-Experimental, LangChain-OpenAI, Streamlit, Pydantic, Chroma, LangChain-Tavily, unstructured, pdf2image, arxiv.

## DemoGPT AgentHub

Standalone agent library within the project. Supports:
- Custom tool creation via `BaseTool`
- RAG integration with Chroma
- ReactAgent for reasoning
- Combines RAG + agents

## Citations (Academic)

- "A Survey on Large Language Model based Autonomous Agents" (2023)
- "METAAGENTS: Simulating Interactions of Human Behaviors for LLM-based Task-Oriented Coordination" (2023)
- "Exploring Large Language Model Based Intelligent Agents" (2024)

## Links

- Website: https://demogpt.io
- Docs: https://docs.demogpt.io
- Streamlit App: https://demogpt.streamlit.app
- HuggingFace Spaces: https://huggingface.co/spaces/melihunsal/demogpt
