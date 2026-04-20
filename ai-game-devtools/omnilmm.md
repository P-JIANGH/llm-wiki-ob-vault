---
title: OmniLMM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, llm, multimodal, on-device, speech, open-source]
sources: [raw/articles/ai-game-devtools/omnilmm.md]
---

# OmniLMM

OmniLMM (OpenBMB MiniCPM-V & MiniCPM-o) is an open-source suite of on-device multimodal LLMs for vision, speech, and full-duplex multimodal live streaming. Developed by [[openbmb]] / Beijing Academy of Artificial Intelligence.

## Overview

The OmniLMM repository contains the full model series:

- **MiniCPM-o 4.5** (latest): 9B parameters, end-to-end vision + speech + text. Full-duplex streaming — concurrent video+audio input and text+speech output without blocking. Proactive interaction at 1Hz. Voice cloning. Approaches Gemini 2.5 Flash level on OpenCompass (77.6).
- **MiniCPM-V 4.0**: 4B parameters, outperforms GPT-4.1-mini in image understanding, optimized for phone deployment.
- **MiniCPM-V 4.5**: Outperforms GPT-4o-latest, Gemini-2.0 Pro, Qwen2.5-VL 72B on image tasks.
- **MiniCPM-o 2.6**: Matches GPT-4o-202405 on vision, speech, and multimodal live streaming.

## Architecture

- **End-to-end omni-modal**: SigLip2 (vision) + Whisper-medium (speech recognition) + CosyVoice2 (speech synthesis) + Qwen3-8B (LLM backbone), densely connected via hidden states.
- **Full-Duplex Streaming**: TDM (time-division multiplexing) synchronizes all input/output streams at millisecond granularity.
- **Proactive Interaction**: LLM monitors live video+audio at 1Hz decision frequency — can initiate reminders/comments proactively.
- **Configurable Speech**: Audio system prompt enables voice cloning and role-play from reference audio clips.

## Key Technical Features

| Feature | Details |
|---|---|
| Parameters | 4B–9B |
| Modalities | Image, video, text, audio (in); text, speech (out) |
| Languages | 30+ |
| Streaming | Full-duplex, concurrent I/O |
| OCR | State-of-the-art on OmniDocBench, surpasses Gemini-3 Flash |
| Quantization | int4, GGUF (16 sizes), llama.cpp-omni |

## Deployment Options

- PyTorch (Nvidia GPU, recommended for 100% precision)
- llama.cpp / Ollama (CPU inference, local devices)
- vLLM / SGLang (high-throughput)
- FlagOS (multi-chip backend)
- WebRTC demo (Mac/local GPU)

## Comparison to Similar Models

- vs [[MiniGPT-4]]: MiniCPM-V focuses on efficient on-device deployment; MiniGPT-4 is heavier (13B) but more established.
- vs [[LLaVA]]: Both open-source MLLMs; MiniCPM-V offers speech capabilities that LLaVA lacks.
- vs [[Qwen-VL]]: Comparable performance to Qwen2.5-VL 72B with 9B parameters.

## Related Pages

- [[openbmb]] — The lab behind OmniLMM
- [[minicpm-2b]] — MiniCPM 2B base model, predecessor to the MiniCPM-V/o series
- [[chatdev]] — Another [[openbmb]] project: multi-agent software development platform
