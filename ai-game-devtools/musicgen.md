---
title: MusicGen
created: 2026-04-20
updated: 2026-04-21
type: entity
tags: [ai, music, audio, open-source, tool, python]
sources: [web:https://github.com/facebookresearch/audiocraft, web:https://huggingface.co/spaces/facebook/MusicGen, raw/articles/ai-game-devtools/musicgen.md]
---

# MusicGen

**Meta AI 音乐生成模型，AudioCraft 家族核心组件**

## Overview

MusicGen 是 Meta AI Research 开发的单阶段自回归音乐生成模型，属于 [[ai-game-devtools/audiocraft|AudioCraft]] PyTorch 库的核心组件。不同于 MusicLM 等需要自监督语义表示的方法，MusicGen 直接在 EnCodec 离散音频 token 上训练，单次生成全部 4 个 codebook（通过 delay pattern 实现并行），仅需每秒 50 步自回归即可完成音频生成。

训练数据：20K 小时授权音乐（10K 高质量内部数据 + ShutterStock + Pond5）。

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Meta AI Research (Jade Copet, Alexandre Défossez et al.) |
| **Architecture** | 单阶段自回归 Transformer，EnCodec token 预测 |
| **Tokenizer** | EnCodec 32kHz，4 codebooks @ 50Hz，cardinality 2048 |
| **Model Sizes** | small (300M), medium (1.5B), large (3.3B), melody variants, stereo variants |
| **Input Modalities** | 文本提示、音频提示、旋律条件（chromagram） |
| **Conditioning** | T5 文本编码器 + chroma 特征提取 |
| **Training Data** | 20K 小时授权音乐 |
| **License** | 代码 MIT，模型权重 CC BY-NC 4.0（非商用） |
| **论文** | NeurIPS 2023, arXiv:2306.05284 |

## Architecture

### 核心管线

1. **Tokenization**: 原始波形 → EnCodec 神经编解码器 → 4 组离散 codebook tokens
2. **Language Model**: Transformer 预测 audio token 序列，受文本/旋律条件控制
3. **Delay Pattern**: codebook 间引入小延迟，实现并行预测（50 steps/sec）
4. **Decoding**: 生成 tokens → EnCodec 解码器 → 重建波形

### 预训练模型矩阵

| 模型 | 参数量 | 条件类型 | HuggingFace |
|------|--------|----------|-------------|
| musicgen-small | 300M | 文本→音乐 | facebook/musicgen-small |
| musicgen-medium | 1.5B | 文本→音乐 | facebook/musicgen-medium |
| musicgen-melody | 1.5B | 文本+旋律→音乐 | facebook/musicgen-melody |
| musicgen-large | 3.3B | 文本→音乐 | facebook/musicgen-large |
| musicgen-melody-large | 3.3B | 文本+旋律→音乐 | facebook/musicgen-melody-large |
| Stereo 变体 | 同上 | +立体声生成 | facebook/musicgen-stereo-* |

### 与其他 AudioCraft 模型的关系

- **EnCodec**: 底层神经音频编解码器，为 MusicGen 提供 tokenization
- **AudioGen**: 同架构但专注于环境音效生成
- **MAGNeT**: 非自回归替代方案，更快速度
- **Multi Band Diffusion**: EnCodec 兼容的扩散解码器，提升音质
- **JASCO**: 和弦/旋律/鼓点条件化音乐生成
- **AudioSeal**: 音频水印

## 训练框架

- **Solver**: `MusicGenSolver` 定义自回归语言建模任务
- **Experiment Framework**: Dora 实验调度（`dora grid musicgen/musicgen_base_32khz`）
- **Scale 配置**: `model/lm/model_scale=small|medium|large`
- **缓存**: EnCodec token 预计算加速训练
- **分布式**: FSDP 支持 3.3B 大模型训练
- **立体声训练**: `interleave_stereo_codebooks.use=True` + `channels=2`

## Usage in AI Game Development

- **程序化音乐生成**: 根据游戏状态动态生成配乐
- **资产原型制作**: 快速生成占位音乐
- **场景情绪音乐**: 从文本描述生成对应氛围的背景音乐
- **旋律引导创作**: 输入旋律片段 → AI 补全完整编曲
- **NPC 对话配乐**: 与 [[wavjourney]] 管线集成，构建完整音频叙事
- **音效补充**: 与 [[ai-game-devtools/audiogen-codec|AudioGen]] 配合，覆盖音乐+音效全场景

## Related Projects

- [[audiocraft]] — AudioCraft PyTorch 库（MusicGen 所在框架）
- [[jukebox]] — OpenAI 先驱性自回归音乐生成，3级VQ-VAE+分层Transformer
- [[magenta]] — Google Brain AI 艺术/音乐生成研究项目
- [[wavjourney]] — LLM 驱动的组合式音频创作管线（使用 MusicGen 作为音乐组件）
- [[flux-music]] — Rectified Flow 架构音乐生成，对比 MusicGen 的 AR 方案
