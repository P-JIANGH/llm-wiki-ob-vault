---
title: Code Llama
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, tool, open-source, code-generation]
sources: [raw/articles/ai-game-devtools/code-llama.md]
---

# Code Llama

## Overview

**Code Llama** 是 Meta AI 基于 [[ai-game-devtools/llama-3]] 的前代 Llama 2 微调的代码大模型系列，提供开源代码模型中 SoTA 性能。支持代码生成、理解、填充（infilling）和指令跟随。

## Key Facts

| | |
|---|---|
| **开发者** | Meta AI (FAIR) |
| **GitHub** | https://github.com/facebookresearch/codellama |
| **论文** | Code Llama: Open Foundation Models for Code |
| **License** | Llama 2 Community License（需申请） |
| **模型尺寸** | 7B / 13B / 34B / 70B |
| **变体** | Base / Python / Instruct |
| **上下文** | 16K 训练，100K 推理（70B Python/Instruct 除外） |
| **训练数据** | Llama 2 数据 + 高比例代码采样 + Instruct 指令数据 |
| **训练消耗** | 1400K GPU 小时 (A100-80GB)，228.55 tCO2eq |

## 技术特点

### 三种变体

| 变体 | 用途 | 特点 |
|------|------|------|
| **Code Llama (Base)** | 代码补全/生成 | 自然延续 prompt 生成代码 |
| **Code Llama - Python** | Python 专项 | 针对 Python 语料优化，HumanEval 表现突出 |
| **Code Llama - Instruct** | 指令跟随 | 安全微调，支持 [INST] 格式对话 |

### 代码填充（Infilling）

7B 和 13B 的 Base 和 Instruct 变体支持 infilling：根据代码上下文（prefix + suffix）填充中间缺失部分。

使用 `<PRE>` / `<SUF>` / `<MID>` 三个特殊标记：
```
<PRE>{prefix}<SUF>{suffix}<MID>
```

### 架构

- 优化版 Transformer 自回归架构
- RMSNorm + RoPE 位置编码 + SwiGLU FFN
- fairscale model parallel 分布式训练
- ColumnParallelLinear / RowParallelLinear

### 推理部署

| 模型 | 模型大小 | GPU 数 (MP) |
|------|---------|------------|
| 7B   | ~12.55GB | 1 |
| 13B  | 24GB | 2 |
| 34B  | 63GB | 4 |
| 70B  | 131GB | 8 |

通过 `torchrun` + NCCL/Gloo 分布式启动。`pip install -e .` 安装后使用。

## 游戏开发中的用途

- **NPC 对话生成**：Code Llama - Instruct 可用于游戏内 AI NPC 对话系统
- **代码辅助工具**：Unity/Unreal 插件可集成 Code Llama 作为代码补全后端
- **游戏脚本生成**：自动生成游戏逻辑脚本（Lua/Python/C#）
- **与 [[ai-game-devtools/llmunity]] 等 Unity 集成配合**：本地部署 GGUF 量化版本

## 与同类工具差异

- vs [[ai-game-devtools/codegen]]：Code Llama 基于 Llama 2 架构（更强），CodeGen 基于 GPT-NeoX/CodeGen 架构
- vs [[ai-game-devtools/codegeex]]：CodeGeeX 专注中文场景，Code Llama 以英文为主
- vs [[ai-game-devtools/gpt-oss]]：GPT-OSS 是 OpenAI 开放权重推理模型，Code Llama 专注代码任务
- 已被 Llama 3 系列取代（[[ai-game-devtools/llama-3-1]]）

## 相关链接

- GitHub: https://github.com/facebookresearch/codellama
- 论文: https://ai.meta.com/research/publications/code-llama-open-foundation-models-for-code/
- 博客: https://ai.meta.com/blog/code-llama-large-language-model-coding/
- 下载: https://ai.meta.com/resources/models-and-libraries/llama-downloads/

## Related

- [[ai-game-devtools/llama-3]] — Meta 后继版本，性能全面超越 Code Llama
- [[ai-game-devtools/codegen]] — Salesforce 代码生成模型，另一个重要代码模型
- [[ai-game-devtools/codegeex]] — 清华 CodeGeeX 代码模型系列
