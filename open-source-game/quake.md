---
title: Quake
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, id-software, Carmack, retro]
sources: [raw/articles/id-software/quake-gpl-source.md]
---

# Quake

> id Software 经典 3D FPS 源码，John Carmack 主导的 1996 年开源里程碑，奠定现代 3D 游戏引擎基础。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/Quake |
| 许可证 | GPL v2 |
| 语言 | C + 少量汇编（i386 ASM） |
| 年代 | 1996（Carmack 的 3D 革命） |
| 主要子项目 | WinQuake（软件渲染）、GLQuake（OpenGL）、QuakeWorld（多人） |

## 目录结构

```
Quake/
├── WinQuake/      # Windows 软件渲染版本（含全部 .c/.h 源码）
├── QW/            # QuakeWorld 多人客户端源码
├── qw-qc/         # QuakeC 代码（游戏逻辑）
└── gnu.txt        # GPL v2 全文
```

## 核心技术点

### BSP 树渲染架构
- Quake 继承 Doom 的 BSP 树，但升级为**真 3D 渲染**
- 空间分割加速光线投射与绘制排序
- PVS（Potentially Visible Set）进一步裁剪不可见区域

### 软件渲染管线
- WinQuake 是纯 CPU 软件渲染（无 GPU 辅助）
- 汇编优化（i386 ASM）贡献约 50% 性能
- `d_iface.h` 定义软件渲染接口（scanline 绘制）
- `glquake.h` 定义 OpenGL 版本接口

### 双引擎策略
- **WinQuake**：纯 C 软件渲染，可不加修改地在 DOS/Linux/Win 编译
- **GLQuake**：OpenGL 1.0 加速版本
- `gas2masm` 工具统一汇编源码，跨平台共用

### QuakeWorld 网络
- 最早的大规模多人 FPS 网络协议之一
- 客户端预测 + 服务端校验模式（奠定了后来网络同步的基础）
- `cl_input.c` — 输入采集与打包发送

### 模块化代码组织
| 模块 | 职责 |
|------|------|
| `cl_main.c` | 客户端主循环 |
| `cl_parse.c` | 服务器消息解析 |
| `cl_demo.c` | 录像/Demo 播放 |
| `world.c` | 世界实体管理 |
| `zone.c` | 内存管理 |
| `common.c` | 跨平台抽象层 |

## 玩法特点

- 1996 年第一款**完全 3D 化的 FPS**
- id1 目录结构成为后来游戏 mod 的标准
- QuakeC 脚本语言（qc/ 目录）允许完全修改游戏逻辑
- Deathmatch 多人模式开创了竞技射击游戏时代

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 网络同步 | QuakeWorld 的客户端预测是现代网络同步的鼻祖；[[doom]] 的 d_net.c 提供更早期的参考实现 |
| BSP/PVS 渲染 | 确定性渲染架构有益于 AI 寻路与空间推理；[[doom]] 的 BSP 树是前身 |
| 引擎分层 | renderer/game/sound 分离是现代游戏引擎标准；[[doom-3-bfg]] 的 Portal 架构延续此思路 |
| 开源策略 | GPL 驱动社区协作；[[doom]] → Quake → Doom 3 的开源历史是商业→开源的经典案例 |
| mod 支持 | QuakeC 脚本是游戏逻辑可扩展性的早期范式；[[openrct2]] 的 Duktape 插件是现代类似实现 |

## 相关页面

- [[doom]] — Quake 的直接前身，同样是 id Software 开源里程碑
- [[doom-3-bfg]] — id Tech 4 引擎，Quake 架构的集大成进化
- [[chocolate-quake]] — Quake 还原端口（待学习）
- [[doom]] — QuakeWorld 的兄弟项目，同样值得对比
