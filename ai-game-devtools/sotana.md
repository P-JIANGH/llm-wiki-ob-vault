---
title: SoTaNa
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, tool, code]
sources: [raw/articles/ai-game-devtools/sotana.md]
---

# SoTaNa

**SoTaNa** (Software Engineering Task-Tuned Assistant) 是基于 LLaMA 的软件工程指令微调模型，使用 LoRA 高效参数微调，覆盖问答、代码生成、代码摘要三类任务。

## Overview

SoTaNa 是一个开源软件工程指令微调模型系列，参数规模覆盖 7B / 13B / 30B。基于 LLaMA 底座，通过 LoRA 参数高效微调，在软件工程领域任务（Stack Overflow 问答、代码生成、代码摘要）上实现优化。

## Architecture

- **Base Model**: LLaMA (7B / 13B / 30B)
- **Fine-tuning**: LoRA (Low-Rank Adaptation)，PEFT 库实现
- **训练参数**: lora_r=8, lora_alpha=16, lora_dropout=0.05, target_modules=[q_proj, v_proj]
- **Framework**: PyTorch + Transformers + PEFT + Weights & Biases
- **依赖包**: bitsandbytes (INT8), gradio (WebUI), nltk, sentencepiece

## Key Capabilities

### Stack Overflow Question Answering
基于自然语言问题，自动生成 Stack Overflow 风格的答案。评测指标：BLEU / ROUGE / CIDER / METEOR。

### Code Generation
根据自然语言指令生成代码。使用 HumanEval 数据集评估。

### Code Summarization
将代码片段摘要为自然语言描述。使用 TLCodeSum 数据集评测。

## Training Results

| 模型 | LLaMA 参数量 | LoRA 参数量 | 训练时间 |
|------|------------|------------|---------|
| SoTaNa-7B  | 7B    | 8.4M  | 25h35m |
| SoTaNa-13B | 13B   | 13.1M | 39h10m |
| SoTaNa-30B | 30B   | 25.6M | 48h02m |

30B 模型在单块 3090 Ti 上约 48 小时完成训练。

## Related Links

- GitHub: https://github.com/DeepSoftwareAnalytics/SoTaNa
- HF Checkpoints: [SoTana-7B](https://huggingface.co/Enoch/SoTana-7B-lora-100000) / [SoTana-13B](https://huggingface.co/Enoch/SoTana-13B-lora-100000) / [SoTana-30B](https://huggingface.co/Enoch/SoTana-30B-lora-100000)

## 关系

- 同属于 Code 工具类：[[codegen]] / [[starcoder]]
- LoRA 微调技术参考：[[metagpt]] 中的 PEFT 应用
- 代码生成评测对比：[[deepseek-coder]]（同为代码领域 LLM）
