# AcademiCodec: An Open Source Audio Codec Model for Academic Research

Source: https://github.com/yangdongchao/AcademiCodec
Captured: 2026-04-20

## Overview
AcademiCodec is the first open-source audio codec toolkit that provides training codes and pre-trained models for Encodec, SoundStream, and HiFi-Codec. Launched from university research, it addresses two key challenges in audio codec models: (1) lack of publicly available training processes requiring large-scale data and GPUs, and (2) the need for many codebooks for good reconstruction performance.

## Key Innovation: HiFi-Codec
Proposes **Group-Residual Vector Quantization (GRVQ)** technique, enabling high-fidelity audio reconstruction with only **4 codebooks** (vs. Encodec's many more). Trained on 1000+ hours of public TTS data (LibriTTS, VCTK, AISHELL) using 8 GPUs.

## Architecture

### Directory Structure
```
AcademiCodec
├── academicodec/
│   ├── utils.py          # Common utilities
│   ├── modules/          # Shared modules (SEANet encoder/decoder)
│   ├── quantization/     # VQ implementations (core_vq, vq, ac, distrib)
│   └── models/
│       ├── hificodec/    # HiFi-Codec: VQVAE + GRVQ (models.py, vqvae.py, train.py)
│       ├── encodec/      # EnCodec: SEANet + RVQ + MS-STFT discriminator (net3.py)
│       └── soundstream/  # SoundStream: SEANet + RVQ + waveform+spectrogram discriminators
├── egs/                  # Example configs for different model variants
│   ├── Encodec_16k_320d/   # 16kHz, downsample 320 (for SpearTTS)
│   ├── Encodec_24k_240d/   # 24kHz, downsample 240 (for InstructTTS)
│   ├── Encodec_24k_32d/    # 24kHz, downsample 32 (single codebook, for AudioGen)
│   ├── SoundStream_24k_240d/
│   ├── HiFi-Codec-16k-320d/
│   ├── HiFi-Codec-24k-320d/
│   └── HiFi-Codec-24k-240d/
└── evaluation_metric/
```

### Model Variants
| Model | Sample Rate | Downsample | Use Case | Codebooks |
|-------|------------|------------|----------|-----------|
| Encodec_16k_320 | 16kHz | 320 | SpearTTS | Multiple |
| Encodec_24k_240d | 24kHz | 240 | InstructTTS | Multiple |
| Encodec_24k_32d | 24kHz | 32 | AudioGen (single codebook) | 1 |
| SoundStream_24k_240d | 24kHz | 240 | General audio | Multiple |
| HiFi-Codec variants | 16/24kHz | 240/320 | VALL-E, AudioLM, MusicLM | **4** |

### Key Technical Details
- **EnCodec**: Uses SEANet encoder/decoder + Residual Vector Quantizer + MS-STFT discriminator (spectrogram-level realism)
- **SoundStream**: SEANet + RVQ + two discriminators (waveform-level from HiFi-GAN + spectrogram-level from EnCodec)
- **HiFi-Codec**: Novel GRVQ technique, VQ-VAE architecture, only 4 codebooks needed for high fidelity
- **Dependencies**: PyTorch >= 1.13.0, Python >= 3.8, torchaudio, tensorboard, einops, matplotlib, pyyaml, tqdm
- **Pre-trained models**: Available on HuggingFace (Dongchao/AcademiCodec)

### Discriminator Comparison
- EnCodec: Only STFT-discriminator (forces spectrogram realism)
- SoundStream: Waveform discriminator (HiFi-GAN style) + Spectrogram discriminator (EnCodec style)
- HiFi-Codec: Novel GRVQ-based approach, optimized for generation tasks

## Related Papers
- HiFi-Codec: "HiFi-Codec: Group-residual Vector quantization for High Fidelity Audio Codec" (arXiv:2305.02765)
- InstructTTS: "InstructTTS: Modelling Expressive TTS in Discrete Latent Space with Natural Language Style Prompt" (arXiv:2301.13662)

## License
MIT

## Game Dev Relevance
- Audio codec models produce discrete token representations used by audio generation models (AudioLM, VALL-E, MusicLM, SpearTTS)
- HiFi-Codec's 4-codebook design reduces token count for downstream generation tasks
- Can be used as intermediate feature extractor for TTS tasks in game NPC dialogue systems
- Pre-trained models enable game developers to add audio compression/generation without training from scratch
