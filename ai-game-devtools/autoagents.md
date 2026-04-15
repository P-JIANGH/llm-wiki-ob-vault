---
title: AutoAgents
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, agent, llm, open-source, multi-agent]
sources: [raw/articles/ai-game-devtools/autoagents.md]
---

# AutoAgents

> GitHub: [Link-AGI/AutoAgents](https://github.com/Link-AGI/AutoAgents) | License: MIT | IJCAI 2024

## Overview

AutoAgents 是一个基于 LLM 的**自动多智能体生成框架**，由 LLM 驱动，自主生成多个专家角色（Agent）协作完成复杂任务。与传统的固定角色 Agent 系统不同，AutoAgents 能根据问题**动态生成**所需的角色组合和执行计划。

核心发表论文：[AutoAgents: A Framework for Automatic Agent Generation](https://arxiv.org/abs/2309.17288)（IJCAI 2024）。

## Architecture

AutoAgents 由 6 大核心组件构成：

| Component | Role |
|-----------|------|
| **Planner** | 根据问题确定需要哪些专家角色，以及具体执行计划 |
| **Agents** | Planner 动态生成的专家角色代理（含 name/expertise/tools/LLM 增强）|
| **Plan** | 由专家角色组成的执行计划，每步骤至少有一个 Agent 参与 |
| **Actions** | 专家角色的具体动作（工具调用、结果输出等）|
| **Tools** | 可用工具集，当前仅支持搜索工具（SerpAPI/Serper/Google）|
| **Observers** | 反射检查 Agents/Plan/Action 的合理性（ObserverAgents + ObserverPlans）|

### Key Roles

- **Manager** (`roles/manager.py`) — 核心协调者，运行 CreateRoles → CheckRoles → CheckPlans 三步迭代直至收敛
- **ObserverAgents** — 检查生成的专家角色是否符合要求
- **ObserverPlans** — 检查执行计划是否合理
- **Group** — 协调多个 Agent 协作执行

### Execution Flow

```
User Idea → Manager (Planner)
  ├─ CreateRoles (生成专家角色)
  ├─ CheckRoles (ObserverAgents 验证)
  └─ CheckPlans (ObserverPlans 验证)
  └─ [迭代直到收敛] → 执行计划
```

## Deployment Modes

- **命令行模式**: `python main.py --mode commandline --idea "..."`
- **WebSocket 服务模式**: `python main.py --mode service --host 127.0.0.1 --port 9000`
- **Docker**: `docker run -it --rm -p 7860:7860 linksoul.ai/autoagents:1.0`

## Key Dependencies

- OpenAI API（默认 `gpt-4o`，支持 Azure 风格配置）
- SerpAPI / Serper / Google 搜索 API
- 基于 [[ai-game-devtools/metagpt]] 的 system/action/role 架构构建

## Technology Stack

- **Language**: Python
- **LLM**: OpenAI GPT 系列（可扩展至其他兼容 API）
- **Memory**: FAISS 向量存储 + LongTermMemory
- **Search**: SerpAPI / Serper API
- **Architecture**: Role-Based Multi-Agent（借鉴 MetaGPT）

## Use Cases

- 谣言验证（Rumor Verification）
- 复杂问题研究（如"LK-99 是否是室温超导体"）
- 游戏任务规划与执行

## Related Links

- [HuggingFace Spaces Demo](https://huggingface.co/spaces/LinkSoul/AutoAgents)
- Paper: [arXiv:2309.17288](https://arxiv.org/abs/2309.17288)
- Built on [[ai-game-devtools/metagpt]]

## Comparison with Similar Tools

| Feature | AutoAgents | [[ai-game-devtools/chatdev]] | [[ai-game-devtools/agentsims]] |
|---------|-----------|-----------|---------|
| Dynamic Role Generation | ✅ Yes | ❌ Fixed roles | ❌ Fixed roles |
| Observer Self-Reflection | ✅ Agents/Plan/Action | ❌ No | ❌ No |
| LLM-Driven Planning | ✅ Yes | ✅ Yes | ✅ Yes |
| IJCAI 2024 Published | ✅ Yes | ❌ NeurIPS 2025 | ❌ ArXiv only |
