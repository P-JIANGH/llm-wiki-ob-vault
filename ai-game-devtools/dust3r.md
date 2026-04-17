---
title: DUSt3R
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, vision, tool, open-source, ai]
sources: [raw/articles/ai-game-devtools/dust3r.md]
---

# DUSt3R

**DUSt3R: Geometric 3D Vision Made Easy** — Naver Labs Europe 开源的 3D 视觉基础模型，CVPR 2024。

## 概述

DUSt3R 将 3D 重建视为回归问题而非传统多视图几何优化。输入任意 2+ 张场景图片，直接输出 3D pointmaps（点云）、相机位姿（焦距+外参）和置信度掩码。无需相机内参、COLMAP 或 SfM 预处理的"即插即用"方案。

论文：[arXiv:2312.14132](https://arxiv.org/abs/2312.14132) | 项目页：[dust3r.europe.naverlabs.com](https://dust3r.europe.naverlabs.com/)

## 技术架构

- **主干网络:** AsymmetricCroCo3DStereo — 非对称 Siamese ViT 编码器 + 解码器
- **编码器:** ViT-Large (ViT-L)
- **解码器:** ViT-Base (ViT-B)
- **输出头:** Linear（轻量）或 DPT（Dense Prediction Transformer，更精细）
- **位置编码:** RoPE（Rotary Position Embedding），含可选 CUDA 加速核
- **推理框架:** HuggingFace Hub 集成，`from_pretrained()` 一行加载

## 预训练模型

| 模型 | 训练分辨率 | 头类型 | 特点 |
|------|-----------|--------|------|
| 224_linear | 224×224 | Linear | 快速推理，低分辨率 |
| 512_linear | 512×384 等多分辨率 | Linear | 中等精度 |
| 512_dpt | 512×384 等多分辨率 | DPT | 最高精度，密集预测 |

## 使用流程

1. `load_images()` 加载图片
2. `make_pairs()` 构建场景图配对
3. `inference()` 推理得到原始 3D 点预测
4. `global_aligner()` 全局对齐（PointCloudOptimizer / PairViewer）
5. 提取结果：焦距、位姿、3D 点、置信度掩码
6. `scene.show()` 可视化点云

## 训练数据集

CO3Dv2、ARKitScenes、ScanNet++、BlendedMVS、WayMo Open、Habitat-Sim、MegaDepth、StaticThings3D、WildRGB-D

## 许可证

CC BY-NC-SA 4.0（仅限非商业用途）

## 相关项目

NAVER 团队后续工作：
- **MASt3R** — 添加局部特征头 + 度量 pointmaps + 更可扩展的全局对齐
- **Pow3R** — 利用已知深度/焦距/位姿先验的增强版
- **MUSt3R** — 多视图立体 3D 重建（无需全局对齐的 RGB SLAM/SfM）

## 游戏开发应用

DUSt3R 可用于游戏中的 3D 场景快速重建：
- 从实拍照片自动生成游戏场景 3D 模型
- 替代传统 Photogrammetry 管线（无需 COLMAP 预处理）
- 与 [[ai-game-devtools/cf-3dgs]]（3D 高斯重建）和 [[ai-game-devtools/crm]]（单图→3D 纹理网格）互补，构成从 2D 到 3D 的完整工具链
