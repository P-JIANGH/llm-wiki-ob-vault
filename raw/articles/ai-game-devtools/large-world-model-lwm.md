# Large World Model (LWM) — Source Summary

> Ingested: 2026-04-14
> Source: https://github.com/LargeWorldModel/LWM
> Paper: https://arxiv.org/abs/2402.08268

## Overview

**Large World Model (LWM)** is a general-purpose large-context multimodal autoregressive model trained on diverse long videos and books using RingAttention. It supports language, image, and video understanding and generation, with context up to **1M tokens**.

## Key Capabilities
- **Long-context retrieval**: Needle-in-haystack across 1M token context
- **Long video understanding**: Answer questions over 1-hour YouTube videos
- **Image chat**: Multimodal conversational understanding of images
- **Video/image generation**: Text-to-video and text-to-image generation

## Architecture
- **RingAttention**: Scalable training on long sequences (4K → 1M tokens)
- **Blockwise parallel transformers**: For near-infinite context
- **Masked sequence packing**: Mix different sequence lengths during training
- **VQGAN**: Vision tokenization for image/video encoding
- **LLaMA-based**: 7B parameter transformer backbone
- **Dual framework**: JAX (optimized for TPU) + PyTorch (for inference)

## Available Models

| Model Name | Context | Type | Chat/Base |
|---|---|---|---|
| LWM-Text-Chat-128K/256K/512K/1M | 128K-1M | Language | Chat |
| LWM-Text-128K/256K/512K/1M | 128K-1M | Language | Base |
| LWM-Chat-32K/128K/1M | 32K-1M | Vision-Language | Chat |

## Code Structure (`lwm/`)
- `data.py` — Dataset loading (HuggingFace + JSON), TextProcessor for multimodal tokenization
- `llama.py` — LLaMA model implementation
- `vision_llama.py` — Vision-language LLaMA model
- `train.py` — Training entry point
- `vision_chat.py` — Vision-language chat inference
- `vision_generation.py` — Text-to-image/video generation
- `vqgan.py` — VQGAN vision tokenizer

## Key Techniques
- `scan_query_chunk_size` / `scan_key_chunk_size`: Block size for blockwise self-attention
- `scan_mlp_chunk_size`: Block size for feedforward network
- `mesh_dim='dp,fsdp,tp,sp'`: Parallelism control (data/FSDP/tensor/sequence)
- `RingAttention`: Sequence parallelism for long context

## Dependencies
- JAX (TPU optimized), Flax, Optax
- PyTorch (for inference only)
- ringattention, tux (custom forks)
- transformers, datasets, einops, sentencepiece
- imageio[ffmpeg], decord, opencv-python (video processing)

## License
- Code: Apache 2.0
- Models: Llama-2 license

## Related Papers
- Liu et al. 2024 — World Model on Million-Length Video and Language with RingAttention
- Liu et al. 2024 — Ring Attention with Blockwise Transformers for Near-Infinite Context
- Liu et al. 2023 — Blockwise Parallel Transformer for Large Context Models
