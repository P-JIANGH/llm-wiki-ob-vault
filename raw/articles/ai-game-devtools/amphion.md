# Amphion — Audio, Music, and Speech Generation Toolkit

> Source: https://github.com/open-mmlab/Amphion
> Captured: 2026-04-20
> Clone: ~/tmp/ai-game-devtools/amphion/ (gitcode mirror)

## Project Overview
Amphion (/æmˈfaɪən/) is an open-source toolkit for Audio, Music, and Speech Generation by OpenMMLab. Its purpose is to support reproducible research and help researchers/engineers get started in audio/music/speech generation R&D.

**License:** MIT (free for research and commercial use)
**Org:** OpenMMLab (same org as MMEditing, MMDetection, etc.)

## Supported Tasks

### TTS (Text to Speech)
- FastSpeech2 (non-autoregressive, feed-forward Transformer)
- VITS (end-to-end, conditional VAE + adversarial)
- VALL-E (zero-shot, neural codec language model with discrete codes)
- NaturalSpeech2 (latent diffusion model)
- Jets (joint FastSpeech2 + HiFi-GAN with alignment)
- MaskGCT (fully non-autoregressive, no explicit alignment needed)
- Vevo-TTS (zero-shot with controllable timbre and style)
- DualCodec-VALLE (12.5Hz DualCodec tokens, super fast generation)

### VC (Voice Conversion)
- Vevo (zero-shot voice imitation, controllable timbre and style)
- FACodec (decomposes speech into content/prosody/timbre subspaces)
- Noro (noise-robust zero-shot VC)

### Neural Audio Codec
- DualCodec (low-frame-rate 12.5Hz/25Hz, semantically-enhanced with SSL)
- FACodec (content/prosody/timbre decomposition)

### AC (Accent Conversion)
- Vevo-Style (zero-shot accent conversion)

### SVC (Singing Voice Conversion)
- Vevo2 (unified speech + singing voice generation, TTS/SVS/VC/SVC/editing/melody control)
- Vevo1.5 (versatile zero-shot voice imitation for speech + singing)
- Diffusion-based architectures (DDPM/DDIM/PNDM/Consistency Model)
- Feature extractors: WeNet, Whisper, ContentVec

### TTA (Text to Audio)
- Latent diffusion model (AudioLDM/Make-an-Audio style)

### Vocoder
- GAN: MelGAN, HiFi-GAN, NSF-HiFiGAN, BigVGAN, APNet
- Flow: WaveGlow
- Diffusion: Diffwave
- Auto-regressive: WaveNet, WaveRNN
- Multi-Scale CQT Discriminator (ICASSP 2024)

### Evaluation Metrics
- F0: Pearson coefficients, periodicity RMSE, V/UV F1
- Energy: RMSE, Pearson
- Intelligibility: CER/WER (Whisper-based)
- Spectrogram: FAD, MCD, MSTFT, PESQ, STOI
- Speaker Similarity: RawNet3, Resemblyzer, WeSpeaker, WavLM

### Datasets
- AudioCaps, LibriTTS, LJSpeech, M4Singer, Opencpop, OpenSinger, SVCC, VCTK
- **Emilia**: 101k hours in-the-wild speech data (exclusive support)
- **Emilia-Large**: 200k+ hours (101k Emilia + 114k Emilia-YODAS)

### Visualization
- SingVisio: diffusion model visualization for singing voice conversion

## Key Models (Recent)
| Model | Date | Description |
|-------|------|-------------|
| Vevo2 | 2026-03 | Unified speech/singing generation, prosody learning |
| DualCodec | 2025-05 | Low-frame-rate (12.5/25Hz) neural audio codec |
| Vevo1.5 | 2025-04 | Speech + singing voice unified generation |
| Metis | 2025-02 | Foundation model for unified speech generation |
| MaskGCT | 2024-10 | Fully non-autoregressive TTS, SOTA zero-shot |

## Architecture
- `models/` — Core model implementations (tts/vc/svc/tta/codec/vocoders)
- `egs/` — Example recipes for each task
- `preprocessors/` — Dataset preprocessing pipelines (Emilia-Pipe)
- `modules/` — Shared neural network modules
- `utils/` — Utility functions
- `text/` — Text processing (tokenizers, cleaners)
- `optimizer/` / `schedulers/` — Training infrastructure
- `evaluation/` — Objective metrics
- `visualization/` — Interactive visualization tools

## Installation
- Conda: `conda create --name amphion python=3.9.15`
- Docker: `docker pull realamphion/amphion` (NVIDIA GPU required)

## Links
- GitHub: https://github.com/open-mmlab/Amphion
- HuggingFace: https://huggingface.co/amphion
- ModelScope: https://modelscope.cn/organization/amphion
- Discord: https://discord.com/invite/drhW7ajqAG
- Paper: arXiv 2312.09911 (v0.1), arXiv 2501.15442 (v0.2)
