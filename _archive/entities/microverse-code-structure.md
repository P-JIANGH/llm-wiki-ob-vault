---
title: Microverse Code Structure
created: 2026-04-08
updated: 2026-04-08
type: entity
tags: [code, architecture, godot]
sources: []
---
<!-- TODO: This page has 230 lines and should be split into smaller, focused pages per SCHEMA.md guidelines -->


# Microverse Code Structure

## Overview
Microverse 项目目录结构与核心模块解析。Godot 4 + GDScript 实现的多智能体 AI 社交模拟游戏。

## 项目目录树

```
Microverse/
├── project.godot              # 项目配置入口
├── scene/
│   ├── characters/
│   │   ├── Alice.tscn         # 角色预制体
│   │   ├── Grace.tscn
│   │   ├── Jack.tscn
│   │   ├── Joe.tscn
│   │   ├── Lea.tscn
│   │   ├── Monica.tscn
│   │   ├── Stephen.tscn
│   │   └── Tom.tscn
│   ├── maps/
│   │   └── Office.tscn        # 办公室地图
│   ├── prefab/
│   │   ├── Chair.tscn         # 可交互物品
│   │   ├── BackChair.tscn
│   │   ├── Desk.tscn
│   │   └── FrontChair.tscn
│   ├── ui/
│   │   ├── DialogBubble.tscn  # 对话气泡
│   │   ├── GlobalSettingsUI.tscn
│   │   ├── GodUI.tscn         # 上帝视角 UI
│   │   ├── SaveLoadUI.tscn
│   │   └── AIModelLabel.tscn
│   └── ChatHistory.tscn
├── script/
│   ├── CharacterController.gd  # 角色移动/寻路/避障
│   ├── CharacterManager.gd    # 全局角色管理
│   ├── CharacterPersonality.gd # 8 个角色人设配置
│   ├── ChatHistory.gd         # 对话历史记录
│   ├── RoomManager.gd         # 房间/空间管理
│   ├── RoomData.gd            # 房间数据类
│   ├── RoomArea.gd            # 房间区域节点
│   ├── Chair.gd               # 椅子交互逻辑
│   ├── Desk.gd                # 桌子逻辑
│   ├── CameraController.gd    # 摄像机控制
│   ├── GameSaveManager.gd     # 存档/读档
│   ├── ai/
│   │   ├── AIAgent.gd         # AI 决策核心（2200+ 行）
│   │   ├── APIManager.gd      # LLM HTTP 请求管理
│   │   ├── APIConfig.gd       # 多 Provider 配置
│   │   ├── DialogManager.gd   # 对话协调器
│   │   ├── DialogService.gd   # 对话服务
│   │   ├── ConversationManager.gd
│   │   ├── background_story/
│   │   │   ├── BackgroundStoryManager.gd
│   │   │   └── BackgroundStoryUI.gd
│   │   └── memory/
│   │       └── MemoryManager.gd # 持久化记忆
│   └── ui/
│       ├── SettingsManager.gd  # 全局设置
│       ├── GlobalSettingsUI.gd
│       ├── CharacterAISettings.gd
│       ├── DialogBubble.gd
│       └── SaveLoadUI.gd
└── asset/
    └── ui/theme/              # UI 主题资源
```

## 核心类解析

### CharacterPersonality（角色配置）
**文件**: `script/CharacterPersonality.gd`
**职责**: 集中管理 8 个角色的性格、职位、说话风格、工作职责

```gdscript
const PERSONALITY_CONFIG = {
    "Stephen": {
        "position": "SleepySheep公司老板",
        "personality": "奥斯卡级虚伪表演家...",
        "speaking_style": "张嘴就是'期权池已备好'...",
        "work_duties": "每周发布新的'三年愿景'...",
        "work_habits": "下班时间必在公司群发..."
    },
    # ... 7 more characters
}
```

每个角色的性格描述极其详细，直接用于 Prompt 工程，无需额外生成。

### CharacterController（角色控制）
**文件**: `script/CharacterController.gd`
**职责**: 移动、寻路、避障、坐下/站起

- 继承 `CharacterBody2D`（Godot 物理体）
- NavigationServer2D 寻路
- PhysicsRayQueryParameters2D 障碍物检测
- `move_to_chair()` 自动坐下逻辑
- 组合 `AIAgent` 子节点（AI 控制权切换）

