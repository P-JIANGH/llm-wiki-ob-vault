---
title: MaterialSeg3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, diffusion, python, open-source]
sources: [raw/articles/ai-game-devtools/materialseg3d.md]
---

# MaterialSeg3D

[ACM MM 2024 Oral] 利用 2D 先验知识为 3D 资产分割密集表面材质信息

## Overview

**MaterialSeg3D** 是一种创新的 3D 材质标注管线，通过利用 2D 先验知识为 3D 模型表面自动生成密集的 **PBR（基于物理的渲染）材质信息**。其核心理念是模拟专业 3D 建模师根据视觉先验手动应用材质的过程，将这一流程自动化。

## 核心方法

- **2D 感知驱动**：在公开 2D 图像/数据集上训练材质预测模型，然后将预测结果映射到 3D 网格表面
- **密集材质分割**：为每个材质类别预测 Roughness（粗糙度）和 Metalness（金属度）值，生成完整的 PBR 材质贴图
- **2D→UV 映射管线**：通过 `view_2_UV.py` 脚本将 2D 预测结果投影到 3D 模型的 UV 空间

## 技术架构

| 组件 | 实现 |
|------|------|
| **3D 渲染模块** | GET3D（ShapeNet 数据渲染） |
| **材质映射模块** | Text2Tex（2D 到纹理/材质的映射） |
| **语义分割骨干** | mmsegmentation |
| **依赖模型** | ControlNet `control_sd15_depth.pth`（深度条件） |
| **交互界面** | Gradio (`gradio_demo.py`) |
| **输出格式** | UE 兼容材质贴图 (`material_ue.png`) + GLB 导出 |

## MIO 数据集

项目配套发布了两个材质数据集：

| 数据集 | 描述 |
|:---|:---|
| **MIO** (Materialized Individual Objects) | 每个材质类别的 `Roughness` & `Metalness` 值存储在 `coordinates` key 下 |
| **MIO++** | 扩展版数据集，覆盖更广泛的材质类型 |

## 支持的物体类别

`car`（汽车）、`furniture`（家具）、`building`（建筑）、`instrument`（乐器）、`plant`（植物）

## 与同类工具的差异

- 与 [[dreammat]] 不同：DreamMat 使用扩散模型从零生成 PBR 材质，而 MaterialSeg3D 通过 2D 先验知识进行材质分割标注
- 与 [[dreamspace]] 不同：Dreamspace 侧重全景纹理传播，MaterialSeg3D 侧重材质属性（粗糙度/金属度）的密集分割
- 与 [[dream-textures]] 不同：Dream Textures 是 Blender 的 Stable Diffusion 纹理插件，MaterialSeg3D 是独立的学术管线

## 关键限制

- 需要手动修复依赖冲突（pytorch-lightning==1.9.1 会升级 torch）
- 依赖 ControlNet 预训练权重，需单独下载
- 仅支持 5 种物体类别

## 相关链接

- GitHub（更新版含 MIO 数据集）：https://github.com/PROPHETE-pro/MaterialSeg3D
- ArXiv：2404.13923
- 会议：ACM Multimedia 2024 (Oral Presentation)
- MIO 数据集：[Google Drive](https://drive.google.com/file/d/16KtBqeaDKg0ApL4gqVm3cOoY9TZG5f1n/view)
- MIO++ 数据集：[Google Drive](https://drive.google.com/file/d/1W1ci-SxvcO79kLw9wjQ2KGUPtDap8kKJ/view)
