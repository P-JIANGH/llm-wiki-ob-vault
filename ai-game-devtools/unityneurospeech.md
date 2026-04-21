---
title: UnityNeuroSpeech
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [unity, ai, llm, speech, tool, open-source, tts, game-dev]
sources: [raw/articles/ai-game-devtools/unityneurospeech.md]
---

# UnityNeuroSpeech

**UnityNeuroSpeech** is an open-source Unity framework for creating fully voice-interactive AI NPCs that run entirely offline on Windows. Developed by HardCodeDev (Russia), it is billed as "the world's first game framework that lets you talk to AI in real time — locally."

## Overview

The framework enables real-time voice conversation with AI-powered game characters without any cloud dependencies, subscriptions, or API keys. It integrates speech recognition, local LLM inference, and custom text-to-speech into a single Unity package with async event-driven architecture.

## Technical Architecture

| Component | Technology | Purpose |
|---|---|---|
| Speech-to-Text | [whisper.unity](https://github.com/Macoron/whisper.unity) | Local voice input transcription |
| LLM Backend | [Ollama](https://ollama.com) | Local LLM inference (any model) |
| Text-to-Speech | [Coqui XTTS](https://github.com/idiap/coqui-ai-TTS) | Custom voice cloning & synthesis |
| Async Runtime | UniTask | Zero-allocation async/await (replaces Coroutines) |
| Build Targets | Mono / IL2CPP | Windows-only (both backends) |

## Key Features

- **Fully Offline** — No internet, no API keys, no subscriptions
- **Custom Voices** — XTTS enables any speaker voice cloning with short samples
- **Emotion & Action Tags** — LLM outputs parsed for `<happy>` / `<sad>` emotions and `<turn_off_lights>` / `<play_cutscene_123>` game actions
- **Agent API** — Event subscription model (`BeforeTTS()`, etc.) for custom logic injection
- **Multi-Agent Support** — Each agent can have distinct voice files per language
- **Multilingual** — 15+ languages including English, Russian, Chinese
- **History Persistence** — JSON dialog history with optional AES encryption
- **Editor Tools** — Create, manage, and customize agents inside Unity Editor

## Platform Support

| Backend | Windows | macOS | Linux | Mobile |
|---|---|---|---|---|
| Mono | ✅ | ❌ | ❌ | ❌ |
| IL2CPP | ✅ | ❌ | ❌ | ❌ |

Windows is the only planned target platform.

## Comparison with Similar Tools

| Tool | Cloud Required | Custom Voice | Local LLM | Unity Native | Async |
|---|---|---|---|---|---|
| UnityNeuroSpeech | No | Yes (XTTS) | Yes (Ollama) | Yes | UniTask |
| [[simpleollamaunity]] | No | No | Yes (Ollama) | Yes | Coroutine/HTTP |
| [[unity-chatgpt]] | Yes (OpenAI) | No | No | Yes | UniTask |
| [[chatdollkit]] | Optional | Yes (multiple TTS) | Optional | Yes | Async |

UnityNeuroSpeech differentiates by being the only fully offline Unity solution combining whisper STT + Ollama LLM + XTTS voice cloning in one integrated framework, with emotion/action tag parsing for game-specific AI behaviors.

## Repository Metadata

- **GitHub:** HardCodeDev777/UnityNeuroSpeech
- **Commits:** 61
- **Releases:** 1
- **Contributors:** 1 (solo developer)
- **License:** MIT
- **Documentation:** https://hardcodedev777.github.io/UnityNeuroSpeech/

## Related

- [[simpleollamaunity]] — Lightweight Unity Ollama HTTP wrapper (no STT/TTS)
- [[unity-chatgpt]] — OpenAI GPT integration for Unity (cloud-dependent)
- [[whisper]] — OpenAI's speech recognition model used by whisper.unity
- [[xtts]] — Coqui's voice cloning TTS model
