---
title: RWKV
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, llm, architecture, open-source]
sources: []
---

# RWKV

[[llm-architectures]] | [[linear-attention]]

## Overview

RWKV (Receptance Weighted Key Value) is a novel LLM architecture that combines transformer-level performance with efficient RNN-like inference. It uses a linear attention mechanism to achieve unbounded context length.

## Key Features

- **Linear attention**: O(N) inference complexity instead of O(N^2)
- **Unbounded context**: No position encoding limitations
- **GPU-efficient**: Can still leverage GPU parallelism during training
- **Open weights**: Fully open model weights

## Relationship to Other Projects

- Alternative to [[Mamba]] (state space models) for long-context efficient inference
- Competes with vanilla transformers for production deployment

## References

- GitHub: https://github.com/BlinkDL/RWKV-LM
- Website: https://www.rwkv.com/
