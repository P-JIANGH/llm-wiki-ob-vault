---
title: EMOPortraits
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, open-source, python, multimodal, diffusion]
sources: [raw/articles/ai-game-devtools/emoportraits.md]
---

# EMOPortraits

**Emotion-enhanced Multimodal One-shot Head Avatars**

## Overview

EMOPortraits generates realistic and expressive one-shot head avatars driven by multimodal inputs, with a focus on capturing extreme and asymmetric emotions. Given a single source portrait image and a driving video, it produces an animated head avatar that faithfully transfers both motion and nuanced emotional expressions.

Paper: [arXiv 2404.19110](https://arxiv.org/abs/2404.19110) | [Project Page](https://neeek2303.github.io/EMOPortraits/)

## Technical Architecture

### Two-Stage Pipeline
1. **Stage 1 — Basic Volumetric Avatar**: Constructs a 3D volumetric representation from a single source image using a volumetric avatar model (VA). Encodes head pose, expression, and appearance into a latent space.
2. **Stage 2 — Emotion Enhancement**: Refines the avatar with emotion-specific details, incorporating the latent emotion space trained on the `FEED dataset` (though this page doesn't exist yet, we note the relationship).

### Key Components
- **Volumetric Avatar Network**: 3D-aware head representation with pose regression
- **Basic Avatar Network**: Foundation feature extraction
- **Head Pose Regressor**: Extracts 6-DOF head pose from driving frames
- **Multi-Loss Training**: L1 (eyes/mouth/ears regions), VGG19 perceptual, ResNet18 face verification, expression pull/push losses, volumes L1, gaze model loss

### Training Setup
- **Primary Dataset**: VoxCeleb2 HQ (high-quality version, no longer publicly available)
- **Emotion Dataset**: `FEED` — extreme and asymmetric facial expressions
- **Secondary Dataset**: MEAD — additional facial diversity
- **Framework**: PyTorch with DDP (up to 8 GPUs) or Apex parallel training
- **Logging**: Weights & Biases (wandb)

### Usage
```bash
python run_video_driven_pipeline.py \
  --source_image_path data/person1.jpg \
  --driven_video_path data/driver.mp4 \
  --saved_to_path output/animated_result.mp4 \
  --fps 30 --max_len 150
```

## Project Structure
```
models/stage_1/     # Basic volumetric avatar
models/stage_2/     # Emotion enhancement
networks/basic_avatar/
networks/volumetric_avatar/
networks/head_pose_regressor.py
losses/             # Custom losses + gaze models
datasets/           # VoxCeleb2 HQ, FEED, MEAD loaders
```

## Comparison with Similar Tools

- vs [[echomimic]]: EchoMimic uses SD v1.5 diffusion + Whisper audio encoding for audio-driven animation; EMOPortraits uses volumetric 3D representation with video-driven motion + explicit emotion latent space
- vs [[aniportrait]]: AniPortrait uses 3DMM parameters + AnimateDiff Motion Module for audio-driven generation; EMOPortraits focuses on video-driven transfer with emotion enhancement from the FEED dataset
- vs [[dreamtalk]]: DreamTalk uses diffusion models (DDPM/DDIM) with Wav2Vec2 audio encoding; EMOPortraits uses a two-stage volumetric approach trained on HQ data

## Limitations
- Repository maintained for demonstration; author no longer in academia
- Original HQ VoxCeleb2 training data no longer available
- Only video-driven pipeline currently supported (no audio-driven mode)
- Requires manual installation of 3 additional repos (face_detection, roi_tanh_warping, face_parsing)

## License
Research/academic use (no explicit LICENSE file in repo)

## Related
- [[echomimic]]
- [[aniportrait]]
- [[dreamtalk]]
