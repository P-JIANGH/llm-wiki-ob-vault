# AnyAccomp - Raw Source

**Source:** https://github.com/AmphionTeam/AnyAccomp
**Paper:** arXiv:2509.14052
**Date:** 2026-04-21
**Category:** Music (AI Game DevTools)

## README Summary

AnyAccomp is a generalizable accompaniment generation framework by the Amphion Team.

### Core Innovation: Quantized Melodic Bottleneck

The framework addresses two key challenges:

1. **Generalization**: Traditional models rely heavily on vocal separation, leading to suboptimal real-world performance. AnyAccomp uses a quantized melodic bottleneck design to resolve this.

2. **Versatility**: Extends beyond vocal accompaniment to support solo instruments, broadening application scenarios.

### Architecture (Three-Stage Pipeline)

1. **VQ Module** (VQ-VAE): Extracts core melodic features using chromagrams + Vector Quantization
   - Converts melodic input into discrete code representations
   - Acts as the bottleneck that forces generalizable feature extraction

2. **Flow Matching Module**: Generates matching accompaniments from quantized features
   - Built on DiffLlamaConcat (Llama-based non-autoregressive decoder with adaptive RMSNorm)
   - Flow matching model: xt = (1 - (1-σ)t) * z + t * x0
   - Supports CFG (Classifier-Free Guidance) with rescale
   - Non-causal attention (is_causal=False) for bidirectional generation
   - Uses sinusoidal position embeddings + diffusion step conditioning

3. **Vocoder**: Converts generated mel spectrograms back to audio

### Key Technical Details

- **DiffLlamaConcat**: Custom LlamaModel subclass with:
  - Adaptive RMSNorm (condition-dependent normalization)
  - Diffusion step embedding via SinusoidalPosEmb + MLP
  - Condition MLP + mel MLP for feature injection
  - Flash Attention 2 support
  
- **FlowMatchingTransformerConcat**:
  - Vocal melody projection layer
  - CFG scale control with rescaling
  - Prompt-based inpainting (supports left/right context prompts)
  - Random prompt dropping for CFG training

- **Inference Pipeline** (Sing2SongInferencePipeline):
  - Vocal encoding → mel spectrogram → flow matching reverse diffusion → vocoder → audio
  - Supports 3-30 second input audio
  - Outputs both accompaniment and mixture (vocal + accompaniment)
  - Gradio web UI + folder-based batch inference

### Dependencies
- PyTorch 2.3.1 + CUDA 12
- Transformers 4.47.1 (Llama backbone)
- Librosa 0.11.0 (audio processing)
- Gradio 4.44.1 (web UI)
- HuggingFace Hub (model downloads)

### Pretrained Models
- VQ model: HF amphion/anyaccomp/pretrained/vq
- Flow Matching: HF amphion/anyaccomp/pretrained/flow_matching
- Vocoder: HF amphion/anyaccomp/pretrained/vocoder

### License
MIT License, Copyright 2025 Amphion Team

### Authors
Junan Zhang, Yunjia Zhang, Xueyao Zhang, Zhizheng Wu
