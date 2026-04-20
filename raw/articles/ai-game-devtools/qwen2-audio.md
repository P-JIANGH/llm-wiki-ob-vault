# Qwen2-Audio Source Analysis

**URL:** https://github.com/QwenLM/Qwen2-Audio
**Date:** 2026-04-20

## Overview

Qwen2-Audio is a large-scale audio-language model developed by Alibaba Cloud (通义千问/Qwen team). It accepts various audio signal inputs and performs audio analysis or direct text responses to speech instructions.

## Two Interaction Modes

1. **Voice Chat**: Users freely engage in voice interactions without text input
2. **Audio Analysis**: Users provide audio + text instructions for analysis

## Released Models

- **Qwen2-Audio-7B**: Base model
- **Qwen2-Audio-7B-Instruct**: Instruction-tuned model

## Architecture

Three-stage training pipeline (see `assets/framework.png` in repo):
1. Audio encoder (likely Whisper-like) for audio feature extraction
2. Audio-language alignment / projector layer
3. LLM backbone (Qwen2) for language understanding and generation

## Evaluation Benchmarks (13 datasets)

| Task | Datasets | Metric |
|------|----------|--------|
| ASR | Librispeech, Common Voice, Fleurs, Aishell2 | WER |
| S2TT | CoVoST2 (en-de, de-en, en-zh, zh-en, es-en, fr-en, it-en) | BLEU |
| SER | Meld | ACC |
| VSC | VocalSound | ACC |
| AIR-Bench | Speech/Sound/Music/Mixed-Audio chat benchmarks | GPT-4 Eval |

## Key Results

- **ASR (Librispeech test-clean)**: WER 1.6 (vs Qwen-Audio 2.0, Whisper-large-v3 baseline higher)
- **ASR (Common Voice zh)**: WER 6.9 (vs Whisper 12.8)
- **S2TT (CoVoST2 zh-en)**: BLEU 24.4 (vs Qwen-Audio 15.7)
- **AIR-Bench Speech**: 7.18 GPT-4 score (vs Qwen-Audio 6.47)
- Outperforms Qwen-Audio across all benchmarks

## Requirements

- Hugging Face `transformers` (latest version, must include `qwen2-audio` support)
- `librosa` for audio loading

## Quickstart (Transformers)

```python
from transformers import Qwen2AudioForConditionalGeneration, AutoProcessor

processor = AutoProcessor.from_pretrained("Qwen/Qwen2-Audio-7B-Instruct")
model = Qwen2AudioForConditionalGeneration.from_pretrained(
    "Qwen/Qwen2-Audio-7B-Instruct", device_map="auto"
)
# Voice chat: provide audio only, model responds
# Audio analysis: provide audio + text instructions
```

## Demo

Web UI demo available via `python demo/web_demo_audio.py`

## Links

- HuggingFace: https://huggingface.co/Qwen/Qwen2-Audio-7B
- ModelScope: https://modelscope.cn/models/qwen/Qwen2-Audio-7B
- Paper: https://arxiv.org/abs/2407.10759
- Blog: https://qwenlm.github.io/blog/qwen2-audio

## License

Check individual model repos on HuggingFace. Commercial usage does not require separate application.

## Authors

Chu Yunfei, Xu Jin, Yang Qian, Wei Haojie, Wei Xipin, Guo Zhifang, Leng Yichong, Lv Yuanjun, He Jinzheng, Lin Junyang, Zhou Chang, Zhou Jingren (Alibaba/Qwen team)
