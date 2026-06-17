# Step-Audio — Raw Source

**Source:** https://github.com/stepfun-ai/Step-Audio
**Date:** 2026-04-21
**Category:** Speech (48)

## Overview

Step-Audio is an intelligent speech interaction framework by StepFun (阶跃星辰), integrating comprehension and generation in a single unified model. It supports multilingual conversations (Chinese, English, Japanese), emotional tones, regional dialects, adjustable speech rates, and prosodic styles (including rap).

**Note:** This repository is no longer maintained. Users are directed to:
- [Step-Audio2 & Step-Audio2-mini](https://github.com/stepfun-ai/Step-Audio2) for end-to-end speech conversation
- [Step-Audio-R1 & Step-Audio-R1.1](https://github.com/stepfun-ai/Step-Audio-R1) for speech reasoning
- [Step-Audio-EditX](https://github.com/stepfun-ai/Step-Audio-EditX) for audio editing

## Key Facts

- **Organization:** StepFun (阶跃星辰)
- **Model Size:** 130B-parameter multimodal model (Step-Audio-Chat variant is open-sourced)
- **Release Date:** Feb 17, 2025 (initial release)
- **License:** Apache 2.0 (code), separate license for model weights
- **Tech Report:** https://arxiv.org/abs/2502.11946
- **HuggingFace Models:** Step-Audio-Tokenizer, Step-Audio-Chat, Step-Audio-TTS-3B
- **Online Service:** 跃问 (yuewen.cn)

## Architecture

### Dual-Codebook Tokenizer
- Semantic tokenizer: 16.7Hz, 1024-entry codebook
- Acoustic tokenizer: 25Hz, 4096-entry codebook
- Temporal interleaving ratio: 2:3 (every 2 semantic tokens paired with 3 acoustic tokens)

### Language Model (130B)
- Based on Step-1 (130B text LLM)
- Enhanced via audio-contextualized continual pretraining
- Task-specific post-training with SFT for ASR and TTS
- RLHF for fine-grained control (emotion, speed, dialect, prosody)

### Speech Decoder
- Hybrid architecture: flow matching + mel-to-wave vocoder
- Uses CosyVoice 300M models (base + music variant)
- Trained with dual-code interleaving approach

### Real-time Inference Pipeline
- Controller module manages state transitions
- Voice Activity Detection (VAD)
- Streaming Audio Tokenizer
- Speculative response generation (40% commit rate)
- Text-based context management (14:1 compression ratio)

## Key Source Files

- `stepaudio.py` — Main StepAudio class: combines tokenizer, LLM (AutoModelForCausalLM), and TTS decoder into unified pipeline
- `tts.py` — StepAudioTTS class: uses CosyVoice vocoders, implements RepetitionAwareLogitsProcessor, supports emotion/dialect/style control via system prompts
- `tokenizer.py` — StepAudioTokenizer: dual-codebook audio tokenization
- `offline_inference.py` — Offline inference script supporting audio/text input → audio/text output
- `tts_inference.py` — TTS inference with default speaker or voice cloning
- `app.py` — Gradio web demo for Step-Audio-Chat (4 GPU)
- `tts_app.py` — Gradio web demo for Step-Audio-TTS-3B
- `call_vllm_chat.py` — vLLM inference example with tensor parallelism

## Dependencies

- PyTorch 2.3.1, torchaudio 2.3.1
- transformers 4.48.3
- CosyVoice (from FunAudioLLM)
- FunASR >= 1.1.3
- openai-whisper, librosa, sox
- diffusers, gradio >= 5.16.0

## Hardware Requirements

| Model | GPU Memory |
|-------|-----------|
| Step-Audio-Tokenizer | 1.5GB |
| Step-Audio-Chat (130B) | 265GB (tested on 4x A800 80G) |
| Step-Audio-TTS-3B | 8GB |

## Benchmark Highlights

- ASR: Step-Audio Pretrain achieves best avg CER (4.64) vs Whisper Large-v3 (7.28)
- TTS: Step-Audio-TTS achieves lowest CER (1.17 zh, 2.0 en) vs CosyVoice 2-S (1.45 zh, 2.38 en)
- Chat: Step-Audio-Chat scores highest on StepEval-Audio-360 (Factuality 66.4%, Relevance 75.2%, Chat Score 4.11)

## Features

- Multilingual: Chinese, English, Japanese
- Emotional control: anger, joy, sadness, etc.
- Dialect support: Cantonese, Sichuanese
- Speech rate control: fast/slow adjustments
- Style control: rap, a cappella humming
- Voice cloning from prompt wav
- ToolCall mechanism integration
- Role-playing enhancements
