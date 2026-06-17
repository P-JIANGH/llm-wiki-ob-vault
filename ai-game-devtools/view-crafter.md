---
title: ViewCrafter
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, 3d, open-source, tool]
sources: [raw/articles/ai-game-devtools/view-crafter.md]
---

# ViewCrafter

**ViewCrafter: Taming Video Diffusion Models for High-fidelity Novel View Synthesis**

| Property | Value |
|----------|-------|
| Authors | Wangbo Yu, Jinbo Xing, Li Yuan, Wenbo Hu et al. |
| Publication | TPAMI 2025 |
| License | Research-use (check repository for details) |
| GitHub | https://github.com/Drexubery/ViewCrafter |
| arXiv | https://arxiv.org/abs/2409.02048 |
| Project Page | https://drexubery.github.io/ViewCrafter/ |
| HuggingFace | https://huggingface.co/spaces/Doubiiu/ViewCrafter |

## What It Is

ViewCrafter 是一个基于视频扩散模型的高保真新视角合成（Novel View Synthesis, NVS）工具。它能够从**单张或少量参考图像**生成高质量的新视角画面，支持精确的相机位姿控制。

## 核心能力

- **单视角 NVS**：从单张输入图像生成 25 帧新视角画面（576×1024）
- **稀疏视角 NVS**：支持多视角输入（如双视角），利用 `ViewCrafter_25_sparse` 模型
- **精确相机控制**：可指定目标视角的相机位姿
- **Zero-shot 泛化**：无需针对特定物体微调

## 可用模型

| 模型 | 分辨率 | 帧数 | 显存/推理时间 | 用途 |
|:---|:---|:---|:---|:---|
| ViewCrafter_25 | 576×1024 | 25 | 23.5GB / 120s | 单视角 NVS |
| ViewCrafter_25_sparse | 576×1024 | 25 | 23.5GB / 120s | 稀疏视角 NVS |
| ViewCrafter_16 | 576×1024 | 16 | 18.3GB / 75s | 消融实验 |
| ViewCrafter_25_512 | 320×512 | 25 | 13.8GB / 50s | 低分辨率实验 |

## 技术架构

基于视频扩散模型（Video Diffusion Model），将新视角合成视为视频生成任务：
- 以参考图像为条件，生成指定相机位姿的新视角序列
- 利用视频扩散模型的时间一致性先验来保证视角间的空间一致性
- 支持 DDIM 50 steps 采样，perframe_ae=True 降低显存占用

## 使用方式

- **CLI 推理**：下载 checkpoint 后运行 `inference.py`
- **Gradio 本地演示**：运行 `gradio_app.py`
- **Docker 部署**：`docker compose up`
- 支持 `--bg_trd` 参数控制点云清洁度（值越高越干净，但可能产生背景空洞）

## 注意事项

- **研究级工具**：非商业产品，结果可能存在随机性
- **PyTorch 版本**：PyTorch 2.4 可能触发 CUDA OOM（见 Issue #23）
- **失败缓解**：由于视频扩散模型的随机性，结果可能偶尔失败，建议尝试不同随机种子

## 与游戏开发的关联

ViewCrafter 可用于：
- 游戏资产多角度展示：从单张概念图生成多视角参考
- 3D 场景预览：快速生成不同相机角度的场景画面
- 与 [[threestudio]] 等 3D 重建工具链配合，作为新视角合成的前置步骤

## 与同类工具差异

- vs [[syncdreamer]]：SyncDreamer 生成 16 个离散视角的静态图像，ViewCrafter 生成连续视角变化的视频序列
- vs [[stable-video-diffusion]]：SVD/SV3D 侧重图像到视频的通用生成，ViewCrafter 专精于精确相机位姿控制的新视角合成
- vs zero123：ViewCrafter 利用视频扩散模型的时间一致性，生成的视角过渡更平滑

## 相关链接

- arXiv: https://arxiv.org/abs/2409.02048
- Project: https://drexubery.github.io/ViewCrafter/
- Demo: https://huggingface.co/spaces/Doubiiu/ViewCrafter
- YouTube: https://www.youtube.com/watch?v=WGIEmu9eXmU
- Checkpoints: https://huggingface.co/Drexubery/ViewCrafter_25
