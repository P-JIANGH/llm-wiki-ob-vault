# Seed-OSS

> Source: https://github.com/ByteDance-Seed/seed-oss

## Overview

**Seed-OSS** is a series of open-source large language models developed by ByteDance's Seed Team, released August 20, 2025 under Apache-2.0 license. Designed for long-context, reasoning, agent, and general capabilities with developer-friendly features.

## Model Summary

- **Architecture**: Causal LM with RoPE, GQA attention, RMSNorm, SwiGLU activation
- **Parameters**: 36B
- **QKV Heads**: 80 / 8 / 8
- **Head Size**: 128
- **Hidden Size**: 5120
- **Layers**: 64
- **Vocabulary Size**: 155K
- **Context Length**: 512K (native)
- **RoPE Base Frequency**: 1e7
- **Training Tokens**: 12T

## Variants

1. **Seed-OSS-36B-Base** (with synthetic instruction data) — Base pretrained model
2. **Seed-OSS-36B-Base-woSyn** — Base without synthetic instruction data (research-friendly)
3. **Seed-OSS-36B-Instruct** — Instruction-tuned version

## Key Features

- **Flexible Thinking Budget**: Dynamically control reasoning length (multiples of 512 preferred: 512, 1K, 2K, 4K, 8K, 16K)
- **Enhanced Reasoning**: Balanced general capabilities with strong reasoning performance
- **Agentic Intelligence**: Strong tool-using and issue resolving (SWE-Bench 47%, TAU1-Retail 70.4%)
- **Research-Friendly**: Both with/without synthetic data pre-trained versions released
- **Native Long Context**: 512K context natively

## Benchmark Results (Seed-OSS-36B-Instruct)

| Benchmark | Score | Notes |
|-----------|-------|-------|
| MMLU-Pro | 82.7 | open-source SOTA |
| MMLU | 87.4 | open-source SOTA |
| AIME24 | 91.7 | 2nd place |
| LiveCodeBench v6 | 67.4 | open-source SOTA |
| TAU1-Retail | 70.4 | open-source SOTA |
| SWE-Bench (AgentLess) | 47.0 | open-source SOTA |
| RULER (128K) | 94.6 | open-source SOTA |

## Inference

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name_or_path = "ByteDance-Seed/Seed-OSS-36B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path)
model = AutoModelForCausalLM.from_pretrained(model_name_or_path, device_map="auto")

# With thinking budget
tokenized_chat = tokenizer.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True,
    return_tensors="pt", thinking_budget=512
)
```

**Recommended sampling**: temperature=1.1, top_p=0.95

## Dependencies

```
transformers>=4.55.0
accelerate>=0.34.2
flash_attn>=2.6.3
```

## Key Files

- `inference/generate.py` — Basic inference script with bfloat16 + Flash Attention 2
- `inference/vllm_chat.py` — vLLM chat interface
- `inference/vllm_tool_call.py` — Tool calling with vLLM
- `inference/vllm_output_parser.py` — Output parsing utilities

## Links

- GitHub: https://github.com/ByteDance-Seed/seed-oss
- HuggingFace: https://huggingface.co/collections/ByteDance-Seed/seed-oss-68a609f4201e788db05b5dcd
- Website: https://seed.bytedance.com/
- Contact: seed-bytedance@bytedance.com
