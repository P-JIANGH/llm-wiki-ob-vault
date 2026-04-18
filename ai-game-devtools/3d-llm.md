---
title: 3D-LLM — Injecting the 3D World into Large Language Models
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, llm, ai-model, multimodal, vision, open-source, python]
sources: [raw/articles/ai-game-devtools/3d-llm.md]
---

# 3D-LLM

**[NeurIPS 2023 Spotlight]** 3D-LLM: Injecting the 3D World into Large Language Models

**Authors:** Yining Hong, Haoyu Zhen, Peihao Chen, Shuhong Zheng, Yilun Du, Zhenfang Chen, Chuang Gan (UMass Amherst)

## Overview

3D-LLM is the **first LLM capable of natively processing 3D representations** as input. It bridges the gap between 3D data (objects and scenes) and natural language understanding, enabling tasks like 3D question answering, captioning, and spatial reasoning. Built on top of the **salesforce-lavis** (BLIP2-based) framework.

## Architecture

- **Base Framework:** salesforce-lavis (BLIP2 architecture) with planned Open-Flamingo support
- **3D Feature Pipeline:** Three-step process — Mask Extraction (SAM/Mask2Former) → 2D Feature Extraction (CLIP/BLIP) → 3D Reconstruction (Habitat/GradSLAM/Neural Field)
- **3D Representation:** Point cloud features (N=300,000 points, n_dim=1024 for CLIP or 1408 for BLIP)
- **Input Modalities:** Object-level (Objaverse) and scene-level (ScanNet, HM3D) 3D data

## Datasets

| Dataset | Type | Size |
|---------|------|------|
| Chat | Pretraining | 73,103 samples |
| Task | Pretraining | 84,531 samples |
| ScanQA | Finetuning | ScanNet features |
| SQA3D | Finetuning | ScanNet features |
| 3DMV-VQA | Finetuning | Released features |

- Scene 3D features + point clouds: ~250GB (Google Drive)
- All data also available on HuggingFace

## Finetuning Tasks

- **ScanQA:** 3D visual question answering on ScanNet scenes
- **SQA3D:** Situated question answering in 3D environments
- **3DMV_VQA:** Multi-view 3D question answering

## Quick Start

```bash
cd 3DLLM_BLIP2-base
conda activate lavis
python inference.py               # object-level inference
python inference.py --mode room   # scene-level inference
```

## Related Work & Positioning

- 相比 [[ai-game-devtools/anything-3d]]（单图→3D 生成），3D-LLM 专注于 3D **理解**（问答/描述/推理）
- 与 [[ai-game-devtools/onellm]] 类似的多模态+LLM思路，但 3D-LLM 专攻 3D 点云/场景表示而非通用 8 模态
- 与 [[ai-game-devtools/cf-3dgs]] 互补：后者做 3D 重建，3D-LLM 在重建结果上做语言理解

## Links

- **GitHub:** https://github.com/UMass-Foundation-Model/3D-LLM
- **Project Page:** https://vis-www.cs.umass.edu/3dllm/
- **arXiv:** https://arxiv.org/abs/2307.12981
- **Checkpoints:** Google Drive (pretraining v2 + finetuning for ScanQA/SQA3D/3DMV_VQA)
