# EDGE — Editable Dance Generation From Music

> Source: https://github.com/Stanford-TML/EDGE
> Paper: https://arxiv.org/abs/2211.10658
> CVPR 2023
> Authors: Jonathan Tseng, Rodrigo Castellon, C. Karen Liu (Stanford University)

## Abstract

Dance is an important human art form, but creating new dances can be difficult and time-consuming. EDGE (Editable Dance GEneration) is a state-of-the-art method for editable dance generation that creates realistic, physically-plausible dances while remaining faithful to the input music. EDGE uses a transformer-based diffusion model paired with Jukebox, a strong music-feature extractor, and confers powerful editing capabilities including joint-wise conditioning and in-betweening.

## Key Facts

- **Conference**: CVPR 2023
- **Dataset**: AIST++ (dance motion capture + audio)
- **Music Features**: Jukebox (OpenAI music model) for feature extraction
- **Hardware Requirements**: 16+ GB RAM per GPU, 1-8 high-end NVIDIA GPUs with 16+ GB VRAM, CUDA 11.6
- **Validated Setup**: Debian 10, Python 3.7.12, PyTorch 1.12.1, 1x NVIDIA T4

## Architecture

### Core Model

- **EDGE Class** (`EDGE.py`): Main orchestrator wrapping training/inference
  - Uses HuggingFace `accelerate` for multi-GPU distributed training
  - WandB logging
  - EMA (Exponential Moving Average) for model checkpointing

- **DanceDecoder** (`model/model.py`): Transformer decoder backbone
  - Latent dim: 512, 8 layers, 8 attention heads, ff_size: 1024
  - Rotary positional embeddings (optional alternative to absolute encoding)
  - FiLM (Feature-wise Linear Modulation) for diffusion timestep conditioning
  - DenseFiLM modules after self-attention, cross-attention, and feed-forward layers
  - Time embedding MLP: SinusoidalPosEmb → Linear(512→2048) → Mish

- **GaussianDiffusion** (`model/diffusion.py`): Diffusion process
  - 1000 timesteps with cosine schedule
  - Predict epsilon=False (predicts x0 directly)
  - L2 loss type
  - P2 reweighting (optional)
  - Guidance weight: 2 (classifier-free guidance)
  - EMA beta: 0.9999

### Data Pipeline

- **Representation**: 3D position (3) + 24-joint 6D rotation (144) + 4 contact features = 151 dims
- **Horizon**: 5 seconds at 30 FPS = 150 frames
- **Music features**: Jukebox (4800 dims) or baseline (35 dims)
- **Dataset**: AIST++ with precomputed Jukebox features (~50 GB, ~24 hrs to process)

### Editing Capabilities

- **Joint-wise conditioning**: Control specific body joints
- **In-betweening**: Generate motion between keyframes
- **Physical Foot Contact (PFC)**: Novel metric for physical plausibility evaluation

### Blender 3D Rendering Pipeline

- SMPL skeleton → FBX conversion for Blender
- `SMPL-to-FBX/Convert.py`: Converts generated motion to FBX format
- Provided rig: `ybot.fbx`
- Compatible with Mixamo retargeting and Rokoko Blender plugin

## Dependencies

- jukemirlib (music feature extraction)
- pytorch3d (3D transforms, SMPL skeleton)
- accelerate (HuggingFace multi-GPU)
- wandb (experiment tracking)
- Adan optimizer (from lucidrains)
- denoising-diffusion-pytorch (from lucidrains)
- SMPL-to-FBX library (from softcat477)
- FBX Converter tool (from BobbyAnguelov)

## Training

```bash
accelerate launch train.py --batch_size 128 --epochs 2000 --feature_type jukebox --learning_rate 0.0002
```

- ~6-24 hours training time depending on GPU
- WandB logging enabled
- Checkpoint saved every 100 epochs
- Sample rendering generated at each checkpoint

## Inference

```bash
python test.py --music_dir custom_music/
```

- Supports custom .wav music files
- Jukebox feature caching for faster reuse
- Can save motions as .pkl for further processing

## Evaluation

- Physical Foot Contact (PFC) score metric
- ~1k samples generated for evaluation
- Large-scale user study conducted, showing significant improvement over previous SOTA

## License

Research implementation — no explicit license specified.

## Links

- GitHub: https://github.com/Stanford-TML/EDGE
- Paper: https://arxiv.org/abs/2211.10658
