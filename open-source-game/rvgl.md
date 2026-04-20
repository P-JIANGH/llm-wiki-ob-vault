---
title: RVGL
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, rc-car, sdl2, multiplayer]
sources: [https://gitlab.com/re-volt/rvgl-base, https://gitlab.com/re-volt/rvgl-docs]
---

# RVGL

> Re-Volt 现代跨平台移植版，基于 SDL2/OpenGL/Vulkan，支持 Windows/Linux/macOS/Android

## 基本信息

| 项目 | 内容 |
|------|------|
| 主页 | https://rvgl.org |
| 源码（公开部分） | https://gitlab.com/re-volt/（多个子仓库） |
| 核心引擎 | 私有（gk7huki 持有，不公开） |
| 语言 | C/C++（公共工具链） |
| 构建系统 | CMake（跨平台各有一套脚本） |
| 渲染/引擎 | SDL2 + OpenGL/Vulkan（可编程 Shader 渲染器） |
| 许可 | 混合：核心引擎私有 + 工具链/资产/文档开源 |
| 平台 | Windows, Linux, macOS, Android |

## 项目架构

RVGL 是一个独特的开源游戏项目：**核心游戏引擎源码私有**，但**所有周边工具链和资产完全开源**。

### 公开 GitLab 仓库（re-volt 组织）

```
rvgl-base        — 根仓库，git submodule 聚合（无直接源码）
├── rvgl-core    — ⚠️ 私有仓库（gk7huki持有），无公开代码
├── rvgl-assets  — 游戏资产（贴图/模型/音效），可自由使用
├── rvgl-devel   — 开发头文件 + 预编译库（Windows/macOS/Linux/Android）
├── rvgl-platform — 预编译二进制分发包
├── rvgl-docs    — MDBook 格式文档（tracks/cars/packs/advanced）
├── rvgl-launcher — 跨平台安装器/启动器（Electron/Java/Android）
└── game_files   — 原始游戏文件（需原版 Re-Volt 拷贝）
```

### 核心技术点（从公共组件分析）

**跨平台渲染架构**
- SDL2 作为底层跨平台抽象层（输入/音频/窗口/文件）
- OpenGL/Vulkan 可编程 Shader 渲染器（新渲染器，非原版软件渲染）
- 预编译库包括：libglad（OpenGL/Vulkan 加载器）、ENet（可靠 UDP 网络）、OpenAL（3D 音效）

**多人网络**
- ENet 可靠 UDP（与 AssaultCube、SuperTuxKart 同款网络库）
- 支持最多 16 名玩家同屏
- 旁观者（Spectator）模式
- Discord Rich Presence 集成（多人状态同步显示）

**内容管理系统**
- 类似 Mod Organizer 的 Pack 系统（20.1230a 版本引入）
- `packs/` 目录 + `packlist.txt` 选择性加载
- 支持 Mod 热切换，不移动文件，纯逻辑合并

**车辆/赛道系统**
- 自定义参数文件（parameters.txt）支持：自定义引擎声/喇叭声/伺服声（均为 WAV）
- 自定义影子贴图（64x64 阴影图）
- TCARBOX 参数支持自定义包装盒艺术图
- 赛道支持自定义动画（门/电梯/移动平台）和 reversed 模式

**Android 支持**
- SDL2 Android 移植（`android/controllermap`）
- JNI 集成 SDL2 全部子系统
- 支持游戏手柄/触控

## 玩法特点

- **核心玩法**：遥控赛车竞技，1999 年 Acclaim 发行的经典 R/C 汽车游戏复刻
- **车辆物理**：自定义物理参数（加速度/最高速/转向/摩擦力等）
- **赛道编辑**：自定义赛道，N 节动画系统，多起点/终点配置
- **游戏模式**：计时赛/竞速赛/锦标赛/气球战/城堡战等
- **分屏多人**：2-4 人同屏（Split-Screen）
- **画面增强**：宽屏/Full HD/4K 支持，多显示器支持

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 周边开源策略 | 核心私有 + 工具链/资产开源，适合商业 IP 保持竞争力同时建立社区 |
| 跨平台发布 | SDL2 抽象层是游戏跨平台的成熟方案 |
| 内容生态 | Pack 系统让玩家自制内容管理简便，降低社区门槛 |
| 网络同步 | ENet 在开源赛车/射击游戏中广泛验证，适合确定性低延迟需求 |
| Discord 集成 | Rich Presence 是现代多人游戏的标配社交功能 |
