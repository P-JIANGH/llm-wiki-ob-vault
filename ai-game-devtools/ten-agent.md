---
title: TEN Agent / TEN Framework
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, tool, multimodal, open-source, agent]
sources: [raw/articles/ai-game-devtools/ten-agent.md]
---

# TEN Agent / TEN Framework

**TEN** is an open-source framework for building **real-time multimodal conversational AI** and voice agents. It provides a modular, extensible architecture for building low-latency, production-ready AI applications.

## Overview

TEN (theten.ai) is designed for developers who need to build voice-first or multimodal AI agents with production-grade reliability. It supports RTC (Real-Time Communication) and WebSocket transports, integrates with major AI providers, and includes specialized components for voice activity detection, turn-taking, and avatar lip-syncing.

## Key Facts

| Metric | Value |
|---|---|
| GitHub Stars | 10.4k |
| Forks | 1.2k |
| Releases | 113 (v0.11.62, Mar 2026) |
| Commits | 1,976 |
| Languages | Python 31.7%, C 22.6%, C++ 15.6%, TypeScript 13.1%, Rust 11.7%, Go 3.1% |
| License | Apache 2.0 (with additional restrictions for core) |
| Maintainers | @elliotchen200, @cyfyifanchen |

## Architecture & Ecosystem

The TEN ecosystem consists of modular components:

- **TEN Framework** — Core engine for conversational AI agents (multi-language: Python/C/C++/TS/Rust/Go)
- **TEN VAD** — Lightweight streaming Voice Activity Detector for low-latency speech detection
- **TEN Turn Detection** — Full-duplex dialogue communication, natural turn-taking
- **TEN Agent Examples** — Production-ready templates for various use cases
- **TMAN Designer** — Visual designer (localhost:49483) for configuring agent pipelines

### Multi-Language Design
The framework spans 6 languages, reflecting a systems-level approach: C/C++ for performance-critical audio pipelines, Rust for safe concurrent operations, Go for networking, TypeScript for the frontend/designer, and Python for the main agent orchestration layer.

## Featured Agent Examples

| Example | Description |
|---|---|
| Multi-Purpose Voice Assistant | Low-latency voice assistant with RTC/WebSocket, Memory, VAD, Turn Detection |
| Doodler | Real-time sketching from spoken/typed prompts with crayon palette |
| Speaker Diarization | Real-time speaker detection & labeling for multi-person conversations |
| Lip Sync Avatars | Live2D (Kei/MotionSync), Trulience, HeyGen, Tavus integration |
| SIP Call | Telephony via SIP/Twilio integration for AI phone agents |
| Transcription | Real-time audio-to-text conversion |
| ESP32-S3 Korvo V3 | Hardware integration for on-device LLM voice agents |

## Deployment

- **Localhost:** Docker Compose + Node.js v18, build via `task build`
- **Docker:** Release image build for customized agents
- **Split Cloud:** Frontend (Vercel/Netlify) + Backend (Fly.io/Render/ECS/Cloud Run)
- **Codespaces:** GitHub Codespaces support, no local Docker required

## Integration Stack

- **ASR:** Deepgram (speech-to-text)
- **LLM:** OpenAI (language model)
- **TTS:** ElevenLabs (text-to-speech)
- **Transport:** Agora (RTC/WebSDK)
- **Frontend:** Next.js, pnpm/bun

## Differences from Similar Tools

Compared to [[ai-game-devtools/pipecat]] (another Python voice agent framework), TEN is more focused on production deployment with dedicated VAD, turn detection, and hardware (ESP32) support. TEN's multi-language architecture (C/C++/Rust/Go) provides lower-level control over audio pipelines than Pipecat's pure-Python frame pipeline.

Like [[ai-game-devtools/om-agent]], TEN supports multi-modal agent workflows, but TEN specializes in real-time voice/conversation with sub-second latency requirements, while OmAgent focuses on general multimodal language understanding with YAML-configurable reasoning operators.

## Links

- **Site:** https://theten.ai
- **Docs:** https://theten.ai/docs
- **GitHub:** https://github.com/TEN-framework/TEN-Agent (redirects to TEN-framework/ten-framework)
- **Discord:** https://discord.gg/VnPftUzAMJ
- **Hugging Face:** https://huggingface.co/TEN-framework
