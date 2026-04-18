---
title: Zero-1-to-3
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai-model, open-source, 3d-generation, diffusion]
sources: [raw/articles/ai-game-devtools/zero-1-to-3.md]
---

# Zero-1-to-3: Zero-shot One Image to 3D Object

Columbia University Computer Vision Lab · ICCV 2023 · MIT License

## Overview

Zero-1-to-3 是从**单张图像**生成**3D 物体新视角**的零样本模型。通过在 Stable Diffusion 上微调并加入显式相机位姿条件化，模型能根据输入图像 + 相机参数（仰角/方位角/距离）生成一致的新视角图像，从根本上缓解了 Janus 问题。支持结合 SDS/SJC 进行 3D 重建。

## 技术架构

| 组件 | 规格 |
|------|------|
| 基础模型 | LatentDiffusion（SD 微调版） |
| UNet | 8→4 通道，320 模型通道，Spatial Transformer（context_dim=768） |
| 第一级 | AutoencoderKL（SD VAE，4 通道 latent） |
| 条件编码 | FrozenCLIPImageEmbedder（图像条件，非文本） |
| 条件模式 | hybrid（concat + cross-attention） |
| 分辨率 | 256×256 |
| 推理显存 | ~22GB VRAM（RTX 3090/4090 可运行） |

## 训练数据与方法

- **数据集**: Objaverse / Objaverse-XL 大规模合成 3D 物体渲染
- **训练时长**: 300k checkpoint ≈ 6000 A100 小时
- **微调起点**: Lambda Labs 发布的 sd-image-conditioned-v2.ckpt
- **发布 Checkpoint**: 105k / 165k / 230k / 300k 迭代四个版本
- **Zero123-XL**: 更大模型，基于 Objaverse-XL 训练

## 核心能力

1. **新视角合成**: 单图 + 相机位姿 → 生成目标视角图像
2. **3D 重建（SDS）**: 结合 Score Distillation Sampling，通过 [[ai-game-devtools/stable-dreamfusion]] 或 [[ai-game-devtools/threestudio]] 生成 3D mesh
3. **3D 重建（SJC）**: 内置 Voxel NeRF + Score Jacobian Chaining 管线
4. **Janus 问题解决**: 显式相机位姿建模 + 大规模多视角数据训练，避免多面脸问题

## 项目结构

- `zero123/` — 主模块（LDM 训练、Gradio 演示、配置）
- `zero123/ldm/` — Latent Diffusion 核心（DDPM、UNet、VAE、CLIP 编码器）
- `3drec/` — 3D 重建管线（Voxel NeRF、SDS/SJC 优化）
- `3drec/voxnerf/` — 体素 NeRF 实现（渲染、Marching Cubes 导出）

## 使用方式

```bash
# 新视角合成（Gradio Demo）
python gradio_new.py    # ~22GB VRAM

# 3D 重建（SJC）
cd 3drec && python run_zero123.py --scene pikachu --index 0
```

## 与同类工具的差异

- 相比 [[ai-game-devtools/wonder3d]]（跨域扩散联合法线+彩色生成），Zero-1-to-3 专注于相机条件化的逐视角生成
- 相比 [[ai-game-devtools/mvdream]]（多视角一致扩散），Zero-1-to-3 是单图→单新视角，MVDream 是单图→4 视角同时生成
- 相比 [[ai-game-devtools/triposr]]（前馈重建），Zero-1-to-3 是扩散生成式方法而非一次性前馈
- 被 [[ai-game-devtools/threestudio]] 和 [[ai-game-devtools/stable-dreamfusion]] 集成为 3D 重建后端

## 相关链接

- [Project Page](https://zero123.cs.columbia.edu/)
- [Paper (arXiv)](https://arxiv.org/abs/2303.11328)
- [Weights (HuggingFace)](https://huggingface.co/cvlab/zero123-weights)
- [Live Demo 🤗](https://huggingface.co/spaces/cvlab/zero123-live)
- [GitHub](https://github.com/cvlab-columbia/zero123)
