---
title: vLLM
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, llm, inference, open-source]
sources: []
---

# vLLM

[[llm-inference]] | [[open-source-llm-projects]]

## Overview

vLLM is a high-throughput and memory-efficient inference engine for LLMs, developed by UC Berkeley. It uses PagedAttention to manage KV cache memory dynamically, enabling much higher throughput than naive attention implementations.

## Key Features

- **PagedAttention**: Virtual memory management for KV cache; reduces memory waste significantly
- **Continuous batching**: Dynamic batching of requests without padding to maximum sequence length
- **Tensor parallelism**: Distributed inference across multiple GPUs
- **OpenAI-compatible API**: Drop-in replacement for OpenAI API servers
- **FlashAttention integration**: Fast exact attention via FlashAttention-2

## Relationship to Other Projects

- Competes with [[SGLang]] and [[llama.cpp]] in the LLM serving space
- Often compared in benchmarks against [[vllm]] references in [[mlc-llm]]

## References

- GitHub: https://github.com/vllm-project/vllm
