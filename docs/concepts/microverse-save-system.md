---
title: Microverse Save System
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [microverse, game-dev, save, persistence, architecture]
sources: []
---

# Microverse Save System

## Overview
GameSaveManager 实现游戏内完整存档/读档。所有角色状态、位置、任务、AI 状态全部持久化为 JSON 文件。

## 核心架构

```
GameSaveManager (Autoload 单例)
├── SAVE_DIR = "user://saves/"          # Godot 跨平台用户目录
├── collect_game_data()                 # 序列化所有数据
├── apply_game_data()                   # 反序列化恢复状态
├── save_game() / load_game()          # 读写 .json 文件
└── get_save_files() / delete_save()    # 存档管理
```

## 保存数据结构

```json
{
    "version": "1.0",
    "timestamp": 1744000000.0,
    "scene_name": "Office",
    "characters": [
        {
            "name": "Alice",
            "position": {"x": 512.0, "y": 384.0},
            "facing_direction": "down",
            "is_sitting": false,
            "current_chair": null,
            "is_player_controlled": false,
            "ai_state": {"current_state": 0},
            "tasks": [
                {"description": "检查邮件", "priority": 7, "completed": false}
            ],
            "personality": {...}  // CharacterPersonality 配置快照
        }
    ],
    "rooms": {...},
    "global_state": {
        "game_time": 1744000000.0,
        "settings": {...}
    }
}
```

## 保存流程

```
save_game(save_name?)
    ↓
collect_game_data()
    ├── collect_character_data() × N  (遍历 group:"character")
    │   ├── position / facing_direction / is_sitting / current_chair
    │   ├── AIAgent: is_player_controlled / current_state / tasks
    │   └── personality (快照)
    ├── collect_room_data()           (RoomManager)
    └── collect_global_state()        (SettingsManager)
    ↓
JSON.stringify(save_data)
    ↓
FileAccess.open(SAVE_DIR + name + ".json", WRITE)
```

## 加载流程

```
load_game(save_name)
    ↓
FileAccess.open(SAVE_DIR + name + ".json", READ)
    ↓
JSON.parse_string(content)
    ↓
apply_game_data(data)
    ├── apply_character_data() × N
    │   ├── global_position = Vector2(x, y)
    │   ├── toggle_player_control()
    │   ├── current_state 恢复
    │   └── tasks[] 恢复
    └── apply_global_state()
        └── SettingsManager.update_settings()
```

## 关键设计

### 节点查询策略
```gdscript
# 通过 group 找到所有角色
var characters = get_tree().get_nodes_in_group("character")

# 按名称精确查找
func find_character_by_name(name: String) -> Node:
    for character in get_tree().get_nodes_in_group("character"):
        if character.name == name: return character

func find_chair_by_name(name: String) -> Node:
    for chair in get_tree().get_nodes_in_group("chairs"):
        if chair.name == name: return chair
```

### Property 检查防崩溃
```gdscript
if controller.has_property("is_sitting"):
    character_data["is_sitting"] = controller.is_sitting
if ai_agent.has_method("toggle_player_control"):
    ai_agent.toggle_player_control(data["is_player_controlled"])
```

### 存档目录
```gdscript
const SAVE_DIR = "user://saves/"
# Godot user:// 是跨平台的用户文档目录
# Windows: %APPDATA%/Microverse/user://saves/
# macOS: ~/Library/Application Support/Microverse/user://saves/
```

### 自动存档
```gdscript
if save_name.is_empty():
    save_name = "autosave_" + Time.get_datetime_string_from_system().replace(":", "-")
# 例: autosave_2026-04-08 10-53-22.json
```

## 与 ChatHistory 的持久化对比

| 系统 | 存储路径 | 格式 | 触发时机 |
|------|---------|------|---------|
| GameSaveManager | `user://saves/` | JSON (结构化) | 手动/自动存档 |
| ChatHistory | `user://chat_history/` | JSON (消息流) | 每次 add_message |

## 相关
[microverse-code-structure](#/entities/microverse-code-structure) — GameSaveManager 位于 script/
