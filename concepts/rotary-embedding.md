---
title: Rotary Embedding
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [llm, technique, attention, architecture]
sources: []
---

# Rotary Position Embedding (RoPE)

大语言模型中常用的位置编码方法，由 LLaMA 采用。

## 原理

通过旋转矩阵编码位置信息，解决绝对/相对位置编码问题。

## 特点

- 无需额外参数
- 支持长上下文
- LLaMA、Mistral 等模型采用

## 相关

- [[LLaMA]] — 使用 RoPE
- [[transformers]] — Transformer 架构
