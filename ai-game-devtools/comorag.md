---
title: ComoRAG
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, tool, open-source, game-engine, rag]
sources: [raw/articles/ai-game-devtools/comorag.md]
---

# ComoRAG

## Overview

**ComoRAG** (EternityJune25/ComoRAG) is a cognitive-inspired memory-organized RAG framework for stateful long narrative reasoning. It integrates large language models, embedding techniques, graph-based reasoning, and evaluation methodologies for long-document and multi-document tasks including question answering, information extraction, and knowledge graph construction. Published at **arXiv:2508.10419** (2025).

GitHub: https://github.com/EternityJune25/ComoRAG
arXiv: https://arxiv.org/abs/2508.10419

## Core Innovation

Unlike classic stateless single-step RAG, ComoRAG takes a **cognition-inspired approach** — narrative reasoning is not one-shot but a dynamic, evolving interplay between new evidence acquisition and consolidation of past knowledge, analogous to memory processes in the brain.

**Iterative Reasoning Loop**: Reason → Probe → Retrieve → Consolidate → Resolve

- **Iterative Reasoning Cycles**: When hitting an impasse, ComoRAG launches cycles that interact with a dynamic memory workspace
- **Probing Queries**: Each cycle generates targeted probes to explore new evidence paths
- **Global Memory Pool**: Newly retrieved evidence is integrated into a shared memory pool to progressively build coherent context
- **Benchmark gains**: Up to 11% relative improvement over strongest RAG baseline on 200K+ token narrative benchmarks

## Architecture

### Directory Structure
```
ComoRAG/
├── main_openai.py          # OpenAI API entry point
├── main_vllm.py            # Local vLLM server entry point
├── src/comorag/
│   ├── ComoRAG.py          # Main class — retrieval, graph, reasoning, QA
│   ├── utils/              # Config, logging, embedding, clustering, memory, agents
│   ├── embedding_model/     # BGEEmbedding, OpenAI embedding
│   ├── llm/                # vLLM offline, OpenAI GPT, base
│   ├── prompts/            # Templates for QA, NER, linking, fusion
│   ├── information_extraction/  # OpenIE (online/offline)
│   ├── embedding_store.py  # FAISS vector storage
│   └── rerank.py           # DSPyFilter reranking
├── script/
│   ├── chunk_doc_corpus.py # Document chunking
│   └── eval_qa.py          # QA evaluation (EM, F1)
└── requirements.txt
```

### Three Memory Layers (inspired by brain memory systems)
- **Veridical (VER)**: Original text fragments
- **Semantic (SEM)**: Semantic summaries
- **Episodic (EPI)**: Episodic summaries
- **Fusion**: Memory consolidation nodes

## Technology Stack

| Component | Technology |
|-----------|------------|
| LLM | OpenAI API or vLLM (local) |
| Embedding | BGE models, OpenAI embedding |
| Vector store | FAISS (faiss-cpu/gpu) |
| Graph | igraph |
| ML | PyTorch, sentence-transformers, transformers |
| Clustering | UMAP, ChunkSoftClustering |
| Evaluation | DSPy reranking, pytrec_eval |

## Game Development Use Cases

- **Game narrative QA**: Track plotlines and answer questions about long game stories
- **NPC dialogue reasoning**: Stateful multi-turn reasoning over character interactions
- **Knowledge graph construction**: Extract entities and relationships from game narratives
- **Character/entity tracking**: Maintain coherent context across evolving game stories

## Relation to Other Projects

- [[aios]] — Both are agent-related AI systems, though AIOS focuses on OS-level LLM infrastructure while ComoRAG focuses on memory-organized RAG for narrative tasks
- [[hipporag]] — HippoRAG is the "skeleton code" reference; ComoRAG builds upon its design with cognitive memory layers
- [[chatdev]] — Both use multi-agent reasoning patterns; ChatDev orchestrates agents for software development while ComoRAG orchestrates retrieval cycles for narrative reasoning

## License

MIT
