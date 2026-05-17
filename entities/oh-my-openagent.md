---
title: oh-my-openagent
created: 2026-04-30
updated: 2026-05-17
type: entity
tags: [agent, multi-agent, agent-framework, tool, cli, open-source, typescript]
sources: [raw/articles/oh-my-openagent-2026.md]
contradictions: [entities/oh-my-opencode]
---

# oh-my-openagent

> 原名 **oh-my-opencode**。v4.1.2 改名过渡期双发（npm: oh-my-opencode + oh-my-openagent）。
> OpenCode 插件系统，为 AI coding agent 提供多模型编排、多 Agent 并行协作和生产级工具链。
> 57.1K GitHub stars，SUL-1.0 license，TypeScript + Bun，~294K LOC。

**GitHub:** https://github.com/code-yeongyu/oh-my-openagent
**License:** SUL-1.0 (Sustainable Use License)
**Stars:** 57.1k | **Forks:** 4.6k
**Runtime:** Bun 1.3.11+
**Package:** oh-my-opencode (legacy) + oh-my-openagent (current)
**Key Differentiator:** Anthropic 因 oh-my-openagent 封禁了 OpenCode——这个 harness 打破了围墙花园。

## Overview

oh-my-openagent 是一个 OpenCode 插件，将单 Agent 编码助手扩展为**多模型多 Agent 编排系统**。核心能力：
- 11 个内置 Agent（Sisyphus/Hephaestus/Atlas/Prometheus 等），自动路由到最合适的模型
- Team Mode v4.0：最多 8 个并行成员，实时 tmux 可视化
- Hashline 内容哈希编辑：每行带 LINE#ID 校验，零脏数据
- IntentGate 意图分析：先理解再行动，避免字面理解错误
- 3 层 MCP 系统：内置 + Claude Code + 技能嵌入
- 54-61 个生命周期 Hook 覆盖 OpenCode 的全生命周期
- Ralph Loop 自循环：不达 100% 不停止

---

## 一、Agent 提示词系统（最值得学习的部分）

oh-my-openagent 的 Agent 提示词是**动态构建的**——不是写死的模板，而是在初始化时实时拼接的模块化系统。

### 1.1 架构概览

提示词系统位于 `src/agents/dynamic-agent-prompt-builder.ts`，核心组件：

| 模块 | 职责 | 说明 |
|------|------|------|
| `dynamic-agent-prompt-builder.ts` | 主构建器 | 提供 15+ 个构建函数，每个输出一段独立的提示词段落 |
| `dynamic-agent-core-sections.ts` | 核心段落 | Agent 身份、行为指令、代码风格等 |
| `dynamic-agent-policy-sections.ts` | 策略段落 | 验证规则、通信风格、失败恢复 |
| `dynamic-agent-tool-categorization.ts` | 工具分类 | 将可用工具按用途分组，形成工具选择表格 |
| `dynamic-agent-category-skills-guide.ts` | 技能指导 | 告诉 Agent 如何为不同类别的任务加载合适的 skill |

### 1.2 Sisyphus 主编排器提示词

Sisyphus 是核心 Agent，其提示词约 22KB，按模型变体分 5 个版本：

| 变体 | 目标模型 | 特点 |
|------|---------|------|
| `default.ts` | Claude, Kimi, GLM 等通用 | 542 行，标准编排指令 |
| `claude-opus-4-7.ts` | Claude Opus 4.7 | 专门针对 Opus 4.7 的行为特性调整：更字面执行、更显式的并行指令、更强的自制 XML 段落 |
| `gemini.ts` | Gemini | 更严格的工具使用规则，5 条 NEVER 规则 |
| `gpt-5-4.ts` | GPT-5.4 | 8 段架构、熵减设计，449 行 |
| `gpt-5-5.ts` | GPT-5.5 | 最新优化编排提示 |

设计原则 (来自 `claude-opus-4-7.ts` 注释)：
- **字面指令跟随**：4.7 不会默默泛化"第一项"为"所有项"
- **更少的子 Agent**：显式触发 + 正面示例来展开
- **并行工具调用**：通过规范的 XML 段落 `<use_parallel_tool_calls>` 重新启用
- **直接语气**：强有力的指令，用粗体/大写标记关键规则
- **XML 标签锚点**：`<self_knowledge>`, `<autonomy_and_persistence>`, `<investigate_before_acting>` 等

### 1.3 Sisyphus 提示词结构（Phase 模型）

提示词被组织为一个多阶段工作流，每个阶段对应 Agent 应当遵循的行为模式：

