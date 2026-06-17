---
title: MetaVoice-1B
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, speech, audio, llm]
sources: [raw/articles/ai-game-devtools/metavoice-1b.md]
---

# MetaVoice-1B

## Overview

MetaVoice-1B is a 1.2B parameter open-source text-to-speech (TTS) model trained on 100K hours of speech data. Released by [MetaVoice](https://github.com/metavoiceio) under Apache 2.0 license, it supports zero-shot voice cloning with just 30 seconds of reference audio and emotional speech synthesis in English.

## Key Facts

- **Parameters:** 1.2B (first stage) + ~10M (second stage)
- **Training data:** 100K hours of speech
- **License:** Apache 2.0 (unrestricted use)
- **Language:** English (primary), cross-lingual with finetuning
- **Zero-shot cloning:** 30s reference audio for American & British voices
- **Fine-tuning:** As little as 1 minute of data for new speaker domains
- **Hardware:** Requires >=12GB VRAM GPU

## Architecture

MetaVoice-1B uses a **4-stage pipeline**:

1. **Causal GPT (Stage 1)** — 1.2B parameter transformer predicts first 2 hierarchies of EnCodec tokens from text + speaker conditioning. Uses flattened interleaved prediction and condition-free sampling.
2. **Non-causal Transformer (Stage 2)** — ~10M parameter encoder predicts remaining 6 EnCodec hierarchies from the first 2. Runs in parallel (non-causal).
3. **Multi-band Diffusion (Stage 3)** — Converts EnCodec tokens to waveforms. Clearer than original RVQ decoder or VOCOS.
4. **DeepFilterNet (Stage 4)** — Post-processing to clean up diffusion artifacts.

Speaker embeddings come from a separately trained speaker verification network, conditioned at the token embedding layer.

## Technical Details

- **Tokenizer:** Custom BPE with 512 tokens
- **Optimizations:** KV-caching via Flash Decoding, torch.compile, int4 quantization (~2x speedup)
- **Real-Time Factor:** < 1.0 on Ampere/Ada-Lovelace/Hopper GPUs
- **Framework:** PyTorch 2.1+, audiocraft 1.2+
- **Interfaces:** Gradio Web UI, FastAPI server, Python API, Google Colab

## Key Components (fam/llm/)

| File | Purpose |
|------|---------|
| `model.py` | GPT model with causal/non-causal inference, speaker embedding conditioning |
| `fast_inference.py` | TTS class with `synthesise()` API |
| `fast_quantize.py` | int4/int8 quantization |
| `finetune.py` | Fine-tuning code for first-stage LLM |
| `decoders.py` | EnCodec decoder |
| `enhancers.py` | DeepFilterNet audio cleanup |
| `inference.py` | Full inference pipeline |

## Game Dev Relevance

- **NPC dialogue:** Zero-shot voice cloning for character voices from short reference samples
- **Localization:** Cross-lingual voice cloning potential with finetuning
- **Indie games:** Apache 2.0 license allows commercial use without restrictions
- **Real-time synthesis:** RTF < 1.0 on modern GPUs enables runtime TTS
- **Integration:** Docker-compose deployment, FastAPI server for game backend integration

## Differences from Similar Tools

- vs [[bark]]: MetaVoice-1B uses EnCodec tokens + diffusion (not neural codec LM), better emotional tone control, faster inference on supported GPUs
- vs [[cosyvoice]]: Both are open-source TTS; MetaVoice-1B focuses on English emotional speech, CosyVoice has broader language support
- vs [[chatTTS]]: MetaVoice-1B has zero-shot cloning (30s audio), ChatTTS is optimized for conversational dialogue style
- vs [[musicgen]]: Different domain — MetaVoice-1B is speech TTS, [[musicgen]] is music generation (both use EnCodec + transformer architecture)

## Links

- GitHub: https://github.com/metavoiceio/metavoice-src
- HuggingFace: https://huggingface.co/metavoiceio
- Playground: https://ttsdemo.themetavoice.xyz/
- Colab: [Open In Colab](https://colab.research.google.com/github/metavoiceio/metavoice-src/blob/main/colab_demo.ipynb)
