# Pipecat — Real-Time Voice & Multimodal AI Agents

**Source:** https://github.com/pipecat-ai/pipecat
**Captured:** 2026-04-16

## Overview

Pipecat is an open-source Python framework for building real-time voice and multimodal conversational AI agents. It orchestrates audio/video, AI services, different transports, and conversation pipelines using a frame-based architecture.

## Key Features

- **Voice-first**: Integrates speech recognition, text-to-speech, and conversation handling
- **Pluggable**: Supports many AI services (60+ providers across STT, TTS, LLM, Vision, etc.)
- **Composable Pipelines**: Build complex behavior from modular FrameProcessor components
- **Real-Time**: Ultra-low latency via WebRTC (Daily, LiveKit) or WebSocket transports
- **Multi-platform SDKs**: JavaScript, React, React Native, Swift (iOS), Kotlin (Android), C++, ESP32

## Architecture

### Frame-Based Pipeline Processing

All data flows as **Frame** objects through a pipeline of **FrameProcessors**:

```
[Processor1] → [Processor2] → ... → [ProcessorN]
```

Key components:
- **Frames** (100+ types): Data units (audio, text, video) and control signals
- **FrameProcessor**: Base processing unit — receives frames, processes, pushes downstream
- **Pipeline / ParallelPipeline**: Chains processors together, supports parallel branches
- **PipelineTask + Runner**: High-level entry point, handles signal management, graceful shutdown
- **Transports**: External I/O layer — Daily WebRTC, LiveKit WebRTC, WebSocket, Local
- **Services**: 60+ AI provider integrations (STT, TTS, LLM, Vision, Video, Memory)
- **Serializers**: Convert frames to/from wire formats (Twilio, Plivo, Vonage, Telnyx, Exotel, Genesys)
- **RTVI Protocol**: Real-Time Voice Interface bridging clients and pipeline
- **Observers**: Monitor frame flow without modifying pipeline

### Service Categories

| Category | Providers |
|----------|-----------|
| STT | AssemblyAI, AWS, Azure, Cartesia, Deepgram, ElevenLabs, Google, Groq, OpenAI, Whisper, + more |
| LLM | Anthropic, AWS, Azure, DeepSeek, Gemini, Grok, Groq, Mistral, Ollama, OpenAI, Qwen, + more |
| TTS | AWS, Azure, Cartesia, Deepgram, ElevenLabs, Google, Fish, Kokoro, MiniMax, OpenAI, + more |
| S2S | AWS Nova Sonic, Gemini Multimodal Live, Grok Voice Agent, OpenAI Realtime, Ultravox |
| Transport | Daily (WebRTC), FastAPI WebSocket, LiveKit (WebRTC), SmallWebRTC, WhatsApp, Local |
| Video | HeyGen, LemonSlice, Tavus, Simli |
| Vision | fal, Google Imagen, Moondream |
| Audio | Silero VAD, Krisp Viva, Koala, ai-coustics, RNNoise |
| Memory | mem0 |
| Analytics | OpenTelemetry, Sentry |

### Key Patterns

- **Context Aggregation**: `LLMContext` accumulates messages for LLM calls
- **Turn Management**: `LLMUserAggregator` / `LLMAssistantAggregator` via `LLMContextAggregatorPair`
- **Interruptions**: Triggered by user turn start strategies, with `InterruptionFrame` for pipeline control
- **Async Task Management**: `self.create_task()` with automatic tracking and cleanup
- **Dataclass vs Pydantic**: `@dataclass` for frames (high-frequency), `BaseModel` for config/params

## Technical Details

- **License**: BSD-2-Clause
- **Python**: >= 3.11 (recommended >= 3.12)
- **Package Manager**: `uv` (primary), `pip` (supported)
- **Build**: setuptools + setuptools_scm
- **Linting**: Ruff (line length 100), Google-style docstrings
- **Testing**: pytest + pytest-asyncio
- **Monorepo structure**: src/pipecat/ with modular extras (optional dependencies)

## Ecosystem

- **Pipecat Flows**: Structured conversation management
- **Voice UI Kit**: React/Next.js components for voice AI apps
- **Pipecat CLI**: Project creation, monitoring, deployment
- **Whisker**: Real-time Pipecat debugger
- **Tail**: Terminal dashboard
- **Claude Code Skills**: Development workflow plugins

## Related Projects

- Similar to [[ai-game-devtools/langchain]] but voice-first and real-time focused
- Provides transport layer that frameworks like [[ai-game-devtools/fabric]] lack
- Integrates with services like [[ai-game-devtools/deepseek-r1]] and [[ai-game-devtools/qwen3]] via LLM adapters
