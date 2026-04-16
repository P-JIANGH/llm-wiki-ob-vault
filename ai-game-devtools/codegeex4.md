---
title: CodeGeeX4
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, code-completion, open-source, tool]
sources: [raw/articles/ai-game-devtools/codegeex4.md]
---

# CodeGeeX4

**CodeGeeX4-ALL-9B** 是 THUDM（清华大学 KEG）开源的最新一代多语言代码生成模型，基于 [[ai-game-devtools/glm-4]]-9B 持续训练。以 9B 参数超越数倍大小的通用模型，是当前 10B 以下最强代码模型。

## Overview

CodeGeeX4-ALL-9B 支持单一模型完成代码补全与生成、代码解释器、联网搜索、函数调用（Function Call）、仓库级代码问答与生成，覆盖软件开发全流程场景。

## Key Features

- **代码补全与生成**：支持多种编程语言的代码补全、续写和生成
- **代码解释器**：可执行代码并基于结果进行迭代
- **Function Call**：唯一支持函数调用能力的代码大模型，AST 和 Exec 测试集调用成功率 >90%
- **仓库级代码问答**：128K 上下文，支持整个代码仓库级别的 Q&A 和代码修改
- **跨文件补全**：支持 Python/Java/TypeScript/C# 等多语言跨文件代码补全（CrossFile-Eval）
- **IDE 插件**：VS Code 和 JetBrains 官方插件，支持本地模式（连接本地 Ollama/vLLM）

## Benchmarks

| 模型 | 上下文 | HumanEval | MBPP | NaturalCodeBench | CRUXEval-O |
|------|--------|-----------|------|-------------------|------------|
| Llama3-70B-instruct | 8K | 77.4 | 82.3 | 37.0 | - |
| DeepSeek Coder 33B | 16K | 81.1 | 80.4 | 39.3 | 49.9 |
| Codestral-22B | 32K | 81.1 | 78.2 | 46.0 | 51.3 |
| **CodeGeeX4-ALL-9B** | **128K** | **82.3** | **75.7** | **40.4** | **47.1** |

- **BigCodeBench**：complete 48.9 / instruct 40.4，20B 以下参数模型最高分
- **NIAH（大海捞针）**：128K 上下文 100% 检索准确率
- **Function Call**：Berkeley Function Calling Leaderboard AST/Exec 测试集成功率 >90%

## Architecture & Deployment

- **基座模型**：GLM-4-9B
- **参数规模**：9B
- **上下文长度**：128K tokens（上一代 8 倍）
- **部署方式**：
  - **Ollama**：`ollama run codegeex4`（Ollama 0.2+）
  - **HuggingFace**：transformers 4.39.0–4.40.2，bfloat16
  - **vLLM**：vllm 0.5.1，支持 OpenAI 兼容 API Server
  - **Candle (Rust)**：HuggingFace Candle 框架，支持 CPU 和 CUDA
  - **本地模式**：可连接 VS Code / JetBrains 插件进行离线使用

## Project Structure

- `guides/` — 用户指南（系统提示、代码补全格式、仓库任务、本地模式）
- `metric/` — 评测结果（BigCodeBench、NaturalCodeBench、NIAH、Function Call、Cross-File）
- `candle_demo/` — Rust Candle 部署示例
- `langchain_demo/` — LangChain 集成示例
- `llamaindex_demo/` — LlamaIndex 集成示例
- `repodemo/` — 仓库级代码问答演示（基于 Chainlit）

## Differences from Predecessors

- 相比 [[ai-game-devtools/codegeex2]]（6B 参数，16K 上下文），CodeGeeX4 参数量提升至 9B，上下文扩展至 128K（8 倍提升），新增 Function Call、代码解释器、仓库级任务等能力
- 相比 [[ai-game-devtools/codegeex]]（13B 参数），CodeGeeX4 以更少参数（9B）实现更强性能，得益于 GLM-4 基座和优化训练

## License

- 代码：Apache-2.0
- 模型权重：学术研究开放使用；商业用途需填写登记表

## Related Pages

- [[ai-game-devtools/codegeex]] — CodeGeeX 第一代（13B，KDD'23）
- [[ai-game-devtools/codegeex2]] — CodeGeeX 第二代（6B，ChatGLM2 架构）
- [[ai-game-devtools/glm-4]] — GLM-4 语言模型基座（THUDM）
- [[ai-game-devtools/deepseek-r1]] — DeepSeek 推理模型（同领域大模型）

## Links

- **GitHub**: https://github.com/THUDM/CodeGeeX4
- **Homepage**: https://codegeex.cn
- **HuggingFace**: https://huggingface.co/THUDM/codegeex4-all-9b
- **VS Code Extension**: https://marketplace.visualstudio.com/items?itemName=aminer.codegeex
- **JetBrains Extension**: https://plugins.jetbrains.com/plugin/20587-codegeex
- **HF Demo**: https://huggingface.co/spaces/THUDM/CodeGeeX
