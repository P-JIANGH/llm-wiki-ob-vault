---
title: Vector Databases
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [database, vector-search, rag, retrieval]
sources: []
---

# Vector Databases

向量数据库，用于存储和检索高维向量（嵌入向量）。

## 常见方案

| 数据库 | 特点 |
|--------|------|
| [[Chroma]] | 轻量，Python 优先 |
| Qdrant | 高性能，生产可用 |
| Milvus | 大规模分布式 |
| FAISS | Facebook 开源，内存高效 |

## RAG 应用

RAG 系统用向量数据库存储文档嵌入，实现语义检索。

## 相关

- [[rag-systems]] — RAG 系统
- [[llamaindex]] — RAG 框架
