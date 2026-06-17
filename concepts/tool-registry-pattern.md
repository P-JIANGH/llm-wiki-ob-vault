---
title: tool-registry-pattern
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [tool-calling, architecture, design-pattern, plugin, python]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# Tool Registry Pattern

hermes-agent 的工具系统使用**中心注册表**设计模式：所有工具模块在 import 时自注册，而不是在注册中心硬编码。

## 核心机制

```python
# tools/registry.py
class ToolRegistry:
    def register(
        self,
        name: str,
        toolset: str,
        schema: dict,         # OpenAI tool format
        handler: Callable,
        check_fn: Callable = None,   # 环境门控
        requires_env: list = None,
        is_async: bool = False,
        emoji: str = "",
        max_result_size_chars: int | float | None = None,
    ):
        ...

# tools/web_tools.py（每个工具文件）
from tools.registry import registry
def _handle(args): ...
registry.register(
    name="web_search",
    toolset="web_tools",
    schema={...},
    handler=_handle,
    check_fn=lambda: bool(os.getenv("SEARCH_API_KEY")),
)
```

## 循环导入安全

```
工具模块 → registry（单向导入）
model_tools → registry + 所有工具模块（触发注册）
注册中心不导入任何工具文件或 model_tools
```

## check_fn 环境门控

同一工具在不同环境下可用性不同（如 SEARCH_API_KEY 有无）。check_fn 在 `get_definitions()` 时动态过滤，而不是在注册时过滤：

```python
# 有 API key → 工具可用；无 API key → 工具被过滤
check_fn=lambda: bool(os.getenv("SEARCH_API_KEY"))
```

## 工具集（Toolset）

工具按工具集分组（如 `web_tools` / `terminal_tools`）。用户可以启用/禁用整个工具集，而不是单个工具。

```python
get_tool_definitions(enabled_toolsets=["web_tools", "terminal_tools"])
```

## MCP 动态发现

外部 MCP 服务器通过 `discover_mcp_tools()` 动态注册工具，补充内置工具集。

## Related

[[hermes-agent]] [[context-compression]] [[openai-tool-calling]]
