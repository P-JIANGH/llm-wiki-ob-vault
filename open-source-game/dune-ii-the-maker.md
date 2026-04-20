---
title: Dune II The Maker (D2TM)
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, sdl2]
sources: [https://github.com/stefanhendriks/Dune-II---The-Maker]
---

# Dune II The Maker (D2TM)

> C++23 完整重制经典 RTS 游戏 Dune II，SDL2 全家桶驱动，现代游戏架构

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/stefanhendriks/Dune-II---The-Maker |
| 语言 | C++23 |
| 构建系统 | CMake 3.21+ / MinGW（Windows）/ GCC 11+（Linux/macOS） |
| 渲染/引擎 | SDL2 + SDL2_image + SDL2_ttf + SDL2_mixer |
| 许可 | GPL |
| 最新版本 | v0.7.0 |
| 仓库规模 | 328 个 .cpp/.h 源文件 |

## 核心技术点

### 三速 Tick 游戏循环
cGame::run() 实现三种不同频率的逻辑 tick：
- `thinkFast()` — 每 ~5ms（输入处理、动画、音频）
- `thinkNormal()` — 每 ~100ms（单位 AI、子弹、建筑物逻辑）
- `thinkSlow()` — 每 ~1000ms（经济系统、慢速 AI 决策）

这种分层时步设计将高频交互与低频战略决策分离，是 RTS 游戏的经典模式。

### cGame 状态机架构
游戏通过 `cGame` 类的 `setNextStateToTransitionTo()` + `initiateFadingOut()` 管理状态转换：

```
cMainMenuState → cMentatState → cChooseHouseState → cGamePlaying → cSelectYourNextConquestState → cWinLoseState
```

所有状态实现 `cGameState` 抽象接口（`thinkFast/Normal/Slow()` + `draw()`），状态间通过 GameContext 共享服务而非直接耦合。

### GameContext 依赖注入容器
`src/context/GameContext.hpp` 聚合所有共享服务（GraphicsContext、TextContext、cTimeManager、cSoundPlayer、SDLDrawer），各状态接收 GameContext* 而非直接访问全局变量，逐步替代 legacy globals。

### SDL2Drawer 渲染管线
`src/drawers/` 目录下每个 drawer 专注一个渲染关注点：
- map drawer / minimap drawer / sidebar drawer / particle drawer / structure drawer / mouse drawer / message drawer
- `cDrawManager` 组合所有 drawer 在战斗/游戏状态统一绘制
- 图形资源从 `bin/data/*.dat` 文件加载（Graphics 类封装），多个实例：`gfxdata`、`gfxinter`、`gfxworld`、`gfxmentat`

### INI 配置驱动数据
游戏数据（单位属性、建筑物成本、场景规则）通过 `cIniFile` / `cIniUtils` 在启动时从 INI 文件加载：
- `bin/campaign/` — 战役任务配置
- `bin/skirmish/` — 遭遇战地图配置
- `resources/game.ini` — 全局游戏参数

### PlayerBrain AI 系统
`src/player/brains/` 实现多种 AI 变体：

| Brain 类 | 用途 | Mission 类型 |
|----------|------|--------------|
| cPlayerBrainCampaign | 战役 AI | Attack/Explore/DeathHand/Fremen/Saboteur |
| cPlayerBrainSkirmish | 遭遇战 AI | 同上 |
| cPlayerBrainSandworm | 沙虫特化 AI | — |
| cPlayerBrainEmpty | 空 AI（测试用） | — |

每个 Brain 每 ~100ms 执行一个 Mission，Mission 之间通过优先级队列调度。

### Superweapon 系统
`src/player/brains/superweapon/` 实现 Dune 2 经典超级武器：
- **DeathHand** — 导弹地毯式轰炸
- **Fremen** — 弗里曼战士突袭
- **Saboteur** — 破坏者渗透

### 游戏对象架构
- **Units** (`cUnit`, `cUnits`) — 数组池管理，cUnitInfos 持有静态类型数据
- **Structures** — 多态子类（cRefinery/cBarracks/cPalace 等），cStructureInfos 配置数据
- **Bullets** — 投射物系统
- **Particles** — 粒子特效
- **Map** — 扁平 cell 数组（32×32 px 地块），cCell 持有地形/单位/建筑/战争迷雾数据

### Observer 事件系统
两种观察者接口并行：
- `cScenarioObserver` — 接收 `s_GameEvent`（单位死亡、建筑建成等）
- `cInputObserver` — 接收 `s_MouseEvent` 和 `cKeyboardEvent`

### 遗留架构警告
代码中明确承认 `cGame game` 全局实例是 legacy，正在逐步迁移到 proper class 封装。CMakeLists.txt 已升级到 C++23 标准。

## 玩法特点

- 经典 Dune II（1992）重制，致敬 Westwood RTS 开山之作
- 三大派系：Atreides / Harkonnen / Ordos，各有独特单位
- 沙虫生态：沙虫会攻击任何移动单位，增加战场变数
- 经济系统：采集 Spice 建造防御和进攻单位
- 超级武器（DeathHand/Fremen/Saboteur）需要特定建筑和资源
- 支持战役模式和遭遇战（Skirmish）地图

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多速游戏循环 | thinkFast/Normal/Slow 三层分离模式适合分离 UI 响应（5ms）和战略决策（1000ms）|
| 状态机架构 | cGameState 派生子类模式清晰，GameContext 依赖注入避免全局耦合 |
| AI Mission 系统 | Priority-based mission queue 可复用，Enemy/ally 共享框架 |
| INI 数据驱动 | 配置与代码分离，运行时热加载 INI 修改无需重新编译 |
| SDL2 渲染封装 | drawer 分离模式可借鉴，Entity 组件与渲染系统解耦 |
| Superweapon 设计 | 独特能力（DeathHand/Fremen）可作为 Skill System 设计的参考 |

## 相关页面

- [[open-source-game/keeper-fx]] — Dungeon Keeper 开源增强，另一个 RTS/塔防参考
- [[open-source-game/openra]] — C&C 系列开源复刻，Westwood 风格 RTS
- [[open-source-game/warzone-2100]] — 3D RTS，另一款开源 RTS 实现
