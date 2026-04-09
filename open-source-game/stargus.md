---
title: Stargus
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, stratagus, starcraft, asset-extraction]
sources: []
---

# Stargus

> StarCraft 1998 数据导入器 — 将原版 StarCraft 资产转换为 Stratagus 引擎可用格式的开源项目

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/Wargus/stargus |
| 语言 | C++17 |
| 构建系统 | CMake + Meson |
| 渲染/引擎 | Stratagus 引擎（外部依赖） |
| 许可 | GPLv2 |
| 版本 | 2.4.1 |
| 规模 | ~15K LOC C++ |

## 核心技术点

### Stratagus 引擎集成
- Stargus **不是独立引擎**，而是 Stratagus 引擎的数据转换层/游戏适配器
- 需要与 Stratagus 引擎 **版本严格匹配** 才能运行
- stratagus + stargus 版本必须对齐，否则不兼容

### 资产提取管线
- `startool.cpp` — 从原版 StarCraft MPQ 压缩包（stardat.mpq / starcraft.mpq）中提取游戏数据
- 支持 CD 安装版和已安装版自动检测（`install.exe` / `stardat.mpq` / `starcraft.mpq`）
- 提取后资产复制到 Stratagus 可读的目录结构

### 数据格式转换
Stargus 实现了多个 StarCraft 专有格式的读取/转换器：

| 格式 | 用途 | 关键文件 |
|------|------|---------|
| **GRP** |  sprite 动画帧序列 | `Grp.h/cpp` |
| **CHK** | 地图关卡数据（Rezneit Miller 格式） | `Chk.h/cpp` |
| **SMC/SMW** |  StarCraft 地图格式 | `startool.cpp` |
| **CASC** | 暗黑破坏神系列档案格式 | `Casc.h/cpp` |
| **SMACKER** | 视频/过场动画 | `Smacker.h/cpp` |
| **WAV** | 音频 | `Wav.h/cpp` |
| **DDS** | 压缩纹理 | `Dds.h/cpp` |
| **PCX** | 图片格式 | `Pcx.h/cpp` |

### tileset 转换系统
- `tileset/MegaTile.*` — 大瓷砖图组合系统
- `tileset/TiledPaletteImage.*` — 调色板图像切片
- `tileset/TilesetHub.*` — tileset 中心转换器
- 处理 StarCraft 原始 tileset 数据为 Stratagus 格式

### dat 数据系统
- `dat/DataHub.*` — 所有单位/物品数据的中心访问
- `dat/Flingy.*` — Flingy 运动数据（移动类型、速度、转向）
- `dat/IScript.*` — StarCraft 脚本指令系统
- `dat/ObjectAccess.*` — 单位属性访问接口

### JSON 配置导出
- `dataset/units.json` — 单位定义（攻击力/护甲/科技等）
- `dataset/palettes.json` — 调色板配置
- Stratagus 通过 JSON 读取游戏数据而非硬编码

### 构建系统
- **Meson**（主构建系统）：`meson build && ninja -C build`
- **CMake**（备用）：传统 CMakeLists.txt
- 支持 nlohmann_json（CMake subproject fallback）和 StormLib（CASC/MPQ 库）
- `contrib/` 包含 fog.png 和 transparent.png 等 UI 素材

## 玩法特点

- 运行时首次启动会提示用户提供 **原版 StarCraft CD 或安装文件**
- 自动提取 stardat.mpq/starcraft.mpq 中的游戏数据
- 完整保留原版 StarCraft 兵种、单位、地图数据
- 在 Stratagus 引擎上运行 StarCraft 1998 体验

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **数据驱动架构** | JSON 配置分离游戏数据与引擎逻辑，便于 AI 读取和修改 |
| **多格式解析层** | Kaitai Struct + 自定义解析器组合处理多种二进制格式 |
| **资产提取工具链** | startool 的 MPQ → 可用数据管线对 AI 游戏资源管理有参考价值 |
| **外部引擎适配模式** | Stargus 作为 Stratagus 的"游戏模块"而非独立引擎 — 类似地将 AI 逻辑与游戏引擎解耦 |
| **版本对齐依赖** | stratagus/stargus 版本匹配约束的依赖管理策略 |

## 架构图

```
原版 StarCraft CD/MPQ
        │
        ▼
   startool 提取
        │
        ▼
┌───────┴────────────────────────────────┐
│           Stargus 转换层                │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │ GRP 转换 │  │ CHK 转换 │  │ tileset│ │
│  │ sprites │  │  maps    │  │转换   │ │
│  └──────────┘  └──────────┘  └───────┘ │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │ dat/单位 │  │SFX/音频  │  │ SMACK │ │
│  │  数据    │  │ 转换     │  │视频   │ │
│  └──────────┘  └──────────┘  └───────┘ │
└───────┬────────────────────────────────┘
        ▼
┌─────────────────┐
│  Stratagus 引擎 │ ← 外部依赖（版本必须匹配）
└─────────────────┘
```
