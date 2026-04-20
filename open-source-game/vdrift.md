---
title: VDrift
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, simulation, drift]
sources: []
---

# VDrift

> 开源跨平台漂移赛车模拟器，基于 Bullet 物理引擎和 SDL3，主打拟真车辆操控与漂移手感。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/VDrift/vdrift |
| 语言 | C++ (C++14) |
| 构建系统 | SCons |
| 渲染/引擎 | OpenGL + Bullet Physics |
| 许可 | GPL v3 |
| 平台 | Linux, macOS, Windows, FreeBSD |

## 项目概述

VDrift 是一款以漂移竞速为核心的开源赛车模拟器，目标是通过现代计算硬件精确模拟车辆物理，为玩家提供富有挑战性且沉浸感强的驾驶体验。项目社区活跃，拥有赛道编辑器、录像回放、漂移计分系统，并支持力反馈方向盘（Logitech G25 等）。

## 核心架构

```
src/
├── main.cpp              # 入口点
├── game.h/cpp            # 主游戏循环
├── cargraphics.h/cpp     # 车辆渲染
├── cartelemetry.h       # 车辆遥测数据
├── carsound.h/cpp        # 引擎/环境音效
├── camera_*.h/cpp        # 摄像机系统（chase/free/mount/orbit）
├── ai/                   # AI 驾驶逻辑
├── physics/             # 车辆动力学核心
│   ├── cardynamics.cpp   # 车辆动态（悬架/转向/传动）
│   ├── carengine.cpp     # 引擎模拟
│   ├── cardifferential.cpp  # 差速器
│   ├── carbrake.h        # 制动系统
│   └── carclutch.h       # 离合器
├── cfg/                  # 配置解析
├── aabb.h/cpp            # 碰撞检测（AABB）
├── aabbtree.h/cpp        # 碰撞层次树
├── bezier.h/cpp          # 贝塞尔曲线（赛道/路径）
└── tools/                # 工具脚本
```

**构建工具**：SCons（Python-based），配置文件 `vdrift.conf`，跨平台支持良好。

## 核心技术点

- **Bullet Physics**：用于车辆动力学模拟，包含悬架、轮胎摩擦、传动系统
- **SDL3**：跨平台窗口、输入、音频抽象层
- **漂移物理**：专为漂移手感调校，支持漂移计分系统
- **赛道编辑器**：内置地图编辑器，支持用户创建赛道
- **力反馈支持**：支持 DirectInput/XInput 力反馈方向盘
- **录像回放**：完整 replay 系统，可回放历史比赛
- **AI 对手**：内置 AI 驾驶逻辑

## 玩法特点

- 单人职业生涯模式（多条赛道、多款车辆）
- 实时漂移计分，结合速度/角度/连贯性评分
- 丰富的车辆调校选项（悬架、刹车、差速器、齿轮比）
- 赛道包含多种地形与环境（柏油、砂石等）
- 键盘/手柄/方向盘多种输入支持

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 物理模拟 | Bullet 物理引擎集成方式，车辆动力学分层设计（engine/differential/brake/clutch 可独立配置）|
| 输入系统 | carcontrolmap.h 抽象输入映射，支持多种控制器，方向盘 force feedback 积分 |
| 漂移判定 | 漂移计分算法（角度+速度+连贯性），可参考用于 AI 驾驶风格评分 |
| AI 驾驶 | src/ai/ 目录提供了 AI 对手实现，可作为游戏中 AI 行为的参考 |
| 跨平台 | SDL3 抽象层使多平台移植简单，适合作为游戏引擎基础层 |
| 赛道编辑 | 内置地图编辑器是亮点，AI 训练可结合程序化赛道生成 |

## 相关页面

- [[open-source-game/endless-sky]] — 太空探索贸易，另一个开源模拟游戏
- [[open-source-game/openra]] — 开源游戏复刻项目
