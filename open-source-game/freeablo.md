---
title: Freeablo
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, engine-port, rpg, action]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Freeablo

> Diablo 1 游戏引擎清洁室重实现，现代跨平台开源引擎

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/wheybags/freeablo |
| 语言 | C++17 |
| 构建系统 | CMake |
| 渲染/引擎 | SDL2 (窗口/输入/音频) + OpenGL (渲染) |
| 网络 | ENet (确定性锁步) |
| 许可 | MIT |
| 状态 | **已归档** (2020年) |
| 规模 | ~38K LOC, 364 源文件 |

## 核心技术点

### 架构决策
- **双线程架构**: 渲染线程 + 游戏逻辑线程分离，模拟速度与帧率独立
- **确定性锁步网络**: 弃用原版有问题的多人实现，改用确定性锁步 (类似 [[OpenTTD]], [[Hypersomnia]])
- **整数/定点数数学**: 游戏模拟禁用浮点数保证确定性
- **无符号整型禁用**: 避免负值转 size_t 的坑
- **Nuklear GUI**: 弃用 librocket，改用 Nuklear (可皮肤化，贴近原版 Diablo 风格)
- **资源懒加载**: 渲染线程按需从原版 Diablo 格式 (CEL, MPQ) 懒加载精灵数据
- **StormLib MPQ**: 读取原版 Diablo 数据文件 (DIABDAT.MPQ)
- **依赖策略变迁**: Hunter 包管理器 → 完全内嵌依赖 (2020年项目归档前)

### 组件模块

| 组件 | 功能 |
|------|------|
| `faudio` | 音频管理 |
| `cel` | CEL 格式解码 ( Diablo 精灵动画) |
| `diabloexe` | 解析原始 Diablo.exe 获取数据 |
| `faio` | 异步文件 IO |
| `Image` | 图像处理 |
| `input` | 输入处理 |
| `level` | 关卡系统 |
| `misc` / `nuklearmisc` | 工具库 |
| `random` | 随机数 (确定性) |
| `render` | OpenGL 渲染管线 |
| `serial` | 存档序列化 |
| `settings` | 配置管理 |

### 应用程序

| App | 用途 |
|-----|------|
| `freeablo` | 主游戏引擎 |
| `celview` | CEL 精灵查看器 |
| `exedump` | 从 Diablo.exe 导出数据 |
| `mpqtool` | MPQ 档案工具 |
| `launcher` | 游戏启动器 (早期版本) |

### 渲染管线 (render 组件)
- OpenGL 后端 (弃用 SDL2 渲染)
- SpriteGroup 精灵组管理
- AtlasTexture 图集纹理
- 调试渲染器 (DebugRenderer)
- 光标渲染 (Cursor)
- 帧缓冲 (Framebuffer)
- 渲染实例 (RenderInstance)

## 玩法特点

- 需原版 Diablo 1.09 数据文件 (DIABDAT.MPQ + Diablo.exe)
- 支持城镇+地下城探索
- 玩家/NPC 动画、移动战斗 (近战/远程/魔法)
- 怪物掉落物品系统
- 商店买卖系统
- 调试功能: F10 纹理过滤、F11 调试网格、滚轮缩放

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 确定性网络同步 | 锁步模型适合强交互游戏 [[OpenTTD]] [[Hypersomnia]] |
| 双线程渲染/逻辑分离 | 独立模拟 tick 保证一致性 |
| C++17 现代特性 | 智能指针、optional、variant 替代 boost |
| 原版数据复用 | 清洁室逆向+重写需要精细的格式解析 |
| 定点数数学 | 竞技性游戏避免浮点不确定性的范式 |
| Nuklear GUI | 游戏内嵌 UI 可用轻量 Immediate Mode GUI |

## 局限性与教训

- **项目已归档**: 作者 2020 年停止维护，最后一次 commit 2020年2月
- **仅支持 1.09 版本**: 原版 Diablo 版本锁定
- **单人游戏为主**: 网络功能为确定性锁步但实际可用性有限
- **需原版资产**: 无法开箱即用，需持有原版游戏

## 关联页面

- [[open-source-game/devilutionX]] — Diablo 清洁室逆向开源端口
- `open-source-game/open-diablo-ii` — Diablo 2 开源复刻
- [[openmw]] — Morrowind 引擎重实现 (同为清洁室重实现)

