---
title: MVDream
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [diffusion, 3d, multiview, image-generation, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/mvdream.md]
---

# MVDream

[ByteDance] 多视角扩散模型，从文本提示词生成 4 个一致视角的图像（4×256×256），为 SDS（Score Distillation Sampling）3D 生成提供多视角条件。论文发表于 arXiv:2308.16512。

## 概述

**MVDream** 将 Stable Diffusion 扩展为多视角联合生成的扩散模型。核心创新是在 SD 的 UNet 中引入相机位姿作为额外条件输入（16 维向量），使模型能够同时生成 4 个不同角度的一致图像。这些多视角图可直接用于 SDS 优化生成 3D 模型。

项目分为两个仓库：
- [bytedance/MVDream](https://github.com/bytedance/MVDream) — 扩散模型 + 2D 图像生成代码
- [bytedance/MVDream-threestudio](https://github.com/bytedance/MVDream-threestudio) — 基于 [[ai-game-devtools/threestudio]] 框架的 3D 生成管线

## 技术架构

| 组件 | 实现 |
|------|------|
| **基础模型** | Stable Diffusion 2.1 Base / 1.5 |
| **UNet 变体** | MultiViewUNetModel（增加 camera_dim=16 条件输入） |
| **文本编码器** | FrozenOpenCLIPEmbedder（context_dim=1024） |
| **VAE** | AutoencoderKL（4 通道潜空间，256 分辨率） |
| **视角数** | 4 个（elevation=15°，azimuth 0°/90°/180°/270°） |
| **输出分辨率** | 4×256×256（每张视角图 256×256） |
| **扩散步数** | 1000 timesteps，epsilon 预测 |
| **坐标系统** | OpenGL → Blender 转换 |
| **Python 模块** | mvdream.model_zoo（build_model 一行加载） |

## 核心模块

- **model_zoo.py**：预训练模型注册表，支持 `build_model("sd-v2.1-base-4view")` 一行加载，自动从 HuggingFace 下载权重
- **camera_utils.py**：相机位姿工具 — 球坐标转 4×4 相机矩阵、归一化、多视角批量生成
- **MultiViewUNetModel**：在 SD UNet 基础上增加相机位姿条件注入，通过 cross-attention 融合多视角信息

## 与同类工具对比

- vs [[ai-game-devtools/syncdreamer]]：SyncDreamer 使用 Volume Feature Field + CLIP 提取多视角一致性，MVDream 直接在扩散模型中注入相机位姿条件，二者都生成 4 视角一致图像
- vs [[ai-game-devtools/zero123]]：Zero123 基于单张输入图像生成新视角，MVDream 从纯文本生成多视角，输入模态不同
- vs [[ai-game-devtools/stable-diffusion]]：MVDream 是 SD 的多视角扩展版，保留 SD 的潜空间扩散架构但增加相机条件分支
- 与 [[ai-game-devtools/hunyuan3d-1]] 等后续 3D 生成模型相比，MVDream 是最早将多视角扩散应用于 3D 生成的工作之一

## 许可证

代码基于 Stable Diffusion 派生（遵循 SD 相应许可）；模型权重使用 OpenRAIL 许可。

## 相关链接

- [论文 (arXiv:2308.16512)](https://arxiv.org/abs/2308.16512)
- [项目主页](https://mv-dream.github.io/)
- [GitHub — 扩散模型代码](https://github.com/bytedance/MVDream)
- [GitHub — 3D 生成代码](https://github.com/bytedance/MVDream-threestudio)
- [HuggingFace 模型](https://huggingface.co/MVDream/MVDream/)
