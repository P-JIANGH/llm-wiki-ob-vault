---
title: Lemur
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/lemur.md]
---

# Lemur

[[Lemur]] is an open foundation model optimized for both natural language and code, purpose-built as the backbone of versatile language agents. Developed by `XLang Lab` and `Salesforce Research`, it achieves state-of-the-art performance among open-source models on agent benchmarks.

## Overview

Lemur addresses the gap between text-optimized and code-optimized open-source models. Where most open-source models specialize in one domain, Lemur balances both through a two-stage training regimen:

1. **Pretraining**: Llama-2-70B on 90B tokens with a 10:1 code-to-text ratio → `lemur-70b-v1`
2. **Instruction tuning**: 300K text+code examples → `lemur-70b-chat-v1` (ChatML format)

## Models

| Model | Description | Link |
|-------|-------------|------|
| `lemur-70b-v1` | Base model | [HF](https://huggingface.co/OpenLemur/lemur-70b-v1) |
| `lemur-70b-chat-v1` | Instruction-tuned chat | [HF](https://huggingface.co/OpenLemur/lemur-70b-chat-v1) |

## Architecture

- **Base architecture**: Llama-2-70B (70B parameters)
- **Training framework**: `xchat` Python package
  - transformers 4.34.0, deepspeed, peft, accelerate, bitsandbytes
  - Supports 8-bit quantization via `load_in_8bit=True`
- **Serving**: vLLM (primary) and TGI (text-generation-inference)

## Agent Capabilities

Lemur is evaluated across **13 interactive agent datasets** spanning:

| Benchmark | Domain | Framework |
|-----------|--------|-----------|
| MINT | Tool use + multi-hop reasoning | `MINT` |
| WebArena | Web-based task completion | `WebArena` |
| InterCode | Code execution environments | `InterCode` |
| MMLU/BBH/GSM8K | Foundational language & math | open-instruct |
| HumanEval/MBPP | Code generation | open-instruct |

## Key Differentiators

- **Balanced NL+Code**: Unlike pure text models (e.g., [[Llama-3]]) or pure code models (e.g., [[StarCoder]]), Lemur targets both domains equally for agent use cases
- **Agent-first evaluation**: Uniquely evaluated on WebArena, MINT, and InterCode — real-world agent benchmarks rather than just academic ones
- **Open Agents platform**: Lemur powers the [[OpenAgents]] platform (also from XLang Lab)

## Related

- [[auto-gpt]] — autonomous agent platform
- [[babyagi]] — lightweight AI agent framework
- `open-agents` — OpenAgents platform (sibling project)
- [[meta-gpt]] — multi-agent framework for software development
- [[langchain]] — LLM application framework
- [[autogen]] — Microsoft's multi-agent framework

## References

- Paper: https://arxiv.org/abs/2310.06830
- Blog: https://www.xlang.ai/blog/openlemur
- HuggingFace: https://huggingface.co/OpenLemur
- XLang Lab: https://www.xlang.ai/
