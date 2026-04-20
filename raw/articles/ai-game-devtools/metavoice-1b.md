# MetaVoice-1B Source

**URL:** https://github.com/metavoiceio/metavoice-src
**License:** Apache 2.0
**Extracted:** 2026-04-21

## Project Overview

MetaVoice-1B is a 1.2B parameter base model trained on 100K hours of speech for TTS (text-to-speech). Released by MetaVoice (metavoiceio) under Apache 2.0 license.

### Key Features
- **Emotional speech rhythm and tone** in English
- **Zero-shot cloning** for American & British voices, with 30s reference audio
- **Cross-lingual voice cloning with finetuning** (as little as 1 minute training data for Indian speakers)
- **Synthesis of arbitrary length text** (planned, not fully implemented)

## Architecture

The model predicts EnCodec tokens from text and speaker information, then diffuses up to waveform level with post-processing.

### Stage 1: Causal GPT (First-Stage LLM)
- Predicts first two hierarchies of EnCodec tokens
- Text and audio in LLM context; speaker info via token embedding layer conditioning
- Speaker conditioning from separately trained speaker verification network
- Two hierarchies predicted in "flattened interleaved" manner
- Condition-free sampling to boost cloning capability
- Custom BPE tokenizer with 512 tokens
- ~1.2B parameters

### Stage 2: Non-causal Transformer (Second-Stage)
- Predicts remaining 6 hierarchies from first two
- ~10M parameters, extensive zero-shot generalization
- Non-causal enables parallel prediction of all timesteps

### Stage 3: Multi-band Diffusion
- Generates waveforms from EnCodec tokens
- Clearer speech than original RVQ decoder or VOCOS

### Stage 4: DeepFilterNet Post-processing
- Cleans up artifacts introduced by multi-band diffusion

## Key Files
- `fam/llm/model.py` — GPT model implementation (GPTConfig + GPT class), causal and non-causal inference, speaker embedding conditioning
- `fam/llm/fast_inference.py` — TTS class for inference, synthesise() API, HuggingFace model download
- `fam/llm/fast_model.py` — Fast model for inference
- `fam/llm/fast_quantize.py` — Quantization utilities (int4, int8)
- `fam/llm/finetune.py` — Fine-tuning code
- `fam/llm/decoders.py` — EnCodec decoder
- `fam/llm/enhancers.py` — Audio enhancement (DeepFilterNet)
- `fam/llm/inference.py` — Full inference pipeline (Model, InferenceConfig, TiltedEncodec, TrainedBPETokeniser)
- `serving.py` — Inference server (FastAPI)
- `app.py` — Web UI (Gradio)
- `colab_demo.ipynb` — Google Colab demo

## Dependencies
- Python 3.10-3.11
- PyTorch 2.1+
- audiocraft 1.2+
- deepfilternet 0.5+
- fastapi, uvicorn
- gradio 4.20+
- librosa, librosa
- huggingface_hub
- wandb (optional, for experiment tracking)

## Optimizations
- KV-caching via Flash Decoding
- Batching (including texts of different lengths)
- torch.compile for fast inference (30-90s compile time)
- int4 quantization (~2x faster than bf16/fp16)
- int8 quantization (slower than bf16/fp16, not recommended)

## Hardware Requirements
- GPU VRAM >= 12GB
- RTF < 1.0 on Ampere, Ada-Lovelace, and Hopper architecture GPUs

## Fine-tuning
- Supports fine-tuning the first-stage LLM
- Expects pipe-delimited CSV: `audio_files|captions`
- Config via `fam/llm/config/finetune_params.py`
- W&B integration available

## References
- Encodec: A Défossez et al. (arxiv 2210.13438)
- Multiband Diffusion: RS Roman et al. (arxiv 2308.02560)
- NanoGPT: @karpathy (inference code base)
- DeepFilterNet: @Rikorose
