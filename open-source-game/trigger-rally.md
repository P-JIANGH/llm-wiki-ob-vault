---
title: Trigger Rally
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, rally, physics-simulation]
sources: [https://sourceforge.net/projects/trigger-rally, https://github.com/Cebion/trigger-rally_pm]
---

# Trigger Rally

> 纯 C++ 拉力赛车游戏，三层架构（PEngine 渲染 / PSim 物理 / Trigger 游戏逻辑），高度程序化地形生成

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Cebion/trigger-rally_pm（1,022 commits） |
| SourceForge | https://sourceforge.net/projects/trigger-rally（原始 SVN 仓库） |
| 语言 | C++ |
| 构建系统 | GNU Autotools（configure.ac + GNUmakefile）/ MSYS Windows 构建 |
| 渲染引擎 | PEngine（自研 OpenGL 渲染管线） |
| 物理引擎 | PSim（自研刚体动力学 + 悬挂系统） |
| 许可 | GPL v2 |
| 作者 | Jasmine Langridge, Richard Langridge |
| 最新版本 | 0.6.6.1（2019-03-04） |

## 核心技术点

### 三层架构（PEngine / PSim / Trigger）

```
src/
├── PEngine/        # 渲染引擎：app, audio, config, fxman, model, render, terrain, texture, util, vbuffer, vmath
│   ├── render.cpp  # OpenGL 渲染管线
│   ├── terrain.cpp # 高度图地形渲染
│   ├── model.cpp   # .obj 模型加载
│   ├── texture.cpp # 纹理管理
│   └── vmath.cpp   # 向量/矩阵/四元数数学库
├── PSim/           # 物理模拟：collision, damage, engine, rigidbody, sim, vehicle
│   ├── rigidbody.cpp   # 刚体动力学（质量/惯性张量/速度/角速度）
│   ├── vehicle.cpp     # 车辆悬挂/轮胎/传动系统
│   ├── collision.cpp   # 碰撞检测
│   └── sim.cpp         # PSim 主仿真循环
├── Trigger/        # 游戏逻辑：control, game, ghost, main, menu, option, render
│   ├── game.cpp    # 游戏状态机（赛道/计时/AI）
│   ├── menu.cpp    # 游戏菜单系统
│   ├── ghost.cpp   # Ghost 录像回放系统
│   └── control.cpp # 输入处理
└── include/        # 24个头文件：pengine.h, psim.h, vehicle.h, terrainmap.h 等
```

### PReferenceFrame 与 PRigidBody 物理系统

- `PReferenceFrame`：存储位置（vec3f）+ 方向（四元数 quatf），支持局部↔世界坐标系变换
- `PRigidBody`：继承 PReferenceFrame，添加质量、惯性张量、线速度、角速度、累计力/扭矩
- 悬挂系统（`vehicle.cpp`）：弹簧阻尼器模型，轮胎力学（摩擦/侧偏）

### 程序化地形生成

- 高度图（heightmap）+ 颜色图（colormap）驱动地形渲染
- `.level` 文件格式：PNG/JPG 高度图 + 坐标 + 植被/道路/terrain-map
- 赛道编辑器支持任意工具导出 PNG/JPG

### 数据驱动车辆系统

- `.vehicle` 目录存储车辆配置：`.obj` 模型 + 物理参数
- Blender 导出 `.obj` 格式，参数化悬挂/传动配置

## 玩法特点

- **拉力赛核心**：分阶段赛段（Stage），计时竞速，多地形（泥土/砂石/冰面）
- **Ghost 回放**：内置录像回放系统，可用于 AI 对比或挑战
- **程序化赛道**：每张地图由高度图生成，支持用户自制关卡
- **立体声支持**：Quad buffer 硬件 + 红蓝 3D 眼镜（anaglyph）两种模式
- **配置系统**：`~/.local/share/trigger-rally/trigger-rally-0.6.x.config` 文本配置

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 物理分层架构 | PEngine/PSim/Trigger 清晰分离 → 渲染/物理/游戏逻辑解耦，便于 AI 决策模块独立插入 |
| 车辆物理模型 | PSim rigidbody + 悬挂系统 → 可用于赛车 AI 的车辆行为仿真 |
| 程序化地形 | 高度图驱动渲染 → AI 赛道生成或动态地形感知 |
| Ghost 系统 | Ghost 录像数据结构 → AI 对战/训练对手回放系统设计参考 |
| GPL v2 + 无游戏数据 | 源码完全开放，可直接移植物理/渲染管线到商业项目 |
