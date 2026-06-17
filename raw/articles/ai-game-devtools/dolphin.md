# Dolphin — General Video Interaction Platform Based on LLMs

> Source: https://github.com/kaleido-lab/dolphin
> Cloned: 2026-04-20
> Authors: Zehuan Huang, Haoran Feng, Chongzhi Zhang, Lu Sheng (Beihang), Ziwei Liu (NTU), Jing Shao

## Overview

Dolphin 🐬 is a general video interaction platform based on large language models, building a chatbot for video understanding, processing, and generation. Released May 2023 by BUAA (Beihang University) and NTU.

## Architecture

**Core Pattern**: LangChain Agent + multiple Video Foundation Models + Gradio UI

- **`video_chatgpt.py`** — Main entry point: `ConversationBot` class orchestrates LangChain conversational agent with custom Video ChatGPT prompt templates (EN/CN bilingual)
- **`configs/backends.yaml`** — YAML-configured model zoo + tool registry: 17 tools across 5 categories
- **`utils.py`** — Dynamic instantiation from config (`instantiate_from_config`)
- **`modules/`** — Plugin architecture for video foundation models, each in its own package:
  - `mplug/` — mPLUG video captioning
  - `blip/` — BLIP-2 image captioning
  - `video_moviepy/` — MoviePy video processing (trim/subtitle/concat/audio extract/add)
  - `annotator/` — Video2Canny/Pose/Depth preprocessing
  - `text2video_zero/` — Text2Video-Zero conditioned video generation (Canny/Pose/Depth/Vid2Vid)
  - `modelscope_t2v/` — ModelScope text-to-video synthesis
  - `sadtalker/` — SadTalker portrait talking head generation
  - `shap_e/` — OpenAI Shap-E 3D object modeling
  - `bark/` — Suno Bark text-to-audio + voice clone
  - `stable_diffusion/` — Text-to-image generation

## Tool Categories (17 tools)

| Category | Tools |
|----------|-------|
| Video Understanding | VideoCaptioning, ImageCaptioning |
| Video Processing | Subclip, Subtitles, Concat, Audio Extract/Add |
| Preprocessing | Edge(Canny), Pose, Depth estimation |
| Video Generation | Text2Video(Modelscope), CannyText2Video, PoseText2Video, DepthText2Video, VideoPix2Pix, 3D(Shap-E), Talker(SadTalker) |
| Audio Generation | Text2Audio(Bark), BarkVoiceClone |
| Image Generation | Text2Image(SD) |

## Key Technical Details

- **GPU Memory**: Ranges from 0 MB (MoviePy/CPU tools) to 13.4 GB (VideoCaptioning); multi-GPU support via `--load` flag (e.g., `VideoCaptioning_cuda:0,MoviepyInterface_cpu`)
- **LLM Backend**: OpenAI API (ChatGPT) via LangChain `conversational-react-description` agent
- **Extensibility**: New models added by creating a package in `modules/`, implementing class with `inference()` method, registering in `backends.yaml`
- **Dependencies**: PyTorch 1.12.1+cu113, LangChain 0.0.101, Diffusers 0.16.1, Gradio 3.20.1, MoviePy, Bark, SadTalker
- **License**: Not specified (no LICENSE file beyond MIT reference)

## Status

- Released: 2023-05-06 (code + online demo)
- Incomplete: TODO items include pretrained unified video model, emerging video task benchmarks, Gradio/Web/API/Docker services
