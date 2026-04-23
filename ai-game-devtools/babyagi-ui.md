---
title: BabyAGI UI
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [tool, agent, nextjs, typescript, open-source, frontend]
sources: [raw/articles/ai-game-devtools/babyagi-ui.md]
---

# BabyAGI UI

BabyAGI UI 是 [[babyagi]] 的 Web 界面实现，由 Yoshiki Miura 开发。它将 yoheinakajima 的实验性自构建 Agent 框架包装成类似 ChatGPT 的交互式 Web 应用，降低了使用门槛。

## 核心功能

- **ChatGPT 式交互界面**：通过 Web UI 与 BabyAGI 代理对话，无需命令行
- **并行任务处理**：支持用户输入与代理任务并行执行（BabyDeerAGI 模式）
- **技能系统**：BabyElfAGI 技能类架构，便于扩展新能力
- **多模型支持**：兼容 gpt-3.5-turbo/gpt-4 系列模型
- **搜索集成**：通过 SerpAPI 集成网络搜索能力（BabyBeeAGI）
- **国际化**：支持多语言界面

## 技术架构

| 层级 | 技术 |
|------|------|
| 前端框架 | Next.js 13 + React 18 |
| UI 组件 | Radix UI + Tailwind CSS |
| AI 框架 | LangChain.js 0.0.64 |
| 向量数据库 | Pinecone |
| LLM 接口 | OpenAI API |
| 部署 | Vercel / Docker |

## 与原版 BabyAGI 的差异

| 维度 | BabyAGI (原版) | BabyAGI UI |
|------|---------------|-----------|
| 界面 | 命令行 (Python) | Web UI (Next.js) |
| 交互 | 一次性启动 | 实时对话式 |
| 任务可视化 | 文本日志 | 可折叠侧边栏 + 状态面板 |
| 扩展性 | 需修改代码 | Skills Class 插件化 |
| 部署 | 本地运行 | Vercel 一键部署 |

## 关键文件结构

```
src/
├── utils/
│   ├── execution.ts    # Agent 执行引擎
│   ├── task.ts         # 任务管理
│   ├── objective.ts    # 目标处理
│   └── prompt.ts       # Prompt 模板
├── hooks/
│   ├── useExecutionStatus.tsx  # 执行状态监控
│   └── useErrorHandler.ts      # 错误处理
└── pages/            # Next.js 页面路由
```

## 部署方式

1. **本地开发**：`npm install && npm run dev`
2. **Vercel**：点击 Deploy 按钮一键部署
3. **Docker**：提供 Dockerfile 和 docker-compose.yml

## 依赖配置

- **必填**：OpenAI API Key、Pinecone API Key + Index
- **可选**：SerpAPI Key（启用搜索功能）

## 许可证

MIT License (2023 Yoshiki Miura)

## 相关链接

- GitHub: https://github.com/miurla/babyagi-ui
- Demo: https://babyagi-ui.vercel.app/
- 上游项目：[[babyagi]]