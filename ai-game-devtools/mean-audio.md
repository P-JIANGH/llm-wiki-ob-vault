---
title: MeanAudio — MeanFlow 文本到音频生成
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, open-source, tool, python, framework]
sources: [raw/articles/ai-game-devtools/mean-audio.md]
---

# MeanAudio

## 概述

MeanAudio 是基于 **MeanFlow** 目标的文本到音频生成模型，由上海交通大学 Xiquan Li 等人开发。核心优势是**单步生成高质量音频**，在单张 RTX 3090 上实时率 (RTF) 仅 0.013。

- **论文**: arXiv 2508.06098 (2025-08)
- **HuggingFace**: [Model](https://huggingface.co/AndreasXi/MeanAudio) | [Space](https://huggingface.co/spaces/chenxie95/MeanAudio)
- **Demo**: https://meanaudio.github.io/
- **GitHub**: https://github.com/xiquan-li/MeanAudio

## 模型变体

| 模型 | 参数量 | 训练数据 | 目标函数 |
|------|--------|----------|----------|
| MeanAudio-S-AC | 120M | AudioCaps | Mean Flow |
| MeanAudio-S-Full | 120M | ~10K小时全数据集 | Mean Flow |
| MeanAudio-L-Full | 480M | ~10K小时全数据集 | Mean Flow |
| FluxAudio-S-Full | 120M | ~10K小时全数据集 | Flow Matching |

全数据集 = AudioCaps + WavCaps + AudioSet + VGGSound + LP-MusicCaps (~3M 音频-文本对)

## 技术架构

- **核心模型**: Flux 风格 Flow Transformer
- **目标函数**: MeanFlow（支持单步+多步生成）或标准 Flow Matching
- **文本编码**: T5 + CLAP 双编码器（可拼接）
- **音频 VAE**: 1D VAE（源自 [[ai-game-devtools/make-an-audio-3]] 的 BigVGAN 声码器）
- **序列配置**: 16kHz（10 秒）或 44kHz 模式
- **训练**: DDP 分布式 + AMP 混合精度 + PostHocEMA + torch.compile

## 训练管线

1. **特征提取**: 音频切 10s 片段 → 提取 VAE 潜变量 + T5/CLAP 文本特征 → NPZ 格式
2. **预训练** (可选): 标准 Flow Matching 目标训练 Flow Transformer
3. **MeanFlow 微调**: 从 Flow Matching 预训练权重初始化，用 MeanFlow 目标微调
4. **评估**: 使用 av-benchmark 计算 FD-VGG/FD-PASST/CLAP-Score 等指标

## 性能特点

- 单步 RTF 0.013（RTX 3090），比传统扩散模型快 25 倍以上
- 多步生成质量同样出色，支持 CFG 强度调节
- 零样本泛化到未见过的音频类型

## 游戏开发应用场景

- **音效生成**: 文本描述→游戏音效（爆炸/脚步声/环境声）
- **实时音频合成**: 单步生成速度支持运行时动态音频
- **程序化音频**: 与游戏事件绑定，按需生成匹配音效

## 与其他音频工具的差异

- vs [[ai-game-devtools/audioldm-2]]: AudioLDM 2 使用标准扩散，MeanAudio 用 MeanFlow 实现单步生成
- vs [[ai-game-devtools/amphion]]: Amphion 是综合音频工具包（TTS/VC/SVC），MeanAudio 专注 T2A 生成
- vs [[ai-game-devtools/audiogen-codec]]: AudioGen Codec 仅做编解码，MeanAudio 是完整生成模型
