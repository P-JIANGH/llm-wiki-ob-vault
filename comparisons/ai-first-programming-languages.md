---
title: AI-First Programming Languages — Ling vs Zerolang vs Others
created: 2026-06-18
updated: 2026-06-18
type: comparison
tags: [programming-language, agent, agent-first, comparison, design-pattern, architecture, agent-design, mcp, lsp, lcn, codemap, graph-native, effect-system]
sources: [raw/articles/ling-lang-2026.md, raw/articles/zerolang-2026.md]
confidence: medium
---

# AI-First Programming Languages — 横向对比

> 2026-06 更新。聚焦**两门**已知公开的 AI-first 编程语言设计:
> [[entities/ling-lang]]（灵, v0.0.6, 27 ADRs, codemap-as-design-surface）
> 和 [[entities/zerolang]]（v0.3.4, graph-native, `zero patch`）。
> 同时纳入**另外 4 个 PL/PL 设计**做参照（Mojo、Carbon、APL/J/K 系、
> JetBrains MPS），看 AI-first 是孤注一掷还是新趋势。

## 一句话定位

| 项目 | 一句话定位 | 状态 |
|------|-----------|------|
| **灵 (Ling)** | AI-first, 中英双语, codemap (LCN S-exp) 是 canonical IR, source 是 projection, MCP/LSP 是 AI 入口 | 设计锁 (27 ADR), v0.0.6 实现中, Rust+LLVM 20 |
| **Zerolang** | AI-first, graph (`zero.graph`) 是 program database, `.0` 是 projection, `zero patch` 是 AI 入口 | 实验性 v0.3.4, C-impl compiler, vercel-labs |
| **Mojo** | AI-first Python 兼容超集, 强调 ownership + 异构加速 (CPU/GPU/AI 加速器) | 早期 (Modular 公司), 不是严格的"AI 作者"而是"AI 友好" |
| **Carbon** | C++ 继任者 (Google), 实验性, 强调 interop + 性能, 不强调 AI-first | 实验性, 早期, 设计中 |
| **APL/J/K 系** | array-first + 极简原语, 长期被认为"可写性差,人类难,程序紧凑" — 反而对 AI 友好? | 成熟但小众 |
| **JetBrains MPS** | projectional editing, 文本是 projection, AST 是 source of truth | 成熟商业, 不是 AI-first 但结构化相同 |

**重点对比的两门：**
- **Ling** 是用户的项目（27 ADRs 锁设计，27 ADRs 不可变）
- **Zerolang** 是外部项目（v0.3.4, 较成熟但仍未 v1.0）

## 核心范式对比

| 维度 | **Ling (灵)** | **Zerolang** | Mojo | Carbon | APL/J 系 | JetBrains MPS |
|------|---------------|--------------|------|--------|----------|---------------|
| **核心论断** | AI first, human second; codemap 是 canonical IR | AI first; graph 是 program database; text 是 projection | AI/ML 加速, Python 友好 | C++ 继任, 性能 + interop | array-first, 极简 | projectional editing, 文本是 AST 投影 |
| **Canonical 状态** | codemap (LCN, S-exp) | zero.graph (binary graph) | text (.py/.mojo) | text (.carbon) | text | AST (projectional) |
| **Source 关系** | projection of codemap (双向同步) | projection of graph (`zero export`) | source of truth | source of truth | source of truth | projection of AST |
| **AI 编辑入口** | MCP/LSP tools (`ling_query_*`) | `zero patch` (typed ops) | n/a (传统文本编辑) | n/a | n/a | projectional editor |
| **AI 读源** | 通过 MCP tool, 不读 `.lcn` 直接 I/O | `zero query` 然后可能读 `.0` | 直接读 .py | 直接读 .carbon | 直接读 | 直接读 AST (projectional) |
| **目标用户** | AI 主, human 审 | AI 主, human 审 | 人类 ML 工程师 (AI 加速) | 系统程序员 | 数值/金融工程师 | DSL 作者 |
| **Bilingual / 国际化** | 中英双语关键字 (KwLet = `让` = `let`) | 英语 | 英语 | 英语 | 英语 (Unicode-aware) | n/a |

## Canonical IR 形态对比

