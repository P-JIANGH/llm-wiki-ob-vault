---
title: AgentScope
created: 2026-04-15
updated: 2026-05-15
type: entity
tags: [agent, framework, llm, multi-agent, python, open-source, tool, voice, rl]
sources: [raw/articles/ai-game-devtools/agentscope.md]
aliases: ["AgentScope"]
---

# AgentScope

**AgentScope** 是阿里巴巴通义实验室 SysML 团队开发的**生产级 Python Agent 框架**（Apache 2.0），采用 **Agent-Oriented Programming（AOP）** 理念：利用 LLM 自身的推理和工具调用能力，而非用严格 prompt 约束。~25k stars，40+ 版本迭代，v2.0 路线图进行中。

## 核心哲学

> AgentScope 相信 LLM 足够智能，可以通过更少的约束进行推理——它提供 ReAct 循环，让 Agent 自主决定下一步。

这与 LangGraph（图约束）形成鲜明对比：AgentScope 提供过程式编排（async/await pipeline），让 Agent 自由发挥。

## 架构：元类驱动的 Agent 体系

### Agent 基类（元类 `_AgentMeta`）

```python
class _AgentMeta(type):
    # 编译时自动注入 pre/post hooks 到 reply/observe/print
    # _ReActAgentMeta 扩展为 _reasoning/_acting
```

```
StateModule
    └── AgentBase (元类: _AgentMeta)
         ├── __call__() → reply() → 广播给订阅者
         ├── pre/post reply/observe/print hooks
         └── _subscribers dict（MsgHub 集成）
              │
              ├── ReActAgentBase (元类: _ReActAgentMeta)
              ├── ReActAgent ★ — 核心 Agent（推理-行动循环）
              ├── A2AAgent — 远程 Agent 代理
              ├── UserAgent — 人类输入
              └── RealtimeAgent — 实时语音
```

### ReAct Agent（核心，~1137 行）

回复循环：记忆检索 → 知识库检索 → 内存压缩 → 推理（LLM 调用）→ 行动（工具执行）→ 循环

- 并行工具调用（`asyncio.gather`）
- 结构化输出（Pydantic BaseModel）
- 流式输出（AsyncGenerator）
- 中断处理（`CancelledError → handle_interrupt`）

### MsgHub（多 Agent 粘合剂）

发布-订阅模式替代传统的 GroupChat：

```python
async with MsgHub(participants=[agent1, agent2, agent3]) as hub:
    await sequential_pipeline([agent1, agent2, agent3])
    hub.add(agent4)  # 动态添加
```

### Pipeline（过程式编排）

| Pipeline | 说明 |
|----------|------|
| `sequential_pipeline(agents, msg)` | 链式传递 |
| `fanout_pipeline(agents, msg)` | 并行分发（asyncio.gather） |
| `SequentialPipeline(agents)` | 可复用包装器 |
| `FanoutPipeline(agents)` | 可复用包装器 |

## 独特特性

### 1. Trinity-RFT RL 微调

AgentScope 是目前**唯一**内置 RL 微调的 Agent 框架：

```python
tune(workflow_func, judge_func, train_dataset, model, algorithm="multi_step_grpo", ...)
```

已验证场景：数学 Agent（Qwen3-0.6B 准确率 75%→85%）、Frozen Lake（15%→86%）、狼人杀（狼人胜率 50%→80%）

### 2. 原生协议支持

| 协议 | 支持方式 |
|------|----------|
| **MCP** | HttpStatelessClient（SSE/HTTP）+ StdioStatefulClient，工具自动注册到 Toolkit |
| **A2A** | A2AAgent 类 + Task 生命周期管理 + 服务发现（文件/Nacos/Well-known） |

### 3. 实时语音 Agent

原生支持 OpenAI / DashScope / Gemini 实时语音对话。

### 4. 工具系统（Toolkit）

- 自动从文档字符串生成 JSON Schema
- Pydantic BaseModel 扩展
- 预设参数 + 后处理函数
- 工具分组（Group）动态激活/停用
- MCP 工具无缝注册为本地函数

## 代码组织

```
src/agentscope/
├── agent/             # Agent 基类 + ReAct + A2A + Realtime + User
├── pipeline/          # MsgHub, Sequential, Fanout
├── message/           # Msg 类 + ContentBlock（Text/Image/Audio/Video/ToolUse）
├── model/             # LLM 包装器（OpenAI/Anthropic/Gemini/DashScope/Ollama）
├── tool/              # Toolkit, ToolResponse, 内置工具
├── mcp/               # MCP 客户端（HTTP/SSE/stdio）
├── a2a/               # A2A 协议支持
├── memory/            # 工作记忆（Redis/SQLAlchemy/TableStore）+ 长期记忆（Mem0/ReMe）
├── tuner/             # Trinity-RFT RL 微调
├── tracing/           # OpenTelemetry 追踪
├── realtime/          # 实时语音 Agent
├── session/           # 会话持久化
├── evaluate/          # 评估 + ACEBench
└── types/             # 类型定义
```

## 生产部署

- **AgentScope Runtime** — K8s / 本地 / 无服务器部署
- **AgentScope Studio** — 可视化调试/追踪/评估
- **OpenTelemetry** — 内置 `setup_tracing()`，兼容 Arize-Phoenix/Langfuse
- **会话持久化** — Redis / SQLAlchemy / JSON / TableStore

## 生态系统仓库

| 仓库 | 描述 |
|------|------|
| agentscope-runtime | K8s/无服务器部署运行时 |
| agentscope-java | Java SDK |
| agentscope-studio | 可视化开发工具包 |
| agentscope-samples | 即用样本（Math Agent / Werewolf / Alias） |
| Trinity-RFT | RL 微调引擎 |
| ReMe | 长期记忆管理工具包 |
| QwenPaw | 浏览器自动化 Agent |

## 仓库概况

| 指标 | 数值 |
|------|------|
| GitHub Stars | ~24,700 |
| License | Apache 2.0 |
| 语言 | Python |
| 版本 | 1.0.19.post1 |
| 论文 | 2篇（arXiv 2402.14034, 2508.16279） |
| 组织 | 阿里巴巴通义实验室 |
| Python 版本 | 3.10+ |

## 相关链接

- GitHub: https://github.com/modelscope/agentscope
- 文档: https://agentscope.readthedocs.io/
- 组织: https://github.com/agentscope-ai

## 相关项目

- [[ai-game-devtools/langgraph]] — 图约束 vs AgentScope 自由推理
- [[ai-game-devtools/crewai]] — 角色团队 vs AgentScope AOP
- [[ai-game-devtools/autogen]] — 微软对话式多 Agent 框架
