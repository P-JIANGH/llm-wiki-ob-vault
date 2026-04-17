---
title: Infinigen
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, ai, procedural-generation]
sources: [raw/articles/ai-game-devtools/infinigen.md]
---

# Infinigen

**Infinigen: Infinite Photorealistic Worlds Using Procedural Generation** — Princeton Vision & Learning Lab (Jia Deng 团队) 开发的开源程序化 3D 世界生成系统，基于 Blender Python API。

## 概述

Infinigen 使用程序化生成技术创建无限的逼真 3D 场景，专为计算机视觉训练数据合成而设计。已发表三篇 CVPR 论文（2023 自然场景、2024 室内场景、2025 可关节资产），覆盖户外自然、室内房间和可交互物体三大生成领域。

官网：[infinigen.org](https://infinigen.org) | 论文：[CVPR 2023](https://arxiv.org/pdf/2306.09310) / [CVPR 2024](https://arxiv.org/abs/2406.11824) / [2025](https://arxiv.org/abs/2505.10755)

## 技术架构

- **后端:** Blender 4.2.0（bpy Python API），运行在 Blender 内嵌 Python 环境中
- **语言:** Python 3.11（严格锁定版本）
- **配置:** gin-config 声明式配置系统
- **任务管理:** submitit（支持 SLURM 集群调度）
- **构建:** setuptools + Cython（terrain 模块含 C++ 编译组件）
- **核心依赖:** numpy, opencv, scipy, scikit-image, trimesh, shapely, pandas

## 三大生成模块

| 模块 | 能力 | 论文 |
|------|------|------|
| Infinigen-Nature | 地形、植被、岩石、水体、云层、生物 | CVPR 2023 |
| Infinigen-Indoors | 房间布局、家具、材质、光照 | CVPR 2024 |
| Infinigen-Articulated | 带关节的模拟就绪资产（门、抽屉等） | 2025 |

## 输出格式

- 逼真渲染图（PNG / EXR）
- 深度图、法线图、光流
- 实例/语义分割掩码
- 3D 网格（OBJ、OpenUSD）
- 物理模拟导出（MuJoCo、USD）

## 许可证

BSD-3-Clause

## 代码结构

```
infinigen/
├── core/          # 核心工具：世界生成、相机配置、标注系统
├── assets/        # 程序化资产生成器：地形、生物、植物、岩石等
├── datagen/       # 数据生成管线：任务管理、Ground Truth 标注
├── terrain/       # 地形生成（含 C++ 编译的 SoilMachine）
├── tools/         # 工具：任务管理、配置、资产浏览
└── infinigen_gpl/ # GPL 许可代码（与 BSD-3 核心分离）
```

## 与同类工具的差异

- 与 [[ai-game-devtools/dreamgaussian4d]]、[[ai-game-devtools/hunyuan3d-2-1]] 等 AI 生成工具不同，Infinigen 不使用扩散模型或神经网络，而是纯程序化生成（procedural generation），通过随机种子保证无限多样性
- 与 [[ai-game-devtools/dust3r]] 等 3D 重建工具互补：Infinigen 生成数据，DUSt3R 消费数据做重建
- 深度集成 Blender 生态系统，支持 [[ai-game-devtools/blender-mcp]] 等 AI-Blender 桥接工具进行二次开发
- 提供完整的 Ground Truth 标注管线（分割掩码、深度、法线），这是大多数 3D 生成工具缺少的
- 支持 SLURM 集群级并行生成，适合大规模合成数据生产

## 相关链接

- GitHub: https://github.com/princeton-vl/infinigen
- 官网: https://infinigen.org
- 项目路线图: https://infinigen.org/roadmap
- 介绍视频: https://www.youtube.com/watch?v=6tgspeI-GHY
