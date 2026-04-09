---
title: Liblast
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, godot4, multiplayer, action]
sources: [https://codeberg.org/liblast/liblast]
---

# Liblast

> Libre multiplayer FPS game and framework using Godot 4 with fully open-source tool chain.

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub/Codeberg | https://codeberg.org/liblast/liblast |
| 语言 | GDScript (Godot 4.3) + C++ (Godot Jolt) |
| 构建系统 | Godot Editor (export templates for Win/Linux/macOS/Android/iOS) |
| 渲染/引擎 | Godot 4.3 Forward Plus, Godot Jolt Physics (JoltPhysics3D) |
| 许可 | GPL 或同等级自由许可证 |
| 状态 | ⚠️ 主仓库已弃用，建议使用 https://codeberg.org/Liblast/liblast-framework |

## 核心技术点

- **Godot 4.3 + Godot Jolt**：用 Jolt 物理引擎替代 Godot 内置Bullet，获得高性能物理模拟
- **Freeman Character System 子模块**：`src/freeman-character-system/` 提供了模块化角色控制器（character_controller/character_component/character_head 分离设计），可复用于其他项目
- **多窗口调试架构**：project.godot 中 `debug/multirun` 配置 3 个窗口同时运行（客户端+服务端+观战），便于本地调试多人逻辑
- **数据驱动设计**：`data/` 目录组织系统/游戏数据，着色器全局变量通过 `[shader_globals]` 配置 world_noise 3D 纹理
- **Git LFS 管理资产**：二进制资产（纹理、模型）通过 git-lfs 存储，必须 `git lfs pull` 才能正确运行
- **Replay 系统**：`core/replays/` 实现回放录制与回放列表 UI

## 玩法特点

- 多人 FPS，支持 Client/Server 架构 + 专用服务器模式 (`dedicated.gd`)
- 支持 Splitscreen 本地多人 (`splitscreen.gd`)
- 支持手柄 (Input events 含完整 Joypad mapping)
- 武器/准星/冲刺/下蹲/环顾等完整 FPS 操作集

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 角色模块化设计 | Freeman Character System 的 character_component 分离模式可作为 AI 控制角色的参考架构 |
| Godot 4 多人网络 | Client/Server 分离 + dedicated server 模式是 AI 游戏常用的网络架构 |
| 物理引擎选型 | Godot Jolt (JoltPhysics3D) 比 Bullet 性能更好，可作为 AI 物理模拟的首选 |
| 调试工具 | 多窗口同时运行 + replay 系统对 AI 行为调试很有价值 |
| 开源工具链 | Godot + Git LFS + 导出模板 = 完全自由的游戏开发栈 |

## 目录结构

```
src/
├── freeman-character-system/   # 角色系统子模块（独立可复用）
│   ├── base_character/
│   ├── character_controller/
│   ├── character_components/  # 组件化设计（冲刺、射击等）
│   └── character_head/
└── game/
    ├── project.godot           # Godot 4 项目配置
    ├── core/
    │   ├── system/             # game/server/client 核心逻辑
    │   ├── networking/         # 网络同步
    │   ├── map/                # 地图系统
    │   ├── hud/                # UI 界面
    │   ├── weapon/             # 武器系统
    │   ├── character/          # 角色实体
    │   └── replays/            # 回放系统
    ├── data/                   # 游戏数据（纹理、配置）
    ├── system/                 # 启动、日志、UI
    ├── addons/                 # 第三方插件
    └── tests/                  # Godot 单元测试
```

## 注意

> ⚠️ 该仓库已被作者标记为非工作状态，活跃开发已迁移至 [liblast-framework](https://codeberg.org/Liblast/liblast-framework)。如需基于 Liblast 开发，应使用新的 framework 仓库。
