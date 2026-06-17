# Jukebox: A Generative Model for Music

**Source:** https://github.com/openai/jukebox
**Date:** 2026-04-21
**Paper:** https://arxiv.org/abs/2005.00341
**Blog:** https://openai.com/blog/jukebox
**Status:** Archive (code provided as-is, no updates expected)

## README Summary

OpenAI's Jukebox is a generative model for music that produces raw audio including rudimentary singing and lyrics. The project is in archived state.

### Key Links
- Paper: https://arxiv.org/abs/2005.00341
- Blog: https://openai.com/blog/jukebox
- Explorer: http://jukebox.openai.com/
- Colab: https://colab.research.google.com/github/openai/jukebox/blob/master/jukebox/Interacting_with_Jukebox.ipynb

### Models Available
- `5b`: 5 billion parameter prior (no lyrics)
- `5b_lyrics`: 5 billion parameter prior with lyrics conditioning
- `1b_lyrics`: 1 billion parameter prior with lyrics conditioning

### Architecture
Three-level hierarchical model:
1. **VQ-VAE** (bottom): Encodes raw audio into discrete codes at multiple levels
   - 3-level VQ-VAE with downsampling factors: (32, 256) total
   - Codebook sizes: 2048 bins per level
   - Multi-scale spectral loss for training
2. **Upsamplers** (levels 0, 1): Autoregressive transformers that upsample coarse codes to finer resolution
   - width=1920, depth=72, 128 blocks
   - Conditional convolutions from lower-level codes
3. **Top-level Prior** (level 2): Large autoregressive transformer that generates top-level codes
   - 5B: width=4800, depth=72, 8 heads, 128 blocks
   - 5B_lyrics: width=4800, depth=79, adds lyric encoder (prime_width=1280, prime_depth=18)
   - 1B_lyrics: width=2048, depth=72, single encoder-decoder style

### Conditioning
- **Labels**: Artist (4111 categories) + Genre (120 categories) via style embeddings
- **Lyrics**: Linear-aligned lyric tokens interleaved with audio tokens
  - Uses `n_tokens=512` (5B_lyrics) or `n_tokens=384` (1B_lyrics) lyric characters
  - `single_enc_dec` merges lyric and audio vocab into unified sequence
  - Attention alignment between lyrics and music (alignment_layer/alignment_head)
- **Timing**: total_length, offset, fraction position → t_bins discretized embeddings

### Sampling Modes
- `--mode=default`: Sample from scratch
- `--mode=continue`: Continue from previously generated codes
- `--mode=upsample`: Upsample saved codes to higher resolution
- `--mode=primed`: Prompt with user's own audio files

### Training Pipeline
1. Train VQ-VAE to compress audio → discrete codes
2. Train priors/upsamplers on learned codes
3. Optionally add labels (artist/genre) and lyrics conditioning
4. Learning rate annealing near end of training for best quality

### Key Source Files
- `jukebox/sample.py`: Main sampling script (scratch/continue/upsample/prime modes)
- `jukebox/train.py`: Unified training script for VQ-VAE, priors, upsamplers
- `jukebox/hparams.py`: Hyperparameter registry for all model configurations
- `jukebox/make_models.py`: Model construction from hyperparameters
- `jukebox/data/files_dataset.py`: Audio dataset loading with metadata/lyrics
- `jukebox/align.py`: Lyrics-to-audio alignment utilities
- `jukebox/lyricdict.py`: Lyrics dictionary/processing

### Dependencies
- PyTorch 1.4, CUDA 10.0
- Python 3.7.5
- mpi4py (multi-GPU distributed training)
- librosa, soundfile, numba (audio processing)
- fire (CLI), tqdm
- Optional: NVIDIA Apex for fused_adam

### Performance
- V100 GPU: ~3 hours to sample 20 seconds of music
- Memory: 5B top-level = 11.5 GB, 5B_lyrics = ~12.5 GB with cache
- 1B_lyrics fits 16 samples in parallel; 5B fits 3 samples
- Peak KV cache: ~1 GB for 5B_lyrics per sample

### License
Noncommercial Use License (covers both code and weights)

### Authors
Prafulla Dhariwal, Heewoo Jun, Christine Payne, Jong Wook Kim, Alec Radford, Ilya Sutskever (OpenAI)
