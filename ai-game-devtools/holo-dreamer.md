---
title: HoloDreamer
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai, 3d, open-source, tool, diffusion, vision]
sources: [raw/articles/ai-game-devtools/holo-dreamer.md]
---

# HoloDreamer — Holistic 3D Panoramic World Generation from Text Descriptions

> 北京大学 & 鹏城实验室的文本到 3D 全景场景生成框架。先生成完整等距柱状投影全景图，再用 3D Gaussian Splatting 快速重建 3D 场景。arXiv 2024。

## Overview

HoloDreamer 解决文本到 3D 生成中**全局不一致**和**几何不完整**的问题。不同于迭代外绘（outpainting）从局部图像逐步扩展的方法，HoloDreamer 先一次性生成完整的 360° 全景图作为场景的完整初始化，然后通过 3D Gaussian Splatting 进行快速高保真 3D 重建。

## Architecture

### 双模块管线

**Stage 1 — 风格化等距柱状全景图生成：**
- 组合多个扩散模型从复杂文本提示生成高质量风格化全景图
- 应用**圆形混合技术**（circular blending）消除 360° 旋转时的接缝
- 输出完整 360° 等距柱状投影作为场景初始表示

**Stage 2 — 增强两阶段全景图重建：**
- 使用 3D Gaussian Splatting (3D-GS) 进行快速高保真 3D 场景重建
- 两阶段优化管线：预优化 → 缺失区域修补（inpainting） → 迁移优化

### 处理流程

| 步骤 | 过程 | 关键细节 |
|------|------|----------|
| 深度与投影 | 单目深度估计 → RGBD 投影 | 将 2D 全景图转换为初始 3D 点云 |
| 相机配置 | 双相机系统 | Base cameras + Supplementary cameras 覆盖不同视角 |
| 监督设置 | 多阶段数据集准备 | 三组不同图像集监督 3D-GS 训练的不同阶段 |
| 优化管线 | 两阶段精炼 | 预优化 → Inpainting → Transfer Optimization |

## Technical Highlights

- **圆形混合消除接缝：** 全景图合成中解决 360° 旋转时可见裂缝问题
- **双相机系统：** 基础相机 + 补充相机组合，覆盖不同观看场景
- **缺失区域修补：** Inpainting 阶段处理遮挡和缺失区域，最大化几何完整性
- **多样化场景支持：** 支持城市、森林、室内、科幻实验室等多种场景类型

## License

MIT License — Copyright (c) 2024 zhouhyOcean

## Related

- 与 [[gaussiandreamer]] 同属 3D Gaussian Splatting 文本到 3D 生成，但 HoloDreamer 强调**全景图初始化**而非 SDS 优化
- 与 [[dreamgaussian4d]] 同属 Dreamer 系列 3D 生成方法，但 HoloDreamer 聚焦静态 3D 全景而非 4D 动态场景
- 与 [[city-dreamer]] 同属场景生成工具，但 HoloDreamer 使用 3DGS 重建而 CityDreamer 使用不同管线
- 与 [[dreamspace]] 同属 3D 场景生成工具，但 HoloDreamer 专攻全景一致性

## Links

- **GitHub:** https://github.com/zhouhyOcean/HoloDreamer
- **Paper:** https://arxiv.org/abs/2407.15187
- **Project Page:** https://zhouhyocean.github.io/holodreamer/
