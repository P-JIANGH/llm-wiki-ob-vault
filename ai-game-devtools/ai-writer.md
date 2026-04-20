---
title: AI-Writer
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai-model, tool, llm, open-source]
sources: [raw/articles/ai-game-devtools/ai-writer.md]aliases: ["AIWriter"]

---

# AI-Writer

AI 小说续写工具，基于 [[ChatRWKV]] 同款的 **RWKV 模型**（纯 RNN 架构）进行中文网文文字生成。2022 年项目，**已过时** — 作者 BlinkDL 推荐使用新项目 [[RWKV-Runner]]。

## Overview

| 属性 | 值 |
|------|-----|
| 作者 | [[@BlinkDL]] |
| 许可证 | Apache 2.0 |
| GitHub | https://github.com/BlinkDL/AI-Writer |
| 训练数据 | 中文网文（玄幻、言情） |
| 最新替代 | [[RWKV-Runner]] |

## 核心架构

RWKV 模型配置（12层 / 768维）：
```
ctx_len = 512     # 上下文窗口（只看最后 512 字）
n_layer = 12       # Transformer 层数
n_head = 12        # 注意力头
n_embd = 768       # 嵌入维度
vocab_size ≈ 8849  # 词表（UTF-16 JSON）
```

**`src/model.py`** 实现了 `RWKV_TimeMix` 自定义注意力层 — 这在 RWKV-LM 早期版本中是核心创新，通过 `time_w/time_alpha/time_beta` 时间衰减参数和预计算的 `time_ww` 矩阵，实现 O(n) 推理复杂度。

推理采样使用 **nucleus sampling**：`top_p=0.75`（普通文本），`top_p=0.9`（换行后，更多变化）。

## 运行模式

| 模式 | 硬件 | 速度 |
|------|------|------|
| `gpu` | NVIDIA + CUDA/cuDNN | 最快（≥2GB VRAM） |
| `dml` | AMD/Intel/NVIDIA + onnxruntime-directml | 中等 |
| `cpu` | CPU only | 最慢 |

## 与同类工具差异

- **RWKV 架构**：不同于 GPT 的标准 Attention，使用时间混合（Time Mixing）+ 通道混合（Channel Mixing），推理更快
- **网文专精**：训练语料全为中文网文，生成风格适合玄幻/言情续写
- **轻量**：原始模型仅 12 层 768 维，2022 年消费级 GPU 可跑

> ⚠️ **已过时**：README 明确标注所有模型均为过时信息。作者推荐使用 [[RWKV-Runner]]（更强的新模型）。

## 相关工具

- [[ChatRWKV]] — 同作者，RWKV 模型的 ChatGPT 风格对话界面
- [[RWKV-LM]] — RWKV 训练代码仓库
- [[ai-game-devtools/text-generation-webui]] — 通用文本生成 Web UI（也支持 RWKV 加载）
