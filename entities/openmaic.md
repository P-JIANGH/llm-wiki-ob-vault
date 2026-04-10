---
title: OpenMAIC
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [ai, multi-agent-ai, llm, agent, project]
sources: [raw/articles/thu-maic-openmaic-2026.md]
---

# OpenMAIC

## Overview
OpenMAIC (Open Multi-Agent Interactive Classroom) 是清华大学多智能体实验室 (THU-MAIC) 推出的开源 AI 教育平台。将任意主题或文档一键转化为沉浸式多智能体互动教室体验。

## Key Facts
- **开发者：** THU-MAIC（清华大学多智能体实验室）
- **许可证：** AGPL-3.0
- **发表：** JCST (DOI: 10.1007/s11390-025-6000-0)
- **官网：** https://open.maic.chat/
- **技术栈：** Next.js + Node.js/pnpm
- **支持模型：** OpenAI / Anthropic / Gemini / DeepSeek / MiniMax / xAI

## Architecture

### Lesson Generation Pipeline（两阶段）
1. **Outline Stage**：AI 分析输入内容，生成结构化课程大纲
2. **Scenes Stage**：大纲每个条目转化为丰富内容（幻灯片/测验/模拟/PBL）

### Classroom Components
| 组件 | 功能 |
|------|------|
| Slides | AI 授课，语音解说 + 聚光灯 + 激光笔动画 |
| Quiz | 交互式测验（单选/多选/简答），实时 AI 评分反馈 |
| Interactive Simulation | HTML 实验（物理模拟器、流程图） |
| Project-Based Learning | 与 AI agent 协作结构化项目，带里程碑 |

### Multi-Agent Interaction Modes
- **Classroom Discussion**：agent 主动发起讨论，用户可随时加入
- **Roundtable Debate**：多 agent 不同角色 + 白板图示
- **Q&A Mode**：自由提问，响应含幻灯片/图表/白板绘画
- **Whiteboard**：agent 实时绘图讲解概念

## Deployment
- **Vercel**（推荐）：一键部署
- **Docker**：`docker-compose up`
- **本地**：`pnpm dev` → http://localhost:3000

## OpenClaw 集成
通过 ClawHub 安装为 OpenClaw skill：`clawhub install openmaic`
支持飞书/Slack/Discord/Telegram/WhatsApp 等 20+ 平台的消息通道接入。

## Use Cases
- 学习 Python/JavaScript 等编程语言
- 桌游规则讲解（带可视化）
- 股票/金融数据分析（带图表）
- 论文解读与技术讲解

## Relationships
- [[openclaw]] — OpenMAIC 集成的消息框架
- [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念
- [[multi-agent-ai-game-impl]] — Microverse 多智能体游戏实现参考
- [[nanobot]] — HKUDS 轻量 Agent，另一个开源多 Agent 系统
