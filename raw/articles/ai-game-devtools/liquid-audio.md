# Liquid Audio - Speech-to-Speech Models

**Source**: https://github.com/Liquid4All/liquid-audio
**Organization**: Liquid AI
**License**: LFM Open License v1.0

## Overview

Liquid Audio is Liquid AI's first end-to-end audio foundation model, LFM2-Audio-1.5B (updated to LFM2.5-Audio-1.5B). Built with low-latency in mind, the lightweight LFM2 backbone enables real-time speech-to-speech conversations without sacrificing quality.

## Key Features

### Two Generation Modes

1. **Interleaved Generation**: Outputs text and audio tokens in a fixed interleaved pattern. Minimizes time-to-first-audio and number of tokens generated, ideal for naturally flowing real-time speech-to-speech interactions on resource-constrained devices.

2. **Sequential Generation**: Model decides when to switch modalities via special tokens. Suitable for non-conversational tasks such as speech-to-text (ASR) or text-to-speech (TTS).

### Architecture

- **LFM2 Backbone**: Based on LFM2-1.2B (upgraded to LFM2.5-1.2B in v2.5)
- **Conformer Encoder**: Audio input encoding (log-mel features → embeddings)
- **MLP Audio Adapter**: Maps conformer output to LFM hidden space
- **Depthformer**: Multi-layer autoregressive audio token prediction (configurable layers/dimensions)
- **Shared Embeddings**: Audio token embeddings with codebook offsets for 8 Mimi codebooks
- **Mimi Neural Codec**: 8 codebooks, 2048+1 vocabulary per codebook (includes EOAudio token), 24kHz output

### Capabilities

- **Multi-turn Chat**: Audio input → interleaved text+audio output with conversation history
- **ASR (Automatic Speech Recognition)**: Sequential generation, outputs capitalized/punctuated text
- **TTS (Text-to-Speech)**: Sequential generation with 4 predefined voices (US male/female, UK male/female)
- **Streaming Support**: Generator-based output yielding tokens progressively
- **Flash Attention 2**: Optional flash-attn for faster inference, falls back to torch SDPA

## Technical Details

### Key Components (Source Code)

| Module | File | Purpose |
|--------|------|---------|
| LFM2AudioModel | model/lfm2_audio.py | Main model: LFM2 + Conformer + Depthformer + embeddings |
| LFM2AudioProcessor | processor.py | Token↔data conversion (text tokens, audio log-mel, detokenization) |
| ConformerEncoder | model/conformer/ | Audio feature extraction from log-mel spectrograms |
| Depthformer | model/lfm2_audio.py | Autoregressive audio codebook prediction (causal transformer) |
| ChatState | processor.py | Multi-turn chat helper, manages modality flags |
| LFM2AudioDetokenizer | detokenizer.py | Audio token → waveform (LFM2-based fast detokenizer) |
| Moshi modules | moshi/ | Mimi codec (from Kyutai), SEANet, quantization (MIT-licensed) |

### Audio Tokenization

- Audio input: Waveform → log-mel features → Conformer embeddings → LFM embeddings
- Audio output: LFM hidden state → depthformer → 8 Mimi codebooks → 24kHz waveform
- Token vocabulary: 2048 tokens + 1 EOAudio (End-of-Audio) per codebook
- Codebook offsets used to share a single embedding table across all 8 codebooks

### Generation Parameters

- `audio_temperature`: Controls audio token sampling randomness
- `audio_top_k`: Top-k sampling for audio tokens
- `text_temperature`: Controls text token sampling
- `text_top_k`: Top-k sampling for text tokens
- `max_new_tokens`: Maximum tokens to generate

## Installation

```bash
pip install liquid-audio
pip install "liquid-audio[demo]"  # optional demo dependencies
pip install flash-attn --no-build-isolation  # optional, flash attention 2
```

## License

Code and weights: LFM Open License v1.0
Audio encoder: Based on Nvidia NeMo (Apache 2.0) + canary-180m-flash (CC-BY 4.0)
Mimi codec: Kyutai Mimi (MIT License)

## Notable Updates

- **LFM2.5-Audio-1.5B**: Based on stronger LFM2.5-1.2B base, lightning-fast LFM2-based audio detokenizer, stronger ASR, better TTS voices
- Supports HuggingFace model loading (`from_pretrained`)
- Gradio demo available via `liquid-audio-demo` command
