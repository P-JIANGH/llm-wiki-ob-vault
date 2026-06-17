# FastGPT — AI Agent 构建平台

## 基本信息
- **GitHub**: https://github.com/labring/FastGPT
- **License**: FastGPT Open Source License (允许后台服务直接商用，不允许提供 SaaS 服务)
- **组织**: labring (Sealos 团队)

## 概述
FastGPT 是一个 AI Agent 构建平台，提供开箱即用的数据处理、模型调用等能力，同时可以通过 Flow 可视化进行工作流编排，从而实现复杂的应用场景。

## 核心功能

### 应用编排能力
- 规划 Agent 模式
- 对话工作流、插件工作流，包含基础的 RPA 节点
- 用户交互
- 双向 MCP (Model Context Protocol)
- 辅助生成工作流（开发中）

### 应用调试能力
- 知识库单点搜索测试
- 对话时反馈引用并可修改与删除
- 完整调用链路日志
- 应用评测
- 高级编排 DeBug 调试模式（开发中）
- 应用节点日志（开发中）

### 知识库能力
- 多库复用，混用
- chunk 记录修改和删除
- 支持手动输入，直接分段，QA 拆分导入
- 支持 txt, md, html, pdf, docx, pptx, csv, xlsx, URL 读取, CSV 批量导入
- 混合检索 & 重排
- API 知识库
- RAG 模块热插拔（开发中）

### OpenAPI 接口
- completions 接口 (chat 模式对齐 GPT 接口)
- 知识库 CRUD
- 对话 CRUD
- 自动化 OpenAPI 接口

### 运营能力
- 免登录分享窗口
- Iframe 一键嵌入
- 统一查阅对话记录，并对数据进行标注
- 应用运营日志

### 其他
- 可视化模型配置
- 支持语音输入和输出（可配置语音输入语音回答）
- 模糊输入提示
- 模板市场

## 技术架构

### 项目结构
```
projects/
├── app/               # FastGPT 核心应用（Next.js 前端 + Node.js 后端）
├── marketplace/       # 模板市场
├── agent-sandbox/     # 沙盒项目，运行工作流里的代码执行（Python 3.11）
├── code-sandbox/      # 代码沙盒
├── mcp_server/        # MCP 服务器
└── volume-manager/    # 卷管理器
```

### 核心技术栈
- **前端**: Next.js (app 项目), React, Chakra UI, ReactFlow (可视化流程编排), ECharts
- **后端**: Node.js (tsx server), TypeScript
- **数据库/存储**: @fastgpt-sdk/storage, MinIO
- **AI 集成**: MCP SDK, Model Context Protocol
- **包管理**: pnpm 9.x, Node.js >= 20

### 版本
- app 版本: 4.14.10.1

## 部署方式
- Docker (推荐): `docker compose up -d`
- Sealos Cloud 一键部署
- 本地开发: `pnpm dev` / `pnpm dev:skill`

## 相关项目
- [fastgpt-plugin](https://github.com/labring/fastgpt-plugin) — FastGPT 插件系统
- [AI Proxy](https://github.com/labring/aiproxy) — 大模型聚合负载均衡服务
- [Laf](https://github.com/labring/laf) — 3 分钟快速接入三方应用
- [Sealos](https://github.com/labring/sealos) — 快速部署集群应用

## 与同类工具差异
- 强调可视化 Flow 工作流编排，适合复杂业务流程
- 内置知识库 + RAG + 混合检索开箱即用
- 支持双向 MCP 协议
- 专注企业级 AI 应用场景，提供商业版
- 与 Dify 类似但更强调 Agent 编排能力
