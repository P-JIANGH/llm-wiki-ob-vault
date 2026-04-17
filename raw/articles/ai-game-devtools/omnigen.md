# OmniGen: Unified Image Generation

**Source:** https://github.com/VectorSpaceLab/OmniGen
**Date:** 2026-04-17

## Overview

OmniGen is a unified image generation model that can generate a wide range of images from multi-modal prompts. It is designed to be simple, flexible, and easy to use. The core philosophy is that future image generation should be more simple and flexible — generating various images directly through arbitrarily multi-modal instructions without the need for additional plugins and operations, similar to how GPT works in language generation.

## Key Architecture

### Core Components (OmniGen/ package)
- **model.py** — OmniGen model (DiT-based): TimestepEmbedder (sinusoidal embeddings + MLP), FinalLayer (adaLN modulation + linear projection), OmniGen class (Phi3Config + Phi3Transformer backbone, revision from DiT architecture)
- **pipeline.py** — OmniGenPipeline: from_pretrained (HF download with snapshot_download), VAE encoding (SDXL VAE by default), __call__ (full generation pipeline with separate_cfg_infer for memory savings, CPU offload support, KV cache)
- **processor.py** — OmniGenProcessor: text + image tokenization, placeholder handling (`<img><|image_*|></img>` format)
- **transformer.py** — Phi3Config + Phi3Transformer: Phi-3 style transformer backbone
- **scheduler.py** — OmniGenScheduler: iterative denoising loop
- **train_helper/** — data.py, loss.py: training support

### API Design
- `OmniGenPipeline.from_pretrained("Shitao/OmniGen-v1")` — loads model from HF
- `pipe(prompt, input_images, height, width, guidance_scale, img_guidance_scale, ...)` — generates images
- Supports LoRA merging via `pipe.merge_lora(lora_path)`
- Supports CPU offload for memory-constrained environments

## Capabilities
1. **Text-to-Image** — standard prompt → image
2. **Multi-modal to Image** — text + reference image(s) → image (subject-driven generation)
3. **Identity-Preserving Generation** — keep facial identity from reference
4. **Image Editing** — modify existing images via text instructions
5. **Image-Conditioned Generation** — depth/pose/feature control from reference images
6. **Referring Expression Generation** — multiple images + simple language references → new composite

## Technical Specs
- **Backbone:** Phi-3 style transformer + DiT architecture
- **VAE:** StabilityAI SDXL VAE (auto-downloaded)
- **Parameters:** Model weights on HuggingFace (Shitao/OmniGen-v1)
- **Training:** LoRA fine-tuning supported (accelerate launch + train.py)
- **Dependencies:** torch<2.5, transformers>=4.45.2, diffusers>=0.30.3, timm, peft>=0.9.0
- **License:** MIT

## Notable Design Choices
- **No additional plugins needed** — Unlike ControlNet/IP-Adapter/Reference-Net paradigms, OmniGen auto-identifies features (objects, poses, depth) from input images based on text prompt
- **Image placeholder syntax** — `<img><|image_i|></img>` for multi-image input
- **Memory optimization** — `offload_model=True`, `separate_cfg_infer=True`, `offload_kv_cache=True`
- **Diffusers integration** — Available in HuggingFace Diffusers since 2025-02-12

## Versions
- OmniGen v1 (2024-10-22): Initial release, weights at Shitao/OmniGen-v1
- OmniGen2 (2025-06-16): Next generation released at https://github.com/VectorSpaceLab/OmniGen2

## X2I Dataset
Open-sourced 2024-12-14: https://huggingface.co/collections/yzwang/x2i-dataset-674c66d1d700f7f816a9590d

## Paper
arXiv:2409.11340 — "OmniGen: Unified Image Generation" (Xiao et al., 2024)

## Contributors
Shitao Xiao, Yueze Wang, Junjie Zhou, Huaying Yuan, Xingrun Xing, Ruiran Yan, Shuting Wang, Tiejun Huang, Zheng Liu
