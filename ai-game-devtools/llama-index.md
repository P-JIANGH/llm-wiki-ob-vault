# LlamaIndex

---
title: LlamaIndex
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [framework, ai, llm, tool, python, open-source, agent, workflow]
sources: [raw/articles/ai-game-devtools/llama-index.md]
---

## Overview

**LlamaIndex** 是一个开源的"数据框架"（data framework），用于构建 LLM 应用程序。核心功能是将 LLM 与私有/自定义数据连接起来，通过数据摄取、结构化、检索和查询接口实现增强式 AI 应用。

由 Jerry Liu 于 2022 年创建，拥有 300+ 集成包和活跃的社区。

## 关键信息

| 属性 | 值 |
|------|-----|
| GitHub | https://github.com/run-llama/llama_index |
| 许可证 | MIT |
| 语言 | Python |
| 作者 | Jerry Liu (LlamaIndex 公司) |
| 创建时间 | 2022 年 |
| 集成数 | 300+ (LlamaHub) |
| PyPI | llama-index, llama-index-core |

## 核心功能

### 数据框架四大支柱
1. **数据连接器** — 从 API、PDF、文档、SQL 等数据源摄取数据
2. **数据结构化** — 索引（indices）、图（graphs）供 LLM 消费
3. **高级检索/查询** — 输入 LLM prompt，返回检索到的上下文 + 知识增强输出
4. **框架集成** — 与 LangChain、Flask、Docker、ChatGPT 等轻松集成

### 安装方式
- **入门版**: `pip install llama-index` — 核心 + 精选集成
- **定制版**: `pip install llama-index-core` + 按需安装特定集成包

### 架构设计
- 命名空间模式: `llama_index.core.xxx` 为核心模块，`llama_index.xxx.yyy` 为集成
- 高级 API：5 行代码即可完成基本的数据摄取和查询
- 低级 API：允许自定义任何模块（连接器、索引、检索器、查询引擎等）

### 核心模块
- **agent/** — Agent 框架
- **indices/** — 索引实现（VectorStoreIndex 等）
- **llms/** — LLM 抽象层（支持 OpenAI、Ollama 等）
- **embeddings/** — 嵌入模型
- **retrievers/** — 检索策略
- **node_parser/** — 文档分块/解析
- **workflows/** — 工作流编排
- **memory/** — 对话记忆

### LlamaParse（企业平台）
LlamaIndex 旗下的企业级文档处理平台：
- **Parse** — Agentic OCR，支持 130+ 文档格式
- **Extract** — 结构化数据提取
- **Index** — 摄取、索引和 RAG 管道
- **Split** — 大文档分类拆分
- **Agents** — 使用 Workflows 构建端到端文档 Agent

## 游戏开发应用场景

在游戏开发中，LlamaIndex 可用于：
- **NPC 对话系统** — 基于游戏设定文档构建 RAG 知识库，NPC 回答玩家问题时检索相关 lore
- **游戏文档助手** — 将 Unity/Unreal 文档、API 参考索引化，AI 辅助编码
- **游戏内容生成** — 基于游戏设计文档，通过检索增强生成任务描述、物品说明等
- **Mod 开发辅助** — 将 Mod 开发指南索引化，AI 助手回答 Mod 开发问题

## 技术特点

- **多 LLM 支持** — 通过集成包支持 OpenAI、Ollama、HuggingFace 等
- **多向量存储** — 支持 Chroma、Pinecone、Weaviate 等多种后端
- **多模态** — 支持多模态 LLM（`multi_modal_llms/` 模块）
- **图 RAG** — `graph_rag/` 模块支持基于知识图谱的检索
- **可持久化** — 索引可保存到磁盘并重新加载
- **可扩展** — 300+ 集成包覆盖 LLM、嵌入、向量存储、文档读取器等

## 与同类工具差异

- 相比 [[ai-game-devtools/langchain]]：LlamaIndex 专注于数据摄取和检索（RAG），LangChain 更通用（工作流/Agent 编排）
- 相比 [[ai-game-devtools/crewai]]：CrewAI 侧重多 Agent 协作，LlamaIndex 侧重数据到 LLM 的桥接
- 相比 [[ai-game-devtools/dify]]：Dify 是完整的 AI 应用开发平台（含 UI），LlamaIndex 是纯代码框架
- 两者互补：LangChain 可使用 LlamaIndex 作为检索组件

## 示例代码

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 加载文档
documents = SimpleDirectoryReader("data").load_data()

# 构建索引
index = VectorStoreIndex.from_documents(documents)

# 持久化
index.storage_context.persist()

# 查询
query_engine = index.as_query_engine()
response = query_engine.query("游戏 NPC 的性格设定是什么？")
```

## 相关链接

- 🔗 文档: https://developers.llamaindex.ai/python/framework/
- 🔗 LlamaHub: https://llamahub.ai/
- 🔗 Discord: https://discord.gg/dGcwcsnxhU
- 🔗 论文引用: Liu, J. (2022). LlamaIndex. Zenodo.
