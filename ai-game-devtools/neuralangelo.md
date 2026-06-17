---
title: Neuralangelo
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source]
sources: [raw/articles/ai-game-devtools/neuralangelo.md]
---

# Neuralangelo

**GitHub:** [NVlabs/neuralangelo](https://github.com/NVlabs/neuralangelo)
**Paper:** CVPR 2023 — [arXiv:2306.03092](https://arxiv.org/abs/2306.03092/)
**Project Page:** [research.nvidia.com/labs/dir/neuralangelo](https://research.nvidia.com/labs/dir/neuralangelo/)

## 概述

Neuralangelo 是 NVIDIA 研究团队提出的**高保真神经表面重建**方法，从视频/图像序列中重建高精度的 3D 表面网格。基于 SDF（Signed Distance Function）的 NeRF 变体，使用 hashgrid 编码和 coarse-to-fine 训练策略，能够重建复杂几何形状并提取带纹理的 3D 网格模型。

## 核心特性

- **SDF-based NeRF 重建** — 用 hashgrid 编码的高效 SDF 表示替代传统密度场
- **高精度网格提取** — 多分辨率等值面提取（2048 分辨率），支持纹理贴图
- **COLMAP 集成管线** — 从视频自动提取帧 → SfM 相机位姿 → JSON 配置
- **多 GPU 训练** — torchrun 分布式训练，支持 AdamW + 混合精度
- **Coarse-to-fine 训练策略** — 从粗到细逐步激活 hashgrid 层级
- **Eikonal + Curvature 正则** — 保证 SDF 物理正确性和表面平滑

## 技术架构

| 组件 | 实现细节 |
|------|----------|
| **NeuralSDF** | 1 层 MLP (256 维) + hashgrid 编码 (16 级, dict_size=22, dim=8) + softplus + geometric init |
| **NeuralRGB** | 4 层 MLP (256 维) + 球谐函数视角编码 (3 级) + IDR 模式 |
| **BackgroundNeRF** | 8 层几何 + 2 层 RGB MLP + Fourier 位置编码 |
| **渲染** | NeuS 体积渲染，512 rays/iter，64+16 coarse/fine 采样 |
| **损失函数** | render (1.0) + eikonal (0.1) + curvature (5e-4) |
| **优化器** | AdamW (lr=1e-3)，warmup + two-step 调度 |
| **显存需求** | 默认 24GB+，最低 8GB（降低精度配置） |

### 项目结构

```
projects/neuralangelo/
├── model.py          # 核心模型 (NeuralSDF + NeuralRGB + BackgroundNeRF)
├── trainer.py        # 训练循环 (eikonal/curvature 损失)
├── configs/          # YAML 配置 (base/DTU/TNT/custom)
├── utils/            # MLP/mesh提取/球谐函数
└── scripts/          # COLMAP/预处理/可视化脚本
```

## 工作流程

1. **数据准备**：视频提取帧 → COLMAP SfM → 生成 transforms.json（Instant NGP 格式）
2. **配置生成**：场景类型（outdoor/indoor/object）→ 自动边界球估计
3. **训练**：torchrun 多 GPU 训练，500K iterations，支持 W&B 日志
4. **网格提取**：多分辨率等值面提取，支持 `--textured` 纹理输出和 `--keep_lcc` 去噪

## 支持数据集

- **DTU**（NeuS 预处理版）
- **Tanks and Temples**（含 COLMAP/camera/alignment 额外数据）
- **NeRF Synthetic**（Blender 数据集）
- **自定义视频**（需高快门速度拍摄，避免运动模糊）

## 许可证

NVIDIA 专有许可。商业用途需提交 [NVIDIA research licensing form](https://www.nvidia.com/en-us/research/inquiries/)。

## 游戏开发应用场景

- **3D 资产扫描** — 用机拍摄现实物体/场景，自动转换为游戏用 3D 网格
- **环境重建** — 从实景视频重建游戏环境几何
- **纹理提取** — 自动生成带纹理的 PBR-ready 3D 模型
- **快速原型** — 低成本 3D 内容创建

## 相关项目

- [[crm]] — 单图→3D 纹理网格，两阶段扩散方法（清华大学）
- [[dreammat]] — SIGGRAPH 2024 PBR 材质生成工具
- [[instant-ngp]] — NVIDIA Instant NeRF，实时 NeRF 推理
- [[threestudio]] — 3D 生成统一框架
