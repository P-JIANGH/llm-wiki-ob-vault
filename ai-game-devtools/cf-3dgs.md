---
title: CF-3DGS
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, vision]
sources: [raw/articles/ai-game-devtools/cf-3dgs.md]
---

# CF-3DGS — COLMAP-Free 3D Gaussian Splatting

> NVIDIA Labs 开源的无需 COLMAP 预处理的 3D Gaussian Splatting 重建管线，从原始视频/图像直接联合优化相机位姿和 3D 高斯场景表示。CVPR 2024。

## Overview

CF-3DGS 解决了传统 3D 重建流程中对 COLMAP（Structure-from-Motion）的强依赖。它通过**渐进式训练策略**同步优化相机位姿和 3D 高斯场景表示，支持从任意视频直接生成可渲染的 3D 场景。

## Architecture

### 渐进式训练管线

1. **双帧初始化** — 选择首帧对，构建初始点云，优化高斯表示
2. **顺序帧添加** — `add_view_v2()` 逐帧加入，通过局部优化估计相对位姿
3. **全局精化** — 随机帧采样联合优化所有位姿 + 高斯参数

### 核心模块

| 模块 | 功能 |
|------|------|
| `CFGaussianTrainer` | 渐进式训练调度器（907 行） |
| `CF3DGS_Render` | 带相机位姿优化的高斯模型 |
| `gaussian_renderer` | 基于原始 3DGS 的渲染器 |
| `utils_poses/` | 位姿对齐（ATE）和轨迹评估 |

### 关键技术

- **深度正则化** — 利用单目深度估计提供几何约束
- **自适应致密化** — 训练过程中动态增删高斯点
- **位姿链构建** — 从相对变换累积构建完整相机轨迹

## Technical Stack

- **框架:** PyTorch 2.0 + CUDA 11.7+
- **依赖:** PyTorch3D、lietorch、kornia、open3d、timm
- **子模块:** diff-gaussian-rasterization、simple-knn（3DGS 官方子模块）

## Supported Datasets

- **Tanks and Temples** — Nope-NeRF 预处理版本
- **CO3D** — Facebook Common Objects in 3D
- **自定义视频** — 转帧后可直接使用（启发式相机内参）

## Evaluation

- **新视角合成:** PSNR、SSIM、LPIPS
- **位姿估计:** ATE（绝对轨迹误差）、RPE（相对位姿误差）

## License

核心代码为 NVIDIA 专有许可；渲染器基于 Inria 3DGS（非商业研究用途）。

## Related

- 渲染器基于 [[ai-game-devtools/syncdreamer]] 同类 3D 高斯管线
- 与 [[ai-game-devtools/neuralangelo]] 同属 3D 重建工具，但 CF-3DGS 使用高斯而非 SDF-NeRF
- 可与 [[ai-game-devtools/video2game]] 管线结合（后者需要 COLMAP 预处理，CF-3DGS 可替代该步骤）
- 和 [[ai-game-devtools/anything-3d]] 均解决单视图到 3D 问题，但 CF-3DGS 面向多视图序列重建

## Links

- **GitHub:** https://github.com/NVlabs/CF-3DGS
- **Paper:** https://arxiv.org/abs/2312.07504
- **Project Page:** https://oasisyang.github.io/colmap-free-3dgs/
