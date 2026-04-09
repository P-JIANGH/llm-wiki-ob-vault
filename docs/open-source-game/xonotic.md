---
title: Xonotic
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, arena-shooter, darkplaces-engine]
sources: [https://gitlab.com/xonotic/xonotic]
---

# Xonotic

> 竞技向顶视角射击游戏，Darkplaces 引擎（Quake 系分支），以精湛的移动机械和丰富的武器系统著称。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitLab | https://gitlab.com/xonotic/xonotic |
| 语言 | C (Darkplaces 引擎) + QuakeC (游戏逻辑) |
| 构建系统 | CMake + Makefile |
| 渲染/引擎 | Darkplaces (Quake 引擎分支)，基于 SDL2/OpenGL |
| 许可 | GPLv3+ |
| 主开发仓库 | xonotic-data.pk3dir (游戏数据/逻辑) |
| 平台 | Linux/Windows/macOS |
| 多人 | ENet UDP，专用服务器支持 |

## 核心技术点

### Darkplaces 引擎架构
- **起源**：Darkplaces 是 Quake 引擎的分支，经过多年大幅修改
- **渲染器**：支持 OpenGL 渲染，含软件渲染后备
- **网络**：基于 ENet 的 UDP 多人支持，专用服务器架构
- **数据驱动**：.pk3dir 包格式（类似 Quake 的 pk3），游戏逻辑与引擎分离
- **脚本**：QuakeC 字节码虚拟机执行游戏逻辑

### 移动物理系统（核心卖点）
Xonotic 以其精湛的移动机械闻名，是游戏性的核心：

| 技术 | 描述 |
|------|------|
| Bunny Hopping | 空中持续跳跃保持速度最小化地面接触 |
| Strafe Turning | 转向时保持甚至加速（松开前进键+按侧键+平滑鼠标） |
| Strafe Jumping | 跳跃中持续加速，角度渐变弯曲路径 |
| Circle Jumping | 站立时利用斜向加速获得起始速度 |
| Blaster Jumping | 用 Blaster 武器的冲击波推动自己上升/前进 |
| Wall Blastering | 面向墙壁射击利用冲击波瞬间获得高水平速度 |
| Ramp Jumping | 利用斜面获得额外垂直加速 |

这些技术组合让高水平玩家达到惊人的速度和机动性。

### 数据组织
- `data/*.pk3dir` — 字体资源包
- `xonotic-data.pk3dir` — 主要游戏数据/逻辑（独立仓库）
- `source/darkplaces` — 引擎源码（git submodule）
- `source/d0_blind_id` — 加密/DDoS 防护库
- `server/` — 专用服务器配置脚本

### 构建系统
```
CMakeLists.txt:
  - subproject(d0_blind_id)    # 加密库
  - subproject(daemon-glue)    # 守护进程胶水代码
  - subproject(darkplaces)     # 引擎
  - subproject(gmqcc)          # QuakeC 编译器
  - subproject(netradiant)    # 地图编辑器
  - subproject(data/xonotic-data.pk3dir)  # 游戏数据
```

## 玩法特点

- **游戏模式**：Deathmatch, Team Deathmatch, CTF, Capture League, Race, CTS 等
- **武器系统**：30+ 武器，包括 Blaster, MG, Shotgun, Rifle, Crylink, Nex, Seal 等
- **地图编辑器**：内置 NetRadiant，支持游戏内实时编辑
- **经济系统**：比赛模式中的购买系统
- **移动优先**：游戏设计围绕移动机械，玩家可以比射击更早掌握移动

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 移动物理系统 | Xonotic 的移动机械是 AI 游戏中可以实现的高自由度移动系统的优秀参考 |
| 数据驱动架构 | .pk3dir 包格式允许游戏内容与引擎完全分离，便于 AI 生成内容注入 |
| QuakeC VM | 字节码脚本系统可以用于 AI 可控的游戏逻辑，隔离安全性 |
| ENet 网络 | 成熟的 UDP 游戏网络实现，适合需要低延迟的实时游戏 |
| 竞技平衡 | 移动机械的精通度区分高水平玩家，可用于 AI 对手的难度梯度设计 |
| 开源 FPS 基础 | Darkplaces 引擎本身可作为 AI FPS 游戏的底层引擎 |
