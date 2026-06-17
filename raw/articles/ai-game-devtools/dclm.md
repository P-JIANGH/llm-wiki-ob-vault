# DCLM (DataComp-LM)

## Source
- **URL:** https://github.com/mlfoundations/dclm
- **License:** Apache 2.0 / MIT (varies by component)
- **Date:** 2024-2026

## Overview
DCLM is a comprehensive framework for building and training large language models (LLMs) with diverse datasets. It provides a standardized corpus of 300T+ unfiltered tokens from CommonCrawl, pretraining recipes based on the open_lm framework, and an extensive suite of 50+ evaluations.

## Key Components

### Data Processing Pipeline
- **Ray-based filtering/cleaning** — distributed pipeline for local operations (filtering, text extraction)
- **Rust-based deduplication** — BFF (dedup/bff) for inter-document fuzzy deduplication
- **fastText classifier** — OH2.5 + ELI5 filter for quality filtering

### Tokenization & Shuffling
- **Rust-based tokashuf** (recommended) — single-machine, efficient; located in `rust_processing/tokshuf-rs`
- **Ray-based** — for datasets too large for single machine
- Output: WebDataset format with manifest.jsonl

### Model Training
- Built on **open_lm** framework
- Supports scales: 400M-1x, 1B-1x, 3B-1x, 7B-1x, 7B-2x
- Training via `torchrun` with fixed hyperparameters per scale
- Supports `torchcompile` for speed optimization

### Model Evaluation
- 50+ downstream tasks (MMLU, Core set, Extended set)
- Eval YAML configs in `eval/` folder
- Two methods: expdb UUID-based (preferred) or direct checkpoint path
- Submission via PR to leaderboard at datacomp.ai

## Architecture
```
Raw Sources → Ray Processing (filtering) → Rust Dedup → Tokenize/Shuffle → Model Training → Evaluation
```

## Key Files
- `ray_processing/process.py` — main entry for distributed data filtering
- `baselines/core/processor.py` — processing pipeline core
- `training/train.py` — model training entry point
- `eval/eval_openlm_ckpt.py` — evaluation script
- `tools/eval_expdb.py` — preferred evaluation via experiment database
- `dedup/` — Rust deduplication tools

## Datasets
- **DCLM-Pool** — raw CommonCrawl, text-extracted only
- **DCLM-RefinedWeb** — processed without final fastText filter
- **DCLM-BASELINE** — fully processed dataset (~2.6T tokens for 7B model)
- Available on HuggingFace and CommonCrawl S3

## Notable Results
| Model | Params | Tokens | CORE (v2) | MMLU |
|-------|--------|--------|-----------|------|
| DCLM-BASELINE | 7B | 2.6T | 56.0 | 63.7 |
| Phi-3 | 7B | ? | 59.9 | 69.9 |
| MAP-Neo | 7B | 4.5T | 49.0 | 57.1 |
| Llama3 | 8B | 15T | 56.5 | 66.2 |

## Related
- OpenLM (training framework dependency)
- CommonCrawl (data source)
- Ray (distributed processing)
- fastText (quality classification)
