---
title: GDScript Patterns
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [godot, gdscript, language, pattern]
sources: [raw/articles/microverse-ksanadock-2026.md]
---

# GDScript Patterns

## Overview
GDScript 是 Godot 的主脚本语言，Python-like 语法，专为游戏引擎优化。Microverse 项目展示了大量实战设计模式。

## 核心语法速查

### 节点与类
```gdscript
extends Node                    # 继承
@export var speed = 100.0       # 编辑器暴露属性
static var instance = null      # 单例模式
```

### 生命周期
```gdscript
func _ready():                  # 节点初始化完成
func _enter_tree():             # 进入场景树
func _physics_process(delta):   # 物理帧（固定60fps）
func _unhandled_input(event):   # 输入事件
```

### 类型注解（Godot 4）
```gdscript
func generate_dialog(prompt: String, character_name: String = "") -> HTTPRequest:
var speed: float = 100.0
var memories: Array = []
var settings: Dictionary = {}
```

## 常见设计模式

### 1. Singleton（单例）
```gdscript
static var instance = null

static func get_instance() -> APIManager:
    if instance == null:
        instance = Engine.get_singleton("APIManager")
        if instance == null:
            instance = APIManager.new()
    return instance

func _enter_tree():
    if instance == null:
        instance = self
    add_to_group("api_manager")
```

### 2. Signal（信号/事件）
```gdscript
# 定义信号
signal conversation_started
signal dialog_generated(result: String)

# 连接信号
SettingsManager.settings_changed.connect(_on_settings_changed)
dialog_service.conversation_started.connect(_on_conversation_started)

# 发射信号
conversation_started.emit()
```

### 3. Lambda / 匿名函数
```gdscript
# sort_custom 使用 lambda
formatted_memories.sort_custom(func(a, b):
    if a.importance != b.importance:
        return a.importance > b.importance
    return a.timestamp > b.timestamp
)

# Signal 回调用 lambda
http_request.request_completed.connect(func(result, response_code, headers, body):
    get_tree().create_timer(1.0).timeout.connect(func():
        if is_instance_valid(http_request):
            remove_child(http_request)
            http_request.queue_free()
    )
)
```

### 4. Enum（枚举）
```gdscript
enum MemoryType {
    PERSONAL,
    INTERACTION,
    TASK,
    EMOTION,
    EVENT
}

enum MemoryImportance {
    LOW = 1,
    NORMAL = 3,
    HIGH = 5,
    CRITICAL = 10
}
```

### 5. Navigation（寻路）
```gdscript
var navigation_path: Array = []

func move_to(target: Vector2):
    var navigation_map = get_world_2d().navigation_map
    var path_params = NavigationPathQueryParameters2D.new()
    path_params.map = navigation_map
    path_params.start_position = global_position
    path_params.target_position = target
    path_params.path_postprocessing = NavigationPathQueryParameters2D.PATH_POSTPROCESSING_CORRIDORFUNNEL

    var path_result = NavigationPathQueryResult2D.new()
    NavigationServer2D.query_path(path_params, path_result)
    navigation_path = path_result.path
```

### 6. Physics Raycast（物理检测）
```gdscript
func _is_direction_clear(direction: Vector2, distance: float) -> bool:
    var space_state = get_world_2d().direct_space_state
    var query = PhysicsRayQueryParameters2D.create(
        global_position,
        global_position + direction * distance
    )
    query.exclude = [self]
    query.collision_mask = 1
    var result = space_state.intersect_ray(query)
    return result.is_empty()
```

### 7. Async / Await
```gdscript
# 等待帧
await get_tree().process_frame
await get_tree().process_frame
await get_tree().process_frame

# 等待信号
await $AnimatedSprite2D.animation_finished
```

### 8. String Formatting
```gdscript
# Python-style % formatting
print("[APIManager] 设置已更新 - API类型：%s，模型：%s" % [current_settings.api_type, current_settings.model])
var time_str = "%04d-%02d-%02d %02d:%02d" % [year, month, day, hour, minute]
```

### 9. Node 访问
```gdscript
# 快捷访问
$AnimatedSprite2D.play("idle_down")
add_child(http_request)

# 动态加载场景
var chat_history_scene = load("res://scene/ChatHistory.tscn")
var chat_history = chat_history_scene.instantiate()
add_child(chat_history)

# 获取 meta
var character_data = character.get_meta("character_data", {})
```

### 10. Group（分组管理）
```gdscript
add_to_group("controllable_characters")
add_to_group("api_manager")

# 全局访问组内节点
for character in get_tree().get_nodes_in_group("controllable_characters"):
    ...
```

## Microverse 实际架构示例

### CharacterController（玩家/AI 角色）
- 继承 `CharacterBody2D`（自带物理移动能力）
- `_physics_process` 处理移动 + 寻路 + 避障
- 组合 `AIAgent` 子节点处理 AI 决策
- 组合 `ChatHistory` 记录对话

### MemoryManager（记忆系统）
- `Dictionary` 存储角色元数据
- `enum` 定义记忆类型和重要性等级
- `sort_custom` + lambda 实现多字段排序
- `_cleanup_old_memories` 限制记忆数量上限

### APIManager（LLM 调用）
- 单例模式全局访问
- 动态创建 `HTTPRequest` 节点
- `await` 异步等待响应
- 用 lambda 处理请求完成回调

## 常见坑
- `_ready` 里拿 `get_tree()` 要 `await get_tree().process_frame` 等帧对齐
- `Dictionary` 和 `Array` 传参是引用传递，修改要 `.duplicate()`
- `is_empty()` 不是 `.isEmpty()`
- 信号断连后重连要先 `.disconnect()` 再 `.connect()`

## Related
[godot-4](#/concepts/godot-4) — 引擎和 GDScript 的宿主
