---
title: CodeGen
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/codegen.md]
---

# CodeGen

**CodeGen** is Salesforce AI Research's open-source family of large language models for **program synthesis** (代码生成). The project spans three generations (CodeGen1, CodeGen2, CodeGen2.5) published at ICLR 2023, with model sizes ranging from 350M to 16B parameters.

## Overview

CodeGen generates code from natural language prompts and supports multi-turn program synthesis. Key milestones:

| Version | Release | Models | Key Innovation |
|---------|---------|--------|----------------|
| CodeGen1.0 | 2022-03 | 2B, 6B, 16B | On par with OpenAI Codex at the time |
| CodeGen2.0 | 2023-05 | 1B, 3.7B, 7B, 16B | Enhanced infill sampling (code completion) |
| CodeGen2.5 | 2023-07 | 7B | 7B outperforms 16B; StarCoderData pretraining |

## Architecture

- **Model Type**: Autoregressive transformer decoder (GPT-style)
- **Framework**: Hugging Face Transformers compatible
- **Training Library**: Jaxformer (salesforce/jaxformer) — data preprocessing, training, fine-tuning
- **Tokenizer**: GPT-2 style (CodeGen1), TikToken (CodeGen2.5)

## CodeGen2.5 — "Small, but mighty"

The most impactful version:
- **7B parameter model** outperforms 16B models on code synthesis benchmarks
- Pre-trained on **StarCoderData** (BigCode project's programming language dataset)
- Three variants:
  - `codegen25-7b-multi` — multi-language (Apache-2.0)
  - `codegen25-7b-mono` — monolingual (Apache-2.0)
  - `codegen25-7b-instruct` — instruction-tuned (research only)
- Dependencies: `transformers>=4.29.2`, `tiktoken==0.4.0`

## Usage

All models available on Hugging Face Hub under `Salesforce/codegen-*` namespace:

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen25-7b-mono", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen25-7b-mono")
inputs = tokenizer("def hello_world():", return_tensors="pt")
sample = model.generate(**inputs, max_length=128)
```

## Publications

1. **CodeGen1**: "CodeGen: An Open Large Language Model for Code with Multi-Turn Program Synthesis" — ICLR 2023
2. **CodeGen2**: "CodeGen2: Lessons for Training LLMs on Programming and Natural Languages" — ICLR 2023

Lead authors: Erik Nijkamp, Hiroaki Hayashi, Yingbo Zhou, Caiming Xiong (Salesforce AI Research).

## License

- Code and most model weights: **Apache License 2.0**
- CodeGen2.5-instruct: Research purposes only
- Salesforce AI ethics disclaimer applies — evaluate for accuracy, safety, and fairness before deployment

## Project Structure

```
codegen/
├── codegen1/          # CodeGen1.0: Jaxformer training lib + benchmarks
├── codegen2/          # CodeGen2.0: infill sampling support
├── codegen25/         # CodeGen2.5: optimized 7B model
└── assets/            # Images and logos
```

## Game Dev Relevance

CodeGen can be used for AI-assisted game development:
- Generate game logic code (Unity C#, Godot GDScript, etc.)
- Automated shader generation assistance
- NPC behavior scripting
- Tool development for game pipelines

## Related Pages

- [[codegen2]] — CodeGen 第二代详细页面：1B/3.7B/7B/16B，原生 infilling，19 种语言
- [[codegeex]] — THUDM 13B multilingual code generation model, similar scope
- [[codegeex2]] — CodeGeeX 2nd generation, improved performance
- [[codegeex4]] — CodeGeeX 4th generation with full-stack capabilities

## Links

- **GitHub**: https://github.com/salesforce/CodeGen
- **Hugging Face**: https://huggingface.co/models?search=salesforce+codegen
- **Training Lib**: https://github.com/salesforce/jaxformer
- **Paper 1**: https://arxiv.org/abs/2203.13474 (ICLR 2023)
- **Paper 2**: https://arxiv.org/abs/2305.02309 (ICLR 2023)
- **Blog**: https://blog.salesforceairesearch.com/codegen25
