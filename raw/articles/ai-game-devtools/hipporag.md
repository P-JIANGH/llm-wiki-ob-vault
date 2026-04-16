# HippoRAG - Raw Source

## Basic Info
- **Project**: HippoRAG 2: From RAG to Memory
- **GitHub**: https://github.com/OSU-NLP-Group/HippoRAG
- **Organization**: OSU-NLP-Group (The Ohio State University)
- **Papers**: 
  - HippoRAG (NeurIPS '24): https://arxiv.org/abs/2405.14831
  - HippoRAG 2 (ICML '25): https://arxiv.org/abs/2502.14802
- **License**: Not specified in README

## Description
HippoRAG 2 is a neurobiologically-inspired long-term memory framework for LLMs. It enhances LLMs' ability to recognize and utilize connections in new knowledge, mirroring human hippocampal memory functions. The key innovation is non-parametric continual learning — storing knowledge externally in a knowledge graph rather than in model weights.

## Key Capabilities
- **Associativity** (multi-hop retrieval): Answer complex multi-hop questions by linking facts across documents
- **Sense-making**: Integrate large, complex contexts
- **Continual learning**: Learn new knowledge without forgetting
- **Cost & latency efficient**: Online processes remain efficient; offline indexing uses fewer resources than GraphRAG/RAPTOR/LightRAG

## Architecture

### Core Modules (`src/hipporag/`)
- `embedding_model/` — Embedding models: NV-Embed-v2, GritLM, Contriever
- `llm/` — LLM inference: OpenAI GPT, vLLM (online/offline), transformers
- `information_extraction/` — OpenIE: GPT-based and vLLM-based open information extraction
- `evaluation/` — Retrieval and QA metrics: Recall, Exact Match, F1
- `prompts/` — Prompt templates and template manager
- `rerank.py` — DSPy-based reranking and filtering
- `embedding_store.py` — Vector/knowledge graph storage for passages, entities, facts
- `HippoRAG.py` — Main orchestration class

### Method (HippoRAG 2)
1. **OpenIE**: Extract (subject, relation, object) triples from text using LLM
2. **Knowledge Graph**: Build graph with entities and triples, indexed by LLM
3. **Retrieval**: Bi-encoder retrieval + graph-based reranking for multi-hop queries
4. **QA**: RAG pipeline combining retrieved context with LLM

### Supported Models
- **LLM**: OpenAI GPT (gpt-4o-mini, etc.), vLLM-deployed models (Llama-3.3-70B, etc.)
- **Embedding**: NV-Embed-v2, GritLM, Contriever (or OpenAI-compatible endpoints)

## Installation
```sh
conda create -n hipporag python=3.10
conda activate hipporag
pip install hipporag
```

## Code Structure
```
src/hipporag/
├── embedding_model/     # Embedding models (NV-Embed, GritLM, Contriever)
├── evaluation/         # QA and retrieval metrics
├── information_extraction/  # OpenIE (GPT, vLLM, transformers)
├── llm/                # LLM inference (OpenAI, vLLM, transformers)
├── prompts/            # Prompt templates + manager
├── utils/              # Config, misc utilities
├── HippoRAG.py         # Main class (1611 lines)
├── embedding_store.py  # Storage for embeddings + knowledge graph
├── rerank.py           # DSPy-based reranking
```

## Comparison to Related Work
- vs GraphRAG/RAPTOR/LightRAG: Lower offline indexing cost
- vs standard RAG: Better multi-hop/associative retrieval via knowledge graph

## Dataset
- HuggingFace: https://huggingface.co/datasets/osunlp/HippoRAG_2

## Citation
```bibtex
@misc{gutiérrez2025ragmemorynonparametriccontinual,
  title={From RAG to Memory: Non-Parametric Continual Learning for Large Language Models},
  author={Bernal Jiménez Gutiérrez and Yiheng Shu and Weijian Qi and Sizhe Zhou and Yu Su},
  year={2025}, eprint={2502.14802}, archivePrefix={arXiv}, primaryClass={cs.CL},
  url={https://arxiv.org/abs/2502.14802},
}
```
