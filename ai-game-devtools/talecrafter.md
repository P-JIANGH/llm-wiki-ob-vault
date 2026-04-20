---
title: TaleCrafter
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [tool, video, animation, open-source]
sources: [raw/articles/ai-game-devtools/talecrafter.md]
---

# TaleCrafter: Interactive Story Visualization with Multiple Characters

SIGGRAPH Asia 2023 交互式故事可视化工具，支持多角色一致性生成。

## Overview

TaleCrafter 将简洁故事输入转化为多角色一致的可视化图像，利用 LLM 预训练先验和通用 T2I 模型，无需数据集特定微调即可适应新角色/场景/风格。

## 系统架构（四模块管线）

| 模块 | 功能 |
|------|------|
| **S2P** (Story-to-Prompt) | 故事→详细结构化提示词 |
| **T2L** (Text-to-Layout) | 提示词→空间布局（支持用户交互调整） |
| **C-T2I** (Controllable T2I) | 核心：布局/草图/角色标识→一致性图像生成 |
| **I2V** (Image-to-Video) | 静态图像→动态故事视频 |

## 技术特点

- **角色一致性：** 通过演员特定标识符（actor-specific identifiers）跨帧保持角色身份
- **交互编辑：** 用户可调整布局、草图、角色位置
- **通用先验：** 使用预训练通用模型而非数据集过拟合
- **端到端管线：** 故事文本→多帧一致图像→动画视频

## 相关项目

- 后继项目：`ai-game-devtools/omg` — 改进版，支持 LoRA + InstantID 多概念个性化
- 相关视频生成：[[ai-game-devtools/animate-diff]]、`ai-game-devtools/animate-lcm`
- 故事生成工具：[[ai-game-devtools/novel]]、[[ai-game-devtools/notebook-ai]]

## 许可与链接

- **许可：** 学术研究用途
- **论文：** [arXiv 2305.18247](https://arxiv.org/abs/2305.18247)
- **项目页：** https://AILab-CVC.github.io/TaleCrafter
- **GitHub：** https://github.com/VideoCrafter/TaleCrafter
