---
title: Mindustry
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, tower-defense, rts, automation, java]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Mindustry

> 自动化塔防 RTS —— 用传送带构建供应链，抵御敌人波次

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Anuken/Mindustry |
| 语言 | Java (JDK 17) |
| 构建系统 | Gradle (multi-module) |
| 渲染/引擎 | Arc Engine (自研 2D 图形框架) |
| 许可 | GPLv3 |
| Stars | 27.1k |
| Forks | 3.4k |
| Commits | 20,280 |
| 多平台 | Desktop (Win/Mac/Linux)、Android、iOS、Server |

## 核心技术点

### Arc Engine 架构

Mindustry 基于自研的 **Arc Engine**（`arc.*` 包），而非标准游戏引擎：

```
arc.graphics.*     — 2D 渲染 (TextureRegion, Draw, Batch)
arc.math.*        — 数学 (Vec2, Vec3, Mat, Geom)
arc.struct.*      — 数据结构 (Seq, ObjectMap, IntSet)
arc.util.*        — 工具 (Log, Time, Reflect, Annotations)
arc.files.*       — 文件抽象
```

这使得 Mindustry 完全掌控底层，无需第三方引擎依赖。

### 组件化实体系统

Mindustry 使用**代码生成的组件系统**（类似 ECS）：

```java
@Component(base = true)
abstract class UnitComp implements Healthc, Physicsc, Hitboxc, 
    Statusc, Teamc, Itemsc, Rotc, Unitc, Weaponsc, Drawc, 
    Syncc, Shieldc, Displayable, Ranged, Minerc, Builderc, Senseable, Settable
```

- **@Component** 注解标记实体组件
- **`mindustry.gen.*`** 包由 `mindustry.gen` 模块在**构建时自动生成**
- 实体（Unit/Building）由组件组合而成
- 每个组件接口（Healthc、Weaponsc 等）提供特定能力

生成的实体类例子：`Unit`, `Building`, `Bullet`, `EffectState`, `Posc`

### 网络同步 (@Sync)

Mindustry 的多人模式基于**确定性帧同步**：

```java
@SyncLocal float elevation;  // 本地同步字段
sync = true;                 // 块级网络同步标记（如 GenericCrafter）
```

关键类：
- `Syncc` 接口 — 实体同步能力
- 帧同步 + 服务器权威模型
- 支持 P2P 和服务器模式

### 代码生成管线

**mindustry.gen 包构建时生成**，源码中不存在：

| 生成来源 | 生成目标 |
|----------|----------|
| `@Remote` 注解方法 | `Call` 类 + `*Packet` 类 |
| `mindustry.entities.comp` 组件类 | 实体类 (`Unit`, `Building` 等) |
| `mindustry.content.UnitTypes` 定义 | 单位类型实例 |
| `assets/` 资源文件 | `Sounds`, `Musics`, `Tex`, `Icon` |

**生成触发**：`gradlew :tools:pack` sprite packing + 编译时注解处理

### 多模块 Gradle 项目

```
core/          — 核心游戏逻辑、资源、实体系统
desktop/       — Desktop 启动器 (JavaFX/WebGL)
server/        — 专用服务器
android/       — Android 移植
ios/           — iOS 移植
tests/         — 测试
tools/         — 工具 (sprite packing, map editors)
```

desktop 入口：`mindustry.desktop.DesktopLauncher`
server 入口：`mindustry.server.ServerLauncher`

### Block 系统 — 工厂/防御块

`GenericCrafter` 是生产块基类，体现数据驱动设计：

```java
public class GenericCrafter extends Block {
    public @Nullable ItemStack outputItem;      // 物品输出
    public @Nullable LiquidStack outputLiquid;  // 液体输出
    public float craftTime = 80;                  // 制作时间(帧)
    public Effect craftEffect = Fx.none;         // 制作特效
    public DrawBlock drawer = new DrawDefault(); // 渲染器
    public boolean sync = true;                  // 启用网络同步
}
```

同类系统：Distribution (分配器)、Power (电力)、Defense (防御)、Turrets (炮塔)

### Content 模块化

`mindustry.content` 包管理所有游戏内容：

```java
// 所有方块定义（170+ 个）
Blocks.java          — 1000+ 行，所有游戏方块

// 单位类型
UnitTypes.java       — 各种可生产单位 (alpha, beta, gamma...)

// 子弹/武器/状态效果
Bullets.java, WeaponTypes.java, StatusEffects.java
```

## 玩法特点

### 核心循环

1. **采集** — 从矿点开采资源 (copper, lead, coal, titanium, thorium)
2. **运输** — 用传送带 (conveyor) 和分配器 (distributor) 运输
3. **加工** — 用工厂 (smelter, press, refinery) 把原料变成高级材料
4. **生产** — 用工厂制造单位 (units) 和武器
5. **防御** — 放置炮塔 (turrets) 抵御敌人波次
6. **进攻** — 指挥单位攻击敌方核心 (enemy core)

### 地图/存档

- 地图编辑器内置
- 沙盒模式可用
- 模组支持 (需要 minModGameVersion >= 136)

### 服务器/多人

- 专用服务器 (`server/` 模块)
- 帧同步多人
- 服务器列表 JSON (`servers_v6.json`)
- 支持 Steam 多人

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **自动化/塔防融合** | 传送带网络 + 资源运输 + 防御波次结合，适合 AI 学习任务规划 |
| **确定性锁步网络** | 纯 Java 实现帧同步多人，无需中途加入，AI 训练可复用 |
| **组件化 ECS** | 代码生成 + 组件组合替代继承，实体扩展性极佳 |
| **Arc Engine 轻量框架** | 自研 2D 引擎避免大厂引擎包袱，迭代快，完全可控 |
| **数据驱动内容** | Blocks/Units 定义与逻辑分离，AI 可通过修改 content 数据训练 |
| **多平台部署** | 一套代码支持 Desktop/Android/iOS，AI 模型可跨平台推理 |

## 相关页面

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
