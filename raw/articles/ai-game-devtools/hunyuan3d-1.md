# Tencent Hunyuan3D-1.0: A Unified Framework for Text-to-3D and Image-to-3D Generation

**Source:** https://github.com/Tencent/Hunyuan3D-1
**Paper:** arXiv:2411.02293 (2024)
**Checkpoints:** https://huggingface.co/Tencent/Hunyuan3D-1

## Overview

Hunyuan3D-1.0 是腾讯混元团队开发的**统一文本到 3D 和图像到 3D 生成框架**，包含 lite 和 standard 两个版本。采用两阶段方法：(1) 多视角扩散模型在约 4 秒内生成多视角 RGB 图像；(2) 前馈重建模型在约 7 秒内从多视角图像重建 3D 资产。文本到图像阶段使用 Hunyuan-DiT，使框架同时支持文本和图像条件的 3D 生成。

## Key Facts

- **发布日期:** 2024 年 11 月
- **模型变体:** lite（轻量版）和 std（标准版，参数量是 lite 的 3 倍）
- **生成速度:** lite ~10 秒（单图→3D mesh），std ~25 秒
- **输入支持:** 文本提示（中英双语）或单张图像
- **输出格式:** 3D mesh（OBJ），支持顶点着色/纹理映射/GIF 渲染
- **预训练权重:** HuggingFace (lite/std/svrm 三模型)
- **Demo:** HuggingFace Space + 官方网站 https://3d.hunyuan.tencent.com

## Architecture

### Stage 1 — Multi-View Diffusion (MVD)
- 输入：单张图像（或从文本生成的图像）
- 输出：6 视角 RGB 图像（方位角：0°, 60°, 120°, 180°, 240°, 300°）
- 两个版本：hunyuan3d_mvd_lite_pipeline / hunyuan3d_mvd_std_pipeline
- 基于 diffusers 扩散模型架构
- ~4 秒生成

### Stage 2 — Sparse-View Reconstruction Model (SVRM)
- 输入：6 视角图像 + 条件图像
- 输出：3D mesh（带顶点着色或纹理映射）
- 架构：基于 LDM (Latent Diffusion Model) 的 svrm/ldm 模块
- 配置文件：svrm/configs/svrm.yaml
- ~7 秒重建

### Text-to-Image (可选)
- 使用 Hunyuan-DiT 将文本提示转为图像
- 支持中英文双语
- 权重：HunyuanDiT-v1.1-Diffusers-Distilled

### Text Baking (可选)
- 基于 DUSt3R 的纹理烘焙模块
- 将多视角图像映射到 mesh 表面
- CC BY-NC-SA 4.0 许可（不可商用）

### Pipeline (main.py)
1. Text2Image (文本→图像，可选)
2. Removebg (背景移除)
3. Image2Views (图像→多视角)
4. Views2Mesh (多视角→3D mesh)
5. MeshBaker (纹理烘焙，可选)
6. GifRenderer (GIF 渲染，可选)

## Resource Requirements

| 管线 | VRAM 需求 | 节省模式 |
|------|-----------|---------|
| Std 完整管线 | 30GB | 24GB (--save_memory) |
| Lite 完整管线 | 22GB | 18GB (--save_memory) |
| Lite 分离运行 (16G GPU) | 10-16GB | 逐模块加载 |

## Key Dependencies

- PyTorch + CUDA 12.1
- diffusers, transformers
- rembg (背景移除)
- pytorch3d (3D 操作)
- nvdiffrast (可微分渲染)
- DUSt3R (third_party, 纹理烘焙)
- trimesh, PyMCubes, xatlas, open3d (3D 处理)

## License

Open Source Model: Apache License Version 2.0
Hunyuan 3D 模型权重: TENCENT HUNYUAN NON-COMMERCIAL LICENSE AGREEMENT
DUSt3R 烘焙模块: CC BY-NC-SA 4.0 (不可商用)

## Links

- GitHub: https://github.com/Tencent/Hunyuan3D-1
- 论文: https://arxiv.org/pdf/2411.02293
- HuggingFace: https://huggingface.co/Tencent/Hunyuan3D-1
- Demo: https://huggingface.co/spaces/Tencent/Hunyuan3D-1
- 官网: https://3d.hunyuan.tencent.com
