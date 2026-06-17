---
title: Bert-VITS2
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, open-source, speech, python]
sources: [raw/articles/ai-game-devtools/bert-vits2.md]
---

# Bert-VITS2

VITS2 语音合成模型，在 VITS2 骨干网络上集成多语言 BERT 特征，实现高质量多语言文本转语音（TTS）。由 fishaudio 团队开发。

## 概述

Bert-VITS2 将 VITS2 的端到端 TTS 架构与多语言 BERT 文本编码器结合，通过 BERT 提取的语义特征增强音素级别的语音生成质量。支持多语言 TTS（中文/日文/英文等），特别适合 VTuber 语音合成、游戏 NPC 语音、角色声音克隆等场景。

## 技术架构

| 模块 | 关键组件 | 说明 |
|------|---------|------|
| 文本编码 | 多语言 BERT + 音素嵌入 | BERT 语义特征 + 音素级语言学特征 |
| 声学模型 | VITS2 变分自编码器 | 端到端文本→波形生成，CTC 损失辅助对齐 |
| 音素对齐 | MFA/蒙特利尔强制对齐 | 自动标注音素-音频对应关系 |
| 声码器 | HiFi-GAN | 神经声码器，高质量波形生成 |
| 语音语言模型 | WavLM base-plus | 辅助语音特征提取 |

## 关键文件

- **`models.py` / `modules.py`** — VITS2 核心模型架构
- **`train_ms.py`** — 多说话人训练脚本
- **`bert/` / `text/`** — 多语言 BERT 和文本预处理管线
- **`webui.py`** — Gradio Web 界面
- **`webui_preprocess.py`** — 数据预处理引导界面（推荐学习入口）
- **`infer.py`** — 标准推理
- **`onnx_infer.py` / `export_onnx.py`** — ONNX 导出部署
- **`compress_model.py`** — 模型压缩

## 许可证

仓库包含许可证文件（具体类型参见仓库 LICENSE）。

## 维护状态

⚠️ **短期维护暂停**。开发者推荐使用后继项目 Fish-Speech（fishaudio/fish-speech），基于自回归架构，达到开源 SOTA 水准且持续维护。

## 游戏开发应用

- **NPC 语音合成** — 训练角色专属声音，输入文本生成自然语音
- **VTuber/角色配音** — 少量音频样本即可微调出角色音色
- **ONNX 部署** — 支持导出为 ONNX 格式，可在游戏引擎中离线运行
- **多语言支持** — 中文/日文/英文等多语言 TTS，适合国际化游戏

## 相关工具

- [[so-vits-svc]] — SoftVC VITS 歌唱语音转换：VITS 声码器 + SoftVC 内容编码器，最流行开源 SVC 框架，与 Bert-VITS2 共享 VITS 架构基础
- [[diffsinger]] — 扩散模型歌唱语音合成：浅扩散机制加速推理，同样使用 NSF-HiFiGAN 声码器
- [[applio]] — RVC 的现代化封装，含 edge-tts TTS 管线
