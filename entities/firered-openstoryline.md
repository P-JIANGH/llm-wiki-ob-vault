---
title: FireRed-OpenStoryline
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, video, agent, open-source]
sources: [raw/articles/firered-openstoryline-2026.md]
---

## Overview

FireRed-OpenStoryline 是 FireRedTeam（关联 [[openclaw]]）开源的 AI 视频创作工具，将复杂视频制作转化为自然直观的对话式体验。2026-02-10 开源，Apache 2.0。

## Key Facts

- **开源时间**：2026-02-10
- **License**：Apache 2.0
- **Python**：>= 3.11
- **HuggingFace**：https://huggingface.co/FireRedTeam
- **ModelScope**：https://www.modelscope.cn/studios/FireRedTeam/FireRed-OpenStoryline
- **架构**：LangChain Agent + FastMCP + 15+ 视频处理节点

## Relationships

- [[openclaw]] — FireRed-OpenStoryline 的 Skills 来源（openstoryline-install / openstoryline-use）
- [[nanobot]] — 类似的 Agent 运行时架构，但专注领域不同
- [[deer-flow]] — 类似的 LangGraph + MCP 编排架构

## Tech Stack

- LangChain (`create_agent`)
- LangChain-MCP-Adapters (`MultiServerMCPClient`)
- FastMCP（本地 MCP Server）
- MoviePy + FFmpeg（视频处理）
- Pydantic（数据模型）
