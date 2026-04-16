---
title: LARP
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, agent, game, open-source, research, architecture]
sources: [raw/articles/ai-game-devtools/larp.md]
---

# LARP: Language-Agent Role Play for Open-World Games

A cognitive-psychology-inspired language agent framework for immersive NPC role-playing in open-world games. Developed by MiAO (Ming Yan et al.), paper arXiv:2312.17653 (2023).

## Overview

LARP bridges the gap between general-purpose language agents and open-world gaming simulations. Unlike simple LLM-driven NPCs, it implements a modular cognitive architecture with long-term memory processing, decision-making assistance, a feedback-driven learnable action space, and personality alignment post-processing.

Code repository status: **Coming Soon** — only the paper is available.

## Architecture: 4-Module Cognitive Workflow

### 1. Long-Term Memory (LTM)
| Memory Type | Content | Storage |
|-------------|---------|---------|
| Semantic | Game rules & worldview | External DB + symbolic language |
| Episodic | Specific events/interactions | Vector DB with relevance decay |
| Procedural | Skills/actions as APIs | Public APIs + Personal APIs |

**Retrieval:** Self-ask prompts → predicate logic + keyword/vector similarity + sentence matching.

### 2. Working Memory
- Temporary cache holding observations + retrieved LTM (~7±2 items)
- Directly injected into prompt context for immediate reasoning

### 3. Memory Processing
- **Encoding:** Natural language → Probabilistic Programming Language (PPL)
- **Recall:** 3-method retrieval with Chain-of-Thought reconstruction (can simulate memory distortion)
- **Forgetting:** Wickelgren's power law with character-specific forgetting rate ψ:
  `σ = αλN(1 + βt)^(-ψ)`

### 4. Decision-Making Module
- Ordered cluster of programmable units (affective computing, intent analysis, output formatting)
- LLM assistant dynamically manages execution order

## Environment Interaction

- **Public APIs:** Foundational game actions
- **Personal APIs:** Custom `(Task, API)` pairs learned through interaction
- When API doesn't exist: generate code via fine-tuned LLM → verify → store as personal API on success
- Continuous fine-tuning with RLHF

## Personality Alignment

- Base models trained on diverse cultural perspectives
- SFT with instruction datasets, optimized via human feedback for persona adherence
- Dynamic LoRA adapters for reflection, code generation, emotion, memory reconstruction
- **Action Verification Module** — validates executability in game engine
- **Conflict Identification Module** — detects contradictions with character personality/worldview

## Game Development Relevance

LARP is conceptually similar to [[generative-agents]] (Stanford) but with a more modular architecture — instead of a single LLM with streaming memory, it uses a cluster of smaller fine-tuned models with explicit cognitive modules. It also relates to [[ai-town]] (open-world agent simulation) but focuses on individual NPC cognitive depth rather than multi-agent social dynamics.

Compared to [[chatdev]] (multi-agent software development platform), LARP targets game NPC role-playing rather than software engineering workflows, sharing the common theme of structured multi-agent orchestration.

## Key Challenges
- Data quality requires extensive literary/scriptwriting effort
- Multi-agent socialization needs sociological mechanisms
- Cumulative distortion from randomness across small model clusters

## License

Not specified (code not yet released)

## Links

- GitHub: https://github.com/MiAO-AI-Lab/LARP
- Paper: https://arxiv.org/abs/2312.17653
- Website: https://miao-ai-lab.github.io/LARP/
- PDF: https://miao-ai-lab.github.io/LARP/static/LARP.pdf
