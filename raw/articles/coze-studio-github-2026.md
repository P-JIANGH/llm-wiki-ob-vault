---
title: coze-dev/coze-studio GitHub Repository (完整深度)
url: https://github.com/coze-dev/coze-studio
created: 2026-04-10
type: source
tags: [source]
---

# coze-dev/coze-studio（完整深度学习）

## Basic Info
- **Repository:** coze-dev/coze-studio
- **License:** Apache-2.0
- **Stars:** 20.3k | **Forks:** 2.9k | **Contributors:** 66 | **Commits:** 388
- **Latest Release:** v0.5.1 (Feb 5, 2026)
- **开源时间:** 2025-07-26，上线两天 Star 量破万

## Overview
Coze Studio 是字节跳动 Coze（扣子）平台的本地私有化部署版本。一站式 AI Agent 开发工具，提供从设计到部署的完整工具链。

**定位:** "一站式 AI Agent 开发工具" — 低代码/零代码 + 企业级架构

**核心价值:** Prompt + RAG + Plugin + Workflow，让开发者聚焦 AI 核心价值创造

**战略意图:**
- 与 Dify、HiAgent 等竞品竞争生态
- 通过开源扩大影响力，推动火山引擎增长
- Apache-2.0 协议，商业模式友好

## Tech Stack

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 后端语言 | Go (Golang) | 高性能、并发友好 |
| HTTP框架 | Hertz | 字节自研，CloudWeGo 生态 |
| LLM应用框架 | **Eino** | 字节自研，LLM 应用运行时 |
| 微服务治理 | CloudWeGo | 字节内部成熟体系 |
| 前端 | React + TypeScript | 企业级前端标准 |
| 工作流编辑器 | FlowGram | 字节自研，可视化流程编排 |
| 数据库 | MySQL/OceanBase | 可选 |
| 缓存 | Redis | Session/缓存 |
| 搜索引擎 | Elasticsearch | 知识库检索 |

**语言分布:** TypeScript 80.3% | Go 13.6% | Less 2.7% | Thrift 1.4% | JavaScript 1.0%

## 核心架构：DDD + 微服务

```
backend/
├── domain/          # 领域层（业务逻辑核心）
│   ├── agent/       # 智能体领域
│   ├── workflow/    # 工作流领域
│   └── knowledge/   # 知识库领域
├── application/    # 应用层（协调业务流程）
├── infra/          # 基础设施层（与外部依赖解耦）
└── api/            # 接口层（HTTP API）
```

### 架构亮点

**1. 模型服务抽象 — Eino 框架**
```go
// 多模型接入（对上层业务逻辑透明）
github.com/cloudwego/eino-ext/components/model/ark       // 火山方舟
github.com/cloudwego/eino-ext/components/model/openai    // OpenAI
github.com/cloudwego/eino-ext/components/model/claude   // Anthropic Claude
github.com/cloudwego/eino-ext/components/model/gemini   // Google Gemini
github.com/cloudwego/eino-ext/components/model/deepseek // DeepSeek
github.com/cloudwego/eino-ext/components/model/minimax  // MiniMax
```
> 无论底层用的是豆包、GPT-4 还是 Claude，对上层业务逻辑都是透明的。
> 这种设计避免被单一厂商锁定，是平台级产品的关键架构远见。

**2. Eino 框架定位**
- 字节跳动自研的 LLM 应用开发框架
- 属于 CloudWeGo 生态一部分（与 Hertz HTTP 框架并列）
- 参考 LangChain 思想但自研实现
- 提供 Agent / Workflow / Chain / Memory / Tool / Prompt 等抽象
- 支持多模型统一接入（Volcengine Ark / OpenAI / Claude / Gemini / DeepSeek / MiniMax）

**3. FlowGram 工作流编辑器**
- 字节跳动自研的基于节点的流程构建引擎
- 支持固定布局（结构化流程）和自由布局（灵活连接）
- 拖拽节点创建复杂逻辑，无需深入编码
- AI 自动化任务集成（数据清洗、报告生成等）
- 前端 React 实现拖拽和连接
- 后端 AI 集成支持豆包、DeepSeek、Kimi 等通用大模型
- 已在飞书低代码平台、Coze 工作流等 30+ 产品中验证

