---
title: Code World Model (CWM)
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [llm, code-generation, model, open-source, agent]
sources: [raw/articles/ai-game-devtools/cwm.md]
---

# Code World Model (CWM)

Meta FAIR CodeGen Team 开源的 320 亿参数代码世界模型，专为代码生成与程序状态推理设计。

## 概述

Code World Model (CWM) 是一个稠密架构的解码器-only 自回归大语言模型，核心创新在于**世界模型训练**（World Modeling）：通过在容器化环境中执行 Python 程序并观察代码与命令如何影响程序状态，让模型学会对代码执行过程进行推理。

## 技术规格

| 属性 | 数值 |
|------|------|
| 参数规模 | 32B（稠密） |
| 架构 | 64 层 Transformer，GQA |
| 词表 | 128K |
| 上下文长度 | 131,072 tokens |
| 注意力模式 | 3:1 局部(8,192) : 全局(131,072) 交替 |
| 训练阶段 | 预训练(8T) → 中期训练(5T) → SFT → 多任务 RL |
| 推理需求 | 双 H100（默认）/ 单卡 80GB（量化） |

## 核心能力

- **代码世界建模**：在 30,000+ Docker 镜像中执行 Python，收集 2 亿+ 内存轨迹；300 万条 LLM 与计算环境的交互轨迹
- **可验证强化学习**：多轮软件工程环境 + 数学证明 + 编译器 IR + Lean 多任务 RL
- **SWE-bench 表现**：CWM + tts 达到 **65.8%**（完整 500 题），超越 Devstral-1.1 和 Qwen3-Coder-32B
- **推理链格式**：强制 `<think>` 内省推理，支持启用/禁用思考模式

## 模型变体

| 版本 | 说明 | 权重 |
|------|------|------|
| `cwm` | 指令微调版（推荐） | [Hugging Face](https://huggingface.co/facebook/cwm) |
| `cwm-sft` | 监督微调版 | [Hugging Face](https://huggingface.co/facebook/cwm-sft) |
| `cwm-pretrain` | 预训练版 | [Hugging Face](https://huggingface.co/facebook/cwm-pretrain) |

## 与同类工具的差异

- 相比 [[qwen3]] 和 [[gpt-oss]] 等通用模型，CWM **专注代码执行状态推理**，而非通用对话
- 相比 [[swe-agent]]（Agent 接口框架），CWM 是**底层模型权重**，提供世界建模能力本身
- 非商业研究许可证，不适合生产环境直接部署

## 相关链接

- GitHub: https://github.com/facebookresearch/cwm
- 技术报告: https://ai.meta.com/research/publications/cwm/
- 模型卡: [MODEL_CARD.md](https://github.com/facebookresearch/cwm/blob/main/MODEL_CARD.md)
- 许可证: [CWM License](https://ai.meta.com/resources/models-and-libraries/cwm-license/)