| 维度 | Ling codemap (LCN) | Zerolang `zero.graph` | Mojo AST | Carbon AST |
|------|--------------------|----------------------|----------|------------|
| **形态** | 文档 (S-exp) | 图 (binary) | 树 (text) | 树 (text) |
| **持久化** | `.ling/codemap/*.lcn`, gitignored | `zero.graph`, 仓库内 (graph-first package) | n/a | n/a |
| **Hash 策略** | daemon-owned, regenerable | content-hash (per ADR 0027-aware, content-hash decides drift) | n/a | n/a |
| **Schema 强制度** | 强: structured 字段 + narrative 字段 | 强: shape-validated graph | 中: 类型系统 | 中: 类型系统 |
| **Narrative 字段** | **一等公民** (`意图`, `示例`, `设计笔记` — CommonMark) | **无** (Zerolang 没有意图字段等价物) | 无 (注释) | 无 (注释) |
| **可读性 (人类)** | 中 (S-exp 但要学) | 低 (binary) | 高 (Python-like) | 高 (C++-like) |
| **可读性 (AI 工具)** | **低 (MCP-tool 抽象后, AI 不直接读)** | **中 (`zero query` 输出文本)** | 高 | 高 |
| **修订单向性** | **双向** (code ↔ codemap 都是一等) | 单向 (text 是 projection, 正常通过 `zero patch` 写 graph) | 单向 (text → 一切) | 单向 |

**核心差异：**
- Ling 把"design rationale"做成了 codemap 的一等字段 (`意图`, `设计笔记`)。AI 看 structured, human 看 narrative。
- Zerolang 把所有 metadata 都做成 graph node, 没有"narrative"的等价物。
- 传统 PL 把所有 design rationale 放在注释里, 不是 schema-enforced。

## Edit Primitive 对比

| 维度 | **Ling** | **Zerolang** | Mojo | Carbon |
|------|----------|--------------|------|--------|
| **AI 编辑主路径** | `ling patch` → 通过 `ling_query_*` + source → codemap 提取 | `zero patch --op '<op>'` 直接改 graph | 直接改 .py 文本 | 直接改 .carbon 文本 |
| **Edit precondition** | reverse-check 效应 (函数层) | graph hash + node hash + field expect | type-check 提交 | type-check 提交 |
| **Edit guardrail** | "pure-first, IO must tag" (效果在 signature 层可见) | `--expect-graph-hash`, `--expect` (field-level lock) | 无 AI 专用 | 无 AI 专用 |
| **Bidirectional** | **是** (codemap → code 也是一等) | **否** (text → graph 正常, 反向通过 `zero import`) | 否 | 否 |
| **Error 信息形式** | LCN field (codemap 字段) + diagnostic codes | node IDs + graph hashes (machine-readable) | Python traceback | C++ diagnostic |
| **AI 读 diff** | `ling review` (codemap diff + 设计解释, ADR 0010) | `zero diff` (graph diff) | `git diff` | `git diff` |

## 类型 + 安全模型对比

| 维度 | **Ling** | **Zerolang** | Mojo | Carbon |
|------|----------|--------------|------|--------|
| **类型系统** | hybrid (explicit preferred, local inference) | static, with `raises [Invalid]` fallible functions | static, Python-like | static, C++-like |
| **内存模型** | region inference β, no GC, ownership-based | explicit capabilities (`world: World`), no ambient | ownership (Rust-like) | ownership (C++-like) |
| **效应 / 副作用** | **显式 effect tags** (`!FS`/`!Net`/`!Clock`/`!Rand`/`!Panic`), pure-first + reverse-check | **explicit capabilities** passed as args (no ambient) | 无内置效应 | 无内置效应 |
| **Effect 来源** | **signature 层** (reviewer 一眼可见) | **capability 参数传递** (reviewer 看 main 签名) | 无 | 无 |
| **Effect 实现成本** | **~1 周** (finite reverse-check) | 隐式 (无, 用 capability 替代) | n/a | n/a |
| **Generics** | 推迟到 v0.1+ (codemap 暴露 call sites, monomorphic 足够) | 已支持, generic types | 已支持 | 已支持 |
| **编译期事实** | `compileTime`, `target.pointerWidth`, `fieldType`, `hasEnumCase` | 同 (MET001 诊断) | `comptime` 强大 | `constexpr` |

## Performance Budget (AI 视角)

Ling 给了详细的 AI-场景性能预算 (ADR 0022)。Zerolang 没明说，但有 `zero size --json`, `zero mem --json`, benchmark docs。

