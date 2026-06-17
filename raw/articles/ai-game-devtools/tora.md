# Tora: Trajectory-oriented Diffusion Transformer for Video Generation

**Source:** https://github.com/ali-videoai/Tora
**Extracted:** 2026-04-20 (web_extract fallback; GitHub/gitcode/gitee clone all failed)

## Overview
- **Paper:** ArXiv 2407.21705 (CVPR'25)
- **Authors:** Zhenghao Zhang*, Junchao Liao*, Menghao Li, Zuozhuo Dai, Bingxue Qiu, Siyu Zhu, Long Qin, Weizhi Wang
- **Project Page:** https://ali-videoai.github.io/tora_video/
- **Demos:** ModelScope (ZH/EN)
- **Weights:** HuggingFace, ModelScope
- **License:** CogVideoX License

## Core Architecture
Tora is the **first trajectory-oriented DiT framework** that concurrently integrates textual, visual, and trajectory conditions for controllable video generation.

### Key Components
1. **Trajectory Extractor (TE):** Encodes arbitrary trajectories into hierarchical spacetime motion patches using a 3D video compression network.
2. **Spatial-Temporal DiT:** Core diffusion transformer backbone for video synthesis.
3. **Motion-guidance Fuser (MGF):** Injects motion patches into DiT blocks to ensure generated videos strictly follow input trajectories.

### Key Insight
> "Our design aligns seamlessly with DiT's scalability, allowing precise control of video content's dynamics with diverse durations, aspect ratios, and resolutions."

## System Requirements
- **Python:** 3.10 to 3.12
- **GPU Memory:** ~30 GiB for Inference (A100), ~60 GiB for Training (A100)
- **Built upon:** CogVideoX framework

## Inference
- **Text-to-Video (T2V):** Requires prompts file and trajectory point coordinates (256x256 canvas)
- **Image-to-Video (I2V):** Initial frames in img_dir, filenames referenced in input file separated by @@
- **Prompt recommendation:** Use GPT-4 to enhance prompt details

## Training
- Requires CogVideoX-5b-sat weights for stage 1
- Dataset structure follows CogVideo SAT dataset guide
- ~60 GiB VRAM required for training

## Notes
- Active development (2024/07/31 to 2025/07/08)
- Gradio demo available for local UI usage
- Troubleshooting: upgrade transformers to 4.44.2 for token issues
