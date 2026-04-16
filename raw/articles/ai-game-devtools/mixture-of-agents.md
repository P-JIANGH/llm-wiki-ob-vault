# Mixture-of-Agents (MoA) — Raw Source

**Source:** https://github.com/togethercomputer/MoA
**Date:** 2026-04-16
**Paper:** https://arxiv.org/abs/2406.04692

## README Summary

Mixture of Agents (MoA) is a novel approach that leverages the collective strengths of multiple LLMs to enhance performance, achieving state-of-the-art results. By employing a layered architecture where each layer comprises several LLM agents, MoA significantly outperforms GPT-4 Omni's 57.5% on AlpacaEval 2.0 with a score of 65.1%, using only open-source models!

## Architecture

MoA uses a **layered multi-LLM aggregation architecture**:

1. **Layer 1**: Multiple reference LLMs independently respond to the user prompt (parallel via asyncio)
2. **Layer 2+**: Each reference model re-processes, now receiving previous layer's aggregated responses as context
3. **Final Layer**: An aggregator model synthesizes all responses into a single high-quality output

### Quickstart (50 LOC — moa.py)
- Uses Together AI API (async) for parallel LLM calls
- Default: 4 reference models (Llama-3.3-70B, Qwen2.5-72B, Qwen2.5-Coder-32B, WizardLM-2-8x22B)
- Aggregator: Qwen/Qwen2.5-72B-Instruct-Turbo
- System prompt instructs aggregator to critically evaluate and synthesize

### Multi-layer MoA (advanced-moa.py)
- 3+ layers: each round, all reference models re-process with previous responses as context
- Iterative refinement: `layers` parameter controls depth
- Uses `getFinalSystemPrompt()` to inject prior responses into system prompt
- Default aggregator: deepseek-ai/DeepSeek-V3

### Interactive CLI Demo (bot.py)
- Multi-turn chatbot with Typer CLI interface
- Uses `datasets.Dataset` + `Dataset.map()` for parallel processing
- Configurable: --aggregator, --reference_models, --temperature, --max_tokens, --rounds, --multi_turn
- Dependencies: openai, fire, loguru, datasets, typer, rich
- Rich console for formatted output with Markdown rendering

## Evaluation Scripts
- **AlpacaEval 2**: `run_eval_alpaca_eval.sh` — includes modified alpaca_eval submodule
- **MT-Bench**: `run_eval_mt_bench.sh` — includes modified FastChat submodule
- **FLASK**: `run_eval_flask.sh` — fine-grained multi-dimensional evaluation

## Results
- **AlpacaEval 2.0**: 65.1% (MoA) vs 57.5% (GPT-4 Omni) — +7.6% improvement using only open-source models
- **MT-Bench**: Top position on leaderboard
- **FLASK**: Outperforms original Qwen1.5-110B-Chat on harmlessness, robustness, correctness, efficiency, factuality, commonsense, insightfulness, completeness. Also outperforms GPT-4 Omni on correctness, factuality, insightfulness, completeness, metacognition.

## Key Files
- `moa.py` — Core 50-line MoA implementation
- `advanced-moa.py` — Multi-layer (3+) MoA example
- `bot.py` — Interactive CLI demo (Typer + Rich + datasets)
- `utils.py` — Shared generation utilities
- `alpaca_eval/` — Modified AlpacaEval benchmark code (submodule)
- `FastChat/` — Modified FastChat for MT-Bench (submodule)
- `generate_for_*.py` — Benchmark generation scripts
- `eval_mt_bench.py`, `show_mt_bench_result.py` — Evaluation and result display

## Technical Details
- **Framework**: Together AI API (async + sync)
- **Parallelism**: asyncio.gather() for concurrent LLM calls; datasets.Dataset.map() with num_proc for batch processing
- **Rate Limiting**: Exponential backoff retry (1s, 2s, 4s)
- **License**: Apache 2.0
- **Authors**: Junlin Wang, Jue Wang, Ben Athiwaratkun, Ce Zhang, James Zou
- **Paper**: arXiv:2406.04692

## Credits
Models used: Meta AI (Llama 3), Mistral AI (Mixtral), Microsoft (WizardLM 2), Alibaba Cloud (Qwen 1.5), Databricks (DBRX)
Benchmarks: Tatsu Labs (AlpacaEval), LMSYS (MT-Bench), KAIST AI (FLASK)
