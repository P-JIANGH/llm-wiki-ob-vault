---
title: LLM Inference
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [llm, inference, optimization]
sources: []
---

# LLM Inference

大语言模型推理优化技术栈。涵盖推理框架、量化方法、推理引擎优化等。

## 优化方向

### 量化 (Quantization)

| 方法 | 精度 | 速度 | 显存 |
|------|------|------|------|
| FP16 | 16bit |基准|基准|
| INT8 | 8bit | +~30% | -40% |
| INT4 | 4bit | +~60% | -60% |
| GGUF | 2-8bit | 高度优化 | 极低 |

代表方案：[[llama.cpp]]、[[vllm]]、[[mlc-llm]]

### 推理框架

- [[vllm]] — PagedAttention，高吞吐量
- [[llama.cpp]] — CPU/GPU 高效推理，GGUF 格式
- [[sglang]] — 结构化输出优化
- [[mlc-llm]] — 设备端 LLM

### KV Cache 优化

- PagedAttention（vllm）
- FlashAttention
- Rolling Hash KV Cache

## 推理服务

- [[nanobot]] — 游戏 AI 推理框架
- [[localai]] — 本地推理 API 服务

## 相关

- [[llm-training]] — 对比训练优化
- [[llm-from-scratch]] — 从零实现 LLM
- [[foundation-models]] — 基础模型
