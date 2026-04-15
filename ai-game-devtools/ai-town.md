---
title: AI Town
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, agent, game, llm, open-source]
sources: [raw/articles/ai-game-devtools/ai-town.md]
---

# AI Town

a16z-infra 团队开发的虚拟小镇模拟器，AI 角色在小镇中自主生活、聊天和社交。灵感来自 Stanford 论文 *Generative Agents: Interactive Simulacra of Human Behavior* (arXiv:2304.03442)。核心目标是提供一套 **JS/TS 写的、可直接部署的 AI Agent 模拟入门套件**，区别于 Python 生态的传统方案。

## 概述

- **类型:** AI Agent 模拟 / 游戏
- **开源:** GitHub: [a16z-infra/ai-town](https://github.com/a16z-infra/ai-town)
- **License:** (见 LICENSE 文件)
- **技术栈:** TypeScript + Convex + PixiJS + Ollama/OpenAI/Together.ai

## 技术特点

### Convex 后端架构

使用 [Convex](https://convex.dev) 作为后端平台，集成了：
- **数据库**（NoSQL + schema 验证）
- **游戏引擎** (`convex/engine/abstractGame.ts`)
- **向量搜索** (hnswlib-node)
- **调度/Cron** 任务系统

游戏引擎采用 `tick()` 模型：60 ticks/秒驱动平滑移动，1 step/秒执行实际逻辑，step 结束时批量写入数据库 diff。单线程设计通过 generation number 防止并发冲突。

### Agent 架构

Agent 运行在游戏循环中（`convex/agent/`）：
1. `Agent.tick()` 在游戏循环内同步修改游戏状态
2. 需要 LLM 时通过 `startOperation` → `internalAction` 异步调用外部 API
3. 对话 prompt 工程在 `convex/agent/conversations.ts` 实现
4. 记忆系统 (`memory.ts`)：对话结束后 GPT 总结 → embedding → 存入 Convex 向量数据库；新对话时检索最相似的3条记忆注入 prompt

### 可配置的 LLM

支持多种 LLM 后端，切换时需匹配 embedding dimension：
- **Ollama**（默认，本地）：`llama3` + `mxbai-embed-large`
- **OpenAI**：GPT 系列 + text-embedding-ada-002
- **Together.ai**：开源模型
- **任意 OpenAI 兼容 API**（Anthropic/Groq/Azure）

### 渲染与资产

前端使用 [PixiJS](https://pixijs.com) (`pixi-react`) 渲染像素风格小镇。背景音乐由 Replicate + [[ai-game-devtools/musicgen|MusicGen]] 生成（通过 `convex/music.ts` 控制 prompt）。

## 与同类工具的差异

| 维度 | AI Town | [[ai-game-devtools/agentsims|AgentSims]] | [[ai-game-devtools/llmunity|LLMUnity]] |
|------|---------|---------------------|----------------|
| 语言 | TypeScript | Python | C# / Unity |
| 后端 | Convex (云托管) | 自定义 | Unity Editor |
| 架构 | 游戏引擎 + Agent 解耦 | AgentSims 仿真框架 | Unity GameObject 组件 |
| 部署 | 一键 Convex 云 / Docker | 自行搭建 | Unity 导出 |
| 记忆 | Convex 向量数据库 | 自行实现 | Unity 生命周期 |

## 目录结构

```
convex/           # 后端
  aiTown/         # AI Town 特定逻辑
  agent/          # Agent（异步 LLM 调用/记忆）
  engine/         # 游戏引擎框架（AbstractGame）
  util/llm.ts     # LLM 配置
  music.ts        # 背景音乐生成
  crons.ts        # Cron 任务
src/              # 前端（React + PixiJS）
data/
  characters.ts  # 角色定义
  gentle.js       # 地图数据
  convertMap.js   # Tiled 地图转换脚本
```

## 相关链接

- [Live Demo](https://www.convex.dev/ai-town)
- [Convex 文档](https://docs.convex.dev)
- 原始论文: *Generative Agents* (Stanford, 2023)
