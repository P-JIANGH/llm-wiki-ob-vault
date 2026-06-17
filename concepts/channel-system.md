---
title: channel-system
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [agent, architecture, plugin]
sources: [raw/articles/nanobot-readme-2026.md]
---

# Channel System（渠道系统）

Channel System 是一种将多聊天平台接入与核心 Agent 逻辑解耦的架构模式。所有渠道通过统一 Message Bus 与核心通信，核心 Agent 不感知具体渠道细节。

## 核心思想

```
[Telegram] ─┐
[Discord]  ─┼─→ InboundMessage ─→ [AgentLoop] ─→ OutboundMessage ─→ [Telegram]
[Feishu]  ─┤                      ↑                                   │
[QQ]      ─┤                      └── MessageBus（统一消息总线）─────────┘
  ...     ─┘
```

- **InboundMessage**：channel / sender_id / chat_id / content / media / metadata / session_key
- **OutboundMessage**：channel / chat_id / content / reply_to / media / metadata

## nanobot 的实现

位于 `nanobot/channels/`。

### 支持的渠道（13个）

Telegram / Discord / WhatsApp / WeChat (Weixin) / Feishu / DingTalk / Slack / Matrix / Email / QQ / Wecom / Mochat / WebSocket

### 插件化接入

新增渠道只需实现 `ChannelPlugin` 接口：
1. 实现 `login()`（QR 扫码 / OAuth 等认证）
2. 实现 `send_message()` / `recv_message()`（消息收发）
3. 在 `channels/registry.py` 注册

核心逻辑（`AgentLoop`）只依赖 `InboundMessage` / `OutboundMessage` 数据类，完全不知道具体是哪个渠道。

### nanobot gateway

```bash
nanobot gateway  # 启动所有已配置渠道的网关
```

## 与 Provider Registry 的类比

| 维度 | Provider Registry | Channel System |
|------|------------------|----------------|
| 目标 | 插拔 LLM 后端 | 插拔聊天平台 |
| 注册方式 | `ProviderSpec` 元组 | `ChannelPlugin` 类 |
| 解耦方式 | `backend` 字段路由实现 | 数据类接口抽象 |
| 配置文件 | `providers.*` | `channels.*` |

## 相关概念

- [[nanobot]] — channel-system 的具体实现
- [[agent-loop]] — Message Bus 的调用方
- [[provider-registry]] — 同一插拔思想的 LLM 层实现
