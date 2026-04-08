---
title: Wolfenstein 3D (id Software)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, raycasting, id-software, retro, dos]
sources: [https://github.com/id-Software/wolf3d]
---

# Wolfenstein 3D (id Software)

> id Software 1992年经典 FPS 的原始源代码发布 — DOS 16位雷克萨斯 + 汇编混合架构

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/wolf3d |
| 发布日期 | 2012年2月6日（原始代码 1992年） |
| 语言 | C (Borland C++ 3.0/3.1) + 80x86 汇编 |
| 渲染技术 | Raycasting（光线投射）|
| 平台 | DOS (16位) |
| 许可 | Limited Use Software License（教育用途） |
| 仓库大小 | 1084 KB |
| 源码文件数 | 113个 |
| 提交数 | 3次（极简维护） |

## 源码结构

```
wolf3d/
├── WOLFSRC/           # 源代码主目录
│   ├── WL_DEF.H       # 全局定义、宏、枚举、常量
│   ├── WL_MAIN.C      # 主循环、入口点
│   ├── WL_INTER.C     # 中断处理
│   ├── WL_STATE.C     # 游戏状态机
│   ├── WL_AGENT.C     # 玩家/AI代理
│   ├── WL_PLAY.C      # 玩家控制
│   ├── WL_GAME.C      # 游戏逻辑
│   ├── WL_DRAW.C      # 渲染绘制
│   ├── WL_RENDER.C    # 渲染器（raycasting）
│   ├── WL_SCALE.C     # 动态编译缩放（16位优化）
│   ├── WL_MENU.C      # 菜单系统
│   ├── WL_TEXT.C      # 文本渲染
│   ├── WL_ACT1.C      # 实体行为 (part 1)
│   ├── WL_ACT2.C      # 实体行为 (part 2)
│   ├── WL_ACT3.C      # 实体行为 (part 3)
│   ├── WL_BSPRITE.C   # Billboarding sprite 渲染
│   ├── WL_DEBUG.C     # 调试功能
│   ├── WL_FLOOR.C     # 地板/天花板渲染
│   ├── WL_IPL.C       # IPL (inter-plane) 处理
│   ├── WL_MISC.C      # 杂项
│   └── [ID/]          # 公共头文件
├── ID/                # 共享头文件
├── DEICE.EXE          # 自解压安装程序（DOS时代多磁盘分发）
├── README.rst         # John Carmack 技术点评
├── WOLFSRC.DAT        # 资源数据
└── INSTALL.BAT        # 安装脚本
```

## 核心技术点

### Raycasting 渲染架构

Wolfenstein 3D 使用 **DDA (Digital Differential Analysis) raycasting**，而非 Doom 的 BSP 树。这是 1992 年早期 3D 渲染的标志性技术：

- 每帧对 320 列像素投射射线
- 检测射线与地图墙的交点，计算距离
- 根据距离缩放墙面纹理（`WL_SCALE.C` 动态编译缩放）
- 地板/天花板为实体颜色填充（非纹理）

John Carmack 点评：
> "The ray casting refresh architecture is still reasonably appropriate for the game. A BSP based texture mapper could go faster, but ray casting was a lot simpler to do at the time."

### 动态编译缩放 (Dynamically Compiled Scaling)

`WL_SCALE.C` 包含针对 **uncached machines** 优化的动态生成缩放代码。在现代处理器上反而成为性能瓶颈（code cache thrashing）。16位 DOS 时代的黑科技。

### 16位 DOS 架构

- **Big real mode** (80286+ protected mode subset)
- 汇编内联：`COLORBORDER()` 宏直接操作 VGA registers
- `farmapylookup[]` 预计算查找表优化 64x64 地图访问
- `GLOBAL1 = 1l<<16` 定点数系统处理非整数运算

### 实体/AI 系统

- `MAXACTORS 150` — 每图最大敌人数量
- `SPR_*` 枚举 — 100+ 帧动画状态（站立、行走、攻击、死亡）
- 守卫(Guard)、狗(Dog) 等敌人类型，每种有独立 AI 状态机
- FL_SHOOTABLE, FL_BONUS, FL_ATTACKMODE 等 flag 系统

### John Carmack 代码点评（2012年）

> "The dynamically compiled scaling routines are now a Bad Thing. On uncached machines they are the fastest possible way to scale walls, but on modern processors you just wind up thrashing the code cash."
>
> "The whole page manager caching scheme is unnecessarily complex."
>
> "Way too many #ifdefs in the code!"

## 与 Doom 的架构对比

| 维度 | Wolfenstein 3D | Doom |
|------|---------------|------|
| 渲染 | DDA Raycasting | BSP 树 + portal |
| 空间划分 | 2D 网格 | 3D BSP |
| 关卡格式 | 64x64 map | BSP nodes |
| 网络 | IPX raw packets | 简化 UDP |
| 发布时间 | 1992 | 1993 |

Wolfenstein 3D 的 raycasting → Doom 的 BSP tree 是 id Software 渲染技术的关键演进。

## 现代_SOURCE PORTS

原始源码本身无法在现代系统编译，但衍生出多个活跃端口：

- **ECWolf** — 现代端口，支持 Wolfenstein 3D + Spear of Destiny
- **Wolf4SDL** — SDL 移植版本
- **Blade of Agony** — 基于 ECWolf 的商业同人作

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Raycasting 基础 | 理解早期 3D 渲染原理，适合作为游戏引擎入门 |
| 定点数系统 | `GLOBAL1<<16` 定点算法处理非整数坐标 |
| 查找表优化 | `farmapylookup[]` 预计算避免运行时除法 |
| 状态机设计 | 敌人 AI 的 `FL_*` flag + 帧动画枚举模式 |
| 数据驱动 | `#ifdef SPEAR` 宏处理多游戏变体 |
| 历史价值 | id Software 技术演进链：Wolfenstein → Doom → Quake |

## 关键文件速查

- 渲染核心：`WL_RENDER.C` + `WL_SCALE.C`
- 游戏循环：`WL_MAIN.C` + `WL_GAME.C`
- AI/实体：`WL_ACT1/2/3.C` + `WL_STATE.C`
- 定义常量：`WL_DEF.H` (28KB 巨型头文件)
- John Carmack 点评：`README.rst`
