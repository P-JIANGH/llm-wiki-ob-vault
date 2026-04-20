# MMAudio — Taming Multimodal Joint Training for High-Quality Video-to-Audio Synthesis

> Source: https://github.com/hkchengrex/MMAudio
> Paper: https://arxiv.org/abs/2412.15322
> CVPR 2025

## Overview
MMAudio generates synchronized audio given video and/or text inputs. Key innovation is multimodal joint training which allows training on a wide range of audio-visual and audio-text datasets. A synchronization module aligns the generated audio with the video frames.

## Authors
Ho Kei Cheng (UIUC), Masato Ishii (Sony AI), Akio Hayakawa (Sony), Takashi Shibuya (Sony), Alexander Schwing (UIUC), Yuki Mitsufuji (Sony Group)

## Key Features
- **Multimodal joint training**: Trains on audio-visual AND audio-text datasets simultaneously
- **Synchronization module**: Aligns generated audio with video frames
- **Video-to-Audio + Text-to-Audio**: Supports both modalities, can combine video and text conditions
- **Efficient inference**: ~6GB GPU memory in 16-bit mode on modern GPUs
- **Multiple model sizes**: `large_44k_v2` (default), 16k variant available

## Architecture
- **MMAudio network**: Transformer-based multimodal architecture with separate input projections for audio (latent), CLIP visual features, sync (synchronization) features, and text features
- **Flow Matching**: Flow matching inference for audio generation (configurable sampling modes)
- **Multimodal encoders**:
  - CLIP visual encoder (8 FPS, 384×384 input)
  - Synchformer synchronization encoder (25 FPS, center crop 224px)
  - OpenCLIP text encoder
- **Autoencoder**: VAE-based audio latent representation (BigVGAN vocoder for waveform reconstruction)
- **EMA**: PostHocEMA for stable training checkpoint selection
- **Training**: DDP distributed training with torch.compile support, AMP option

## Key Modules (mmaudio/)
- `model/networks.py` — MMAudio transformer architecture with multimodal input projections
- `model/flow_matching.py` — Flow matching inference (ODE solver)
- `model/transformer_layers.py` — JointBlock, MMDitSingleBlock, FinalBlock transformer layers
- `model/sequence_config.py` — 16k/44k sequence configurations (sample rate, duration, latent dims)
- `ext/bigvgan/` — BigVGAN vocoder (16kHz variant from Make-An-Audio 2)
- `ext/synchformer/` — Synchformer synchronization model
- `ext/autoencoder/` — VAE autoencoder for audio latents
- `runner.py` — Training wrapper (DDP, EMA, TensorBoard logging, evaluation)
- `sample.py` — Inference pipeline
- `demo.py` — CLI demo (video-to-audio / text-to-audio)
- `gradio_demo.py` — Gradio web UI
- `data/` — Datasets (AudioSet, Freesound, VGGSound, AudioCaps, WavCaps)

## Installation
- Python 3.9+
- PyTorch 2.5.1+ (CUDA recommended)
- `pip install -e .`
- Models auto-downloaded on first run via HuggingFace Hub

## Usage
```bash
# CLI: video + text → audio
python demo.py --duration=8 --video=<path> --prompt "your prompt"

# Gradio web UI
python gradio_demo.py
```

## Training Datasets
AudioSet, Freesound, VGGSound, AudioCaps, WavCaps (dataset-specific licenses apply)

## Known Limitations
1. Sometimes generates unintelligible human speech-like sounds
2. Sometimes generates background music (not explicitly trained for this)
3. Struggles with unfamiliar concepts (e.g., "RPG firing" vs "gunfires")
All addressable with more high-quality training data.

## License
- Code: MIT
- Checkpoints: CC-BY-NC 4.0 (HuggingFace)

## Related Projects (Acknowledgements)
- Make-An-Audio 2: 16kHz BigVGAN pretrained model + VAE architecture
- BigVGAN (NVIDIA)
- Synchformer (v-iashin)
- EDM2 (NVlabs): magnitude-preserving VAE architecture

## Links
- GitHub: https://github.com/hkchengrex/MMAudio
- Paper: https://arxiv.org/abs/2412.15322
- Webpage: https://hkchengrex.github.io/MMAudio
- HuggingFace Models: https://huggingface.co/hkchengrex/MMAudio
- HuggingFace Demo: https://huggingface.co/spaces/hkchengrex/MMAudio
- Colab Demo: https://colab.research.google.com/drive/1TAaXCY2-kPk4xE4PwKB3EqFbSnkUuzZ8
- Replicate Demo: https://replicate.com/zsxkib/mmaudio
- av-benchmark: https://github.com/hkchengrex/av-benchmark
