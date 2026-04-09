---
title: OpenRW
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, third-person, reimplementation, gta]
sources: [raw/articles/open-source-games-list-2026.md]
---

# OpenRW

> GTA III 清洁室重实现开源引擎，跨平台 Linux/macOS/Windows/BSD

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/rwengine/openrw |
| 官网 | https://openrw.org |
| 语言 | C++ |
| 构建系统 | CMake 3.8+ |
| 渲染/引擎 | OpenGL + SDL2 + Bullet Physics |
| 许可 | GPLv3 |
| 起始年份 | 2013（tsjost + danhedron 发起） |
| Commits | ~2,016 |
| 依赖 | Boost, OpenAL, Bullet Physics, GLM, FFmpeg, SDL2, OpenGL |

## 核心技术点

### 模块化架构
```
rwcore/     — 核心渲染引擎（平台无关）
rwengine/   — 游戏引擎逻辑（核心业务）
rwgame/     — 主游戏应用入口
rwviewer/   — 模型/地图查看器工具
rwtools/    — 各种辅助工具
external/   — 外部依赖管理
tests/      — 测试套件
benchmarks/ — 性能基准测试
```

### 清洁室重实现原则
- 不使用原始引擎源码，纯粹基于游戏数据文件重写
- 目标：1.0 版本前不追求新增特性，专注还原原版 GTA III 体验
- 不需要 GTA III 源码，但**必须拥有原版游戏数据**（Steam 可购买）

### 跨平台设计
- CMake + Conan 依赖管理，支持 CMake Build Options 开关各模块
- GitHub Actions (Linux/macOS) + AppVeyor (Windows) 三平台 CI
- 移植到 Linux、macOS、Windows 及多种 BSD 系统

### 物理系统
- Bullet Physics 刚体物理引擎
- 车辆物理（驱动、碰撞）
- 行人/角色物理

### 渲染架构
- OpenGL 3.x 可编程渲染管线
- GLM 数学库（向量/矩阵运算）
- SDL2 跨平台窗口/输入抽象

### 脚本系统
- 内置脚本机（Script Machine）用于驱动游戏逻辑
- 支持新游戏开始和存档加载

## 玩法特点

- **目标**：原版 GTA III 完全可玩（目前尚未达到，仍有 bug）
- **进度**：1.0 前的主要障碍：大量 bug 修复、功能补全
- **游戏内容**：Portland、Staunton Island、Shoreside Vale 三大区开放世界
- **要求**：必须持有原版 GTA III 游戏数据（PC 版），需 Steam 购买

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 经典游戏引擎重实现 | 从零重写 3D 游戏引擎的完整架构（rwcore/rwengine/rwgame 分离） |
| 清洁室逆向工程 | 不依赖原码、基于游戏数据文件重写的法律安全路径 |
| 跨平台游戏引擎 | CMake + Conan 依赖管理、多平台 CI 设计 |
| 3D 开放世界渲染 | OpenGL + Bullet Physics 组合处理 3D 刚体碰撞 |
| 脚本虚拟机 | 内置脚本机驱动的游戏逻辑扩展机制 |
| 游戏兼容性 | GTA III 数据文件格式解析与原版存档兼容处理 |

## 补充说明

- OpenRW 是**非官方项目**，未获得 Rockstar Games 授权
- 1.0 版本后将可能 fork 出增加新特性的版本
- 2018 年 IRC 社区活跃：`#openrw` @ libera.chat
- 不适合做商业项目参考（GPLv3 + 需原版游戏数据）
