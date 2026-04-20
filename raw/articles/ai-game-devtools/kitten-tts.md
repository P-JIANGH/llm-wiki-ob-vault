# Kitten TTS — Source Analysis

**Source:** https://github.com/KittenML/KittenTTS
**Date:** 2026-04-21
**Category:** Speech (TTS)

## README Summary

Kitten TTS is an open-source, lightweight text-to-speech library built on ONNX. Models range from 15M to 80M parameters (25-80 MB on disk), delivering high-quality voice synthesis on CPU without requiring a GPU.

**Status:** Developer preview (v0.8.1) — APIs may change between releases.

### Features
- Ultra-lightweight — Model sizes from 25 MB (int8) to 80 MB
- CPU-optimized — ONNX-based inference, no GPU required
- 8 built-in voices — Bella, Jasper, Luna, Bruno, Rosie, Hugo, Kiki, Leo
- Adjustable speech speed — Control playback rate via `speed` parameter
- Text preprocessing — Built-in pipeline handles numbers, currencies, units, etc.
- 24 kHz output — High-quality audio at standard sample rate

### Available Models
| Model | Parameters | Size |
|---|---|---|
| kitten-tts-mini | 80M | 80 MB |
| kitten-tts-micro | 40M | 41 MB |
| kitten-tts-nano | 15M | 56 MB |
| kitten-tts-nano (int8) | 15M | 25 MB |

## Key Source Files

### kittentts/__init__.py
- Exports `KittenTTS` class and `get_model` function
- Version 0.1.0 (internal), Apache 2.0 license

### kittentts/get_model.py
- `KittenTTS` class: main entry point, downloads models from HuggingFace Hub
- `download_from_huggingface()`: fetches config.json + model.onnx + voices.npz
- Supports model types: ONNX1, ONNX2
- Backend selection: CPU (default), CUDA, AMD GPU (ROCm)
- `generate_stream()`: generator-based chunked audio output for real-time use

### kittentts/onnx_model.py
- `KittenTTS_1_Onnx`: core ONNX inference engine
- Uses `phonemizer` (eSpeak backend) for English phonemization
- `TextCleaner`: character-level tokenizer with IPA symbol support (200+ symbols)
- Voice system: 8 internal voices (expr-voice-2-m/f through expr-voice-5-m/f) mapped to friendly names
- Text chunking: splits long text at sentence boundaries (max 400 chars per chunk)
- Speed control: per-voice speed priors + user multiplier
- Audio output: numpy array at 24kHz, trimmed tail (-5000 samples)

### kittentts/preprocess.py (965 lines)
Comprehensive text normalization pipeline:
- Number-to-words conversion (integers, floats, ordinals, Roman numerals)
- Currency expansion ($, €, £, ¥, ₹, ₩, ₿) with scale suffixes (K/M/B/T)
- Time expansion (3:30pm → "three thirty pm")
- Range expansion (10-20 → "ten to twenty")
- Model name normalization (GPT-3 → "GPT 3")
- Unit expansion (100km → "one hundred kilometers")
- Scientific notation (1e-4 → "one times ten to the negative four")
- Fraction expansion (1/2 → "one half")
- HTML/email/URL/hashtag/mention stripping

## Dependencies
- espeakng_loader — eSpeak NG phonemizer data
- phonemizer — text-to-phoneme conversion
- onnxruntime — ONNX model inference
- soundfile — audio I/O
- numpy — array operations
- huggingface_hub — model downloads

## License
Apache License 2.0
