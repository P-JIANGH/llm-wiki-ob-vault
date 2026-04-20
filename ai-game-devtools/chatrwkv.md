---
title: ChatRWKV
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, rnn, language-model, inference, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/chatrwkv.md]
---

# ChatRWKV

## Overview

ChatRWKV 是 RWKV 语言模型的 ChatGPT 风格对话界面。RWKV 是目前**唯一**能在质量和扩展性上匹配 Transformer、同时拥有更高速度和更低显存占用的 100% RNN 架构。由 `@BlinkDL`（AI 研究者）主导开发。

最新版本：**RWKV-7**（论文 arxiv:2503.14456，2025 年 3 月）。

## Key Facts

| Fact | Detail |
|---|---|
| 架构 | 100% RNN（不同于 Transformer 的 attention） |
| 核心创新 | Time Mixing + Channel Mixing，支持无限上下文 |
| 最新模型 | RWKV-7，HuggingFace: `@BlinkDL/temp` |
| 推理格式 | GGUF 支持（rwkv7-gxx-gguf collection） |
| VRAM 效率 | 3GB VRAM 可运行 14B 模型（INT8 + split 策略） |
| Discord | 7k+ 成员 |
| 主仓库 | [[RWKV-LM]] |

## Architecture

### RWKV = R W K V
- **R**ecurrent — RNN 状态传递
- **W**eighted — 可学习权重
- **K**ey — Key 向量
- **V**alue — Value 向量

核心机制：
1. **Time Mixing**: 类似 attention 的效果，但以 RNN 递推实现 `ww = time_first + k`，避免 O(n²) 复杂度
2. **Channel Mixing**: square ReLU activation（Primer 论文启发）
3. **Stateful**: 推理保持 hidden state，支持流式生成和长上下文

### Inference Strategies

| Strategy | VRAM | Speed |
|---|---|---|
| `cuda bf16` | 高 | 最快 |
| `INT8` | ~7GB (14B) | 快 |
| `stream + split` (v2) | **3GB** (14B) | 中 |
| `cpu fp32` | 需要大量 RAM | 慢 |

## Community Implementations

- **rwkv.cpp** — CPU/cuBLAS/CLBlast 推理，int4/int8/fp16/fp32
- **ai00_rwkv_server** — Vulkan 推理 API，支持 NVIDIA/AMD/Intel
- **RWKV-PEFT** — LoRA/Pissa/QLora/State Tuning
- **RWKV-infctx-trainer** — 无限上下文训练器
- **RWKV APP** — Android / iOS 本地推理应用

## Game Development Use Cases

RWKV 的 RNN 特性非常适合游戏场景：
- **本地部署** — 无需 API 调用，离线可用
- **NPC 对话** — 状态持久化，适合游戏内 AI NPC
- **长记忆** — 无限上下文，NPC 可记住整个游戏历程
- **World 模型** — v4/v5/v6 World 系列支持游戏世界观和规则理解

## Code References

- `RWKV_in_150_lines.py` — 最小可运行 RWKV 实现（150 行）
- `src/model_run.py` — 生产级推理引擎（JIT + CUDA）
- `v2/chat.py` — v2 分片策略对话机器人
- `rwkv_pip_package/` — PyPI 包（`pip install rwkv`）

## Related

- [[RWKV-LM]] — 主训练/微调仓库
- `@BlinkDL/temp` — HuggingFace 最新 RWKV-7 模型
- `rwkv-cpp` — C++ CPU 推理实现
- `ai00-rwkv-server` — Vulkan 推理 API 服务器
