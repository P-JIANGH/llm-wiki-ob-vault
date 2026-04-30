---
title: OverFlow
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, tool, speech, audio, open-source, python]
sources: [raw/articles/ai-game-devtools/overflow.md]
---

# OverFlow

## Overview
OverFlow 是由 KTH Royal Institute of Technology (Shivam Mehta 等) 开发的文本到语音 (TTS) 模型，发表于 Interspeech 2023。其核心创新是在神经 transducer（基于 HMM 的序列到序列模型）之上叠加归一化流 (normalizing flow)，以获得更好的语音合成质量。

## Key Facts
- **论文**: "OverFlow: Putting flows on top of neural transducers for better TTS" (Interspeech 2023)
- **机构**: KTH Royal Institute of Technology (瑞典皇家理工学院)
- **代码**: https://github.com/shivammehta25/OverFlow
- **Demo**: https://shivammehta25.github.io/OverFlow/
- **许可证**: MIT (代码)
- **预训练模型**: 女声 (LJ Speech) 和男声 (RyanSpeech) 两个权重
- **已集成到**: Coqui TTS (`tts_models/en/ljspeech/overflow`)

## Architecture
OverFlow 由三个核心组件构成：

1. **Encoder** — Tacotron 2 风格编码器（3 层卷积 + 512 维嵌入），将音素序列编码为上下文表示
2. **HMM** — 隐马尔可夫模型作为神经 transducer 核心，负责文本-声学对齐，每音素 2 状态
3. **FlowSpecDecoder** — 归一化流解码器（12 blocks × 4 层），用于高质量 Mel 频谱建模

数据流：音素 → Encoder → HMM 对齐 → Flow Decoder → Mel 频谱 → HiFi-GAN → 音频

与 [[glow-tts]] 的关系：两者都使用归一化流进行频谱建模，但 Glow-TTS 使用 GMM 对齐，而 OverFlow 使用 HMM 作为对齐机制。与 [[matcha-tts]] 类似，都是 flow-based TTS 的代表。

## Technical Details
- **框架**: PyTorch + PyTorch Lightning
- **声码器**: HiFi-GAN v1
- **训练数据**: LJ Speech (英文女声, 22050 Hz, 80 维 Mel)
- **音素化**: CMU Pronouncing Dictionary + NLTK
- **混合精度**: 支持 FP16/FP32
- **分布式**: PyTorch Lightning 多 GPU 训练
- **部署**: Docker 一键部署

## Game Dev Relevance
OverFlow 作为开源 TTS 模型，可用于游戏 NPC 语音合成。其优势包括：
- MIT 许可，可商用
- 说话速率和采样温度可调，适合生成不同风格的 NPC 语音
- 轻量级模型（相比大型 LLM-based TTS），适合服务器端批量生成
- 已集成到 Coqui TTS 生态，便于与其他工具链配合
