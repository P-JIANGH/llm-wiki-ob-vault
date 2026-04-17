---
title: Skywork UniPic
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, autoregressive, open-source, tool, ai, multimodal]
sources: [raw/articles/ai-game-devtools/skywork-unipic.md]
---

# Skywork UniPic

**Skywork UniPic** is an open-source multi-image editing model suite from SkyworkAI, offering a unified multimodal framework for image editing, generation, and visual understanding across three distinct modeling paradigms.

## Model Variants

| Variant | Parameters | Architecture | Key Feature |
|---------|-----------|-------------|-------------|
| UniPic-3 | — | Diffusion + CM/DMD distillation | 1–6 input images, 8-step inference (12.5× speedup) |
| UniPic-2 | — | Diffusion post-training (SD3.5M-Kontext) | Text-to-image, fine-grained editing |
| UniPic-1 | 1.5B | Autoregressive Transformer | Joint perception & synthesis in single model |

## Key Capabilities

- **Multi-image composition:** Supports 1–6 concurrent input images with flexible resolutions
- **Fast inference:** CM + DMD distillation reduces generation to 8 steps (12.5× faster than baseline)
- **Dual paradigms:** Both diffusion-based (UniPic-2/3) and autoregressive (UniPic-1) approaches available
- **Open weights:** Full model weights, configs, and inference code released under MIT License

## Release History

- **2026-01-09:** UniPic-3 — Multi-image editing with distillation
- **2025-08-13:** UniPic-2 — Diffusion post-training variants
- **2025-07-30:** UniPic-1 — Autoregressive unified modeling (1.5B params)

## Technical Details

- **License:** MIT
- **GitHub:** <https://github.com/SkyworkAI/UniPic>
- **HuggingFace:** [UniPic-3](https://huggingface.co/collections/Skywork/skywork-unipic3) · [UniPic-2](https://huggingface.co/collections/Skywork/skywork-unipic2-6899b9e1b038b24674d996fd) · [UniPic-1](https://huggingface.co/collections/Skywork/skywork-unipic-6888c0789cdb82457b2acf32)
- **Papers:** [arXiv:2601.15664](https://arxiv.org/abs/2601.15664) · [arXiv:2509.04548](https://arxiv.org/abs/2509.04548) · [arXiv:2508.03320](https://arxiv.org/abs/2508.03320)

## Relationships

Part of the broader [[image-generation]] tool ecosystem. Uses [[diffusion]] paradigms (UniPic-2/3) alongside [[autoregressive]] modeling (UniPic-1). Compared to [[hunyuan-image-3-0]] and [[kolors]], UniPic emphasizes multi-image editing and distillation-based speedup.
