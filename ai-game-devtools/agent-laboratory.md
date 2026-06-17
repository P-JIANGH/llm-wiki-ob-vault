---
title: Agent Laboratory
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [llm, agent, research, autonomous, open-source, game]
sources: [raw/articles/ai-game-devtools/agent-laboratory.md]
aliases: ["AgentLaboratory"]

---

# Agent Laboratory

An end-to-end autonomous research workflow that uses LLM agents as research assistants, covering the full research pipeline from literature review to report writing.

## Overview

Agent Laboratory drives specialized LLM agents through four sequential phases:

1. **Literature Review** — autonomous arXiv paper search, retrieval, and analysis
2. **Plan Formulation** — collaborative research planning based on reviewed literature
3. **Experimentation** — data preparation and experiment execution
4. **Report Writing** — comprehensive LaTeX report generation (optional PDF compilation)

The system is designed to complement human creativity rather than replace it, automating repetitive tasks (coding, documentation) while the researcher focuses on ideation and critical thinking.

### AgentRxiv

Notable extension: **AgentRxiv** — a framework where autonomous research agents can upload, retrieve, and build on each other's published research. Enables cumulative research progress where agents inherit and extend prior agent findings without starting from scratch.

## Technical Details

### Architecture

- `ai_lab_repo.py` — `LaboratoryWorkflow` class, 4-phase orchestration, checkpoint/resume via `state_saves/`
- `agents.py` — agent role definitions; `get_score()` LLM-as-reviewer for research quality evaluation
- `papersolver.py` — arXiv paper retrieval and summarization
- `mlesolver.py` — MLE (Machine Learning Engineering) experiment execution solver
- `tools.py` — external tool integrations: arXiv, Hugging Face, Python REPL, LaTeX
- `inference.py` — LLM inference via OpenAI API

### Supported Models

| Provider | Models |
|----------|--------|
| OpenAI | o1, o1-preview, o1-mini, gpt-4o, o3-mini |
| DeepSeek | deepseek-chat (deepseek-v3) |

Per-phase model selection via `--llm-backend` flag or YAML config dict.

### Key Features

- **Checkpoint/resume** — all progress saved to `state_saves/`, resumable on failure or interruption
- **Co-pilot mode** — human-in-the-loop flag for collaborative research
- **Multi-language** — supports English, Chinese, Japanese, Korean, and 10+ other languages
- **LaTeX PDF compilation** — optional via `--compile-latex` flag or `pdflatex` system install
- **Configurable compute budget** — per-phase step limits and paper counts

## Game Development Relevance

Agent Laboratory can automate game AI research workflows: literature review on reinforcement learning papers, automated experiment pipelines for game-playing agents, and report generation for research findings. Integrates with [[chatdev]] (OpenBMB multi-agent platform) and [[aios]] (LLM Agent OS) as conceptually related autonomous agent systems.

Also relevant to [[open-deep-research]] (deep research agents) and [[autoresearch]] (Karpathy's autonomous research loop).

## License

MIT License

## Links

- GitHub: https://github.com/SamuelSchmidgall/AgentLaboratory
- Paper: https://arxiv.org/abs/2501.04227
- Website: https://agentlaboratory.github.io/
- AgentRxiv: https://agentrxiv.github.io/
