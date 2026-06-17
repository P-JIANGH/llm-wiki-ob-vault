# Lit-LLaMA

> 原始源文件，基于 Lightning-AI/lit-llama GitHub 仓库
> 抓取时间：2026-04-14

## 项目概述

**仓库：** https://github.com/Lightning-AI/lit-llama
**语言：** Python
**许可证：** Apache 2.0
**状态：** 不再活跃维护（已推荐使用后继项目 LitGPT）

## 核心定位

Lit-LLaMA 是 LLaMA 预训练、微调和推理代码的独立开源实现，完全基于 Apache 2.0 许可证开源。该实现基于 nanoGPT 构建，解决了原版 LLaMA 代码 GPL 许可证对生态系统整合的限制问题。

## 架构设计

基于 nanoGPT（Karpathy）构建，核心模块：

### 核心模型 (`lit_llama/model.py`)
- **LLaMAConfig:** 模型配置，支持 7B/13B/30B/65B 四种规模
- **LLaMA:** 主模型类，单文件实现，无样板代码
- **Block:** Transformer 解码器块，含 RMSNorm + CausalSelfAttention + MLP
- **CausalSelfAttention:** 因果自注意力，使用 Flash Attention CUDA kernels
- **RMSNorm:** Root Mean Square Layer Normalization（替代 LayerNorm）
- **build_rope_cache / apply_rope:** Rotary Position Embedding 实现
- **MLP:** SwiGLU 激活函数的前馈网络

### 量化模块 (`lit_llama/quantization.py`)
- LLM.int8 量化（基于 bitsandbytes）
- GPTQ int4 量化（基于 GPTQ）

### LoRA 模块 (`lit_llama/lora.py`)
- LoRA 微调实现，支持低秩适配器高效微调

### Adapter 模块 (`lit_llama/adapter.py`, `lit_llama/adapter_v2.py`)
- Adapter 适配器微调方法

### 推理脚本 (`generate.py`)
- 支持 float16/bfloat16 自动检测
- 支持 `--quantize llm.int8` 消费级 GPU 推理（~14GB 显存）
- 支持 GPTQ int4 量化（~5GB 显存）

### 微调脚本 (`finetune/`)
- `lora.py`: LoRA 高效微调脚本，在 Alpaca 数据集上指令微调
- `adapter.py`: Adapter 微调脚本
- `full.py`: 全参数微调

### 预训练脚本 (`pretrain/`)
- `redpajama.py`: 在 RedPajama 数据集上预训练
- `shakespeare.py`: Shakespeare 数据集演示

### 数据准备脚本 (`scripts/`)
- `prepare_alpaca.py`: Alpaca 指令微调数据集
- `prepare_redpajama.py`: RedPajama 预训练数据集
- `prepare_dolly.py`: Dolly 数据集
- `prepare_shakespeare.py`: Shakespeare 数据集

### 生成脚本 (`generate/`)
- `full.py`, `lora.py`, `adapter.py`, `adapter_v2.py`: 不同微调方法的推理

### 评估脚本 (`evaluate/`)
- `full.py`, `lora.py`, `adapter.py`, `adapter_v2.py`: 不同微调方法的评估

## 技术特点

1. **单文件实现** — LLaMA 模型定义全部在 `model.py` 一个文件中，无样板代码
2. **数值等价** — 与原版 LLaMA 模型在数值上等价
3. **消费级硬件支持** — 7B 模型可在 RTX 3090 (24GB) 上微调
4. **多种量化方式** — int8 (LLM.int8) 和 int4 (GPTQ) 量化
5. **Lightning Fabric** — 基于 Lightning AI 的 Fabric 框架进行分布式训练
6. **Flash Attention** — 使用 CUDA kernels 加速注意力计算

## 依赖关系

```
lightning (L)
torch
jsonargparse
bitsandbytes (for int8)
scipy (for GPTQ)
```

## 已知限制

- ⚠️ **不再活跃维护** — 作者推荐使用后继项目 [LitGPT](https://github.com/Lightning-AI/litgpt)
- 原始 LLaMA 权重需要单独下载（Meta 官方分发，研究专用许可）
- 新项目推荐直接使用 LitGPT（支持 LLaMA 2/Open LLaMA/Vicuna 等）

## 相关项目

- [nanoGPT](https://github.com/karpathy/nanoGPT) — 基础实现
- [LitGPT](https://github.com/Lightning-AI/litgpt) — 后继项目，支持更多模型
- [LoRA](https://arxiv.org/abs/2106.09685) — 低秩适配器论文
- [GPTQ](https://github.com/IST-DASLab/gptq) — 量化技术
