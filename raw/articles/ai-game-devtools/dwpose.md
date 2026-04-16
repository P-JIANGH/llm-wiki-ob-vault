# DWPose — Effective Whole-body Pose Estimation with Two-stages Distillation

**Source:** https://github.com/idea-research/dwpose
**Date:** 2026-04-17
**Paper:** https://arxiv.org/abs/2307.15880 (ICCV 2023, CV4Metaverse Workshop)

## Overview
DWPose is a whole-body pose estimation framework that replaces OpenPose in the ControlNet pipeline, achieving superior results for human pose detection (body, face, hands, feet) and generating higher quality images when used as a condition map for Stable Diffusion.

## Key Architecture
- **Two-Stage Distillation:** Knowledge distillation from a large teacher model to smaller student models
  - Stage 1: Distillation from large model on UBody dataset
  - Stage 2: Further distillation to refine on COCO-WholeBody
- **Based on RTMPose/MMPose:** Uses MMPose framework with RTMPose architecture
- **ONNX Export:** Models exported to ONNX format, eliminating need for mmcv at inference time
- **YOLOX Detector:** Uses YOLOX for human detection before pose estimation

## Model Variants
| Model | Input Size | FLOPS (G) | Whole AP |
|-------|-----------|-----------|----------|
| DWPose-t | 256x192 | 0.5 | 0.485 |
| DWPose-s | 256x192 | 0.9 | 0.538 |
| DWPose-m | 256x192 | 2.2 | 0.606 |
| DWPose-l | 256x192 | 4.5 | 0.631 |
| DWPose-l | 384x288 | 10.1 | 0.665 |

## Metrics (COCO-WholeBody v1.0 val)
- Body AP: up to 0.722
- Face AP: up to 0.887
- Hand AP: up to 0.621
- Foot AP: up to 0.704

## Integration with ControlNet
- Preprocessor name: `dw_openpose_full`
- Required models: `dw-ll_ucoco_384.onnx` (pose) + `yolox_l.onnx` (detector)
- Supported in sd-webui-controlnet >= v1.1237
- Replaces the original OpenPose preprocessor with significantly better accuracy

## Project Structure
- `mmpose/` — MMPose-based training/evaluation code
  - `configs/wholebody_2d_keypoint/` — Config files for all model variants
  - `configs/distiller/` — Two-stage distillation configs
- `ControlNet-v1-1-nightly/` — ControlNet integration code
  - `gradio_dw_open_pose.py` — Gradio demo
  - `dwpose_infer_example.py` — Batch inference script

## Dependencies
- PyTorch
- MMPose (for training/testing)
- ControlNet (for applying poses to Stable Diffusion)
- ONNX Runtime (or OpenCV ONNX backend)
- YOLOX (detector)

## License
Apache License 2.0

## Authors
Zhendong Yang, Ailing Zeng, Chun Yuan, Yu Li

## Key Dates
- 2023-07: Paper published on arXiv
- 2023-08: ONNX model released, sd-webui-controlnet support added
- 2023-08: Accepted by ICCV 2023, CV4Metaverse Workshop
- 2023-12: Support for Animate Anyone (character animation)
