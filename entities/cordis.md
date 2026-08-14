---
title: Cordis
created: 2026-08-14
updated: 2026-08-14
type: entity
tags: [framework, plugin, agent-framework, typescript, event-sourcing, open-source]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# Cordis

## Overview

**Cordis** 是 [DeepSeek Harness](deepseek-harness.md) 底层的**插件框架**：插件向共享 context 贡献服务、类型化事件和可逆副作用。设计源自论文《A Programming Paradigm for Spatiotemporal Composability》（cordiverse/paper）。

DeepSeek Harness 没有依赖 npm 版 Cordis，而是**vendored 进仓库**（`vendor/cordis`），并全部 rescope 为 `@deepseek-ai/*`（`@deepseek-ai/cordis` v4.0.1，上游 cordis 4.0.0-rc.7 快照）—— 完全拥有框架层：可审计、可打补丁、可随 harness 发布。

- **上游:** https://github.com/cordiverse/cordis
- **Vendored 版本:** 4.0.1（本地修改 17+ 项）
- **配套库:** cosmokit 1.8.1、schemastery 3.18.0（schema 校验）、loader/include/group/timer/hmr/logger-console 插件

## Core Ideas（五要素）

1. **插件是实现 Service 的对象**：函数（可选 `inject` + `apply(ctx)`）或 `Service` 子类，生命周期由 Cordis 挂载到当前 context
2. **Context 是服务仓库**：服务占用稳定 `ctx.<key>`（`ctx.tools`、`ctx.llm`、`ctx.sessions`），插件通过 key 找服务而非 import 具体实现
3. **inject 声明依赖**：插件声明所需服务，等服务存在后再加载 —— 加载顺序由服务依赖表达而非手动排布
4. **类型化事件通信**：服务通过 TypeScript declaration merging 声明事件名，然后按 `emit` / `waterfall` / `parallel` / `serial` 派发
5. **注册是可逆副作用**：prompt 分段、工具 schema、适配器、监听器都通过 `ctx.effect()` / `ctx.on()` 安装，reload/teardown 可预测回滚

## Dispatch Modes

| Mode | Awaited? | 派发顺序 | 有返回值? |
|---|---|---|---|
| `emit` | 否 | 按注册顺序观察 | 否 |
| `waterfall` | 否 | 按注册顺序观察 | 是 |
| `parallel` | 是 | 所有监听器并行 | 否 |
| `serial` | 是 | 按注册顺序 | 是 |

**Waterfall 语义**：监听器 `(...args, next)`，调 `next()` 委托（可能包装的结果传给下一个），不调则短路。策略监听器短路是设计（拥有决策），注解/观察监听器必须委托。

## Vendoring 决策（DeepSeek Harness 特有）

- 9 个包全量源码拷贝进 `vendor/`：cosmokit、schemastery、cordis、loader、include、group、timer、hmr、logger-console
- 全部 rescope 为 `@deepseek-ai/*`（发布 harness 即发布框架层；占用上游名会 squat registry）
- 目录名和上游版本号故意不变，manifest 仍可读为上游快照；`linkWorkspacePackages` 让保留的 semver 范围解析到 pin 的 workspace
- **17+ 项本地修改日志**（vendor/README.md）：fiber 生命周期硬化（3 处 reentrant disposal 缺口）、事务性 Loader/Include 配置协调、HMR 精确配置监听（Windows 路径）、`!!js` 表达式惰性求值（loader config）、include patch 语义导出等

## Extension Points（dsh 内用法）

- `ctx.effect()` / `ctx.on()` 安装可逆副作用
- **Map → derived-union 模式**：插件通过 `declare module` 声明合并扩展 `ContentBlockMap`、`SessionEventMap`、`TurnTriggerMap`、`FinishReasonMap` 等 6 个 canonical maps —— 无需改拥有包
- `isolate` realm：preset 挂载的服务对 host 不可见（agent preset 组合的基础）

## Related

- [[deepseek-harness]] — 使用 Cordis 的 agent harness
- [[plugin-everything-architecture]] — "一切皆插件"扩展模型
- [[capability-seam]] — Cordis 上建立的能力接缝模式
- [[event-sourced-session-log]] — 事件驱动与会话日志
- [[langgraph]] — 另一类 agent 编排框架（graph 范式）

## Sources

- `raw/articles/deepseek-harness-2026.md`（vendor/README.md 本地修改日志、docs/cordis-primer.md）
