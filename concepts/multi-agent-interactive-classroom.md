---
title: Multi-Agent Interactive Classroom
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, agent, workflow]
sources: [raw/articles/thu-maic-openmaic-2026.md]
---

# Multi-Agent Interactive Classroom

## Definition
多智能体互动教室是一种 AI 教育体验模式：通过多个 Agent 分别扮演教师、学生、主持人等角色，在虚拟教室环境中协作完成教学。区别于传统单 Agent 对话，multi-agent classroom 让多个 AI agent 互相讨论、提问、辩论，并使用白板等工具。

## Core Components

### Lesson Generation Pipeline
两阶段内容生成：
1. **Outline Generation**：分析输入 → 生成结构化课程大纲
2. **Scene Generation**：每个大纲条目 → 幻灯片/测验/模拟/PBL 活动

### Classroom Interaction Modes
| 模式 | 说明 |
|------|------|
| Classroom Discussion | Agent 主动发起讨论，用户随时可插话 |
| Roundtable Debate | 多角色 Agent 辩论 + 白板图示 |
| Q&A Mode | 自由提问，AI 通过幻灯片/图表/白板作答 |
| Whiteboard Drawing | Agent 实时绘图解方程/画流程图/概念图解 |

### Content Types
- **Slides**：AI 授课 + 语音解说 + 聚光灯/激光笔动画
- **Quiz**：单选/多选/简答，实时 AI 评分 + 反馈
- **Interactive Simulation**：HTML 可交互模拟（物理/流程图/可视化）
- **Project-Based Learning**：结构化项目协作，里程碑交付

## Export
- PowerPoint (.pptx)：含图片/图表/LaTeX 公式
- Interactive HTML：自包含网页含交互模拟

## 与其他多 Agent 框架的对比

| 维度 | OpenMAIC | [[nanobot]] | [[deer-flow]] | [[ClawTeam]] |
|------|----------|-------------|--------------|--------------|
| 定位 | AI 教育平台 | 通用 Agent | Super Agent Harness | Agent Swarm |
| 核心创新 | 课堂互动/白板 | 轻量/HKUDS | LangGraph + Sandbox | CLI组队 |
| UI形态 | Web 教室 | 消息通道 | Web + Sandbox | CLI |
| 特色 | PPT/Quiz/模拟 | 13渠道 | 12步middleware | git worktree |

## 技术要点
- [[multi-agent-ai-simulation]] — 多智能体通用概念
- [[agent-loop]] — Agent 执行循环
- [[langgraph]] — 工作流编排（DeerFlow 用到）

## Related
- [[openmaic]] — OpenMAIC 项目页面
- [[openclaw]] — OpenClaw 消息框架（OpenMAIC 集成）
