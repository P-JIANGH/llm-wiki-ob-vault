# Step-Audio 2 — Raw Source

**Source:** https://github.com/stepfun-ai/Step-Audio2
**Date:** 2026-04-21
**License:** Apache 2.0

## Overview

Step-Audio 2 is an end-to-end multi-modal large language model designed for industry-strength audio understanding and speech conversation, developed by **StepFun** (阶跃星辰).

Three open-source variants:
- Step-Audio 2 mini
- Step-Audio 2 mini Base
- Step-Audio 2 mini Think

## Key Capabilities

- **Advanced Speech and Audio Understanding**: ASR + audio understanding with semantic, para-linguistic, and non-vocal reasoning
- **Intelligent Speech Conversation**: Natural interactions for various conversational scenarios
- **Emotional Reasoning**: Analyzes user paralinguistic info (age, emotion) for accurate audio context interpretation
- **Tool Calling and Multimodal RAG**: Accesses real-world knowledge (textual + acoustic), fewer hallucinations, timbre switching
- **State-of-the-Art Performance**: SOTA on multiple audio understanding and conversational benchmarks

## Technical Architecture

- **Base model**: Initialized from Qwen2-Audio + Qwen2.5-7B weights
- **TTS component**: Built on CosyVoice (FunAudioLLM) + FlashCosyVoice
- **Tokenizer**: Custom audio tokenizer with `<audio_patch>` tokens, `<audio_start>`/`<audio_end>` markers
- **Token2wav**: Separate vocoder module for converting output audio tokens to WAV
- **vLLM backend**: Custom vLLM fork for faster, streaming, multi-GPU inference

## Main Modules

| File | Purpose |
|------|---------|
| `stepaudio2.py` | Core model: StepAudio2Base + StepAudio2 classes, chat template, generation |
| `stepaudio2vllm.py` | vLLM backend integration |
| `token2wav.py` | Token-to-WAV vocoder (based on CosyVoice) |
| `utils.py` | Audio loading, mel spectrogram computation, padding |
| `web_demo.py` | Gradio web demo |
| `web_demo_vllm.py` | vLLM-powered web demo |
| `cosyvoice2/` | CosyVoice TTS modules (flow, transformer, utils) |
| `flashcosyvoice/` | FlashCosyVoice accelerated TTS engine |

## Usage Examples

- ASR (automatic speech recognition)
- S2TT (speech-to-text translation, supports en/zh/ja)
- Audio caption
- S2ST (speech-to-speech translation)
- Multi-turn conversation (AQTA: audio-question/text-answer; AQAA: audio-question/audio-answer)
- Tool calling & web search
- Paralinguistic information understanding
- Audio understanding (MMAU benchmark)
- Universal audio caption

## Requirements

- Python >= 3.10
- PyTorch >= 2.3-cu121
- CUDA Toolkit
- Dependencies: transformers==4.49.0, torchaudio, librosa, onnxruntime, s3tokenizer, diffusers, hyperpyyaml

## Model Downloads

| Model | Hugging Face |
|-------|-------------|
| Step-Audio 2 mini | stepfun-ai/Step-Audio-2-mini |
| Step-Audio 2 mini Base | stepfun-ai/Step-Audio-2-mini-Base |
| Step-Audio 2 mini Think | stepfun-ai/Step-Audio-2-mini-Think |

## Evaluation Highlights

### ASR (CER/WER)
- Step-Audio 2 English avg: 3.14 (vs GPT-4o 4.50)
- Step-Audio 2 Chinese avg: 3.08 (vs GPT-4o 14.05)
- Shanghai dialect: 17.77 (vs GPT-4o 89.58!)

### Paralinguistic Understanding
- Step-Audio 2: 83.09 avg (vs GPT-4o 43.45)
- Near-perfect gender (100), age (96), emotion (86)

### Audio Understanding (MMAU)
- Step-Audio 2: 78.0 avg (vs GPT-4o 58.1)
- Speech: 83.5, Sound: 76.9, Music: 73.7

### Big Bench Audio
- Step-Audio 2 Think: 90.7 (vs GPT-Realtime 82.8)

### Tool Calling (StepEval-Audio-Toolcall)
- High precision/recall on audio search, date/time, weather, web search

### Speech-to-Speech (URO-Bench)
- Chinese Basic: 83.32 (vs GPT-4o 78.59)
- English Basic: 83.90 (vs GPT-4o 84.54)

## Release Timeline

- Jul 23, 2025: Technical report released (arXiv:2507.16632)
- Jul 23, 2025: StepEval-Audio-Paralinguistic benchmark released
- Jul 23, 2025: StepEval-Audio-Toolcall benchmark released
- Jul 24, 2025: Demo videos released
- Aug 29, 2025: Open-source release (Step-Audio 2 mini, mini Base)
- Sep 3, 2025: vLLM backend released
- Sep 15, 2025: Step-Audio 2 mini Think released

## Acknowledgements

Code from: CosyVoice, transformers, FlashCosyVoice
Model weights initialized from: Qwen2-Audio, Qwen2.5-7B

## Links

- GitHub: https://github.com/stepfun-ai/Step-Audio2
- HuggingFace: stepfun-ai/Step-Audio-2-mini (and variants)
- Technical Report: https://arxiv.org/abs/2507.16632
- StepFun Homepage: https://stepfun.com/
- Demo: https://realtime-console.stepfun.com/
