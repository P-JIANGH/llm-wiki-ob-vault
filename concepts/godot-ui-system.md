---
title: Godot UI System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [game-engine, godot, frontend, ui]
sources: [raw/articles/godot-official-docs-2026.md]
---

# Godot UI System

## Overview
Godot 的 UI 系统建立在其独特的节点/场景架构上。所有 UI 元素都是 Control 节点或其子类，通过各种 Container 类型自动布局，通过 Theme 资源统一管理视觉风格。

## Core Concepts

### Control Nodes
所有 UI 元素的基类是 `Control`。常见子类：
- `Button` — 按钮
- `Label` — 文本标签
- `LineEdit` / `TextEdit` — 单行/多行文本输入
- `ProgressBar` — 进度条
- `TextureRect` — 图片显示
- `ScrollContainer` — 滚动容器
- `TabContainer` — 选项卡
- `Popup` / `Window` — 弹窗

### Layout System

#### Anchor 系统
设置控件的四个边相对于父节点的锚点位置，适合响应式布局。

#### Container 系统
自动排列子节点的特殊 Control：
- `VBoxContainer` — 垂直排列
- `HBoxContainer` — 水平排列
- `GridContainer` — 网格
- `MarginContainer` — 边距
- `PanelContainer` — 面板背景
- `CenterContainer` — 居中
- `AspectRatioContainer` — 保持比例

#### Size Flags
- Expand — 扩展占满可用空间
- Shrink Center — 紧凑居中
- Fill — 填充
- 组合实现复杂布局

### Theme 系统
- `Theme` 资源管理全局视觉风格
- 支持“类型”+ “名称”双维度定义
- 可继承和覆盖
- 包含 Font, StyleBox, Color, Constant, Icon, Base Type 等

### Signals 与事件
Control 节点发射大量信号用于 UI 交互：
- `pressed` — 按钮被按下
- `text_changed` — 文本改变
- `toggled` — 复选框切换
- `mouse_entered` / `mouse_exited` — 鼠标悬停
- `resized` — 大小改变

## Practical Tips
1. **使用 Container 而不是固定位置** — 响应式布局必须靠 Container
2. **分隔 UI 和逻辑** — 用 Scene 分离 UI 与游戏逻辑
3. **深度优先的输入处理** — 使用 `accept_event()` 阻止事件冒泡
4. **多分辨率适配** — 使用 Project Settings 的 stretch 模式

## Related
[[godot-4]] — 引擎概述
[[gdscript-patterns]] — 信号模式在 UI 中的应用
