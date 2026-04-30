---
title: Duke Nukem 3D
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, build-engine, dos, reverse-engineering]
sources: []
---

# Duke Nukem 3D

> 3D Realms 经典 FPS 游戏源码，Ken Silverman Build Engine 驱动的 1996 年招牌作品，2003 年 GPLv2 开源

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/videogamepreservation/dukenukem3d |
| 原始开发商 | 3D Realms (Apogee Software) |
| 源码发布 | 2003-04-01（Charlie Wiederhold 整理） |
| 语言 | C（主体）+ 少量汇编 |
| 构建系统 | Watcom C/C++（Open Watcom 可免费编译） |
| 渲染引擎 | Ken Silverman's Build Engine（含预编译 .OBJ） |
| 许可 | GPLv2（源码）/ 3D Realms 保留游戏数据版权 |

## 核心技术点

### Build Engine 架构

Duke Nukem 3D 构建于 Ken Silverman 的 Build Engine（KenBuild）之上，这是同时期比 id Tech 1（BSP 树）更灵活的 sector-portal 渲染引擎：

- **Sector/Portal 模型**：世界由最多 1024 个 sector（区域）和 8192 面墙构成，portal 连接实现层叠空间
- **MAXSPRITES 4096**：单关卡最多 4096 个精灵实体
- **预编译引擎**：build engine 以预编译 .OBJ 形式提供（`ENGINE.OBJ`），而非源码分发；完整 Build Engine 源码需单独从 Ken Silverman 网站获取
- **分辨率支持**：从 320×200 到 1600×1200，动态视频模式切换

### 游戏逻辑模块化

| 文件 | 职责 |
|------|------|
| `GAME.C` | 主循环、版本判断、DEMO 录制/回放、初始化 |
| `ACTORS.C` | 角色 AI、碰撞检测、游戏对象行为 |
| `PLAYER.C` | 玩家输入处理、运动逻辑 |
| `SECTOR.C` | Sector 事件（电梯、门、陷阱等） |
| `PREMAP.C` | 关卡加载前的初始化逻辑 |
| `MENUES.C` | 菜单系统 UI |
| `CONFIG.C` | 配置文件读/写（.CFG） |
| `MULTI.C` / `MMULTI.C` | 多人网络（IPX 原始包交换） |

### 音频系统

- **Jim Dose 音频库**（`audiolib/`）：同样用于 Rise of the Triad，包含 GUS（Gravis UltraSound）支持
- `FX_MAN.H` 音效管理器 + `MUSIC.H` MIDI 音乐接口
- `RTS.C`：运行时音效合成系统（Run-Time Sound）

### 网络与演示

- 原始版本支持 16 玩家（MAXPLAYERS=16）
- 底层使用原始 IPX 包交换（`d_net.c` 风格），现代系统需模拟层
- DEMO 录制系统：`firstdemofile[]`，原始 .DMO 文件与新版不兼容

### 移植注意事项

- 原始编译目标：**DOS 32-bit** + DOS/4GW extender
- **Open Watcom 1.0/11.0c** 可免费编译，官方推荐
- 游戏数据（.GRP/.DAT）与源码分离，需持有原版 Duke 3D 1.5 才可合法运行
- 声音系统对现代系统兼容性差（与原版 DOS 行为一致）
- CTW 注释标记（`// CTW`）：Charlie Wiederhold 的所有修改用此标记

## 玩法特点

- **3D Realms 招牌 FPS**：美式幽默台词、关卡编辑器（BUILD）、MOD 支持
- **Atomic Edition（1.5）**：最终发行版，包含完整战役和多玩家模式
- **可玩数据分离**：源码 + 原版数据文件 = 可运行游戏（与 Chocolate Doom 哲学相似）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **引擎/游戏数据分离** | 预编译引擎 .OBJ + 游戏逻辑源码的架构模式，可用于模块化解耦 |
| **Sector-Portal 渲染** | 比 BSP 更适合动态关卡改造，适合 AI 生成关卡的运行时编辑 |
| **数据驱动游戏设计** | sector 事件系统（电梯/门/陷阱）完全由数据触发，与 AI 游戏任务系统相似 |
| **多游戏共用引擎** | Build Engine 同时驱动 Duke Nukem 3D / Shadow Warrior / Blood，引擎可配置化思路值得借鉴 |
| **历史代码维护** | 2003 年整理 1996 年代码并保持可编译性，大型项目长周期维护参考 |

## 相关页面

- [[duke-nukem-3d]]（本页）
- [[ecwolf]] — 同为 Build Engine 驱动游戏（Wolfenstein 3D）
- [[open-source-games-list]] — 开源游戏总览

