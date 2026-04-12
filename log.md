# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
## [2026-04-13] ingest | AICommand (keijiro) — Unity Editor ChatGPT PoC
- Cloned: ~/tmp/ai-game-devtools/ai-command/（via gitcode.com mirror）
- Created: raw/articles/ai-game-devtools/ai-command.md
- Created: ai-game-devtools/ai-command.md
- Updated: ai-game-devtools-learning-checklist.md

## [2026-04-13] ingest | FireRed-OpenStoryline 源码深度学习（~/FireRed-OpenStoryline）
- Created: raw/articles/firered-openstoryline-2026.md（架构/节点/mcp/storage/prompt/技术栈全景分析）
- Created: entities/firered-openstoryline.md（Entity 页面，含 OpenClaw/nanobot/DeerFlow 关联）
- Updated: index.md（+firered-openstoryline）
- Note: LangChain create_agent + MultiServerMCPClient + FastMCP 架构，15+ 视频节点管道，ArtifactStore 会话持久化
## [2026-04-12] ingest | AgentGPT
- Created: raw/articles/ai-game-devtools/agentgpt.md
- Created: ai-game-devtools/agentgpt.md
- Updated: ai-game-devtools-learning-checklist.md
## [2026-04-13] ingest | hermes-agent 源码学习（~/.hermes/hermes-agent/）
- Created: raw/articles/hermes-agent-source-2026.md（~15KB 全模块分析笔记）
- Created: entities/hermes-agent.md（框架全景、核心模块、关键设计决策）
- Created: concepts/context-compression.md（四阶段压缩算法 + 迭代摘要 + 孤儿修复）
- Created: concepts/tool-registry-pattern.md（自注册 + check_fn + 循环导入安全）
- Created: concepts/agent-loop-architecture.md（HermesAgentLoop + AIAgent + 并行执行决策树）
- Created: concepts/openai-tool-calling.md（协议格式 + 多 Provider 解析 + 类型强制）
- Updated: index.md（+3 新 concept pages）
- Note: 与 nanobot/DeerFlow 架构相似但专注视频创作；openstoryline Skills 已可通过 OpenClaw 调用

## [2026-04-13] ingest | AI Game DevTools Catalog（Yuan-ManX 游戏工具目录，840+ 项目）— 修正
- 原始记录错误地将 Yuan-ManX/ai-game-devtools 归属为 THU-MAIC，现已全面修正
- Created: raw/articles/yuan-manx-ai-game-devtools-2026.md（正确归属：独立开发者 Yuan-ManX）
- Updated: concepts/ai-game-devtools-catalog.md（修正归属和 [[openmaic]] 关系说明）
- Updated: index.md（修正描述）
- Updated: log.md（本条）
- Deleted: raw/articles/thu-maic-openmaic-2026.md（错误文件，仓库名误用 OpenMAIC）
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

## [2026-04-12] ingest | OpenMAIC 源码深度学习（v0.1.0，~/OpenMAIC）
- Created: raw/articles/thu-maic-openmaic-source-2026.md（源码深度分析，11个模块详细记录）
- Updated: entities/openmaic.md（+Director Graph/+两阶段Pipeline/+PBL Agentic Loop/+Provider系统/+PPTX导出/+API路由/+Tech Stack更新至Next.js 16/React 19/LangGraph 1.1）
- Updated: index.md（openmaic摘要扩充至含全部新模块）
- Note: 源码深度文件：director-graph.ts(549行)/providers.ts(1296行)/generate-pbl.ts(432行)/use-export-pptx.ts(1181行)/outline-generator.ts
- Note: 无 WeChat/钉钉 集成（仅国际平台 via OpenClaw）

## [2026-04-10] ingest | MemPalace 源码深度学习（v3.1.0 vs wiki 现有条目对比）
- Updated: entities/mempalace.md（+WAL 审计 +Specialist Agents +Auto-Save Hooks +MCP auto-teach 协议 +v3.1.0 版本差异，updated 2026-04-10）
- Updated: concepts/memory-system.md（+MemPalace 作为第三种记忆模式，附 nanobot/DeerFlow 对比表，updated 2026-04-10）
- Updated: concepts/deer-flow-memory.md（+MemPalace vs DeerFlow Memory 对比表）
- Note: 源码深度文件：palace.py(71行) / mcp_server.py(946行) / knowledge_graph.py(393行) / palace_graph.py(227行) / searcher.py(152行) / layers.py(515行)
- Note: wiki 已有 mempalace.md（2026-04-09 创建），本次补充 v3.1.0 新细节

## [2026-04-10] ingest | karpathy/autoresearch（Autonomous LLM Research 框架）
- Created: raw/articles/karpathy-autoresearch-2026.md（70.3k stars，MIT，三个文件职责分离，program.md 指令体系，MuonAdamW 优化器，ResFormer + Sliding Window）
- Created: entities/autoresearch.md（Karpathy 自主研究框架：5分钟实验循环，val_bpb 评估，program.md 迭代核心创新）
- Created: concepts/autonomous-llm-research.md（Autonomous LLM Research 范式：AI agent 自主实验 vs 传统 AutoML 对比，val_bpb 指标）
- Created: concepts/muon-optimizer.md（MuonAdamW：梯度空间优化 + Polar Express 正交化 + NorMuon + Cautious Weight Decay）
- Updated: index.md（+2 entities +2 concepts，total 202）

