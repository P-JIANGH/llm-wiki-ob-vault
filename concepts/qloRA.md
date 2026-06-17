---
title: QLoRA
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [fine-tuning, llm, quantization, technique]
sources: []
---

# QLoRA

Quantized LoRA，结合量化与 LoRA 的高效微调方法。

## 原理

在量化基础模型上附加 LoRA 适配器，兼顾效率与效果。

## 特点

- 4-bit 量化基础模型
- 仅训练 LoRA 参数
- 单 GPU 可微调 65B 模型

## 相关工具

- [[Llama.cpp]] — 推理支持
- [[LoRA]] — LoRA 技术
- [[llm-training]] — 训练总览
