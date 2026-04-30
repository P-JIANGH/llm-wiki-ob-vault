---
title: Unet-TTS — One-Shot Voice Cloning
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tts, voice-cloning, style-transfer, tensorflow, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/one-shot-voice-cloning.md]
---

# Unet-TTS: One-Shot Voice Cloning

**GitHub:** https://github.com/CMsmartvoice/One-Shot-Voice-Cloning
**Paper:** arXiv 2109.11115 | **Demo:** https://cmsmartvoice.github.io/Unet-TTS/
**License:** MIT

## Overview
Unet-TTS 是一个单样本语音克隆系统，基于 U-Net 架构 + AdaIN（自适应实例归一化）层实现强大的说话人和风格迁移能力。仅需一段参考音频即可克隆任意说话人的声音，无需手动输入音素时长统计。

## Architecture

### 三阶段管线

1. **Duration Predictor** — FastSpeech 风格编码器 + 时长预测器，输入为字符 ID + 4 维时长统计（声母均值/标准差 + 韵母均值/标准差），输出按参考语音时长缩放的逐音素时长
2. **Acoustic Model (Unet-TTS)** — 核心创新：AdaIN 编码器 + 解码器，U-Net 跳跃连接；Style Encoder 从参考 Mel 频谱提取说话人/风格嵌入，AdaIN 层实现风格迁移
3. **Vocoder (MultiBand-MelGAN)** — Mel 频谱到波形的转换，16kHz 输出

### 关键创新
- **自动时长估计**：Style Encoder 自动从参考音频估算音素时长统计，替代手动标注
- **AdaIN 风格迁移**：通过自适应实例归一化将参考语音的说话人特征注入生成过程
- **中文音素级控制**：针对汉语拼音声母/韵母分别建模时长

## Tech Stack
- TensorFlow 2.6 + tensorflow-addons 0.14.0
- 基于 TensorFlowTTS（TensorSpeech 项目）二次开发
- 仅支持 Linux 平台
- 预训练模型：duration4k.h5 / acous12k.h5 / vocoder800k.h5

## Game Dev Relevance
- **NPC 语音定制**：游戏开发者只需录制一段参考语音即可为 NPC 生成定制语音
- **多角色配音**：通过不同参考音频快速切换角色声音风格
- **风格迁移**：支持中性/高兴/惊讶/愤怒/悲伤等情感参考（但训练数据仅用中性语料，域外情感迁移仍有挑战）
- **实时推理**：相比 [[chat-tts]] 和 [[gpt-sovits]]，Unet-TTS 更适合快速克隆而非精细控制

## Limitations
- 训练语料仅使用中性情感语音，强烈情感的风格迁移效果有限
- 域外风格迁移（模仿未见过的说话风格）仍有挑战
- 仅支持中文合成

## Related
- [[chat-tts]] — 流式中文 TTS，适合对话生成
- [[gpt-sovits]] — 零样本/少样本语音克隆，支持中英文日
- [[ai-game-devtools/voice-craft]] — 零样本语音克隆与编辑，音频 Prompt 驱动
