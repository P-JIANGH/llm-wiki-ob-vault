---
title: LoRA
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [fine-tuning, llm, optimization, technique]
sources: []
---

# LoRA

Low-Rank Adaptation，低秩适配，是一种高效的 LLM 微调技术。

## 原理

在预训练权重旁边添加低秩矩阵，通过训练这些小矩阵来适应新任务，大幅减少需要训练的参数量。

## 优点

- 参数量小（通常 < 1%）
- 训练快，显存需求低
- 可组合多个 LoRA
- 可在线切换

## 游戏开发应用

- 游戏 NPC 微调
- 游戏风格适应
- 角色对话个性化

## 相关

- [[llm-training]] — 训练技术
- [[QLoRA]] — 量化+LoRA
