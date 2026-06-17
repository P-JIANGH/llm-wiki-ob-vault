---
title: Hunyuan3D 2.0 — 腾讯混元高分辨率 3D 资产生成
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, image-generation, tool, open-source, diffusion]
sources:
  - raw/articles/ai-game-devtools/hunyuan3d-2-0.md
---

# Hunyuan3D 2.0

**腾讯混元**大规模 3D 资产生成系统，采用**两阶段生成管线**（几何形状 → 纹理合成），支持从单张图像或文本生成高分辨率 3D mesh。

## 核心架构

### 两阶段管线

1. **Hunyuan3D-DiT**（形状生成）：基于 Flow Matching 的扩散 Transformer，从条件图像创建 3D 几何形状。支持多种变体：
   - `v2-0`（1.1B 基础模型）
   - `v2-0-Fast`（guidance distillation，推理时间减半）
   - `v2-0-Turbo`（FlashVDM 加速）
   - `v2-mini`（0.6B 轻量版）
   - `v2-mv`（多视角输入）
   - `v2-1`（3.0B，最新一代）

2. **Hunyuan3D-Paint**（纹理合成）：利用几何先验和扩散先验生成高分辨率 PBR 纹理贴图，支持 AI 生成 mesh 和手工 mesh 的纹理化。

3. **Hunyuan3D-Studio**：面向专业人士的 3D 资产管理平台，支持操作、再创作和动画。

### 部署方式

- **Gradio App**：标准模式 / FlashVDM Turbo 加速模式
- **API Server**：REST API，支持 base64 图像输入 → GLB 输出
- **Blender Addon**：`blender_addon.py`，需本地 API 服务运行
- **ComfyUI 集成**：社区扩展 `ComfyUI-3D-Pack` / `ComfyUI-Hunyuan3DWrapper`
- **TensorRT 版本**：GPU 推理优化

## 技术特点

| 维度 | 详情 |
|------|------|
| 架构 | Flow Matching DiT + 扩散纹理模型 |
| 参数量 | 0.6B ~ 3.0B（不同变体） |
| VRAM 需求 | 6GB（仅形状）/ 16GB（形状+纹理） |
| 支持平台 | macOS / Windows / Linux |
| 语言 | Python 88.8%, C++ 8.1%, CUDA 1.4% |
| API 风格 | Diffusers-like (`from_pretrained`) |
| 输出格式 | GLB / OBJ（标准 3D 格式） |

## 性能

在 CMMD、FID_CLIP、FID、CLIP-score 四项基准评测中全面优于开源和闭源竞品：
- CMMD: 3.193（最优）
- FID_CLIP: 49.165（最优）
- CLIP-score: 0.809（最优）

## 发布里程碑

| 日期 | 事件 |
|------|------|
| 2025-01-21 | 初始发布：推理代码 + 预训练模型 |
| 2025-02-03 | DiT-v2-0-Fast（guidance distillation） |
| 2025-03-18 | 2mini (0.6B) + 2mv (多视角) |
| 2025-03-19 | Turbo 模型 + FlashVDM 加速 |
| 2025-04-01 | Paint-v2-0-Turbo + 多视角纹理 |
| 2025-06-13 | 2.1 全面开源（PBR 模型 + VAE 编码器 + 训练代码） |
| 2025-06-23 | 2.5 技术报告发布 |
| 2025-07-26 | HunyuanWorld-1.0 发布 |

## 相关链接

- GitHub: https://github.com/Tencent/Hunyuan3D-2
- HuggingFace: tencent/Hunyuan3D-2
- 官方 Web Demo: https://3d.hunyuan.tencent.com/

## 与同类工具的差异

相比 [[hunyuan3d-1]]，2.0 版本升级为两阶段 DiT 架构，支持更高的分辨率和更精细的纹理生成。与 [[direct3d-s2]] 相比，Hunyuan3D 2.0 更侧重从图像到 3D 的端到端生成而非 SDF 网格的 DiT 加速。作为腾讯混元 3D 家族的一部分，与 [[hunyuanworld-1.0]]（3D 世界生成）形成互补——一个生成单个 3D 资产，一个生成完整 3D 场景。
