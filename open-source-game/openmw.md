---
title: OpenMW
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rpg]
sources: [https://github.com/OpenMW/openmw]
---

# OpenMW

> Morrowind 引擎清洁室重实现（C++，无游戏数据依赖），最成熟开源 RPG 引擎之一，附带 OpenMW-CS 编辑器

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenMW/openmw（官方在 GitLab: https://gitlab.com/OpenMW/openmw） |
| 语言 | C++20 |
| 构建系统 | CMake 3.16+ |
| 渲染引擎 | OpenSceneGraph（osgViewer）+ OpenGL |
| 物理 | Bullet Physics |
| GUI | MyGUI（自定义 OpenGL 渲染层） |
| 脚本 | 自研编译器/解释器（Morrowind 原有脚本）+ sol3 (Lua) |
| 许可 | GPLv3 |
| 版本 | 0.51.0（主线），主线游戏已可通关 |

## 核心技术点

### 架构：Engine 中心总线

`OMW::Engine` 是核心类，持有一个完整的子系统集合：

```cpp
std::unique_ptr<MWWorld::World>          mWorld;
std::unique_ptr<MWSound::SoundManager>   mSoundManager;
std::unique_ptr<MWScript::ScriptManager>  mScriptManager;
std::unique_ptr<MWGui::WindowManager>    mWindowManager;
std::unique_ptr<MWMechanics::MechanicsManager> mMechanicsManager;
std::unique_ptr<MWDialogue::DialogueManager> mDialogueManager;
std::unique_ptr<MWLua::LuaManager>       mLuaManager;
std::unique_ptr<MWState::StateManager>   mStateManager;
osg::ref_ptr<osgViewer::Viewer>         mViewer;  // OpenSceneGraph
```

这种架构与 `MWBase::Environment` 单例配合（各子系统通过 Environment 互访），实现了游戏引擎核心与各模块的解耦。

### 双脚本系统

OpenMW 实现了**两套并行脚本系统**：

1. **Morrowind 原有脚本**（`components/compiler/` + `components/interpreter/`）：完全重写 Bethesda 的脚本编译器，将 MWScript 编译为字节码后由解释器执行。extensions.hpp 定义了所有内置函数（~100+）。
2. **Lua 脚本**（`components/lua/`）：通过 sol3 嵌入式 Lua 5.4，支持现代 Mod 开发。`LuaManager` 异步加载/执行 Lua 脚本。

两种脚本可通过 `LuaManager` 互相调用，实现了向后兼容与现代扩展的统一。

### ESM/ESP 格式解析

`components/esm/` 解析 Morrowind 原生数据格式：
- `.esm`（Master file）和 `.esp`（Plugin）：记录了世界所有对象、NPC、脚本、对话、物品
- 支持 esm3/esm4 双格式（Morrowind/Tribunal/Bloodmoon + 大型 Mod）
- `esmloader/` 处理esm terrain（Land 记录网格生成）
- `nif/`（NiVT 文件）处理模型数据

### 渲染管线

- **osgViewer**：OpenSceneGraph 场景管理，osgQt 集成 Qt
- **mwrender/**：角色动画（ActorAnimation / CreatureAnimation）、地形（TerrainStorage）、天空（Sky）、水（Water）、本地地图（LocalMap）
- **nifosg/**：NiFF → OSG 转换层，NiFF 是 Morrowind 的网格/骨骼/动画格式
- **detournavigator/**：Recast/Detour 导航网格（用于 NPC AI 寻路）

### 工具链全家桶

OpenMW 不只是游戏引擎，还自带一套完整的 Mod 制作工具：

| 工具 | 用途 |
|------|------|
| `opencs` | OpenMW Construction Set — Qt5 编辑器，替代 Bethesda CS |
| `bsatool` | BSA 资源包解压/创建 |
| `esmtool` | ESM/ESP 文件检查/导出 |
| `niftest` | NIF 文件格式测试 |
| `navmeshtool` | 导航网格生成工具 |
| `bulletobjecttool` | Bullet 物理对象导入 |
| `essimporter` | Morrowind 存档导入 |

### 目录结构

```
apps/
  openmw/       # 游戏主程序
    mwclass/    # 游戏对象类（Actor, Armor, Book, Weapon...）
    mwbase/     # 子系统抽象接口（Environment, ScriptManager...）
    mwgui/      # UI 窗口（Alchemy, CharacterCreation, Dialogue...）
    mwrender/   # 渲染子系统
    mwinput/    # 输入管理（SDL2）
    mwscript/   # 脚本编译器
    mwmechanics/# 游戏逻辑/AI
    mwlua/      # Lua 集成层
  opencs/       # 编辑器 Qt5 应用

components/
  esm/          # ESM/ESP 格式解析
  esm3/, esm4/  # Morrowind/TES4 格式支持
  lua/          # sol3 Lua 嵌入式
  compiler/     # MWScript 编译器
  interpreter/  # 字节码解释器
  nif/          # NIF 网格/骨骼格式
  nifbullet/    # NIF → Bullet 碰撞转换
  detournavigator/# 导航网格
  terrain/      # 地形系统
  myguiplatform/# MyGUI OpenGL 集成
  translation/  # 多语言 i18n
  settings/     # 配置系统
  vfs/          # 虚拟文件系统（支持 BSA 归档）

extern/
  sol3/         # Lua 5.4 嵌入式
  osg-ffmpeg-videoplayer/  # Bink/Smacker 视频播放
  osgQt/        # OSG Qt 集成
  oics/         # INI 配置解析
```

## 玩法特点

- **完全免费运行 Morrowind**：只需持有原版游戏数据（OpenMW 不含游戏数据）
- **主线 + Tribunal + Bloodmoon 均可通关**
- **新特性**：改进图形、宽屏支持、Mac/Linux 原生、现代 UI
- **兼容原版 Mod**（非所有 Mod — MWScript 编译器检查更严格）
- **OpenMW-CS**：功能完整的关卡编辑器，替代 Bethesda 原版 CS

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **双脚本架构** | 既有遗留脚本系统又有现代 Lua 扩展，可作为 AI NPC 行为脚本层的设计参考 |
| **Engine 总线模式** | OMW::Engine 聚合所有子系统，是模块化游戏引擎的经典参考 |
| **ESM 数据驱动** | Morrowind 的 ESM 格式是大型开放世界数据驱动的成功案例（100+ 小时游戏内容全部数据化） |
| **导航网格寻路** | Detour/Recast 集成方案适合 AI 单位导航 |
| **工具链生态** | 引擎 + 编辑器 + 资源打包 + 存档导入 — 完整游戏开发工具链设计 |
| **版本兼容性** | OpenMW 对 Morrowind 原版存档 100% 兼容的策略（数据分离 + 模拟层）值得参考 |
