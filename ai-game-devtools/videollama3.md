---
title: VideoLLaMA 3
created: 2026-04-24
updated: 2026-04-24
type: entity
tags: [vlm, video, vision-language, ai, open-source, tool, multimodal]
sources: [raw/articles/ai-game-devtools/videollama3.md]
---

# VideoLLaMA 3

**VideoLLaMA 3** 是阿里巴巴达摩院 NLP 新加坡团队（DAMO-NLP-SG）开源的前沿多模态基础模型系列，专注于图像与视频理解，在 7B 规模模型中达到 VideoMME 和 LVBench 排行榜第一。

## 概述

VideoLLaMA 3 基于 [[ai-game-devtools/qwen2-5]] 语言模型和 tuned SigLIP-NaViT 视觉编码器构建，采用两阶段训练策略。与 [[ai-game-devtools/videollama2]] 相比，第三代在图像理解能力上大幅增强，同时保持了视频理解的领先性能。

## 模型规格

| 模型 | 基座 | 参数量 | HuggingFace |
|------|------|--------|-------------|
| VideoLLaMA3-7B | Qwen2.5-7B | 7B | DAMO-NLP-SG/VideoLLaMA3-7B |
| VideoLLaMA3-2B | Qwen2.5-1.5B | 2B | DAMO-NLP-SG/VideoLLaMA3-2B |
| VideoLLaMA3-7B-Image | Qwen2.5-7B | 7B | 图像专用版本 |
| VideoLLaMA3-2B-Image | Qwen2.5-1.5B | 2B | 图像专用版本 |

视觉编码器基于 siglip-so400m-patch14-384 微调，HuggingFace 权重：`DAMO-NLP-SG/VL3-SigLIP-NaViT`。

## 核心能力

- **单图理解**：通用场景、图表分析、表格理解、文档识别、视觉代码分析
- **多图对比**：多图像比较与联合理解
- **视觉定位**：细粒度视觉引用（visual referring）与 grounding
- **视频理解**：通用视频、长视频理解、时序定位（temporal grounding）

## 架构特点

- **骨干网络**：Qwen2.5 + SigLIP-NaViT（tuned）
- **注意力机制**：Flash Attention 2 支持
- **训练框架**：两阶段训练（stage1 + stage2），支持 DeepSpeed ZeRO-2/3
- **显存优化**：实验性 Flash Loss（tile-based CrossEntropy）用于长上下文训练
- **推理接口**：原生 HuggingFace `AutoModelForCausalLM` + 自定义 Processor

## 性能表现

- **VideoMME**（截至 2025-01-24）：7B 规模模型排行榜第一
- **LVBench**（截至 2025-01-26）：7B 规模模型排行榜第一

## 安装与使用

```bash
pip install torch==2.4.0 torchvision==0.19.0 --extra-index-url https://download.pytorch.org/whl/cu118
pip install flash-attn==2.7.3 --no-build-isolation
pip install transformers==4.46.3 accelerate==1.0.1
pip install decord ffmpeg-python imageio opencv-python
```

```python
from videollama3 import model_init, mm_infer

model, processor = model_init("DAMO-NLP-SG/VideoLLaMA3-7B")
```

## 与同类工具的差异

| 特性 | VideoLLaMA 3 | [[ai-game-devtools/videollama2]] | [[ai-game-devtools/qwen-vl]] |
|------|-------------|----------------------------------|------------------------------|
| 图像理解 | ✅ 强（图表/文档/代码） | ⚠️ 较弱 | ✅ 强 |
| 视频理解 | ✅ 长视频+时序定位 | ✅ 视频+音频 | ✅ 视频 |
| 视觉定位 | ✅ Referring/Grounding | ❌ | ✅ Grounding |
| 模型规模 | 2B/7B | 7B | 多尺寸 |
| 训练代码 | ✅ 开源 | ✅ 开源 | ⚠️ 部分 |

## 相关链接

- GitHub: https://github.com/DAMO-NLP-SG/VideoLLaMA3
- 论文: arXiv:2501.13106
- HuggingFace: https://huggingface.co/collections/DAMO-NLP-SG/videollama3
- 在线 Demo: https://huggingface.co/spaces/lixin4ever/VideoLLaMA3
- 数据集: VL3-Syn7M（700万高质量图文对）

## 许可证

Apache 2.0（研究预览版，仅限非商业用途）
