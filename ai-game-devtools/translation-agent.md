---
title: Translation Agent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, agent, workflow, tool, python]
sources: [raw/articles/ai-game-devtools/translation-agent.md]
---

# Translation Agent

Andrew Ng 开发的反射式 Agent 翻译工作流，通过 LLM 的"翻译→反思→改进"三步循环实现高质量机器翻译。

## 概述

一个 Python 包，核心思路是让 LLM 不仅做翻译，还对自己的翻译进行反思和改进。使用 XML 标签（`<SOURCE_TEXT>`、`<TRANSLATION>`、`<EXPERT_SUGGESTIONS>`）分隔 prompt 中的不同部分。

**三步流水线：**
1. **初始翻译** — `one_chunk_initial_translation()`：直接 prompt LLM 翻译
2. **反思** — `one_chunk_reflect_on_translation()`：LLM 从 4 个维度评估翻译（准确性、流畅度、风格、术语一致性）
3. **改进** — `one_chunk_improve_translation()`：根据反思建议生成最终翻译

## 关键特性

- **区域语言定制**：支持指定目标语言的国家/地区变体（如"墨西哥西班牙语"）
- **长文本分块**：使用 `RecursiveCharacterTextSplitter`（[[ai-game-devtools/langchain]] 组件）自动分块，每块 ≤ 1000 tokens
- **分块翻译策略**：用 `<TRANSLATE_THIS>` 标记当前翻译块，其余文本作为上下文，保证翻译连贯性
- **多 LLM 支持 WebUI**：Gradio 界面支持 OpenAI、Groq、Ollama、Together AI 等多种端点
- **双 LLM 模式**：可用不同的 LLM 分别执行翻译和反思阶段

## 技术架构

| 组件 | 技术 |
|------|------|
| 核心引擎 | OpenAI API + tiktoken |
| 文本分块 | langchain-text-splitters (RecursiveCharacterTextSplitter) |
| WebUI | Gradio 4.37 |
| 包管理 | Poetry |
| 类型检查 | MyPy (strict 模式) |
| 格式化 | Ruff + Black |

**核心代码量：** `utils.py` 约 678 行，实现完整翻译流水线。

## 与同类工具的差异

| 维度 | Translation Agent | 传统 MT（Google/DeepL） |
|------|-------------------|------------------------|
| 架构 | Agent 反射循环 | 端到端 Transformer |
| 可定制性 | 极高（prompt 驱动） | 有限（API 参数） |
| 术语一致性 | 可注入 glossary | 依赖训练数据 |
| 速度 | 较慢（3 次 LLM 调用） | 极快（单次推理） |
| 成本 | 较高 | 较低 |
| 适用场景 | 高质量文学/专业文档 | 大批量日常翻译 |

## 扩展方向

- 自动术语表构建（LLM 提取文档关键术语）
- 更多语言对评测（特别是低资源语言）
- 更好的评估指标（超越 BLEU，可能用 LLM 做文档级评估）
- 用 Agent 翻译生成平行语料训练传统 MT 模型

## 许可证

MIT

## 相关链接

- GitHub: https://github.com/andrewyng/translation-agent
- HuggingFace Demo: https://huggingface.co/spaces/vilarin/Translation-Agent-WebUI

## 来源

- [[ai-game-devtools/langchain]] — 翻译 Agent 使用 langchain-text-splitters 进行文本分块
- [[ai-game-devtools/fabric]] — 同为 prompt 驱动的模块化 AI 工具框架
