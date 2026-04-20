---
title: Video-ChatGPT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [vlm, multimodal, video, llm, open-source, ai-model]
sources: [raw/articles/ai-game-devtools/video-chatgpt.md]
---

# Video-ChatGPT

**Video-ChatGPT: Towards Detailed Video Understanding via Large Vision and Language Models**

Video-ChatGPT 是由 MBZUAI 开发的视频对话模型，结合了 LLM 的语言能力与预训练视觉编码器对视频时空表征的理解能力。ACL 2024 录用。

## 概述

| 属性 | 值 |
|------|-----|
| **机构** | Mohamed bin Zayed University of AI (MBZUAI) |
| **论文** | [arXiv:2306.05424](https://arxiv.org/abs/2306.05424) |
| **基座 LLM** | Vicuna (LLaMA 指令微调版) |
| **视觉编码器** | CLIP ViT-L/14 @ 224px |
| **MM 投影** | Linear (1024 → LLM hidden size) |
| **训练数据** | VideoInstruct100K (100K 高质量视频指令对) |
| **许可证** | CC BY-NC-SA 4.0 |

## 架构

```
CLIP ViT-L/14（逐帧编码）
         ↓
   时空特征池化
   (temporal mean + spatial mean)
         ↓
   Linear MM Projector
         ↓
   Vicuna LLM（指令微调）
         ↓
   视频对话输出
```

**关键设计**:
- **视频特征提取**: 对每帧提取 CLIP 隐藏层特征，沿时间轴和空间轴分别取均值，拼接后填充至固定长度（最多 100 帧）
- **Token 注入**: 在 prompt 中注入特殊 token（`DEFAULT_VID_START_TOKEN`、`DEFAULT_VIDEO_PATCH_TOKEN`、`DEFAULT_VID_END_TOKEN`），标记视频特征位置
- **Conversation 模板**: 采用 conv_templates 管理多轮对话，支持 `SeparatorStyle.TWO` 格式
- **训练**: 基于 LLaVA 风格训练管线，使用 FlashAttention 加速，DeepSpeed ZeRO-2/3

## 核心文件

| 文件 | 说明 |
|------|------|
| `video_chatgpt/model/video_chatgpt.py` | VideoChatGPTLlamaModel — 扩展 LlamaModel，注入视频特征 |
| `video_chatgpt/inference.py` | 推理管线：特征提取 + 对话模板 + 生成 |
| `video_chatgpt/video_conversation.py` | 对话模板与分隔符样式 |
| `video_chatgpt/train/` | 训练管线（LLaVA-style trainer + FlashAttention monkey-patch） |
| `quantitative_evaluation/` | 5 维度基准评估脚本 |

## 性能

### Zero-Shot 视频问答（SOTA）

| 数据集 | 准确率 |
|--------|--------|
| MSVD-QA | 64.9% |
| MSRVTT-QA | 49.3% |
| TGIF-QA | 51.4% |
| ActivityNet-QA | 35.2% |

### 视频生成性能基准

| 评估维度 | 得分 |
|----------|------|
| 信息正确性 | 2.40 |
| 细节导向 | 2.52 |
| 上下文理解 | 2.62 |
| 时间理解 | 1.98 |
| 一致性 | 2.37 |

在上述两项基准中，Video-ChatGPT 全面优于 Video Chat、Video LLaMA、LLaMA Adapter 等竞品。

## 游戏开发应用

- **NPC 视频对话**: 结合游戏录屏，让 NPC 基于视觉上下文进行对话
- **游戏录屏分析**: 自动分析游戏视频内容（行为识别、场景理解、时序推理）
- **游戏测试**: 利用视频理解能力辅助自动化游戏测试
- **视频指令数据**: VideoInstruct100K 数据集可用于训练定制化的游戏 AI

## 衍生项目

- **Mobile-VideoGPT** (2025-03): 吞吐量提升 2 倍
- **VideoGPT+** (2024-06): 多基准 SOTA
- **VCGBench-Diverse** (2024-06): 4,354 人工标注 QA 对，覆盖 18 类视频

## 相关链接

- GitHub: https://github.com/mbzuai-oryx/Video-ChatGPT
- Paper: https://arxiv.org/abs/2306.05424
- Demo: https://www.ival-mbzuai.com/video-chatgpt
- 数据集: https://huggingface.co/datasets/MBZUAI/VideoInstruct-100K

## 相关项目

- [[ai-game-devtools/llava-plus-plus]] — MBZUAI 开发的 LLaVA++ 视觉语言模型，与 Video-ChatGPT 同属 MBZUAI Oryx 团队
- [[ai-game-devtools/video-llava]] — PKU-YuanGroup 视频+图像统一理解 VLM，同样采用 CLIP + LLM 架构但侧重模态对齐
- [[ai-game-devtools/video-llama-3]] — DAMO-NLP-SG 第三代视频理解 VLM，基于 Qwen2.5 + SigLIP
- [[ai-game-devtools/video-ccam]] — 视频对比学习 VLM，侧重视频-文本对齐

> Video-ChatGPT 是早期视频对话模型的里程碑之一，其 VideoInstruct100K 数据集和量化评估框架为后续 VideoGPT+、VCGBench 等奠定了基础。
