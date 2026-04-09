---
title: Microverse Character System
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [microverse, godot, characters, personality, game-dev]
sources: []
---

# Microverse Character System

## Overview
8 个角色，每个都有精心设计的人格、职位、说话风格、工作职责和工作习惯。角色配置在 `script/CharacterPersonality.gd` 的 `PERSONALITY_CONFIG` 字典中集中管理。

## 角色总览

| 角色 | 职位 | 性格关键词 | LLM 定位 |
|------|------|----------|---------|
| **Stephen** | 老板 | PUA 型剥削者，奋斗逼文化大使 | 反派/压力源 |
| **Tom** | 行政秘书 | 人形彩虹屁，职场绿茶，段位满级 | 拍马屁型 |
| **Lea** | 前台接待 | 八面玲珑，关系数据库 | 社交型 |
| **Alice** | 前端工程师 | 带刺玫瑰，怼人CPU超频 | 怼人型 |
| **Grace** | HR | 细节控，劳动法专家，塔罗牌算团队矛盾 | 调解型 |
| **Jack** | 后端工程师 | 极客，社交菜鸡，代码洁癖 | 技术型 |
| **Joe** | 测试工程师 | 强迫症，话痨，毒舌，bug仇恨者 | 吐槽型 |
| **Monica** | 产品经理 | 雷厉风行，情绪化，完美主义 | 激进型 |

## 角色场景文件

```
scene/characters/
├── Stephen.tscn   (82 个 AtlasTexture 子资源)
├── Tom.tscn
├── Lea.tscn
├── Alice.tscn
├── Grace.tscn
├── Jack.tscn
├── Joe.tscn
└── Monica.tscn
```

每个 `.tscn` 内含：
- `AnimatedSprite2D` + `SpriteFrames`（含 idle/run/sit 动画）
- `CharacterController` 脚本（移动、坐下、感知）
- `CollisionShape2D`（物理体）
- `Area2D`（交互检测）

## 人设配置结构

```gdscript
const PERSONALITY_CONFIG = {
    "Stephen": {
        "position": "SleepySheep公司老板",
        "personality": "奥斯卡级虚伪表演家，职场PUA持证上岗选手...",
        "speaking_style": "张嘴就是'期权池已备好'、'明年就敲钟'...",
        "work_duties": "每周发布新的'三年愿景'...",
        "work_habits": "下班时间必在公司群发'深夜奋斗者照片'..."
    }
}
```

### 5 字段含义
- **personality** — 性格描述（用于 LLM Prompt）
- **speaking_style** — 说话风格、经典话术、口头禅（用于 Prompt 生成对话）
- **work_duties** — 工作职责（AI 决策参考）
- **work_habits** — 工作习惯（行为细节丰富度）
- **position** — 职位（用于同事关系）

## 角色在 Prompt 中的使用

```
你是一个员工，名字是{character_name}。
职位：{position}。
性格：{personality}。
说话风格：{speaking_style}。
```

每段对话的 Prompt 都注入对应角色的 5 字段，保证 LLM 输出一致性。

## 员工名单约束（防止幻觉）

ConversationManager 的 Prompt 中会明确列出所有员工：

```
你们公司的员工信息如下：
- Stephen：公司老板
- Tom：行政秘书
- Lea：前台接待
- Alice：前端工程师
- Grace：HR
- Jack：后端工程师
- Joe：测试工程师
- Monica：产品经理

注意：只能提及以上列出的员工，不要创造新的角色名字。
```

## 名字不一致问题

⚠️ **BackgroundStoryManager** 中的公司名是 `CountSheep`，而 **CharacterPersonality** 中的公司名是 `SleepySheep`。这是同一游戏项目内部的命名不一致。

- 背景故事：CountSheep 小游戏，「Can't Sleep? Count Sheep」
- 角色设定：SleepySheep 公司（老板 Stephen 等）

## CharacterPersonality API

```gdscript
# 获取完整人设字典
CharacterPersonality.get_personality("Alice")
# → {position, personality, speaking_style, work_duties, work_habits}

# 快速检查角色是否存在
if "Jack" in CharacterPersonality.PERSONALITY_CONFIG:
    ...
```

## 相关
[microverse-dialog-system](#/concepts/microverse-dialog-system) — 角色人设决定对话风格
[multi-agent-ai-game-impl](#/concepts/multi-agent-ai-game-impl) — AIAgent 使用人格配置做决策
[gdscript-patterns](#/concepts/gdscript-patterns) — CharacterController 包含状态机/寻路/物理检测
