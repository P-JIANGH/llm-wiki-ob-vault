---
title: Any2Point
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, ai-model, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/any2point.md]
---

# Any2Point

## Overview

**Any2Point** 是 ECCV 2024 发表的 3D 理解框架，由 Ivan Tang 等提出。核心创新是通过 **3D-to-Any 虚拟投影策略**，将任意模态（语言、视觉、音频）的预训练 Transformer 冻结模型高效适配到 3D 点云理解任务，仅需 **0.8–0.9M 可学习参数**。

- GitHub: https://github.com/Ivan-Tang-3D/Any2Point
- 论文: arXiv:2404.07989 (ECCV 2024)
- 许可证: 未在 README 中明确标注

## 核心技术

### 3D-to-Any 虚拟投影

- 将 3D 点云映射到预训练模型的原始 1D/2D 位置编码
- 避免真实投影造成的 3D 几何信息丢失
- 利用预训练模型的 1D/2D 空间先验驱动 3D 学习

### Any-to-3D Guided Adapter

- 轻量级适配器模块，插入每个 Transformer block
- **参数高效微调（PEFT）**：仅 0.8–0.9M 参数
- 注入源模态空间知识，指导局部 3D 特征聚合

## 支持模态与预训练模型

| 模态 | 预训练模型 | 可学习参数 |
|------|-----------|-----------|
| Language | CLIP | 0.9M |
| Vision | DINOv2 | 0.8M |
| Audio | [[ai-game-devtools/imagebind]] | 0.8M |

## 性能基准

在 **ScanObjectNN (PB-T50-RS)** 和 **ModelNet40** 上评估：

| 方法 | 预训练 | 参数量(M) | ScanObjectNN | ModelNet40 |
|------|--------|----------|-------------|------------|
| PointNet++ | N/A | 1.5 | 77.9% | 90.7% |
| Point-BERT | 3D | 22.1 | 83.1% | 92.7% |
| ReCon | 3D+2D+Lang | 43.6 | 90.6% | 94.1% |
| **Any2Point (Audio)** | Audio | **0.8** | **87.0%** | **92.7%** |
| **Any2Point (Vision)** | 2D | **0.8** | **87.7%** | **93.2%** |
| **Any2Point (Language)** | Language | **0.9** | **91.9%** | **94.3%** |

**关键发现**：Language 模态变体以 **48 倍更少参数**超越多模态基线 ReCon。

## 技术栈

- PyTorch
- 基于 Pix4Point、Point-NN、PointTransformerV2 架构
- 数据集：ModelNet40、ScanObjectNN、ShapeNetPart（待定）
- VRAM 需求：Language 模态约 26GB

## 游戏开发用途

- **3D 场景理解**：利用预训练大模型能力，实现低成本 3D 点云分类/语义分割
- **多模态 NPC 感知**：音频模态（ImageBind）可结合环境声音理解 3D 空间
- **跨模态 3D 检索**：语言模态支持自然语言查询 3D 场景
- **轻量部署**：仅 0.8M 参数，适合端侧或边缘设备部署

## 与同类工具的差异

- 相比 [[ai-game-devtools/crm]]（CRM 专注 3D **生成**），Any2Point 专注 3D **理解**
- 相比传统从头训练 3D 模型（Point-BERT 22M 参数），Any2Point 用 0.8M 参数达到更高精度
- 统一框架支持多模态，而非为每种模态单独训练

## 作者相关项目

- **ViewRefer3D** (ICCV 2023): 多视角 3D 视觉定位，结合 LLM
- **Point-PEFT** (AAAI 2024): 3D 预训练模型参数高效微调

## 相关链接

- [arXiv 论文](https://arxiv.org/pdf/2404.07989.pdf)
- [GitHub 仓库](https://github.com/Ivan-Tang-3D/Any2Point)
- [CLIP 预训练权重](https://drive.google.com/file/d/1ok_f68lazKE-tcy_x_oJhhV58VdJnDXz)
- [DINOv2 预训练权重](https://dl.fbaipublicfiles.com/dinov2/dinov2_vitb14/dinov2_vitb14_pretrain.pth)
