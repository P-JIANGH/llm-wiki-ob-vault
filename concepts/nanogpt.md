---
title: NanoGPT
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, llm, training, open-source]
sources: []
---

# NanoGPT

[[llm-training]] | [[llm-from-scratch]]

## Overview

NanoGPT is Andrej Karpathy's minimal, clean PyTorch implementation of a GPT-language model. It serves as the canonical tutorial implementation for understanding transformer-based language models from scratch.

## Key Characteristics

- **Minimal codebase**: ~300 lines of core training logic
- **Reproducible**: Trains on OpenWebText dataset
- **Educational**: Intended to be read and modified while learning
- **Char-level model**: Operates on character sequences

## Relationship to Other Projects

- The Python source of [[nanobot]] draws from nanoGPT's approach
- Used as a starting point for custom LLM training experiments

## References

- GitHub: https://github.com/karpathy/nanoGPT
