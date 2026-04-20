---
title: V-JEPA
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [vision, video, self-supervised, open-source]
sources: [raw/articles/ai-game-devtools/v-jepa.md]
---

# V-JEPA: Video Joint Embedding Predictive Architecture

Meta FAIR 开源的视频自监督学习框架，通过联合嵌入预测架构从视频中学习视觉表征。

## 概述

V-JEPA（Video Joint Embedding Predictive Architecture）是 Meta AI Research (FAIR) 提出的视频自监督学习方法。模型通过被动观看 VideoMix2M 数据集的视频进行预训练，生成通用的视觉表征，无需参数微调即可在下游视频和图像任务上表现出色——仅需冻结骨干网络 + 轻量级 attentive probe。

## 核心方法

- **特征空间预测**：不重建像素，而是在潜在表示空间预测被掩码区域的特征
- **无预训练编码器、无文本、无负样本、无需人工标注、无像素级重建**
- 基于掩码的预测：编码器处理可见 patches，预测器在表征空间预测被掩码 patches
- 特征预测与未掩码区域保持时空一致性

## 技术架构

### VisionTransformer 编码器
- 支持 ViT-Tiny 到 ViT-Gigantic（192~1664 维嵌入，12~48 层）
- 3D PatchEmbed（tubelet_size=2）处理时空 patch 化
- Sincos 位置编码，支持不同分辨率插值
- 预训练时支持掩码 token 输入

### VisionTransformerPredictor 预测器
- 将上下文 token 映射到低维空间（如 ViT-L: 1024→384）
- 6-12 层 Transformer blocks 进行预测
- 使用前向扩散噪声或专用 mask token 处理目标 token
- 投影回编码器嵌入维度用于损失计算

### 掩码策略
- 双层掩码：8 个小块（15% 空间尺度）+ 2 个大块（70% 空间尺度）
- 3D 时空掩码，宽高比在 0.75-1.5 之间变化
- 时间尺度固定为 1.0（完整时间覆盖）

## 预训练模型

| 模型 | Patch 大小 | 分辨率 | 迭代次数 | 批量大小 | 数据集 |
|------|-----------|--------|---------|---------|--------|
| ViT-L | 2×16×16 | 224×224 | 90K | 3072 | VideoMix2M |
| ViT-H | 2×16×16 | 224×224 | 90K | 3072 | VideoMix2M |
| ViT-H | 2×16×16 | 384×384 | 90K | 2400 | VideoMix2M |

## 下游性能（冻结骨干 + Attentive Probe）

**Kinetics-400 视频分类（16×8×3）**：ViT-L 80.8%，ViT-H 82.0%
**Something-Something v2（16×2×3）**：ViT-L 69.5%，ViT-H 72.2%
**ImageNet-1K 图像分类**：ViT-L 74.8%，ViT-H 77.4%（384 分辨率）

## 训练配置

- 分布式训练：16 节点 × 8 GPU = 128 GPU（ViT-L）
- 300 epochs，90K iterations，bfloat16 精度
- LR: 0.000625，warmup 40 epochs，EMA [0.998, 1.0]
- Submitit + Slurm 集群部署

## 在游戏开发中的潜在应用

- **NPC 行为理解**：视频表征学习可用于分析游戏录像中的行为模式
- **动作/动画识别**：预训练的视频编码器可迁移到游戏动作分类任务
- **自监督预训练**：无需标注的游戏视频可用于微调下游任务
- **视频生成评估**：特征空间预测可作为视频生成质量的度量

## 许可证

CC BY-NC 4.0（知识共享署名-非商业性使用 4.0）——学术研究可用，不可商用。

## 相关链接

- [GitHub](https://github.com/facebookresearch/jepa)
- [Paper](https://ai.meta.com/research/publications/revisiting-feature-prediction-for-learning-visual-representations-from-video/)
- [Blog](https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/)

## 相关项目

- [[ai-game-devtools/cogvideox]] — THUDM 视频生成模型，可使用 V-JEPA 特征作为视频理解组件
- [[ai-game-devtools/hunyuan-video]] — 腾讯混元视频生成模型，与 V-JEPA 同属视频理解/生成领域
- [[ai-game-devtools/cosmos]] — NVIDIA 物理 AI 世界模型平台，同样关注视频/物理世界理解