**4. 彻底容器化**
- `coze-server` 核心服务
- `database` 数据存储（MySQL/OceanBase）
- `redis` 缓存服务
- `elasticsearch` 搜索引擎（知识库检索）

## 功能能力矩阵

| 功能模块 | 核心能力 |
|----------|----------|
| 模型服务 | 多模型接入（豆包/OpenAI/Claude/Gemini/DeepSeek/MiniMax），统一管理 |
| 智能体构建 | 可视化配置 Agent，编排 Workflow + 知识库 + 记忆机制 |
| 应用开发 | 创建面向特定场景的应用，通过工作流构建业务逻辑 |
| 工作流引擎 | 可视化流程设计器，支持复杂业务编排 |
| 知识库 | RAG 能力，向量检索，支持 OCR 文档解析 |
| 插件系统 | HTTP 插件、本地插件，扩展 Agent 能力边界 |
| API & SDK | OpenAPI 对话接口 + Chat SDK 个人令牌鉴权 |
| 批量操作 | 批量删除/创建 Workflow、Agent，提高运营效率 |

## 工作流节点类型

支持多种节点类型（参考 Coze 平台）：
- **开始/结束节点**
- **LLM 调用节点**（选择模型、Prompt 配置）
- **条件分支节点**（if/else 逻辑）
- **循环执行节点**（for/while 循环）
- **嵌套子流程节点**（嵌入子工作流）
- **插件节点**（调用外部 API）
- **代码执行节点**（Python 脚本执行，含安全沙箱）
- **知识库检索节点**（RAG）
- **变量节点**（状态管理）

## Deployment

### 环境要求
- **最低配置:** 2核4G内存
- **推荐:** 完整 Docker 环境

### 部署步骤
```bash
# 1. 克隆源码
git clone https://github.com/coze-dev/coze-studio.git

# 2. 配置模型（复制模版并修改）
cd coze-studio
cp backend/conf/model/template/model_template_ark_doubao-seed-1.6.yaml \
   backend/conf/model/ark_doubao-seed-1.6.yaml
# 修改三个必填项: id, api_key, model

# 3. 启动服务 (macOS/Linux)
make web

# Windows:
cp ./docker/.env.example ./docker/.env
docker compose -f ./docker/docker-compose.yml up

# 4. 注册账号
# 访问 http://localhost:8888/sign

# 5. 配置模型
# 访问 http://localhost:8888/admin/#model-management
```

### 访问地址
- **前端:** http://localhost:8888/
- **管理后台:** http://localhost:8888/admin/
- **注册页面:** http://localhost:8888/sign

## Project Structure
```
coze-studio/
├── backend/           # Go 后端（DDD 架构）
│   ├── domain/        # 领域层：agent / workflow / knowledge
│   ├── application/   # 应用层
│   ├── infra/         # 基础设施层
│   ├── api/           # HTTP API（~18 endpoints）
│   └── conf/          # 配置（模型模板等）
├── frontend/          # React/TypeScript 前端
├── common/            # 共享工具
├── docker/            # Docker 配置
├── docs/              # 文档
├── helm/charts/       # Kubernetes Helm charts
├── idl/               # 接口定义语言（Thrift）
├── scripts/           # 构建/部署脚本
├── Makefile           # 构建自动化
└── rush.json          # Monorepo 管理
```

## 与 Coze Loop 的关系

Coze 同时开源了两个核心项目：
- **Coze Studio**（本项目）：Agent 开发平台，包含完整工作流引擎、插件框架、开发环境
- **Coze Loop**：Prompt 开发、多维度评测，聚焦 Agent 从开发到运维的全链路管理

## Security Notes
- 公网部署需注意：账户注册功能、工作流代码节点 Python 执行环境
- SSRF 风险、API 水平权限提升
- 安全报告：security@bytedance.com

## 社区
- 飞书群
- Discord: Coze Community
- Telegram: Coze Group

## 关键认知
1. **脱胎于字节内部成熟体系**：非临时起意，Hertz/Eino/CloudWeGo 均是字节内部多年实战验证的技术
2. **Eino vs LangChain**：Eino 是字节自研的 LLM 应用框架，与 LangChain 定位相似但自研实现
3. **FlowGram 的双重布局**：固定布局（结构化 DAG）+ 自由布局（灵活连线），适配不同复杂度场景
4. **模型抽象是关键设计**：通过 eino-ext 实现多模型透明接入，避免厂商锁定
