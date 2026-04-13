---
title: gpt-oss
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/gpt-oss.md]
---

# gpt-oss

[[gpt-oss]] is OpenAI's open-weight reasoning model series — two MoE models released under Apache 2.0, designed for agentic tasks, function calling, and chain-of-thought reasoning.

## Overview

Two model sizes:
- **gpt-oss-120b** — 117B total / 5.1B active params per token; runs on a single 80GB GPU (H100/MI300X)
- **gpt-oss-20b** — 21B total / 3.6B active params; fits in 16GB memory

Both models use **MXFP4 quantization** on MoE weights and were trained with the **Harmony response format** (a custom chat format from OpenAI). The full chain-of-thought is exposed — not hidden from the developer.

## Key Capabilities

- **Agentic:** Native function calling, web browsing, Python code execution, Structured Outputs
- **Reasoning effort control:** Low / medium / high — trade off latency vs depth
- **Fine-tunable:** Full parameter fine-tuning supported
- **Permissive license:** Apache 2.0 — no copyleft restrictions, commercial use allowed

## Architecture

**MoE (Mixture of Experts)** with:
- MXFP4 quantized expert weights (4-bit block floating point via OCP Microscaling format)
- BF16 for all other layers and activations
- Harmony format for all inputs/outputs

**Inference backends:**

| Backend | Use Case | Hardware |
|---------|----------|----------|
| [[vllm]] | Production serving, OpenAI-compatible API | Single GPU |
| Triton | Reference optimized implementation | Single 80GB GPU |
| PyTorch | Educational reference | 4×H100 |
| Metal | Apple Silicon | M-series chips |
| [[transformers]] | Hugging Face pipeline | Various |
| Ollama / LM Studio | Local / consumer hardware | Consumer GPUs |

## Tools

The models were trained with three built-in tools (reference implementations provided):

1. **Browser tool** — `search` / `open` / `find` operations via Exa or You.com search backends
2. **Python tool** — Stateless Docker-based Python code execution
3. **Apply Patch tool** — File creation, update, and deletion

## Related

- [[auto-gpt]] — autonomous AI agent platform
- [[babyagi]] — another autonomous agent framework
- [[vllm]] — high-throughput LLM serving (used as inference backend)
