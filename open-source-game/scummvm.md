---
title: ScummVM
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [open-source, game, emulator, retro]
sources: []
---

# ScummVM

> 经典图形冒险游戏引擎复刻 — 支持 141+ 游戏引擎、SCUMM/Myst/Blade Runner/Broken Sword 等

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/scummvm/scummvm |
| 语言 | C++ |
| 构建系统 | Makefile（configure 脚本配置） |
| 渲染/引擎 | 跨平台后端抽象层 + 各游戏引擎自有渲染 |
| 许可 | GPLv3+ |
| 平台 | Linux / Windows / macOS / Android / iOS / Switch / PSVita / 3DS / PSP / Wii / Dreamcast 等 |
| 规模 | 约 3 万提交，活跃维护 20+ 年 |

## 核心技术点

### 插件式引擎架构
- `base/plugins.cpp` — 插件加载系统，运行时按需加载游戏引擎
- `engines/` 目录下 **141 个独立游戏引擎**，每个引擎独立目录
- `base/advancedDetector.cpp` — 游戏自动检测系统，通过文件特征码识别游戏版本
- `backends/plugins/` — 跨平台插件后端抽象

### 核心子系统
- `common/` — 公共基础库（内存管理、文件系统、压缩、配置、语言等）
- `backends/` — 平台后端抽象（音频/视频/输入/存储/网络）
  - `backends/audio/` — 跨平台音频（音乐/MIDI/混音）
  - `backends/graphics/` — 图形后端（OpenGL/Software/SDL2/SDL1）
  - `backends/events/` — 输入事件处理
  - `backends/fs/` — 文件系统抽象
- `graphics/` — 2D 图形核心（Scaler/字体/视频解码）
- `audio/` — 音频解码（MIDI/MP3/OGG/FLAC）
- `gui/` — 跨平台 GUI（ImGui 或自研 Qt-style 界面）

### 引擎生态（141 个支持的游戏系列）

**经典冒险引擎：**
- SCUMM 系统（Maniac Mansion / Monkey Island / Day of Tentacle / Sam & Max）
- Sierra AGI / AGOS（King's Quest / Space Quest / Elvira）
- Broken Sword I & II（Cyan Worlds）
- Myst / Riven（Cyan Worlds）
- Blade Runner（Westwood Studios）
- The Legend of Kyrandia

**RPG 类：**
- Ultima Engine 系列
- Fallout 1 & 2
- Might and Magic

**其他经典：**
- Beneath a Steel Sky
- Gobliiins
- Larry（Leisure Suit Larry 系列）
- Zork 系列

### 关键设计模式
- **AdvancedDetector** — 通过 MD5/文件大小/字符串特征自动识别游戏版本和语言
- **Plugin System** — 运行时动态加载，减少主程序体积
- **Backend Abstraction** — 同一游戏引擎无需修改即可运行在 20+ 平台上
- **Savefile System** — 跨引擎统一的存档管理
- **Event System** — 统一的输入事件处理，支持键盘/鼠标/手柄/触摸屏

### 构建系统
- `./configure` — 自动检测平台和可用库
- `Makefile` — 模块化构建，通过 `rules.mk` 汇总所有 `.cpp` 文件
- `DEPDIR=.deps` — 自动依赖追踪
- 支持 PVS-Studio 静态分析

## 玩法特点

- **多游戏支持**：一个引擎支持所有支持的游戏，只需游戏数据文件
- **跨平台**：同一数据文件，在任何设备上都能玩
- **增强功能**：原版分辨率提升（upscale）、手柄支持、云存档
- **开放生态**：每个游戏引擎都有完整源码，可独立复用
- **国际化**：40+ 语言翻译（po 目录）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎插件架构 | `Microverse` 这类需要支持多场景/多游戏模式的项目，可以学习 ScummVM 的插件式架构来解耦游戏逻辑 |
| 游戏检测系统 | 类似 [[open-source-game-engines-comparison]] 中各类引擎的自动检测/切换机制 |
| 跨平台抽象 | 通用后端抽象模式 [[godot-4]] 的跨平台实现也有类似思路 |
| 存档系统 | ScummVM 的 [[microverse-save-system]] 中存档格式可参考其跨引擎一致性设计 |
| 复古游戏兼容 | 如果公司涉及 [[claude-code-game-studios]] 这类复刻/怀旧游戏，复用引擎检测逻辑 |
