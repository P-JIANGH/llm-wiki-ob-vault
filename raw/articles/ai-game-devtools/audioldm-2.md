# AudioLDM 2 - Text-to-Audio/Music/Speech Generation

Source: https://github.com/haoheliu/audioldm2
Paper: https://arxiv.org/abs/2308.05734 (IEEE/ACM TASLP 2024)
Project Page: https://audioldm.github.io/audioldm2/

## Overview
AudioLDM 2 is a general framework for holistic audio generation — supporting text-to-audio (sound effects), text-to-music, and text-to-speech generation. It uses self-supervised pretraining with a latent diffusion model architecture.

## Key Features
- **Text-to-Audio**: Generate sound effects from text prompts (e.g., "A cat is meowing for attention")
- **Text-to-Music**: Generate music from descriptions (e.g., "Techno music with a strong, upbeat tempo")
- **Text-to-Speech**: Speech generation with speaker description + transcription
- **Super Resolution Inpainting**: Enhance audio quality and fill in missing parts
- **Multiple Checkpoints**: 5 model variants for different use cases
- **Web UI**: Gradio-based web application for easy interaction
- **CLI**: `audioldm2` command-line tool

## Architecture
- **Latent Diffusion Model (LDM)**: Core generative architecture
  - LatentDiffusion (DDPM/DDIM/PLMS samplers)
  - Autoencoder for latent space encoding
  - CLAP (Contrastive Language-Audio Pretraining) for text conditioning
  - AudioMAE (Audio Masked Autoencoder) for self-supervised pretraining
  - HiFi-GAN vocoder for waveform reconstruction
  - Phoneme encoder for TTS support

## Available Checkpoints
1. **audioldm2-full** (default): Sound effect + music generation
2. **audioldm_48k**: High-fidelity audio generation (48kHz sample rate)
3. **audioldm_16k_crossattn_t5**: Improved AudioLDM 1.0
4. **audioldm2-full-large-1150k**: Larger variant
5. **audioldm2-music-665k**: Music-focused
6. **audioldm2-speech-gigaspeech**: TTS (GigaSpeech dataset)
7. **audioldm2-speech-ljspeech**: TTS (LJSpeech dataset)

## Technical Stack
- Python 3.7+
- PyTorch >= 1.13.0
- torchaudio, torchvision
- transformers (T5 text encoder)
- HuggingFace Hub (model download)
- Gradio (web UI)
- librosa, soundfile (audio processing)
- Support: CPU, CUDA, MPS (Apple Silicon)

## Key Files
- `audioldm2/pipeline.py` — Main pipeline: build_model(), text_to_audio(), super_resolution_and_inpainting()
- `app.py` — Gradio web application
- `audioldm2/latent_diffusion/models/ddpm.py` — LatentDiffusion model core
- `audioldm2/latent_diffusion/modules/audiomae/` — AudioMAE self-supervised pretraining
- `audioldm2/hifigan/` — HiFi-GAN vocoder (v1 and v2)
- `audioldm2/latent_diffusion/modules/phoneme_encoder/` — Phoneme encoder for TTS

## HuggingFace Diffusers Integration
Available in diffusers >= 0.21.0, with 3x faster inference:
```python
from diffusers import AudioLDM2Pipeline
pipe = AudioLDM2Pipeline.from_pretrained("cvssp/audioldm2", torch_dtype=torch.float16)
audio = pipe("Techno music with upbeat tempo", num_inference_steps=200).audios[0]
```

## License
MIT License

## Authors
Haohe Liu, Yi Yuan, Xubo Liu, Xinhao Mei, Qiuqiang Kong, et al.

## Game Dev Relevance
AudioLDM 2 can be used in game development for:
- Procedural sound effect generation from text descriptions
- Dynamic music generation matching game mood/scenes
- NPC voice/dialogue generation with described speaker characteristics
- Audio asset creation during game prototyping
