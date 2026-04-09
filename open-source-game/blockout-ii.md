---
title: BlockOut II
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, puzzle, 3d-puzzle]
sources: [raw/articles/blockout-ii-2026.md]
---

# BlockOut II

> 3D 俄罗斯方块（Layered Polycube Puzzle），OpenGL 渲染，AI Bot 对战

## 基本信息

| 项目 | 内容 |
|------|------|
| 作者 | Jean-Luc PONS (jlp_38@yahoo.com) |
| 网站 | http://www.blockout.net/blockout2 |
| 语言 | C/C++（约 12K LOC，30 个 .cpp 文件） |
| 构建系统 | Makefile（gcc/g++） |
| 渲染/引擎 | OpenGL + SDL 1.2 |
| 许可 | GPLv2 |
| 平台 | Windows / Linux（x86/x64） |
| 版本 | 2.5（最新，2014） |

## 核心技术点

### 架构模块化设计
源码分为 `BlockOut/` 主游戏和独立 `ImageLib/` 图像库两部分：

| 模块 | 文件 | 说明 |
|------|------|------|
| GLApp | GLApp.cpp/.h 等 | OpenGL 应用程序框架（字体/矩阵/精灵） |
| Game | Game.cpp (1504行) | 游戏管理层，核心循环 |
| Pit | Pit.cpp (1535行) | 3D 坑（游戏区域），立方体层级渲染 |
| PolyCube | PolyCube.cpp (874行) | 3D 多立方体碎片定义与碰撞 |
| InitPolyCube | InitPolyCube.cpp (473行) | 碎片初始化（16种标准碎片） |
| BotPlayer | BotPlayer.cpp (902行) | AI Bot 玩家，评估函数驱动 |
| BotPlayerAI | BotPlayerAI.cpp (497行) | 评估函数，深度优先搜索最佳落点 |
| MenuGraphics | MenuGraphics.cpp (798行) | 菜单 UI OpenGL 渲染 |
| SetupManager | SetupManager.cpp (860行) | 配置管理（含回放文件读写） |
| Http | Http.cpp (480行) | HTTP 在线排行榜客户端 |
| SoundManager | SoundManager.cpp | SDL_mixer 音频管理 |
| Sprites | Sprites.cpp (426行) | 精灵/纹理管理 |
| Page*.cpp | PageMainMenu 等 | 各菜单页面（Page 模式状态机） |

### Bot AI 评估函数
BotPlayerAI 使用评估函数为每个可能的落点打分：

```c
#define GET_DISTANCE(x,y,z) sqrtf((float)(((x)-W)*((x)-W)+(y)*(y)+(z)*(z)));
float BotPlayer::CheckDeathZone();  // 边缘死亡区检测
float BotPlayer::GetPitNote();       // 落点综合评分
```

评估维度：
- **Death Zone（L0/L1）**：右边缘填满风险检测，权重 -25/-5
- **高度惩罚**：底部留空导致无法消层，权重 -2.5
- **距离评分**：碎片中心到中心的欧几里得距离

### 3D OpenGL 渲染架构
- `Pit::Render()` — 绘制 3D 坑体（线框/实体双模式）
- `Pit::RenderLevel()` — 绘制已填层的 3D 块
- `MenuGraphics` — 3D 菜单旋转展示
- `GLMatrix` — 透视/正交矩阵变换，相机控制
- `GLSprite` — 2D 精灵贴图（菜单 UI）

### 回放系统
- `SetupManager` 管理 `.bl2replay` 回放文件格式
- 重放模式记录所有输入操作和时间戳
- v2.2 引入，支持本地和在线排行榜

### 在线功能
- HTTP API 连接 `blockout.net` 在线排行榜
- `PageHallOfFameOnLine` 在线分数页
- `Http.cpp` 实现 HTTP GET/POST 客户端

## 玩法特点

- **3D Polycube 掉落**：2D Tetris 的 3D 版本，碎片由立方体组成，可沿 X/Y/Z 三轴旋转
- **消层机制**：填满任意水平层即消除，类似 Tetris
- **练习模式**：v2.4 新增，AI Bot 对战练习
- **演示模式**：Bot 自动对战（v2.5 改善 AI 表现）
- **6 种风格**：Marble / Arcade / Crystal 等视觉效果可配置
- **透明度和帧率限制可调**

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| AI Bot 评估函数 | 评估函数驱动型 AI — 可用于游戏中 NPC 决策系统 |
| 3D 渲染架构 | OpenGL + SDL 轻量级 3D 游戏架构参考 |
| 回放系统 | 游戏状态录制 → 重放可复用为 AI 训练数据采集 |
| 在线排行榜 | 简单 HTTP API 设计适合小型游戏服务端 |
| 菜单 UI | 3D 旋转菜单 UI 提升游戏质感 |
| 碎片生成 | 确定性随机 + 配置化碎片系统设计 |

## 版本历史

| 版本 | 关键更新 |
|------|---------|
| 2.5 | 64位支持，Linux OpenGL 统一，改进 Bot |
| 2.4 | 帧率限制，演示模式，练习模式，FLAT 随机 |
| 2.3 | 回放系统，线上海洋分数榜，新风格 |
| 2.2 | 方向盘键支持，透明度可配置，在线功能 |
| 2.1 | 修正下落算法，难度调优 |

## 相关 Wiki 页面

- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比
