---
title: GenAgent / ComfyBench
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, agent, tool, image, game]
sources: [raw/articles/ai-game-devtools/genagent.md]
---

# GenAgent / ComfyBench

## Overview

GenAgent is the reference implementation of **ComfyAgent** — an LLM-based agent that autonomously designs [[stable-diffusion]] workflows in [[ComfyUI]] via natural language instructions. The project also includes **ComfyBench**, a CVPR 2025 benchmark evaluating agents on workflow design and execution correctness.

## Key Facts

| | |
|---|---|
| **Paper** | ComfyBench: Benchmarking LLM-based Agents in ComfyUI for Autonomously Designing Collaborative AI Systems |
| **Published** | CVPR 2025 |
| **Authors** | Xiangyuan Xue, Zeyu Lu, Di Huang, Zidong Wang, Wanli Ouyang, Lei Bai |
| **GitHub** | https://github.com/xxyQwQ/GenAgent |
| **Language** | Python 3.12 |

## Core Architecture

GenAgent's main pipeline (`ComfyPipeline`) runs a 5-step agent loop:

1. **Analyzer** — parses task instruction → identifies paradigm (T2I, I2I, upscaling, etc.) and core requirements
2. **Planner** — decides next action: `load`, `combine`, `adapt`, `retrieve`, or `finish`
3. **Combiner** — merges reference workflow into current workspace (generates Pythonic workflow code)
4. **Adapter** — modifies parameters in current workflow
5. **Refiner** — fixes execution errors detected by ComfyUI

### Workflow as Python Code

ComfyUI workflows are represented as equivalent Python — each line is one node:
```python
output = node(input)
```
This representation lets LLMs better understand and manipulate workflows.

### Agent Variants (13 total)

| Variant | Description |
|---|---|
| `zeroshot` | Direct generation, no reference |
| `fewshot` | Few-shot prompting |
| `cot` | Chain-of-thought reasoning |
| `cotsc` | CoT with self-consistency (multi-trajectory) |
| `rag` | RAG retrieval from workflow corpus |
| `crp` | Cross-referential planning, multi-round |
| `mad` | Multi-agent debate with multiple solvers |
| `comfy` | Full pipeline (default) |
| Ablations | `comfy_no_adapt`, `comfy_no_combine`, `comfy_no_refine`, `comfy_no_retrieve`, `rag_json_representation`, `rag_list_representation` |

## ComfyBench Benchmark

- **3205 documented ComfyUI nodes** with metadata
- **20 curriculum workflows** for agent learning
- **200 task instructions** (10-sample validation set)
- **Metrics**: pass rate (executes correctly) + resolve rate (meets task requirements)
- Tasks include: text-to-image, image editing, upscaling, style transfer, object removal/replacement, identity-preserving transformation

## Technical Stack

- **LLM**: GPT-4o (default completion + vision), configurable via `config.yaml`
- **Embedding**: text-embedding-3-large for RAG retrieval
- **ComfyUI**: External server at `127.0.0.1:8188`, handles actual image generation
- **Dependencies**: langchain-core, beautifulsoup4 (HTML parsing for LLM output)

## Differences from Similar Tools

- **vs. [[agentbench]]**: AgentBench evaluates general agents across OS/DB/KG environments; ComfyBench is specialized for ComfyUI/Secure Diffusion workflow design
- **vs. [[autogen]]** / [[crewai]]**: These are general multi-agent frameworks; GenAgent is a single-purpose workflow generation agent
- **vs. [[text-generation-webui]]**: Text generation web UI is a local LLM interface; GenAgent generates image generation workflows for ComfyUI

## Related

- [[ComfyUI]] — node-based Stable Diffusion workflow editor
- [[agentbench]] — general LLM agent benchmark
- [[autogen]] — Microsoft multi-agent framework
- [[crewai]] — crewAI multi-agent orchestration
