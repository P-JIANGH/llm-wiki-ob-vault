---
title: DCLM (DataComp-LM)
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, tool, training, dataset, open-source]
sources: [raw/articles/ai-game-devtools/dclm.md]
---

# DCLM (DataComp-LM)

## Overview

**DCLM** (DataComp-LM) is a comprehensive framework for building and training large language models with diverse datasets. Developed by MLFoundations, it provides a standardized corpus of 300T+ unfiltered tokens from CommonCrawl, pretraining recipes based on the `openlm` framework, and an extensive evaluation suite of 50+ downstream tasks.

Paper: [arXiv:2406.11794](https://arxiv.org/abs/2406.11794) | Leaderboard: [datacomp.ai/dclm](https://datacomp.ai/dclm/leaderboard)

## Key Facts

| Property | Value |
|----------|-------|
| Organization | MLFoundations |
| License | Apache 2.0 / MIT |
| Language | Python, Rust |
| Compute Scales | 400M, 1B, 3B, 7B |
| Dataset Size | 300T+ tokens (DCLM-Pool) |
| DCLM-BASELINE | ~2.6T tokens for 7B model |

## Architecture

```
Raw Sources (CommonCrawl)
  → Ray Processing (filtering/cleaning)
  → Rust BFF Deduplication
  → Tokenize/Shuffle (Rust tokashuf-rs)
  → Model Training (open_lm)
  → Evaluation (50+ tasks)
```

**Key components:**
- **Ray-based filtering** — distributed pipeline (`ray_processing/process.py`)
- **Rust dedup** — BFF fuzzy deduplication (`dedup/bff/`)
- **Rust tokashuf** — tokenization + shuffling (`rust_processing/tokshuf-rs/`)
- **Training** — `torchrun` + open_lm configs in `training/configs/`
- **Evaluation** — YAML-based task definitions in `eval/`

## Datasets

- **DCLM-Pool** — raw CommonCrawl, text-extracted only (resiliparse)
- **DCLM-RefinedWeb** — processed without final fastText filter
- **DCLM-BASELINE** — fully processed, available on `HuggingFace datasets`

## Performance Results (7B models, CORE v2)

| Model | Tokens | CORE | MMLU |
|-------|--------|------|------|
| DCLM-BASELINE | 2.6T | 56.0 | 63.7 |
| Phi-3 | ? | 59.9 | 69.9 |
| MAP-Neo | 4.5T | 49.0 | 57.1 |
| Llama3 | 15T | 56.5 | 66.2 |

## Relationship to Other Tools

DCLM is related to [[corenet]] (Apple's training library) as both are LLM training frameworks, and to [[cosmos]] (NVIDIA's world models) as both target large-scale model training pipelines. Unlike game-specific tools, DCLM is a general LLM infrastructure framework that could power game AI training pipelines.

## License

Apache 2.0 (varies by component — check individual files)
