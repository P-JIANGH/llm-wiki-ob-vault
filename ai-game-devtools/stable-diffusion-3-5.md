---
title: Stable Diffusion 3.5
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/stable-diffusion-3-5.md]
---

# Stable Diffusion 3.5

## Overview
Stability AI 官方 SD3.5/SD3 推理参考实现。专注于提供简洁的推理管线，不含训练代码。推荐一般用户使用 [[ai-game-devtools/comfyui]] 进行推理。

## 架构特点
- **MM-DiT（Multi-Modal Diffusion Transformer）**：全新的多模态扩散 Transformer 架构，核心生成模型
- **三文本编码器**：OpenAI CLIP-L/14 + OpenCLIP bigG + Google T5-XXL，多编码器融合提升文本理解
- **16 通道 VAE 解码器**：跳过 `postquantconv` 步骤，简化解码流程
- **ControlNet 支持**：SD3.5 Large 专属 ControlNet（Canny/Depth/OpenPose 等），需特定预处理

## 模型变体
| 模型 | 说明 |
|---|---|
| SD3.5 Large | 主力模型，高质量图像生成 |
| SD3.5 Large Turbo | 加速版，步数更少 |
| SD3.5 Medium | 中等规模，推荐配合 Skip Layer Guidance 使用 |
| SD3 Medium | 前代兼容 |

## 关键文件
- `sd3_infer.py` — 推理入口
- `sd3_impls.py` — SD3 核心实现
- `mmditx.py` — MM-DiT 架构代码
- `dit_embedder.py` — DiT 嵌入工具

## 与同类工具差异
- **极简设计**：仅推理参考，无训练/微调能力，代码量远小于 [[ai-game-devtools/comfyui]] 和 [[ai-game-devtools/stable-diffusion-webui]]
- **推荐搭配 ComfyUI**：官方明确推荐 ComfyUI 作为生产推理 UI，本仓库仅作为参考实现
- **SD3/SD3.5 架构统一**：MM-DiT 架构与前代 UNet 扩散（如 [[ai-game-devtools/stable-diffusion]]）完全不同

## 许可证
`LICENSE-CODE` 管理，`other_impls.py` 含 HuggingFace Transformers 代码（Apache 2.0）。

## 链接
- [HuggingFace SD3.5](https://huggingface.co/stabilityai/stable-diffusion-3.5)
- [SD3.5 ControlNets](https://huggingface.co/stabilityai/stable-diffusion-3.5-controlnets)
- [[ai-game-devtools/comfyui]] — 官方推荐推理 UI
- [[ai-game-devtools/controlnet]] — ControlNet 条件控制范式
- `ai-game-devtools/mmditx` — MM-DiT 架构（本页核心）
