# BAGEL: Open-Source Unified Multimodal Model

**Source:** https://github.com/ByteDance-Seed/Bagel
**Extracted:** 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview
BAGEL is an open-source multimodal foundation model with **7B active parameters (14B total)** trained on large-scale interleaved multimodal data by ByteDance Seed.

## Core Capabilities
- **Visual Understanding:** Surpasses Qwen2.5-VL & InternVL-2.5 on standard leaderboards
  - MME: 2388, MMBench: 85.0, MM-Vet: 67.2, MathVista: 73.1
- **Text-to-Image Generation:** Competitive with SD3 & FLUX-1.dev
  - GenEval: 0.82 (0.88 with CoT), WISE: 0.52 (0.70 with CoT)
- **Image Editing:** Superior qualitative results in classical editing scenarios
- **World-Modeling:** Free-form visual manipulation, multiview synthesis, world navigation

## Architecture
- **LLM Backbone:** Qwen2.5-0.5B-Instruct (configurable)
- **Visual Encoder:** SigLIP-SO400M-14 with flash attention + NaViT
- **VAE:** FLUX VAE (ae.safetensors) for latent diffusion
- **Layer Module:** Qwen2MoTDecoderLayer (Mixture-of-Transformers)
- **Training:** FSDP with HYBRID_SHARD, FLEX packing for GPU utilization
- **Unified Pretraining:** Single model handles understanding + generation via interleaved data

## Key Files
- `app.py` — Gradio WebUI entry point
- `inferencer.py` — Core inference logic
- `train/pretrain_unified_navit.py` — Training script
- `modeling/` — Core model architecture
- `eval/` — Benchmark evaluation scripts (VLM, T2I, Editing)

## Training
- Supports T2I, Editing, VLM tasks from mixed Parquet/JSONL data
- Pretraining: torchrun with FSDP HYBRID_SHARD, configurable max_latent_size
- Fine-tuning: HF checkpoint loading, EMA weight tracking, LR 2e-5
- Data: LLaVA-OV (VLM), SEED-Data-Edit-Part3 (Editing), FLUX.1-dev (T2I)

## License
Apache 2.0

## Links
- Website: bagel-ai.org
- Paper: arXiv:2505.14683
- Model: HuggingFace ByteDance-Seed/BAGEL-7B-MoT
- Demo: demo.bagel-ai.org
