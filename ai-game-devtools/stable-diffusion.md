---
title: Stable Diffusion — Latent Diffusion Model
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, image-generation, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/stable-diffusion.md]
aliases: ["Stable Diffusion"]

---

# Stable Diffusion

**Stable Diffusion** is the foundational **latent text-to-image diffusion model** developed by CompVis (University of Heidelberg) in collaboration with Stability AI and Runway. Based on the CVPR 2022 paper "High-Resolution Image Synthesis with Latent Diffusion Models" (Rombach et al.), it sparked the open-source AI image generation revolution.

## What It Is

A **Latent Diffusion Model (LDM)** that operates in a compressed latent space rather than pixel space, making high-resolution image generation tractable on consumer GPUs. Uses a frozen CLIP ViT-L/14 text encoder for conditioning.

## Key Architecture

| Component | Detail |
|---|---|
| **UNet** | 860M parameters, cross-attention conditioned on text embeddings |
| **Text Encoder** | Frozen CLIP ViT-L/14, 123M parameters |
| **Autoencoder** | Downsampling factor 8 (image → H/8×W/8×4 latents) |
| **Total Params** | ~983M |
| **Training Resolution** | 256×256 pretrain → 512×512 finetune |
| **Minimum VRAM** | 10GB |

## Training

- **Data:** LAION-5B subsets (laion2B-en → laion-high-resolution → laion-aesthetics v2 5+)
- **Compute:** 256 A100 GPUs, ~150K GPU hours, 11,250 kg CO2 eq.
- **Optimizer:** AdamW, batch size 2048
- **Checkpoints:** v1.1 through v1.4, each progressively improving quality

## Supported Tasks

- **Text-to-Image:** Generate images from text prompts
- **Image-to-Image:** Modify images guided by text (SDEdit approach)
- **Inpainting:** Mask-based region modification
- **Upscaling:** Resolution enhancement

## Ecosystem Impact

Stable Diffusion became the **foundation for an entire ecosystem** of tools and models:

- [[controlnet]] — Adds spatial control (pose/depth/edge) to SD models
- [[comfyui]] — Node-based visual UI for SD pipelines
- [[sd-webui-controlnet]] — ControlNet extension for A1111 WebUI
- [[flux]] — Architectural successor by Stability AI alumni (flow matching vs diffusion)
- [[stable-cascade]] — Würstchen-based model with 16× efficiency improvement (compression factor 42 vs SD's 8)
- [[layer-diffusion]] — Native transparent layer generation for SDXL/SD1.5
- [[ic-light]] — Image relighting tool based on SD1.5 architecture

## License

CreativeML OpenRAIL M — permits research and commercial use with responsible AI restrictions. Includes Safety Checker Module and invisible watermarking for generated outputs.

## Key Links

- GitHub: https://github.com/CompVis/stable-diffusion
- Paper: https://arxiv.org/abs/2112.10752
- HuggingFace: https://huggingface.co/CompVis/stable-diffusion
- Original LDM: https://github.com/CompVis/latent-diffusion