| Operation | Ling v0.0.x floor | Ling v0.1+ target | Zerolang 类似 |
|---|---|---|---|
| 增量编译 (改一行) | 200ms | 100ms | 没说, 但有 `--json size/mem` |
| Canonical IR 查询 | 20ms | 10ms | `zero query` <100ms (估计) |
| LSP/MCP round-trip | 40ms | 20ms | n/a (没有 MCP 集成) |
| Daemon 启动 | 1s | 500ms | n/a (no daemon) |
| 冷编译 (10k LOC) | 20s | 10s | 没说 |
| Memory (10k LOC) | 200MB | 100MB | binary store, 估计 50-100MB |

**关键观察：** Ling 把 daemon + MCP round-trip 当作 AI 路径的关键路径指标，Zerolang 不假定 daemon，直接走 `zero patch` 命令。

## Daemon / Background Process 对比

| 维度 | **Ling** | **Zerolang** |
|------|----------|--------------|
| **Daemon?** | **是** (`ling daemon`, ADR 0024 hybrid) | **否** (无 daemon) |
| **Fallback** | File-level 读 `.ling/codemap/*.lcn` (CI/无 daemon 环境) | 无, 每次 `zero query/patch` 都直接走 graph store |
| **优点** | 长 session 快 (codemap 在内存, daemon-owned) | 简单, 无 IPC, 无 daemon 维护成本 |
| **缺点** | 多了一个进程要保活, 增加 crash surface | 每次 query 重新解析, 长 session 慢 |
| **AI 集成点** | daemon host MCP server (per ADR 0024, 0027) | `zero patch` 命令, 通过 tool wrapper 暴露给 AI |

## AI 工具集成

| 维度 | **Ling** | **Zerolang** |
|------|----------|--------------|
| **MCP 集成** | **核心** (ADR 0027: "AI 通过 MCP/LSP, 不直接读 .lcn") | 没说, 有 `zero skills` bundled skills |
| **LSP 集成** | **核心** (LSP server wraps codemap queries) | 没说 |
| **Version-matched skills** | n/a (compiler daemon is the canonical source) | **是** (`zero skills get <topic>`, 9 个 bundled skills, ~70 KB) |
| **Skill 安装** | `ling-install-agent` (daemon + MCP 自动注册) | `npx skills add vercel-labs/zerolang` (bootstrap stub) |
| **AI tool 抽象层** | 单一 `CodemapBackend` trait, DaemonBackend + FileBackend 双实现 | `zero query / view / patch / inspect` 各自独立命令 |

## 何时选哪个？

| 场景 | 推荐 | 原因 |
|------|------|------|
| **AI 是主要作者, human 偶尔审** | **Ling** 或 **Zerolang** | 都明确为 AI-first 设计 |
| **需要 design rationale 持久化** (intent, why) | **Ling** | narrative fields 一等公民, 不是注释 |
| **需要 strict structural edit guarantees** (graph + patch + hash) | **Zerolang** | `--expect-graph-hash`, `--expect` field locks |
| **需要 MCP/LSP 开箱即用** | **Ling** | ADR 0027 把 MCP/LSP 作为 AI 主入口, 优先实现 |
| **需要 Chinese 关键字 / 中英双语** | **Ling** | 唯一已知的双语 PL |
| **需要 region inference / no GC** | **Ling** | 明确 v0.0.5 实现 region inference β |
| **想要 graph 形式 IR (而不是 document)** | **Zerolang** | graph-first 是其显式承诺 |
| **想要简单的、命令式的 agent 编辑 surface** | **Zerolang** | 9 个 `zero *` 命令, 不需要 daemon |
| **想要 Python 兼容 + AI 加速** | **Mojo** | 不是 AI-first, 但 Python 生态 |
| **想要 C++ 继任** | **Carbon** | 不是 AI-first, 但 Google 背书 |

## 哲学 / 设计哲学差异

