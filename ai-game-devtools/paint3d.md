---
title: Paint3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, image-generation, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/paint3d.md]
---

# Paint3D

**Paint Anything 3D with Lighting-Less Texture Diffusion Models**

CVPR 2024 论文。由 OpenTexture 团队（Zeng et al.）开发的粗到细两阶段 3D 纹理生成框架，能够根据文本或图像提示为无纹理 3D 网格生成高分辨率（2K）、无光照嵌入的 UV 贴图。

## 核心架构

### 两阶段管线

**Stage 1 — 基于深度的纹理生成（`pipeline_paint3d_stage1.py`）：**
1. **初始视角生成**：从网格渲染深度图 → ControlNet (txt2img) 以深度为条件生成多视角图像
2. **正向纹理投影**：通过可微分渲染将生成图像反投影到网格 UV 空间（`forward_texturing`）
3. **视角修复**：对不完整区域使用深度感知 inpainting ControlNet 补全
4. 多视角组迭代优化

**Stage 2 — 基于 UV 的精细化（`pipeline_paint3d_stage2.py`）：**
1. **UV Inpainting**：自定义 UV 位置 ControlNet + inpainting 修复不完整区域、去除光照伪影
2. **UV Tile**：img2img ControlNet 双条件（UV 位置 + albedo）上采样至 2K 分辨率

### 关键模块

- `TexturedMeshModel` — 可微分网格渲染、UV 位置图渲染、纹理刷新
- `forward_texturing()` — 从多视角到 UV 的反投影
- `dr_eval()` — 可微分渲染评估
- 三个 ControlNet 封装器：txt2img / inpaint / img2img

## 技术特点

| 特性 | 说明 |
|------|------|
| 无光照纹理 | 生成纯 albedo 贴图，无嵌入光照信息，支持在游戏引擎中重新打光 |
| UV 位置 ControlNet | 使用 UV 坐标位置图作为条件的自定义 ControlNet（HuggingFace 权重可用） |
| 可微分渲染 | 使用 NVIDIA kaolin 进行网格渲染和纹理反投影 |
| 多条件支持 | 文本提示 + IP-Adapter 图像条件 |
| 分辨率 | 输出 2K UV 贴图 |
| 模型转换 | 支持 Civitai .safetensors 转 diffusers 格式 |

## 依赖

- PyTorch 1.12.1 + CUDA 11.6
- kaolin 0.13.0 (NVIDIA)
- Diffusers + ControlNet
- PyTorch3D

## 许可证

Apache 2.0

## 相关链接

- GitHub: https://github.com/OpenTexture/Paint3D
- 论文: https://arxiv.org/abs/2312.13913
- 项目页: https://paint3d.github.io/
- HuggingFace UV ControlNet: GeorgeQi/Paint3d_UVPos_Control
- ComfyUI 节点: [ComfyUI-Paint3D-Nodes](https://github.com/N3rd00d/ComfyUI-Paint3D-Nodes)

## 生态

- **MVPaint** (2024/11): Paint3D 后继项目，支持任意 UV 展开的多视角一致纹理
- **MeshXL** (NeurIPS 2024): 使用 Paint3D 生成网格纹理

## 与同类工具差异

相比 `ai-game-devtools/text2tex`（直接 SDS 优化纹理），Paint3D 采用可训练的控制网 + 两阶段粗到细策略，生成的纹理质量更高且无光照嵌入。相比 [[dreammat]]（PBR 材质生成），Paint3D 专注于 albedo 贴图生成，而非完整 PBR 材质套件。
