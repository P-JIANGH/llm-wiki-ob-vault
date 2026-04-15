---
title: Sapiens
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, model, human-vision, pose-estimation, segmentation, depth-estimation, open-source]
sources: [raw/articles/ai-game-devtools/sapiens.md]
---

# Sapiens — Foundation for Human Vision Models

## Overview

Meta Reality Labs 的人体视觉基础模型套件，ECCV 2024 Best Paper Candidate。覆盖 2D pose、part segmentation、depth、normal 全套任务，原生 1024×1024 分辨率，在 3 亿张野外人体图像上预训练，泛化能力强。

核心作者：Rawal Khirodkar、Timur Bagautdinov、Julieta Martinez 等（Meta Reality Labs）。

## Key Facts

- **Paper**: [arXiv:2408.12569](https://arxiv.org/abs/2408.12569)
- **Conference**: ECCV 2024 Best Paper Candidate
- **Pretraining Data**: 300M in-the-wild human images
- **Native Resolution**: 1024 × 1024, 16-pixel patch size
- **Model Sizes**: 0.3B / 0.6B / 1B / 2B (ViT-based)
- **License**: Meta custom license (derived portions Apache 2.0)

## Tasks

| Task | Keypoints/Classes | Best Model | Performance |
|------|-----------------|------------|-------------|
| Pose Estimation (COCO) | 17 keypoints | Sapiens-2B | AP 82.2 |
| Pose Estimation (WholeBody) | 133 keypoints | Sapiens-2B | AP 74.5 |
| Pose Estimation (Goliath) | 308 keypoints | Sapiens-1B | AP 63.9 |
| Body Part Segmentation | 28 classes | Sapiens-1B | mIoU 79.94 |
| Depth Estimation | — | Sapiens-2B | — |
| Surface Normal Estimation | — | — | — |

## Architecture

- **Image Encoder**: ViT-based，4 规模 (0.3B/0.6B/1B/2B)，原生 1024×1024
- **Pose Heads**: RTMPose 用于 COCO；支持 17 / 133 / 308 keypoints
- **Segmentation**: 28 类人体部位（Goliath 数据集）
- **Sapiens-Lite**: TorchScript 优化推理，4× 加速，仅需 PyTorch + numpy + cv2；bfloat16 + FlashAttention（A100）
- **Training**: mmpose / mmpretrain / mmseg 模块化框架

## Sapiens-Lite vs Full Install

| | Sapiens-Lite | Full Install |
|---|---|---|
| Speed | 4× faster | Baseline |
| Dependencies | PyTorch + numpy + cv2 | Full conda (OpenMMLab) |
| Use Case | Inference only | Training + Inference |
| Mode | torchscript / bfloat16 | float32 |

## Game Dev Relevance

Sapiens 可用于游戏开发中的人体动作捕捉、角色动画生成、虚拟形象（Avatar）驱动：
- 从单张图像提取 2D/3D 人体姿态，用于角色动画重定向
- 身体部位分割可用于换装系统（character customization）
- 深度/法线估计用于 3D 人体重建

相关项目：[[ai-game-devtools/cambrian-1]]（VLM 对比）、[[ai-game-devtools/evf-sam]]（SAM 分割）、[[ai-game-devtools/hunyuan3d-1.0]]（3D 重建）。

## Installation

```bash
# Lite (inference only, recommended)
conda create -n sapiens_lite python=3.10
conda activate sapiens_lite
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
pip install opencv-python tqdm json-tricks

# Full training install
cd $SAPIENS_ROOT/_install
./conda.sh
```

## Checkpoints

从 [HuggingFace](https://huggingface.co/facebook/sapiens) 下载，目录结构：
```
sapiens_host/
├── pretrain/   # sapiens_{0.3b,0.6b,1b,2b}_epoch_*.pth
├── pose/       # COCO / WholeBody / Goliath variants
├── seg/        # sapiens_*_goliath_*.pth
├── depth/      # sapiens_*_render_people_epoch_*.pth
└── normal/     # surface normal models
```
