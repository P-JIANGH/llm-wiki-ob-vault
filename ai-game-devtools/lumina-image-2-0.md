---
title: Lumina-Image 2.0
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, image-generation, diffusion, open-source, python, tool]
sources: [raw/articles/ai-game-devtools/lumina-image-2-0.md]
---

# Lumina-Image 2.0

## Overview

Lumina-Image 2.0 是由 Alpha-VLLM Group（上海人工智能实验室、悉尼大学、上海交大等）开发的**统一高效图像生成框架**。论文发表于 ICCV 2025（arXiv 2503.21758）。

基于 DiT（Diffusion Transformer）架构，使用 Gemma-2-2B 作为文本编码器，FLUX-VAE-16CH 作为 VAE，2.6B 参数规模，支持 1024×1024 分辨率图像生成。

## 核心架构

### DiT 主干
- **TimestepEmbedder**: 正弦频率嵌入 → MLP 时间步编码
- **PatchEmbed**: 2D 图像分块转 transformer 输入
- **FinalLayer**: 自适应归一化 + 输出投影
- **Flash Attention**: flash_attn_varlen_func 加速注意力计算
- **RMSNorm**: 支持 apex FusedRMSNorm（高性能）或 vanilla 回退

### 推理求解器
- **Midpoint Solver** — 中点法 ODE 求解
- **Euler Solver** — 欧拉法
- **DPM Solver** — 深度概率模型求解器（推荐）

## 技术特点

| 维度 | 详情 |
|------|------|
| 参数量 | 2.6B |
| 分辨率 | 1024×1024 |
| 文本编码器 | Gemma-2-2B (Google) |
| VAE | FLUX-VAE-16CH (Black Forest Labs) |
| 许可证 | Apache 2.0 |
| 依赖 | PyTorch, Diffusers, Transformers, Flash Attention 2.7.4 |
| 微调 | JSON 数据格式 (image_path + prompt)，支持 LoRA |
| 框架集成 | HuggingFace Diffusers (Lumina2Pipeline)、ComfyUI |

## 与同类工具差异

- 相比 [[ai-game-devtools/flux]]（Black Forest Labs），Lumina-Image 2.0 使用 FLUX VAE 但自有 DiT 架构
- 相比 [[ai-game-devtools/stable-diffusion]]，Lumina 2.0 采用 DiT 而非 U-Net，推理效率更高
- 相比 [[ai-game-devtools/comfyui]]（运行平台），Lumina 2.0 是具体模型，已被 ComfyUI 原生支持
- 与 [[ai-game-devtools/lumina-t2x]]、[[ai-game-devtools/lumina-dimoo]] 同属 Alpha-VLLM 的 Lumina 系列

## 生态集成

- **HuggingFace Diffusers**: `Lumina2Pipeline` 原生支持
- **ComfyUI**: 官方打包支持（Comfy-Org/Lumina_Image_2.0_Repackaged）
- **Lumina-Accessory**: 基于 Lumina 2.0 的微调框架，支持可控生成、图像编辑、身份保持
- **Lumina-Video 1.0**: 视频生成初步探索（同团队）

## 关键链接

- GitHub: https://github.com/Alpha-VLLM/Lumina-Image-2.0
- 论文: https://arxiv.org/abs/2503.21758
- HuggingFace 模型: https://huggingface.co/Alpha-VLLM/Lumina-Image-2.0
- HuggingFace Demo: https://huggingface.co/spaces/Alpha-VLLM/Lumina-Image-2.0
- Diffusers 文档: https://huggingface.co/docs/diffusers/main/en/api/pipelines/lumina2
