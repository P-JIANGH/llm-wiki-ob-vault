---
title: NakedAVP
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, first-person-shooter, alien, predator, classic-game-port, sdl3, build-engine]
sources: [https://github.com/atsb/NakedAVP]
---

# NakedAVP

> Aliens vs Predator Classic (2000) 现代端口，SDL3+OpenGL/OpenAL 跨平台重实现，三族（Alien/Predator/Marine）FPS

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/atsb/NakedAVP |
| 语言 | C (主) + C++ (部分模块) |
| 构建系统 | CMake 3.15+ |
| 渲染/引擎 | OpenGL / OpenGL ES 2 (自动检测) |
| 音频 | OpenAL |
| 许可 | GPL (需原版游戏数据) |
| 分支 | main (75 commits) |
| 依赖 | SDL 3 (stable), OpenAL, OpenGL |

## 核心技术点

### SDL3 现代化移植
- 基于 icculus.org 早期 Linux/macOS/Windows 移植版本，atsb 主导的现代化重构
- SDL3 完全替代旧版 SDL API，支持现代显示驱动和音频后端
- 自动降级 OpenGL → OpenGL ES 2，适配桌面和嵌入式设备

### 双渲染器架构
- CMake `OPENGL_TYPE` 参数三选一：`AUTO` / `OPENGL` / `OPENGLES2`
- `AUTO` 模式优先检测桌面 OpenGL，不可用则降级到 GLES2
- OpenGL 渲染管线在 `src/opengl.c` (5220 LOC)，GLES2 在 `src/oglfunc.c` (182 LOC)

### 平台抽象层
- `src/stubs.c` — 原版 Windows/DirectX API 桩函数，Linux 替代实现
- `src/winapi.c` — Windows API 模拟层（文件/输入/窗口管理）
- `src/winfiles.c` — Windows 文件系统抽象 (792 LOC)
- 支持 Win32 源码目录 (`src/win32/`) 和 Win95 兼容层 (`src/win95/`)

### 源码结构（约 45K LOC C/C++）

**核心引擎层：**
- `src/opengl.c` — OpenGL 渲染管线（材质/光照/几何）
- `src/openal.c` — OpenAL 3D 空间音频（1168 LOC）
- `src/frustum.c` — 视锥裁剪算法（39K LOC，最大的单文件）
- `src/kshape.c` — 骨骼形状/模型加载（182K LOC，最大的单文件）
- `src/tables.c` — 预计算查找表（164K LOC，数学表驱动）
- `src/maths.c` — 数学库（三角/向量/矩阵，40K LOC）

**游戏逻辑层 (`src/avp/`)：**
- `bh_*.c` — 行为/AI 处理器（alien/predator/marine 各独立文件）
- `hud.c` — 三族独立 HUD 实现
- `weapons.c` — 三族独立武器系统
- `player.c` / `pmove.c` — 玩家移动控制器
- `ai_sight.c` — 视野检测 AI

**数据文件层：**
- 40+ .rif 关卡文件（`area52.rif`, `sulaco.rif`, `nostromo.rif` 等）
- `fastfile/tex*.ffl` — 纹理包
- `fastfile/*sound.dat` — 音频包（alien/predator/marine 独立）
- `avp_huds/` — 三族 HUD 资源

### Windows API 兼容层
- `src/win95/` — 前端菜单/UI 组件 (`avp_menus.c`, `avp_menudata.c`)
- `src/win95/frontend/` — 游戏内前端（关卡选择/多人配置/用户档案）
- `src/win95/gadgets/` — Qt 风格 UI 组件系统（按钮/文本输入/进度条）

## 玩法特点

- **三族独立体验**：Alien（攀墙/爪击）、Predator（隐身/锁链炮）、Marine（枪械/装甲）
- **电影级场景**：AVP 经典电影氛围（Hadley's Hope 殖民地、Nostromo 破败飞船）
- **经典战役 + 多人**：含 15+ 张多人/合作地图（不支持原版电影过场）
- **数据驱动关卡**：.rif 文件定义关卡内容，无需重新编译即可 mod

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **跨平台移植模式** | Windows API 抽象层 → SDL 跨平台的经典范式；stubs.c 桩函数模式值得复用 |
| **SDL3 现代用法** | atsb 已稳定使用 SDL3，比 SDL2 更适合多线程渲染和现代输入 |
| **GL/GLES2 双渲染器** | CMake 参数化渲染后端选择，对移动/桌面合一游戏有参考价值 |
| **关卡数据文件化** | .rif + .ffl 分离代码与内容，mod 友好的架构设计 |
| **三族差异化设计** | 独立 AI 处理器、武器、HUD 的模块化实现；适合"同引擎多角色"游戏 |
| **音频空间化** | OpenAL 3D 音频实现；可为 AI 游戏 NPC 脚步声/环境音提供参考 |

## 编译说明

```bash
# 依赖
apt install libsdl3-dev libopenal-dev libgl-dev

# 编译
mkdir build && cd build
cmake .. -DOPENGL_TYPE=AUTO
make

# 运行（需原版游戏数据）
export AVP_DATA=/path/to/AvP_Data  # 所有文件名需小写
./avp
```

## 相关链接

- 原始 icculus 移植：http://icculus.org/avp/
- 原版游戏数据获取：GOG / Steam Aliens vs Predator Classic 2000
