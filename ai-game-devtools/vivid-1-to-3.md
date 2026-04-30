---
title: ViVid-1-to-3
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai, multimodal, diffusion, 3d, video, open-source, tool]
sources: [raw/articles/ai-game-devtools/vivid-1-to-3.md]
---

# ViVid-1-to-3

**全称:** ViVid-1-to-3: Novel View Synthesis with Video Diffusion Models
**来源:** UBC Vision Lab (ubc-vision)
**论文:** CVPR 2024 — [arXiv 2312.01305](https://arxiv.org/abs/2312.01305)
**项目页:** https://ubc-vision.github.io/vivid123/
**许可证:** Apache 2.0

## 概述

ViVid-1-to-3 将视频扩散模型与新颖视角合成扩散模型相结合，从单张参考图像生成多视角一致的3D旋转视频。核心思路是利用视频扩散的时序一致性约束，提升传统新视角合成（如 Zero-1-to-3）中的姿态和外观一致性。

## 技术架构

### 双扩散管线

| 组件 | 模型 | 作用 |
|------|------|------|
| 新视角合成 | Zero-1-to-3 (UNet2D) | 单图→新视角图像，CLIP 图像编码 + 相机位姿条件 |
| 视频扩散 | Zeroscope v2 (UNet3D) | 时序一致性约束，多帧间外观/姿态对齐 |

### 关键模块

- **`ViVid123Pipeline`** — 主推理管线，继承 HuggingFace `TextToVideoSDPipeline`，融合 2D 新视角扩散 + 3D 视频扩散
- **`Zero1to3StableDiffusionPipeline`** — diffusers 版 Zero-1-to-3 实现，支持 CLIP 视觉编码 + 相机参数注入
- **`CLIPCameraProjection`** — 将相机参数（仰角/方位角/半径）投影到 CLIP 嵌入空间
- **权重调度** — video/zero123 双 guidancescale 线性衰减策略，平衡两种扩散信号

### 配置参数（Pydantic Schema）

- 相机轨迹：仰角/方位角/半径范围（默认 -45°~+45° 方位角变化）
- 输出：25 帧、256×256 分辨率
- 推理：50 steps，guidance_scale_zero123=3.0, guidance_scale_video=1.0

## 应用场景

- **3D 资产生成** — 单图→多视角→3D 重建管线前置步骤
- **游戏开发** — 从概念艺术图快速生成角色/道具的多视角参考
- **SLURM 批量** — 支持集群批量处理，GSO 100 物体测试集约 1.5min/张 (V100)

## 与同类工具对比

- vs [[syncdreamer]]：SyncDreamer 使用 Volume Feature Field + DepthWiseAttention 同步生成 16 视角，ViVid-1-to-3 使用视频扩散模型生成连续视角视频，二者均基于 Zero-1-to-3 但路径不同
- vs [[mvdream]]：MVDream 在扩散模型中直接注入相机位姿条件生成 4 视角图像，ViVid-1-to-3 则引入视频扩散的时序一致性作为额外约束

## 评估指标

- PSNR、SSIM、LPIPS、FOR_8、FOR_16（光流配准度量）
- GSO 100 物体基准测试
