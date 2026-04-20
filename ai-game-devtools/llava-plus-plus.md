---
title: LLaVA++
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, vision-language-model, llm, open-source, mbzuai]
sources: [raw/articles/ai-game-devtools/llava-plus-plus.md]aliases: ["LLaVA++"]

---

# LLaVA++

**LLaVA++** extends the [[LLaVA]] 1.5 visual instruction-following framework by integrating two new large language models: **Phi-3 Mini Instruct (3.8B)** and **LLaMA-3 Instruct (8B)**. The result is two VLM variants — **Phi-3-V** and **LLaMA-3-V** — that combine strong language reasoning with visual comprehension.

Developed by researchers at **Mohamed bin Zayed University of AI (MBZUAI)**.

## Overview

| Property | Value |
|----------|-------|
| **Base LLMs** | Phi-3-mini-4k-instruct (3.8B), LLaMA-3 Instruct 8B |
| **Vision Encoder** | CLIP ViT-L/14 @ 336px (`openai/clip-vit-large-patch14-336`) |
| **MM Projector** | MLP2x GeLU (`mlp2x_gelu`) |
| **Training** | DeepSpeed ZeRO-2/3, LoRA / full fine-tuning |
| **License** | Apache 2.0 |

## Architecture

LLaVA++ follows the standard LLaVA architecture: a frozen vision encoder + learnable MM projector + frozen LLM. The main contribution is the integration code for each LLM:

- **`LlavaPhiForCausalLM`** (`Phi-3-V/llava_phi3.py`) — extends `Phi3ForCausalLM` with multimodal `forward()` and `generate()` overrides. Registers custom type `llava_phi` via `AutoConfig.register`.
- **`LlavaLlamaForCausalLM`** (`LLaMA-3-V/llava_llama.py`) — same pattern for Llama. Registers custom type `llava_llama`.

Both classes inherit `LlavaMetaModel` / `LlavaMetaForCausalLM` from the shared `llava_arch` module, which implements the `prepare_inputs_labels_for_multimodal()` method handling image token injection.

### Training Pipeline

| Stage | Data | Method |
|-------|------|--------|
| Pretrain | LCS-558K (558K image-text pairs) | MM projector only, LR=1e-3 |
| Finetune (LoRA) | LLaVA-Instruct-665K | LoRA r=128, alpha=256, MM projector LR=2e-5 |
| Finetune (Full) | LLaVA-Instruct-665K | Full fine-tune, bf16 |

The S² variant (`FT-S2`) uses the [S²-Wrapper](https://github.com/bfshi/scaling_on_scales) for scale-aware visual token processing.

## Models on Hugging Face

| Model | Variant |
|-------|---------|
| `MBZUAI/LLaVA-Phi-3-mini-4k-instruct-pretrain` | Pretrained |
| `MBZUAI/LLaVA-Phi-3-mini-4k-instruct-lora` | LoRA |
| `MBZUAI/LLaVA-Phi-3-mini-4k-instruct-FT` | Fully fine-tuned |
| `MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-lora` | LoRA |
| `MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT` | Fully fine-tuned |
| `MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT-S2` | S² fine-tuned |

## Relevance to Game Dev

Visual language models like LLaVA++ can power **in-game NPC dialogue with visual context**, **game asset captioning and querying**, and **visual QA for procedural content**. The Phi-3 variant's small footprint (3.8B) makes it suitable for local deployment on developer workstations.

## See Also

- [[LLaVA]] — the base framework LLaVA++ extends
- [[MiniGPT-4]] — another LLaVA-derived VLM
- [[Phi-3-mini]] — Microsoft's underlying Phi-3 LLM
- [[LLaMA-3-Instruct]] — Meta's underlying LLaMA-3 model
