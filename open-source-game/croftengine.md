---
title: CroftEngine
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, engine-remake, cpp]
sources: [raw/articles/open-source-games-list-2026.md]
---

# CroftEngine

> Tomb Raider 1 (1996) 开源引擎重制，支持幽灵竞速、合作模式、Glidos 纹理包

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/stohrendorf/CroftEngine |
| 语言 | C++ (685 源文件) |
| 构建系统 | CMake 3.16+ |
| 渲染/引擎 | OpenGL + 软件渲染双后端 |
| 许可 | LGPLv3 |
| 最新版本 | v2.5.0 |
| CI | GitHub Actions + CodeQL |

## 核心技术点

### 多格式存档支持
支持 TR1/TR2/TR3/TOMB4 全系列 Tomb Raider 存档格式，TOMB4 (TR4-5) 仍在 WIP。核心解析在 `src/archive/` + `src/loader/`。

### 双渲染器架构
`render/` 目录下多后端：OpenGL + 软件渲染。`soglb/` 为自研 GL 绑定层。

### 幽灵竞速系统
内置 GhostManager — 记录玩家轨迹并回放，支持在线幽灵对战 (haunted.earvillage.net)。`engine/ghosting/` 目录实现。

### 碰撞与寻路
`engine/collisioninfo.cpp/h` + `engine/raycast.cpp/h` 实现 AABB/OBB/Sphere 多种碰撞检测。`engine/lara/` 完整 TR1 劳拉行为系统。

### 粒子与光照
`engine/particle*.cpp` 粒子系统，`engine/lighting.cpp` 动态光照。

### FFmpeg 视频解码
`src/ffmpeg/` 自定义 FFmpeg 绑定，支持游戏过场动画播放。

### Modding 生态
Glidos 纹理包原生支持 — PC 游戏机材质替换包，无需修改游戏文件。

## 玩法特点

- 忠实还原 Tomb Raider 1 (1996) 原版体验
- 支持现代宽屏、高分辨率、抗锯齿
- 原生手柄支持 (SDL2/GLFW)
- 幽灵回放：可与历史最佳成绩"同屏竞速"
- 在线合作：视觉层面双人同屏 (coop play)
- 进度统计：内置详细游戏数据统计
- 全新沉浸式水效果 (Enhanced Water)

## 项目架构

```
src/
├── archive/         # TR1-3/TOMB4 存档格式解析
├── audio/          # 音频引擎
├── core/           # 核心数学/工具
├── dosbox-cdrom/   # CD-ROM 模拟层 (TR1 光驱读取)
├── engine/         # 游戏引擎核心
│   ├── lara/       # 劳拉角色系统 (对象状态机)
│   ├── world/      # 世界/关卡管理
│   ├── floordata/  # 地形数据解析
│   ├── objects/    # 游戏对象 (敌人/道具/触发器)
│   ├── scripting/  # 脚本引擎 (TR1 script system)
│   ├── collisioninfo.cpp  # 碰撞检测
│   ├── raycast.cpp # 射线投射
│   ├── lighting.cpp # 动态光照
│   ├── ghosting/   # 幽灵录制/回放
│   └── presenter.cpp # 渲染呈现
├── etcpak/         # ETC1/ETC2 纹理压缩
├── ffmpeg/         # 视频解码 (过场动画)
├── gameflow/       # 游戏流程状态机
├── hid/            # 人机接口设备 (手柄/键盘)
├── launcher/       # Qt5 设置向导/启动器
├── loader/         # 资源加载器
├── menu/           # 菜单 UI
├── network/        # 网络 (幽灵同步)
├── qs/             # 快速存档
├── render/         # 渲染器
├── serialization/  # 存档序列化
├── ui/             # 用户界面 (HUD/背包)
├── util/           # 工具函数
└── video/          # 视频播放器
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多版本格式兼容 | 同一引擎支持 TR1/TR2/TR3/TOMB4 四代格式，`archive/` + `loader/` 分层设计可参考 |
| 幽灵系统 | GhostManager 独立于游戏逻辑，记录轨迹数据用于回放/竞速 — 可迁移到任何竞速/平台游戏 |
| Modding 生态 | Glidos 纹理包支持体现"内容与引擎分离"理念，可用于公司游戏 mod 支持设计 |
| 引擎双后端 | OpenGL + 软件渲染降级策略，保证老硬件兼容性 |
| Boost 基础设施 | Boost.Log/spdlog 日志、Boost.Filesystem 跨平台路径 — 游戏引擎基础设施搭建参考 |

## 相关页面

- [[openlara]] — 古墓丽影经典引擎另一重实现
- [[open-source-games-list]] — 开源游戏列表总览
- [[open-source-game-engines-comparison]] — 开源游戏引擎对比

