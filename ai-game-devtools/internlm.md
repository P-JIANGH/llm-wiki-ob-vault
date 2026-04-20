---
title: InternLM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, open-source]
sources: [raw/articles/ai-game-devtools/internlm.md]
---

# InternLM

## Overview

InternLM 是由**上海人工智能实验室**开发的大语言模型系列，涵盖 1.8B 到 20B 参数规模的基座、指令微调及奖励模型。最新一代 InternLM3-8B-Instruct 以仅 4T tokens 训练量达到同尺寸 SOTA 性能，训练成本降低 75%+，同时支持 Deep Thinking（长思维链推理）和 Normal Response 两种交互模式。

## Key Facts

- **开发者**: Shanghai AI Laboratory（上海人工智能实验室）
- **最新模型**: InternLM3-8B-Instruct（2025-01-15）
- **许可证**: 开源许可（允许商业应用）
- **官网**: https://internlm.intern-ai.org.cn/
- **HuggingFace**: https://huggingface.co/internlm
- **技术报告**: arXiv 2403.17297

## Model Series

### InternLM3（最新一代）
- **InternLM3-8B-Instruct**: 8B 参数指令模型
  - 仅用 4T 高质量 tokens 训练，成本降低 75%+
  - 支持 Deep Thinking Mode（长思维链）和 Normal Response Mode
  - 超越 Llama3.1-8B 和 Qwen2.5-7B
  - MATH-500: **83.0%** | AIME2024: **20.0%** | AlpacaEval 2.0 LC: **51.1%**

### InternLM2.5
- 规格: 1.8B / 7B / 20B
- InternLM2.5-Chat-1M: 支持 **1M** 长上下文
- InternLM2-Reward 系列奖励模型（1.8B/7B/20B），RewardBench 最高 89.5

### InternLM2
- 支持长上下文、推理、编码能力
- InternLM2-Math-7B/20B 数学专项模型

## Architecture & Training

- **训练效率**: 仅 4T tokens 达到同尺寸 SOTA（竞品通常需要 15T+）
- **Deep Thinking Mode**: 切换长思维链进行复杂推理任务
- **多后端支持**: Transformers / LMDeploy / vLLM / SGLang / Ollama
- **量化支持**: 4-bit / 8-bit 量化（bitsandbytes），8B 模型 4-bit 仅需 ~8GB VRAM

## Game Dev Relevance

InternLM 可用于游戏开发中的多个环节：

- **NPC 对话生成**: 基于 Deep Thinking Mode 进行复杂叙事逻辑推理
- **游戏 AI**: 作为游戏内智能体的推理引擎
- **代码生成**: 辅助游戏逻辑代码编写
- **长文本处理**: 1M context 支持游戏剧情/世界观文档处理

## Related Links

- [[ai-game-devtools/deepseek-r1]] — DeepSeek 推理模型，纯 RL 路线
- [[ai-game-devtools/glm-4]] — 智谱 GLM-4 系列，32B 参数，函数调用能力强
- [[ai-game-devtools/qwen2]] — 阿里通义千问 2 系列
- [[ai-game-devtools/llmunity]] — Unity LLM 接入工具

## Performance Comparison (8B class)

| Benchmark | InternLM3-8B | Qwen2.5-7B | Llama3.1-8B |
|-----------|-------------|------------|--------------|
| CMMLU | **83.1** | 75.8 | 53.9 |
| MATH-500 | **83.0** | 72.4 | 48.4 |
| GPQA-Diamond | **37.4** | 33.3 | 24.2 |
| AlpacaEval 2.0 | **51.1** | 30.3 | 25.0 |
| IFEval | **79.3** | 71.7 | 75.2 |
