# LangChain

> Source: https://github.com/hwchase17/langchain (gitee mirror clone: ~/tmp/ai-game-devtools/langchain)
> Clone date: 2026-04-14
> License: MIT

## Overview

LangChain is a framework for building agents and LLM-powered applications. It helps chain together interoperable components and third-party integrations to simplify AI application development.

## Architecture

### Monorepo Structure

```
langchain/
├── libs/
│   ├── core/             # langchain-core primitives and base abstractions
│   ├── langchain/        # langchain-classic (legacy, no new features)
│   ├── langchain_v1/     # Actively maintained langchain package
│   ├── partners/         # Third-party integrations (openai, anthropic, ollama, etc.)
│   ├── text-splitters/   # Document chunking utilities
│   ├── standard-tests/   # Shared test suite for integrations
│   └── model-profiles/   # Model configuration profiles
├── .github/              # CI/CD workflows
└── README.md
```

### Key Packages

**langchain-core** (v1.3.0a1):
- Base abstractions, interfaces, and protocols
- Dependencies: langsmith, tenacity, pydantic, PyYAML, jsonpatch
- Python >=3.10, <4.0

**langchain** (v1.2.15):
- Active maintained package (langchain_v1)
- Dependencies: langchain-core, langgraph>=1.1.5, pydantic>=2.7.4
- Optional integrations: openai, anthropic, ollama, huggingface, groq, aws, deepseek, etc.

### Core Modules (libs/langchain_v1/langchain/)

- `agents/` - Agent implementations
- `chat_models/` - Chat model interfaces
- `embeddings/` - Embedding model interfaces
- `messages/` - Message types and utilities
- `tools/` - Tool definitions and toolkits
- `rate_limiters/` - Rate limiting utilities

## Key Features

1. **Model Interoperability** - Standard interface for models, embeddings, vector stores
2. **Real-time Data Augmentation** - Connect LLMs to diverse data sources
3. **Rapid Prototyping** - Modular, component-based architecture
4. **Production-ready** - Built-in monitoring via LangSmith integration
5. **Flexible Abstractions** - High-level chains to low-level components

## Ecosystem

- **LangGraph** - Low-level agent orchestration framework for complex workflows
- **LangSmith** - Agent evals, observability, debugging
- **LangChain.js** - JavaScript/TypeScript library

## Development

- Uses `uv` for package management
- `make test` / `make lint` / `make format`
- Google-style docstrings required
- Type hints mandatory on all Python code
- Conventional Commits format for PR titles

## Dependencies (Core)

- langsmith>=0.3.45
- tenacity!=8.4.0,>=8.1.0
- pydantic>=2.7.4
- PyYAML>=5.3.0
- jsonpatch>=1.33.0
- typing-extensions>=4.7.0
