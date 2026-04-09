---
title: Super Mario 64 (n64decomp/sm64)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, decompilation, platformer, n64, retro]
sources: [https://github.com/n64decomp/sm64]
---

# Super Mario 64 (n64decomp/sm64)

> 任天堂 N64 经典 3D 平台跳跃游戏完整反编译源码，支持 jp/us/eu/sh/cn 多地区版本

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/n64decomp/sm64 |
| 语言 | C + MIPS 汇编 |
| 构建系统 | GNU Make + MIPS交叉编译 (binutils-mips-linux-gnu) |
| 许可 | GPLv2 |
| 平台 | N64 (需要原版 ROM 提取资源) |

## 核心技术点

### 完整反编译
- 100% 可编译的反汇编源码，2746 个 C 文件
- 支持日本(JP)、北美(US)、欧洲(EU)、Shindou(SH)、iQue中国(CN) 五个版本
- 每个版本 SHA1 校验和已记录，构建产物可验证
- 命名和数据结构文档化工作持续进行中

### 构建架构
- **Makefile 驱动**：`make VERSION=<jp|us|eu|sh|cn>` 指定版本
- **baserom 依赖**：必须放置 `baserom.<VERSION>.z64` 用于资产提取
- **Python 资产提取**：`extract_assets.py` 从原版 ROM 提取贴图/模型/音频
- **Docker 支持**：提供 Dockerfile 避免本地交叉编译环境配置

### 代码组织 (src/)
- `engine/` — 渲染/数学/碰撞引擎（几何布局、图节点、表面加载、行为脚本）
- `game/` — 游戏逻辑（99个C文件，含 area/camera/behavior/game_init 等）
- `audio/` — 音频系统
- `menu/` — 菜单系统
- `goddard/` — Mario 头/手套等专属动画（来自原开发工具）
- `actors/` — 角色/NPC/物体行为
- `data/` — 行为脚本数据
- `asm/` — 纯汇编片段

### 多版本条件编译
- `cn_common_syms_*.c` — iQue 中国版特定符号
- 通过 VERSION make 参数切换不同地区的行为差异

## 玩法特点
- 3D 开放关卡平台跳跃，12+ 关卡+赞卜山
- 50+ 条银河硬币收集系统
- 100 星星解锁制度
- 库巴战斗/Bowser Fight 多阶段设计

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 反编译工程 | 多地区版本差异管理、版本化构建、ROM 校验和验证体系 |
| 3D 平台跳跃 | 相机系统(Camera)、碰撞检测(Surface Collision)、行为脚本数据驱动 |
| 资产提取管线 | Python 自动化资源提取 + Makefile 整合的构建流水线 |
| 行为系统 | Graph Node 场景图 + Behavior Script 脚本化实体行为 |
| 复古游戏现代化 | Docker 容器的零配置构建环境 |

## 相关页面

- [[open-source-game/zelda-3]] — SNES 塞尔达传说反编译，另一个经典 2D→3D 过渡时期作品
- [[open-source-game/julius]] — Caesar III 反编译，城市建造游戏反编译代表
