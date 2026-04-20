---
title: Liquid Audio — LFM2.5 端到端语音到语音基础模型
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, audio, speech, open-source]
sources: [raw/articles/ai-game-devtools/liquid-audio.md]
aliases: [LFM2-Audio, LFM2.5-Audio-1.5B, liquid-audio]
---

# Liquid Audio — LFM2.5 端到端语音到语音基础模型

## 概述

Liquid Audio 是 Liquid AI 推出的首个端到端音频基础模型 **LFM2.5-Audio-1.5B**，基于轻量级 LFM2.5-1.2B 骨干网络构建，专为低延迟实时语音对话设计。模型支持两种生成模式：交错生成（Interleaved）和顺序生成（Sequential），分别适用于实时对话和 ASR/TTS 等独立任务。

## 核心功能

### 1. 多轮语音对话（Interleaved 模式）
- 文本和音频 token 按固定交错模式输出
- 最小化首次音频输出时间，适合资源受限设备上的实时交互
- 支持对话历史管理，通过 ChatState 类维护上下文

### 2. 语音识别 ASR（Sequential 模式）
- 固定系统提示 "Perform ASR."
- 输出带标点和大小写的文本
- 基于 LFM2.5 骨干，ASR 质量优于前代

### 3. 文本转语音 TTS（Sequential 模式）
- 4 种预定义声音：US 男声/女声、UK 男声/女声
- 通过不同系统提示切换声音
- LFM2.5 版本改进 TTS 声音质量

## 技术架构

```
音频输入 → Conformer 编码器 → MLP 适配器 → LFM2 骨干 → Depthformer → Mimi 8-codebook 解码 → 24kHz 波形
文本输入 → LFM2 Token Embedding ↗
```

| 组件 | 作用 |
|------|------|
| Conformer Encoder | 音频 log-mel 特征提取，Nvidia NeMo 架构（Apache 2.0） |
| MLP Audio Adapter | 将 Conformer 输出映射到 LFM 隐藏空间 |
| LFM2 Backbone | LFM2.5-1.2B 语言模型骨干，支持 Flash Attention 2 |
| Depthformer | 多层自回归音频 codebook 预测 |
| Mimi Codec | Kyutai 神经音频编解码器，8 codebooks × 2048 tokens，MIT 许可 |

### 关键参数
- **音频词表**: 2048 tokens + 1 EOAudio（音频结束标记）每 codebook
- **输出采样率**: 24kHz
- **生成控制**: temperature、top_k 分别控制文本和音频采样的随机性
- **代码簿偏移**: 使用共享嵌入表 + codebook offsets 跨 8 个 codebook

## 安装与使用

```bash
pip install liquid-audio
pip install "liquid-audio[demo]"  # 可选：Gradio demo 依赖
liquid-audio-demo                  # 启动 http://localhost:7860
```

模型通过 HuggingFace `from_pretrained` 加载：`LiquidAI/LFM2.5-Audio-1.5B`

## 许可证

- 代码和权重：LFM Open License v1.0
- 音频编码器：Nvidia NeMo（Apache 2.0）+ canary-180m-flash（CC-BY 4.0）
- Mimi 编解码器：Kyutai Mimi（MIT）

## 与其他工具的差异

| 对比维度 | Liquid Audio | [[ai-game-devtools/musicgen]] | [[ai-game-devtools/chat-tts]] |
|----------|-------------|-------------------------------|------------------------------|
| 任务类型 | 端到端语音→语音（含对话） | 文本→音乐生成 | 文本→语音合成 |
| 生成模式 | 交错/顺序双模式 | 自回归单模式 | 自回归+流式 |
| 音频编码 | Mimi 8-codebook | EnCodec 4-codebook | 自定义 |
| 低延迟优化 | 专为实时对话设计 | 音乐质量优先 | 流式输出 |
| 模型大小 | 1.5B | 300M-3.3B | ~500M |

## 相关链接

- GitHub: https://github.com/Liquid4All/liquid-audio
- HuggingFace: https://huggingface.co/LiquidAI/LFM2.5-Audio-1.5B
- Liquid AI 官网: https://www.liquid.ai
