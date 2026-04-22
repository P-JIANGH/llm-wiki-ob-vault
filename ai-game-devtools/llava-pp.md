---
title: LLaVA++
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [vlm, vision-language, multimodal, open-source, llm, ai]
sources: [raw/articles/ai-game-devtools/llava-pp.md]
---

# LLaVA++

**LLaVA++** 是 MBZUAI Oryx 团队于 2024 年 4 月发布的视觉语言模型扩展项目，将 [[llava-next|LLaVA]] 1.5 的视觉能力与最新的 LLM 骨干网络（Phi-3 Mini 3.8B 和 LLaMA-3 8B）结合，在指令遵循和多模态理解任务上取得显著提升。

## 核心功能

- **双骨干支持**：同时集成 **Phi-3 Mini Instruct 3.8B** 和 **LLaMA-3 Instruct 8B** 作为语言模型后端
- **多种训练策略**：支持预训练、LoRA 微调、全量微调和 S²（Scaling on Scales）微调
- **开放权重**：所有模型变体均在 Hugging Face 开源，包含完整训练脚本
- **即开即用 Demo**：提供 Google Colab、在线 Demo 和 HuggingFace Spaces

## 模型变体

### Phi-3-V 系列
| 模型 | 类型 | 参数 |
|------|------|------|
| LLaVA-Phi-3-mini-4k-instruct-pretrain | 预训练 | 3.8B |
| LLaVA-Phi-3-mini-4k-instruct-lora | LoRA 微调 | 3.8B |
| LLaVA-Phi-3-mini-4k-instruct-FT | 全量微调 | 3.8B |

### LLaMA-3-V 系列
| 模型 | 类型 | 参数 |
|------|------|------|
| LLaVA-Meta-Llama-3-8B-Instruct-pretrain | 预训练 | 8B |
| LLaVA-Meta-Llama-3-8B-Instruct-lora | LoRA 微调 | 8B |
| LLaVA-Meta-Llama-3-8B-Instruct-FT | 全量微调 | 8B |
| LLaVA-Meta-Llama-3-8B-Instruct-FT-S2 | S² 微调 | 8B |

## 技术架构

基于 [[llava-next|LLaVA]] 1.5 架构，关键组件：
- **视觉编码器**：CLIP ViT-L/14 (336px)
- **多模态投影**：MLP2x_GELU
- **语言模型**：Phi-3 Mini Instruct 或 LLaMA-3 8B Instruct
- **训练框架**：DeepSpeed ZeRO-2 + bf16 混合精度 + 梯度检查点

## 与同类工具的差异

| 维度 | LLaVA++ | [[minigpt-4|MiniGPT-4]] | [[llava-onevision|LLaVA-OneVision]] |
|------|---------|------------------------|-----------------------------------|
| 骨干 LLM | Phi-3 / LLaMA-3 | Vicuna | Qwen2 |
| 发布时间 | 2024-04 | 2023-04 | 2024-06 |
| 训练策略 | 预训练+LoRA+全量+S² | 预训练+微调 | 预训练+多阶段微调 |
| 开源完整度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 特色 | 最新 LLM 快速适配 | 早期 VLM 探索 | 统一视觉表示 |

LLaVA++ 的核心价值在于**快速将最新发布的 LLM 集成到视觉语言框架中**，为研究人员提供即插即用的多模态扩展能力。相比 [[llava-onevision|LLaVA-OneVision]] 追求统一架构，LLaVA++ 更侧重于**敏捷适配**和**快速验证新 LLM 的多模态潜力**。

## 关键信息

- **组织**：MBZUAI（穆罕默德·本·扎耶德人工智能大学）
- **许可证**：代码遵循 Apache 2.0（继承自 LLaVA）
- **相关链接**：
  - GitHub: https://github.com/mbzuai-oryx/LLaVA-pp
  - HuggingFace: https://huggingface.co/collections/MBZUAI/llava-662b38b972e3e3e4d8f821bb
  - Colab Demo: https://colab.research.google.com/drive/10Z2HaY5zvy2GZZ4v245PtiDPukm0NbF6
  - 在线 Demo: https://huggingface.co/spaces/MBZUAI/LLaMA-3-V
