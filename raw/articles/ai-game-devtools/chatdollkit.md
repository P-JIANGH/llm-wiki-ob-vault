# ChatdollKit — Raw Source

**Source:** https://github.com/uezo/ChatdollKit
**Captured:** 2026-04-18

## Overview

ChatdollKit is a 3D virtual assistant SDK for Unity that enables converting any 3D model into a voice-enabled chatbot. It integrates LLM (ChatGPT, Claude, Gemini, Dify), Speech-to-Text, and Text-to-Speech to create interactive AI avatars.

**Current Version:** 0.8.16
**License:** MIT
**Author:** @uezo (Unagiken)

## Key Features

- **Generative AI Native:** Supports ChatGPT, Anthropic Claude, Google Gemini Pro, Dify, and OpenAI-compatible APIs (Grok, etc.) with function calling and multimodal capabilities.
- **3D Model Expression:** Synchronizes speech and motion, controls facial expressions and animations autonomously, supports blinking and lip-sync.
- **Dialog Control:** Integrates STT/TTS (OpenAI, Azure, Google, VOICEVOX, AivisSpeech, Style-Bert-VITS2), manages dialog state/context, extracts intents and routes topics, supports wakeword detection.
- **Multi-Platform:** Windows, Mac, Linux, iOS, Android, VR, AR, WebGL.

## Architecture

### Core Components

1. **ModelController** — Central avatar controller. Manages animation, speech, face expressions, blinking, and lip-sync. Uses sub-controllers:
   - `SpeechController` — Handles TTS synthesis
   - `FaceController` — Handles facial expressions (VRM expressions)
   - `IBlink` interface — Blink behavior
   - `ILipSyncHelper` — Lip sync (uLipSync integration)

2. **ModelRequestBroker** — Async queue processor. Splits LLM responses at sentence boundaries (。！？,.!) and feeds AnimatedVoiceRequest to ModelController. Uses UniTask for async processing with cancellation support. Barge-in support allows interrupting mid-speech.

3. **LLM Service** — Abstract base `LLMService` with implementations:
   - `ChatGPTService` — OpenAI API + OpenAI-compatible endpoints
   - `ClaudeService` — Anthropic Claude
   - `GeminiService` — Google Gemini
   - `DifyService` — Dify platform
   - Supports function calling, multimodal (vision), Chain-of-Thought prompting

4. **Speech Listener (STT):**
   - `OpenAISpeechListener` — OpenAI Whisper API
   - `AzureSpeechListener` / `AzureStreamSpeechListener` — Azure STT with streaming
   - Silero VAD integration for voice activity detection
   - Combined VAD support (multiple VADs for noise resistance)
   - Echo cancelling for Android/iOS/macOS

5. **Speech Synthesizer (TTS):**
   - `OpenAISpeechSynthesizer` — OpenAI TTS API
   - `AzureSpeechSynthesizer` — Azure TTS
   - `VoicevoxSpeechSynthesizer` — VOICEVOX (Japanese, supports inline style switching)
   - `AivisSpeechSynthesizer` — AivisSpeech
   - `StyleBertVits2SpeechSynthesizer` — Style-Bert-VITS2
   - `NijiVoiceSpeechSynthesizer` — NijiVoice

6. **DialogProcessor** — Orchestrates the full dialog pipeline: STT → LLM → TTS → Animation/Face. Supports:
   - Wake word / cancel word / interrupt word / ignore word detection
   - Long-term memory (ChatMemory integration, mem0/Zep compatible)
   - User-defined tags (e.g., `[light:on]`) for custom actions
   - Multi-modal (camera capture, file upload)
   - Consecutive request merging for rapid speech
   - Timestamp insertion for time-aware responses

7. **AIAvatarKit Backend** — Server-side AI agent logic (offloads from client). Compatible with AutoGen and other agent SDKs.

8. **Multi-AITuber** — Support for multiple AI characters chatting with each other.

## Dependencies

- Unity (non-SRP project template — UniVRM doesn't support SRP)
- Burst (Unity Package Manager)
- UniTask v2.5.4
- uLipSync v3.1.0
- UniVRM v0.127.2
- ChatdollKit VRM Extension
- JSON.NET (Newtonsoft.Json)

## Key Files

| File | Purpose |
|------|---------|
| `Scripts/Model/ModelController.cs` | Central avatar controller (464 LOC) — animation, speech, face, blink, lip-sync |
| `Scripts/Model/ModelRequestBroker.cs` | Async queue for animated voice requests (193 LOC) — sentence splitting, barge-in |
| `Scripts/Model/SpeechController.cs` | TTS synthesis management |
| `Scripts/Model/FaceController.cs` | Facial expression control |
| `Scripts/Model/AnimatedVoice.cs` | Voice + animation combined data structure |
| `Scripts/Model/AnimatedVoiceRequest.cs` | Request object for voice+animation synthesis |
| `Scripts/Model/Voice.cs` | Voice data structure |
| `Scripts/Model/Animation.cs` | Animation parameter structure |
| `Scripts/Model/ActionHistoryRecorder.cs` | Debug/test history recording |
| `Scripts/Model/AvatarUtility.cs` | Avatar helper utilities |
| `Scripts/Model/ConfigurableLipSyncHelper.cs` | Lip sync configuration |
| `Scripts/Model/VRCFaceExpressionProxy.cs` | VRChat expression integration |
| `Scripts/Model/FaceClip.cs` | Face clip data |
| `Scripts/Model/ModelRequestBroker.cs` | Request queue processing |
| `Tests/TestModelRequests.cs` | Unit tests for model requests |
| `Tests/TestModelController.cs` | Unit tests for model controller |
| `Tests/TestWebVoiceLoader.cs` | Unit tests for voice loading |

## Notable Design Patterns

- **Tag-based Control:** LLM responses contain special tags (`[face:Joy]`, `[anim:waving_arm]`, `[pause:1.5]`) parsed by content processor to control avatar behavior
- **Async Queue Processing:** ModelRequestBroker uses UniTask async loop with CancellationToken for non-blocking avatar animation/speech
- **Speech Splitting:** Splits LLM responses at sentence boundaries for incremental TTS + animation
- **Barge-in:** Detects user speech during AI speech playback, cancels current output and switches to new input
- **Modular LLM Service:** Abstract LLMService base class allows swapping providers (ChatGPT/Claude/Gemini/Dify) without changing client code
- **Silero VAD + Energy VAD:** Combines ML-based and energy-based VAD for noise-resistant voice detection

## WebGL Support

- AudioWorkletNode for low-latency microphone capture
- Silero VAD in browser
- Camera switching (front/rear) with aspect ratio handling
- File upload for images
- JavaScript bridge for external control
- Mute/unmute handling with lip-sync fix

## Links

- GitHub: https://github.com/uezo/ChatdollKit
- Live Demo (WebGL): https://unagiken.blob.core.windows.net/chatdollkit/ChatdollKitDemoWebGL/index.html
- iOS App (OshaberiAI): https://apps.apple.com/us/app/oshaberiai/id6446883638
- Japanese README: https://github.com/uezo/ChatdollKit/blob/master/README.ja.md
- YouTube Tutorial: https://www.youtube.com/watch?v=rRtm18QSJtc
