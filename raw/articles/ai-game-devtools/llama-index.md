# LlamaIndex — Source Analysis

**Source:** https://github.com/run-llama/llama_index
**Analyzed:** 2026-04-16
**Clone:** ~/tmp/ai-game-devtools/llama-index/

## README Summary

LlamaIndex is an open-source **"data framework"** for building LLM applications. Core purpose: connect LLMs to private/custom data via ingestion, structuring, retrieval, and query interfaces.

### Key Features
- **Data connectors** — ingest from APIs, PDFs, docs, SQL, etc.
- **Data structuring** — indices, graphs for LLM consumption
- **Advanced retrieval/query** — feed LLM prompts, get retrieved context + augmented output
- **Framework integrations** — LangChain, Flask, Docker, ChatGPT

### Installation Options
1. **Starter**: `llama-index` — core + selected integrations
2. **Customized**: `llama-index-core` — install core + pick specific integration packages from [LlamaHub](https://llamahub.ai/) (300+ integration packages)

### Architecture
- Namespace pattern: `llama_index.core.xxx` for core modules, `llama_index.xxx.yyy` for integrations
- Example: `from llama_index.core.llms import LLM` + `from llama_index.llms.openai import OpenAI`

### LlamaParse (Enterprise Platform)
- Agentic OCR and document parsing (130+ formats)
- Structured data extraction
- Ingest, index, and RAG pipelines
- Document splitting
- End-to-end document agents with Workflows and Agent Builder

### Core Modules (from llama-index-core/llama_index/core/)
- `agent/` — Agent framework
- `chat_engine/` — Chat interfaces
- `embeddings/` — Embedding models
- `evaluation/` — Evaluation tools
- `extractors/` — Data extraction
- `graph_stores/` — Graph storage backends
- `indices/` — Index implementations (VectorStoreIndex, etc.)
- `ingestion/` — Data ingestion pipeline
- `llms/` — LLM abstraction layer
- `memory/` — Conversation memory
- `multi_modal_llms/` — Multimodal model support
- `node_parser/` — Document chunking/parsing
- `postprocessor/` — Retrieval post-processing
- `query_engine/` — Query execution
- `retrievers/` — Retrieval strategies
- `storage/` — Storage abstractions
- `tools/` — Tool definitions
- `vector_stores/` — Vector store integrations
- `workflows/` — Workflow orchestration

### Integration Packages (llama-index-integrations/)
- agent, callbacks, embeddings, evaluation, extractors, graph_rag, graph_stores, indices, ingestion, llms, memory, node_parser, observability, output_parsers, postprocessor, program, protocols, question_gen, readers, retrievers, tools, vector_stores, workflows

### Build & Dependencies
- Build system: hatchling
- Dependencies: llama-index-core>=0.14.20, llama-index-embeddings-openai, llama-index-llms-openai, nltk
- Dev tools: black, mypy, pytest, ruff, pre-commit
- Author: Jerry Liu (jerry@llamaindex.ai)

### Example Usage
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
query_engine.query("Your question")
```

Supports non-OpenAI LLMs (e.g., Ollama) with custom Settings:
```python
Settings.llm = Ollama(model="llama-3.1:latest")
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
```

### License
MIT (from LICENSE file)

### Notable Facts
- Over 300 integration packages on LlamaHub
- Supports 130+ document formats via LlamaParse
- Created in 2022 by Jerry Liu
- High-level API (5 lines for basic use) + low-level API for customization
- PyPI package: llama-index
- Discord community active
