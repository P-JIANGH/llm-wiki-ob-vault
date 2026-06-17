---
title: LLMcpp
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [llm, inference, cpp, quantization]
sources: []
---

# llama.cpp

用 C/C++ 实现的高效 LLM 推理工具，支持 GGUF 量化格式。

## 核心能力

- CPU 推理（无 GPU 也能跑）
- GPU 加速（CUDA、Metal、Vulkan）
- 多种量化精度（Q4_0, Q4_1, Q5_K, Q8_0 等）
- 纯头文件库，使用简单

## 量化格式

| 格式 | 体积 | 质量 |
|------|------|------|
| FP16 | 100% | 基准 |
| Q8_0 | ~50% | 接近 FP16 |
| Q5_K | ~33% | 较好 |
| Q4_K | ~25% | 尚可 |
| Q2_K | ~17% | 较差 |

## 相关

- [[llama]] — 常用模型
- [[llm-inference]] — 推理总览
- [[vllm]] — 服务端推理
- [[mlc-llm]] — 设备端推理
