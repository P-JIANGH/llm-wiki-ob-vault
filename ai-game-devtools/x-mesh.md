---
title: X-Mesh
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, python, image-generation]
sources: [raw/articles/ai-game-devtools/x-mesh.md]
---

# X-Mesh

**ICCV 2023** — Text-Driven 3D Stylization via Dynamic Textual Guidance

## Overview

**X-Mesh** 是厦门大学等机构开发的文本驱动 3D 网格风格化工具，发表于 **ICCV 2023**。项目通过动态文本引导（Dynamic Textual Guidance），将输入 3D 网格和文本提示词结合，输出几何和纹理均被风格化的 3D 网格。核心使用 **Score Distillation Sampling (SDS)** 从预训练扩散模型中蒸馏文本-3D 对齐知识。

## 关键事实

| 维度 | 详情 |
|------|------|
| **发表** | ICCV 2023 (IEEE/CVF) |
| **作者** | Yiwei Ma, Xiaoqing Zhang, Xiaoshuai Sun 等（厦门大学） |
| **框架** | PyTorch + CUDA GPU（kaolin） |
| **数据集** | MIT-30（30 个 3D 网格 + 对应文本提示词） |
| **评估** | MSE（24 固定视角）+ ITS（图文相似度） |
| **输出** | 风格化 .obj 网格 + 多视角渲染图 |
| **许可** | 学术用途（论文引用） |

## 技术架构

X-Mesh 采用 **SDS 引导的优化管线**，核心创新在于动态文本引导策略：

- **动态文本引导 (Dynamic Textual Guidance)**：在优化过程中动态调整文本条件，使风格化更精确地跟随提示词语义，避免传统 SDS 的过饱和/多面问题
- **Score Distillation Sampling (SDS)**：从预训练扩散模型（CLIP-guided）中蒸馏 3D 感知损失，指导网格的几何和纹理同步优化
- **多视角渲染评估**：24 个固定视角渲染 + MSE 计算 + ITS 图文相似度度量

## 核心模块

| 模块 | 功能 |
|------|------|
| `XMesh.py` | 核心模型：动态文本引导 + SDS 优化 |
| `mesh.py` | 网格数据结构与操作 |
| `render.py` | 多视角渲染管线 |
| `test_MSE.py` / `test_ITS.py` | 评估指标计算 |
| `script/` | 批量训练脚本（MIT-30 全数据集） |

## 使用示例

```bash
# 环境配置
conda env create --file xmesh.yml
conda activate xmesh

# 训练（单网格或全 MIT-30 数据集）
bash script/train_single.sh    # 或对应批量脚本
# 输出：./output/ 目录下 .obj + 渲染图
```

## 与同类工具差异

- 相比 [[ai-game-devtools/dreammat]]（PBR 材质生成），X-Mesh 专注于**整体风格化**而非 PBR 材质分解
- 相比 [[ai-game-devtools/meshanything]]（自回归网格生成），X-Mesh 是对**已有网格的风格化改造**而非从零生成
- 相比 [[ai-game-devtools/dream-textures]]（Blender 纹理插件），X-Mesh 是学术管线，同步优化几何 + 纹理，而非仅贴图

## 相关链接

- [GitHub](https://github.com/xmu-xiaoma666/X-Mesh)
- [arXiv 论文](https://arxiv.org/abs/2303.15764)
- [项目页面](https://xmu-xiaoma666.github.io/Projects/X-Mesh/)
