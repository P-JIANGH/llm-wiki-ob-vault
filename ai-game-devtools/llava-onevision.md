---
title: LLaVA-OneVision
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, open-source, image, video]
sources: [raw/articles/ai-game-devtools/llava-onevision.md]aliases: ["LLaVA-OneVision", "LLaVA OV"]

---

# LLaVA-OneVision

**LLaVA-OneVision** (是 LLaVA-NeXT 项目的一个子系列) 是一个支持单图、多图和视频输入的多模态大模型（VLM），在 47 个 benchmark 上达到或接近 SOTA，有时甚至媲美顶级商业模型（如 GPT-4V、Gemini-Pro）。

## 基本信息

| 属性 | 值 |
|------|-----|
| 视觉编码器 | SIGLIP-SO400M |
| 语言模型 | Qwen-2.0 (0.5B / 7B / 72B) |
| 图像分辨率 | 最高 2304×2304 px |
| 许可证 | 遵循原始模型/数据集许可证 (Llama, Qwen, OpenAI ToU) |
| 机构 | LLaVA-VL Team (KAUST 等) |

## 核心能力

- **单图理解**: 最高 2304×2304 px 输入，anyres_max_9 模式下每图 ~6600 tokens
- **多图理解**: 每张图像固定 729 tokens，支持多图联合推理
- **视频理解**: 每帧 196 tokens，零样本从图像迁移到视频任务（无视频数据训练）
- **多模态统一**: 通过 Interleave 框架统一处理图像+文本+视频+3D

## 训练流程 (3 阶段)

1. **Stage 1**: 558K LCS 数据预训练
2. **Stage 1.5**: 4M 高质量 caption + OCR + 知识数据
3. **Stage 2**: 
   - Single-Image: 3.2M 指令跟随图像样本
   - OneVision: 1.6M 单图+多图+视频指令混合样本

## 衍生模型

- **LLaVA-Critic-R1** (2025): GRPO 训练的 critic VLM family，7B 规模即达 policy SOTA
- **LLaVA-Video-178K** (2024/10): 178K caption + 960K Q&A + 196K 多选题的大规模视频指令数据集；7B/72B 模型
- **LLaVA-OneVision-Chat** (2024/09): 改进对话体验的 7B/72B 版本
- **LLaVA-NeXT-Interleave**: 统一处理多图+视频+3D 的模型子系列

## 与同类工具差异

- ** vs [[MiniGPT-4]]**: MiniGPT-4 仅用 ViT+Q-Former 连接器；LLaVA-OneVision 用 SO400M 视觉编码器 + Qwen-2.0，支持更长上下文和多图/视频
- ** vs [[Cambrian-1]]**: Cambrian-1 仅 576 视觉 tokens（轻量）；LLaVA-OneVision 用 729×N tokens 策略追求更高精度
- ** vs 商业模型**: LLaVA-OneVision 7B/72B 在 47 个 benchmark 上可比 GPT-4V/Gemini-Pro，但开源可本地部署

## 相关链接

- 论文: https://arxiv.org/abs/2408.03326
- Demo: https://llava-onevision.lmms-lab.com/
- HuggingFace: https://huggingface.co/collections/lmms-lab/llava-onevision-66a259c3526e15166d6bba37
- lmms-eval: https://github.com/EvolvingLMMs-Lab/lmms-eval
- SGLang 部署: https://github.com/sgl-project/sglang
