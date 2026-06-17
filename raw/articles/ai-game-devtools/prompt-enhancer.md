# PromptEnhancer — Chain-of-Thought Prompt Rewriting for Image Generation

**Source URL:** https://github.com/Hunyuan-PromptEnhancer/PromptEnhancer
**Developer:** Tencent Hunyuan
**Extracted:** 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview

PromptEnhancer is a prompt-rewriting utility that supports both Text-to-Image (T2I) generation and Image-to-Image (I2I) editing. It restructures raw input prompts into clearer, structured versions using a Chain-of-Thought (CoT) approach while strictly preserving the original intent, significantly improving downstream image generation quality.

## Core Capabilities

- **Dual-Mode Support:** Handles pure text prompts (T2I) and text+image editing instructions (I2I)
- **Intent Preservation:** Restructures prompts without altering the user's core creative goal
- **Hardware Flexibility:** Offers full-precision and quantized (GGUF) variants for diverse GPU setups
- **Performance Optimization:** >50-75% memory reduction with quantized models and minimal quality loss

## Model Variants

| Model | Disk Size | Quality | VRAM | Use Case |
|:---|:---|:---|:---|:---|
| PromptEnhancer-7B | 13GB | High | 8GB+ | Most users, balanced |
| PromptEnhancer-32B | 64GB | Highest | 32GB+ | Research, max quality |
| 32B-Q8_0 (GGUF) | 35GB | Highest | ~35GB | H100, A100 |
| 32B-Q6_K (GGUF) | 27GB | Excellent | ~27GB | RTX 4090, RTX 5090 |
| 32B-Q4_K_M (GGUF) | 20GB | Good | ~20GB | RTX 3090, RTX 4080 |

Best quality/memory trade-off: Q6_K.

## API / Usage

### Backends

| Class | Input | Use Case | Backend |
|:---|:---|:---|:---|
| HunyuanPromptEnhancer | Text only | T2I | transformers (7B/32B) |
| PromptEnhancerImg2Img | Text + Image | I2I editing | transformers (32B) |
| PromptEnhancerGGUF | Text only | Memory-efficient T2I | llama.cpp (quantized) |

### Key Parameters

Standard models: `models_root_path`, `trust_remote_code`, `device_map="auto"`, `predict(prompt_cot, sys_prompt, temperature>0, top_p, max_new_tokens)`

GGUF models: `model_path`, `n_ctx`, `n_gpu_layers`, `verbose`

Img2Img: `model_path`, `device_map="auto"`, `predict(edit_instruction, image_path, sys_prompt, temperature, top_p, max_new_tokens)`

## Key Resources

- Paper: arXiv:2509.04545
- Models: PromptEnhancer-7B (HunyuanImage-2.1 tree), PromptEnhancer-Img2Img-Edit
- Benchmark: T2I-Keypoints-Eval dataset
- Homepage: hunyuan-promptenhancer.github.io
- Related: HunyuanImage-2.1
- Contact: hunyuan_opensource@tencent.com
