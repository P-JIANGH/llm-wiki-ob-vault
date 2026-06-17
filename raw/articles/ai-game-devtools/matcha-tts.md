# Matcha-TTS — AI Game DevTools Source

## GitHub
- **URL:** https://github.com/shivammehta25/Matcha-TTS
- **Author:** Shivam Mehta (KTH Royal Institute of Technology)
- **Co-authors:** Ruibo Tu, Jonas Beskow, Éva Székely, Gustav Eje Henter
- **License:** MIT
- **Paper:** ICASSP 2024 — "Matcha-TTS: A fast TTS architecture with conditional flow matching"
- **arXiv:** https://arxiv.org/abs/2309.03199
- **Demo:** https://shivammehta25.github.io/Matcha-TTS
- **HuggingFace Space:** https://huggingface.co/spaces/shivammehta25/Matcha-TTS

## Overview
Matcha-TTS is a non-autoregressive neural TTS system that uses **conditional flow matching** (similar to rectified flows) to speed up ODE-based speech synthesis. Key properties:
- Probabilistic generative model
- Compact memory footprint
- Highly natural sounding output
- Very fast synthesis

## Architecture

### Core Components
```
Text → TextEncoder (Conformer + RoPE + Duration Predictor) → mu_x + logw
  → MAS Alignment → mu_y (aligned mel mean)
  → CFM (Conditional Flow Matching Decoder) → Mel Spectrogram
  → HiFi-GAN Vocoder → Audio
```

| Component | Description |
|-----------|-------------|
| **TextEncoder** | Conformer-based encoder with Rotary Position Embeddings (RoPE), outputs mean (mu_x) and log-scaled durations (logw) |
| **Duration Predictor** | 2-layer Conv1d predicting phoneme durations from encoder hidden states |
| **Monotonic Alignment Search (MAS)** | Cython DP algorithm for optimal text→mel alignment (borrowed from Glow-TTS/Grad-TTS) |
| **CFM Decoder** | Conditional Flow Matching module — U-Net style decoder with Conformer blocks, solves ODE via Euler solver |
| **HiFi-GAN Vocoder** | Built-in vocoder (hifigan/) for mel→waveform conversion |

### Flow Matching
The decoder uses conditional flow matching (CFM) — a probability path approach similar to rectified flows:
- Linear interpolation between noise and target: `z_t = (1-t)*z_0 + t*x_1`
- Velocity field: `u = x_1 - (1-sigma_min)*z_0`
- Neural estimator predicts velocity field given current state, timestep, and conditioning
- ODE solved via Euler method with configurable timesteps (default: 10)

### Key Files
- `matcha/models/matcha_tts.py` — Main model class (MatchaTTS), orchestrates encoder + CFM decoder
- `matcha/models/components/flow_matching.py` — CFM (Conditional Flow Matching) module, BASECFM + Euler solver
- `matcha/models/components/decoder.py` — U-Net style decoder with Conformer blocks
- `matcha/models/components/text_encoder.py` — Conformer text encoder with duration prediction
- `matcha/models/components/transformer.py` — Transformer/Conformer building blocks
- `matcha/utils/monotonic_align/` — Cython MAS implementation
- `matcha/hifigan/` — HiFi-GAN vocoder integration
- `matcha/cli.py` — CLI interface (matcha-tts command)
- `matcha/app.py` — Gradio web app (matcha-tts-app command)
- `matcha/onnx/` — ONNX export and inference support
- `configs/` — Hydra configuration files for datasets (LJSpeech, Hi-Fi-Captain, etc.) and experiments

## Installation & Usage
```bash
pip install matcha-tts
# or from source
git clone https://github.com/shivammehta25/Matcha-TTS.git
cd Matcha-TTS && pip install -e .
```

CLI:
```bash
matcha-tts --text "<INPUT TEXT>"
matcha-tts --text "<TEXT>" --speaking_rate 1.0 --temperature 0.667 --steps 10
matcha-tts --file <FILE> --batched
```

Gradio:
```bash
matcha-tts-app
```

## Training
Uses Hydra + PyTorch Lightning:
```bash
python matcha/train.py experiment=ljspeech
python matcha/train.py experiment=ljspeech_min_memory  # low VRAM
python matcha/train.py experiment=ljspeech trainer.devices=[0,1]  # multi-GPU
```

## ONNX Support
- Export: `python3 -m matcha.onnx.export matcha.ckpt model.onnx --n-timesteps 5`
- Inference: `python3 -m matcha.onnx.infer model.onnx --text "hey" --output-dir ./outputs`
- GPU inference: add `--gpu` flag, requires `onnxruntime-gpu`
- Can embed vocoder in ONNX graph for end-to-end pipeline

## Tech Stack
- **Framework:** PyTorch 2.0+, PyTorch Lightning 2.0+
- **Config:** Hydra 1.3
- **Phonemizer:** espeak-ng via phonemizer library
- **Cython:** For MAS (monotonic align) compilation
- **Deployment:** ONNX export + onnxruntime inference

## Game Dev Relevance
Matcha-TTS provides a fast, lightweight TTS backbone suitable for game NPC dialogue generation:
- Fast inference (few ODE steps) suitable for real-time or near-real-time voice generation
- MIT license — fully commercial-use friendly
- Multi-speaker support for diverse character voices
- ONNX export enables deployment on edge/mobile devices
- CLI + Gradio interfaces for easy integration into game dev pipelines
- Controllable speaking rate and temperature for expressive dialogue

## Related Tools
- Glow-TTS: MAS alignment approach inherited by Matcha-TTS
- HiFi-GAN: Integrated vocoder
- Coqui TTS: Referenced for Cython packaging
