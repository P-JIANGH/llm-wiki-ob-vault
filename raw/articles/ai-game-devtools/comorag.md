# ComoRAG — AI Game DevTools Source

## Metadata
- **Name**: ComoRAG
- **Full Title**: ComoRAG: A Cognitive-Inspired Memory-Organized RAG for Stateful Long Narrative Reasoning
- **URL**: https://github.com/EternityJune25/ComoRAG
- **arXiv**: https://arxiv.org/abs/2508.10419
- **License**: MIT
- **Category**: Game (World Model & Agent) — RAG for long narrative reasoning
- **Date of capture**: 2026-04-15

## Overview
ComoRAG is a retrieval-augmented generation (RAG) framework designed for long-document and multi-document tasks including question answering, information extraction, and knowledge graph construction. It is specifically engineered for narrative reasoning tasks in games — tracking plotlines, character relationships, and entity evolution across long game stories or novels.

## Core Innovation
Unlike classic stateless single-step RAG, ComoRAG takes a cognition-inspired approach:
- **Iterative Reasoning Cycles**: When hitting an impasse, ComoRAG launches cycles that interact with a dynamic memory workspace
- **Probing Queries**: Each cycle generates targeted probes to explore new evidence paths
- **Global Memory Pool**: Newly retrieved evidence is integrated into a shared memory pool to progressively build coherent context
- **Key loop**: Reason → Probe → Retrieve → Consolidate → Resolve

## Architecture
```
src/comorag/
├── ComoRAG.py              # Main class — retrieval, graph construction, reasoning, QA
├── utils/                  # Config, logging, embedding, clustering, summarization, memory, agents
├── embedding_model/        # BGEEmbedding.py, OpenAI.py
├── llm/                    # vllm_offline.py, openai_gpt.py, base.py
├── prompts/                # templates/, prompt_template_manager.py, linking.py
├── information_extraction/ # openie_vllm_offline.py, openie_openai.py
├── embedding_store.py      # FAISS vector storage
└── rerank.py               # DSPyFilter reranking
```

### Three Memory Layers
- **Veridical (VER)**: Original text fragments
- **Semantic (SEM)**: Semantic summaries
- **Episodic (EPI)**: Episodic summaries
- **Fusion**: Fusion nodes for memory consolidation

### Key Dependencies
- **LLM**: OpenAI API or vLLM (local)
- **Embedding**: BGE models or OpenAI embedding
- **Vector store**: FAISS (faiss-cpu / faiss-gpu)
- **Graph**: igraph
- **ML**: PyTorch, sentence-transformers, transformers
- **Clustering**: UMAP, ChunkSoftClustering

## Main Entry Points
- `main_openai.py` — Uses OpenAI API
- `main_vllm.py` — Uses local vLLM server

## Data Format
**Corpus** (`corpus.jsonl`): `{"id": 0, "doc_id": 1, "title": "...", "contents": "..."}`
**QA** (`qas.jsonl`): `{"id": "1", "question": "...", "golden_answers": ["..."]}`

## Benchmark Results
- Four challenging long-context narrative benchmarks (200K+ tokens)
- Consistent relative gains up to 11% over strongest RAG baseline
- Particularly effective on complex queries requiring global comprehension

## Relation to Other Projects
- **HippoRAG** (OSU-NLP-Group): referenced as "skeleton code" — ComoRAG builds upon HippoRAG's design
- **Game narrative use case**: Can be used for game QA systems, NPC dialogue reasoning, story plot tracking

## License
MIT
