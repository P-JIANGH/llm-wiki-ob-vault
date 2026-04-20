---
title: EVF-SAM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, multimodal, model, vision, open-source]
sources: [raw/articles/ai-game-devtools/evf-sam.md]
---

# EVF-SAM

> Early Vision-Language Fusion for Text-Prompted Segment Anything Model

## Overview

**EVF-SAM** 是由华中科技大学（HUST）和 vivo AI Lab 联合开发的开源多模态分割模型，将 SAM（Segment Anything Model）的图像分割能力与文本提示相结合，实现"指代表达分割"（Referring Expression Segmentation）。支持图像和视频的文本驱动分割，2024 年 6 月发布于 arXiv。

## Key Facts

| Property | Value |
|---------|-------|
| **Release** | 2024-06 |
| **Authors** | Yuxuan Zhang, Tianheng Cheng et al. (HUST, vivo AI Lab) |
| **Paper** | arXiv:2406.20076 |
| **License** | Not explicitly stated |
| **HF Models** | [YxZhang/evf-sam](https://huggingface.co/YxZhang/evf-sam), [YxZhang/evf-sam2](https://huggingface.co/YxZhang/evf-sam2) |
| **Demo** | [HF Space v1](https://huggingface.co/spaces/wondervictor/evf-sam), [HF Space v2](https://huggingface.co/spaces/wondervictor/evf-sam2) |

## Architecture

- **Base**: SAM (v1) 或 SAM-2 图像分割器
- **Vision Encoder**: BEIT-3-Large (1.32B params) 或 BEIT-3-Base
- **Text Encoder**: BEIT-3 多模态编码器
- **融合策略**: Early Fusion —视觉特征与语言特征在送入 mask decoder 前融合
- **核心创新**: 将语言理解能力注入 SAM 的分割 prompt encoder

## Model Variants

| Model | SAM Base | Params | Decoder | gIoU / cIoU |
|-------|---------|--------|---------|-------------|
| EVF-SAM | SAM-H | 1.32B | train | 83.7 |
| EVF-SAM2 | SAM-2-L | 898M | freeze | 83.6 |
| EVF-SAM-multitask | SAM-H | 1.32B | train | 84.2 |
| EVF-Effi-SAM-L | EfficientSAM-S | 700M | train | 83.5 |
| EVF-Effi-SAM-B | EfficientSAM-T | 232M | train | 80.0 |

## Capabilities

- **指代分割**: 自然语言描述定位图像中特定对象（如 "zebra top left"、"a pizza with a yellow sign"）
- **语义分割**: `[semantic]` 前缀分割类别级内容（hair、sky、ground）
- **部位分割**: `[body-part]` 前缀分割人体部位
- **多任务**: multitask 版本同时支持分割、部位、语义三类任务
- **视频分割**: EVF-SAM2 支持零样本视频文本驱动分割（基于 SAM-2）
- **快速推理**: T4 GPU 数秒完成单图推理

## Tech Stack

- **Framework**: PyTorch, Transformers, TIMM, Accelerate, Deepspeed
- **Vision Backbone**: BEIT-3, SAM, SAM-2, EfficientSAM
- **Key deps**: einops, opencv-python, pycocotools, torchscale, hydra-core

## Games Relevance

视觉分割是游戏开发中的重要能力：
- 游戏角色/场景的 AI 驱动分割
- 实时图像抠图与合成
- NPC 视觉识别与跟踪
- 动作捕捉数据处理

## Related

- [[ai-game-devtools/cambrian-1]] — 同样基于 BEIT-3 的视觉中心 MLLM
- [[ai-game-devtools/imagebind]] — Meta AI 六模态联合嵌入模型（图像/文本/音频/深度/热成像/IMU），同为视觉驱动的多模态模型
