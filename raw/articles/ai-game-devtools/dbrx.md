# DBRX — AI Game DevTools Source

## 项目信息
- **URL**: https://github.com/databricks/dbrx
- **名称**: DBRX
- **分类**: LLM
- **克隆自**: gitcode.com (GitHub 原版不存在 databricks/dbrx 仓库)

## README 摘要

DBRX is a large language model trained by Databricks, made available under an open license. Mixture-of-Experts (MoE) model with 132B total parameters and 36B live parameters. Uses 16 experts, of which 4 are active during training or inference. Pre-trained for 12T tokens of text. Context length: 32K tokens.

Models released:
- **DBRX Base**: Pre-trained base model (https://huggingface.co/databricks/dbrx-base)
- **DBRX Instruct**: Finetuned for instruction following (https://huggingface.co/databricks/dbrx-instruct)

Training stack: Composer, LLM Foundry, MegaBlocks, Streaming.

## 架构细节 (来自 config.json 和 configuration_dbrx.py)

- **d_model**: 6144
- **n_heads**: 48
- **n_layers**: 40
- **max_seq_len**: 32768
- **vocab_size**: 100352
- **attn_config**: clip_qkv=8, kv_n_heads=8, rope_theta=500000
- **ffn_config**: ffn_hidden_size=10752, moe_num_experts=16, moe_top_k=4, moe_jitter_eps=0, moe_loss_weight=0.05
- **torch_dtype**: bfloat16
- **Architectures**: DbrxForCausalLM
- **AutoMap**: AutoConfig → configuration_dbrx.DbrxConfig, AutoModelForCausalLM → modeling_dbrx.DbrxForCausalLM

### 与 Mixtral/Grok-1 对比
DBRX uses 16 experts and chooses 4 (fine-grained), vs Mixtral-8x7B (8 experts, choose 2) and Grok-1 (8 experts, choose 2). This provides 65x more possible combinations of experts.

## 技术特点

### Attention
- Grouped Query Attention (GQA)
- Rotary Position Encodings (RoPE, theta=500000)
- Gated Linear Units (GLU)
- clip_qkv=8

### MoE FFN
- 16 experts, 4 active (fine-grained)
- ff n_hidden_size=10752
- dropless MoE (MegaBlocks)
- router_aux_loss_coef=0.05

### Tokenizer
- GPT-4 tokenizer (tiktoken)
- vocab_size: 100352

## 推理方式

1. **transformers** (基础): `AutoModelForCausalLM.from_pretrained("databricks/dbrx-instruct")`
2. **TensorRT-LLM**: Pending PR, needs 4x80GB A100/H100
3. **vLLM**: via official vLLM docs
4. **MLX**: Apple M-series, quantized 4-bit
5. **llama.cpp**: Apple M-series 64GB+, GGUF 格式

## 许可证
- Databricks Open Model License (研究 + 商业可用)

## 集成
- Databricks Mosaic AI Model Serving
- Databricks Mosaic AI Playground
- You.com
- Perplexity Labs
- LlamaIndex

## generate.py 核心代码结构

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Flash attention or eager
attn_implementation = 'flash_attention_2' if flash_att_installed else 'eager'

tokenizer = AutoTokenizer.from_pretrained(HF_REPO_NAME, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    HF_REPO_NAME,
    trust_remote_code=True,
    attn_implementation=attn_implementation,
    torch_dtype=torch.bfloat16,
    device_map='auto',
)

# ChatML format
tokenizer.apply_chat_template(messages, add_generation_prompt=True)
model.generate(**generate_kwargs)
```

## model/ 目录结构

- `config.json` — 模型配置 (d_model=6144, 40 layers, 48 heads, 16 experts)
- `configuration_dbrx.py` — DbrxConfig / DbrxAttentionConfig / DbrxFFNConfig 类
- `modeling_dbrx.py` — DbrxForCausalLM 实现 (参考用，非官方上游)
- `tiktoken.py` — GPT-4 tokenizer 实现
- `tokenizer_config.json` — tokenizer 配置
- `generation_config.json` — generation 配置
