---
title: GALA3D — Layout-guided Text-to-3D Scene Generation
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, ai, tool, open-source, game-engine]
sources: [raw/articles/ai-game-devtools/gala3d.md]
---

# GALA3D

**GALA3D: Towards Text-to-3D Complex Scene Generation via Layout-guided Generative Gaussian Splatting**

北京大学 VDIG Lab 开源的文本驱动 3D 复杂场景生成模型，基于 3D Gaussian Splatting 实现多对象场景的端到端生成与可编辑。ICML 2024 接收。

## Overview

GALA3D 将单个文本提示转化为完整 3D 场景，通过 LLM 空间推理 + Layout 约束的高斯溅射 + 组合扩散优化的四阶段管线，支持复杂多对象场景生成和文本驱动的编辑操作。

## 四阶段架构

### 1. LLM Layout Generation
从输入文本提取粗略空间布局，使用 LLM 推断对象位置和关系作为初始空间先验。

### 2. Layout-guided Gaussian Representation
基于 LLM 提取的布局初始化 3D Gaussians，结合自适应几何控制（Adaptive Geometry Control）调节形状和空间分布，防止几何坍缩和不合理的空间排列。

### 3. Compositional Diffusion Optimization
组合式应用文本到图像扩散先验，联合优化几何、纹理、尺度及多对象交互。在复杂多实体场景中保持高保真对象级质量。

### 4. Layout Refinement
迭代调整初始 LLM 先验，使其与真实物理约束和生成场景对齐。双向对齐确保场景既符合提示又符合物理规律。

## 关键特性

- **高保真对象保持**：复杂多对象场景中维持详细的对象级质量
- **自适应约束**：防止几何坍缩和不合理空间排列
- **双向对齐**：生成场景同时尊重原始提示和物理规律
- **文本驱动编辑**：支持添加/移动/替换对象而无需重新生成整个场景

## 同类工具对比

与 [[dreamgaussian4d]]（4D 动态高斯场景）和 [[cf-3dgs]]（免 COLMAP 3D 高斯重建）不同，GALA3D 专注于从文本到**复杂多对象静态场景**的端到端生成，使用 LLM 布局先验 + 组合扩散优化的独特方法。

## 示例提示

- "客厅有咖啡桌（上面有篮子）、木地板、电视柜上的电视、坐有宇航员的沙发"
- "戴巫师帽的熊猫坐在维多利亚式木椅上，看着盆栽榕树"
- "露营场景：帐篷在草地上，营火旁有两个长凳"

## 许可证与代码获取

- **学术免费，商用需授权**（联系 wyt@pku.edu.cn）
- 完整代码和权重需签署申请表获取，不可直接从仓库下载

## 相关链接

- [论文 (arXiv)](https://arxiv.org/abs/2402.07207)
- [项目页面](https://gala3d.github.io/)
- [GitHub](https://github.com/VDIGPKU/GALA3D)
- 机构：VDIG Lab, 北京大学
