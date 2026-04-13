---
title: Design2Code
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, vlm, multimodal, tool, benchmark]
sources: [raw/articles/ai-game-devtools/design2code.md]
---

# Design2Code

**Design2Code** is a Stanford SALT Lab benchmark and model for automating front-end engineering — converting visual design screenshots into HTML/CSS code implementation.

## Overview

Design2Code tackles the problem of automatically generating code from visual designs, a core challenge in game UI development and web prototyping. The benchmark provides 484 real-world webpage examples paired with screenshots and ground-truth HTML code, plus a challenging 80-case "Hard" subset from GitHub Pages designed to stress-test even GPT-4V and Claude 3.5.

The project includes:
- **Design2Code-18B**: A finetuned CogAgent-18B model specialized for design-to-code generation
- **Multimodal prompting baselines**: Ready-to-run scripts for GPT-4V, Gemini Pro Vision, Claude 3.5 Sonnet
- **Automatic evaluation suite**: 5-metric evaluation (Block-Match, Text, Position, Color, CLIP) with Playwright screenshot rendering

## Technical Details

### Base Architecture
- Finetuned from **CogAgent-18B** (part of the [[ai-game-devtools/cogvlm2|CogVLM]] family)
- LoRA-based fine-tuning pipeline provided
- Python 3.11 + Playwright for browser-based evaluation

### Evaluation Pipeline
1. Render generated HTML in Playwright headless browser
2. Capture screenshot of rendered output
3. Compare against ground-truth screenshot using 5 metrics

### Key Scripts
| Script | Purpose |
|--------|---------|
| `prompting/gpt4v.py` | GPT-4V prompting (Direct/Text-Augmented/Self-Revision) |
| `prompting/gemini.py` | Gemini Pro Vision prompting |
| `prompting/claude.py` | Claude 3.5 Sonnet prompting |
| `metrics/multi_processing_eval.py` | Batch evaluation across all metrics |
| `CogVLM/finetune_demo/inference_design2code.py` | Design2Code-18B inference |

## Relevance to Game Dev

For AI game development, Design2Code's screenshot-to-code capability can automate:
- **UI prototyping**: Generate game menu interfaces from mockups
- **HUD generation**: Create in-game HUD elements from wireframes
- **Dialogue system editors**: Rapid UI layout generation

## Comparison to Chrome-GPT

[[ai-game-devtools/chrome-gpt|Chrome-GPT]] focuses on autonomous browser agent control (navigating, interacting with live websites), while Design2Code focuses on static screenshot-to-code conversion. The two are complementary — Chrome-GPT for runtime web interaction, Design2Code for UI layout generation.

## Resources

- **Paper**: [arXiv:2403.03163](https://arxiv.org/abs/2403.03163)
- **Dataset**: [HuggingFace - Design2Code-hf](https://huggingface.co/datasets/SALT-NLP/Design2Code-hf)
- **Model**: [HuggingFace - Design2Code-18B-v0](https://huggingface.co/SALT-NLP/Design2Code-18B-v0)
- **Project Page**: [salt-nlp.github.io/Design2Code](https://salt-nlp.github.io/Design2Code/)

## License

Research use only. The benchmark is built on C4 dataset under ODC-Attribution License.
