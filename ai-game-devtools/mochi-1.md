---
title: Mochi 1
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, image-generation]
sources: [raw/articles/ai-game-devtools/mochi-1.md]
---

# Mochi 1

Genmo 开源的 10B 参数文本到视频扩散模型，采用自研 Asymmetric Diffusion Transformer (AsymmDiT) 架构，是当时最大的开源视频生成模型。

## 概述

Mochi 1 preview 由 Genmo（genmo.ai）发布，Apache 2.0 许可。在视频保真度和提示词遵循度上显著缩小了闭源与开源视频生成模型的差距。默认输出 480p 视频。

## 核心架构

### AsymmDiT（非对称扩散 Transformer）
| 参数 | 值 |
|:--|:--|
| 总参数量 | 10B |
| 层数 | 48 |
| 注意力头数 | 24 |
| 视觉维度 | 3072（~4x 文本维度）|
| 文本维度 | 1536 |
| 视觉 Token | 44,520 |
| 文本 Token | 256 (T5-XXL) |

**非对称设计要点：**
- 视觉流参数量约为文本流的 4 倍，将更多网络容量集中在视觉推理
- 非方形 QKV 投影矩阵统一多模态自注意力
- 各模态使用独立的 MLP 层（类似 SD3 但维度不对称）
- 相比对称设计降低推理显存需求

### AsymmVAE（视频变分自编码器）
| 参数 | 值 |
|:--|:--|
| 参数量 | 362M |
| 编码器基通道 | 64 |
| 解码器基通道 | 128 |
| 潜空间维度 | 12 通道 |
| 空间压缩 | 8x8 |
| 时间压缩 | 6x |

非对称编码器-解码器结构，将视频因果压缩至原大小 1/128。

### 文本编码
- 单一 T5-XXL (`google/t5-v1_1-xxl`) 编码器，最大 256 token
- 不同于许多使用多个 LLM 的现代扩散模型

## 推理与部署

### 显存需求
- **单 GPU：** ~60GB VRAM（推荐 H100）
- **ComfyUI 优化：** <20GB VRAM（通过 ComfyUI-MochiWrapper）
- **多 GPU：** 支持 FSDP Context Parallel 切分模型

### 接口
- **CLI：** `python demos/cli.py --model_dir weights/ --cpu_offload`
- **Gradio UI：** `python demos/gradio_ui.py --model_dir weights/ --cpu_offload`
- **Python API：** `MochiSingleGPUPipeline` / `MochiMultiGPUPipeline`
- **ComfyUI：** ComfyUI-MochiWrapper（第三方节点）
- **LoRA 微调：** `--lora_path` 参数加载 safetensors 格式 LoRA

### 推理特性
- **Sigma 调度：** 线性二次混合调度 (`linear_quadratic_schedule`)
- **CFG 调度：** 每步可配置
- **解码模式：** `tiled_spatial`（空间分块）/ `tiled_full`（全图分块）
- **注意力后端：** Flash Attention / SDPA / Sage Attention

## LoRA 微调

内置 LoRA 训练器，支持自定义视频数据集微调：
- 单张 H100 或 A100 80GB GPU 即可训练
- safetensors 格式输出
- 可直接通过 `--lora_path` 加载到推理管线

## 已知限制

- 预览版仅支持 480p 输出
- 极端运动场景可能出现轻微扭曲
- 针对写实风格优化，动漫/动画风格表现不佳
- 研究预览阶段，持续演进中

## 相关生态

- **ComfyUI-MochiWrapper** — 第三方 ComfyUI 集成，支持 SDPA 注意力
- **ComfyUI-MochiEdit** — 视频编辑节点（物体插入、风格重绘）
- **mochi-xdit** — xDiT 并行推理加速 fork

## 与其他视频生成模型对比

与 [[ai-game-devtools/hunyuan-video]]（腾讯 13B+ 参数，需 ~60GB VRAM）、[[ai-game-devtools/cogvideox]]（智谱 2B/5B，最低 3.6GB INT8）、[[ai-game-devtools/ltx-video]]（Lightricks 2B/13B，支持 4K/50FPS）相比，Mochi 1 是首个 10B 级别开源视频扩散模型，以 Apache 2.0 宽松许可发布，但显存需求较高，社区已推出 ComfyUI 优化方案。

## 参考

- GitHub: https://github.com/genmoai/models
- HuggingFace: https://huggingface.co/genmo/mochi-1-preview
- 博客: https://www.genmo.ai/blog
- 演示: https://www.genmo.ai/play
