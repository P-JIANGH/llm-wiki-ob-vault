---
title: Linly-Talker
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai, tool, avatar, voice-cloning, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/linly-talker.md]
---

# Linly-Talker

> Digital Human Intelligent Dialogue System — 'Interactive Dialogue with Your Virtual Self'

## Overview

Linly-Talker is a comprehensive digital human conversation system by Kedreamix that integrates the complete AI pipeline: **ASR (speech recognition) → LLM (language understanding) → TTS (speech synthesis) → Avatar (talking head generation)**. Users upload any image and engage in personalized voice conversations with an AI-powered digital human that responds with synchronized lip animation.

MIT License. GitHub: https://github.com/Kedreamix/Linly-Talker

## Architecture Pipeline

```
User Input (Text/Voice/Image)
  ↓
ASR: Whisper / FunASR / OmniSenseVoice  → text
  ↓
LLM: Linly / Qwen / Gemini-Pro / ChatGPT / ChatGLM / GPT4Free  → response text
  ↓
TTS: Edge TTS / PaddleTTS / Microsoft TTS / CosyVoice  → audio
  ↓
Avatar: SadTalker / Wav2Lip / Wav2Lipv2 / ER-NeRF / MuseTalk  → video
  ↓
Output: Digital human response video with subtitles
```

## Core Modules

### LLM (Conversation)
- **Linly** (Chinese LLaMA-2), **Qwen** (1.8B Chat), **Gemini-Pro**, **ChatGPT**, **ChatGLM**, **GPT4Free**
- Multi-turn dialogue with context awareness via GPT conversation system

### ASR (Speech Recognition)
- **Whisper** (OpenAI) — multilingual speech-to-text
- **FunASR** (Alibaba) — significantly faster Chinese ASR
- **OmniSenseVoice** — fastest recognition (added 2025.02)

### TTS (Text-to-Speech)
- **Edge TTS** — Microsoft free online TTS (most voices)
- **PaddleTTS** — offline mode (excluding Edge TTS)
- **Microsoft TTS** — advanced settings with more voice types
- **CosyVoice** (2024.08) — high-quality TTS + voice cloning

### Voice Cloning
- **GPT-SoVITS** (recommended) — 1-minute voice sample for fine-tuning
- **XTTS** — Coqui TTS voice cloning
- **CosyVoice** — high-quality zero-shot voice cloning

### Avatar (Talking Head Generation)
- **SadTalker** — single image + audio → talking head video
- **Wav2Lip** / **Wav2Lipv2** — lip-sync for any video
- **ER-NeRF** — NeRF-based avatar (coming soon)
- **MuseTalk** — near real-time speed avatar animation

## WebUI Features

The Gradio-based WebUI (webui.py, 55KB) provides:
1. **Personalized character generation** — upload image + voice, generate digital persona
2. **Multi-turn intelligent dialogue** — LLM-powered conversation with digital human
3. **Real-time MuseTalk conversations** — low-latency interactive dialogue
4. **Multi-module, multi-model, multi-option** selector
5. Default: does NOT load LLM model to reduce GPU memory; text-only responses for voiceovers

## Linly-Talker-Stream (2026.02)

A new real-time streaming interactive architecture built on the original project:
- **WebRTC** low-latency audio-video transmission
- **Full-duplex conversation** — speak and listen simultaneously
- **Barge-in support** — interruptible natural conversations
- **Modular multimodal pipeline** — reuses existing ASR/LLM/TTS/Avatar
- Repository: https://github.com/Kedreamix/Linly-Talker-Stream

## Deployment

- **AutoDL/codewithgpu**: Docker images available (`registry.cn-beijing.aliyuncs.com/codewithgpu2/kedreamix-linly-talker`)
- **Colab**: Notebook provided
- **Windows**: All-in-one Python package via Quark cloud drive
- **Linux**: Anaconda + PyTorch 2.4.1 (CUDA 11.8/12.1/12.4), ~30+ dependencies
- GPU: Minimum 8GB recommended for full pipeline

## Key Facts

| Property | Value |
|----------|-------|
| Language | Python |
| License | MIT |
| Primary Framework | PyTorch + Gradio |
| CUDA Support | 11.8 / 12.1 / 12.4 |
| Python Version | 3.10 |
| Model Weights | HuggingFace / ModelScope / Baidu / Quark |
| API | FastAPI with detailed documentation |

## Relationship to Other Projects

- SadTalker/MuseTalk/GPT-SoVITS: wiki pages pending for these integrated components
- Similar to [[ai-game-devtools/interactive-llm-powered-npcs]] (NPC dialogue system with SadTalker lip-sync) but focused on standalone digital human
- Related to [[ai-game-devtools/chatdollkit]] (Unity virtual assistant SDK with VRM support) but web-based via Gradio
- Shares avatar generation patterns with [[ai-game-devtools/hallo]] (audio-driven portrait animation) and [[ai-game-devtools/dreamtalk]] (diffusion-based talking head)
- Alternative approach to [[ai-game-devtools/dify]] for digital human dialogue use case
- Related to [[ai-game-devtools/cosmos]] (NVIDIA world model) in the broader digital human/simulation space
