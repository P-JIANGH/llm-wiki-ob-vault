---
title: FLUX — Black Forest Labs
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/flux.md]
---

# FLUX — Black Forest Labs

**FLUX** is the open-weight image generation model family by **Black Forest Labs** (https://bfl.ai), founded by Stability AI alumni including Robin Rombach (co-author of Stable Diffusion). The GitHub repo provides minimal inference code for image generation and editing with FLUX open-weight models.

## Model Family

| Model | Capability | License |
|-------|-----------|---------|
| FLUX.1 [schnell] | Text to Image | Apache 2.0 |
| FLUX.1 [dev] | Text to Image | FLUX.1-dev Non-Commercial |
| FLUX.1 Fill [dev] | In/Out-painting | FLUX.1-dev Non-Commercial |
| FLUX.1 Canny [dev] | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Depth [dev] | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Redux [dev] | Image Variation | FLUX.1-dev Non-Commercial |
| FLUX.1 Kontext [dev] | Image Editing | FLUX.1-dev Non-Commercial |
| FLUX.1 Krea [dev] | Text to Image | FLUX.1-dev Non-Commercial |

## Architecture

FLUX uses a **Transformer-based flow matching** architecture on sequences (DiT-style), featuring a dual-stream design:

- **DoubleStreamBlock** layers — Process text and image streams in parallel, enabling rich cross-modal interaction
- **SingleStreamBlock** layers — Unified processing after streams are concatenated
- **MLP timestep embedding** with optional guidance embedding for distilled models
- **Built-in LoRA** support (LinearLora) for parameter-efficient fine-tuning
- **TensorRT engine** support with BF16/FP8/FP4 precision exports for NVIDIA GPU acceleration

The autoencoder weights are released separately under Apache 2.0.

## Key Modules

- `src/flux/model.py` — Core Flux transformer architecture
- `src/flux/sampling.py` — Flow matching sampling
- `src/flux/modules/` — Layers (Double/Single stream), autoencoder, conditioner, image embedders, LoRA
- `src/flux/trt/` — TensorRT engine configs (T5, CLIP, VAE, Transformer)
- CLI variants: `t2i`, `control`, `fill`, `redux`, `kontext`

## Interfaces

- **CLI**: `python -m flux t2i --name <name>` for text-to-image generation
- **Gradio demo**: Interactive web UI with model selection and offloading
- **Streamlit demo**: Text-to-image + image-to-image web app
- **BFL API**: docs.bfl.ai (commercial, includes Pro tier models)
- **🧨 Diffusers**: `FluxPipeline` integration for ecosystem compatibility

## Licensing

- **FLUX.1 [schnell]**: Apache 2.0 — fully open-source, commercial use allowed
- **FLUX.1 [dev] family**: FLUX.1-dev Non-Commercial License — research/personal use only
- **Commercial licensing**: Available at https://bfl.ai/pricing/licensing with usage-based pricing
- **Autoencoder**: Apache 2.0

## Game Dev Use Cases

- **NPC/asset generation**: schnell variant for rapid prototyping of game art
- **Texture creation**: dev variants with ControlNet-style conditioning for structured asset generation
- **In-painting/out-painting**: Fill variant for extending or modifying existing game assets
- **Image variation**: Redux for generating multiple art style variants from a single reference

## Links

- GitHub: https://github.com/black-forest-labs/flux
- HuggingFace: https://huggingface.co/black-forest-labs/
- API Docs: https://docs.bfl.ai/
- Paper: arXiv:2506.15742 (FLUX.1 Kontext)
- Commercial Licensing: https://bfl.ai/pricing/licensing

## Relationships

- Founded by Stability AI alumni — architectural successor to [[stable-diffusion]] research lineage
- Complements [[comfyui]] as a model that can be integrated into ComfyUI workflows
- Competes with [[disco-diffusion]] in the open-weight image generation space, but uses flow matching rather than CLIP-guided diffusion