```
Phase 0 - Intent Gate（每轮必执行）
├── Step 0: 意图表达（先确定用户真实意图）
├── Step 1: 分类请求类型（Trivial/Explicit/Exploratory/Open-ended/Ambiguous）
├── Step 1.5: Turn-Local Intent Reset（每轮重新分类，不从前轮继承）
├── Step 2: 模糊性检查
├── Step 2.5: Context-Completion Gate（实现前检查：有明确实现动词才执行）
└── Step 3: 行动前验证

Phase 1 - 代码库评估（仅开放式任务）

Phase 2A - 探索与研究
├── 始终并行执行
├── Explore/Librarian = 搜索工具，不是顾问
├── 后台结果收集流程（fire → continue → system-reminder → collect）
└── 搜索停止条件

Phase 2B - 实现
├── Pre-Implementation：创建 TODO → 标记 in_progress → 加载 skills
├── 委托 Prompt 结构（必须覆盖6个段落：TASK/EXPECTED OUTCOME/REQUIRED TOOLS/MUST DO/MUST NOT DO/CONTEXT）
├── Session Continuity（利用 ses_ 延续ID）
└── 代码变更 + 验证

Phase 2C - 失败恢复
├── 3次连续失败 → STOP → REVERT → DOCUMENT → CONSULT → ASK

Phase 3 - 完成
└── 验证清单 + 证据要求
```

**关键的提示词工程技巧：**
1. **`<use_parallel_tool_calls>`** — 一个特定的 XML 段落，让 Opus 4.7 知道并行调用是可接受的（它默认倾向于序列化）
2. **`<self_knowledge>`** — 告诉 Agent 它自身的模型弱点，让它可以主动补偿
3. **`<intent_verbalization>`** — 要求 Agent 在每次响应前口头表达决策，形成思维透明
4. **`Turn-Local Intent Reset`** — 每轮重新分类意图，防止"实现模式"跨轮延续
5. **`Context-Completion Gate`** — 除非当前消息包含明确实现动词，否则禁止开始实现
6. **Evidence Requirements** — "NO EVIDENCE = NOT COMPLETE" 是一个有力的约束

### 1.4 Prometheus 战略规划提示词

Prometheus 专门负责**做计划，不写代码**。其提示词系统由 6 个模块组成：

**身份约束 (`identity-constraints.ts`)**
- **核心约束**："YOU ARE A PLANNER. YOU ARE NOT AN IMPLEMENTER. YOU DO NOT WRITE CODE."
- 将"do X"自动解释为"create a work plan for X"，永不例外
- 仅允许输出 `.md` 文件到 `.omo/plans/`
- 即使在用户说"just do it"时仍然拒绝

**采访模式 (`interview-mode.ts`)**
- 按意图类型分策略：Trivial (快速往返)、Refactoring (安全焦点)、Build from Scratch (发现焦点)、Mid-sized (边界焦点)、Collaborative (对话焦点)、Architecture (战略焦点)、Research (调查焦点)
- 每种类型有自己的探索 Agent 调用示例和采访问题
- 采访后自动评估是否满足转计划生成的 Clearance Checklist

**计划生成 (`plan-generation.ts`)**
- 触发即注册8步 TODO：Consult Metis → Oracle Phase-1 → 生成计划 → Oracle Phase-2 → 自审 → 展示 → 等待决策 → 高精度模式
- 强制：每次计划生成必须咨询 Metis（预规划顾问）+ 3 次 Oracle 阶段门检查
- 增量写入协议：Write 骨架 → Edit 分批追加（2-4 个任务/批）→ 验证完整性

**高精度模式 (`high-accuracy-mode.ts`)**
- Momus 审查循环：提交计划 → Momus 审查 → 修复 → 重复直到 OKAY

**关键技巧：**
1. **分段生成**：计划太大超出输出 Token 限制时，用 skeleton Write + 分批 Edit 解决
2. **Draft 作为外部记忆**：采访期间持续写入 `.omo/drafts/`，防止上下文窗口丢失
3. **Oracle 阶段门**：3 个强制 Oracle 检查点，产生 VERDICT: GO/NO-GO，NO-GO 必须修复再提交
4. **Clearance Checklist**：告诉 Agent 何时可以自动从采访模式切换到计划生成

### 1.5 其他 Agent 提示词特点

- **Hephaestus** — "The Legitimate Craftsman"，自主深度工作者，使用 GPT-5.5，仅限特定 Provider
- **Oracle** — 只读顾问（write/edit/task 全部禁止），高精度低温（temp=0.1）
- **Librarian/Explore** — 快速搜索 Agent（gpt-5.4-mini-fast），低温（0.1），也禁止写操作
- **Metis** — 唯一温 0.3 的 Agent，更高的创造力用于发现计划漏洞
- **Momus** — "计划审查员"，高精度（xhigh），禁止写操作，用于高精度模式的审查循环
- **Multimodal-Looker** — 最严格的：除 Read 外的所有工具禁止（包括 write/edit/task）

