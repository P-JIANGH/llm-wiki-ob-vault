---
title: Direct3D-S2 — Gigascale 3D Generation with Spatial Sparse Attention
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, image-generation, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/direct3d-s2.md]
---

# Direct3D-S2 — Gigascale 3D Generation with Spatial Sparse Attention

## Overview

**Direct3D-S2** 是 DreamTechAI 团队开发的**大规模 3D 形状生成框架**，核心创新是 **Spatial Sparse Attention (SSA)** 机制，专为稀疏体素数据设计的注意力计算方式，使 Diffusion Transformer 在稀疏体素上的计算效率大幅提升。该框架仅需 **8 张 GPU 即可完成 1024³ 分辨率的 3D 模型训练**（传统方法通常需要 32+ GPU 才能在 256³ 分辨率下训练）。

- **GitHub**: https://github.com/DreamTechAI/Direct3D-S2
- **论文**: arXiv 2505.17412 (**NeurIPS 2025**)
- **在线 Demo**: [HuggingFace](https://huggingface.co/spaces/wushuang98/Direct3D-S2-v1.0-demo)
- **模型权重**: [HuggingFace: wushuang98/Direct3D-S2](https://huggingface.co/wushuang98/Direct3D-S2)
- **许可**: MIT
- **输入**: 单张图像（PNG/JPG，支持 RGBA 自动背景移除）
- **输出**: 3D 网格模型（OBJ 格式）

## 技术架构

### 三级级联生成管线

Direct3D-S2 采用从粗到精的三阶段生成策略：

1. **Dense 阶段**（低分辨率）：Dense VAE + Dense DiT 在低分辨率下生成初始潜在空间索引（稀疏 token 坐标）
2. **Sparse 512 阶段**（中分辨率）：Sparse VAE + Sparse DiT 在 512³ 分辨率下生成中间网格
3. **Sparse 1024 阶段**（高分辨率）：Sparse VAE + Sparse DiT 在 1024³ 分辨率下生成高精细度网格
4. **Refiner**：UNet 精化器去除内部面片并优化几何细节

### Spatial Sparse Attention (SSA)

SSA 是 Direct3D-S2 的核心创新，针对稀疏体素数据设计的注意力机制：

- **前向加速**：v1.0 达到 3.9× 加速，v1.1 达到 **12.2×** 加速（相比 FlashAttention-2）
- **反向加速**：v1.0 达到 9.6× 加速，v1.1 达到 **19.7×** 加速
- **整体推理加速**：v1.1 比 v1.0 快约 **2×**

### 统一稀疏 VAE

与传统 3D VAE 使用异构表示不同，Direct3D-S2 的 VAE 在输入、潜在空间和输出三个阶段保持一致的稀疏体素格式，显著提升了训练效率和稳定性。

### 核心模块

| 模块 | 功能 |
|------|------|
| `pipeline.py` | 端到端图像→网格生成管线 |
| `sparse_dit.py` | 带 SSA 的稀疏 Diffusion Transformer |
| `ss_vae.py` | 稀疏结构 VAE（编解码） |
| `dense_vae.py` | 稠密 VAE（初始潜在提取） |
| `unet_refiner.py` | UNet 网格精化器 |
| `attention/modules.py` | 多头注意力 + RoPE + RMSNorm |
| `utils/sparse.py` | SparseTensor 稀疏张量类 |

## 使用要求

- **显存**：512 分辨率 ~10GB；1024 分辨率 ~24GB
- **环境**：Ubuntu 22.04 + CUDA 12.1 + PyTorch 2.5.1 + torchsparse + triton 3.1.0
- **Python**: 3.10+
- Windows 支持见 [Issue #11/#12](https://github.com/DreamTechAI/Direct3D-S2/issues/11)

## 快速使用

```python
from direct3d_s2.pipeline import Direct3DS2Pipeline
pipeline = Direct3DS2Pipeline.from_pretrained('wushuang98/Direct3D-S2', subfolder="direct3d-s2-v-1-1")
pipeline.to("cuda:0")
mesh = pipeline('input.png', sdf_resolution=1024, remove_interior=True)["mesh"]
mesh.export('output.obj')
```

也提供 Gradio Web 演示：`python app.py`

## 与同类工具对比

- 相比 [[ai-game-devtools/crm]]（10 秒单图→3D），Direct3D-S2 在 1024³ 分辨率下生成更高精细度的 SDF 网格，但需要更多显存和推理时间
- 相比 [[ai-game-devtools/syncdreamer]]（多视角扩散→3D 重建），Direct3D-S2 直接从单图生成，无需多视角同步生成步骤
- 相比 [[ai-game-devtools/anything-3d]]（四路管线 3D 重建），Direct3D-S2 采用统一的端到端扩散框架，训练更高效

## 版本历史

- **2025-05-26**：论文和项目页面发布，HuggingFace Demo 上线
- **2025-05-30**：v1.0 和 v1.1 模型发布（v1.1 比 FlashAttention-2 快 12.2× 前向 / 19.7× 反向）
- **2025-06-03**：v1.2 准备中（增强角色生成能力）
