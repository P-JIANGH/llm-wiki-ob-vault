---
title: Frogatto & Friends
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, platformer, pixel-art, data-driven, localization]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Frogatto & Friends

> 动作冒险平台跳跃游戏，Anura 引擎的数据驱动模块架构，像素美术风格

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/frogatto/frogatto |
| 引擎 | [Anura Engine](https://github.com/anura-engine/anura)（独立仓库） |
| 模块版本 | 5.1 |
| 最低引擎版本 | 1.4 |
| 语言 | C++ (引擎) + FFC 脚本 (游戏逻辑) |
| 许可 | 自定义（参见 LICENSE 文件） |
| 平台 | Windows, macOS, Linux, iOS, Web |
| 游戏类型 | 动作冒险平台跳跃 |

## 架构特点

### 引擎/模块分离架构

Frogatto 是 **模块化数据驱动** 架构的典型案例：

- **Anura Engine**（独立仓库）：通用 2D 游戏引擎，处理渲染、物理、音频、资源管理
- **Frogatto Module**（本仓库）：纯游戏内容/配置，不含引擎代码
- `module.cfg` 定义模块元数据（版本、依赖、启动参数）
- `master-config.cfg` 定义发布版引擎配置

这种架构使同一个引擎可以运行不同游戏（Cube Trains, Argentum Age 等）。

### 数据驱动游戏逻辑

游戏逻辑以 FFC（ Forth-like Cellular Chemistry ）脚本编写，存储在 `data/` 目录：

```
data/
├── classes/          # 对象类定义（audio, inventory_item, zorder 等）
├── level/           # 游戏关卡（Forest/, Cave/, Dungeon/ 等子目录）
├── items.cfg        # 物品定义
├── gui/             # UI 配置
└── achievements.cfg # 成就系统
```

对象系统在 `module.cfg` 中有严格验证：
```javascript
validate_objects: "def(map definition, [string] protos) -> string|null
    if((definition.solid_area or definition.platform_area) and 'cosmetic_effects' not in protos,
        'objects with solid_area or platform_area must be derived from cosmetic_effects...')
```

### 国际化架构

支持 **16 种语言**本地化（locale/ 目录）：
`eo, fr, da, zh_CN, pl, he, pt_BR, nl, tt, ja, de, el, cs, pt_PT`

使用标准 `LC_MESSAGES` 格式，每个语言独立子目录。

## 核心技术点

### 像素美术引擎特化

Anura 引擎针对像素美术有专门优化：
- 高性能 2D 渲染管线
- 像素艺术常用图形效果支持
- 适合复古风格平台游戏

### 物理系统

- `solid_area` / `platform_area` 双物理区域系统
- `cosmetic_effects` 基类继承约束验证
- 预测性玩家运动（`predictive_player_motion.cfg`）
- 伪随机数系统（`pseudo_random_numbers.cfg`）

### 协作地图编辑

内置关卡编辑器（`data/editor/`），支持社区协作关卡设计。

## 玩法特点

- **Frogatto 特色**：伸舌机制（tongue-grabbing），可获取远处物品/攻击敌人
- **Mana 能量系统**：统一魔法资源，驱动多种能力（火焰呼吸、自动追踪射击等）
- **难度级别**：Easy / Normal / Challenging（v1.3+）
- **街机模式**：独立游戏模式（v1.1+）
- **进度系统**：存档系统、成就系统、排行榜

## 游戏数据规模

| 类别 | 数量/描述 |
|------|----------|
| 关卡目录 | Arcade, Cave, Dungeon, Forest, Seaside, Editor 等 |
| 语言 | 16 种翻译 |
| 资源 | images/, music/, fonts-bitmap/ |
| 配置文件 | module.cfg, master-config.cfg, 20+ .cfg 文件 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 数据驱动架构 | 引擎与内容分离，同一引擎可开发多款游戏，降低引擎维护成本 |
| 模块化设计 | game module 独立版本管理，引擎作为运行时，可热更新内容 |
| 国际化 | 标准 LC_MESSAGES + 16 语言覆盖，可复用国际化管线 |
| 验证系统 | module.cfg 中内嵌 FFC 验证器，编译期检查对象定义合法性 |
| 像素美术 | Anura 引擎针对像素艺术的专门优化，可考虑类似专用渲染通道 |
| 社区协作 | 内置编辑器 + 社区关卡，延长游戏生命周期 |

## 相关链接

- [Anura Engine](https://github.com/anura-engine/anura) — 驱动 Frogatto 的通用 2D 引擎
- [Cube Trains](https://ddr0.ca/cube%20trains/index) — 同一引擎的另一款游戏
- [Argentum Age](https://github.com/davewx7/citadel) — Anura 引擎上的另一款作品
- [官网下载](http://www.frogatto.com/download) — 各平台预编译版本

