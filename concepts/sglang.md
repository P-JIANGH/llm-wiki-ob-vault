---
title: SGLang
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, llm, inference, open-source]
sources: []
---

# SGLang

[[llm-inference]] | [[vllm]]

## Overview

SGLang is a structured generation language for LLM inference, built with RadixAttention for efficient prefix caching and continuous batching. Developed by SGLang Team (LMSYS), it accelerates complex inference pipelines.

## Key Features

- **RadixAttention**: KV cache reuse across requests sharing prefixes
- **Structured output**: Grammar-guided decoding for JSON, code, etc.
- **Chain-of-thought**: Native support for reasoning traces
- **OpenAI-compatible API**: Drop-in deployment

## Relationship to Other Projects

- Competes directly with [[vLLM]] in the LLM serving space
- Used by [[DeepSeek]] and [[Mistral]] for production serving

## References

- GitHub: https://github.com/sgl-project/sglang
