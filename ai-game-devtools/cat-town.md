---
title: Cat Town
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, agent, game, llm, open-source]
sources: [raw/articles/ai-game-devtools/cat-town.md]
---

# Cat Town

一个基于 ChatGPT 的猫咪模拟游戏，将 [[ai-game-devtools/ai-town|AI Town]] 的主题从人类小镇改为可爱的猫咪世界。灵感来自 Stanford 论文 *Generative Agents* (arXiv:2304.03442)。

## 概述

- **类型:** AI Agent 模拟 / 休闲游戏
- **开源:** GitHub: [ykhli/cat-town](https://github.com/ykhli/cat-town)
- **License:** MIT
- **技术栈:** TypeScript + Convex + PixiJS + Next.js

## 技术特点

### 继承自 AI-town

Cat Town 基于 [[ai-game-devtools/ai-town|AI Town]] 的完整技术架构:

- **Convex 后端**: 游戏引擎 + 数据库 + 向量搜索 + Cron 调度
- **PixiJS 渲染**: 像素风格小镇场景
- **可配置 LLM**: 支持 Ollama / OpenAI / Together.ai
- **记忆系统**: 对话后 GPT 总结 → embedding → 向量检索

### 定制内容

与 AI-town 的主要区别:

- 角色主题从人类改为猫咪（像素猫 sprite）
- 资产使用 [Pixel cat pack](https://joao9396.itch.io/pixel-cats-pack)
- 前端主题适配猫咪风格

## 部署

- [Live Demo](https://cat-town.fly.dev/) (Fly.io 托管)

## 社区

- Discord: AI Stack Devs

## 相关工具

- [[ai-game-devtools/ai-town|AI Town]] — 原始项目
- [[ai-game-devtools/agentsims|AgentSims]] — 另一个 AI Agent 模拟框架
- [[ai-game-devtools/generative-agents|Generative Agents]] — Stanford 原版论文实现
