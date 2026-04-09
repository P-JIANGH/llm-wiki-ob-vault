---
title: Oolite
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, space-simulation, elite-clone, objc, game-engine]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Oolite

> Elite (1984) 风格太空开放世界贸易战斗游戏，现代跨平台开源复刻

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OoliteProject/oolite |
| 语言 | Objective-C + C |
| 构建系统 | GNUmakefile + config.make |
| 渲染/引擎 | OpenGL + SDL（跨平台） |
| 许可 | GPLv2 |
| 最新版本 | 1.92.x |
| 平台 | Windows / Linux (AppImage/Flatpak) / macOS(历史) |

## 核心技术点

### 架构设计
- **双渲染后端**：Cocoa (macOS) + SDL（Windows/Linux）共享同一 Core 层
- **Entity-Component 早期雏形**：`Entity` 基类（~81K LOC），所有游戏对象继承
- **AI 子系统**：`AIGraphViz.m` 等文件支持可视化 AI 行为调试
- **碰撞检测**：`CollisionRegion` 网格分区优化大规模实体碰撞
- **OpenGL Shader 材质系统**：`Materials/` 目录完整实现 PBR 材质

### OXP 扩展系统（核心亮点）
- Oolite Extension (OXP) = 插件包，修改游戏玩法/添加飞船/改进图形
- DebugOXP 目录：开发时热加载的调试扩展
- OXP 解压到 `AddOns/` 目录即可加载，无需修改源码
- `oolite.readthedocs.io` 有完整扩展开发文档

### 数据驱动
- `Schemata/`：XML Schema 定义 OXP 配置格式
- `Resources/`：游戏资源包（飞船模型、着色器、数据文件）
- 配置完全外部化，OXP 可覆盖任意游戏内容

### 网络
- 历史上支持 LAN 多人（TCP/IP），当前版本主要单人

## 玩法特点

- **开放世界太空探索**：无缝银河地图，数百恒星系统
- **贸易经济**：买入卖出货物，投资股票，不同星系价格差套利
- **战斗**：狗斗、赏金、警局任务、非法货物走私
- **升级飞船**：武器、引擎、货舱、 ECM 、燃料等
- **高度模组化**：OXP 系统支持几乎无限扩展

## 与 Elite 的关系

- **非直接逆向工程**：独立代码实现，复刻 Elite 游戏机制
- **无原版资产**：游戏数据（飞船模型、纹理）需从原版 Elite 提取或社区重建
- **法律上清洁**：完全重写，GPLv2 发布

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据驱动游戏设计 | OXP Schema 系统是游戏内容外部化的优秀范例，AI 可生成 OXP 配置 |
| 跨平台渲染架构 | Cocoa+SDL 双后端共享 Core 层的设计，对多平台适配有参考价值 |
| Entity/AI 分离 | Entity 基类统一管理渲染/物理，AI 子系统独立调试 |
| 开放世界生成 | 银河地图动态生成，恒星系统随机分布算法可借鉴 |
| 扩展生态 | OXP 社区驱动的游戏内容增长模式，适合 AI 辅助生成内容 |
