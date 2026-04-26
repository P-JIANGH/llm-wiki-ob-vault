# Grok-1 — Raw Source

> **Source**: GitHub repository `xai-org/grok-1` (cloned 2026-04-26)
> **Original README URL**: https://github.com/xai-org/grok-1
> **Blog URL**: https://x.ai/blog/grok-os
> **License**: Apache 2.0

---

## README 摘要

This repository contains JAX example code for loading and running the Grok-1 open-weights model.

**Run instructions:**
```shell
pip install -r requirements.txt
python run.py
```

The script loads the checkpoint and samples from the model on a test input. Due to the large size of the model (314B parameters), a machine with enough GPU memory is required.

**Note from README:**
> The implementation of the MoE layer in this repository is not efficient. The implementation was chosen to avoid the need for custom kernels to validate the correctness of the model.

### Model Specifications

- **Parameters:** 314B
- **Architecture:** Mixture of 8 Experts (MoE)
- **Experts Utilization:** 2 experts used per token
- **Layers:** 64
- **Attention Heads:** 48 for queries, 8 for keys/values
- **Embedding Size:** 6,144
- **Tokenization:** SentencePiece tokenizer with 131,072 tokens
- **Additional Features:**
  - Rotary embeddings (RoPE)
  - Supports activation sharding and 8-bit quantization
- **Maximum Sequence Length (context):** 8,192 tokens

### Downloading Weights

- Magnet torrent link provided
- HuggingFace: `huggingface-cli download xai-org/grok-1 --repo-type model --include ckpt-0/* --local-dir checkpoints --local-dir-use-symlinks False`

---

## 关键源码文件摘要

### `model.py` (1,398 lines)

**核心模块：**
- `TransformerConfig` — Transformer 配置类，含 MoE 参数
- `MoELayer` — 混合专家层，`Router` + 多个 expert FFN，每个 token 激活 top-2 experts
- `Router` — 路由模块，计算 routing probabilities，用 `top_k` 选择 experts
- `MultiHeadAttention` — 多头注意力，48 Q-heads，8 KV heads（GQA）
- `Transformer` — 主模型，64 层，含 MoE FFN
- `LanguageModel` — 语言模型头部
- `RMSNorm` — RMS Normalization
- `QuantizedWeight8bit` — 8-bit 量化权重支持
- `KVMemory` / `Memory` — KV Cache 实现
- 分片规则：`TRANSFORMER_PARTITION_RULES`、`LM_PARTITION_RULES` — JAX SPMD 分片策略

**关键依赖：** `haiku` (Google NN 框架), `jax`, `jax.experimental.shard_map`

### `run.py` (72 lines)

- `LanguageModelConfig` — 模型配置：vocab=128K, seq_len=8192, emb_size=6144, 48 Q-heads, 8 KV heads, 64 layers, 8 experts, top-2
- `InferenceRunner` — 推理运行器，local_mesh_config=(1, 8)
- `sample_from_model` — 采样函数

### `runners.py` (605 lines)

- `ModelRunner` — 模型运行器，含 checkpoint 加载和参数分片
- `InferenceRunner` — 推理编排器，含 batching、tokenization、KV cache 管理
- `sample_token` — nucleus sampling + top-k 采样
- `top_p_filter` — Nucleus filtering 实现
- 依赖：`sentencepiece` tokenizer, `numpy`, `jax`

### `checkpoint.py`

- 提供 checkpoint 加载、参数恢复逻辑

### `requirements.txt`

- `jax[cuda12]==0.4.30` (CUDA 12 支持)
- `flax` (JAX NN 库)
- `transformax` (可能为 xAI 自有库)
- `sentencepiece`
- `huggingface_hub`

### `tokenizer.model`

- SentencePiece tokenizer，131,072 tokens

---

## 架构要点

1. **MoE 实现非最优**：README 明确说明 MoE 层实现为验证正确性而优化，非生产级效率
2. **GQA（Grouped Query Attention）**：8 个 KV heads，48 个 Q heads，减少 KV cache 显存
3. **Activation Sharding**：JAX SPMD 分片，data axis + model axis
4. **8-bit 量化**：支持 `QuantizedWeight8bit` 以节省显存
5. **KV Memory**：每层独立的 key/value cache，支持增量推理
6. **分布式推理**：通过 `local_mesh_config=(1, 8)` 在 8 GPU 上运行
7. **权重下载**：需单独从 HuggingFace 或 torrent 下载约 600GB 权重

---

## 显存需求估算

- 314B 参数 × 2 bytes (bfloat16) = 628 GB（裸权重）
- 加上优化器状态、激活值、KV cache，实际需要 8x80GB = 640GB+ GPU 显存（单机 8 卡 A100/H100）
