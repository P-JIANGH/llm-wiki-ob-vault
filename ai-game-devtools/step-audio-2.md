---
title: Step-Audio 2
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, speech, audio, llm, multimodal]
sources: [raw/articles/ai-game-devtools/step-audio-2.md]
---

# Step-Audio 2

## Overview

**Step-Audio 2** is an end-to-end multi-modal large language model for industry-strength audio understanding and speech conversation, developed by **StepFun** (阶跃星辰). It handles ASR, speech-to-speech translation, audio understanding, emotional reasoning, tool calling, and multi-turn conversation in a unified architecture.

Three open-source variants released: **Step-Audio 2 mini**, **Step-Audio 2 mini Base**, and **Step-Audio 2 mini Think**, all under Apache 2.0 license.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Developer | StepFun (阶跃星辰) |
| License | Apache 2.0 |
| Release | Aug 2025 (open-source mini variants) |
| Base weights | Qwen2-Audio + Qwen2.5-7B |
| TTS component | CosyVoice + FlashCosyVoice |
| Backend | PyTorch + custom vLLM fork |
| Python | >= 3.10, PyTorch >= 2.3-cu121 |
| GitHub | [stepfun-ai/Step-Audio2](https://github.com/stepfun-ai/Step-Audio2) |

## Architecture

The model uses a **single unified LLM** that processes both audio and text inputs and generates both text and audio token outputs:

- **Audio encoding**: Log-mel spectrograms (128-dim, padded to 479 frames) → `<audio_patch>` token sequence
- **Text tokenization**: Standard LLM tokenizer (from Qwen2-Audio)
- **Chat template**: Custom `<|BOT|>`, `<|EOT|>` delimiters with role-based formatting (`human`/`assistant`/`system`)
- **Output separation**: Token IDs < 151688 = text, IDs > 151695 = audio tokens (offset by 151696)
- **TTS conversion**: Separate `Token2wav` module (CosyVoice-based vocoder) with prompt WAV support for voice cloning
- **vLLM deployment**: Custom fork supports streaming, multi-GPU tensor parallelism, auto tool calling

## Core Capabilities

1. **ASR** — Chinese (CER 3.08), English (WER 3.14), Cantonese, Japanese, Arabian; strong dialect robustness (Shanghai: 17.77 vs GPT-4o's 89.58)
2. **Speech-to-Text Translation** — en↔zh↔ja support via CoVoST 2
3. **Speech-to-Speech Translation** — end-to-end S2ST via CVSS benchmark
4. **Audio Understanding** — MMAU benchmark (78.0 avg), Big Bench Audio (80.0 full, 90.7 Think variant)
5. **Paralinguistic Understanding** — gender, age, timbre, emotion, pitch, rhythm, speed detection (83.09 avg vs GPT-4o's 43.45)
6. **Tool Calling** — audio search, date/time, weather, web search with high precision/recall
7. **Multi-turn Conversation** — both text and audio response modes (AQTA/AQAA)
8. **Audio Caption** — universal audio description including speaker traits, background sounds, events

## Evaluation Highlights

| Benchmark | Step-Audio 2 | GPT-4o Audio | Qwen-Omni | Kimi-Audio |
|-----------|-------------|-------------|-----------|-----------|
| ASR English avg | **3.14** | 4.50 | 5.35 | 4.18 |
| ASR Chinese avg | **3.08** | 14.05 | 4.81 | 3.75 |
| Paralinguistic | **83.09** | 43.45 | 44.18 | 49.64 |
| MMAU avg | **78.0** | 58.1 | 71.5 | 69.6 |
| Big Bench Audio | 80.0 | — | — | — |
| Think variant | **90.7** | 82.8 (Realtime) | — | — |
| URO-Bench CN Basic | **83.32** | 78.59 | 68.98 | 73.59 |
| URO-Bench EN Basic | 83.90 | **84.54** | 70.58 | 60.04 |

## Differences from Similar Tools

- vs [[ai-game-devtools/qwen2-audio]]: Step-Audio 2 initializes from Qwen2-Audio weights but adds end-to-end speech output (TTS) and emotional reasoning capabilities
- vs [[ai-game-devtools/cosyvoice]]: CosyVoice is pure TTS; Step-Audio 2 integrates CosyVoice as a component within a full audio understanding + conversation pipeline
- vs Kimi-Audio: Step-Audio 2 significantly outperforms on paralinguistic understanding (+33 points) and Chinese ASR
- vs GPT-4o Audio: SOTA-level competition, particularly dominating Chinese dialect ASR and paralinguistic tasks

## Deployment

- **Direct Python**: `StepAudio2` class with `transformers` + `torch`
- **vLLM Docker**: `stepfun2025/vllm:step-audio-2-v20250909` image with streaming inference and multi-GPU support
- **Web demo**: Gradio-based (`web_demo.py`)
- **Online API**: StepFun realtime console with web search tool

## Related

- [[ai-game-devtools/qwen2-audio]] — Base model initialization source
- [[ai-game-devtools/cosyvoice]] — TTS component source (CosyVoice + FlashCosyVoice)
- Technical Report: [arXiv:2507.16632](https://arxiv.org/abs/2507.16632)
