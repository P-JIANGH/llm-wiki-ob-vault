# RPBench-Auto

---
title: RPBench-Auto
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, tool]
sources: [raw/articles/ai-game-devtools/rpbench-auto.md]
---

## Overview

**RPBench-Auto** 是 boson-ai 开源的 LLM 角色扮演（Role-Playing）自动化评测流水线。受 [ArenaHard](https://github.com/lm-sys/arena-hard-auto) 和 [AlpacaEval](https://tatsu-lab.github.io/alpaca_eval/) 启发，采用竞技场式 pairwise 对比 + 裁判 LLM 打分 + Elo 排名的评测范式。

- **GitHub:** https://github.com/boson-ai/RPBench-Auto
- **Leaderboard:** https://boson.ai/rpbench/
- **License:** Apache 2.0

## 核心架构

### 评测流水线

```
NPC Profile + 对话数据集
    → 两个模型随机分配 A/B 位置生成回复
    → 裁判 LLM 选择优胜者 + 生成下一轮用户输入
    → 每角色重复 5 轮对话
    → 收集所有 pairwise 结果
    → 计算 Elo 评分（MLE/Online/WHR 三种算法）
    → 生成排行榜
```

### 关键模块

| 文件 | 功能 |
|------|------|
| `run_character_eval.py` | 角色子集评测（NPC 角色扮演），pairwise 对比，裁判模拟用户交互 |
| `run_scene_eval.py` | 场景子集评测，类似架构 |
| `calculate_metrics.py` | Elo 评分计算：online / MLE(Bradley-Terry) / WHR(Whole History Rating)，bootstrap 置信区间 |
| `utils.py` | 多 Provider API 抽象层：OpenAI / Anthropic / Mistral / Azure / Cohere |
| `generate_leaderboard.py` | 排行榜生成脚本 |

### 裁判系统

裁判 LLM 接收完整 NPC 角色设定（名称、标题、描述、定义、长定义）及两个模型的回复，输出 JSON 格式的判决：
```json
{"winner": "model_a"/"model_b", "next_round_user_speaks": "...", "decision_reason": "..."}
```

使用 `json_repair` 库容错解析，支持从非标准 JSON 中提取 winner 字段。

## 已评测模型

Leaderboard 覆盖 17+ 个主流模型（vs GPT-4o 基线）：

| 模型 | 提供商 | Elo 评测 |
|------|--------|----------|
| GPT-4o | OpenAI | 基线 |
| Claude-3.5 Sonnet | Anthropic | ✅ |
| Claude-3 Opus | Anthropic | ✅ |
| Higgs-Llama-3 70B V2 | Boson.ai | ✅ |
| Llama-3.1 405B FP8 | Meta | ✅ |
| DeepSeek-V2 | DeepSeek | ✅ |
| Mistral Large | Mistral | ✅ |
| Gemini 1.5 Pro | Google | ⚠️ 多轮对话不支持 |
| Qwen2 72B | 阿里 | ✅ |
| MiniMax abab6.5s | MiniMax | ✅ |
| Yi Large | 01.AI | ✅ |
| Character.AI | Character.AI | ✅ |

## 技术特点

- **位置随机化**：每轮随机分配 model_a/model_b 避免位置偏差
- **多算法 Elo**：MLE（最大似然估计）、Online Elo、WHR（全历史评级）三种方法交叉验证
- **多 Provider 支持**：单一 `chat_completion()` 路由到不同 API，16 次重试 + 10s 退避
- **贡献机制**：提交 PR 更新 results/ 下的 .jsonl 文件即可加入排行榜

## 与同类工具差异

- 相比 [[ragas]]（客观指标评测），RPBench-Auto 专注角色扮演主观质量
- 相比 [[agentbench]]（8 种 Agent 环境评测），专注于 NPC 对话场景
- 与 ArenaHard 共享评测范式，但数据集和裁判 prompt 专为角色扮演优化
