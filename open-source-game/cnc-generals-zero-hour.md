---
title: C&C Generals + Zero Hour (EA Source Release)
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, rts, ea, westwood, directx]
sources: [raw/articles/open-source-games-list-2026.md]
---

# C&C Generals + Zero Hour (EA Source Release)

> EA 官方源码发布：C&C Generals + Zero Hour，含 2700+ .cpp 文件，双游戏目录架构

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/electronicarts/CnC_Generals_Zero_Hour |
| 语言 | C/C++ (Visual Studio C++ 6.0 .dsp/.dsw) |
| 构建系统 | MSVC 6.0 (SP6) 或 MSVC 2015+ (需大量改造) |
| 渲染/引擎 | W3DDevice (Westwood 3D) + DirectX 9 |
| 许可 | GPL v3 + 附加条款 |
| 源码规模 | Generals ~1280 .cpp / GeneralsMD ~1421 .cpp |

## 项目结构

```
Generals/
├── Code/
│   ├── GameEngine/          # 核心游戏引擎
│   │   ├── Source/
│   │   │   ├── Common/       # 通用基础类型
│   │   │   ├── GameClient/   # 客户端渲染/UI/输入
│   │   │   ├── GameLogic/    # 游戏逻辑核心
│   │   │   │   ├── AI/       # AI (AIPathfind/AIGroup/AIPlayer/AISkirmishPlayer等)
│   │   │   │   ├── Map/      # 地图系统
│   │   │   │   ├── Object/   # 对象系统 (Armor/Weapon/Locomotor/Behavior/Body/Collide等)
│   │   │   │   ├── ScriptEngine/  # 脚本引擎
│   │   │   │   └── System/   # 核心系统
│   │   │   └── GameNetwork/  # 网络同步 (FrameDataManager/Connection/GameSpy)
│   │   └── Include/
│   ├── GameEngineDevice/    # 平台/渲染设备抽象
│   │   ├── W3DDevice/       # Westwood 3D 渲染器 (Common/GameClient/GameLogic)
│   │   ├── Win32Device/     # Win32 平台实现
│   │   ├── MilesAudioDevice/# Miles 音频设备
│   │   └── VideoDevice/     # 视频设备 (含 Bink 集成)
│   ├── Libraries/           # 第三方依赖 (STLport-4.5.3/DX9SDK/Max4SDK等)
│   └── Main/                # WinMain 入口 (RTS.RC/resource.h/WinMain.cpp)
├── Run/                      # 编译输出目录
└── stlport.diff             # STLport 4.5.3 补丁文件

GeneralsMD/                   # Zero Hour 扩展包 (独立平行结构)
├── Code/ (类似 Generals/Code/，1421 .cpp)
└── Run/
```

## 核心技术点

### W3DDevice 渲染架构
- Westwood 自研 3D 渲染管道，DirectX 9 为主要后端
- W3DDevice/ 包含 Common/GameClient/GameLogic 三个子目录
- VideoDevice/ 含 Bink 视频解码集成

### 对象系统 (Object/)
- `Object.cpp` — 基础游戏对象
- `Armor.cpp`, `Weapon.cpp`, `WeaponSet.cpp`, `Locomotor.cpp` — 属性系统
- `ObjectCreationList.cpp` — 对象创建列表（数据驱动）
- `ObjectTypes.cpp` — 类型元数据
- `PartitionManager.cpp` — 空间分区（加速碰撞查询）
- `Damage.cpp`, `Destroy.cpp`, `Die.cpp` — 伤害/死亡处理
- `ExperienceTracker.cpp`, `FiringTracker.cpp` — 经验追踪
- `GhostObject.cpp` — 幽灵对象（网络同步用）
- Behavior/Update/Contain/SpecialPower/Upgrade/ — 丰富行为组件

### AI 系统 (AI/)
- `AI.cpp`, `AIPlayer.cpp`, `AISkirmishPlayer.cpp` — 分层 AI 玩家
- `AIGroup.cpp`, `AIGuard.cpp`, `AISquad.cpp`, `AITNGuard.cpp` — 单位组/守卫/阵型
- `AIPathfind.cpp` — 寻路系统
- `AIStates.cpp` — AI 状态机
- `TurretAI.cpp` — 炮塔专用 AI

### 网络系统 (GameNetwork/)
- `FrameData.cpp`, `FrameDataManager.cpp` — 帧同步数据管理
- `Connection.cpp`, `ConnectionManager.cpp` — 连接管理
- `GameSpy*.cpp` — GameSpy SDK 集成（已过时）
- `NAT.cpp` — NAT 穿透
- `LANAPI*.cpp` — LAN 发现协议
- `FileTransfer.cpp`, `DownloadManager.cpp` — 文件传输/下载管理
- `FirewallHelper.cpp` — 防火墙助手
- WOLBrowser/ — 局域网浏览器

### 数据驱动设计
- `ObjectCreationList.cpp` — 对象创建列表（类似 CommandEngine 的对象创建描述）
- `ScriptEngine/` — 脚本系统
- `Map/` — 地图数据结构
- `Upgrade/` — 升级系统

## 依赖问题（最大痛点）

源码发布不含以下必要库，必须自行寻找或移除：
- DirectX SDK 9.0+ → Code/Libraries/DX90SDK/
- STLport 4.5.3 → Code/Libraries/STLport-4.5.3/ (stlport.diff 补丁)
- 3DSMax 4 SDK → Code/Libraries/max4sdk/
- NVASM → Code/Tools/NVASM/
- GameSpy SDK → Code/Libraries/Source/GameSpy/
- RAD Miles Sound System SDK → Code/Libraries/Source/WWVegas/Miles6/
- RAD Bink SDK → Code/GameEngineDevice/Include/VideoDevice/Bink/
- SafeDisk API → Code/GameEngine/Include/Common/SafeDisk/
- ZLib 1.1.4 / LZH-Light 1.0

**编译门槛极高**：MSVC 6.0 SP6 是最匹配版本，现代 MSVC 2015+ 需要大量改造。

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 帧同步网络 | FrameDataManager 帧同步架构，Connection 分层连接管理 |
| AI 分层设计 | AIPlayer→AISkirmishPlayer→AISquad→AITurret 多层抽象 |
| 对象组件系统 | Behavior/Body/Collide/Contain/Locomotor 分组件设计（类似 ECS 雏形） |
| 数据驱动对象创建 | ObjectCreationList 列表式对象生成描述 |
| W3DDevice 抽象 | 渲染设备与游戏逻辑分离架构 |
| 脚本引擎 | ScriptEngine/ 嵌入式游戏脚本系统 |

## 备注

- **非清洁室实现**：这是 EA 官方直接发布的原始源码，不是社区清洁室重写
- **无维护支持**：EA 明确标注"归档保存目的，无支持"
- **游戏数据分离**：需持有原版游戏（C&C Ultimate Collection on Steam/EA App）
- **Steam Workshop**：EA 提供了 Workshop 支持（Generals appid=2229870 / Zero Hour appid=2732960）
- **对比 CnC Remastered**：CnC_Remastered_Collection 是 C&C TD+RA 的源码，本项目是 Generals+Zero Hour 的源码，两者是不同游戏
