> **Source:** https://mistral.ai/news/announcing-mistral-7b/ (web extract)
> **Extracted:** 2026-04-26

# Mistral 7B — Model Summary

## Overview

**Mistral 7B** is a 7.3B parameter language model released under the **Apache 2.0 license** (no restrictions). It claims to be the most powerful language model for its size to date.

## Performance Highlights

### Key Benchmark Results
- **Outperforms Llama 2 13B** on all metrics
- **On par with Llama 34B** (since Llama 2 34B wasn't released)
- **Vastly superior** in code and reasoning benchmarks

### Cost/Performance Efficiency
> "On reasoning, comprehension and STEM reasoning (MMLU), Mistral 7B performs equivalently to a Llama 2 that would be **more than 3x its size**."

This translates to:
- Memory savings
- Throughput gains

## Technical Architecture

### Sliding Window Attention (SWA)

| Feature | Value |
|---------|-------|
| Window Size | 4,096 hidden states |
| Compute Cost | O(sliding_window × seq_len) - linear |
| Speed Improvement | **2x faster** at 16k sequence length with 4k window |

**How it works:**
- Each layer attends to previous `4,096` hidden states
- Stacked layers enable attending beyond the window size:
  - Token `i` at layer `k` → attends to `[i-4096, i]` at layer `k-1`
  - Which attended to `[i-8192, i]` at layer `k-2`

### Memory Optimization
Using rotating buffers, cache is limited to `sliding_window` tokens:
> "Saves **half the cache memory** for inference on sequence length of 8,192, without impacting model quality."

## Fine-tuned Model: Mistral 7B Instruct

**HuggingFace Link:** `mistralai/Mistral-7B-Instruct-v0.1`

### Training Details
- Fine-tuned on publicly available instruction datasets from HuggingFace
- **No tricks, no proprietary data**

### Performance
- Outperforms all 7B models on **MT-Bench**
- Comparable to **13B chat models**

### Important Note
> "The Mistral 7B Instruct model... **does not have any moderation mechanism**."

## Benchmark Categories

Evaluations cover:
- MMLU (STEM reasoning)
- Commonsense Reasoning
- World Knowledge
- Reading Comprehension
- Code benchmarks

## Acknowledgements

| Provider | Contribution |
|----------|--------------|
| **CoreWeave** | 24/7 cluster support |
| **CINECA/EuroHPC** | Leonardo supercomputer resources |
| **FlashAttention** | Implementation support (Tri Dao, Daniel Haziza) |
| **vLLM** | Integration |
| **xFormers** | Integration |
| **Skypilot** | Integration |
| **HuggingFace, AWS, GCP, Azure ML** | Model compatibility |

## References

- [FlashAttention GitHub](https://github.com/Dao-AILab/flash-attention)
- [xFormers](https://facebookresearch.github.io/xformers)
- [Mistral Reference Implementation](https://github.com/mistralai/mistral-src)
- [MT-Bench Paper](https://arxiv.org/abs/2306.05685)
- [SWA: Child et al.](https://arxiv.org/pdf/1904.10509.pdf)
- [SWA: Beltagy et al.](https://arxiv.org/pdf/2004.05150v2.pdf)
- [HuggingFace: mistralai/Mistral-7B-v0.1](https://huggingface.co/mistralai/Mistral-7B-v0.1)
- [mistral-inference library](https://github.com/mistralai/mistral-inference)
