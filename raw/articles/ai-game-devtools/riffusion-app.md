# Riffusion App — Source Analysis

**Source:** https://github.com/riffusion/riffusion-app
**Date:** 2026-04-21
**Status:** Archived / No longer actively maintained

## README Summary

Riffusion is an interactive web app for real-time music generation with stable diffusion.
Built with Next.js, React, TypeScript, three.js, Tailwind, and Vercel.

The app connects to a separate inference server (https://github.com/hmartiro/riffusion-inference)
which runs a Flask backend for Stable Diffusion model inference.

## Tech Stack

- **Framework:** Next.js 13.0.4, React 18.2.0, TypeScript 4.9.3
- **Styling:** TailwindCSS 3.2.4, DaisyUI 2.43.0, styled-components 5.3.6
- **3D Visualization:** three.js 0.146.0, @react-three/fiber 8.9.1, @react-three/drei 9.41.2
- **Audio:** Tone.js 14.7.77 (Web Audio API wrapper)
- **Deployment:** Vercel
- **Analytics:** @vercel/analytics

## Architecture

### Core Components

| Component | File | Purpose |
|-----------|------|---------|
| Home | pages/index.tsx | Main page — state management, prompt cycling, audio playback |
| ModelInference | components/ModelInference.tsx | Handles API calls to inference server (Flask or Baseten) |
| AudioPlayer | components/AudioPlayer.tsx | Tone.js-based audio playback with crossfade |
| PromptPanel | components/PromptPanel.tsx | UI for managing 6-prompt queue |
| ThreeCanvas | components/ThreeCanvas.tsx | 3D spectrogram visualization via three.js |
| SpectrogramViewer | components/SpectrogramViewer.tsx | Spectrogram image display |
| Settings | components/Settings.tsx | Denoising, seed image, guidance controls |
| Share | components/Share.tsx | Share current riff via URL |

### App State Machine

The app uses a simple state machine (`AppState`):
- `UNINITIALIZED` → `SAME_PROMPT` → `TRANSITION` (loop)

In `SAME_PROMPT` mode, the same prompt is used for both start/end of interpolation,
incrementing the seed each cycle. In `TRANSITION` mode, a new prompt enters the queue
and alpha blends between the old and new prompts.

### Inference Flow

1. User enters text prompts (e.g., "church bells", "jazz piano")
2. `ModelInference` sends POST to `/api/server` (local Flask) or Baseten cloud endpoint
3. Inference input: alpha (blend factor), start prompt, end prompt, seed, denoising, guidance
4. Server runs Stable Diffusion on spectrogram images → converts to audio via Griffin-Lim
5. Result: spectrogram image URL + audio URL + duration
6. `AudioPlayer` plays results in sequence with crossfade

### Key Data Types (types.ts)

- `PromptInput`: { prompt, seed, denoising, guidance }
- `InferenceInput`: { alpha, start: PromptInput, end: PromptInput, seed_image_id, mask_image_id }
- `InferenceResult`: { input, counter, played, image URL, audio URL, duration_s }

### Inference Server Integration

- Default: Flask server at `http://127.0.0.1:3013/run_inference/`
- Cloud: Baseten deployment via `NEXT_PUBLIC_RIFFUSION_BASETEN_GC_URL`
- Environment variable: `RIFFUSION_FLASK_URL`

## Citation

Forsgren, Seth & Martiros, Hayk (2022). "Riffusion - Stable diffusion for real-time music generation"

## Key Observations

- The app is a **frontend-only** project — the actual Stable Diffusion model runs in a separate repo
- Uses spectrogram-as-image approach: text→diffusion→spectrogram→audio (Griffin-Lim inversion)
- Prompt queue of 6 items with alpha-based interpolation between consecutive prompts
- Timeout system (600s) to prevent GPU hogging — prompts "Are you still riffing?"
- Baseten cloud deployment support for serverless inference
- Three.js 3D canvas for visualizing spectrograms as terrain
- Tone.js for Web Audio playback with compressor and crossfade
- The project is archived — no longer actively maintained
