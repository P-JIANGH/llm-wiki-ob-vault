---
title: Unity OpenAI-API Integration
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, game-engine, open-source]
sources: [raw/articles/ai-game-devtools/unity-openai-api-integration.md]
---

# Unity OpenAI-API Integration

Integrates OpenAI GPT-3 / ChatGPT API into a Unity project for natural language processing capabilities in games.

## Overview

A lightweight Unity package that provides direct API access to OpenAI's language models. Simple, self-contained MonoBehaviour scripts for text generation, vision, and text-to-speech.

## Features

- **NPC Creation**: Create AI-powered NPCs that respond to player input
- **AI Chatbot**: In-game conversational AI using GPT-3/ChatGPT
- **Vision Support**: GPT-4 Vision API integration for image understanding
- **Text-to-Speech**: OpenAI TTS integration for voice synthesis
- **Customizable Tools**: Scripts easily modifiable per game needs

## Technical Details

### Architecture
Direct API integration — no abstraction layer or SDK wrapper. Each script is a self-contained `MonoBehaviour`:

| Script | Endpoint | Model |
|--------|----------|-------|
| `AIVision.cs` | `/v1/chat/completions` | `gpt-4-vision-preview` |
| `TextToSpeech.cs` | `/v1/audio/speech` | `tts-1` |

### Communication
- Uses `UnityWebRequest` for HTTP POST requests
- Bearer token authentication (`apiKey` field)
- JSON payload via `JsonUtility.ToJson()`
- No external dependencies beyond Unity stdlib

### Requirements
- Unity 2022.2+
- OpenAI API key (https://beta.openai.com/account/api-keys)
- TextMeshPro (included via package)

## Related Links

- [GitHub](https://github.com/himanshuskyrockets/Unity_OpenAI)
- Author: [@himanshuskyrockets](https://github.com/himanshuskyrockets)

## Comparison

| Feature | This Project | [[llmunity]] | [[chatgpt-api-unity]] |
|---------|-------------|--------------|----------------------|
| Abstraction | None (direct API) | High-level SDK | Middleware layer |
| Models | GPT-3, GPT-4 Vision, TTS | Llama variants | ChatGPT only |
| Unity Version | 2022.2+ | Various | Various |
| Active Development | Stalled (author API credits expired) | Active | Active |
| License | Not stated | MIT | Not stated |
