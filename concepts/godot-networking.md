---
title: Godot Networking & Multiplayer
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [game-engine, godot, networking, multiplayer]
sources: [raw/articles/godot-official-docs-2026.md]
---

# Godot Networking & Multiplayer

## Overview
Godot 提供层次化网络 API，从底层 TCP/UDP 到高级的场景复制系统。Godot 4.0 重新设计了多人游戏 API，引入了 `MultiplayerAPI` 和 `SceneReplication` 系统。

## Low-Level Networking
- `StreamPeerTCP` / `StreamPeerUDP` — 原始套接字
- `HTTPClient` — HTTP 请求
- `WebSocketPeer` — WebSocket 通信
- `ENetConnection` — ENet 可靠 UDP（推荐用于游戏网络）

## High-Level Multiplayer (Godot 4)

### MultiplayerPeer
网络的核心抽象。常见实现：
- `ENetMultiplayerPeer` — ENet 协议，大部分游戏默认选择
- `WebSocketMultiplayerPeer` — WebSocket，Web 平台
- `OfflineMultiplayerPeer` — 本地测试

### MultiplayerAPI
自动管理节点的网络属性同步。通过 SceneTree 的 `multiplayer` 属性访问。

### RPC (Remote Procedure Call)
用 `@rpc` 装饰器宣告函数可被远程调用：
```gdscript
@rpc("any_peer", "call_local", "reliable")
func update_position(pos: Vector3):
    position = pos
```

RPC 模式参数：
- 权限: `"authority"` (只能服务器调用) / `"any_peer"` (任何客户端)
- 同步范围: `"call_local"` (同时在本地执行) / `"call_remote"` (仅远程)
- 可靠性: `"reliable"` (可靠传输) / `"unreliable"` (快速但可能丢包) / `"unreliable_ordered"`

### Scene Replication
Godot 4 的核心多人游戏特性。通过 `MultiplayerSynchronizer` 节点：
- 将节点属性自动同步到所有对等端
- 支持滥出复制（匹配场景复制）
- 服务器权限管理

工作原理：
1. 服务器 `spawn` 场景实例，自动在客户端复制
2. `MultiplayerSynchronizer` 定期同步指定属性
3. 服务器 `despawn` 清理资源

### MultiplayerSpawner / MultiplayerSynchronizer
- `MultiplayerSpawner` — 管理场景实例的生成/消毁
- `MultiplayerSynchronizer` — 管理属性同步
- 两者结合实现完整的多人游戏循环

## Architecture Patterns

### Authority Pattern
- 服务器拥有绝对权限，客户端发起请求
- 客户端预测 + 服务器检验（Client Prediction + Server Reconciliation）
- 世界状态在服务器上独立更新，客户端显示

### Interest Management
- `VisibilityEnabler` / `VisibilityNotifier` 控制哪些节点需要同步
- 大世界场景中可优化带宽和性能

## Related
[[godot-4]] — 引擎概述
[[microverse-project]] — 使用多人游戏的项目案例
