---
title: Karpathy LLM101n
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, learning, notes, python]
sources: []
---

## Overview

**LLM101n** (also known as "Building GPT" / "Neural Networks: Zero to Hero") is Andrej Karpathy's educational course on neural networks and large language models. The course takes learners from first principles of deep learning through building a GPT-like language model from scratch, providing deep intuition into how LLMs work internally.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Creator | Andrej Karpathy (former OpenAI/Director of AI at Tesla) |
| Platform | YouTube (free) |
| Format | Video lectures + code walkthroughs |
| Prerequisites | Basic Python, high school math |
| Stars | 100K+ on companion GitHub repos |

## Course Structure

### Series: Neural Networks: Zero to Hero
1. **The spelled-out intro to neural networks and backpropagation** — Building micrograd (tiny autograd engine)
2. **The spelled-out intro to language modeling** — Building makemore (n-gram → bigram → MLP → RNN → LSTM)
3. **Building GPT from scratch** — Tokenization, transformer architecture, self-attention, training
4. **Let's build GPT: from scratch, in code, spelled out** — Full GPT implementation walkthrough
5. **Backpropagation calculus** — Mathematical foundations
6. **Let's build the GPT Tokenizer** — BPE tokenization explained

### Key Concepts Covered
- **micrograd**: Scalar-valued neural network engine (autodiff from scratch)
- **makemore**: Character-level language models (bigram → MLP → RNN → n-gram)
- **GPT**: Full transformer-based language model with self-attention, layer norm, positional encoding
- **Tokenization**: BPE (Byte Pair Encoding) from scratch
- **Training**: AdamW optimizer, learning rate scheduling, distributed training basics

## Educational Philosophy

- **Build from scratch**: No framework magic — understand every tensor operation
- **Incremental complexity**: Start simple, add complexity step by step
- **Visual intuition**: Emphasis on understanding through visualization and debugging
- **Production-quality code**: Clean, readable implementations that mirror real systems

## Related Karpathy Projects

- [[ai-game-devtools/nanogpt]] — Minimal GPT training code (~300 lines), distilled from this course
- [[ai-game-devtools/nanochat]] — Minimal chatbot training pipeline, even simpler than nanoGPT
- [[ai-game-devtools/llama2-c]] — Karpathy's pure C Llama 2 inference, extending the educational approach
- [[ai-game-devtools/autoresearch]] — Autonomous LLM research framework

## Game Development Relevance

- **Understanding LLMs for NPC AI**: Deep knowledge of how LLMs work enables better integration decisions
- **Custom Language Models**: Train domain-specific models for game-specific dialogue, lore, and narrative
- **Performance Optimization**: Understanding internals helps with efficient deployment on constrained hardware
- **Educational Foundation**: Essential background for any developer integrating LLMs into games

## Why It Matters

Karpathy's course is widely regarded as the best free resource for understanding LLM internals. For game developers looking to integrate LLMs (via [[ai-game-devtools/llama-cpp]], [[ai-game-devtools/vllm]], or other engines), this course provides the foundational knowledge to make informed decisions about model selection, fine-tuning, and deployment.

## References

- YouTube Playlist: https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- GitHub (micrograd): https://github.com/karpathy/micrograd
- GitHub (nanogpt): https://github.com/karpathy/nanoGPT
