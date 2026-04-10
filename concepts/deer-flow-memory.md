---
title: DeerFlow-Memory
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [memory, agent, llm, architecture]
sources: [modules:agents/memory/updater.py+agents/memory/queue.py+agents/memory/prompt.py+agents/memory/storage.py]
---

# DeerFlow Memory 系统

DeerFlow 的长期记忆系统，通过 LLM 从对话中提取结构化事实并持久化，在后续交互中自动注入上下文。

## 架构概览

```
对话消息
   │
   │ MemoryMiddleware（入队）
   ▼
MemoryUpdateQueue（Debounce 30s + per-thread 去重）
   │
   ▼
后台线程：MemoryUpdater._process_updates()
   │
   │ LLM 调用（MEMORY_UPDATE_PROMPT）
   ▼
facts 提取 + 去重 + 原子写入
   ▼
memory.json（持久化）
   │
   │ MemoryMiddleware（下次注入）
   ▼
<memory> 标签（最多15 facts）
```

## MemoryUpdateQueue（队列+Debounce）

```python
class MemoryUpdateQueue:
    def add(thread_id, messages, agent_name=None,
            correction_detected=False, reinforcement_detected=False):
        # Per-thread 去重：新消息合并到同一 ConversationContext
        # 启动/重置 debounce timer（30s 可配置）
        # 时间到了 → _process_updates() 批量处理
```

**信号检测**：
- `correction_detected`：用户明确纠正了 agent 的方向/理解/输出
- `reinforcement_detected`：用户给予了正面反馈

这两个信号在 prompt 中影响 fact 置信度和分类。

## MEMORY_UPDATE_PROMPT（LLM 提取）

两阶段工作：
1. **Reflection**：
   - 错误/重试检测 → category="correction"
   - 用户纠正检测 → category="correction" + sourceError
   - 项目约束发现 → 记录为 facts
2. **Memory 更新**：按 section 指南更新结构

**Section 指南**：

| Section | 内容 | 篇幅 |
|---------|------|------|
| workContext | 专业角色/公司/项目/技术栈 | 2-3句 |
| personalContext | 语言/沟通偏好/关键兴趣 | 1-2句 |
| topOfMind | 多个并发关注点（详细段落） | 3-5句 |
| recentMonths | 近1-3个月活动详细总结 | 4-6句/1-2段 |
| earlierContext | 3-12个月重要历史模式 | 3-5句 |
| **Facts** | 结构化事实条目（见下） | — |

## Fact 结构

```python
{
    "id": "uuid",
    "content": "对事实的文字描述",
    "category": "preference|knowledge|context|behavior|goal|correction",
    # category 含义：
    #   preference: 用户偏好（语言/风格/格式偏好）
    #   knowledge: 知识背景（技术栈/领域知识）
    #   context: 工作/生活上下文
    #   behavior: 行为模式（如何工作/沟通）
    #   goal: 已知目标/优先级
    #   correction: 纠正（包含 sourceError）
    "preference": "...",  # 可选，详细偏好说明
    "confidence": 0.0-1.0,  # 置信度
    "createdAt": "ISO8601",
    "source": "conversation|manual"  # 来源
}
```

## 注入机制

`MemoryMiddleware` 在每次 agent 交互后：
1. 队列消息（异步，不阻塞主流程）
2. 下次交互时，将最多 15 个 fact 注入到 `<memory>` 标签

注入格式：
```xml
<memory>
{facts}
</memory>
```

## 存储

`backend/.deer-flow/memory.json`，原子写入：
```python
# temp file + rename（操作系统原子性保证）
temp_path = path.with_suffix('.tmp')
temp_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
temp_path.rename(path)
```

## 配置

```yaml
memory:
  enabled: true
  debounce_seconds: 30
  max_facts: 15
```

## 与 nanobot Dream 的区别

| 维度 | DeerFlow Memory | nanobot Dream |
|------|----------------|--------------|
| 触发 | 每次交互后异步（Debounce） | Cron 调度（默认2小时） |
| 输出 | 结构化 facts + context sections | 最小编辑 MEMORY.md/SOUL.md |
| 持久化 | JSON 文件 | Markdown 文件 + GitStore |
| 注入 | `<memory>` XML 标签 | 直接追加到 prompt |
| 规模 | 更轻量，fact-based | 更重，完整记忆文档 |

DeerFlow memory 是"fact 提取"，nanobot Dream 是"文档编辑"。

## 与 MemPalace 的对比

| 维度 | DeerFlow Memory | MemPalace |
|------|----------------|-----------|
| 存储 | JSON 文件 | ChromaDB verbatim + SQLite KG |
| 触发 | Debounce 30s 队列 | Hook 触发（Stop / PreCompact） |
| 提取 | LLM fact 提取 | 无提取，raw 存储 |
| 检索 | prompt 内注入 | 语义搜索 + KG 查询 |
| KG | 无 | SQLite temporal triples |
| Agent 记忆 | 无 | Specialist Agents + diary |
| 审计 | 无 | WAL JSONL 审计 |
| benchmark | 无 | LongMemEval 96.6% |

## 相关概念

- [[deer-flow]] — memory 系统的宿主框架
- [[memory-system]] — nanobot 的两阶段 Dream 记忆系统（对比）
