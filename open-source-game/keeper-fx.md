---
title: KeeperFX
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, rts, god-game]
sources: [https://github.com/dkfans/keeperfx]
---

# KeeperFX

> Dungeon Keeper 开源增强版，在原版基础上修复 BUG、提升分辨率、优化 AI、支持现代多人协议

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/dkfans/keeperfx |
| 语言 | C (C11) + C++ (C++20)，src/ 目录下共 ~235K LOC |
| 构建系统 | CMake 3.20+，LLD 链接器加速 |
| 依赖 | SDL2, SDL2_image, SDL2_mixer, SDL2_net，vcpkg 管理 |
| 许可 | GPLv2 |
| 最新版本 | 1.2.0.0 |
| 仓库 Stars | ~7.1k |

## 核心技术点

### 从反编译到完全重写
KeeperFX 起源于对原版 Dungeon Keeper 可执行文件的反编译逆向工程，逐步演变为**完全重写**的清洁室实现。原版代码仅作参考，最终所有代码均独立重写，避免版权问题。

### A* 寻路系统 (ariadne)
`ariadne_*.c` 模块是核心寻路实现，包含：
- A* 路径搜索 (ariadne.c, ariadne_navitree.c)
- 导航堆 (ariadne_naviheap.c)
- 区域分割 (ariadne_regions.c)
- 三角测量 (ariadne_tringls.c)
- 墙贴移动 (ariadne_wallhug.c)
- 寻路缓存 (ariadne_findcache.c)

### Lua 脚本集成
`lua_*.c` 提供 Lua 脚本 API，扩展游戏逻辑：
- `lua_api.c` — 核心 API 绑定
- `lua_api_player.c`, `lua_api_room.c`, `lua_api_things.c` — 各子系统绑定
- `lua_api_lens.c` — 镜头/视野 API
- `lua_cfg_funcs.c` — 配置函数
- `lua_triggers.c` — 事件触发器
- `lvl_script*.c` — 关卡脚本语言解析器

### ENet 网络多人
`bflib_enet.c` 基于 ENet 库实现 UDP 多人对战，原生支持现代网络协议，包含大厅匹配 (net_matchmaking.c)、NAT 穿透 (net_holepunch.c)、游戏存档同步 (net_game.c) 等。

### 资产工具链
配套工具将原版资源转换为可用格式：
- `sndanker` — SFX 档案转游戏内声音
- `png2bestpal` / `pngpal2raw` / `png2ico` — PNG 转游戏调色盘/ICO
- `po2ngdat` — .po 语言文件转 .dat
- `rnctools` — RNC 压缩处理
- `dkillconv` — 地图文本格式转换（未完成）

### 双可执行目标
CMakeLists.txt 定义两个 target：
- `keeperfx` — 发布版 (BFDEBUG_LEVEL=0)
- `keeperfx_hvlog` — 高详细日志调试版 (BFDEBUG_LEVEL=10)

## 玩法特点

KeeperFX 保留原版 Dungeon Keeper 核心玩法：**地牢管理**+**恶魔召唤**+**掠夺英雄**。主要增强：
- 更高分辨率（现代屏幕支持）
- 解耦渲染与游戏逻辑（提升 FPS）
- 改进 AI 行为
- 现代化网络多人
- 额外战役、地图、生物和内容
- 深度模组支持

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 寻路系统 | ariadne A* 模块是生产级寻路实现，可参考其区域分割+缓存优化 |
| Lua 脚本 API | lua_api_*.c 展示了如何将 C 游戏逻辑暴露给脚本层 |
| ENet 网络 | bflib_enet.h/c + net_*.c 展示了可靠的 UDP 游戏网络同步方案 |
| 从反编译到重写 | 展示了如何将逆向工程合法转化为清洁室开源实现 |
| 模组生态 | 工具链（png2bestpal 等）支撑模组资产管线，值得游戏工具开发参考 |

