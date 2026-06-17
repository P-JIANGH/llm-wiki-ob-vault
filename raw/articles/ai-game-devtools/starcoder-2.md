# StarCoder 2 — Raw Source

**URL**: https://github.com/bigcode-project/starcoder2
**Date**: 2026-04-17
**Source**: GitHub README + finetune.py

## README Summary

StarCoder2 is a family of code generation models (3B, 7B, and 15B), trained on 600+ programming languages from The Stack v2 and some natural language text (Wikipedia, Arxiv, GitHub issues).

### Key Specifications

| Dimension | Details |
|-----------|---------|
| **Model Sizes** | 3B, 7B, 15B parameters |
| **Training Data** | 600+ languages from The Stack v2 + Wikipedia/Arxiv/GitHub Issues |
| **Training Tokens** | 3B & 7B: 3+ trillion; 15B: 4+ trillion |
| **Context Window** | 16,384 tokens |
| **Sliding Window** | 4,096 tokens |
| **Attention** | Grouped Query Attention (GQA) |
| **Architecture** | Causal decoder-only (transformers AutoModelForCausalLM) |
| **License** | Apache 2.0 (implied from BigCode project) |
| **Paper** | https://arxiv.org/abs/2402.19173 |

### Memory Footprint (15B model)

| Precision | Memory |
|-----------|--------|
| FP32/BF16 | ~32 GB |
| 8-bit (bitsandbytes) | ~17 GB |
| 4-bit (bitsandbytes) | ~9 GB |

### Key Features

- **Code completion focused** — not instruction-tuned; designed for code completion, not conversational coding
- **GQA architecture** — Grouped Query Attention for efficient inference
- **Sliding window attention** — 4,096 token local window within 16,384 context
- **Quantization support** — bitsandbytes 8-bit and 4-bit
- **TGI deployment** — Docker-based text-generation-inference support
- **Fine-tuning** — PEFT LoRA + TRL SFTTrainer support with example scripts
- **Evaluation** — Compatible with BigCode-Evaluation-Harness

### File Structure

```
starcoder2/
├── README.md
├── finetune.py          # PEFT LoRA fine-tuning script
├── requirements.txt     # Dependencies
└── LICENSE
```

### Fine-tuning Example

Uses TRL SFTTrainer with PEFT LoRA on the-stack-smol dataset:
- Example: fine-tune StarCoder2-3B on Rust subset of the-stack-smol
- Configurable: max_seq_length, max_steps, learning_rate, gradient_accumulation

### Deployment Options

1. **HuggingFace Transformers** — CPU/GPU/multi-GPU via device_map="auto"
2. **Text-Generation-Inference (TGI)** — Docker container
3. **Quantized inference** — bitsandbytes 8-bit/4-bit

### Comparison with StarCoder (v1)

- 3x larger parameter range (3B/7B/15B vs original 15.5B single size)
- 600+ languages vs 80+ languages
- 16K context vs 8K context
- GQA + sliding window vs standard attention
- The Stack v2 vs The Stack v1
- Apache 2.0 vs OpenRAIL-M license
