---
title: Multi-Agent AI Game Implementation
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [ai, game-dev, multi-agent, architecture]
sources: [raw/articles/microverse-ksanadock-2026.md]
---

# Multi-Agent AI Game Implementation

## Overview
多智能体 AI 在游戏中的实现。Microverse 展示了完整的架构：每个角色是独立智能体，拥有感知、记忆、决策、对话子系统。

## Core Architecture

```
CharacterBody2D (角色节点)
├── AIAgent                    # AI 决策核心
│   ├── State (IDLE/MOVING/TALKING)
│   ├── decision_timer         # 定时决策（60s 间隔）
│   └── 感知系统
├── ChatHistory                # 对话历史
└── DialogBubble (UI)          # 对话气泡

全局单例：
├── APIManager                 # LLM HTTP 请求
├── DialogManager              # 对话协调
├── MemoryManager              # 记忆管理
├── RoomManager                # 空间/房间管理
└── CharacterPersonality       # 人设配置
```

## 决策循环（LLM-Driven）

每个角色每 60 秒执行一次决策循环：

```
make_decision()
  1. 感知 → generate_scene_description()
     - 当前房间信息
     - 环境中的物品和角色
     - 时间段描述
     - 角色相对位置和距离
  2. 状态 → get_character_status_info()
     - money / mood / health
     - 情感关系（relations）
     - 记忆（MemoryManager）
  3. 任务 → get_character_task_info()
     - 未完成任务列表
     - 按 priority 排序
  4. 构建 Prompt → 发给 LLM
  5. 解析决策 → 执行 Action
```

### Prompt 工程模式
```gdscript
var prompt = "你是一个办公室员工，名字是%s。你的职位是：%s。
你的性格是：%s。你的说话风格是：%s。你的工作职责是：%s。
你的工作习惯是：%s。" % [name, position, personality, speaking_style, duties, habits]

prompt += get_company_basic_info()      // 公司背景
prompt += get_company_employees_info()   // 员工名单（约束不可创造新角色）
prompt += get_character_status_info()    // 个人状态
prompt += get_character_task_info()      // 任务列表
prompt += generate_scene_description()    // 场景感知
```

LLM 只返回数字决策（"1" 或 "2"），避免自由文本解析。

## 感知系统

### 空间感知（RoomManager）
```gdscript
var current_room = room_manager.get_current_room(rooms, character.global_position)
var room_objects = get_room_objects(current_room)  # group: "interactable"
var room_characters = get_room_characters(current_room)  # group: "character"
```

### 方向描述
```gdscript
func get_direction_description(from_pos: Vector2, to_pos: Vector2) -> String:
    var angle = rad_to_deg((to_pos - from_pos).angle())
    # 八个方向区间映射 → "东北方向"、"南边" 等
```

### 物品感知
```gdscript
func get_object_info(obj: Node2D) -> String:
    if "Chair" in obj.name: return "椅子，可以坐下休息"
    if "Desk" in obj.name: return "办公桌，可以工作"
    if "Computer" in obj.name: return "电脑，处理工作"
    # 附加距离信息 "距离约 120 米"
```

## 记忆系统

### 记忆类型
```gdscript
enum MemoryType { PERSONAL, INTERACTION, TASK, EMOTION, EVENT }
enum MemoryImportance { LOW=1, NORMAL=3, HIGH=5, CRITICAL=10 }
```

### 记忆 Prompt 格式
```gdscript
func get_formatted_memories_for_prompt(character, max_count=3) -> String:
    # 按 importance × recency 排序
    # 截取前 N 条 → "[2026-04-08 14:30] 和 Jack 讨论了项目计划"
```

### 记忆清理
保留最多 50 条，按 `importance × timestamp` 加权淘汰。

## 任务系统

### 任务结构
```gdscript
{
    "description": "联系潜在客户",
    "priority": 7,       # 1-10，渴望程度
    "created_at": 1744000000,
    "completed": false
}
```

### 每日刷新
超过 24 小时未刷新则重新生成任务池（保留未完成的）。

### 职位定制任务
```gdscript
if position.contains("经理"):
    tasks_pool += ["审核团队报告", "分配工作任务", "评估团队表现"]
elif position.contains("销售"):
    tasks_pool += ["联系潜在客户", "准备销售演示"]
elif position.contains("技术"):
    tasks_pool += ["修复技术问题", "代码审查"]
```

## 对话系统

### 状态机
```
不在对话 → 检测附近角色 → 发起对话 → TALKING 状态
                                     ↓
                              LLM 判断继续/结束
                                     ↓
                              生成告别语 → 结束对话
```

### 聊天历史（ChatHistory）
```gdscript
add_message(partner_name, formatted_message)
get_recent_conversation_with(partner_name, count=10)
```

### 对话 Prompt
```gdscript
# 加入聊天记录约束 LLM 只能聊已知的 8 个角色
prompt += "\n注意：只能提及 Alice/Grace/Jack... 不要创造新角色名字。"
```

## 情感关系系统

```gdscript
var relations = {
    "Jack": {"type": "友好", "strength": 3},
    "Monica": {"type": "敌对", "strength": -5}
}

# strength < 0 → 敌对；strength > 0 → 友好
# 影响对话发起意愿和语气
```

## 与 Stanford Generative Agents 的对比

| 维度 | [Stanford Generative Agents](#/concepts/stanford-generative-agents) | Microverse |
|------|------------------------------------------|-----------|
| **场景** | 2D 俯视角沙盒 | 2D 俯视角办公室 |
| 角色数 | 25 个 | 8 个 |
| 记忆 | 规划/记忆/反射 | 重要性分级 + 时间衰减 |
| 对话 | 自主社交对话 | LLM 对话 + 决策 |
| 行动 | 自主规划任务 | LLM 决策选项 |
| 交互 | 玩家通过代理角色 | 玩家直接选中控制 |

## 关键设计模式

1. **定时决策** — 60s 间隔，避免高频 LLM 调用
2. **选项约束** — LLM 只返回数字，降低解析难度
3. **角色独立 AI 配置** — 可 Override 全局 API 设置
4. **感知过滤** — 只提供角色视野范围内的信息
5. **记忆摘要** — 最多 3 条重要记忆入 prompt，控制 token
6. **防重连** — Signal 连接前先 `.disconnect()` 检查

## Related
[multi-agent-ai-simulation](#/concepts/multi-agent-ai-simulation) — 通用概念
[llm-integration](#/concepts/llm-integration) — LLM 是决策核心
[persistent-memory-system](#/concepts/persistent-memory-system) — 记忆子系统
[gdscript-patterns](#/concepts/gdscript-patterns) — 实现语言
[microverse-dialog-system](#/concepts/microverse-dialog-system) — 对话系统子模块详解
[stanford-generative-agents](#/concepts/stanford-generative-agents) — 斯坦福 AI Town 原型
