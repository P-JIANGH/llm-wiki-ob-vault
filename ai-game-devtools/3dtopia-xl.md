---
title: 3DTopia-XL
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, open-source, python, image-generation]
sources: [raw/articles/ai-game-devtools/3dtopia-xl.md]
---

# 3DTopia-XL

**CVPR 2025 Highlight** — High-Quality 3D PBR Asset Generation via Primitive Diffusion

## Overview

3DTopia-XL 是由 **3DTopia 团队**（Zhaoxi Chen, Jiaxiang Tang, Yuhao Dong 等）开发的 3D 资产生成模型，通过单张图像或文本提示生成带 PBR 材质的高质量 3D 模型。

核心创新在于提出 **PrimX**（Primitive-based Representation）原始体表示法，结合 3D Diffusion Transformer (DiT) 架构，实现高保真 tokenization、高效压缩和可扩展的扩散训练。

## 关键事实

| 项目 | 详情 |
|------|------|
| 发表 | CVPR 2025 Highlight |
| 论文 | arXiv:2409.12957 |
| 架构 | PrimX + VAE + DiT |
| 输入模态 | 单图像 / 文本 |
| 输出 | PBR 材质 3D mesh (GLB) |
| 预训练权重 | HuggingFace (FrozenBurning/3DTopia-XL) |
| Demo | HuggingFace Spaces, WiseModel |

## 技术架构

### PrimX 表示法
- 新型原始体（primitive）基 3D 表示
- 支持高保真 tokenization 和高效压缩
- 将 textured mesh (glTF) 转换为 N×D 张量

### 训练管线（三阶段）
1. **Mesh2PrimX 转换**：`train_fitting.py` — 将 Objaverse 子集的纹理网格转换为 PrimX 表示
2. **VAE 训练**：`train_vae.py` — 原始体 patch 压缩
3. **DiT 训练**：`train_dit.py` — 预计算条件特征 + VAE 特征后启动扩散训练

### 推理
- Gradio Web UI: `python app.py`
- CLI: `python inference.py`
- 关键参数：DDIM 步数 (25/50/100)、CFG scale (4-7)、最大面数 (100K)、MC 分辨率 (256)
- 支持文本到 3D：切换至 `inference_dit_text.yml` 配置

## 与同类工具的差异

- 相比 [[ai-game-devtools/hunyuan3d-2-1]]：3DTopia-XL 使用 PrimX 原始体表示而非 NeRF/3DGS，DiT 直接在压缩的 PrimX 空间扩散
- 相比 [[ai-game-devtools/stable-fast-3d]]：3DTopia-XL 是纯扩散生成而非前馈重建，速度较慢但生成质量更高
- 作为 [[ai-game-devtools/3dtopia]] 的扩展版本，从 Triplane/EG3D 架构升级到 PrimX/DiT 架构

## 相关链接

- [GitHub](https://github.com/3DTopia/3DTopia-XL)
- [Project Page](https://3dtopia.github.io/3DTopia-XL/)
- [arXiv Paper](https://arxiv.org/abs/2409.12957)
- [HuggingFace Demo](https://huggingface.co/spaces/FrozenBurning/3DTopia-XL)
