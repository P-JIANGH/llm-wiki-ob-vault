# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete
> When this file exceeds 500 entries, rotate: rename to log-YYYY.md, start fresh.

## [2026-04-10] ingest | MemPalace 源码深度学习（v3.1.0 vs wiki 现有条目对比）
- Updated: entities/mempalace.md（+WAL 审计 +Specialist Agents +Auto-Save Hooks +MCP auto-teach 协议 +v3.1.0 版本差异，updated 2026-04-10）
- Updated: concepts/memory-system.md（+MemPalace 作为第三种记忆模式，附 nanobot/DeerFlow 对比表，updated 2026-04-10）
- Updated: concepts/deer-flow-memory.md（+MemPalace vs DeerFlow Memory 对比表）
- Note: 源码深度文件：palace.py(71行) / mcp_server.py(946行) / knowledge_graph.py(393行) / palace_graph.py(227行) / searcher.py(152行) / layers.py(515行)
- Note: wiki 已有 mempalace.md（2026-04-09 创建），本次补充 v3.1.0 新细节

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
