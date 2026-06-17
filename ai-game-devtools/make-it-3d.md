---
title: Make-It-3D — 单图到高保真3D内容生成
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/make-it-3d.md]
---

# Make-It-3D

**单图到高保真3D内容生成**，ICCV 2023 论文，上海交通大学 DMCV Lab 与 Microsoft Research 合作。

## 概述

Make-It-3D 从**单张输入图像**生成完整 360° 3D 模型（带纹理 mesh）。核心挑战在于同时估计 3D 几何结构和补全不可见区域的纹理。方案利用预训练 2D 扩散模型（Stable Diffusion 2.0）作为 3D 感知监督信号。

## 两阶段管线

| 阶段 | 方法 | 迭代次数 | 输出 |
|------|------|----------|------|
| **Coarse** | NeRF 优化：正面视图用参考图像约束，新视角用 SD 扩散先验引导 | 2000 (正面) → 5000 (360°) | 粗糙 NeRF 场景 |
| **Refine** | 转换为纹理点云，SD 扩散先验 + 参考图像纹理 + Contextual Loss 锐化 | 3000 | 高保真纹理 3D mesh |

## 技术架构

- **NeRF 骨干**：基于 [[stable-dreamfusion]] 代码，支持 tcnn/grid/sdf/vanilla 多种 backbone
- **扩散引导**：Stable Diffusion 2.0 SDS (Score Distillation Sampling) 损失，新视角渲染→SD 评分→反向传播优化 NeRF
- **前置处理**：SAM 前景分割 + DPT 单目深度估计 + BLIP2 图像描述生成
- **加速**：CUDA raymarching 内核（512 步/射线），Adan 优化器
- **导出**：PyMCubes Marching Cubes → OBJ 带纹理 mesh

## 同类工具对比

- 比 [[dreamgaussian4d]] 更早，专注单图→3D（非动态 4D）
- 与 [[syncdreamer]] 不同：SyncDreamer 是多视角扩散同步生成，Make-It-3D 是 NeRF+SDS 优化
- 与 [[hunyuan3d-2-0]] 相比：Hunyuan3D 是两阶段 DiT 形状生成 + PBR 纹理，参数化模型更快；Make-It-3D 是逐场景优化，质量高但耗时长（分钟级）
- 继承 [[stable-dreamfusion]] 文本→3D 管线，扩展为图像→3D

## 关键事实

- **论文**：ICCV 2023，arXiv 2303.14184
- **许可**：代码开源（继承 stable-dreamfusion 许可证）
- **硬件**：需 CUDA GPU，PyTorch 1.10.0 + CUDA 11.3
- **训练时长**：约 15-30 分钟/场景（取决于 GPU）
- **适用场景**：单物体居中图像效果最佳，复杂几何可能重建不完整
- **衍生版本**：Jittor 框架实现 [Make-it-3D-Jittor](https://github.com/DMCV-SJTU/Make-it-3D-Jittor)

## 相关链接

- [GitHub](https://github.com/junshutang/Make-It-3D)
- [项目页面](https://make-it-3d.github.io/)
- [论文](https://arxiv.org/abs/2303.14184)
