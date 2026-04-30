---
title: Kitten TTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, tts, speech, open-source, python, on-device, edge]
sources: [raw/articles/ai-game-devtools/kitten-tts.md]
---

# Kitten TTS

**Kitten TTS** is an open-source, ultra-lightweight text-to-speech library by **KittenML**, built on ONNX runtime. With models as small as 15M parameters (25 MB on disk), it runs efficiently on CPU without GPU, making it ideal for edge deployment and game integration.

- **GitHub:** [KittenML/KittenTTS](https://github.com/KittenML/KittenTTS)
- **HuggingFace Demo:** [KittenML/KittenTTS-Demo](https://huggingface.co/spaces/KittenML/KittenTTS-Demo)
- **Website:** [kittenml.com](https://kittenml.com)
- **License:** Apache 2.0
- **Version:** 0.8.1

## Model Variants

| Model | Parameters | Disk Size | Use Case |
|---|---|---|---|
| kitten-tts-mini | 80M | 80 MB | Highest quality |
| kitten-tts-micro | 40M | 41 MB | Balanced quality/size |
| kitten-tts-nano | 15M | 56 MB | Smallest footprint |
| kitten-tts-nano (int8) | 15M | 25 MB | Minimal disk usage |

## Architecture

- **ONNX Runtime** inference engine — supports CPU, CUDA, and ROCm backends
- **eSpeak phonemizer** — English phoneme extraction with stress preservation
- **Character-level tokenizer** — 200+ symbol vocabulary including IPA characters
- **Style reference voices** — 8 built-in voices stored as NPZ reference vectors
- **HuggingFace Hub** — automatic model download via `huggingface_hub`

## Text Preprocessing

Built-in comprehensive text normalization pipeline (965 lines):
- Number-to-words (integers, floats, ordinals, Roman numerals, scientific notation)
- Currency expansion (7 currency symbols + K/M/B/T scale suffixes)
- Time expansion (3:30pm → "three thirty pm")
- Unit expansion (100km → "one hundred kilometers")
- Model name normalization (GPT-3 → "GPT 3")
- HTML/email/URL stripping

## Voices

8 built-in voices: Bella, Jasper, Luna, Bruno, Rosie, Hugo, Kiki, Leo

## API

```python
from kittentts import KittenTTS

model = KittenTTS("KittenML/kitten-tts-mini-0.8")
audio = model.generate("Hello world.", voice="Jasper", speed=1.0)
# Streaming for real-time
for chunk in model.generate_stream("Long text here..."):
    play(chunk)  # 24kHz numpy arrays
```

## Game Dev Relevance

- **NPC dialogue**: Ultra-lightweight TTS suitable for on-device NPC voice generation
- **Edge deployment**: 25 MB int8 model runs on CPU, no GPU needed — ideal for indie games
- **Streaming output**: `generate_stream()` enables real-time chunked audio for interactive dialogue
- **Speed control**: Adjustable speech rate for character personality differentiation

## Comparison with Other TTS

| Feature | Kitten TTS | [[glow-tts]] | [[gpt-sovits]] | [[cosyvoice]] |
|---|---|---|---|---|
| Model size | 25-80 MB | ~100 MB | ~1-3 GB | ~3-14 GB |
| GPU required | No | Training only | Training only | Yes (inference) |
| Languages | English only | English + more | CN/EN/JP/KR/Cantonese | 9 languages |
| Voice cloning | No | No | Yes (5s zero-shot) | Yes (zero-shot) |
| License | Apache 2.0 | MIT | Multiple | Apache 2.0 |
| Streaming | Yes | No | No | Yes |

Kitten TTS is the lightest option — designed for CPU-only edge deployment rather than quality or multilingual support. Best fit for games needing simple English NPC voices without GPU requirements.

## Roadmap

- Optimized inference engine
- Mobile SDK
- Higher quality models
- Multilingual TTS
- KittenASR (speech recognition)
