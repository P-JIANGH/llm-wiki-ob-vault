---
title: Fincept AI Agents Framework
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [ai, agent, llm, architecture]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept AI Agents Framework

## Overview

Fincept Terminal 内置 37 个 AI Agent，覆盖 Trader/Investor 人格、经济分析、地缘政治等。通过 Agno 框架驱动，支持多模型、工具调用、团队协作。

## Agent Categories

### Trader/Investor Agents
模拟知名投资大师的分析风格:
- **Warren Buffett** — 价值投资分析
- **Benjamin Graham** — 安全边际分析
- **Peter Lynch** — GARP 策略
- **Charlie Munger** — 多学科思维模型
- **Howard Marks** — 周期/风险意识
- **Seth Klarman** — 深度价值/特殊机会

### Economic Agents
- 宏观经济数据分析
- 央行政策解读
- 经济指标预测

### Geopolitics Agents
- 地缘政治风险评估
- 冲突/制裁影响分析
- 供应链风险

## Architecture

### AgentService
```cpp
class AgentService : public QObject {
    // Agent 发现
    QList<AgentInfo> list_agents();
    QList<AgentCategory> list_categories();

    // Agent 执行
    void run_agent(agent_id, params, callback);

    // 路由
    RoutingResult route_intent(query);

    // 系统信息
    AgentSystemInfo get_system_info();
    AgentToolsInfo get_tools_info();
    AgentModelsInfo get_models_info();
};
```

### AgentTypes
```cpp
struct AgentInfo {
    QString id, name, description, category, provider, version;
    QStringList capabilities;
    QJsonObject config;
};

struct AgentExecutionResult {
    bool success;
    QString response, error;
    int execution_time_ms;
    QString request_id;  // 防止跨会话污染
};

struct RoutingResult {
    bool success;
    QString agent_id, intent;
    double confidence;
    QStringList matched_keywords;
};

struct TeamConfig {
    QString name;
    QString mode;  // "coordinate", "route", "collaborate"
    QVector<TeamMember> members;
};
```

### Team Modes
- **Coordinate**: 成员协作完成任务
- **Route**: 根据意图路由到最合适的 Agent
- **Collaborate**: 多 Agent 并行讨论

## Integration Points

1. **AI Chat Screen** (`ai_chat/`) — 直接对话界面
2. **Chat Mode** (`chat_mode/`) — 全屏聊天模式
3. **Workflow Engine** — Agent 作为工作流节点
4. **MCP Tools** — LLM 通过 MCP 调用 Agent
5. **Agent Config Screen** — 配置/创建 Agent 和 Team

## LLM Provider Support

通过 [[llm-providers]] (9 providers) 驱动 Agent:
- OpenAI, Anthropic, Gemini, Groq, DeepSeek, MiniMax, OpenRouter, Ollama, Fincept

## Key Design

1. **Python backend**: Agent 执行通过 [[python-integration]] 调用 Python (Agno 框架)
2. **Request ID isolation**: 每个执行有唯一 request_id 防止响应交叉
3. **Intent routing**: 自动选择最合适的 Agent
4. **Team composition**: 支持多 Agent 组队分析
5. **Tool access**: Agent 可调用 [[mcp-system]] 中的工具

## Related
- [[fincept-terminal-architecture]]
- [[mcp-system]]
- [[llm-providers]]
- [[python-integration]]
- [[fincept-workflow-engine]]
