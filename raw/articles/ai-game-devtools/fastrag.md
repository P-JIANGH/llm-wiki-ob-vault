# fastRAG — Source Summary

**Project:** IntelLabs/fastRAG
**URL:** https://github.com/IntelLabs/fastRAG
**Cloned:** 2026-04-15
**License:** Apache 2.0
**Status:** Archived (Intel no longer maintains)

## Overview

fastRAG is a research framework for efficient and optimized retrieval-augmented generative (RAG) pipelines, incorporating state-of-the-art LLMs and Information Retrieval techniques. Built on [Haystack](https://github.com/deepset-ai/haystack) and HuggingFace, it is designed to empower researchers and developers with tools for advancing RAG. Compatible with Haystack v2+.

## Key Features

- **Optimized RAG**: Build RAG pipelines with SOTA efficient components
- **Optimized for Intel Hardware**: Leverages Intel extensions for PyTorch (IPEX), Optimum Intel, and Optimum-Habana for Intel Xeon and Gaudi AI accelerators
- **Customizable**: 100% Haystack-compatible components

## Architecture / Components

### Module Structure
```
fastrag/
├── generators/       # LLM backends (Gaudi, ONNX, OpenVINO, Llama-CPP)
├── rankers/         # Optimized int8 bi-encoders, sparse cross-encoders
├── retrievers/      # ColBERT, PLAID, quantized retrievers
├── stores/          # Document stores (ElasticSearch, Qdrant, FAISS, In-memory)
├── embedders/       # Optimized embedding models
├── prompt_builders/ # Prompt construction
├── prompt_compressors/ # Prompt compression
├── data_loaders.py  # Data loading utilities
└── utils.py         # Common utilities
```

### Key Components

| Component | Description |
|-----------|-------------|
| **REPLUG** | Retrieve-and-Plug ensemble for processing larger numbers of retrieved documents via combined probability distribution |
| **ColBERT v2 + PLAID** | Token-based late interaction retriever; PLAID provides incredibly efficient indexing engine |
| **Fusion-In-Decoder (FiD)** | Generative multi-document encoder-decoder based on T5 architecture |
| **Optimized Embedders** | int8 quantized bi-encoders for low latency/high throughput |
| **GaudiGenerator** | Run LLMs on Intel Habana Gaudi accelerators |
| **ORTGenerator** | ONNX-runtime quantized LLMs for efficient CPU inference |
| **OpenVINOGenerator** | OpenVINO-quantized LLMs |
| **LlamaCPPInvocationLayer** | Run LLMs via llama-cpp on CPU/client machines |

### LLM Backends
- Intel Gaudi (DL1, Gaudi 2)
- ONNX Runtime (CPU-optimized quantized models via Optimum Intel)
- OpenVINO (quantized LLMs)
- Llama-CPP (GGUF format, client-side CPU)

### RAG-Efficient Components
- ColBERT v2 with PLAID engine (late interaction retrieval)
- REPLUG (ensemble-based multi-document processing)
- Fusion-In-Decoder (FiD) — T5-based generative reader

## Installation

```bash
pip install fastrag
# Extras
pip install fastrag[intel]       # IPEX backend
pip install fastrag[openvino]    # OpenVINO backend
pip install fastrag[colbert]     # ColBERT + PLAID
pip install fastrag[qdrant]      # Qdrant store
pip install fastrag[elastic]     # ElasticSearch store
```

Python >= 3.8, < 3.12; PyTorch >= 2.0.

## Configuration Examples

Pipeline configs in `config/` directory:
- `doc_chat.yaml` — Document chat pipeline
- `rag_pipeline_chat.yaml` — RAG pipeline
- `qa_with_fid.yaml` — Question answering with FiD
- `visual_chat.yaml` — Multi-modal visual chat
- `replug.yaml` — REPLUG ensemble

## Tech Stack

- **Framework:** Haystack v2
- **LLM Support:** HuggingFace Transformers, ONNX Runtime, OpenVINO, Llama.cpp, Habana Gaudi
- **IR:** ColBERT v2, PLAID, FAISS, Qdrant, ElasticSearch
- **Hardware:** Intel Xeon (IPEX), Intel Gaudi AI accelerators

## Relationship to Game Dev

fastRAG provides efficient RAG pipeline components useful for building AI-augmented game systems:
- NPC dialogue generation with retrieval-augmented LLM responses
- Game documentation Q&A pipelines
- Multi-modal game asset retrieval (via visual chat components)

## Note

**Project is archived** — Intel no longer provides development or support. Community forks may continue maintenance.
