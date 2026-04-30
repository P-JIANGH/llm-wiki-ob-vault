---
title: Video-MME
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [benchmark, multimodal, video, evaluation]
sources: [raw/articles/ai-game-devtools/video-mme.md]
---

# Video-MME

## Overview

**Video-MME** (Multi-modal Evaluation) is the first-ever comprehensive evaluation benchmark for Multi-modal Large Language Models (MLLMs) in video analysis. Accepted to **CVPR 2025**. It has become an industry-standard benchmark — adopted by **Gemini 2.5 Pro**, **Gemini 3 Pro**, **GPT-4.1**, and **GPT-5** as their video understanding benchmark.

## Key Facts

| Fact | Value |
|------|-------|
| Videos | 900 videos, 254 hours total |
| Annotations | 2,700 human-annotated Q&A pairs |
| Duration range | 11 seconds to 1 hour |
| Duration categories | Short (<2min), Medium (4-15min), Long (30-60min) |
| Visual domains | 6 primary: Knowledge, Film & Television, Sports Competition, Life Record, Multilingual |
| Subfields | 30 sub-categories |
| Modalities | Video frames + subtitles + audio |
| Data source | All newly collected, no existing dataset reuse |
| License | Research only — no commercial use |

## Architecture / Evaluation Design

Video-MME evaluates MLLMs across four dimensions:

1. **Temporal duration** — short, medium, and long-form video (11s to 60min)
2. **Domain diversity** — 6 domains × 30 subfields for broad generalization
3. **Multi-modal breadth** — video-only, video+subtitles, video+audio settings
4. **Task types** — Counting Problem, Information Synopsis, etc.

Evaluation uses **multiple-choice Q&A** (A/B/C/D), with a model prompt format that includes subtitles when available. Evaluation code is third-party-model-free (no ChatGPT used in scoring).

## Performance Results

| Model | Video-MME Score | Notes |
|-------|----------------|-------|
| Gemini 2.5 Pro | 84.8% | State-of-the-art at release |
| GPT-4o (384 frames) | 71.9% | 512×512 resolution |
| Gemini 1.5 Pro | varies by duration | Analyzed by duration/subtype |

## Related Links

- **Paper**: [arXiv:2405.21075](https://arxiv.org/pdf/2405.21075)
- **Project Page**: [video-mme.github.io](https://video-mme.github.io/)
- **Dataset**: [HuggingFace lmms-lab/Video-MME](https://huggingface.co/datasets/lmms-lab/Video-MME)
- **Leaderboard**: [video-mme.github.io/home_page.html](https://video-mme.github.io/home_page.html#leaderboard)

## Related Benchmarks & Models

- [[longva]] — LongVA (7B) achieves **Video-MME 7B SOTA**, demonstrating that long video understanding can transfer zero-shot from long text context
- [[video-ccam]] — Tencent's video-language MLLM (14B), scores 57.4% on Video-MME with subtitles
- [[video-llama-3]] — DAMO-NLP-SG's latest video-language model, evaluated on Video-MME
- [[cambrian-1]] — NYU/FAIR VLM benchmark (8B/13B/34B), another comprehensive VLM evaluation benchmark
- [[sapiens]] — Meta human vision foundation models, shares benchmark authorship overlap

## Related Evaluation Tools

- [[video-agent]] — Temporal+Object dual memory multimodal agent; uses Video-MME for video understanding evaluation
- [VLMEvalKit](https://github.com/open-compass/VLMEvalKit) — Official evaluation toolkit for Video-MME
- [LMMs-Eval](https://github.com/EvolvingLMMs-Lab/lmms-eval) — Alternative evaluation toolkit for Video-MME

## Citation

```bibtex
@inproceedings{fu2025video,
  title={Video-mme: The first-ever comprehensive evaluation benchmark of multi-modal llms in video analysis},
  author={Fu, Chaoyou and Dai, Yuhan and Luo, Yongdong and Li, Lei and Ren, Shuhuai and others},
  booktitle={CVPR}, year={2025}
}
```
