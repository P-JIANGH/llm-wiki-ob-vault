---
title: VisualRWKV
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [vlm, vision, rwkv, multimodal, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/visualrwkv.md]
---

# VisualRWKV

## Overview

VisualRWKV 是基于 RWKV 架构的视觉语言模型（VLM），将 RWKV 的纯文本能力扩展到多模态视觉任务。由 howard-hou 主导开发，论文发表于 arXiv:2406.13362。

作为 [[chatrwkv]] 的视觉增强版本，VisualRWKV 结合了 RWKV 的 RNN 高效推理和视觉编码器，使模型能够理解图像并生成相关文本响应。

## Key Facts

| Fact | Detail |
|---|---|
| 架构 | RWKV 语言骨干 + 视觉编码器（SigLIP/DINOv2/SAM 或 CLIP） |
| 模型规模 | 0.1B / 0.4B / 1.5B / 3B / 7B |
| 最新稳定版 | v7.00（VisualRWKV-v7/v7.00） |
| 论文 | [arXiv:2406.13362](https://arxiv.org/abs/2406.13362) |
| 权重 | HuggingFace: howard-hou/visualrwkv-6 |
| Demo | [Gradio Space](https://huggingface.co/spaces/howard-hou/VisualRWKV-Gradio-1) |
| 仓库 | [GitHub](https://github.com/howard-hou/VisualRWKV) |
| Commits | 486 |

## Benchmark Performance

| 模型 | VQAv2 | ScienceQA(IMG) | TextVQA | GQA | 视觉编码器 |
|---|---|---|---|---|---|
| v0700+1b5 (1.5B) | **79.84** | **59.74** | **49.49** | **63.20** | SigLIP+dinov2+Sam |
| v6 7B | 75.82 | **68.22** | 51.01 | 64.27 | CLIP |
| v6 3B | 71.52 | 65.34 | 48.68 | 59.56 | CLIP |

v7.0 系列在同量级下全面超越 v6，尤其在 VQAv2 和 ScienceQA 上提升明显。v7 采用 SigLIP+DINOv2+SAM 三编码器组合，而 v6 仅用 CLIP。

## Architecture

### 两阶段训练

1. **Pre-training**: 使用 LLaVA-Pretrain 数据集，在 RWKV World 系列预训练权重基础上接入视觉投影层
2. **Visual Instruction Tuning**: 使用 LLaVA 视觉指令数据集进行指令微调

### 视觉编码器选择

- **v6 系列**: CLIP（单编码器）
- **v7 系列**: SigLIP + DINOv2 + SAM（三编码器组合，多尺度视觉特征融合）

### 与 RWKV 的关系

继承 RWKV 的核心优势：
- **O(n) 推理复杂度** — RNN 递推而非 attention 的 O(n²)
- **状态保持** — 推理过程中保持 hidden state，适合流式/长上下文场景
- **低 VRAM 占用** — 3GB VRAM 可运行 14B 文本模型

## Game Development Use Cases

- **场景理解 NPC** — 结合视觉输入让 NPC 能"看到"游戏画面并做出智能响应
- **游戏内视觉问答** — 玩家截图后 AI 解答游戏策略、物品识别等
- **实时视频分析** — RNN 特性适合处理连续帧（视频流），可用于游戏录像分析
- **低硬件门槛部署** — RWKV 的高效推理使本地多模态 AI 在消费级 GPU 上可行

## Related

- [[chatrwkv]] — RWKV 纯文本对话界面，VisualRWKV 的基础
- [[RWKV-LM]] — RWKV 主仓库
- [[vlm]] — 视觉语言模型概念页面
