---
title: Fincept Storage System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, sqlite, database, cpp, qt6]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept Storage System (SQLite + Repository Pattern)

## Overview

Fincept Terminal 使用 SQLite 作为本地持久化存储，采用 Repository 模式 + Migration 系统 + Cache 层 + SecureStorage 的四层架构。~75 个源文件覆盖完整的数据访问层。

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         StorageManager                   │  ← 统一入口，初始化所有子系统
├─────────────────────────────────────────┤
│  Repositories (17+ 实体仓库)             │  ← CRUD 操作，业务数据
│  BaseRepository.h (模板基类)            │
├─────────────────────────────────────────┤
│  CacheManager + TabSessionStore         │  ← 内存缓存 + 会话状态
├─────────────────────────────────────────┤
│  Database + CacheDatabase (SQLite)      │  ← 原生 SQLite 封装
│  MigrationRunner + v001~v018           │  ← 数据库迁移
├─────────────────────────────────────────┤
│  SecureStorage                          │  ← 敏感数据加密存储
└─────────────────────────────────────────┘
```

## Database Layer

### Database (主数据库)
- `Database::instance()` — 单例模式
- 自动创建数据库目录
- 支持 WAL 模式 (Write-Ahead Logging)
- 事务管理 (`beginTransaction()`, `commit()`, `rollback()`)

### CacheDatabase (缓存数据库)
- 独立于主数据库
- 用于 DataHub 的持久化缓存
- 支持 TTL 过期自动清理

## Migration System

18 个迁移版本 (`v001_initial.cpp` 到 `v018_widget_config`):

| Version | Content |
|---------|---------|
| v001 | 初始表结构 (accounts, settings, watchlists) |
| v002 | LLM 聊天 (chat_messages, llm_configs) |
| v003 | 数据源 + MCP + Agent 配置 |
| v004 | 清理废弃表 |
| v005 | Dashboard 布局 |
| v006 | 多 Portfolio 支持 |
| v007 | News 基线数据 |
| v008 | Workflows (工作流持久化) |
| v009 | Instruments (交易合约) |
| v010 | LLM Profiles |
| v011 | Custom Indices |
| v012 | 数据标准化配置 |
| v013 | News articles |
| v014 | LLM tools 开关 |
| v015 | Screen state |
| v016 | Broker accounts |
| v017 | 性能索引 |
| v018 | Widget config |

## Repository Pattern

### BaseRepository (模板基类)
```cpp
template<typename T>
class BaseRepository {
    virtual Result<T> by_id(int id);
    virtual Result<QList<T>> all();
    virtual Result<void> insert(const T& item);
    virtual Result<void> update(const T& item);
    virtual Result<void> remove(int id);
};
```

### 17+ Repositories

| Repository | Purpose |
|------------|---------|
| `AccountRepository` | 用户账户 |
| `AgentConfigRepository` | AI Agent 配置 |
| `ChatRepository` | LLM 聊天历史 |
| `ContextRecordingRepository` | 上下文录制 |
| `CustomIndexRepository` | 自定义指数 |
| `DashboardLayoutRepository` | Dashboard 布局 |
| `DataMappingRepository` | 数据映射 |
| `DataSourceRepository` | 数据源连接配置 |
| `LlmConfigRepository` | LLM Provider 配置 |
| `LlmProfileRepository` | LLM Profile |
| `McpServerRepository` | MCP Server 配置 |
| `NewsArticleRepository` | 新闻文章 |
| `NewsMonitorRepository` | 新闻监控 |
| `NotesRepository` | 用户笔记 |
| `PaperTradingRepository` | 模拟交易 |
| `PortfolioHoldingsRepository` | Portfolio 持仓 |
| `PortfolioRepository` | Portfolio 定义 |
| `ReportRepository` | 报告 |
| `SettingsRepository` | 应用设置 |
| `WatchlistRepository` | 关注列表 |
| `WorkflowRepository` | 工作流定义 |

## SecureStorage

- 加密存储敏感数据 (API keys, credentials)
- 平台原生加密:
  - Windows: DPAPI (CryptProtectData)
  - macOS: Keychain
  - Linux: libsecret / fallback

## CacheManager + TabSessionStore

- `CacheManager`: 内存缓存，支持 TTL
- `TabSessionStore`: 保存标签页状态 (滚动位置、选中项等)

## Design Decisions

1. **SQLite over embedded DB**: 零依赖，跨平台，支持完整 SQL
2. **Repository pattern**: 统一接口，易于测试和替换后端
3. **Migration system**: 安全的 schema 演进
4. **Separate cache DB**: 缓存数据可安全删除，不影响核心数据
5. **Platform-native encryption**: 不自行实现加密算法
6. **WAL mode**: 更好的并发性能

## Related
- [[fincept-terminal-architecture]]
- [[datahub-architecture]]
- [[broker-interface]]
