# CodeT5 & CodeT5+ — AI Game DevTools Source

**Source**: https://github.com/salesforce/CodeT5
**Date**: 2026-04-17
**License**: BSD-3

## Overview

CodeT5 and CodeT5+ are open code large language models from Salesforce Research for **Code Understanding and Generation**. The repository contains two major model families:

### CodeT5 (EMNLP 2021)
- **Architecture**: Encoder-decoder (T5-based), identifier-aware
- **Pre-training**: 8.35M functions in 8 programming languages (Python, Java, JavaScript, PHP, Ruby, Go, C, C#)
- **Pre-training objective**: Masked Span Prediction (MSP)
- **Checkpoints**: CodeT5-small, CodeT5-base, CodeT5-large, CodeT5-large-ntp-py
- **Achieved SOTA** on 14 sub-tasks in CodeXGLUE benchmark

**Tasks supported**:
- Code summarization (6 languages)
- Text-to-code generation (Concode dataset)
- Code-to-code translation (Java↔C#)
- Code refinement (code repair)
- Code defect detection (C/C++)
- Code clone detection (Java)

**HuggingFace models**: `Salesforce/codet5-small`, `Salesforce/codet5-base`, `Salesforce/codet5-large`, `Salesforce/codet5-large-ntp-py`, `Salesforce/codet5-base-multi-sum`

**CodeRL extension** (NeurIPS 2022): CodeT5-large-ntp-py was used as foundation model for CodeRL, achieving SOTA on APPS Python competition-level program synthesis benchmark.

### CodeT5+ (2023)
- **Architecture**: Encoder-decoder with flexible modes (encoder-only, decoder-only, encoder-decoder)
- **Model sizes**: 220M, 770M, 2B, 6B, 16B, plus InstructCodeT5+ 16B
- **Pre-training objectives**: Span denoising, causal LM, contrastive learning, text-code matching
- **Compute-efficient pretraining**: Initialized from frozen off-the-shelf LLMs (e.g., CodeGen)
- **Shallow encoder + deep decoder** architecture for 2B/6B/16B models (encoder from CodeGen-mono 350M, decoder from CodeGen-mono 2B/6B/16B)

**Specialized models**:
- CodeT5+ 110M embedding model: code embeddings (256-dim)
- CodeT5+ 220M bimodal model: code summarization (zero-shot), code retrieval
- CodeT5+ Python-tuned: 220M-py, 770M-py
- InstructCodeT5+ 16B: instruction-tuned via Code Alpaca 20k

**HumanEval results**:
| Model | Pass@1 | Pass@10 | Pass@100 |
|-------|--------|---------|----------|
| CodeT5+ 770M | 15.5 | 27.2 | 42.7 |
| CodeT5+ 16B | 30.9 | 51.6 | 76.7 |
| InstructCodeT5+ 16B | 36.1 | 57.1 | 80.7 |

**Text-to-code retrieval** (CSN Avg):
- CodeT5+ 110M embedding: 74.23
- CodeT5+ 220M matching (top 32): 75.85

## Technical Architecture

### CodeT5
- Based on T5 architecture with RoBERTa tokenizer
- Identifier-aware pre-training (treats code identifiers as special tokens)
- Unified encoder-decoder for both understanding and generation tasks

### CodeT5+
- Span denoising + causal LM + contrastive learning + text-code matching
- Compute-efficient initialization from CodeGen models
- Instruction tuning with Code Alpaca for natural language alignment
- Bimodal pre-training on both unimodal code and bimodal code-text data

## Key Files
- `CodeT5/` — Original CodeT5 implementation (PyTorch)
  - `run_gen.py` — Generation tasks (summarization, generation, translation, refinement)
  - `run_defect.py` — Code defect detection
  - `run_clone.py` — Code clone detection
  - `models.py`, `configs.py`, `utils.py` — Core modules
- `CodeT5+/` — CodeT5+ implementation
  - `instruct_tune_codet5p.py` — Instruction tuning
  - `tune_codet5p_seq2seq.py` — Seq2Seq fine-tuning
  - `humaneval/` — HumanEval evaluation scripts
  - `code_retrieval/` — Text-to-code retrieval evaluation

## Dependencies
- PyTorch 1.7.1+
- Transformers 4.6.1+
- Tree-sitter 0.2.2
- TensorBoard 4.21.3 (for CodeT5+)
- DeepSpeed (for CodeT5+ training)

## Links
- GitHub: https://github.com/salesforce/CodeT5
- Paper (CodeT5): https://arxiv.org/abs/2109.00859
- Paper (CodeT5+): https://arxiv.org/abs/2305.07922
- Paper (CodeRL): https://arxiv.org/abs/2207.01780
- Blog: https://blog.salesforceairesearch.com/codet5/
- HuggingFace: https://huggingface.co/models?search=codet5
