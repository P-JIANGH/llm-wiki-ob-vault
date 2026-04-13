---
title: DBRX
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai-model, llm, tool, open-source]
sources: [raw/articles/ai-game-devtools/dbrx.md]
---

# DBRX

Databricks 开源的大语言模型，Mixture-of-Experts (MoE) 架构，总参数 132B，激活参数 36B（16 experts 中选 4 active）。

## Overview

DBRX is a transformer-based decoder-only LLM trained using next-token prediction. 由 Databricks 开源，采用细粒度 MoE 架构，相比 Mixtral-8x7B 和 Grok-1 的 8 experts 选 2，DBRX 使用 16 experts 选 4，提供 65x 更多 expert 组合可能性。

|| Model | Description | HF Link |
||-------|-------------|---------|
| **DBRX Base** | 预训练基座模型 | [databricks/dbrx-base](https://huggingface.co/databricks/dbrx-base) |
| **DBRX Instruct** | 指令微调版 (ChatML) | [databricks/dbrx-instruct](https://huggingface.co/databricks/dbrx-instruct) |

## 核心架构参数

| 参数 | 值 |
|------|-----|
| 总参数量 | 132B |
| 激活参数 | 36B |
| n_layers | 40 |
| d_model | 6144 |
| n_heads | 48 |
| max_seq_len | 32K |
| vocab_size | 100,352 |
| experts | 16 (选4) |
| ffn_hidden_size | 10,752 |
| torch_dtype | bfloat16 |

### Attention 配置
- **Grouped Query Attention (GQA)** — kv_n_heads=8
- **RoPE** — theta=500,000
- **GLU** (Gated Linear Units)
- clip_qkv=8

### MoE FFN 配置
- **DbrxFFN**: 16 experts, top-4 routing, dropless (MegaBlocks)
- moe_loss_weight=0.05, router_aux_loss_coef=0.05
- moe_jitter_eps=0

### Tokenizer
- **GPT-4 tokenizer** (tiktoken)
- vocab_size=100,352

## 训练栈

| 库 | 作用 |
|----|------|
| [[ai-game-devtools/corenet|CoreNet]] | FSDP 分布式训练框架 |
| [LLM Foundry](https://github.com/mosaicml/llm-foundry) | 训练/微调/推理统一入口 |
| [MegaBlocks](https://github.com/databricks/megablocks) | Dropless MoE 高效实现 |
| [Streaming](https://github.com/mosaicml/streaming) | 大规模数据流式读写 |
| [Composer](https://github.com/mosaicml/composer) | 训练循环、checkpointing、logging |

DBRX pre-trained on **12T tokens**，数据质量相比 MPT 系列提升 2x 以上，使用 curriculum learning。

## 推理方式

| 引擎 | 硬件需求 | 说明 |
|------|---------|------|
| **transformers** | ~264GB RAM | 基础 PyTorch 推理 |
| **vLLM** | 多 GPU | 高吞吐服务 |
| **TensorRT-LLM** | 4×80GB A100/H100 | 16-bit precision |
| **MLX** | Apple M-series | 4-bit 量化版可用 |
| **llama.cpp** | Apple M-series 64GB+ | GGUF 格式 |

## 许可证
- **Databricks Open Model License** — 科研 + 商业双重授权

## 集成

- Databricks Mosaic AI Model Serving / Playground
- You.com、Perplexity Labs
- LlamaIndex

## 与同类工具的差异

- **vs [[ai-game-devtools/cosmos|NVIDIA Cosmos]]**: Cosmos 专注物理世界视频生成，DBRX 专注文本 LLM
- **vs Mixtral-8x7B**: DBRX 的 fine-grained MoE（16 experts × 4 active = 65x 更多组合）显著不同于标准的 8×7B 架构
- **训练基础设施**: DBRX 基于 Databricks 全套工具（Apache Spark + Unity Catalog），与纯开源训练框架（[[ai-game-devtools/corenet|CoreNet]] 的 FSDP）定位不同

## See Also

- [[ai-game-devtools/corenet]] — Apple 的深度网络训练库（也有 LLM 训练基础设施）
- [[ai-game-devtools/cosmos]] — NVIDIA 物理 AI 世界基础模型
- [[ai-game-devtools/aios]] — AIOS，LLM OS 抽象层
