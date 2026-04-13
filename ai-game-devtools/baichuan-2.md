---
title: Baichuan 2
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai-model, llm, chinese-llm, open-source]
sources: [raw/articles/ai-game-devtools/baichuan-2.md]
---

# Baichuan 2

## Overview
Baichuan 2 是[[百川智能]]推出的新一代开源大语言模型，训练语料规模达 **2.6 万亿 tokens**，发布 7B / 13B 两种规格的 Base 和 Chat 版本，并对 Chat 模型提供 4bits 量化版本。对学术研究完全开放，商用需邮件申请。

## Key Facts

| Hyperparameter | Value |
|---|---|
| Parameters | 7B / 13B |
| Architecture | Transformer (LLaMA-like) |
| Training Tokens | 2.6 trillion |
| Context Length | 4096 |
| License | Academic free; commercial via email |
| Framework | Hugging Face transformers |

## Versions

| Model | Description |
|-------|-------------|
| Baichuan2-7B-Base | 基础模型 |
| Baichuan2-7B-Chat | 对话模型 |
| Baichuan2-7B-Chat-4bits | 4bits 量化对话模型 |
| Baichuan2-13B-Base | 13B 基础模型 |
| Baichuan2-13B-Chat | 13B 对话模型 |
| Baichuan2-13B-Chat-4bits | 13B 4bits 量化对话模型 |

## Benchmark Performance (13B Base)

在多个权威中英文 benchmark 上显著超越 LLaMA2-13B：

| Benchmark | Baichuan2-13B-Base | LLaMA2-13B |
|-----------|-------------------|-------------|
| C-Eval | 58.10 | 35.80 |
| MMLU | 59.17 | 55.09 |
| CMMLU | 61.97 | 37.99 |
| GSM8K | 52.77 | 28.89 |
| HumanEval | 17.07 | 15.24 |
| MBPP | 30.20 | 27.00 |
| JEC-QA (法律) | 47.40 | 34.08 |

## Architecture & Training

- 采用标准 Transformer  decoder-only 架构
- 使用 Hugging Face `transformers` 库加载，需 `trust_remote_code=True`
- 支持 DeepSpeed 分布式训练
- 支持 LoRA 微调（需安装 peft）
- 预训练语料覆盖中文、英文及多语言场景

## Inference & Deployment

- **GPU (BF16/FP16)**：标准 `AutoModelForCausalLM` 加载
- **8-bit 量化**：BitsAndBytes 在线量化
- **4-bit 量化**：BitsAndBytes NF4 格式，支持离线下载
- **CPU 推理**：float32 加载（速度慢）
- **显存占用**：7B bf16 ≈ 15.3GB，13B bf16 ≈ 27.5GB；4bits 后分别降至 5.1GB / 8.6GB

## Fine-tuning

```bash
deepspeed fine-tune.py \
    --data_path "data/belle_chat_ramdon_10k.json" \
    --model_name_or_path "baichuan-inc/Baichuan2-7B-Base" \
    --output_dir "output" \
    --per_device_train_batch_size 16 \
    --learning_rate 2e-5
```

## Demo Tools

- `cli_demo.py` — 命令行对话界面
- `web_demo.py` — Streamlit 网页界面
- `OpenAI_api.py` — OpenAI 兼容 API

## Related Links

- 🤗 [HuggingFace](https://huggingface.co/baichuan-inc/)
- 🤖 [ModelScope](https://modelscope.cn/organization/baichuan-inc)
- 📄 [arXiv:2309.10305](https://arxiv.org/abs/2309.10305)
- 📧 Email: opensource@baichuan-inc.com

## Related Models

- [[baichuan-7b]] — 前身第一代 7B 模型
- [[baichuan-13b]] — 前身第一代 13B 模型
- [[GLM-4]] — 智谱 GLM 系列，同为中文开源 LLM
