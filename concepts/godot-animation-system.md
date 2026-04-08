---
title: Godot 4 Animation System
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [godot, animation, game-dev, sprite, spritesheet]
sources: []
---

# Godot 4 Animation System

## Overview
Microverse 使用 Godot 4 的 `AnimatedSprite2D` + `SpriteFrames` 实现 2D 俯视角角色的帧动画。角色有 4 方向 idle、4 方向 run、4 方向 sit 共 12 个动画。

## SpriteFrames 配置（.tscn 内）

```gdscript
[sub_resource type="AtlasTexture"]
atlas = ExtResource("body_texture.png")
region = Rect2(576, 64, 32, 64)  # x=帧索引*32, y=方向行, w=32, h=64

[sub_resource type="SpriteFrames"]
animations = [{
    "frames": [SubResource("AtlasTexture_1"), ..., SubResource("AtlasTexture_6")],
    "loop": true,
    "name": &"idle_down",
    "speed": 5.0
}, ...]
```

## Microverse 角色动画清单

| 动画名 | 用途 | 方向 | 帧数 |
|--------|------|------|------|
| `idle` | 通用待机 | 无方向 | 6 |
| `idle_down` | 待机 | 下 | 6 |
| `idle_left` | 待机 | 左 | 6 |
| `idle_right` | 待机 | 右 | 6 |
| `idle_up` | 待机 | 上 | 6 |
| `run_down` | 跑步 | 下 | 6 |
| `run_left` | 跑步 | 左 | 6 |
| `run_right` | 跑步 | 右 | 6 |
| `run_up` | 跑步 | 上 | 6 |
| `sit_down` | 坐下 | 下 | (待定义) |
| `sit_left` | 坐下 | 左 | (待定义) |
| `sit_right` | 坐下 | 右 | (待定义) |
| `sit_up` | 坐下 | 上 | (待定义) |

## SpriteSheet 布局规范

角色精灵图布局（每个角色 `body.png`）：

```
Row 0 (y=0):    [idle x6] [walk x6] [run x6] ...
Row 1 (y=64):   [idle x6] [walk x6] [run x6] ...  ← Microverse 用这一行
Row 2 (y=128):  [walk x6] ...
Row N:          其他方向或动作
```

每帧 32×64px（宽度 32 = 单帧宽，高度 64 = 角色高）。

## CharacterController 动画状态机

```gdscript
func update_animation():
    var animated_sprite = $AnimatedSprite2D
    if is_sitting:
        return  # 坐下时保持 sit 动画，不更新

    if velocity == Vector2.ZERO:
        animated_sprite.play("idle_" + facing_direction)
    else:
        # 横向优先 vs 纵向优先
        if abs(velocity.x) > abs(velocity.y):
            facing_direction = velocity.x > 0 ? "right" : "left"
        else:
            facing_direction = velocity.y > 0 ? "down" : "up"
        animated_sprite.play("run_" + facing_direction)
```

### 状态转换图

```
         ┌─────────────────────────────┐
         │                             │
    idle_down / idle_left /      run_down / run_left /
    idle_right / idle_up         run_right / run_up
         │                             │
         └──────────┬──────────────────┘
                    │ velocity != ZERO
                    ▼
              run_[direction]
                    │
                    │ velocity == ZERO
                    ▼
              idle_[direction]
```

### 坐下动画

```gdscript
func toggle_sit():
    is_sitting = !is_sitting
    if is_sitting:
        $AnimatedSprite2D.play("sit_" + facing_direction)
    else:
        $AnimatedSprite2D.play("idle_" + facing_direction)
```

坐下后 `update_animation()` 被跳过（`if is_sitting: return`），保持坐姿直到离开椅子。

### 等待动画完成（用于坐下动画）

```gdscript
animated_sprite.play("sit_" + facing_direction)
await $AnimatedSprite2D.animation_finished
animated_sprite.play("idle_" + facing_direction)
```

## Godot 4 动画工具链

| 工具 | 用途 |
|------|------|
| **SpriteFrames** | 帧动画资源，存多个命名动画 |
| **AnimatedSprite2D** | 节点，播放 SpriteFrames 中的动画 |
| **AnimationPlayer** | 更强大的时间轴动画（属性插值） |
| **AnimationTree** | 状态机式的动画切换，适合复杂角色 |
| **Tween** | 代码驱动插值（透明度、位置、缩放） |
| **NinePatchRect** | UI 气泡背景拉伸（DialogBubble 用） |

## Microverse 未使用 AnimationTree

当前实现用 `AnimatedSprite2D`（最简方案）。如果角色数量增多或需要混合动画（边走边说话），应迁移到 `AnimationTree` + `AnimationNodeStateMachine`。

## 相关
[[godot-4]] — Godot 4 引擎概述
[[gdscript-patterns]] — CharacterController 包含所有角色控制逻辑
[[microverse-character-system]] — 角色 SpriteFrames 在 .tscn 中的配置
