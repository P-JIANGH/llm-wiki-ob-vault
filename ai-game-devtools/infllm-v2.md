---
title: InfLLM-V2
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, tool, open-source]
sources: [web:https://github.com/thunlp/InfLLM, web:https://arxiv.org/abs/2402.04617]
---

# InfLLM-V2

**Efficient long-context LLM inference with infinite context window**

## Overview

InfLLM (Infinite-context LLM) is an efficient inference framework that enables large language models to process ultra-long text sequences without being limited by their training context window. It achieves this by using a block-wise attention mechanism with a small memory pool that stores only the most relevant tokens, enabling near-linear time complexity regardless of sequence length. InfLLM-V2 introduces further optimizations for throughput and memory efficiency.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | THUNLP (Tsinghua University) |
| **Paper** | arXiv 2402.04617 |
| **Core Idea** | Block-wise attention with token-level memory compression |
| **Context Window** | Effectively infinite (tested on 2M+ tokens) |
| **Complexity** | O(L) time and memory with respect to sequence length L |
| **Memory Pool** | Stores top-K most relevant token blocks via similarity scoring |
| **Compatibility** | Works with any causal transformer (Llama, Mistral, Qwen) |
| **License** | MIT |

## Architecture

- **Block Partitioning**: Long sequences divided into fixed-size blocks
- **Block-Wise Attention**: Local attention within recent blocks, global attention to memory pool
- **Memory Compression**: Token-level similarity scoring selects most relevant blocks for attention
- **Cache Management**: LRU-based eviction of least-relevant blocks from memory pool
- **Chunked Prefill**: Efficient precomputation for initial context loading

## Usage in AI Game Development

InfLLM enables:
- **Long game context**: Process entire game lore books, rule systems, or dialogue trees
- **Multi-session memory**: Maintain conversation history across extended game sessions
- **World simulation**: Analyze large game state representations for AI decision making
- **Document QA**: Query game documentation, codebases, and design documents efficiently

## Related Projects

- [[vllm]] — UC Berkeley high-throughput LLM inference engine with PagedAttention
- [[llama-cpp]] — ggerganov C/C++ LLM inference engine, alternative efficient inference
- [[large-world-model-lwm]] — UC Berkeley million-token context multimodal model
- [[longcat-flash]] — Meituan 560B MoE LLM with 128K context for agent tasks