## [2026-04-10] ingest | Coze Studio 完整深度学习（Eino + FlowGram + DDD架构 + 工作流节点类型）
- Updated: raw/articles/coze-studio-github-2026.md（大幅扩充：Eino/CloudWeGo 生态 / DDD 四层架构 / FlowGram 双布局 / 模型抽象设计 / 工作流节点类型 / 部署细节）
- Updated: entities/coze-studio.md（+Eino 技术栈 / DDD 架构图 / FlowGram 编辑器 / 模型抽象价值 / Eino + FlowGram wikilinks）
- Created: concepts/Eino.md（字节自研 LLM 框架：Model/Chain/Agent/Workflow/Memory/Tool 抽象，CloudWeGo 生态，多模型透明接入）
- Created: concepts/FlowGram.md（字节自研可视化工作流引擎：固定/自由双布局，拖拽节点，AI 集成，已在30+字节产品验证）
- Updated: index.md（+2 concepts，total 200）
- Note: Coze Studio 同时开源了 Coze Loop（Prompt 开发/评测，Agent 全链路管理）

## [2026-04-10] ingest | Coze Studio（字节跳动一站式 AI Agent 开发平台）
- Created: raw/articles/coze-studio-github-2026.md
- Created: entities/coze-studio.md（Coze/字节跳动，20.3k stars，Eino 运行时，FlowGram 工作流编辑器）
- Created: concepts/ai-agent-development-platform.md（AI Agent 开发平台通用概念，Prompt/RAG/Plugin/Workflow 组件，主流平台对比）
- Updated: index.md（+2 pages，total 198）

## [2026-04-10] ingest | OpenMAIC（THU-MAIC 多智能体互动教室平台）
- Created: raw/articles/thu-maic-openmaic-2026.md
- Created: entities/openmaic.md（THU-MAIC 开源 AI 教育平台，AGPL-3.0，支持 Gemini/DeepSeek/MiniMax）
- Created: concepts/multi-agent-interactive-classroom.md（多 Agent 协作教学模式，Outline→Scenes 两阶段，幻灯片/Quiz/模拟/PBL）
- Updated: index.md（+2 pages，total 196）

## [2026-04-10] lint | Wiki health check — duplicate fixed, broken links documented
- Fixed: entities/deerflow.md duplicate deleted (内容已整合到 entities/deer-flow.md)
- Rotated: log.md → log-2026.md (161 entries, 778 lines)
- Created: log.md (new empty log, lint entry)
- Note: open-source-game/ 格式在 index.md/log.md 中保留（cron 自动化系统依赖）
- Note: game file 命名不一致（cn-c-red-alert.md vs cnc-red-alert in index）；暂不修复，避免破坏 cron
- Note: docs/ 下的 broken links (docs/ 是 Obsidian 另一套文档站，非本 wiki 层)
- Open Source Games: 153 个游戏文件，仅 65 个在 index.md 中收录（cron 持续收录中）
- Total wiki-layer pages: 194 (entities:16 + concepts:24 + comparisons:1 + open-source-game:153)

## [2026-04-10] ingest | OpenPanzer 开源游戏 wiki note
- Created: open-source-game/openpanzer.md
- Updated: open-source-games-learning-checklist.md (item 288 marked done)
- Updated: index.md (+1 page, total 197)
- Updated: open-source-games-learning-checklist.md (learning record row 152 added)
## [2026-04-10] ingest | Hnefatafl 开源游戏 wiki note
- Created: open-source-game/hnefatafl.md
- Updated: open-source-games-learning-checklist.md (Hnefatafl item marked [2026-04-10])
- Updated: index.md (+1 page, total 198)
- Updated: open-source-games-learning-checklist.md (learning record row 153 added)

## [2026-04-13] ingest | hermes-agent AI Agent 框架源代码
- Created: raw/articles/hermes-agent-source-2026.md（hermes-agent 源代码全文摘要）
- Created: entities/hermes-agent.md（工具注册中心 / 持久 Async Loop / 并行执行 / Context Compression / 13+ 消息平台网关）
- Created: concepts/registry-pattern-tool-discovery.md（中心注册表模式）
- Created: concepts/context-compression.md（结构化摘要压缩）
- Updated: index.md（+2 页面，总计 204）

## [2026-04-12] ingest | AgentGPT（ai-game-devtools LLM 分类第一个项目）
- Created: raw/articles/ai-game-devtools/agentgpt.md
- Created: entities/agentgpt.md（reworkd 开源浏览器端自主 Agent，Next.js/Docker，1.5k+ commits，12 releases）
- Updated: index.md（+1 entity，total 205）
- Note: ai-game-devtools 分类 wiki 学习 cron 任务开始执行
## [2026-04-12] ingest | AIOS（agiresearch）
- Cloned: ~/tmp/ai-game-devtools/aios/
- Created: raw/articles/ai-game-devtools/aios.md
- Created: ai-game-devtools/aios.md
- Updated: ai-game-devtools-learning-checklist.md（mark complete）
- Updated: index.md（+1 entry in AI/LLM/Agent section）
## [2026-04-12] ingest | AI Scientist（SakanaAI）— 全自动科学研究系统
- Cloned: ~/tmp/ai-game-devtools/ai-scientist/（via github direct）
- Created: raw/articles/ai-game-devtools/ai-scientist.md
- Created: ai-game-devtools/ai-scientist.md
- Updated: ai-game-devtools-learning-checklist.md（mark complete）
## [2026-04-13] ingest | Assistant CLI（diciaup）— ChatGPT 终端 CLI 工具
- Source: https://github.com/diciaup/assistant-cli（GitHub direct，README fetched via API）
- Created: raw/articles/ai-game-devtools/assistant-cli.md
- Created: ai-game-devtools/assistant-cli.md
- Updated: ai-game-devtools-learning-checklist.md（mark complete）
