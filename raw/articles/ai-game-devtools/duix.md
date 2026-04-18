# Duix Mobile — Source Analysis

**Source:** https://github.com/GuijiAI/duix.ai
**Analyzed:** 2026-04-18
**Type:** Mobile SDK (Android + iOS) for real-time interactive AI avatars

## Project Overview

Duix Mobile is an open-source SDK developed by duix.com that enables developers to create real-time interactive AI avatars on mobile devices and embedded screens. It supports on-device deployment with no cloud dependency.

## Key Features

- **Cross-platform:** Android (10+) / iOS (12+) / Tablet / Automotive / VR / IoT
- **Fully offline:** Core functions run locally, no network required
- **Ultra-low latency:** Avatar response latency <120ms (tested on Snapdragon 8 Gen 2)
- **Streaming audio:** PCM streaming with barge-in support (since 2025-07-17 release)
- **Modular design:** Supports custom LLM, ASR, TTS integration
- **Custom avatars:** 4 public avatars (Leo, Oliver, Sofia, Lily) + custom via email

## Android SDK

- **Language:** Kotlin/Java
- **Rendering:** OpenGL ES via GLTextureView with transparency support
- **Inference:** NCNN (Tencent) + ONNX
- **Requirements:** Android 10+, armeabi-v7a/arm64-v8a, 8GB+ RAM, 1GB+ storage
- **Version:** 4.0.1
- **Key classes:** DUIX (main controller), RenderSink (rendering interface), VirtualModelUtil (model management)
- **Audio format:** PCM 16kHz/16bit/Mono or WAV

## iOS SDK

- **Language:** Objective-C
- **Framework:** GJLocalDigitalSDK.framework (Embed & Sign)
- **Requirements:** iOS 12+, iPhone 8+, A12+ chip recommended, ≥3GB RAM
- **Version:** 1.2.3.1
- **Key classes:** GJLDigitalManager (main manager), GJLPCMManager (PCM handling)
- **Audio format:** PCM 16kHz/16bit/Mono or WAV

## Architecture

Both platforms follow the same workflow:
1. Check/download base config and avatar models
2. Build DUIX instance with model path and render sink
3. Initialize asynchronously
4. Drive avatar with PCM/WAV audio streaming
5. Control motion playback (specific or random actions)
6. Release resources

## License

DUIX.COM COMMUNITY LICENSE — free for personal/small-scale use (<1000 MAU), commercial license required above threshold. Requires "Powered by Duix.com" attribution.

## Related Projects by Duix

- Duix.com — Cloud-based AI avatar service
- Duix.Avatar — Open-source AI avatar video production
- Duix-Reface — Real-time face-swap engine for AI avatars
