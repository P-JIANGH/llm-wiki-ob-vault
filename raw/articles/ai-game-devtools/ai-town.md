# AI Town — 源码摘要

**URL:** https://github.com/a16z-infra/ai-town  
**License:** (查看 LICENSE 文件)  
**Date:** 2026-04-15

## 项目概述

AI Town 是 a16z infra 团队开发的一个虚拟小镇模拟项目，AI 角色在此小镇中生活、聊天和社交。灵感来自论文 *Generative Agents: Interactive Simulacra of Human Behavior* (Stanford, arxiv 2304.03442)。

目标：提供一个用 JS/TS 构建的、可部署的 AI Agent 模拟入门套件，区别于 Python 写的传统方案。

## 技术栈

- **后端/数据库/向量搜索:** [Convex](https://convex.dev) — TypeScript 原生，支持 schema、transactions、vector search
- **前端渲染:** PixiJS (via pixi-react)
- **LLM:** 默认 `llama3`（Ollama），可配置 OpenAI/Together.ai/任意 OpenAI 兼容 API
- **Embedding:** `mxbai-embed-large`，可切换 Ollama 模式
- **背景音乐生成:** Replicate + MusicGen
- **像素图生成:** Replicate + Fal.ai
- **可选 Auth:** Clerk

## 目录结构

```
ai-town/
├── convex/              # Convex 后端（TypeScript）
│   ├── aiTown/          # AI Town 游戏逻辑
│   │   ├── world.ts     # 世界/地图数据模型
│   │   ├── player.ts    # 玩家/角色
│   │   ├── conversations.ts  # 对话
│   │   ├── conversationMembership.ts  # 对话成员状态
│   │   ├── inputs.ts    # 输入定义（join/moveTo/startConversation 等）
│   │   ├── agent.ts     # Agent 在游戏循环中的逻辑
│   │   └── agentInputs.ts
│   ├── agent/           # Agent 异步任务
│   │   ├── schema.ts
│   │   ├── conversations.ts  # 对话 prompt 工程
│   │   ├── memory.ts     # 记忆层（向量数据库）
│   │   └── embeddingsCache.ts
│   ├── engine/          # 游戏引擎框架
│   │   ├── abstractGame.ts
│   │   ├── schema.ts
│   │   └── ...
│   ├── util/
│   │   ├── llm.ts       # LLM 配置（Ollama/OpenAI/Together.ai）
│   │   └── openai.ts
│   ├── music.ts         # 背景音乐生成
│   ├── crons.ts         # Cron 任务
│   ├── init.ts          # 初始化
│   └── schema.ts        # 全局 schema
├── src/                 # 前端（React + PixiJS）
├── data/
│   ├── characters.ts    # 角色定义（名字/描述/spritesheet）
│   ├── gentle.js        # 地图数据
│   └── convertMap.js    # Tiled 地图转换脚本
├── package.json         # Node 18, TypeScript, Vite, pixi.js, convex
└── docker-compose.yml   # 自托管 Convex 方案
```

## 核心架构（来自 ARCHITECTURE.md）

### 游戏引擎 (`convex/engine`)

- `AbstractGame` 基类：输入协调、模拟推进、状态保存加载、调度管理
- `tick()` 模型：60 ticks/秒（平滑移动），1 step/秒（实际逻辑推进）
- Step 批处理：每次加载游戏状态到内存 → 执行多 tick → 计算 diff → 写回数据库
- 单线程保证：generation number 防并发冲突

### 数据模型

- **World**: 地图 + 多玩家
- **Player**: 角色（名字/描述/当前位置/路径规划）
- **Conversation**: 对话（发起者，终止时间）
- **ConversationMembership**: 成员状态（invited / walkingOver / participating）
- 消息表与游戏引擎解耦（流式更新频繁，单独管理）

### Agent 架构 (`convex/agent`)

1. `Agent.tick()` 在游戏循环中运行，修改游戏状态
2. 需要 LLM 时调用 `startOperation` → internalAction
3. internalAction 调用 OpenAI client 执行推理
4. 通过 `insertInput` 提交游戏状态变更
5. 完成后删除 `inProgressOperation`（保证单线程）

### 记忆系统 (`convex/agent/memory.ts`)

- 对话后用 GPT 总结消息历史 → 计算 embedding → 存入 Convex 向量数据库
- 启动新对话时，查询相关记忆注入 prompt（找最相似的3条）

### Embedding 缓存 (`convex/agent/embeddingsCache.ts`)

- 按文本 hash 缓存 embedding，避免重复计算

## 部署方式

1. **标准 Convex 云**（推荐）：`npm install` → `npm run dev`，需 Convex 账号
2. **Docker Compose**（自托管 Convex）：`docker compose up --build`
3. **Pinokio 一键安装**
4. **Fly.io**

## LLM 配置

- 默认 Ollama（本地）：`ollama pull llama3`
- OpenAI：设置 `OPENAI_API_KEY`
- Together.ai：设置 `TOGETHER_API_KEY`
- 任意 OpenAI 兼容 API：设置 `LLM_API_URL` / `LLM_API_KEY` / `LLM_MODEL`
- 换 LLM 后须清空数据库重新初始化（embedding dimension 必须匹配）

## 自定义

- `data/characters.ts` — 角色名称/描述/像素图
- `data/gentle.js` — 地图（Tiled 导出 JSON 后用 convertMap.js 转换）
- `convex/music.ts` — 背景音乐生成 prompt
- `convex/crons.ts` — 音乐生成频率/世界暂停逻辑

## 主要依赖

- convex ^1.19.2
- pixi.js ^7.2.4
- pixi-react ^7.1.0
- react 18.2.0
- vite ^4.4.9
- hnswlib-node ^1.4.2（向量搜索）
- replicate ^0.18.0（音乐/图像生成）
- tailwindcss ^3.3.3
