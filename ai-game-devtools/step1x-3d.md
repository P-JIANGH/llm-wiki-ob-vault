---
title: Step1X-3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, image-generation, ai]
sources: [raw/articles/ai-game-devtools/step1x-3d.md]
---

# Step1X-3D

> 阶跃星辰 (StepFun) 开源的高保真可控纹理 3D 资产生成框架

## 概述

Step1X-3D 是一个面向高保真、可控纹理 3D 资产生成的开源框架，由 stepfun-ai（阶跃星辰）开发。采用两阶段 3D 原生架构：先用混合 VAE-DiT 生成几何体，再用 SD-XL 进行纹理合成。在开源方法中达到 SOTA 水平，质量可与闭源方案竞争。

## 核心特性

- **两阶段架构**：几何生成（VAE-DiT）→ 纹理合成（SD-XL）独立解耦
- **高质量数据管线**：从 >5M 资产中清洗出 2M 标准化几何+纹理数据集
- **可控生成**：支持对称性（symmetry）、边缘类型（edge_type）等标签控制
- **LoRA 迁移**：2D 控制技术（LoRA）可直接迁移到 3D 合成
- **完整开源**：模型权重、训练代码、推理代码、830K 数据集 UID 全部开放

## 技术架构

### Stage 1: 几何生成
- **混合 VAE-DiT**：perceiver-based 潜在编码 + sharp edge sampling 保留细节
- **输出**：watertight TSDF 表示 → .glb 网格
- **模型变体**：
  - `Step1X-3D-Geometry-1300m`（1.3B）：基础图像→几何
  - `Step1X-3D-Geometry-Label-1300m`（1.3B）：带标签控制的几何生成

### Stage 2: 纹理合成
- **SD-XL 多视图生成**：几何条件约束 + 潜在空间同步保证跨视图一致性
- **自定义光栅化器**：C++/CUDA 实现的 texture baker（复用 [[hunyuan3d-2-0]] 的 custom_rasterizer）
- **输入**：参考图像 + 无纹理网格 → 输出：带纹理 .glb

### 训练支持
- VAE 训练（形状自编码器）
- 3D DiT 扩散模型训练（从零开始）
- LoRA 微调支持
- SD-XL 多视图生成训练（ig2mv，基于 `ai-game-devtools/mv-adapter` 适配）

## 性能指标

| 配置 | 显存占用 | 50 步耗时 |
|------|---------|----------|
| Geometry + Texture | 27G | ~152 秒 |
| Geometry-Label + Texture | 29G | ~152 秒 |

## 许可证

Apache License 2.0

## 相关链接

- [GitHub](https://github.com/stepfun-ai/Step1X-3D)
- [HuggingFace Demo](https://huggingface.co/spaces/stepfun-ai/Step1X-3D)
- [HuggingFace Model](https://huggingface.co/stepfun-ai/Step1X-3D)
- [ArXiv 论文](https://arxiv.org/abs/2505.07747)
- [Project Page](https://stepfun-ai.github.io/Step1X-3D/)

## 与同类工具差异

- 相比 [[hunyuan3d-2-0]]：Step1X-3D 更注重数据管线质量（2M 清洗数据集 vs Hunyuan 的混合数据源），几何生成用 VAE-DiT 而非纯扩散
- 相比 [[ai-game-devtools/tripoSR]]：Step1X-3D 提供完整纹理合成管线，TripoSR 专注单图→3D 快速重建
- 相比 [[dreamgaussian4d]]：Step1X-3D 专注于静态高保真资产，DreamGaussian4D 聚焦 4D 动态生成
- 相比 [[shap-e]]：Step1X-3D 采用两阶段解耦设计（几何+纹理分离），Shap-E 使用单阶段条件扩散

## 来源

- [[hunyuan3d-2-0]] — 腾讯混元 3D 2.0，复用了其光栅化器
- [[ai-game-devtools/tripoSR]] — 同类 3D 生成工具
- [[dreamgaussian4d]] — 3D/4D 高斯生成
- [[shap-e]] — OpenAI 单阶段 3D 生成
