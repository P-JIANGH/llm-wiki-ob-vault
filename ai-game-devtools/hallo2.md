---
title: Hallo2
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, video, audio, diffusion, open-source, ai-model]
sources: [raw/articles/ai-game-devtools/hallo2.md]
---

# Hallo2

## Overview

Hallo2 is an **audio-driven portrait image animation** system that generates long-duration, high-resolution talking-face videos from a single portrait image and a driving audio track. Published at **ICLR 2025**, developed by the Generative Vision Lab at Fudan University in collaboration with Baidu and Nanjing University.

**GitHub:** [fudan-generative-vision/hallo2](https://github.com/fudan-generative-vision/hallo2)

## Key Capabilities

| Dimension | Detail |
|-----------|--------|
| **Duration** | Up to 1 hour of continuous animation (e.g., Taylor Swift NYU speech 23 min, Stanford LLM course up to 1 hour) |
| **Resolution** | Up to 4K output |
| **Input** | Single square portrait image (face 50-70%, front-facing <30°) + WAV audio (English) |
| **Output** | Talking-face video with synchronized lip/face/pose motion |
| **Publication** | ICLR 2025 (arXiv:2410.07718) |

## Architecture

Hallo2 uses a **two-stage pipeline**:

1. **Stage 1 — Long-Duration Animation:** Diffusion-based generation using:
   - Denoising UNet + Face Locator + Image/Audio projection modules
   - AnimateDiff v2 motion module for temporal consistency
   - Wav2Vec audio embeddings + InsightFace face embeddings
   - Stable Diffusion V1.5 as base model

2. **Stage 2 — Video Super-Resolution:** High-res upscaling using:
   - CodeFormer-based face enhancement
   - RealESRGAN background upsampling (2x/4x)

### Key Components

- **Audio processing:** Kim_Vocal_2 MDX-Net separates vocals from background music
- **Face detection:** InsightFace (2D/3D analysis) + MediaPipe Face Landmarker
- **Motion modeling:** AnimateDiff v2 temporal attention
- **Training framework:** HuggingFace Accelerate (distributed multi-GPU/multi-node)

## Usage

```bash
# Long-duration animation
python scripts/inference_long.py --config ./configs/inference/long.yaml

# High-resolution upscaling
python scripts/video_sr.py --input_path [video] --output_path [dir] \
  --bg_upsampler realesrgan --face_upsample -w 0.5 -s 4
```

## Technical Stack

- **Framework:** PyTorch 2.2.2, CUDA 11.8, diffusers 0.32.2
- **Tested GPU:** A100
- **OS:** Ubuntu 20.04/22.04
- **Web UI:** Gradio 4.36.1

## License

Main code license not explicitly stated in README. Video SR component (CodeFormer-based) uses S-Lab License 1.0. Pretrained models have their respective licenses.

## Related Projects

- [[ai-game-devtools/aniportrait]] — Another audio-driven talking-face animation project, acknowledged by Hallo2 authors
- [[ai-game-devtools/echomimic]] — Similar audio-driven portrait animation approach
- [[ai-game-devtools/dreamtalk]] — Emotional talking face generation

## Links

- [GitHub](https://github.com/fudan-generative-vision/hallo2)
- [Project Page](https://fudan-generative-vision.github.io/hallo2/)
- [Paper (arXiv)](https://arxiv.org/abs/2410.07718)
- [HuggingFace Models](https://huggingface.co/fudan-generative-ai/hallo2)
