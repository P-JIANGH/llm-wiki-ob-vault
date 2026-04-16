---
title: HunyuanWorld 1.0
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, tool, game-engine, 3d-generation, world-model, open-source]
sources: [raw/articles/ai-game-devtools/hunyuanworld-1.0.md]
---

# HunyuanWorld 1.0

腾讯混元团队（Tencent Hunyuan）开源的**沉浸式 3D 世界生成模型**（2025-07-26），基于全景图代理 + 语义分层 + 分层 3D 重建，从文本或图像生成可探索、可交互的 360° 3D 世界。

## Overview

HunyuanWorld 1.0 是首个**开源可仿真、可沉浸、可交互的 3D 世界生成模型**，填补了视频类方法（缺 3D 一致性）和 3DGS/NeRF 方法（训练数据少、内存低效）之间的空白。

核心三优势：
1. **360° 沉浸体验**：全景世界代理
2. **Mesh 导出**：兼容现有 CG 管线（Draco 压缩的 .obj/.glb）
3. **解耦物体表示**：增强交互性

## Architecture

**两阶段流水线：**

### Stage 1 — Panorama Generator (PanoDiT)
基于 Flux 架构的扩散模型，生成 3840×1920 全景图：
- `HunyuanWorld-PanoDiT-Text`：文本 → 全景
- `HunyuanWorld-PanoDiT-Image`：图像 → 全景
- `HunyuanWorld-PanoInpaint-Scene` / `-Sky`：场景/天空修复

### Stage 2 — WorldComposer
将全景图分解为分层 3D mesh：
1. **语义分层**：通过 GroundingDINO + ZIM 分割前景物体（最多 2 层 fg1/fg2）+ 天空层
2. **深度估计**：Omnidata 深度模型
3. **自适应深度压缩**：indoor/outdoor 场景自适应压缩前景/背景深度范围
4. **Sheet Warping**：将深度图 warping 为分层 mesh（背景 + 前景 + 天空）
5. **Mesh 导出**：Draco 压缩，支持 Open3D / 游戏引擎导入

关键依赖：`diffusers` (FluxPipeline)、Open3D、Real-ESRGAN、ZIM、GroundingDINO、MoGe

## Performance

全面超越所有开源基线（BRISQUE/NIQE/Q-Align/CLIP-T/CLIP-I 五项指标 SOTA）：

| 任务 | BRISQUE (↓) | NIQE (↓) | Q-Align (↑) | CLIP-T/I (↑) |
|------|-------------|----------|-------------|---------------|
| Text→Pano | **40.8** | **5.8** | **4.4** | **24.3** |
| Image→Pano | **45.2** | **5.8** | **4.3** | **85.1** |
| Text→World | **34.6** | **4.3** | **4.2** | **24.0** |
| Image→World | **36.2** | **4.6** | **3.9** | **84.5** |

## Usage

```bash
# Stage 1: 生成全景图
python3 demo_panogen.py --prompt "冰川崩塌..." --output_path test_results/case7
python3 demo_panogen.py --image_path examples/case2/input.png --output_path test_results/case2

# Stage 2: 从全景图合成 3D 世界
python3 demo_scenegen.py --image_path test_results/case7/panorama.png \
  --classes outdoor --labels_fg1 sculptures --labels_fg2 trees \
  --output_path test_results/case7

# 加速：FP8 量化 / KV Cache（支持消费级 GPU 4090）
python3 demo_panogen.py --prompt "..." --fp8_gemm --fp8_attention --cache
```

ModelViewer (`modelviewer.html`)：浏览器内实时预览生成的 3D 世界。

## HunyuanWorld 家族

| 项目 | 日期 | 说明 |
|------|------|------|
| [[ai-game-devtools/hunyuanworld-1.0]] | 2025-07 | 首个开源可交互 3D 世界生成（本页） |
| [HunyuanWorld-1.0-lite](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0) | 2025-08 | 量化版，消费级 GPU 4090 可跑 |
| [HunyuanWorld-Voyager](https://github.com/Tencent-Hunyuan/HunyuanWorld-Voyager/) | 2025-09 | RGB-D 视频扩散，3D 一致性探索 + 快速重建 |
| [FlashWorld](https://github.com/imlixinyang/FlashWorld) | 2025-10 | 单 GPU 5-10 秒完成 3DGS 世界生成 |
| [HunyuanWorld-1.1 (WorldMirror)](https://github.com/Tencent-Hunyuan/HunyuanWorld-Mirror) | 2025-10 | 视频/多视图图像 → 3D 世界 |
| [HunyuanWorld-1.5 (WorldPlay)](https://github.com/Tencent-Hunyuan/HY-WorldPlay) | 2025-12 | 实时世界创建与游玩 |
| [HY-World-2.0](https://github.com/Tencent-Hunyuan/HY-World-2.0) | 2026-04 | SOTA 3D 世界模型 |

## 许可证

Apache 2.0（代码），模型权重有独立许可证（需申请）

## 相关链接

- [ArXiv 2507.21809](https://arxiv.org/abs/2507.21809)
- [HuggingFace Models](https://huggingface.co/tencent/HunyuanWorld-1)
- [Official Site](https://3d.hunyuan.tencent.com/sceneTo3D)
- 联系：tengfeiwang12@gmail.com

## 对比同类工具

| 维度 | [[ai-game-devtools/gamegen-o]] | [[ai-game-devtools/hunyuanworld-1.0]] | [[ai-game-devtools/hunyuan-gamecraft]] |
|------|---------|--------------------|--------------------|
| 输入 | 文本/操作信号/视频 | 文本/图像 | 参考图+文本+键鼠动作 |
| 输出 | 游戏视频 | 可交互 3D 世界（mesh） | 游戏视频 |
| 核心方法 | Transformer 视频生成 | 全景扩散 + Mesh 分层 | 混合条件 + 蒸馏 |
| 交互性 | 无 | 可导出 mesh 交互 | 无 |
| 适用场景 | 视频生成 | VR/游戏/仿真 | 游戏视频创作 |
