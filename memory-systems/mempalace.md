# MemPalace

> AI 记忆系统，LongMemEval 基准 96.6%（无 API 调用），本地存储，完全隐私

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/milla-jovovich/mempalace |
| 语言 | Python 3.9+ |
| 存储 | ChromaDB（语义搜索）+ SQLite（知识图谱） |
| 依赖 | `chromadb`, `pyyaml`，无外部 API |
| 许可 | MIT |
| 版本 | v3.0.0 |

## 核心定位

其他记忆系统（Mem0 / Zep / Mastra）用 LLM 决定"什么值得记忆"——提取事实，丢弃原文。

**MemPalace 的反直觉发现：直接存储原始对话文本 + ChromaDB 语义搜索，在 LongMemEval 基准上跑出 96.6%，超过所有需要付费 API 的系统。**

核心洞察：**LLM 提取会丢失"为什么"，而语义搜索能找到它。**

## 架构：The Palace（宫殿记忆法）

灵感来自古希腊演说家——把信息放进虚拟建筑的"房间"里，走进去就能找到。

```
WING (人物/项目)
  └── ROOM (具体主题，如 auth-migration)
        └── CLOSET (摘要，指向原文)
              └── DRAWER (原始 verbatim 文件)
                    
跨 WING 的同一主题 → TUNNEL（隧道）跨 Wing 连接
同 WING 内的相关主题 → HALL（走廊）连接

六类 Hall（记忆类型，每 Wing 都有）：
  hall_facts       — 已做出的决定
  hall_events     — 会议、里程碑、调试
  hall_discoveries — 突破、新洞察
  hall_preferences — 习惯、偏好
  hall_advice      — 建议和解决方案
```

**宫殿结构的检索收益（实测 22,000+ 对话记忆）：**

| 搜索范围 | R@10 |
|----------|------|
| 全量 closet 搜索 | 60.9% |
| + wing 过滤 | 73.1% |
| + hall 过滤 | 84.8% |
| **+ room 过滤** | **94.8%** |

wing + room 过滤带来 **+34%** 提升——结构不是装饰，是检索本身。

## 四层记忆栈

| 层级 | 内容 | Token 量 | 加载时机 |
|------|------|---------|---------|
| L0 | Identity（身份） | ~50 | 始终 |
| L1 | Critical Facts（关键事实） | ~120 | 始终 |
| L2 | Room Recall（当前项目上下文） | ~200-500 | 按需 |
| L3 | Deep Search（全量语义搜索） | 无上限 | 按需显式查询 |

Wake-up 成本：~170 tokens，$0.70/年（vs LLM 摘要方案 $507/年）。

## 两大核心模块

### 1. 语义搜索层（ChromaDB）

- **原始文本存储**，不摘要、不提取
- 每个记忆带 metadata：wing / room / hall / date
- wing + room 过滤是核心检索机制
- 可选 rerank（Haiku / Sonnet）冲到 100%

### 2. 知识图谱层（SQLite）

时序实体关系三元组，取代云端 Neo4j：

```python
kg.add_triple("Kai", "works_on", "Orion", valid_from="2025-06-01")
kg.add_triple("Maya", "assigned_to", "auth-migration", valid_from="2026-01-15")

# 2026-01-20 的视角
kg.query_entity("Maya", as_of="2026-01-20")
# → Maya 被分配了 auth-migration（当时有效）

# 时间线
kg.timeline("Orion")
# → 项目的编年史
```

- validity window：事实有生效期，过期自动失效
- 历史查询始终有效
- 无外部依赖（vs Zep 需要 Neo4j 云服务 $25/mo+）

## AAAK 方言（实验性）

**状态更新（April 7, 2026）：官方承认问题并修正。**

