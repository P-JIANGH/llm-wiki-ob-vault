---
title: MemPalace
created: 2026-04-09
updated: 2026-04-10
type: entity
tags: [ai, llm, memory, rag, chromadb, vector-database, agent]
sources: ["https://github.com/milla-jovovich/mempalace"]
---
<!-- TODO: This page has 243 lines and should be split into smaller, focused pages per SCHEMA.md guidelines -->


# MemPalace

AI 长期记忆系统，2026 年 3 月由 milla-jovovich 开源。核心理念：**存储一切，让语义搜索找到它**。

## MCP Server Auto-Teach 协议

MCP `mempalace_status` 响应中内嵌两个关键字段，AI 无需配置自动学习：

**PALACE_PROTOCOL**（5条记忆协议）：
```
1. ON WAKE-UP: Call mempalace_status to load palace overview + AAAK spec.
2. BEFORE RESPONDING about any person, project, or past event:
   call mempalace_kg_query or mempalace_search FIRST. Never guess — verify.
3. IF UNSURE about a fact (name, gender, age, relationship):
   say "let me check" and query the palace. Wrong is worse than slow.
4. AFTER EACH SESSION: call mempalace_diary_write to record what happened.
5. WHEN FACTS CHANGE: call mempalace_kg_invalidate on old fact, mempalace_kg_add for new.
```

**AAAK_SPEC**（AAAK dialect 完整规范）：实体代码（3字母大写）、情感标记（`*warm*`=joy、`*fierce*=determined`）、管道分隔字段结构、ISO日期、★重要度等级。

AI 第一次调用 `mempalace_status` 即同时掌握 palace 概览 + AAAK 规范 + 记忆协议，无需额外引导。

## Write-Ahead Log（WAL）审计

`~/.mempalace/wal/write_log.jsonl` — 每次写入操作（add_drawer / kg_add / kg_invalidate / diary_write）在执行前先写 JSONL 日志。

作用：
- **审计追踪**：谁在什么时候写入了什么
- **记忆污染检测**：外部来源或可疑写入可被回溯
- **回滚支持**：WAL 条目可重放以恢复状态

WAL 目录权限 700，WAL 文件权限 600。

## Specialist Agents（专家 Agent）

每个 agent 独立 wing + AAAK diary，与主 CLAUDE.md 解耦：

```
~/.mempalace/agents/
  ├── reviewer.json    # 代码质量、bug 模式
  ├── architect.json   # 设计决策、技术选型
  └── ops.json         # 部署、故障、基础设施
```

```python
# Agent 写 diary（AAAK 格式）
mempalace_diary_write("reviewer",
    "PR#42|auth.bypass.found|missing.middleware.check|pattern:3rd.time.this.quarter|★★★★")

# Agent 读自己历史
mempalace_diary_read("reviewer", last_n=10)
```

主 CLAUDE.md 只需一行：`You have MemPalace agents. Run mempalace_list_agents to see them.`

## Auto-Save Hooks（Claude Code 集成）

```json
{
  "hooks": {
    "Stop": [{"matcher": "", "hooks": [{"type": "command", "command": "mempal_save_hook.sh"}]}],
    "PreCompact": [{"matcher": "", "hooks": [{"type": "command", "command": "mempal_precompact_hook.sh"}]}]
  }
}
```

- **Stop hook**：每 15 条人类消息触发，阻塞 AI 提示保存话题/决策/引用
- **PreCompact hook**：上下文压缩前紧急保存（L0+L1 刷新）
- **MEMPAL_DIR**：设置 `MEMPAL_DIR=/path` 则 hook 自动对目录执行 `mempalace mine`（后台 on stop，同步 on precompact）

## 版本差异

| 版本 | 变化 |
|------|------|
| v3.0.0 | 初始版本，AAAK closets 计划中（未实现） |
| v3.1.0 | WAL 审计、Specialist Agents、PreCompact hook、AAAK spec 内嵌 status 响应 |

## 核心定位

- **问题**：AI 对话（Claude/ChatGPT/Copilot）结束后所有决策、调试、架构讨论都消失。6 个月使用 = 1950 万 token，全部丢失。
- **解法**：把对话和项目文件完整存入 ChromaDB，不做任何摘要，语义搜索直接检索原文。

## 核心指标

| 指标 | 数值 |
|------|------|
| LongMemEval R@5（raw 模式） | **96.6%** — 最高无需 API 分数 |
| LongMemEval R@5（hybrid + Haiku rerank） | **100%** — 满分（可选） |
| ConvoMem 准确率 | **92.9%**（Mem0 为 30–45%） |
| LLM 调用 | **0**（raw 模式） |
| 成本 | $0，完全本地，无订阅 |
| API 依赖 | 无 |

## 架构：宫殿隐喻

```
Wing: Person (人物)
  └─ Hall (走廊) ──→ Room (房间)
       走廊类型: hall_facts / hall_events / hall_discoveries / hall_preferences / hall_advice
       └─ Closet (衣柜) → Drawer (抽屉) ← verbatim 原文

Wing: Project (项目)
  └─ 同上结构

Tunnel：同一 Room 跨多个 Wing 时产生（如 auth-migration 同时出现在 wing_kai 和 wing_driftwood）
```

