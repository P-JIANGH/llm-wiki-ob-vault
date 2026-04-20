---
title: HunyuanImage-3.0
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, open-source, image-generation, multimodal]
sources: [raw/articles/ai-game-devtools/hunyuanimage-3-0.md]
---

# HunyuanImage-3.0

腾讯混元原生多模态图像生成模型，统一自回归框架下的图文理解与生成。

## 概述

HunyuanImage-3.0 是腾讯混元团队发布的原生多模态模型，在单一自回归架构内统一了多模态理解和生成能力。不同于主流的 DiT（Diffusion Transformer）架构，它直接对文本和图像模态进行联合建模，实现更丰富的上下文生成。该模型是目前**最大的开源 MoE 图像模型**，总参数量 80B，每 token 激活 13B，64 个专家。

## 模型变体

| 模型 | 参数 | 推荐显存 | 能力 |
|:---|:---|:---|:---|
| HunyuanImage-3.0 | 80B (13B active) | ≥ 3×80 GB | 文生图 |
| HunyuanImage-3.0-Instruct | 80B (13B active) | ≥ 8×80 GB | 文生图、图生图、提示词自改写、CoT 思维链 |
| HunyuanImage-3.0-Instruct-Distil | 80B (13B active) | ≥ 8×80 GB | 全部 Instruct 能力 + 8 步采样加速 |

## 核心能力

- **提示词自改写（Prompt Self-Rewrite）**：将模糊简短的输入自动改写为专业、细节丰富的描述
- **文生图（T2I）**：高保真生成，严格遵循提示词
- **图文到图像（TI2I）**：编辑、增删对象、风格迁移、背景替换，保留关键元素
- **多图融合**：最多融合 3 张参考图像到单一构图
- **思维链推理（CoT）**：将复杂提示分解为主体、构图、光照、调色板、风格等结构化视觉组件后再生成

## 技术特点

- **架构**：自回归 MoE 框架（非 DiT），统一理解与生成
- **推理优化**：FlashInfer + FlashAttention 可提速最高 3 倍
- **部署要求**：PyTorch CUDA 版本需与系统 CUDA 匹配，GCC ≥ 9；首次推理约 10 分钟内核编译
- **交互式演示**：内置 Gradio Demo（`app/app.py`，本地 443 端口）
- **评测方法**：GSB 人类偏好评估，1000 条提示词，100+ 专业评分员，零挑选（zero cherry-picking）
- **评测结果**：在提示遵循度、美学质量和结构准确性方面持平或超越顶级闭源竞品

## 相关链接

- [HuggingFace - Base](https://huggingface.co/tencent/HunyuanImage-3.0)
- [HuggingFace - Instruct](https://huggingface.co/tencent/HunyuanImage-3.0-Instruct)
- [HuggingFace - Distil](https://huggingface.co/tencent/HunyuanImage-3.0-Instruct-Distil)
- [官方体验](https://hunyuan.tencent.com)
- [Discord 社区](https://discord.gg/ehjWMqF5wY)

## 与同类工具差异

- 与 [[ai-game-devtools/hunyuan-dit]]（混元 1.5B DiT 图像模型）不同，HunyuanImage-3.0 采用自回归 MoE 架构而非 DiT，参数规模大两个数量级（80B vs 1.5B）
- 与 [[ai-game-devtools/flux]]（Black Forest Labs flow matching transformer）相比，HunyuanImage-3.0 使用自回归架构而非 flow matching，支持 CoT 思维链推理和提示自改写
- 与 [[ai-game-devtools/comfyui]] 等模块化图像引擎兼容使用（通过 HuggingFace Diffusers 集成）
