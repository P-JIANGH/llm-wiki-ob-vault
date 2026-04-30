---
title: CharacterGen
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, python, avatar]
sources: [raw/articles/ai-game-devtools/character-gen.md]
---

# CharacterGen

> SIGGRAPH'24 (TOG) | Efficient 3D Character Generation from Single Images with Multi-View Pose Canonicalization

## 概述

**CharacterGen** 是一个高效的单图→3D角色生成管线，由 VAST-AI-Research 团队开发。核心创新在于**多视角姿态规范化（Multi-View Pose Canonicalization）**——先将输入人物图像统一到标准A-pose的多个视角图像，再从这些规范化多视角图像重建3D角色网格。

- **GitHub:** https://github.com/zjp-shadow/CharacterGen
- **项目页面:** https://charactergen.github.io/
- **Gradio 演示:** https://huggingface.co/spaces/VAST-AI/CharacterGen
- **论文:** SIGGRAPH'24 (ACM Transactions on Graphics)

## 技术架构

### 两阶段管线

| 阶段 | 功能 | 技术 |
|------|------|------|
| **2D Stage** | 单图→规范化多视角图像生成 | 基于 Tune-A-Video 改造的扩散模型，生成前/后/左/右等标准视角 |
| **3D Stage** | 多视角图像→3D角色网格 | 基于 TripoSR 的 3D 重建，输出带 UV 纹理的 OBJ 网格 |

### 姿态规范化

关键创新：将任意姿态的输入角色统一转换到标准 **A-pose**，消除了姿态变化对3D重建的干扰。这使得从单张任意姿势的角色照片都能生成一致的3D模型。

### 仓库结构

| 目录 | 用途 |
|------|------|
| `2D_Stage/` | 多视角图像生成管线 |
| `3D_Stage/` | 3D网格/角色重建 |
| `render_script/` | Blender + three-vrm 渲染工具 |
| `webui.py` | Gradio Web 界面 |
| `remap_mixamo.bmap` | Mixamo 骨骼映射配置 |

### 渲染工具

项目提供了两种 VRM→多视角渲染方案：
1. **Blender 方法** — 安装 Blender + VRM Addon，导出OBJ+FBX动画帧
2. **three-vrm 方法**（推荐）— 基于 Node.js 的自定义 three-vrm 渲染服务器，速度更快，端口17070

## 快速使用

```bash
# Python 3.9 环境
pip install -r requirements.txt
# 模型权重自动下载（也可通过 huggingface-cli 手动获取）
```

支持模块化执行：
- **完整管线：** 单图→3D角色（端到端）
- **仅2D阶段：** 生成规范化多视角图像
- **仅3D阶段：** 从已有视角图像重建3D

## 数据集

项目提及 **Anime3D 数据集**，但由于 VRM 格式的版权限制无法直接分发。需要按照 PAniC-3D 项目的说明自行获取原始VRM数据，再用项目提供的渲染脚本处理。

## 许可

学术论文代码，具体许可未在 README 中明确标注。

## 相关项目

- 基于 Tune-A-Video 和 TripoSR 构建（两项目尚未录入 wiki）
- 同一团队还开源了 UniRig 用于角色自动绑骨
- 与 [[meshanything]] 不同：MeshAnything 是点云/网格→简化网格的自回归生成，CharacterGen 是单图→完整3D角色
- 与 [[syncdreamer]] 类似的多视角生成思路，但 CharacterGen 专注于角色领域
- 与 [[crm]] 类似都是单图→3D生成，但 CRM 面向通用物体，CharacterGen 专注角色且包含2D姿态规范化阶段

## 游戏开发应用

- **NPC 快速原型：** 从概念图直接生成可使用的3D角色模型
- **角色定制系统：** 玩家上传自拍照生成游戏内角色
- **动漫角色生成：** 高质量 anime-style 角色生成，适合二次元游戏
- **配合 Mixamo 绑骨：** 提供 remap_mixamo.bmap 映射文件，可直接用于自动骨骼绑定
