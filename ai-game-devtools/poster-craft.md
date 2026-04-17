---
title: PosterCraft
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, image-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/poster-craft.md]
---

# PosterCraft

## Overview

**PosterCraft** 是一个统一框架，用于**高质量美学海报生成**（ICLR'26），在精确文字渲染、抽象艺术融合和布局风格和谐方面表现出色。

由 HKUST-GZ、美团、厦门大学、NUS 和 HKUST 的联合团队开发。

## 核心技术

### 四阶段训练流水线

| 阶段 | 名称 | 功能 |
|:---|:---|:---|
| Stage 1 | Text Rendering Optimization | 在高质量背景上精确生成文字，建立基础保真度 |
| Stage 2 | High-quality Poster Fine-tuning | Region-aware Calibration 和谐文字与背景，保持文字精度的同时提升艺术完整性 |
| Stage 3 | Aesthetic-Text RL | Aesthetic-Text Preference Optimization，捕捉高阶美学权衡，优先整体视觉吸引力 |
| Stage 4 | Vision-Language Feedback | Joint Vision-Language Conditioning，视觉数据+文字建议迭代多模态修正 |

### 模型

- `PosterCraft-v1_RL` — Stage 3 模型，RL 优化
- `PosterCraft-v1_Reflect` — Stage 4 模型，视觉-语言反馈迭代精炼

### 数据集

- **Text-Render-2M**：200 万样本，多实例文字渲染
- **HQ-Poster-100K**：10 万精选高质量海报
- **Poster-Preference-100K**：10 万偏好对用于 RL 对齐
- **Poster-Reflect-120K**：12 万视觉-语言反馈对

## 性能表现

在文字渲染指标上，PosterCraft 达到开源模型 SOTA，接近 Gemini 2.0 Flash Gen（闭源）：

| 模型 | 类型 | Text Recall | Text F-score | Text Accuracy |
|:---|:---|:---|:---|:---|
| **PosterCraft** | **开源** | **0.787** | **0.774** | **0.735** |
| Gemini2.0-Flash-Gen | 闭源 | 0.798 | 0.786 | 0.746 |
| Flux1.dev | 开源 | 0.723 | 0.707 | 0.667 |
| Ideogram-v2 | 闭源 | 0.711 | 0.685 | 0.680 |
| SD3.5 | 开源 | 0.565 | 0.542 | 0.497 |
| BAGEL | 开源 | 0.543 | 0.536 | 0.463 |

## 部署

- **标准生成**：BF16 精度
- **低显存**：`inference_offload.py` 支持 CPU 卸载
- **交互界面**：`demo_gradio.py` Gradio Web UI
- **在线 Demo**：HuggingFace Space

## 相关链接

- **论文**：[arXiv:2506.10741](https://arxiv.org/abs/2506.10741)
- **代码**：[GitHub](https://github.com/Ephemeral182/PosterCraft)
- **模型**：[HuggingFace Hub](https://huggingface.co/PosterCraft)
- **项目网站**：[PosterCraft.io](https://ephemeral182.github.io/PosterCraft/)

## 与同类工具差异

- 相比 [[ai-game-devtools/flux]] 和 [[ai-game-devtools/omnigen]] 等通用图像生成模型，PosterCraft 专注**海报场景**的文字渲染美学
- 四阶段训练从文字渲染 → 海报微调 → RL 美学优化 → 视觉语言反馈迭代，逐步提升质量
- 开源模型中文字渲染 SOTA，接近闭源 Gemini 2.0 Flash Gen 水平
