---
title: InteX
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [texture, 3d, diffusion, image-generation, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/intex.md]
---

# InteX

[arXiv 2024] Interactive Text-to-Texture Synthesis via Unified Depth-aware Inpainting

## Overview

InteX 是一个交互式文本到纹理合成系统，通过统一深度感知修复技术为 3D 网格生成高质量纹理。基于 Stable Diffusion，支持法线/深度/ip2p 等多种控制模式，可将文本提示驱动的纹理从多个视角投影到网格的 UV 空间。

**GitHub:** [ashawkey/InTeX](https://github.com/ashawkey/InTeX)
**论文:** [arXiv:2403.11878](https://arxiv.org/abs/2403.11878)
**项目主页:** [me.kiui.moe/intex](https://me.kiui.moe/intex/)

## 核心功能

- **文本到纹理合成** — 输入文本提示，自动生成 3D 模型纹理
- **深度感知修复** — 根据视图余弦值判断生成/修复/保留区域，多视角融合
- **交互式编辑** — DearPyGui 本地 GUI + Gradio Web GUI，实时预览
- **多控制模式** — 法线图/深度图/ip2p/传统修复/深度感知修复
- **LCM 加速** — 支持 Latent Consistency Model，减少推理步数
- **纹理膨胀与去模糊** — 自动填充 UV 接缝，提升纹理质量
- **多风格预设** — ReVAnimated / Anything / 国风等配置

## 技术架构

| 组件 | 技术 |
|------|------|
| **渲染引擎** | nvdiffrast (NVIDIA 可微渲染) |
| **扩散模型** | Stable Diffusion (diffusers >= 0.23.1) |
| **加速** | LCM (Latent Consistency Model) |
| **GUI** | DearPyGui (本地) + Gradio (Web) |
| **UV 投影** | 自定义 grid_put (mipmap 线性/最近邻) |
| **3D 工具** | xatlas, plyfile, pygltflib, trimesh |
| **框架** | PyTorch + kiui |

### 生成管线
1. 加载输入网格（OBJ/GLB）
2. 沿预设相机路径遍历视角（前/侧/顶/底共 11 个关键视角）
3. 每个视角渲染深度/法线/可见性信息
4. 根据视图余弦值生成 generate/refine/keep 三元掩码
5. 使用对应控制模式调用 Stable Diffusion 生成纹理
6. 将生成的纹理投影到 UV 空间
7. 多视角融合后膨胀纹理、去模糊

## 许可证

未在仓库中明确声明。

## 与同类工具差异

| 维度 | InteX | [[ai-game-devtools/dreammat]] | [[ai-game-devtools/dream-textures]] |
|------|-------|------|------|
| **定位** | 交互式纹理合成 | PBR 材质生成 | Blender 贴图插件 |
| **控制方式** | 文本 + 深度/法线 | 文本 + 几何/光照 | 文本 + 图像 |
| **材质类型** | 标准纹理贴图 | PBR (Albedo+Normal+Roughness+Metallic) | 多种 SD 输出 |
| **交互性** | 实时 GUI | 离线生成 | Blender 内嵌 |
| **宿主环境** | 独立 Python | threestudio 框架 | Blender 插件 |

## 游戏开发应用

1. **NPC/怪物纹理** — 快速生成角色外观纹理
2. **道具纹理** — 为武器、建筑、载具等生成风格化纹理
3. **原型设计** — 文本提示快速迭代概念纹理
4. **交互式编辑** — 在 GUI 中调整视角、修改提示、实时查看效果

## 相关链接

- [[ai-game-devtools/dreammat]] — SIGGRAPH 2024 PBR 材质生成（几何/光照感知扩散模型）
- [[ai-game-devtools/dream-textures]] — Blender Stable Diffusion 纹理绘制集成
- [[ai-game-devtools/crm]] — 单图到 3D 纹理网格的两阶段扩散方法
- [[ai-game-devtools/syncdreamer]] — 多视角一致 3D 生成，可为纹理提供参考视图
