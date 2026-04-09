---
title: Wargus
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, real-time-strategy, stratagus, warcraft]
sources: [https://github.com/Wargus/wargus]
---

# Wargus

> Warcraft II mod using the Stratagus engine — exact visuals/audio, gameplay close to original with slight StarCraft-like enhancements.

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Wargus/wargus |
| 语言 | C++ (C++17) |
| 构建系统 | CMake 3.10+ |
| 渲染/引擎 | Stratagus 引擎 |
| 许可 | GPLv2 |
| 版本 | 2.4.1 |
| Stars | ~500 |

## 核心技术点

### Stratagus 引擎集成
- Wargus 是 Stratagus 引擎的 Warcraft 2 数据模组，本身不包含引擎代码
- Stratagus 是开源 RTS 引擎（类似 OpenRA 使用自己的引擎，Wargus 寄生于 Stratagus）
- 游戏数据（图形/音频）与游戏逻辑完全分离，数据通过 wartool 提取

### 三大核心工具

**wartool（数据提取/转换）**
- wartool.cpp 3432 LOC + wartool.h 3006 LOC（最大的文件）
- 从原始 Warcraft II CD/安装包提取游戏资源（图形/音频/地图）
- 处理 MPQ 归档（通过 StormLib 库）
- XMI→MID 音频转换（xmi2mid）
- PUD 地图格式解析

**pudconvert（地图格式转换）**
- pud.cpp 共享解析器，pudconvert.cpp 转换工具
- PUD 是 Warcraft II 地图文件格式
- 支持地图数据提取和格式验证

**wargus（主游戏入口）**
- wargus.cpp 入口文件
- Stratagus 游戏逻辑配置

### 依赖策略
- third-party/ 内嵌依赖（git submodule）
- CMake FetchContent 声明式依赖
- StormLib（MPQ 归档库）
- Stratagus 引擎作为外部依赖

### 构建与分发
- Windows: AppVeyor CI
- Linux: Travis CI
- macOS: GitHub Actions
- NSIS 安装程序（Windows）
- debian 打包支持

## 玩法特点

- 100% 还原 Warcraft II 视觉和音效
- 玩法与原版接近，略有 StarCraft 风格增强
- 支持原版战役（campaigns/ 目录）
- 地图编辑器支持（maps/ 目录）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据/逻辑分离 | Wargus 将游戏数据完全外部化，通过工具链从原版提取；AI 游戏可借鉴"引擎通用 + 内容模组化"架构 |
| 存档兼容性 | PUD 地图格式处理（Warcraft II 原始格式），跨版本兼容性思路 |
| 工具链设计 | wartool/wargus/pudconvert 三工具分离（数据提取→转换→运行），适合 AI 游戏资源管线 |
| 开源复用 | GPLv2 + 需要原版游戏数据（商业资产分离），AI 游戏可探索类似"开源引擎 + 专有内容"模式 |

## 相关项目

- [[open-source-game/war1gus]] — Warcraft: Orcs & Humans，Stratagus 引擎 + Lua 脚本
- [[open-source-game/openra]] — Westwood RTS 复刻（C&C/红警/沙丘2000），自研引擎
- [[open-source-game/warzone-2100]] — 3D RTS，157K LOC C++
- [[open-source-game/openage]] — Age of Empires 引擎复刻，C++20+Python3 双语言
