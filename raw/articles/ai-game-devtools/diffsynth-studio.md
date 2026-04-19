# DiffSynth-Studio — Source Analysis

**Source**: https://github.com/modelscope/DiffSynth-Studio
**Mirror cloned from**: https://gitcode.com/modelscope/DiffSynth-Studio
**Analyzed**: 2026-04-20

## Project Overview

DiffSynth-Studio is an open-source Diffusion model engine developed by the ModelScope Community. It focuses on aggressive technical exploration, targeting academia and providing cutting-edge model capability support. The companion project DiffSynth-Engine focuses on stable model deployment for industry use.

## Installation

```bash
git clone https://github.com/modelscope/DiffSynth-Studio.git
cd DiffSynth-Studio
pip install -e .
```

Package: `diffsynth` v2.0.9 on PyPI
License: Apache-2.0
Python: >=3.10.1

## Core Architecture

```
diffsynth/
├── configs/        # Configuration files
├── core/           # Core engine components
├── diffusion/      # Diffusion model implementations
├── models/         # Model definitions
├── pipelines/      # Inference/training pipelines (z_image, flux2_image, qwen_image, etc.)
├── utils/          # Utilities
└── version.py      # Version info
```

## Key Features

### VRAM Management
- Layer-level disk offload — releases both memory and VRAM simultaneously
- FP8 precision support for non-training models during training
- Sequence parallelism support
- Models can run with as little as 6-8 GB VRAM with CPU offloading

### Training Framework
- **Split Training**: Automatically splits into data processing + training stages
- **Differential LoRA Training**: LoRA training technique from ArtAug
- **FP8 Training**: Applied to any non-training model during training

### Supported Model Families (as of April 2026)
1. **Image Generation**: Z-Image (Turbo), FLUX.1/2, Anima, Qwen-Image, ERNIE-Image, JoyAI-Image
2. **Video Generation**: Wan 2.1/2.2, HunyuanVideo, CogVideoX, StepVideo, LTX-2, MOVA
3. **Editing**: Qwen-Image-Edit, In-Context Control, Blockwise ControlNet
4. **Specialized**: EliGen (entity-level control), Nexus-Gen (unified understanding+generation), ArtAug

### Training Support per Model
Each major model supports: inference, low-VRAM inference, full training, LoRA training, and validation

## Update History (Key Milestones)

| Date | Event |
|------|-------|
| 2023-10-01 | FastSDXL (early version) released |
| 2023-08-29 | DiffSynth video synthesis framework proposed |
| 2023-11-15 | FastBlend video deflickering algorithm proposed |
| 2024-01-29 | Diffutoon cartoon coloring solution proposed |
| 2024-06-21 | ExVideo: extended SVD to 128-frame long video |
| 2024-08-21 | FLUX support added |
| 2024-08-22 | CogVideoX-5B support added |
| 2024-12-18 | ArtAug method for FLUX.1-dev |
| 2024-12-31 | EliGen entity-level controlled generation |
| 2025-02-25 | Wan-Video series support |
| 2025-02-17 | StepVideo support |
| 2025-07-28 | Wan 2.2 support |
| 2025-12-04 | DiffSynth-Studio 2.0 released |
| 2026-04-14 | JoyAI-Image open-sourced |

## Related Projects
- [DiffSynth-Engine](https://github.com/modelscope/DiffSynth-Engine) — production deployment engine
- [Nexus-Gen](https://github.com/modelscope/Nexus-Gen) — unified image understanding/generation/editing
- [EliGen](https://arxiv.org/abs/2501.01097) — entity-level controlled image generation
- [ExVideo](https://arxiv.org/abs/2406.14130) — extended video generation to 128 frames
- [FastBlend](https://arxiv.org/abs/2311.09265) — video deflickering algorithm
- [Diffutoon](https://arxiv.org/abs/2401.16224) — cartoon coloring solution (IJCAI 2024)

## Dependencies
- torch>=2.0.0, torchvision, transformers
- imageio, safetensors, einops, sentencepiece, protobuf
- modelscope, ftfy, pandas, accelerate, peft, datasets
