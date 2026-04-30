---
title: DeepFloyd IF
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/deepfloyd-if.md]
---

# DeepFloyd IF

## 概述

DeepFloyd IF 是由 **DeepFloyd Lab**（隶属于 StabilityAI）开发的开源文本到图像生成模型。采用**级联像素扩散架构**（Cascaded Pixel Diffusion），包含一个冻结的 T5 文本编码器和三级级联扩散模块，能生成高达 1024×1024 像素的高逼真度图像。项目灵感来自 Google Imagen 论文。

## 架构设计

### 三级级联扩散

| 阶段 | 模型 | 参数 | 输出分辨率 | 说明 |
|------|------|------|-----------|------|
| Stage I | IF-I-XL | 4.3B | 64×64 | 基础文本到图像生成 |
| Stage II | IF-II-L | 1.2B | 256×256 | 超分辨率上采样 |
| Stage III | SD x4 Upscaler | — | 1024×1024 | 最终超分辨率 |

所有阶段共享一个**冻结的 T5 Transformer** 文本编码器，提取文本嵌入后通过交叉注意力和注意力池化注入 UNet 架构。

### 核心模块

- `deepfloyd_if/modules/` — 三级模块（stage_I/II/III）+ T5 编码器
- `deepfloyd_if/pipelines/` — 四种管线：Dream / Style Transfer / Super Resolution / Inpainting
- `deepfloyd_if/model/` — UNet、高斯扩散、采样器等底层组件（~3400 LOC Python）

## 技术特点

- **零样本 FID 6.66**（COCO 数据集），发布时 SOTA
- **xformers 内存高效注意力**，降低显存占用
- **DreamBooth 微调**支持（PEFT + ~28GB VRAM）
- **Hugging Face Diffusers 集成**，支持 CPU offloading（最低 14GB VRAM）
- 四种使用模式：文本生成、风格迁移、超分辨率、零样本修复

## 硬件需求

- 16GB vRAM：Stage I + II（64→256px）
- 24GB vRAM：完整三级管线（1024px）
- 14GB vRAM（diffusers CPU offloading 模式）

## 许可证

- 代码：Modified MIT（带限制条款）
- 权重：DeepFloyd IF 专用许可（初期仅限研究用途）
- StabilityAI 计划在收集反馈后发布完全开源版本

## 与同类工具的关系

- 与 [[comfyui]] 不同：DeepFloyd IF 是**端到端级联模型**，而 ComfyUI 是**模块化扩散管线编排引擎**
- 与 [[controlnet]] 不同：ControlNet 提供**条件控制**，IF 是**完整的文本到图像生成系统**
- 与 [[flux]] 类似：两者都是级联/多阶段扩散架构，FLUX 由 Black Forest Labs 开发

## 相关链接

- GitHub: https://github.com/deep-floyd/IF
- Hugging Face: https://huggingface.co/DeepFloyd
- Colab Demo: [免费层演示](https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/deepfloyd_if_free_tier_google_colab.ipynb)
