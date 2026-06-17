---
title: FlowGram
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, workflow, frontend]
sources: [raw/articles/coze-studio-github-2026.md]
---

# FlowGram

## Definition
FlowGram 是字节跳动自研的**基于节点的可视化工作流构建引擎**，通过前端拖拽式编辑器帮助开发者快速创建固定布局或自由连线的复杂工作流。已在飞书低代码平台、Coze 工作流等 30+ 字节产品中验证。

## 双布局模式

| 布局类型 | 说明 | 适用场景 |
|----------|------|----------|
| **固定布局** | 卡片式排列，节点拖拽，结构化 DAG | 审批流、数据处理流水线 |
| **自由布局** | 灵活连线，流程图式自由连线 | 复杂决策树、实验性逻辑 |

## 核心功能

### 节点类型
- 条件分支（if/else）
- 循环执行（for/while）
- 嵌套子流程（嵌入子工作流）
- AI 自动化任务（数据清洗、报告生成）
- 自定义节点扩展

### AI 能力集成
- 后端支持豆包、DeepSeek、Kimi 等大模型调用
- 支持在工作流中嵌入 LLM 调用节点
- Prompt 配置与模型选择一体化

### 交互体验
- 拖拽、连线、节点配置、参数输入
- 状态高亮（运行中/完成/失败）
- 实时预览

## 在 Coze Studio 中的角色
FlowGram 是 Coze Studio 前端的可视化工作流编辑器：
- 用户通过拖拽节点编排 Workflow
- 编排结果通过 Eino 框架执行
- 支持导出为可复用的工作流模板

## 技术架构
- **前端：** React + TypeScript，节点拖拽和连线交互
- **后端：** Node.js 服务 + Eino AI 集成
- **部署：** 需配合 Coze Studio 后端运行

## 相关框架对比

| 框架 | 开发方 | 特点 |
|------|--------|------|
| FlowGram | 字节跳动 | 双布局模式，拖拽节点，AI 集成 |
| [[langgraph]] | LangChain | 图结构编程，Python 优先 |
| Dify Workflow | Dify | 开源可视化编排，单布局 |
| Coze 工作流 | 字节跳动(线上版) | 闭源，功能最完整 |

## Related
- [[coze-studio]] — FlowGram 的主要应用
- [[Eino]] — FlowGram 编排流程的执行引擎
- [[ai-agent-development-platform]] — 工作流引擎在 Agent 平台中的位置
