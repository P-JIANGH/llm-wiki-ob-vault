---
title: Gemma (PyTorch)
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, model, multimodal, open-source, google]
sources: [raw/articles/ai-game-devtools/gemma.md]
---

# Gemma (PyTorch)

## Overview

**Gemma** is a family of lightweight, state-of-the-art open models built from research and technology used to create Google Gemini models. This repository (`google/gemma_pytorch`) is the official PyTorch implementation, supporting inference on CPU, GPU, and TPU via both vanilla PyTorch and PyTorch/XLA.

## Key Facts

- **Developer:** Google DeepMind (research lineage from Gemini)
- **License:** Research-only distribution (not officially supported Google product)
- **Checkpoint availability:** Kaggle and Hugging Face Hub
- **Tokenizer:** SentencePiece with 99 reserved unused tokens

## Model Variants

| Generation | Text Only | Multimodal |
|---|---|---|
| **Gemma 3** | 1b | 4b, 12b, 27b_v3 |
| **Gemma 2** | 2b-v2, 9b, 27b | — |
| **Gemma v1** | 2b, 7b | — |

Also available: **CodeGemma** (code completion variants)

## Architecture

- Decoder-only transformer (same research lineage as Gemini)
- Multimodal variants use **SigLIP** vision encoder with `gemma3_preprocessor.py`
- Runs on pure PyTorch or PyTorch/XLA (model parallelism for TPU/GPU clusters)

## Technical Stack

- **Inference backends:** PyTorch (CPU/GPU/CUDA), PyTorch/XLA (CPU/GPU/TPU)
- **Core modules:** `model.py` (v1/v2), `gemma3_model.py` (v3), `model_xla.py` (XLA parallel)
- **Docker support:** CPU and GPU Dockerfiles provided for containerized inference

## Relevance to Game Development

Gemma's multimodal variants (Gemma 3 4b/12b/27b) can power in-game dialogue systems, NPC intelligence, and content generation pipelines. Its lightweight design (1B–27B parameters) makes it deployable on developer workstations for rapid iteration. Integration with Unity/Unreal would go through the Hugging Face `transformers` pipeline or direct PyTorch loading.

## Related

- [[deepseek-r1]] — Another major open LLM family with strong reasoning capabilities
- [[llm-integration]] — Patterns for integrating multiple LLM providers into game projects
- [[autonomous-llm-research]] — Related autonomous AI research workflows
