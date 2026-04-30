---
title: Autonomous Agents
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [ai, agent, llm]
sources: []
---

# Autonomous Agents

能长期自主运行、由 LLM 驱动执行多步骤任务的 AI 系统。与单轮对话不同，autonomous agents 能规划、记忆、使用工具、调用 API，并在完成任务过程中进行自我反思。

## 核心特征

- **长期规划**：将复杂任务分解为子步骤，逐步执行
- **工具使用**：调用外部工具（搜索、代码执行、文件操作等）
- **记忆系统**：短期记忆（上下文）+ 长期记忆（向量数据库/知识库）
- **自我反思**：基于执行结果调整下一步行动

## 代表项目

| 项目 | 特色 |
|------|------|
| [[AutoGPT]] | 早期实验性 autonomous agent，GPT-4 驱动 |
| [[AgentGPT]] | Web 界面，基于 AutoGPT |
| [[ChatDev]] | 多 Agent 协作开发软件 |
| [[MetaGPT]] | 多 Agent 软件开发框架 |
| [[generative-agents]] | 斯坦福虚拟小镇实验 |
| [[manus]] | 多模态 autonomous agent |
| [[open-interpreter]] | 在本地运行 LLM 执行代码任务 |

## 核心技术栈

- **规划**：ReAct、CoT、ToT
- **工具调用**：ReWOO、ToolFormer
- **记忆**：[[rag-systems]]、向量数据库
- **多 Agent 协作**：AgentVerse、ChatDev

## 与 Game Dev 的结合

- [[nanobot]] 系列项目：游戏内 autonomous agent 框架
- NPC 行为控制、对话系统、Roguelike 游戏机制

## 相关概念

- [[agent]] — Agent 概念总览
- [[rag-systems]] — 检索增强生成
- [[llm-inference]] — LLM 推理优化
- [[multi-agent-systems]] — 多智能体系统
