---
title: MLC LLM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, ml, tool, open-source]
sources: [raw/articles/ai-game-devtools/mlc-llm.md]
aliases: ["TVM"]

---

# MLC LLM

**Universal LLM Deployment Engine with ML Compilation**

MLC LLM 是一个机器学习编译器和高性能大语言模型部署引擎，核心使命是让任何人都能在任意平台上原生开发、优化和部署 AI 模型。

## Overview

MLC LLM 基于 [[TVM]]（TensorIR/MetaSchedule）构建编译栈，通过 MLCEngine 提供跨平台统一推理接口。支持的平台覆盖：

- **桌面**: Linux（Vulkan/ROCm/CUDA）、Windows（Vulkan/CUDA）、macOS（Metal）
- **移动**: iOS/iPadOS（Metal）、Android（OpenCL）
- **浏览器**: WebGPU + WASM
- **边缘**: 各类 GPU（AMD/NVIDIA/Apple/Intel）

## Architecture

- **ML Compiler**: 基于 TVM（TensorIR ASPLOS 2023、MetaSchedule NeurIPS 2022），实现 LLM 的自动化张量程序优化
- **推理引擎**: MLCEngine — 统一高性能 LLM 推理引擎
- **API 接口**: REST server、Python SDK、JavaScript、iOS、Android，均由同一引擎驱动
- **核心模块**: `cpp/serve/`（推理服务）、`cpp/json_ffi/`（JSON FFI）、`cpp/tokenizers/`（分词器）、`cpp/multi_gpu/`（多卡支持）
- **Python SDK**: `mlc_llm` 包（v0.20.0.dev0），依赖 torch/transformers/tiktoken/sentencepiece 等

## Key Technical Features

1. **ML 编译优化**: TensorIR 自动张量程序优化，硬件感知调优
2. **平台广泛**: 从服务器 GPU 到手机芯片到浏览器 WASM，同一代码库
3. **OpenAI 兼容 API**: MLCEngine 提供 REST API，兼容 OpenAI 接口规范
4. **量化支持**: 多精度量化（INT4/INT8/FP16 等）

## 与同类工具的差异

| 特性 | MLC LLM | [[llama.cpp]] | [[gemma.cpp]] | [[llmunity]] |
|------|---------|--------------|--------------|--------------|
| 编译优化 | TVM ML编译 | 手写 CUDA/Metal | Google Highway SIMD | Unity 插件封装 |
| 平台覆盖 | 全平台（含 WASM） | CPU/GPU | CPU/GPU | Unity 专用 |
| 多GPU | ✅ | ❌ | ❌ | ❌ |
| Web/WASM | ✅ | 有限 | ❌ | ❌ |
| iOS/Android | ✅ | ❌ | ❌ | 有限 |

## 许可证

Apache 2.0

## Related Links

- GitHub: https://github.com/mlc-ai/mlc-llm
- 文档: https://llm.mlc.ai/docs/
- Blog: https://blog.mlc.ai/
- WebLLM: https://github.com/mlc-ai/web-llm/（相关项目，浏览器端 LLM）

## Related Wiki Pages

- [[TVM]] — 深度学习编译器，MLC LLM 的底层编译基础设施
- [[jan]] — Janhq 本地 ChatGPT 替代，同样提供跨平台 LLM 推理但无编译优化
- [[gemma-cpp]] — Google 纯 C++ LLM 推理引擎，与 MLC LLM 的端侧部署定位相似
- [[llmunity]] — Unity 游戏引擎 LLM 集成插件
