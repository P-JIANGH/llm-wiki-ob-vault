---
title: AI Scientist
created: 2026-04-12
updated: 2026-04-12
type: entity
tags: [llm, autonomous-agent, scientific-discovery, code-execution, tool, open-source]
sources: [raw/articles/ai-game-devtools/ai-scientist.md]
---

# AI Scientist

## Overview

**The AI Scientist** (by [SakanaAI](https://sakana.ai)) is the first fully automated scientific discovery system — an LLM-powered agent that conducts independent research: generating ideas, writing and executing code, producing plots, writing LaTeX papers, and even performing peer review.

## Key Facts

| | |
|---|---|
| **GitHub** | https://github.com/SakanaAI/AI-Scientist |
| **Paper** | arXiv:2408.06292 (2024) |
| **License** | AI Scientist Source Code License |
| **Language** | Python |
| **Core Dependencies** | PyTorch, Anthropic, OpenAI, Aider, Transformers |

## What It Does

The system takes a **template** (domain-specific experiment scaffold) and a **foundation model**, then autonomously:

1. **Generates ideas** — proposes novel research directions from seed ideas + template code
2. **Checks novelty** — queries Semantic Scholar / OpenAlex for prior work
3. **Writes code** — LLM modifies `experiment.py` with the new idea (via Aider)
4. **Runs experiments** — executes code, logs train/val metrics to JSON
5. **Produces plots** — runs `plot.py` to visualize results
6. **Writes paper** — generates a full LaTeX paper with abstract, methods, results, citations
7. **Reviews paper** — (optional) LLM peer review with scores and accept/reject

## Templates

| Template | Domain | Status |
|---|---|---|
| **NanoGPT** | Transformer autoregressive modeling (enwik8, shakespeare, text8) | Built-in |
| **2D Diffusion** | Low-dimensional diffusion model improvement | Built-in |
| **Grokking** | Neural network generalization & learning speed | Built-in |
| SEIR, MobileNetV3, Sketch RNN, MACE, TensorRF, LLM probes | Community templates | External PRs |

## Supported Models

- **Best results:** Claude 3.5 Sonnet (highest success rate)
- **Most cost-effective:** DeepSeek Coder V2 (~$15/paper with Claude)
- **Also supported:** GPT-4o, GPT-4.1, o1/o3/o4 family, Gemini 1.5/2.0, Llama 3.1 405B, via API / Amazon Bedrock / Vertex AI

## Architecture

| Module | Role |
|---|---|
| `ai_scientist/llm.py` | Unified LLM API layer (OpenAI, Anthropic, DeepSeek, Gemini, Bedrock, Vertex) |
| `ai_scientist/generate_ideas.py` | Idea generation + literature search |
| `ai_scientist/perform_experiments.py` | Code execution + result logging |
| `ai_scientist/perform_writeup.py` | LaTeX paper generation |
| `ai_scientist/perform_review.py` | LLM peer review |
| `launch_scientist.py` | Main orchestration entry point |
| `templates/*/experiment.py` | Domain-specific experiment runner |
| `templates/*/plot.py` | Visualization script |
| `templates/*/prompt.json` | Template instructions for LLM |

## Safety

⚠️ **Executes LLM-written code** — must containerize (Docker provided) and restrict web access. The license requires prominent AI disclosure in any generated papers.

## Comparison to Related Tools

| Tool | Focus | Autonomy |
|---|---|---|
| [[AutoGPT]] | General-purpose autonomous agents | Task execution, no paper writing |
| [[BabyAGI]] | Task-driven autonomous agents | Task decomposition, no research |
| [[MetaGPT]] | Multi-agent software development | Software SWE-bench style, no paper writing |
| **AI Scientist** | **End-to-end scientific research pipeline** | **Ideas → code → experiments → paper → review** |

## Relationship to Game Development

While not game-specific, the system is relevant to AI game devtools in that it demonstrates **LLM-driven automated experimentation** — a pattern applicable to game AI research (e.g., auto-generating game mechanics, balance tuning, NPC behavior experiments). The same template-based architecture could inspire game content generation pipelines.

## See Also

- [[autoresearch]] — Karpathy's LLM-driven research framework (similar pattern)
- [[agentgpt]] — general autonomous agent platform
- [[aios]] — AI agent operating system with LLM kernel abstraction
