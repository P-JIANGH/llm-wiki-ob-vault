---
title: KwaiAgents
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, agent, tool, benchmark, game, kwai, kuaishou]
sources: [raw/articles/ai-game-devtools/kwaiagents.md]
---

# KwaiAgents

快手 KwaiKEG 开源的 LLM Agent 系统，包括轻量版 Agent 系统 KAgentSys-Lite、Agent 微调模型 KAgentLMs、200K+ 指令数据 KAgentInstruct、以及 3,000+ 评测数据 KAgentBench。

## Overview

KwaiAgents 由快手科技 KwaiKEG 团队开源，发布于 2023 年 12 月。核心技术贡献是 **Meta-agent tuning**——通过在 Agent 任务上微调基础 LLM，使其获得规划、反思、工具调用能力。

四大开源组件：
1. **KAgentSys-Lite** — 基于 BabyAGI/AutoGPT 思想改造的 CLI Agent 系统，支持 OpenAI API 和本地 vLLM 部署
2. **KAgentLMs** — Qwen / Baichuan 系列 Agent 微调模型（MAT = Meta-Agent Tuned）
3. **KAgentInstruct** — 200K+ Agent 相关指令微调数据
4. **KAgentBench** — 3,000+ 人工标注评测数据，覆盖规划、工具使用、反思、总结、人物画像 5 个维度

## Benchmark Results

Meta-agent tuning 效果显著。在 KAgentBench 自动评测中，Qwen1.5-14B-MAT 达到 Overall 50.18，显著超越基座 Qwen1.5-14B（~21.17）。Human evaluation 中，Baichuan2-13B-MAT 在 KAgentSys 模式下达到 74.13% pass rate (4.11 score)。

| Model | Overall Score | Key Improvement |
|-------|--------------|-----------------|
| Qwen-7B (base) | 21.17 | — |
| Qwen-7B-MAT | 39.85 | +88% |
| Qwen-14B-MAT | 49.94 | +136% |
| Qwen1.5-14B-MAT | 50.18 | — |

## Architecture

### KAgentSys-Lite
- CLI 工具 `kagentsys`
- 工具集：天气 API、DuckDuckGo 搜索、网页浏览
- 支持自定义工具扩展
- 对话式交互，支持中文/英文

### KAgentLMs
- 基础模型：Qwen-7B/14B、Qwen1.5-14B、Baichuan2-13B
- 训练方法：Meta-agent tuning（Agent 任务微调）
- 推理支持：vLLM (GPU)、llama.cpp (CPU)

### KAgentBench
四类评测维度：
- **Planning & Tool-use** — 320 queries, avg 8.68 tools per task
- **Reflection** — 68 queries, 测试自我纠错能力
- **Concluding** — 245 queries, 测试总结归纳能力
- **Profile** — 433 queries, 测试人物画像能力

## 与同类工具对比

KwaiAgents 的核心差异在于 **Meta-agent tuning** 方法——不是构建 Agent 框架，而是通过微调让基础 LLM 本身具备 Agent 能力。相比纯 Prompt 工程的 Agent 系统（如 [[auto-gpt]]），KAgentLMs 在 benchmark 上有显著优势。

与 [[agentbench]] 的关系：KAgentBench 本身可作为通用 Agent 评测基准使用，与 AgentBench（THUDM）评测环境不重叠但可互补。

## License & Links

- License: Apache 2.0
- GitHub: https://github.com/KwaiKEG/KwaiAgents
- Paper: http://arxiv.org/abs/2312.04889
- HuggingFace Models: https://huggingface.co/collections/kwaikeg/kagentlms-6551e685b5ec9f9a077d42ef
- HuggingFace Dataset: https://huggingface.co/datasets/kwaikeg/KAgentInstruct
- HuggingFace Benchmark: https://huggingface.co/datasets/kwaikeg/KAgentBench