### 1.6 提示词构建模式总结

```
createXXXAgent(model) → AgentConfig
  ├── mode: "primary" | "subagent" | "all"
  ├── model: 4步解析管道（override → category-default → provider-fallback → system-default）
  ├── temperature: 0.1 标准 / 0.3 仅 Metis
  ├── instructions: 动态构建的提示词字符串（15+ 模块拼接而成）
  └── 工具限制: 按 Agent 类型配置的工具排除列表
```

---

## 二、核心机制深度分析

### 2.1 IntentGate（意图门）

不是单独的代码模块，而是**分散在多个 Hook 中的系统**：

**1. Keyword Detector Hook** (`hooks/keyword-detector/`)
- `chat.message` handler，扫描每条用户消息的关键词
- 关键词表：`ultrawork`/`ulw`（全力模式）、`search`（搜索模式）、`analyze`（分析模式）、`team`（团队模式）
- 检测到关键词后，在用户消息前插入模式专用提示词
- 从代码块中排除匹配，防止误触代码内容
- Planner Agent (`prometheus`) 收到 `ultrawork` 时自动过滤掉
- 可通过配置禁用特定关键字

**2. Sisyphus Intent Gate（提示词內建）**
- 如前所述，在每个 Sisyphus 提示词的开头，要求 Agent 每轮先做 Verbalize Intent
- 这不是代码层面的机制，而是**提示词层面的引导**

**设计启示：** IntentGate 不是单个模块，而是**分层系统**：底层（代码 Hook）+ 上层（提示词约束）。底层确保关键词触发模式切换，上层确保模型自身进行意图分类。

### 2.2 Hashline（哈希锚定编辑系统）

两层 Hook 协同工作：

**Hashline Read Enhancer** (`hooks/hashline-read-enhancer/`)
- `tool.execute.after` hook，每次 Read 工具执行后触发
- 每行输出格式从 `LINE_NUM|content` 变为 `LINE_NUM#HASH|content`
- 哈希算法 `computeLineHash(lineNum, content)` 对行号和内容计算简单哈希

**Hashline Edit Diff Enhancer** (`hooks/hashline-edit-diff-enhancer/`)
- `tool.execute.before` + `tool.execute.after` 成对工作
- **Before**: 捕获写入前的旧文件内容，存储到 Map（sessionID:callID → oldContent）
- **After**: 读取写入后的新文件内容，计算 unified diff
- 将 filediff 对象注入 `output.metadata.filediff`，diff 字符串注入 `output.metadata.diff`
- 5 分钟的超时门槛

**Hashline Edit Tool** (`tools/hashline-edit/`)
- 实际的编辑工具，接收 `LINE#ID` 格式的编辑请求
- 校验哈希后应用编辑，哈希不匹配拒绝

**设计启示：** 传统的 Agent 编辑文件的问题是"读到的是旧版本"——Agent 可能基于过时的代码做出编辑。Hashline 通过两个 Hook 在**完全无侵入**的方式下为每行标注哈希，确保每次编辑都是基于当前状态。Grok Code Fast 1 测试显示成功率从 6.7% → 68.3%。

### 2.3 5 层 Hook 系统（54-61 个生命周期 Hook）

这是该插件最核心的机制——**通过 Hook 系统在 OpenCode 的生命周期中注入行为**。

**5 层架构：**

```
Session (24)       → 会话生命周期：监视器、压缩、恢复、回退
ToolGuard (16+1)   → 工具守卫：注释检查、输出截断、文件保护、哈希注入
Transform (5+2)    → 消息转换：关键字检测、上下文注入、thinking block 校验
Continuation (7)   → 持续执行：TODO 强制执行、压缩保护、异常监控
Skill (2)          → 技能管理：分类提醒、自动斜杠命令
```

每个 Hook 遵循统一的工厂模式：`createXXXHook(deps) → HookFunction`

**安全设计：** 所有 Hook 通过 `safeHook()` 包装调用，单个 Hook 的失败不会影响其他 Hook。

**最值得注意的个别 Hook：**
- `preemptiveCompaction` — 在上下文窗口接近上限前主动压缩
- `contextWindowMonitor` — 跟踪上下文使用情况，预测何时需要压缩
- `writeExistingFileGuard` — 要求写入前必须读（防止覆盖未知内容）
- `todoContinuationEnforcer` — **Boulder**：TODO 未完成时强制继续，检测停滞并唤醒
- `hashlineReadEnhancer` + `hashlineEditDiffEnhancer` — 哈希编辑系统
- `modelFallback` + `runtimeFallback` — 两个独立回退系统：主动（chat.params）vs 被动（session.error）

