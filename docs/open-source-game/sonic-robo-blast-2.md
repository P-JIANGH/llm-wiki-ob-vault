---
title: Sonic Robo Blast 2
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, sonic, doom-legacy, 3d, fangame]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Sonic Robo Blast 2

> 3D 索尼克主题同人游戏，基于修改版 Doom Legacy，融合经典平台跳跃与 3D 竞速。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitLab | https://git.do.srb2.org/STJr/SRB2 |
| 语言 | C（211 .c 文件 + 180 .h 文件，约 252K LOC） |
| 构建系统 | CMake 3.14+（src/ 子目录模块化） |
| 渲染/引擎 | Doom Legacy 分支，OpenGL 硬件渲染 + SDL2 软件渲染双模式 |
| 许可 | GPLv2 |
| 版本 | 2.2.16 (nightly) |

## 核心技术点

### Doom Legacy 血脉
- 源自 [Doom Legacy](http://doomlegacy.sourceforge.net/)，保留 Doom 的渲染架构（BSP 树、分区渲染）
- `src/r_main.c/h` — 渲染器主入口；`src/r_bsp.c` — BSP 树遍历；`src/r_segs.c/r_plane.c` — 线段/平面渲染
- `src/p_setup.c` (~8.7K LOC) — 关卡设置；`src/p_spec.c` (~9K LOC) — 特殊事件处理
- 继承了 Doom 的 WAD 资源打包格式（`src/w_wad.c`）

### 双渲染器架构
- **硬件渲染**（`src/hardware/`）：OpenGL 1.x/2.x，支持 MD2/MD3 模型（`hw_md2load.c/hw_md3load.c`）、光照、阴影
- **软件渲染**（`src/sdl/`）：SDL2 2D 渲染，适合低配置
- `hw_batching.c` — 硬件批次渲染；`hw_shaders.c` — GLSL Shader 管理

### 网络代码（独立子系统）
- `src/netcode/` 完整重写，包含专用服务器模式（`src/dedicated/`）
- `d_clisrv.c/h` — C/S 架构核心；`i_tcp.c` — TCP 传输层；`d_netfil.c` — 文件传输（地图/资产同步）
- Master Server 支持（`mserv.c`），通过 HTTP 与主服务器通信（`http-mserv.c`）
- TicCommand 帧同步（`tic_command.c/h`）
- 支持最多 8 人局域网/互联网多人

### Lua 脚本系统
- `src/deh_lua.c/h` — Lua 5.1 集成（blua 子目录）
- `lua_baselib.c` — 基础库；`lua_mobjlib.c` — 对象库；`lua_maplib.c` — 关卡库；`lua_playerlib.c` — 玩家库
- `lua_hudlib.c` — HUD 绘制 API；`lua_hooklib.c` — 钩子系统
- SOC（SONIC OCR）格式支持（`deh_soc.c`），允许社区扩展

### DEHACKED 扩展
- `src/dehacked.c/h` — Doom Extended DEHACKED 格式解析
- `src/deh_tables.c` — 大量表驱动数据（怪物行为、物品属性等）
- 支持 MODID 机制，联网时防止版本冲突

### 数学/物理系统
- `src/m_fixed.c/h` — 定点数运算（Doom 传统）
- `src/m_vector.c/h`、`src/matrix.c/h` — 3D 向量和矩阵
- `src/quaternion.c/h` — 四元数（支持 3D 旋转插值）
- `src/p_map.c` — 对象碰撞检测；`src/p_slopes.c` — 斜面物理

### 关键子系统
- `src/info.c` — **22K LOC**，游戏对象（MOBJ）定义表，最大单一文件
- `src/p_mobj.c` (~14.5K LOC) — 对象移动、状态机
- `src/p_user.c` (~13.3K LOC) — 玩家输入/控制
- `src/p_enemy.c` (~15K LOC) — AI 敌人行为
- `src/m_menu.c` (~14.4K LOC) — 菜单系统
- `src/t_facon.c` (~8.2K LOC) — 扇形（sector）角度计算

## 玩法特点

- **3D 平台跳跃**：索尼克宇宙的 3D 同人作，包含极速冲刺、环形跳跃、敌人战斗
- **多人模式**：支持 LAN/Internet 竞速和对抗
- **关卡编辑器**：内置关卡编辑，支持社区自制关卡
- **Sonic 宇宙元素**：Sonic、Tails、Knuckles 等经典角色及能力
- **Boss 战**：每个世界独特的 Boss 设计
- **收集要素**：混沌宝石、试炼令牌等

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎继承策略 | 基于成熟开源引擎（Doom Legacy）二次开发，保留核心渲染/物理，快速构建新产品 |
| 双渲染器设计 | 硬件渲染追求画质，软件渲染保证兼容性，同时维护成本需权衡 |
| Lua 脚本开放 | 游戏逻辑 Lua 化，使模组社区能扩展内容而不改核心代码 |
| 网络同步 | TicCommand 帧同步方案适合需要精确物理同步的竞技游戏 |
| DEHACKED 表驱动 | 大量游戏数据（怪物/道具/关卡）用表驱动而非硬编码，便于内容扩展 |
| 定点数数学 | 继承 Doom 的 fixed_t 定点数系统，保证跨平台 Deterministic 物理 |

## 项目结构概览

```
SRB2/
├── src/               # C 源码（252K LOC）
│   ├── netcode/       # 网络多人（含 dedicated/ 独立服务器）
│   ├── hardware/       # OpenGL 硬件渲染
│   ├── sdl/           # SDL2 软件渲染/平台抽象
│   ├── dedicated/     # 专用服务器入口
│   ├── lua_*.c        # Lua 脚本集成（10+ 文件）
│   ├── deh_*.c        # DEHACKED/SOC 解析
│   ├── p_*.c          # 物理/AI/关卡/玩家
│   ├── r_*.c          # 渲染管线
│   ├── m_*.c          # 菜单/数学/工具
│   └── g_game.c       # 游戏主循环（6K LOC）
├── libs/              # 第三方依赖（SDL2/curl/zlib/libopenmpt/miniupnpc）
├── assets/            # WAD 资产包
├── CMakeLists.txt     # CMake 构建
└── vcpkg.json        # vcpkg 依赖声明
```

## 相关页面

- [open-source-game/hypersomnia](#/open-source-game/hypersomnia) — 同样竞技向，同样无游戏引擎依赖
- [open-source-game/cube-2-sauerbraten](#/open-source-game/cube-2-sauerbraten) — CUBE Engine 系列 FPS
- [open-source-game/ddrace-network](#/) — C++/Rust 分层架构参考
