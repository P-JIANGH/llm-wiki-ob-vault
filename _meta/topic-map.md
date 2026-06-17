---
title: Agentic System Designer — 知识体系导航
created: 2026-05-15
updated: 2026-05-15
type: summary
tags: [learning, reference, career, architecture]
---

# Agentic System Designer 知识体系导航

> 按技能领域组织的导航地图。每个领域列出核心 wiki 页面，从入门到精通。
> 完整索引见 [[index.md]]。

---

## 🧠 1. Agent Frameworks（框架精通）

核心技能：掌握至少一个 Agent 框架的架构设计、运行时原理和生态体系。

### 入门（选择一个框架深入研究）
| [[ai-game-devtools/langgraph]] | 有状态图编排，Pregel BSP 引擎，生产级最成熟 |
| [[ai-game-devtools/crewai]] | 角色驱动团队编排，上手最快，~47K stars |
| [[ai-game-devtools/agentscope]] | AOP 架构，唯一带 RL 微调的框架，阿里云原生 |
| [[concepts/microsoft-agent-framework]] | 微软官方，AutoGen+SK 融合，.NET/Python 双栈 |
| [[ai-game-devtools/autogen]] | 先驱框架，维护模式，了解其架构和三叉路分裂 |

### 进阶（深入架构原理）
| [[concepts/agent-loop]] | Agent 核心执行循环：感知→推理→行动 |
| [[concepts/agent-swarm]] | 多 Agent 协作架构模式 |
| [[concepts/magentic-one]] | Orchestrator + Specialist 多 Agent 系统 |
| [[concepts/agent-cli-tui-learning-path]] | Agent CLI/TUI 架构学习路径 |
| [[concepts/provider-registry]] | LLM Provider 插拔式架构模式 |

### 生态参考
| [[entities/hermes-agent]] | 生产级 Agent 框架参考 |
| [[ai-game-devtools/pi-coding-agent]] | Coding Agent 参考实现 |
| [[entities/deepseek-tui]] | TUI-based Agent 实现 |
| [[entities/ruflo]] | Agent 编排层参考 |
| [[entities/deer-flow]] | LangGraph Agent 参考 |

---

## 🔄 2. Multi-Agent Orchestration（多智能体编排）

核心技能：多 Agent 通信、协调、任务分配、冲突解决。

### 基础模式
| [[multi-agent-ai-simulation]] | 多智能体 AI 通用概念：记忆/任务/感知/决策 |
| [[stanford-generative-agents]] | Stanford Generative Agents 论文模式 |
| [[aios]] | AI Agent 操作系统：调度/记忆/存储/工具 |

### 高级模式
| [[chatdev]] | 零代码多智能体平台，Puppeteer-style RL 编排 |
| [[openmaic]] | 多智能体互动教室平台，LangGraph 编排 |
| [[ioa]] | 多智能体协作框架，异构 Agent 自主组队 |

### Comparison
| [[comparisons/agent-framework-comparison]] | 五框架全方位对比 + 技术选型决策树 |

---

## 🔌 3. MCP & Protocols（协议与集成）

核心技能：MCP（Model Context Protocol）、A2A（Agent-to-Agent）、工具调用协议。

### MCP 生态
| [[concepts/mcp]] | MCP 协议概述 |
| [[concepts/mcp-system]] | MCP Server 管理、工具注册 |
| [[concepts/broker-interface]] | Broker 抽象接口模式 |
| [[concepts/pubsub-pattern]] | 发布/订阅消息模式 |

### 工具调用
| [[openai-tool-calling]] | OpenAI Tool Calling 协议 |
| [[tool-registry-pattern]] | 工具注册表模式 |
| [[registry-pattern-tool-discovery]] | 中心注册表 + check_fn 工具发现 |

### 集成参考
| [[ai-game-devtools/qwen-agent]] | 阿里 Qwen Agent，工具调用/RAG/MCP |
| [[ai-game-devtools/swe-agent]] | ACI Agent Computer Interface |
| [[ai-game-devtools/taskgen]] | 基于任务的 Agent 框架，JSON 通信 |

---

## 💾 4. Memory & Knowledge（记忆与知识）

核心技能：长期记忆、RAG、向量检索、上下文管理。

### 记忆系统
| [[concepts/memory-system]] | AI Agent 长期记忆架构设计 |
| [[concepts/deer-flow-memory]] | DeerFlow 结构化事实提取 + 持久化 |
| [[persistent-memory-system]] | AI 角色长期记忆持久化 |
| [[mempalace]] | 4 层记忆栈，LongMemEval 96.6% |

### RAG 与检索
| [[hipporag]] | 神经生物学启发 LLM 长期记忆 |
| [[comorag]] | 认知启发记忆组织 RAG |
| [[concepts/rag-systems]] | RAG 系统概述 |
| [[concepts/vector-databases]] | 向量数据库 |
| [[buffer-of-thoughts]] | 思维模板缓存 + LightRAG |

### 上下文管理
| [[concepts/context-compression]] | Agent 上下文压缩策略 |
| [[infllm-v2]] | 长上下文推理优化 |
| [[long-context]] | 长上下文窗口技术 |

---

## ⚙️ 5. LLM Infrastructure（LLM 基础设施）

核心技能：模型部署、推理优化、Provider 管理、成本控制。

### 推理引擎
| [[vllm]] | PagedAttention 高吞吐推理，2-4× 优势 |
| [[sglang]] | RadixAttention，结构化生成，比 vLLM 快 3.2× |
| [[llama-cpp]] | GGUF 量化推理，CPU/GPU 跨平台 |
| [[mlc-llm]] | TVM 编译优化，跨平台部署 |

### Provider 与接入
| [[llm-integration]] | 9 个 LLM Provider 统一接入 |
| [[concepts/llm-providers]] | LlmService 多 Provider 管理 |
| [[concepts/provider-registry]] | Provider 注册模式 |

### 量化与优化
| [[concepts/quantization]] | 模型量化技术 |
| [[concepts/distillation]] | 知识蒸馏 |
| [[concepts/moe]] | MoE 混合专家架构 |

---

## 🚀 6. Production Deployment（生产部署）

核心技能：Agent 可观测性、评估、安全、CI/CD。

| [[evaluation/agent-evaluation]] | Agent 评测方法论 |
| [[agentbench]] | THUDM Agent 评测基准 |
| [[visual-agent-bench]] | VLM Agent 评测基准 |
| [[concepts/observability]] | Agent 可观测性（OTel/Tracing）|
| [[concepts/deer-flow-runtime]] | Agent 运行时架构 |
| [[concepts/deer-flow-sandbox]] | 隔离执行环境设计 |
| [[concepts/deer-flow-subagent]] | 子 Agent 执行机制 |

---

## 📚 7. Career & Learning（职业路径）

核心技能：系统性成长，从了解框架到设计架构。

| [[concepts/agentic-system-designer-career-path]] | 完整职业路径：技能树/学习路径/市场 |
| [[concepts/agent-cli-tui-learning-path]] | CLI/TUI Agent 学习路径 |
| [[karpathy-llm101n]] | 神经网络从零到一课程 |
| [[nanogpt]] | GPT 训练极简实现 |
| [[llm-c]] | C/CUDA LLM 训练框架 |

---

## 相关页面

- [[SCHEMA.md]] — Wiki 架构规范
- [[index.md]] — 完整索引
- [[comparisons/agent-framework-comparison]] — 框架选型指南
