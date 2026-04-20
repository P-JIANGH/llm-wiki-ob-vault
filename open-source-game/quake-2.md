---
title: Quake 2
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, id-software]
sources: []
---

# Quake 2

> id Software 经典 3D FPS 源码，1997 年 GPL 开源，双渲染器架构（OpenGL + Software），143K LOC C 代码

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/Quake-2 |
| 语言 | C / C++ |
| 代码量 | ~143,330 行 C/C++（231 个文件） |
| 构建系统 | makefile / Visual C++ 6 (dsw/dsp) |
| 渲染器 | ref_gl (OpenGL) + ref_soft (Software) |
| 许可 | GPLv2 |
| 版本 | 3.19 (最终版) |

## 核心技术点

### 双渲染器架构
Quake 2 采用 **ref_soft**（软件渲染）和 **ref_gl**（OpenGL）双渲染器并行架构，与 Quake 1 代相同模式：
- `ref_soft/`: 继承自 DOS 时代软件渲染，R_Polyse 等核心多边形绘制
- `ref_gl/`: OpenGL 1.0 硬件加速渲染，GLQuake 风格实现
- `null/`: 空渲染器（无输出，用于服务器端）
- 两个渲染器共享 `qcommon/` 底层代码

### BSP + PVS 可见性渲染
- `cmodel.c`: BSP 几何计算（Collision Model）
- `qfiles.h`: Quake 2 关卡文件格式（.bsp）
- PVS (Potential Visibility Set) 裁剪优化

### 模块化游戏逻辑
- `game/`: 游戏逻辑 DLL（g_*.c），与引擎解耦
- `server/`: 网络同步逻辑（sv_*.c）
- `client/`: 客户端逻辑（cl_*.c，含菜单.menu.c）
- `qcommon/`: 公共基础设施（cmd/cvar/files/net）

### 平台支持
- `win32/`: Windows OpenGL (qgl_win.c)
- `linux/`: Linux OpenGL (qgl_linux.c)
- `irix/`: IRIX OpenGL (qgl_irix.c)
- `solaris/`, `rhapsody/`: 其他平台

### CTF 支持
- `ctf/`: Capture The Flag 模组代码

## 玩法特点

- 1997 年id Software 商业游戏
- 3.18/3.19 为最终版本
- 依赖原始 Quake 2 游戏数据文件运行
- 完全开源的游戏引擎（需配合原版数据）

## 与 Quake 1 的区别

| 维度 | Quake | Quake 2 |
|------|-------|---------|
| 发布时间 | 1996 | 1997 |
| 渲染架构 | BSP Tree | BSP + PVS (相似) |
| 游戏逻辑 | 内嵌 | DLL 动态加载 |
| 网络代码 | 原始 UDP | 改进的 UDP |
| 扩展性 | 有限 | CTF/Mod 友好 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 双渲染器架构 | 可分离渲染/模拟逻辑，适配不同硬件 |
| 游戏逻辑 DLL 化 | AI 游戏逻辑热重载的基础 |
| BSP 几何裁剪 | 复杂 3D 场景优化经典方案 |
| 模块化 client/server | 分布式 AI agent 网络同步模型 |

## 相关链接

- [[open-source-game/quake]] — Quake 1 (1996)
- [[open-source-game/doom]] — Doom (1997)
- [[open-source-game/doom-3-bfg]] — Doom 3 / id Tech 4
- `open-source-game/quake-3-arena` — Quake 3 Arena (2001)
