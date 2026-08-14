---
source_url: file:///F:/deepseek-harness (本地仓库完整研究)
ingested: 2026-08-14
sha256: 7f168f9a4795c5532049c8c8bbb522eb283a4aad6842608a8c521e02ee0d40a8
---

# DeepSeek Harness 完整研究笔记 (2026-08-14)

本研究笔记基于本地仓库 F:\deepseek-harness 的完整源码研究。仓库为 git checkout of https://github.com/deepseek-ai/deepseek-harness，master 分支，HEAD 47f943859b（release 0.1.0-rc.5）。

## 1. 项目身份

- **DeepSeek Harness (`dsh`)** — DeepSeek AI 官方开源 agent harness（智能体运行时框架），MIT 协议
- 版本 0.1.0-rc.5，**developer preview**，官方声明会有破坏性变更
- 运行方式: `npx @deepseek-ai/dsh web`（Web UI @ 127.0.0.1:3080），或从源码 `pnpm install && pnpm run build && pnpm dsh web`
- 与"一个 agent 应用"的区别：它是**承载 agent 的框架**，可跑自己的 agent，也可桥接 Claude Code / Codex 当执行后端
- 底层 Cordis 插件框架（vendored，`@deepseek-ai/cordis` v4.0.1），设计源自论文《A Programming Paradigm for Spatiotemporal Composability》(cordiverse/paper)

## 2. 仓库规模

- ~2085 个 TS 源文件（packages + apps），49 个包组、~130+ 工作区包
- pnpm workspace + pnpm@11.7.0，Node ^22.19 || >=24
- 1372 个 Agent Notes（.agents/notes/，implemented/proposed/rejected/archived 四态）
- 双语文档体系（.md + .zh.md + .i18n.yaml 配对），大量生成式目录（config-catalog, tool-catalog, module-graph, capability-seams mermaid 图）
- 核心脚本：build（tsc + tsdown 双 face）、test（vitest）、lint（oxlint）、hygiene（knip+publint+constraints）、doc-sync（文档门禁）

## 3. 核心架构：一切皆插件（Cordis）

- **没有特权核心**：模型适配器、工具注册表、会话日志、agent loop 本身都是插件，全部可从配置替换
- **Context** 是服务仓库：服务占用稳定 `ctx.<key>`（ctx.tools / ctx.llm / ctx.sessions），插件通过 key 找服务而非 import 具体实现
- **inject 声明依赖**：插件声明所需服务，等其存在后再加载，加载顺序由服务依赖表达而非手动排布
- **可逆副作用**：prompt 段落、工具 schema、适配器、监听器都通过 `ctx.effect()` / `ctx.on()` 安装，reload/teardown 可预测回滚
- **四种事件派发模式**：
  - `emit` — 不 await，按注册顺序观察，无返回值
  - `waterfall` — 中间件链，监听器 `(…args, next)`，调 `next()` 委托否则短路；有返回值
  - `parallel` — await，所有监听器并行
  - `serial` — await，按序，有返回值
- Loader 配置：`!!js` 表达式（cordis-plugin-include），entry config 在注入激活后惰性求值，`disabled` 每次挂载决策时求值

## 4. 三大设计支柱

### 4.1 Capability Seam（能力接缝）三角色模型
可替换能力拆成三个角色（2026-06-13-capability-seams Agent Note）：
1. **Service Definition** — Cordis Service + vocabulary types，拥有 `ctx.<key>`，只依赖契约所需词汇（如 dsh-shell）
2. **Service Provider** — 提供/注册实现的插件（如 dsh-bash-local, dsh-bash-sandbox）
3. **Consumer** — 模型和插件编程对向（如 dsh-tool-bash：bash 工具 schema）

