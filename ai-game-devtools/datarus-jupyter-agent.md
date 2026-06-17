---
title: Datarus Jupyter Agent
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, tool, python, docker]
sources: [raw/articles/ai-game-devtools/datarus-jupyter-agent.md]
---

# Datarus Jupyter Agent

An autonomous data science agent powered by `Datarus-R1-14B-Preview`, a 14B parameter model fine-tuned from `Qwen-2.5-14B-Instruct`. Executes complex analytical workflows with step-by-step reasoning, automatic error recovery, and Jupyter notebook integration inside isolated Docker containers.

## Overview

The agent receives a data analysis task (via CLI query or structured JSON challenge), spins up a Docker container with Jupyter, then iteratively drives a reasoning loop where the model generates code cells and the pipeline executes them, feeding results back until a final answer is synthesized.

**Key claims (self-reported):** 30% higher accuracy on AIME 2024/2025 and LiveCodeBench; 18–49% fewer tokens emitted vs comparable 14B models.

## Architecture

### Components

- **DatarusAgent** — orchestrates the reasoning pipeline; formats messages for the LLM, parses XML-tagged responses (`<step>`, `<thought>`, `<action>`, `<stop_analysis>`), manages retry logic on execution errors.
- **NotebookManager** — handles Docker container lifecycle and Jupyter kernel communication via `jupyter_client`; executes code cells, captures output/errors, persists notebooks.
- **ConfigLoader** — merges YAML config with environment variables.
- **ConsoleLogger** — rich terminal output with color-coded step visualization.

### Dual Reasoning Modes

| Mode | Tag | Use Case |
|------|-----|----------|
| Agentic (ReAct) | `<step><thought>...</thought><action>...</action></step>` | Interactive, iterative analysis |
| Reflection (CoT) | `<stop_analysis><answer>...</answer></stop_analysis>` | Final synthesis and conclusions |

### Execution Flow

1. **Query reception** — CLI argument or JSON challenge file
2. **Environment setup** — Docker container with Jupyter launched
3. **Step planning** — model decomposes task into reasoned steps
4. **Iterative execution** — each step: model outputs thought+code → pipeline runs it → results fed back
5. **Error recovery** — automatic retry with error context
6. **Result synthesis** — `<stop_analysis>` block with answer compiled from all steps

## Technical Stack

- **Model:** Datarus-R1-14B-Preview (served via vLLM)
- **Execution:** Docker containers + Jupyter kernels (`jupyter-client`)
- **Python libs:** pandas, numpy, scikit-learn, matplotlib, seaborn, scipy, imbalanced-learn
- **Config:** YAML + `.env` environment variables

## Comparison to Similar Agents

Unlike general-purpose agents ([[Auto-GPT]], [[AgentGPT]]) that operate on the file system and browser, Datarus is specialized for structured data analysis — it receives a dataset, runs exploratory analysis, builds models, and outputs a Jupyter notebook. It is similar in spirit to [[ChatDev]]'s collaborative multi-agent pattern but focused on single-agent data science pipelines rather than software engineering.

## Related Links

- GitHub: https://github.com/DatarusAI/Datarus-JupyterAgent
- HuggingFace: https://huggingface.co/DatarusAI/Datarus-R1-14B-preview
- Website: https://datarus.ai
- Demo: https://chat.datarus.ai
