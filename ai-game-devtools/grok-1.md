---
title: Grok-1
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [llm, moe, open-source, jax, xai]
sources: [raw/articles/ai-game-devtools/grok-1.md]
---

# Grok-1

> **xAI** 马斯克旗下人工智能公司发布的开源 3140 亿参数混合专家（MoE）大语言模型。Apache 2.0 许可开源推理代码和权重。

## 概述

Grok-1 是 xAI 于 **2024 年 3 月** 开源的超大参数语言模型，是当时全球参数量最大的开源 MoE 模型。不同于 Grok 系列聊天产品（需付费订阅），Grok-1 开源的是基础模型权重和推理代码。

**关键意义：**
- 首次由顶级科技巨头（Elon Musk）发布的超大参数开源 LLM
- 采用 Apache 2.0 许可证（商业友好）
- 推动了 LLM 开源生态的竞争格局

## 技术规格

| 参数 | 值 |
|------|-----|
| **总参数量** | 314B（3140 亿） |
| **激活参数** | ~86B（每 token 激活 2/8 experts） |
| **架构** | Mixture-of-8-Experts (MoE) |
| **每 Token 激活 Experts** | 2 / 8 |
| **Transformer 层数** | 64 |
| **Q Heads** | 48 |
| **KV Heads** | 8（GQA，Grouped Query Attention） |
| **Embedding Size** | 6,144 |
| **上下文长度** | 8,192 tokens |
| **Tokenizer** | SentencePiece，131,072 vocab |
| **训练框架** | JAX + Haiku |
| **许可证** | Apache 2.0 |

### 技术特点

1. **Grouped Query Attention (GQA)**：8 个 KV heads 减少 KV cache 显存，提升推理效率
2. **Rotary Embeddings (RoPE)**：位置编码支持长上下文
3. **8-bit 量化**：支持 `QuantizedWeight8bit` 压缩推理显存
4. **Activation Sharding**：JAX SPMD 分布式推理，data + model 双轴分片
5. **KV Memory**：每层独立 KV cache，支持增量生成
6. **MoE 非最优实现**：README 明确说明 MoE 层为验证正确性而写，非生产效率级实现

## 架构实现

### 核心模块

```
model.py:
├── TransformerConfig        # 配置类（emb_size, num_layers, num_experts 等）
├── MoELayer                 # 混合专家层：Router + 8 个 FFN expert，top-2 激活
│   ├── Router               # 路由模块，softmax 选 top-k experts
│   └── shard_map            # JAX 分片执行 8 个 experts
├── MultiHeadAttention       # GQA：48 Q / 8 KV heads
├── Transformer             # 64 层，含 MoE FFN + MHA + RMSNorm
├── LanguageModel            # LM head
├── RMSNorm                  # 无偏置的 LayerNorm
├── QuantizedWeight8bit      # 8-bit 量化权重（Pytree 兼容）
└── KVMemory / Memory        # KV Cache 结构

runners.py:
├── ModelRunner              # 模型加载、checkpoint、分片策略
└── InferenceRunner          # 推理编排：batching、tokenization、采样
    ├── sample_token         # nucleus (top-p) + top-k 采样
    └── top_p_filter         # Nucleus filtering
```

### 显存需求

| 项目 | 估算 |
|------|------|
| 裸权重（bf16） | ~628 GB |
| 8-bit 量化 | ~314 GB |
| 激活值 + KV cache | 额外数百 GB |
| **总计（推荐）** | **8 × 80GB = 640GB+ GPU** |

> 实测需要 600GB+ 显存，单机 8 卡 A100/H100 或同等配置。

## 快速运行

```shell
# 克隆代码
git clone https://github.com/xai-org/grok-1
cd grok-1

# 下载权重（需约 600GB）
pip install huggingface_hub[hf_transfer]
huggingface-cli download xai-org/grok-1 --repo-type model \
  --include ckpt-0/* --local-dir checkpoints --local-dir-use-symlinks False

# 运行
pip install -r requirements.txt
python run.py
```

## 与同类模型对比

| 模型 | 参数量 | 架构 | 激活参数 | 许可证 |
|------|--------|------|----------|--------|
| **Grok-1** | 314B | MoE-8 | ~86B | Apache 2.0 |
| [[ai-game-devtools/deepseek-r1]] | 671B | MoE | ~37B | MIT |
| [[ai-game-devtools/kimi-k2]] | ~1T | MoE | ~100B | 闭源 |
| Mixtral 8x7B | 46.7B | MoE-8 | ~12B | Apache 2.0 |

**Grok-1 vs DeepSeek R1：** Grok-1 参数量更大（314B vs 671B 总参），但 DeepSeek R1 激活参数更少（37B vs 86B），效率更高，且 R1 有创新的 RL 推理训练路线。

## 应用场景

- **AI 游戏 NPC**：超大上下文窗口（8K）可用于复杂剧情对话
- **长文本生成**：8K 上下文支持长篇小说、报告生成
- **多模态基座**：可作为世界模型（World Model）组件
- **学术研究**：314B MoE 架构研究

## 限制

1. **MoE 实现非最优**：推理效率低，不适合生产部署
2. **显存要求极高**：几乎只有专业算力才能运行
3. **仅推理代码**：无训练代码和训练数据
4. **特殊 Token 作用未公开**：tokenizer 中部分 token 用途不明
5. **评测表现一般**：MMLU/GSM8K 虽不错，但参数量 vs 性能比不高

## 相关链接

- [GitHub: xai-org/grok-1](https://github.com/xai-org/grok-1)
- [Blog: x.ai/blog/grok-os](https://x.ai/blog/grok-os)
- [HuggingFace: xai-org/grok-1](https://huggingface.co/xai-org/grok-1)
