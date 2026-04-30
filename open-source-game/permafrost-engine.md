---
title: Permafrost Engine
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, c, opengl]
sources: []
---

# Permafrost Engine

> OpenGL 3.3 RTS 游戏引擎，纯 C 语言实现，旗舰游戏 EVERGLORY，Python 2.7 脚本系统，2739 stars

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/eduard-permyakov/permafrost-engine |
| 语言 | C（少量汇编 context_switch） |
| 构建系统 | Makefile（Linux）+ Visual Studio（.sln/.vcxproj，Windows） |
| 渲染/引擎 | OpenGL 3.3 可编程管线 + GLEW 2.2.0 |
| 脚本 | Python 2.7.17（嵌入式交互控制台） |
| 音频 | OpenAL Soft 1.21.1 |
| 内存分配 | mi-malloc 2.2.3 |
| UI | Nuklear（immediate mode GUI） |
| 许可 | GPL-3.0 |
| Stars | 2739 |
| Forks | 117 |
| Commits | 1648 |
| 仓库大小 | ~320MB（含 assets） |

## 源码结构

```
src/
├── anim/           — 骨骼动画模块
├── audio/          — OpenAL 音频系统（位置音效 + 全局音效）
├── game/           — 游戏逻辑（单位/建筑/战斗等）
├── lib/            — 基础设施（khash.h hash map 等）
├── map/            — ASCII 瓦片地图解析、地形渲染
├── navigation/     — 导航网格/寻路（分层流场 + boids）
├── phys/          — 物理/碰撞（Hybrid Reciprocal Velocity Obstacles）
├── render/         — OpenGL 渲染器（批渲染/阴影/水体等）
├── script/         — Python 嵌入（事件系统 + 序列化）
├── asset_load.c/h  — 资源加载
├── cam_control.c/h — 相机控制（RTS/FPS 双模式）
├── camera.c/h      — 相机基础
├── config.h        — 配置头
├── context_switch.S/.asm — 汇编层上下文切换（Windows/Linux）
├── cursor.c/h      — 光标系统
├── entity.c/h      — 实体系统
├── event.c/h       — 事件总线
```

根目录还有：`launcher/`（Windows 启动器）、`shaders/`（GLSL）、`scripts/`、`deps/`、`assets/`、`docs/`

## 核心技术点

### OpenGL 3.3 可编程渲染管线

- Phong 反射模型 + 材质系统
- 方向光阴影映射（shadow mapping）
- 凹凸贴图（bump mapping）
- 地形纹理 splatting（多层纹理混合）
- 天空盒
- 动态批渲染（dynamic batches）+ Ringbuffer GPU 流式传输
- 水体渲染：反射 + 折射 + 软边缘
- GPU 蒙皮骨骼动画（动画姿态数据批处理到纹理）
- 程序化纹理合成（Image Quilting 算法）
- 非周期瓦片（Wang Tiling 算法）
- GPU 群体模拟（compute shaders）

### 自定义 ASCII 模型格式

- 自定义 ASCII 模型格式（与 Blender 导出脚本配合）
- 支持从 ASCII 文件导出/导入游戏实体
- 适合关卡设计师快速迭代

### RTS 专用寻路系统

- **分层流场寻路**（Hierarchical Flow Field Pathfinding）
- 处理动态障碍物
- **boids 聚群/避障行为**
- **Hybrid Reciprocal Velocity Obstacles + ClearPath** 动态碰撞回避
- **Hungarian Algorithm** 最优阵型重排
- 支持 Land/Water/Air 不同单位类型的导航层（navigation layers）
- 寻路计算并行加速（多线程）

### Python 2.7 脚本系统

- 引擎内部暴露给 Python 2.7 脚本
- 嵌入式交互式 Python 控制台（运行时调试）
- 事件系统驱动脚本逻辑
- **Fiber 系统**：轻量级用户空间任务调度
- **Fiber-backed Python tasks**：Python 中的协作式多任务
- 整个 Python 解释器状态序列化/反序列化
- 任意时刻保存/恢复游戏会话（包括所有 Python 定义的状态）

### 双阶段管线多线程

- 模拟层 + 渲染层分离，两阶段流水线
- 仿真和渲染在不同线程并行执行
- 高级调试可视化 + profiling 工具

### 地图/场景编辑器

- 内置地图编辑器（Map/Scene editor）
- RTS 相机 + FPS 相机双模式
- 快速渲染超大地图
- 地图导航图/网格自动生成
- 支持暂停/恢复

## RTS 游戏功能（内置）

- RTS 小地图（minimap）
- RTS 风格单位选择（框选）
- RTS 单位战斗系统
- RTS 战争迷雾（fog of war）
- RTS 基地建造（base building）
- 可配置工人/生产自动化
- RTS 资源采集和运输
- RTS 单位 garrison（驻守）和运输机制
- 远程武器（Projectile 物理模拟）

## 依赖管理

所有依赖都从源码构建并可随游戏二进制分发（自包含）：
- SDL2 2.30.0
- GLEW 2.2.0
- Python 2.7.17（含部分模块 + 精简 stdlib）
- OpenAL Soft 1.21.1
- mi-malloc 2.2.3
- stb_image.h / stb_image_resize.h
- khash.h
- nuklear.h

## 旗舰游戏：EVERGLORY

[EVERGLORY](https://store.steampowered.com/app/1309720/EVERGLORY/) 是使用 Permafrost Engine 开发的旗舰游戏，已在 Steam 提供免费 demo。Demo 包含所有游戏脚本，可供学习参考。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **纯 C + OpenGL 3.3 渲染** | 不依赖游戏引擎，自研渲染管线适合需要精细控制的项目；对比 [[openra]]（C#）和 [[warzone-2100]]（C++），Permafrost 是纯 C 的极端案例 |
| **Python 脚本层设计** | Python 2.7 暴露引擎内部 + Fiber 协作多任务是 AI 脚本控制的理想模型；可让 AI 决策直接写在 Python 层而非编译进 C |
| **GPU 群体模拟** | Compute shader 加速 crowd simulation 可用于大规模单位 AI 行为可视化[[warzone-2100]] |
| **分层流场 + boids** | 适合 RTS 中大队列单位移动的群体行为；对比 [[openage]] 的 A* 寻路，不同策略适用不同规模 |
| **序列化/回放系统** | 完整 Python 状态序列化和会话保存/恢复，可用于 AI 对局的全程录制和复盘 |
| **阵型重排 Hungarian Algorithm** | [[warzone-2100]] 的单位移动和阵型控制也值得对比 |
| **多线程 2-stage 管线** | 模拟和渲染分离，适合在模拟线程中运行 AI 决策而不阻塞渲染 |

## 相关

- [[warzone-2100]] — C++ 3D RTS，另一种自研渲染管线方案
- [[openra]] — C# RTS，多 Mod 架构参考
- [[openage]] — C++20+Python3 Age of Empires 引擎复刻
- [[mindustry]] — 自动化塔防，[[veloren]] — Rust 体素 RPG
