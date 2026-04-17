# Segment Anything Model 2 (SAM 2)

## Source
- URL: https://github.com/facebookresearch/segment-anything-2
- Extracted: 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview
Segment Anything Model 2 (SAM 2) is a foundation model towards solving promptable visual segmentation in images and videos. It extends SAM to video by considering images as a video with a single frame.

## Key Features
- Simple transformer architecture with streaming memory for real-time video processing
- Data engine built using a model-in-the-loop pipeline that iteratively improves via user interaction
- SA-V Dataset: the largest video segmentation dataset to date
- Supports click/box prompts, mask refinements, and multi-object tracking

## Model Checkpoints (SAM 2.1 and SAM 2)
Four size variants available:

| Model | Params (M) | Speed (FPS) | SA-V (J&F) | MOSE (J&F) | LVOS v2 (J&F) |
|-------|-----------|-------------|------------|------------|---------------|
| hiera_tiny | 38.9 | 91.2 | 76.5 | 71.8 | 77.3 |
| hiera_small | 46.0 | 84.8 | 76.6 | 73.5 | 78.3 |
| hiera_base_plus | 80.8 | 64.1 | 78.2 | 73.7 | 78.2 |
| hiera_large | 224.4 | 39.5 | 79.5 | 74.6 | 80.6 |

Speed measured on A100 GPU with torch 2.5.1, cuda 12.4.

## System Requirements
- Python >= 3.10
- PyTorch >= 2.5.1
- TorchVision >= 0.20.1
- Windows users: WSL with Ubuntu recommended

## API
- SAM2ImagePredictor: prompt-based image segmentation
- SAM2VideoPredictor: video prediction with multi-object tracking
- HuggingFace Hub integration for loading models
- Jupyter notebooks for image, automatic mask, and video prediction

## Training
- Supports fine-tuning on custom image, video, or mixed datasets
- SA-V dataset documentation available

## License
Apache 2.0 (model checkpoints, demo code, training code)
Inter & Noto Color Emoji: SIL Open Font License v1.1

## Release History
- 2024-12-11: Full model compilation for VOS speedup + new SAM2VideoPredictor
- 2024-09-30: SAM 2.1 Developer Suite released
- 2024-07-29: SAM 2 initial release
