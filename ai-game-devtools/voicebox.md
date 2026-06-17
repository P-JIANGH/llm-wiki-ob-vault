---
title: Voicebox - PyTorch
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, audio, tool, open-source, python, flow-matching]
sources: [raw/articles/ai-game-devtools/voicebox.md]
---

# Voicebox - PyTorch

## 概述

Voicebox 是 Meta AI (FAIR) 提出的**文本引导的多语言通用语音生成模型**，首个跨任务泛化的生成式 AI 语音模型。本项目由 Speechify 团队以 PyTorch 实现的社区复刻版本。

原始论文：[Voicebox: Text-Guided Multilingual Universal Speech Generation at Scale](https://ai.facebook.com/blog/voicebox-generative-ai-model-speech/)

## 核心架构

| 维度 | 详情 |
|------|------|
| **模型类型** | 非自回归流匹配 (Flow-Matching) 模型 |
| **训练数据** | 50K+ 小时语音（未经过滤或增强） |
| **推理方式** | 上下文学习（in-context learning），可同时条件化音频前后文 |
| **框架** | PyTorch |

## 支持任务

- **零样本文本转语音 (Zero-shot TTS)** — 单/跨语言
- **噪声消除** — 瞬态噪声去除
- **内容编辑** — 基于文本的语音内容修改
- **风格转换** — 跨语言风格迁移
- **多样化采样** — 生成多样化的语音样本

## 性能对比

Voicebox vs VALL-E（当时的 SOTA 零样本 TTS）：

| 指标 | Voicebox | VALL-E |
|------|----------|--------|
| 词错误率 (WER) | 5.9% | 1.9% |
| 音频相似度 | 0.580 | 0.681 |
| 推理速度 | **快 20 倍** | 基线 |

## 项目状态

该仓库为**工作进行中**，README 中列出多项待实现功能：
- 训练脚本
- 跨语言风格迁移
- 零样本 TTS
- 噪声消除与内容编辑
- 多样化语音采样

## 许可证

MIT License (Copyright 2023 Speechify)

## 相关链接

- **GitHub**: https://github.com/SpeechifyInc/Meta-voicebox
- **Meta 官方博客**: https://ai.facebook.com/blog/voicebox-generative-ai-model-speech/
- **原始论文**: https://research.facebook.com/file/2441102929387057/VoiceBox_arXiv_6_6.pdf

## 同类工具对比

- 与 [[bark]]（Suno 的自回归 TTS）相比，Voicebox 使用流匹配而非自回归，推理速度显著更快
- 与 [[gpt-sovits]]（基于 VITS 的中文 TTS）相比，Voicebox 是多语言通用模型，支持零样本跨语言生成
- 与 [[speechgpt]]（复旦的语音 LLM）相比，Voicebox 专注于语音生成而非语音-语言联合理解