- **不是无损压缩**，是 lossy 缩写系统
- **小规模不节省 token**：overhead 大于节省（实测：66 tokens 原文 → 73 tokens AAAK）
- **大规模可节省**：同一实体重复出现数百次时，实体代码摊薄
- **LongMemEval 回归**：AAAK 模式 84.2% vs 原始模式 96.6%，差 12.4 点
- **存储默认是原始文本**，AAAK 是加载层的独立压缩选项

设计目标：任何能读文本的 LLM（Claude / GPT / Gemini / Llama / Mistral）无需解码器直接读 AAAK。

## MCP Server（19 工具）

Claude Code / Gemini CLI 可直接调用：

```bash
claude mcp add mempalace -- python -m mempalace.mcp_server
```

工具分类：

| 类别 | 工具数 | 代表工具 |
|------|--------|---------|
| Palace 读 | 7 | `mempalace_search`, `mempalace_list_wings`, `mempalace_get_taxonomy` |
| Palace 写 | 2 | `mempalace_add_drawer`, `mempalace_delete_drawer` |
| 知识图谱 | 5 | `mempalace_kg_query`, `mempalace_kg_add`, `mempalace_kg_timeline` |
| 导航 | 3 | `mempalace_traverse`, `mempalace_find_tunnels` |
| Agent 日记 | 2 | `mempalace_diary_write`, `mempalace_diary_read` |

AI 自动从 `mempalace_status` 响应中学会 AAAK 规范，无需手动配置。

## Auto-Save Hooks

Claude Code 专用，自动保存工作记忆：

- **Save Hook**：每 15 条消息触发结构化保存（主题/决定/引用/代码变更）
- **PreCompact Hook**：上下文压缩前紧急保存

## 基准测试结果

| Benchmark | Mode | Score | API Calls |
|-----------|------|-------|-----------|
| LongMemEval R@5 | Raw ChromaDB | **96.6%** | $0 |
| LongMemEval R@5 | Hybrid + Haiku rerank | **100%** | ~$0.001/query |
| LoCoMo R@10 | Raw | 60.3% | $0 |
| LoCoMo R@10 | Hybrid + Sonnet | **100%** | ~$0.003/query |

**96.6% = 最高已发布零 API 调用分数。**

## 关键源文件

| 文件 | 作用 |
|------|------|
| `knowledge_graph.py` | 时序三元组图谱（SQLite） |
| `palace_graph.py` | Wing/Room/Hall/Tunnel 图遍历 |
| `searcher.py` | ChromaDB 语义搜索 |
| `layers.py` | L0-L3 四层记忆栈 |
| `dialect.py` | AAAK 缩写方言 |
| `mcp_server.py` | MCP 协议 19 工具 |
| `convo_miner.py` | 对话导入（按 exchange pair 分块） |
| `onboarding.py` | 引导初始化 |

## 对 Claude Code 项目的参考价值

| 方向 | 启示 |
|------|------|
| **原始文本 > 提取摘要** | 语义搜索足够强，不需要 LLM 做提取决策；减少信息损失 |
| **分层加载** | L0/L1 常驻 + L2/L3 按需，成本降低 95%+ |
| **结构化元数据** | wing/room/hall 三级 metadata，语义过滤外加结构过滤 |
| **时序知识图谱** | 替代 Zep/Neo4j，SQLite 完全本地化，validity window 设计精巧 |
| **Claude Code Hook** | 15条消息自动保存，在压缩前紧急保存——防止上下文丢失 |
| **AAAK 诚实教训** | 官方 README 修正了过度宣传——benchmark 数据要严格可复现 |

## 诚实局限性（README 官方承认）

1. AAAK 在小规模场景不节省 token，README 例子有误（已修正）
2. 30x 无损压缩宣传过度——AAAK 是 lossy 设计
3. "+34% palace boost" 夸大——metadata 过滤是 ChromaDB 标准功能
4. 矛盾检测工具 `fact_checker.py` 存在但未接入 KG 操作流程
5. 100% Haiku rerank 结果有文件但 benchmark 脚本未公开

核心卖点（96.6% raw）是真实可复现的。
