---
title: RAG Systems
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [rag, llm, retrieval, knowledge]
sources: []
---

# RAG Systems

Retrieval-Augmented Generation（检索增强生成），通过检索外部知识来增强 LLM 的生成能力。

## 核心组件

```
Query → Retriever → Retrieved Docs → LLM → Response
```

## 技术栈

- **向量数据库**：Chroma、Qdrant、Pinecone、FAISS
- **Embedding 模型**：OpenAI embeddings、bge 系列
- **框架**：[[LlamaIndex]]、LangChain

## 游戏开发应用

- 游戏攻略知识库问答
- NPC 背景知识注入
- 游戏机制问答机器人

## 优化方向

- Hybrid search（稀疏+稠密）
- Reranking
- Self-RAG

## 相关

- [[llamaindex]] — RAG 框架
- [[langchain]] — 应用框架
- [[vector-databases]] — 向量数据库
