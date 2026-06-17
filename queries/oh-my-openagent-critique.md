---
title: oh-my-openagent 架构批评与改进方向
created: 2026-05-17
updated: 2026-05-17
type: query
tags: [agent, multi-agent, agent-framework, architecture, design-pattern, pitfall]
sources: [raw/articles/oh-my-openagent-2026.md, entities/oh-my-openagent]
---

# oh-my-openagent 架构批评与改进方向

> 基于对 [[oh-my-openagent]] v4.1.2 完整源码（~294K LOC，2041 TypeScript 文件）的深度分析，从 **Agentic System Designer** 视角出发的批判性评估。
>
> 该库是一个优秀的工程参考，但也有显著的架构权衡。以下分析帮助理解"什么该学、什么该避免"。

---

## 一、Token 消耗问题

### 问题根源：动态提示词拼接

Sisyphus 的提示词约 **22KB**（~6K tokens）。大部分不是固定 instruction，而是运行时拼接的动态内容：可用 Agent 列表、工具选择表、分类委托表、技能指导等。

这意味着：
- Agent 越多 / 工具越多 / 技能越多，提示词越大
- 每轮对话都带着这个巨大的 system message，不受上下文压缩影响
- Ultrawork mode 额外注入一段 ~8K 的强化提示词

### Token 消耗估算

| 组件 | 约 Token 数 | 说明 |
|------|------------|------|
| Sisyphus base prompt | ~6K | 22KB 提示词字符串 |
| 动态拼接 (Agent/工具表) | ~2-4K | 随可用 Agent 数增长 |
| Prometheus prompt | ~3K | 战略规划 Agent |
| Ultrawork inject | +2K | 全速模式强化提示词 |
| Team Mode status inject | 可变 | 状态注入 |
| 其他 Hook 注入 | ~1-2K | AGENTS.md 注入等 |
| **总 system prompt** | **~8-15K** | 不含用户历史消息 |

### 对比

[[hermes-agent]] 的 system prompt 约 2K tokens，oh-my-openagent 是其 4-7 倍。而且 Hermes 的 skills 是懒加载的，oh-my-openagent 的提示词是全部一次性注入。

### 核心矛盾

提示词中的大量内容（"不要用 as any"、"不要用 @ts-ignore"、"不要 flattery" 等 policy）在**每个子 Agent 启动时重复出现**。没有共享 policy 层的机制。

---

## 二、架构过重：Monolith 插件包

### 关键数字

| 指标 | 数值 | 含义 |
|------|------|------|
| TypeScript 文件 | 2,041 | 其中 1,340 源文件 + 701 测试 |
| LOC | ~294K | 接近中型应用的规模 |
| Barrel index.ts | 122 个 | 模块边界 |
| Zod schema 文件 | 30 个 | 配置系统复杂度 |
| Agent 定义文件 | 102 个 | 实际只定义 11 个 Agent（含模型变体） |
| 共享工具函数 | 278 个 | shared/ 目录 |
| 平台二进制 | 11 个 | macOS/Linux/Windows，AVX2 + baseline |

### 具体问题

**1. Agent 添加成本高**

加一个新 Agent 需要修改至少 5-8 个文件：
- agent 定义文件 + 模型变体（如果有）
- Agent 名称 schema
- 工具限制表
- 动态提示词构建器
- Agent 注册表
- 引导画面和提示
- Team Mode 成员资格
- IntentGate 关键词

**2. 提示词代码耦合**

提示词以 TypeScript 模板字符串嵌入代码：
- 版本控制依赖 git blame，无法用 prompt 管理工具追踪
- 修改一个 Phase 行为需要改 5 个版本的 `sisyphus/*.ts`
- 不同模型变体之间的 Phase 0-3 逻辑高度重复
- 提示词错误不会导致编译失败

**3. 测试膨胀**

701 个测试文件。约 40% 代码是测试。覆盖率是好事情，但也反映系统复杂度——很多测试是用于验证 Hook 交互和边界条件，而非业务逻辑。

---

## 三、过度的"行为矫正"机制

插件用大量 Hook 来"矫正" Agent 的行为，这说明提示词层面的控制力有限：

| Hook | 解决的问题 | 本应通过什么解决 |
|------|-----------|----------------|
| `commentChecker` | 检查注释里有没有 AI 废话 | 提示词要求 + 工具定义 |
| `noSisyphusGpt` | 阻止 Sisyphus 用非 GPT 模型 | Agent 模型路由配置 |
| `noHephaestusNonGpt` | 阻止 Hephaestus 用非 GPT 模型 | Agent 模型路由配置 |
| `prometheusMdOnly` | 强制 Prometheus 只写 .md | 工具权限配置 |
| `writeExistingFileGuard` | 写前必须读 | 提示词要求 |
| `bashFileReadGuard` | 用 bash 读文件也要守卫 | 提示词要求 |
| `hashlineReadEnhancer` | 为 Read 输出加哈希 | 工具定义层 |
| `jsonErrorRecovery` | 检测 JSON 解析错误 | 工具定义层 |

