# StableVideo — Raw Source

> Source: https://github.com/rese1f/stablevideo
> Paper: ICCV 2023 — "StableVideo: Text-driven Consistency-aware Diffusion Video Editing"
> Authors: Wenhao Chai, Xun Guo, Gaoang Wang, Yan Lu

## Overview

StableVideo is a text-driven, consistency-aware diffusion video editing tool.
It allows users to edit specific regions of a video using text prompts while
maintaining temporal and spatial consistency across frames.

## Key Architecture

The project is built on two foundational works:
- **Text2LIVE** (omerbt/Text2LIVE): Provides the Neural Layered Atlases (NLA)
  for decomposing video into foreground/background atlases, enabling region-
  specific editing.
- **ControlNet** (lllyasviel/ControlNet): Provides conditional diffusion control
  via canny edge and depth map conditions.

### Core Components

1. **StableVideo class** (app.py, 448 lines): Main application class managing
   canny model, depth model, and image-to-image editing pipelines.

2. **AtlasData** (stablevideo/atlas_data.py): Handles Neural Layered Atlas
   decomposition — loads pre-computed NLA checkpoints, provides original video,
   cropped foreground atlas, and background grid atlas.

3. **AGGNet** (stablevideo/aggnet.py): Aggregation Network for consistency-
   aware feature fusion across video frames.

4. **ControlNet Models** (cldm/): Custom CLDM (ControlLatentDiffusionModel)
   implementations for canny and depth conditional editing.

5. **DDIM Sampler** (ldm/models/diffusion/ddim.py): Denoising Diffusion
   Implicit Models sampler for efficient inference.

6. **Annotators** (annotator/): Canny edge detector and MiDaS depth estimator
   for generating conditioning maps.

### Pipeline

1. Load video → NLA decomposes into foreground/background atlases
2. User edits foreground atlas (e.g., via text prompt in Gradio UI)
3. ControlNet (canny or depth) conditions the diffusion process
4. AGGNet aggregates features for temporal consistency
5. Re-rendered video output with consistent editing across frames

### VRAM Requirements

| Mode | VRAM (MiB) |
|------|------------|
| float32 | 29,145 |
| amp | 23,005 |
| amp + cpu | 17,639 |
| amp + cpu + xformers | 14,185 |

## Dependencies

- Python 3.11, PyTorch 2.0.1, CUDA 11.7
- Gradio 3.40.1 (web UI)
- OpenCV, Pillow, einops, transformers
- PyTorch Lightning 1.5.0
- open-clip-torch 2.20.0
- xformers (optional, reduces VRAM)

## License

MIT License

## Installation

```bash
git clone https://github.com/rese1f/StableVideo.git
conda create -n stablevideo python=3.11
pip install -r requirements.txt
# Optional: pip install xformers (reduces VRAM by ~3GB)
```

## Pretrained Models

Models downloaded from ControlNet HuggingFace:
- cldm_v15.yaml (model config)
- dpt_hybrid-midas-501f0c75.pt (depth estimator)
- control_sd15_canny.pth (canny ControlNet weights)
- control_sd15_depth.pth (depth ControlNet weights)

## Example Videos

Downloaded from Text2LIVE authors' Dropbox (car-turn, boat, libby, blackswan,
bear, bicycle_tali, giraffe, kite-surf, lucia, motorbike).

## Key Differences from Similar Tools

- vs [[ai-game-devtools/controlnet]]: ControlNet provides single-image conditional
  generation; StableVideo extends this to video with temporal consistency
- vs [[ai-game-devtools/stable-diffusion]]: SD is image-only; StableVideo adds
  NLA-based video decomposition for frame-consistent editing
- vs Text2LIVE: Text2LIVE uses CLIP-guided editing without diffusion; StableVideo
  combines NLA decomposition with ControlNet's diffusion control for higher quality
