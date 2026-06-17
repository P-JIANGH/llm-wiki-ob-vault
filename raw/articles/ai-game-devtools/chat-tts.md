# ChatTTS — Source Analysis

**Source:** https://github.com/2noise/ChatTTS
**Cloned from:** gitcode.com/2noise/ChatTTS (GitHub timeout)
**Date:** 2026-04-21
**License:** AGPLv3+ (code), CC BY-NC 4.0 (model)

## README Summary

ChatTTS is a generative speech model designed specifically for dialogue scenarios such as LLM assistant applications.

### Supported Languages
- English
- Chinese

### Key Highlights
1. **Conversational TTS**: Optimized for dialogue-based tasks, enabling natural and expressive speech synthesis. Supports multiple speakers, facilitating interactive conversations.
2. **Fine-grained Control**: The model can predict and control fine-grained prosodic features, including laughter `[laugh]`, pauses `[uv_break]`, `[lbreak]`, and interjections `[oral_0-9]`, `[break_0-7]`.
3. **Better Prosody**: Surpasses most open-source TTS models in prosody quality.

### Dataset & Model
- Main model trained with 100,000+ hours of Chinese and English audio data
- Open-source version on HuggingFace is a 40,000-hour pre-trained model without SFT
- Released model is for academic/research purposes only (non-commercial)
- Model intentionally includes high-frequency noise and compressed audio quality (MP3) to prevent malicious use

### Roadmap
- [x] Open-source 40k-hours-base model + spk_stats file
- [x] Streaming audio generation
- [x] DVAE encoder + zero-shot inferring code
- [ ] Multi-emotion controlling
- [ ] ChatTTS.cpp (community welcomed)

### Performance
- 30-second audio clip: minimum 4GB GPU memory
- RTX 4090: ~7 semantic tokens/sec, RTF ~0.3

## Architecture (from core.py)

### Key Components (Chat class)
- **Chat** — Main entry point, manages model lifecycle
  - `load()` — Downloads and loads all model components (vocos, dvae, gpt, embed, decoder, tokenizer, speaker)
  - `infer()` — Text-to-speech inference with text splitting, refinement, and audio generation
  - `sample_random_speaker()` — Generate random speaker embedding from Gaussian distribution
  - `sample_audio_speaker()` — Encode speaker timbre from reference audio (zero-shot voice cloning)
  - `interrupt()` — Stop ongoing generation

### Model Pipeline
1. **Text Normalization** (Normalizer) — Homophone replacement, text cleaning
2. **Text Refinement** (`_refine_text`) — GPT-based prosody token insertion
3. **Code Inference** (`_infer_code`) — Autoregressive audio token generation
4. **Decoding** (`_decode_to_wavs`) — DVAE decoder → Vocos vocoder → waveform

### Model Components
| Component | Description |
|-----------|-------------|
| GPT | Autoregressive language model for audio token prediction |
| DVAE | Discrete Variational Autoencoder (encoder + decoder) |
| Vocos | Pretrained vocoder for waveform reconstruction |
| Embed | Speaker/text embedding layer |
| Tokenizer | Audio/text tokenization |
| Speaker | Speaker embedding management, random sampling, audio encoding |

### Dependencies
- torch>=2.1.0, torchaudio, transformers>=4.41.1
- vocos (vocoder)
- vector_quantize_pytorch (VQ)
- numba, numpy<3.0.0, tqdm
- pybase16384 (custom encoding)
- gradio (WebUI)
- Optional: vLLM (Linux), FlashAttention-2, TransformerEngine

### Key Features
- **Streaming generation**: Real-time audio output with configurable batch size and speed
- **Speaker control**: Random speaker sampling or audio-based voice cloning
- **Prosody tokens**: Fine-grained control over oral style, laughter, breaks
- **Multi-language**: Chinese and English support with text normalization
- **WebUI**: Gradio-based interface for interactive use
- **CLI**: Command-line inference for batch processing
- **Model download**: HuggingFace, local, or custom path support

## Installation
```bash
pip install ChatTTS  # PyPI
pip install git+https://github.com/2noise/ChatTTS  # Latest
```
