---
title: FreeOrion
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, 4x, space, empire]
sources: [raw/articles/open-source-games-list-2026.md]
---

# FreeOrion

> 4X 太空帝国回合策略游戏，致敬 Master of Orion，C++20 + GiGi GUI + FOCS Python 脚本驱动游戏内容，约 183K LOC C++

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/freeorion/freeorion |
| 语言 | C++20（核心）+ Python 3.10+（脚本引擎 FOCS）|
| 构建系统 | CMake >= 3.16 + Visual Studio 2022/2026 (Windows) |
| 渲染/引擎 | OpenGL 2.1 + 自研 GiGi GUI 库 (GG/) + Godot 4 (新客户端) |
| 许可 | GPL v2（源码）+ CC-BY-SA-3.0（游戏资产）|
| 平台 | Windows/macOS/Linux/Android |
| 最新版本 | v0.5.1.2 (2026-02-26) |
| Stars | ~3.3K |

## 核心技术点

### GiGi GUI 库 (GG/)
FreeOrion 自研的 C++ GUI 库，位于 `GG/` 目录：
- 类似 GTK/Qt 的面向对象 GUI 框架
- 支持 OpenGL 渲染集成
- 跨平台（Win/macOS/Linux）
- 独立项目可复用

### FOCS 内容脚本系统
FreeOrion Content Scripts（FOCS）是游戏内容的核心驱动力：
- Python 3.10+ 语法定义游戏内容
- 位于 `default/scripting/focs/` 目录
- 定义科技树 (`_tech.py`)、物种 (`_species.py`)、建筑 (`_buildings.py`)、政策 (`_empire_statistics.py`)
- 效果系统 (`_effects.py`) 控制游戏逻辑
- 条件系统 (`_conditions.py`) 用于对象筛选
- 这种设计使非程序员也能通过修改脚本创建新内容

### 多客户端架构
```
client/
├── human/        # 传统 GG GUI 人类客户端
├── godot/        # Godot 4 新客户端（进行中）
└── AI/           # AI 客户端框架
```
- 传统客户端使用 GiGi GUI + OpenGL
- 新 Godot 客户端提供现代 UI 和更好的开发体验

### 服务器/客户端网络架构
```
server/           # 游戏服务器
network/          # 网络层 (Message.h/cpp, Networking.h/cpp)
```
- 回合制多人游戏
- Message 协议通信
- 支持多人宇宙对战

### 战斗系统
位于 `combat/` 目录的独立模块：
- `CombatDamage.cpp` 伤害计算
- `CombatEvents.cpp` 战斗事件记录
- `CombatLogManager.cpp` 战斗日志管理
- 回合制战斗动画和结算

### 宇宙/游戏逻辑
`universe/` 目录包含核心游戏对象：
- `Planet.cpp` 行星系统 (1229 行)
- `Building.cpp` 建筑系统
- `Conditions.cpp` 条件系统
- `Effects.cpp` 效果系统
- `Encyclopedia.cpp` 百科全书系统
- 总计约 186K 行 C++ 代码

### Python AI 系统
`default/scripting/python/AI/` 目录包含：
- Python 实现的 AI  empire 控制逻辑
- 可被玩家脚本扩展

### 大型依赖栈
```
Boost >= 1.73 (filesystem/locale/iostreams/regex/asio...)
OpenGL >= 2.1
OpenAL (推荐 OpenAL Soft)
Python >= 3.10
FreeType2, libpng, libogg, libvorbis, SDL2, zlib
```

### 编译资源需求
- 官方推荐 16 GiB RAM 或更多
- 编译时间：约 45 分钟 (Core i5) → 5 分钟 (12-core Ryzen 9)
- 提供预编译 SDK (FreeOrionSDK v14) 简化 Windows/macOS/Android 构建

## 玩法特点

### 4X 游戏循环
- **eXplore**: 探索随机生成的星系
- **eXpand**: 殖民星球，建立帝国
- **eXploit**: 发展经济、科技
- **eXterminate**: 建立军队，征服敌人

### 物种系统
- 多种外星物种，各有独特属性
- 物种影响殖民效率、战斗能力、科研方向
- 物种政策影响帝国运营

### 科技树
- 深度科技树，多路径发展
- FOCS 脚本定义科技效果和前置条件

### 政策系统
- 帝国政策影响游戏规则
- v0.5.1 引入物种对帝国政策的好感度

### 战斗
- 回合制舰队战斗
- 航母、战斗机、激光等多种武器系统

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 内容脚本化 | FOCS Python 脚本证明：游戏逻辑完全可以用脚本驱动。AI 游戏可借鉴：用 Python 定义游戏规则和 AI 行为 |
| 多客户端架构 | Godot + 传统 GG 双客户端设计为 AI 游戏提供灵活的前端选择 |
| 确定性模拟 | 回合制 + 服务器权威模型适合 AI 训练环境 |
| 4X 游戏 AI | 帝国级 AI（探索/扩张/开发/消灭）是复杂决策 AI 的好测试场景 |
| 开源 4X 模板 | FreeOrion 的架构可作为公司 4X 游戏的原型起点 |
