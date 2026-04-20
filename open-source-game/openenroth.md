---
title: OpenEnroth
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, engine-remake, rpg, might-and-magic]
sources: [raw/articles/open-source-games-list-2026.md]
---

# OpenEnroth

> Might and Magic VI-VIII 引擎清洁室重实现，支持现代平台和改进的图形质量

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenEnroth/OpenEnroth |
| 语言 | C++23 (~136K LOC: 102K cpp + 34K h) |
| 构建系统 | CMake 3.27+ |
| 渲染 | SDL2 + OpenGL（自研渲染管线） |
| 许可 | GPLv2 |
| 状态 | 仅 MM7 可玩，MM6/MM8 WIP |
| CI | GitHub Actions (Windows/Linux/macOS) |

## 核心技术点

### 架构设计
- **模块化子系统**: `src/` 下 9 大子系统（Application/Engine/GUI/Io/Library/Media/Scripting/Utility/Arcomage）
- **Engine/**: 核心引擎（60 项），包含渲染、碰撞、物理等核心模块
- **Library/**: 共享工具库（26 项），提供通用数据结构与算法
- **Application/**: 主循环与入口点
- **LuaJIT 脚本**: `thirdparty/luajit` 子模块，`sol2` C++ Lua 绑定，Lua 脚本驱动游戏逻辑

### 第三方依赖管理
- **Git Submodules**: 22 个子模块，完全自包含依赖
- 关键依赖: ImGui (docking branch)、spdlog、fmt、nlohmann_json、glm、magic_enum、sol2
- **OE_USE_PREBUILT_DEPENDENCIES**: CMake 选项，可使用预编译依赖加速构建
- ccache/sccache 支持，mold/lld 链接器支持

### 构建系统特性
- C++23 强制开启 (`CMAKE_CXX_STANDARD_REQUIRED ON`)
- 严格编译选项 (`-Werror=return-type`, `-Werror=unused-result`)
- 自动化代码风格检查 (cpplint + llstlint)
- 测试构建 (`OE_BUILD_TESTS`)
- 工具构建 (`OE_BUILD_TOOLS`): LodTool + CodeGen

## 玩法特点

- **经典 RPG 重制**: 基于原版 Might and Magic VII 游戏数据运行
- **现代图形增强**: 原版 DOS 游戏的现代图形端口
- **跨平台支持**: Windows/Linux/macOS
- **需要原版游戏数据**: 必须持有 Might and Magic VII 合法拷贝（GOG 可购）

## 里程碑与进度

- ✅ MM7 完全可玩
- 🔄 MM6/MM8 开发中
- 详见 [GitHub Milestones](https://github.com/OpenEnroth/OpenEnroth/milestones)

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎架构 | 子系统模块化分离（Engine/GUI/Media/Scripting 各司其职） |
| 脚本系统 | LuaJIT + sol2 C++ 绑定，数据驱动游戏逻辑 |
| 依赖管理 | Git Submodules 自包含管理 22 个第三方库 |
| 构建系统 | CMake 3.27 + C++23 现代工具链，ccache/sccache 加速 |
| CI/CD | 三平台 GitHub Actions 自动化构建测试 |
| 代码风格 | cpplint + llstlint 自动化检查，-Werror 严格编译 |
| 清洁室逆向 | 从原版二进制到可读源码的逆向工程方法论 |

## 相关页面

- [[open-source-game/openmw]] — Morrowind 引擎重实现（对比参考）
- [[open-source-game/daggerfall-unity]] — Daggerfall Unity 重实现
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
