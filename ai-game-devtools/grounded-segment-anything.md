---
title: Grounded-Segment-Anything
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, ml]
sources: [raw/articles/ai-game-devtools/grounded-segment-anything.md]
---

# Grounded-Segment-Anything

> IDEA Research 的开源视觉流水线：结合 Grounding DINO 零检测器 + SAM 分割模型，用文本提示检测和分割图像中任意对象

## Overview

**Grounded-Segment-Anything** 由 [IDEA Research](https://github.com/IDEA-Research) 开发，是一个将多个视觉专家模型组合成强大流水线的开源项目。核心思路：用 **Grounding DINO** 实现基于自由文本的零样本目标检测，再用 **SAM（Segment Anything Model）** 将检测框转换为像素级分割掩码。

项目于 2023 年发布，2024 年 1 月发布技术报告（arXiv:2401.14159），并在 ICCV 2023 上进行 Demo 展示。

## Key Facts

| Property | Value |
|---------|-------|
| **开发者** | IDEA Research |
| **首次发布** | 2023 |
| **技术报告** | [arXiv:2401.14159](https://arxiv.org/abs/2401.14159) |
| **GitHub** | [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) |
| **HF Space** | [IDEA-Research/Grounded-SAM](https://huggingface.co/spaces/IDEA-Research/Grounded-SAM) |
| **Colab** | [自动标注教程](https://colab.research.google.com/github/roboflow-ai/notebooks/blob/main/notebooks/automated-dataset-annotation-and-evaluation-with-grounding-dino-and-sam.ipynb) |
| **后继版本** | [Grounded SAM 2](https://github.com/IDEA-Research/Grounded-SAM-2) |

## Architecture

项目是一个**模型编排流水线**，各模块可单独使用或组合：

```
[Text Prompt] → Grounding DINO → [Bounding Boxes + Labels]
     ↓
[Boxes] → SAM / SAM-HQ → [Segmentation Masks]
     ↓
[Masks] → Stable Diffusion → [Inpainted Image] (可选)
```

**核心组件：**

| 组件 | 功能 | 来源 |
|------|------|------|
| **Grounding DINO** | 零样本开放世界目标检测，支持自由文本输入 | IDEA-Research/GroundingDINO |
| **SAM / SAM-HQ** | 可提示图像分割（框/点/文本→掩码） | facebookresearch/segment-anything |
| **Stable Diffusion** | 掩码区域重绘 / 图像生成 | CompVis/stable-diffusion |
| **RAM / Tag2Text** | 自动图像打标，生成伪标签 | OPPOMKLab/recognize-anything |
| **BLIP** | 图像描述生成 | salesforce/LAVIS |
| **Whisper** | 语音驱动检测 | openai/whisper |

## Demo Modules

- **Grounding DINO Demo** — 文本提示检测任意对象
- **Grounded-SAM Demo** — 文本提示检测 + 分割
- **Inpainting Demo** — 检测 + 分割 + Stable Diffusion 重绘
- **Gradio App** — 6 种交互模式（涂鸦/自动掩码/检测/分割/重绘/自动标注）
- **RAM/Tag2Text Auto-label** — 全自动标注流水线
- **Whisper Demo** — 语音输入驱动检测
- **3D Box** — 基于分割的 3D 目标框生成
- **Efficient SAM 系列** — FastSAM、MobileSAM、Light-HQSAM、EdgeSAM 等加速版

## Performance

| 配置 | 指标 | 说明 |
|------|------|------|
| Grounding-DINO-L + SAM-ViT-H | 46.0 mAP | SiW 零样本赛道，超 UNINEXT ~4 mAP |
| Grounding-DINO-B + SAM-HQ | 49.6 mAP | Segmentation in the Wild 零样本赛道 |

## Tech Stack

- **语言**: Python >= 3.8
- **框架**: PyTorch >= 1.7, TorchVision >= 0.8
- **部署**: Docker 支持, CUDA GPU 推荐
- **关键依赖**: diffusers, opencv-python, pycocotools, matplotlib, onnxruntime

## Games Relevance

- 游戏资源自动生成：用文本描述定位并分割图像中的元素
- 自动化标注：为训练游戏 AI 视觉模型快速生成数据集
- NPC 视觉系统：结合 Whisper 实现语音驱动的视觉识别
- 游戏内图像编辑：基于掩码的实时图像重绘

## Related

- [[evf-sam]] — HUST 开发的早期视觉-语言融合分割模型，将语言理解注入 SAM prompt encoder
- [[controlnet]] — Stable Diffusion 的精细控制插件，与 Grounded-SAM 的 inpainting 功能互补
- [[imagebind]] — Meta AI 六模态联合嵌入模型，与 Grounded-SAM 的多模态扩展方向相似
- [[comfyui]] — 节点式 Stable Diffusion UI，可集成 Grounded-SAM 作为自动标注节点
