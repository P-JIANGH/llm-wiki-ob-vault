---
title: Godot 4
created: 2026-04-08
updated: 2026-04-20
type: concept
tags: [framework, game-engine, tool]
sources: [raw/articles/microverse-ksanadock-2026.md, raw/articles/godot-official-docs-2026.md, raw/articles/godot-4-6-gdquest-2026.md]
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
- **Signals**: Observer 模式的信号机制，节点间松耦合通信

### 三大渲染器 (Renderers)

| 渲染器 | 适用场景 | 默认平台 | 后端 API |
|---|---|---|---|
| **Forward+** | 桌面（功能最全） | Desktop | Vulkan, D3D12, Metal |
| **Mobile** | 移动/桌面（简化） | Mobile | Vulkan, D3D12, Metal |
| **Compatibility** | 低端/网页 | Web | OpenGL |

Godot 4.6 将 Windows 默认后端从 Vulkan 切换为 Direct3D 12，因 Vulkan 驱动在 Windows 上问题较多。

### 渲染架构要点
- 简化 GLSL 着色器语言，支持 7 种处理器函数 (`vertex`, `fragment`, `light`, `start`, `process`, `sky`, `fog`)
- 条件编译优化：未使用的 built-in 属性自动剥离，无费用计算
- 可用 Visual Shader 可视化编写 Shader
- 支持 Compute Shaders 完全自定义 GLSL

## Scripting

### GDScript（主力语言）
- Python-like 语法，专为游戏引擎优化
- Godot 4 使用 GDScript 3.0（类型注解、性能改进）
- 动态类型，简洁易学

### 其他语言支持
- **C#**: 桌面和移动平台（4.2+），Web 需用 Godot 3
- **C++**: 通过 GDExtension 编写高性能扩展
- **GDExtension**: 官方扩展接口，接入原生代码

## Key Features

### Physics
- **Godot Physics**（4.x 内置，替代了 3.x 的 Bullet）
- **Jolt Physics**: Godot 4.6 新项目默认使用，提供更精确碰撞检测（同样用于 Death Stranding 2）
- 3D 逆运动学（Inverse Kinematics）: 4.6 重新引入

### Cross-Platform Export
| 平台 | 状态 |
|------|------|
| Windows | 稳定 |
| macOS | 稳定 |
| Linux | 稳定 |
| Android | 稳定（含 Android XR） |
| iOS | 稳定 |
| Web (HTML5) | 实验性 |
| Console | 第三方发布商 |

### XR / VR / AR
- OpenXR 标准支持
- Android XR: 4.6 起官方支持
- SteamVR / Meta Quest 等主流头显

## Version History

| 版本 | 日期 | 亮点 |
|------|------|------|
| 4.0 | 2022年底 | 全新渲染器，GDScript 3.0 |
| 4.4 | 2025年初 | Jolt Physics 内置，.NET 8.0 |
| 4.5 | 2025年中 | 稳定性提升 |
| 4.6 | 2026年1月 | Jolt 默认的 3D 物理，D3D12 默认后端，全新 Modern 主题，Inverse Kinematics 回归 |
| 4.7 | 开发中 | 性能优化为主 |

## Editor (4.6 新特性)
- **Modern 主题**: 灰色调设计，减少干扰
- **Docking 灵活性**: 底部面板纳入 docking 布局，支持浮动窗口
- **Quick Open Live Preview**: 浏览资源时实时预览
- **Drag-to-Script**: 拖拽资源到脚本编辑器自动生成 `@export`
- **调试增强**: Output 面板点击跳转、运行时速度调节、Step Out 断点

## Project Structure
```
project.godot      # 项目配置
scenes/            # .tscn 场景文件
scripts/           # .gd GDScript
assets/            # 资源
export_presets.cfg # 导出配置
```

`.tscn` 文件格式：类似 YAML，描述 Node 树结构，可人工 diff 和版本控制。

## Godot Foundation
- 2022 年成立的非营利组织，支撑引擎开发
- 赞助商：W4 Games 及企业铂金/黄金会员

## Related
[[godot-rendering-system]] — 三大渲染器、Shader 、着色器系统
[[godot-ui-system]] — Control 节点、布局系统、主题
[[godot-networking]] — 高级多人游戏、场景复制、RPC
[[godot-animation-system]] — AnimatedSprite2D / AnimationPlayer / AnimationTree
[[gdscript-patterns]] — 实战设计模式与架构
[[microverse-project]] — 使用 Godot 4 的项目案例
[[godot-vs-unity-unreal]] — 与 Unity / Unreal 的全面对比
