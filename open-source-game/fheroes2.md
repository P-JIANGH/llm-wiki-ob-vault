---
title: fheroes2
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, heroes-of-might-and-magic, clean-room, sdl2]
sources: [https://github.com/ihhub/fheroes2]
---

# fheroes2

> Heroes of Might and Magic II 清洁室重实现，开源多平台复刻版

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/ihhub/fheroes2 |
| 语言 | C++（250 .cpp + 213 .h，约 210K LOC） |
| 构建系统 | CMake + Makefile多平台 |
| 渲染/引擎 | 纯 SDL2，无第三方游戏引擎，自研图像/渲染系统 |
| 许可 | GPLv2 |
| Stars | 8.3k+ |
| 平台 | Windows/macOS/Linux/Android/iOS/Nintendo Switch/PS Vita |

## 核心技术点

### 清洁室架构
- **完全从零重写**，非反编译，基于公开文档和逆向格式研究
- engine/ 子目录：封装 SDL2 渲染、音频、文件系统、线程、配置等基础设施
- fheroes2/ 子目录：battle/castle/heroes/kingdom/world/maps/campaign 等游戏逻辑模块
- 两层分离：底层引擎与上层游戏逻辑完全解耦，可独立替换

### 资源系统（agg/）
- 自研 `agg_file` 资源打包格式，兼容原版 ICN/SHK/M82 等二进制格式
- `image_tool` / `image_palette`：自定义图像加载与调色板处理，支持高清材质包（HotA等）
- `h2d_file`：2D 动画数据文件解析（.h2d 格式）
- `smk_decoder`：Smacker 视频解码

### 多平台支持
- SDL2 跨平台抽象层（window/input/audio）
- CMake + 多 Makefile（.vs2019/.emscripten/.switch/.vita）针对各平台定制
- Android/iOS：移动触控优化 UI
- 资源与代码完全分离：需原版 HoMM II 游戏数据（需合法购买）

### 国际化
- `translations.cpp` 多语言系统
- 文档化翻译贡献流程（docs/TRANSLATION.md）

### AI 子系统（ai/）
- 独立 AI 模块，与游戏逻辑解耦
- 城池建造 AI、英雄行动 AI、战斗 AI 等分层设计

## 玩法特点

- **完整 HoMM II 重现**：回合制战棋策略，世界地图探索，城堡建设，部队战斗，战役模式
- **高清分辨率支持**：突破原版 800x600 限制
- **改进的 AI**：相比原版更聪明，战斗算法优化
- **用户界面增强**：自适应按钮大小，键盘快捷键可自定义，多语言
- **即时战斗模式**：可跳过战斗动画
- **编辑器支持**：内置地图编辑器（editor/）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室重实现 | [[open-source-game/openmw]]/GemRB 模式——基于公开格式文档重写，不碰原版版权代码 |
| SDL2 轻量架构 | 无 Unreal/Unity，自研引擎层，游戏逻辑与渲染完全掌控——适合需要深度定制的 AI 游戏 |
| 模块化游戏系统 | battle/castle/heroes/kingdom/world 各模块独立，符合 ECS 思路——[[open-source-game/openra]] Order 系统类似 |
| 多平台部署 | CMake 多 target 策略，一次开发多端发布——[[open-source-game/veloren]] Rust multi-crate 类似 |
| 资源打包与 MOD | agg_file 格式兼容 + 外部高清资源包——可探索动态资源加载用于 AI 训练数据生成 |
| 确定性回合制 | 战棋类 AI 训练的理想环境——[[open-source-game/vcmi]] HoMM III 引擎也是同类参考 |
