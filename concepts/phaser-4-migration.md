---
title: Phaser 3 to Phaser 4 Migration
created: 2026-04-22
updated: 2026-04-22
type: concept
tags: [game-engine, phaser, frontend, typescript]
sources: [raw/articles/phaser-4-migration-2026.md]
---

# Phaser 3 to Phaser 4 Migration

## Overview
Phaser 4（2026 年发布）是该框架历史上最大的重写版本。全新渲染管线、统一滤镜系统、高性能游戏对象、显著改进的光照模型。对于螨光游戏工作室现有的 Phaser 3 + Vue 3 项目，需要关注迁移影响。

## 迁移工作量估算

| 项目类型 | 预计时间 |
|---|---|
| 标准 API（sprites、text、tilemaps） | 几小时 |
| 自定义 WebGL/shader | 数天（但新架构更清晰） |

## 核心变化

### 1. 渲染器重写（最大变化）
- Phaser 3 的整个 WebGL 渲染管线被替换
- **标准游戏对象**（sprites、text、tilemaps）：完全透明，无需修改
- **自定义 WebGL Pipeline**：必须重写为 **Render Nodes**，在启动时注册

### 2. FX 与 Mask 统一为 Filters

| Phaser 3 | Phaser 4 |
|---|---|
| Bloom, Shine, Circle FX | 目标对象上的 Action 调用 |
| Gradient FX | 真正的 Gradient 游戏对象 |
| BitmapMask | 新的 Mask filter |

统一的 Filter 系统可以应用于任何游戏对象或相机。

### 3. Tint、Lighting、Camera API 清理
- **`setTintFill()` 移除** → 使用 `setTint()` + `setTintMode()`（6 种混合模式）
- **光照**：不再分配 pipeline，改用 `setLighting(true)`
- **光源高度**：使用明确的 `z` 值
- **相机矩阵**：标准属性（scroll、zoom、rotation）不变，直接矩阵访问需更新

### 4. 小型 API 变更
- `Geom.Point` 移除 → 换为 `Vector2`
- `Math.TAU` 修正：v3 是 `PI/2`，v4 正确为 `PI*2`
- `Phaser.Struct.Set` / `Phaser.Struct.Map` 移除 → 使用原生 JS `Set` / `Map`
- `DynamicTexture` 现在需要显式调用 `.render()`
- `roundPixels` 默认值改为 `false`

### 5. 已移除功能（无直接替代）
- Mesh 和 Plane 游戏对象
- Camera3D 和 Layer3D 插件
- IE9 支持
- 内置 Spine 插件 → 改用 Esoteric Software 官方插件

### 6. 压缩纹理
- 必须重新压缩以适配 Phaser 4 内部 Y 轴方向

## 迁移步骤
1. 更新到 Phaser 4，运行游戏，收集编译错误
2. 处理渲染器相关代码
3. 更新 FX/Mask 为 Filter
4. 修复 Tint、Lighting、Camera API
5. 替换小型 API
6. 检查已移除功能
7. 测试验证

## 对螨光工作室的影响
- **reincarnator-simulator-v2**：使用标准 sprites 和 text，迁移工作量较小
- **hide-and-seek-cat**：同理，标准 2D 素材和动画
- **关键风险点**：如果自定义了 shader 或 WebGL pipeline，需重写为 Render Nodes

## Related
[[phaser-vue-integration]] — Phaser 3 + Vue 3 集成模式
[[godot-4]] — 另一款主力引擎对比
