---
title: Lit-LLaMA
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, open-source, python, pytorch, lightning-ai]
sources: [raw/articles/ai-game-devtools/lit-llama.md]
---

# Lit-LLaMA

**Lit-LLaMA** 是 [LLaMA](https://github.com/facebookresearch/llama) 预训练、微调和推理代码的独立开源实现，基于 [nanoGPT](https://github.com/karpathy/nanoGPT) 构建，完全使用 **Apache 2.0 许可证**开源。

> ⚠️ 该项目已不再活跃维护，推荐使用后继项目 [[litgpt|LitGPT]]。

## Overview

原版 LLaMA 代码使用 GPL 许可证，任何使用它的项目也必须 GPL 开源，这"污染"了其他代码并阻止了与生态系统的整合。**Lit-LLaMA 彻底解决了这个问题**——使用 Apache 2.0 许可，无任何附加限制。

## 核心模块

| 模块 | 文件 | 功能 |
|------|------|------|
| 模型定义 | `lit_llama/model.py` | 单文件 LLaMA 实现，支持 7B/13B/30B/65B |
| 量化 | `lit_llama/quantization.py` | LLM.int8 和 GPTQ int4 量化 |
| LoRA | `lit_llama/lora.py` | 低秩适配器微调 |
| 推理 | `generate.py` | 文本生成脚本 |

## 关键特性

- **单文件实现** — `model.py` 包含完整 LLaMA 架构，无样板代码
- **数值等价** — 与原版模型精确对齐
- **消费级硬件** — 7B 模型 bf16 推理 ~14GB，int8 量化 ~5GB；微调需 RTX 3090 (24GB)
- **Flash Attention** — CUDA kernels 加速注意力计算
- **Lightning Fabric** — 分布式训练框架
- **多种量化** — LLM.int8 (bitsandbytes) 和 GPTQ int4

## 架构亮点

```
LLaMAConfig: 7B(32层/32头/4096隐层) | 13B(40层/40头/5120) | 30B(60层) | 65B(80层)
    └── RMSNorm (替代 LayerNorm， 更高效的归一化)
    └── CausalSelfAttention (Flash Attention + RoPE 旋转位置编码)
    └── MLP (SwiGLU 激活函数)
```

## 与同类工具对比

| 项目 | 许可证 | 特点 |
|------|--------|------|
| **Lit-LLaMA** | Apache 2.0 ✅ | 单文件、Lightning Fabric |
| nanoGPT | MIT | 最小化实现、教育友好 |
| vLLM | Apache 2.0 | 高吞吐量推理、PagedAttention |
| llama.cpp | MIT | 纯 C/C++、CPU 高效推理 |

## 游戏开发应用

在 AI 游戏开发工作流中，Lit-LLaMA 可用于：
- **NPC 对话生成** — 使用 LoRA 微调游戏特定语料
- **剧情脚本生成** — 指令微调后的文本生成
- **任务描述生成** — 结合游戏数据微调

## 依赖

```bash
pip install lightning jsonargparse bitsandbytes scipy
```

## 快速使用

```bash
# 安装
git clone https://github.com/Lightning-AI/lit-llama
cd lit-llama
pip install -e ".[all]"

# 下载权重（需自行获取 Meta 官方权重）
python scripts/download.py

# 推理
python generate.py --prompt "Hello, my name is"

# LoRA 微调
python scripts/prepare_alpaca.py
python finetune/lora.py
```

## 许可

Apache 2.0 — 商业友好，无附加限制。

## 相关链接

- GitHub: https://github.com/Lightning-AI/lit-llama
- 后继项目: [[litgpt|LitGPT]]
- 基于: [[nanoGPT]]
