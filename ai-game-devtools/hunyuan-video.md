---
title: HunyuanVideo
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool, multimodal]
sources: [raw/articles/ai-game-devtools/hunyuan-video.md]
---

# HunyuanVideo

腾讯混元团队开源的 **13B+ 参数视频基础生成模型**，在专业评测中综合排名 #1，运动质量显著领先闭源竞品。

## 概览

- **GitHub:** https://github.com/Tencent/HunyuanVideo
- **论文:** [arXiv:2412.03603](https://arxiv.org/abs/2412.03603)
- **项目主页:** https://aivideo.hunyuan.tencent.com
- **HuggingFace:** https://huggingface.co/Tencent/HunyuanVideo
- **许可证:** Apache 2.0（模型权重需遵循 Hunyuan 社区许可）

## 核心架构

### 双流到单流混合 Transformer
- **双流阶段：** 视频 token 和文本 token 独立处理，学习模态特定的调制。
- **单流阶段：** token 拼接后进行多模态融合，捕获复杂的视觉-语义交互。
- 使用 **Full Attention** 机制，确保长时序建模能力。

### MLLM 文本编码器
- 替代传统 CLIP/T5-XXL，采用 **Decoder-Only 多模态大语言模型**。
- 优势：更好的图文对齐能力、复杂推理、零样本学习。
- 创新：引入**双向 token 精炼器**弥补因果注意力的不足。

### 3D VAE 压缩
- `CausalConv3D` 将像素空间压缩到潜空间。
- 压缩比：长度 4×、空间 8×、通道 16×。
- 支持原始分辨率和帧率的训练。

### Prompt 重写系统
- 基于微调的 Hunyuan-Large，将用户 prompt 转换为模型偏好格式。
- `Normal` 模式（理解增强）和 `Master` 模式（视觉优化）。

## 性能

在 1,533 个 prompt、60+ 专业人员评测中：

| 维度 | HunyuanVideo | 第二名 |
|:---|:---:|:---:|
| 文本对齐 | 61.8% | 62.6% (CNTopA) |
| **运动质量** | **66.5%** | 62.9% (CNTopB) |
| 视觉质量 | 95.7% | 97.7% (CNTopB) |
| **综合排名** | **#1 (41.3%)** | #2 (37.7%) |

## 技术规格

- **参数量：** 13B+
- **支持分辨率：** 540p / 720p，支持 9:16、16:9、4:3、3:4、1:1 多种比例
- **帧数：** 129 帧（约 5 秒 @ 24fps）
- **GPU 显存：** 720p 需 ~60GB，540p 需 ~45GB（单卡）
- **FP8 量化：** 可节省约 10GB 显存
- **多 GPU 并行：** 基于 xDiT 的 USP（统一序列并行），8 卡加速 5.64×

## 推理方式

- **CLI:** `python sample_video.py --prompt "..." --video-size 720 1280`
- **Gradio UI:** `python gradio_server.py`
- **Diffusers 集成:** 支持 HuggingFace Diffusers 管线
- **ComfyUI 集成:** 社区提供 ComfyUI-HunyuanVideoWrapper（支持 FP8/V2V/IP2V）

## 在游戏开发中的应用

HunyuanVideo 可用于游戏开发管线中的：
- **游戏预告片/宣传片自动生成** — 文本描述 → 高质量视频
- **过场动画概念设计** — 快速原型化场景视觉
- **游戏内视频内容** — NPC 对话视频、环境叙事片段
- **资产可视化** — 结合 3D 模型生成动态展示

## 与同类工具对比

- 与 [[ai-game-devtools/cogvideox]]（清华/智谱 CogVideoX）相比：两者都是开源文生视频模型，HunyuanVideo 参数量更大（13B+ vs 2B/5B/12B），在运动质量上表现更优；CogVideoX 提供更完整的微调/量化工具链。
- 与 [[ai-game-devtools/open-sora]]（Open-Sora）相比：HunyuanVideo 是完整的预训练模型，Open-Sora 是复现 Sora 架构的开源项目，两者定位不同。
- 同属腾讯混元家族，与 [[ai-game-devtools/hunyuanvideo-avatar]]（音频驱动角色动画）共享部分技术栈，但面向不同的生成任务。
