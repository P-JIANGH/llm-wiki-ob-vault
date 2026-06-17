---
title: Fooocus — SDXL Image Generator
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/fooocus.md]
---

# Fooocus — SDXL Image Generator

**Fooocus** is an open-source, free, offline image generation tool by **lllyasviel** (the creator of ControlNet), built on the **Stable Diffusion XL** architecture with a Gradio-based UI. It is designed to be as simple as online image generators like Midjourney — users only need to focus on prompts, with minimal manual parameter tuning required.

The project is currently in **Limited Long-Term Support (LTS)** mode with bug fixes only, as SDXL-based functionality is considered stable. Users interested in newer architectures like Flux are directed to `ai-game-devtools/webui-forge` or [[comfyui]].

## Key Features

- **< 3 clicks from download to first image** — automatic model download on first launch
- **Minimal GPU requirement: 4GB VRAM** (Nvidia) + 8GB RAM
- **Offline GPT-2 prompt expansion** engine — produces high-quality results from short prompts like "house in garden"
- **Native refiner swap** inside single k-sampler — reuses base model momentum for coherent sampling
- **Custom inpaint model** (`inpaint_v26.fooocus.patch`) — outperforms standard SDXL inpaint
- **Negative ADM guidance** + Self-Attention Guidance — prevents plastic/overly smooth appearance
- **Multi-platform:** Windows (embedded Python), Linux (Conda/Venv/native), Mac (M1/M2 MPS), Colab, Docker
- **Preset system:** default/anime/realistic presets with different default models

## Technical Architecture

### Core Pipeline

Built on a mixture of [[stable-diffusion-webui]] (A1111) and [[comfyui]] codebases. Key modules:

| Module | Purpose |
|---|---|
| `modules/core.py` | Core pipeline operations |
| `modules/default_pipeline.py` | Default generation pipeline |
| `modules/async_worker.py` | Async task queue for generation |
| `modules/inpaint_worker.py` | Dedicated inpaint processing |
| `modules/lora.py` | LoRA loading and application |
| `modules/sdxl_styles.py` | Style templates |
| `extras/` | Face detection, upscaling utilities |

### Advanced Sampling Techniques

1. **Native refiner swap** in single k-sampler — continuity preserved vs. broken in A1111 hi-res fix
2. **Negative ADM guidance** — compensates for lack of CFG contrast at XL's highest resolution
3. **Self-Attention Guidance (SAG)** with anisotropic kernel — prevents plastic appearance
4. **DPM-family samplers** tuned for XL — balances detail and texture
5. **CFG Scale + TSNR correction** when CFG > 10

### Prompt Processing

- **Wildcard system:** `__color__ flower` — random from `wildcards/` files
- **Array processing:** ``red, green, blue`` — generates one image per element
- **Inline LoRAs:** `<lora:sunflowers:1.2>`
- **A1111-compatible weights:** `(text:1.5)`

### Default Models

| Preset | Model | Config |
|---|---|---|
| General | juggernautXL_v8Rundiffusion | default.json |
| Realistic | realisticStockPhoto_v20 | realistic.json |
| Anime | animaPencilXL_v500 | anime.json |

## Dependencies

Gradio 3.41.2, transformers, safetensors, accelerate, pytorch_lightning, opencv, einops, onnxruntime, rembg, groundingdino-py, segment_anything, pygit2

## Licensing

100% non-commercial, open-source software. Model weights have separate licenses (check individual models).

## Links

- GitHub: https://github.com/lllyasviel/Fooocus
- HuggingFace (inpaint model): https://huggingface.co/lllyasviel/fooocus_inpaint

## Relationships

- Created by **lllyasviel**, also the creator of [[controlnet]]
- Codebase mixes A1111 and [[comfyui]] concepts
- Shares image generation domain with [[flux]] (newer architecture) and [[disco-diffusion]]
- Forks available: RuinedFooocus, Fooocus-Control, Fooocus-MRE, mashb1t/Fooocus
- Game dev use: asset generation, inpainting/outpainting, FaceSwap for character consistency