- 换 provider（本地 bash → 远程沙箱 → pwsh）不影响模型可见契约
- 角色独立演进；单 provider 单 consumer 时不预拆分
- 完整接缝列表（ctx key / 实现 / 消费者）：llm (llm-deepseek, llm-pi-ai, llm-replay / agent-loop), shell (bash-local, bash-sandbox, pwsh-local / tool-bash, tool-pwsh), subprocess (subprocess-local, subprocess-e2b / bash-local 等), fs (fs-local, fs-sandbox, fs-e2b / tool-fs), terminal (terminal-bash / tool-terminal), web (web-search-exa/perplexity/deepseek, web-fetch-http / tool-web), lsp (lsp-local, lsp-stdio / tool-lsp), skill (skill-filesystem, skill-badge / tool-skill), subagent (spawn-in-process, fork-in-process, acp, codex, claude-code, dsh-sdk / tool-subagent, tool-subagent-control, tool-subagent-report), sandbox (sandbox-local, sandbox-windows-acl / bash-sandbox, terminal-bash), compaction (compaction-basic / command-compact), code-runtime (code-runtime-worker / tools), jobs (jobs-local / tool-jobs), approval (acp / tools, tool-bash), webServer (connection/modules/hmr), workflowEngine (workflow-worker-thread / tool-workflow, tool-ralph)

### 4.2 事件溯源会话日志（Session）
- `Session` 是 append-only 的 `SessionEvent` 日志 —— 单一事实来源
- LLM 消息历史**从日志派生**（`deriveMessages()`），不单独存储
- "模型可见 ⇒ 已记录"是运行时不变式；新模型可见输入必须新增 session event
- **SessionEventMap**（merge-extensible，插件通过 declaration merging 扩展）：
  - turn/start, turn/end（TurnEndReason: completed/blocked/max-tokens/aborted/error）
  - step/start, step/end
  - user/message, assistant/chunk, assistant/message
  - tool/call, tool/result
  - todo/write, request/header, request/context, session/end-seed
  - 扩展：compaction/start, compaction/summary, compaction/end（compaction 插件 merged）
- **Surface 机制**：三个消息产生型事件（user/message, assistant/message, tool/result）带 `surfaceOp`（'append' 或 { op: 'replace', start, end }）
  - 模型可见历史 = surface 节点的有序派生
  - compaction 通过 replace 把一段 surface 摘要成一个 user/message，影子事件仍在日志
- **SessionEvent<T>** 是 proper discriminated union（switch 按 type 窄化），seq = log.length 单调连续，事件不可变 deep-frozen，append 时 JSON 可序列化校验
- **EpochHeader**（request/header 事件）：call config + adapter defaults + system prompt + tool schemas，最新快照重构
- 持久化：SessionPersistence seam（JSONL / SQLite 两个后端），session/flush checkpoint，崩溃恢复，SESSION_FORMAT_VERSION
- 2 个 branded ID：CallId（工具调用关联）、SessionId（agent/session 共享身份）

### 4.3 Agent Turn/Step 循环（agent-loop）
- **Agent** 接口（ctx.agents 注册表 + ctx.agentLoop 默认驱动）：
  - send / followup / steer / inject（inbox 投递，next-turn / next-step 两个队列）
  - cancel(cause, options) / whenIdle() / runMaintenance()
  - AgentStatus: 'idle' | 'running'
  - AgentCancelCause: user | parent | hook | disposed
- **turn** = 0+ 个 step；**step** = 一次模型请求 + 其调用的工具
- 流水线（durable session events vs live extension points 分离）：
  ```
  turn/start
    claim next-step + 1 queued next-turn message
    assemble prompt sections + tool schemas (ctx.systemPrompt)
    -> agent/pre-step (waterfall: reject | enter(messages))
       step/start
       append user/message
       deriveMessages -> agent/request (waterfall: replace config) -> llm/stream -> assistant/chunk* -> assistant/message
       tool/call* -> tools/pre-execute -> tools/execute -> tools/post-execute -> tool/result*
       step/end
    -> agent/turn-stopping (serial)
  turn/end
  ```
