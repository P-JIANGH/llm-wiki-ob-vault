# CogVLM2 & CogVLM2-Video — Raw Source

> Captured: 2026-04-14 from https://github.com/THUDM/CogVLM2 (GitCode mirror)

## Source README (English + Chinese overview)

CogVLM2 is a next-generation Visual Language Model (VLM) series from THUDM/ZhipuAI, based on Meta-Llama-3-8B-Instruct. Released 2024-05-20.

### Model Family

| Model | Base | Language | Task | Int4 |
|-------|------|----------|------|------|
| cogvlm2-llama3-chat-19B | Llama3-8B | English | Image Understanding, Multi-turn | ✅ HF |
| cogvlm2-llama3-chinese-chat-19B | Llama3-8B | Chinese+English | Image Understanding, Multi-turn | ✅ HF |
| cogvlm2-video-llama3-chat | Llama3-8B | English | Video Understanding, Single-turn | / |
| cogvlm2-video-llama3-base | Llama3-8B | English | Video Understanding, Base | / |

### Key Specs
- Context: 8K (image) / 2K (video)
- Image resolution: up to 1344×1344
- Video: up to 1 minute, 24 frames extracted

### Benchmark Results (Image)

| Model | Open Source | LLM Size | TextVQA | DocVQA | ChartQA | OCRbench | MMMU | MMVet | MMBench |
|-------|-----------|----------|--------|--------|---------|----------|------|-------|---------|
| CogVLM1.1 | ✅ | 7B | 69.7 | - | 68.3 | 590 | 37.3 | 52.0 | 65.8 |
| LLaVA-1.5 | ✅ | 13B | 61.3 | - | - | 337 | 37.0 | 35.4 | 67.7 |
| GPT-4V | ❌ | - | 78.0 | 88.4 | 78.5 | 656 | 56.8 | 67.7 | 75.0 |
| **CogVLM2-LLaMA3** | ✅ | 8B | **84.2** | **92.3** | **81.0** | 756 | 44.3 | 60.4 | 80.5 |
| **CogVLM2-LLaMA3-Chinese** | ✅ | 8B | 85.0 | 88.4 | 74.7 | **780** | 42.8 | 60.5 | 78.9 |

All reviews "pixel only" (no external OCR).

### Benchmark Results (Video)

CogVLM2-Video SOTA on MVBench (62.3 AVG, tied with VideoChat2_HD_mistral) and VideoChatGPT-Bench (3.41 VCG-AVG, best).

## Project Structure

```
basic_demo/       — CLI, multi-GPU CLI, Chainlit web, OpenAI API, Int4
finetune_demo/    — PEFT LoRA fine-tuning example
video_demo/       — CLI, Gradio, REST API for video model
```

## License
CogVLM2 LICENSE + LLAMA3 LICENSE (Meta Llama 3 terms apply)

## Key Files

- `basic_demo/cli_demo.py` — Single GPU inference
- `basic_demo/cli_demo_multi_gpus.py` — Multi-GPU inference
- `basic_demo/openai_api_demo.py` — OpenAI-compatible API server
- `basic_demo/web_demo.py` — Chainlit web UI
- `finetune_demo/peft_lora.py` — LoRA fine-tuning
- `finetune_demo/peft_infer.py` — LoRA inference
- `video_demo/cli_video_demo.py` — Video understanding CLI
- `video_demo/gradio_demo.py` — Gradio video demo
- `video_demo/api_demo.py` — Video REST API

## Related Models
- GLM-4V-9B (2024-06-05): Same data/recipes as CogVLM2, GLM-9B backbone, 13B params, no visual experts
- CogAgent-18B: Parent model used by Design2Code
