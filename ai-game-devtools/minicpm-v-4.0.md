---
title: MiniCPM-V 4.0 / MiniCPM-o
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, on-device, speech, open-source, llm]
sources: [raw/articles/ai-game-devtools/minicpm-v-4.0.md]
---

# MiniCPM-V 4.0 / MiniCPM-o

**MiniCPM-V 4.0** and **MiniCPM-o 4.5** (OpenBMB/THUNLP, 2025) are the latest in the MiniCPM-V series of on-device multimodal LLMs. MiniCPM-V 4.0 (4.1B params) focuses on vision. MiniCPM-o 4.5 (9B params) adds end-to-end speech input/output and full-duplex streaming — simultaneously seeing, listening, and speaking on phone and edge devices.

## Overview

Built by THUNLP & ModelBest, this series prioritizes **strong performance at minimal compute**. The vision-only MiniCPM-V 4.0 achieves OpenCompass 69.0 with <2s first-token latency on iPhone 16 Pro Max. MiniCPM-o 4.5 pushes to 77.6 OpenCompass (approaching Gemini 2.5 Flash) while adding bilingual speech conversation and voice cloning.

## Architecture

| Component | MiniCPM-V 4.0 | MiniCPM-o 4.5 |
|-----------|---------------|---------------|
| Vision encoder | SigLIP2-400M | SigLIP2-400M |
| LLM backbone | MiniCPM4-3B (4.1B total) | Qwen3-8B (9B total) |
| Speech | — | Whisper-medium + CosyVoice2 |
| Key innovation | 64-token perceiver resampler | Full-duplex TDM streaming |
| Proactive interaction | — | 1Hz decision frequency |

**MiniCPM-o 4.5** uses an end-to-end omni-modal architecture with dense hidden state connections and time-division multiplexing (TDM) to handle simultaneous audio-visual streams.

## Performance

### Image Understanding (OpenCompass)

| Model | Score |
|-------|-------|
| MiniCPM-o 4.5 | **77.6** |
| Gemini 2.5 Flash | 78.5 |
| GPT-4o | 75.4 |
| Qwen3-VL-8B | 76.5 |
| MiniCPM-V 4.0 | 69.0 |

### Inference Efficiency (MiniCPM-o 4.5)

| Format | Speed | TTFT | GPU Memory |
|--------|-------|------|-----------|
| bf16 | 154.3 tok/s | 0.6s | 19 GB |
| **int4** | **212.3 tok/s** | 0.6s | **11 GB** |

## Key Capabilities

- **Vision-only mode**: `init_vision=True, init_audio=False, init_tts=False` — drops audio modules entirely
- **Full-duplex streaming**: simultaneously see, listen, and speak via `model.as_duplex()` + `streaming_prefill` / `streaming_generate`
- **Voice cloning**: audio system prompts + reference audio
- **Proactive NPC interaction**: 1Hz decision loop for game agent behaviors
- **OCR**: State-of-the-art on OmniDocBench

## Game Dev Use Cases

- **On-device game vision**: Local image/video understanding in games without cloud API — small footprint (4B params)
- **NPC speech interaction**: Full-duplex conversational NPCs that see the game world and speak back
- **Voice-cloned game characters**: CosyVoice2-based expressive voice synthesis for character dialogue
- **Multilingual game UIs**: 30+ language support for internationalization
- **Real-time game analytics**: High FPS video (10fps) understanding for game state monitoring

## Related

- Predecessor: [[minicpm-llama3-v-2.5]] (MiniCPM-V 2.5, 3B, vision-only)
- Parent LLM: [[minicpm-2b]] (LLM backbone)
- Related: [[MiniGPT-4]], [[LLaVA-OneVision]], [[Qwen-VL]]
- Mobile deployment: [[mlc-llm]]

## Links

- GitHub: https://github.com/OpenBMB/MiniCPM-o
- HuggingFace: https://huggingface.co/openbmb/MiniCPM-V-4
