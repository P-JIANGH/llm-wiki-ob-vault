# RepoAgent — Raw Source

**Project:** RepoAgent
**URL:** https://github.com/OpenBMB/RepoAgent
**License:** Apache-2.0
**Date:** 2024-02 (arXiv:2402.16667v1)
**Cloned:** 2026-04-14

## Overview

RepoAgent is an LLM-powered open-source framework for **repository-level code documentation generation**. It automatically detects Git changes, analyzes Python code via AST, and generates Markdown documentation for individual code objects (functions, classes), maintaining bidirectional call relationships between objects.

Featured in: XAgent (270K lines), MiniCPM, ChatDev, EasyRL4Rec.

## Architecture

### Core Modules

- `repo_agent/main.py` — Click CLI entry point. Commands: `run`, `clean`, `diff`, `chat-with-repo`. Default model: `gpt-4o-mini`. Supports `--base-url` for OpenAI-compatible APIs (Llama, ChatGLM, Qwen, GLM4).
- `repo_agent/change_detector.py` — Git diff detection via GitPython. Tracks staged/unstaged Python file changes. Parses diff hunks to identify changed functions/classes.
- `repo_agent/project_manager.py` — Uses Jedi for project introspection. Builds `project_hierarchy.json` storing file structure and call graphs.
- `repo_agent/file_handler.py` — Handles per-file AST parsing (via Jedi). Extracts function/class signatures, docstrings, and call relationships.
- `repo_agent/doc_meta_info.py` — Core data structures: `DocItem`, `MetaInfo`. Tracks documentation state per file.
- `repo_agent/runner.py` — Orchestrates the doc generation pipeline. Multi-threaded dispatch via `max_thread_count`.
- `repo_agent/chat_with_repo/` — RAG-based chat interface (Gradio). Embeds docs into ChromaDB vector store, retrieves relevant context for Q&A.

### Dependencies
- `loguru>=0.7.2` — Logging
- `jedi>=0.19.1` — Python code analysis
- `GitPython>=3.1.41` — Git operations
- `click>=8.1.7` — CLI
- `pydantic-settings>=2.2.1` — Config management
- `llama-index-llms-openai-like>=0.3.3` — LLM interface
- Optional: `gradio`, `llama-index-embeddings-openai`, `llama-index-vector-stores-chroma` (for `chat-with-repo`)

### CLI Usage

```bash
repoagent run -tp /path/to/target/repo
repoagent run -m gpt-4o-mini -t 0.2 -tp /path/to/repo
repoagent diff  # preview what docs will change
repoagent clean # remove cache
repoagent chat-with-repo # RAG chat interface
```

### Pre-commit Hook

RepoAgent integrates with `pre-commit`. After initial doc generation, configure `.pre-commit-config.yaml` to auto-trigger doc updates on every `git commit`.

## Key Features

1. **Git-aware change detection** — Detects staged/unstaged Python file changes, maps diff lines to AST structures
2. **AST-based code analysis** — Uses Jedi to parse Python AST, extract functions/classes with signatures
3. **Bidirectional call graph** — Tracks `who_reference_me` and `reference_who` relationships
4. **Multi-threaded generation** — Configurable thread count for parallel doc generation
5. **Local model support** — `--base-url` accepts OpenAI-compatible endpoints (Llama, ChatGLM, Qwen)
6. **GitBook output** — Generates `markdown_docs/` per project, ready for GitBook rendering
7. **Chat With Repo** — Optional RAG chat interface using LlamaIndex + ChromaDB + Gradio

## Citation

```bibtex
@article{luo2024repoagent,
  title={RepoAgent: An LLM-Powered Open-Source Framework for Repository-level Code Documentation Generation},
  author={Qinyu Luo et al.},
  year={2024}, eprint={2402.16667}, archivePrefix={arXiv}, primaryClass={cs.CL}
}
```
