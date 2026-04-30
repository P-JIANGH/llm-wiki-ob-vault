---
title: Akhenaten
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-building, ancient-egypt, caesar3-fork, sdl2]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Akhenaten

> Pharaoh（法老）城市建造游戏的现代开源重实现，基于 Julius/Augustus 分支，支持原版存档和 Cleopatra 扩展

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/dalerank/Akhenaten |
| 语言 | C/C++（约 140K LOC） |
| 构建系统 | CMake + FetchContent |
| 渲染/引擎 | SDL2（跨平台渲染）+ 自研 2D 渲染管线 |
| 许可 | GNU AGPL |
| 平台 | Windows, Linux, macOS, Android, Emscripten (Web), Flatpak, Bazzite |
| 游戏资产 | 需要原版 Pharaoh + Cleopatra 游戏文件 |

## 核心技术点

### Julius/Augustus 分支架构
Akhenaten fork 自 [Julius（Caesar III 重实现）](../open-source-game/julius.md) 和 Augustus，是其下游项目。核心继承关系：
- 保留 Caesar III 的建筑/城市/市民模拟逻辑
- 重写平台层（Linux/macOS/Android/Emscripten）
- 增加 Cleopatra 扩展支持

### SDL2 跨平台渲染
- 完全基于 SDL2，无 OpenGL/DirectX 直接依赖
- 支持多种渲染驱动选择（software/Hardware）
- 图像滤镜系统（放大/抗锯齿等）
- Tracy profiler 集成性能分析

### JavaScript 脚本系统（MUJS）
- 内置 MUJS JavaScript 引擎
- `src/js/` 下完整封装：事件系统、游戏 API、调试器
- 支持热重载脚本（`js_folder_notifier` 监控文件变化）
- 支持游戏内控制台命令注册（`js_console_command_registry`）

### CMake + FetchContent 依赖管理
- 所有第三方库（SDL2, SDL2_mixer, MUJS, LZMA, BZIP2 等）通过 FetchContent 自动下载构建
- CMakePresets.json 提供多平台预定义配置（linux-gcc-debug-make, android 等）
- 不依赖系统包管理器

### 地图编辑器
- 内置 `src/editor/` 编辑器模块
- 支持工具化建筑放置和限制区域设置

### 数据驱动架构
- `parse_houses.py` Python 脚本解析游戏数据，输出 `houses.js` 格式
- `.sgx` 自定义资产包（菜单、训练器等）
- mod 支持（`mods/` 目录）

## 玩法特点

- 完整继承 Pharaoh + Cleopatra 的城市建造和经济发展玩法
- 需要玩家管理古埃及经济：住房、税收、食物、健康、娱乐、宗教
- 战役模式：原版 12 关 Pharaoh 战役 + Cleopatra 扩展战役
- 兼容原版 Pharaoh v1.3 存档文件

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 经典游戏清洁室逆向 | Julius → Augustus → Akhenaten 的多代 fork 演进路径，如何在保留原版兼容性的同时重构底层 |
| SDL2 跨平台渲染 | 滤镜系统、渲染纹理管理、多后端驱动选择是可靠跨平台渲染的关键 |
| 嵌入式 JS 脚本 | MUJS 轻量级 JS 引擎适合游戏脚本扩展，支持热重载的文件夹监控模式值得参考 |
| CMake FetchContent | 声明式依赖管理，避免系统包管理器依赖，代码库完全自包含 |
| 存档兼容性 | Julius 的 100% 存档兼容策略（保留原版 bug）保证用户平滑迁移，Akhenaten 继承此策略 |

## 相关项目

- [[julius]] — Caesar III 清洁室重实现（Akhenaten 的上游）
- [[cytopia]] — 另一个城市建造游戏，SDL2 等距渲染
- `open-source-game/unkown-horizons` — Godot 移植的 2D 城市建造
