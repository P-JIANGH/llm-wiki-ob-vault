# ShortGPT — AI Video Automation Framework

**Source:** https://github.com/RayVentura/ShortGPT
**Date:** 2026-04-20
**Version:** 0.1.31 (PyPI)

## Overview

ShortGPT is a Python-based AI video automation framework that automates short/video content creation using LLMs and multimedia APIs. Popular use cases include YouTube automation and TikTok creativity program automation.

## Key Features

- **Automated editing framework**: LLM-oriented video editing language with JSON-based editing blocks
- **Multiple content engines**:
  - `ContentShortEngine` — short-form video creation (script → voiceover → captions → rendering → YouTube metadata)
  - `ContentVideoEngine` — longer videos with automatic background footage sourcing
  - `ContentTranslationEngine` — video dubbing/translation between languages (transcribe → translate → voice → captions)
- **Multi-language voiceover**: 30+ languages via EdgeTTS (free) + ElevenLabs (premium)
- **Asset sourcing**: Pexels API for background footage, Bing Image API for images
- **Caption generation**: Automated subtitle/caption overlay with style control
- **Memory/persistence**: TinyDB for long-term editing variable persistence
- **Gradio web UI**: Interactive web interface on port 31415

## Architecture

### Core Modules

| Module | Purpose |
|--------|---------|
| `shortGPT/editing_framework/` | JSON-based editing engine with step/flow composition |
| `shortGPT/gpt/` | LLM prompt templates (Reddit, translation, image generation, voice) |
| `shortGPT/audio/` | Voice synthesis (ElevenLabs + EdgeTTS backends) |
| `shortGPT/database/` | TinyDB content persistence layer |
| `shortGPT/config/` | API key management, asset database, path utilities |
| `shortGPT/tracking/` | Cost analytics and API usage tracking |
| `shortGPT/api_utils/` | Pexels, ElevenLabs, Bing Image API wrappers |

### Editing Engine Design

The editing engine uses a **JSON-based declarative pipeline**:
1. **EditingStep Enum** — predefined building blocks (caption, watermark, voiceover, background music, etc.)
2. **Flow Enum** — composite workflows (e.g., `build_reddit_image`)
3. **EditingEngine** — stateful builder that accumulates steps into a schema
4. **CoreEditingEngine** — MoviePy-based renderer that executes the schema

Each editing step is a JSON file defining:
- `type`: visual or audio asset
- `parameters`: configurable values (font, color, position, duration)
- `actions`: MoviePy operations (clip creation, compositing, effects)
- `inputs`: required arguments for the step

### Technologies Used

- **MoviePy 2.1.2** — video editing and rendering
- **OpenAI API** — script generation, prompt-based editing orchestration
- **ElevenLabs** — premium voice synthesis
- **EdgeTTS** — free Microsoft voice synthesis (30+ languages)
- **Pexels API** — background video/image sourcing
- **Bing Image API** — image sourcing
- **Whisper-timestamped** — audio transcription with word-level timestamps
- **TinyDB/TinyMongo** — lightweight NoSQL persistence
- **Gradio 5.12.0** — web UI framework
- **yt-dlp** — YouTube video downloading

## License

MIT License

## Links

- GitHub: https://github.com/RayVentura/ShortGPT
- PyPI: https://pypi.org/project/shortgpt/
- Docs: https://docs.shortgpt.ai/
- Google Colab: https://colab.research.google.com/drive/1_2UKdpF6lqxCqWaAcZb3rwMVQqtbisdE
- Discord: https://discord.gg/uERx39ru3R

## Installation

```bash
# Docker (recommended)
docker build -t short_gpt_docker:latest .
docker run -p 31415:31415 --env-file .env short_gpt_docker:latest

# pip
pip install shortgpt
```

## Comparison with Similar Tools

- Unlike general video editors, ShortGPT is **LLM-driven** — the editing logic is expressed as prompts and JSON schemas that LLMs can understand and modify
- Supports **video translation/dubbing** as a first-class feature (ContentTranslationEngine)
- Built as a **framework**, not just a tool — developers can compose custom editing pipelines from the step/flow primitives
- Focuses on **short-form content** (9:16) but also supports landscape video
