---
title: SyncFusion — 多模态起始点同步视频到音频 Foley 合成
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, video-to-audio, foley, open-source, tool]
sources: [raw/articles/ai-game-devtools/syncfusion.md]
---

# SyncFusion

## 概述
SyncFusion 是一个**多模态起始点同步的视频到音频 Foley 合成系统**，发表于 ICASSP 2024。该系统从视频中自动提取重复动作的起始点（onsets），然后使用这些起始点结合音频或文本嵌入来条件化扩散模型，生成与视频同步的音效音轨。

## 核心架构：双模型管线

### 1. Onset Model（视频 → 起始点轨迹）
- 输入视频帧，输出二值化的起始点时间序列
- 基于 ResNet 视频编码器 + 时序分类器
- 使用加权 BCE Loss 处理正负样本不平衡
- 评估指标：Average Precision、Binary Accuracy、起始点数量准确率
- 支持数据增强训练提升鲁棒性

### 2. Diffusion Model（起始点 + 条件 → 音频）
- 核心：`audio-diffusion-pytorch.DiffusionModel`
- **起始点编码器**：1D Encoder 将起始点轨迹投影到潜在空间
- **CLAP 条件化**：冻结的 CLAP 模型提供音频嵌入或文本嵌入作为条件
- 支持两种条件模式：
  - **音频条件**：用参考音频的 CLAP 嵌入控制音色风格
  - **文本条件**：用文本描述（如"metallic impact"）控制生成内容
- 推理时可使用真实标注起始点或 Onset Model 预测的起始点

## 技术特点
| 特性 | 详情 |
|------|------|
| 数据集 | Greatest Hits（物体敲击的音视频对） |
| 扩散库 | audio-diffusion-pytorch 0.1.3 |
| 条件编码器 | CLAP (630k-audioset-best.pt) |
| 训练框架 | PyTorch Lightning (Onset) + Hydra (Diffusion) |
| 实验追踪 | WandB（含音频样本和频谱图可视化） |
| 数据存储 | WebDataset shard 格式 |
| 基线对比 | CondFoleyGen |
| 预训练权重 | Zenodo 开源 |

## 游戏开发应用
- **自动 Foley 音效生成**：从游戏画面/动画自动生成同步音效（脚步声、撞击声、武器音效）
- **无需手动标注**：省去音效师手动标记声音触发时间点的繁琐工作
- **风格可控**：通过参考音频或文本提示控制生成音效的音色风格
- **易于编辑**：修改起始点时间轴比直接编辑音频简单得多

## 相关链接
- GitHub: https://github.com/mcomunita/syncfusion
- 论文: https://arxiv.org/abs/2310.15247
- 演示页: https://mcomunita.github.io/syncfusion-webpage/
- 数据集/权重: Zenodo (records/12634671, records/12634630)

## 许可证
仓库未明确声明 LICENSE 文件。

## 相关工具
- [[foley-crafter]] — open-mmlab 视频驱动音效生成：Auffusion 基座 + ControlNet 时间适配器 + IP-Adapter 语义适配器
- [[hunyuanvideo-foley]] — 腾讯混元端到端视频音效生成：多模态扩散 + 表征对齐，XXL/XL 双尺寸
- [[audiogen-codec]] — Audiogen 48kHz 立体声神经音频编解码器
