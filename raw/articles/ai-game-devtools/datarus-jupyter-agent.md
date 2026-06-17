# Datarus Jupyter Agent — Source

**Project:** Datarus-R1 Jupyter Agent  
**URL:** https://github.com/DatarusAI/Datarus-JupyterAgent  
**License:** Apache 2.0  
**Date ingested:** 2026-04-15

---

## Overview

A multi-step reasoning pipeline powered by Datarus-R1-14B-Preview model (fine-tuned from Qwen 2.5-14B-Instruct), designed for complex data science and analysis tasks. Provides step-by-step reasoning, automatic error recovery, and Jupyter notebook integration within isolated Docker containers.

**Benchmark claims:** 30% higher accuracy on AIME 2024/2025 and LiveCodeBench vs similar-size models; emits 18–49% fewer tokens.

---

## Architecture

### Core Components

| Component | File | Role |
|-----------|------|------|
| DatarusAgent | `src/core/agent.py` | Main orchestration; handles LLM communication, response parsing, error recovery |
| NotebookManager | `src/core/notebook_manager.py` | Docker/Jupyter lifecycle; executes code cells via jupyter_client |
| ConsoleLogger | `src/utils/logger.py` | Rich terminal output with syntax highlighting |
| ConfigLoader | `src/utils/config_loader.py` | YAML config + env var merging |

### Execution Flow

1. Query Reception → optionally from a JSON challenge file
2. Environment Setup → initializes Docker container with Jupyter
3. Step Planning → Datarus model breaks down task into `<step>` blocks
4. Iterative Execution → each step: model generates `<thought>` + `<action>`, pipeline executes code, results fed back
5. Error Handling → automatic retry on errors with context
6. Result Synthesis → final `<stop_analysis>` / `<answer>` block compiled

### Dual Reasoning Modes

- **Agentic Mode (ReAct):** `<step><thought>...</thought><action>...</action></step>` — interactive, step-by-step
- **Reflection Mode (CoT):** `<stop_analysis><answer>...</answer></stop_analysis>` — final synthesis

---

## Dependencies

```
docker>=6.0.0, requests>=2.28.0, numpy>=1.24.0, pandas>=2.0.0,
matplotlib>=3.6.0, seaborn>=0.12.0, scikit-learn>=1.3.0, nbformat>=5.9.0,
rich>=13.5.0, pyyaml>=6.0, python-dotenv>=1.0.0, jupyter-client>=8.0.0,
imbalanced-learn>=0.11.0, scipy>=1.10.0
```

---

## Key Files

```
src/
├── main.py              # CLI entry; parses args, loads config, runs agent
├── core/
│   ├── agent.py         # DatarusAgent: LLM call, XML parsing, retry logic
│   └── notebook_manager.py  # Docker + Jupyter kernel management, code execution
└── utils/
    ├── config_loader.py # YAML + env var config
    └── logger.py        # Rich console output

config/config.yaml       # Server endpoints, model settings
challenges/              # JSON challenge files with scenario + dataset generation code
scripts/setup.sh         # Environment setup
```

---

## Usage

```bash
# Start model server (vLLM)
vllm serve DatarusAI/Datarus-R1-14B-preview

# Run with challenge
python src/main.py --challenge challenges/example_challenge.json

# Run with query
python src/main.py --query "Analyze this dataset and build a predictive model"

# Export notebook
python src/main.py --challenge challenge.json --output-notebook results/analysis.ipynb
```

---

## Challenge JSON Format

```json
{
  "domain": "datascience",
  "scenario": "Description of the analytical scenario",
  "objective": "What to achieve",
  "user_prompt": "Instructions for the model",
  "dataset_generation_code": "Python code to generate/load data",
  "uuid": "unique-id"
}
```
