---
title: agent-loop
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [agent, llm, architecture]
sources: [raw/articles/nanobot-readme-2026.md]
---

# Agent Loop

AI Agent 的核心执行循环模式：LLM 与工具之间反复交互，直到任务完成或达到迭代上限。

## 通用模式

```
消息 → 构建上下文 → LLM推理 → [工具调用?] → [执行工具] → [继续循环?] → 响应
```

## nanobot 的实现

位于 `nanobot/agent/loop.py`（~750行）。

### 核心流程

1. **接收入站消息**：从 `MessageBus` 接收 `InboundMessage`
2. **构建上下文**：`ContextBuilder` 组装 system prompt（bootstrap 文件 + 记忆 + 技能 + 运行时上下文）
3. **LLM 推理**：调用 `AgentRunner` 执行
4. **工具调用**：解析 LLM 输出的 tool calls，执行工具
5. **发送响应**：通过 `MessageBus` 发送 `OutboundMessage`

### AgentRunner（共享执行引擎）

位于 `agent/runner.py`（~723行），负责：
- **重试机制**：空响应最多重试 2 次，长度恢复最多 3 次
- **截断策略**：超过 `max_tool_result_chars` 时截断，保留最近 10 条工具结果
- **工具预算**：按 `_COMPACTABLE_TOOLS`（read_file/exec/grep/glob/web_search 等）决定是否压缩历史
- **错误处理**：工具执行失败时自动追加 `[Analyze the error above and try a different approach.]`

### Hook 系统

`hook.py` 定义生命周期钩子 `_LoopHook`：
- `wants_streaming()`: 是否启用流式输出
- `on_stream()`: 增量 delta 输出（剥离 `<think>` 标签）
- `before_execute_tools()`: 工具执行前回调（进度提示、日志）
- `after_iteration()`: 迭代结束后回调（token 使用统计）
- `finalize_content()`: 最终内容后处理

### 关键工具集

- 内置 9 类：`exec`(shell) | `filesystem`(read/write/edit/list_dir/grep/glob) | `web`(search/fetch) | `spawn`(子agent) | `message` | `cron` | `mcp` | `sandbox` | `search`(glob/grep)
- MCP 外部工具：`mcp_*` 前缀，排序后追加到内置工具列表

### 工具调用截断策略

```python
_COMPACTABLE_TOOLS = frozenset({
    "read_file", "exec", "grep", "glob",
    "web_search", "web_fetch", "list_dir",
})
```
读文件、exec、grep、web 类工具结果可被压缩，只保留最近 10 条且最小 500 字符。

## 相关概念

- [[nanobot]] — agent-loop 的具体实现框架
- [[provider-registry]] — LLM Provider 的插拔式架构
- [[channel-system]] — 消息总线与渠道的解耦设计
- [[memory-system]] — 上下文构建中的长期记忆层
