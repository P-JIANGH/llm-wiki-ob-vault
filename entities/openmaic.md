---
title: OpenMAIC
created: 2026-04-10
updated: 2026-04-12
type: entity
tags: [ai, multi-agent-ai, llm, agent, project, education]
sources: [raw/articles/thu-maic-openmaic-source-2026.md]
---

# OpenMAIC

## Overview
OpenMAIC (Open Multi-Agent Interactive Classroom) 是清华大学多智能体实验室 (THU-MAIC) 推出的开源 AI 教育平台。将任意主题或文档一键转化为沉浸式多智能体互动教室体验。支持 AI 教师/同学实时授课、讨论、白板绘图、语音解说。

发表：JCST 2026 (DOI: 10.1007/s11390-025-6000-0) | 许可证：AGPL-3.0 | v0.1.0 (2026-03-26)

## Key Facts
- **开发者：** THU-MAIC（清华大学多智能体实验室）
- **官网：** https://open.maic.chat/
- **Demo：** https://open.maic.chat/
- **论文：** [JCST'26](https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0)
- **许可证：** AGPL-3.0
- **社区：** [Discord](https://discord.gg/PtZaaTbH) · [Feishu](community/feishu.md)

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript 5
- LangGraph 1.1（StateGraph 多智能体编排）
- Tailwind CSS 4 + shadcn/ui + Radix primitives
- Vercel AI SDK（`ai` package，统一 provider 抽象）
- pptxgenjs（PPTX 导出）+ SVG 渲染
- pnpm workspaces monorepo

## Architecture

### Two-Stage Generation Pipeline

```
Stage 1: generateSceneOutlinesFromRequirements()
  输入：UserRequirements (text + language + 可选PDF/图片)
  输出：SceneOutline[]（结构化课程大纲）

Stage 2: generateFullScenes() → generateSceneContent() → generateSceneActions()
  输入：SceneOutline[]
  输出：Scene[]（含幻灯片/测验/交互/PBL + Actions）
```

关键类型：
- `UserRequirements`: `{ text, language, userNickname?, userBio? }`
- `SceneOutline`: 每个场景的课程大纲条目
- `Scene`: `{ id, type, content, actions }`
- Scene types: `slides | quiz | interactive | pbl`

### Director Graph — 多智能体编排核心

LangGraph StateGraph，两类节点：

```
START → director → [END]
             ↓
      agent_generate → director (循环)
```

**Director 策略（按 agent 数量区分）：**
- **单 agent**：纯代码逻辑，零 LLM 调用。turn 0 派发 agent，turn 1+ 提示用户发言
- **多 agent**：基于 LLM 判断下一个 agent（带 code fast-path）。turn 0 + triggerAgentId 跳过 LLM 直接派发

**LangGraph State Annotation:**
```typescript
// 输入（设一次）
messages, storeState, availableAgentIds, maxTurns,
languageModel, thinkingConfig, discussionContext,
triggerAgentId, userProfile, agentConfigOverrides

// 可变
currentAgentId, turnCount, agentResponses[],
whiteboardLedger[], shouldEnd, totalActions
```

**AgentGenerate 节点：**
- 通过 `config.writer()` 流式推送事件：`agent_start | text_delta | action | agent_end | error`
- 使用 `AISdkLangGraphAdapter` 包装 Vercel AI SDK
- 解析交错文本+Action JSON 结构块
- 白板动作（`wb_*`）记录到 ledger
- 动作校验：`getEffectiveActions(agentConfig.allowedActions, sceneType)`

**SSE 事件类型：**
```
thinking → agent_start → text_delta/action × N → agent_end
cue_user（提示用户发言）| error
```

### Classroom Components
| 组件 | 功能 |
|------|------|
| Slides | AI 授课，语音解说 + 聚光灯 + 激光笔动画 |
| Quiz | 交互式测验（单选/多选/简答），实时 AI 评分反馈 |
| Interactive Simulation | HTML 实验（物理模拟器、流程图） |
| PBL | Project-Based Learning，与 AI agent 协作结构化项目 |

### Multi-Agent Interaction Modes
- **Classroom Discussion**：agent 主动发起讨论，用户可随时加入
- **Roundtable Debate**：多 agent 不同角色 + 白板图示
- **Q&A Mode**：自由提问，响应含幻灯片/图表/白板绘画
- **Whiteboard**：agent 实时绘图讲解概念

### Playback State Machine
`lib/playback/engine.ts`：状态机 `idle → playing → live`，管理场景进度和动作执行时序。

## AI Provider 系统

`lib/ai/providers.ts`（1300+ 行），通过 Vercel AI SDK 统一接入：

| Provider | 模型 |
|----------|------|
| OpenAI | GPT-5.2/5.1/5/5-mini/5-nano, GPT-4o/4o-mini/4-turbo, o4-mini, o3/o3-mini, o1 |
| Anthropic | Claude Opus/Sonnet/Haiku 4.6/4.5 |
| Google | Gemini 3.1 Pro Preview, Gemini 3 Flash Preview, Gemini 2.5 Pro/Flash/Flash-Lite |
| GLM | GLM-5/4.7/4.6/4.5 系列（OpenAI 兼容，bigmodel.cn） |
| Qwen | Qwen3.5/3.1/2.5 系列（DashScope） |
| DeepSeek | DeepSeek V3, DeepSeek R1 |
| MiniMax | MiniMax 系列（Anthropic 兼容） |
| Grok | Grok 系列（xAI） |
| SiliconFlow | OpenAI 兼容聚合器 |

**模型能力追踪：**
```typescript
interface ModelCapabilities {
  streaming: boolean
  tools: boolean
  vision: boolean
  thinking?: {
    toggleable: boolean       // 用户可开关
    budgetAdjustable: boolean  // 可调 thinking budget
    defaultEnabled: boolean   // 默认开启
  }
}
```

支持 thinking budget 的模型：GPT-5, o3/o4-mini, Claude Opus 4.6, Gemini 3.x 等。

## PBL — Agentic Loop with MCP Tools

`lib/pbl/generate-pbl.ts`：使用 Vercel AI SDK `generateText` + `stopWhen(stepCountIs(30))` 驱动 agentic 循环。

**4 个 MCP 工具域（共享 PBLProjectConfig 状态）：**
1. **ModeMCP**：模式切换 `project_info | agent | issueboard | idle`
2. **ProjectMCP**：`update_title`, `update_description`
3. **AgentMCP**：Agent 角色 CRUD — `create_agent`, `update_agent`, `delete_agent`
4. **IssueboardMCP**：Issue 跟踪，每个 issue 自动创建 Question Agent + Judge Agent

**Agent 角色：** `person_in_charge`（负责人）、`question_agent_name`（提问助手）、`judge_agent_name`（评判助手）

**生成后处理：** 激活第一个 issue → Question Agent 生成引导问题 → 添加欢迎消息到聊天

## PPTX 导出

`lib/export/use-export-pptx.ts`（1181 行）：

- **HTML → PPTX**：解析 HTML AST，映射到 pptxgenjs `TextProps[]`（支持 bold/italic/underline/strikethrough/sup|sub/font/color/bullet/indent/链接）
- **SVG → PPTX 形状**：SVG path 转为 cubic/quadratic bezier / arc / line
- **LaTeX → OMML**：通过 `mathml2omml` 包转换
- **图片处理**：占位符从 `useMediaGenerationStore` 解析；远程图片 fetch 后转 base64 嵌入
- **其他元素**：text, image, shape, table, chart, slide link, shadow, outline

## Web Search & PDF

- **Web Search**：`lib/web-search/tavily.ts` — Tavily API 搜索
- **PDF 解析**：`lib/pdf/` — 可选 MinerU 高级 PDF 解析（`PDF_MINERU_BASE_URL`, `PDF_MINERU_API_KEY`）

## Deployment
- **Vercel**（推荐）：一键部署
- **Docker**：`docker-compose up -d`
- **本地**：`pnpm dev` → http://localhost:3000

## OpenClaw 集成

通过 ClawHub 安装：`clawhub install openmaic`

支持平台：Feishu / Slack / Discord / Telegram / WhatsApp 等 20+ 消息平台。

**使用方式：**
- Hosted 模式：在 [open.maic.chat](https://open.maic.chat/) 获取访问码，无需本地搭建
- Self-hosted 模式：skill 引导完成 clone → 配置 → 启动，每步需用户确认

## Use Cases
- *"Teach me Python from scratch in 30 min"*
- *"How to play the board game Avalon"*
- *"Analyze the stock prices of Zhipu and MiniMax"*
- *"Break down the latest DeepSeek paper"*

## 项目结构（源码级）

```
OpenMAIC/
├── app/api/                    # ~18 endpoints
│   ├── generate-classroom/     # 异步教室生成任务
│   ├── generate/              # 场景生成管道（outline/agent/content/actions/image/tts/video）
│   ├── chat/                  # 多 agent 讨论（SSE 流）
│   ├── quiz-grade/            # 实时测验评分
│   ├── pbl/chat/             # PBL 聊天
│   ├── parse-pdf/            # PDF 解析
│   └── ...
├── lib/
│   ├── generation/           # 两阶段课程生成
│   ├── orchestration/        # LangGraph Director Graph
│   ├── pbl/                  # PBL agentic loop + MCP tools
│   ├── ai/providers.ts        # 统一 Provider 配置（1300+ 行）
│   ├── export/                # PPTX/HTML 导出
│   ├── playback/             # 状态机（idle→playing→live）
│   └── ...
└── packages/
    ├── mathml2omml/          # MathML → Office Math ML
    └── pptxgenjs/            # PPTX 生成
```

## Relationships
- [[openclaw]] — OpenMAIC 集成的消息框架
- [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念
- [[multi-agent-ai-game-impl]] — Microverse 多智能体游戏实现参考
- [[nanobot]] — HKUDS 轻量 Agent，另一个开源多 Agent 系统
- [[autoresearch]] — Karpathy 自主 LLM 研究框架
