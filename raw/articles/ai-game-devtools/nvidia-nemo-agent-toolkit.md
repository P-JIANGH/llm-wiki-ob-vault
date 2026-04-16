# NVIDIA NeMo Agent Toolkit — Raw Source

> Extracted from: https://github.com/NVIDIA/NeMo-Agent-Toolkit
> Date: 2026-04-16
> Source: GitHub README + Installation Guide (web extract; clone failed from all sources)

---

## Project Overview

The NVIDIA NeMo Agent toolkit (abbreviated NAT) is an open-source library for efficiently connecting and optimizing teams of AI agents. It adds intelligence to AI agents across any framework—enhancing speed, accuracy, and decision-making through enterprise-grade instrumentation, observability, and continuous learning.

- **License:** Apache 2.0
- **Latest Release:** v1.5.0
- **Commits:** 1,254+ | Releases: 13
- **Package Name:** `nvidia-nat` (PyPI)
- **Core Mission:** Enable rapid experimentation, reliable deployment, and optimized multi-agent orchestration across diverse AI frameworks.

## Key Features

- **Framework Agnostic:** Integrates with any AI agent architecture (LangChain, LangGraph, LlamaIndex, CrewAI, Semantic Kernel, Agno, ADK, Strands)
- **Enterprise-Grade Tooling:** Built-in instrumentation, observability, and continuous learning pipelines
- **Performance Optimization:** Enhances agent speed, accuracy, and autonomous decision-making
- **Modular Plugin System:** Optional dependencies grouped by framework to avoid bloat

## Installation

```bash
# Core install
pip install nvidia-nat

# With LangChain/LangGraph plugin
pip install nvidia-nat[langchain]
```

**Python:** 3.11, 3.12, 3.13  
**Platforms:** Linux (x86_64, aarch64), macOS (Apple Silicon), Windows (x86_64 untested)  
**GPU:** NOT required by default

## Plugin Categories

| Category | Plugins |
|---|---|
| Agent Frameworks | langchain, llama-index, adk, crewai, semantic-kernel, strands, agno |
| Memory & Storage | mem0ai, memmachine, mysql, redis, s3, zep-cloud |
| Evaluation & Profiling | eval, eval[full], profiler, weave, phoenix, openpipe-art, ragaai, data-flywheel |
| Security & Telemetry | security, opentelemetry, pii-defense |
| Server & Async | async_endpoints, gunicorn |
| Optimization | config-optimizer |

## CLI Commands

- `nat run --config workflow.yml` — Execute a workflow
- `nat eval` — Evaluation (requires eval extra)
- `nat optimize` — Configuration optimization (requires config-optimizer extra)
- `nat serve` — Server mode (requires async_endpoints/gunicorn extra)
- `nat red-team` — Security testing (requires security extra)

## Workflow Configuration

Users define a `workflow.yml` file specifying agents, tools, and execution logic, then run via `nat run --config workflow.yml`.

## Repository Structure

| Directory | Purpose |
|---|---|
| `docs/` | Documentation, guides, API references |
| `examples/` | Ready-to-run agent workflows, notebooks, templates |
| `packages/` | Core toolkit modules, plugins, framework adapters |
| `docker/` | Containerization files |
| `ci/` & `.github/` | CI/CD pipelines, automation |
| `scripts/` | Utility and dev helper scripts |

## Important Notes

- Conda is NOT recommended — use `python -m venv` or `uv venv`
- Running examples requires cloning repo and installing from source
- NVIDIA_API_KEY required for workflows using NVIDIA NIMs
- Zero-setup alternative: Google Colab notebook available
