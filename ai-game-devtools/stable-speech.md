---
title: Parler-TTS (Stable Speech)
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tts, speech, audio, open-source, tool]
sources: [raw/articles/ai-game-devtools/stable-speech.md]
---

# Parler-TTS (Stable Speech)

> Hugging Face 开源的自然语言控制文本转语音模型，Apache 2.0 完全开放。基于 Stability AI + Edinburgh University 论文复现。

## 概述

Parler-TTS 是一个轻量级 TTS 模型，能用自然语言描述控制语音风格（性别、音调、语速、录制质量等）。与许多闭源 TTS 不同，它发布了**全部数据集、预处理流程、训练代码和权重**，采用 Apache 2.0 许可。

- **仓库:** https://github.com/sanchit-gandhi/stable-speech
- **论文:** [Natural language guidance of high-fidelity text-to-speech with synthetic annotations](https://arxiv.org/abs/2402.01912) (Lyth & King, Stability AI + Edinburgh University)
- **版本:** v0.2.2
- **发布:** 2024-08-08

## 模型规格

| 型号 | 参数量 | HuggingFace |
|------|--------|-------------|
| Parler-TTS Mini | 880M | parler-tts/parler-tts-mini-v1 |
| Parler-TTS Large | 2.3B | parler-tts/parler-tts-large-v1 |

两者均在 45,000 小时有声书数据上训练。

## 技术架构

**编码器-解码器架构：**
- **文本编码器:** 可配置（T5 等），编码说话人描述提示
- **解码器:** 自回归因果 LM，生成音频 token
- **音频编解码器:** Descript Audio Codec (DAC) — 8kbps @ 44kHz, 8 codebooks

**双输入设计：**
1. **描述提示** — 自然语言描述声音特征（"A female speaker delivers slightly expressive speech..."）
2. **文本提示** — 实际要朗读的内容

**34 个预设命名说话人:** Laura, Jon, Mike, Yann 等，每个有独特声音特征。

## 推理优化

- **SDPA:** 默认启用，1.4x 加速
- **Flash Attention 2:** 支持
- **torch.compile:** `mode="reduce-overhead"` + 静态缓存，最高 4.5x 加速
- **流式输出:** ParlerTTSStreamer，现代 GPU 上首段音频 < 500ms
- **批量生成:** 多样本并行处理

## 训练

基于 HuggingFace Accelerate，一行命令复现 Mini v1 训练：
```bash
accelerate run_parler_tts_training.py helpers/training_configs/starting_point_v1.json
```

支持 Colab 微调笔记（单说话人数据集微调指南）。

## 许可证

**Apache License 2.0** — 完全开放，允许商业使用。

## 游戏开发应用

- **NPC 语音生成:** 自然语言控制语音风格，无需录音即可获得多样化 NPC 声音
- **实时流式对话:** Streaming 支持游戏内实时 NPC 语音输出
- **34 种预设声音:** 独立游戏开箱即用的语音多样性
- **Unity/Unreal 集成:** 可通过 API 服务接入游戏引擎 NPC 对话系统
- **对比 [[cosyvoice]]:** CosyVoice 是阿里开源（支持中文+跨语言），Parler-TTS 专注英文自然语言控制；[[openvoice]] 侧重零样本音色克隆，Parler-TTS 侧重风格描述控制

## 相关链接

- [HuggingFace Demo](https://huggingface.co/spaces/parler-tts/parler_tts)
- [HuggingFace 模型](https://huggingface.co/parler-tts)
- [Data-Speech 数据集标注仓库](https://github.com/huggingface/dataspeech)
- [微调指南](https://github.com/ylacombe/scripts_and_notebooks/blob/main/Finetuning_Parler_TTS_v1_on_a_single_speaker_dataset.ipynb)
