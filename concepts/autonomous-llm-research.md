---
title: Autonomous LLM Research
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, agent, autonomous-research]
sources: [raw/articles/karpathy-autoresearch-2026.md]
---

# Autonomous LLM Research

## Definition
一种 AI 研究范式：给 AI agent 一个可修改的 LLM 训练代码库，agent 自主提出假设、修改代码、运行实验、评估结果、迭代改进——无需人类干预即可连续运行数小时/数夜。

## Core Pattern

```
Human 提供：
1. 可修改的代码（train.py）
2. 固定评估标准（prepare.py/val_bpb）
3. Agent 指令（program.md）

Agent 自主执行：
修改 → 实验 → 评估 → 决策（keep/discard）→ 循环
```

## Key Design Principles

| 原则 | 实现 |
|------|------|
| **职责分离** | prepare.py（数据+评估）/ train.py（模型）/ program.md（指令） |
| **固定评估标准** | val_bpb 是唯一真理，不随实验变化 |
| **时间预算** | 5分钟确保实验速度（~100/夜） |
| **可审查性** | 每次实验 git commit，结果可回溯 |
| **简洁性优先** | 同样的改进，更简单的实现优先 |

## Metrics

### val_bpb（Validation Bits Per Byte）
```python
BPB = (Σ cross_entropy_nats) / (ln(2) × Σ target_bytes)
```
- **越低越好**
- Vocab-size independent → 架构变化可公平比较
- 衡量模型对文本的压缩程度

## 典型应用场景

| 场景 | 项目 |
|------|------|
| LLM 架构搜索 | [[autoresearch]] — 搜索最优 GPT 架构/超参 |
| 优化器搜索 | MuonAdamW 就是通过这个流程发现的 |
| 数据工程 | 改变数据混合、tokenizer |
| Prompt/指令优化 | 修改 program.md 迭代 agent 行为 |

## Autoresearch vs 传统 AutoML

| 维度 | 传统 AutoML | Autoresearch |
|------|-------------|--------------|
| 搜索空间 | 超参数网格/NAS | 任意代码修改 |
| 评估频率 | 分钟~小时级 | 5分钟固定 |
| 人类干预 | 少 | 极多（program.md 迭代）|
| 创新来源 | 搜索算法 | Agent 创造力 |
| 可解释性 | 黑盒 | 每个 commit 可审查 |

## 技术栈

| 组件 | 技术 |
|------|------|
| LLM 训练 | nanochat（简化版） |
| 包管理 | uv（Astral） |
|Tokenizer | rustbpe（Karpathy Rust BPE） |
| 数据源 | HuggingFace `karpathy/climbmix-400b-shuffle` |
| 并行下载 | 8 workers + exponential backoff |

## 局限与挑战

1. **局部最优** — Agent 可能困在 architecture 局部最优
2. **代码级修改** — 无法探索全新的算法范式
3. **5分钟预算** — 只适合快速收敛的任务
4. **单 GPU** — 扩展到多 GPU 需要额外工程

## Related
- [[autoresearch]] — 实体页
- [[nanochat]] — 训练代码基础
- [[multi-agent-ai-simulation]] — 多智能体 AI（autoresearch 是单 agent）
- [[karpathy-llm101n]] — Karpathy LLM 教学体系
