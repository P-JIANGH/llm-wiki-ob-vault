---
title: Mixture of Agents (MoA)
created: 2026-04-24
updated: 2026-04-24
type: entity
tags: [llm, agent, tool, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/mixture-of-agents.md]
---

# Mixture of Agents (MoA)

Together AI 提出的分层多 LLM 聚合推理框架，**纯推理时增强**无需训练，仅用开源模型就在 AlpacaEval 2.0 上以 65.1% 超越 GPT-4 Omni（57.5%）。

## 核心架构

MoA 采用**分层 Agent 网络**：
- **参考层（Reference Layer）**：多个开源 LLM 并行处理同一输入，各自生成回答
- **聚合层（Aggregator Layer）**：一个更强的 LLM 接收所有参考回答，综合批判后输出最终答案
- **可堆叠**：中间层输出可作为下一层的输入，实现迭代精炼（默认 2~3 层）

## 极简实现

`moa.py` 仅 50 行核心代码：
```python
# 4 个参考模型并行调用
results = await asyncio.gather(*[run_llm(model) for model in reference_models])

# 聚合模型综合所有回答生成最终输出
final = client.chat.completions.create(
    model=aggregator_model,
    messages=[system_prompt + "\n".join(results), user_prompt],
    stream=True
)
```

## 技术特点

| 维度 | 说明 |
|------|------|
| 推理范式 | 纯推理时增强（test-time scaling），零训练成本 |
| 参考模型 | [[llama-3]]-3.3-70B、[[qwen2-5]]-72B/32B、WizardLM-2-8x22B、[[deepseek-v3]] 等 |
| 聚合模型 | Qwen2.5-72B / DeepSeek-V3 |
| 并行策略 | `asyncio.gather()` 异步并发调用，降低延迟 |
| API 依赖 | Together AI 平台（开源权重模型） |
| 可配置性 | 层数、温度、最大 token、参考模型列表、多轮对话开关 |

## 评测结果

- **AlpacaEval 2.0**：65.1%（开源模型组合 > GPT-4 Omni 57.5%）
- **MT-Bench**： leaderboard 前列
- **FLASK**：在正确性、事实性、洞察力、完整性、元认知等维度超越 GPT-4 Omni

## 与同类方案差异

- **vs [[mixture-of-agents]] 自指**：本文就是 MoA 本身
- **vs 单模型推理**：不修改任何模型权重，通过"模型集成"提升输出质量
- **vs 训练时 MoE**：MoE（如 [[deepseek-v3]]）在训练时引入稀疏专家，MoA 在推理时动态组合完整模型
- **vs Agent 框架（[[auto-gpt]]/[[metagpt]]）**：MoA 不是任务分解型 Agent，而是**回答聚合型**增强器，专注于单轮/多轮回答质量提升

## 应用场景

- 高质量对话系统（无需微调即可获得 GPT-4 级回答）
- 答案一致性校验（多模型交叉验证）
- 游戏 NPC 对话增强（低成本提升角色回答质量）

## 相关链接

- GitHub: https://github.com/togethercomputer/MoA
- 论文: https://arxiv.org/abs/2406.04692
- Together AI: https://www.together.ai/
