---
title: CnC Tiberian Dawn
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, rts, westwood, ea, 1990s, directx]
sources: [https://github.com/electronicarts/CnC_Tiberian_Dawn]
---

# CnC Tiberian Dawn

> EA 官方开源的 C&C 泰伯利亚黎明（原版1995）完整源代码，Westwood Studios 1991-1995 年开发

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/electronicarts/CnC_Tiberian_Dawn |
| 语言 | C++ (Watcom C++ + 少量 x86 汇编) |
| 构建系统 | Watcom Makefile (BFILE.MAK) |
| 渲染/引擎 | 混合：DOS 控制台 + Windows 95 DirectX (DirectDraw/DirectSound/DirectPlay) |
| 许可 | GPLv3 |
| 源码大小 | 1629 KB |
| 发布年份 | 2024 (EA 官方开源) |
| Stars | 1780 |

## 源码结构

```
CnC_Tiberian_Dawn/          # 扁平结构，所有源码在根目录
├── *.CPP / *.H            # 主体 C++ 源码 (~150+ 文件)
├── *.DEF                  # Windows 链接定义文件
├── *.IDE                  # IDE 配置/资源定义
├── *.MAK                  # Watcom Makefile
├── *.ASM                  # x86 汇编 (TXTPRNT.ASM, WINASM.ASM)
├── *.REP                  # 报表/数据文件
├── *.PRO                  # 配置プロ文件
├── *.MAC                  # 宏定义
└── TOOLS/
    └── MIXFILE.EXE        # MIX 打包工具
```

**注意：** 与 CnC_Remastered_Collection 不同——这是**原版1995年源码**，不是重制版源码。原版源码来自 Westwood 的 Visual SourceSafe VCS 标签，代码注释中包含 `$Header: F:\projects\c&c\vcs\code\...` 路径。

## 核心技术点

### 类层次架构

```
ObjectClass (最基类)
└── TechnoClass (有科技属性的对象)
    ├── FootClass (可移动单位基类)
    │   ├── InfantryClass — 步兵单位
    │   └── UnitClass — 车辆单位
    ├── BuildingClass — 建筑
    └── AircraftClass — 飞机单位

AnimClass (动画效果，独立层次)
```

每个对象类都有对应的 `*TypeClass` 静态类型数据类（如 `InfantryTypeClass`、`UnitTypeClass`），用于存储类型元数据（血量、速度、武器等）。

### 对象系统

| 文件 | 职责 |
|------|------|
| `TYPE.H/CPP` | 类型元数据系统 (`WeaponTypeClass`, `UnitTypeClass` 等)，数据驱动设计 |
| `INFANTRY.H/CPP` | 步兵类，含恐惧系统 (Fear Level: Anxious→Scared→Panic→Maximum) |
| `UNIT.H/CPP` | 车辆单位 (17.7万行最大源文件之一) |
| `BUILDING.H/CPP` | 建筑类，含建造/升级/出售逻辑 |
| `AIRCRAFT.H/CPP` | 飞机类 |
| `CELL.H/CPP` | 地图格子系统 |
| `MAP.H/CPP` | 战术地图管理 |
| `TRIGGER.H/CPP` | 触发器系统（任务脚本） |
| `MISSION.H/CPP` | 单位任务状态机 |

### 网络多人系统

| 文件 | 职责 |
|------|------|
| `COMBUF.H/CPP` | **通信缓冲队列** — ACK/Retry 逻辑，消息排序，延迟计算 |
| `COMQUEUE.H/CPP` | 消息队列管理 |
| `SESSION.H` | SessionClass — 多人游戏全局状态，最多6玩家 |
| `CONNECT.H/CPP` | 连接管理抽象层 |
| `IPXADDR.H/CPP` | IPX 网络地址封装 |
| `TCPIP.H` | TCP/IP 支持 (L65) |
| `CCDDE.H/CPP` | DDE (Dynamic Data Exchange) 动态数据交换 |

**多人协议：** IPX 网络包 (MAX_IPX_PACKET_SIZE=546字节) / 串口 / Modem，支持 IPX、Modem、Serial、TCP/IP 多种连接方式。

### 资源系统

- **Tiberium (泰伯利亚矿)** — 资源采集经济系统
- **HouseClass** — 派系系统 (GDI / NOD / Civilian)
- **MixFile 系统** (`CCFILE.H`) — 打包游戏数据文件（贴图、音效、地图等）
- `TOOLS/MIXFILE.EXE` — MIX 打包工具

### Windows 95 移植架构

```
CONQUER.DEF     # Windows DLL 导入定义 (DirectDraw/DirectSound/DirectPlay)
WINSTUB.CPP     # Windows 95 存根/适配层 (Shape 提取、调试输出)
```

### 汇编组件

- `TXTPRNT.ASM` — 文本渲染 (x86 汇编优化)
- `WINASM.ASM` — Windows汇编支持
- 大量 `#include <dos.h>` / `#include <share.h>` DOS API 调用

### 数据驱动设计

- `*.INI` 文件 — 任务/地图配置
- `*.SHP` 文件 — 形状/精灵图
- `*.WSA` 文件 — 战斗地形/背景
- `*.PAL` 文件 — 调色板
- `*.CPS` 文件 — 截图/界面图形
- `*.DAT` / `*.BIN` — 二进制数据

## 玩法特点

- **即时战略** — 资源采集、单位建造、基地防守/进攻
- **两阵营：** GDI (全球防御 Initiative) vs NOD (兄弟会)
- **Tiberium 经济** — 泰伯利亚矿是核心资源
- **Fog of War** — 战争迷雾系统
- **任务/触发系统** — 基于触发器的脚本化任务
- **地图编辑** — 内置地图编辑器

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **RTS 单位 AI** | FootClass → 移动/攻击 AI，`Mission_Attack()` / `Greatest_Threat()` 威胁评估 |
| **路径导航** | 格子占用系统 (Set_Occupy_Bit/Clear_Occupy_Bit)，单元移动碰撞 |
| **经济系统** | Tiberium 采集链 (Harvester → Refinery → 资金) |
| **多人同步** | COMBUF 消息队列 + ACK/Retry 可靠传输，帧同步原型 |
| **数据驱动** | TypeClass 静态只读数据 + 实例可变状态分离设计 |
| **地形系统** | CELL/MAP 双层结构，Overlay 图层叠加 |
| **建筑/单位类系统** | ObjectClass RTTI + TypeClass 元数据模式，C++ OOP 范例 |

## 关键源文件速查

| 文件 | 行数/大小 | 说明 |
|------|-----------|------|
| `CONQUER.CPP` | 13.7万字符 | 主循环/游戏逻辑入口 |
| `TYPE.H` | 6万字符 | 类型系统头文件 |
| `UNIT.CPP` | 17.7万字符 | 车辆单位实现 |
| `BUILDING.CPP` | 20.6万字符 | 建筑单位实现 |
| `ADATA.CPP` | 9.9万字符 | 动画数据 |
| `BFILE.MAK` | 5.2万字符 | 完整构建配置 |
| `COMQUEE.CPP` | 4.4万字符 | 消息队列 |
| `COMBUF.CPP` | 4.4万字符 | 通信缓冲 |

## 关联页面

- [[open-source-game/cnc-red-alert]] — 红警源码（同时期同架构）
- [[open-source-game/cnc-remastered-collection]] — C&C 重制版官方源码（不同代码库）
- [[open-source-game/openra]] — 开源 RTS 引擎复刻（参考其现代实现）
