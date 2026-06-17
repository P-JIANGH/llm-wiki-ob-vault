# Cat Town

> 原始来源: https://github.com/ykhli/cat-town
> 获取时间: 2026-04-15

## 概述

Cat Town 是一个基于 ChatGPT 的猫咪模拟游戏，基于 [AI-town](https://github.com/a16z-infra/ai-town) 项目 fork 并定制开发。灵感来自论文 *Generative Agents: Interactive Simulacra of Human Behavior* (arXiv:2304.03442)。

## Live Demo

- https://cat-town.fly.dev/

## 技术栈

基于 AI-town 的技术架构:

- **前端**: Next.js + TypeScript
- **游戏引擎**: Convex
- **渲染**: PixiJS (像素风格)
- **LLM**: OpenAI / Ollama / Together.ai
- **认证**: Clerk
- **向量数据库**: Pinecone / hnswlib-node

## 核心模块

### convex/ 目录 (后端)

| 文件 | 功能 |
|------|------|
| agent.ts | Agent 行为逻辑 |
| engine.ts | 游戏引擎核心 (tick 模型) |
| journal.ts | 记忆/日志系统 |
| conversation.ts | 对话生成 |
| players.ts | 玩家管理 |
| chat.ts | 聊天功能 |
| crons.ts | Cron 调度任务 |
| schema.ts | 数据库 schema |
| config.ts | 配置管理 |

### src/ 目录 (前端)

| 文件 | 功能 |
|------|------|
| app/ | Next.js 应用 |
| components/ | React 组件 |
| middleware.ts | 中间件 |

## 资产

- Pixel cat pack by joao9396 (itch.io)
- 16x16 游戏素材 (opengameart.org)

## 许可证

MIT License

## 与 AI-town 的关系

Cat Town 是 AI-town 的 fork 版本，将主题从人类小镇改为猫咪小镇。使用相同的底层架构（Convex + PixiJS + LLM），仅更换了角色和美术资源。

## 安装

请参考 [AI-town](https://github.com/a16z-infra/AI-town) 的安装说明。

## 社区

- Discord: AI Stack Devs (https://discord.gg/PQUmTBTGmT)
