---
title: agent-loop-architecture
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [agent, architecture, asyncio, tool-calling, parallel-execution]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# Agent Loop Architecture

AI Agent 的核心循环模式：多轮对话 + 工具调用，直到任务完成或达到迭代上限。

## 标准 Agent Loop

```
while not done:
    response = LLM(messages)
    if has_tool_calls(response):
        results = execute_tools(response.tool_calls)
        messages.append(response)
        messages.extend(results)
    else:
        messages.append(response)
        done = True
```

## hermes-agent 的两层实现

### 1. HermesAgentLoop（environments/agent_loop.py）

纯 asyncio 实现，可独立使用：

- ThreadPoolExecutor(128) 执行 async 工具（Modal/Docker 终端后端）
- 工具结果持久化预算控制
- fallback 解析器（content 内嵌 `<tool_call>` 时提取）

### 2. AIAgent（run_agent.py）

生产级实现，~9800 行，包含：

- **Provider 路由**：任务类型 → 模型，fallback 链
- **迭代预算**（IterationBudget）：execute_code 迭代退还机制
- **并行工具执行**：路径重叠检测 + 安全工具白名单
- **中断处理**：`_set_interrupt` 安全停止
- **代理转发**：Qwen Portal 头生成

## 并行工具执行决策树

```
工具调用批次 > 1?
  ├── 含 _NEVER_PARALLEL_TOOLS（clarify）? → 串行
  ├── 有路径重叠（read_file 同一目录）? → 串行
  ├── 全部是 _PARALLEL_SAFE_TOOLS? → 并行
  └── 其他 → 串行
```

## 持久 Event Loop 的必要性

`asyncio.run()` 创建并销毁循环，但缓存的 `httpx.AsyncClient` 在 GC 时尝试关闭已销毁的循环：

```
asyncio.run() → 循环创建 → 协程执行 → 循环关闭
                              ↑
                    httpx client 绑定到这个循环
                              ↓
                    GC 时尝试关闭 → RuntimeError: event loop is closed
```

解决：主线程使用持久 loop，工作线程各自有 per-thread 持久 loop。

## Related

[[hermes-agent]] [[context-compression]] [[tool-registry-pattern]] [[openai-tool-calling]]
