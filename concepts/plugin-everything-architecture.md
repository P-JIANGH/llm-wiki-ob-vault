---
title: Plugin-Everything Architecture
created: 2026-08-14
updated: 2026-08-14
type: concept
tags: [plugin, architecture, design-pattern, agent-framework, event-driven]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# Plugin-Everything Architecture（一切皆插件）

## Definition

**"一切皆插件"（plugin-everything）** 是 [DeepSeek Harness](deepseek-harness.md) 的架构主张：**没有特权核心**。模型适配器、工具注册表、会话日志、甚至 agent loop 本身都是插件，全部可从配置替换。你扩展 dsh 的方式 = 在别的插件旁边挂一个插件。

底层框架是 [Cordis](cordis.md)（vendored）。

## 核心机制

### 1. Context = 服务仓库
服务占用稳定 `ctx.<key>`（`ctx.tools`、`ctx.llm`、`ctx.sessions`）。插件通过 key 找服务，**不 import 具体实现** —— 运行时组合而非编译时耦合。

### 2. inject 声明依赖
插件 `inject: ['shell']` 声明所需服务，等服务存在后再加载。加载顺序由服务依赖表达，而非手动 boot 排布。

### 3. 可逆副作用（Registrations are effects）
每个贡献（prompt 分段、工具 schema、适配器、监听器、provider）都通过 `ctx.effect()` / `ctx.on()` 安装；注册返回 disposer。插件卸载时一切可预测回滚 —— 没有"卸载残留"。

### 4. 声明合并扩展（Map → derived-union）
几乎所有可扩展 sum type 遵循一个模式：interface 按 discriminant tag 建 map（`ThingMap`），union 用 `keyof` 派生。插件通过 `declare module` **声明合并**添加变体 —— 无需改拥有包：

```ts
// 插件扩展，不改 dsh-session 源码
declare module '@deepseek-ai/dsh-session' {
  interface SessionEventMap {
    'compaction/summary': { /* ... */ }
  }
}
```

6 个 canonical maps：`ContentBlockMap`、`MessageSourceMap`、`FinishReasonMap`、`TurnTriggerMap`、`TurnEndReasonMap`、`SessionEventMap`。

### 5. 四种事件派发
`emit`（观察）/ `waterfall`（中间件链，需 next()）/ `parallel`（并行）/ `serial`（按序）—— 见 [[cordis]]。

## 组合机制：Profile / Bundle / Patch

- **Profile**：命名组合（Harness home 内），列出 bundle + 用户 `cordis.patch.yml`；`web` / `headless` 是模板
- **Bundle**：Cordis config rows + 其代码的分发格式（`dsh.profile` 列 bundle，`dsh.bundle` 指向 patch 文件）
- **Patch 层序**：profile bundles（按列序）→ profile patch → home-level patch → `--patch` overlay。patch 按 row id 替换整个 config 或插入新 row
- **dsh-base** = 每个 profile 第一层（模型适配器、工具、持久化、sandbox/approval 政策、settings/credentials/telemetry）
- 验证：`dsh --profile web --dump-config` 打印实际启动的插件树；每行都可被你的 patch 替换

## 能力作用域：Scope 与 Agent Preset

- **Scope（作用域）**：per-agent 注册原语（`createScope`/`scopeOf`/`scopeTarget`），session/agent 的注册是 agent-local，disposal 时回滚
- **Agent Preset**（`ctx.agentPresets`）：per-session agent 组合，从 preset cordis.yml 在 agent scope 下挂载
  - 子 agent 通过 `composeFrom` **继承父的组合**（bind 非 mount —— 拿到父的同一 generation，保证与父历史一致）
  - `isolate` realm：preset 挂载的服务对 host 不可见（agent 私有服务）
  - `recompose` 可在 agent 无产出时换 preset（有产出则禁止 —— 已记录的工具调用新组合做不了）

## Why（价值）

1. **可组合**：产品是插件树，任何层可被更高层 patch 覆盖
2. **可热改**：HMR 支持运行时配置/模块热更新
3. **可替换**：换 provider、换 loop、换持久化后端，全部从配置
4. **可回滚**：副作用可逆，卸载无残留
5. **可扩展无 fork**：声明合并扩展 map，不改拥有包源码

## Trade-offs / Open Questions

- "一切皆插件"的代价：心智模型复杂、调试插件树困难（有 `--dump-config` 缓解）
- 插件粒度：dsh 拆成 ~130+ 工作区包，包爆炸是真实成本（capability seam 规则部分缓解）
- 框架层 vendoring（cordis 17+ 本地修改）：拥有框架层 = 可审计可补丁，但同步上游成本高

## Related

- [[deepseek-harness]] — 架构宿主
- [[cordis]] — 底层插件框架
- [[capability-seam]] — 可替换能力的三角色模式
- [[event-sourced-session-log]] — SessionEventMap 声明合并扩展的例子
- [[agent-turn-step-loop]] — loop 本身是插件（agent-loop 可替换）

## Sources

- `raw/articles/deepseek-harness-2026.md`（docs/architecture.md、docs/cordis-primer.md、AGENTS.md）
