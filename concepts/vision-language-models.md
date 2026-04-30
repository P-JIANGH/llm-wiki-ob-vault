---
title: Vision Language Models
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [model, vision, language, multimodal]
sources: []
---

# Vision Language Models

视觉-语言模型（VLM），连接视觉感知与大语言模型的桥梁。

## 主流模型

| 模型 | 机构 | 特点 |
|------|------|------|
| [[LLaVA]] | Microsoft | 开源，效果好 |
| [[Qwen-VL]] | 阿里 | 中文强 |
| [[GPT-4V]] | OpenAI | 最强闭源 |
| [[Gemini]] | Google | 多模态旗舰 |

## 核心架构

```
图像 → 视觉编码器 → 投影层 → LLM → 文本输出
```

## 关键训练技术

- **LLaVA**: CLIP + Vicuna，指令微调
- **LLaVA-NeXT**: 分辨率提升
- **BLIP-2**: Q-Former 对齐

## 游戏开发应用

- 游戏内物体识别
- AI 助手分析游戏画面
- NPC "看见"游戏世界

## 相关

- [[LLaVA]] — 代表开源 VLM
- [[multimodal-models]] — 多模态总览
- [[BLIP-2]] — 对齐技术先驱
