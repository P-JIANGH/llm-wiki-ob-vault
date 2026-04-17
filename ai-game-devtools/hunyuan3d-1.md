---
title: Hunyuan3D-1.0
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, ai-model, tool, open-source, diffusion, game-engine]
sources: [raw/articles/ai-game-devtools/hunyuan3d-1.md]
---

# Hunyuan3D-1.0

## Overview

**Hunyuan3D-1.0** — 腾讯混元团队的**统一文本到 3D 和图像到 3D 生成框架**（2024 年 11 月）。采用两阶段方法：多视角扩散（~4 秒）生成 6 个视角的 RGB 图像，前馈重建模型（~7 秒）将多视角图像还原为 3D 网格。提供 lite 和 standard 两个版本，均支持文本和图像条件输入。属于 AI 游戏开发工具中的 **3D 资产生成**工具链核心环节。

- GitHub: https://github.com/Tencent/Hunyuan3D-1
- 论文: arXiv:2411.02293 (2024)
- HuggingFace: https://huggingface.co/Tencent/Hunyuan3D-1
- Demo: https://huggingface.co/spaces/Tencent/Hunyuan3D-1

## 技术架构

### 两阶段管线

| 阶段 | 模块 | 输入 | 输出 | 耗时 |
|------|------|------|------|------|
| 0 | Text2Image（可选） | 文本提示 | 图像 | ~4 秒 |
| 1 | Removebg | RGB 图像 | 去背 PNG | 即时 |
| 2 | Image2Views | 单张去背图像 | 6 视角 RGB 网格图 | ~4 秒 |
| 3 | Views2Mesh | 6 视角图 + 条件图 | 3D mesh (OBJ) | ~7 秒 |
| 4 | MeshBaker（可选） | mesh + 多视角图 | 带纹理 mesh | 依赖对齐次数 |
| 5 | GifRenderer（可选） | mesh | GIF 动画 | 即时 |

### 核心模块

- **MVD (Multi-View Diffusion):** `mvd/hunyuan3d_mvd_lite_pipeline.py` / `hunyuan3d_mvd_std_pipeline.py` — 基于 diffusers 的多视角扩散模型
- **SVRM (Sparse-View Reconstruction):** `svrm/ldm/` — 基于 LDM 的前馈重建网络，从多视角图像恢复 3D 几何
- **Text2Image:** 集成 [[ai-game-devtools/hunyuan-dit]]（HunyuanDiT-v1.1-Diffusers-Distilled）
- **Baking:** 基于 [[ai-game-devtools/dust3r]] 的纹理烘焙（CC BY-NC-SA 4.0，不可商用）

### VRAM 需求

| 管线 | 标准 VRAM | 节省模式 (--save_memory) |
|------|-----------|------------------------|
| Std 完整 | 30GB | 24GB |
| Lite 完整 | 22GB | 18GB |
| Lite 分离（逐模块） | 10-16GB | - |

## 与同类工具的差异

| 工具 | 输入 | 输出 | 速度 | 特点 |
|------|------|------|------|------|
| **Hunyuan3D-1.0** | 文本/单图 | Mesh (OBJ) | 10-25 秒 | 两阶段统一框架，lite/std 双版本 |
| [[ai-game-devtools/hunyuan3d-2]] | 单图 | Mesh + PBR | ~10 秒 | 二代升级，PBR 材质，更高精度 |
| [[ai-game-devtools/crm]] | 单图 | 带纹理 OBJ | 10 秒 | 两阶段扩散 + FlexiCubes |
| [[ai-game-devtools/triposr]] | 单图 | Mesh (OBJ/GLB) | 0.5 秒 | 速度最快 |
| [[ai-game-devtools/wonder3d]] | 单图 | 带纹理 Mesh | 分钟级 | 单阶段，纹理不稳定 |
| [[ai-game-devtools/mvdream]] | 文本/单图 | 多视角图 | 秒级 | 仅多视角图 |

**优势:** 统一文本/图像双条件输入；腾讯生态整合（Hunyuan-DiT → Hunyuan3D）；开源权重；Gradio Web UI；支持中英双语文本提示。

## 游戏开发用途

1. **3D 资产快速原型:** 设计师用文本描述或上传概念图 → 10-25 秒生成 3D 模型 → 导入游戏引擎
2. **NPC/道具批量生成:** 文本提示批量生成 3D 资产，支撑游戏世界快速内容填充
3. **纹理映射与烘焙:** 可选的 DUSt3R 烘焙模块生成高质量纹理贴图
4. **可视化预览:** 内置 GIF 渲染器直接输出旋转预览动画

## 使用方式

```bash
# 文本 → 3D
python3 main.py --text_prompt "a lovely rabbit" \
    --save_folder ./outputs/test/ --max_faces_num 90000 \
    --do_texture_mapping --do_render

# 图像 → 3D
python3 main.py --image_prompt /path/to/image.png \
    --save_folder ./outputs/test/ --max_faces_num 90000 \
    --do_texture_mapping --do_render

# Gradio Web UI
python3 app.py          # std 版本
python3 app.py --use_lite  # lite 版本
```

## 许可

- 代码: Apache License Version 2.0
- 模型权重: TENCENT HUNYUAN NON-COMMERCIAL LICENSE
- 烘焙模块 (DUSt3R): CC BY-NC-SA 4.0（不可商用）

## 相关工具

- [[ai-game-devtools/hunyuan-dit]] — 文本到图像生成，Hunyuan3D-1 的 Stage 0 基础模型
- [[ai-game-devtools/dust3r]] — 免 COLMAP 3D 重建，Hunyuan3D-1 烘焙模块的依赖
- [[ai-game-devtools/hunyuanworld-1.0]] — 腾讯混元 3D 世界生成（全景图→分层3D mesh，可交互场景）
