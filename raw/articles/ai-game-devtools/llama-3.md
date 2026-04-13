# Llama 3 — Meta Official Release

> Note: This repo (llama3) is deprecated as of Llama 3.1. Meta consolidated all Llama GitHub repos into [llama-models](https://github.com/meta-llama/llama-models), with separate repos for PurpleLlama (safety), llama-toolchain (fine-tuning/inference), and llama-agentic-system (agentic apps).

## Source Info
- **URL:** https://github.com/meta-llama/llama3
- **Cloned from:** gitcode.com mirror (GitHub timed out)
- **Date:** 2026-04-14

## Overview
Meta Llama 3 is a collection of pretrained and instruction-tuned generative text models in 8B and 70B parameter sizes. Released April 18, 2024, it introduced significant improvements over Llama 2, including a 128K token vocabulary, 8K context length, Grouped-Query Attention (GQA), and 15T+ training tokens.

## Architecture
- **Type:** Auto-regressive transformer (decoder-only)
- **Tokenizer:** 128K token vocabulary
- **Context:** 8,192 tokens
- **Attention:** Grouped-Query Attention (GQA) — all sizes
- **Sizes:** 8B, 70B (pre-trained + instruction-tuned variants)
- **Fine-tuning:** SFT + RLHF

## Key Files
- `llama/model.py` — Transformer model implementation
- `llama/tokenizer.py` — Tokenizer with ChatFormat
- `llama/generation.py` — Generation utilities
- `example_chat_completion.py` — Chat inference example
- `example_text_completion.py` — Text completion example
- `download.sh` — Model weight download script

## Model Variants
| Model | Params | Context | GQA | Training Tokens | Knowledge Cutoff |
|-------|--------|---------|-----|-----------------|-----------------|
| Llama 3 8B | 8B | 8k | Yes | 15T+ | March 2023 |
| Llama 3 70B | 70B | 8k | Yes | 15T+ | December 2023 |

## Benchmark Results (Instruction-Tuned)
| Benchmark | Llama 3 8B | Llama 3 70B |
|-----------|-----------|-------------|
| MMLU (5-shot) | 68.4 | 82.0 |
| HumanEval (0-shot) | 62.2 | 81.7 |
| GSM-8K (8-shot, CoT) | 79.6 | 93.0 |
| MATH (4-shot, CoT) | 30.0 | 50.4 |

## Training
- **GPU Hours:** 7.7M total (H100-80GB)
  - 8B: 1.3M GPU hours, 390 tCO2eq
  - 70B: 6.4M GPU hours, 1,900 tCO2eq
- **100% carbon offset** via Meta sustainability program
- **Fine-tuning data:** 10M+ human-annotated examples

## Usage
```bash
# Text completion
torchrun --nproc_per_node 1 example_text_completion.py \
    --ckpt_dir Meta-Llama-3-8B/ \
    --tokenizer_path Meta-Llama-3-8B/tokenizer.model \
    --max_seq_len 128 --max_batch_size 4

# Chat completion
torchrun --nproc_per_node 1 example_chat_completion.py \
    --ckpt_dir Meta-Llama-3-8B-Instruct/ \
    --tokenizer_path Meta-Llama-3-8B-Instruct/tokenizer.model \
    --max_seq_len 512 --max_batch_size 6
```

## Chat Format (Instruction-Tuned)
```
<|begin_of_text|>
<|start_header_id|>system<|end_header_id|>

{system message}<|eot_id|>
<|start_header_id|>user<|end_header_id|>

{user message}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>

{assistant response}<|eot_id|>
```

## Dependencies
- PyTorch, CUDA
- `pip install -e .` (from setup.py)
- Hugging Face transformers also supported

## License
Custom commercial license (Llama 3 Community License) — permissive for research and commercial use, with acceptable use policy restrictions.

## Deprecation Notice
As of Llama 3.1 (July 2024), this repo is deprecated. Users directed to:
- [llama-models](https://github.com/meta-llama/llama-models) — central model repo
- [PurpleLlama](https://github.com/meta-llama/PurpleLlama) — safety tools
- [llama-toolchain](https://github.com/meta-llama/llama-toolchain) — inference/fine-tuning
- [llama-agentic-system](https://github.com/meta-llama/llama-agentic-system) — agentic applications
- [llama-cookbook](https://github.com/meta-llama/llama-recipes) — community recipes
