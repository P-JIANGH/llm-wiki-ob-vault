---
title: LLaMA
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, open-source]
sources: ["general knowledge"]
---

# LLaMA

LLaMA (Large Language Model Meta AI) is a series of foundational large language models developed by **Meta AI** (formerly Facebook AI Research). First released in February 2023, LLaMA established Meta as a major open-weights player in the LLM space and has become one of the most widely cited and fine-tuned model families in both research and industry.

## Overview

LLaMA was designed as a general-purpose base model trained on publicly available data. Unlike prior generation models that focused on closed weights, Meta released LLaMA with a research-focused license, enabling the open-source community to build fine-tuned derivatives like [[alpaca]], [[vicuna]], and [[chinese-llama-alpaca-3]]. The series has grown from LLaMA 1 (7B–65B) through LLaMA 2 (7B–70B), LLaMA 3 (8B–70B), and LLaMA 3.1 (8B–405B), with each generation expanding parameter range, context window, and training data quality.

## Key Facts

| Fact | Detail |
|---|---|
| Developer | Meta AI |
| First Release | February 2023 (LLaMA 1) |
| Architecture | Decoder-only transformer |
| License | Custom research (v1), Open Model License (v2+) |
| Training Data | Publicly available web text (multi-lingual) |
| Parameter Range | 1B to 405B (across all generations) |

## Generations

### LLaMA 1 (Feb 2023)
- **Sizes:** 7B, 13B, 33B, 65B
- **Context:** 2K tokens
- **Significance:** First major open-weights model matching GPT-3 scale; sparked fine-tuning ecosystem
- **Training:** 1.4T tokens, trained on 2000× 80GB A100 GPUs

### LLaMA 2 (Jul 2023)
- **Sizes:** 7B, 13B, 70B
- **Context:** 4K tokens
- **Improvements:** 40% more training data (2T tokens), grouped-query attention (GQA) for 70B
- **Licensing:** Commercial-use allowed (with restrictions at >700M MAU threshold)
- **Chat variants:** Instruction-tuned + RLHF versions released

### LLaMA 3 (Apr 2024)
- **Sizes:** 8B, 70B
- **Context:** 8K tokens
- **Improvements:** 128K token vocabulary, GQA across all sizes, 15T training tokens
- **Architecture:** Dense transformer, no MoE

### LLaMA 3.1 (Jul 2024)
- **Sizes:** 8B, 70B, 405B
- **Context:** 128K tokens
- **Improvements:** Native multilingual support (8 languages), tool-use/function calling, synthetic data for alignment
- **405B:** Largest openly available dense model at release

## Derivative Ecosystem

LLaMA's open weights spawned a massive ecosystem:

- **Instruction-tuned derivatives:** [[stanford-alpaca]], [[vicuna]], [[chinese-llama-alpaca-3]]
- **Specialized variants:** [[code-llama]] (coding), [[llama-3]] (chat-optimized)
- **Quantization formats:** GGUF (llama.cpp), AWQ, GPTQ for edge deployment
- **Agentic frameworks:** [[llama-agentic-system]] — Meta's own agentic framework

## Game Dev Relevance

LLaMA models are practical for game AI scenarios:
- **8B models** fit on consumer GPUs (single RTX 3090/4090 with 4-bit quantization) for local NPC dialogue
- **70B+ models** via API for quest generation, narrative design, and world-building
- **Code Llama** derivatives useful for game script generation and shader authoring
- The [[llama-3]] family (especially 8B Instruct) is a popular choice for on-device game AI integration

## Related

- [[llama-3]] — Specific LLaMA 3 generation page (8B/70B variants)
- [[llama-3-1]] — LLaMA 3.1 generation (8B/70B/405B, 128K context)
- [[code-llama]] — Code-specialized LLaMA derivative
- [[chinese-llama-alpaca-3]] — Chinese fine-tuned LLaMA variant
- [[chatrwkv]] — Alternative RNN-based LLM architecture

## Links

- [Meta AI Research](https://ai.meta.com/)
- [Hugging Face: meta-llama](https://huggingface.co/meta-llama)
- [GitHub: llama-models](https://github.com/meta-llama/llama-models)
- [Llama Developer Site](https://llama.meta.com/)
