---
title: Video-LLaVA
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, video-understanding, image-understanding, llm, multimodal, open-source, pku-yuangroup]
sources: [raw/articles/ai-game-devtools/video-llava.md]
---

# Video-LLaVA

**Video-LLaVA: Learning United Visual Representation by Alignment Before Projection**

Video-LLaVA 是北京大学 PKU-YuanGroup 提出的统一图像和视频理解的视觉-语言大模型（VLM），通过"对齐后再投影"机制，使 LLM 能同时处理图像和视频，无需图像-视频配对训练数据。EMNLP 2024 录用。

## 核心创新

**Alignment Before Projection（对齐后再投影）**：
- 在投影到 LLM 空间之前，先将图像和视频的视觉表示统一对齐到语言特征空间
- 核心洞察：即使没有图像-视频配对数据，视觉表示的联合对齐也能产生跨模态泛化
- 视频与图像之间存在天然互补性，模型能同时从两者学习并相互增强

## 架构

```
ImageBind / Vision Encoder（视觉编码器）
        ↓
   对齐层（Alignment Before Projection）
        ↓
   LLM（Vicuna-7B / LLaMA）
        ↓
VideoLlavaForConditionalGeneration
```

**关键模块**：
- `llava_arch.py` — LLaVA 视觉-语言架构核心
- `multimodal_encoder/` — ImageBind 视觉编码器
- `multimodal_projector/` — 投影层
- `language_model/` — LLM（Vicuna）
- `builder.py` — 模型加载器

**模型规模**: 7B 参数（LLaVA 系列）

## 关键能力

| 能力 | 说明 |
|------|------|
| 图像理解 | 问答、描述、OCR 等 |
| 视频理解 | 视频问答、行为分析 |
| 模态互补 | 图像+视频联合训练，相互增强 |
| LoRA 微调 | 支持 LoRA 高效微调 |
| Gradio Web UI | 交互式演示 |
| CLI 推理 | 命令行批量推理 |
| Transformers | 集成 `transformers` 库 |

## 性能

**Zero-shot Video QA SOTA**（Papers With Code）:
- MSRVTT-QA: SOTA
- MSVD-QA: SOTA
- TGIF-QA: SOTA

在图像和视频任务上均显著超越单一模态专用模型，验证了模态互补学习的有效性。

## 游戏开发应用

### 适用场景
- **游戏视频理解**: 分析游戏录屏、NPC 行为模式识别
- **游戏 AI 助手**: 理解游戏画面并回答玩家问题
- **内容审核**: 游戏视频内容自动分析
- **多模态 NPC**: 结合视觉输入的智能 NPC 对话系统

### 集成方式
- `transformers` 库直接集成（推荐）
- Gradio Web UI 本地部署
- CLI 批量推理管道
- 通过 LoRA 微调针对特定游戏类型定制

## 技术栈

- **框架**: PyTorch 2.0.1, Transformers >= 4.31.0
- **依赖**: ImageBind, FlashAttention, Decord, OpenCV, python-av
- **CUDA**: >= 11.7
- **Python**: >= 3.10
- **可选训练**: DeepSpeed, Weights & Biases

## 相关链接

- 论文: https://arxiv.org/abs/2311.10122
- GitHub: https://github.com/PKU-YuanGroup/Video-LLaVA
- HuggingFace: https://huggingface.co/LanguageBind/Video-LLaVA-7B-hf
- OpenXLab: https://openxlab.org.cn/apps/detail/jiaxicui/Video-LLaVA
- ModelScope: https://modelscope.cn/studios/PKU-YuanLab/Video-LLaVA

## 相关项目

- [[ai-game-devtools/moe-llava]] — MoE-LLaVA: 3B 稀疏模型超越 7B 密集模型
- `ai-game-devtools/languagebind` — LanguageBind: N 模态语言语义对齐（ICLR 2024）
- `ai-game-devtools/chat-univi` — Chat-UniVi: 高效视觉 token 利用
- `ai-game-devtools/minicpm-v` — MiniCPM-V: 高效多模态模型（OpenBMB）

> 同属 PKU-YuanGroup 的多模态 VLM 系列，Video-LLaVA 专注于图像+视频统一理解。
