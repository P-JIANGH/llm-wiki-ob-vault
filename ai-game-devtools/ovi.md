---
title: Ovi
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, audio, diffusion, multimodal, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/ovi.md]
---

# Ovi

Character AI 开源的双模态音视频生成模型，同时生成视频和音频内容。

## 概述

Ovi 是一个类似 Veo-3 的视频+音频生成模型，能够从纯文本或文本+图像输入同时生成同步的视频和音频内容。采用 Twin Backbone（双主干）架构，视频分支和音频分支通过统一的扩散框架融合。

## 关键特性

- **同步音视频生成**：从文本/图像条件同时生成视频和音频
- **5B 音频分支**：使用内部高质量音频数据集从头预训练
- **10 秒视频生成**（Ovi 1.1, 2025年11月）：960×960 分辨率 @ 24 FPS，支持多宽高比
- **三个模型变体**：720×720_5s、960×960_5s、960×960_10s
- **ComfyUI 集成**：通过 ComfyUI-WanVideoWrapper 支持
- **量化支持**：FP8 和 qint8 量化，最低 24GB VRAM 可运行

## 架构

### Twin Backbone 双主干设计
- **视频分支**：基于 [[wan2-2]] 初始化，使用 Wan VAE 2.2 编解码
- **音频分支**：5B 参数自定义模型，复用 MMAudio 的音频 VAE
- **融合引擎**：OviFusionEngine 同时对视频和音频 latent 进行联合去噪

### 推理管线
1. **文本编码**：T5 文本编码器，同时为视频和音频提供条件
2. **首帧生成**：I2V 模式加载输入图像，T2I2V 模式使用 FLUX.1-Krea-dev 生成首帧
3. **联合扩散**：视频和音频同时去噪，独立 guidance scale 控制
4. **解码**：Wan VAE 解码视频，MMAudio VAE 解码音频

### 推理模式
| 模式 | 说明 | 输入 |
|------|------|------|
| t2v | 文本→音视频 | 文本提示 + 分辨率 |
| i2v | 图像→音视频 | 输入图像 + 文本 |
| t2i2v | 文本→图像→音视频 | 文本提示（自动用 FLUX 生成首帧） |

## 性能

| 配置 | 峰值显存 | 推理时间 |
|------|---------|---------|
| 单卡 FP3，无 offload | ~80 GB | ~83s |
| 单卡 + CPU offload | ~32 GB | ~118s |
| qint8 + CPU offload | 24 GB | 较慢 |
| 4 卡序列并行 | ~80 GB | ~55s |
| 8 卡序列并行 | ~80 GB | ~40s |

## 提示词格式

- **语音**：`<S>语音内容<E>` — 标签内文本转为语音
- **音频描述**：`Audio: 音效描述` — 描述视频中的音效（放在提示词末尾）

## 采样选项

- 采样器：UniPC（默认）、DPM++、Euler
- Guidance：video_guidance_scale=4.0, audio_guidance_scale=3.0
- SLG（Skip Layer Guidance）：可配置层索引（默认 11）
- 视频/音频负提示词独立控制

## 依赖

PyTorch 2.6.0, diffusers, transformers, Flash Attention, gradio, optimum-quanto, MMAudio VAE

## 链接

- GitHub: https://github.com/character-ai/Ovi
- arXiv: https://arxiv.org/abs/2510.01284
- HuggingFace: https://huggingface.co/chetwinlow1/Ovi
- 在线 Demo: https://huggingface.co/spaces/akhaliq/Ovi

## 相关项目

- [[hunyuan-video]] — 腾讯混元视频生成模型，同属 DiT 架构视频生成
- [[cogvideox]] — 智谱 AI 开源视频生成模型
- [[mochi-1]] — Genmo 10B 参数文本到视频扩散模型
