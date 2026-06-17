# MobiLlama — Source Summary

**URL:** https://github.com/mbzuai-oryx/MobiLlama
**Date:** 2024-02-25 (initial release), 2025-03-05 (ICLR'25 SLLM Workshop Spotlight)
**License:** Apache 2.0
**Institution:** Mohamed Bin Zayed University of Artificial Intelligence (MBZUAI), UAE + Linköping University, Sweden

## Overview

MobiLlama is a fully transparent open-source Small Language Model (SLM) designed for resource-constrained devices. It comes in 0.5B, 0.8B, and 1B parameter variants. The key innovation is a **careful parameter sharing scheme** — it initiates from a larger model and reduces both pre-training and deployment cost.

## Architecture

- **Base:** LLaMA-7B architecture (LlamaForCausalLM)
- **Model type:** Causal language model
- **Config (0.5B):** hidden_size=2048, num_hidden_layers=8, num_attention_heads=32, num_key_value_heads=4, intermediate_size=5632, max_position_embeddings=2048, vocab_size=32000
- **Training:** PyTorch + Lightning FSDP (Fully Sharded Data Parallel), bf16-mixed precision
- **Optimizer:** AdamW with cosine LR decay, warmup 2000 steps, weight_decay=0.1
- **Key modules:** `model_utils/modeling_mobillama.py` — custom LlamaForCausalLM, LlamaDecoderLayer, LlamaAttention

## Training Data

Amber dataset (LLM360) — 1.2 Trillion tokens total:

| Subset | Tokens (Billion) |
|---|---|
| Refined-Web | 665.01 |
| StarCoder | 291.92 |
| C4 | 197.67 |
| Arxiv | 30.00 |
| Wikipedia | 23.90 |
| StackExchange | 21.75 |
| Book | 28.86 |
| **Total** | **1259.13** |

## Performance (Benchmarks)

MobiLlama-0.5B achieves average 46.00 on benchmarks — outperforms many 0.5-0.6B models. MobiLlama-0.8B achieves 46.67 average. The 1.2B "large-base" variant achieves 49.06 average, outperforming TinyLlama-1.1B and OLMo-1.2B trained on 3T tokens.

## Variants

- `MBZUAI/MobiLlama-05B` — Base 0.5B
- `MBZUAI/MobiLlama-08B` — Base 0.8B
- `MBZUAI/MobiLlama-1B` — Base 1B
- `MBZUAI/MobiLlama-05B-Chat` — Chat version
- `MBZUAI/MobiLlama-1B-Chat` — Chat version

## Key Files

- `main_mobillama.py` — Training script (FSDP, Lightning)
- `main_mobillama_utils.py` — Training utilities (checkpoint, LR schedule, grad norm)
- `main_largebase.py` — Training script for 1.2B large-base variant
- `mobillama/config.json` — Model config (0.5B)
- `mobillama/config_08b.json` — Model config (0.8B)
- `mobillama/config_largebase.json` — Model config (1.2B)
- `pretrain.sh` — SLURM batch training script (20 A100 80GB nodes)

## Dependencies

```
torch>=2.1.1, lightning>=2.1.2, flash_attn>=2.3.3, transformers>=4.36.2, fire, wandb
```

## Mobile Deployment

Android APK available for on-device inference.
