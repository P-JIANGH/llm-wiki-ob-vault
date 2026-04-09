---
title: Doom (id Software)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, retro, id-tech, shooter]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Doom (id Software)

> John Carmack 1997年开源的经典 FPS 源码，BSP 树渲染架构，GPLv2 许可。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/DOOM |
| 语言 | C（~54K LOC） |
| 构建系统 | GCC Makefile（Linux X11） |
| 渲染技术 | BSP 树渲染，水平/垂直线扫描，固定光照 |
| 许可 | GNU General Public License 2.0 |
| 发布时间 | 1997-12-23（Carmack 源码注释） |

## 核心技术点

### BSP 树渲染架构
- **渲染流程**：BSP 树用于渲染排序，先绘制墙壁→地板→天花板→sprites
- **问题**：视线检测（line of sight）也用 BSP，但本可更简单
- **Carmack 反思**：建议合并为 single front-to-back walk，应将地板/天花板当多边形处理而非墙间缝隙

### 模块化子系统

| 前缀 | 模块 | 职责 |
|------|------|------|
| `d_*` | Doom Main | 初始化、网络、物品定义 |
| `g_game` | Game Loop | 主循环、TIC 命令处理 |
| `p_*` | Play | 敌人AI（p_enemy）、地图检测（p_map）、玩家控制（p_user）、关卡加载（p_setup）、特殊元素（p_doors/p_plats/p_ceilng） |
| `r_*` | Render | BSP（r_bsp）、多边形（r_plane/r_segs）、天空（r_sky）、sprite渲染（r_things） |
| `s_*` | Sound | 声音系统 |
| `hu_*` | HUD | 抬头显示、状态条 |
| `am_*` | AutoMap | 自动地图 |
| `w_*` | WAD | WAD 资源文件读写 |
| `i_*` | I/O | 平台抽象（i_video/i_sound/i_net/i_system），含 DOS/X11/IBM/UNIX 多平台 |
| `m_*` | Menu/Misc | 菜单系统、工具函数 |

### 网络同步
- `d_net.c` — 包交换网络（原始 IPX 风格）
- `i_net.c` — 平台网络抽象
- 支持 TCP/IP 多人游戏

### 数据驱动
- WAD 文件包含所有游戏资源（纹理、地图、怪物数据）
- `info.c` — 128K+，定义所有怪物/物品属性表（状态机、动画帧、血量等）
- `d_items.c` — 物品定义

## 玩法特点
- 经典 FPS：枪械、弹药、钥匙卡、解谜
- 3集24关战役（E1M1-E3M9）
- 9种武器（霰弹枪链锯火箭等）
- 多种敌人类型（怪物AI状态机驱动）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| BSP 渲染 | BSP 树不仅用于渲染还可用于碰撞检测，优化思路值得借鉴 |
| 确定性游戏循环 | 每帧固定逻辑，无浮点随机性，便于网络同步和回放录制 |
| 数据驱动设计 | info.c 状态机表格驱动怪物行为，易于扩展新类型 |
| 平台抽象层 | i_* 分离平台代码，便于移植（当前已有 DOS/X11/IBM/UNIX） |
| WAD 资源打包 | 资源与代码分离，mod 友好架构 |

## 关键源码文件

```
linuxdoom-1.10/
├── d_main.c      # 入口点，WAD 加载，战役初始化
├── g_game.c      # 主循环（~35K），TIC 命令处理
├── p_enemy.c     # 敌人 AI 状态机
├── p_map.c       # 碰撞检测，视线计算
├── p_setup.c     # 关卡解析，BSP 树构建
├── r_bsp.c       # BSP 遍历渲染
├── r_main.c      # 渲染器主函数
├── info.c        # 怪物/物品定义数据（128K+）
├── w_wad.c       # WAD 资源加载器
└── i_x.c         # X11 视频/输入驱动
```

## 历史意义

John Carmack 在源码注释中坦承设计缺陷：
> "The movement and line of sight checking against the lines is one of the bigger misses... Replacing the line of sight test with a bsp line clip would be pretty easy."

这种坦诚的自我批评成为开源文化的标杆。源码揭示了 90 年代游戏引擎的设计决策，对理解现代游戏引擎演进有重要教育价值。
