---
title: Stanford Generative Agents (AI Town)
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [ai, stanford, multi-agent, generative-agents, llm]
sources: [web search]
---

# Stanford Generative Agents (AI Town)

## Overview
斯坦福 2023 年 4 月发表的论文 *"Generative Agents: Interactive Simulacra of Human Behavior"*，提出多智能体社交模拟的完整架构。GitHub 开源项目 `joonspk-research/generative_agents`。

**论文**: arxiv.org/abs/2304.03442
**核心**: 25 个 AI 角色在虚拟小镇中自主生活、社交、协作

## 核心架构：Memory → Reflection → Planning

```
Generative Agent
├── Memory Stream         (记忆流)
│   ├── observations       (感知观察)
│   ├── reflections        (自我反思)
│   └── plans             (行动计划)
├── Retrieval Model       (检索模型)
├── Reflection Model      (反思模型)
└── Planning Model        (规划模型)
```

### 1. Memory Stream（记忆流）
持久化的观察记录序列，每个条目包含：
- **文本**（观察内容）
- **创建时间戳**
- **重要性评分**

```python
# 记忆条目结构
{
    "text": "Alice talked about her frustration with the broken printer",
    "created_at": timestamp,
    "importance": 7,  # 1-10 重要性
    "type": "observation"  # 或 "reflection"
}
```

### 2. Reflection（反思）
定期将记忆流聚合成高层次的**反思**：

```
Observation: "Klaus used 5 papers in 2 hours"
↓ 检索相关记忆
↓ Reflection: "Klaus has been using a lot of paper"
↓ 检索相关记忆
↓ Reflection: "The printer in the office is frequently used by many people.
               Klaus might be concerned about the office's environmental footprint."
```

反思结果本身也写回 Memory Stream，形成递归层次。

### 3. Planning（规划）
基于反思和当前状态，生成**一天的详细行动计划链**：

```
07:00 起床，洗漱，穿衣
07:30 做早餐（羊角面包 + 咖啡）
08:00 吃早餐
08:30 去学校图书馆
09:00 研究（论文 + 编程）
12:00 午餐
...
```

规划会随执行情况**动态调整**（replan）。

## 与 Microverse 对比

| 维度 | Stanford Generative Agents | Microverse |
|------|--------------------------|------------|
| **发布年份** | 2023 | 2025 |
| **角色数量** | 25 | 8 |
| **场景** | 沙盒小镇（画布/厨房/咖啡馆/办公） | 办公室单一场景 |
| **架构核心** | Memory → Reflection → Planning | 感知 → 状态 → 决策 → Action |
| **记忆系统** | 无限记忆流 + 重要性评分 + 递归反思 | 有限记忆池（上限50条） + 重要性分级 |
| **规划系统** | 完整 12 小时行动计划链，每日重排 | 任务池（最多 3 个活跃任务），按 priority 排序 |
| **对话系统** | 自由对话，无字数约束 | 30字约束，双向递归 |
| **感知系统** | 观察周围 agent 的行为和对话 | 房间定位 + 物品列表 + 角色位置 |
| **决策** | Reflection → Plan → Act 循环 | LLM Prompt 决策（选项 1/2） |
| **开发引擎** | Python + Chrome MMO 可视化 | Godot 4 + GDScript |
| **开源** | GitHub 开源 | GitHub 开源 |
| **社交规则** | 弱（仅有基本位置约束） | 强（BackgroundStoryManager） |
| **存档系统** | 无（每次重启清空） | GameSaveManager 持久化 |
| **LLM** | GPT-3.5/GPT-4 | 多 Provider（OpenAI/Claude/DeepSeek...） |

## 关键创新差异

### Stanford 的贡献
1. **Reflection 递归抽象** — 从低层 observations 自动生成高层 insights
2. **完整行动规划链** — 一天 12 小时，每 5 分钟一个 action slot
3. **Agent 间观察传播** — A 看到 B 的行为会影响 A 的记忆

### Microverse 的改进
1. **多 Provider 支持** — 不绑定 OpenAI，任何 LLM 均可
2. **社会规则引擎** — BackgroundStoryManager 可配置规则约束
3. **持久化存档** — 退出再进，记忆和状态不丢失
4. **角色独立 AI 配置** — Stephen 可以用 Claude，Jack 可以用 DeepSeek
5. **30字对话约束** — 避免 LLM 输出过长，保持实时对话节奏

## 共同局限性

| 问题 | 描述 |
|------|------|
| **幻觉** | LLM 可能创造不存在的角色名/事件 |
| **Token 成本** | 每个 agent 的 prompt 包含全量上下文，成本随 agent 数增长 |
| **延迟** | LLM API 调用带来秒级延迟，对话不实时 |
| **现实差距** | 角色行为仍有明显的"AI味"，非真实人类社交 |

## 相关页面

- [multi-agent-ai-simulation](#/concepts/multi-agent-ai-simulation) — 多智能体 AI 通用概念
- [multi-agent-ai-game-impl](#/concepts/multi-agent-ai-game-impl) — Microverse 的具体实现
- [microverse-dialog-system](#/concepts/microverse-dialog-system) — Microverse 对话系统详解
- [llm-integration](#/concepts/llm-integration) — 多 Provider LLM 集成

## 参考文献
- Park et al. *"Generative Agents: Interactive Simulacra of Human Behavior"*, Stanford HAI, 2023
- GitHub: `joonspk-research/generative_agents`
