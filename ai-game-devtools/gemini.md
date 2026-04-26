---
title: Gemini
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [ai, llm, model, multimodal, google, closed-source]
sources: [raw/articles/ai-game-devtools/gemini.md]
---

# Gemini

## Overview

**Gemini** is Google's flagship proprietary multimodal AI model family, developed by Google DeepMind. The current generation is **Gemini 3** (April 2026), marketed as *"our most intelligent AI model that brings any idea to life."* Gemini natively supports text, image, code, audio, and video understanding through a unified model architecture trained on Google's TPU v5p infrastructure.

## Model Family

### Gemini 3.x (Current)

| Model | Use Case |
|-------|----------|
| Gemini 3.1 Flash-Lite | High-volume tasks, efficiency-critical |
| Gemini 3.1 Pro | Complex tasks, creative concept development |
| Gemini 3 Flash | General purpose, fast iteration |

### Historical Versions

- **Gemini 1.0** (Dec 2023): Ultra / Pro / Nano tiers; first multimodal release
- **Gemini 2.0** (2024): Flash, Flash-Lite, Flash Thinking Experimental, Pro Experimental

## Technical Capabilities

- **Context window**: Up to **2 million tokens** (Gemini 3.1 Pro)
- **Multimodal**: Native text + image + code + audio + video understanding
- **Training**: Google TPU v5p cluster
- **Availability**: Google AI Studio, Gemini website, REST API

## Game Development Use Cases

Gemini can be integrated into game development workflows:

- **In-game dialogue**: Long context window (2M tokens) allows embedding entire game lore databases for consistent NPC dialogue generation
- **Game design assistant**: Brainstorming mechanics, quests, and narrative arcs via API calls
- **Content pipelines**: Batch-generate item descriptions, lore text, quest markers
- **Developer tooling**: Code generation and review for game logic

## Integration

Gemini is a **closed API service** — there is no open-weight model to run locally. Integration paths:

- **Unity**: HTTP REST calls to `generativelanguage.googleapis.com`
- **Unreal**: HTTP requests or Python plugin bridge
- **Web**: Browser-side via `@google/generative-ai-js` SDK
- **Server**: Python/Node.js backend calling the Gemini API

Unlike [[ai-game-devtools/gemma]] (Google's open-weight model family), Gemini requires API credentials and has usage costs.

## Related

- [[ai-game-devtools/gemma]] — Google's open-weight model series, research lineage from Gemini
- [[ai-game-devtools/gemma-cpp]] — C++ inference engine for Gemma
- [[ai-game-devtools/mini-gemini]] — Open-source VLM inspired by Gemini architecture
- [[ai-game-devtools/perplexica]] — Search AI tool supporting Gemini as a backend provider
