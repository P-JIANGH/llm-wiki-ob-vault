---
title: "0 A.D. Empires Ascendant"
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, historical, javascript, pyrogenesis]
sources: [https://github.com/0ad/0ad]
---

# 0 A.D. Empires Ascendant

> 历史古代战争开源 RTS 游戏，Wildfire Games 志愿者团队开发，自研 Pyrogenesis 3D 引擎驱动

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub (deprecated mirror) | https://github.com/0ad/0ad |
| 主仓库 | https://gitea.wildfiregames.com/0ad/0ad |
| 语言 | C++ (引擎) + JavaScript (游戏逻辑) |
| 构建系统 | Buildsystem (Windows MSVC/Linux GCC/macOS Clang) |
| 渲染/引擎 | Pyrogenesis 自研 3D 引擎，OpenGL + DirectX 双后端 |
| 许可 | GPLv2 (代码) + CC BY-SA 3.0 (美术资产) |
| 最新版本 | Release 28: Boiorix (首个非 Alpha 版本, 2026) |
| Stars/Forks | 49 stars / 87 forks (Gitea) |
| 开发者 | Wildfire Games (国际志愿者团队) |

## 核心架构

### Pyrogenesis 引擎架构

Pyrogenesis 将 RTS 引擎分为两大核心子系统，与通用 RTS 引擎设计一致：

**Simulation（模拟层）：**
- 路径搜索（pathfinder）
- 实体位置管理
- 范围查询（range queries）
- 与图形层通信（触发动画、根据位置查找高度等）
- 目录：`source/simulation2/`

**Graphics（渲染层）：**
- 3D 对象渲染
- 地形系统（方形瓦片网格 grid of square tiles）
- 水体渲染（单一平面）
- 粒子系统
- 32 位色 OpenGL/DirectX 双渲染器
- 目录：`source/graphics/`、`source/renderer/`

### 源码目录结构

```
source/
├── collada/        # COLLADA (dae) 模型/动画导入
├── graphics/       # 图形子系统
├── gui/            # 游戏内 UI 系统
├── i18n/           # 国际化/翻译
├── lib/            # 低级工具库（字符串、文件等）
├── lobby/          # 多人游戏大厅系统
├── maths/          # 数学工具（向量、矩阵等）
├── mocks/          # 单元测试 Mock
├── network/        # 网络多人同步
├── ps/             # Pyrogenesis 主应用层（GameSetup 等）
├── renderer/        # 3D 渲染引擎核心
├── rlinterface/    # 回放系统接口
├── scriptinterface/ # C++/JS 脚本绑定层
├── simulation2/    # 核心游戏模拟（实体系统、AI、战斗等）
├── soundmanager/    # 音频系统
├── third_party/     # 第三方库（嵌入式）
├── tools/           # 资源构建工具（音频/模型转换等）
└── main.cpp         # 程序入口
```

### 脚本系统

- **JavaScript**：游戏逻辑、事件、GUI 脚本均使用 JavaScript（SpiderMonkey 引擎）
- **ScriptInterface**：C++ ↔ JavaScript 双向绑定层，位于 `source/scriptinterface/`
- 游戏规则、数据文件均为 JavaScript 热加载，无需重新编译

### 资产管理

- **Actor 系统**：美术资产以 XML 文件定义（称为 "actors"），描述游戏中实体
- 支持多纹理变体和随机道具，支持程序化随机美术
- 模型格式：COLLADA (dae) → 转换为内部格式
- 音效、纹理、模型完全数据驱动

## 玩法特点

- **历史文明**：涵盖古希腊、罗马、波斯、埃及、迦太基、日耳曼等 20+ 古代文明
- **经济 + 军事**：资源采集、建筑建造、单位生产、战术战斗
- **单人战役 + 多人**：剧情战役 + TCP/IP 多人对战
- **地图编辑器**：内置 Atlas 地图编辑器（pyrogenesis -editor）
- **模组友好**：游戏规则 XML + JavaScript 完全开放，官方鼓励模组开发

## 发展历程

- **2001**：始于 Age of Empires II 模组 "Rome at War"
- **2008**：发布自研 Pyrogenesis 引擎并开源
- **2009**：正式开源发布源码（GPLv2），约 29,644 commits（GitHub mirror）
- **2024-08**：从 SVN 迁移到 Gitea (gitea.wildfiregames.com)
- **2026**：首个非 Alpha 版本 Release 28: Boiorix（正式脱离 Alpha 标签）

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **自研引擎路线** | Pyrogenesis 是完全自研的 RTS 引擎，证明了小团队可以开发专业级 3D 引擎 |
| **C++/JS 混合架构** | 用 C++ 处理性能关键路径，JavaScript 处理游戏逻辑和数据驱动，是平衡开发效率和运行性能的经典范例 |
| **脚本热重载** | ScriptInterface 实现了 C++/JS 无缝绑定，游戏逻辑修改无需重启，大幅提升开发迭代速度 |
| **数据驱动设计** | Actor XML、JavaScript 规则文件使游戏内容完全与引擎解耦，模组制作者无需懂 C++ |
| **模拟/渲染分离** | simulation2 和 renderer 分层设计，simulation 层专注确定性模拟，renderer 层专注视觉效果，便于测试和修改 |
| **路径搜索优化** | RTS 核心的 pathfinder 设计值得借鉴（simulation2 层） |
| **开放贡献模式** | 20+ 年持续开发的志愿者社区模式，多语言翻译、美术、编程分工协作 |

## 关键技术点

- **确定性模拟**：simulation2 层追求帧级别确定性，支持完美的多人网络同步回放
- **32 位色 3D 渲染**：Pyrogenesis 自研渲染器，支持 OpenGL 和 DirectX 双后端
- **Actor 实体系统**：类似组件实体系统（ECS）的设计，Actor 定义实体行为和数据
- **粒子系统**：丰富的视觉特效粒子系统
- **Terrain Grid**：方形瓦片网格地形（区别于多数 RTS 的六边形或四边形地形系统）
