# Lamini - Source Material

## Project Overview

- **Name**: Lamini
- **Type**: Python SDK / LLM Platform Client
- **Repository**: https://github.com/lamini-ai/lamini
- **License**: Apache 2.0
- **Version**: 3.2.22
- **Python**: >= 3.7

## Summary

Lamini is a Python package that provides a client + SDK for the Lamini AI platform. It enables developers to build custom generative AI models by fine-tuning on their own data, with support for various LLM operations including generation, training, evaluation, RAG, and embedding. Lamini also provides a pipeline framework for building agentic workflows with custom generators and validators.

## Installation

```sh
pip install lamini
```

Setup: Get API key at https://app.lamini.ai/account, then create `~/.lamini/configure.yaml`:
```yaml
production:
    key: "<YOUR-KEY-HERE>"
```

## Architecture

### Core Modules

**API Layer** (`lamini/api/`)
- `lamini.py` — Main `Lamini` class: generation calls, data upload/download, training orchestration, evaluation
- `train.py` — `Train` class: training job management (start, cancel, resume, evaluate), dataset operations
- `classifier.py` — Classification API
- `embedding.py` — Embedding generation
- `streaming_completion.py` — Streaming generation
- `openai_client.py` — BaseOpenAIClient for OpenAI-compatible API
- `lamini_config.py` — Configuration management
- `rest_requests.py` — HTTP request utilities

**Generation Layer** (`lamini/generation/`)
- `generation_node.py` — `GenerationNode` for LLM inference
- `generation_pipeline.py` — `GenerationPipeline` orchestrator
- `llm_stream.py` — Streaming LLM responses
- `base_prompt_object.py` — `PromptObject` data structure
- `token_optimizer.py` — Token optimization utilities
- `embedding_node.py` — Embedding node
- `classifier_node.py` — Classification node

**Runners** (`lamini/runners/`)
- `base_runner.py` — `BaseRunner`: data loading (CSV/JSONL/DataFrame), fine-tuning via `train()`/`tune()`, evaluation via `evaluate()`
- `llama_v2_runner.py`, `llama_v3_runner.py`, `mistral_runner.py` — Model-specific runners

**Experiment/Pipeline** (`lamini/experiment/`)
- `base_agentic_pipeline.py` — `BaseAgenticPipeline`: chained generators + validators pipeline, branching logic, result recording
- `generators/` — Specialized generators: `QuestionToConceptGenerator`, `SchemaToSQLGenerator`, `SQLDebuggerGenerator`, `SaveGenerator`
- `validators/` — Validators: `FactualityValidator`, `SQLValidator`, `SQLScoreValidator`

**Index** (`lamini/index/`)
- `lamini_index.py` — `LaminiIndex` for retrieval-augmented generation

## Key Dependencies

```
lamini-configuration[yaml], requests, tqdm, numpy<2.0.0, pandas, jsonlines,
faiss-cpu, azure-storage-blob, aiohttp, scikit-learn, sqlglot, openai, sqlalchemy
```

## Key Capabilities

1. **LLM Generation**: `llm.generate(prompt, model_name, output_type, max_new_tokens)` — structured output via `output_type` dict
2. **Fine-tuning**: Upload input/output pairs → `llm.train()` → get a custom model
3. **Streaming**: `StreamingCompletion` for token-by-token streaming
4. **Data Upload**: CSV or JSONL files with `input`/`output` keys
5. **Agentic Pipeline**: Chain generators/validators with `BaseAgenticPipeline`, support branching and result recording
6. **SQL Generation**: `generate_sql()` with `cache_id` for SQL-specific generation
7. **RAG**: `MemoryRAG` for retrieval-augmented generation with FAISS
8. **Model Download**: Download HuggingFace models to Lamini platform cache

## Configuration

Environment variables:
- `LAMINI_API_KEY` — API key
- `LAMINI_API_URL` — API URL (defaults to `api.lamini.ai`)
- `LAMINI_RETRY_LIMIT` — Retry limit (default: 3)
- `LAMINI_MAX_WORKERS` — Max workers (default: 4)
- `LAMINI_BATCH_SIZE` — Batch size (default: 5)
- `LAMINI_STATIC_BATCHING` — Static batching (default: True)

## Training Types

- `memory_tuning` — Default fine-tuning
- `memory_rag` — RAG-enhanced training
- `mome_mini` — MoME mini training

## Platform

Lamini runs on `api.lamini.ai` (configurable to localhost or staging).
