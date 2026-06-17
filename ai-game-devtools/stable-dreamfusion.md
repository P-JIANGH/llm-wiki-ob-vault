---
title: Stable-Dreamfusion
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/stable-dreamfusion.md]
---

# Stable-Dreamfusion — 文本到 3D 的 Stable Diffusion 实现

> Jiaxiang Tang 开发的 DreamFusion 论文开源 PyTorch 实现，用 Stable Diffusion 替代 Imagen 作为 2D 先验，支持多种 NeRF 骨干网络和 DMTet 网格提取。

## Overview

**Stable-Dreamfusion** 是 DreamFusion（Google, 2022）的一个独立开源实现。原始论文使用 Imagen 作为 2D 扩散模型，但由于 Imagen 未公开，本项目改用 **Stable Diffusion**（通过 diffusers 库）来实现文本到 3D 生成。

核心算法：使用 **SDS（Score Distillation Sampling）** 损失函数，从预训练的 2D 扩散模型中提取梯度来优化 3D 表示（NeRF），实现从文本提示生成完整的 360° 3D 模型。

## Architecture

### NeRF 骨干网络

| 后端 | 特点 | VRAM | 速度 |
|------|------|------|------|
| **Instant-NGP** (`-O`) | 多分辨率网格编码 + CUDA ray marching，快速渲染 | ~16GB | ~10FPS @800x800 |
| **Vanilla NeRF** (`-O2`) | 纯 PyTorch，无需 CUDA 扩展 | 较高 | 慢 |
| **Taichi** (`--backbone grid_taichi`) | 类似 Instant-NGP 性能，无需 CUDA 编译 | ~16GB | 接近 CUDA |

### 扩散模型指导后端

- **Stable Diffusion** (1.5/2.0/2.1)：默认选择，通过 diffusers 接入
- **DeepFloyd-IF** (`--IF`)：像素级扩散模型，质量更高但需 ~24GB VRAM
- **Zero-1-to-3**：图像到 3D 生成，支持单图/多图条件

### 关键模块

| 模块 | 路径 | 功能 |
|------|------|------|
| `main.py` | 项目根目录 | 训练/测试主入口 |
| `nerf/` | 网络定义 | 多后端 NeRF 网络（grid/vanilla/taichi）+ 渲染器 + GUI |
| `guidance/` | 指导模块 | SD/IF/Zero123/CLIP 指导 + PerP-Neg 负提示算法 |
| `gridencoder/` | 网格编码器 | Instant-NGP 风格多分辨率哈希编码 |
| `raymarching/` | 光线步进 | CUDA 加速体积渲染 |
| `dmtet.py` | 网格提取 | 可微四面体网格提取，高分辨率网格生成 |

### DMTet 网格提取

训练完 NeRF 后可用 DMTet 进行高分辨率网格提取：
1. 从 NeRF 场初始化四面体网格
2. 用扩散模型指导进一步微调网格几何和纹理
3. 导出 `.obj + .mtl + .png` 格式的可用网格资产

### PerP-Neg 负提示

支持 PerP-Neg（Perpendicular Negative）算法，通过将负提示的梯度投影到与正提示垂直的方向，有效缓解 3D 生成中的 **多面/Janus 问题**（物体出现多个面）。

## Usage

### 文本到 3D
```bash
python main.py --text "a hamburger" --workspace trial -O
```

### 图像到 3D（Zero-1-to-3）
```bash
# 预处理：提取 RGBA、深度、法线
python preprocess_image.py input.png

# Zero-1-to-3 训练
python main.py -O --image input_rgba.png --workspace trial_image --iters 5000
```

### DMTet 微调
```bash
python main.py -O --text "a hamburger" --workspace trial_dmtet --dmtet --iters 5000
```

## Game Dev Relevance

- **3D 资产快速原型**：用文本提示直接生成游戏可用的 3D 模型
- **Unity 兼容**：DMTet 导出标准 .obj 格式，可直接导入 Unity/Unreal
- **开源替代**：DreamFusion 论文无官方代码，本项目是最早的可用实现之一
- 作者后续项目：Jiaxiang Tang 后续开发了 threestudio 框架（本 wiki 未建页），包含更先进的 3D 生成算法

## Limitations

- 官方明确标注为 **work-in-progress**，生成质量无法完全匹配原论文
- Imagen 的缺失导致 SDS 损失需要通过 VAE 编码器反向传播，增加训练时间
- 对某些文本提示效果较差，多面（Janus）问题仍然存在（虽有 PerP-Neg 缓解）

## Related

- 原始论文：DreamFusion（Poole et al., 2022）是文本到 3D 领域的开创性工作
- 与 [[dreamgaussian4d]] 和 [[gaussiandreamer]] 同属 DreamFusion 家族的后续改进，后者用 3DGS 替代 NeRF 加速生成
- 基于 [[stable-diffusion]] 生态作为 2D 扩散先验
- Zero-1-to-3 是图像到 3D 的重要方法，与 [[syncdreamer]] 思路相近
- DMTet 网格提取也是 [[stable-fast-3d]] 和 [[hunyuan3d-2-0]] 等工具的核心技术

## Links

- **GitHub:** https://github.com/ashawkey/stable-dreamfusion
- **Author:** Jiaxiang Tang (2022)
- **Colab (Instant-NGP):** [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1MXT3yfOFvO0ooKEfiUUvTKwUkrrlCHpF)
- **Colab (Vanilla):** [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1mvfxG-S_n_gZafWoattku7rLJ2kPoImL)

## License

未明确声明（研究代码，学术用途）。
