# MusePose — Raw Source

**Source:** https://github.com/TMElyralab/MusePose
**Date:** 2026-04-19
**Category:** Avatar (Pose-Driven Image-to-Video)

## README Summary

MusePose: a Pose-Driven Image-to-Video Framework for Virtual Human Generation.

**Authors:** Zhengyan Tong, Chao Li, Zhaokang Chen, Bin Wu (corresponding), Wenjiang Zhou
**Lab:** Lyra Lab, Tencent Music Entertainment (TME)

MusePose is an image-to-video generation framework for virtual humans under control signals such as pose. The current released model is an implementation of [AnimateAnyone](https://github.com/HumanAIGC/AnimateAnyone) by optimizing [Moore-AnimateAnyone](https://github.com/MooreThreads/Moore-AnimateAnyone).

MusePose is the last building block of **the Muse open-source series**. Together with MuseV and MuseTalk, it aims to enable end-to-end virtual human generation with full body movement and interaction capabilities.

**Release Date:** 2024-05-27
**Training Code Released:** 2025-03-04
**ComfyUI Support:** 2024-05-31 (Comfyui-MusePose)

## Architecture

Diffusion-based, pose-guided virtual human video generation framework:

### Key Components
- **Reference UNet**: Extracts appearance features from reference image
- **Denoising UNet (3D)**: Temporal video frame generation with Motion Module
- **Pose Guider**: Lightweight network encoding pose/keypoint sequences to conditional features (InflatedConv3d with progressive channels 16→32→64→128)
- **Motion Module**: Temporal attention blocks for frame consistency (based on AnimateDiff)
- **Mutual Self-Attention**: Injects identity features from Reference UNet into generation pipeline

### Pipeline
1. **Pose Alignment**: Custom `pose_align.py` algorithm to align arbitrary dance videos to arbitrary reference images
2. **Inference**: `test_stage_2.py` generates video from reference image + aligned pose sequence
3. **Training**: Two-stage training (`train_stage_1_multiGPU.py`, `train_stage_2_multiGPU.py`) with DeepSpeed Zero2

### Key Files
- `musepose/models/pose_guider.py` — PoseGuider (InflatedConv3d-based conditioning encoder)
- `musepose/models/motion_module.py` — Temporal attention for video consistency
- `musepose/models/unet_3d.py` — 3D denoising UNet
- `musepose/models/transformer_3d.py` — 3D transformer blocks
- `musepose/models/mutual_self_attention.py` — Cross-modal attention for identity injection
- `musepose/pipelines/pipeline_pose2vid.py` — Pose-to-video inference pipeline
- `musepose/pipelines/pipeline_pose2vid_long.py` — Long video inference pipeline
- `musepose/pipelines/pipeline_pose2img.py` — Pose-to-image pipeline
- `pose_align.py` — Pose alignment algorithm
- `pose/script/dwpose.py` — DWPose keypoint extraction

### Dependencies
- OpenMMLab ecosystem: mmcv>=2.0.1, mmdet>=3.1.0, mmpose>=1.1.0
- DWPose for human pose estimation (with YOLOX detector)
- Stable Diffusion image variations (lambdalabs/sd-image-variations-diffusers)
- VAE: sd-vae-ft-mse
- ControlNet: control_v11p_sd15_openpose (training only)
- AnimateDiff: mm_sd_v15_v2.ckpt (training only)

### VRAM Requirements
- 16GB: 512×512×48 frames
- 28GB: 768×768×48 frames

### License
- Code: MIT License
- Model weights: Non-commercial research purposes only

## Timeline
- 2024-05-27: Release MusePose and pretrained models
- 2024-05-31: Support Comfyui-MusePose
- 2024-06-14: Bug fix in inference_v2.yaml
- 2025-03-04: Release training code

## Links
- GitHub: https://github.com/TMElyralab/MusePose
- HuggingFace: https://huggingface.co/TMElyralab/MusePose
- ComfyUI: https://github.com/TMElyralab/Comfyui-MusePose
