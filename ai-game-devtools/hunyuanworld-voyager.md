---
title: HunyuanWorld-Voyager
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, tool, game-engine, 3d-generation, world-model, video-generation, open-source]
sources: [raw/articles/ai-game-devtools/hunyuanworld-voyager.md]
---

# HunyuanWorld-Voyager

腾讯混元团队（Tencent Hunyuan）开源的**可探索 3D 世界视频生成模型**（2025-09-02），从单张图像生成世界一致的 RGB-D 视频，支持自定义相机路径探索 3D 场景。在 WorldScore Benchmark 综合排名第1（77.62分）。

## Overview

**HunyuanWorld-Voyager** 是混元世界模型系列的核心成员，定位为"长距离世界探索"视频扩散框架。核心能力：

1. **世界一致性**：联合生成 RGB + 深度视频，确保 3D 全局一致性
2. **相机可控**：支持 forward/backward/left/right/turn_left/turn_right 等 6 种相机路径
3. **端到端 3D**：原生输出对齐深度图，可直接用于 3D 点云重建，无需后处理

关键技术创新：
- **World-Consistent Video Diffusion**：统一架构同时输出 RGB 和深度
- **Long-Range World Exploration**：高效世界缓存 + 自回归推理，支持迭代场景扩展
- **自动化 Data Engine**：无需人工 3D 标注，自动从任意视频估计相机位姿和度量深度

## Architecture

**两组件流水线：**

1. **World-Consistent Video Diffusion**：基于 [[HunyuanVideo-I2V]] 架构的扩散模型，以现有世界观测为条件，联合生成对齐的 RGB 和深度视频序列
2. **Long-Range World Exploration**：
   - 高效世界缓存（point culling）
   - 自回归推理 + 平滑视频采样
   - 上下文感知一致性实现迭代式场景扩展

**Data Engine**：自动化视频重建流水线：
- 相机位姿自动估计（类似 [[VGGT]]）
- 度量深度预测（基于 [[Metric3D]]）
- 真实视频 + Unreal Engine 渲染混合，100K+ 视频片段训练集

## Performance

WorldScore Benchmark（第1名）：

| 指标 | Voyager | 排名 |
|------|---------|------|
| WorldScore Average | **77.62** | 🔴 第1 |
| Camera Control | 85.95 | 🟢 第2 |
| Object Control | **66.92** | 🔴 第1 |
| Content Alignment | **68.92** | 🔴 第1 |
| 3D Consistency | 81.56 | 🟡 第3 |
| Photometric Consistency | 85.99 | 🟡 第3 |
| Style Consistency | **84.89** | 🔴 第1 |
| Subjective Quality | **71.09** | 🔴 第1 |

对比方法：WonderJourney, WonderWorld, EasyAnimate, Allegro, Gen-3, CogVideoX-I2V

## Applications

- **Video Reconstruction**：生成视频 → 导出 3D 点云（ply 文件）
- **Image-to-3D**：单张图像 → 可探索 3D 场景视频
- **Video Depth Estimation**：同步输出精确深度图

## Tech Stack

- **PyTorch 2.4.0** + **diffusers 0.31.0** + **transformers 4.39.3**
- **Flash Attention v2**：CUDA 加速
- **xDiT (xfuser 0.4.2)**：多 GPU 并行推理，8× H20 GPU 加速 6.69×
- **MoGe**（Microsoft）/**utils3d**/**Metric3D**/**VGGT**：3D 视觉工具链

## Requirements

- **GPU**：60GB 最小（540p）/ 80GB 推荐（单卡 80G 测试）
- **系统**：Linux
- **CUDA**：12.4 或 11.8

## Related

- [[ai-game-devtools/hunyuanworld-1.0]] — 混元 1.0：文本/图像 → 360°全景图 → 分层3D mesh
- [[ai-game-devtools/hunyuan-gamecraft]] — 混元游戏视频生成
- [[ai-game-devtools/hunyuanvideo]] — 混元视频生成
- [[ai-game-devtools/gamegen-o]] — 腾讯 GameGen-O 开放世界游戏视频生成
- [[ai-game-devtools/genesis]] — Genesis 通用物理引擎
