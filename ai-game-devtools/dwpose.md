---
title: DWPose
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, ml, tool, python, open-source, pose-estimation, controlnet, image]
sources: [raw/articles/ai-game-devtools/dwpose.md]
---

# DWPose

**Effective Whole-body Pose Estimation with Two-stages Distillation**

GitHub: https://github.com/idea-research/dwpose
Paper: https://arxiv.org/abs/2307.15880 (ICCV 2023, CV4Metaverse Workshop)
License: Apache 2.0

## Overview
DWPose is a whole-body pose estimation framework developed by IDEA-Research that replaces OpenPose in the ControlNet pipeline. It detects human body, face, hands, and feet keypoints with significantly higher accuracy than OpenPose, producing superior pose condition maps for Stable Diffusion image generation.

## Architecture
- **Two-Stage Knowledge Distillation:**
  - Stage 1: Large teacher model trained on UBody dataset, knowledge distilled to student
  - Stage 2: Further distillation on COCO-WholeBody for refinement
- **RTMPose Backbone:** Built on MMPose's RTMPose architecture for efficient pose estimation
- **YOLOX Detector:** Human detection pre-processing before pose estimation
- **ONNX Export:** Inference via ONNX Runtime or OpenCV's ONNX backend (no mmcv required at runtime)

## Model Variants

| Model | Input | FLOPS | Body AP | Hand AP | Face AP | Whole AP |
|-------|-------|-------|---------|---------|---------|----------|
| DWPose-t | 256×192 | 0.5G | 0.585 | 0.357 | 0.735 | 0.485 |
| DWPose-s | 256×192 | 0.9G | 0.633 | 0.427 | 0.776 | 0.538 |
| DWPose-m | 256×192 | 2.2G | 0.685 | 0.527 | 0.828 | 0.606 |
| DWPose-l | 256×192 | 4.5G | 0.704 | 0.566 | 0.843 | 0.631 |
| DWPose-l | 384×288 | 10.1G | 0.722 | 0.621 | 0.887 | 0.665 |

## ControlNet Integration
- Preprocessor identifier: `dw_openpose_full`
- Required ONNX models:
  - Pose model: `dw-ll_ucoco_384.onnx`
  - Detection model: `yolox_l.onnx`
- Supported in sd-webui-controlnet >= v1.1237
- Direct drop-in replacement for OpenPose preprocessor
- Also integrated into [[ai-game-devtools/animate-anyone]] for character animation

## Key Timeline
- **2023-07:** Paper published on arXiv
- **2023-08-07:** ONNX models released on HuggingFace
- **2023-08-09:** sd-webui-controlnet support added
- **2023-08-17:** Accepted by ICCV 2023 CV4Metaverse Workshop
- **2023-12-03:** Support for Animate Anyone character animation pipeline

## Comparison with OpenPose
- DWPose achieves **~30% higher Whole AP** (0.665 vs ~0.51 for OpenPose)
- Better hand and face keypoint detection (OpenPose has limited face/hand coverage)
- Produces cleaner, more accurate skeleton maps for ControlNet conditioning
- Comparable inference speed via ONNX optimization

## Game Development Relevance
- **NPC pose control:** Use DWPose to extract character poses from reference images/videos, feed to ControlNet for generating game character concept art in specific poses
- **Animation reference:** Extract pose sequences from motion capture or video for 2D game animation frames
- **Character consistency:** Maintain consistent character appearance across different poses when generating game assets with Stable Diffusion

## Related
- [[ai-game-devtools/controlnet]] — DWPose replaces OpenPose as the preprocessor in ControlNet
- [[ai-game-devtools/openpose-editor]] — Alternative pose editing tool (manual editing vs. automatic detection)
- [[ai-game-devtools/mmpose]] — Underlying framework that DWPose is built on
