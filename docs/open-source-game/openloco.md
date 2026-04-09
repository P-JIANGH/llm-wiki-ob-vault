---
title: OpenLoco
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, business-sim, cpp, sdl, recreation]
sources: [https://github.com/OpenLoco/OpenLoco]
---

# OpenLoco

> Chris Sawyer's Locomotion 开源重实现，运输公司经营模拟，继 OpenTTD/OpenRCT2 之后第三条经典复刻路线

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenLoco/OpenLoco |
| 语言 | C++（约400 .cpp + 358 .h）|
| 构建系统 | CMake 3.22+，支持 vcpkg |
| 渲染/引擎 | SDL3（跨平台）+ 自研渲染层 |
| 许可 | GPLv2 |
| 平台 | Windows, Linux, macOS |
| 状态 | 游戏主体已完成重实现（2025年12月），正在开发多人模式 |

## 核心技术点

### 清洁室逆向工程
- 不基于 OpenRCT2 代码，从零重写（CSL 原版是 x86 汇编，基于 RCT2 引擎）
- 通过逆向工程理解原版行为，确保兼容 CSL 的 SV5/SC5 存档格式
- 仍需要原版游戏资产文件（Steam/GOG 可购）

### 模块化 C++ 架构
```
src/
├── Platform/     # 平台相关（Win/Linux/Mac 抽象）
├── Core/         # 核心工具（内存流、文件系统）
├── Engine/       # 游戏引擎子系统
├── Audio/        # 音频系统
├── Gfx/          # 图形渲染
├── OpenLoco/     # 游戏逻辑层
│   ├── Entities/     # 实体系统（车辆/建筑/人物）
│   ├── Map/          # 地图/地表系统
│   ├── Vehicles/     # 载具物理与AI
│   ├── Economy/      # 经济系统
│   ├── GameCommands/ # 游戏指令（玩家操作）
│   ├── Network/      # 多人网络
│   ├── Objects/      # 资产对象系统
│   └── World/        # 世界/地形系统
└── Utility/      # 通用工具库
```

### 依赖管理（vcpkg）
- **SDL3**：跨平台窗口/输入
- **OpenAL Soft**：音频
- **libpng**：PNG 纹理
- **yaml-cpp**：配置序列化
- **fmt**：格式化
- **TBB**（Linux）：多线程
- **benchmark**：性能测试
- **GTest**：单元测试

### 网络多人模式
- 已完成游戏主体重实现，当前主攻方向：多人网络体验
- 支持 `host`/`join` 命令行模式
- Discord 社区活跃

## 玩法特点

- **运输帝国经营**：建造和管理铁路、公路、航空、航运网络
- **竞争经济**：与对手公司竞争，争夺市场份额
- **景观编辑**：建设主题公园、研究新技术
- **时间维度**：从1900年代开始，管理长期公司发展
- **资产兼容**：需要原版 Locomotion 资产包

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室逆向 | 不碰原版代码，从零重实现兼容存档 — 适合公司复刻经典游戏 |
| 多模块 CMake | 大型 C++ 项目用 CMake + vcpkg 管理依赖，模块边界清晰 |
| SDL3 跨平台 | SDL3 是现代 C++ 游戏跨平台首选，值得掌握 |
| 游戏 vs 引擎分离 | 游戏逻辑与渲染/平台层分离，便于未来换引擎 |
| 数据驱动对象系统 | Objects/ 资产系统 — 新资产无需改代码 |
| 多人网络 | 网络同步是成熟商业游戏的标配功能 |

## 相关页面

- [open-source-game-engines-comparison](#/comparisons/open-source-game-engines-comparison) — 开源游戏引擎对比
- [open-source-games-list](#/entities/open-source-games-list) — 开源游戏列表总览
- [corsixth](#/open-source-game/corsixth) — Theme Hospital 开源克隆（同类模拟经营）
- [openttd](#/open-source-game/openttd) — Transport Tycoon Deluxe 开源复刻（同类经典）
