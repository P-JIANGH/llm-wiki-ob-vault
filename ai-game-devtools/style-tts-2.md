---
title: StyleTTS 2 — 人类级 TTS 通过风格扩散 + SLM 对抗训练
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, ai-model, open-source, tool, python, diffusion]
sources: [raw/articles/ai-game-devtools/style-tts-2.md]
---

# StyleTTS 2 — 人类级文本转语音模型

## 概述

StyleTTS 2 是哥伦比亚大学 Nima Mesgarani 实验室开发的文本转语音（TTS）模型，通过**风格扩散**（Style Diffusion）和**大型语音语言模型对抗训练**（SLM Adversarial Training）实现人类级语音合成。在单说话人 LJSpeech 数据集上超越人类录音，在多说话人 VCTK 数据集上与人类录音持平。论文发表于 arXiv 2306.07691。

- **GitHub:** https://github.com/yl4579/StyleTTS2
- **论文:** https://arxiv.org/abs/2306.07691
- **在线 Demo:** [HuggingFace](https://huggingface.co/spaces/styletts2/styletts2)
- **许可证:** MIT（代码）/ 特殊条件（预训练模型需告知听众为合成语音）

## 核心创新

| 特性 | 描述 |
|------|------|
| 风格扩散 | 将风格建模为潜在随机变量，通过扩散模型为文本生成最合适风格，无需参考语音 |
| SLM 对抗训练 | 使用预训练 WavLM 作为判别器 + 可微分持续时间建模，端到端优化提升自然度 |
| 零说话人适配 | 在 LibriTTS 上超越之前所有公开模型的零样本说话人适配能力 |
| 两阶段训练 | 第一阶段 TMA 对齐预训练 → 第二阶段联合训练（风格扩散 + SLM 对抗） |

## 技术架构

### 关键组件
- **PL-BERT** — 音素级 BERT 文本编码器（英语 Wikipedia 预训练，14 语言多语言版可用）
- **文本对齐器 (ASR)** — LibriTTS/JVS/AiShell 预训练，支持英/日/中
- **音高提取器 (JDC)** — 预训练 F0 提取，语言无关
- **风格扩散模型** — Transformer 架构（3 层 / 8 头 / 64 头维度），潜在空间扩散
- **SLM 判别器** — WavLM-base-plus（768 隐藏层 / 13 层），对抗训练
- **声码器** — HiFi-GAN 或 iSTFTNet 可选（iSTFTNet 默认）

### 训练配置
- 采样率: 24kHz / Hop: 300 / 音素词表: 178 / 风格维度: 128
- 第一阶段: 200 epochs（TMA 对齐预训练）
- 第二阶段: 100 epochs（风格扩散 epoch 20 起 + SLM 对抗 epoch 50 起）
- 批量大小: 16 / 学习率: 1e-4（PL-BERT: 1e-5）

### 预训练模型
- **LJSpeech 单说话人:** [HuggingFace](https://huggingface.co/yl4579/StyleTTS2-LJSpeech) — 24kHz
- **LibriTTS 多说话人:** [HuggingFace](https://huggingface.co/yl4579/StyleTTS2-LibriTTS) — 支持零样本适配

## 已知问题

- **DDP 不工作:** `train_second.py` 只能用 DP（数据并行），DDP 无法修复
- **NaN 损失:** 混合精度 + 小批量时可能出现，推荐批量大小 16
- **推理 GPL 依赖:** phonemizer 包为 GPL 许可，需使用 GPL 分支或 Gruut 替代
- **旧 GPU 噪音:** 旧显卡 FP32 数值差异导致高频背景噪音，建议用现代 GPU 或 CPU 推理

## 游戏开发应用场景

- **NPC 对话合成** — 人类级自然度语音，直接用于游戏角色台词
- **零样本音色克隆** — 短时间参考音频即可生成新角色声音
- **多语言支持** — 14 语言 PL-BERT，支持国际化游戏
- **微调定制** — 约 1 小时数据即可微调新角色音色（4 A100 约 4 小时）
- **风格多样性** — 扩散模型生成不同情感/语气的语音变体

## 与同类工具对比

- vs [[ai-game-devtools/glow-tts]]：Glow-TTS 基于流模型 + Monotonic Alignment Search，训练更快但自然度不如 StyleTTS 2 的扩散+对抗方案
- vs [[ai-game-devtools/stable-speech]]：Stable Speech (Parler-TTS) 用 Flow-Matching + DiT + 自然语言风格控制，侧重描述性控制；StyleTTS 2 用风格扩散+SLM 对抗，侧重音色质量和自然度
- vs [[ai-game-devtools/kitten-tts]]：Kitten TTS 超轻量 ONNX（15-80M 参数，纯 CPU），StyleTTS 2 质量更高但需要 GPU
- vs [[ai-game-devtools/voxcpm]]：VoxCPM 支持 30 语言 + 9 种中文方言，多语言覆盖更广；StyleTTS 2 英语自然度更优
