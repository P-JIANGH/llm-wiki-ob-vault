---
title: Text2Video-Zero
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, image-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/text2video-zero.md]
---

# Text2Video-Zero

**Picsart AI Research** 开发的零样本视频生成工具，无需视频训练数据即可将 Stable Diffusion 文本到图像模型转化为视频生成器。

## 概述

Text2Video-Zero 的核心思路是：利用预训练的文本到图像扩散模型（如 Stable Diffusion），通过两项关键技术实现时间一致性视频生成——**跨帧注意力（Cross-Frame Attention）**和**运动场潜在变形（Motion Field Latent Warping）**。

论文发表于 2023 年 3 月，arXiv: 2303.13439。

## 功能模式

| 模式 | 描述 |
|------|------|
| Text-to-Video | 纯文本提示生成视频 |
| Pose Control | 文本 + 骨骼姿态引导（OpenPose） |
| Edge Control | 文本 + Canny 边缘引导 |
| Edge + Dreambooth | 边缘引导 + 风格化 Dreambooth 模型（Anime/GTA-5/Arcane 等） |
| Video Instruct-Pix2Pix | 指令引导的视频编辑（风格迁移、替换等） |
| Depth Control | 文本 + MiDaS 深度图引导 |

## 技术架构

- **基础模型：** Stable Diffusion v1.5（支持任意 SD 基础模型和 Dreambooth 模型）
- **核心创新 1 — Cross-Frame Attention：** 替换 SD 的自注意力层，使帧间共享注意力，强制时间一致性
- **核心创新 2 — Motion Field Warping：** 用运动场向量对潜在编码进行网格采样变形，生成连贯的帧过渡
- **两阶段去噪：** DDIM 反演到 t0/t1 检查点 → DDPM 前向 → 第二阶段 DDIM 反演
- **Token Merging (ToMe)：** 可选内存优化，将最低 VRAM 需求降至 <7GB

### 关键模块

- `TextToVideoPipeline` — 继承 StableDiffusionPipeline，实现视频生成管线
- `CrossFrameAttnProcessor` — 跨帧注意力处理器，控制帧间共享范围
- `Model` 类 — 统一入口，支持 6 种 ModelType 动态切换管线

## 硬件需求

| 模式 | 最低 VRAM |
|------|-----------|
| 标准 | 12 GB |
| Token Merging + chunk_size=2 | <7 GB |

## 与同类工具的差异

- 与 [[ai-game-devtools/stable-diffusion]] 不同：SD 是图像生成模型，Text2Video-Zero 将其扩展为视频生成，无需额外训练
- 与 [[ai-game-devtools/controlnet]] 互补：Text2Video-Zero 内置了 ControlNet 的 pose/edge/depth 条件控制能力，但核心贡献是零样本视频一致性技术
- 已集成到 🧨 Diffusers 库（v0.15.0+），提供 `TextToVideoZeroPipeline` 直接调用

## 许可证

CreativeML Open RAIL-M（与 Stable Diffusion 相同）

## 相关链接

- [GitHub](https://github.com/Picsart-AI-Research/Text2Video-Zero)
- [arXiv 论文](https://arxiv.org/abs/2303.13439)
- [HuggingFace Demo](https://huggingface.co/spaces/PAIR/Text2Video-Zero)
- [项目主页](https://text2video-zero.github.io/)
- [Diffusers 文档](https://huggingface.co/docs/diffusers/api/pipelines/text_to_video_zero)
