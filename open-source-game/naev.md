---
title: Naev
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, space, rpg, 2d]
sources: [https://codeberg.org/naev/naev]
---

# Naev

> 2D 太空贸易与战斗游戏，灵感来自 Escape Velocity 系列

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub/Codeberg | https://codeberg.org/naev/naev |
| 语言 | C + Rust 混合（C 为主，~155K LOC C/Rust） |
| 构建系统 | Meson (C11 + Rust 2024) |
| 渲染/引擎 | SDL3 + OpenGL 3.3+ |
| 许可 | GPLv3 |
| 版本 | 0.14.0-alpha.4 (unreleased) |
| 平台 | Linux, Windows, macOS, Steam, itch.io, Flathub |

## 核心技术点

### C + Rust 混合架构
- 主体代码使用 C11，Rust 用于新模块和 FFI 绑定
- `bindgen 0.72+` 生成 Rust ↔ C 绑定
- `rustc >= 1.89` + `clang` (用于 bindgen 找标准库)
- Meson 统一构建（C 和 Rust 混合编译）
- subprojects 机制处理外部 C 库依赖（SDL3/GLPK/enet/physfs 等）

### 数据驱动设计
- Lua 5.1/LuaJIT 脚本驱动游戏逻辑和任务系统
- gettext 国际化（`po/naev.pot` + Weblate 翻译）
- `dat/` 目录资源数据与代码分离
- Plugin 系统（v0.10.0+），内置 Plugin Manager（v0.13.0+）
- ndata 打包格式 + PhysicsFS 虚拟文件系统

### 渲染架构
- SDL3 窗口和输入抽象
- OpenGL 3.3+ 着色器渲染
- GLTF 模型支持（gltf.c/glad.c）
- 自定义着色器（shaders_c_gen.py 生成的 C 着色器代码）
- `opengl_render.c/h` 独立渲染管线

### 核心子系统
- `pilot.c` 飞行员/飞船系统（AI + 玩家控制）
- `economy.c` 经济系统（商品、贸易）
- `mission.c` 任务系统
- `faction.rs` 派系系统（Rust 重写）
- `space.c` 太空地图/星系
- `event.c` 事件系统
- `spob.c` 太空站/行星（spob = space object）

## 玩法特点

- **Escape Velocity 风格**：俯视角太空飞船，自由贸易和战斗
- **银河探索**：不断扩展的星系和剧情任务
- **装备和飞船**：大量装备和飞船收集
- **派系声望**：派系关系影响游戏进程
- **插件系统**：玩家可制作和安装插件扩展游戏
- **多语言**：20+ 语言国际化支持

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| C/Rust 混合 | 现有 C 代码库可逐步迁移 Rust 子系统（参考 Naev pilot.rs/faction.rs） |
| Meson 跨平台 | 多语言项目统一构建方案 |
| Lua 脚本驱动 | 游戏逻辑数据化，插件化扩展 |
| 插件热加载 | Mission/Event/Outfit 插件系统设计参考 |
| 国际化和翻译 | gettext + Weblate 协作流程 |
| 体素风 2D 太空 | 俯视角 2D 空间渲染 + 着色器特效 |

## 项目亮点

- **严格 AI 政策**：明确禁止 LLM 生成代码提交，维护代码质量
- **依赖自包含**：subprojects 确保各平台编译一致性
- **艺术资产分离**：naev-artwork 作为 git submodule 独立管理
- **发布多渠道**：Steam + itch.io + Flathub + 各发行版包管理器

