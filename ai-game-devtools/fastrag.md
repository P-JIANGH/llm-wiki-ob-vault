---
title: fastRAG
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [rag, llm, retrieval, intel, framework, haystack, python]
sources: [raw/articles/ai-game-devtools/fastrag.md]
---

# fastRAG

**IntelLabs/fastRAG** — An efficient retrieval-augmented generation framework optimized for Intel hardware. Built on [[Haystack]] v2 and HuggingFace. **Archived** — Intel no longer maintains this project.

## Overview

fastRAG is a research framework for building optimized RAG pipelines, incorporating SOTA LLMs and information retrieval techniques. It provides components for efficient document retrieval (ColBERT/PLAID), generative reading (REPLUG, Fusion-In-Decoder), and multiple LLM backends (Gaudi, ONNX, OpenVINO, Llama-CPP).

## Key Components

| Component | Type | Description |
|-----------|------|-------------|
| **ColBERT v2 + PLAID** | Retriever | Token-based late interaction; PLAID engine for high-efficiency indexing |
| **REPLUG** | Generator | Retrieve-and-Plug ensemble; processes documents in parallel via probability distribution |
| **Fusion-In-Decoder (FiD)** | Generator | T5-based multi-document encoder-decoder; encodes question + each document simultaneously |
| **GaudiGenerator** | LLM Backend | Intel Habana Gaudi accelerator support |
| **ORTGenerator** | LLM Backend | ONNX Runtime quantized LLMs for CPU |
| **OpenVINOGenerator** | LLM Backend | OpenVINO-quantized LLMs |
| **QuantizedBiEncoder** | Retriever/Ranker | int8 quantized bi-encoders via Optimum Intel |

## Architecture

Built on [[Haystack]] as the core pipeline framework. All components are 100% Haystack-compatible.

```
fastrag/
├── generators/      # LLM backends (Gaudi, ONNX, OpenVINO, Llama-CPP)
├── rankers/        # Optimized int8 bi-encoders, cross-encoders
├── retrievers/     # ColBERT+PLAID, quantized retrievers
├── stores/         # Document stores (ElasticSearch, Qdrant, FAISS)
├── embedders/      # Optimized embedding models
└── prompt_*/       # Prompt construction & compression
```

## LLM Backends

- **Intel Gaudi** (DL1, Gaudi 2) — via Optimum-Habana
- **ONNX Runtime** — CPU-optimized quantized models via Optimum Intel
- **OpenVINO** — Intel OpenVINO quantized LLMs
- **Llama-CPP** — GGUF format, client-side CPU inference

## Document Stores

- Qdrant
- ElasticSearch
- FAISS (CPU/GPU)
- In-memory

## Game Dev Relevance

RAG pipelines are useful for:
- **NPC dialogue systems** — retrieval-augmented LLM responses with game lore/context
- **Game documentation Q&A** — technical docs retrieval for dev assistance
- **Multi-modal pipelines** — visual chat components for game asset retrieval

## Installation

```bash
pip install fastrag
pip install fastrag[intel]       # IPEX backend
pip install fastrag[colbert]      # ColBERT + PLAID
pip install fastrag[qdrant]       # Qdrant store
```

Python 3.8–3.11, PyTorch 2.0+.

## Relationship to Other Tools

- [[Haystack]] — core pipeline framework (dependency)
- [[LangChain]] — similar RAG/Agent capabilities, but fastRAG is Intel-hardware-optimized
- [[LlamaIndex]] — alternative RAG framework
- [[Dify]] — no-code LLM app platform with RAG support

## License

Apache 2.0 (archived by Intel)

## References

- GitHub: https://github.com/IntelLabs/fastRAG
- ColBERT-NQ model: https://huggingface.co/Intel/ColBERT-NQ
