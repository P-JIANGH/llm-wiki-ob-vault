# GPT-4o — Source

> **Source:** https://openai.com/index/hello-gpt-4o/
> **Retrieved:** 2026-04-26
> **Note:** This is a product announcement page, not a code repository.

## Overview

GPT-4o ("o" for "omni") is OpenAI's new flagship model announced May 13, 2024, capable of reasoning across audio, vision, and text in real time. It accepts any combination of text, audio, image, and video as input and generates any combination of text, audio, and image outputs.

## Key Capabilities

- **Real-time audio response:** Responds to audio inputs in as little as 232ms, with an average of 320ms — similar to human response time in conversation.
- **End-to-end multimodal training:** Single new model trained across text, vision, and audio — all inputs/outputs processed by the same neural network. Before GPT-4o, Voice Mode used a pipeline of 3 separate models (audio→text→LLM→text→audio), losing information like tone, background noises, laughter, singing, and emotional expression.
- **Performance:** Matches GPT-4 Turbo on text in English and code; significant improvement on text in non-English languages.
- **Cost & Speed:** Much faster and 50% cheaper in the API compared to GPT-4 Turbo.
- **Vision & Audio Understanding:** Especially better than existing models in vision and audio understanding.

## Model Capabilities (from demos)

- Two GPT-4os interacting and singing in harmony
- Interview prep with real-time feedback
- Rock Paper Scissors gameplay
- Sarcasm detection
- Math tutoring (Sal and Imran Khan)
- Spanish learning with point-and-learn
- Meeting AI with real-time summarization
- Real-time translation
- Lullaby generation
- Happy Birthday song generation
- Storytelling with robot writer (generating journal entries about seeing the world for the first time)

## Technical Architecture

- **Single end-to-end model** vs. the previous 3-model pipeline:
  - Old: Whisper (audio→text) → GPT-4 (text→text) → vocoder (text→audio)
  - New: GPT-4o — unified model for all modalities
- GPT-4o can output laughter, singing, and express emotion — capabilities that were impossible with the old pipeline

## Comparison with Previous Voice Mode

| Metric | GPT-3.5 Voice Mode | GPT-4 Voice Mode | GPT-4o |
|--------|-------------------|-----------------|--------|
| Latency | 2.8 seconds | 5.4 seconds | 232–320ms |
| Architecture | 3-model pipeline | 3-model pipeline | Single end-to-end |
| Tone awareness | ❌ | ❌ | ✅ |
| Background noise | ❌ | ❌ | ✅ |
| Laughter/singing | ❌ | ❌ | ✅ |
| Emotional expression | ❌ | ❌ | ✅ |

## Safety Evaluation

A risk scorecard was published alongside the model addressing potential harms including:
- Harassment/fairness
- Hate speech
- Sexual/violence
- Drug weapons
- Financial
- Privacy
- Regulatory (P3/C4)
