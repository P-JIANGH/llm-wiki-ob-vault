---
title: Hurry Curry!
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, multiplayer, cooperative, godot, rust]
sources: [https://codeberg.org/hurrycurry/hurrycurry]
---

# Hurry Curry!

> 合作式 3D 多人烹饪游戏，支持客户端预测和服务端校验

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://codeberg.org/hurrycurry/hurrycurry |
| 语言 | Rust (server) + GDScript (client) + TypeScript (test-client) |
| 构建系统 | Make + Cargo (Rust) + Godot 4.5 |
| 渲染/引擎 | Godot 4.5 (客户端), Rust (服务端) |
| 许可 | AGPL-3.0-only |
| 平台 | 跨平台 (Linux/Mac/Win, Web export) |

## 核心技术点

### 混合引擎架构
- **客户端**: Godot 4.5 GDScript，导出多平台（Desktop/Mobile/Web）
- **服务端**: Rust Cargo 工作空间（16+ crates），高性能网络和游戏逻辑
- **测试客户端**: TypeScript + Rust，支持协议验证和 bot 测试

### 服务端分层架构
```
Packet Processing Layers:
├── Networking: WebSocket 连接，验证 packet 发送者
├── Server: 游戏管理（加载/卸载/暂停/投票/超时）
├── GameSim: 每局逻辑（交互/bot/实体）
└── GameCore: 游戏状态和共享逻辑（移动/消息超时）
```

### 网络协议
- **通信方式**: JSON over WebSocket (TLS on 443, plain on 27032)
- **客户端预测**: 移动在服务端校验，但客户端预测以降低延迟
- **心跳**: 每 1000ms 发送 `keepalive`
- **协议版本**: SemVer 语义化版本，init packet 携带版本号

### 三重实现的移动系统
移动逻辑在三个地方实现以保证一致性：
1. **GDScript** (Godot 客户端): `controllable_player.gd`
2. **Rust** (服务端和 standalone bots): `server/protocol/src/movement.rs`
3. **TypeScript** (test-client): `test-client/movement.ts`

### 数据驱动内容
- **地图格式**: YAML 定义的 ASCII-art 地图，带属性查找表
- **配方系统**: YAML 配方定义，支持 JS 脚本生成变体
- **实体系统**: YAML 声明式实体（顾客/传送门/环境效果等）

## 玩法特点

- **合作烹饪**: 多名玩家同时在厨房中分工合作
- **顾客系统**: 顾客生成、点餐、评分完整流程
- **地图编辑器**: 内置 Godot 地图编辑器
- ** Bot 支持**: Rust 实现的 AI bot，可作为独立程序运行
- **回放系统**: replaytool 和 replay 模块支持回放功能
- **国际化**: Weblate 翻译系统

## 服务端网络端口

| 端口 | 用途 |
|------|------|
| 443 | TLS 加密 (所有服务) |
| 27032 | 游戏服务器 WebSocket |
| 27033 | Registry API / 本地发现服务 |
| 27034 | 大厅服务器 WebSocket |
| 27035 | 地图编辑器服务器 WebSocket |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多人合作 | 客户端预测 + 服务端校验模式，可用于 AI 队友同步 |
| 协议设计 | JSON over WebSocket + SemVer 版本管理，简单实用的网络协议设计 |
| 混合技术栈 | Godot + Rust 的分离架构，前端表现 + 后端逻辑解耦 |
| 数据驱动 | YAML 地图/配方系统，运行时热加载内容 |
| Bot AI | Rust 实现的游戏 AI，可作为 [[open-source-game/corsixth]] 的 Lua AI 对照 |

## 目录结构

```
hurrycurry/
├── client/          # Godot 4.5 GDScript 客户端
├── server/          # Rust Cargo 工作空间
│   ├── game-core/   # 核心游戏状态
│   ├── game-sim/   # 游戏模拟逻辑
│   ├── protocol/   # 网络协议定义
│   ├── bot/        # AI bot 实现
│   └── replay/     # 回放系统
├── data/            # YAML 地图和配方数据
├── test-client/     # TypeScript 测试客户端
├── locale/          # 国际化翻译
└── makefile         # 顶层构建系统
```
