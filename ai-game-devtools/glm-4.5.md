---
title: GLM-4.5
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, model, agent, reasoning, open-source, chinese-llm]
sources: [raw/articles/ai-game-devtools/glm-4.5.md]
---

# GLM-4.5

## Overview

智谱AI（THUDM）开发的智能 Agent 基础模型系列。包含 GLM-4.5、GLM-4.6、GLM-4.7 三个迭代版本，采用 MoE（Mixture of Experts）架构。专注于推理、编码和智能 Agent 能力统一。

## Key Models

### GLM-4.5 Series

|| Model | Total Params | Active Params | Context | Precision | License |
||-------|-------------|--------------|---------|-----------|---------|
| GLM-4.5 | 355B | 32B | 128K | BF16/FP8 | MIT |
| GLM-4.5-Air | 106B | 12B | 128K | BF16/FP8 | MIT |
| GLM-4.5-Base | 355B | 32B | 128K | BF16 | MIT |

### GLM-4.6 (2025)

- 上下文窗口从 128K 扩展至 200K
- 编码性能提升，支持 Claude Code、Cline、Roo Code、Kilo Code
- 推理能力增强，支持推理时工具调用

### GLM-4.7 (2025)

- SWE-bench: 73.8% (+5.8% vs 4.6)
- Terminal Bench 2.0: 41% (+16.5%)
- HLE: 42.8% (+12.4%)
- 新增 Preserved Thinking（跨会话保留思考状态）和 Turn-level Thinking

## Architecture

- **Type**: MoE (Mixture of Experts)
- **Hybrid Reasoning**: Thinking Mode（复杂推理+工具）/ Non-Thinking Mode（快速响应）
- **Tool Integration**: 统一工具调用和推理解析
- **Frameworks**: vLLM、SGLang、HuggingFace Transformers

## Game Dev Relevance

- **代码生成**: SWE-bench 73.8% → 游戏脚本/AI行为生成
- **Function Calling**: 游戏引擎 API 调用（vLLM glm47 parser）
- **Agent 场景**: Preserved Thinking 适合长周期复杂游戏任务
- **NPC 对话**: Reasoning 模型用于剧情生成和决策树

## Related

- [[glm-4]] — 前代 GLM-4 系列
- [[deepseek-r1]] — DeepSeek 推理模型（MoE, 671B）
- [[qwen2.5-coder]] — Qwen 代码模型
- [[agentgpt]] — AgentGPT 平台支持 GLM 系列
