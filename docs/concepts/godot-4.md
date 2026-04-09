---
title: Godot 4
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [framework, game-engine, tool]
sources: [raw/articles/microverse-ksanadock-2026.md]
---

# Godot 4

## Overview
开源游戏引擎，MIT 许可证，社区驱动。最新稳定版 4.6（2026年1月），4.7 开发中。支持 2D/3D/XR 游戏开发，一次导出多平台。

## Core Architecture

### Node & Scene System
Godot 的核心设计。游戏由 Node（节点）和 Scene（场景）构成树形结构。
- **Node**: 最小单元，可挂载脚本
- **Scene**: 可复用的 Node 树（相当于 Prefab）
- **Scene Tree**: 所有 Node 的层级管理

### Rendering
- 专用 2D 渲染引擎（像素级坐标，非 3D 投影）
- 3D 节点提供完整的建模、动画、渲染能力
- 渲染器可切换（Forward+ / Mobile / Compatibility）

## Scripting

### GDScript（主力语言）
- Python-like 语法，设计上类似 Python 但专为游戏优化
- Godot 4 使用 GDScript 3.0（语法更清晰，性能优化）
- 动态类型，简洁易学

### 其他语言支持
- **C#**: 桌面和移动平台（4.2+），Web 需用 Godot 3
- **C++**: 通过 GDExtension 编写高性能扩展
- **GDExtension**: 官方扩展接口，接入原生代码

## Key Features

### Physics
- Godot Physics（4.x 内置，替代了 3.x 的 Bullet）
- **Jolt Physics**: Godot 4.4+ 将 Jolt 直接集成，替代 extension 模式，提供更准确的碰撞检测
- 3D 逆运动学（Inverse Kinematics）: 4.6 重新引入

### Cross-Platform Export
| 平台 | 状态 |
|------|------|
| Windows | ✅ 稳定 |
| macOS | ✅ 稳定 |
| Linux | ✅ 稳定 |
| Android | ✅ 稳定（含 Android XR） |
| iOS | ✅ 稳定 |
| Web (HTML5) | ✅ |
| Console | 通过第三方发布商 |

### XR / VR / AR
- OpenXR 标准支持
- Android XR: 4.6 起官方支持
- SteamVR / Meta Quest 等主流头显

## Version History (Key Releases)

| 版本 | 日期 | 亮点 |
|------|------|------|
| 4.0 | 2022年底 | 全新渲染器，GDScript 3.0 |
| 4.4 | 2025年初 | Jolt Physics 内置集成，.NET 8.0 |
| 4.6 | 2026年1月 | Inverse Kinematics 回归，质量优化 |
| 4.7 | 开发中 | 性能优化为主 |

## Project Structure（典型 Godot 项目）
```
project.godot      # 项目配置文件
scenes/            # .tscn 场景文件（二进制/文本）
scripts/           # .gd GDScript 文件
assets/            # 资源文件（图片/音频/模型）
export_presets.cfg # 导出平台配置
```

`.tscn` 文件格式：类似 YAML，描述 Node 树结构

## Editor
- 集成开发环境：场景编辑器、脚本编辑器、动画编辑器、文件系统等
- 内置 API 参考文档（Class Reference）
- 插件系统（GDScript 编写插件）
- Asset Library：社区资源商店

## Godot Foundation
- 2022 年成立的非营利组织，支撑引擎开发
- 赞助商：W4 Games 及企业铂金/黄金会员

## Related
[microverse-project](#/entities/microverse-project) — 使用 Godot 4 的项目
[multi-agent-ai-simulation](#/concepts/multi-agent-ai-simulation) — 游戏内 AI 系统的上层应用
