---
title: Dead Ascend
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, qt, adventure, puzzle]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Dead Ascend

> 手绘风格点击冒险游戏，僵尸塔楼密室解谜，Qt/QML + JavaScript 开发

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/larpon/DeadAscend |
| 语言 | Qt/QML + JavaScript |
| 构建系统 | qmake (.pro) |
| 渲染/引擎 | QtQuick 2.0 (QML) + 手绘资源 |
| 许可 | 可能有自定义许可（LICENSE 文件存在）|
| 平台 | Linux, macOS, Windows, Android, iOS |

## 核心技术点

- **QML 游戏架构**：整个游戏逻辑用 QML/QtQuick 编写，C++ 仅用于底层扩展（FileIO、FPS 显示、语言切换）
- **QML 组件系统**：
  - `Core.qml` — 游戏核心状态机
  - `Game.qml` — 主游戏循环/场景管理
  - `Area.qml` / `AnimatedArea.qml` — 可交互区域组件
  - `Object.qml` — 游戏对象基类
  - `ObjectStore.qml` — 对象存储/持久化
  - `Inventory.qml` — 背包系统
  - `MusicPlayer.qml` — 音乐播放
  - `JSONReader.qml` — JSON 数据读取
- **TMX 场景格式**：关卡用 Tiled Map Editor 的 `.tmx` 格式存储（`scenes/scenes.tmx`），场景编号 0-8 共 9 个关卡
- **多平台支持**：通过 `Qak.platform` 检测移动端 vs 桌面端，自动切换全屏/窗口模式
- **外部扩展依赖**：
  - [qak](https://github.com/larpon/qak) — QML 工具库
  - [QtFirebase](https://github.com/larpon/QtFirebase) — Firebase 集成（移动端广告/分析）

## 玩法特点

- **剧情驱动点击冒险**：玩家扮演被僵尸追赶的角色，目标是爬上无线电塔获救
- **场景解谜**：每个场景（0-8）有独立谜题，需要找到物品、触发机关
- **手绘美术风格**：所有美术资源手工绘制
- **多语言支持**：内置 `translations/` 目录支持多语言
- **编辑器覆盖层**：`EditorOverlay.qml` — 内置游戏内编辑器/调试覆盖层

## 架构图

```
DeadAscend/
├── App/                    # 主应用
│   ├── main.cpp            # C++ 入口
│   ├── main.qml            # ApplicationWindow 根组件
│   ├── src/                # C++ 扩展
│   │   ├── fileio.cpp/h   # 文件读写
│   │   ├── fpstext.cpp/h   # FPS 显示
│   │   └── languageswitcher.cpp/h
│   ├── qml/                # QML 游戏组件
│   │   ├── Core.qml       # 核心状态机
│   │   ├── Game.qml        # 游戏循环
│   │   ├── Area.qml        # 交互区域
│   │   ├── Object.qml      # 游戏对象
│   │   ├── Inventory.qml   # 物品栏
│   │   ├── scenes/         # 各场景 QML（0-8）
│   │   └── menus/          # 菜单 UI
│   ├── assets/             # 资源（QRC 打包）
│   └── platforms/          # 平台特定代码
├── scenes/
│   └── scenes.tmx          # Tiled 地图编辑器文件
├── extensions/             # Git 子模块
│   ├── qak/                # QML 工具库
│   └── QtFirebase/         # Firebase 集成
└── DeadAscend.pro          # qmake 项目文件
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| QML 作为 UI 框架 | QML 可快速构建跨平台游戏 UI，适合轻量级 2D 游戏 |
| TMX 地图编辑器 | 可用 Tiled 作为关卡编辑器，数据驱动关卡设计 |
| 组件化游戏对象 | QML 的信号/属性机制天然适合游戏对象的组件化 |
| 多平台输出一套代码 | Qt 的跨平台抽象让 Android/iOS/Desktop 同时发布 |
| 外部工具库分离 | qak/QtFirebase 作为独立子模块，职责分离清晰 |

