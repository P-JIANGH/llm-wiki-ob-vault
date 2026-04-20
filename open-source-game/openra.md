---
title: OpenRA
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts]
sources: []
---

# OpenRA

> C# RTS 引擎，复刻 Westwood 经典（C&C/红警/沙丘2000），.NET 8 + SDL2 + OpenGL，GPL-3.0，16.6k stars

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenRA/OpenRA |
| 语言 | C# (.NET 8) |
| 构建系统 | dotnet + PowerShell makefile |
| 渲染/引擎 | SDL2 + OpenGL（via OpenRA.Platforms.Default） |
| 音频 | OpenAL |
| 脚本 | Lua 5.1（游戏规则/AI） |
| 许可 | GPL-3.0 |
| Stars | 16.6k |
| Commits | 30,785+ |

## 核心技术点

### 模块化架构（5 大 Assembly）

```
OpenRA.Game/          — 核心引擎：World/Order/UnitOrder 系统
OpenRA.Mods.Cnc/      — Command & Conquer: Tiberian Dawn mod
OpenRA.Mods.Common/   — 三游戏共用规则/行为（红警/沙漠/沙丘）
OpenRA.Mods.D2k/      — Dune 2000 mod
OpenRA.Platforms.Default/ — 平台层：Graphics/Audio/Input 后端
OpenRA.Server/        — Headless 多人游戏服务器
OpenRA.Utility/       — 命令行工具（地图编辑器/资源打包）
```

### Order System（网络同步核心）

OpenRA 的网络同步采用 **Order 驱动模型**：
- `OrderManager` 追踪所有同步状态
- `Order` 是玩家操作的最小单元（移动/攻击/建造等）
- 服务端验证并广播 Order，客户端执行确定性模拟
- 支持 Replay 录制（`StartRecording`）
- 类似 [[open-source-game/openttd]] 的确定性锁步，但用 C# ref 关键字和强类型 Order 表达

### 双层渲染架构

- `OpenRA.Game/Graphics/` — 引擎层：Sprite/Animation/Sheet/Shader 管理
- `OpenRA.Platforms.Default/` — 平台层：OpenGL 渲染器 + OpenAL 音频
- 角色动画 `Animation.cs` 支持多帧序列、镜像、亮度变换
- 地图渲染支持 isometric（菱形网格）和正常网格

### Mod 系统（YAML 规则）

- 游戏内容（单位/建筑/规则）完全由 YAML 定义
- `OpenRA.Mods.Common/` 提供跨游戏共用逻辑
- 每代游戏（cnc/ra/d2k）独立 Mod Assembly，共享 `Rules` 加载器
- 地图编辑器内置游戏中，支持 tile 笔刷、区域编辑、资源放置

### 服务器/客户端分离

- `OpenRA.Server/` — Headless 服务器，无需图形运行
- `OpenRA.Game/` — 客户端主程序
- 服务器处理 Order 验证和广播，客户端负责渲染和本地模拟
- 支持 IPv4/IPv6，密码保护房间

## 玩法特点

- 三个官方 Mod：Tiberian Dawn（命令与征服）、Red Alert（红色警戒）、Dune 2000（沙丘2000）
- 完整战役可玩（EA 授权原始 assets 需自行提供）
- 内置最低 assets 包可下载（简化版，不含原始过场动画）
- 支持局域网和公开服务器匹配
- 地图编辑器内置，支持多人协作编辑

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **C# 游戏架构** | .NET 8 生态成熟，适合快速开发；OpenRA 用 C# 实现高性能 RTS 可行 |
| **Order 驱动的网络同步** | 确定性 Order 模型适合 AI vs AI 对战平台；[[open-source-game/openttd]] 对比：两者都用 Order/锁步，但 OpenRA 用强类型 C# 而非 Lua |
| **Mod 化游戏架构** | YAML 规则 + Assembly 模块分离 = 内容与引擎解耦；适合让 AI 脚本控制规则变更 |
| **OpenRA + `open-source-game/wesnoth`** | 两者都是 GPL RTS，但 OpenRA 更接近商业原作体验；适合公司复刻西方经典 RTS |
| **Replay 系统** | Order + 时间戳文件名 = 完整回放；可用于 AI 对局记录和复盘分析 |

## 相关

- [[open-source-game/openttd]] — 另一个经典 RTS 开源复刻（运输大亨），C++ 确定性锁步网络
- `open-source-game/wesnoth` — 高奇幻回合制策略，YAML 规则驱动
- [[open-source-game/openrct2]] — 另一个 C# SDL 引擎（RCT2），OpenRA 同语言参考