**层级结构：**

| 层级 | 名称 | token 数 | 说明 |
|------|------|---------|------|
| Wing | 人物/项目 | 多个 | 每个人物或项目一个 wing |
| Room | 主题房间 | 多个/ wing | `auth-migration`、`ci-pipeline` 等 |
| Hall | 走廊类型 | 5 种 | facts/events/discoveries/preferences/advice |
| Drawer | 抽屉（原文） | — | verbatim 原文，存入 ChromaDB |

## 4 层记忆栈（Memory Stack）

| 层 | 内容 | token 数 | 时机 |
|----|------|---------|------|
| **L0** | Identity（身份） | ~50 | 始终加载 |
| **L1** | Essential Story（关键事件） | ~120 | 始终加载 |
| **L2** | On-Demand（按 wing/room 检索） | ~200-500 | 话题出现时 |
| **L3** | Deep Search（全量语义搜索） | 按需 | 显式搜索时 |

wake-up 总量：L0 + L1 ≈ **170 tokens**，成本 $0.70/年（vs LLM 摘要 $507/年）。

## 存储层

### ChromaDB（向量存储）

- 集合名：`mempalace_drawers`
- metadata 字段：`wing`、`room`、`hall`、`date`、`source_file`、`agent`
- chunk 大小：800 字符/ drawer，100 字符 overlap
- **不存储摘要，只存 verbatim 原文**

### SQLite（知识图谱）

路径：`~/.mempalace/knowledge_graph.sqlite3`

表结构：`entities` + `triples`，triples 包含 `valid_from`/`valid_to` 时态窗口。

```python
from mempalace.knowledge_graph import KnowledgeGraph

kg = KnowledgeGraph()
kg.add_triple("Kai", "works_on", "Orion", valid_from="2025-06-01")

# 查询实体在某时间点的关系
kg.query_entity("Maya", as_of="2026-01-20")

# 时间线
kg.timeline("Orion")
```

## AAAK Dialect（实验性）

**现状（2026-04）：** AAAK 是 lossy 缩写格式，非无损压缩。LongMemEval 上 raw 模式 96.6%，AAAK 模式 84.2%（**倒退 12.4 点**）。96.6% 分数来自 raw 模式，不是 AAAK。

**设计目标：**

- 在大量重复实体的场景（同一项目跨数千次对话）压缩 token
- 格式：`(FILE_NUM|ENTITY|DATE|TITLE)` 头 + `ZID:ENTITIES|keywords|"quote"|WEIGHT|EMOTIONS|FLAGS` Zettel
- 任何 LLM 直接读取，无需解码器

**当前状态：** 是独立的压缩层，非默认存储格式。Issue #27, #43 在追踪。

## CLI 命令

```bash
mempalace init ~/projects/myapp          # 检测 wing/room 结构
mempalace mine ~/projects/myapp        # 挖掘项目文件
mempalace mine ~/chats/ --mode convos  # 挖掘对话
mempalace search "auth decision"        # 语义搜索
mempalace wake-up                       # 输出 L0+L1 (~170 tokens)
mempalace status                        # palace 概览
mempalace split ~/chats/                # 切分 mega 文件
mempalace repair                        # 从 SQLite 重建向量索引
mempalace compress --wing myapp        # AAAK 压缩
```

## MCP Server（19 个工具）

```bash
claude mcp add mempalace -- python -m mempalace.mcp_server
```

**读取工具：** `mempalace_status` / `mempalace_list_wings` / `mempalace_list_rooms` / `mempalace_get_taxonomy` / `mempalace_search` / `mempalace_check_duplicate`

**写入工具：** `mempalace_add_drawer` / `mempalace_delete_drawer`

**知识图谱工具：** `mempalace_kg_query` / `mempalace_kg_add` / `mempalace_kg_invalidate` / `mempalace_kg_timeline` / `mempalace_kg_stats`

**导航工具：** `mempalace_traverse` / `mempalace_find_tunnels` / `mempalace_graph_stats`

## Claude Code 集成（Hook）

`mempalace_save_hook.sh`：每 15 次人类消息（可配置）阻塞 AI，提示它保存到 palace。

安装：

```bash
# Stop hook
claude plugin marketplace add milla-jovovich/mempalace
claude plugin install --scope user mempalace
```

## 依赖

```toml
dependencies = [
    "chromadb>=0.5.0,<0.7",
    "pyyaml>=6.0",
]
```

Python 3.9+。无其他外部依赖。

## 已知问题（README 诚实说明）

1. AAAK token 例子用错了估算公式（实际 66t → 73t，非节省）
2. "30x lossless 压缩" 过度宣传 — AAAK 是 lossy
3. "+34% palace boost" = 标准 ChromaDB metadata 过滤，不是新机制
4. Contradiction detection 未接入 KG ops（Issue #27）
5. `fact_checker.py` 未在 benchmark 脚本中
6. macOS ARM64 segfault（Issue #74）
7. Shell injection in hooks（Issue #110）

## 相关

- [[persistent-memory-system]] — AI 角色长期记忆泛化概念
- [[llm-integration]] — LLM Provider 接入
- [[multi-agent-ai-simulation]] — 多智能体 AI
