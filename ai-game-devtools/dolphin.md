---
title: Dolphin
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, multimodal, tool, open-source, ai]
sources: [raw/articles/ai-game-devtools/dolphin.md]
---

# Dolphin — General Video Interaction Platform Based on LLMs

**BUAA (Beihang University) + NTU** | [GitHub](https://github.com/kaleido-lab/dolphin) | Released 2023-05-06

## Overview

Dolphin 🐬 is a general video interaction platform based on large language models, designed as a chatbot for video understanding, processing, and generation. Users converse in natural language (English/Chinese) to perform tasks like video description, editing, style transfer, and generation.

## Architecture

**Core pattern**: LangChain conversational agent (`conversational-react-description`) + plugin-based Video Foundation Model zoo + Gradio web UI.

- **`ConversationBot`** class: dynamically instantiates models from YAML config, registers tools via LangChain `Tool` wrapper
- **`configs/backends.yaml`**: declarative model zoo (class target + device) + tool registry (name, description, instance, func)
- **Plugin modules**: each foundation model lives in its own `modules/` sub-package with `inference()` method
- **GPU allocation**: multi-GPU support via `--load` CLI flag (e.g., `VideoCaptioning_cuda:0,MoviepyInterface_cpu`)

## Tool Capabilities (17 tools, 5 categories)

| Category | Tools |
|----------|-------|
| Understanding | VideoCaptioning (mPLUG), ImageCaptioning (BLIP-2) |
| Processing | Subclip, Subtitles, Concat, Audio Extract/Add (MoviePy) |
| Preprocessing | Canny edge, Pose (OpenPose), Depth estimation |
| Generation | Text2Video (ModelScope), Canny/Pose/Depth→Video ([[text2video-zero]]), VideoPix2Pix style transfer, 3D modeling (Shap-E), Talking head ([[sadtalker]]) |
| Audio/Image | Text-to-Audio (Bark), Voice Clone (Bark), Text2Image (SD) |

## Technical Details

- **LLM backend**: OpenAI API via [[langchain]] agent framework
- **Video understanding**: mPLUG video captioning + BLIP-2 per-frame captioning (~13.4 GB + 8.4 GB VRAM)
- **Video generation**: Text2Video-Zero (SD-based zero-shot), ModelScope T2V (~6.5-6.7 GB VRAM)
- **Video editing**: VideoPix2Pix instruction-based style/content changes (~5.3 GB VRAM)
- **Portrait animation**: SadTalker image+audio→talking head (~13.4 GB VRAM)
- **3D modeling**: OpenAI Shap-E text→3D rotating view
- **Audio**: Suno Bark text-to-speech/music + voice cloning
- **Extensibility**: New models added by creating `modules/new_model/` package + registering in `backends.yaml`
- **Dependencies**: PyTorch 1.12.1+cu113, LangChain 0.0.101, Diffusers 0.16.1, Gradio 3.20.1
- **License**: Not explicitly specified in repository

## Comparison

- vs specialized tools: Dolphin chains multiple foundation models into one conversational interface
- vs Video-LLaVA / VideoAgent: focuses on tool use (generate/edit/process) rather than pure understanding
- Early project (2023): TODO items include unified video model, benchmarks, and production services
