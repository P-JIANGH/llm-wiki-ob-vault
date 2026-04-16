---
title: CodeT5 & CodeT5+
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/codet5.md]
---

# CodeT5 & CodeT5+

## Overview

CodeT5 and CodeT5+ are a family of **open code large language models** developed by [Salesforce Research](https://blog.salesforceairesearch.com/) for code understanding and generation tasks. CodeT5 (EMNLP 2021) is a T5-based encoder-decoder model pre-trained on 8.35M functions across 8 programming languages. CodeT5+ (2023) scales up to 16B parameters with flexible encoder-decoder architecture and diverse pre-training objectives.

## Key Facts

| Attribute | CodeT5 | CodeT5+ |
|-----------|--------|---------|
| **Year** | 2021 (EMNLP) | 2023 |
| **Architecture** | T5 encoder-decoder | Flexible: encoder-only / decoder-only / encoder-decoder |
| **Sizes** | small, base, large | 220M, 770M, 2B, 6B, 16B, InstructCodeT5+ 16B |
| **Pre-training** | Masked Span Prediction | Span denoising + causal LM + contrastive + text-code matching |
| **Languages** | 8 PLs | 8+ PLs (initialized from CodeGen) |
| **Best HumanEval Pass@1** | — | 36.1% (InstructCodeT5+ 16B) |
| **License** | BSD-3 | BSD-3 (InstructCodeT5+ 16B: research only) |

## Technical Architecture

### CodeT5
- **Identifier-aware pre-training**: Code identifiers treated as special tokens for better code semantics
- **Unified encoder-decoder**: Single model handles both understanding (defect/clone detection) and generation tasks
- **8 languages**: Python, Java, JavaScript, PHP, Ruby, Go, C, C#
- **CodeXGLUE SOTA**: State-of-the-art on 14 sub-tasks
- **Tokenization**: RoBERTa tokenizer

### CodeT5+
- **Flexible mode operation**: Can run as encoder-only (embedding), decoder-only (generation), or encoder-decoder (seq2seq)
- **Compute-efficient pretraining**: Initialized from frozen CodeGen models (shallow encoder from CodeGen-mono 350M, deep decoder from CodeGen-mono 2B/6B/16B)
- **Bimodal pre-training**: Learns from both unimodal code data and bimodal code-text pairs
- **Instruction tuning**: InstructCodeT5+ 16B aligned with natural language via Code Alpaca 20k dataset
- **Specialized models**:
  - `codet5p-110m-embedding`: 256-dim code embeddings
  - `codet5p-220m-bimodal`: Zero-shot code summarization + code retrieval

## Supported Tasks

- **Code summarization**: Generate natural language description of code
- **Code generation**: Text-to-code from natural language prompts
- **Code autocompletion**: Complete functions given target name
- **Code translation**: Between programming languages (Java↔C#)
- **Code refinement**: Automatic code repair
- **Code defect detection**: Identify bugs in C/C++ code
- **Code clone detection**: Find duplicate code in Java
- **Code retrieval**: Text-to-code semantic search

## Key Capabilities for Game Development

CodeT5 can serve as an AI-powered coding assistant for game developers:
- Generate game logic scripts from natural language descriptions
- Autocomplete game engine API usage (Unity C#, Unreal C++)
- Summarize complex game systems for documentation
- Assist with shader code generation and debugging
- Multi-language support covers most game development stacks

## Usage Example

```python
from transformers import RobertaTokenizer, T5ForConditionalGeneration

tokenizer = RobertaTokenizer.from_pretrained('Salesforce/codet5-base')
model = T5ForConditionalGeneration.from_pretrained('Salesforce/codet5-base')

text = "def greet(user): print(f'hello <extra_id_0>!')"
input_ids = tokenizer(text, return_tensors="pt").input_ids

generated_ids = model.generate(input_ids, max_length=8)
print(tokenizer.decode(generated_ids[0], skip_special_tokens=True))
# Output: "{user.username}"
```

## Related Projects

- vs [[ai-game-devtools/codegen]] — Also from Salesforce, but CodeGen is a causal LM (GPT-style) while CodeT5 is encoder-decoder (T5-style); CodeT5+ initialized from CodeGen for compute-efficient pretraining
- vs [[ai-game-devtools/code-llama]] — Code Llama is based on Llama 2 architecture (stronger base), CodeT5 uses T5 architecture with identifier-aware training
- vs [[ai-game-devtools/codegeex]] — Both are encoder-decoder code models; CodeGeeX has stronger multilingual focus, CodeT5 has identifier-aware pre-training
- vs [[ai-game-devtools/codetf]] — CodeTF is a framework/toolkit for code ML, CodeT5 is a pretrained model family

## Links

- **GitHub**: https://github.com/salesforce/CodeT5
- **Paper (CodeT5)**: https://arxiv.org/abs/2109.00859
- **Paper (CodeT5+)**: https://arxiv.org/abs/2305.07922
- **Paper (CodeRL)**: https://arxiv.org/abs/2207.01780
- **Blog**: https://blog.salesforceairesearch.com/codet5/
- **HuggingFace**: https://huggingface.co/models?search=codet5
