# Pixtral-12B-2409 — Source

> Extracted from: https://huggingface.co/mistralai/Pixtral-12B-2409
> Extracted: 2026-04-26

## Model Overview

**Pixtral-12B-2409** is a Multimodal Model by Mistral AI with 12B language parameters plus a 400M parameter vision encoder. Released September 2024.

## Architecture

- **Language Model**: 12B parameter decoder-only transformer
- **Vision Encoder**: 400M parameter ViT-based encoder (Pixtral internally)
- **Multi-image support**: Up to 5 images per message (configurable via `limit_mm_per_prompt`)
- **Context**: Up to 32K tokens via vLLM

## Key Features

- Image understanding and multimodal reasoning
- Multi-turn conversational support
- Instruction following
- Compatible with standard chat templates

## Benchmarks

### Multimodal Benchmarks

| Benchmark | Pixtral 12B | Qwen2 7B VL | LLaVA-OV 7B | Phi-3 Vision |
|---|---|---|---|---|
| MMMU (CoT) | **52.5** | 47.6 | 45.1 | 40.3 |
| Mathvista (CoT) | **58.0** | 54.4 | 36.1 | 36.4 |
| ChartQA (CoT) | **81.8** | 38.6 | 67.1 | 72.0 |
| DocVQA (ANLS) | 90.7 | **94.5** | 90.5 | 84.9 |
| VQAv2 (VQA Match) | **78.6** | 75.9 | 78.3 | 42.4 |

### Text Benchmarks

| Benchmark | Pixtral 12B | Qwen2 7B VL | LLaVA-OV 7B | Phi-3 Vision |
|---|---|---|---|---|
| MMLU (5-shot) | **69.2** | 68.5 | 67.9 | 63.5 |
| Math (Pass@1) | **48.1** | 27.8 | 38.6 | 29.2 |
| Human Eval (Pass@1) | **72.0** | 64.6 | 65.9 | 48.8 |

### vs Closed-Source

| Benchmark | Pixtral 12B | Claude-3 Haiku | Gemini-1.5 Flash 8B | LLaVA-OV 72B | GPT-4o |
|---|---|---|---|---|---|
| MMMU (CoT) | 52.5 | 50.4 | 50.7 | *54.4* | *68.6* |
| Mathvista (CoT) | 58.0 | 44.8 | 56.9 | *57.2* | *64.6* |
| DocVQA (ANLS) | **90.7** | 74.6 | 79.5 | *91.6* | *88.9* |

## Usage

### vLLM (recommended)

```python
from vllm import LLM
from vllm.sampling_params import SamplingParams

model_name = "mistralai/Pixtral-12B-2409"
sampling_params = SamplingParams(max_tokens=8192)
llm = LLM(model=model_name, tokenizer_mode="mistral")
prompt = "Describe this image in one sentence."
image_url = "https://picsum.photos/id/237/200/300"
messages = [
    {"role": "user", "content": [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": image_url}}
    ]},
]
outputs = llm.chat(messages, sampling_params=sampling_params)
print(outputs[0].outputs[0].text)
```

### Requirements
- vLLM >= v0.6.2
- mistral_common >= 1.4.4

## Links

- HuggingFace: https://huggingface.co/mistralai/Pixtral-12B-2409
- Blog: https://mistral.ai/news/pixtral-12b/
- Chat demo: https://chat.mistral.ai/chat
