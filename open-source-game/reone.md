---
title: reone
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game-engine, clean-room, cpp]
sources: [raw/articles/open-source-games-list-2026.md]
---

# reone

> Star Wars: Knights of the Old Republic (KotOR) & The Sith Lords 开源引擎清洁室重实现

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/seedhartha/reone |
| 语言 | C++17 |
| 构建系统 | CMake |
| 渲染/引擎 | SDL2 + OpenGL 3.3 |
| 许可 | GPLv3 |
| 源码规模 | ~438 源文件 (398 .cpp + 40 .h) |

## 核心技术点

### 清洁室设计原则
- **不依赖反编译**：完全基于 BioWare 公开的文件格式规格 + 自身观察
- **仅需原版游戏数据**：不分发任何版权素材，用户需自行持有 KotOR/TSL 合法副本
- **非商业项目**：明确不做捐赠/盈利

### 模块化引擎架构
```
src/
├── apps/
│   ├── engine/      # 主游戏引擎入口
│   ├── launcher/   # 游戏启动器（选择游戏目录）
│   ├── toolkit/    # 工具集
│   └── dataminer/  # 数据挖掘工具
└── libs/
    ├── audio/      # 音频子系统
    ├── game/       # 游戏逻辑 (action/animation/combat/d20/effect/gui/object/party/script)
    ├── graphics/   # 渲染 (animation/camera/font/mesh/model/pbr/shader)
    ├── gui/        # GUI 系统
    ├── input/      # 输入处理
    ├── movie/      # 视频播放 (Bink/Miles)
    ├── resource/   # 资源解析 (GFF/2DA/TalkTable/Director)
    ├── scene/      # 场景图
    ├── script/     # NWScript 虚拟机 (format/instrutil/program/routine/variable/vm)
    └── system/     # 系统层 (logger/threadutil)
```

### 依赖库
- **Boost** (program_options, exception) — 程序选项和异常
- **SDL2** — 跨平台窗口和输入
- **OpenGL 3.3** — 3D 渲染
- **GLEW** — OpenGL 扩展管理
- **MAD** — MP3 音频解码
- **OpenAL** — 3D 音频
- **FFmpeg** (可选) — 视频播放

### 渲染管线
- PBR 材质纹理处理 (pbrtextures.cpp)
- 模型/骨骼动画系统 (model.cpp, modelnode.cpp, animation.cpp)
- 帧缓冲区和渲染目标 (framebuffer.cpp, renderbuffer.cpp)
- AABB 包围盒裁剪 (aabb.cpp)
- GLSL Shader 程序 (shader.cpp)

### 资源系统
- **GFF** — BioWare 通用文件格式解析器
- **2DA** — 二维数组数据表
- **TalkTable** — 字符串本地化表
- **Director** — 过场动画调度
- **LIP Animation** — 口型同步动画
- **MDL/MDX** — 模型格式支持

### 脚本系统
- NWScript 虚拟机完整实现
- 指令工具 (instrutil.cpp)
- 程序/Routine/Variable 系统
- 支持 KotOR/TSL 游戏脚本逻辑

## 玩法特点

- 完整运行 KotOR 和 TSL 从头到尾
- 支持 Mod 大幅修改游戏性或提升画质
- 启动器图形界面选择游戏目录
- 命令行: `reone --game GAME_DIR`
- 配置文件 `reone.cfg` 定制化选项
- 测试目标: Steam 未修改版 KotOR + TSL（GOG/零售版应可兼容）

## 与同类项目对比

| 项目 | 语言 | 范围 | 引擎依赖 |
|------|------|------|----------|
| reone | C++ | KotOR/TSL 专用 | 自研 SDL2+GL3.3 |
| xoreos | C++ | Aurora 引擎全游戏 | 自研 |
| KotOR.js | JavaScript | KotOR | Web 技术栈 |
| KotOR-Unity | C# | KotOR | Unity |
| Northern Lights | C# | KotOR | Unity |

**reone 优势**: 专用代码库更轻量，C++ 性能优于 JS，实用的 SDL2+OpenGL 而非专有引擎

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 清洁室逆向 | 完全自主实现、不依赖反编译的合规逆向工程范式 |
| BioWare 资源格式 | GFF/2DA/TalkTable 等文件格式解析可作为资源系统设计参考 |
| NWScript VM | 脚本虚拟机设计（instruction-based bytecode VM）可用于游戏脚本系统 |
| SDL2+OpenGL 架构 | 轻量级现代跨平台游戏引擎技术栈选择 |
| PBR 渲染 | PBRTextured 系统管线可用于光照/材质系统设计 |

## 项目状态

- 处于中期开发阶段
- 大部分引擎子系统已实现
- 游戏机制部分 (game/) 活跃开发中
- 路线图: https://github.com/seedhartha/reone/wiki/Roadmap
- Discord: https://discord.gg/6sqSyfn8Jp
