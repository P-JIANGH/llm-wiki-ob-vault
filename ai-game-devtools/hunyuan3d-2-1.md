---
title: Hunyuan3D 2.1 — 高保真 PBR 3D 资产生成
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, diffusion, pbr]
sources:
  - raw/articles/ai-game-devtools/hunyuan3d-2-1.md
---

# Hunyuan3D 2.1

**腾讯混元**第三代 3D 资产生成系统（2025-06-14），首次**完全开源模型权重 + 训练代码**，引入**PBR（Physically-Based Rendering）纹理合成管线**，从单张图像生成带物理材质的高保真 3D 资产。

## 核心创新

| 创新点 | 说明 |
|--------|------|
| **完全开源** | 首次开放完整模型权重 + 训练代码，支持社区微调和下游扩展 |
| **PBR 纹理管线** | 取代传统 RGB 纹理，引入物理级材质模拟（金属反射、次表面散射） |
| **两阶段可扩展架构** | `Image → 3D Shape`（Hunyuan3D-Shape-2.1）→ `PBR Texture`（Hunyuan3D-Paint-2.1） |

## Model Zoo

| 模型 | 任务 | 参数量 | VRAM 需求 | 发布日期 |
|------|------|--------|-----------|----------|
| Hunyuan3D-Shape-v2-1 | Image → Shape | 3.3B | 10 GB | 2025-06-14 |
| Hunyuan3D-Paint-v2-1 | PBR 纹理合成 | 2B | 21 GB | 2025-06-14 |
| **组合管线** | Image → Shape → PBR | - | 29 GB | - |

## 性能基准

### 形状生成（越高越好）
| 模型 | ULIP-T | ULIP-I | Uni3D-T | Uni3D-I |
|------|--------|--------|---------|---------|
| TripoSG | 0.0767 | 0.1225 | 0.2506 | 0.3129 |
| Trellis | 0.0769 | 0.1267 | 0.2496 | 0.3116 |
| **Hunyuan3D-Shape-2.1** | **0.0774** | **0.1395** | **0.2556** | **0.3213** |

### 纹理生成（FiD/CMMD/LPIPS 越低越好，CLIP-I 越高越好）
| 模型 | CLIP-FiD ⬇ | CMMD ⬇ | CLIP-I ⬆ | LPIPS ⬇ |
|------|------------|--------|----------|---------|
| SyncMVD-IPA | 28.39 | 2.397 | 0.8823 | 0.1423 |
| Hunyuan3D-2.0 | 26.44 | 2.318 | 0.8893 | 0.1261 |
| **Hunyuan3D-Paint-2.1** | **24.78** | **2.191** | **0.9207** | **0.1211** |

## 技术架构

### 仓库结构
| 目录/文件 | 用途 |
|-----------|------|
| `hy3dshape/` | 形状生成模型代码与配置 |
| `hy3dpaint/` | PBR 纹理合成模型代码与配置 |
| `docker/` | 容器化部署 |
| `api_server.py` / `api_models.py` | REST API 实现 |
| `gradio_app.py` / `demo.py` | Gradio Web UI + 使用示例 |
| `test_api.ipynb` | API 测试 Notebook |

### 部署方式
- **Programmatic API:** Diffusers 风格 Python API
- **Gradio Web UI:** `gradio_app.py` 本地交互式界面
- **REST API Server:** `api_server.py` + `model_worker.py` 生产部署

### 环境要求
- Python 3.10 | PyTorch 2.5.1+cu124
- 支持 macOS / Windows / Linux
- `pip install -r requirements.txt`

## 与同类工具的差异

| 维度 | [[hunyuan3d-1]] | [[hunyuan3d-2-0]] | **Hunyuan3D-2.1** |
|------|------|------|------|
| 纹理类型 | RGB | 基础 PBR | **完整 PBR（金属/次表面散射）** |
| 训练代码 | ❌ 未开源 | ❌ 未开源 | ✅ **完全开源** |
| Shape 模型 | MVD + SVRM | DiT (1.1B) | **DiT (3.3B)** |
| Paint 模型 | 无独立 | 有 | **PBR 专用模型 (2B)** |
| VRAM（组合） | 30GB | 16GB | 29GB |
| 开源范围 | 推理权重 | 推理权重 | **权重 + 训练代码** |

2.1 版本相比 2.0 的关键升级：
1. **Shape 模型从 1.1B 扩展到 3.3B**，ULIP/Uni3D 四项基准全部 SOTA
2. **Paint 引入 PBR 管线**，CLIP-I 从 0.889 提升到 0.921，LPIPS 从 0.126 降低到 0.121
3. **训练代码首次开源**，2.0 仅开放推理权重

## 游戏开发用途

1. **PBR 材质 3D 资产生成:** 直接从概念图生成带物理材质的模型，可导入 Unity/Unreal 等引擎
2. **高精度道具建模:** 3.3B Shape 模型提供更精细的几何细节
3. **社区微调:** 训练代码开源，可针对特定游戏风格（如低多边形、像素风）微调模型
4. **生产管线集成:** REST API 支持批量生成，适合内容生产管线

## 相关链接

- GitHub: https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1
- HuggingFace: https://huggingface.co/tencent/Hunyuan3D-2.1
- arXiv: https://arxiv.org
- Discord: https://discord.gg/dNBrdrGGMa

## 许可

- 代码 & 模型权重: 完全开源（社区可微调）
- 依赖: TripoSG, Trellis, DINOv2, Stable Diffusion, FLUX, diffusers, Hunyuan-DiT 等

## 相关工具

- [[hunyuan3d-1]] — Hunyuan3D 第一代，两阶段 MVD+SVRM 架构
- [[hunyuan3d-2-0]] — Hunyuan3D 第二代，DiT 架构，PBR 基础支持
- [[triposr]] — TripoSG，Hunyuan3D-2.1 形状生成的对比基线之一
- [[hunyuanworld-1.0]] — 腾讯混元 3D 世界生成（完整场景级生成）
