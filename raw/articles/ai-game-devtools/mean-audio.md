# MeanAudio: Fast and Faithful Text-to-Audio Generation with Mean Flows

**Source:** https://github.com/xiquan-li/MeanAudio
**Archived:** 2026-04-20

## Overview

MeanAudio is a novel MeanFlow-based model tailored for fast and faithful text-to-audio generation. It can synthesize realistic sound in a single step, achieving a real-time factor (RTF) of 0.013 on a single NVIDIA 3090 GPU. It also demonstrates strong performance in multi-step generation.

## Paper

- arXiv: https://arxiv.org/abs/2508.06098
- HuggingFace Model: https://huggingface.co/AndreasXi/MeanAudio
- HuggingFace Space: https://chenxie95/MeanAudio
- Webpage: https://meanaudio.github.io/

## Model Variants

| Model Name | Size | Dataset | Objective | Pre-trained From |
|---|---|---|---|---|
| MeanAudio-S-AC | 120M | AudioCaps | Mean Flow | FluxAudio-S-Full |
| FluxAudio-S-Full | 120M | All* | Flow Matching | - |
| MeanAudio-S-Full | 120M | All* | Mean Flow | - |
| MeanAudio-L-Full | 480M | All* | Mean Flow | - |

*All = AudioCaps + WavCaps + AudioSet + VGGSound + LP-MusicCaps-MC + LP-MusicCaps-MTT (~10,000 hours / ~3M audio-text pairs)

## Key Features

- **Single-step generation**: RTF 0.013 on NVIDIA RTX 3090
- **MeanFlow objective**: Enables both single-step and multi-step generation
- **Flux-style flow transformer** architecture
- **Classifier-free guidance** with dual text encoders (T5 + CLAP)
- **PostHocEMA** for EMA profiling during training
- **DDP distributed training** support
- **torch.compile** support for acceleration

## Architecture

- **Text Encoders**: T5 + CLAP (dual encoding, can concatenate)
- **VAE**: 1D VAE (from Make-An-Audio 2 / BigVGAN vocoder)
- **Core**: Flux-style flow transformer with MeanFlow/FlowMatching objectives
- **Sequence Config**: 16kHz (10s duration) or 44kHz modes
- **Normalization**: Latent space normalization with dataset-computed mean/std

## Training Pipeline

1. **Latent & Text Feature Extraction**: Partition audios into 10s clips, extract VAE latents + text encoder embeddings into NPZ files
2. **Validation**: Uses av-benchmark (hkchengrex) for metric calculation
3. **MeanFlow Fine-tuning**: Initialize from pretrained flow matching checkpoint, fine-tune with MeanFlow objective
4. **Optional Pre-training**: Standard Flow Matching objective can serve as initialization

## Key Source Files

- `meanaudio/runner_meanflow.py` — MeanFlow training/inference runner (DDP, AMP, EMA, logging)
- `meanaudio/runner_flowmatching.py` — Flow Matching training/inference runner
- `meanaudio/model/flow_matching.py` — Flow matching objective implementation
- `meanaudio/model/mean_flow.py` — Mean Flow objective implementation
- `meanaudio/model/networks.py` — Model architecture (get_mean_audio)
- `meanaudio/model/utils/features_utils.py` — Feature extraction (VAE, vocoder, text encoders)
- `train.py` / `infer.py` / `demo.py` — Entry points
- `config/` — YAML configs (train, eval, base)

## Dependencies

- Python 3.9+, PyTorch 2.5.1+
- huggingface_hub, transformers, open_clip_torch
- hydra-core, omegaconf, tensorboard, wandb
- librosa, av, timm, einops
- nitrous-ema, torchdiffeq, tensordict
- laion-clap (HKchengrex fork)

## License

Not explicitly stated in repository (no LICENSE file visible). Check project homepage for terms.

## Acknowledgements

- MMAudio (MMDiT code, training structure)
- MeanFlow-pytorch / MeanFlow-official (mean flow implementation)
- Make-An-Audio 2 (BigVGAN Vocoder, VAE)
- av-benchmark (benchmarking)

## Authors

Xiquan Li (SJTU), Junxi Liu, Yuzhe Liang, Zhikang Niu, Wenxi Chen, Xie Chen
