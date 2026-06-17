# AudioX: A Unified Framework for Anything-to-Audio Generation

**Source:** https://github.com/ZeyueT/AudioX
**Paper:** https://arxiv.org/abs/2503.10522 (ICLR 2026)
**Project Page:** https://zeyuet.github.io/AudioX/
**Hugging Face:** Model | Dataset | Demo
**Date ingested:** 2026-04-20

## Abstract

Audio and music generation based on flexible multimodal control signals is a widely applicable topic. AudioX proposes a unified framework for anything-to-audio generation that integrates varied multimodal conditions (text, video, and audio signals). The core design is a Multimodal Adaptive Fusion (MAF) module, enabling effective fusion of diverse multimodal inputs, enhancing cross-modal alignment and improving overall generation quality.

To train this unified model, the authors constructed IF-caps, a large-scale dataset comprising over 7 million samples curated through a structured data annotation pipeline, providing comprehensive supervision for multimodal-conditioned audio generation.

AudioX achieves superior performance especially in text-to-audio and text-to-music generation tasks.

## Architecture

### Core Components
- **Diffusion Transformer (DiT)** backbone for audio generation
- **Multimodal Adaptive Fusion (MAF)** module for fusing text/video/audio inputs
- **MMDiT** variant for enhanced multimodal processing
- **Synchformer** video encoder for visual-audio alignment
- **VAE** audio autoencoder for latent-space diffusion

### Model Variants
1. **AudioX** - Base model for general audio and music generation
2. **AudioX-MAF** - Model with Multi-modal Adaptive Fusion module
3. **AudioX-MAF-MMDiT** - Model with MAF and MMDiT architecture

### Key Modules (source code structure)
- `audiox/models/dit.py` — Diffusion Transformer backbone
- `audiox/models/MAF.py` — Multimodal Adaptive Fusion module
- `audiox/models/transformer.py` — Transformer architecture
- `audiox/models/conditioners.py` — Multimodal conditioning
- `audiox/models/diffusion.py` — Diffusion process
- `audiox/models/synchformer/` — Video feature encoder (MotionFormer-based)
- `audiox/models/autoencoders.py` — Audio VAE
- `audiox/models/lm.py` + `lm_backbone.py` — Language model components

### Supported Tasks
| Task | video_path | text_prompt | audio_path |
|------|-----------|-------------|------------|
| Text-to-Audio (T2A) | None | "Typing on a keyboard" | None |
| Text-to-Music (T2M) | None | "A music with piano and violin" | None |
| Video-to-Audio (V2A) | "video.mp4" | "Generate general audio" | None |
| Video-to-Music (V2M) | "video.mp4" | "Generate music for the video" | None |
| TV-to-Audio (TV2A) | "video.mp4" | "Ocean waves + people laughing" | None |
| TV-to-Music (TV2M) | "video.mp4" | "Generate music with piano" | None |

## Technical Details

- **Framework:** PyTorch + PyTorch Lightning
- **Python:** 3.8+
- **Dependencies:** k-diffusion, einops, transformers, torchaudio, gradio, encodec, descript-audio-codec
- **Inference:** DPM++ 3M SDE sampler, 250 steps, CFG scale 7
- **Sample rate:** Configurable per model
- **Video FPS:** Configurable per model

## Dataset

- **IF-caps:** 7M+ samples, structured annotation pipeline for multimodal-conditioned audio generation
- Available on Hugging Face: HKUSTAudio/AudioX-IFcaps

## License

CC-BY-NC 4.0 (Attribution-NonCommercial). Models are watermarked and strictly for non-commercial use only.

## Key People

- Zeyue Tian (HKUST) — ztianad@connect.ust.hk
- Authors: Tian Zeyue, Jin Yizhu, Liu Zhaoyang, Yuan Ruibin, Tan Xu, Chen Qifeng, Xue Wei, Guo Yike

## Acknowledgments

Based on: stable-audio-tools, VidMuse, MMAudio

## Citations

```bibtex
@article{tian2025audiox,
  title={AudioX: Diffusion Transformer for Anything-to-Audio Generation},
  author={Tian, Zeyue and Jin, Yizhu and Liu, Zhaoyang and Yuan, Ruibin and Tan, Xu and Chen, Qifeng and Xue, Wei and Guo, Yike},
  journal={arXiv preprint arXiv:2503.10522},
  year={2025}
}
```
