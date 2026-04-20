# IndexTTS2 — Raw Source Analysis

**Date:** 2026-04-21
**Source:** https://github.com/index-tts/index-tts
**Paper:** arXiv 2506.21619

## Project Overview

IndexTTS2 is an autoregressive zero-shot text-to-speech model by Bilibili's IndexTTS Team. It is the first autoregressive TTS model with precise speech duration control, supporting both controllable and uncontrollable generation modes. It also achieves disentanglement between emotional expression and speaker identity.

## Key Technical Details

### Architecture
- **GPT Backbone:** UnifiedVoice (autoregressive transformer) for semantic token generation
- **Semantic Codec:** MaskGCT-based semantic model (from OpenMMLab Amphion)
- **S2Mel (Speech-to-Mel):** Custom S2Mel module converting semantic tokens to mel spectrograms
- **Vocoder:** BigVGAN (NVIDIA) for mel-to-waveform synthesis
- **VQ-VAE:** Vector quantization for audio tokenization
- **Emotion Control:** Qwen3 fine-tuned for text-to-emotion-vector conversion (soft instruction mechanism)

### Key Innovations
1. **Duration Control:** Two modes — explicit token count specification OR free autoregressive generation preserving prompt prosody
2. **Emotion-Speaker Disentanglement:** Separate emotional expression from speaker identity in prompts
3. **Three-Stage Training Paradigm:** Improves stability using GPT latent representations
4. **Text-Based Emotion Control:** Natural language emotion descriptions → emotion vectors via Qwen3
5. **8-Dimension Emotion Vector:** [happy, angry, sad, afraid, disgusted, melancholic, surprised, calm]

### Config (pyproject.toml)
- Version: 2.0.0
- Python: >=3.10
- License: LicenseRef-Bilibili-IndexTTS (custom Bilibili license)
- Package Manager: uv (required)
- DeepSpeed: optional extra
- WebUI: Gradio 5.45.0 optional extra
- CUDA: 12.8+ required

### Source Modules (indextts/)
- `infer_v2.py` — Main IndexTTS2 inference class (851 lines)
- `infer.py` — Legacy IndexTTS1 inference
- `gpt/` — GPT model components (model_v2.py = UnifiedVoice)
- `s2mel/` — Speech-to-Mel spectrogram conversion module
- `vqvae/` — Vector quantized VAE for audio tokenization
- `BigVGAN/` — NVIDIA BigVGAN vocoder integration
- `accel/` — Acceleration utilities
- `utils/` — Front-end text normalization/tokenization, MaskGCT utilities, checkpoint loading
- `cli.py` — CLI entry point

### Dependencies
- PyTorch 2.8.*, torchaudio 2.8.*
- transformers 4.52.1 (for Qwen3 emotion model)
- modelscope (Chinese model hub support)
- librosa, soundfile, ffmpeg-python
- omegaconf, munch, safetensors
- jieba, cn2an, g2p-en (Chinese/English text processing)
- WeTextProcessing (Linux) / wetext (Windows/Mac)

### Usage Modes
1. Voice cloning: single reference audio → same voice, new text
2. Emotion-conditioned: reference audio + emotional audio → emotional speech
3. Emotion vector: 8-float emotion intensity list
4. Text-based emotion: auto-convert speech text → emotion vectors
5. Web Demo: Gradio UI at localhost:7860

### Model Weights
- IndexTTS-2: HuggingFace (IndexTeam/IndexTTS-2) + ModelScope
- IndexTTS-1.5: HuggingFace + ModelScope
- IndexTTS-1: HuggingFace + ModelScope

### Release History
- 2025-09-08: IndexTTS-2 released (emotion + duration control)
- 2025-05-14: IndexTTS-1.5 released (stability + English improvement)
- 2025-03-25: IndexTTS-1.0 released (weights + inference code)
- 2025-02-12: Paper submitted to arXiv

### Team
Bilibili IndexTTS Team — 8 core authors + 6 technical contributors + 2 guidance

### Contact
- Email: indexspeech@bilibili.com
- Discord: https://discord.gg/uT32E7KDmy
- QQ Groups: 663272642, 1013410623
