---
title: GaussCtrl
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, image-generation]
sources: [raw/articles/ai-game-devtools/gaussctrl.md]
---

# GaussCtrl

**ECCV 2024** | University of Oxford + MBZUAI | BSD License

## Overview

GaussCtrl 是一个**多视角一致的文本驱动 3D Gaussian Splatting 编辑工具**，基于 NeRFStudio 框架构建，利用扩散模型对 3DGS 场景进行语义编辑，同时保持所有视角的几何和外观一致性。

## 核心技术

- **架构:** 基于 NeRFStudio v1.0.0 + gsplat v0.1.3 的编辑管线
- **扩散模型:** Stable Diffusion v1.4 作为底层编辑引擎
- **多视角一致性:** 通过参考视图采样（默认 4 个）确保跨视角编辑一致
- **Lang-SAM 集成:** 可选的掩码提取，用于主体对象编辑（环境编辑时可省略）

## 工作流

1. **训练阶段:** 使用 NeRFStudio 的 `splatfacto` 训练器生成基础 3DGS 模型
2. **编辑阶段:** 文本提示驱动扩散模型对场景进行语义修改
3. **渲染阶段:** NeRFStudio Viewer 交互式检查 + 标准渲染管线导出视频/图像

## 硬件要求

- `chunk_size=3` 在 RTX A5000 (24GB) 上消耗约 22GB 显存
- 显存不足时可降低 `chunk_size` 参数
- 提供 Docker 镜像作为环境备选方案

## 数据集

内置 6 个预处理数据集：fangzhou、bear、face、garden、stone horse、dinosaur。自定义数据需缩放至 512×512 并按 NeRFStudio 格式处理。

## 与同类工具差异

- 与 [[dreamgaussian4d]]（4D 动态高斯场景生成）不同，GaussCtrl 专注于**编辑已有的 3DGS 场景**而非从零生成
- 与 [[cf-3dgs]]（免 COLMAP 3D 高斯重建）不同，GaussCtrl 不是重建工具而是**编辑工具**
- 相比 Instruct-NeRF2NeRF，GaussCtrl 针对 3DGS 而非 NeRF 优化，推理速度更快

## 许可证与链接

- **License:** BSD
- **GitHub:** https://github.com/ActiveVisionLab/gaussctrl
- **arXiv:** https://arxiv.org/abs/2403.08733
- **Project Page:** https://gaussctrl.active.vision/
- **Data:** https://github.com/jingwu2121/gaussctrl/tree/main/data
