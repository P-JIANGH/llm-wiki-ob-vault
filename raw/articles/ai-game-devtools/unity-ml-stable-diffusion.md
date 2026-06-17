# Unity ML Stable Diffusion - Source Analysis

**Source:** https://github.com/keijiro/UnityMLStableDiffusion
**Date:** 2026-04-18
**Category:** Image (AI Game DevTools)

## README Summary

Unity Core ML Stable Diffusion Plugin by Keijiro (Hiroaki Nishi). Stable Diffusion plugin for Unity, based on Apple's Core ML port. Can run the model on-editor and at-runtime without needing any extra components.

### System Requirements
- Unity 2023.1 or later
- Apple Silicon Mac (editor/runtime support) with macOS 13.1 or later
- iPad Pro with Apple silicon (runtime support) with iOS 16.2 or later
- iOS support requires huge memory, so only memory-rich iPad models supported

### How To Try
1. Clone/download pre-converted Stable Diffusion 2 model from HuggingFace (apple/coreml-stable-diffusion-2-base)
2. Copy `split_einsum/compiled` directory into `Assets/StreamingAssets`
3. Rename to `StableDiffusion`
4. First run takes a few minutes (initialization), subsequent runs take tens of seconds

### Performance Considerations
- Compute Units can be switched via Tester component property
- M1/M2 Mac and iOS: select "CPU and NE" (Neural Engine) or "All"
- M1/M2 Pro/Max Mac: "CPU and GPU" can be better option
- "CPU and GPU" mode requires "original" model instead of "split_einsum"

### LCM (SD-Turbo) Support
- Can use SD-Turbo or other LCMs with Scheduler set to `Lcm`
- StepCount: 1~4, GuidanceScale: 1~2
- Pre-converted SD-Turbo model available on author's HuggingFace repo

### Sample Projects
- [Flipbook3](https://github.com/keijiro/Flipbook3): Image-to-image pipeline with real-time 3D scene

## Key Source Files

### Pipeline.cs (116 lines)
- Core generation pipeline, implements IDisposable
- Configurable: Width, Height, Prompt, Strength, Scheduler (Pndm/Dpmpp/Lcm), StepCount, Seed, GuidanceScale
- Uses Unity's AsyncGPUReadback for async texture readback
- Uses ComputeShader for preprocessing (gamma decompression + pixel reordering)
- Background thread execution via Awaitable.BackgroundThreadAsync()
- Supports both text-to-image and image-to-image modes
- Output: RGB24 Texture2D → RenderTexture via Graphics.Blit (Y-flip)

### Plugin.cs (81 lines)
- P/Invoke wrapper for native Core ML plugin
- SafeHandleZeroOrMinusOneIsInvalid for proper resource management
- DllImport: "StableDiffusionPlugin" (macOS) / "__Internal" (iOS)
- Exposed C functions: SDCreate, SDSetConfig, SDGenerate, SDGenerateFromImage, SDGetImage, SDDestroy
- ComputeUnits enum: Cpu, CpuAndGpu, All, CpuAndNE
- Scheduler enum: Pndm, Dpmpp, Lcm
- Unsafe code for RunGeneratorFromImage (ReadOnlySpan<byte> → IntPtr)

### GeneratorSettings.cs
- Editor UI for generation parameters

### Tester.cs
- Sample/test component demonstrating pipeline usage

### ResourceInfo.cs
- Model metadata extraction (width, height, path from StreamingAssets)

## Dependencies
- jp.keijiro.klak.testtools (3.1.0) - Keijiro's test tools package
- com.unity.modules.uielements - Unity UIElements module
- Apple Core ML (native plugin, not in manifest)

## Architecture
- Unity Package (jp.keijiro.ml-stable-diffusion)
- Native plugin bridges Unity ↔ Apple Core ML Stable Diffusion
- Two-stage pipeline: preprocessing (ComputeShader) → generation (Core ML) → post-processing (Graphics.Blit)
- Supports text-to-image and image-to-image workflows