**启示：** 当提示词需要 16 个 ToolGuard Hook 来矫正行为时，要么是提示词设计有问题，要么是模型能力还做不到。

更好的方向：**工具定义层面禁止**（如 Oracle 的 read-only 通过 denied_tools 实现），而非用 Hook 拦截。

---

## 四、运行时依赖与环境绑定

| 依赖 | 影响 |
|------|------|
| **Bun 硬绑定** | 不能 npm/yarn/pnpm，限制了生态兼容性 |
| **OpenCode 插件** | 不能独立运行，架构耦合于 OpenCode 的 Plugin API |
| **特定模型依赖** | Sisyphus 默认 claude-opus-4-7，Hephaestus 默认 gpt-5.5，无替代时系统不可用 |
| **tmux 可选但深度集成** | Team Mode tmux 可视化、interactive_bash 工具都依赖 tmux |

---

## 五、改进方向

### 改进 1：提示词分层加载（降低 Token 消耗）

**当前：** 22KB 提示词一次性注入。

**改进：** 按需加载提示词段落

```ascii
当前: [system: 22KB 完整提示词] [user: 问题] ...
改进: [system: 5KB 核心身份 + 规则] 
       → [Phase 0 触发时注入 Intent Gate 段] 
       → [Phase 2B 触发时注入执行规则] 
       → [委托时注入委托表]
```

这需要 Agent harness 支持阶段性 system message 注入（类似 [[hermes-agent]] 的 skill 加载机制）。

### 改进 2：提示词去重（降低维护成本）

Sisyphus 的 `default.ts`（542 行）和 `claude-opus-4-7.ts`（443 行）的 Phase 0-3 逻辑高度重叠。

**改进：** 将共享行为层提取为 YAML 配置，模型变体只覆盖差异化部分：

```yaml
# shared.yaml: 所有模型共享的 Phase 0-3 工作流
phases:
  0_intent_gate:
    steps: [verbalize_intent, classify_request, ...]
  2b_implementation:
    delegation_structure: [TASK, EXPECTED_OUTCOME, ...]

# claude-opus-4-7.yaml: 仅覆盖差异
overrides:
  self_knowledge: "You are Claude Opus 4.7..."
  parallel_tool_calls: true
```

### 改进 3：利用 Provider 的 Prompt Caching

Anthropic 有 prompt caching，OpenAI 有 prefix caching。不变的提示词前缀（~6K tokens）应标记为 cacheable，**大幅降低**重复加载成本。

### 改进 4：微内核 + 插件化架构

**当前：** 所有功能在一个 repo。

**改进：**

```ascii
oh-my-openagent-core/         # 精简内核 ~50K LOC
├── agent-harness             # Agent 定义、模型路由、提示词构建
├── hook-system               # Hook 管理器
├── mcp-router                # 3 层 MCP 路由
└── intent-gate               # 意图门

oh-my-openagent-plugins/      # 可选插件
├── team-mode                 # 当前 ~13K LOC
├── hashline                  # 当前 ~2K LOC
├── boulder                   # 工作追踪
├── openclaw                  # Discord/Telegram 集成
└── tmux-integration          # Tmux 支持
```

好处：用户只安装需要的插件，降低 init 复杂度和 token 消耗。

### 改进 5：提示词与代码分离

提示词硬编码在 TypeScript 中。分离后：

```
prompts/
├── sisyphus/
│   ├── shared.yaml          # 共享工作流
│   ├── claude-opus-4-7.yaml
│   ├── gpt-5-5.yaml
│   └── gemini.yaml
├── prometheus/
│   ├── identity.yaml
│   ├── interview.yaml
│   └── plan-generation.yaml
└── ultrawork.yaml
```

非工程师可以编辑提示词，可以版本化管理提示词变更，不同项目可以用不同的提示词集。

### 改进 6：更轻量的 Team Mode

当前通信完全基于文件系统（mailbox + tasklist + worktrees），导致大量文件 I/O 和 3s 轮询延迟。

对于 2-4 成员的轻量场景，可用**内存消息队列 + 共享 session**，文件系统只做持久化。对于 8 成员的重度场景再降级到文件系统。

---

## 六、一句话总结

oh-my-openagent 是一个**工程上令人叹服但设计上过重**的系统。它展示了一个 Agent 编排系统的所有必须解决的工程问题——提示词工程、生命周期 Hook、多模型路由、并行 Agent 协调、上下文持久化——这些对 Agentic System Designer 是极有价值的参考。

但它的重量级也提醒我们：**好的 Agent 架构应该在强大和精简之间找到平衡**。参考 [[hermes-agent]] 的 2K system prompt + skill 机制，和 [[claude-code]] 的零配置上手，oh-my-openagent 在 token 效率和配置简洁度上还有很大改进空间。

## Related

- [[oh-my-openagent]] — 被分析的目标项目
- [[hermes-agent]] — 对比的轻量架构参考
- [[concepts/agent-loop-architecture]] — Agent 循环模式
- [[concepts/agent-swarm]] — 多 Agent 协作
