---
title: nanochat
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, ml, code, open-source, learning]
sources: [web:https://github.com/karpathy/nanochat]
---

# nanochat

**Minimal Chatbot Training Code by Andrej Karpathy**

## Overview

nanochat is an even simpler and more minimal codebase than [[nanogpt]] for training a chatbot-style conversational AI model. Also by Andrej Karpathy, it strips down the GPT training pipeline to its absolute essentials — demonstrating that a functional chatbot can be trained with remarkably little code. It takes conversation data, trains a small transformer model, and produces a model capable of basic conversational responses.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Author** | Andrej Karpathy |
| **Language** | Python + PyTorch |
| **Size** | Even simpler than nanoGPT (~300 lines) |
| **Purpose** | Educational — minimal chatbot training from scratch |
| **License** | MIT |
| **Stars** | 10K+ on GitHub |
| **Created** | 2023 |

## Architecture

- **Ultra-minimal design**: Fewer abstractions than nanoGPT, even more direct code
- **Chat format**: Trains on conversational data with turn-based formatting
- **Small model**: Designed to run and train on a single consumer GPU
- **Self-contained**: No external dependencies beyond PyTorch
- **Dataset**: Works with small conversational datasets (e.g., email threads, chat logs)
- **Inference**: Simple sampling loop generates conversational responses

## Key Differences from nanoGPT

| Aspect | nanoGPT | nanochat |
|--------|---------|----------|
| Focus | General GPT training | Chatbot-specific training |
| Data format | Raw text (next-token) | Conversational turns |
| Complexity | ~300 lines | Even simpler |
| Use case | Language modeling foundation | Interactive dialogue |
| Output | Text continuation | Chat responses |

## Why It Matters for AI Game Development

- **Game NPC dialogue**: Direct starting point for training game character conversational models
- **Minimal viable chatbot**: Proves that game NPC AI doesn't need complex frameworks
- **Educational foundation**: Helps game developers understand chatbot internals before integrating commercial APIs
- **Custom game assistants**: Blueprint for building in-game tutorial helpers and companion AI

## Related Projects

- [[nanogpt]] — Karpathy's slightly more featureful GPT training code (prerequisite reading)
- [[gigax]] — Production game NPC LLM framework using structured generation
- [[interactive-llm-powered-npcs]] — Full game NPC dialogue system with face recognition + LLM + TTS
- [[autoresearch]] — Karpathy's autonomous research framework showing next-level LLM experimentation
