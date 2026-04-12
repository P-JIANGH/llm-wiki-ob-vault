---
title: Registry Pattern Tool Discovery
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [architecture, framework, tool, design-pattern]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# Registry Pattern Tool Discovery

## Definition

hermes-agent 的工具发现机制采用**中心注册表模式（Registry Pattern）**：所有工具通过 `tools/registry.py` 的 `ToolRegistry` 单例集中注册，各工具文件在模块级别调用 `registry.register()` 注册自己，而非依赖硬编码的列表或装饰器扫描。

## 在 hermes-agent 中的实现

### ToolEntry 数据结构

```python
class ToolEntry:
    __slots__ = (
        "name", "toolset", "schema", "handler", "check_fn",
        "requires_env", "is_async", "description", "emoji",
        "max_result_size_chars",
    )
```

### 注册流程

```
model_tools.py (_discover_tools)
    └─ importlib.import_module("tools.web_tools")
    └─ importlib.import_module("tools.terminal_tool")
    └─ importlib.import_module("tools.file_tools")
    ...
            └─ tools/xxx.py (module level)
                    └─ registry.register(name, toolset, schema, handler, check_fn, ...)
                            └─ ToolRegistry._tools[name] = ToolEntry(...)
```

### check_fn 环境检查

`check_fn` 是一个返回 bool 的函数，只有返回 True 时工具才对模型可见。用于处理 API key 缺失等环境问题：

```python
# 示例（简化）
def check_ha_config():
    return bool(os.getenv("HASS_TOKEN"))

registry.register(
    name="ha_get_state",
    toolset="homeassistant",
    schema={...},
    handler=ha_get_state_handler,
    check_fn=check_ha_config,
)
```

### MCP 动态工具

MCP 服务器通过 `mcp_tool.py` 的 `discover_mcp_tools()` 注册，接收 `notifications/tools/list_changed` 时调用 `registry.deregister()` 撤消后重新注册。

## 优势

1. **零硬编码**：新增工具只需在对应文件中调用 `register()`，无需修改发现逻辑
2. **check_fn 条件可见**：API key 缺失时自动隐藏工具，不给模型看到无法调用的选项
3. **支持动态注销**：MCP 服务器可热更新工具列表
4. **单数据源**：下游 consumers（工具定义获取/过滤/调度）全部查询同一注册表

## 缺点 / 风险

- 循环导入风险：需严格遵守 `tools/registry.py` 无从 model_tools 或 tool files 导入的约定
- 注册时机：所有工具在 `_discover_tools()` 时全部加载，大型工具集启动较慢
- 工具冲突：同名不同实现的工具，后者覆盖前者（有 warning log）

## 相关

- [[hermes-agent]] 中的 `tools/registry.py` 是核心实现
- [[agent-loop]] 通用概念中，工具调用是循环的一部分
- [[nanobot]] 的工具发现采用装饰器模式（对比）
