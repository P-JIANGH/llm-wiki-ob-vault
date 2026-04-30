---
title: "IRG: Interleaving Reasoning Generation"
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, autoregressive, ai, open-source, tool]
sources: [raw/articles/ai-game-devtools/irg.md]
---

# IRG: Interleaving Reasoning Generation

> ICLR 2026 首个将交错推理引入文本到图像生成的方法，通过"推理→生成→反思→优化"多轮循环显著提升图像质量和细粒度细节。

## 概述

**IRG (Interleaving Reasoning Generation)** 是首个将交错推理机制引入 Text-to-Image (T2I) 生成领域的探索。模型在收到提示后，先产生文本推理过程，再基于该推理生成图像，然后自我反思如何改进质量，最终生成精炼图像。

- **论文：** arXiv:2509.06945（ICLR 2026 接收）
- **作者：** Osilly
- **许可证：** Apache-2.0
- **基础模型：** 基于 [[bagel]]（字节跳动 Seed 团队统一多模态模型）

## 核心机制

IRG 工作流程采用多轮推理循环：

```
Prompt → 文本推理 → 初始图像 → 自我反思 → 精炼图像
```

多轮推理在以下方面显著改善：
- **复杂视觉属性：** 纹理渲染、阴影真实感
- **细粒度结构细节：** 手指关节等精确生成
- **审美质量：** 整体画面协调性提升

## 基准性能（SoTA）

| 模型 | GenEval ↑ | WISE ↑ | TIIF-short/long ↑ | GenAI-Bench ↑ |
|:---|:---:|:---:|:---:|:---:|
| FLUX.1-dev | 0.82* | 0.50 | 66.24/66.72 | 0.76 |
| [[bagel]] | 0.78 | 0.52 | 70.97/71.79 | 0.79 |
| BAGEL + self-CoT | 0.79 | 0.70 | 68.06/68.78 | 0.81 |
| **IRG** | **0.85** | **0.77** | **76.00/73.77** | **0.84** |

IRG 在 GenEval、WISE、TIIF、GenAI-Bench 四个基准上均达到开源 SoTA。

## 技术架构

- **训练策略：** 六种分解学习模式，学习文本推理+高质量图像生成
- **推理设计：** 专用 CFG（Classifier-Free Guidance）条件，针对 IRG 迭代优化步骤专门优化
- **训练框架：** SFT + RL 统一环境，支持监督微调和强化学习
- **技术栈：** PyTorch 2.6 + vLLM 0.8.2 + flash-attn + PEFT

## 与同类工具差异

| 维度 | IRG | [[bagel]] | FLUX |
|:---|:---|:---|:---|
| 推理方式 | 多轮交错推理+反思 | 单次生成+CoT | 单次流匹配 |
| GenEval | **0.85** | 0.78 | 0.82* |
| WISE | **0.77** | 0.52 | 0.50 |
| 训练模式 | SFT+RL 统一 | 多模态统一训练 | 流匹配变换器 |
| 基础 | 基于 BAGEL | ByteDance Seed 自研 | Black Forest Labs |

## 关键日期

- **2025-09-08** — 论文发布 arXiv
- **2025-09-15** — SFT 训练代码 + IRG-Toy-Dataset 发布
- **2026-01-26** — ICLR 2026 接收

## 相关链接

- GitHub: https://github.com/Osilly/Interleaving-Reasoning-Generation
- Paper: https://arxiv.org/abs/2509.06945
- Dataset: https://huggingface.co/datasets/Osilly/IRG-Toy-Dataset
