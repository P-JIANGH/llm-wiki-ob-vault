# Bark — Raw Source Analysis

**Source:** https://github.com/suno-ai/bark
**Date:** 2026-04-21
**Type:** GitHub README + project files analysis

## README Summary

Bark is Suno's open-source transformer-based text-to-audio model. It generates highly realistic, multilingual speech as well as other audio including music, background noise, and simple sound effects. The model can produce nonverbal communications like laughing, sighing, and crying.

### Key Features
- **Fully generative text-to-audio model** (not conventional TTS)
- **Multilingual**: Supports 13 languages (EN, DE, ES, FR, HI, IT, JA, KO, PL, PT, RU, TR, ZH)
- **Voice presets**: 100+ speaker presets across supported languages
- **Non-speech sounds**: `[laughter]`, `[laughs]`, `[sighs]`, `[music]`, `[gasps]`, `[clears throat]`
- **Music generation**: Can generate music from lyrics with musical notation markers (♪)
- **Long-form generation**: Notebook available for extended audio
- **Command line**: `python -m bark --text "..." --output_filename "example.wav"`
- **🤗 Transformers integration**: Available since Transformers v4.31.0

### Architecture
- GPT-style architecture similar to AudioLM and Vall-E
- Quantized Audio representation from EnCodec
- Input text → audio directly (no intermediate phonemes)
- Can generalize to arbitrary instructions beyond speech

### Technical Details
- **License**: MIT (since 2023.05.01)
- **Package**: suno-bark v0.0.1a
- **Python**: >=3.8
- **Dependencies**: PyTorch, Transformers, EnCodec, Tokenizers, SciPy, NumPy
- **VRAM**: Full version ~12GB, small version ~8GB, can work with ~2GB with CPU offloading
- **GPU**: Works with CUDA 11.7/12.0, PyTorch 2.0+
- **Inference speed**: ~real-time on enterprise GPUs, slower on older hardware

### Hardware Options
- `SUNO_USE_SMALL_MODELS=True` for 8GB VRAM
- `SUNO_OFFLOAD_CPU=True` for 2GB VRAM
- 2x speed-up on GPU, 10x speed-up on CPU (as of 2023.05.01)

### Updates History
- 2023.04.20: Initial release
- 2023.05.01: MIT license, 2x/10x speed-up, long-form generation notebooks, voice prompt library

### Project Structure
```
bark/                  # Main Python package
LICENSE                # MIT License
model-card.md          # Model documentation
notebooks/             # Jupyter notebooks (long-form generation, examples)
pyproject.toml         # Build configuration
setup.py               # Legacy setup script
README.md              # Project documentation
```

### Game Dev Relevance
- NPC voice generation without voice actors
- Multilingual game dialogue
- Dynamic sound effect generation
- Accessible gaming (text-to-speech for UI/reading)
- Community modding tools for custom voice content
