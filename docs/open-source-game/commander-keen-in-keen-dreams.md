---
title: Commander Keen in Keen Dreams
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, id-software, reverse-engineering]
sources: [https://github.com/keendreams/keen]
---

# Commander Keen in Keen Dreams

> Commander Keen 系列第四部（Episode 4），Id Software 1991 年作品，2014 年通过众筹开源。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/keendreams/keen |
| 语言 | C + 汇编（80x86） |
| 构建系统 | Borland C++ 2.0 + Turbo Assembler，原生 `.prj` 项目文件 |
| 渲染/引擎 | VGA 13h 模式（320x200 256色）+ 自定义软件渲染 |
| 许可 | GPLv2+ |
| 发布 | 2014 年众筹发布源码（Javier M. Chavez + Chuck Naaden 主导） |

## 核心技术点

### id Software 经典引擎架构

与同期 Doom/Quake 前身（Wolfenstein 3D 引擎）共享相同架构模式：

| 模块 | 文件 | 职责 |
|------|------|------|
| `id_vw.*` | 1,408 行 | View/渲染子系统，VGA 13h 图形模式管理 |
| `id_rf.*` | 2,355 行 | Render Frame，Tile/精灵绘制核心 |
| `id_ca.*` | 1,846 行 | Cache/Episode 管理，图形资源加载 |
| `id_sd.*` | 1,742 行 | Sound，音乐与音效播放 |
| `id_in.*` | 1,110 行 | Input，输入设备轮询（键盘/游戏手柄） |
| `id_us.*` | 3,707 行 | User Interface，文字渲染/对话框 |
| `id_mm.*` | 788 行 | Memory Management，DOS 内存分配 |
| `id_mm.c` | ~7K LOC | 内存管理（复用模式）|

### 游戏逻辑模块

| 模块 | 文件 | 职责 |
|------|------|------|
| `kd_main.c` | 533 行 | 主循环、初始化、游戏状态机 |
| `kd_keen.c` | 2,528 行 | Keen 角色核心行为（移动、跳跃、碰撞） |
| `kd_play.c` | 1,928 行 | 游戏玩法控制、关卡逻辑 |
| `kd_act1.c` | 1,130 行 | 敌人行为 AI（第一部分） |
| `kd_act2.c` | 1,509 行 | 敌人行为 AI（第二部分） |
| `kd_demo.c` | 545 行 | Demo 录制/播放系统 |

### 静态数据编译

`static/` 目录包含预编译的二进制资产，通过 `make.bat` + `makeobj.c` 工具链编译进可执行文件：

- `EGADICT.KDR` / `CGAHEAD.KDR` — 图形字典（压缩的图块数据）
- `MAPHEAD.KDR` / `MAPDICT.KDR` — 地图数据
- `AUDIO*.KDR` — 音频数据
- `GAMETEXT.KDR` — 游戏文本（对话/UI）
- `STORY.KDR` — 剧情文本

### LZHUF 压缩

`lzhuf.c`（1,068 行）实现 LZH 压缩算法，用于压缩所有静态游戏数据，与 id Software 其他作品（如 Doom 的 WAD）采用相同数据打包策略。

### 多版本条件编译

通过 `GRMODE` 常量（`id_heads.h`）切换 EGA/CGA 图形模式，各版本（1.00~1.93 shareware/registered/CGA）通过不同 `*.KDR` 静态文件支持。

## 玩法特点

- **平台动作**：2D 横版跳跃，通过 13 个关卡对抗"Shikadi"外星入侵者
- **Kinetic Engine**：Keen 标志性"蹦跳"移动（Pogo Hopping）
- **Boss 战**：每个世界关底有一个 Boss
- **收集物品**：Ray Guns、Keen Cards、Vital Chi 等

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 软件渲染架构 | 在现代硬件复刻经典软件渲染器，理解 GPU 之前的游戏如何绘制像素 |
| 模块化游戏逻辑 | `kd_act*.c` 将敌人 AI 与渲染/输入分离的设计模式值得参考 |
| 资源打包 | LZHUF 压缩 + 预编译静态数据的打包方案，早于 WAD 格式的雏形 |
| 数据驱动 | `static/*.KDR` 外部化数据文件的思路，与现代游戏资产管线相通 |
| 众筹开源 | 2014 年通过众筹让 1991 年商业游戏源码开源的案例（对比 DOOM/Wolfenstein 源码更早开源）|

## 关联项目

- [open-source-game/commander-genius](#/open-source-game/commander-genius) — Commander Keen 1-6 开源解释器（C++ 完全重写）
- [open-source-game/omnispeak](#/open-source-game/omnispeak) — Keen Goodbye Galaxy 重实现
- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
