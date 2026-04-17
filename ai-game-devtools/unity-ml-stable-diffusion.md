---
title: Unity ML Stable Diffusion
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, image-generation, open-source, python]
sources: [raw/articles/ai-game-devtools/unity-ml-stable-diffusion.md]
---

# Unity ML Stable Diffusion

**Author:** Keijiro (Hiroaki Nishi)  
**GitHub:** https://github.com/keijiro/UnityMLStableDiffusion  
**License:** Not explicitly specified (author's typical pattern: Unlicense/MIT)  
**Platform:** macOS (Apple Silicon), iPadOS (Apple Silicon)  
**Unity Version:** 2023.1+

## Overview

Unity plugin that runs Stable Diffusion directly inside Unity using Apple's Core ML framework. No external servers, APIs, or cloud dependencies required — the entire diffusion pipeline executes on-device. Based on [Apple's ml-stable-diffusion](https://github.com/apple/ml-stable-diffusion) Core ML port.

## Key Features

- **On-device inference:** Runs entirely on Apple Silicon without external services
- **Editor + Runtime support:** Works in Unity Editor and builds (macOS/iPadOS)
- **Text-to-Image & Image-to-Image:** Both generation modes supported
- **Async pipeline:** Background thread execution via C# async/await, non-blocking main thread
- **LCM support:** Compatible with SD-Turbo and Latent Consistency Models (1-4 steps)
- **Multiple schedulers:** Pndm, Dpmpp, Lcm
- **Compute unit selection:** CPU, CPU+GPU, All (CPU+GPU+NE), CPU+NE (Neural Engine)

## Architecture

Three-layer design:

1. **Native Plugin (C):** `StableDiffusionPlugin` — bridges Unity to Apple Core ML. Exposes C API: `SDCreate`, `SDSetConfig`, `SDGenerate`, `SDGenerateFromImage`, `SDGetImage`, `SDDestroy`
2. **C# Wrapper (`Plugin.cs`):** SafeHandle-based P/Invoke wrapper for resource-safe native calls. Handles platform-specific DLL name (`__Internal` for iOS, `StableDiffusionPlugin` for macOS)
3. **Pipeline (`Pipeline.cs`):** High-level API with async workflow: ComputeShader preprocessing (gamma decompression + pixel reordering) → Core ML generation on background thread → AsyncGPUReadback → Texture2D output via Graphics.Blit

## Performance

| Device Tier | Recommended Compute Units | Notes |
|-------------|--------------------------|-------|
| M1/M2 base Mac, iPad | CPU+NE or All | GPU not powerful enough |
| M1/M2 Pro/Max Mac | CPU+GPU | GPU has more compute than NE |
| First run | N/A | Minutes (model compilation/caching) |
| Subsequent runs | N/A | Tens of seconds |

## Model Setup

Requires pre-converted Core ML models in `Assets/StreamingAssets/StableDiffusion/`:
- **SD 2.0 base:** `split_einsum` variant (default, for NE mode) or `original` variant (for GPU mode)
- **SD-Turbo (LCM):** Available from author's HuggingFace repo (`keijiro-tk/coreml-sd-turbo`)

## Technical Stack

- **Unity Package:** Distributed as `jp.keijiro.ml-stable-diffusion` UPM package
- **Native bridge:** P/Invoke with SafeHandle for lifetime management
- **GPU preprocessing:** ComputeShader for pixel format conversion
- **Async patterns:** C# async/await with BackgroundThread/MainThread context switching
- **Memory management:** NativeArray<byte> + GraphicsBuffer for efficient GPU↔CPU transfer

## Related Projects

- **[Flipbook3](https://github.com/keijiro/Flipbook3):** Sample project using image-to-image pipeline with real-time 3D scenes
- **[[ai-game-devtools/stable-diffusion]]:** Original Stability AI Stable Diffusion (the base model this plugin wraps)
- **[[ai-game-devtools/stable-diffusion-cpp]]:** Another native C++ Stable Diffusion inference engine (llama.cpp-style, cross-platform)

## Significance for Game Dev

Enables real-time AI image generation directly in Unity games and tools without server dependency. Particularly useful for:
- Procedural content generation with AI
- Art style transfer during gameplay
- Offline/air-gapped game experiences
- iPad-based creative tools
- Prototype AI-powered art tools

## Limitations

- **Apple Silicon only:** No Windows/Linux/Intel Mac support (tied to Core ML)
- **Memory intensive:** Requires memory-rich devices (iPad Pro recommended for iOS)
- **Model download needed:** Pre-converted Core ML models must be manually placed (~4-7GB)
- **No training:** Inference-only, cannot fine-tune or train models