- 事件域：session events（durable）/ agent/* events（live: created, disposed, status, inbox/*, pre-step, request, request-error, session-start, turn-stopping）/ capability events（fs/*, tools/*, telemetry/*）
- **工具调度**（executeToolCalls）：exclusive 调用形成屏障，parallel 调用滚动池并行；结果按模型顺序提交；abort 为未启动调用记录合成 error result 保持 replay 有效
- **max-tokens sticky**：一旦某 step 达上限，后续 step 不降级 turn 结局
- Code Mode：run_code 桥，子调度经 tools/code-dispatch-log
- ReactLoopAgent 是唯一具体 Agent 实现（package-internal），扩展插件依赖 dsh-agent 而非 agent-loop，保持 loop 可替换

## 5. LLM 层

- **ContentBlockMap**（merge-extensible）：text / reasoning / image / tool-call / tool-result
- **Message**：id + role + content blocks + source（MessageSourceMap: user/plugin/model/tool）
- **ContextForm**：instructions / catalog / snapshot / notice / relay / recall —— 语义化信息来源分类
- **StreamChunk**（closed union）：block-start / text-delta / reasoning-delta / tool-call-delta / block-end / usage / finish
  - tool arguments 端到端保持 raw JSON string
  - usage 必须在 finish 前，finish 后无事件
- **Adapter contract**：一个 adapter call = 一次 provider attempt（禁库内 retry）；空完成 = 可重试错误（EMPTY_RESPONSE）；CONTEXT_WINDOW_EXCEEDED 统一 code；5 分钟 streamIdleTimeout；User-Agent attribution 强制
- **LlmFailure**：message + code + status + providerRetryAfterMs + requestId（provider-neutral 序列化）
- **LlmCallConfig**：provider / model / maxTokens / reasoningEffort / 采样标量
- TokenUsage：inputTokens/cachedInputTokens/outputTokens（disjoint），reasoningTokens 不重复加
- Retry：ResolvedRetryPolicy（normal/always + backoff），agent/request-error waterfall 可返回 { kind: 'retry' }
- 适配器：llm-deepseek（官方）、llm-pi-ai（@earendil-works/pi-ai，OpenRouter 系多模型）、llm-replay（测试）

## 6. Capability 细节

### Shell / Subprocess / Terminal
- ctx.shell（bash 执行接缝）：resolve() 分离 request（可选 workdir/timeout）与 spec（已解析必填）—— "explicit > implicit at package boundaries" 模板
- DSH_* 环境变量是 Harness 拥有的事实，subprocess 先清除继承的 DSH_* 再合并当前快照
- ctx.subprocess：进程坐标、进程树/会话生命周期、stdio 处置、终端机制、kill 升级
- ctx.terminals：持久 PTY 会话注册表（node-pty，Windows ConPTY），tool-terminal 是 owner-scoped 模型工具
- ctx.sandbox：进程沙箱接缝 —— 消费者交出即将 spawn 的 argv，same-world 后端按 per-call 策略包装并报告执行情况

### Filesystem
- ctx.fs seam（fs-local / fs-sandbox / fs-e2b），tool-fs 执行 read/write/edit
- fs-sandbox 按共享 sandbox mode 围栏 mutation；fs-observation-policy 通过 fs/* 事件门贡献观察状态检查

### Web
- ctx.web 一个接缝两个操作（search + fetch）：一个 provider-selection 政策所有者、一个 abort/error 词汇
- 搜索 provider：Exa / Perplexity / DeepSeek；fetch：HTTP
- tool-web 拥有模型可见名（web_search / web_fetch），maxResults 由 tool 层约束并在 seam 截断
- 非 2xx 是 fetch 结果不是错误（status 属于资源状态）；WebError 仅保留给安全检索失败

### Subagent
- ctx.subagents 多 provider 并存（按名注册），不同于 bash 单执行器
- 一次性 start() vs continuable（可续对话）两类：
  - SubagentCapabilities 静态描述 start-time 能力（outputSchema/depthLimit/toolFilter/persona），不支持 loud reject
  - Continuable child = durable child Session + 至多一个 process-local Activation；continuation manager 拥有激活准入、父授权、live ownership graph、cold resume、child-first disposal
- 6 个 provider：spawn-in-process / fork-in-process / acp / codex / claude-code / dsh-sdk
- Consumers：tool-subagent（一次性/可续委托）、tool-subagent-control（send_message/interrupt_agent/list_agents）、tool-subagent-report（child 内 report 返回通道）

### Compaction
- ctx.compaction seam（compaction-basic 后端 + command-compact 人用 consumer）
- 三个 merged session events：compaction/start / summary / end —— log-only，锁括号包裹整个操作
- 总结替换通过 user/message + surfaceOp replace 实现（唯一 surface mutation）
- 触发：pressure（post-step 压力）或 context-overflow（agent/request-error 恢复路径）
- token-meter 拥有重放 token 测量；tool-result-pruner 先修剪超大工具结果再总结
- compactNow() 在 turn 间 maintenance 运行

### 其他
- plan-mode：折叠 logged plan/mode 状态，/plan 命令
- goal：同一 session 目标域（从日志折叠修订目标状态）
- jobs：后台任务注册表 + tool-jobs 控制器
- workflow：工作流脚本引擎（worker-thread provider）+ tool-workflow / tool-ralph
- lsp：语言服务器导航 seam（4 个规范化操作）
- skill：skill provider 注册表 + tool-skill（session-prefix catalog + 加载完整 skill body）
- attachment：durable 二进制附件存储
- credentials / settings：凭据引用 seam + 用户设置 seam
- spill：超大工具文本溢写（保存 + 返回 locator）

## 7. 基础设施

### SDK / ACP / JSON-RPC
- packages/sdk：JSON-RPC protocol + server + TypeScript client
- packages/acp：Agent Client Protocol server（自动化专用）—— 可被其他 agent 作为 ACP 后端调用
- examples: acp-agent, jsonrpc-agent, headless-agent, web-cordis, web-schedule, mcp-memory

### Typert（类型图 + 远程调用）
- packages/typert：type graph generator / loader / registry / protocol
- 生成式 Remote：Host 用 @Remote 声明业务方法，构建时生成 Host-for-Client 类型和运行时贡献
- TypertLookupMap / TypertContextMap 通过 declaration merging 扩展
- InvocationDescriptor = 本地反射非 wire 消息；wire 只发 endpoint + named args；codec 分 strict（带 schema）和 src-json
- api/gateway (ctx.typertGateway)：关联生成的 Remote descriptors 与 live Cordis services

### Host / Client 双面架构
- Host aggregate（tsconfig.host.json）：服务端包 + examples + tests + scripts
- Client aggregate（tsconfig.client.json）：packages/client/*（React UI 组件族）+ apps/web
- 双 aggregate 原因：两侧都 declaration-merge cordis Context 接口，一个 program 看到两个合并会冲突
- api/remotes 是唯一 split 包：Host entry 参与 Typert graph，Client entry import 生成的 /remote 声明
- apps/web：vite 构建 dsh-client-web shell，dist/ 由 apps/cli 的 dsh web 服务
- host/apiproxy (ctx.apiProxy)：传输无关的 host gateway face，浏览器 API 调用 + 事件流订阅
- client/ui-* 组件族：ui-conversation, ui-layout, ui-sidebar, ui-subagent, ui-tool, ui-trajectory, ui-goal, ui-jobs, ui-plan, ui-settings 等 30+
- client/connection：浏览器与 host 的 RPC 连接；client/modules + hmr：客户端插件图宿主 + 热重载

### Boot / Bundle / Preset / Profile
- **profile**：命名组合，存于 Harness home，列出 bundle + 用户 cordis.patch.yml；web / headless 是模板
- **bundle**：Cordis config rows + 其代码的分发格式（dsh.profile 列 bundle，dsh.bundle 指向 patch 文件）
- dsh-base = 每个 profile 第一层：模型适配器、工具、持久化、sandbox/approval 政策、settings/credentials/telemetry
- dsh-web-app 加浏览器应用；dsh-headless 加一次性 runner（无 server）
- patch 层序：profile bundles（按列序）→ profile cordis.patch.yml → home-level → --patch overlay
- **agent preset**（ctx.agentPresets）：per-session agent 组合，从 preset cordis.yml 在 agent scope 下挂载；子 agent 通过 composeFrom 继承父的组合（bind 非 mount）；isolate realm 使 preset 服务对 host 不可见
- dsh --profile web --dump-config 打印实际启动的插件树

### Vendored Cordis
- vendor/ 9 个包：cosmokit 1.8.1, schemastery 3.18.0, cordis 4.0.0-rc.7→4.0.1, loader, include, group, timer, hmr, logger-console
- 全部 rescope 为 @deepseek-ai/*，目录名和上游版本不变（manifest 可读）
- 17+ 项本地修改日志（fiber 生命周期硬化、事务性 Loader/Include 配置协调、HMR 精确配置监听、Node 兼容 TypeScript 等）—— 深度的框架层所有权

### Sandbox / 安全
- SandboxMode: read-only / workspace-write / danger-full-access（文件效应政策；网络和进程可见性在词汇外）
- sandbox-local（landlock Linux）、sandbox-windows-acl（Windows 受限令牌 + 每 session 私有 temp + SID）
- SandboxEnforcement: full | partial —— partial 表示不能承诺每个文件效应，绝对边界调用方不得视为 full
- approval seam：approval/request waterfall，answerer 是监听器（ACP bridge 为自己的 agent），缺席 fail closed 为 unavailable
- permission-presets：workspace-write / danger-full-access 用户表，捆绑 sandbox-mode + approval-policy 旋钮

### Python SDK
- python/sdk：同步 JSON-RPC stdio 客户端（873 行，pydantic），启动本地 dsh runtime 子进程
- HarnessClient: start/close/request/notify，线程安全，响应按 id 匹配，通知订阅
- python/sdk-runtime：deploy root（单 exe 构建 + Python runtime 分发），cordis.yml 内嵌
- docs/user/guide/python-sdk.md + jsonrpc-agent example 是入口

### Hooks 桥接
- hooks-claude-code / hooks-codex：把未修改的 Claude Code / Codex command hooks 桥到 harness 拦截扩展点
- 支持 SessionStart / prompt pre/post / tool pre/post / Stop / subagent start-stop
- hook-protocol 提供共享执行与解析；updatedInput 记录并警告但不执行
- 意味着 dsh 可当 Claude Code/Codex 的 harness 宿主

## 8. 工程文化（Agent Notes 制度）

- 非平凡变更必须同 PR 带 Agent Note（.agents/notes/implemented/<type>/<date>-<slug>.md）
- archived 笔记冻结：绝不编辑，不作为现行权威
- 关键规则（AGENTS.md）：
  - "Registrations are effects"：所有贡献走 ctx.effect()/ctx.on()
  - Model-visible ⇔ logged 不变式
  - 能力 seam 三角色完整才算 seam，单角色不是
  - switch on discriminant tags，closed union 结尾 assertNever
  - waterfall 监听器必须调 next() 否则短路
  - 无硬编码 tunables：部署变化选择必须是 cordis.yml 可改的 Config 字段
  - 误配置 loud fail at load
  - 跨边界 id 用 branded type（Branded<B>）
  - 同进程 typed 边界不重复运行时校验（在 parser/config/queued/model-tool-JSON/durable/wire 边界校验）
  - 测试描述行为而非正确性；行为变更连同测试一起改
  - 包名 @deepseek-ai/dsh-<name>，ESM everywhere
- CI 门禁：check:ci / test:coverage（per-file 100%）/ doc-sync / hygiene / Windows wine 门禁
- 双语文档：文档变更必须成对（.md + .zh.md + .i18n.yaml pairing）

## 9. 对 Agentic System Designer 的启示

1. **capability seam 是"可替换性"的正解**：把接口/实现/消费者拆成三个演进速率不同的包，换后端不动模型契约 —— 这是 agent 系统里最难的模块化决策
2. **事件溯源会话是上下文管理的根基**：历史可重放、可压缩（surface replace）、可 fork、可 resume、可遥测，全部从一条 append-only log 派生
3. **"一切皆插件 + 可逆副作用"** 让整个产品可组合、可热改：甚至 loop 本身可替换
4. **多 provider 并存模式**（llm 适配器注册表、subagent 多后端）vs 单 provider 模式（bash）是有意的设计选择
5. **双面（Host/Client）TypeScript 工程**解决跨进程类型共享：Typert 生成式 Remote + branded ID + 声明合并扩展点
6. **Agent Notes 制度**把每个架构决策变成可检索的文档资产，1372 条决策记录 = 罕见的工程透明度
7. 与 LangGraph（graph 编排）不同，dsh 是"插件运行时 + 事件溯源 + 可替换能力"的生产级 harness 范式
