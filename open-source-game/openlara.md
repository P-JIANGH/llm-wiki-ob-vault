# OpenLara

> 古墓丽影经典引擎开源重实现，跨平台多后端渲染，支持 TR1-TR5 多版本

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/XProger/OpenLara |
| 语言 | C++ (41 .cpp) + C 内联引擎（约 35 个 .h 核心模块） |
| 构建系统 | 各平台独立 Makefile/CMake（无统一顶层构建） |
| 渲染/引擎 | 多后端渲染架构（OpenGL / D3D8 / D3D9 / D3D11 / Vulkan / Software） |
| 许可 | BSD 2-Clause |
| 平台 | Windows / macOS / Linux / iOS / Android / PSP / PSV / Switch / Xbox / XboxOne / Nintento 64 / 3DS / WiiU / Web(Emscripten) 等 32 个平台 |

## 核心技术点

### 多平台渲染抽象层（gapi/）

`src/gapi/` 下每文件对应一个图形 API：
- `gl.h` — OpenGL
- `d3d8.h` / `d3d9.h` / `d3d11.h` — Direct3D 系列
- `vk.h` — Vulkan
- `sw.h` — Software 软件渲染
- `gxm.h` — PS Vita GPU
- `gu.h` — PSP GPU
- `c3d.h` — 3DS GPU

每后端实现统一接口，引擎通过 `_GAPI_GL` / `_GAPI_D3D11` 等宏切换。

### 固定点数学（fixed/）

`src/fixed/` 目录为 N64 / 32-bit 主机提供定点数数学运算，保证跨平台一致性。

### 平台抽象（platform/）

32 个平台子目录，隔离平台特定代码：
- `win/` / `osx/` / `nix/` — 桌面系统
- `ios/` / `android/` — 移动端
- `psp/` / `psv/` / `nx/` — 索尼/任天堂主机
- `sdl2/` / `sdl3/` — SDL 跨平台抽象
- `web/` — Emscripten WebAssembly
- `win_fixed/` — Windows 固定点版本

### 引擎核心模块

- `animation.h` — 骨骼动画系统
- `camera.h` — 摄像机控制（跟随/过场/瞄准）
- `collision.h` — 碰撞检测（4方向检测，返回房间/高度/攀爬信息）
- `controller.h` — 实体控制器基类
- `enemy.h` — 敌人 AI 行为
- `game.h` / `gameflow.h` — 游戏流程状态机
- `inventory.h` — 物品/菜单系统
- `lara.h` — Lara Croft 角色状态机
- `level.h` — 关卡数据流式加载
- `stream.h` — 资源流式加载（支持大世界分块加载）
- `nav.h` — 导航网格
- `format.h` — 对象类型枚举（TR1_TYPES_START / TR2_TYPES_START 等多版本支持）
- `texture.h` — 纹理管理
- `shader.h` — 着色器抽象
- `gltf.h` — GLTF 模型导入
- `json.h` — JSON 配置
- `lang/` — 多语言实时切换

### Shader 资源（shaders/）

GLSL / HLSL / ASM 三种着色器格式，跨渲染器复用：
- `ambient.glsl` / `ambient.hlsl` / `ambient_room.asm`
- `common.glsl` / `common.hlsl` / `common.asm`

### 数据文件格式

通过 `format.h` 中定义的常量加载 TR 系列原始数据文件（.phd / .pak / .dat），支持 TR1-TR5 多版本。

## 玩法特点

- 完整复现古墓丽影 1-5 代核心玩法
- 支持多版本数据文件（PS1 / Saturn / PC / N64）
- 内置 WebGL 在线演示版（http://xproger.info/projects/OpenLara/）
- 支持局域网多人（`network.h`）
- 存档系统（`savegame.h`）
- 本地化支持（lang/ 多语言）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多平台渲染抽象 | gapi/ 分层设计可在多种 AI 可视化场景中复用（3D/2D/终端） |
| 定点数学 | 确定性模拟（参考 Freeablo 的浮点消除策略），对 AI 物理仿真有用 |
| 平台抽象 | platform/ 子目录隔离策略适合大型游戏引擎的多后端适配 |
| 碰撞系统 | Collision.h 的 4 向检测 + room 分割对 AI 导航/寻路有参考价值 |
| 游戏流程状态机 | gameflow.h 分层设计适合 AI 决策树状态管理 |
| 资源流式加载 | stream.h 支持大世界按需加载，适合 AI 生成内容的动态加载场景 |
| 多版本兼容 | format.h 枚举系统处理多版本数据格式，可借鉴用于 AI 多版本内容兼容 |
