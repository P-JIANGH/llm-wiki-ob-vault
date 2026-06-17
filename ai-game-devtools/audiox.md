---
title: AudioX
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, multimodal, tool, open-source]
sources: [raw/articles/ai-game-devtools/audiox.md]
---

# AudioX

HKUST 音频生成统一框架：支持文本/视频/音频多模态条件 → 音频/音乐生成，基于 Diffusion Transformer + 多模态自适应融合 (MAF)，ICLR 2026 接收。

## Overview

AudioX 是一个 **Anything-to-Audio** 统一生成框架，能将多种模态输入（文本描述、视频画面、参考音频）灵活组合，生成对应的音频或音乐。核心创新是 **Multimodal Adaptive Fusion (MAF)** 模块，可有效融合异构多模态信号，增强跨模态对齐并提升生成质量。

为训练该统一模型，作者构建了 **IF-caps** 数据集（700万+样本），通过结构化标注流水线提供多模态条件音频生成的全面监督。

## 支持任务

| 任务 | 输入模态 | 说明 |
|------|---------|------|
| T2A | 文本 | 文本到音效（如键盘声） |
| T2M | 文本 | 文本到音乐（如钢琴+小提琴） |
| V2A | 视频+文本 | 视频配通用音效 |
| V2M | 视频+文本 | 视频配背景音乐 |
| TV2A | 视频+文本 | 文本+视频联合生成音效 |
| TV2M | 视频+文本 | 文本+视频联合生成音乐 |

## 架构与技术特点

- **DiT 主干**：Diffusion Transformer 作为音频生成骨干网络
- **MAF 模块**：多模态自适应融合，处理文本/视频/音频混合输入
- **MMDiT 变体**：增强版多模态 Diffusion Transformer
- **Synchformer 编码器**：基于 MotionFormer 的视频特征提取，实现视觉-音频对齐
- **VAE 音频自编码器**：潜空间扩散，降低计算复杂度
- **推理配置**：DPM++ 3M SDE 采样器，250 步，CFG scale=7

### 三个预训练模型

1. **AudioX** — 基础模型，通用音频和音乐生成
2. **AudioX-MAF** — 加入 MAF 机制的增强版
3. **AudioX-MAF-MMDiT** — MAF + MMDiT 完整版

## 数据集

- **IF-caps**：700万+样本，结构化标注流水线，HuggingFace 公开可用

## 许可证

CC-BY-NC 4.0（署名-非商业性使用）。模型带水印，仅限非商业用途。

## 相关链接

- [GitHub](https://github.com/ZeyueT/AudioX)
- [arXiv 论文](https://arxiv.org/abs/2503.10522)
- [项目主页](https://zeyuet.github.io/AudioX/)
- [HuggingFace 模型](https://huggingface.co/collections/HKUSTAudio/audiox)
- [HuggingFace Demo](https://huggingface.co/spaces/Zeyue7/AudioX)

## 与同类工具的差异

- 相比 [[musicgen]]（Meta 单阶段自回归），AudioX 采用扩散模型 + 多模态融合，支持视频/音频联合条件输入
- 相比 [[audioldm-2]]（仅文本条件），AudioX 统一了文本/视频/音频三种条件模态
- 相比 [[amphion]]（综合音频工具箱），AudioX 专注于统一的多模态条件生成框架

## 来源

- [[ai-game-devtools-catalog]] — Yuan-ManX AI Game DevTools 目录（Audio 分类）
