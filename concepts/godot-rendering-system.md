---
title: Godot Rendering System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [game-engine, godot, rendering, shader]
sources: [raw/articles/godot-official-docs-2026.md, raw/articles/godot-4-6-gdquest-2026.md]
---

# Godot Rendering System

## Overview
Godot 4 提供三个渲染器，分别针对桌面高端、移动/桌面轻量、低端/网页场景。基于 Vulkan API，同时支持 Direct3D 12 和 Metal 后端。

## Three Renderers

| Renderer | Target | Default | API | Backend |
|---|---|---|---|---|
| **Forward+** | Desktop (most advanced) | Desktop | Vulkan, D3D12, Metal | RenderingDevice |
| **Mobile** | Mobile/Desktop (fewer features, faster) | Mobile | Vulkan, D3D12, Metal | RenderingDevice |
| **Compatibility** | Low-end / Web | Web | OpenGL | — |

### Forward+ Renderer
- 基于的 Vulkan RenderingDevice 后端
- 支持高级特性：SSR, SSAO, SDFGI, Volumetric Fog, Volumetric Lighting
- 适合 AAA-level 的主机和 PC 游戏

### Mobile Renderer
- 相同的 RenderingDevice 后端，但禁用了部分高费用特性
- 更低的 GPU 滤镜要求
- 适合移动设备和中低端桌面

### Compatibility Renderer
- 基于 OpenGL，支持最广的硬件范围
- Web 平台默认使用
- 缺亏高纣特性，但兼容性最好

## Backend Evolution
- Godot 4.0: Vulkan 默认
- Godot 4.6: Windows 默认切换为 Direct3D 12（因 Vulkan 驱动问题）

## Shader System

Godot 使用简化的 GLSL 着色器语言，引擎自动处理底层初始化。

### Shader Types
- `shader_type spatial` — 3D 渲染
- `shader_type canvas_item` — 2D 渲染
- `shader_type particles` — 粒子系统
- `shader_type sky` — 天空盒
- `shader_type fog` — 体积雾

### Processor Functions
| Function | Scope | Description |
|---|---|---|
| `vertex()` | 每个顶点 | 修改顶点位置、传递 varyings |
| `fragment()` | 每个像素 | 设置材质属性（ROUGHNESS, RIM, TRANSMISSION） |
| `light()` | 每个像素 × 每个光源 | 逐光源处理 |
| `start()` | 每个粒子 × 1 次 | 粒子初始化 |
| `process()` | 每个粒子 × 每帧 | 粒子更新 |
| `sky()` | 天空盒像素 | 天空渲染 |
| `fog()` | Froxel 体积雾 | 体积雾渲染 |

### Conditional Compilation
Godot 检测是否写入了某个 built-in（如 `RIM`）。如果未使用，对应的计算代码在编译时被完全剥离，无费用计算。

### Visual Shader
- 节点图形化 Shader 编写界面
- 无需书写代码，拖拽连接
- 支持自定义节点和 GLSL 原生代码插入

### Compute Shaders
- 完全自定义 GLSL Compute Shader
- 通过 `RenderingDevice` API 提交计算任务
- 适合 GPU 并行计算（粒子仿真、声场图、数据处理）

## 2D Rendering Features
- 专用 2D 渲染管线（非 3D 投影，像素级精度）
- Polygon2D, Line2D 绘制
- AnimatedSprite2D 帮助类
- 视差层（Parallax layers）
- 伪 3D 支持（Pseudo-3D）
- 2D 光照：法线/镜面高光贴图、软/硬阴影、SDF 全局照明
- 字体渲染：TTF/OTF/WOFF1/WOFF2/MSDF/颜色字体/可变字体
- GPU 和 CPU 粒子系统
- 可选 2D HDR 渲染

## 3D Rendering Features
- Forward+ 正向渲染
- 各种后处理效果（环境光照、光照探测、HDR 生成、光晕、SSAO、SSR、体积雾）
- PBR 工作流
- GLTF 导入
- 3D 粒子系统

## Related
[[godot-4]] — 引擎概述
[[godot-vs-unity-unreal]] — 渲染能力对比
[[godot-animation-system]] — 动画系统
