---
title: OpenWolf
created: 2026-05-06
updated: 2026-05-06
type: entity
tags: [tool, cli, agent, llm, token-optimization, claude-code, hook-system]
sources: [raw/articles/openwolf-2026.md]
---

# OpenWolf

**Claude Code 的第二大脑** — 通过 6 个无感知 Hook 脚本实现项目索引、记忆累积和 token 追踪的开源工具。实测节省 ~80% tokens（3.4M → 425K）。

## 快速链接

- [[openharness]] — HKUDS Claude Code 开源 Python 实现（43+工具）
- [[hermes-agent]] — 生产级 AI Agent 框架
- [[aworld]] — Agent Harness 框架（代码分析+Benchmark驱动开发）
- [[agent-laboratory]] — LLM 自主研究 Agent

## 概述

OpenWolf 由 Cytostack 开发，核心解决 Claude Code 的三大盲区：
1. **无项目索引** — 不知道文件内容，必须打开才知道
2. **无记忆累积** — 每次会话重复发现同样的错误
3. **无 Token 可视化** — 不知道消耗在哪里

## 核心机制

### 6 个生命周期 Hook

| Hook | 时机 | 作用 |
|------|------|------|
| `session-start` | 会话开始 | 初始化 session、检查 cerebrum 新鲜度 |
| `pre-read` | 读取前 | 查 anatomy.md 告知文件描述+token；重复读取警告 |
| `post-read` | 读取后 | 记录 token 消耗 |
| `pre-write` | 写/编辑前 | 检查 Do-Not-Repeat 黑名单；搜索 buglog |
| `post-write` | 写/编辑后 | 更新 anatomy；追加 memory；自动检测 bug-fix |
| `stop` | 会话结束 | 汇总数据写入 token-ledger.json |

### `.wolf/` 核心文件

- **anatomy.md** — 项目文件地图（描述+token估算），Claude 读取前先查此文件
- **cerebrum.md** — 学习记忆：Do-Not-Repeat 黑名单 / 用户偏好 / 关键学习
- **memory.md** — 时序操作日志（含 token 估算）
- **buglog.json** — Bug 记忆（可搜索，自动检测 fix 模式写入）
- **token-ledger.json** — 生命周期 token 统计和 session 历史

## 技术亮点

### 智能文件描述提取

`extractDescription()` 支持 20+ 编程语言：
- React: 组件名 + 渲染元素类型（form/table/modal）
- Next.js: page.tsx/route.ts 等约定识别
- Laravel: Controller 方法列表、Model 表名/字段数
- Django/FastAPI: 路由端点数量
- 还支持 Rust/Go/C#/Swift 等

### Bug 自动检测

`post-write.ts` 的 `detectFixPattern()` 识别 11 种常见修复模式：
- error-handling、null-safety、guard-clause
- wrong-value、operator-fix、missing-import
- async-fix、type-fix 等

### Token 节省计算

```typescript
savedFromAnatomy = anatomyHits × 200 tokens
savedFromRepeats = Σ(重复读取tokens × (count-1))
```

## CLI 命令

```
openwolf init              # 初始化 .wolf/ 并注册 hooks
openwolf scan [--check]    # 重新扫描 / 验证是否过期
openwolf status            # 健康检查
openwolf daemon start|stop|restart
openwolf designqc         # Puppeteer 全页截图
openwolf bug search <term> # 搜索 bug 记忆
openwolf update            # 更新所有已注册项目
```

## Daemon / Cron

- 基于 `node-cron` 定时任务
- `scan_project`: 定时重新扫描 anatomy
- `consolidate_memory`: 7天前日志压缩
- `ai_task`: 调用 `claude -p` 执行 prompt 生成建议
- 失败重试：指数/线性退避 + Dead Letter Queue

## 设计权衡

| 决策 | 权衡 |
|------|------|
| Hook 无感知 | 不干扰 Claude 正常流程，但依赖 Claude 遵守 cerebrum 更新指令 |
| Token 估算 | 比精确 API 计数轻量，但有 ±15% 误差 |
| 自动 bug 检测 | 省去手动记录，但依赖修复模式识别准确性 |
| ESM Hook 脚本 | 跨平台兼容，但需要 `package.json` type:module |

## 相关概念

- [[agent-loop-architecture]] — Hook 本质是事件驱动的 Agent Loop
- [[context-compression]] — OpenWolf 的 anatomy.md 是手动的 context compression
- [[registry-pattern-tool-discovery]] — OpenWolf 的 hook 注册是注册表模式
- [[tool-registry-pattern]] — Hook 脚本的自注册机制
