---
title: micropolisJS
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, city-simulation, typescript, javascript]
sources: [https://github.com/graememcc/micropolisJS]
---

# micropolisJS

> SimCity 经典城市模拟引擎的 JavaScript/HTML5 移植版

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/graememcc/micropolisJS |
| 语言 | TypeScript + JavaScript (混合) |
| 构建系统 | Webpack 5 + TypeScript 5 + ts-loader |
| 渲染 | HTML5 Canvas + jQuery |
| 许可 | GPLv3 + Micropolis Public Name License (商标限制) |
| 依赖 | jQuery 3.7.1 (唯一运行时依赖) |
| 测试 | Jest 30 |

## 核心技术点

### 模块化仿真引擎 (simulation.js, 647行)

micropolisJS 的核心是一个基于事件驱动的城市仿真引擎，采用 **BlockMap 系统**追踪城市各项指标：

| BlockMap | 用途 | 数值范围 |
|----------|------|----------|
| cityCentreDistScoreMap | 城市中心距离评分 | -64 ~ 64 |
| populationDensityMap | 人口密度 | 0 ~ 510 |
| landValueMap | 土地价值 | 0 ~ 250 |
| pollutionDensityMap | 污染密度 | 0 ~ 255 |
| crimeRateMap | 犯罪率 | 0 ~ 250 |
| rateOfGrowthMap | 增长率 | -200 ~ +200 |
| fireStationEffectMap | 消防覆盖效果 | 0 ~ 1000 |
| policeStationEffectMap | 警察覆盖效果 | 0 ~ 1000 |

引擎通过 **PhaseCycle** 分阶段执行模拟（每次 tick 执行一个阶段），包含：
- RCI 规划（Residential/Commercial/Industrial）
- 交通流量计算
- 电力网络传播
- 灾害检测与响应
- 道路/铁路连通性维护

### Sprite 动画系统 (spriteManager.js, 289行)

支持多种动态元素：

| Sprite 类型 | 行为描述 |
|-------------|----------|
| AirplaneSprite | 起飞/降落动画，机场运营 |
| BoatSprite | 港口船只进出 |
| TrainSprite | 铁路列车行驶 |
| TornadoSprite | 龙卷风移动路径 |
| MonsterSprite | 哥斯拉式怪物攻击城市 |
| CopterSprite | 直升机飞行 |
| ExplosionSprite | 爆炸效果 |

每个 sprite 继承自 `BaseSprite`，实现 `move()` 和 `getNewPosition()` 方法。

### 工具系统 (Tool Pattern)

采用 `BaseTool` 基类模式，工具包括：

- `roadTool.js` - 道路铺设
- `railTool.js` - 铁路铺设  
- `wireTool.js` - 电力线架设
- `buildingTool.js` - 区域划分（住宅/商业/工业）
- `bulldozerTool.js` - 拆除工具
- `parkTool.js` - 公园建设
- `queryTool.js` - 信息查询

### 窗口系统 (Window Pattern)

使用 `EventEmitter` 模式管理 UI 窗口：

- BudgetWindow - 预算管理
- EvaluationWindow - 城市评估
- SettingsWindow - 游戏设置
- DisasterWindow - 灾害控制
- SaveWindow / LoadWindow - 存档管理

### 程序化地图生成 (mapGenerator.js, 511行)

使用带种子随机数生成多样地形：
- 山地/平原/水域自动分布
- 桥梁自动连接水域
- 地图尺寸 120x100 格子

## 玩法特点

- 经典城市建造模拟（类似 SimCity）
- RCI 平衡系统决定城市发展
- 多种自然灾害（火灾/洪水/龙卷风/怪物）
- 预算管理控制城市运营
- 市民满意度评估体系

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **仿真引擎架构** | BlockMap 多维度数据追踪系统可复用于物流/经济仿真 |
| **确定性模拟** | 城市模拟的阶段性 tick 执行模式适合决策类 AI 训练环境 |
| **Sprite 系统** | 事件驱动的 sprite 管理可用于实时策略游戏的单位 AI |
| **工具/窗口模式** | 模块化 UI 系统可参考用于沙盒编辑器 |
| **程序化生成** | 带种子的随机地形生成可扩展用于游戏关卡 AI 生成 |

## 架构亮点

1. **jQuery 最小依赖** - 仅用 jQuery 做 DOM 操作，渲染完全自研
2. **TypeScript 渐进迁移** - 核心类型文件（.ts）与现有 JS 文件共存
3. **EventEmitter 解耦** - 组件间通过事件通信，降低耦合
4. **BlockMap 数据驱动** - 用 Grid 数据结构表达城市状态，便于 AI 读取

## 局限性

- 商标限制：不得使用 "Micropolis" 名称进行商业分发
- 单人游戏，无网络同步功能
- 基于经典 SimCity 玩法，缺少现代城市模拟深度
