---
title: "SonicMaster"
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, tool, audio, music, open-source, python]
sources: [raw/articles/ai-game-devtools/sonicmaster.md]
---

# SonicMaster

## Overview

SonicMaster 是由 AMAAI-Lab (Jan Melechovsky, Ambuj Mehrish, Dorien Herremans) 开发的**首个统一生成模型**，用于同时进行音乐修复（restoration）和母带处理（mastering）。它解决了非专业录音中常见的音频质量问题，无需使用多个专用工具和手动调整。

## 核心功能

- **统一管线：** 将修复（去除伪影）和母带处理（音色/空间增强）整合到单个生成模型中
- **文本控制：** 接受自然语言提示，实现定向的用户控制音频增强
- **自动模式：** 无需手动提示即可进行通用质量改善
- **架构基础：** 基于 **SonicVerse 架构**，集成音乐标注与特征检测

## 处理问题类型

- 过度混响（excessive reverberation）
- 失真和削波（distortion, clipping）
- 音色不平衡（tonal imbalances）
- 声像狭窄（narrowed stereo image）

## 技术特点

| 项目 | 详情 |
|------|------|
| **Python 版本** | 严格需要 Python 3.13 |
| **训练方式** | 预编码 PyTorch 张量（.pt 文件）加速训练 |
| **推理模式** | 单文件推理 / 全曲推理 / 批量推理 |
| **依赖安装** | `pip install -r requirements_sonic.txt` |

## 关键模块

- `model.py` — 核心 SonicMaster 架构与模型定义
- `infer_single.py` — 单文件推理
- `inference_fullsong.py` — 全曲推理管线
- `inference_ptload_batch.py` — 基于预编码 .pt 文件的批量推理
- `train_ptload_inference.py` — 主训练脚本（支持训练中周期性推理评估）
- `preencode_latents_acce2.py` — 音频到潜空间张量的预编码工具

## 训练流程

1. 使用 `preencode_latents_acce2.py` 将原始音频编码为潜空间 `.pt` 张量
2. 将 `.pt` 文件路径组织到 JSONL 元数据文件中
3. 运行 `train_ptload_inference.py` 训练（直接加载 .pt 张量，无需原始音频）
4. 训练期间支持周期性推理，实时跟踪修复质量

## 与同类工具的差异

- **vs [[ai-game-devtools/musicgen]]：** MusicGen 专注于从零生成音乐（text-to-music），SonicMaster 专注于修复和母带处理已有音频
- **vs [[ai-game-devtools/jukebox]]：** JukeBox 是分层 VQ-VAE + Transformer 的音乐生成模型，SonicMaster 是修复/母带处理的统一管线
- **vs [[ai-game-devtools/audio-editing]]：** 传统音频编辑工具需要多个专用步骤，SonicMaster 通过单个生成模型完成所有处理
- **vs [[ai-game-devtools/any-accomp]]：** AnyAccomp 专注于伴奏生成，SonicMaster 处理全曲修复

## 相关链接

- 📄 [arXiv:2508.03448](http://arxiv.org/abs/2508.03448)
- 🤗 [Hugging Face Model](https://huggingface.co/amaai-lab/SonicMaster/tree/main)
- 🎧 [Hugging Face Space Demo](https://huggingface.co/spaces/amaai-lab/SonicMaster)
- 🌐 [Audio Samples](https://amaai-lab.github.io/SonicMaster/)
- 📊 [Training Dataset](https://huggingface.co/datasets/amaai-lab/SonicMasterDataset)
- 📦 [GitHub](https://github.com/AMAAI-Lab/SonicMaster)

## 许可证

未明确指定（查看 GitHub 仓库的 LICENSE 文件）
