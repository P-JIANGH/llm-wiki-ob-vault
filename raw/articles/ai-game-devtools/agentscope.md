# AgentScope — GitHub README & Source Analysis

> Source: https://github.com/modelscope/agentscope (cloned via gitcode.com mirror)
> Cloned: 2026-04-15
> License: Apache 2.0

## README 摘要

### 项目概述
AgentScope 是由阿里巴巴通义实验室 SysML 团队开发的**生产级、易用 Agent 框架**，专为日益 Agentic 化的 LLM 设计。核心特点是利用模型的推理和工具调用能力，而非用严格 prompt 约束它们。

### 核心特性
- **Simple**: 5 分钟上手，内置 ReAct agent、tools、skills、人机交互、memory、planning、实时语音、模型微调
- **Extensible**: 丰富的生态系统集成（tools、memory、observability）；内置 MCP 和 A2A 支持；Message Hub 灵活多 Agent 编排
- **Production-ready**: 支持本地部署、Serverless 云端、K8s 集群，内置 OTel 支持

### 主要模块 (src/agentscope/)
| 模块 | 说明 |
|------|------|
| `agent/` | ReActAgent、VoiceAgent、DeepResearchAgent、BrowserAgent、MetaPlannerAgent、A2AAgent、RealtimeVoiceAgent |
| `model/` | 模型抽象层（DashScope、OpenAI、Anthropic、Gemini 等） |
| `tool/` | Toolkit 工具注册，execute_python_code、execute_shell_command 等内置工具 |
| `memory/` | InMemoryMemory、SQLite 持久化、Memory Compression、Long-Term Memory (ReMe) |
| `pipeline/` | MsgHub、sequential_pipeline、broadcast 多 Agent 消息路由 |
| `mcp/` | MCP Client (HttpStatelessClient)，支持高德地图等 MCP 工具 |
| `rag/` | RAG 功能 |
| `realtime/` | 实时语音 Agent |
| `tts/` | Text-to-Speech 支持 |
| `tuner/` | Agentic RL 微调（Trinity-RFT） |
| `a2a/` | A2A (Agent-to-Agent) 协议支持 |
| `tracing/` | OpenTelemetry 分布式追踪 |
| `embedding/` | 向量嵌入 |
| `session/` | 会话管理 |

### 依赖 (pyproject.toml)
核心依赖: `aioitertools`, `anthropic`, `dashscope`, `openai`, `mcp>=1.13`, `opentelemetry-api/sdk`, `python-socketio`, `sqlalchemy`, `tiktoken`, `sounddevice`

可选依赖: `a2a` (A2A 协议), `realtime` (WebSocket 实时), `gemini` (Google Gemini)

### 示例
- `examples/agent/react_agent/` — ReAct Agent
- `examples/agent/voice_agent/` — 语音 Agent
- `examples/agent/realtime_voice_agent/` — 实时语音 Agent
- `examples/game/werewolves/` — 九人狼人杀游戏
- `examples/workflows/multiagent_debate/` — 多 Agent 辩论
- `examples/workflows/multiagent_conversation/` — 多 Agent 对话
- `examples/functionality/mcp/` — MCP 集成
- `examples/tuner/model_tuning/` — Agentic RL 微调

### 版本历史 (2024-2026)
- 2024-02: AgentScope v1 发布 (arXiv:2402.14034)
- 2025-08: AgentScope v1 论文 (arXiv:2508.16279)
- 2025-11: A2A 协议支持、ReMe 长期记忆、Agentic RL (Trinity-RFT)
- 2025-12: TTS 支持、A2A 支持
- 2026-01: Database + Memory Compression、双周社区会议
- 2026-02: 实时语音 Agent
- 2026-04: v2.0 路线图中

### 技术亮点
1. **MCP 深度集成**: 可将 MCP 工具作为本地可调用函数，注册到 Toolkit，或组合成复杂工具
2. **Agentic RL**: 通过 Trinity-RFT 库支持 RL 微调，多个 sample 项目（Math Agent、Frozen Lake、Werewolf Game 等）
3. **MsgHub 多 Agent 编排**: 支持动态增删参与者、广播消息
4. **A2A 协议**: 支持 Agent 间标准通信协议
5. **生产级部署**: K8s + OpenTelemetry 支持

### 许可证
Apache License 2.0
