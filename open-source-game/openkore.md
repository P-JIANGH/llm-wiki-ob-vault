---
title: OpenKore
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, automation, mmo, ragnarok-online]
sources: []
---

# OpenKore

> Ragnarok Online 自动化助手 — Perl 编写的开源机器人客户端

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenKore/openkore |
| 语言 | Perl (核心) + C (XS/XSTools 扩展) |
| 构建系统 | SCons (scons-local-3.1.2) |
| 许可 | GPLv2 |
| 平台 | Linux / Windows / macOS |
| 首次发布 | 2005 年 |

## 核心技术点

### 三模式服务器连接架构

OpenKore 支持三种运行模式连接 Ragnarok Online 服务器：

- **XKore** — 官方客户端辅助模式：作为官方客户端的插件运行，拦截/发送游戏数据包
- **XKore 2** — 直连模式：不依赖官方客户端，直接与服务器建立连接（`src/Network/XKore2/`）
- **XKoreProxy** — 代理服务器模式：作为中间人代理运行（`src/Network/XKoreProxy/`）

### Task 驱动的 AI 系统

`src/Task/` 目录实现了基于任务的 AI 架构：
- `Task.pm` — 任务基类（Chained.pm 链式任务）
- `MapRoute.pm / CalcMapRoute.pm` — A* 寻路算法，自动寻路
- `FollowActor.pm` — 跟随其他玩家
- `TalkNPC.pm` — NPC 对话交互
- `Teleport/` — 传送技能管理

### XS/C 性能扩展 (XSTools)

`src/auto/XSTools/` 包含 C 语言编写的高性能扩展模块，处理：
- 压缩数据解压（Compress::Zlib）
- 高速网络封包处理
- 敏感操作的 native 实现

### 数据驱动的配置系统

`control/` 目录包含纯文本配置文件，完全数据驱动：
- `config.txt` — 角色配置（服务器/账号/密码/AI 参数）
- `mon_control.txt` —怪物击杀优先级控制
- `pickupitems.txt` — 自动拾取物品规则
- `routeweights.txt` — 寻路权重配置
- `timeouts.txt` — 超时配置
- `sys.txt` — 系统级配置

### 插件系统

`plugins/` 目录支持扩展，所有插件独立子目录：
- `eventMacro` — 事件宏引擎
- `checkAggressive` — 主动攻击检测
- `breakTime` — 定时休息
- `edenPortalExitSync` — 伊登传送门同步
- `customCaption` — UI 自定义

### 网络封包处理

`src/Network/` 架构：
- `MessageTokenizer.pm` — 封包分词
- `PacketParser.pm` — 封包解析
- `Receive.pm / Send.pm` — 收/发包处理
- `Receive/` 和 `Send/` 子目录按封包 ID 分离处理逻辑
- `PaddedPackets.pm` — 协议版本差异处理

## 玩法特点

- **全自动农场**：配置后自动打怪、捡物、卖货、存仓
- **宏脚本系统**：eventMacro 事件驱动脚本语言
- **插件生态**：社区贡献的大量插件（任务助手、交易机器人、地图导航增强）
- **服务器兼容性层**：`tables/` 目录存储各服务器特定数据（怪物数据/掉落率/技能表）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| AI 行为树设计 | Task 链式架构可用于 NPC AI 行为编排 |
| 数据驱动配置 | txt 配置分离代码与逻辑，mod 友好 |
| 多模式架构 | XKore 1/2/Proxy 三模式设计值得借鉴 |
| 插件系统 | 插件沙箱隔离+生命周期管理 |
| 网络同步 | 封包 ID 分文件管理，数据驱动协议差异 |

## 架构图

```
openkore/
├── src/                   # 核心 Perl 模块
│   ├── Network/           # 网络层（XKore/XKore2/XKoreProxy）
│   ├── Task/              # 任务 AI（寻路/NPC/跟随/传送）
│   ├── auto/XSTools/      # C 语言性能扩展
│   └── Actor/             # 游戏实体（玩家/怪物/NPC）
├── control/               # txt 数据驱动配置
├── plugins/               # 插件扩展
├── tables/                # 服务器特定数据
└── fields/                # 地图数据
```
