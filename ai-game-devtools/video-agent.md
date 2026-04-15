---
title: VideoAgent
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, agent, video-understanding, reid, tracking, eccv2024]
sources: [raw/articles/ai-game-devtools/video-agent.md]
---

# VideoAgent

> ECCV 2024 — A memory-augmented multimodal agent for video understanding.

## Overview

VideoAgent answers free-form questions about input videos using a two-phase architecture: **memory construction** (extract and store structured information) and **inference** (LLM-driven tool use over the memory). Unlike end-to-end video LLMs, VideoAgent composes specialized models (captioning, tracking, re-identification, VQA) through a LangChain ReAct agent.

## Architecture

VideoAgent has two distinct phases:

### Memory Construction Phase

Structured information is extracted from the raw video and stored in two memory layers:

| Memory Layer | Content | Model |
|---|---|---|
| Temporal Memory | Segment captions, visual embeddings, textual embeddings | BLIP-2 captioning, ViCLIP (InternVid-10M) |
| Object Memory | Bounding boxes, ReID features, tracking IDs per frame | ByteTrack, ReID model |

Outputs stored in `preprocess/<video_name>/`:
- `captions.json` — per-segment captions
- `segment_visual_embedding.pkl` / `segment_textual_embedding.pkl`
- `tracking.pkl`, `reid.pkl`, `tid2clip.pkl`, `uid2clip.pkl`
- `reid.mp4` — annotated replay video

### Inference Phase

A LangChain ReAct agent (GPT-4o via Azure) selects and calls tools to answer questions:

```
caption_retrieval(start, end) → captions for segment range
segment_localization(desc)     → top-5 segments (18×visual + 11×textual cosine ensemble)
visual_question_answering(q, sid) → VQA via Video-LLaVA or GPT-4V
object_memory_querying         → SQL / open-vocabulary retrieval from object memory
```

The agent runs a loop: observe → think → act → until a `Final Answer` is produced.

## Key Design Choices

- **Hybrid memory** — temporal (segment-level) + object (frame-level with tracking/ReID) enables both high-level comprehension and fine-grained object queries
- **Tool composition** — ReAct agent orchestrates 4 tool types rather than a single VLM; allows complex multi-step reasoning
- **Dual VQA backend** — Video-LLaVA (local, efficient) or GPT-4V (API, higher quality) configurable via `config/default.yaml`
- **Ensemble segment localization** — combines visual (ViCLIP) and textual (OpenAI embedding-3-large) similarity with weighted scoring

## Technical Stack

| Component | Technology |
|---|---|
| Agent framework | LangChain ReAct |
| LLM | Azure OpenAI GPT-4o |
| Video captioning | BLIP-2 style |
| Visual features | ViCLIP (InternVid-10M-FLT) |
| Object tracking | ByteTrack |
| Object re-ID | ReID model |
| Embeddings | OpenAI `text-embedding-3-large` |
| Object DB | SQLite |
| VQA (local) | Video-LLaVA |
| VQA (API) | GPT-4V |
| Demo UI | Gradio |

## Game Engine Relevance

VideoAgent is a **research tool**, not a game engine plugin. Potential game uses:

- **NPC video understanding** — feed gameplay footage to answer "what is the player doing?" questions
- **Game replay analysis** — automatic QA on recorded gameplay
- **Training data generation** — use the agent to generate question-answer pairs from game videos for training game-AI

## Related

- [[ai-game-devtools/pllava]] — PLLaVA uses Video-LLaVA as its base VLM (same VQA backend as VideoAgent)
- [[ai-game-devtools/cambrian-1]] — Cambrian-1 is a VLM benchmark suite for video understanding
- [[ai-game-devtools/video-llava]] — Video-LLaVA: unified video-language representation (direct dependency of VideoAgent)
- [[ai-game-devtools/internvid]] — InternVid video dataset used for ViCLIP pretraining

## Links

- Paper: https://videoagent.github.io/
- GitHub: https://github.com/YueFan1014/VideoAgent
- Models: https://zenodo.org/records/11031717
