---
title: SDXS
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, ml, tool, open-source, image-generation, diffusion]
sources: [raw/articles/ai-game-devtools/sdxs.md]
---

# SDXS

**一句话:** 实时一步潜扩散模型（Latent Diffusion），512×512 图像生成达 100 FPS（SD v1.5 的 30 倍），1024×1024 达 30 FPS（SDXL 的 60 倍）。

## 概述

SDXS (Real-Time One-Step Latent Diffusion Models with Image Conditions) 由 Yuda Song、Zehao Sun、Xuanwu Yin 开发，是一种极高速的图像生成模型。通过一步蒸馏 + 轻量解码器 + 对抗学习，将多步扩散模型压缩为单步推理，同时保持高质量输出。

- **论文:** https://arxiv.org/abs/2403.16627
- **GitHub:** https://github.com/IDKiro/sdxs
- **许可证:** MIT
- **发布日期:** 2024 年 3 月

## 核心性能

| 模型 | 分辨率 | 帧率 | 对比基准 |
|------|--------|------|----------|
| SDXS-512 | 512×512 | ~100 FPS | SD v1.5 的 30x |
| SDXS-1024 | 1024×1024 | ~30 FPS | SDXL 的 60x |

## 技术架构

### 模型加速
- **轻量解码器:** 训练极轻量图像解码器，通过输出蒸馏损失 + GAN 损失模仿原始 VAE 解码器输出
- **模块移除蒸馏:** 将原始 U-Net 知识迁移到更紧凑的版本
- **特征匹配损失:** 替换传统蒸馏损失，加速多步到一步的转换

### 文本到图像
- 拉直采样轨迹，将多步模型快速微调为一步模型
- 扩展 Diff-Instruct 训练策略，用特征匹配损失梯度替代分数蒸馏

### 图像到图像 (ControlNet)
- 将训练策略扩展到 ControlNet
- 支持 Canny 边缘和深度图的图像转换
- Sketch2Image 等应用场景

## 已发布模型

| 模型 | Hugging Face | 备注 |
|------|-------------|------|
| SDXS-512-0.9 | IDKiro/sdxs-512-0.9 | 旧版本 |
| SDXS-512-DreamShaper | IDKiro/sdxs-512-dreamshaper | 通用文本到图像 |
| SDXS-512-DreamShaper-Anime | IDKiro/sdxs-512-dreamshaper-anime | LoRA 动漫风格 |
| SDXS-512-DreamShaper-Sketch | IDKiro/sdxs-512-dreamshaper-sketch | ControlNet 草图到图像 |

## 技术栈
- **框架:** PyTorch 2.2.1, diffusers 0.25.1
- **推理加速:** xformers 0.0.25
- **UI:** Gradio 3.43.1
- **依赖库:** transformers, accelerate, peft, timm, einops, opencv-python

## 与同类工具对比
- 比 [[img2img-turbo]] 更专注于一步推理的极致加速（100 FPS vs 0.11s/张）
- 相比 [[sd-webui-controlnet]]，SDXS 将 ControlNet 能力压缩到单步模型中
- 训练方案参考 DMD2，但不开源训练代码

## 应用潜力
- 游戏开发中的实时纹理/素材生成
- 草图到概念图的快速迭代
- 动漫风格资产的极速生成
