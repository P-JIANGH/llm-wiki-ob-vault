---
title: CnC Red Alert (1996)
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, rts, ea, westwood, isometric, tile-based, dos-era]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Command & Conquer: Red Alert (1996)

> 红色警戒 — Westwood Studios 开发的首款 C&C 系列游戏（1996），以二战架空历史为背景的即时战略游戏

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/electronicarts/CnC_Red_Alert |
| 语言 | C++ (17.9MB) / Assembly (5.1MB) / C (2MB) / Pascal (700KB) |
| 构建系统 | Watcom C/C++ v10.6 + Borland TASM v4.0（DOS 16/32位混合编译） |
| 渲染/引擎 | 瓦片地图 + Isometric 2D 渲染，DirectX/WIN32 后端 |
| 许可 | GPL v3（含附加条款，存档目的发布） |
| 代码总量 | 2181 文件，CODE/ 594 文件（277 .CPP + 12 .ASM） |

## 核心技术点

### 多层代码库架构
- **CODE/** — 游戏主体逻辑，含 `MapClass`, `ObjectClass`, `UnitClass`, `BuildingClass`, `AircraftClass` 等核心类
- **WIN32LIB/** — Windows 32 位兼容层（601 文件），适配 WIN16 DOS 源码到 Win32 API
- **WWFLAT32/** — Westwood 32 位 Flat Model 库（428 文件），内存模型抽象
- **WINVQ/** — VQA 视频解码库（Win32 版本，225 文件）
- **VQ/** — VQA/HMI 音频/视频编解码器（191 文件）
- **IPX/** — IPX/SPX 网络协议层（54 文件），支持原始 DOS 16 位网络对战
- **LAUNCH/** — 启动加载器（ASM 16位）
- **LAUNCHER/** — Windows GUI 启动器（48 文件，含 Visual C++ DSP/DSW 项目文件）

### 核心类层次
```
ObjectClass (abstract base)
├── FootClass (地面单位基类)
│   ├── UnitClass (坦克/载具)
│   └── InfantryClass (步兵)
├── BuildingClass (建筑)
├── AircraftClass (飞机)
└── AnimClass (动画特效)
MapClass — 瓦片地图管理（Cell/Overlay/Template 系统）
TacticalClass — 战术视野/视野遮蔽系统
```

### 关键系统
- **地图系统**：基于 Cell 的 2D 瓦片地图，支持 Overlay（覆盖物）和 Template（地形）
- **视野系统**：`MapClass::Sight_From` — 战争迷雾实现，按半径标记可见区域
- **对象系统**：RTTI 类工厂模式，`AbstractClass` 层次结构，`Can_Demolish/Can_Repair` 反射查询
- **VQA 视频**：自制 VQA 视频播放库（HMI SOS 音频 + VQA 视频解码），用于过场动画
- **网络对战**：原始 IPX 协议栈，支持 8 人局域网对战
- **存档格式**：二进制 `SAV` 文件，含完整游戏状态序列化

### 资产依赖
> ⚠️ 源码不含游戏资产（图片/音乐/视频），需持有原版游戏才能运行

## 玩法特点

- **二战架空历史**：盟军 vs 苏军阵营，各有独特单位树
- **资源采集**：沿用 C&C 经典矿车→精炼厂→资金循环
- **混凝土基地建设**：建筑放置受地形约束
- **战术单位组合**：步兵/坦克/飞机/舰船多兵种配合

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| RTS AI 架构 | `UnitClass::AI()` 状态机模式 — 每个单位自主决策，适合有限状态机(FSM)驱动的 AI |
| 路径寻路 | `MapClass::Nearby_Location` — 基于 Cell 的寻路，适合网格化 RTS |
| 战争迷雾 | `MapClass::Sight_From` — 简单按 Cell 半径标记可见性，比现代 RTS 粗粒度但高效 |
| 对象系统 | `ObjectClass` RTTI 层次 — C++ 反射替代方案（type/id 系统），值得在 ECS 中借鉴 |
| 回合化设计 | `Mission` 系统 — 单位任务队列（move/attack/guard），可映射到 GOAL 的 task/completion 模式 |
| 多人同步 | IPX 原始包交换 — 早期 P2P 网络同步模型，比现代 C/S 简单但对等网络有参考价值 |

## 相关页面

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
- [[claude-code-game-studios]] — Claude Code 游戏工作室 49 Agent 工作流
