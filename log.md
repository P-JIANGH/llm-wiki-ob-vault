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

## [2026-04-10] lint | Wiki health check — duplicate fixed, broken links documented
- Fixed: entities/deerflow.md duplicate deleted (内容已整合到 entities/deer-flow.md)
- Rotated: log.md → log-2026.md (161 entries, 778 lines)
- Created: log.md (new empty log, lint entry)
- Note: open-source-game/ 格式在 index.md/log.md 中保留（cron 自动化系统依赖）
- Note: game file 命名不一致（cn-c-red-alert.md vs cnc-red-alert in index）；暂不修复，避免破坏 cron
- Note: docs/ 下的 broken links (docs/ 是 Obsidian 另一套文档站，非本 wiki 层)
- Open Source Games: 153 个游戏文件，仅 65 个在 index.md 中收录（cron 持续收录中）
- Total wiki-layer pages: 194 (entities:16 + concepts:24 + comparisons:1 + open-source-game:153)
