# Chatterbox TTS — Source Analysis

> Source: https://github.com/resemble-ai/chatterbox
> Analyzed: 2026-04-21
> License: Apache-2.0

## Overview

**Chatterbox** is a family of three state-of-the-art, open-source text-to-speech models by Resemble AI. The latest version is **Chatterbox-Turbo**, built on a 350M parameter architecture with single-step speech-token-to-mel decoding.

## Key Facts

- **Developer**: Resemble AI
- **License**: Apache-2.0
- **Python**: 3.10+ (tested on 3.11, Debian 11)
- **Install**: `pip install chatterbox-tts`
- **Package version**: 0.1.7

## Model Zoo

| Model | Size | Languages | Key Features |
|-------|------|-----------|-------------|
| Chatterbox-Turbo | 350M | English | Paralinguistic tags ([laugh], [cough], [chuckle]), single-step mel decoding, lower compute/VRAM |
| Chatterbox-Multilingual | 500M | 23+ languages | Zero-shot cloning, multiple languages |
| Chatterbox (original) | 500M | English | CFG & exaggeration tuning, creative controls |

## Architecture (Turbo)

The Turbo model has four main components:

1. **T3 (Text-to-Token)**: Autoregressive transformer (GPT2-medium config) that converts text tokens to speech tokens. Uses HuggingFace AutoTokenizer (50276 vocab). Inference via `inference_turbo()` with top-k/top-p sampling.

2. **S3Gen (Speech Token to Waveform)**: Distilled decoder that reduces generation from 10 steps to **one** step using MeanFlow (integral mean flow matching). Includes:
   - S3Tokenizer: Speech tokenization at 16kHz (S3_SR)
   - Matcha components: Transformer, decoder, flow matching
   - HiFiGAN vocoder for waveform synthesis
   - F0 predictor for pitch

3. **VoiceEncoder**: Extracts speaker embeddings from reference audio (15-second clips at 16kHz) for zero-shot voice cloning.

4. **Perth Watermarker**: Built-in imperceptible neural watermark for responsible AI — survives MP3 compression and editing.

## Key Modules (source tree)

```
src/chatterbox/
├── tts_turbo.py          # ChatterboxTurboTTS main class
├── tts.py                # Original ChatterboxTTS
├── mtl_tts.py            # Multilingual TTS
├── vc.py                 # Voice Conversion
├── models/
│   ├── t3/               # Text-to-Token transformer (T3, Perceiver, config)
│   ├── s3gen/            # Speech token generator (Matcha, HiFiGAN, flow)
│   ├── s3tokenizer/      # Speech tokenization
│   ├── voice_encoder/    # Speaker embedding extraction
│   └── tokenizers/       # Text tokenization
```

## Dependencies

- torch 2.6.0+, torchaudio 2.6.0+
- transformers 5.2.0
- diffusers 0.29.0
- librosa 0.11.0
- resemble-perth (watermarking)
- conformer 0.3.2
- gradio 6.8.0 (for demo apps)

## Supported Languages (Multilingual model)

Arabic, Danish, German, Greek, English, Spanish, Finnish, French, Hebrew, Hindi, Italian, Japanese, Korean, Malay, Dutch, Norwegian, Polish, Portuguese, Russian, Swedish, Swahili, Turkish, Chinese (23 languages).

## Paralinguistic Tags (Turbo)

Native support for: `[cough]`, `[laugh]`, `[chuckle]`, and more — adds realism to generated speech.

## Generation Parameters (Turbo)

- `repetition_penalty`: 1.2
- `top_p`: 0.95
- `temperature`: 0.8
- `top_k`: 1000
- Note: CFG, min_p, and exaggeration are NOT supported in Turbo

## Evaluation

Evaluated on Podonos platform against:
- ElevenLabs Turbo v2.5
- Cartesia Sonic 3
- VibeVoice 7B

## Links

- GitHub: https://github.com/resemble-ai/chatterbox
- HuggingFace Demo: https://huggingface.co/spaces/ResembleAI/chatterbox-turbo-demo
- Podonos Evaluation: https://podonos.com/resembleai/chatterbox
- Discord: https://discord.gg/rJq9cRJBJ6
- Acknowledgements: Cosyvoice, Real-Time-Voice-Cloning, HiFT-GAN, Llama 3, S3Tokenizer
