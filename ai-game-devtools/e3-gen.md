---
title: E3Gen — Efficient, Expressive and Editable Avatars Generation
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai, avatar, 3d, open-source, python, tool]
sources: [raw/articles/ai-game-devtools/e3-gen.md]
---

# E3Gen

## Overview
E3Gen (Efficient, Expressive and Editable Avatars Generation) 是一个 PyTorch 实现，用于生成高效、富有表现力且可编辑的 3D 人体 Avatar。发表于 **ACM MM '24**。

## 核心技术
- **人体模型**: 集成 SMPL-X v1.1 和 FLAME 面部模型，支持全身 + 精细面部表情的 Avatar 生成
- **变形器架构**: 自定义 Deformer 模块 (`lib/models/deformers/`) 处理人体姿态驱动变形
- **UV Feature Planes**: 训练期间缓存 UV 特征平面到 `./cache`，加速推理
- **数据集**: 使用 THUman2.0 人体扫描数据集 + SMPL-X 拟合参数
- **渲染管线**: 修改版 ICON 用于从 3D 扫描渲染 RGB 训练图像

## 功能
1. **Avatar 生成**: 从人体扫描数据生成高质量 3D Avatar
2. **外观迁移 (Transfer)**: 预训练模型支持外观迁移模式
3. **编辑 (Edit)**: 可编辑模式（代码待发布）
4. **新姿态动画 (Novel Pose Animation)**: 新姿态驱动动画（代码待发布）

## 训练与推理
- **硬件要求**: 2× RTX 3090 (24GB) GPU
- **训练入口**: `train.py`，checkpoint 输出到 `./work_dirs`
- **推理**: 提供预训练模型（Google Drive），支持 transfer 和 edit 模式

## 依赖与安装
- 需注册下载 SMPL-X 和 FLAME 模型文件
- 需下载 THUman2.0 数据集及 SMPL-X 拟合参数
- 已知问题: `scripts/render_thuman.sh` 渲染时可能卡在 `mesh.ray.intersects_any`（[ICON Issue #62](https://github.com/YuliangXiu/ICON/issues/62)）

## 许可与链接
- **GitHub**: [olivia23333/E3Gen](https://github.com/olivia23333/E3Gen)
- **论文**: [ACM MM '24](https://dl.acm.org/doi/10.1145/3664647.3681409) | [Arxiv](http://arxiv.org/abs/2405.19203)
- **项目主页**: [olivia23333.github.io/E3Gen](https://olivia23333.github.io/E3Gen/)
- **相关研究**: [LayerAvatar](https://olivia23333.github.io/LayerAvatar/)（分层表示解耦 Avatar 生成，代码待发布）
- 许可证: 学术研究用途

## 与同类工具差异
- 相比 [[ai-game-devtools/aniportrait]]（2D 音频驱动肖像），E3Gen 专注于完整 3D 人体 Avatar 生成
- 相比 [[ai-game-devtools/echomimic]]（音频驱动说话头），E3Gen 支持全身 + 可编辑 + 新姿态动画
- 相比 [[ai-game-devtools/emoportraits]]（单镜头 3D 头像），E3Gen 基于 SMPL-X 参数化人体模型，支持全身姿态

## 作者
Zhang Weitian, Yan Yichao, Liu Yunhui, Sheng Xingdong, Yang Xiaokang