### AIAgent（AI 决策大脑）
**文件**: `script/ai/AIAgent.gd`（~2200 行）
**职责**: 定时决策、Prompt 构建、Action 执行

核心流程：
```
make_decision()
  1. generate_scene_description()   # 场景感知
  2. get_character_status_info()    # 状态（money/mood/health/relations）
  3. get_character_task_info()       # 任务列表
  4. get_company_employees_info()    # 员工名单（约束）
  5. build prompt → APIManager
  6. parse "1" or "2" decision
  7. execute _adjust_tasks() or _continue_current_task()
```

对话中决策（`make_conversation_decision()`）则加入 ChatHistory 上下文。

### APIManager（LLM 网关）
**文件**: `script/ai/APIManager.gd`
**职责**: 单例，HTTP 请求，Provider 切换

- `Engine.get_singleton()` 实现单例
- 动态创建 `HTTPRequest` 节点
- 支持按角色 Override AI 配置（`SettingsManager.get_character_ai_settings`）
- 响应后自动清理节点

### APIConfig（Provider 适配）
**文件**: `script/ai/APIConfig.gd`
**职责**: 统一封装多 Provider 差异

```
OpenAI        → /v1/chat/completions
Claude        → /v1/messages
DeepSeek      → /v1/chat/completions
Gemini        → /v1/models/.../generateContent
豆包/Kimi/ollama → 各自定义
```

### MemoryManager（记忆管理）
**文件**: `script/ai/memory/MemoryManager.gd`
**职责**: 记忆存储、检索、清理

- `enum MemoryType`: PERSONAL / INTERACTION / TASK / EMOTION / EVENT
- `enum MemoryImportance`: LOW=1 / NORMAL=3 / HIGH=5 / CRITICAL=10
- 按 `importance × recency` 排序
- 保留上限 50 条
- `get_formatted_memories_for_prompt()` 输出给 LLM

### DialogManager（对话协调）
**文件**: `script/ai/DialogManager.gd`
**职责**: 管理角色间对话生命周期

- 单例，连接 DialogService
- `get_character_status_info()` 提供对话上下文
- `is_character_in_conversation()` 查询状态

### RoomManager（空间管理）
**文件**: `script/RoomManager.gd`
**职责**: 房间划分、位置查询

- 扫描 `group: "room_area"` 的 Area2D 节点
- `get_current_room()` 角色定位
- `is_position_in_room()` 矩形边界检测
- 房间数据存入 `Dictionary[room_name] = RoomData`

## 全局单例（Autoload）

Godot 4 的 Autoload 相当于全局单例，Microverse 使用：

| 单例 | 作用域 |
|------|--------|
| APIManager | 全局 LLM 请求 |
| DialogManager | 对话协调 |
| MemoryManager | 记忆管理 |
| RoomManager | 空间查询 |
| CharacterManager | 全局角色列表 |
| SettingsManager | 用户设置 |
| GameSaveManager | 存档管理 |

## 角色节点树

每个角色预制体（Alice.tscn 等）的典型结构：

```
Alice (CharacterBody2D)
├── AnimatedSprite2D          # 动画播放
├── CollisionShape2D           # 物理碰撞
├── ChatHistory (Node)         # 对话记录（实例化）
├── AIAgent (Node)            # AI 决策（实例化）
└── AIModelLabel (Node)       # 当前使用模型显示
```

## 数据流向

```
玩家输入 / 定时器触发
    ↓
AIAgent.make_decision()
    ├── generate_scene_description()   → RoomManager
    ├── get_character_status_info()    → MemoryManager
    ├── get_character_task_info()      → Character meta
    └── build prompt
            ↓
    APIManager.generate_dialog()
            ↓ (HTTP)
    LLM API (OpenAI/Claude/DeepSeek/...)
            ↓ (response)
    _on_decision_request_completed
            ↓
    match decision: "1" → _adjust_tasks()
                   "2" → _continue_current_task()
            ↓
    CharacterController 执行动作（移动/坐下/对话）
```

## 存档系统

`GameSaveManager` 通过 `character.get_meta()` / `character.set_meta()` 持久化所有角色状态（money, mood, health, tasks, relations, memories）。

## 相关
[[microverse-project]] — 项目概览
