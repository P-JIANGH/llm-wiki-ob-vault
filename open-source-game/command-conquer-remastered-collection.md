---
title: Command & Conquer Remastered Collection
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, rts, ea, westwood, reverse-engineering, game-engine]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Command & Conquer Remastered Collection

> EA 官方开源的 C&C 泰伯利亚黎明 + 红色警戒 源码及地图编辑器

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/electronicarts/CnC_Remastered_Collection |
| 语言 | C（游戏逻辑）+ C#（地图编辑器）+ 汇编 |
| 构建系统 | Microsoft Visual Studio（推荐 2017）|
| 渲染/引擎 | 原版渲染 + 现代重制版分离 |
| 许可 | GPL v3（含附加条款，需持有原版游戏）|

## 仓库结构

```
CnCRemastered.sln          # 主解决方案（TiberianDawn + RedAlert DLL）
CnCTDRAMapEditor.sln       # 地图编辑器解决方案
TIBERIANDAWN/              # 泰伯利亚黎明游戏逻辑
  ├── *.H                   # ~134 个 C 源码文件（.H 为历史遗留命名）
  │   ├── DEFINES.H         # 95KB — 核心宏定义
  │   ├── TYPE.H            # 62KB — 类型系统
  │   ├── CONQUER.H         # 42KB — 征服逻辑
  │   ├── FUNCTION.H        # 38KB — 函数表
  │   └── *.ASM             # 汇编文件（IPX 网络、键盘缓冲等）
  └── DLLInterface.cpp      # DLL 导出接口
REDALERT/                   # 红色警戒游戏逻辑
  ├── *.H                   # ~241 个 C 源码文件
  │   ├── OCIDL.H           # 237KB — 超大核心定义文件
  │   ├── DEFINES.H         # 107KB
  │   ├── MEMCHECK.H        # 89KB — 内存检查
  │   ├── INLINE.H          # 79KB — 内联函数
  │   └── *.ASM             # 汇编文件
  └── DLLInterface.cpp
CnCTDRAMapEditor/           # C# Windows Forms 地图编辑器
  ├── TiberianDawn/         # TD 地图编辑器模块
  ├── RedAlert/             # RA 地图编辑器模块
  └── Render/               # 渲染组件
SCRIPTS/
  └── tgautil.py            # Steam Workshop 内容处理脚本
```

## 核心技术点

- **C + 内联汇编架构**：游戏逻辑以 .H 文件形式保存（C 代码用 .H 扩展名），配合 .ASM 汇编文件处理性能关键代码（网络协议、键盘处理等）
- **双游戏单仓库**：TiberianDawn.dll 和 RedAlert.dll 各自独立但共享解决方案结构
- **DLL 导出接口**：4 个薄封装 .CPP 文件（DLLInterface/Editor/MiscAsm/Shape）作为 DLL 导出层
- **地图编辑器 C# 重写**：编辑器用 C# Windows Forms 重写（独立于游戏逻辑仓库）
- **IPX 协议支持**：保留原始 IPX 网络协议相关汇编代码（IPXREAL.ASM/WIN32LIB/）
- **Steam Workshop 集成**：源码支持 Steam Workshop 地图上传，分发通过 `tgautil.py` 脚本处理

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **RTS 引擎架构** | 经典 Westwood RTS 代码结构（HOUSEs/TECHNO/FOOT/CONQUER 分层）直接研究价值高 |
| **DLL 化改造** | 游戏逻辑封装为 DLL + 接口层分离模式，可用于运行时热重载探索 |
| **网络同步** | IPX 协议栈完整保留，对理解 90 年代锁步网络同步机制有历史价值 |
| **地图编辑器** | C# WinForms 重写设计模式，与游戏核心解耦，可独立发布和迭代 |
| **代码保留** | EA 官方开源 + GPL 双许可模式，商业游戏源码开放的范式参考 |

