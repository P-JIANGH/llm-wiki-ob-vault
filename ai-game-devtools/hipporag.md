---
title: HippoRAG
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, rag, memory, knowledge-graph, open-source, research, agent]
sources: [raw/articles/ai-game-devtools/hipporag.md]
---

# HippoRAG

## Overview
**HippoRAG** (by [OSU-NLP-Group](https://github.com/OSU-NLP-Group), Ohio State University) is a neurobiologically-inspired long-term memory framework for LLMs. Version 2 ("From RAG to Memory") was published at ICML '25 and improves associativity and sense-making for complex multi-hop queries.

## What It Does
HippoRAG stores knowledge externally in a **knowledge graph** rather than in model weights, enabling non-parametric continual learning — new knowledge can be added without retraining. It excels at:
- **Multi-hop / associative retrieval**: Linking facts across multiple documents (e.g., "What county is X's birthplace in?")
- **Sense-making**: Integrating large, complex contexts
- **Continual learning**: Adding knowledge without catastrophic forgetting

## Architecture

### Core Pipeline
1. **OpenIE** — LLM extracts `(subject, relation, object)` triples from passage text
2. **Knowledge Graph** — Entities and triples indexed; graph structure captures cross-document connections
3. **Retrieval** — Bi-encoder retrieval + graph-based reranking (DSPy filtering)
4. **QA** — Retrieved subgraphs fed to LLM for answer generation

### Key Modules (`src/hipporag/`)
| Module | Role |
|--------|------|
| `embedding_model/` | Embedding models: NV-Embed-v2, GritLM, Contriever |
| `llm/` | LLM inference: OpenAI GPT, vLLM (online + offline), transformers |
| `information_extraction/` | OpenIE with GPT, vLLM, or transformers backends |
| `evaluation/` | Retrieval Recall, QA Exact Match, QA F1 |
| `prompts/` | Template manager + prompt library |
| `rerank.py` | DSPy-based reranking/filtering |
| `embedding_store.py` | Storage combining vector DB + knowledge graph |
| `HippoRAG.py` | Main orchestrator (~1600 lines) |

### Supported Models
- **LLM**: OpenAI GPT models, vLLM-deployed models (Llama-3.3-70B, etc.)
- **Embedding**: NV-Embed-v2, GritLM, Contriever; OpenAI-compatible endpoints

## Comparison to Related Work
| System | Indexing Cost | Multi-hop | Continual Learning |
|--------|--------------|-----------|-------------------|
| HippoRAG 2 | Low | Best | Yes (non-parametric) |
| GraphRAG | High | Good | Limited |
| RAPTOR | High | Good | Limited |
| LightRAG | Medium | Good | Limited |
| Standard RAG | Low | Poor | No |

## Papers
- **HippoRAG 2** (ICML '25): [arXiv:2502.14802](https://arxiv.org/abs/2502.14802) — Non-parametric continual learning
- **HippoRAG** (NeurIPS '24): [arXiv:2405.14831](https://arxiv.org/abs/2405.14831) — Neurobiologically inspired design

## Related
- [[comorag]] — Builds on HippoRAG with cognitive memory layers
- [[langchain]] — General LLM orchestration framework (HippoRAG integrates with LangChain-compatible APIs)
- [[perplexica]] — Open-source AI search engine using RAG
- [[fastgpt]] — RAG engine for knowledge bases

## Links
- GitHub: https://github.com/OSU-NLP-Group/HippoRAG
- HuggingFace Dataset: https://huggingface.co/datasets/osunlp/HippoRAG_2
- Colab: https://colab.research.google.com/drive/1nuelysWsXL8F5xH6q4JYJI8mvtlmeM9O
