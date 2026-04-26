# Mixtral 8x7B — Raw Source

> **Source:** https://mistral.ai/news/mixtral-of-experts/
> **Date:** 2023-12-08
> **Organization:** Mistral AI
> **License:** Apache 2.0

## Overview

Mixtral 8x7B is a high-quality Sparse Mixture-of-Experts (SMoE) model with open weights, released by Mistral AI. It is a decoder-only model where the feedforward block picks from a set of 8 distinct groups of parameters ("experts"). At every layer, for every token, a router network chooses two of these groups to process the token and combines their output additively.

**Key Statistics:**
- Total parameters: 46.7B
- Active parameters per token: 12.9B (6x faster inference than full model)
- Inference speed/cost: equivalent to a 12.9B dense model
- License: Apache 2.0

## Architecture

Mixtral is a **Sparse Mixture-of-Experts (SMoE)** network:
- Decoder-only transformer architecture
- 8 distinct expert groups per feedforward block
- Router network selects 2 experts per token per layer
- Experts and routers are trained simultaneously
- Pre-trained on data extracted from the open Web

## Performance

Mixtral 8x7B outperforms Llama 2 70B on most benchmarks and matches or outperforms GPT3.5:
- MMLU, HellaSwag, TruthfulQA, Arc Challenge, Arc College, GSM8K benchmarks
- On par with or better than GPT3.5 on most standard benchmarks
- 6x faster inference than a 46.7B dense model (only uses 12.9B per token)

### Multilingual Capabilities
Masters French, German, Spanish, Italian, and English.

### Hallucination & Biases (Base Model)
- Better BBQ benchmark scores (less bias) than Llama 2
- More positive sentiments on BOLD benchmark vs Llama 2
- Base model performance measured for fine-tuning/preference modelling purposes

## Instruct Variants

- **Mixtral 8x7B Instruct:** SFT + DPO optimized for instruction following
- **MT-Bench score:** 8.30 — best open-source model
- Performance comparable to GPT3.5
- Supports moderation via prompt-based output banning (see Mistral docs on guardrailing)

## Deployment

- **vLLM integration:** Megablocks CUDA kernels for efficient MoE inference
- **Skypilot:** Cloud deployment on any instance
- **Mistral Platform:** Available behind endpoint "mistral-small" (beta)
- vLLM PR submitted with Megablocks CUDA kernels for fully open-source deployment stack

## Acknowledgements

Trained with support from CoreWeave and Scaleway.
