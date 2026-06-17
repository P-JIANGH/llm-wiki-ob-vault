---
title: AnyAccomp
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, music, audio, diffusion]
sources: [raw/articles/ai-game-devtools/any-accomp.md]
---

# AnyAccomp

## Overview

**AnyAccomp** (Amphion Team) is a generalizable AI accompaniment generation framework that creates musical accompaniments from vocal or solo instrument tracks. Published as arXiv:2509.14052 (2025).

Unlike traditional accompaniment models that require clean vocal separation, AnyAccomp uses a **quantized melodic bottleneck** design that works directly with melodic features extracted via chromagrams + VQ-VAE, enabling it to handle both vocals and solo instruments.

## Architecture

### Three-Stage Pipeline

| Stage | Component | Function |
|-------|-----------|----------|
| 1 | **VQ-VAE** | Extracts core melodic features via chromagrams, quantizes into discrete codes |
| 2 | **Flow Matching** | Generates accompaniment mel spectrograms from quantized features |
| 3 | **Vocoder** | Converts mel spectrograms back to audio waveform |

### Flow Matching Model

The core generation uses **DiffLlamaConcat** — a custom Llama-based non-autoregressive decoder:

- **Adaptive RMSNorm**: Condition-dependent layer normalization (instead of standard RMSNorm)
- **Non-causal attention**: `is_causal=False` enables bidirectional sequence modeling
- **Diffusion step conditioning**: Sinusoidal position embeddings + MLP injection
- **CFG support**: Classifier-free guidance with rescale_cfg (0.75) for quality control
- **Prompt inpainting**: Supports left/right context prompts for seamless continuation

### Key Parameters

- Sample rate: 24kHz
- Input duration: 3-30 seconds
- Inference steps: 10-100 (default 50)
- CFG scale: 1.0-10.0 (default 3.0)
- Dependencies: PyTorch 2.3.1, Transformers 4.47.1, Librosa 0.11.0

## Usage

```bash
# Launch Gradio web UI
python gradio_app.py  # Port 8091

# Batch inference from folder
python infer_from_folder.py
```

Pretrained models available on HuggingFace: `amphion/anyaccomp`

## License

MIT (Copyright 2025 Amphion Team)

## Links

- [GitHub](https://github.com/AmphionTeam/AnyAccomp)
- [arXiv Paper](https://arxiv.org/abs/2509.14052)
- [HuggingFace](https://huggingface.co/amphion/anyaccomp)
- [Online Demo](https://anyaccomp.github.io)

## Related

- [[musicgen]] — Meta's MusicGen for text-to-music generation, complementary to accompaniment generation
- [[mean-audio]] — Single-step text-to-audio generation with MeanFlow objective, alternative music generation approach
- [[wavjourney]] — LLM-driven compositional audio creation pipeline, higher-level music composition vs accompaniment
- [[mmaudio]] — Audio-visual synchronized video generation from HK Cheng Rex
