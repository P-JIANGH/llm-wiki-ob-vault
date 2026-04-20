---
title: Fallout 2 Community Edition
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg]
sources: [https://github.com/alexbatalov/fallout2-ce]
---

# Fallout 2 Community Edition

> Fallout 2 完全重实现，修复引擎 bug + QoL 改进，多平台支持

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/alexbatalov/fallout2-ce |
| 语言 | C++ (4.5MB+, 4533KB), Java (196KB), CMake |
| 构建系统 | CMake + C++17 |
| 渲染/引擎 | SDL2 跨平台渲染，自研引擎（非游戏引擎） |
| 许可 | Other (自定义，需要原版游戏数据) |
| Stars | 2,291 |
| Forks | 178 |
| 默认分支 | main (6 分支) |
| 平台 | Windows, macOS (Intel+Apple Silicon), iOS, Android, Linux |

## 核心技术点

### 清洁室重实现架构
- **纯 C++ 重写**：非反编译源码，基于对 Fallout 2 二进制行为理解完全重写
- **数据文件驱动**：需要原版 `master.dat`、`critter.dat`、`patch000.dat`、`data/` 文件夹（从 GOG/Steam/Epic 获取）
- **跨平台 SDL2 抽象层**：`src/platform/` 子目录隔离平台差异（iOS/Android/macOS/Windows/Linux）
- **第三方依赖嵌入式**：`third_party/sdl2/` (SDL2), `third_party/zlib/` (zlib), `third_party/fpattern/` (文件模式匹配)

### 源码结构 (378 文件)
| 目录 | 内容 |
|------|------|
| `src/` | 核心引擎 (~200+ .cc/.h)，约 4.5MB C++ 代码 |
| `src/mapper/` | 内置地图编辑器 (mp_scrpt/targt/text/func) |
| `src/platform/` | 平台适配层 (ios/, android/) |
| `os/` | 各平台原生代码 (Android Java/iOS/macOS/Windows) |
| `third_party/` | 嵌入式第三方库 |

### 核心模块 (src/)
- **art.cc/h** — FRM/FLC/RIX 动画文件解析
- **audio.cc + audio_engine.cc** — 音频子系统
- **combat.cc + combat_ai.cc** — 战斗 + AI 系统
- **critter.cc** — 生物/NPC 系统
- **datafile.cc + db.cc** — DAT/压缩包资源加载
- **dialog.cc + game_dialog.cc** — 对话系统
- **dfile.cc** — 存档 I/O
- **game.cc + game_dialog.cc** — 主循环 + 对话管理
- **interpreter.cc** — Fallout 2 脚本 VM（核心引擎）
- **inventory.cc + item.cc** — 物品/背包系统
- **map.cc** — 地图/场景系统
- **object.cc** — 游戏对象基类
- **sfall_*.cc** — Sfall 兼容性层（sfall_config/globals/opcodes/metarules）
- **scripts.cc** — 脚本系统
- **window_manager.cc** — 窗口/GUI 管理
- **worldmap.cc** — 世界地图系统

### Sfall 兼容性
- `sfall_config` — 配置系统兼容
- `sfall_global_vars/globals_scripts` — 全局变量/脚本
- `sfall_opcodes` — 扩展操作码
- `sfall_lists/metarules` — 列表/元规则扩展
- **目的**：兼容 Fallout 2 社区模组（如 Restoration Project、Nevada、Sonora 等）

### 质量改进 (vs 原版 Fallout 2)
- 引擎 bug 修复
- 多平台开箱即用
- QoL 改进（不断迭代）
- 部分 total conversion mod 支持

## 玩法特点

- **等距俯视角 RPG**：经典 Fallout 2 体验（1998 年）
- **后世界末日氛围**：核战后的美国大陆探索
- **分支剧情**：对话选择影响剧情走向
- **回合制战斗**：基于技能/属性/S.P.E.C.I.A.L. 的 RPG 战斗系统
- **基地建设/贸易**：据点管理 + 派系贸易
- **支持社区 Mods**：Sfall 扩展兼容层

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室重实现 | 二进制逆向理解 → 行为完全重写，绕过版权 |
| 嵌入式第三方 | SDL2/zlib 直接 vendored，避免外部依赖 |
| 平台抽象 | src/platform/ 分离平台差异，多平台复用同一套代码 |
| Sfall 兼容性层 | 向后兼容扩展 API 设计：sfall_* 接口层让 mod 社区持续贡献 |
| 脚本 VM | 内置脚本解释器（interpreter.cc）驱动游戏逻辑，数据与逻辑分离 |
| 多平台构建 | CMake presets + iOS/Android/Desktop 跨平台 Gradle/Android Studio + Xcode |
| 资源打包 | DAT/dat 资源包 + 虚拟文件系统(db.cc)，mod 友好 |

## 相关页面

- [[open-source-game/fallout-community-edition]] — Fallout 1 清洁室重实现，同一作者
- [[open-source-game/openmw]] — Morrowind 引擎重实现，同为经典 RPG 重实现参考
- [[open-source-game/gemrb]] — Infinity Engine 重实现（Baldur's Gate/Icewind Dale），RPG 引擎重实现另一个范例
- [[open-source-game/exult]] — Ultima VII 重实现，经典 RPG 重实现先例
