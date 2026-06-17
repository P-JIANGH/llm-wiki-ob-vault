---
title: Llama 3
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/llama-3.md]
aliases: ["Meta-Llama-3"]

---

# Llama 3

Meta's official Llama 3 large language model family — 8B and 70B parameter auto-regressive transformers, with pretrained and instruction-tuned variants.

## Overview

Released April 18, 2024, Llama 3 brought major improvements over [[chatrwkv]] and earlier Llama 2 generations. It features a **128K token vocabulary**, **8K context window**, **Grouped-Query Attention (GQA)** across all sizes, and was trained on over **15 trillion tokens**. The instruction-tuned variants outperform many closed-source chat models on common benchmarks.

> ⚠️ **Deprecated:** As of Llama 3.1 (July 2024), this repo is deprecated. All Llama repos were consolidated into [llama-models](https://github.com/meta-llama/llama-models), [PurpleLlama](https://github.com/meta-llama/PurpleLlama), [llama-toolchain](https://github.com/meta-llama/llama-toolchain), and [llama-agentic-system](https://github.com/meta-llama/llama-agentic-system).

## Model Variants

| Model | Params | GQA | Context | Knowledge Cutoff |
|-------|--------|-----|---------|-----------------|
| Llama 3 8B | 8B | ✅ | 8K | March 2023 |
| Llama 3 70B | 70B | ✅ | 8K | December 2023 |

## Architecture

- **Type:** Auto-regressive decoder-only transformer
- **Tokenizer:** 128K token vocabulary
- **Attention:** Grouped-Query Attention (GQA) for all sizes — improves inference efficiency vs standard MHA
- **Fine-tuning:** SFT + RLHF alignment
- **Implementation:** `llama/model.py` (transformer), `llama/tokenizer.py` (ChatFormat), `llama/generation.py`

## Benchmark Performance (Instruction-Tuned)

| Benchmark | Llama 3 8B | Llama 3 70B |
|-----------|-----------|-------------|
| MMLU (5-shot) | 68.4 | **82.0** |
| HumanEval (0-shot) | 62.2 | **81.7** |
| GSM-8K (8-shot, CoT) | 79.6 | **93.0** |
| MATH (4-shot, CoT) | 30.0 | 50.4 |

## Training Cost

- **Total:** 7.7M GPU hours (H100-80GB)
  - 8B: 1.3M GPU hours, 390 tCO2eq
  - 70B: 6.4M GPU hours, 1,900 tCO2eq
- **100% carbon offset** by Meta sustainability program

## Game Dev Utility

Llama 3 is relevant for game AI use cases:
- **NPC dialogue generation** — instruction-tuned models produce natural, consistent character dialogue
- **Quest/script generation** — text completion models can generate narrative content
- **In-game chat/assistants** — 8B fits on consumer GPUs with GGUF quantization
- **Compared to [[chinese-llama-alpaca-3]]:** Llama 3 has 128K vocab (vs 128K reused), GQA (vs GQA), larger training corpus (15T vs not disclosed), and is English-focused (vs Chinese-optimized Alpaca)

## Usage

```bash
# Install
pip install -e .

# Download weights via email URL
./download.sh

# Chat inference (8B → nproc=1, 70B → nproc=8)
torchrun --nproc_per_node 1 example_chat_completion.py \
    --ckpt_dir Meta-Llama-3-8B-Instruct/ \
    --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model \
    --max_seq_len 512 --max_batch_size 6
```

Also supports Hugging Face `transformers` pipeline for easier integration into Python projects.

## Related

- [[chinese-llama-alpaca-3]] — Chinese Llama-3 variant (Elo 1627)
- [[chatrwkv]] — Alternative RNN-based LLM (100% RNN, O(n) inference)
- [[autoresearch]] — Karpathy's LLM research framework

## Links
- [GitHub (deprecated)](https://github.com/meta-llama/llama3)
- [Hugging Face](https://huggingface.co/meta-Llama)
- [Llama Website](https://llama.meta.com/)
- [Responsible Use Guide](https://ai.meta.com/static-resource/responsible-use-guide/)
