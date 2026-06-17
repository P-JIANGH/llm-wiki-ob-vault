---
title: OpenCode 优化改造方向
created: 2026-04-29
updated: 2026-04-29
type: summary
tags: [open-source, agent, coding, llm, improvement]
sources: []
---

# OpenCode 优化改造方向

基于 OpenCode 现状和竞品（nanobot、Claude Code）分析，整理出以下改造方向。

---

## 1. 记忆系统（最大短板）

**现状：** SQLite Session 持久化，无深层次记忆

**可做：**
- **项目级知识库** — 扫描仓库后生成代码图谱（函数调用关系、依赖结构），让 Agent 每次启动都知道"这是什么项目"
- **跨会话记忆** — 类似 nanobot Dream，cron 定期总结项目状态写入 `.opencode-memory/`，新会话自动继承
- **RAG 检索** — 把项目文档、README、接口签名向量化，下次问"这个函数怎么用"直接 RAG 召回

---

## 2. 多 Agent 协作（原一层缺）

**现状：** 单 Agent，Oh My OpenCode 是外部叠加层

**可做：**
- **内置 SubAgent 机制** — 类似 nanobot 的 spawn，内置 `delegate` 工具让主 Agent 能召唤子 Agent 并行工作
- **协作记忆共享** — 多 Agent 子进程之间共享上下文片段
- **Agent 生命周期管理** — 启动/暂停/恢复/杀死子 Agent，而不是像现在每次开新 Session

---

## 3. 上下文管理

**现状：** Auto Compact（95% window）只做摘要压缩

**可做：**
- **智能上下文窗口** — 按任务类型分配 window（简单修改用小 window，复杂重构用大 window）
- **文件级注意力** — 不是把整个文件塞进 context，而是只进当前编辑区域的 diff + 关键类型签名
- **上下文预算分配** — 用户可配置"本次任务预算"$（token上限），Agent 自动在最贵的操作上节省

---

## 4. 工具生态

**现状：** glob/grep/view/write/edit/patch/diagnostics/git/bash

**可做：**
- **架构感知工具** — 知道 MVC/微服务/单体项目结构，能区分"核心域代码"和"配置文件"
- **测试生成 + 执行** — 写完代码自动生成 pytest/test 文件并执行，报告覆盖率
- **Git 操作增强** — 不仅仅是 commit/diff，还能做 semantic commit、PR description 生成、code review 总结
- **依赖分析** — `package.json`/`Cargo.toml`/`requirements.txt` 变更检测，防止引入不兼容依赖

---

## 5. LSP 深度集成

**现状：** 基础 LSP 加载

**可做：**
- **增量诊断** — 只报告当前编辑区域的 lint 错误，不全量重扫
- **自动修复** — LSP code action 自动修复，不只是报告
- **跨文件重构** — 知道符号的完整引用图，全局重命名/签名变更一次完成

---

## 6. 用户体验

**现状：** TUI 精美但功能聚焦开发者

**可做：**
- **自然语言配置文件** — 不用写 JSON，写"我想要 Claude 作为主模型，每次任务最多花 10 块钱"
- **中文界面** — 界面 + 帮助文档中文本土化
- **渐进式帮助** — 新用户输入 `--guide` 逐步引导，老用户 `--expert` 跳过

---

## 7. 国内适配

**可做：**
- **国内模型 Provider 内置** — minimax/腾讯混元/百度 ERNIE/字节豆包官方集成（当前靠 OpenRouter 或 custom）
- **飞书/微信通知** — 任务完成后推送到国内 IM
- **本地模型支持** — 更好地集成 ollama/vllm 作为本地推理后端，尤其适合代码敏感场景

---

## 8. 性能

**可做：**
- **流式输出优化** — 打字机效果渲染性能
- **冷启动加速** — LSP server 预热、常用工具预加载
- **Session 加载懒化** — 大仓库不一次性加载全部历史，按需恢复

---

## 最容易出效果的 3 个方向

1. **项目知识库** — 解决"Agent 不了解项目"这个最高频痛点
2. **测试生成+执行闭环** — 写代码 → 生成测试 → 执行 → 报告，覆盖率可视化
3. **国内模型 Provider 内置** — 对国内用户实用价值最高

---

## 相关

- [[opencode]] — OpenCode 基础信息
- [[oh-my-opencode]] — OpenCode 插件生态
- [[nanobot]] — 竞品参考（记忆系统设计）
- [[claude-code]] — 竞品参考（工具生态）
