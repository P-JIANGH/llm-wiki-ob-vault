---
title: Beyond All Reason
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, rts, spring-engine, lua, game]
sources: []
---

# Beyond All Reason

> 基于 Spring/Recoil 引擎的开源现代 RTS 游戏，专注于大规模机械单位战斗

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/beyond-all-reason/Beyond-All-Reason |
| 语言 | Lua（游戏逻辑）+ C++（引擎） |
| 构建系统 | Lux 包管理器 + CMake（引擎） |
| 引擎 | Recoil Engine（Spring 分支） |
| 许可 | GPL |
| 仓库大小 | ~4.3GB（含游戏资源） |

## 架构概览

BAR 是典型的 **数据驱动 Spring 引擎游戏**，游戏逻辑几乎全部用 Lua 实现：

```
Beyond-All-Reason/
├── gamedata/           # 游戏数据定义（单位/武器/装甲/移动类型）
│   ├── unitdefs*.lua   # 单位属性（血量/速度/攻击/消耗）
│   ├── weapondefs*.lua # 武器定义（伤害/射速/范围）
│   ├── armordefs.lua   # 装甲类型克制矩阵
│   ├── movedefs.lua    # 移动类型（步行/飞行/漂浮）
│   └── resources.lua   # 资源类型定义
├── luarules/           # 游戏同步逻辑（所有玩家相同）
│   ├── configs/        # AI 行为配置 JSON
│   │   └── BARb/       # BARb AI 的行为/建造链/经济配置
│   └── Utilities/      # 共享工具库（位置检查/队列/交换）
├── luaui/              # UI/渲染逻辑（仅本地玩家）
│   ├── Include/        # Lua 模块（选择API/着色器/Blueprint）
│   ├── Shaders/        # GLSL 着色器（延迟光照/地形/特效）
│   ├── RmlWidgets/     # RML UI 组件（快速开始/资源点/领土）
│   └── Scenarios/      # 测试场景
├── luaai.lua           # AI 入口文件
├── init.lua            # 游戏初始化
├── modinfo.lua         # MOD 元信息
└── recoil-lua-library/ # Lua AI 基础设施库
```

## 核心技术点

### 1. Spring 引擎游戏数据模型

Spring 引擎使用声明式 Lua 定义所有游戏实体：

```lua
-- 单位定义示例（gamedata/unitdefs.lua 引用）
UnitDef = {
    name = "armack",
    objectName = "armack.obj",
    script = "armack.cob",  -- COB 脚本控制动画
    customParams = {
        health = 1000,
        speed = 2.0,
        buildcostenergy = 5000,
    }
}
```

### 2. 三层 Lua 架构（同步 vs 不同步）

| 目录 | 同步 | 用途 |
|------|------|------|
| `luarules/` | 是（所有玩家相同） | 游戏规则、单位行为、碰撞 |
| `luaui/` | 否（每个玩家独立） | 界面、选择、特效渲染 |
| `luaai/` | 是（AI 专属） | AI 决策逻辑 |

这是 Spring 引擎的核心理念：**同步逻辑保证所有客户端一致，不同步逻辑允许个性化 UI/AI**。

### 3. BARb AI 系统

BARb 是 BAR 内置的高级 AI：

- **JSON 配置驱动**：luarules/configs/BARb/ 下大量 JSON 定义 AI 行为
- **分层行为配置**：`behaviour.json`（高级策略）、`build_chain.json`（建造优先级）、`economy.json`（经济分配）
- **难度分级**：stable/easy 多套配置

### 4. 工具链与测试

- **Lux 包管理器**：Lua 依赖声明（lux.toml），类似 npm for Lua
- **Busted 测试框架**：`busted` 运行 Lua 单元测试
- **Emmylua 类型检查**：`lx check` 做静态分析
- **GitHub Actions CI**：lint/unit/integration 测试 + Transifex 翻译合并

### 5. 开发工作流

开发者创建 `devmode.txt` 后，将仓库 clone 到 `games/BAR.sdd` 目录，修改的 Lua 代码实时生效，无需重新编译。

### 6. GL4 渲染管线

luaui/Shaders/ 下有大量 GLSL 着色器：
- `deferred_lights_gl4.frag.glsl`（50KB+）— 延迟光照
- `DrawPrimitiveAtUnit.geom.glsl` — 单元轮廓几何着色器
- `decals_gl4` — 贴花系统

## 游戏设计特点

- **无人口上限**：专注于机械单位的大规模战斗
- **资源系统**：金属 + 能量双资源，经济与军事平衡
- **Scavengers 模式**：内置包生存模式（AI 敌人不断增援）
- **多阵营**：不同阵营有独特单位设计（gamedata/sidedata.lua）
- **国际化**：Transifex 翻译系统（language/）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据驱动 AI 行为 | BARb AI 的 JSON 配置分层设计可借鉴：策略层与执行层分离 |
| 同步/不同步分离 | luarules/luaui 分离架构保证了游戏一致性与 UI 灵活性的平衡 |
| 测试基础设施 | Lux+Busted+Emmylua 的完整工具链值得参考 |
| 组件化游戏定义 | gamedata/ 下的 defs.lua 体系是声明式游戏设计的优秀范例 |
| CI/CD 游戏内容 | GitHub Actions 自动测试 + Transifex 翻译工作流 |

## 相关页面

- [[open-source-game/openra]] — Westwood RTS 开源复刻
- [[open-source-game/zero-k]] — 另一个 Spring 引擎 RTS
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
