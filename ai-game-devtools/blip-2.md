---
title: BLIP-2
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, vlm, vision, multimodal, ml, open-source]
sources: ["general knowledge"]
---

# BLIP-2

Salesforce 开发的 Bootstrapping Language-Image Pre-training 框架，通过 Q-Former 桥接冻结的视觉编码器和冻结的 LLM，实现高效的多模态理解与生成。

## 概述

BLIP-2（Bootstrapping Language-Image Pre-training）是 Salesforce Research 提出的视觉语言模型预训练框架，发布于 2023 年。其核心创新是引入 **Q-Former**（Querying Transformer）作为视觉-语言之间的轻量级适配器，使得可以在不重新训练视觉编码器或 LLM 的情况下，将两者有效连接。

BLIP-2 采用两阶段训练策略：
1. **第一阶段**：Q-Former 在图像-文本对上预训练，学习从冻结的视觉编码器中提取与语言相关的视觉特征
2. **第二阶段**：Q-Former 的输出连接到冻结的 LLM，通过图文对齐任务微调适配器

这种设计大幅降低了训练成本——只需训练 Q-Former 和投影层，而视觉编码器（如 ViT）和 LLM（如 OPT/FlanT5）保持冻结。

## Key Facts

| 属性 | 详情 |
|------|------|
| 开发者 | Salesforce Research |
| 论文 | ICML 2023 (arXiv:2301.12597) |
| 许可证 | BSD 3-Clause（代码） |
| 架构 | Q-Former + 冻结 ViT 视觉编码器 + 冻结 LLM |
| 基座 LLM | OPT / FlanT5（官方）；社区适配 LLaMA/Vicuna |
| GitHub | https://github.com/salesforce/LAVIS |
| HuggingFace | salesforce/blip2-opt-2.7b / salesforce/blip2-flan-t5-xl |

## 核心架构

### Q-Former

Q-Former 是 BLIP-2 的核心组件——一个轻量级 Transformer，通过一组可学习的 query token 从视觉编码器的特征图中"查询"出与语言任务最相关的视觉信息。它同时执行：
- **Image-text contrastive learning**：对齐图像和文本表示
- **Image-grounded text generation**：基于图像生成文本描述
- **Image-text matching**：判断图文对是否匹配

### 两阶段连接

```
[Image] → [Frozen ViT] → [Visual Features] → [Q-Former] → [Query Embeddings] → [Frozen LLM] → [Text Output]
```

关键优势：视觉编码器和 LLM 均**不需要重新训练**，只需训练 Q-Former 和线性投影层。

## 与同类模型对比

BLIP-2 vs. [[ai-game-devtools/cogvlm]]：CogVLM 使用 10B 专用视觉编码器与 7B 语言模型深度融合，视觉理解能力更强但训练成本高；BLIP-2 采用冻结骨干+轻量适配策略，训练效率高但视觉理解上限受限于预训练编码器。

BLIP-2 vs. [[ai-game-devtools/visualrwkv]]：VisualRWKV 基于 RWKV 架构构建 VLM，具有 RNN 式 O(n) 推理优势，适合实时场景；BLIP-2 基于 Transformer 架构，理解能力更强但推理复杂度随序列平方增长。

## 在 LAVIS 框架中的位置

BLIP-2 是 Salesforce **LAVIS**（Language-Vision Intelligence）库的核心模型之一。LAVIS 提供统一的 VLM 训练/评估/部署流水线，涵盖 BLIP-2、ALPRO、CLIP 等多个模型。[[ai-game-devtools/3d-llm]] 页面提及 BLIP-2 被用作 3D 多模态问答的基座模型。

## 在游戏开发中的应用场景

- 游戏截图理解：自动识别游戏画面内容（场景类型、角色、UI 元素）
- 辅助功能：为视障玩家生成游戏画面语音描述
- 游戏内容标签：自动生成游戏资产（角色/场景/道具）的语义标签
- NPC 视觉感知：让游戏内 AI 角色"理解"所见画面并做出反应
- 游戏测试自动化：通过截图理解验证 UI 渲染正确性

## Links

- Paper: https://arxiv.org/abs/2301.12597
- GitHub (LAVIS): https://github.com/salesforce/LAVIS
- HuggingFace: https://huggingface.co/salesforce
- Demo: https://huggingface.co/spaces/Salesforce/BLIP2
