# Parler-TTS (Stable Speech) — Source Analysis

**Source:** https://github.com/sanchit-gandhi/stable-speech
**Analyzed:** 2026-04-21
**Clone:** GitHub direct, success

## Project Overview

Parler-TTS is a lightweight text-to-speech (TTS) model developed by Hugging Face (Sanchit Gandhi, Yoach Lacombe, Vaibhav Srivastav), reproducing the paper "Natural language guidance of high-fidelity text-to-speech with synthetic annotations" by Dan Lyth (Stability AI) and Simon King (Edinburgh University).

**Key claim:** Fully open-source TTS — all datasets, pre-processing, training code, and weights released under permissive Apache 2.0 license.

## Checkpoints

| Model | Parameters | HuggingFace |
|-------|-----------|-------------|
| Parler-TTS Mini | 880M | parler-tts/parler-tts-mini-v1 |
| Parler-TTS Large | 2.3B | parler-tts/parler-tts-large-v1 |

Both trained on 45k hours of audiobook data. Released 2024-08-08.

## Architecture

**Encoder-Decoder Architecture:**
- **Text Encoder:** AutoModelForTextEncoding (configurable, e.g. T5) — encodes speaker description prompts
- **Decoder:** Causal LM (ParlerTTSForCausalLM) — generates audio codes autoregressively
- **Audio Codec:** DAC (Descript Audio Codec) — 8kbps @ 44kHz, 8 codebooks, used to encode/decode audio waveforms

**Key Components (parler_tts/):**
- `modeling_parler_tts.py` (3678 lines) — Main model: ParlerTTSForConditionalGeneration (encoder-decoder), ParlerTTSForCausalLM (decoder-only), delay pattern mask building/applying
- `configuration_parler_tts.py` — ParlerTTSConfig + ParlerTTSDecoderConfig
- `dac_wrapper/` — DACConfig + DACModel wrapper for Descript Audio Codec integration with transformers
- `logits_processors.py` — ParlerTTSLogitsProcessor for generation control
- `streamer.py` — ParlerTTSStreamer for real-time audio streaming during generation

**Training (training/):**
- `run_parler_tts_training.py` — HuggingFace Accelerate-based training script
- `data.py` — Dataset preparation and loading
- `arguments.py` — Training argument definitions
- `eval.py` — Evaluation utilities
- Config-driven: `helpers/training_configs/starting_point_v1.json` for Mini v1 reproduction

## Usage Pattern

**Two-input design:**
1. **Description prompt** — Natural language describing speaker attributes (gender, pitch, speed, recording quality, emotional tone)
2. **Text prompt** — The actual content to be spoken

```python
description = "A female speaker delivers a slightly expressive and animated speech with a moderate speed and pitch."
prompt = "Hey, how are you doing today?"
```

**Named speakers:** 34 predefined speakers (Laura, Jon, Mike, etc.) with consistent voice characteristics.

## Inference Optimizations

- **SDPA:** Scaled Dot-Product Attention enabled by default (1.4x speedup)
- **Flash Attention 2:** Supported for further speedup
- **torch.compile:** Up to 4.5x generation speedup with `mode="reduce-overhead"` + static cache
- **Streaming:** ParlerTTSStreamer enables time-to-first-audio under 500ms on modern GPU
- **Batch generation:** Multiple samples in parallel

## License

Apache License 2.0 — fully permissive, commercial use allowed.

## Dependencies

- PyTorch, transformers (>=4.44), Descript Audio Codec (DAC)
- soundfile for audio I/O
- accelerate for distributed training
- wandb for experiment tracking

## Game Dev Relevance

- **NPC voice generation:** Natural language control of voice style enables diverse NPC characters without recording sessions
- **Procedural dialogue:** Streaming support enables real-time NPC speech in games
- **34 named speakers:** Ready-made voice variety for indie games
- **Apache 2.0 license:** Fully permissive for commercial game use
- **torch.compile optimization:** 4.5x speedup makes real-time inference feasible on gaming hardware
- **Unity integration potential:** Can be served via API for Unity/Unreal NPC dialogue systems
