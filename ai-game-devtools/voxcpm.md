---
title: VoxCPM
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, speech, tts, audio, llm]
sources: [raw/articles/ai-game-devtools/voxcpm.md]
---

# VoxCPM

## Overview

**VoxCPM** is a tokenizer-free Text-to-Speech (TTS) system developed by **OpenBMB** (ModelBest + THUHCSI). Unlike mainstream TTS approaches that convert speech to discrete tokens, VoxCPM models speech in continuous space using an end-to-end diffusion autoregressive architecture, directly generating continuous speech representations from text. Built on the [[minicpm]]-4 backbone, it achieves implicit semantic-acoustic decoupling through hierarchical language modeling and FSQ (Finite Scalar Quantization) constraints.

Latest version: **VoxCPM1.5** (800M params), with VoxCPM2 coming soon.

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Organization** | OpenBMB (ModelBest + THUHCSI) |
| **License** | Apache 2.0 |
| **Latest Version** | VoxCPM1.5 |
| **Model Params** | 800M (v1.5), 640M (v0.5B) |
| **AudioVAE Sampling** | 44100Hz (v1.5), 16000Hz (v0.5B) |
| **Token Rate** | 6.25Hz v1.5 (patch=4), 12.5Hz v0.5B (patch=2) |
| **RTF on RTX 4090** | ~0.15 (v1.5), 0.17 (v0.5B) |
| **Languages** | Chinese + English (1.8M hours training) |
| **Fine-tuning** | Full SFT + LoRA supported |
| **Streaming** | Yes, with chunked generation |

## Architecture

- **Backbone:** MiniCPM-4 (from [[minicpm]] family) for language modeling
- **Speech Generation:** LocDiT (Local Diffusion Transformer) with Flow Matching — inspired by [[cosyvoice]]
- **Audio Encoding:** AudioVAE based on DAC (Descript Audio Codec)
- **Quantization:** Scalar Quantization Layer with FSQ constraints
- **Enhancement:** ZipEnhancer for speech prompt enhancement + SenseVoice-Small for ASR

## Features

- **Context-Aware Speech Generation** — infers appropriate prosody from text content, trained on 1.8M hours bilingual corpus
- **Zero-Shot Voice Cloning** — short reference audio captures timbre, accent, emotional tone, rhythm, and pacing
- **High-Efficiency Synthesis** — RTF ~0.15 on consumer GPU, streaming mode for real-time use
- **Raw Text Support** — built-in text normalization (can be disabled for external TN tools)
- **Retry Mechanism** — automatic retry for bad cases with configurable length threshold

## Installation & Usage

```bash
pip install voxcpm
voxcpm --text "..." --output out.wav
```

Python API supports both non-streaming and streaming generation, with voice cloning via `prompt_wav_path`.

## Community Extensions

- **ComfyUI-VoxCPM** / **ComfyUI-VoxCPMTTS** — ComfyUI integration
- **VoxCPM-NanoVLLM** — GPU high-throughput inference
- **VoxCPM-ONNX** — CPU inference via ONNX export
- **VoxCPMANE** — Apple Neural Engine backend
- **voxcpm_rs** — Rust re-implementation of VoxCPM-0.5B

## Limitations

- Bilingual only (Chinese/English); other languages may produce low-quality output
- Limited direct control over emotion or speaking style
- May exhibit instability with very long or highly expressive inputs
- Voice cloning capability raises deepfake/misuse concerns

## Related

- [[cosyvoice]] — shares Flow Matching-based LocDiT approach, also open-source TTS
- [[minicpm]] — the language model foundation backbone
- [[sensevoice]] — used for speech prompt ASR in VoxCPM web demo
