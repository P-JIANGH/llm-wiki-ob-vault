---
title: SF3D (Stable Fast 3D)
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, image-generation, diffusion]
sources: [raw/articles/ai-game-devtools/stable-fast-3d.md]
---

# SF3D (Stable Fast 3D)

Stability AI 开源的单图像到 3D 网格重建模型，基于 [[ai-game-devtools/triposr]] 架构但引入了 UV 展开、光照解耦和材质预测等关键技术改进。

## 概述

SF3D (Stable Fast 3D) 是一个高性能的 feedforward 3D 网格重建模型，从单张图像快速生成带 PBR 纹理的 3D 网格资产。相比 TripoSR，SF3D 显式优化了网格质量（无伪影）、自动 UV 展开、颜色光照解耦和材质参数预测，使生成的资产可直接用于游戏引擎。

- **论文**: arXiv:2408.00653 (2024)
- **模型权重**: HuggingFace `stabilityai/stable-fast-3d`（需申请访问）
- **在线 Demo**: HuggingFace Spaces
- **许可证**: Stability AI Non-Commercial Research Community License

## 技术架构

### 推理管线
1. **预处理**: rembg 去背景 → 前景裁剪缩放 (85% ratio)
2. **编码**: DINOv2 图像编码器 + 相机位姿嵌入
3. **生成**: Transformer Backbone 输出 triplane scene codes (3 × C × H × W)
4. **网格提取**: Marching Tetrahedra 从密度场提取网格 + vertex offset 变形
5. **UV 展开**: 自定义 uv_unwrapper 模块生成 UV 坐标
6. **纹理烘焙**: 自定义 texture_baker (CUDA/Metal 内核) 烘焙 albedo/normal/roughness/metallic 贴图
7. **材质预测**: MaterialMLP 多输出头预测 albedo、roughness、metallic、perturb_normal
8. **输出**: 带 PBR 纹理的 GLB 文件

### 核心模块
| 模块 | 技术 | 作用 |
|------|------|------|
| Image Tokenizer | DINOv2 | 图像特征提取 |
| Camera Embedder | MLP | 相机内参/外参编码 |
| Backbone | Transformer | triplane token 处理 |
| Decoder | MaterialMLP | 密度/几何/材质多输出 |
| texture_baker | CUDA/Metal 自定义内核 | 纹理光栅化与插值 |
| uv_unwrapper | 自定义 C++/CUDA | UV 坐标自动生成 |

### Remeshing 选项
- `none`: 不修改网格
- `triangle`: Botsch-Kobbett 算法重网格化（三角拓扑）
- `quad`: Instant Field-Aligned Meshes 算法（四边形拓扑，导出时拆分三角）

## 性能

- **推理速度**: 约 6GB VRAM（单图像输入），快速前馈推理
- **纹理分辨率**: 可配置（默认 1024，范围 512-2048）
- **批量推理**: 支持 batch_size > 1
- **多后端**: CUDA / MPS (Apple Silicon，实验性) / CPU

## ComfyUI 集成

作为 ComfyUI 自定义节点安装，提供 4 个节点：
- **StableFast3DLoader**: 加载预训练模型
- **StableFast3DSampler**: 图像→网格采样（支持掩码/重网格化/顶点数控制）
- **StableFast3DPreview**: UI 内预览 GLB
- **StableFast3DSave**: 保存 GLB 到输出目录

## 与同类工具对比

相比 [[ai-game-devtools/hunyuan3d-2-0]]（腾讯混元两阶段 3D 资产生成），SF3D 是端到端前馈模型而非扩散模型，推理速度更快但不支持文本到 3D。相比 [[ai-game-devtools/triposr]]，SF3D 增加了 UV 展开、PBR 材质预测和光照解耦，直接输出游戏可用资产。

## 相关链接

- GitHub: https://github.com/Stability-AI/stable-fast-3d
- 论文: https://arxiv.org/abs/2408.00653
- 模型: https://huggingface.co/stabilityai/stable-fast-3d
- Demo: https://huggingface.co/spaces/stabilityai/stable-fast-3d
