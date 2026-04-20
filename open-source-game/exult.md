---
title: Exult
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg]
sources: []
---

# Exult

> Ultima VII 游戏引擎清洁室重实现，完整支持《黑门》+《毒岛》，SDL 跨平台

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/exult/exult |
| 语言 | C++（48K+ LOC .cc 文件） |
| 构建系统 | Autotools (autoconf/automake) + CMake (Android) |
| 渲染/引擎 | SDL 跨平台渲染，无原版引擎依赖 |
| 许可 | GPL v2 |
| 最新版本 | 1.13.1git |
| 平台 | Linux, macOS, Windows, Android, iOS, FreeBSD, OmniOS, NetBSD, OpenBSD |

## 核心技术点

- **清洁室重实现**：完全从头重写，不使用原版代码，兼容 Ultima VII 数据文件
- **SDL 跨平台抽象**：使用 SDL 库统一窗口、输入、音频接口，多平台一致体验
- **数据文件解析**：粉丝多年逆向工程成果（Gary Thompson, Maxim Shatskih, Jakob Schonberg, Wouter Dijkslag）
- **content/ 子目录**：包含 bg/si 等游戏补丁数据（bgkeyring, sifixes, demo, islefaq 等社区修正）
- **Auto tools 架构**：configure.ac 探测 host 系统，支持多编译器（g++/clang++/MSVC）
- **多窗口系统检测**：X11/Android/Win32/macOS/iOS 各平台条件编译分支

## 玩法特点

- 完整支持 Ultima VII 两部作品：The Black Gate + Serpent Isle
- 支持原版资料片（可选，非必须）
- 游戏数据文件需持有原版 Ultima VII（版权自持）
- 支持高分辨率宽屏、音频改进等现代增强特性

## 主要源文件架构

| 文件 | 行数 | 职责 |
|------|------|------|
| exult.cc | 3352 | 主程序入口，窗口初始化 |
| actors.cc | 5370 | 角色/ NPC 行为系统 |
| schedule.cc | 6115 | AI 调度系统（最大文件） |
| cheat_screen.cc | 4085 | 作弊界面系统 |
| combat.cc | 1926 | 战斗系统 |
| gamewin.cc | 3179 | 主游戏窗口逻辑 |
| gamemap.cc | 1876 | 地图/世界管理 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 经典 RPG 引擎复刻 | 清洁室重实现路径——完全重写而非修改源码，规避版权风险 |
| 数据驱动游戏架构 | content/ 补丁系统可作为 AI 游戏 mod 热加载参考 |
| SDL 跨平台抽象 | 多平台构建（9+ CI 流水线）经验，autotools 检测框架 |
| 社区维护长期项目 | 30+ 年历史项目持续活跃，源码+社区双轨维护模式 |
| 游戏兼容性策略 | 无原版资产依赖（需玩家自备），存档兼容性设计 |

## 相关页面

- [[open-source-game/veloren]] — Rust 体素 RPG
- [[open-source-game/openmw]] — Morrowind 引擎复刻
- [[open-source-game/openra]] — C&C / Westwood 经典 RTS 复刻
