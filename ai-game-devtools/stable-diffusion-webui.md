---
title: Stable Diffusion web UI
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/stable-diffusion-webui.md]
---

# Stable Diffusion web UI

**Stable Diffusion web UI** (commonly known as **AUTOMATIC1111 WebUI**) is the most popular open-source web interface for running [[stable-diffusion]] models locally. Built with Gradio, it democratized AI image generation by providing an accessible one-click install and run experience.

## Overview

A comprehensive web application that wraps Stable Diffusion models with an intuitive Gradio-based UI. Supports txt2img, img2img, inpainting, outpainting, upscaling, face restoration, and many advanced features. The project spawned an entire ecosystem of extensions and derivative interfaces.

## Key Features

| Feature | Description |
|---------|-------------|
| txt2img / img2img | Core generation modes |
| Inpainting / Outpainting | Partial image editing and extension |
| Attention weighting | `((keyword))` / `(keyword:1.21)` syntax |
| X/Y/Z plot | Parameter sweep visualization |
| Negative prompt | Exclude unwanted elements |
| Checkpoint merger | Merge up to 3 checkpoints |
| LoRA / Hypernetwork | Fine-tuning model integration |
| Extensions | Community plugin ecosystem |
| REST API | Programmatic access |

## Architecture

- **Framework:** Python + Gradio (web UI)
- **Core pipeline:** `modules/processing.py` (1792 lines) handles generation workflow
- **Model loading:** `sd_models.py` with safetensors support
- **Samplers:** Multiple implementations (Euler, DDIM, DPM++, UniPC, etc.)
- **Optimizations:** xformers, sub-quadratic attention, float32 precision fallback
- **VRAM management:** LowVRAM mode, works on 4GB (2GB reported)
- **API:** FastAPI-based REST endpoints in `modules/api/`

## Platform Support

- **NVidia** (recommended, full feature set)
- **AMD** (DirectML/Rocm)
- **Intel** (CPU + GPU via OpenVINO)
- **Apple Silicon** (MPS backend)
- **Ascend NPUs**

## License

AGPL-3.0

## Relationship to Other Tools

- Based on the [[stable-diffusion]] latent diffusion model
- The [[comfyui]] project emerged as a node-based alternative to this tab-based UI
- [[sd-webui-controlnet]] started as an extension for this project
- [[flux]] and other newer models have their own interfaces, but this UI remains the reference implementation
- The [[stable-diffusion-cpp]] project provides C++ inference as a lighter-weight alternative

## Impact

This project is widely considered the gateway tool that brought Stable Diffusion to mainstream users. Its extension system and API design influenced countless derivative projects. The project's wiki and documentation set a standard for open-source AI tool usability.
