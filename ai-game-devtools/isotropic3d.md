---
title: Isotropic3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, diffusion, python]
sources: [raw/articles/ai-game-devtools/isotropic3d.md]
---

# Isotropic3D — Image-to-3D Generation Based on a Single CLIP Embedding

> PKU 团队提出的 image-to-3D 方法，仅需单张 RGBA 图像的 CLIP 图像 embedding 即可生成 3D 内容，无需文本提示。arXiv 2024。

## Overview

Isotropic3D 是一个 image-to-3D 生成工具，核心创新是**仅使用单个 CLIP 图像 embedding 作为指导信号**，不需要任何文本 prompt。相比 DreamFusion/SDS 等需要精心构造文本提示的方法，大幅简化了使用流程。

基于 [threestudio](threestudio) 框架（MVDream-threestudio 分支），使用 PyTorch Lightning 进行训练编排。

## 技术架构

| 组件 | 实现 |
|------|------|
| **指导信号** | CLIP 图像 embedding（非文本 embedding） |
| **引导方式** | multiview-diffusion-guidance（多视角扩散） |
| **几何表示** | implicit-volume + HashGrid 位置编码（TCNN） |
| **材质** | diffuse-with-point-light-material（soft shading） |
| **渲染器** | nerf-volume-renderer（512 samples/ray, NeRFAcc 裁剪） |
| **Prompt** | dummy-prompt-processor（无需文本） |
| **训练分辨率** | 两阶段：64×64 → 256×256（step 5000 切换） |
| **训练步数** | 10,000 steps, AdamW, 16-bit mixed precision |
| **输出格式** | OBJ+MTL / OBJ（顶点着色） |

## 核心创新

1. **Single CLIP Image Embedding** — 不依赖 text prompt，直接用输入 RGBA 图的 CLIP image embedding 作为 SDS 引导信号
2. **Soft Shading 策略** — 训练时随机采样环境光/漫反射光颜色（Magic3D 论文方法），提升几何质量
3. **两阶段分辨率训练** — 先低分辨率快速收敛，后高分辨率精细优化

## 与同类工具对比

- 相比 [[gaussiandreamer]]（文本到 3D 高斯，15 分钟/单 GPU），Isotropic3D 是图像到 3D，用 NeRF 而非 Gaussian Splatting
- 相比 [[dreamgaussian4d]]（4D 高斯生成），Isotropic3D 生成静态 3D 模型
- 相比 [[animate3d]]（3D 动画生成），Isotropic3D 只生成静态模型，不处理运动

## 使用方式

```bash
# 下载权重到 ckpt/isotropic3d.ckpt
export PYTHONPATH=$PYTHONPATH:./isotropic
python launch.py \
    --config configs/isotropic3d-shading.yaml \
    --train --gpu 0 \
    system.guidance.cond_image_path=assets/wolf_rgba.png

# 导出 OBJ+MTL 网格
python launch.py --config parsed.yaml --export --gpu 0 \
    system.exporter_type=mesh-exporter
```

## 硬件要求

- 需要 A100 GPU（计算 normal 时）
- PyTorch 2.0.1 + CUDA 11.8

## 相关链接

- [GitHub](https://github.com/pkunliu/Isotropic3D)
- [Paper](https://arxiv.org/abs/2403.10395)
- [Project Page](https://pkunliu.github.io/Isotropic3D/)
- [Weights](https://huggingface.co/pkunliu/Isotropic3D)

## 作者

Pengkun Liu, Yikai Wang, Fuchun Sun, Jiafang Li, Hang Xiao, Hongxiang Xue, Xinzhou Wang

## Citation

```bibtex
@article{liu2024isotropic3d,
  title={Isotropic3D: Image-to-3D Generation Based on a Single CLIP Embedding},
  author={Liu, Pengkun and Wang, Yikai and Sun, Fuchun and Li, Jiafang and Xiao, Hang and Xue, Hongxiang and Wang, Xinzhou},
  journal={arXiv preprint arXiv:2403.10395},
  year={2024}
}
```
