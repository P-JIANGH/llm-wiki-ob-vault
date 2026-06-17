# Fooocus — lllyasviel/Fooocus

**Source:** https://github.com/lllyasviel/Fooocus
**Date:** 2026-04-17
**Version:** 2.5.5

## Overview

Fooocus is an image generating software based on **Gradio** and the **Stable Diffusion XL** architecture. It presents a rethinking of image generator designs — the software is offline, open source, and free, while similar to online image generators like Midjourney, manual tweaking is not needed. Users only need to focus on prompts and images.

Key design goal: between pressing "download" and generating the first image, the number of mouse clicks is strictly limited to less than 3.

**Status:** Limited Long-Term Support (LTS) with bug fixes only. Built on SDXL; no plans to migrate to newer architectures like Flux (users recommended to use WebUI Forge or ComfyUI for that).

## Installation & Platform Support

- **Windows:** One-click 7z download with embedded Python, automatic model download
- **Linux:** Anaconda, Python Venv, or native system Python
- **Mac:** Apple Silicon (M1/M2) via PyTorch MPS device
- **AMD GPU:** DirectML (Windows) / ROCm (Linux) — beta support
- **Colab:** Free-tier compatible with `--always-high-vram`
- **Docker:** Official Dockerfile and docker-compose.yml
- **Minimal requirement:** 4GB VRAM + 8GB RAM (Nvidia), or 32GB RAM for CPU-only

## Features (Midjourney/LeonardoAI equivalents)

| Midjourney/LeonardoAI | Fooocus |
|---|---|
| High-quality text-to-image | Offline GPT-2 based prompt processing engine + sampling improvements |
| Vary (Subtle/Strong) | Input Image → Upscale or Variation → Vary |
| Pan (Up/Down/Left/Right) | Inpaint or Outpaint with dedicated inpaint model |
| Image Prompt | Custom image prompt algorithm (better than standard IP-Adapters) |
| --style | Advanced → Style |
| Prompt Weights | A1111 reweighting algorithm `(text:1.5)` |
| InsightFace | Image Prompt → Advanced → FaceSwap |
| Prompt Magic | Advanced → Style → Fooocus V2 |
| ControlNets | Image Prompt → Advanced (user-friendly interface) |

## Architecture & Technical Details

### Core Pipeline

- **Gradio-based UI** with web interface, supports `--listen` and `--share` modes
- **Automatic model download** on first launch
- **Preset system:** default/anime/realistic presets with different model configs
- **Custom inpaint model:** `inpaint_v26.fooocus.patch` (1.28GB) — outperforms standard SDXL inpaint
- **Offline GPT-2 prompt expansion** engine — similar to Midjourney's hidden pre-processing

### Advanced Techniques (SDXL-based)

1. **GPT-2 prompt expansion** as dynamic style "Fooocus V2" (similar to Midjourney raw mode)
2. **Native refiner swap** inside single k-sampler — reuses base model momentum for coherent sampling
3. **Negative ADM guidance** — compensates for lack of CFG contrast in XL's highest resolution level
4. **Self-Attention Guidance** (SAG) variant — carefully tuned, prevents overly smooth/plastic appearance
5. **Anisotropic kernel** for SAG (better structure preservation vs Gaussian)
6. **Carefully tuned sampler parameters** — DPM family well-suited for XL
7. **CFG Scale and TSNR correction** tuned for SDXL when CFG > 10
8. **A1111 prompt normalization** — better compatibility with Civitai prompts

### Key Modules

- `modules/core.py` — Core pipeline operations
- `modules/default_pipeline.py` — Default generation pipeline
- `modules/async_worker.py` — Async task queue for image generation
- `modules/inpaint_worker.py` — Dedicated inpaint processing
- `modules/lora.py` — LoRA loading and application
- `modules/model_loader.py` — Model checkpoint management
- `modules/sdxl_styles.py` — Style templates
- `modules/ops.py` — Core operations
- `modules/config.py` — Configuration management
- `modules/patch.py` — Model patching utilities
- `extras/` — Additional utilities (face detection, upscaling, etc.)

### Configuration

- Config stored in `config.txt` (auto-generated after first launch)
- Supports all model paths, default LoRAs, sampler settings, presets
- 40+ command-line flags for advanced control
- Preset files: `default.json`, `anime.json`, `realistic.json`, `lcm.json`, `lightning.json`, etc.

### Command-Line Flags

Supports `--listen`, `--port`, `--share`, `--preset`, `--language`, `--directml`, `--always-high-vram`, `--always-low-vram`, `--always-cpu`, `--disable-xformers`, `--attention-pytorch`, `--unet-in-bf16`, `--unet-in-fp8-e4m3fn`, `--vae-in-fp16`, and many more precision/performance options.

## Prompt Features

- **Wildcards:** `__color__ flower` — random selection from `wildcards/` files
- **Array Processing:** `[[red, green, blue]] flower` — generates one image per element
- **Inline LoRAs:** `flower <lora:sunflowers:1.2>` — applies LoRA inline
- **Prompt Weights:** `(I am happy:1.5)` — A1111-compatible reweighting
- **Embedding:** `(embedding:file_name:1.1)`

## Default Models

| Preset | Main Model | Config |
|---|---|---|
| General | juggernautXL_v8Rundiffusion | presets/default.json |
| Realistic | realisticStockPhoto_v20 | presets/realistic.json |
| Anime | animaPencilXL_v500 | presets/anime.json |

## Dependencies

Core: pytorch, gradio 3.41.2, transformers 4.42.4, safetensors, accelerate, pytorch_lightning, opencv, einops, scipy, numpy, PIL, timm, onnxruntime, rembg, groundingdino-py, segment_anything, pygit2

## License

GPL v3 (inferred from codebase mixing A1111 + ComfyUI)

## Forks

Official forks include: fenneishi/Fooocus-Control, runew0lf/RuinedFooocus, MoonRide303/Fooocus-MRE, mashb1t/Fooocus

## Game Dev Relevance

- **Game asset generation:** High-quality concept art, textures, UI elements from text prompts
- **NPC portrait generation:** Character face generation with style control
- **Inpainting/Outpainting:** Extend or modify existing game assets
- **FaceSwap:** Consistent character identity across different scenes
- **ControlNet support:** Structural conditioning for precise asset placement
- **Low hardware requirement:** 4GB VRAM makes it accessible to indie devs
