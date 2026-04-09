---
title: Stunt Rally 3
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, simulation, ogre-next, cpp]
sources: [https://github.com/stuntrally/stuntrally3]
---

# Stunt Rally 3

> 3D 赛车游戏，含科幻元素和内置赛道编辑器，基于 Ogre-Next 渲染 + VDrift 物理仿真

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/stuntrally/stuntrally3 |
| 语言 | C++ |
| 构建系统 | CMake + Conan |
| 渲染引擎 | Ogre-Next 3.0（OpenGL3+ 主力，Vulkan 可用） |
| 物理仿真 | VDrift（修改版） |
| 许可 | GPLv3（代码）/ 媒体资产单独授权 |
| 最新版本 | 3.3 |
| 状态 | 已停止开发（2025年） |

## 核心技术点

### 架构模块化（src/ 子目录）
- **common/** — 应用层基础设施（App*，渲染辅助）
- **game/** — 游戏逻辑（CarModel、CGame、Challenges、Replays）
- **editor/** — 赛道编辑器（TerrainEdit、BrushesIni、Road_Edit）
- **road/** — 3D 样条道路系统（Grid、PaceNotes、Road_File、Road_Markers）
- **vdrift/** — VDrift 仿真修改版（carphysics、Buoyancy、Aero、Brake）
- **network/** — 多人网络（无专用服务器，直连）
- **sound/** — 音频子系统
- **Terra/** — 地形渲染系统
- **transl/** — 国际化翻译工具

### 渲染系统
- Ogre-Next 3.0 现代渲染器
- OpenGL3+ 为主要渲染后端（推荐）
- Vulkan 支持（不常测试）
- PBR 材质、SSAO、GI、阴影、粒子系统
- HLMs（高层次材质系统）数据驱动材质

### 赛道编辑器
- 内置非破坏性赛道编辑器（F1/tab 切换 GUI）
- 3D 样条道路系统（道路由 3D spline 构成）
- 支持 jumps、loops、pipes 等 stunt 元素
- 无撤销，需要 F4 手动保存 + F5 恢复
- 测试模式：编辑器内可直接运行赛道

### 内容规模
- 232 条赛道，40 种场景（自然/极限/外星球/超现实）
- 33 辆载具（含科幻风格）
- Ghost 幽灵车系统（橙色：自己最好成绩 / 绿色：赛道最佳）
- Replay 回放系统（多视角）
- 挑战、锦标赛、教程、收藏模式

## 玩法特点

- Rally 风格驾驶 + 侧滑漂移，主要在砂石路面
- Stunt 元素（跳跃、循环、管道）
- 科幻车辆 + 多星球场景（Mars、Alien、CrystalMoon、Space 等）
- Split Screen（2-6 人分屏）和网络多人（无官方服务器）
- Ghost 对战 + 回放系统

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 模块化架构 | common/game/editor/road 分离，赛道逻辑与物理仿真解耦 |
| 物理仿真复用 | 基于 VDrift 修改而非重写，适合集成现成仿真库 |
| 数据驱动内容 | 赛道（.road 文件）、车辆配置（.car 文件）、场景均为数据文件 |
| Ghost 系统 | 帧级别回放存储（可用于 AI 训练轨迹数据采集） |
| Ogre-Next 渲染 | 现代渲染技术（PBR/SSAO/GI）集成，含 C++ 源码可参考 |
| 赛道编辑器 | 内置编辑器可降低内容创作门槛，类似思路可用于游戏内建编辑器 |
| 多人网络 | 直连 P2P 模式简单，适合快速原型多人游戏 |

## 关联页面

- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
- [vdrift](#/open-source-game/vdrift) — VDrift 漂移赛车模拟（本项目物理引擎来源）
- [ogre-next-rendering](#/) — Ogre-Next 渲染引擎
