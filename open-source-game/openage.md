---
title: OpenAge
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, age-of-empires, python, cython]
sources: [raw/articles/open-source-games-list-2026.md]
---

# OpenAge

> Age of Empires / AoE II HD / Star Wars Galactic Battlegrounds 引擎复刻 — C++20 引擎 + Python 脚本层，通过 nyan 格式实现内容配置与模组化

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/SFTtech/openage |
| 语言 | C++20 (引擎核心) + Python3 (脚本/媒体转换/控制台/API) |
| 构建系统 | CMake 3.16+ |
| 渲染/引擎 | OpenGL 着色器渲染 |
| 依赖 | Cython (Python/C++ 胶水), Qt6 (GUI), Opus (音频编解码), nyan (配置格式) |
| 许可 | GPLv3 |
| 状态 | 引擎核心可构建，游戏玩法非功能状态（内部模拟仍在重写） |

## 核心技术点

### 架构：双语言引擎（C++20 + Python3 via Cython）

```
libopenage/       ← C++20 引擎核心 (827 .cpp/.h)
openage/          ← Python3 脚本层 (291 .py) + convert/ 游戏转换工具
```

- **libopenage/** 子系统（33 个模块目录）：gamestate/, event/, curve/, renderer/, input/, audio/, job/, pathfinding/, console/, coord/, present/, rng/
- **gamestate/** 含 entity/component/event 三层游戏状态模拟，是当前重写核心
- **Cython 胶水**：pyx 文件双向绑定 C++ 和 Python，Python 层可直接调用引擎 API
- `./configure --download-nyan && make` 一键构建，Kevin CI 自动化测试

### nyan 内容配置格式

- 自研 `open-source-game/nyan` 格式（`nyan` 同名仓库），用于替代传统文本/二进制配置
- 声明式定义游戏对象（单位、建筑、科技等）的属性和关系
- 支持通过 nyan API 实现 in-game Python console，类似 Blender 的可扩展 API
- 模组可完全不修改引擎代码，仅通过 nyan 数据文件扩展内容

### 资产转换管线

- 官方 `open-source-game/openage-data` 仓库提供免费资产
- 也支持使用原版 AoE1/AoE2/Definitive Edition 游戏资产
- `convert/` 目录含媒体转换工具，将原始游戏资产转为 openage 格式
- 需要原始游戏数据才能运行（不内置）

### 目标游戏支持

- Age of Empires (原始版)
- Age of Empires II HD Edition
- Star Wars: Galactic Battlegrounds
- 目标：100% 功能复刻 + 可选改进

## 玩法特点

- **当前状态**： gameplay 非功能状态，团队在重写内部游戏模拟（2020 年启动）
- 详细开发博客：blog.openage.dev（游戏状态 2020 重写系列文章）
- 集成 Python 控制台（类 Blender API）+ Python AI 脚本（可接 scikit-learn）
- 多人网络支持（规划中，含 haskell masterserver）
- 无网络兼容性和二进制兼容性（不可与原版联机）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **双语言架构** | C++ 性能关键路径 + Python 灵活脚本/AI 层，通过 Cython 干净绑定，参考价值极高 |
| **内容配置格式** | nyan 声明式模组格式比硬编码配置更灵活，适合复杂游戏对象管理 |
| **确定性模拟** | event/curve/gamestate 模块化设计，可作为游戏状态管理参考 |
| **AI 脚本层** | Python AI API 设计 + ML 集成思路（scikit-learn），适合策略游戏 AI 开发 |
| **资产管线** | 转换工具将原版资产转为开放格式，值得资源复用项目参考 |

## 关联项目

- [[open-source-games-list]] — 开源游戏总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
- `nyan` — SFTtech 自研内容配置格式

## 开发资源

- 开发文档：`doc/` 目录（含 building.md, development.md, contributing.md, reverse_engineering/ 等）
- Kevin CI：自研持续集成服务
- Matrix 社区：`#sfttech:matrix.org`
- 活跃多平台构建：Debian Sid / Ubuntu 24.04 / macOS / Windows Server 2019-2022
