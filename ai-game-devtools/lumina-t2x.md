---
title: Lumina-T2X
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai-model, diffusion, image-generation, video-generation, music-generation, text-to-image, text-to-video, text-to-audio, text-to-music, open-source, llm]
sources: [raw/articles/ai-game-devtools/lumina-t2x.md]
---

# Lumina-T2X

## Overview

Lumina-T2X 是 [[OpenGVLab]]（上海人工智能研究院）开发的基于 **Flow-based 大规模 Diffusion Transformer** 的多模态文本条件生成模型家族。核心架构为 **Flag-DiT**，支持最高 70 亿参数和 128K token 序列长度，能够将文本描述转换为图像、视频、3D 点云、语音和音乐。

该框架已发表两篇论文（ICLR 2025 Spotlight / NeurIPS 2024），并在 [[Hugging Face Diffusers]] 中得到官方支持。

## Key Facts

| Item | Detail |
|------|--------|
| **Organization** | [[OpenGVLab]]（上海 AI Lab） |
| **Architecture** | Flag-DiT / Next-DiT（Flow Matching + RoPE + RMSNorm） |
| **Parameters** | 5B（Lumina-T2I）、2B（Lumina-Next-T2I） |
| **Text Encoder** | LLaMA2-7B（Lumina-T2I）、Gemma-2B（Lumina-Next-T2I） |
| **License** | MIT |
| **Papers** | Lumina-T2X（arXiv:2405.05945）、Lumina-Next（arXiv:2406.18583）、Lumina-mGPT（arXiv:2408.02657） |

## Sub-Models

### Lumina-T2I
- 5B Flag-DiT + LLaMA2-7B text encoder
- 支持 1024×1024 图像 + 1024×4096 宽景图
- 需 ~35% Pixelart-α 计算资源

### Lumina-Next-T2I
- 2B Next-DiT + Gemma-2B text encoder
- 支持 **2K 分辨率**、Time-aware Scaled RoPE
- 多语言支持（含中文、Emoji）
- 推理速度显著快于 Lumina-T2I

### Lumina-T2Audio / Lumina-T2Music
- Text-to-Audio：音效生成（枪声、电话铃声、引擎声等）
- Text-to-Music：风格音乐生成（ska、synth rock、electronic pop 等）

## Technical Highlights

- **Any Modality/Resolution/Duration**：单一框架处理图像/视频/3D点云/语音
- **[nextline]/[nextframe] token**：支持训练外分辨率外推（如 768×768 → 1792×1792）
- **低训练成本**：Lumina-T2I 仅需 Pixelart-α 35% 计算量
- **HuggingFace Diffusers 官方支持**：可直接用 `LuminaText2ImgPipeline` 推理

## Relationship to Other Tools

- 与 [[DeepSeek-V3]] 同为多模态生成模型，但 Lumina-T2X 专注于 DiT 架构
- 与 [[Stable Diffusion]] 同为图像生成模型，但 Lumina-T2X 使用 Flow Matching 而非 DDPM
- 与 [[Large World Model (LWM)]] 同为长上下文多模态模型（128K token）
- Lumina-mGPT 版本与 [[llama-3]] 类似，都支持文本和图像处理

## Repository

- GitHub: https://github.com/Alpha-VLLM/Lumina-T2X
- HuggingFace: https://huggingface.co/Alpha-VLLM/Lumina-Next-T2I
