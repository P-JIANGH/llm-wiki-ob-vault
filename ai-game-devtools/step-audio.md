---
title: Step-Audio
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, audio, llm, tool, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/step-audio.md]
---

# Step-Audio

## Overview

Step-Audio is an intelligent speech interaction framework by [StepFun](阶跃星辰), integrating speech comprehension and generation in a single unified 130B-parameter multimodal model. It supports multilingual conversations (Chinese, English, Japanese), emotional tones, regional dialects, adjustable speech rates, and prosodic styles including rap. The project was released on Feb 17, 2025, and is now superseded by [[step-audio-2]] for end-to-end speech conversation and [[step-audio-r1]] for speech reasoning.

## Architecture

### Dual-Codebook Tokenization
- **Semantic tokenizer:** 16.7Hz rate, 1024-entry codebook
- **Acoustic tokenizer:** 25Hz rate, 4096-entry codebook
- **Temporal interleaving:** 2:3 ratio (2 semantic tokens paired with 3 acoustic tokens)

### Language Model
- 130B-parameter foundation based on Step-1 text LLM
- Audio-contextualized continual pretraining on speech data
- Task-specific SFT for ASR, TTS, and AQTA (Audio Question Text Answer)
- RLHF for fine-grained control over emotion, speed, dialect, and prosody

### Speech Decoder
- Hybrid architecture combining **flow matching** with a **mel-to-wave vocoder**
- Uses [[cosyvoice]] 300M models (base + music variant) as vocoder backbone
- Dual-code interleaving training for seamless semantic-acoustic integration

### Real-time Pipeline
- Controller-managed state machine with Voice Activity Detection (VAD)
- Streaming audio tokenization and speculative response generation (40% commit rate)
- Text-based context management achieving 14:1 compression ratio

## Key Features

| Feature | Details |
|---------|---------|
| Languages | Chinese, English, Japanese |
| Emotions | Anger, joy, sadness, coquettish, etc. |
| Dialects | Cantonese, Sichuanese |
| Styles | Rap, a cappella humming |
| Voice Cloning | From prompt WAV + speaker text |
| ToolCall | Integrated function calling support |
| Speed Control | Adjustable fast/slow (ratio-based) |

## Model Variants

| Model | Size | GPU Memory | Purpose |
|-------|------|------------|---------|
| Step-Audio-Tokenizer | — | 1.5GB | Audio tokenization |
| Step-Audio-Chat | 130B | 265GB (4×A800) | Unified speech understanding + generation |
| Step-Audio-TTS-3B | 3B | 8GB | Instruction-following speech synthesis |

## Benchmarks

- **ASR:** Avg CER 4.64 (Step-Audio Pretrain), outperforming Whisper Large-v3 (7.28)
- **TTS:** CER 1.17 zh / 2.0 en (Step-Audio-TTS), best-in-class vs CosyVoice 2-S (1.45 zh / 2.38 en)
- **Chat:** StepEval-Audio-360 scores — Factuality 66.4%, Relevance 75.2%, Chat Score 4.11/5

## Relationships

- Uses [[cosyvoice]] vocoder components (300M base + music)
- Compared against [[moshi]], [[glm-4-voice]], and [[qwen2-audio]] in benchmarks
- Superseded by [[step-audio-2]] (end-to-end) and [[step-audio-r1]] (reasoning)
- Online version available via 跃问 (yuewen.cn)

## Technical Details

- **Framework:** PyTorch 2.3, transformers 4.48.3
- **Custom Flash Attention:** Optimus library required (ALIBI variant, not compatible with standard flash attention)
- **Inference:** Supports vLLM with tensor parallelism via custom fork
- **Docker:** Provided Dockerfiles for standard and vLLM deployments
- **License:** Apache 2.0 (code); model weights under separate license

## Links

- GitHub: https://github.com/stepfun-ai/Step-Audio
- Tech Report: https://arxiv.org/abs/2502.11946
- HuggingFace: Step-Audio-Chat, Step-Audio-TTS-3B, Step-Audio-Tokenizer
- ModelScope mirrors available for Chinese users
