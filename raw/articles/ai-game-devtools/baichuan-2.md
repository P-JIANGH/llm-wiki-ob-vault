# Baichuan 2 — Source Summary

> Extracted from: https://github.com/baichuan-inc/Baichuan2
> Date: 2026-04-13

## Overview

Baichuan 2 是百川智能推出的新一代开源大语言模型，采用2.6万亿高质量tokens训练。发布7B和13B的Base和Chat版本，以及4bits量化版本。对学术研究完全开放，商用需邮件申请。

## Key Technical Facts

| Item | Detail |
|------|--------|
| Parameters | 7B / 13B |
| Versions | Base, Chat, Chat-4bits |
| Training Tokens | 2.6 trillion |
| Architecture | Transformer (similar to LLaMA) |
| License | Academic free; commercial via email |
| Framework | Hugging Face transformers |

## Available Models (HuggingFace)

- Baichuan2-7B-Base
- Baichuan2-7B-Chat
- Baichuan2-7B-Chat-4bits
- Baichuan2-13B-Base
- Baichuan2-13B-Chat
- Baichuan2-13B-Chat-4bits

## Benchmark Highlights (13B Base vs peers)

- C-Eval: 58.10 (vs LLaMA2-13B: 35.80)
- MMLU: 59.17 (vs LLaMA2-13B: 55.09)
- CMMLU: 61.97 (vs LLaMA2-13B: 37.99)
- GSM8K: 52.77 (vs LLaMA2-13B: 28.89)
- HumanEval: 17.07
- MBPP: 30.20

## Inference

Standard Hugging Face `AutoModelForCausalLM` loading with `trust_remote_code=True`. Supports:
- BF16/FP16 GPU inference
- BitsAndBytes 8-bit and 4-bit quantization (NF4)
- CPU inference (slow, float32)

## Fine-tuning

- Uses DeepSpeed for distributed training
- Supports LoRA via peft library
- Sample data: belle_chat_ramdon_10k.json (from multiturn_chat_0.8M)

## Code Files

- `cli_demo.py` — Command-line chat interface
- `web_demo.py` — Streamlit web chat UI
- `OpenAI_api.py` — OpenAI-compatible API wrapper
- `fine-tune/fine-tune.py` — DeepSpeed fine-tuning script
- `fine-tune/ds_config.json` — DeepSpeed configuration

## Relationship to Baichuan-7B / Baichuan-13B

Baichuan 2 is the successor to both Baichuan-7B and Baichuan-13B (first generation). It uses the same general architecture but is trained on a much larger corpus (2.6T vs ~1.2T tokens) and achieves significantly better benchmark performance.

## Tech Report

- arxiv.org/abs/2309.10305 — "Baichuan 2: Open Large-scale Language Models"
