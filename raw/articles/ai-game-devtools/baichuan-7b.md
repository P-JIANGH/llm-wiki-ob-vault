# Baichuan-7B Raw Source

> Extracted from: https://github.com/baichuan-inc/baichuan-7B
> Date: 2026-04-13

## README Summary

Baichuan-7B 是百川智能开发的大规模预训练模型，70亿参数，基于Transformer，支持中英双语，上下文窗口4096。

### 关键信息
- **开发者**: 百川智能 (Baichuan Intelligent Technology)
- **参数**: 7B (7,000,559,618)
- **架构**: 标准Transformer（与LLaMA相同设计）
  - 32层，32头，d_model=4096
  - Position Embedding: Rotary Embedding
  - Feedforward: SwiGLU (intermediate_size=11008)
  - LayerNorm: RMSNorm Pre-Normalization
- **词表**: 64000
- **上下文**: 4096
- **训练数据**: 约1.2万亿tokens
- **License**: Baichuan-7B License (允许商业使用)

### 评测结果
- C-Eval: 42.8 (同尺寸SOTA)
- MMLU: 42.3
- Gaokao: 36.24
- AGIEval: 34.44

## 核心文件

### config.json
```json
{
  "architectures": ["BaiChuanForCausalLM"],
  "hidden_size": 4096,
  "num_hidden_layers": 32,
  "num_attention_heads": 32,
  "intermediate_size": 11008,
  "max_position_embeddings": 4096,
  "vocab_size": 64000,
  "hidden_act": "silu",
  "rms_norm_eps": 1e-06
}
```

### modeling_baichuan.py 架构要点
- `RMSNorm`: 基于RMSNorm的Pre-Normalization
- `RotaryEmbedding`: RoPE位置编码
- `Attention`: 标准Multi-head Attention，W_pack合并QKV投影
- `MLP`: SwiGLU实现 (gate_proj * up_proj * down_proj)
- `DecoderLayer`: Pre-Normalization结构，self-attn + mlp
- `Model`: 32层Decoder堆叠，gradient checkpointing支持
- `BaiChuanForCausalLM`: CausalLM包装，LM head输出

### 文件列表
- config.json
- configuration_baichuan.py
- generation_config.json
- handler.py
- modeling_baichuan.py
- tokenization_baichuan.py
- tokenizer.model
- tokenizer_config.json
- special_tokens_map.json
