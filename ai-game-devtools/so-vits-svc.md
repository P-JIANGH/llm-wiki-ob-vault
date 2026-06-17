---
title: so-vits-svc — SoftVC VITS Singing Voice Conversion
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, audio, open-source, game-dev, python, voice-conversion, diffusion]
sources: [raw/articles/ai-game-devtools/so-vits-svc.md]
---

# so-vits-svc — SoftVC VITS Singing Voice Conversion

**GitHub:** https://github.com/svc-develop-team/so-vits-svc
**License:** AGPL 3.0
**Stars:** 23.9k+ | **Forks:** 3.6k+
**Status:** 4.1-Stable 分支，有限更新/存档状态

## 概述

so-vits-svc 是最流行的开源歌唱语音转换（SVC）框架之一。使用 SoftVC 内容编码器从源音频提取语音特征向量，直接输入 VITS 进行音色转换，无需转换为文本中间表示，从而保留原始音频的音调和语调。使用 [[diffsinger]] 的 NSF HiFiGAN 声码器替代原始 VITS 声码器，解决了声音中断问题。

## 核心架构

### 三阶段管线
1. **预处理** — 音频切片(5-15s) → 44100Hz 重采样 → 数据集划分 → Hubert 特征 + F0 提取
2. **训练** — Sovits 主模型 + 可选扩散模型 + 可选聚类模型
3. **推理** — 特征提取 → VITS 解码 → 输出转换音频

### 13 种语音编码器
支持 ContentVec (推荐)、HubertSoft、Whisper-PPG、CNHubertLarge、DPHuBERT、WavLM-Base+、Onnx 版本等，灵活适配不同场景。

### 扩散模型集成
- **浅层扩散（Shallow Diffusion）**：VITS 输出叠加 DDSP 扩散，有效改善电音问题
- **仅扩散模式（Only Diffusion）**：不加载 Sovits 模型，纯扩散推理
- 与 [[ai-game-devtools/diffusion-svc]] 兼容，可使用其预训练模型

### 音色控制方案
- **K-means 聚类** — 减少音色泄漏，低推理成本
- **特征检索** — 从 [[retrieval-based-voice-conversion-webui]] 借鉴的 TopK 检索方案
- **静态音色混合** — 多模型参数凸/线性组合
- **动态音色混合** — 时间线级别多音色渐变

## 技术特点

| 维度 | 详情 |
|------|------|
| 语言 | Python 3.8.9 |
| 核心依赖 | PyTorch, librosa, fairseq |
| F0 预测器 | RMVPE(默认)/FCPE/CREPE/DIO/PM/Harvest |
| 声码器 | NSF-HiFiGAN / NSF-Snake-HiFiGAN |
| 推理输出 | WAV 音频 / ONNX 模型 / Flask API |
| GPU 要求 | 训练需 NVIDIA GPU，推理可 CPU |
| ONNX 支持 | 可导出 ONNX，兼容 [[ai-game-devtools/moe-voice-studio]] |

## 与同类工具差异

- vs [[retrieval-based-voice-conversion-webui]]：RVC 侧重一键式 WebUI + 实时转换，so-vits-svc 侧重研究灵活性和模块可配置性
- vs [[diffsinger]]：DiffSinger 专注歌唱合成（TTS for singing），so-vits-svc 专注语音转换（SVC，源音频→目标音色）
- vs [[ai-game-devtools/ddsp-svc]]：DDSP-SVC 使用 DDSP 声码器，so-vits-svc 4.1 整合了浅层扩散作为后处理选项

## 游戏开发应用

- NPC 语音变声：将开发者录音转换为游戏角色音色
- 虚拟偶像/VTuber 实时变声管线（配合 w-okada/voice-changer）
- 多语言配音：用一种语言录音转换为另一种语言的发音风格
- 音乐游戏角色歌曲生成

## 注意事项

- 项目已进入有限更新状态，原作者删库后由社区重建
- 强调仅供学术/虚构角色使用，不涉及真人
- 训练数据授权问题需用户自行解决
- 与 VITS 模型不通用（SVC ≠ TTS）
