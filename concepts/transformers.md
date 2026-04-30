---
title: Transformers
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [llm, architecture, transformer]
sources: []
---

# Transformers

Attention Is All You Need 论文提出的架构，是现代 LLM 的基础。

## 核心组件

- **Self-Attention**：查询-键-值注意力
- **Positional Encoding**：位置编码（RoPE 等）
- **Feed-Forward**：前馈网络
- **LayerNorm**：归一化

## 架构变体

- [[rotary-embedding]] — 旋转位置编码
- [[Mamba]] — 状态空间模型替代
- [[RWKV-LM]] — RNN-like 变体

## 相关

- [[llm-architectures]] — LLM 架构总览
- [[llm-from-scratch]] — 从零实现
