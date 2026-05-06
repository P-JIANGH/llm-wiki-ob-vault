---
title: Ruflo
created: 2026-05-06
updated: 2026-05-06
type: entity
tags: [agent, cli, framework, multi-agent, orchestration, mcp, swarm, memory, llm, typescript]
sources: [~/ruflo/README.md, ~/ruflo/docs/STATUS.md, ~/ruflo/docs/USERGUIDE.md, ~/ruflo/v3/src/index.ts, ~/ruflo/v3/@claude-flow/cli/src/index.ts, ~/ruflo/v3/@claude-flow/shared/src/types.ts, ~/ruflo/v3/src/coordination/application/SwarmCoordinator.ts, ~/ruflo/v3/src/infrastructure/mcp/MCPServer.ts, ~/ruflo/package.json]
---

# Ruflo

> 原名 Claude Flow，现名 Ruflo。面向 Claude Code 的多 Agent 编排框架，将单 Agent 编程助手扩展为带记忆、自学习、跨机器联邦协作的企业级 Agent 团队。

**npm:** `ruflo` / `claude-flow` | **License:** MIT | **Author:** [RuvNet](https://github.com/ruvnet) | **Web UI:** [flo.ruv.io](https://flo.ruv.io/) | **Goal Planner:** [goal.ruv.io](https://goal.ruv.io/)

---

## 核心定位

```
User → CLI/MCP → Router → Swarm → Agents → Memory → LLM Providers
                      ↑                          │
                      └──── Learning Loop ←──────┘
```

Ruflo 不是 LLM，不是 Agent 本身，而是**编排层**：
- 将 Claude Code 的单 Agent 能力扩展为多 Agent 协作
- 提供共享记忆（HNSW vector search）、自学习（SONA）、联邦安全通信
- 自身不运行 LLM，调用 Claude/GPT/Gemini/Ollama 等外部 Provider

---

## 安装路径（两条路）

| | Claude Code 插件（轻量） | CLI 完整安装 |
|--|--|--|
| 命令 | `/plugin install ruflo-core@ruflo` | `npx ruflo@latest init` |
| 文件侵入 | **零** | `.claude/` / `.claude-flow/` / `CLAUDE.md` |
| MCP server | **不注册** | 注册，工具可用 |
| Hooks | **无** | 27 个 hooks |
| 适合 | 体验单个插件命令 | 生产使用 |

---

## 架构总览

```
┌──────────────────────────────────────────────────────────┐
│                      Entry Layer                          │
│  CLI (49 commands) + MCP Server (300+ tools)            │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│                   Routing Layer                           │
│  Q-Learning Router + MoE (8 Experts) + 130+ Skills      │
│  27 Hooks (pre-task / post-edit / post-task / ...)      │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│               Swarm Coordination Layer                     │
│  SwarmCoordinator (hierarchical/mesh/ring/star)          │
│  Consensus: Raft / BFT / Gossip                         │
│  Queen-led 层级 + Claims (Human-Agent 协调)              │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│              100+ Specialized Agents                      │
│  coder / tester / reviewer / architect / security-architect │
│  15 个固定角色（ADR-002 DDD）                             │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│               Memory & Intelligence                       │
│  AgentDB (HNSW, 150x-12500x faster)                     │
│  SONA 自学习 + ReasoningBank + Hyperbolic Poincaré       │
│  RuVector: Int8 量化 + LoRA/MicroLoRA                    │
└──────────────────────────────────────────────────────────┘
```

---

## V3 模块结构（v3/ 目录）

| Package | 路径 | 职责 |
|---------|------|------|
| `@claude-flow/cli` | `v3/@claude-flow/cli/` | CLI 入口（26 commands，140+ subcommands）|
| `@claude-flow/guidance` | `v3/@claude-flow/guidance/` | Governance 控制面（compile/enforce/prove/evolve）|
| `@claude-flow/hooks` | `v3/@claude-flow/hooks/` | 17 hooks + 12 背景 workers |
| `@claude-flow/memory` | `v3/@claude-flow/memory/` | AgentDB + HNSW 向量搜索 |
| `@claude-flow/shared` | `v3/@claude-flow/shared/` | 共享类型（Agent/Task/Swarm/Event 类型定义）|
| `@claude-flow/security` | `v3/@claude-flow/security/` | 输入验证 / 路径安全 / CVE 修复 |
| `@claude-flow/mcp` | `v3/@claude-flow/mcp/` | MCP Server 实现 |
| `@claude-flow/plugins` | `v3/@claude-flow/plugins/` | 插件管理器 |
| `@claude-flow/swarm` | `v3/@claude-flow/swarm/` | Swarm 协调引擎 |
| `goal_ui` | `v3/goal_ui/` | Goal-Oriented Action Planning 前端（Vite+Supabase）|

### Domain-Driven Design（ADR-002）

V3 采用 DDD 架构：

```
SwarmCoordinator (application) — 编排协调
  ├── Agent (domain/entity) — Agent 实体
  ├── Task (domain/entity) — Task 实体
  ├── SwarmState (domain/value-object)
  └── Consensus Mechanism (domain/service)

HybridBackend / SQLiteBackend / AgentDBBackend (infrastructure)
  └── Memory domain — MemoryEntity / Memory
```

### 关键类型（v3/@claude-flow/shared/src/types.ts）

**15 个固定 Agent 角色：**
```
queen-coordinator (#1) | security-architect (#2) | security-implementer (#3)
security-tester (#4) | core-architect (#5) | core-implementer (#6)
memory-specialist (#7) | swarm-specialist (#8) | mcp-specialist (#9)
integration-architect (#10) | cli-hooks-developer (#11) | neural-learning-dev (#12)
tdd-test-engineer (#13) | performance-engineer (#14) | release-engineer (#15)
```

**Task 类型：** security-audit/fix/test, architecture-design, implementation, memory-optimization, swarm-coordination, mcp-enhancement, integration, cli-development, neural-training, test-writing, benchmark, deployment, documentation

**Swarm 拓扑：** hierarchical-mesh / mesh / hierarchical / centralized

**共识机制：** Raft（leader 维护状态）/ BFT（Byzantine Fault Tolerance）/ Gossip

---

## 核心模块详解

### 1. SwarmCoordinator（v3/src/coordination/application/SwarmCoordinator.ts）

协调多 Agent Swarm 的核心引擎，基于 `agentic-flow` 的 AttentionCoordinator 模式：

```typescript
export class SwarmCoordinator {
  private topology: SwarmTopology;
  private agents: Map<string, Agent>;
  private connections: MeshConnection[];
  private eventBus: EventEmitter;

  async initialize(): Promise<void>
  async shutdown(): Promise<void>
  async spawnAgent(config: AgentConfig): Promise<Agent>
  // ...
}
```

支持 hierarchical（Queen 控制）和 hierarchical-mesh（Queen + peer 通信）两种拓扑。

### 2. MCPServer（v3/src/infrastructure/mcp/MCPServer.ts）

Model Context Protocol 服务端，暴露 300+ tools 给 Claude Code：

```typescript
export class MCPServer {
  private toolRegistry: Map<string, MCPTool>;
  private port: number;
  private host: string;

  async start(): Promise<void>
  async stop(): Promise<void>
  registerTool(tool: MCPTool): void
}
```

### 3. CLI（v3/@claude-flow/cli/src/index.ts）

现代化 CLI 架构，支持 lazy command loading：

```typescript
export class CLI {
  private parser: CommandParser;  // 支持嵌套 subcommand
  private output: OutputFormatter;

  async run(args: string[]): Promise<void>
  // 命令：init / agent / swarm / memory / mcp / hooks / config / ...
}
```

**命令行注册表**（commands/index.ts）：26 个同步加载 + 24 个 lazy loading commands，减少启动时间 ~200ms。

### 4. Hooks 系统（@claude-flow/hooks）

27 个 hooks 覆盖完整开发周期：

| 阶段 | Hooks |
|------|-------|
| pre | `pre-task` / `pre-edit` / `pre-commit` / `pre-build` |
| post | `post-task` / `post-edit` / `post-commit` / `post-build` |
| workers | `ultralearn` / `audit` / `optimize` / `testgaps` / `document` |
| routing | `route` / `model-select` / `agent-boost` |

### 5. 自学习系统（RuVector Intelligence）

| 组件 | 功能 | 性能 |
|------|------|------|
| SONA | 自优化神经注意力，< 0.05ms |  |
| EWC++ | 弹性权重固化，防遗忘 |  |
| Flash Attention | 2.49x - 7.47x 加速 |  |
| HNSW | 向量索引搜索 | 150x - 12500x |
| Int8 Quantization | 内存优化 | 3.92x 内存节省 |
| LoRA/MicroLoRA | 低秩适配 |  |

### 6. 12 背景 Workers

自动触发：audit / optimize / testgaps / document / map / deepdive 等。

---

## 安全特性（ADR-096 加密存储 / ADR-097 联邦预算）

- **加密存储：** AES-256-GCM vault，`RFE1` magic byte，`CLAUDE_FLOW_ENCRYPT_AT_REST=1` 启用
- **高风险 store 加密：** sessions / terminals / .swarm/memory.db（sql.js SQLite + ONNX embeddings）
- **联邦预算熔断：** `federation_send` 支持 `budget`/`maxHops`/`spent` 元数据，默认 `maxHops: 8`
- **命令注入防护：** github-safe.js / statusline.js / github-tools MCP / update/executor
- **环境变量门控：** `LD_PRELOAD` / `NODE_OPTIONS` / `DYLD_*` 在 `terminal_create` 边界被 `validateEnv()` 拒绝
- **文件权限：** session/terminal/memory stores 使用 `fs-secure.writeFileRestricted`（mode 0600）
- **MCP stdin DoS 防护：** `bin/mcp-server.js` / `bin/cli.js` 限制 10MB 输入

---

## Web UI

| 产品 | URL | 功能 |
|------|-----|------|
| **RuFlo Web UI** | [flo.ruv.io](https://flo.ruv.io/) | 多模型 Chat，MCP 工具调用，WASM gallery，可自托管 |
| **Goal Planner** | [goal.ruv.io](https://goal.ruv.io/) | GOAP A* 规划，plain-English → 可执行计划，live agent dashboard |

---

## 32 个插件生态

| 分类 | 插件 |
|------|------|
| Core | ruflo-core, ruflo-swarm, ruflo-autopilot, ruflo-loop-workers, ruflo-workflows, ruflo-federation |
| Memory | ruflo-agentdb, ruflo-rag-memory, ruflo-ruvector, ruflo-knowledge-graph |
| Intelligence | ruflo-intelligence, ruflo-daa, ruflo-ruvllm, ruflo-goals |
| Code Quality | ruflo-testgen, ruflo-browser, ruflo-jujutsu, ruflo-docs |
| Security | ruflo-security-audit, ruflo-aidefence |
| Architecture | ruflo-adr, ruflo-ddd, ruflo-sparc |
| DevOps | ruflo-migrations, ruflo-observability, ruflo-cost-tracker |

---

## 验证系统（verification.md）

每条修复用 Ed25519 签名（keyed off git commit）。`ruflo verify` 命令：
1. Fetch manifest
2. 重新计算每个引用文件的 SHA-256
3. 从 git commit 重新派生公钥
4. 验证签名

---

## 相关 Wiki 条目

- [[entities/vue-termui]] — Vue 3 TUI 框架（ Ruflo 的 Web UI vs 终端 UI 对比参考）
- [[pi-coding-agent]] — TypeScript 交互式 Coding Agent 参考
- [[deepseek-tui]] — Rust TUI Coding Agent 完整参考
- [[concepts/agent-loop]] — Agent 核心执行循环模式
- [[concepts/agent-swarm]] — 多 Agent 协作架构模式
- [[agent-cli-tui-learning-path]] — Agent-CLI/TUI 构建入手路径
