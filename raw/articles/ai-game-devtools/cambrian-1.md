# Cambrian-1 — Raw Source

> Ingested: 2026-04-14 | Source: https://github.com/cambrian-mllm/cambrian

## Project Overview

**Cambrian-1** is a fully open, vision-centric multimodal LLM (MLLM) developed by NYU Vision X, with contributions from Yann LeCun and Saining Xie. It achieves competitive performance with GPT-4V, Gemini-Pro, and Grok-1.4V while using fewer visual tokens.

## Key Facts

- **Release Date:** 2024-06-24
- **Authors:** Shengbang Tong*, Ellis Brown*, Penghao Wu* et al. (NYU, Meta)
- **License:** Apache 2.0
- **Paper:** arXiv:2406.16860
- **Website:** https://cambrian-mllm.github.io/

## Model Sizes

| Model | Base LLM | Visual Tokens | MMB | Params |
|-------|----------|---------------|-----|--------|
| Cambrian-1-8B | LLaMA3-8B-Instruct | 576 | 75.9 | 8B |
| Cambrian-1-13B | Vicuna-1.5-13B | 576 | 75.7 | 13B |
| Cambrian-1-34B | Hermes2-Yi-34B | 576 | 81.4 | 34B |

## Architecture

- **Vision Encoder:** Multi-encoder approach (SigLIP, CLIP-ViT, DINOv2, ConvNeXt)
- **Projector:** Spatial Vision Aggregator (SVA) — a new visual connector design
- **Training:** Two-stage — (1) Visual Connector Training with 2.5M alignment data, (2) Instruction Tuning with Cambrian-7M

## Core Innovations

1. **SVA (Spatial Vision Aggregator):** Connects frozen pretrained vision encoders to a frozen LLM. Uses query-based grouping with configurable depth (D) and query groups (G).
2. **Fixed 576 visual tokens:** Unlike LLaVA-NeXT/Mini-Gemini which use 2880 tokens, Cambrian uses a much smaller fixed token count with competitive results.
3. **Internet Data Engine:** Automated pipeline for collecting science-related VQA data — 161k additional samples collected, 400% increase in science domain data.
4. **CV-Bench:** Purpose-built computer vision benchmark on HuggingFace.

## Data (Cambrian-10M)

- **Cambrian-10M:** Raw dataset with 10M samples
- **Cambrian-7M:** Curated high-quality subset
- Optimal data ratios: Language 21%, General 34.52%, OCR 27.22%, Counting 8.71%, Math 7.20%
- 77k GPT-4v distilled extended responses; 60k GPT-4o creative chat data

## Training Stack

- **TPU Training:** TorchXLA on TPU-V4-512 (also supports TPU-V4-64)
- **GPU Inference:** bitsandbytes quantization, deepspeed, Gradio web UI
- **Dependencies:** torch==2.2.0, transformers==4.37.0, timm==0.9.16, open_clip_torch, diffusers

## Demo

- Gradio web UI with controller + model worker architecture
- Multiple model workers can run simultaneously for comparison
- Supports multi-GPU (VRAM <= 24GB)

## Related Projects

- V-IRL (grounding virtual intelligence in real life)
- V* (guided visual search as core mechanism in MLLMs)
- MMVP (visual shortcomings of MLLMs)

## Repository Structure

```
cambrian/
├── cambrian/model/
│   ├── cambrian_arch.py     # Main architecture (SVA, MultimodalProjector)
│   ├── vision_sampler.py    # Vision sampler implementation
│   ├── multimodal_encoder/  # Vision encoders (SigLIP, CLIP, DINOv2, ConvNeXt)
│   ├── multimodal_projector/ # SVA projector
│   └── language_model/      # LLM backbones
├── cambrian/serve/          # Gradio web UI, controller, model worker
├── cambrian/train/          # Training scripts
├── dataengine/              # Internet Data Engine for science VQA
├── eval/                    # Evaluation suite (26 benchmarks)
└── inference.py             # Sample inference script
```

## HuggingFace Links

- Models: https://huggingface.co/collections/nyu-visionx/cambrian-1-models-666fa7116d5420e514b0f23c
- Data: https://huggingface.co/collections/nyu-visionx/cambrian-data-6667ce801e179b4fbe774e11
- CV-Bench: https://huggingface.co/datasets/nyu-visionx/CV-Bench
- Alignment Data: https://huggingface.co/datasets/nyu-visionx/Cambrian-Alignment
