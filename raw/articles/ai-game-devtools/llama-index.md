# LlamaIndex

Source: https://github.com/run-llama/llama_index (gitcode mirror)
Cloned: 2026-04-23

## Overview

LlamaIndex OSS is an open-source framework to build agentic applications. It is a "data framework" to help build LLM apps by augmenting LLMs with private data.

## Key Components

### Core Package (`llama-index-core`)
The foundational package providing:
- Data connectors to ingest existing data sources and formats (APIs, PDFs, docs, SQL, etc.)
- Data structuring (indices, graphs) for easy use with LLMs
- Advanced retrieval/query interface over data
- Integration with outer application frameworks (LangChain, Flask, Docker, ChatGPT, etc.)

### Integrations (`llama-index-integrations`)
Over 300 integration packages that work seamlessly with core, allowing building with preferred LLM, embedding, and vector store providers. Namespaced such that imports with `core` use the core package, while those without use integration packages.

```python
from llama_index.core.llms import LLM
from llama_index.llms.openai import OpenAI
```

Key integration categories:
- **LLMs**: OpenAI, Ollama, and many others
- **Embeddings**: OpenAI, HuggingFace, and more
- **Vector Stores**: Various vector database backends
- **Readers**: 100+ data source connectors (airbyte, databases, APIs, etc.)
- **Agent Tools**: Various tool integrations
- **Graph Stores**: Knowledge graph backends
- **Callbacks & Observability**: Monitoring integrations

### Enterprise Platform: LlamaParse
- **Parse**: Agentic OCR and document parsing (130+ formats)
- **Extract**: Structured data extraction from documents
- **Index**: Ingest, index, and RAG pipelines
- **Agents**: End-to-end document agents with Workflows and Agent Builder

## Installation

```bash
# Starter package (core + selected integrations)
pip install llama-index

# Core only + custom integrations
pip install llama-index-core
pip install llama-index-llms-openai  # example integration
```

## Quick Start

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("YOUR_DATA_DIRECTORY").load_data()
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine()
query_engine.query("YOUR_QUESTION")
```

With non-OpenAI LLMs (e.g., Ollama):
```python
from llama_index.core import Settings, VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama

Settings.llm = Ollama(model="llama-3.1:latest", request_timeout=360.0)
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")

documents = SimpleDirectoryReader("YOUR_DATA_DIRECTORY").load_data()
index = VectorStoreIndex.from_documents(documents)
```

## Project Structure

```
llama_index/
├── llama-index-core/          # Core framework
│   ├── agent/                  # Agent implementations
│   ├── chat_engine/            # Chat interface
│   ├── embeddings/             # Embedding models
│   ├── indices/                # Index types
│   ├── ingestion/              # Data ingestion pipeline
│   ├── llms/                   # LLM interfaces
│   ├── memory/                 # Memory management
│   ├── node_parser/            # Document parsing
│   ├── readers/                # Data readers
│   ├── retrievers/             # Retrieval strategies
│   ├── storage/                # Storage backends
│   ├── tools/                  # Tool definitions
│   ├── vector_stores/          # Vector store backends
│   └── workflow/               # Workflow engine
├── llama-index-integrations/   # 300+ integration packages
│   ├── readers/                # 100+ data source readers
│   ├── llms/                   # LLM provider integrations
│   ├── embeddings/             # Embedding provider integrations
│   ├── vector_stores/          # Vector database integrations
│   └── ...
├── llama-index-utils/          # Utility packages
└── llama-index-instrumentation/ # Observability
```

## Metadata

- **License**: MIT
- **Author**: Jerry Liu (jerry@llamaindex.ai)
- **Maintainers**: Andrei Fajardo, Haotian Zhang, Logan Markewich, Simon Suo, Sourabh Desai
- **Version**: 0.14.21
- **Python**: >=3.10, <4.0
- **Created**: 2022
- **PyPI**: https://pypi.org/project/llama-index/
