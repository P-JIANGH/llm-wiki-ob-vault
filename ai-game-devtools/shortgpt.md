---
title: ShortGPT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, video, automation, open-source, python, ai]
sources: [raw/articles/ai-game-devtools/shortgpt.md]
---

# ShortGPT

AI video automation framework by RayVentura — automates short-form and long-form video content creation using LLMs and multimedia APIs.

## Overview

ShortGPT is a Python-based framework that uses LLM-driven editing pipelines to automate video production. Popular use cases include YouTube Shorts automation and TikTok creativity program workflows. Version 0.1.31 on PyPI.

## Key Features

- **Three content engines**: `ContentShortEngine` (shorts), `ContentVideoEngine` (longer videos), `ContentTranslationEngine` (video dubbing/translation between 30+ languages)
- **JSON-based declarative editing**: Editing steps defined as JSON blocks (caption, watermark, voiceover, background music) composed into flows that LLMs can understand and modify
- **Multi-language voiceover**: ElevenLabs (premium) + EdgeTTS (free, 30+ languages)
- **Asset sourcing**: Pexels API for background footage, Bing Image API for images
- **Caption generation**: Automated subtitle overlay with style control (short/landscape/Arabic variants)
- **Memory persistence**: TinyDB for long-term editing variable storage
- **Gradio web UI**: Interactive interface on port 31415, Docker deployment

## Architecture

### Core Modules

| Module | Purpose |
|--------|---------|
| `editing_framework/` | JSON-based editing engine with `EditingStep` enum (14 step types) and `Flow` composition |
| `gpt/` | LLM prompt templates (Reddit scripts, translation, image generation, voice) |
| `audio/` | Voice synthesis backends (ElevenLabs + EdgeTTS) |
| `database/` | TinyDB content persistence |
| `tracking/` | Cost analytics and API usage tracking |

### Editing Engine Design

1. **EditingEngine** — stateful builder accumulates steps into a schema (visual_assets + audio_assets)
2. **CoreEditingEngine** — MoviePy 2.1.2 renderer executes the schema: compositing, text clips, audio mixing, effects
3. Each step is a JSON file defining type, parameters, actions (MoviePy ops), and required inputs

## Technologies

- MoviePy 2.1.2 (video editing/rendering)
- OpenAI API (script generation, orchestration)
- Whisper-timestamped (audio transcription)
- Gradio 5.12.0 (web UI)
- yt-dlp (YouTube downloading)

## License

MIT

## Links

- GitHub: https://github.com/RayVentura/ShortGPT
- PyPI: https://pypi.org/project/shortgpt/
- Docs: https://docs.shortgpt.ai/

## Related

Similar automated video tools include [[ai-game-devtools/money-printer-turbo]] (全自动短视频生成) and [[ai-game-devtools/diffsynth-studio]] (扩散模型视频引擎). ShortGPT differs by being **LLM-driven** — editing logic is expressed as JSON schemas that LLMs can compose, rather than fixed pipelines.
