---
title: Doom 3 BFG Edition (id Software)
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, id-tech-4, shooter, reverse-engineering]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Doom 3 BFG Edition (id Software)

> id Tech 4 (id Software 2004) 引擎源码，GPL 许可。BFG Edition 包含重制版 Doom 1 (doomclassic) + Doom 3 完整战役。核心技术：动态光照、 portals 渲染、Lua 脚本系统。

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/id-Software/DOOM-3-BFG |
| 语言 | C++（主要），C（doomclassic） |
| 构建系统 | Visual Studio 2010 (.sln)，无跨平台 CMake |
| 渲染技术 | id Tech 4 引擎，portal 渲染，阴影体贴图 |
| 许可 | GNU General Public License 2.0（不含游戏数据） |
| 发布时间 | 2012（BFG Edition），源码开源时间不明 |

## 目录结构

```
DOOM-3-BFG/
├── neo/                    # Doom 3 BFG 源码（主要）
│   ├── framework/          # 游戏框架（命令系统、控制台、CVar）
│   ├── renderer/           # 渲染引擎（OpenGL、图片、字体）
│   ├── idlib/              # 通用库（数学、容器、哈希、解析器）
│   ├── game/               # 游戏逻辑（武器、AI、碰撞）
│   ├── sound/              # 音频引擎
│   ├── ui/                 # 用户界面
│   ├── sys/                # 系统层（文件、线程）
│   └── d3xp/               # Doom 3 XP 战役代码
├── doomclassic/            # 经典 Doom 1 源码
│   ├── doom/               # Doom 1 主源码
│   └── timidity/           # MIDI 音色库
├── base/                   # 资源目录
│   └── renderprogs/        # GLSL 渲染着色器
└── amplitude/              # 音频幅度库
```

## 核心技术点

### id Tech 4 Portal 渲染架构
- **Portal 系统**：房间通过 portal 相连，渲染器只绘制可见 portal 内的几何体
- **区别于 Doom BSP**：Doom 1 使用 BSP 树做渲染排序；Doom 3 用 portal 做可见性判断
- **阴影体贴图**：支持实时阴影（但源码不含"Carmack's Reverse" stencil shadow 实现）

### 框架子系统

| 目录 | 职责 |
|------|------|
| `framework/` | 命令系统 (CmdSystem)、CVar 参数系统、Console、Menu、Network |
| `renderer/` | OpenGL 渲染、Image Manager（多种格式）、Cinematic 视频、GuiModel |
| `idlib/` | 数学库 (idVec3/ idMat3/ idAngles)、Parser/Lexer、Dict/Hash、Heap |
| `game/` | 实体系统、武器系统、碰撞检测、AI 状态 |
| `sound/` | 音频播放、3D 空间化 |
| `sys/` | 文件系统、线程、CPU 检测 |

### 第三方库（源码包含）

| 库 | 路径 | 许可证 |
|----|------|--------|
| JPEG | `renderer/jpeg-6/` | IJPG (独立性 JPEG 组) |
| zlib | `framework/zlib/` | zlib |
| TiMidity | `doomclassic/timidity/` | GPL/LGPL/Artistic |

### doomclassic — 经典 Doom 1 重制
- 独立 `doomclassic/` 子项目，复用 Doom 1 逻辑
- BFG Edition 将经典 Doom 1 作为可玩游戏收录
- TiMidity MIDI 音色系统支持

## 重要限制（README 明确）

> 1. **无游戏数据**：源码不含游戏数据，游戏数据仍受原版 EULA 保护
> 2. **无 Steam 功能**：不含 Steam 集成（成就、排行榜、配对、云同步）
> 3. **无 Bink 视频**：不含 Bink 视频解码
> 4. **无 Carmack's Reverse**：不含 stencil shadow "depth fail" 实现
> 5. **VS2010 only**：只有 Visual Studio 2010 项目文件，无 Linux/macOS 构建配置

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Portal 渲染 | 比 BSP 更适合开放关卡，AI 路径查找也可利用 portal 空间分割 |
| CVar/命令系统 | 运行时调试控制台设计值得借鉴，游戏内参数调整无需重启 |
| 确定性设计 | id Tech 系列一贯追求确定性，便于网络同步和回放 |
| 引擎/游戏分离 | renderer/framework/game 分离清晰，引擎复用多处 |
| Scriptable AI | Doom 3 使用 Lua 脚本扩展（部分 mod），行为逻辑可数据驱动 |

## 相关页面

- [[doom]] — Doom 1 (id Software 1997) BSP 树渲染架构
- [[open-source-games-list]] — 开源游戏列表总览
