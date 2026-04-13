# Index-1.9B (Bilibili)

## Source
- GitHub: https://github.com/bilibili/Index-1.9B
- HuggingFace: https://huggingface.co/IndexTeam
- ModelScope: https://modelscope.cn/models/IndexTeam
- License: Apache-2.0 (code), INDEX_MODEL_LICENSE (weights)

## Model Variants
| Model | Description |
|-------|-------------|
| Index-1.9B-Base | Base model, 1.9B non-embedding params, 2.8T token pretrain |
| Index-1.9B-Pure | Control version, same params, all instruction data filtered out |
| Index-1.9B-Chat | SFT + DPO aligned dialogue model |
| Index-1.9B-Character | SFT + DPO + RAG for few-shot role-playing |
| Index-1.9B-32K | 1.9B params with 32K context length (RoPE base 32*10000) |

## Key Architecture Details
- Transformer-based causal language model
- RoPE (Rotary Position Embedding) with base 32*10000 for 32K variant
- Doc Packing for efficient long-text training
- Two-stage training: Continue Pre-Train (32K) → SFT (32K)
- No RLHF/DPO in 32K version (focus on long-context capability)

## Training
- Pre-train corpus: 2.8T tokens, mainly Chinese + English
- Long PT: 10B tokens on self-built long-text corpus
- SFT: 30K+ long-text instructions + 50K general instructions
- Hyperparameters: LR 1e-5 (PT), 5e-6 (SFT); Batch 4M tokens (PT), 1M (SFT)

## Benchmarks (Index-1.9B vs同龄模型)
| Model | Average | MMLU | CEVAL | CMMLU | HellaSwag |
|-------|---------|------|-------|-------|-----------|
| Index-1.9B | **64.92** | 52.53 | 57.01 | 52.79 | **80.69** |
| Qwen2-1.5B | 65.17 | 56.5 | 70.6 | 70.3 | 66.6 |
| MiniCPM-2.4B | 62.53 | 53.8 | 49.19 | 50.97 | 67.29 |

## 32K Long Context Results
- NeedleBench: 32K single-needle, mostly green except one yellow at (32K, 10% depth, 91.08)
- LongBench: 35.23
- LEval: 35.86
- Outperforms 7B models like longchat-7b-v1.5-32k on LongBench

## Key Features
- Multilingual (especially East Asian languages) translation ability
- Strong multilingual chat capability due to internet community corpus
- Few-shot role-playing via RAG
- 32K context in only 1.9B params (≈2% of GPT-4 size)
- Quantization: int4 via bitsandbytes (nf4)
- Ollama + llama.cpp support (GGUF)

## Files
- demo/cli_demo.py — terminal chat
- demo/web_demo.py — Gradio web UI
- demo/openai_demo.py — Flask OpenAI-compatible API
- demo/cli_long_text_demo.py — 32K long text only
- evaluate/ — OpenCompass-based evaluation
- finetune/ — LoRA fine-tuning tutorial
- roleplay/ — Role-playing framework

## Dependencies
```
gradio==4.29.0
transformers==4.39.2
```

## Notable Experiments (Failed Attempts)
- Context Length Warmup: length-increasing dataset → loss rebounded
- Packing vs Non-Packing: <1% difference
- 1‰ Long Instruction SFT (LLaMA 3 approach): negative result

## Extended Works
- libllm: https://github.com/ling0322/libllm
- chatllm.cpp RAG role-play
- Ollama: ollama.com/milkey/bilibili-index
- self-llm fine-tuning guide
