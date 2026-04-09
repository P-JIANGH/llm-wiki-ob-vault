---
title: Cataclysm: Dark Days Ahead
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, survival, roguelike, turn-based, post-apocalyptic]
sources: [https://github.com/CleverRaven/Cataclysm-DDA]
---

# Cataclysm: Dark Days Ahead

> 经典后世界末日生存 roguelike，极为深度的数据驱动 C++ 游戏引擎 + JSON 内容系统

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/CleverRaven/Cataclysm-DDA |
| 语言 | C++ (434 .cpp / 457 .h，~480K LOC) |
| 构建系统 | CMake + Makefile (msvc-full-features / Android / Linux / macOS) |
| 渲染 | SDL2/Tiles (图形) + Ncurses (ASCII 终端) 双模式 |
| 许可 | CC BY-SA 3.0 (代码 + 内容) + 多许可第三方组件 |
| 仓库大小 | 242 MB（含所有游戏数据） |
| Stars | 16.2k |
| 活跃度 | 持续活跃，2026年仍在更新 |

## 源码结构

```
Cataclysm-DDA/
├── src/               # C++ 引擎 (~480K LOC)
│   ├── game.cpp/h     # 主循环、全局 game 实例 g
│   ├── character.cpp/h    # 角色/玩家（最大类之一）
│   ├── npc.cpp/h      # NPC AI 系统
│   ├── vehicle.cpp/h  # 载具系统
│   ├── map.cpp/h      # 地图/格子系统
│   ├── overmap.cpp/h  # 区域地图生成
│   ├── mutation.cpp/h # 变异系统
│   ├── calendar.cpp/h # 时间系统
│   ├── achievement.cpp/h # 成就系统
│   ├── crafting.cpp/h # 合成系统
│   ├── activity_actor.cpp/h # 活动/任务系统
│   ├── anatomy.cpp/h  # 解剖学系统
│   └── ...
├── data/              # JSON 内容数据 (~100+ JSON 文件)
│   └── json/
│       ├── items/         # 物品定义 (~23K LOC JSON)
│       ├── vehicles/      # 载具定义 (~12K LOC JSON)
│       ├── mapgen/         # 地图生成器 (~96K LOC JSON)
│       ├── mutations/      # 变异定义 (~20K LOC JSON)
│       ├── techniques.json # 战斗技术
│       ├── achievements.json # 成就
│       ├── bionics.json    # 仿生学/义体
│       ├── anatomic_units.json # 解剖学部位
│       └── ...
├── tools/             # 构建/开发工具 (Python/Shell)
├── android/           # Android 移植
├── build-scripts/     # CI/CD 构建脚本
└── doc/               # 编译/开发文档
```

## 核心技术点

### 双渲染器架构

```
┌─────────────────────────────┐
│      game (主控制器)         │  g = unique_ptr<game>
└──────────┬──────────────────┘
           │ Draws to
    ┌──────▼──────┐
    │   cata_tileses / curses_port   │
    │  (SDL2/Tiles 图形 OR Ncurses ASCII) │
    └──────────────┘
```

双前端共用同一游戏逻辑层，渲染层可热切换。

### Character 系统

```
game g ──→ game::player 指针
              │
              ▼
         Character ──→ PlayerCharacter (单人玩家)
              │
              └──→ NPC (非玩家角色，由 AI 控制器驱动)
```

**Character 类**：衣品系统 (character_attire)、弹药/枪械 (character_guns)、急救/医疗、合成 (character_crafting)、逃逸/死亡等模块化组合。

### JSON 数据驱动系统

所有游戏内容（物品、载具、怪物、地图、变异、配方）均以 JSON 定义，C++ 引擎读取后动态加载：

| JSON 目录 | 行数 | 内容 |
|-----------|------|------|
| `mapgen/` | ~96K | 程序化地图生成模板 |
| `items/` | ~23K | 物品定义 (武器/装备/工具/...) |
| `vehicles/` | ~12K | 载具定义 (零件/装配) |
| `mutations/` | ~20K | 变异/突变定义 |
| `bionics/` | 大量 | 义体/仿生学扩展 |

**优势**：无需重新编译 C++ 代码即可新增/修改游戏内容，内容创作者不需要懂 C++。

### 核心子系统

| 系统 | 文件 | 说明 |
|------|------|------|
| **变异/Mutation** | `mutation.cpp/h`, `mutation_data.cpp` | 后世界末日进化系统，20K+ JSON 行定义 |
| **载具** | `vehicle.cpp/h` | 可拆解/组装载具，12K+ JSON 行 |
| **NPC AI** | `npc.cpp/h`, `npc_class.cpp` | NPC 派系、任务、对话、战斗决策 |
| **日历/时间** | `calendar.cpp/h` | 昼夜循环、季节、天气 |
| **天气** | `weather.cpp/h` | 雨/雪/辐射尘等天气系统 |
| **合成/工艺** | `crafting.cpp/h` | 物品合成配方网络 |
| **解剖学** | `anatomy.cpp/h` | 身体部位系统 (anatomic_units.json) |
| **仿生学** | `bionics.cpp/h` | 义体植入物系统 |
| **成就** | `achievement.cpp/h` | 成就追踪系统 |

### NPC 系统

- **npc_class**: NPC 类型定义 (农民、士兵、商人等)
- **npc_favor**: NPC 与玩家的关系/好感度
- **npc_attack**: NPC 主动攻击行为
- NPC 有自己的 AI 决策树和任务系统

### 活动/任务系统

```
activity_actor.cpp      # 活动执行者（捡拾/制作/战斗/...）
activity_handlers.cpp   # 活动具体处理
activity_tracker.cpp   # 活动队列管理
```

### 构建系统

- **CMake**: 官方推荐构建系统 (`CMakeLists.txt`)
- **msvc-full-features**: MSVC 完整特性支持 (Windows)
- **Android**: 通过 `android/` 目录支持移动构建
- **Makefile**: 传统 Makefile 构建入口
- **Flatpak**: Linux 打包发行
- **Doc**: 详细编译文档 (`doc/c++/COMPILING*.md`)

## 玩法特点

- **永久死亡** roguelike，hardcore 生存
- **程序化世界**，每次游戏都是新的世界
- **高度复杂的物品/载具/合成系统**
- **实时 + 回合制** 混合（战斗时回合制，探索时实时）
- **变异/仿生学双路线**角色发展
- **辐射世界** ( irradiated world ) 设定
- **多端发行**: PC (SDL/Tiles + Ncurses) + Android + Steam

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **JSON 数据驱动** | JSON 内容 + C++ 引擎分离设计，大幅降低内容创作门槛 |
| **复杂物品系统** | 物品/装备/弹药层级化设计，类型安全 C++ 结构 |
| **NPC AI** | NPC 派系 + 任务 + 关系系统，可用于游戏 AI NPC |
| **变异/突变系统** | 多维度属性修改系统，状态效果框架参考 |
| **载具体统** | 可拆解/组装的载具，零件依赖图 + 装配系统 |
| **程序化内容生成** | mapgen JSON DSL，大型程序化关卡DSL设计参考 |
| **双渲染器架构** | 同一逻辑层驱动多个渲染后端（图形/ASCII） |

## 关键数据文件

```
data/json/items/          ~23K LOC  JSON — 物品元数据
data/json/mapgen/         ~96K LOC  JSON — 地图生成模板
data/json/vehicles/      ~12K LOC  JSON — 载具模板
data/json/mutations/     ~20K LOC  JSON — 变异/突变定义
data/json/bionics.json            — 义体定义
data/json/techniques.json          — 战斗技术
```

## 关联页面

- [[open-source-game/dungeon-crawl-stone-soup]] — 经典 roguelike C++ 源码 (~412K LOC)
- [[open-source-game/nethack]] — 经典 roguelike (同属 ASCII roguelike 类别)
