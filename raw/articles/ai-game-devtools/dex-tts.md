# DEX-TTS: Diffusion-based EXpressive Text-to-Speech with Style Modeling on Time Variability

## Source
- GitHub: https://github.com/winddori2002/DEX-TTS
- Paper: https://arxiv.org/abs/2406.19135
- Demo: https://tts-demo.github.io/demo.github.io/
- License: MIT
- Authors: Hyun Joon Park, Jin Sob Kim, Wooseok Shin, Sung Won Han

## Overview

DEX-TTS is a diffusion-based expressive text-to-speech (TTS) system that uses reference speech to model speaking style over time variability. It has two variants:

1. **DEX-TTS**: Uses reference speech for style transfer — captures prosody, emotion, and speaking style from a short audio reference
2. **GeDEX-TTS**: General version that does NOT require reference speech — generates expressive speech without a reference

## Architecture

### DEX-TTS Pipeline
1. **Text Encoder (RetNet-based)**: Uses Microsoft's RetNet architecture for efficient text encoding with multi-scale retention
2. **Style Encoders**:
   - **TV Encoder (Time Variability)**: Models time-varying style features from reference speech
   - **LF0 Encoder**: Encodes log fundamental frequency (pitch contour)
   - **TIV Encoder (Time-Invariant)**: Extracts speaker-invariant features from reference
3. **Duration Predictor**: FastSpeech2-style monotonic alignment search (MAS) for text-to-speech duration
4. **Diffusion Decoder (DiT-based)**: 
   - DiTMask (Diffusion Transformer with masking) as the core denoiser
   - UNet-style skip connections with ResnetBlocks + LinearAttention
   - TV Adaptor + TIV Adaptor inject style and reference features into the DiT
   - EDM (Elucidated Diffusion Model) preconditioning and sampler
5. **HiFi-GAN Vocoder**: Converts mel-spectrograms to waveform

### Key Technical Details
- **DiTMask**: Vision Transformer backbone with adaLN-Zero conditioning, random token masking during training
- **EDM Framework**: Uses EDM preconditioning (from NVIDIA's EDM paper) with Euler sampler
- **RetNet Text Encoder**: Based on Microsoft's TorchScale RetNet — O(1) inference complexity vs O(n²) for standard attention
- **Style Modeling**: Separates time-varying (dynamic prosody) and time-invariant (speaker identity) style components
- **Multi-speaker support**: Speaker embedding via Embedding layer (disabled in current config, n_spks=0)

### GeDEX-TTS
Same architecture but removes the reference speech dependency — style is generated directly from text rather than extracted from reference audio.

## Project Structure
```
DEX-TTS/
├── model/
│   ├── tts.py          # Main DeXTTS model (orchestrator)
│   ├── diffusion.py    # DiffusionDenoiser (UNet + DiT) + Diffusion wrapper
│   ├── dit.py          # DiTMask (Diffusion Transformer with masking)
│   ├── retnet.py       # RetNet text encoder
│   ├── ref_encoder.py  # Reference style encoders (TV/LF0/TIV)
│   ├── text_encoder.py # Text encoder wrapper
│   ├── edm.py          # EDM preconditioning + loss + sampler
│   ├── augmentation.py # Data augmentation
│   └── monotonic_align/ # MAS alignment (Cython)
├── src/
│   ├── train.py        # Training loop
│   ├── dataset.py      # Dataset loading
│   └── evaluation.py   # Metrics evaluation
├── preprocess/         # Data preprocessing (LJSpeech, VCTK, ESD, LibriTTS)
├── audio/              # Audio processing (STFT, mel-spectrogram)
├── hifigan/            # HiFi-GAN vocoder
└── synthesize.py       # Inference script
```

## Status (from README ToDo)
- [x] BigVGAN vocoder for multi-speaker TTS
- [ ] Multi-GPU training codes
- [ ] LibriTTS & Simple preprocess recipes
- [ ] Pre-trained weight for DEX-TTS
- [x] Pre-trained weight for GeDEX-TTS
- [ ] Precondition VE & VP
- [ ] Evaluation

## Dependencies (inferred from code)
- PyTorch
- einops
- timm (for ViT components)
- HiFi-GAN / BigVGAN (vocoder)
- Microsoft TorchScale (RetNet)
- Monotonic Align (Cython)

## Game Dev Relevance
- High-quality expressive TTS for NPC dialogue with style transfer from reference audio
- GeDEX-TTS variant enables reference-free expressive speech generation
- MIT license — fully open source for commercial game use
- Can generate diverse emotional/expressive NPC voices from text alone
- Style transfer capability allows consistent character voices across different content
