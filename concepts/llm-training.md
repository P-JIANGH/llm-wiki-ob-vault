---
title: LLM Training
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [llm, training, ml, optimization]
sources: []
---

# LLM Training

大语言模型训练技术栈。包括预训练、SFT、RLHF/DPO 等阶段。

## 训练阶段

### 1. Pretraining（预训练）

在大规模文本语料上预测下一个 token。

### 2. SFT（Supervised Fine-Tuning）

用高质量问答对进行微调。

### 3. RLHF / DPO

- **RLHF**：Reward Model + PPO
- **DPO**：Direct Preference Optimization，更简单

## 框架

- [[LoRA]] — 低秩适配微调
- [[Axonn]] — 分布式训练
- [[NeMo]] — NVIDIA 训练框架

## 相关

- [[llm-inference]] — 推理优化
- [[llm-from-scratch]] — 从零实现
- [[foundation-models]] — 基础模型
