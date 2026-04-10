---
title: THU-MAIC/OpenMAIC GitHub Repository
url: https://github.com/THU-MAIC/OpenMAIC
created: 2026-04-10
type: source
tags: [source]
---

# THU-MAIC/OpenMAIC

## Basic Info
- **Repository:** THU-MAIC/OpenMAIC
- **Paper:** JCST (DOI: 10.1007/s11390-025-6000-0)
- **License:** AGPL-3.0
- **Live Demo:** https://open.maic.chat/
- **Framework:** Next.js + Node.js/pnpm

## Overview
OpenMAIC (Open Multi-Agent Interactive Classroom) 是一个开源 AI 平台，将任意主题或文档转化为沉浸式互动教室体验。由多智能体编排驱动，生成幻灯片、测验、互动模拟和项目式学习活动——由 AI 教师和同学交付，他们能说话、在白板上绘图，并参与实时讨论。

## Quick Start
```
git clone https://github.com/THU-MAIC/OpenMAIC.git
cd OpenMAIC
pnpm install
# 配置 .env.local (至少一个 LLM provider)
pnpm dev
# 打开 http://localhost:3000
```

## 支持的 LLM Provider
- OpenAI (GPT)
- Anthropic (Claude)
- Google Gemini
- DeepSeek
- MiniMax
- xAI (Grok)

**推荐模型:** Gemini-3-Flash（性价比最优）；最高质量用 Gemini-3.1-Pro

## 特性

### Lesson Generation Pipeline（两阶段）
| Stage | Description |
|-------|-------------|
| Outline | AI 分析输入内容，生成结构化课程大纲 |
| Scenes | 大纲每个条目转化为丰富内容——幻灯片/测验/模拟/PBL 活动 |

### Classroom Components
- 🎓 Slides：AI 授课，带语音解说、聚光灯效果、激光笔动画
- 🧪 Quiz：交互式测验（单选/多选/简答），实时 AI 评分和反馈
- 🔬 Interactive Simulation：HTML 实验——物理模拟器、流程图、可视化工具
- 🏗️ Project-Based Learning：与 AI agent 协作完成结构化项目，带里程碑

### Multi-Agent Interaction
- **Classroom Discussion**：agent 主动发起讨论，用户可随时加入
- **Roundtable Debate**：多 agent 不同角色，讨论+白板图示
- **Q&A Mode**：自由提问，响应通过幻灯片/图表/白板绘画
- **Whiteboard**：agent 实时绘图——解方程、画流程图、图解概念

### Export Formats
- PowerPoint (.pptx)：含图片/图表/LaTeX 公式
- Interactive HTML：自包含网页，含交互模拟

## Deployment
- Vercel（推荐）
- Docker：`docker-compose up`
- 可选 MinerU（高级 PDF 解析）：设置 `PDF_MINERU_BASE_URL`

## OpenClaw 集成
OpenMAIC 与 OpenClaw 集成，支持飞书/Slack/Discord/Telegram/WhatsApp 等 20+ 平台。
通过 ClawHub 安装：`clawhub install openmaic`

## Use Cases
- "Teach me Python from scratch in 30 min"
- "How to play the board game Avalon"
- "Analyze the stock prices of Zhipu and MiniMax"
- "Break down the latest DeepSeek paper"

## Project Structure
```
OpenMAIC/
├── app/                      # Next.js App Router
│   ├── api/                  # Server API routes (~18 endpoints)
│   │   ├── generate/         # Scene generation pipeline
│   │   ├── generate-classroom/ # Async job submission + polling
│   │   ├── chat/             # Chat routes
│   │   └── [...]
│   ├── classroom/            # Classroom UI (page.tsx + hooks)
│   ├── components/           # Reusable components
│   ├── lib/                  # Shared utilities
│   └── stores/               # State management
├── prompts/                  # System prompts (per-language)
├── skills/                   # OpenClaw skill files
└── public/
```

## 相关链接
- Demo: https://open.maic.chat/
- Paper: JCST DOI: 10.1007/s11390-025-6000-0
