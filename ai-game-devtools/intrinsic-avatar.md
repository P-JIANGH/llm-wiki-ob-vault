---
title: IntrinsicAvatar
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [open-source, 3d, avatar]
sources: [raw/articles/ai-game-devtools/intrinsic-avatar.md]
---

# IntrinsicAvatar

**IntrinsicAvatar: Physically Based Inverse Rendering of Dynamic Humans from Monocular Videos via Explicit Ray Tracing**

- **Conference:** CVPR 2024
- **GitHub:** [taconite/IntrinsicAvatar](https://github.com/taconite/IntrinsicAvatar)
- **Paper:** [arXiv:2312.05210](https://arxiv.org/abs/2312.05210)
- **Project Page:** [neuralbodies.github.io/IntrinsicAvatar](https://neuralbodies.github.io/IntrinsicAvatar/)

## Overview

IntrinsicAvatar 是一个基于物理的动态人体逆渲染系统，从单目视频输入中重建可重光照的动态人体。通过显式光线追踪技术，将外观分解为固有成分（反照率、粗糙度、金属度、法线），支持新视角合成和环境光照重打光。

## Architecture

- **基础框架：** 基于 instant-nsr-pl 架构
- **神经加速：** tiny-cuda-nn 神经网络加速
- **配置管理：** Hydra 框架
- **日志系统：** Weights & Biases (wandb)

### Core Modules

| 模块 | 功能 | 来源 |
|------|------|------|
| LBS Deformer | 线性混合蒙皮人体变形 | Fast-SNARF + InstantAvatar |
| Importance Sampling | 重要性采样光线追踪 | NeRFAcc |
| SMPL Rendering | SMPL 网格可视化 | NeuralBody |
| SMPL Body Model | 人体参数化模型 | SMPL v1.0 |

## Key Features

- **材质分解：** 自动分解 albedo / roughness / metallic / normal 四个 PBR 通道
- **显式光线追踪：** 基于物理的光照模型，非近似
- **姿态校正：** 支持训练时 pose_correction 优化
- **重打光：** HDRI 环境贴图驱动的新光照条件渲染
- **多数据集支持：** PeopleSnapshot（单目）+ ZJU-MoCap（多目）

## Datasets

- **PeopleSnapshot：** 单相机人体捕获数据集，支持 In-Distribution 和 Out-of-Distribution 姿态测试
- **ZJU-MoCap：** 多相机人体运动捕获，支持 1-4 相机配置（单相机 125 帧，4 相机 300 帧/相机）

## Usage

```bash
# 训练（PeopleSnapshot）
python launch.py dataset=peoplesnapshot/male-3-casual tag=IA-male-3-casual

# 训练（ZJU-MoCap 4 相机）
python launch.py --config-name config_long \
  dataset=zju-mocap/377_4cam_long \
  sampler=balanced \
  pose_correction.dataset_length=300 \
  pose_correction.enable_pose_correction=true \
  tag=IA-377

# 测试/重打光
python launch.py mode=test \
  resume=${PATH_TO_CKPT} \
  dataset.hdri_filepath=hdri_images/city.hdr \
  light=envlight_tensor \
  model.render_mode=light \
  model.samples_per_pixel=1024
```

## Dependencies

- [[instant-ngp]] — tiny-cuda-nn 神经加速库（间接依赖）
- [[threestudio]] — 同类 3D 内容生成框架，提供对比参考
- [[exavatar]] — 同领域 CVPR 2024 全身 3D 高斯 Avatar 工作
- [[hunyuan3d-2-1]] — 腾讯混元 3D 资产生成，同属 3D 人体/资产生成领域

## Notes

- 需要手动下载 SMPL v1.0 和 SMPLIFY_CODE_V2.ZIP，提取 .pkl 文件到 `data/SMPLX/smpl/`
- Hydra 解析已知问题：当 checkpoint 路径包含 `=` 字符时，需要双引号转义
- 输出目录结构：`exp/intrinsic-avatar-{tag}/{dataset}@{timestamp}`
