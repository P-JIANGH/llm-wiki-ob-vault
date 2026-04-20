---
title: CosyVoice
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, speech, tts, llm]
sources: [raw/articles/ai-game-devtools/cosyvoice.md]
---

# CosyVoice

## Overview

**CosyVoice** is an advanced open-source text-to-speech (TTS) system based on large language models (LLM), developed by **FunAudioLLM** (Alibaba/DAMO Academy). It supports multilingual zero-shot voice cloning, instruction-based style control, and bi-directional streaming with latency as low as 150ms.

Latest version: **Fun-CosyVoice 3.0** (0.5B, released 2025/12), with an RL post-trained variant.

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Organization** | FunAudioLLM (Alibaba/DAMO) |
| **License** | Apache 2.0 |
| **Latest Version** | Fun-CosyVoice3-0.5B-2512 (2025/12) |
| **Model Size** | 0.5B (v2/v3), 300M (v1) |
| **Training** | Flow matching, RL post-training |
| **Languages** | 9 languages + 18+ Chinese dialects |
| **Min Latency** | 150ms (bi-streaming) |
| **vLLM Support** | Yes (v0.9.0+) |
| **TensorRT-LLM** | Yes (4x speedup) |
| **GitHub** | https://github.com/FunAudioLLM/CosyVoice |
| **Paper** | [CosyVoice 3 arXiv](https://arxiv.org/pdf/2505.17589) |
| **HuggingFace** | [FunAudioLLM/Fun-CosyVoice3-0.5B-2512](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512) |

## Architecture

**LLM-based autoregressive TTS pipeline** with flow matching:

1. **Text Input** — Built-in text normalization (numbers, symbols, formats)
2. **LLM Token Generation** — Autoregressive LLM predicts speech tokens
3. **Flow Matching Decoder** — Converts tokens to mel-spectrogram
4. **Vocoder** — Converts mel to waveform

### Key Components

- **FunCodec** — Audio tokenizer (speech tokenization)
- **LLM backbone** — Autoregressive token prediction (0.5B params)
- **Flow matching module** — Speech token to acoustic feature conversion
- **Speaker embedding** — Zero-shot voice cloning from reference audio
- **vLLM integration** — Accelerated inference
- **TensorRT-LLM runtime** — 4x speedup over HF transformers

### Source Structure

- `example.py` — Usage examples for all model versions
- `webui.py` — Gradio web interface
- `runtime/triton_trtllm/` — TensorRT-LLM deployment
- `runtime/python/grpc/` — gRPC server/client
- `runtime/python/fastapi/` — FastAPI server/client
- `examples/libritts/cosyvoice3/` — CosyVoice 3 training scripts
- `examples/libritts/cosyvoice2/` — CosyVoice 2 training + GRPO DPO

## Technical Features

- **Multilingual**: Chinese, English, Japanese, Korean, German, Spanish, French, Italian, Russian
- **18+ Chinese dialects**: Guangdong, Minnan, Sichuan, Dongbei, Shanxi, Shanghai, Tianjin, etc.
- **Zero-shot voice cloning**: Multi-lingual and cross-lingual
- **Pronunciation inpainting**: Chinese Pinyin and English CMU phonemes control
- **Bi-streaming**: Text-in + audio-out streaming at 150ms latency
- **Instruct support**: Language, dialect, emotion, speed, volume controls
- **RL post-training**: RL variant improves CER by ~33% (1.21% → 0.81%)

## Performance (Fun-CosyVoice3-0.5B-2512)

| Metric | CosyVoice3 | Human | RL Variant |
|--------|-----------|-------|------------|
| test-zh CER | 1.21% | 1.26% | 0.81% |
| test-zh SS | 78.0% | 75.5% | 77.4% |
| test-en WER | 2.24% | 2.14% | 1.68% |
| test-en SS | 71.8% | 73.4% | 69.5% |
| test-hard CER | 6.71% | - | 5.44% |

Compared to [[ai-game-devtools/chat-tts]], CosyVoice covers far more languages (9 vs 2) and has better speaker similarity. Compared to [[ai-game-devtools/bark]], it offers much better content consistency and streaming support.

## Use Cases in Game Development

- **Multilingual NPC voices** — Zero-shot cloning creates consistent voices across 9+ languages
- **Dynamic dialogue** — Streaming mode enables real-time AI character speech
- **Emotion-directed narration** — Instruct mode controls emotion, speed, and volume
- **Pronunciation control** — Phoneme inpainting ensures proper names/terms are pronounced correctly
- **Low-latency interaction** — 150ms streaming suitable for conversational NPCs

## Version History

| Version | Date | Parameters | Notes |
|---------|------|-----------|-------|
| CosyVoice 1.0 | 2024/07 | 300M | Initial release, flow matching |
| CosyVoice 2.0 | 2024/12 | 0.5B | Streaming, scaled up |
| Fun-CosyVoice 3.0 | 2025/12 | 0.5B | RL post-training, 9 languages, 150ms latency |

## Links

- GitHub: https://github.com/FunAudioLLM/CosyVoice
- HuggingFace: https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512
- ModelScope: https://www.modelscope.cn/models/FunAudioLLM/Fun-CosyVoice3-0.5B-2512
- Paper: https://arxiv.org/pdf/2505.17589
- Demo: https://funaudiollm.github.io/cosyvoice3/
