# WebDesignAgent: Towards Effortless Website Creation

**Source URL:** https://github.com/DAMO-NLP-SG/WebDesignAgent
**Developer:** Alibaba DAMO Academy (DAMO-NLP-SG)
**License:** Apache 2.0
**Retrieved:** 2026-04-16 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview

WebDesignAgent is an autonomous AI agent designed to streamline and automate website creation. It generates complete webpages from multiple input types and integrates a human-in-the-loop workflow for precise customization.

> "WebDesignAgent is an autonomous agent that can help you build a series of websites."

## Key Capabilities

- **Multi-Modal Input Generation:** Build sites from text descriptions, existing templates, or combined image + text prompts
- **Autonomous Planning & Generation:** Automatically creates structural plans before rendering code
- **Human Feedback Loop:** Allows iterative customization after initial auto-generation
- **Dual Interface:** Supports both GUI (recommended) and Terminal/CLI modes
- **Modern Stack Integration:** Optimized for gpt-4o and Tailwind CSS

## Core Architecture & Files

| File/Directory | Purpose |
|---|---|
| `LLM.py`, `base_agent.py` | Core AI agent & LLM integration logic |
| `gui.py` | Graphical User Interface implementation |
| `webdesign.py`, `webserver.py` | Website generation & local server hosting |
| `config.yaml` | API & environment configuration |
| `prompts/` | System & task-specific prompt templates |
| `examples/` | Pre-built demos (DAMO, Shopping, Game) |
| `requirements.txt` | Python dependencies |

## Installation & Configuration

1. Install dependencies: `pip install -r requirements.txt`
2. Configure OpenAI API in `config.yaml` with API credentials

## GUI Mode Workflow

1. Select Mode → Web Design Mode
2. Select Model → gpt-4o
3. Configure: Language, CSS Framework (Tailwind), save_file, website_description, website_template_path, local_img_storage_path
4. Click load → Plan → Auto Generate → Close
5. Human Feedback: Use feedback input field to iteratively refine output

## Terminal Mode

Run directly via command line (standard Python execution).

## Example Outputs

| Example | Input Type |
|---|---|
| Alibaba DAMO | Website Template |
| Shopping Site | Text Description |
| Game Site | Image + Text Description |

## Notes

- Chinese documentation available via `assets/README_CN.md`
- Official WeChat group for support
- PRs actively welcomed
