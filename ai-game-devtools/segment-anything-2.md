---
title: SAM 2 (Segment Anything Model 2)
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, ml, open-source, vision, computer-vision]
sources: [raw/articles/ai-game-devtools/segment-anything-2.md]
---

# SAM 2 (Segment Anything Model 2)

## Overview
SAM 2 (Segment Anything Model 2) is a foundation model by **Meta AI (FAIR)** for promptable visual segmentation in images and videos. It extends the original SAM to video by treating images as single-frame videos, using a streaming memory architecture for real-time processing.

**GitHub:** https://github.com/facebookresearch/segment-anything-2
**License:** Apache 2.0
**Organization:** `facebook-research` (Meta FAIR)

## Architecture
- **Transformer-based**: Simple transformer architecture with streaming memory
- **Real-time video processing**: Processes video frames sequentially with persistent memory state
- **Data engine**: Model-in-the-loop pipeline that iteratively improves through user interaction
- **SA-V Dataset**: Largest video segmentation dataset collected through the data engine

## Model Variants (SAM 2.1 & SAM 2)

Four size variants with Hiera backends:

| Model | Parameters | Speed (FPS) | SA-V (J&F) | MOSE (J&F) |
|-------|-----------|-------------|------------|------------|
| hiera_tiny | 38.9M | 91.2 | 76.5 | 71.8 |
| hiera_small | 46.0M | 84.8 | 76.6 | 73.5 |
| hiera_base_plus | 80.8M | 64.1 | 78.2 | 73.7 |
| hiera_large | 224.4M | 39.5 | 79.5 | 74.6 |

Speed measured on A100 GPU (torch 2.5.1, CUDA 12.4).

## System Requirements
- Python >= 3.10
- PyTorch >= 2.5.1
- TorchVision >= 0.20.1
- Windows: WSL with Ubuntu recommended

## Key APIs
- **SAM2ImagePredictor**: Prompt-based image segmentation (point/box/mask prompts)
- **SAM2VideoPredictor**: Video segmentation with multi-object tracking via inference state
- **HuggingFace Hub**: Direct model loading via `huggingface_hub`
- **Automatic mask generation**: Identical API to original SAM

## Features
- Click/box prompt segmentation
- Mask refinement
- Multi-object tracking in video
- Full model compilation for VOS speedup
- Web demo (open-sourced frontend + backend)
- Custom training support (image, video, mixed datasets)

## Release History
- **2024-12-11**: Full model compilation for VOS speedup + SAM2VideoPredictor for multi-object tracking
- **2024-09-30**: SAM 2.1 Developer Suite (improved checkpoints, training code, web demo)
- **2024-07-29**: SAM 2 initial release

## Game Development Relevance
- **NPC/object segmentation**: Segment characters, items, or UI elements from game footage
- **Video analysis**: Track player actions or game events in recorded gameplay
- **Asset extraction**: Automatically segment sprites/textures from game screenshots
- **Motion capture**: Track body parts in video for animation reference
- **Real-time processing**: 91 FPS (tiny model) enables live video segmentation

## Related Tools
- [[ai-game-devtools/grounded-segment-anything]] — Combines GroundingDINO + SAM for open-vocabulary segmentation (text prompt → mask)
- [[ai-game-devtools/evf-sam]] — Efficient Vision-Language SAM: adds text understanding to SAM segmentation
- [[ai-game-devtools/depth-anything-v2]] — Depth estimation model, complementary for 3D understanding
- [[ai-game-devtools/dwpose]] — DWPose body/hand/face keypoint detection for pose-guided tasks
