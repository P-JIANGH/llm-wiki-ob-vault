---
title: UltraPixel
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [image-generation, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/ultrapixel.md]
---

# UltraPixel

## Overview

UltraPixel 是一个超高分辨率图像生成模型，NeurIPS 2024 发表论文。基于 [[stable-cascade]] 和 Trans-inR 构建，能够生成细节丰富、质量极高的超高分辨率图像。支持文本到图像、个性化 LoRA 和 ControlNet 工作流。

## 核心架构

- **基础架构：** 建立在 StableCascade（Würstchen 架构）和 Trans-inR 之上
- **Stage C：** 文本到图像生成，支持 small/big 两种模型尺寸（推荐 bfloat16）
- **Stage B：** 上采样/精炼阶段
- **Stage A：** 最终解码阶段，支持 tiled decoding 以显著降低显存占用
- **推荐配置：** small-big（Stage B 用小模型 + Stage C 用大模型），在质量和效率间取得平衡

## 功能特性

- **文本到图像生成：** Gradio WebUI + CLI 双接口，提示词策略强调细节描述和品质修饰词
- **个性化 LoRA：** 支持角色个性化训练（自定义标识符模式如 `cat [roubaobao]`）
- **ControlNet 集成：** 支持 Canny 边缘控制，未微调时最高支持 4K 分辨率

## 性能基准

| GPU | 分辨率 | Stage C (显存/时间) | Stage B (显存/时间) | Stage A tiled (显存/时间) |
|---|---|---|---|---|
| A100 (80GB) | 4096×4096 | 18.7G/52s | 19.7G/26s | 9.3G/128s |
| RTX 4090 (24GB) | 4096×4096 | 19.9G/153s | 23.4G/44s | 11.3G/114s |

**关键优化：** `--stage_a_tiled` 参数在 4K 分辨率下将 Stage A 显存从 OOM 降至 9-11GB。

## 训练

- **T2I 训练：** 支持多 GPU 训练，数据集格式为图片+字幕在同一目录
- **LoRA 个性化训练：** 只需目标图片文件夹，训练提示词格式为 `a photo of a cat [roubaobao]`

## 与其他工具的差异

- 与 [[stable-diffusion]] 相比，UltraPixel 基于级联架构（StableCascade），通过中间 latent 空间压缩实现更高的分辨率和效率
- 与 [[flux]] 相比，UltraPixel 专注于超高分辨率（4K+）合成，使用 tiled decoding 技术突破显存瓶颈
- 内置 [[controlnet]] 兼容，支持边缘控制条件生成

## 相关链接

- **论文:** https://arxiv.org/abs/2407.02158
- **项目页面:** https://jingjingrenabc.github.io/ultrapixel/
- **Hugging Face:** https://huggingface.co/roubaofeipi/UltraPixel
- **在线演示:** https://huggingface.co/spaces/roubaofeipi/UltraPixel-demo
- **GitHub:** https://github.com/catcathh/UltraPixel

## 来源

- raw/articles/ai-game-devtools/ultrapixel.md
