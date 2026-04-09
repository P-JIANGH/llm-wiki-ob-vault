---
title: Portal64 Still Alive
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, demake, n64, puzzle, platformer, portal]
sources: [https://github.com/mwpenny/portal64-still-alive]
---

# Portal64 Still Alive

> Valve Portal 的 N64 demake（复古平台重制版），移除私有 libultra 依赖，17 个测试室可玩

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/mwpenny/portal64-still-alive |
| 语言 | C（主代码）+ 少量 C++ |
| 构建系统 | CMake（多子目录 CMakeLists.txt） |
| 渲染/引擎 | N64 libultra 私有库（正在迁移至 libdragon 开源替代） |
| 许可 | 源码 MIT/BSD-like，游戏资产需原版 Portal |
| 原作者 | James Lambert（被 Valve 要求下架原版） |
| Fork 目标 | 移除 Nintendo libultra 私有依赖，完成游戏开发 |

## 核心技术点

### N64 Demake 架构
- **Portal 核心系统移植**：传送门枪物理、胶囊体碰撞、portal surface 生成
- **Skeletool64 骨骼动画工具**：读取 `assets/materials/*.yaml` 生成静态显示列表（display list）代码
- **17 个测试室已完成**：chamber 00-16 可玩，含炮台、传送门、伴生立方体
- **scene/render_plan.c**（635行）、**scene/portal_surface_generator.c**（1109行）：核心渲染与传送面生成逻辑
- **physics/** 子系统（EPA 碰撞+contact_solver+collision_scene，约 2.2K 行）：GJK/EPA 碰撞算法

### libultra 依赖问题
- 原版依赖 Nintendo 私有 libultra（音频、显示处理、信号处理、系统调用）
- 正在迁移至 **libdragon**（开源 N64 开发库，支持 OpenGL 1.1）
- **debugger/usb.c**（1497行）和 **debugger/debug.c**（2195行）：硬件调试支持（USB 调试钩子）

### 资源管线
- **vpk/** 子目录：VPK 文件提取工具，从原版 Portal 提取游戏资源
- **assets/** 多子目录：translations/test_chambers/materials/models/fonts/sound，CMake 资源打包
- **locales/**：多语言字幕/音频支持

### 存档系统
- **savefile/** 模块（serializer + checkpoint + scene_serialize，共约 1.5K 行）
- SRAM 32KB 存档支持，含检查点序列化

## 玩法特点

- 完整 Portal 核心机制：portal gun、portal surface、physics engine
- 主菜单 + 暂停菜单
- 过场动画（cutscene_runner.c，720行）
- 音效/对话/多语言字幕
- 渲染特效（反射、视觉效果）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Demake 架构 | 如何将现代 3D 游戏内容反向移植到复古平台（N64 硬件约束） |
| 物理系统 | EPA/GJK 碰撞检测在受限硬件上的实现 |
| 资源管线 | 如何从商业游戏提取资产并重新打包用于开源项目 |
| libultra 替代 | 从私有 SDK 迁移到开源替代（libdragon）的增量迁移策略 |
| 调试基础设施 | USB 硬件调试钩子设计（debugger 模块 3.6K 行） |

## 源码规模

- **总规模**：约 41,674 行 C 代码（不含 asm/linker/vpk/tools）
- **最大文件**：debug.c（2195行）、portal_surface_generator.c（1109行）、player.c（1239行）
- **模块化结构**：audio/controls/decor/effects/font/graphics/levels/materials/math/menu/physics/player/scene/sk64/strings/system/util

## 开发状态

- ✅ Chamber 00-16 完成
- ⏳ Chamber 17：伴生立方体完成，焚化炉未完成
- ❌ Chamber 18-19、逃脱关卡、Credits 未完成
- 目标：完成所有关卡 + 移除 libultra 依赖
