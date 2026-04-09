---
title: Open Golf
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, sport, minigolf, cross-platform]
sources: []
---

# Open Golf

> A cross-platform minigolf game written in C, featuring custom physics, baked lightmaps, and an in-game level editor.

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/mgerdes/Open-Golf |
| 语言 | C |
| 构建系统 | CMake 3.12+ |
| 渲染/引擎 | Sokol (GLCore33/GLES3) + 自定义光照系统 |
| 许可 | MIT |
| 平台 | Windows, Linux, macOS, Android, iOS, Web (Emscripten) |
| 最新更新 | 2022 |

## 核心技术点

### 物理系统
- **自定义碰撞检测**：BVH (Bounding Volume Hierarchy) 碰撞加速结构（bvh.c）
- **碰撞响应**：自研物理代码处理高尔夫球与地形的碰撞检测和响应
- 定点数处理确保跨平台一致性

### 渲染架构
- **Sokol 库**：跨平台 3D 图形和音频抽象层（sokol_gl.h 等）
- **光照贴图 (Lightmap)**：使用 [lightmapper](https://github.com/ands/lightmapper) 库生成地形光照贴图
- **UV 映射**：使用 [xatlas](https://github.com/jpcy/xatlas) 生成光照贴图 UV
- **动态物体光照插值**：支持多个采样点之间插值生成动态物体光照贴图
- **Global Illumination**：gi.c 实现简单 GI 效果

### 编辑器
- **内置编辑器**：游戏内置编辑器可修改球场地形并快速测试反馈
- **脚本驱动生成**：编辑器可运行脚本生成复杂模型顶点和面片
- **ImGui**：所有工具使用 ImGui 实现

### 第三方库
- **cembed** — C 资源嵌入
- **cimgui / imgui** — UI 系统
- **fast_obj** — OBJ 模型快速加载
- **glfw** — 窗口/输入
- **glslcc** — GLSL 编译器
- **miniz** — ZIP 压缩
- **parson** — JSON 解析
- **stb** — 通用工具库（stb_image 等）
- **mattiasgustavsson/libs** — 工具库集合

## 玩法特点

- **迷你高尔夫**：完整球场体验，支持多关卡
- **关卡编辑器**：内置编辑器允许玩家创建和修改球场地形
- **脚本化地形生成**：支持运行脚本程序化生成复杂地形
- **多平台支持**：覆盖桌面、移动端和 Web 平台

## 项目结构

```
src/
├── common/        # 共享引擎代码 (~15K LOC)
│   ├── audio.c/h   # 音频系统
│   ├── bvh.c/h     # BVH 碰撞加速结构
│   ├── data.c/h    # 数据加载
│   ├── file.c/h    # 文件系统抽象
│   ├── graphics.c/h # 图形渲染
│   ├── inputs.c/h  # 输入处理
│   └── debug_console.c/h # 调试控制台
├── golf/          # 游戏逻辑 (~3K LOC)
│   ├── game.c      # 游戏状态机 (1042 行)
│   ├── draw.c/h   # 渲染绘制
│   ├── ui.c       # UI 系统 (1318 行)
│   ├── golf.c/h   # 高尔夫球逻辑
│   └── main.c     # 入口
└── editor/        # 关卡编辑器
    ├── editor.c   # 编辑器主逻辑
    ├── gizmo.c/h  # 变换控件
    └── gi.c/h     # GI 计算

data/
├── audio/         # 音频资源
├── levels/       # 关卡数据
├── models/       # 3D 模型
├── shaders/      # GLSL 着色器
├── scripts/      # 地形生成脚本
├── textures/     # 纹理
└── static_data.static_data  # 静态数据
```

## 构建方式

```bash
# Linux
./build/build-linux.sh

# Windows
build\build-win64.bat

# 输出
out/linux/golf      # Linux
out/win64/golf.exe  # Windows
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 跨平台渲染 | Sokol 库作为轻量级跨平台 3D 方案，适合小型项目 |
| 物理系统 | 自研 BVH 碰撞系统，适合需要精确碰撞检测的游戏 |
| 光照贴图 | xatlas + lightmapper 管线可借鉴用于场景美术烘焙 |
| 编辑器开发 | ImGui 内置编辑器模式，脚本驱动地形生成是高效内容创作方案 |
| 资源嵌入 | cembed 将资源编译进二进制，简化发布和分发 |
| Web 移植 | Emscripten + WebGL2 支持，无缝 Web 化路径 |
