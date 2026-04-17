---
title: DreamCatalyst
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/dream-catalyst.md]
---

# DreamCatalyst

> [ICLR 2025] KAIST CVML 开源 3D 编辑框架：通过控制可编辑性与身份保持的平衡，在 SDS 扩散蒸馏管线中加速 NeRF/3DGS 场景编辑，质量优于基线，训练时间显著缩短。

## Overview

**DreamCatalyst** 是 KAIST CVML Lab 提出的 3D 场景编辑方法，发表于 **ICLR 2025**。核心创新在于**分析并控制扩散模型在 SDS (Score Distillation Sampling) 框架中的采样动力学**，通过三个可调参数精确平衡"编辑程度"与"原场景保留度"。该方法同时适用于 [[ai-game-devtools/cf-3dgs]] 所代表的 **NeRF** 和 **3D Gaussian Splatting** 两种 3D 表示格式。

## 核心创新

### 三参数可控编辑

DreamCatalyst 引入三个关键超参数，实现对编辑过程的精细控制：

| 参数 | 作用 | NeRF 默认 | GaussianEditor 默认 |
|------|------|-----------|---------------------|
| **chi (χ)** | 身份保持权重 | 0.075 | 0.075 |
| **delta (δ)** | 可编辑性权重 | 0.2 | 0.05 |
| **gamma (γ)** | 可编辑性权重 | 0.8 | 0.2 |

调节这些参数可以在"大幅改变场景"和"保留原始特征"之间灵活取舍。

### Fast Mode

通过优化采样策略，DreamCatalyst 的 **Fast Mode** 仅需标准训练 **1/3 的迭代步数**（NeRF: 1000 vs 3000；GaussianEditor: 1200 vs 1500）即可达到相当质量。

## 技术架构

DreamCatalyst 提供两套实现，分别基于不同的 3D 编辑框架：

### 1. NerfStudio 实现（NeRF + 3DGS 编辑）

- 基于 [[ai-game-devtools/stable-diffusion]] 生态的 Nerfstudio 框架
- 提供 `dc`（NeRF 编辑）和 `dc_splat`（3DGS 编辑）两条管线
- 使用 InstructPix2Pix 作为基础编辑扩散模型
- 集成 FreeU（自由上采样）提升生成质量
- 支持从预训练 NeRF/3DGS 场景加载继续编辑

### 2. Threestudio 实现（GaussianEditor + DreamCatalyst）

- 基于 GaussianEditor + Wonder3D 多视角扩散
- 支持分割提示词约束编辑区域（mask-guided editing）
- 使用 COLMAP 预处理数据集 + 初始 3DGS 点云作为输入
- 锚点加权高斯编辑 + 自适应致密化控制

## Technical Stack

| 组件 | 实现 |
|------|------|
| **Python** | 3.8-3.9 |
| **PyTorch** | 2.0.1-2.1.2 + CUDA 11.7-11.8 |
| **基础框架** | Nerfstudio / Threestudio / GaussianEditor |
| **扩散模型** | InstructPix2Pix / Wonder3D 多视角扩散 |
| **3D 表示** | NeRF (nerfacto) / 3DGS (splatfacto) |

## 应用场景

- **角色换装/变形**：如 "a photo of a man" → "Turn him into a Batman"
- **场景风格迁移**：改变 3D 场景的视觉风格同时保持几何结构
- **局部编辑**：通过分割提示词限定编辑区域
- **快速原型**：Fast Mode 适合快速验证编辑效果

## 相关链接

- **GitHub:** https://github.com/kaist-cvml-lab/DreamCatalyst
- **arXiv:** https://arxiv.org/abs/2407.11394
- **Project Page:** https://dream-catalyst.github.io/

## 许可证

学术用途（论文代码发布，无明确 LICENSE 文件）

## 与同类工具差异

- 相比 Instruct-NeRF2NeRF：通过 SDS 采样动力学分析显著提升编辑速度
- 相比 PDS：不需要 Dreambooth 检查点，直接使用预训练扩散模型
- 相比 [[ai-game-devtools/dreammat]]：专注于场景编辑而非材质生成
- 同时支持 NeRF 和 3DGS 两种 3D 表示格式，覆盖面广
