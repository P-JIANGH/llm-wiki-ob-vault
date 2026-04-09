---
title: Warzone 2100
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, 3d, real-time-strategy]
sources: []
---

# Warzone 2100

> 开源 3D 即时战略游戏，含剧情战役、多人、 skirmish AI，跨平台（Win/macOS/Linux/FreeBSD/WebAssembly）

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Warzone2100/warzone2100 |
| 语言 | C/C++（src/ 157K LOC C++） |
| 构建系统 | CMake 3.16-3.31 |
| 渲染/引擎 | 多后端渲染器：OpenGL + OpenGL ES + Vulkan |
| 许可 | GPLv2+ |
| 原型 | Pumpkin Studios 1999 年作品，2004 年开源 |

## 核心技术点

### 渲染器架构
- **三后端渲染管线**：OpenGL、OpenGL ES、Vulkan 可切换
- lib/ivis_opengl：主要渲染层
- lib/wzmaplib：地图数据解析与渲染
- lib/framework：共享基础设施
- 3rdparty： glad（GL 加载器）、GameNetworkingSockets（多人网络）

### 游戏核心（lib/gamelib）
- src/ 目录含核心游戏逻辑： ai.cpp 战术 AI、astar.cpp A* 寻路、action.cpp 单位行动状态机、animation.cpp 动画系统
- 146 个 .h 头文件定义核心数据结构
- activity.cpp：活动/任务系统

### 技术树系统
- 400+ 科技项目的深度科技树
- 灵活的单位设计系统（Flexible design system）
- 单位可定制化，战术多样性高

### 网络多人
- lib/netplay：专用网络同步层
- 支持 10 人多人对战（友军或自由组队）
- 支持观战

### 跨平台
- CMake FetchContent / vcpkg 管理第三方依赖
- 支持 WebAssembly（Emscripten 编译）
- FreeBSD 官方支持

## 玩法特点

- **剧情战役**： remastered 单人战役，含扩张型持久基地 + 外出任务
- **科技树**： 400+ 科技，驱动单位升级和战略选择
- **单位设计**： 玩家可自定义单位组合
- **Skirmish AI**： 离线 AI 对战，可无尽重玩
- **地图编辑器**： 支持自定义地图

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多渲染后端 | Vulkan/OpenGL/GLES 三路切换的抽象层设计值得学习 |
| 大规模科技树 | 400+ 科技节点的数据驱动设计可参考其结构 |
| RTS AI | astar.cpp 寻路 + ai.cpp 战术决策的双层 AI 架构 |
| 单位系统 | 灵活设计系统如何支撑战术多样性 |
| 网络同步 | lib/netplay 的帧同步/锁步设计（类似 OpenTTD/Hypersomnia） |
| 跨平台构建 | CMake + vcpkg + 多 CI 平台（Win/macOS/Ubuntu/Fedora/FreeBSD/WebASM） |

## 相关 Wiki 页面

- [[open-source-game/openra]] — C&C / Dune 2000 / Red Alert 现代复刻
- [[open-source-game/openttd]] — Transport Tycoon Deluxe 开源复刻，帧同步网络
- [[open-source-game/beyond-all-reason]] — Spring 引擎 RTS
- [[open-source-game/0-ad]] — 古代战争 RTS
