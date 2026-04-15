# Buffer of Thoughts (BoT)

> **Source:** https://github.com/YangLing0818/buffer-of-thought-llm
> **Cloned:** 2026-04-15
> **License:** MIT

## Project Overview

**Buffer of Thoughts (BoT)** is a thought-augmented reasoning framework for LLMs that stores reusable thought-templates in a "meta-buffer" and retrieves relevant templates to solve new problems. Published at **NeurIPS 2024 Spotlight**. Affiliation: Peking University, UC Berkeley, Stanford University.

## Architecture

### Core Components

- **Meta Buffer**: RAG-based storage for distilled thought-templates. Built on LightRAG with vector retrieval.
- **Buffer Manager**: Dynamically updates the meta-buffer as new tasks are solved, ensuring scalability.
- **Thought Distillation**: Distills high-level reasoning patterns from problem-solution pairs into reusable templates.

### Key Files

| File | Purpose |
|------|---------|
| `bot_pipeline.py` | Main BoT pipeline — distillation → retrieval → instantiation → reasoning |
| `meta_buffer.py` | MetaBuffer class wrapping LightRAG for template storage/retrieval |
| `meta_buffer_utilis.py` | Utility prompts for distillation and code extraction |
| `run_benchmarks.py` | Evaluation on Game of 24, Checkmate-in-One, Word Sorting |
| `inference.py` | Quick inference script for math problems (GSM8K) |

### Pipeline Flow

1. **Problem Distillation** — Extract key information from user problem via LLM
2. **Buffer Retrieve** — Retrieve relevant thought-template from meta-buffer (via LightRAG hybrid search)
3. **Buffer Instantiation** — Adapt template to the specific problem
4. **Reasoner Instantiation** — Execute the instantiated reasoning; extract and run code if needed
5. **Buffer Manager** — Distill new thought from problem-solution pair; update meta-buffer if sufficiently novel

### Dependencies

Python 3.9, PyTorch, Transformers, LightRAG, OpenAI API (or local LLM via HuggingFace), chess (python-chess), accelerate, bitsandbytes, etc.

## Performance

BoT significantly outperforms Tree of Thoughts (ToT), PAL, and GPT-4 on reasoning benchmarks:

| Task | GPT-4 | PAL | ToT | Meta Prompting | **BoT** |
|------|-------|-----|-----|---------------|---------|
| Game of 24 | 3.0 | 64.0 | 74.0 | 67.0 | **82.4** |
| MGSM (avg) | 84.4 | 72.0 | 86.4 | 84.8 | **89.2** |
| Multi-Step Arithmetic | 84.0 | 87.4 | 88.2 | 90.0 | **99.8** |
| Word Sorting | 80.4 | 93.2 | 96.4 | 99.6 | **100.0** |
| Python Puzzles | 31.1 | 47.3 | 43.5 | 45.8 | **52.4** |
| Geometric Shapes | 52.6 | 51.2 | 56.8 | 78.2 | **93.6** |
| Checkmate-in-One | 36.4 | 10.8 | 49.2 | 57.0 | **86.4** |

Key finding: **Llama3-8B + BoT can surpass Llama3-70B**. Only **12% of the cost** of multi-query prompting methods (ToT/graph).

## BibTeX

```bibtex
@article{yang2024buffer,
  title={Buffer of Thoughts: Thought-Augmented Reasoning with Large Language Models},
  author={Yang, Ling and Yu, Zhaochen and Zhang, Tianjun and Cao, Shiyi and Xu, Minkai and Zhang, Wentao and Gonzalez, Joseph E and Cui, Bin},
  journal={Advances in Neural Information Processing Systems},
  year={2024}
}
```

## Follow-up Work

- **ReasonFlux-PRM (2025.6)**: Trajectory-aware process reward models built on BoT, supporting offline/online reward supervision and RL optimization.
- **ReasonFlux-F1 (2025.3)**: SOTA reasoning LLMs (32B/14B/7B) trained with template-augmented reasoning trajectories.
- **SuperCorrect (2024.10)**: Self-correction LLM reasoning framework based on BoT. SupperCorrect-7B achieves SOTA on MATH/GSM8K among 7B models.
