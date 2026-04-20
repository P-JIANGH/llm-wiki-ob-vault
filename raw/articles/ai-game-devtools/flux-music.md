# FluxMusic — Source Material

## Project Overview
- **Name**: FluxMusic
- **GitHub**: https://github.com/feizc/FluxMusic
- **Paper**: arXiv:2409.00587
- **HuggingFace Models**: https://huggingface.co/feizhengcong/fluxmusic
- **Type**: Text-to-Music Generation with Rectified Flow Transformer
- **License**: Research project (based on Flux + AudioLDM2, see their licenses)

## Architecture

FluxMusic extends the rectified flow Transformer architecture from [Flux](https://github.com/black-forest-labs/flux) to the music generation domain. It builds on top of the audio processing pipeline from [AudioLDM2](https://github.com/haoheliu/AudioLDM2).

### Core Model (`model.py`)
- `Flux` class: Transformer model for flow matching on sequences
- Uses `DoubleStreamBlock` (separate image/text modulation pathways) and `SingleStreamBlock` (parallel QKV + MLP)
- RoPE (Rotary Position Embedding) via `EmbedND` with configurable axes dimensions
- Timestep embedding via sinusoidal `timestep_embedding`
- Supports CFG (Classifier-Free Guidance) via `guidance_embed`

### Key Components
| File | Purpose |
|------|---------|
| `model.py` | Core Flux Transformer architecture |
| `constants.py` | Model configs: Small/Base/Large/Giant/Giant-Full |
| `train.py` | DDP training with EMA, RF (Rectified Flow) sampler |
| `sample.py` | Inference with CFG, VAE decoding, vocoder synthesis |
| `modules/layers.py` | DoubleStreamBlock, SingleStreamBlock, RoPE, RMSNorm, QKNorm |
| `modules/conditioner.py` | T5-XXL and CLAP-L text embedders |
| `modules/autoencoder.py` | Audio VAE encoder/decoder |

### Model Sizes (`constants.py`)
| Version | Hidden Size | Depth | Single Blocks | Params |
|---------|------------|-------|---------------|--------|
| Small | 512 | 8 | 16 | ~ |
| Base | 768 | 12 | 24 | ~ |
| Large | 1024 | 12 | 24 | ~ |
| Giant | 2048 | 19 | 38 | ~ |
| Giant-Full | 1408 | 12 | 24 | 2M steps |

### Conditioning Pipeline (`sample.py`)
1. T5-XXL text encoder → 4096-dim text embeddings
2. CLAP-L audio-text encoder → 768-dim semantic vector
3. Initial noise: `torch.randn(L, 8, 256, 16)` (latent space)
4. Rectified Flow sampling with CFG (cfg=7.0, stepsize=50)
5. VAE decode: AutoencoderKL (latent → mel spectrogram)
6. Vocoder: SpeechT5HifiGan (mel → waveform, 16kHz)

### Latent Space Config (`config/16k_64.yaml`)
- Sampling rate: 16000 Hz
- Mel bins: 64
- Latent embed dim: 8, latent t_size: 256, latent f_size: 16
- Duration: 10.24 seconds
- STFT: filter_length=1024, hop_length=160, win_length=1024
- Mel fmax: 8000 Hz

## Pre-trained Checkpoints
| Model | Steps | URL |
|-------|-------|-----|
| FluxMusic-Small | 200K | HF: feizhengcong/FluxMusic/musicflow_s.pt |
| FluxMusic-Base | 200K | HF: feizhengcong/FluxMusic/musicflow_b.pt |
| FluxMusic-Large | 200K | HF: feizhengcong/FluxMusic/musicflow_l.pt |
| FluxMusic-Giant | 200K | HF: feizhengcong/FluxMusic/musicflow_g.pt |
| FluxMusic-Giant-Full | 2M | HF: feizhengcong/FluxMusic/musicflow_g_full.pt |

## Dependencies
- PyTorch (with DDP training)
- diffusers (AutoencoderKL)
- transformers (T5EncoderModel, SpeechT5HifiGan, ClapTextModel)
- einops
- Flash Attention (optional, falls back to SDPA)
- audioldm2: VAE, vocoder (from HuggingFace cvssp/audioldm2)
- THOP (for model profiling)

## Key Differences from Related Work
- **vs. MusicGen**: Uses Rectified Flow (ODE-based) instead of AR transformer; no RVQ codebook bottleneck; leverages pre-trained T5-XXL + CLAP
- **vs. AudioLDM2**: Upgrades the diffusion backbone from UNet to Flux Transformer with RoPE; uses CFG sampling
- **vs. Riffusion**: Generative rather than latent manipulation; uses rectified flow instead of DDPM

## Game Dev Relevance
- Procedural background music generation for game scenes
- Adaptive music based on text descriptions (e.g., "epic battle music", "calm forest ambient")
- Music generation pipeline can be integrated into game runtime
