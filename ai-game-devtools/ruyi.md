---
title: Ruyi — 图像到视频生成模型
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, image-generation, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/ruyi.md]
---

# Ruyi (Ruyi-Mini-7B)

CreateAI 团队开源的图像到视频（Image-to-Video）扩散模型，支持 768 分辨率/24fps/120帧视频生成，提供镜头控制和运动幅度控制。

## Overview

Ruyi 是一个基于 3D DiT 架构的图像条件视频生成模型，核心模型 Ruyi-Mini-7B 以 7B 参数量实现在消费级 GPU 上运行电影级视频生成。支持起始帧→视频和起始帧+结束帧→视频两种模式。

## Key Facts

| 项目 | 详情 |
|------|------|
| 组织 | CreateAI Team |
| 模型 | Ruyi-Mini-7B |
| 参数量 | 7B |
| 输入 | 单张/两张图像（起始帧+可选结束帧） |
| 输出 | 24fps 视频，最长 120 帧（5秒） |
| 分辨率 | 512 / 768 |
| 架构 | 3D DiT + MagViT VAE + CLIP 视觉编码器 |
| 许可证 | Apache 2.0 |
| 存储大小 | 17 GB |

## Architecture

### 三大核心模块

1. **VAE (AutoencoderKLMagvit):** OmniGen 风格 3D CNN 自编码器，基于 MagViT 架构，负责视频的时空压缩与重建
2. **Transformer (HunyuanTransformer3DModel):** 3D 扩散 Transformer，basic block 类型 + time position encoding，基于 Hunyuan 架构改造
3. **图像编码器 (CLIPVisionModelWithProjection):** 提取输入图像的视觉特征作为条件

### 管线与控制

- **Pipeline:** RuyiInpaintPipeline（基于 diffusers）
- **调度器:** 支持 5 种（Euler / Euler A / DPM++ / PNDM / DDIM）
- **镜头控制:** static / left / right / up / down / auto
- **运动控制:** 1(最小) → 2(正常) → 3(显著) → 4(大幅) / auto
- **控制原理:** 通过 embeddings.safetensors 中预训练的 positive/negative prompt embeddings 实现无文本条件控制

### GPU 内存优化

- **两级策略:** GPU_memory_mode（normal/low）+ GPU_offload_steps（0-10 级 CPU 卸载）
- **FP8 量化:** 4 档（bf16 > fp8_lite > fp8_strong > fp8_extreme）
- **RTX 3090/4090 可达:** 512 分辨率/120 帧 或 768 分辨率/~72 帧

### 加速特性

- **TeaCache:** 缓存去噪步，阈值 0.10 缓存 6-8 步，阈值 0.15 缓存 10-12 步
- **Enhance-A-Video:** 集成 NUS 视频质量增强节点

## ComfyUI 集成

提供 3 个自定义节点，支持自动模型下载和更新：

1. **Load Model** — 加载模型（含自动下载/更新）
2. **Load LoRA** — 加载 LoRA 权重
3. **Sampler for Image to Video** — 核心生成节点（支持所有控制参数）

## 与同类工具比较

- 与 [[hunyuan-video]] 不同：Ruyi 专注 I2V（非 T2V），参数更小（7B vs 13B+），消费级 GPU 可运行，支持精细的镜头/运动控制
- 与 [[ltx-video]] 不同：LTX-Video 是统一多模式 DiT（T2V/I2V/V2V/关键帧），Ruyi 专精 I2V 且提供首尾帧双条件输入
- 与 [[cogvideox]] 不同：CogVideoX 主要 T2V/I2V 并重，Ruyi 纯 I2V 专精，ComfyUI 集成更轻量
- 与 [[mochi-1]] 不同：Ruyi 在 24GB GPU 上可运行，Mochi 1 需 ~60GB VRAM

## Links

- GitHub: https://github.com/IamCreateAI/Ruyi-Models
- HuggingFace: https://huggingface.co/IamCreateAI/Ruyi-Mini-7B
- Discord: https://discord.com/invite/nueQFQwwGw
