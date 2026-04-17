---
title: USO — 字节跳动统一风格与主体驱动图像生成
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, image-generation, diffusion, open-source, python, ai]
sources: [raw/articles/ai-game-devtools/uso.md]
---

# USO — Unified Style and Subject-Driven Generation

**USO** (Unified Style driven and subject-driven GeneratiOn) 是字节跳动智能创作实验室 UXO 团队开发的统一图像生成框架，将风格驱动和主体驱动生成统一到单个模型中。基于 [[ai-game-devtools/flux]] 架构构建，2025 年 8 月开源，Apache 2.0 许可。

## 概述

现有研究通常将风格驱动生成和主体驱动生成视为两个独立任务——前者优先风格相似性，后者坚持主体一致性。USO 认为两者可以统一于单一框架，因为最终都涉及"内容"与"风格"的解耦与重组。

核心创新：
- **大规模三元组数据集**：内容图像 + 风格图像 + 风格化内容图像
- **解耦学习方案**：风格对齐训练 + 内容-风格解耦训练双目标
- **风格奖励学习**：奖励学习范式进一步提升风格保真度

## 支持的生成模式

| 模式 | 输入 | 说明 |
|------|------|------|
| 主体驱动 | 内容参考图 + prompt | 将主体放入新场景 |
| 风格驱动 | 风格参考图 + prompt | 匹配上传风格的生成 |
| 风格+主体 | 内容图 + 风格图 + prompt | 风格化主体 |
| 布局保留 | 内容图 + 风格图（空 prompt） | 风格迁移保持布局 |
| 多风格融合 | 多张风格参考图 | 组合多种风格 |

## 技术架构

### 基础模型
- **基座**：[[ai-game-devtools/flux]]（支持 flux-dev / flux-dev-fp8 / flux-schnell）
- **视觉编码器**：SigLIP（google/siglip-so400m-patch14-384），提取风格特征
- **适配方式**：LoRA（rank=128，可配置）

### 核心模块
```
uso/flux/
├── pipeline.py      # USOPipeline 主推理管线
├── model.py         # 模型架构
├── sampling.py      # 采样逻辑
└── modules/         # Conditioner / Autoencoder / Layers
```

### 依赖栈
- PyTorch 2.4.0 + CUDA 12.4
- diffusers 0.30.1, transformers 4.43.3
- accelerate 1.1.1, deepspeed 0.14.4
- gradio 5.22.0（Web 演示）

## 硬件要求

- 标准模式：约 24GB 显存
- FP8 低显存模式（`--offload --model_type flux-dev-fp8`）：16-18GB 显存，消费级 GPU 可运行

## ComfyUI 集成

2025 年 9 月 3 日获得 [[ai-game-devtools/comfyui]] 原生支持（需 ComfyUI >= 0.3.57）。项目自带 6 个完整工作流示例（含输入/输出），可与 ControlNet、LoRA 等插件组合使用。

## 与同类工具对比

| 工具 | 方法 | 核心思路 |
|------|------|----------|
| **USO** | FLUX LoRA + SigLIP | 统一风格+主体驱动，解耦学习+奖励学习 |
| [[ai-game-devtools/pulid]] | 对比对齐+注意力注入 | 零样本身份保留，不需要 ControlNet 架构 |
| [[ai-game-devtools/instantid]] | IdentityNet(ControlNet)+IP-Adapter | 零样本身份保留+文本可控 |

## 相关链接

- 论文：https://arxiv.org/abs/2508.18966
- 项目页：https://bytedance.github.io/USO/
- HuggingFace 模型：https://huggingface.co/bytedance-research/USO
- HuggingFace 演示：https://huggingface.co/spaces/bytedance-research/USO
- ComfyUI 教程：https://docs.comfy.org/tutorials/flux/flux-1-uso
- 后继项目：[UMO](https://github.com/bytedance/UMO)（多身份主体驱动）

## 许可

Apache 2.0（代码）。基座模型权重遵循各自许可。
