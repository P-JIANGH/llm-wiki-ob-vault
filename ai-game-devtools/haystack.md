---
title: Haystack
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, framework, tool, python, semantic-search, open-source]
sources: ["general knowledge"]
---

# Haystack

deepset 开发的开源 LLM 框架，用于构建基于检索增强生成（RAG）的生产级管道。Python 原生，支持灵活组件编排和多模型后端。

## 概述

Haystack 是一个面向生产环境的 RAG 框架，由 deepset（柏林 AI 公司）创建并维护。核心理念是将文档索引、检索、文本生成等步骤抽象为可组合的 **Pipeline**，开发者像搭积木一样构建完整的问答/搜索系统。

与 LangChain 的 Chain 抽象和 LlamaIndex 的数据框架不同，Haystack 强调**管道可视化**和**生产就绪性**——提供 REST API 服务器（Haystack API）、监控集成和明确的组件接口契约。

## Key Facts

| 属性 | 详情 |
|------|------|
| 开发者 | deepset（柏林） |
| 许可证 | Apache 2.0 |
| 语言 | Python |
| 架构版本 | v1（稳定）+ v2（重构，引入 `Pipeline` 2.0 语法） |
| GitHub | https://github.com/deepset-ai/haystack |
| 文档 | https://docs.haystack.deepset.ai |

## 核心概念

### Components

Haystack v2 将一切抽象为 **Component**——有明确输入/输出类型的 Python 类。常见组件：
- **DocumentStore**: 向量存储后端（Qdrant/Weaviate/Chroma/FAISS/PostgreSQL 等 20+）
- **Embedder**: 文本/文档向量化（支持 OpenAI/Cohere/SentenceTransformers 等）
- **Retriever**: 稠密/稀疏/混合检索（BM25 + Embedding）
- **PromptBuilder**: 动态模板引擎，组装 LLM 提示词
- **LLMGenerator**: 调用 LLM 生成回答（OpenAI/Anthropic/Cohere/HuggingFace）
- **Ranker**: 交叉编码器重排序（如 Cohere Reranker、CrossEncoder）

### Pipeline

组件按有向图连接，数据从输入节点流向输出节点。v2 语法示例：

```python
from haystack import Pipeline
pipe = Pipeline()
pipe.add_component("embedder", DocumentEmbedder())
pipe.add_component("retriever", EmbeddingRetriever())
pipe.connect("embedder", "retriever")
```

### DocumentStore

Haystack 将存储与检索分离——DocumentStore 是纯数据层，Retriever 是查询层。这种设计允许在不同向量数据库之间切换而不改变业务逻辑。

## 与同类工具对比

Haystack vs. [[ai-game-devtools/langchain]]：LangChain 更通用（Agent/Tool/Memory 全覆盖），但抽象层较厚、调试困难；Haystack 专注于 RAG，组件接口清晰，生产部署更直接。

Haystack vs. [[ai-game-devtools/llama-index]]：LlamaIndex 擅长复杂数据索引策略（多级索引、图谱 RAG）；Haystack 更注重端到端管道的标准化和可维护性。

## 在游戏开发中的应用场景

- 游戏知识库 RAG：将游戏设定/任务/世界观文档索引，NPC 可检索回答玩家问题
- 玩家反馈分析：对 Steam 评论/社区帖子做语义搜索和情感分类
- 游戏文档智能问答：帮助文档/SDK/API 文档的交互式检索
- 多语言游戏内容检索：利用 Haystack 的多语言 embedding 能力检索多语言游戏文本

## Links

- GitHub: https://github.com/deepset-ai/haystack
- Docs: https://docs.haystack.deepset.ai
- Discord: https://discord.gg/haystack
