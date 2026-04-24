# Mixture-of-Agents (MoA)

Source: https://github.com/togethercomputer/MoA
License: Apache 2.0
Paper: arXiv:2406.04692

## Overview

Mixture of Agents (MoA) is a novel approach that leverages the collective strengths of multiple LLMs to enhance performance, achieving state-of-the-art results. By employing a layered architecture where each layer comprises several LLM agents, **MoA significantly outperforms GPT-4 Omni's 57.5% on AlpacaEval 2.0 with a score of 65.1%**, using only open-source models.

## Core Architecture

- **Layered Design**: Multiple layers of LLM agents. Each layer contains several reference models that process the input.
- **Aggregation**: An aggregator model synthesizes responses from reference models into a single high-quality output.
- **Iterative Refinement**: Multiple rounds (layers) can be used, where outputs from one layer feed into the next.
- **No Training Required**: Pure inference-time enhancement — no model fine-tuning needed.

## Quickstart (50 LOC)

File: `moa.py`
- Uses Together AI API (`together` Python library)
- 2 layers: 4 reference models + 1 aggregator
- Reference models: Llama-3.3-70B, Qwen2.5-72B, Qwen2.5-Coder-32B, WizardLM-2-8x22B
- Aggregator: Qwen2.5-72B
- Async parallel execution via `asyncio.gather()`

## Advanced Example (3+ Layers)

File: `advanced-moa.py`
- Configurable `layers` variable (default 3)
- Each intermediate layer feeds previous responses as context
- Uses `getFinalSystemPrompt()` to construct synthesis prompts

## Interactive CLI Demo

File: `bot.py`
- Rich CLI interface with multi-turn support
- Configurable: `--aggregator`, `--reference_models`, `--temperature`, `--max_tokens`, `--rounds`, `--multi_turn`
- Default references: Qwen2-72B, Qwen1.5-72B, Mixtral-8x22B, DBRX

## Key Files

| File | Description |
|------|-------------|
| `moa.py` | Minimal 50-line implementation |
| `advanced-moa.py` | Multi-layer (3+) example |
| `bot.py` | Interactive CLI demo |
| `utils.py` | Helper functions for generation |
| `tests.py` | Test suite |

## Evaluation Results

- **AlpacaEval 2.0**: 65.1% (vs GPT-4 Omni 57.5%)
- **MT-Bench**: Top position on leaderboard
- **FLASK**: Outperforms Qwen1.5-110B-Chat on harmlessness, robustness, correctness, efficiency, factuality, commonsense, insightfulness, completeness. Also outperforms GPT-4 Omni on correctness, factuality, insightfulness, completeness, metacognition.

## Dependencies

- `together` (Together AI API client)
- `asyncio` for parallel LLM calls
- `datasets`, `typer`, `rich` for CLI demo
- AlpacaEval, MT-Bench, FLASK for evaluation
