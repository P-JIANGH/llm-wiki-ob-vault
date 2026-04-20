---
title: GeneAvatar — Generic Expression-Aware Volumetric Head Avatar Editing
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, 3d, open-source, python, multimodal]
sources: [raw/articles/ai-game-devtools/geneavatar.md]
---

# GeneAvatar

**Generic Expression-Aware Volumetric Head Avatar Editing from a Single Image**

- **会议：** CVPR 2024
- **机构：** 浙江大学 (ZJU3DV)、ETH Zurich
- **GitHub：** https://github.com/zju3dv/GeneAvatar
- **项目页面：** https://zju3dv.github.io/geneavatar/
- **论文：** [PDF](https://drive.google.com/file/d/101Djfy5r66D6EeXBeafwTMKjRtInGG2k/view?usp=sharing)

## 概述

GeneAvatar 是一个通用的、表情感知的框架，能够将单张 2D 编辑图像的提升到完整的 3D 体积化头部 Avatar。它保证了**多视角一致性**和**表情感知保真度**，适用于不同相机视角和面部表情。

## 核心技术

### 架构
- **表情感知生成模型：** 接受修改潜在编码 z_{g/t} 和 3DMM 系数，输出**三平面修改场**（tri-plane modification field）
- **几何变形：** 通过修改场对体渲染采样点进行变形
- **纹理混合：** 将原始颜色与修改颜色进行混合
- **2D 到 3D 提升：** 通过**自动解码优化**（auto-decoding optimization）在单张编辑图像上合成新视角

### 稳定化机制
- **循环约束（Cyclic constraints）：** 使用代理网格进行几何监督
- **颜色合成机制：** 稳定语义驱动的纹理编辑
- **特征聚类正则化：** 保护未编辑区域不被改变

## 使用流程

1. **采集：** 录制自拍视频
2. **构建：** 基于 3DMM 方法生成个性化体积化 Avatar
3. **2D 编辑：** 用 2D 工具（拖拽式 GAN、文本提示、Photoshop、图案绘制）修改单帧
4. **提升到 3D：** GeneAvatar 将 2D 编辑传播到整个 3D Avatar

## 支持的表示与编辑类型

| 类别 | 支持的表示 | 编辑类型 |
|:---|:---|:---|
| 几何 | INSTA, NeRFBlendShape, Next3D | 下巴/面部/额头缩放、结构重塑 |
| 纹理 | INSTA, NeRFBlendShape, Next3D | 文本驱动、图案绘制、化妆 |
| 混合 | 全部 | 同时修改几何+纹理 |
| 动画 | 全部 | 表情一致的面部重演 |

## 集成方式

集成到自定义体积化 Avatar 表示需要三步：
1. 初始化 `GeneAvatar(model_path)`
2. 在体渲染管线中添加几何变形和颜色混合调用
3. 在 `project.py` 中执行自动解码优化

## 代码状态

截至抓取时，代码尚未完全发布：
- [ ] 评估代码、预训练模型和编辑案例待发布
- [ ] 训练代码待发布

## 与同类工具差异

- vs [[ai-game-devtools/emoportraits]]：EMOPortraits 使用两阶段体积化方法进行视频驱动的表情增强；GeneAvatar 专注于单图像 2D 编辑到 3D 的提升，支持多种底层 Avatar 表示
- vs [[ai-game-devtools/aniportrait]]：AniPortrait 使用扩散模型从音频/图像驱动肖像动画；GeneAvatar 是编辑框架而非生成框架，强调多视角一致性和表情感知
- vs [[ai-game-devtools/instruct-humans]]：InstructHumans 基于 instruct-nerf2nerf 进行文本指令编辑；GeneAvatar 支持更广泛的编辑方式（拖拽、文本、绘画）且专为头部 Avatar 优化

## 参考文献

- @inproceedings{bao2024geneavatar, CVPR 2024}
