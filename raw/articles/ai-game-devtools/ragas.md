# Ragas — LLM Application Evaluation Framework

**Source:** https://github.com/explodinggradients/ragas
**Cloned from:** https://gitcode.com/explodinggradients/ragas.git (GitHub mirror)
**Date:** 2026-04-16

## Overview

Ragas is an evaluation toolkit for Large Language Model (LLM) applications. It provides objective metrics for evaluating LLM applications, test data generation capabilities, and integrations with popular LLM frameworks.

- **License:** Apache-2.0
- **Organization:** VibrantLabs (founders@vibrantlabs.com)
- **Documentation:** https://docs.ragas.io/
- **PyPI:** https://pypi.org/project/ragas/
- **Python:** >= 3.9

## Key Features

- **Objective Metrics:** LLM-based and traditional metrics for evaluating LLM applications
- **Test Data Generation:** Automatic creation of test datasets covering a wide range of scenarios
- **Integrations:** LangChain, LlamaIndex, Haystack, DSPy, and observability tools (Langfuse, MLflow, Arize Phoenix)
- **Production Feedback Loops:** Leverage production data to continually improve LLM applications

## Architecture

```
/                          # Main ragas project
├── src/ragas/             # Source code including experimental features
│   └── experimental/      # Experimental features (Dataset, experiment management)
├── tests/                 # All tests (core + experimental)
├── examples/              # Example code (UV workspace member)
├── docs/                  # MkDocs documentation
├── scripts/               # Build/CI scripts
├── pyproject.toml         # Build config (UV workspace)
└── Makefile               # Build commands
```

### Core Components

1. **Metrics** — Pre-built evaluation metrics:
   - `DiscreteMetric` — Custom aspect evaluation (user-definable prompts + allowed values)
   - AspectCritic, AnswerCorrectness, ContextPrecision, ContextRecall, Faithfulness, etc.
2. **Test Data Generation** — Automatic test dataset creation for LLM apps
3. **CLI** — `ragas quickstart` command for scaffolding evaluation projects
4. **Dataset & Experiment Management** — `ragas.experimental` with multiple backends (CSV, JSONL, Google Drive, in-memory)
5. **Backend Plugin System** — Extensible via entry points (`ragas.backends`)

## Dependencies

**Core:** numpy, datasets, tiktoken, pydantic, nest-asyncio, diskcache, typer, rich, openai, tqdm, instructor, pillow, networkx, scikit-network

**LangChain Ecosystem:** langchain, langchain-core, langchain-community, langchain_openai

**Optional Integrations:**
- `all`: sentence-transformers, transformers, nltk, rouge_score, rapidfuzz, pandas, datacompy, sacrebleu, llama_index, r2r, GitPython
- `tracing`: langfuse, mlflow
- `gdrive`: google-api-python-client
- `ai-frameworks`: haystack-ai
- `dspy`: dspy-ai
- `ag-ui`: ag-ui-protocol

## Quick Start

```bash
pip install ragas
ragas quickstart rag_eval
```

```python
from ragas.metrics import DiscreteMetric
from ragas.llms import llm_factory

llm = llm_factory("gpt-4o")
metric = DiscreteMetric(
    name="summary_accuracy",
    allowed_values=["accurate", "inaccurate"],
    prompt="Evaluate if the summary is accurate..."
)
score = await metric.ascore(llm=llm, response="...")
```

## Dev Tooling

- **Package Manager:** UV (workspace mode: ragas + ragas-examples)
- **Linting:** Ruff (E, F, I rules)
- **Type Checking:** Pyright (basic mode, Python 3.9)
- **Testing:** pytest + pytest-xdist + pytest-asyncio
- **Docs:** MkDocs + Material theme
- **CI:** make run-ci (format + type + test + benchmarks)

## Relevance to AI Game Development

Ragas can be used to evaluate:
- NPC dialogue quality and consistency in LLM-powered games
- RAG-based game knowledge systems (lore, quest info retrieval)
- Prompt effectiveness for game content generation
- Agent behavior evaluation in game AI systems
