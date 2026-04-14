# LLaVA-OneVision (LLaVA-NeXT) — 原始源

> 项目地址: https://github.com/LLaVA-VL/LLaVA-NeXT
> 克隆时间: 2026-04-15
> 仓库名: LLaVA-NeXT (项目正式名), LLaVA-OneVision (多图/视频模型名)

## 项目概述

LLaVA-OneVision 是 LLaVA-NeXT 系列中的旗舰多模态模型，支持单图、多图和视频输入，在 47 个 benchmark 上达到或接近 SOTA。另有 LLaVA-NeXT-Image (纯图像)、LLaVA-NeXT-Video (视频)、LLaVA-NeXT-Interleave (多图+视频+3D 统一处理) 等子系列。

## 模型规模

- 0.5B / 7B / 72B 三种参数规模

## 核心架构

- **视觉编码器**: SIGLIP-SO400M (google/siglip-400m-so400m)
- **语言模型**: Qwen-2.0 (Qwen2-0.5B/7B/72B)
- **可训练组件**: Projector (MLP) + 全量语言模型 (后期阶段)
- **图像分辨率**: 最高 2304×2304 像素
- **Token 策略**: `anyres_max_9` 模式下每图最多 729×(9+1) tokens；多图每张 729 tokens；视频每帧 196 tokens

## 训练流程 (3 阶段)

1. **Stage 1**: 558K LCS 数据样本预训练
2. **Stage 1.5**: 4M 高质量详细 caption、OCR、知识数据
3. **Stage 2**:
   - Single-Image: 3.2M 指令跟随图像样本
   - OneVision: 1.6M 单图+多图+视频指令样本

## 关键技术特性

- 零样本视频理解: 仅用图像训练的模型可直接迁移到视频任务
- 多图 + 视频 + 3D 统一框架 (Interleave)
- 支持 SGLang 加速推理和部署
- 支持 lmms-eval 标准化评测框架
- DPO (Direct Preference Optimization) 训练提升视频理解

## 衍生模型

- **LLaVA-Critic-R1** (2025/08): GRPO 训练的 critic VLM family，7B 规模达到 policy SOTA
- **LLaVA-Video-178K** (2024/10): 178K caption + 960K Q&A + 196K 多选题视频指令数据集
- **LLaVA-OneVision-Chat** (2024/09): 改进聊天体验的 7B/72B 对话模型

## 目录结构

```
llava/              # 核心模型代码
  model/            # 模型定义
  serve/            # 服务/推理代码
  train/            # 训练代码
  eval/             # 评测代码
llava-critic-r1/    # LLaVA-Critic-R1 训练代码
scripts/            # 训练脚本
docs/               # 各子模型文档
playground/         # Demo 和可视化
```

## 许可证

遵守各原始模型和数据集的许可证，包括 OpenAI Terms of Use、Llama 社区许可证等。

## 相关链接

- 论文 (OneVision): https://arxiv.org/abs/2408.03326
- 论文 (Video): https://arxiv.org/abs/2410.02713
- 论文 (Interleave): https://arxiv.org/abs/2407.07895
- Demo: https://llava-onevision.lmms-lab.com/
- HF Checkpoints: https://huggingface.co/collections/lmms-lab/llava-onevision-66a259c3526e15166d6bba37
- lmms-eval: https://github.com/EvolvingLMMs-Lab/lmms-eval
