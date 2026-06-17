---
title: MotionClone
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, tool, open-source, diffusion]
sources: [raw/articles/ai-game-devtools/motionclone.md]
---

# MotionClone

**Training-Free Motion Cloning for Controllable Video Generation**

arXiv: [2406.05338](https://arxiv.org/abs/2406.05338) | GitHub: [Bujiazi/MotionClone](https://github.com/Bujiazi/MotionClone) | [Project Page](https://bujiazi.github.io/motionclone.github.io/)

## Overview

MotionClone is a training-free framework that enables **motion cloning from a reference video** for controllable video generation. Unlike existing methods that require model training or fine-tuning to encode motion cues, MotionClone extracts motion representations directly from temporal attention maps in a single denoising step — **no inversion needed**.

## Key Innovation

The core insight: in temporal-attention maps of video diffusion models, the **dominant components drive motion synthesis** while the rest capture only noisy/subtle motions. MotionClone leverages this by:

1. **Sparse temporal attention as motion representation** — extract top-k attention weights from a reference video's denoising step
2. **Motion guidance via MSE loss** — during generation, constrain current temporal attention to match the cloned representation
3. **Single-step extraction** — bypasses the cumbersome DDIM inversion process used by prior methods

## Architecture

```
Reference Video → VAE Encode → Single Denoise Step → Extract Temporal Attn (top-k) → Save Motion Representation
                                                                                           ↓
Text Prompt + Noise → Denoise Loop → Compute Temporal Attn → MSE Loss vs Reference → Guide Generation
```

### Core Modules

| Component | Description |
|-----------|-------------|
| `AnimationPipeline` | Main inference pipeline, adapted from Tune-A-Video; integrates VAE/UNet/Text Encoder/Scheduler |
| `motionclone_functions.py` | Core logic: `obtain_motion_representation()` (extraction) + `compute_temp_loss()` (guidance) |
| `VanillaTemporalModule` | Temporal transformer with self-attention blocks (from [[animatediff]]) |
| `UNet3DConditionModel` | 3D UNet with temporal attention layers |
| `SparseControlNet` | Conditioning adapter for image-to-video and sketch-to-video modes |

### Supported Modes

| Mode | Entry Script | Config |
|------|-------------|--------|
| Text-to-Video (camera motion) | `t2v_video_sample.py` | `configs/t2v_camera.yaml` |
| Text-to-Video (object motion) | `t2v_video_sample.py` | `configs/t2v_object.yaml` |
| Image-to-Video | `i2v_video_sample.py` | `configs/i2v_rgb.yaml` |
| Sketch-to-Video | `i2v_video_sample.py` | `configs/i2v_sketch.yaml` |

## Technical Details

- **Base Model**: Stable Diffusion v1.5
- **Motion Module**: [[animatediff]] v3 (adapter + mm checkpoints)
- **Conditioning**: SparseCtrl (RGB + scribble variants)
- **Framework**: diffusers 0.16.0 + PyTorch 2.0.1 + xformers
- **Scheduler**: DDIM (configurable)
- **Motion Extraction**: Single denoising step at configurable noise level (`add_noise_step`)
- **VRAM**: Standard SD 1.5 requirements (~4-8 GB)

## Comparison with Related Tools

| Tool | Training Required | Motion Source | Key Difference |
|------|-------------------|---------------|----------------|
| MotionClone | **No** | Reference video temporal attention | Training-free, no inversion |
| [[animatediff]] | No (pre-trained module) | Text prompt only | General T2V, no motion cloning |
| [[cogvideox]] | No (pre-trained) | Text/image prompt | Dedicated video model, not motion transfer |
| Tune-A-Video | Yes (per-video fine-tuning) | Reference video | Requires fine-tuning per video |

## Authors

Pengyang Ling*, Jiazi Bu*, Pan Zhang†, Xiaoyi Dong, Yuhang Zang, Tong Wu, Huaian Chen, Jiaqi Wang, Yi Jin†

## License

Not specified in repository (no LICENSE file found). Academic research use implied.

## Key Facts

- Paper v4 released: 2024-10-08
- Code released: 2024-06-29
- Supports both global camera motion and local object motion cloning
- Notable for motion fidelity, textual alignment, and temporal consistency
