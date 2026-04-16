---
title: PandasAI
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, llm, python, code]
sources: [raw/articles/ai-game-devtools/pandas-ai.md]
---

# PandasAI

## Overview

PandasAI is a Python library that enables natural language querying of tabular data (DataFrames). Users can ask questions in plain English and receive answers as text, numbers, or charts — no SQL or pandas syntax required. Developed by Sinaptik AI (Gabriele Venturi), MIT licensed.

## Key Features

- **Natural Language Queries:** `df.chat("What is the average revenue by region?")` returns answers without writing pandas/SQL code
- **Chart Generation:** Automatically generates visualizations (histograms, bar charts, etc.) from natural language descriptions
- **Multi-DataFrame Support:** Cross-table queries — `pai.chat("Who gets paid the most?", employees_df, salaries_df)`
- **Docker Sandbox:** Secure, isolated code execution via `pandasai-docker` extension
- **Skills System (EE):** Extensible skill plugins for custom functionality
- **Vector Store Training:** Train agents with Q&A pairs stored in vector databases (ChromaDB, LanceDB)

## Architecture

- **Agent:** Main conversational interface — manages state, memory, and the generate → execute → parse pipeline
- **Code Generation:** LLM generates Python/SQL code from user prompts via LiteLLM (supports 100+ models)
- **Code Execution:** DuckDB-based SQL engine for efficient tabular analytics; local or Docker sandbox
- **Response Parser:** Typed outputs (Number, String, DataFrame, Chart, Error)
- **Semantic Layer:** YAML-defined datasets with transformations, relations, and views
- **Extension System:** Modular `extensions/` directory for LLM providers, sandboxes, vector stores

### Code Flow

```
User Query → Agent.generate_code_with_retries() → LLM (LiteLLM) → Python/SQL Code
→ Agent.execute_with_retries() → CodeExecutor + DuckDB → ResponseParser → Typed Result
```

Error recovery uses specialized prompts: `InvalidLLMOutputType` vs generic `CodeExecutionError`, each with different retry strategies.

## Technical Details

| Attribute | Value |
|-----------|-------|
| Language | Python 3.8–3.11 |
| Build | Poetry (per-extension pyproject.toml) |
| LLM Provider | LiteLLM (unified interface for 100+ models) |
| Database | DuckDB (embedded SQL analytics) |
| Sandbox | Local or Docker container |
| License | MIT (EE directory has separate license) |
| Repository | sinaptik-ai/pandas-ai |
| Docs | https://docs.pandas-ai.com/ |
| PyPI | `pip install pandasai` + `pip install pandasai-litellm` |

## Game Dev Relevance

- **Game Balance Analysis:** Query game stats/numbers in natural language
- **Player Analytics:** Analyze player behavior data without SQL
- **Economy Simulation:** LLM-generated charts from economic data
- **QA Data Analysis:** Natural language queries on test results

## Related Tools

Differs from [[ai-game-devtools/datarus-jupyter-agent]] (Datarus focuses on automated Jupyter notebook generation for data science, PandasAI focuses on conversational data exploration) and [[ai-game-devtools/langchain]] (LangChain is a general LLM app framework, PandasAI is specialized for DataFrame interaction).

## Source

- raw/articles/ai-game-devtools/pandas-ai.md
