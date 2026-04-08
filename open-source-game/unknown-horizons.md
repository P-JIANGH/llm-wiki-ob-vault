---
title: Unknown Horizons (Godot Port)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, city-building, godot, godot4, 2d, economy-simulation]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Unknown Horizons (Godot Port)

> 2D 实时策略模拟游戏，侧重经济与城市建造，从 FIFE 引擎迁移到 Godot 4 的重写项目

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/unknown-horizons/godot-port |
| 语言 | GDScript (314K LOC), GDShader, Shell |
| 引擎 | Godot 4.5 |
| 构建系统 | Godot 内置导出系统 (`build.sh`) |
| 许可 | GPL v2 |
| 开发阶段 | 早期实验阶段（尚无可玩内容） |
| 原项目 | https://github.com/unknown-horizons/unknown-horizons (FIFE 引擎, Python) |

## 核心技术点

### Godot 4 架构
- **Autoload 单例系统**：Global, Config, Audio, Cursor, GameStats — 全局状态管理
- **场景系统**：`MainMenuScene.tscn` → `World.tscn` 双场景架构
- **静态类型 GDScript**：全程类型标注，`:=` 类型推断，信号静态化
- **输入系统**：WASD 键盘 + 手柄摇杆双支持，deadzone 处理
- **UI 系统**：自定义 FlatStyles（RegularNormal/Hover/Pressed/Disabled），MenuTheme + HUDTheme 双主题

### 三阶段开发路线
1. **阶段一**：移植原项目功能集和资产，做出可玩版本
2. **阶段二**：扩展缺失内容（军事系统、高级城镇等级）
3. **阶段三**：资产评估、图形升级、平衡性调整

### 项目结构
```
Assets/
  Audio/         — 音乐、音效（.ogg.import）
  Player/        — 玩家相机 (PlayerCamera.gd/tscn)
  UI/
    FlatStyles/  — 按钮样式资源 (.tres)
    Fonts/       — 菜单字体
    Scenes/      — MainMenuScene, OptionsMenu 等
    Scripts/     — GDScript 逻辑
    Themes/      — HUDTheme, MenuTheme
  World/          — World.tscn, WorldPlace.gd
External/Fonts/   — LinLibertine 字体资源
DevTools/         — 开发工具
Editor/           — 编辑器配置
boot_splash.png   — 启动画面
project.godot     — Godot 项目配置
```

### 与原版 UH 的关系
- 原版基于 FIFE 引擎（Python 开发，活跃 10+ 年）
- Godot 端口目标：更高图形质量、更多交互可能性、更好性能
- 美术资产（Blender 文件）可复用原版大量内容

## 玩法特点

- **经济为核心**：税收、贸易、物资供给
- **城市扩张**：从小定居点发展为富裕殖民地
- **战略深度**：平衡经济 + 战略贸易 + 外交
- **原版特色**：深海港口、渔业、居民幸福度、多种建筑类型

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 引擎迁移策略 | 从旧引擎到 Godot 的渐进式移植，可参考其三阶段路线图 |
| GDScript 工程化 | 静态类型 + 单例模式 + 场景分工，适合中大型游戏 |
| 经济系统设计 | UH 的经济模型（生产链、税收、贸易）可作为建造类游戏的参考 |
| 输入系统 | WASD + 手柄双输入 + drag 相机是 RTS/建造类游戏标配 |
| UI 主题系统 | 双主题（Menu/HUD）+ 样式资源分离，便于换肤 |
| 资产复用 | 原版 Blender 资产生命周期管理值得借鉴 |
