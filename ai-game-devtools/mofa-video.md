---
title: MOFA-Video
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, animation, tool, open-source, diffusion]
sources: [raw/articles/ai-game-devtools/mofa-video.md]
---

# MOFA-Video

## Overview

MOFA-Video 是 ECCV 2024 发表的**可控图像动画生成**工具，通过在冻结的图像到视频扩散模型（SVD）中注入可学习的运动场适配器（MOFA-Adapter），实现从单张图像生成受控动画视频。由东京大学与腾讯 AI Lab 联合开发。

核心公式：**图像 🏞️ + 混合控制信号 🕹️ = 动画视频 🎬**

## 技术架构

### 核心方法
1. **稀疏到稠密运动生成（S2D）：** 通过稀疏运动采样生成稀疏控制信号，训练不同的 MOFA-Adapter 来驱动预训练 SVD 生成视频
2. **基于光流的运动适配（Flow-based Motion Adaptation）：** 不同 MOFA-Adapter 可在推理时组合，联合控制冻结的 SVD 模型

### 三种控制模式

| 模式 | 子目录 | 驱动方式 | 特点 |
|------|--------|----------|------|
| 轨迹控制 | MOFA-Video-Traj | 手绘轨迹 → 运动场 | Gradio 交互式界面 |
| 关键点控制 | MOFA-Video-Keypoint | 面部关键点序列 | 支持**长视频生成**（周期性采样策略） |
| 混合控制 | MOFA-Video-Hybrid | 轨迹 + 地标组合 | 音频驱动/视频驱动两种面部动画模式 |

### 混合控制详解
- **音频驱动面部**（run_gradio_audio_driven.py）：上传音频 → 自动生成口型同步的面部动画
- **视频驱动面部**（run_gradio_video_driven.py）：上传参考视频 → 面部运动迁移到静态图像

### 训练管线
- 两阶段训练：Stage 1 训练基础 MOFA-Adapter → Stage 2 精调 ControlNet 路径
- 数据集：WebVid-10M（可自定义替换）
- 基础模型：SVD-XT（stable-video-diffusion-img2vid-xt-1-1）
- 光流估计：Unimatch（gmflow-scale2-regrefine6）
- 条件运动传播：CMP（ResNet50 骨干）

## 技术栈

- **深度学习：** PyTorch 2.0.1, CUDA 11.7, Diffusers 0.24.0
- **界面：** Gradio 4.5.0（严格版本要求）
- **3D/几何：** pytorch3d, trimesh
- **面部处理：** facexlib, gfpgan, mediapipe
- **音频：** librosa
- **优化：** einops, accelerate, omegaconf

## 关键事实

- **论文：** ECCV 2024
- **arXiv：** 2405.20222
- **许可：** Apache 2.0（Tencent）
- **作者：** Muyao Niu（东京大学/腾讯 AI Lab）、Xiaodong Cun（腾讯 AI Lab）等
- **HuggingFace 模型：** [MOFA-Video-Traj](https://huggingface.co/MyNiuuu/MOFA-Video-Traj)、[MOFA-Video-Hybrid](https://huggingface.co/MyNiuuu/MOFA-Video-Hybrid)
- **项目主页：** https://myniuuu.github.io/MOFA_Video

## 与同类工具对比

与 [[sadtalker]]（基于 3DMM 的音频驱动肖像动画）相比，MOFA-Video 基于 SVD 扩散模型，支持多种控制模式（轨迹/关键点/混合），不仅限于音频驱动。与 [[aniportrait]]（3DMM + AnimateDiff Motion Module）不同，MOFA-Video 采用光流运动适配范式，在冻结的 I2V 模型上注入适配器。相比 [[animate-anyone]]（姿态驱动角色动画），MOFA-Video 专注于单图驱动的细粒度运动控制。

## 代码结构

```
MOFA-Video/
├── MOFA-Video-Hybrid/     # 混合控制 Gradio demo（音频/视频驱动）
├── MOFA-Video-Traj/       # 轨迹控制 Gradio demo
├── MOFA-Video-Keypoint/   # 关键点控制推理脚本（支持长视频）
├── Training/              # 两阶段训练代码
├── assets/                # 演示 GIF 和示意图
└── README.md
```
