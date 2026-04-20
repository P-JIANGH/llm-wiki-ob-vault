---
title: Video-CCAM
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, vlm, video, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/video-ccam.md]
---

# Video-CCAM

腾讯多媒体研究团队开发的视频-语言多模态大模型（Video-MLLM）系列，核心创新为 **Causal Cross-Attention Masks（因果交叉注意力掩码）**，用于提升短视频和长视频的理解能力。

## 核心创新

**因果交叉注意力掩码 (CCAM)** — 通过在视觉-语言融合过程中引入因果结构，抑制无关跨模态噪声，使模型在视频理解任务（时序推理、动作识别、视频问答）上取得显著提升。相比均匀跨注意力，CCAM 让模型更关注时序上前帧对当前帧的影响。

## 模型系列

| 模型 | 语言基座 | Video-MME (96帧) | MVBench (16帧) |
|------|----------|-------------------|-----------------|
| Video-CCAM-4B | Phi-3-mini | 49.6 / 53.0 | 57.78 |
| Video-CCAM-7B | Qwen2.5-7B | — | — |
| Video-CCAM-9B | Phi-3.5-mini | 50.6 / 54.9 | 60.70 |
| Video-CCAM-14B | Phi-3-medium | 53.2 / 57.4 | — |

> 注：分数为 无字幕 / 有字幕

## 技术架构

- **视觉编码器**: Google SigLIP SO400M (patch14-384)，冻结
- **语言模型**: Microsoft Phi-3 系列 / Qwen2.5-7B / Yi-1.5-9B
- **训练框架**: InternLM xtuner
- **推理接口**: Huggingface Transformers，`trust_remote_code=True`
- **精度支持**: bfloat16 + Flash Attention 2

## 评测表现

Video-CCAM 在四大视频理解基准上均达开源 SOTA 水平：

- **Video-MME**（最具挑战性）: 14B 模型有字幕 57.4，超越众多闭源方案
- **MVBench**: 9B 模型 60.70 @ 16帧
- **VideoVista**: 开源 MLLM 中排名第 2-3 位
- **MLVU**: 14B 模型 M-Avg 60.18

## 与同类工具的差异

Video-CCAM 与 [[ai-game-devtools/video-llava]]（统一图像+视频 VLM）、[[ai-game-devtools/video-agent]]（记忆增强视频问答 Agent）不同：CCAM 专注通过因果注意力机制提升原始视频理解精度，而非多 Agent 编排或视频生成。其 14B 有字幕达 57.4 在 Video-MME 上，优于 [[ai-game-devtools/pllava]]（NUS 参数自由视频扩展）的评测策略。此外，Video-CCAM 基于 [[ai-game-devtools/qwen-vl]] 类似的 SigLIP+Qwen/Phi 架构路线，融合更强因果归纳偏置。

## 部署与使用

```python
from transformers import AutoImageProcessor, AutoModel, AutoTokenizer
from eval import load_decord

model = AutoModel.from_pretrained("JaronTHU/Video-CCAM-7B-v1.2",
    torch_dtype=torch.bfloat16, device_map='cuda:0', attn_implementation='flash_attention_2')
tokenizer = AutoTokenizer.from_pretrained(model_path)
image_processor = AutoImageProcessor.from_pretrained(model_path)

messages = `'role': 'user', 'content': '<video>
描述视频内容。'`
images = [load_decord('video.mp4', sample_type='uniform', num_frames=32)]
response = videoccam.chat(messages, images, tokenizer, image_processor, max_new_tokens=512)
```

也提供 Gradio web demo：`python web_demo.py --model_path <path>`

## 相关链接

- GitHub: https://github.com/QQ-MM/Video-CCAM
- arXiv: https://arxiv.org/abs/2408.14023
- HuggingFace: https://huggingface.co/JaronTHU/Video-CCAM-14B
