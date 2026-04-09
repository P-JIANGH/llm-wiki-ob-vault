---
title: Tomb Engine
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, engine, tomb-raider, lua-scripting, cpp]
sources: [https://github.com/TombEngine/TombEngine]
---

# Tomb Engine (TEN)

> Tomb Raider 1-5 引擎清洁室重实现，支持 Lua 脚本、高帧率、抗锯齿、骨骼动画、对角线几何体

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/TombEngine/TombEngine |
| 语言 | C++ |
| 版本 | 1.11.1 |
| 构建系统 | MSVC (.vcxproj) + NuGet |
| 渲染 | DirectX（推测，基于 Windows 平台） |
| 许可 | MIT License（修改版，非商业用途） |
| 配合工具 | Tomb Editor（独立编辑器） |

## 核心技术点

### 模块化架构
- **Game/** — 游戏逻辑（Animation/Collision/Control/Effects/Lara/Misc/Items/Room/Sink/Spotcam/StaticMesh 等子目录）
- **Renderer/** — 渲染管线（ConstantBuffers/Draw/Draw2D/DrawEffect/DrawMenu/PostProcess/SMAA/ShaderManager/Structures）
- **Scripting/** — Lua 脚本系统（Include/Internal 分层，sol2 C++ Lua 绑定库）
- **Physics/** — 物理系统（CollisionMesh/Objects）
- **Resources/** — 资源管理（音频/纹理/着色器）
- **Specific/** — 平台特定代码（Input/IO/Clock/Configuration/Parallel/Winmain）

### Lua 脚本系统
- 使用 **sol2** 库绑定 C++ 和 Lua
- Scripting/Internal/TEN/ 下分为 Objects/Audio/Effects/Flow/Input/Inventory/Logic/Sound/Strings/Types/Util/View
- 暴露 Game/Level/State 三层 ScriptInterface
- LuaHandler 管理脚本执行（ExecuteScript/ExecuteString）
- MakeReadOnlyTable 模板方法生成只读配置表

### 渲染特性
- 高帧率支持
- 抗锯齿（SMAA 集成）
- Mipmapping
- SSAO（屏幕空间环境光遮蔽）
- 完整骨骼动画支持（Skeletal Animation）
- 对角线几何体支持（经典引擎限制突破）

### Tomb Editor 配套
- 引擎与编辑器分离（TombEngine 仓库 + TombEditor 仓库）
- TombEditor 用于关卡创建和测试
- TombIDE 用于项目管理和调试

## 玩法特点

- 支持 Tomb Raider 1-5 的经典玩法
- 无缝关卡转换
- 无限制的地图大小
- 现代化渲染管线同时保留原版逻辑

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| Lua 脚本层设计 | sol2 C++/Lua 绑定模式，Game/Level/State 三层 ScriptInterface 可复用 |
| 渲染/逻辑分离 | Renderer/Game/Math/Physics/Resources 完全模块化 |
| 经典游戏现代化 | 清洁室逆向 + 现代渲染管线结合的范式 |
| 工具链生态 | 引擎 + 编辑器 + IDE 三件套分离设计 |
