---
title: MCP System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [mcp, llm, agent, cpp]
sources: [local/FinceptTerminal/fincept-qt/src/mcp/McpTypes.h, McpManager.h]
---

# MCP System (Model Context Protocol)

## Overview

MCP (Model Context Protocol) 让 LLM 能够调用 Fincept Terminal 的原生工具。系统包含:
- **外部 MCP Server**: McpManager 管理生命周期
- **37 个内置 Tool**: 覆盖市场/新闻/Portfolio/交易等

## McpManager

```cpp
class McpManager : public QObject {
    static McpManager& instance();

    void initialize();  // 从 McpServerRepository 加载配置
    Result<void> save_server(const McpServerConfig& config);
    Result<void> remove_server(const QString& id);
    std::vector<McpServerConfig> get_servers() const;

    Result<void> start_server(const QString& id);
    Result<void> stop_server(const QString& id);
    Result<void> restart_server(const QString& id);
    void start_auto_servers();
    void stop_all();
    void shutdown();

    void start_health_check(int interval_seconds = 60);
    void stop_health_check();

    std::vector<ExternalTool> get_all_external_tools();
    Result<QJsonObject> call_external_tool(const QString& server_id, const QString& tool_name, const QJsonObject& args);

    signals:
    void servers_changed();
};
```

## ToolResult

```cpp
struct ToolResult {
    bool success = false;
    QJsonValue data;
    QString message;
    QString error;

    static ToolResult ok(const QString& msg, const QJsonValue& data = QJsonValue());
    static ToolResult ok_data(const QJsonValue& data);
    static ToolResult fail(const QString& err);
};
```

## 37 MCP Tools

位于 `src/mcp/tools/`:

| Category | Tools |
|----------|-------|
| AI Chat | AiChatTools |
| Alt Investments | AltInvestmentsTools |
| Crypto Trading | CryptoTradingTools |
| DataHub | DataHubTools |
| Data Sources | DataSourcesTools |
| Edgar/SEC | EdgarTools |
| Exchange | ExchangeTools |
| File Manager | FileManagerTools |
| Forum | ForumTools |
| MA Analytics | MAAnalyticsTools |
| Market Data | MarketDataTools |
| Markets | MarketsTools |
| Navigation | NavigationTools |
| News | NewsTools |
| Notes | NotesTools |
| Paper Trading | PaperTradingTools |
| Portfolio | PortfolioTools, PortfolioManagementTools, PortfolioToolsExt |
| Profile | ProfileTools |
| Python | PythonTools |
| Settings | SettingsTools |
| System | SystemTools |
| Trading | TradingTools |
| Watchlist | WatchlistTools |

## Related
- [[fincept-terminal-architecture]]
- [[llm-providers]]
