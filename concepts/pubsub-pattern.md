---
title: Pub/Sub Pattern
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, design-pattern, pubsub, qt6]
sources: []
---

# Pub/Sub Pattern

## Overview

发布/订阅模式是一种消息传递范式， publishers（发布者）和 subscribers（订阅者）通过 topic（主题）解耦。发布者不知道谁在订阅，订阅者不知道谁在发布。

## vs Other Patterns

| Pattern | 解耦方向 | 消息类型 |
|---------|---------|---------|
| Pub/Sub | 1:N（广播） | 数据状态 |
| Observer | 1:N | 事件/命令 |
| Message Queue | N:1+M | 命令/任务 |
| Event Bus | N:N | 事件 |

## Qt 中的实现

### Qt Signals/Slots
Qt 内置的观察者模式实现，signal 扮演 publisher，slot 扮演 subscriber。

```cpp
// 发布者
class Publisher : public QObject {
    Q_OBJECT
 signals:
    void dataChanged(const QString& data);
};

// 订阅者
class Subscriber : public QObject {
    Q_OBJECT
 public slots:
    void onDataChanged(const QString& data) { qDebug() << data; }
};

// 连接
connect(&publisher, &Publisher::dataChanged,
        &subscriber, &Subscriber::onDataChanged);
```

### DataHub 的实现

DataHub 在 signals/slots 基础上增加了:
1. **Topic 抽象** — 字符串 key 而非硬编码 signal
2. **订阅者生命周期管理** — QObject::destroyed() 自动退订
3. **缓存** — 每个 topic 缓存最新值，新订阅者立即收到
4. **调度器** — 按 TTL 和 rate limit 自动刷新
5. **跨线程安全** — QueuedConnection 自动 marshaling

## 优点
- 最小化耦合
- 动态订阅/退订
- 广播到多个消费者
- 缓存减少重复请求

## 缺点
- 订阅者不知道消息是否/何时被处理
- 调试困难（消息流不直观）
- 需要注意循环订阅导致的消息震荡

## Related
- [[datahub-architecture]]
