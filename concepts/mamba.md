---
title: Mamba
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [model-architecture, llm, state-space, ssrn]
sources: []
---

# Mamba

选择性状态空间模型（Selective State Space Model），提出替代 Transformer 的新架构。

## 核心创新

- **选择性机制**：让模型能选择性地记住/忘记信息
- **线性复杂度**：O(N) 而非 O(N²)
- **硬件感知算法**：SSM 并行计算

## 与 Transformer 对比

| 维度 | Transformer | Mamba |
|------|-------------|-------|
| 复杂度 | O(N²) | O(N) |
| 长上下文 | 好 | 更好 |
| 硬件效率 | 一般 | 高 |

## 相关

- [[RWKV-LM]] — 类似 RNN-like 架构
- [[linear-attention]] — 线性注意力
- [[llm-architectures]] — 架构总览
