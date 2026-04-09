---
title: VVVVVV
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, indie]
sources: []
---

# VVVVVV

> 2010 年像素风平台跳跃游戏，核心机制是"翻转重力"而非跳跃，源码于 2020 年由 Terry Cavanagh 开源。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/TerryCavanagh/VVVVVV |
| 语言 | C++ (主), C (辅助) |
| 构建系统 | CMake (C++ desktop version) |
| 渲染/引擎 | SDL2 2.24.0+ (唯一外部依赖，全部其他库静态链接) |
| 许可 | 自定义 license + data.zip 商业限制 |
| Stars | 7938 |
| 平台 | Windows, macOS, Linux, iOS, Android |

## 核心技术点

### 演化历程
- **原版 (2010)**: ActionScript + Flash 平台，由 Terry Cavanagh 开发，音乐 Magnus Pålsson
- **2.0 (2011)**: Simon Roth 移植到 C++ 自定义引擎（Machine Studios）
- **2.2 (2014)**: Ethan Lee 重写为 SDL2 + PhysicsFS + Steamworks 跨平台版本（当前主流）

### 极简依赖策略
第三方库全部静态链接到引擎，形成自包含二进制：
- **tinyxml2**: 关卡数据 XML 解析
- **PhysicsFS**: 虚拟文件系统（读取 data.zip）
- **FAudio**: 音频引擎（Flash/Audio 替代）
- **lodepng**: PNG 图像加载
- **c-hashmap**: 通用哈希表
- **SheenBidi**: Unicode 双向文本渲染

### 主要源文件架构（desktop_version/src/）

| 文件 | 类型 | 规模 | 说明 |
|------|------|------|------|
| Entity.cpp | C++ | ~159K LOC | 玩家实体、物理碰撞、重力翻转逻辑核心 |
| Game.cpp | C++ | ~229K LOC | 游戏状态机、主循环、菜单系统 |
| Labclass.cpp | C++ | ~177K LOC | 秘密实验室关卡（主故事模式 4 个世界之一） |
| Editor.cpp | C++ | ~141K LOC | 内置关卡编辑器（完整 GUI） |
| CustomLevels.cpp | C++ | ~53K LOC | 自定义关卡加载/运行系统 |
| Script.cpp | C++ | ~130K LOC | 脚本系统（对话/触发器） |
| Graphics.cpp | C++ | ~108K LOC | 2D 渲染管线 |
| Map.cpp | C++ | ~67K LOC | 地图/关卡数据结构 |
| Otherlevel.cpp | C++ | ~924K LOC | **最大文件**，故事模式其他 3 个世界 (Spacestation2/Tower) |

**总计**: ~92 个 .cpp/.c 源文件，Game/Entity/Labclass/Editor 四文件占 ~700K LOC。

### 游戏数据系统
- `data.zip`: 打包的游戏资源（关卡/音乐/贴图），需要从原版游戏或 Make and Play 免费版获取
- 关卡格式: 自定义 XML (由 tinyxml2 解析)
- MAKEANDPLAY 宏: 编译不含主战役的版本（仅编辑器 + 自定义关卡）

### 平台抽象层
- CMakeLists.txt 处理 Windows (Visual Studio 2010)/macOS (Xcode)/Linux (CentOS 7)/iOS/Android
- `SteamNetwork.c` / `GOGNetwork.c`: Steamworks/GOG Galaxy 网络 API 条件编译

### 内置关卡编辑器
完整的游戏内编辑器 (Editor.cpp 141K LOC)，支持放置实体、创建房间、编辑脚本触发器、预览运行模式、导出/导入自定义关卡。

## 玩法特点

- **无跳跃**: 玩家只能 flip（翻转重力向上/向下），通过翻转穿越平台和障碍
- **两个故事章节**: Intermission 1 & 2
- **内置地图编辑器**: 玩家自制关卡生态
- **Speedrun 友好**: 完整内部计时器，speedrunner 选项菜单
- **Accessibility**: 大量无障碍选项（输入延迟、slowdown、invincibility 等）
- **本地化**: 独立翻译系统支持多语言

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 依赖最小化 | 仅用 SDL2，其余全部自包含 —— 对 AI 游戏引擎有借鉴意义 |
| 清洁代码架构 | Entity/Game/Map/Script/Music 清晰分离，便于 AI 分析游戏状态 |
| 内置编辑器即产品 | Editor.cpp 141K LOC 是完整的游戏开发工具，可研究 AI 生成关卡的工程路径 |
| 重力翻转的简单规则复杂表现 | 极简核心机制 → 大量关卡内容 —— AI 游戏设计教科书级案例 |
| 数据驱动关卡 | XML + PhysicsFS 虚拟文件系统 —— 资产与代码分离的轻量方案 |
| 静态链接第三方 | 完全自包含可移植二进制，MAKEANDPLAY 模式 —— AI 训练环境打包参考 |
