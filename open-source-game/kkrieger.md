---
title: .kkrieger
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, fps, first-person-shooter, tool-chain]
sources: [https://github.com/farbrausch/fr_public]
---

# .kkrieger

> 96KB 演示大赛作品 `.kkrieger` 的源代码及 Farbrausch 工具链仓库（Werikkzeug3 分支）

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/farbrausch/fr_public |
| 子目录 | werkkzeug3_kkrieger/ |
| 语言 | C++（Visual C++，约 122K LOC .cpp+.hpp） |
| 构建系统 | Visual Studio 项目文件（.vcproj） |
| 许可 | BSD License（见 LICENSE.txt） |
| 发布 | 2012年4月（源码公开），更新至 2014年10月 |

## 背景

**.kkrieger** 是 Farbrausch 参加 Breakpoint、Revision 等演示大赛的 96KB 演示作品（demos）。

这个 GitHub 仓库是 **fr_public**，是 Farbrausch 2001-2011 年工具链的完整历史存档，
包含他们的核心 demo 制作工具 Werkkzeug3 的代码，以及 `.kkrieger` 的开发分支。

**重要澄清：** 此仓库**不是**原始 `.kkrieger` 可执行文件的源码——而是他们的
Werkkzeug3 编辑器/引擎的**分支版本**（2004年后分支），更适合编译和运行，
但与原始 96KB 发布的代码已不完全一致。

## 核心技术点

### Portal-Based 渲染架构
concept.txt 中详细记录了 Werkkzeug3 的渲染管线：

- **Portal/Segment 分层场景系统**：场景由 Portal 连接 Segment，每个 Segment 包含 Meshes 和 Lights
- **6-Pass 渲染管线**：Lightmap → Prebump → Light(Stencil Shadow) → Mul → Specular → Add → Extra
- **Flood-Fill 可见性算法**：每个 Portal 有"阻力值"1-10，控制递归深度
- **动态几何**：粒子系统、Finalizer 动态生成顶点

### 动画与操作符树
- **混合架构**：Execute Operator（每帧直接计算）+ Record Operator（Init 时记录）
- **操作符层次**：Texture → Material → Mesh → Scene → World
- **Instance 数据系统**：每个 Instance 有 4KB 私有缓冲区，操作符从中分配
- **64变量动画系统**：TIME/VELOCITY/SCALE/ROTATE/TRANSLATE + 自定义 CONST，支持 Spline 全局共享

### 游戏逻辑（KKriegerGame）
从 kkriegergame.hpp 分析得出：

- **碰撞系统**：KKriegerCell（Add/Sub/Zone 模式），支持动态 Cell 物理移动
- **粒子/约束系统**：MAXPARTICLE=0x4000, MAXCONSTRAINT=0x1000
- **怪物 AI**：KMS 状态机（SPAWNED→INRANGE→ACTIVE），支持近战/远程攻击
- **玩家物理**：行走/飞行模式，支持地面/空气阻尼、楼梯攀爬
- **武器系统**：8种武器（WEAPONKIND），4种弹药类型，支持连续射击标志

### 自定义 V2 音频合成器
- v2/ 目录包含 V2 合成器系统，用于 demo 中的所有音频
- 用于 kkrieger 和 debris 等作品的嵌入式合成器

### 数据包打包系统
- depacker.asm/cpp：运行时解压系统（支撑 96KB 容量的关键）
- packer.cpp/exepacker.cpp：打包工具
- data.asm：嵌入式数据包格式

## 目录结构（werkkzeug3_kkrieger/）

```
werkkzeug3_kkrieger/
├── app*.cpp/hpp          # 应用程序/编辑器窗口
├── engine.cpp/hpp        # 核心渲染引擎
├── kkriegergame.cpp/hpp  # 游戏逻辑（FPS 碰撞/AI/玩家）
├── gen*.cpp/hpp          # 几何/Mesh/Material 生成操作符
├── geneffect*.cpp/hpp    # 特效操作符（粒子/爆炸等）
├── depacker.cpp/asm      # 数据解压
├── mapfile.cpp/hpp       # 关卡文件格式
├── script.cpp/hpp        # 脚本系统
├── kdoc.cpp/hpp          # 文档生成
├── shadercompile*.cpp    # Shader 编译器
├── player_kkrieger/      # kkrieger 游戏播放器构建
├── player_intro/         # 演示 Intro 构建
├── player_demo/          # Demo 播放器构建
├── player_mobile/        # 移动版播放器（软渲染）
├── data/                 # 素材（.k/.v2m/.vfx）
└── concept.txt           # 德语渲染/动画系统设计文档（801行）
```

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 极致体积优化 | 96KB 容纳完整 FPS——程序化资源、数据压缩、引擎裁剪的综合极致 |
| Portal 渲染 | 无需现代 GPU 光照即可实现动态光源+阴影，适合中轻度 3D 游戏 |
| 数据驱动设计 | 操作符树+动画表达式系统，完全数据驱动，无需硬编码 |
| 自研工具链 | demo 文化催生完整自研编辑器+引擎+合成器，而非依赖第三方 |
| 多构建目标 | player_demo/intro/kkrieger/mobile 同一套代码，多目标输出 |

## 相关链接

- 原始 `.kkrieger` 演示视频：https://www.youtube.com/watch?v=txdZefKby08
- Farbrausch 官网：http://www.farbrausch.de/
- 96KB 演示大赛：http://www.pouet.net/prod.php?which=19470

