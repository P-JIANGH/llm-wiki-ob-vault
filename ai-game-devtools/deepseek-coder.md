---
title: DeepSeek Coder
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, code-completion, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/deepseek-coder.md]
---

# DeepSeek Coder

**DeepSeek Coder** 是 DeepSeekAI 开源的代码语言模型系列，专注于代码生成、补全和填充（infilling）。模型规模涵盖 1B 到 33B，在多项代码基准测试中达到开源模型 SOTA 水平。

## Overview

DeepSeek Coder 从零开始在 2T tokens 上预训练，数据构成为 87% 代码 + 13% 自然语言（中英文双语）。每个模型都采用 16K 上下文窗口和 Fill-in-the-Blank（FIM）任务设计，支持项目级代码补全。

## Key Facts

| 维度 | 详情 |
|------|------|
| **开发者** | DeepSeekAI |
| **论文** | "DeepSeek-Coder: When the Large Language Model Meets Programming" (arXiv:2401.14196) |
| **模型规格** | 1B, 5.7B, 6.7B, 33B |
| **训练数据** | 2T tokens（87% code, 13% NLP） |
| **上下文窗口** | 4K → 16K（两阶段预训练） |
| **支持语言** | 86 种编程语言 |
| **代码许可证** | MIT |
| **模型许可证** | Model License（支持商业用途） |

## Architecture

- **模型类型**: 自回归 Transformer Decoder（GPT 风格）
- **Tokenizer**: HuggingFace Tokenizer（Bytelevel-BPE + 自定义 pre-tokenizer）
- **框架**: HuggingFace Transformers / vLLM
- **训练方式**: DeepSpeed ZeRO-3 分布式训练
- **FIM 支持**: 使用 `<|fim▁begin|>` / `<|fim▁hole|>` / `<|fim▁end|>` 特殊 token 实现代码插入

## 训练流程

1. **预训练（第一阶段）**: 1.8T tokens，4K 窗口，87% code + 10% code-related + 3% Chinese
2. **扩展预训练（第二阶段）**: 额外 200B tokens，16K 窗口 → **DeepSeek-Coder-Base**
3. **指令微调**: 2B 指令 tokens → **DeepSeek-Coder-Instruct**

## 基准测试表现

- **DeepSeek-Coder-Base-33B** 在 HumanEval Python/Multilingual、MBPP、DS-1000 上全面超越 CodeLlama-34B（分别领先 7.9%, 9.3%, 10.8%, 5.9%）
- **DeepSeek-Coder-Base-7B** 达到 CodeLlama-34B 性能水平
- **DeepSeek-Coder-Instruct-33B** 在 HumanEval 上超越 GPT-3.5-turbo，MBPP 上与 GPT-3.5-turbo 相当

## 使用方式

支持四种使用场景：
1. **代码补全** — 从注释/提示生成代码
2. **代码插入（FIM）** — 在已有代码中间补全缺失部分
3. **对话模式** — 指令跟随，多轮问答
4. **项目级补全** — 跨文件理解，调用其他模块的类和函数

## 项目结构

```
DeepSeek-Coder/
├── demo/              # HuggingFace Spaces 演示
├── Evaluation/        # 基准测试评估脚本
├── finetune/          # 微调脚本（DeepSpeed 支持）
├── pictures/          # 图片、基准表格
├── LICENSE-CODE       # MIT
└── LICENSE-MODEL      # Model License
```

## 量化支持

- **GGUF (llama.cpp)**: 需要 fork 版本以支持 HuggingFace Tokenizer
- **GPTQ (exllamav2)**: 需设置 RoPE scaling 为 4

## Game Dev Relevance

DeepSeek Coder 可用于 AI 辅助游戏开发：
- 生成游戏逻辑代码（Unity C#、Godot GDScript 等）
- 自动着色器代码生成辅助（支持 GLSL/HLSL）
- NPC 行为脚本编写
- 游戏管线工具开发

## Related Pages

- [[codegen]] — Salesforce 开源代码生成模型家族
- [[deepseek-r1]] — DeepSeekAI 推理模型系列
- [[deepseek-v3]] — DeepSeek 基础语言模型
- [[starcoder]] — BigCode 项目代码模型

## Links

- **GitHub**: https://github.com/deepseek-ai/DeepSeek-Coder
- **Hugging Face**: https://huggingface.co/deepseek-ai
- **Paper**: https://arxiv.org/abs/2401.14196
- **Chat Demo**: https://chat.deepseek.com/
- **Discord**: https://discord.gg/Tc7c45Zzu5
