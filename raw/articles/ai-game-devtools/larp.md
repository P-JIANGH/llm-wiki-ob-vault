# LARP: Language-Agent Role Play for Open-World Games — Raw Source

> Ingested: 2026-04-16
> Source: https://github.com/MiAO-AI-Lab/LARP
> Paper: arXiv:2312.17653
> Authors: Ming Yan, Ruihao Li, Hao Zhang, Hao Wang, Zhilan Yang, Ji Yan (MiAO)

## README Summary

**LARP** (Language-Agent Role Play) is a framework bridging language agents and open-world gaming through a cognitive-psychology-inspired architecture. It introduces modular cognitive architecture with memory processing, decision-making assistance, environment interaction with learnable action space, and personality alignment post-processing.

The GitHub repo is a placeholder ("OUR WORK IS COMING SOON") — the paper (arXiv:2312.17653, 12 pages, 4 figures) contains the full technical details.

## Paper: Core Architecture (4-Module Cognitive Workflow)

### 1. Long-Term Memory (LTM)
- **Semantic Memory:** Game rules & worldview in external DB + symbolic language
- **Episodic Memory:** Specific events in vector DB with relevance decay scoring
- **Procedural Memory:** Skills/actions as APIs (Public + Personal)
- **Retrieval:** Question-based Query (self-ask prompts) → vector similarity + predicate logic

### 2. Working Memory
- Temporary cache: observations + retrieved LTM
- ~7±2 items capacity, extracted directly into prompt context

### 3. Memory Processing (Encoding → Storage → Recall)
- **Encoding:** Natural language → Probabilistic Programming Language (PPL) + logic programming
- **Recall:** Self-ask questions → 3 retrieval methods (predicate logic, keyword+vector, sentence similarity) → CoT reconstruction (can simulate memory distortion)
- **Forgetting:** Wickelgren's power law: σ = αλN(1 + βt)^(-ψ)

### 4. Decision-Making Module
- Ordered cluster of programmable units: affective computing, intent analysis, output formatting
- Units update working memory in real-time
- LLM assistant dynamically manages execution order

## Environment Interaction & Learnable Action Space

- **Public APIs:** Foundational game actions
- **Personal APIs:** Custom (Task, API) pairs learned through interaction
- **Workflow:** Goal → subtask decomposition → API search → execute OR generate code via fine-tuned LLM → verify → store as personal API
- Continuous fine-tuning with RLHF

## Personality Alignment & Post-Processing

- Base models pre-trained on diverse cultural perspectives
- SFT with instruction datasets from SOTA models
- Dynamic LoRA adapters for specific capabilities (reflection, code generation, emotion, memory reconstruction)
- Action Verification Module: validates executability
- Conflict Identification Module: scans for contradictions with character personality

## Key Challenges

- **Data Quality:** Requires extensive literary/scriptwriting effort
- **Multi-Agent Socialization:** Need sociological mechanisms for NPC networks
- **Cumulative Distortion:** Randomness across small model clusters

## BibTeX
```bibtex
@misc{yan2023larp,
  title={LARP: Language-Agent Role Play for Open-World Games},
  author={Ming Yan and Ruihao Li and Hao Zhang and Hao Wang and Zhilan Yang and Ji Yan},
  year={2023},
  eprint={2312.17653},
  archivePrefix={arXiv},
  primaryClass={cs.AI}
}
```
