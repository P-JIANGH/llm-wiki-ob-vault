---
title: sandbox
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [security, agent, isolation, architecture]
sources: [raw/articles/deer-flow-readme-2026.md]
---

# Sandbox（沙箱）

一种**隔离执行环境**模式：让 Agent 的文件操作和命令执行与宿主系统隔离，防止恶意/误操作影响真实系统。

## 核心能力

| 能力 | 说明 |
|------|------|
| **文件系统隔离** | Agent 只能读写虚拟化路径 |
| **命令执行隔离** | bash/shell 在受限环境中运行 |
| **网络隔离** | 可选限制出站网络访问 |
| **临时性** | 任务结束后可清理，状态不残留 |

## 实现模式

| 模式 | 实现 | 适用场景 |
|------|------|---------|
| **进程级** | $PATH 限制 + seccomp | 轻量隔离 |
| **容器级** | Docker / Kubernetes | 中等隔离 |
| **虚拟机级** | gVisor / Firecracker | 强隔离 |
| **本地执行** | 直接在宿主文件系统 | 开发/信任环境 |

## DeerFlow 的 Sandbox 设计

**抽象接口** (`Sandbox`): `execute_command` / `read_file` / `write_file` / `list_dir`

**Provider 模式** (`SandboxProvider`): `acquire` → `get` → `release` 生命周期

**虚拟路径映射**:
- Agent: `/mnt/user-data/{workspace,uploads,outputs}`, `/mnt/skills`
- 宿主: `backend/.deer-flow/threads/{thread_id}/user-data/...`

**两种实现**:
- `LocalSandboxProvider`: 单例本地文件系统（`sandbox_id == "local"`）
- `AioSandboxProvider`: Docker 容器隔离（`aio_sandbox` community 工具）

## 与 Agent 的集成

DeerFlow 的 `SandboxMiddleware` 在每次 agent 调用前获取沙箱实例，将 `sandbox_id` 写入 `ThreadState`。Agent 的所有文件/命令操作通过 `tools.py` 的路径翻译函数处理。

## 相关概念

- [[deer-flow]] — sandbox 的具体应用框架
- [[nanobot]] — nanobot 的 sandbox 实现（bwrap 沙箱）
