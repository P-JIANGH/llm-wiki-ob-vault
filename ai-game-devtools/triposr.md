---
title: TripoSR — 快速单图 3D 重建模型
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, ai, vision]
sources:
  - raw/articles/ai-game-devtools/triposr.md
---

# TripoSR

由 **Tripo AI** 和 **Stability AI** 联合开发的开源模型，用于从**单张图像**进行**快速**前馈 3D 重建。基于 Large Reconstruction Model (LRM) 架构，能在 NVIDIA A100 GPU 上 **< 0.5 秒**内生成高质量 3D 模型。

论文：[TripoSR: Fast 3D Object Reconstruction from a Single Image](https://arxiv.org/abs/2403.02151)

## 核心架构

TripoSR 采用模块化 LRM 管线：

| 阶段 | 组件 | 功能 |
|------|------|------|
| 编码 | Image Tokenizer | 基于 DINOv2 将输入图像编码为 token 序列 |
| 初始化 | Scene Tokenizer | 初始化 triplane 3D 场景表示 |
| 融合 | Transformer Backbone | 将图像 token 融合到场景 token |
| 解码 | Decoder | 从 triplane 解码几何密度和颜色 |
| 渲染 | NeRF Renderer | 体渲染多视角图像 |
| 提取 | Marching Cubes | 等值面提取生成 mesh (torchmcubes) |

## 技术特点

| 维度 | 详情 |
|------|------|
| 架构 | LRM + Triplane + NeRF 体渲染 |
| 骨干网络 | 自定义 Transformer (attention + basic block) |
| 图像编码器 | DINOv2 |
| 推理速度 | < 0.5 秒 (A100 GPU) |
| VRAM 需求 | ~6GB (单图输入) |
| 输出格式 | OBJ / GLB (顶点色或纹理贴图) |
| 纹理烘焙 | xatlas UV 展开 + 2048px 纹理 |
| 许可证 | MIT |
| 预训练权重 | HuggingFace (stabilityai/TripoSR) |

## 使用方式

- **CLI**: `python run.py image.png --output-dir output/`
- **Gradio**: `python gradio_app.py` 启动本地交互界面
- **Python API**: `TSR.from_pretrained("stabilityai/TripoSR")` 加载模型后推理
- **Marching Cubes 分辨率**: 默认 256，可通过 `--mc-resolution` 调整

## 相关链接

- GitHub: https://github.com/VAST-AI-Research/TripoSR
- HuggingFace Demo: https://huggingface.co/spaces/stabilityai/TripoSR
- Tripo AI: https://www.tripo3d.ai/

## 与同类工具的差异

与 [[ai-game-devtools/stable-dreamfusion]] 相比，TripoSR 采用**前馈重建**而非 SDS 优化——无需逐实例优化，推理速度快几个数量级（0.5秒 vs 数分钟）。与 [[ai-game-devtools/shap-e]] 相比，TripoSR 专注于**图像到 3D**（而非文本到 3D），并且使用 triplane 表示而非神经辐射场的隐式函数，生成的 mesh 质量更高、几何细节更丰富。作为 LRM 家族的代表，与 [[ai-game-devtools/hunyuan3d-2-0]] 的两阶段 DiT 架构形成对比——TripoSR 是单阶段前馈模型，更轻量但功能更聚焦。
