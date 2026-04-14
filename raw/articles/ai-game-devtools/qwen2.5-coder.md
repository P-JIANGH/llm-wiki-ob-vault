# Qwen2.5-Coder / Qwen3-Coder — AI Game DevTools Source

> Extracted from: https://github.com/QwenLM/Qwen2.5-Coder (GitHub clone, 2026-04-14)
> Note: This repo actually hosts both Qwen2.5-Coder (earlier) and Qwen3-Coder (newer).

## Overview

**Qwen3-Coder-Next** (latest version in this repo) is an open-weight language model designed for coding agents and local development. Built on **Qwen3-Next-80B-A3B-Base**, which uses hybrid attention + MoE (Mixture of Experts) architecture. Agentically trained at scale on executable task synthesis, environment interaction, and reinforcement learning.

Earlier versions (Qwen2.5-Coder family) include 0.5B–30B dense models.

## Model Variants

| Model | Type | Context | Notes |
|-------|------|---------|-------|
| Qwen3-Coder-Next | Instruct | 256K | Hybrid attention + MoE, 80B total / 3B active |
| Qwen3-Coder-480B-A35B-Instruct | Instruct | 256K | MoE, 480B total / 35B active |
| Qwen3-Coder-30B-A3B-Instruct | Instruct | 256K | Dense, 30B / 3B active |
| Qwen3-Coder-Next-FP8 | Instruct | 256K | FP8 quantized |
| Qwen3-Coder-Next-GGUF | Instruct | 256K | GGUF format for llama.cpp |
| Qwen3-Coder-Next-Base | Base | 256K | Base model |
| Qwen2.5-Coder (various) | Instruct | 128K | Earlier dense models (0.5B–32B) |

## Key Features

- **358 coding languages** supported
- **256K native context**, extendable to **1M** via Yarn
- **Agentic coding**: supports Qwen Code, CLINE, Claude Code, OpenClaw with special function call format
- **Fill-in-the-middle (FIM)**: code completion with `<|fim_prefix|>...<|fim_suffix|>...<|fim_middle|>` format
- **Tool calling**: new tool parser for SGLang and vLLM
- **Retains math and general capabilities** from base model

## Architecture

- **Qwen3-Coder-Next**: Hybrid attention + MoE (Qwen3-Next-80B-A3B-Base), sparse activation
- **Earlier Qwen2.5-Coder**: Dense Transformer (Qwen2.5 architecture)
- New special tokens and token IDs aligned with Qwen3

## Use Cases (from README)

- Releasing a Website (with OpenClaw agent)
- Desktop Tidy (with Qwen Code agent)
- Zombies vs. Plants web game (with Claude Code)
- Sound ASCII Art drawing tool (with Cline)
- Vibe Checking websites (with Browser Use Agent)
- Parkour particle system game (with Qwen Chat Web Dev)

## License

Apache 2.0

## Related

- HuggingFace: https://huggingface.co/collections/Qwen/qwen3-coder-687fc861e53c939e52d52d10
- ModelScope: https://modelscope.cn/organization/qwen
- Blog: https://qwenlm.github.io/blog/qwen3-coder-next/
- Tech Report: qwen3_coder_next_tech_report.pdf

## Finetuning

- **SFT**: `finetuning/sft/` — supervised fine-tuning with binarized data, configs, scripts
- **DPO**: `finetuning/dpo/` — direct preference optimization for alignment

## Directory Structure

```
qwen2.5-coder/
├── README.md
├── qwen3_coder_next_tech_report.pdf
├── requirements.txt
├── examples/          # Example scripts (chat, FIM, repo-level)
├── finetuning/
│   ├── sft/           # SFT training code + configs
│   └── dpo/           # DPO training code + configs
├── qwencoder-eval/    # Evaluation harness
└── assets/            # Demo assets
```
