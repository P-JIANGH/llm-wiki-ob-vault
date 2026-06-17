# AudioCraft (MusicGen) — Source Analysis

**Source:** https://github.com/facebookresearch/audiocraft
**Cloned:** ~/tmp/ai-game-devtools/musicgen
**Date:** 2026-04-21

## README Summary

AudioCraft is a PyTorch library for deep learning research on audio generation.
Contains inference and training code for two state-of-the-art AI generative models:
- **MusicGen**: State-of-the-art controllable text-to-music model
- **AudioGen**: State-of-the-art text-to-sound model

Also includes: EnCodec (neural audio codec), Multi Band Diffusion, MAGNeT (non-autoregressive model), AudioSeal (watermarking), MusicGen Style, JASCO (chord/melody/drum conditioned music generation).

## Key Models in AudioCraft

| Model | Description |
|-------|-------------|
| MusicGen | Single-stage autoregressive Transformer over 32kHz EnCodec tokens with 4 codebooks at 50Hz |
| AudioGen | Text-to-sound model |
| EnCodec | High fidelity neural audio codec |
| MAGNeT | Non-autoregressive model for text-to-music and text-to-sound |
| AudioSeal | Audio watermarking |
| JASCO | Text-to-music conditioned on chords, melodies and drum tracks |

## Pre-trained MusicGen Models

- facebook/musicgen-small: 300M, text-to-music
- facebook/musicgen-medium: 1.5B, text-to-music
- facebook/musicgen-melody: 1.5B, text+melody-to-music
- facebook/musicgen-large: 3.3B, text-to-music
- facebook/musicgen-melody-large: 3.3B, text+melody-to-music
- Stereo variants: small, medium, large, melody, melody-large

## Architecture Details

- **Tokenizer**: EnCodec neural audio codec (facebook/encodec_32khz)
- **Language Model**: Transformer LM predicting audio token sequences
- **Conditioning**: T5 text encoder + chroma features for melody
- **Codebook Pattern**: Delay pattern for parallel codebook prediction (50 autoregressive steps per second)
- **Training**: 20K hours of licensed music (10K internal + ShutterStock + Pond5)
- **Sampling**: Greargy, softmax with temperature, top-K, top-P (nucleus)
- **Stereo**: Interleave stereo codebooks [1_L, 1_R, 2_L, 2_R, ...]

## Key Source Files

| Path | Description |
|------|-------------|
| audiocraft/models/musicgen.py | MusicGen model definition |
| audiocraft/models/audiogen.py | AudioGen model |
| audiocraft/models/encodec.py | EnCodec wrapper |
| audiocraft/models/magnet.py | MAGNeT model |
| audiocraft/models/multibanddiffusion.py | Multi-band diffusion |
| audiocraft/models/watermark.py | AudioSeal watermarking |
| audiocraft/models/jasco.py | JASCO model |
| audiocraft/solvers/musicgen.py | MusicGen training solver |
| audiocraft/quantization/ | Vector quantization modules |
| audiocraft/modules/ | Transformer, conditioning, SEANet modules |
| audiocraft/data/ | Audio datasets, metadata handling |
| config/solver/musicgen/ | Training configurations |
| demos/musicgen_app.py | Gradio demo application |

## Training Configuration

- Requires PyTorch 2.1.0, Python 3.9
- 16GB+ GPU memory for medium models (~1.5B params)
- FSDP support for large models (3.3B)
- Dora experiment framework for job scheduling
- EnCodec token caching for faster training

## API Usage

```python
from audiocraft.models import MusicGen
model = MusicGen.get_pretrained('facebook/musicgen-melody')
model.set_generation_params(duration=8)
wav = model.generate_unconditional(4)  # 4 unconditional samples
descriptions = ['happy rock', 'energetic EDM', 'sad jazz']
wav = model.generate(descriptions)  # 3 text-conditioned samples
melody, sr = torchaudio.load('./assets/bach.mp3')
wav = model.generate_with_chroma(descriptions, melody[None].expand(3, -1, -1), sr)
```

## License

- Code: MIT License
- Model weights: CC-BY-NC 4.0 (non-commercial)

## Citation

Copet et al., "Simple and Controllable Music Generation", NeurIPS 2023.
