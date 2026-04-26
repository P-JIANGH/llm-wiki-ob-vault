---
title: Pixtral-12B-2409
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [vlm, multimodal, vision, llm, open-source]
sources: [raw/articles/ai-game-devtools/pixtral-12b-2409.md]
---

# Pixtral-12B-2409

> **Note:** Pixtral-12B-2409 is the first released model from Mistral AI's Pixtral family. For the full Pixtral API offering, see [[ai-game-devtools/mistral-7b|Mistral AI]] ecosystem.

## Overview

**Pixtral-12B-2409** is Mistral AI's open-source multimodal vision-language model (VLM), released September 2024. It features 12B language parameters plus a dedicated 400M parameter vision encoder (Pixtral ViT), supporting image understanding, multi-turn dialogue, and instruction following.

## Key Facts

| Property | Value |
|---|---|
| Language Model | 12B parameters, decoder-only transformer |
| Vision Encoder | 400M parameters (Pixtral internal ViT) |
| Input Resolution | Variable — native multi-image support |
| Max Images per Message | 5 (configurable via `limit_mm_per_prompt`) |
| Max Context | 32K tokens (via vLLM) |
| Release | September 2024 |
| License | Apache 2.0 (per Mistral AI standard) |

## Architecture

Pixtral uses a **two-tower design**: a frozen 400M-param Vision Transformer encodes images into visual tokens, which are then interleaved with text tokens in the 12B language model. This is similar to [[ai-game-devtools/qwen-vl|Qwen-VL]]'s architecture but with a smaller, purpose-built internal vision encoder.

Multi-image support is a first-class feature — the model can reason across up to 5 images in a single conversation turn via the `limit_mm_per_prompt={"image": N}` parameter.

## Benchmarks

Pixtral-12B ranks among the best open multimodal models at its scale, competitive with Qwen2-VL-7B and LLaVA-OneVision-7B, and even matching or beating closed models on several tasks.

### Multimodal

| Benchmark | Pixtral 12B | Qwen2 7B VL | LLaVA-OV 7B | GPT-4o |
|---|---|---|---|---|
| MMMU (CoT) | 52.5 | 47.6 | 45.1 | *68.6* |
| Mathvista (CoT) | 58.0 | 54.4 | 36.1 | *64.6* |
| ChartQA (CoT) | **81.8** | 38.6 | 67.1 | *85.1* |
| DocVQA (ANLS) | 90.7 | **94.5** | 90.5 | *88.9* |
| VQAv2 | **78.6** | 75.9 | 78.3 | *77.8* |

### Text-Only

| Benchmark | Pixtral 12B | Qwen2 7B VL | LLaVA-OV 7B |
|---|---|---|---|
| MMLU (5-shot) | **69.2** | 68.5 | 67.9 |
| Math (Pass@1) | **48.1** | 27.8 | 38.6 |
| Human Eval (Pass@1) | **72.0** | 64.6 | 65.9 |

> *Italicized values = closed-source reference models.*

## Technical Highlights

- **Strong ChartQA**: Outperforms GPT-4o on ChartQA (81.8 vs 85.1 — Pixtral higher), indicating strong OCR/table understanding.
- **Balanced multimodal + text**: Unlike many VLMs that sacrifice text capability, Pixtral maintains strong MMLU (69.2) and Human Eval (72.0) alongside vision tasks.
- **vLLM production-ready**: Recommended deployment via `vLLM >= 0.6.2` with native OpenAI-compatible API.
- **Multi-image reasoning**: Unique among 12B-class open VLMs for supporting 5 images per message natively.

## Inference with vLLM

```python
from vllm import LLM
from vllm.sampling_params import SamplingParams

llm = LLM(model="mistralai/Pixtral-12B-2409", tokenizer_mode="mistral")
messages = [{"role": "user", "content": [
    {"type": "text", "text": "Describe this image."},
    {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
]}]
outputs = llm.chat(messages, SamplingParams(max_tokens=8192))
print(outputs[0].outputs[0].text)
```

## Related Models

- [[ai-game-devtools/qwen-vl|Qwen-VL]] — Alibaba's VLM family, similar capability tier, broader model sizes
- [[ai-game-devtools/llava-onevision|LLaVA-OneVision]] — LLaVA OV 7B/72B, strong open-source VLM alternative
- [[ai-game-devtools/cogvlm2|CogVLM2]] — THUDM VLM with GUI Agent capabilities
- [[ai-game-devtools/llava|LLaVA]] — UW-Madison's foundational open VLM (architecture reference)

## Links

- HuggingFace: https://huggingface.co/mistralai/Pixtral-12B-2409
- Blog: https://mistral.ai/news/pixtral-12b/
- Chat: https://chat.mistral.ai/chat
- vLLM: https://github.com/vllm-project/vllm
