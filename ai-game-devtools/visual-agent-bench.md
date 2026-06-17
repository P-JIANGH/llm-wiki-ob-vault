---
title: Visual Agent Bench
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, agent, vlm, vision, open-source, reference]
sources: [web:https://github.com/THUDM/VisualAgentBench, web:https://arxiv.org/abs/2401.16553]
---

# Visual Agent Bench

**Benchmark for evaluating vision-language agents**

## Overview

Visual Agent Bench (VABench) is a comprehensive evaluation framework designed to assess the capabilities of vision-language agents across diverse visual understanding and action tasks. It provides standardized benchmarks for measuring how well VLM-based agents can perceive visual environments, reason about visual information, and take appropriate actions in interactive scenarios.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | THUDM (ZhipuAI) |
| **Paper** | arXiv 2401.16553 |
| **Task Types** | Visual question answering, image manipulation, diagram reasoning, UI navigation |
| **Environments** | Multiple simulated environments with visual feedback |
| **Metrics** | Task success rate, action efficiency, reasoning accuracy |
| **Agent Types** | Evaluates LLaVA, Qwen-VL, GPT-4V, Gemini, and other VLM agents |
| **Scenarios** | Desktop GUI, web browsing, game environments, scientific diagrams |
| **License** | Apache 2.0 |

## Evaluation Dimensions

- **Visual Perception**: Object detection, spatial reasoning, scene understanding
- **Visual Reasoning**: Diagram interpretation, mathematical figure solving
- **Action Execution**: GUI interaction, navigation, manipulation tasks
- **Multi-step Planning**: Complex tasks requiring sequential visual reasoning
- **Robustness**: Performance under varying image quality and complexity

## Usage in AI Game Development

VABench is relevant for:
- **Agent evaluation**: Benchmarking VLM agents for game AI applications
- **UI automation testing**: Evaluating agents' ability to navigate game menus and interfaces
- **Visual QA**: Assessing agents' understanding of game screenshots and states
- **Tool selection**: Comparing different VLM models for specific game development tasks

## Related Projects

- [[agentbench]] — THUDM LLM agent benchmark covering 8 diverse environments
- [[cogvlm]] — THUDM VLM with GUI Agent capabilities, evaluated on similar benchmarks
- [[visualrwkv]] — RWKV-based VLM suitable for real-time game scenarios
- [[ragas]] — LLM evaluation framework, complementary benchmarking approach
