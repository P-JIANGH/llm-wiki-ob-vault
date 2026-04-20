---
title: Video2Game
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [game, 3d, nerf, mesh, open-source, tool]
sources: [raw/articles/ai-game-devtools/video2game.md]
---

# Video2Game

**Video2Game** 是一个将**单个视频**转换为**实时、可交互、逼真的浏览器兼容 3D 环境**的完整管线工具。通过 NeRF 训练 → 网格提取 → 纹理烘焙 → 碰撞体生成 → 游戏引擎集成的流程，实现从视频到可玩游戏场景的端到端转换。

## 核心功能

- **视频到 3D 场景转换**：输入单个视频，输出可交互的 3D 环境
- **NeRF 场景重建**：基于 COLMAP 结构的多视图几何重建
- **网格提取与纹理烘焙**：从隐式 NeRF 表示提取显式网格并烘焙纹理
- **碰撞体自动生成**：V-HACD 凸分解 + Bounding-mesh 包围体生成
- **双引擎集成**：Three.js（浏览器端）和 Unreal Engine（物理模拟推荐）

## 技术架构

**完整管线（6 步）：**

1. **先验生成** — Omnidata 模型生成深度/法线先验，可选语义/实例分割掩码
2. **NeRF 训练** — 基于 tiny-cuda-nn 的加速神经辐射场训练
3. **网格提取** — 从 NeRF 隐式场提取显式三角网格，bbox.json 定义边界
4. **纹理烘焙预训练** — baking_pretrain.py + export 自动补全子部分纹理
5. **碰撞模型生成** — V-HACD 凸分解生成物理引擎可用的碰撞体
6. **游戏引擎集成** — Three.js + Cannon.js（浏览器）或 Unreal Engine（推荐）

**技术栈：**

- Python 3.7, PyTorch 1.12.0 + CUDA 11.6
- tiny-cuda-nn（需 TCNN_HALF_PRECISION 补丁）
- PyMesh2, nvdiffrast, torch-scatter
- Three.js / Cannon.js（前端交互）

## 许可证

学术开源，仅限非商业用途。

## 相关链接

- GitHub: https://github.com/video2game/video2game
- 项目主页: https://video2game.github.io/
- Gardenvase 演示: https://video2game.github.io/src/garden/index.html

## 相关项目

[[gamegen-o]] · [[genesis]] · [[hunyuanworld-1.0]] · `gaussian-dreamer`
