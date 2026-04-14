# LongVA — Raw Source

> Captured: 2026-04-15
> URL: https://github.com/EvolvingLMMs-Lab/LongVA
> License: S-Lab License 1.0 (non-commercial)

## Project Overview

LongVA (Long Vision Assistant) is a large multimodal model (LMM) developed by the S-Lab at Nanyang Technological University (NTU). The key innovation is that **long context capability can zero-shot transfer from language to vision** — techniques developed for extending LLM context windows (e.g., to 200K+ tokens) are applied to visual token sequences.

**Key claims:**
- Processes up to 2000 frames or over 200K visual tokens
- Achieves SOTA performance on Video-MME among 7B models
- Built on LLaVA-NeXT architecture; base: Qwen-2 (or Llama-3) language model

## Architecture

Based on LLaVA-NeXT (LLaVA-VL/LLaVA-NeXT), the model uses:
- **Vision encoder**: CLIP-ViT (likely L/14 based on LLaVA-NeXT convention)
- **Language model**: Qwen2-7B-Instruct (or Llama-3 variants)
- **Multimodal projector**: 2-layer MLP (via `multimodal_projector/`)
- **Vision-language alignment**: Training data from LLaVA-NeXT-Data
- **Text extension**: Extended Qwen2 with 224K context via YaRN/sparse attention

Core modules:
- `longva/model/llava_arch.py` — LlavaArchitecture base class
- `longva/model/language_model/llava_qwen.py` — Qwen2-based LLM + vision integration
- `longva/model/multimodal_projector/` — Vision-language projection
- `longva/model/multimodal_encoder/` — Vision encoder (CLIP)
- `longva/model/multimodal_resampler/` — Perceiver Resampler for temporal modeling

## Key Files

| File | Purpose |
|------|---------|
| `longva/model/builder.py` | `load_pretrained_model()` — model loading entry point |
| `longva/mm_utils.py` | `tokenizer_image_token()`, `process_images()` — tokenization & image processing |
| `longva/constants.py` | `IMAGE_TOKEN_INDEX` constant |
| `longva/conversation.py` | Conversation template handling (qwen_1_5, llava default) |
| `local_demo/longva_backend.py` | CLI inference script |
| `local_demo/multimodal_chat.py` | Gradio chat UI |
| `vision_niah/` | Video-Needle-in-a-Haystack evaluation |
| `text_extend/` | Long text (language) context extension training |
| `easy_context/` | Easy context framework |

## Training

- `longva/scripts/` — Training scripts for vision-text alignment
- Training data: LLaVA-NeXT-Data on HuggingFace (`lmms-lab/LLaVA-NeXT-Data`)
- Text extension: ~2 days on 8x A100 GPUs
- Extended Qwen2-7B-224K available on HuggingFace

## Evaluation

- **lmms-eval**: Image tasks (MME benchmark) and video tasks (Video-MME benchmark)
- **V-NIAH**: Needle-in-a-haystack for video — tests long-context retrieval over 1h+ video
- Uses `decord` for video decoding, `accelerate` for distributed evaluation

## Inference API

```python
from longva.model.builder import load_pretrained_model
model_path = "lmms-lab/LongVA-7B-DPO"
tokenizer, model, image_processor, _ = load_pretrained_model(model_path, None, "llava_qwen", device_map="cuda:0")
# Supports image and video input with up to 2000 frames
```

## Dependencies

Key dependencies: `transformers` (modified fork), `torch==2.1.2`, `accelerate==0.28.0`, `decord`, `deepseek`, `open_clip_torch`, `peft`, `deepspeed==0.14.0`, `wandb`, `gradio==4.29.0`.

## Related Models

- LongVA-7B-DPO: DPO-trained version on HuggingFace
- Qwen2-7B-Instrcuct-224K: Long-context text model (224K tokens)
- Based on: LLaVA-NeXT, LLaVA (base codebase)
- Evaluation framework: lmms-eval (from EvolvingLMMs-Lab)
