---
title: MMRole
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, multimodal, tool, open-source]
sources: [raw/articles/ai-game-devtools/mmrole.md]
---

# MMRole

> ICLR 2025 | MIT License | 85 characters, 11K images, 14K dialogues

## Overview

**MMRole** is a comprehensive framework for developing and evaluating **Multimodal Role-Playing Agents (MRPAs)** — AI agents that emulate specific characters and engage in image-centered dialogues with humans or other agents. It provides three core components: a large-scale dataset (MMRole-Data), a fine-tuned agent model (MMRole-Agent), and a robust evaluation method (MMRole-Eval).

## Architecture

Three-component pipeline built on [[qwen-vl]] (Qwen-VL-Chat):

| Component | Purpose | Details |
|-----------|---------|---------|
| **MMRole-Data** | Training dataset | 85 characters, 11,032 images, 14,346 dialogues → 85,456 train + 294 test samples |
| **MMRole-Agent** | Role-playing model | Qwen-VL-Chat fine-tuned via DeepSpeed ZeRO-3, LoRA support (r=64) |
| **MMRole-Eval** | Evaluation framework | 8 metrics across 3 dimensions, reward model trained on GPT-4 evaluation trajectories |

## Evaluation Dimensions

MMRole-Eval assesses MRPAs across three dimensions with specialized reward models:
1. **Fundamental conversational skills** — coherence, fluency, responsiveness
2. **Multimodal understanding abilities** — image comprehension, visual grounding
3. **Role-playing qualities** — character consistency, personality fidelity, immersion

## Technical Details

- **Backbone**: Qwen-VL-Chat (ViT encoder frozen, LLM fine-tuned)
- **Training**: DeepSpeed ZeRO-3, bf16, 3 epochs, batch size 8 × 4 accumulation
- **LoRA**: r=64, alpha=16, dropout=0.05, targets c_attn/attn.c_proj/w1/w2
- **Inference**: System prompt enforces character immersion; supports deterministic mode
- **Dependencies**: transformers 4.32, deepspeed 0.14.2, peft, PyTorch 1.12+, CUDA 11.4+

## Game Development Relevance

MMRole enables **multimodal NPC dialogue systems** where game characters can:
- Recognize and discuss in-game images/screenshots with players
- Maintain consistent character personalities across visual contexts
- Support multi-turn role-playing with visual grounding

Compared to [[character-glm-6b]] (text-only character dialogue) and [[character-llm]] (trainable text agents), MMRole uniquely adds **visual understanding** to role-playing — characters can see and discuss images, not just text.

## Links

- Paper: [arXiv:2408.04203](https://arxiv.org/abs/2408.04203)
- GitHub: [YanqiDai/MMRole](https://github.com/YanqiDai/MMRole)
- Dataset: [HF YanqiDai/MMRole_dataset](https://huggingface.co/datasets/YanqiDai/MMRole_dataset)
- Model: [HF YanqiDai/MMRole-Agent](https://huggingface.co/YanqiDai/MMRole-Agent)
- Reward Model: [HF YanqiDai/MMRole-Eval_RM](https://huggingface.co/YanqiDai/MMRole-Eval_RM)
