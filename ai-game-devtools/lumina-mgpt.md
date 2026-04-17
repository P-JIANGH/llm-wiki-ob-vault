---
title: Lumina-mGPT
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, autoregressive, image-generation, multimodal, vlm, open-source]
sources: [raw/articles/ai-game-devtools/lumina-mgpt.md]
---

# Lumina-mGPT

## Overview

Lumina-mGPT 是由 **Alpha-VLLM Group**（上海人工智能实验室、香港中文大学、上海交通大学等）开发的**多模态自回归模型家族**，基于 Meta 的 Chameleon 架构扩展，支持灵活的文本到图像生成、图像理解及多种视觉-语言任务。论文发表于 arXiv 2408.02657（2024 年 7 月发布）。

核心思想：利用 LLM 的自回归 token 预测能力统一处理文本和图像 token，实现任意模态的生成与理解。

## Key Facts

| Item | Detail |
|------|--------|
| **Organization** | Alpha-VLLM（上海 AI Lab / CUHK / SJTU） |
| **Architecture** | Chameleon-based 自回归 VQ-LLM（VQ-VAE + LLaMA） |
| **Parameters** | 7B（4 个变体）+ 34B（1 个变体） |
| **Text Encoder** | Chameleon 内置 LLM（基于 LLaMA 架构） |
| **Image Tokenizer** | Meta Chameleon VQ-VAE（需手动下载权重） |
| **License** | Apache 2.0（遵循 Chameleon 使用条款） |
| **Training Framework** | xllmx（从 LLaMA2-Accessory 演化而来） |
| **Demos** | Gradio（图像生成 / Omni 多任务 / Freeform） |

## Model Variants

| Model | 分辨率 | 特点 | HuggingFace |
|-------|--------|------|-------------|
| FP-SFT@512 | 512×512 | 基础图像生成 | Alpha-VLLM/Lumina-mGPT-7B-512 |
| FP-SFT@768 | 768×768 | 更高分辨率生成 | Alpha-VLLM/Lumina-mGPT-7B-768 |
| Omni-SFT@768 | 768×768 | 多任务（深度/分割/姿态/生成） | Alpha-VLLM/Lumina-mGPT-7B-768-Omni |
| FP-SFT@1024 | 1024×1024 | 最高分辨率 | Alpha-VLLM/Lumina-mGPT-7B-1024 |
| FP-SFT@512 | 512×512 | 34B 大模型版 | Alpha-VLLM/Lumina-mGPT-34B-512 |

## Technical Architecture

### Core Design
- **自回归生成**：基于 Meta Chameleon 的 ChameleonForConditionalGeneration，将图像通过 VQ-VAE 离散化为 token 序列，与文本 token 一起进行自回归预测
- **ChameleonXLLMXForConditionalGeneration**：轻量包装类，增加 FSDP 支持、z-loss 正则化、混合精度训练
- **xllmx 框架**：从 LLaMA2-Accessory 演化，提供分布式训练（FSDP）、数据管道、对话模板、激活检查点

### Training
- FSDP 分布式训练（`fairscale` model parallelism）
- BF16 混合精度 + activation checkpointing
- CFG（Classifier-Free Guidance）通过 `create_logits_processor(cfg=4.0, image_top_k=2000)` 实现

### Inference Interface
- **FlexARInferenceSolver**：统一推理接口，支持图像生成、理解、Omni 多任务
- 三种 Gradio Demo：`demo_image_generation.py`（纯生成）、`demo_image2image.py`（多任务切换）、`demo_freeform.py`（自由交互）

## Dependencies

PyTorch 2.3.0、transformers >= 4.43.3、gradio 4.19.0、fairscale、bitsandbytes、accelerate、sentencepiece、einops。

## Relationship to Other Tools

- 与 [[ai-game-devtools/lumina-t2x]] 同属 Alpha-VLLM 的 Lumina 系列，但 T2X 基于 Flow-based Diffusion，而 mGPT 基于自回归
- 与 [[ai-game-devtools/lumina-image-2-0]] 同系列，Image 2.0 使用自回归 DiT 架构
- 与 [[ai-game-devtools/llamagen]] 同为自回归图像生成范式，LlamaGen 用纯 LLaMA 做视觉生成，mGPT 基于 Chameleon
- 与 [[ai-game-devtools/lumina-dimoo]] 同为统一多模态模型，DiMOO 使用离散扩散，mGPT 使用自回归

## Repository

- GitHub: https://github.com/Alpha-VLLM/Lumina-mGPT
- Paper: https://arxiv.org/abs/2408.02657
- HuggingFace: https://huggingface.co/Alpha-VLLM/Lumina-mGPT-7B-768
