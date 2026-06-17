---
title: Fincept Workflow Engine
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, workflow, qt6, node-editor, automation]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept Workflow Engine (Node Editor + DAG Execution)

## Overview

Fincept Terminal 内置可视化节点编辑器和工作流引擎，允许用户通过拖拽节点创建自动化金融分析/交易流水线。系统分为 UI 层 (NodeEditorScreen) 和执行层 (WorkflowExecutor)。

## Architecture Layers

### 1. Type System (`NodeEditorTypes.h`)

核心数据结构:

```cpp
// Node 类型定义 (注册到 NodeRegistry)
struct NodeTypeDef {
    QString type_id;       // e.g. "trigger.manual", "data.market_quote"
    QString display_name;  // e.g. "Manual Trigger"
    QString category;      // e.g. "Triggers", "Market Data"
    QVector<PortDef> inputs;    // 输入端口
    QVector<PortDef> outputs;   // 输出端口
    QVector<ParamDef> parameters; // 属性面板字段
    ExecuteFn execute;      // 异步执行函数
};

// Node 实例 (画布上的节点)
struct NodeDef {
    QString id, type, name;
    QJsonObject parameters, credentials;
    bool disabled, continue_on_fail, retry_on_fail;
};

// 连线
struct EdgeDef {
    QString id, source_node, target_node, source_port, target_port;
};

// 工作流定义
struct WorkflowDef {
    QString id, name, description;
    QVector<NodeDef> nodes;
    QVector<EdgeDef> edges;
    WorkflowStatus status;  // Draft, Idle, Running, Completed, Error
};
```

ConnectionType 枚举定义了 14 种连接类型: Main, AiLanguageModel, AiMemory, AiTool, MarketData, PortfolioData, PriceData, SignalData, RiskData, BacktestData, TechnicalData, FundamentalData, NewsData, EconomicData, OptionsData。

### 2. Node Registry (`NodeRegistry.h`)

集中注册所有节点类型，提供:
- `register_type()` — 注册新节点类型
- `get_type(type_id)` — 查询类型定义
- `get_types_by_category()` — 按类别列出节点
- 版本管理 (每个 NodeTypeDef 有 version 字段)

### 3. Workflow Executor (`WorkflowExecutor.h`)

DAG 执行引擎，关键算法:

```cpp
class WorkflowExecutor : public QObject {
    void execute(const WorkflowDef& workflow);        // 执行整个工作流
    void execute_from(const WorkflowDef&, start_id);  // 从指定节点开始
    void stop();                                       // 停止执行

    // 内部算法
    bool has_cycle() const;                           // DFS 环检测
    QVector<QString> topological_sort() const;        // 拓扑排序
    void launch_ready_nodes();                        // 启动入度为零的节点
    void on_node_done(node_id, success, output, error); // 节点完成回调
};
```

**执行流程**:
1. 构建邻接表和入边列表
2. DFS 检测循环 (有环则拒绝执行)
3. 拓扑排序确定执行顺序
4. 并行执行: 维护每个节点的 in_degree，入度归零时启动
5. 节点完成后更新下游节点入度，信号驱动进度
6. 所有节点完成或出错时发出 `execution_finished`

**关键设计**:
- **非阻塞**: execute() 立即返回，通过 signals 报告进度
- **并行**: 同一拓扑层级的所有节点同时执行
- **容错**: 节点可配置 `continue_on_fail` 和 `retry_on_fail`
- **局部执行**: `execute_from()` 支持只执行子图

### 4. Node Categories (28+ 节点类型)

| Category | Examples |
|----------|----------|
| Triggers | Manual trigger, Schedule trigger, Market event trigger |
| Market Data | Fetch quote, Fetch history, Fetch sparkline |
| Portfolio | Get holdings, Calculate returns |
| Trading | Place order, Cancel order, Get positions |
| Analytics | Technical indicators, DCF model, Risk metrics |
| AI/Agent | Run agent, Run team, Chat with agent |
| Control Flow | If/else, Loop, Parallel, Delay |
| Data Format | JSON parse, CSV export, Table format |
| File | Read file, Write file, Download |
| Notification | Send email, Send push |
| Safety | Risk check, Position limit, Kill switch |
| Integration | HTTP request, Webhook, MCP tool call |

### 5. Service Bridges (`ServiceBridges.h`)

将现有 C++ Services 桥接为工作流节点:
- MarketDataService → MarketDataNodes
- AgentService → AgentNodes
- PortfolioService → 交易节点
- TradingService → TradingNodes
- 等等

### 6. Additional Components

| Component | Purpose |
|-----------|---------|
| `ParameterProcessor` | 处理节点参数 (包括表达式求值) |
| `ExpressionEngine` | 支持 `${}` 表达式引用上游输出 |
| `WorkflowCache` | 缓存节点执行结果 |
| `RiskManager` | 风控检查 (仓位限制、金额限制) |
| `AuditLogger` | 执行审计日志 |
| `ConfirmationService` | 人工确认节点 |
| `ExecutionHooks` | 执行前后钩子 |

### 7. UI Components (`screens/node_editor/`)

| Component | Purpose |
|-----------|---------|
| `NodeCanvas` | QGraphicsView 画布 (平移/缩放) |
| `NodeItem` | 单个节点 (带端口) |
| `EdgeItem` | 节点间连线 (Bezier 曲线) |
| `MiniMap` | 缩略图导航 |
| `NodePalette` | 节点类型面板 (按类别分组) |
| `NodePropertiesPanel` | 属性编辑面板 |
| `ParameterWidgets` | 参数控件 (string/number/boolean/select/code/json/expression) |
| `ExecutionResultsPanel` | 执行结果面板 |
| `DeployDialog` | 工作流部署对话框 |

## Data Persistence

工作流通过 `WorkflowRepository` 持久化到 SQLite:
- 完整保存 WorkflowDef (nodes + edges + parameters)
- 支持 CRUD 操作
- 版本控制

## Related
- [[fincept-terminal-architecture]]
- [[datahub-architecture]]
- [[mcp-system]]
- [[fincept-ai-agents]]
