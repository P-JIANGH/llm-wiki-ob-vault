---
title: Microverse Dialog System
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [microverse, ai, dialog, llm, conversation]
sources: []
---

# Microverse Dialog System

## Overview
Microverse 的对话系统负责管理角色间自主对话的生命周期。由 DialogService 统一协调，ConversationManager 管理每次对话的 Prompt 构建和 LLM 调用，DialogBubble 负责 UI 显示。

## 系统架构

```
DialogService                    # 对话服务（总控）
├── active_conversations: Dict   # 管理所有活跃对话
├── try_start_conversation()     # 发起对话前检查
└── end_conversation()

ConversationManager              # 单次对话管理器
├── speaker / listener           # 对话双方
├── generate_dialog()            # 构建 Prompt → LLM → 解析
├── build_dialog_prompt()        # Prompt 工程
└── _on_request_completed()      # 处理 LLM 响应

ChatHistory                      # 持久化对话记录
├── add_message()                # 追加消息
├── get_recent_conversation_with()  # 查历史
└── save_history() / load_history()  # 文件持久化

DialogBubble                     # UI 气泡
├── show_dialog()               # 显示 + 自动消失动画
└── _process()                  # 跟随角色位置

BackgroundStoryManager           # 故事背景 + 社会规则
├── generate_background_prompt() # 生成背景 Prompt
└── add_custom_rule()           # 用户自定义规则
```

## 对话发起流程

```
CharacterController 检测到附近角色
    ↓
DialogService.try_start_conversation()
    ├── 距离检查 (_is_in_range, max=100px)
    ├── 状态检查（是否已在对话中）
    └── 创建 ConversationManager
            ↓
    conversation.start_conversation()
            ↓
    ConversationManager.generate_dialog()
            ↓
    Prompt → APIManager → LLM API
            ↓
    _on_request_completed()
            ↓
    DialogBubble.show_dialog()  →  显示 5 秒
            ↓
    ChatHistory 保存双方记录
            ↓
    递归：交换 speaker/listener，对方回复
            ↓
    DialogueManager 判断继续/结束
```

## Prompt 工程（ConversationManager）

### 完整 Prompt 构成
```gdscript
var prompt = "你是一个员工，名字是{speaker_name}。
职位：{position}。性格：{personality}。
说话风格：{speaking_style}。"

prompt += BackgroundStoryManager.generate_background_prompt()
// 故事背景（机构名、环境、时代、文化、经济）
// 社会规则（预设 + 用户自定义）

prompt += get_company_basic_info()
// "你们公司的主要产品是《CountSheep》小游戏..."

prompt += get_company_employees_info()
// "Alice：前端工程师, Grace：HR, Jack：后端工程师..."
// "注意：只能提及以上列出的员工，不要创造新的角色名字。"

prompt += get_character_status_info(speaker)
// 💰 金钱：xxx元 | 😊 心情：xxx | ❤️ 健康：xxx
// 【记忆信息】...
// 【情感关系】与 Jack：友好 (强度：3)

prompt += get_character_tasks(speaker)
// "你当前最重要的任务是：联系客户（渴望程度：8）"

prompt += "你正在与{listener_name}交谈。
{listener_name}的职位是：{position}。
{listener_name}的性格是：{personality}。"

prompt += "你们之前的对话记录：\n{chat_history}"

prompt += "请根据你的性格、当前状态...生成一段自然的对话。"
prompt += "对话长度控制在1-3句话，30字以内。"
prompt += "只返回你要说的话，不要加任何描述。"
```

### 关键设计约束
- **只返回纯文本**，不返回 JSON，不返回动作描述
- **只提及已知角色**，通过员工名单 prompt engineering 约束
- **记忆优先于任务**，突发记忆优先级 > 当前任务
- **双向信息不对称**：speaker 能看到自己的记忆，但看不到 listener 的私人记忆

## 对话历史（ChatHistory）

### 存储结构
```gdscript
history = {
    "Jack": [  // key = 对话对方
        {
            "message": "Jack: 今天的代码review完了吗？",
            "timestamp": 1744000000.0,
            "participants": ["Alice", "Jack"]
        },
        ...
    ]
}
```

### 持久化
```gdscript
# 路径规则
var file_path = "user://chat_history/{character_name}_history.json"

# 保存/加载
save_history()  →  JSON.stringify(history) → FileAccess
load_history()  →  FileAccess → JSON.parse_string → history
```

### 检索
```gdscript
get_recent_conversation_with(participant_name, max_messages=5)
# 按时间戳取最近 N 条，拼成纯文本串
```

## 背景故事系统（BackgroundStoryManager）

### 支持的场景
```gdscript
BACKGROUND_CONFIGS = {
    "Office": {        // CountSheep 游戏公司
        company_name, company_description,
        environment_description,
        time_period, cultural_context, economic_situation,
        social_rules: [7 条预设规则]
    },
    "School": {         // 阳光学院
        ...             // 类似结构
    },
    "Jail": {          // 新希望监狱
        ...             // 类似结构
    }
}
```

### 社会规则 Prompt 示例
```
## 社会规则
1. 工作时间内应保持专业态度
2. 鼓励团队合作和知识分享
3. 尊重同事的个人空间和工作习惯
4. 会议室使用需要提前预约
5. 保持工作区域整洁
6. 午休时间可以适当放松
7. 重要决策需要团队讨论

注意：你的所有行为和决策都应该符合以上背景设定和社会规则。
```

### 用户自定义规则
- `add_custom_rule()` / `remove_custom_rule()`
- 持久化到 `user://custom_social_rules.json`
- 叠加在预设规则之上

## DialogBubble UI

```gdscript
# 气泡跟随角色头顶
func _process(_delta):
    if target_node:
        global_position = target_node.global_position + offset

# 显示 + 5秒自动消失
func show_dialog(text: String, duration: float = 5.0):
    text_label.text = text
    background.size = text_size + Vector2(20, 20)
    show()
    tween.tween_interval(duration)
    tween.tween_callback(hide)
```

## 与 AIAgent.make_decision() 的区别

| | AIAgent 决策 | ConversationManager 对话 |
|--|------------|------------------------|
| **触发** | 60s 定时器 | 角色靠近检测 |
| **目标** | 选择行为（调整任务/继续任务） | 生成对话内容 |
| **选项约束** | "1" 或 "2" | 30字以内，纯文本 |
| **上下文** | 场景 + 状态 + 任务 | 人设 + 背景 + 历史对话 |
| **执行** | 移动/坐下/对话发起 | 显示气泡 |

## 关键设计亮点

1. **双向递归对话** — 交换 speaker/listener 角色，LLM 轮流生成双方回复，直到某方决定结束
2. **信息不对称** — speaker 知道自己的记忆，不知道 listener 的私人记忆（符合现实）
3. **30字约束** — 强制 LLM 简短输出，降低解析难度，保持对话节奏
4. **员工白名单** — prompt 内直接声明角色名单，防止 LLM 幻觉出新角色
5. **背景 + 规则双重约束** — 故事背景决定"能说什么"，社会规则决定"应该怎么说"

## Related
[[microverse-code-structure]] — ConversationManager 位于 script/ai/
[[multi-agent-ai-game-impl]] — 对话是 AI 决策的子模块
