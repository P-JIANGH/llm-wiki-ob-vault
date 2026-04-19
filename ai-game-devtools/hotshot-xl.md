---
title: Hotshot-XL
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, ai, tool, image-generation]
sources: [raw/articles/ai-game-devtools/hotshot-xl.md]
---

# Hotshot-XL

AI text-to-GIF model trained to work alongside [[ai-game-devtools/stable-diffusion]] (SDXL). Developed by Natural Synthetics Inc.

## Overview

Hotshot-XL generates 1-second GIFs at 8 FPS (8 frames) from text prompts. Its key differentiator is **full compatibility with any fine-tuned SDXL model** — users can load their own SDXL-based LoRAs for personalized GIF generation without retraining Hotshot-XL itself.

## Key Facts

| Property | Value |
|----------|-------|
| **Output** | 1s GIF at 8 FPS (default) |
| **Resolution** | 512x512 recommended; 7 aspect ratios supported (320x768 to 768x320) |
| **License** | Apache-2.0 |
| **Framework** | diffusers 0.21.4 + PyTorch |
| **Authors** | John Mullan, Duncan Crawbuck, Aakash Sastry |
| **Year** | 2023 |
| **Web Demo** | https://www.hotshot.co |

## Architecture

Built on the SDXL UNet architecture with **temporal attention blocks** interleaved into the standard spatial layers:

- **UNet3DConditionModel** — 3D U-Net extending SDXL with temporal layers for video frame sequence modeling
- **Temporal Transformer** — models temporal dependencies across frames
- **Two Pipelines:** standard text-to-GIF and ControlNet-conditioned text-to-GIF
- **Schedulers:** EulerAncestralDiscreteScheduler (recommended), EulerDiscreteScheduler

## Technical Features

### Core Capabilities
- **Text-to-GIF** — standard prompt-based generation
- **Personalized LoRAs** — load any SDXL LoRA for custom subjects without retraining
- **ControlNet Support** — canny edge or depth map conditioning from source GIFs
- **Aspect Ratio Bucketing** — 7 trained ratios, arbitrary width/height supported
- **Spatial-Only Mode** — set `video_length=1` to generate still images

### Experimental Features
- Variable `video_length` (frame count) and `video_duration` (runtime in ms)
- Expected to be unstable/jittery outside training parameters (1s @ 8fps)

## Installation & Usage

```bash
pip install -r requirements.txt
python inference.py --prompt="..." --output="output.gif"

# With LoRA
python inference.py --prompt="..." --lora="path/to/lora" --output="output.gif"

# With ControlNet
python inference.py --prompt="..." --control_type="depth" --gif="source.gif" --output="output.gif"

# Fine-tuning
accelerate launch fine_tune.py --data_dir="dataset" --output_dir="output"
```

## Comparison with [[ai-game-devtools/animatediff]]

| Dimension | Hotshot-XL | AnimateDiff |
|-----------|-----------|-------------|
| **Base Model** | SDXL-specific | SD 1.5 (original) |
| **Approach** | Temporal UNet layers | Motion modules inserted into frozen SD UNet |
| **LoRA Compatibility** | Direct — any SDXL LoRA works | Requires motion module per base model |
| **ControlNet** | Native SDXL ControlNet support | Community adapters |
| **Frame Rate** | 8 FPS (1s default) | Variable, typically 8-16 FPS |
| **Resolution** | ~512x512 | ~512x512 |
| **License** | Apache-2.0 | Apache-2.0 |

## Links

- GitHub: https://github.com/hotshotco/Hotshot-XL
- HuggingFace: https://huggingface.co/hotshotco/Hotshot-XL
- SDXL-512 Fine-tune: https://huggingface.co/hotshotco/SDXL-512
- Web Demo: https://www.hotshot.co

## Further Work

- Fine-tuning at larger frame rates and resolutions
- Temporal layers for latent upscaler and VAE (reduce flickering)
- Multi-ControlNet support
- AITemplate integration for faster inference
- Image-conditioned frame prediction for longer coherent GIFs
