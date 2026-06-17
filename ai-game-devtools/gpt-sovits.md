---
title: GPT-SoVITS-WebUI
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, tts, speech, open-source, python, ai]
sources: [raw/articles/ai-game-devtools/gpt-sovits.md]
---

# GPT-SoVITS-WebUI

**GitHub:** [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
**License:** MIT
**Language:** Python 3.9–3.12

## Overview

GPT-SoVITS-WebUI is an open-source few-shot voice conversion and text-to-speech (TTS) system with a comprehensive Gradio WebUI. It enables **zero-shot TTS** (5-second voice clone) and **few-shot TTS** (1-minute fine-tuning) across five languages: Chinese, English, Japanese, Korean, and Cantonese.

## Architecture

Two-stage pipeline combining GPT autoregressive generation with VITS-based synthesis:

1. **GPT Model (s1):** Bert-based autoregressive text-to-semantic-token generation (25Hz)
2. **SoVITS Model (s2):** VITS-based voice synthesis from semantic tokens, using HuBERT content features + BigVGAN vocoder

### Key Modules
| Module | Purpose |
|--------|---------|
| `module/models.py` | SoVITS generator/discriminator (attention, VQ, MRTE) |
| `TTS_infer_pack/` | Inference pipeline with text segmentation |
| `prepare_datasets/` | Dataset prep (text → Hubert features → semantic tokens) |
| `text/` | Multilingual text frontend (zh/ja/en/ko/yue) |
| `eres2net/` | ERes2NetV2 speaker verification (v2Pro) |
| `stream_v2pro.py` | Streaming inference for v2Pro |

## Version Evolution

| Version | Key Features |
|---------|-------------|
| **V1** | Original zero/few-shot TTS, 2k-hour pretraining |
| **V2** | Korean+Cantonese support, optimized text frontend, 5k-hour pretraining |
| **V3** | Higher timbre similarity, less training data needed, GPT more stable |
| **V4** | Fixed v3 metallic artifacts, native 48kHz output (v3 was 24kHz) |
| **V2Pro** | Surpasses v4 performance at v2 hardware cost/speed |

## Performance

- **RTF (Real-Time Factor):** 0.014 on RTX 4090 (1400 words ≈ 4 min audio in 3.36s)
- **0.028** on RTX 4060Ti, **0.526** on M4 CPU
- Online demo available on HuggingFace Spaces

## Integrated WebUI Tools

- **UVR5:** Vocal/accompaniment separation (MDX-Net, BS-Roformer, Mel-Band Roformer)
- **Audio Slicer:** Automatic training set segmentation by volume threshold
- **ASR:** FunASR (Chinese) + Faster Whisper (English/Japanese)
- **SubFix:** ASR transcription proofreading editor
- **API:** REST API on port 9880 (api.py + api_v2.py)

## Dataset Format

`.list` files: `vocal_path|speaker_name|language|text`

Supported languages: `zh` (Chinese), `ja` (Japanese), `en` (English), `ko` (Korean), `yue` (Cantonese)

## Deployment

- **Windows:** Integrated package with one-click `go-webui.bat`
- **Docker:** CU126/CU128 images (full and Lite variants)
- **macOS:** MPS/CPU support (GPU training quality noted as lower)
- **Linux:** Conda + install.sh with CUDA/ROCm/CPU options
- **Colab:** WebUI and inference notebooks provided

## Related Projects

- Shares VITS architecture lineage with [[so-vits-svc]] and [[bert-vits2]]
- Credits fish-speech for inference code reference
- Uses BigVGAN (NVIDIA) as vocoder, same as many modern TTS systems
- Complementary to avatar tools like [[sadtalker]] for full talking-head pipelines
