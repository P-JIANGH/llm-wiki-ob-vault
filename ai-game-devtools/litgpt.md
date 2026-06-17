---
title: LitGPT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, tool, code, open-source]
sources: [web:https://github.com/Lightning-AI/litgpt, web:https://lightning.ai/docs/litgpt]
---

# LitGPT

**Lightning AI's lightweight GPT implementation with simple training code**

## Overview

LitGPT is Lightning AI's streamlined GPT implementation designed for simplicity, modularity, and accessibility. It provides clean, well-documented training and inference code for various GPT architectures (Llama, Mistral, Phi, Gemma, etc.) with a focus on making LLM fine-tuning and deployment straightforward. LitGPT supports quantization, LoRA fine-tuning, and multiple inference backends while maintaining a minimal codebase.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Lightning AI (formerly PyTorch Lightning team) |
| **Architecture** | Modular GPT implementations: Llama, Mistral, Phi, Gemma, Falcon, etc. |
| **Features** | Pretraining, fine-tuning (LoRA/QLoRA/Full), inference, quantization |
| **Quantization** | 4-bit (bitsandbytes), 8-bit, GPTQ |
| **Fine-tuning** | LoRA, QLoRA, Adapter, Full fine-tuning with Fabric |
| **Inference** | TensorRT-LLM, bitsandbytes, native PyTorch backends |
| **Model Support** | 10+ model architectures, 20+ pretrained weights |
| **License** | Apache 2.0 |

## Architecture

- **Config-driven**: YAML-based model configurations for easy customization
- **Lightning Fabric**: Distributed training across GPUs/TPUs with minimal boilerplate
- **Modular Design**: Separate components for tokenizer, model, dataloader, training loop
- **Plugin System**: Extensible adapter, LoRA, and quantization modules
- **CLI Interface**: Command-line tools for common operations (download, finetune, pretrain)

## Usage in AI Game Development

LitGPT enables:
- **Custom game LLMs**: Fine-tune models on game-specific text (dialogue, lore, item descriptions)
- **Domain adaptation**: Adapt open-source models to game-specific vocabulary and styles
- **Efficient deployment**: Quantize and optimize models for local game integration
- **Research prototyping**: Experiment with LLM architectures for game AI applications

## Related Projects

- [[nanogpt]] — Karpathy's minimalist GPT training code, educational baseline
- [[llama]] — Meta LLM series, primary model family supported by LitGPT
- [[sglang]] — Structured LLM generation with efficient inference
- [[mlc-llm]] — Universal LLM deployment engine with TVM compilation
