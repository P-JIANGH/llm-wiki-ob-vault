---
title: RepoAgent
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, agent, tool, open-source, code, documentation]
sources: [raw/articles/ai-game-devtools/repoagent.md]
---

# RepoAgent

An LLM-powered open-source framework for **repository-level Python code documentation generation**. Built by [OpenBMB](https://github.com/OpenBMB).

## Overview

RepoAgent automatically detects Git changes in Python repositories, parses code via AST (using Jedi), and generates Markdown documentation for individual functions and classes. It maintains bidirectional call relationships between code objects, making documentation context-rich. Integrates with `pre-commit` for fully automated documentation updates on every commit.

Featured in production use at: [[chatdev]] (OpenBMB's multi-agent dev platform), XAgent (270K lines), MiniCPM, and EasyRL4Rec.

## Key Facts

| | |
|---|---|
| **License** | Apache-2.0 |
| **Language** | Python ≥3.11 |
| **CLI** | `pip install repoagent` |
| **Default Model** | `gpt-4o-mini` |
| **arXiv** | 2402.16667 (cs.CL) |

## Core Architecture

```
change_detector.py  →  Git diff parsing (GitPython)
       ↓
file_handler.py     →  AST analysis (Jedi)
       ↓
doc_meta_info.py    →  DocItem / MetaInfo data model
       ↓
runner.py           →  Multi-threaded doc generation
       ↓
markdown_docs/      →  Output Markdown per .py file
```

### Main Modules

- **`main.py`** — Click CLI: `run`, `clean`, `diff`, `chat-with-repo`
- **`change_detector.py`** — Tracks staged/unstaged Git changes, maps diff lines to function/class boundaries
- **`project_manager.py`** — Jedi-based project introspection, builds `project_hierarchy.json`
- **`file_handler.py`** — Per-file AST parsing, extracts signatures + call graph
- **`chat_with_repo/`** — Optional Gradio UI: RAG chat over generated docs (ChromaDB + LlamaIndex)

## Features

- **Git-aware** — Detects what changed since last commit, only regenerates affected docs
- **AST-based** — Uses Jedi to parse Python AST, not regex
- **Bidirectional call graph** — `who_reference_me` + `reference_who` enriches docs
- **Multi-threaded** — Configurable `--max-thread-count` (default 4)
- **Local model support** — `--base-url` for Llama, ChatGLM, Qwen, GLM4 via OpenAI-compatible API
- **Pre-commit hook** — Auto-update docs on `git commit`
- **GitBook-ready** — Output folder structured for GitBook rendering

## Usage

```bash
# Install
pip install repoagent

# Run on target repo
repoagent run -tp /path/to/target/repo

# Preview changes
repoagent diff

# RAG chat interface
pip install repoagent[chat-with-repo]
repoagent chat-with-repo
```

## Related Tools

- [[chatdev]] — Same org (OpenBMB), multi-agent software development platform. ChatDev also uses LLMs for code generation.
- [[aios]] — Also an agent framework with LLM kernel abstraction. AIOS focuses on OS-level scheduling while RepoAgent focuses on documentation.
- [[autoresearch]] — Karpathy's LLM research agent. Both auto-generate artifacts in a loop (docs vs experiments).

## See Also

- [RepoAgent GitHub](https://github.com/OpenBMB/RepoAgent)
- [arXiv Paper](https://arxiv.org/abs/2402.16667v1)
- [PyPI Package](https://pypi.org/project/repoagent/)