### 2.4 Team Mode（并行多 Agent 协作）

**不是以 Agent 交互为基础，而是以**文件系统管道**为基础。**

每个 team 的存储：
```
~/.omo/teams/{name}/
├── config.json           # TeamSpec（成员规格）
├── state.json            # 运行时状态（原子锁写入）
├── mailbox/              # 每个成员一个 .jsonl 消息文件
├── tasklist.jsonl        # 共享任务列表（原子锁写入）
└── worktrees/{name}/     # 每个成员的 git worktree
```

**通信模型：** member 不直接交互，通过 mailbox（文件）传递消息，lead 通过 tasklist 分配任务

**生命周期：**
```
team_create → spawn sessions → init mailbox/tasklist/worktrees
  → lead: team_task_create + team_send_message
  → member: poll mailbox → claim task → execute → send result back
  → team_shutdown_request → team_approve/reject → team_delete
```

**关键安全设计：**
- Spawn-race-safe resolution：sessionID 已知时同步注册，避免竞态
- 原子文件锁：任务声明使用文件锁，并发安全
- 不允许嵌套 Team：member 不能调用 `team_create`
- 只读 Agent 被硬拒绝（不参与 Team），通过 delegate-task 替代

### 2.5 Background Agent 机制

`src/features/background-agent/` — 约 10K LOC，核心编排引擎。

- 状态机：`pending → running → completed | error | cancelled | interrupt`
- 每个 `${providerID}/${modelID}` key 最多 5 个并发，FIFO 队列
- 3 秒轮询间隔，通过 idle event + stability detection（10s 无变化）检测完成
- Circuit breaker：自动故障检测和恢复
- Spawner pattern：8 个文件通过 `SpawnerContext` 接口组合

### 2.6 Ralph Loop（自引用开发循环）

`/ulw-loop` 命令激活：Agent 持续检查 TODO 列表，不完成不停止。

Hook 层级跨压缩保持 TODO：`compactionTodoPreserver` + `todoContinuationEnforcer` 确保上下文压缩后 TODO 仍然存在。

### 2.7 3 层 MCP 系统

| 层级 | 来源 | 机制 | 隔离性 |
|------|------|------|--------|
| Tier 1 | `src/mcp/` | 内置远程 HTTP MCP（websearch, context7, grep_app） | 全局共享 |
| Tier 2 | `.mcp.json` | Claude Code 标准 MCP + `${VAR}` 环境变量展开 | 项目级 |
| Tier 3 | SKILL.md YAML | `SkillMcpManager` 在每个会话中管理器 | 按 session 隔离（`${sessionID}:${skillName}:${serverName}`） |

---

## 三、架构原则

### 3.1 关键架构不变量

1. **规范 Agent 顺序**：Sisyphus → Hephaestus → Prometheus → Atlas，通过 `installAgentSortShim()` 修补 Array.prototype.sort 强制
2. **Hashline Edit + Read 配对**：每次 Read 加哈希标签，Edit 验证哈希后才应用
3. **Per-session MCP 隔离**：Tier-3 MCP 客户端按键隔离，会话间不共享状态
4. **两个独立回退系统**：model-fallback（主动，chat.params）vs runtime-fallback（被动，session.error）
5. **内部消息注入很危险**：所有 `session.prompt` 调用必须通过 `prompt-async-gate.ts`

### 3.2 开发约定

- **TypeScript 严格模式**、ESNext、bundler moduleResolution
- **Bun 专用**：绝不使用 npm/yarn/pnpm
- **工厂模式**：所有 tools/hooks/agents 使用 `createXXX()`
- **kebab-case 文件名**，禁止 `utils.ts`/`helpers.ts`/`service.ts`
- **无路径别名**：模块内相对路径，跨模块 barrel 导入
- 每文件 200 行软限制
- 测试：Bun test，co-located `*.test.ts`，given/when/then 风格
- 禁止 `as any`，`@ts-ignore`，`@ts-expect-error`
- 禁止 em dash / en dash / AI filler ("simply", "obviously" 等)

## Related

- [[opencode]] — 基础项目，oh-my-openagent 作为其插件运行
- [[claude-code]] — Claude Code 兼容模式（hooks/commands/skills/MCPs/plugins 全兼容）
- [[deepseek-tui]] — 另一种终端 Agent 实现
- [[ruflo]] — 面向 Claude Code 的多 Agent 编排层（类似但不同的方向）
- [[hermes-agent]] — 生产级独立 Agent 框架（Python）
- [[oh-my-opencode]] — 旧名称（已归档）
