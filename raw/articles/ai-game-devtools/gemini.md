# Gemini — Google DeepMind

> Source: https://deepmind.google/technologies/gemini/
> Captured: 2026-04-26

## Official Page Summary

**Gemini** is Google's flagship multimodal AI model family, developed by Google DeepMind. The current latest generation is **Gemini 3** (as of April 2026).

### Current Gemini 3 Family

From the official deepmind.google/technologies/gemini/ page:

- **Gemini 3.1 Flash-Lite**: Best for high-volume tasks that need efficiency and intelligence
- **Gemini 3.1 Pro**: Best for complex tasks and bringing creative concepts to life
- **Gemini 3 Flash**: Our latest Gemini 3 model that helps you bring any idea to life — faster

The page tagline: *"Our most intelligent AI model that brings any idea to life."*

### Historical Model Family

#### Gemini 1.0 (December 2023)
First announced at Google I/O 2023, released December 6, 2023:
- **Gemini Ultra**: Largest, most capable model
- **Gemini Pro**: Mid-range model for general tasks
- **Gemini Nano**: On-device/edge deployment (1.8B / 3.25B params)

Gemini was trained on Google's TPU v5p system ("Cloud TPU v5p"), achieving state-of-the-art on MMLU (Massive Multitask Language Understanding).

#### Gemini 2.0 (2024–2025)
- Gemini 2.0 Flash, Flash-Lite, Flash Thinking Experimental, Pro Experimental
- Gemini 2.0 Pro Experimental: flagship version

#### Gemini 3.0 (2025–2026)
- Gemini 3 Flash-Lite, Pro, Flash
- Context window: up to 2 million tokens (Gemini 3.1 Pro)
- Multimodal capabilities: text, images, code, audio, video understanding

## Key Facts

| Item | Detail |
|------|--------|
| Developer | Google DeepMind |
| Type | Proprietary multimodal LLM API service |
| Current Generation | Gemini 3 (April 2026) |
| Context Window | Up to 2M tokens (Gemini 3.1 Pro) |
| Training Infrastructure | Google TPU v5p |
| Website | deepmind.google/technologies/gemini |
| Access | Google AI Studio, Gemini website, API |

## Game Development Relevance

Gemini can power game development through:
- **NPC dialogue generation**: Long context (2M tokens) allows embedding game world lore for consistent dialogue
- **Game design assistants**: Code generation, game mechanic brainstorming
- **Content creation pipelines**: Story generation, quest design, asset description
- **Developer tooling**: Integrated via Google AI API into game engines

## Integration Patterns

- Unity: Via REST API calls to `generativelanguage.googleapis.com`
- Unreal: HTTP requests or Python integration layer
- Web games: Direct browser API calls via `@google/generative-ai-js`
- No official open-source inference engine (unlike [[Gemma]] which is open-weight)

## Related Links

- Official: https://deepmind.google/technologies/gemini/
- AI Studio: https://aistudio.google.com/
- Gemini Website: https://gemini.google/
- API Docs: https://ai.google.dev/

## See Also

- [[ai-game-devtools/gemma]] — Google's open-weight model family derived from Gemini research
- [[ai-game-devtools/gemma-cpp]] — C++ inference engine for Gemma models
- [[ai-game-devtools/mini-gemini]] — Open-source VLM series inspired by Gemini architecture
