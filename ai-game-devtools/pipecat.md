---
title: Pipecat
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, tool, open-source, multimodal, agent]
sources: [raw/articles/ai-game-devtools/pipecat.md]
---

# Pipecat — Real-Time Voice & Multimodal AI Agents

## Overview

**Pipecat** is an open-source Python framework for building real-time voice and multimodal conversational AI agents. It uses a frame-based pipeline architecture to orchestrate audio/video, AI services, transports, and conversation handling.

## Key Features

- **Voice-first**: Built-in STT/LLM/TTS pipeline with streaming support
- **60+ AI service providers** across STT, TTS, LLM, Vision, Video, Memory categories
- **Composable FrameProcessor pipeline**: modular components chained together
- **Real-time transports**: Daily WebRTC, LiveKit WebRTC, WebSocket, WhatsApp, Local
- **Multi-platform client SDKs**: JS, React, React Native, Swift, Kotlin, C++, ESP32
- **RTVI protocol**: Real-Time Voice Interface for client-pipeline communication

## Architecture

### Frame-Based Pipeline

All data flows as **Frame** objects (100+ types) through a chain of **FrameProcessors**:

```
[Transport Input] → [STT] → [LLM] → [TTS] → [Transport Output]
```

- **Pipeline / ParallelPipeline**: Chain processors, support parallel branches
- **PipelineTask + Runner**: High-level execution with signal management
- **Transports**: External I/O (Daily/LiveKit WebRTC, WebSocket, Local)
- **Serializers**: Wire format conversion (Twilio, Plivo, Vonage, Telnyx, etc.)
- **Observers**: Monitor frame flow without modifying pipeline

### Key Patterns

- **Context Aggregation**: LLMContext accumulates messages via LLMContextAggregatorPair
- **Turn Management**: VAD-based user turn detection (UserStartedSpeakingFrame / UserStoppedSpeakingFrame)
- **Interruptions**: InterruptionFrame with async Event for pipeline-level control
- **Async Task Management**: TaskManager with automatic tracking and cleanup

## Service Integrations

| Category | Notable Providers |
|----------|-------------------|
| STT | Deepgram, OpenAI Whisper, Google, Azure, AssemblyAI, ElevenLabs |
| LLM | OpenAI, Anthropic, Gemini, DeepSeek, Qwen, Grok, Ollama |
| TTS | ElevenLabs, Cartesia, Deepgram, OpenAI, Google, MiniMax, Fish |
| S2S | OpenAI Realtime, Gemini Multimodal Live, AWS Nova Sonic |
| Video | HeyGen, Tavus, Simli |
| Vision | Moondream, fal, Google Imagen |
| Audio | Silero VAD, RNNoise, Krisp Viva |

## Technical Details

- **License**: BSD-2-Clause
- **Language**: Python >= 3.11
- **Package manager**: `uv` (primary), pip supported
- **Build**: setuptools + setuptools_scm
- **Code quality**: Ruff linting, Google-style docstrings, type hints required

## Ecosystem

- **Pipecat Flows**: Structured conversation management
- **Voice UI Kit**: React components for voice AI
- **Pipecat CLI**: Project creation, monitoring, deployment
- **Whisker**: Real-time debugger
- **Tail**: Terminal dashboard

## Related

- Voice agent framework comparable to [[langchain]] (general LLM apps) but real-time focused
- Provides real-time transport layer that [[fabric]] (CLI pattern framework) lacks
- Integrates LLM providers like [[qwen3]] and [[deepseek-r1]] via service adapters
