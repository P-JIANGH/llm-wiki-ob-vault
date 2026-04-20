---
title: DataHub Architecture
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, pubsub, qt6, market-data]
sources: [local/FinceptTerminal/fincept-qt/DATAHUB_ARCHITECTURE.md]
---

# DataHub Architecture

## Problem

每个 screen/widget 独立轮询自己的数据:
- ~20 dashboard widgets + MarketPanel + WatchlistScreen + PortfolioBlotter 各有自己的 QTimer
- 55+ screens 有本地 timers 驱动各自的刷新周期
- 27 services 混用三种不兼容的响应风格: std::function 回调、Qt signals、QWebSocket 流

结果：重复的 Python spawn、重复的 HTTP 调用、碎片化的缓存行为、没有"某数据上次更新时间"的单一事实来源。

## Non-Goals

- 不是进程间 broker（保持 in-process）
- 不是 CacheManager 的替代（DataHub **使用**它做持久化）
- 不是 workflow/event bus（这是**数据状态**，不是命令式事件）

## Core Concepts

### Topic

**格式**: `domain:subdomain:id[:modifier]`

```
market:quote:AAPL
market:history:AAPL:1y:1d
market:sparkline:TSLA
news:general
news:symbol:NVDA
econ:fred:GDP
econ:dbnomics:IMF/IFS/USA.PCPI_IX.Q
ws:kraken:BTC-USD
ws:hyperliquid:ETH
broker:zerodha:positions
broker:angelone:orders
geopolitics:hdx:conflicts
agent:hedgefund:run:42
```

规则: 小写、冒号分隔、无空格、`*` 通配符仅用于订阅端

### Subscriber

任何调用 `DataHub::subscribe(owner, topic, slot)` 的 QObject。订阅由 QObject 生命周期托管，owner 销毁时自动清理。

### Producer

实现 `Producer` 接口的服务:
```cpp
class Producer {
    virtual QStringList topic_patterns() const = 0;  // 如 {"market:quote:*", "market:history:*"}
    virtual void refresh(const QStringList& topics) = 0;
    virtual int max_requests_per_sec() const { return 0; }  // 速率限制
    virtual void on_topic_idle(const QString& topic) {}      // 最后订阅者离开时
};
```

## DataHub API

```cpp
// 订阅
QMetaObject::Connection subscribe(QObject* owner, const QString& topic, std::function<void(const QVariant&)> slot);
template <typename T>
QMetaObject::Connection subscribe(QObject* owner, const QString& topic, std::function<void(const T&)> slot);

// 发布 (线程安全，跨线程 marshaling via QueuedConnection)
void publish(const QString& topic, const QVariant& value);
void publish(const QString& topic, const QVariant& value, std::chrono::milliseconds ttl);

// 注册
void register_producer(Producer* producer);
void set_policy(const QString& topic, const TopicPolicy& policy);

// 拉取（不订阅，只读缓存）
QVariant peek(const QString& topic) const;

// 请求刷新
void request(const QString& topic, bool force = false);

// 内省
QVector<TopicStats> stats();  // 订阅数、上次发布时间、in-flight 状态等
```

## TopicPolicy

每个 Topic 可配置策略:
```cpp
struct TopicPolicy {
    std::chrono::milliseconds ttl_ms;        // 缓存过期时间
    std::chrono::milliseconds min_interval_ms; // 最小刷新间隔
    bool push_only = false;                   // WS producer，scheduler 忽略
    int max_requests_per_sec = 0;            // per-producer 速率限制
};
```

## Scheduler

- 内部 QTimer 每 1s 触发一次 `tick_scheduler()`
- 遍历所有有活跃订阅者的 topic
- 如果缓存过期（> ttl_ms）且无 in-flight 请求，调用对应 producer 的 `refresh()`
- Subject to per-producer `max_requests_per_sec()` 限制

## Phases (0-10, All Shipped)

| Phase | 内容 | 依赖 |
|-------|------|------|
| 0 | 准备：Meta-types、feature flag | — |
| 1 | DataHub 核心实现 | 0 |
| 2 | 市场数据 pilot (MarketDataService + 1 widget) | 1 |
| 3 | 市场数据全量迁移 | 2 |
| 4 | WebSocket producers | 1 |
| 5 | News 迁移 | 1 |
| 6 | Economics & DBnomics | 1 |
| 7 | Broker account streams (16 broker) | 1, 4 |
| 8 | Geopolitics/Maritime/Gov Data | 1 |
| 9 | AI/MCP/Agents 集成 | 3, 4, 5 |
| 10 | 清理：Lint rules、docs | All |

## Key Design Decisions

1. **In-process only** — 无 Redis/ZeroMQ/MQTT，QMutex 保护共享状态
2. **Owner lifetime 管理** — QObject::destroyed() 自动退订
3. **Cross-thread marshaling** — publish() 从任何线程调用都安全
4. **push_only bypass** — WS streams 绕过 scheduler，不受 rate limit 影响
5. **Coalescing** — 刷新期间重复 request() 被 dedup

## Related
- [[fincept-terminal-architecture]]
- [[pubsub-pattern]]
