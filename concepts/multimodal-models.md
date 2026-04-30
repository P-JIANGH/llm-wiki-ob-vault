---
title: Multimodal Models
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [model, multimodal, vision, llm]
sources: []
---

# Multimodal Models

多模态大模型，能够同时处理和理解多种类型的数据（文本、图像、音频、视频等）。

## 核心类型

### Vision-Language Models (VLM)

- [[LLaVA]] — 视觉 LLaMA
- [[Qwen-VL]] — 阿里 Qwen 视觉版
- [[GPT-4V]] — OpenAI 视觉版
- [[Gemini]] — Google 多模态

### 音频-文本模型

- [[Whisper]] — 语音识别
- [[MusicGen]] — 音乐生成

### 3D / Video

- [[NeRF]] — 神经辐射场
- [[stable-video-diffusion]] — 视频扩散

## 关键技术

- **对齐层**：将图像 token 对齐到 LLM 空间
- **视觉编码器**：CLIP、ViT
- **跨注意力**：Cross-attention 机制

## 游戏开发应用

- NPC 视觉感知
- 游戏场景理解
- AI 游戏助手（截图分析）

## 相关

- [[vision-language-models]] — 视觉-语言模型
- [[LLaVA]] — 代表 VLM
- [[image-generation]] — 图像生成