| 维度 | **Ling** | **Zerolang** |
|------|----------|--------------|
| **AI / human 关系** | "Let AI write a language that AI finds ergonomic" (ADR 0002) | "Zerolang exists because humans increasingly ask agents to write programs" (README) |
| **作者本人** | 中文母语, ADR 大量中文, 中英对照 | 英文 |
| **设计严肃性** | 27 个 immutable ADR, 9 个 L1-L4 层, 6-rein harness | 4 个核心 doc (graph-architecture, projections, semantic-vs-text, compile-path) + bundled skills |
| **后端** | 自研 MIR + LLVM 20 + Cranelift + wasm (planned) | C-impl compiler, 8 个 native target |
| **目标** | v1.0 = "production-ready" 长期 | v0.x experimental, 接受 breaking changes |
| **AI 工具设计** | daemon + MCP, 多 tool, daemon 是 host | command-line, agent calls `zero patch` 一次, 不需要常驻 |
| **安全性** | effect reverse-check (pure-first) | capabilities (no ambient global access) |
| **Reviewer 视角** | 签名层可见 effect | signature 层可见 capability 参数 |

## 共同的设计哲学 (与主流 PL 对比)

两门 AI-first PL 都有这些与主流不同的核心点：

1. **Canonical IR ≠ text** — 都是"text is a projection"。Zerolang 用 binary graph, Ling 用 LCN document, 但都不是"text 是一等公民"。
2. **AI edit 走显式路径** — Zerolang `zero patch`, Ling MCP tool。不假定 AI 直接改文本。
3. **Drift 是显式管理的** — Zerolang 用 content-hash 决定 `RGP006`, Ling 用 daemon-owned codemap 强制 schema 一致。
4. **安全 = reviewer-visible** — Zerolang capabilities, Ling effects, 都是为了让 human reviewer 在签名层就能看到函数能不能 IO。
5. **Schema 强约束** — Zerolang shape-validated graph, Ling structured+narrative fields with enforced schema。
6. **Pre-1.0 experimental** — 都明确说"pre-1.0, expect breaking changes, use in isolated workspaces"。

## 不确定的 / 待观察

- **MCP 集成的成熟度：** Ling 把它作为 critical path, 但 v0.0.6 还没到 LSP/MCP 阶段 (按 roadmap 是 v0.1.0+)。Zerolang 没有 MCP 集成, 但有 `zero skills` bundled skills 作为 agent knowledge 来源。两种模式哪个更 work, 需要 2026-2027 看实际使用。
- **Codemap 双向同步的实际可行性：** Ling ADR 0025 说 statement+function 粒度 sync, 但双向同步的 conflict resolution 在真实使用中可能比预期复杂。
- **Graph vs Document IR 的胜出：** 长期看, agent 是否会偏好 graph (structural queries) 还是 document (narrative queries)? 取决于什么样的 query 最常见。如果 "what does this function mean" 重要, Ling 赢; 如果 "what calls this" 重要, Zerolang 赢。
- **Effect system vs Capabilities 的胜负：** 两个不同的安全模型, 都在为同一目标 (reviewer-visible side effects) 服务。哪个更 AI-friendly, 需要 2027+ 观察。

## 关键 takeaway

- **AI-first PL 设计已经分化为两派：graph-based (Zerolang) vs document-based (Ling)。**
- 两种都拒绝"text is source of truth", 都在 explicit 编辑路径, 都有 reviewer-visible 安全机制。
- **Ling 的独特优势：** design rationale (narrative fields), 中英双语, MCP/LSP 集成是 critical path。
- **Zerolang 的独特优势：** graph-based structural guarantees, hash-based drift detection, content-hash 的"哪个 side moved"判断。
- **两者都不是给"AI 加速"用的 (像 Mojo); 都是"为 AI 作者/读者"重新设计的 PL。**

## 相关页面

- [[entities/ling-lang]] — 灵 (主条目)
- [[entities/zerolang]] — Zerolang (主条目)
- [[concepts/codemap-as-design-surface]] — Ling 的核心论点
- [[concepts/graph-native-programming]] — Zerolang 的核心论点
- [[concepts/effect-system-pure-first]] — Ling 的安全模型
- [[concepts/semantic-patch-editing]] — Zerolang 的编辑原语
- [[concepts/program-graph-store]] — Zerolang 的 program database
- [[concepts/lcn-s-expression-format]] — Ling 的 codemap 序列化
- [[concepts/projection-source-view]] — Zerolang 的 projection 模型
- [[entities/mcp]] — Ling 把 MCP 作为 AI 入口 (ADR 0027)
- [[entities/12-factor-agents]] — Factor 5 (own your context window) 的 cousin
- [[concepts/agent-loop-architecture]] — `ling query *` 和 `zero patch` 都是 narrow agent loop
