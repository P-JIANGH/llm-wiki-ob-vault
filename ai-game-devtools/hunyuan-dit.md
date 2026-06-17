---
title: Hunyuan-DiT
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, framework]
sources: [raw/articles/ai-game-devtools/hunyuan-dit.md]
---

# Hunyuan-DiT

腾讯混元开源文本到图像生成模型，基于 Diffusion Transformer (DiT) 架构，支持中英文双语细粒度理解。

## 概述

Hunyuan-DiT 是腾讯混元团队开源的文本到图像扩散模型，采用潜在空间中的 DiT 架构。模型使用双文本编码器（双语 CLIP + 多语言 T5）实现中英文双语理解，结合 DialogGen（7B 多模态大语言模型）实现多轮对话式图像生成与编辑。

## 核心架构

- **模型类型**：Latent Diffusion + Diffusion Transformer
- **参数量**：1.5B（DiT 骨干）+ 1.6B mT5 + 350M CLIP + 83M VAE
- **VAE**：SDXL VAE (sdxl-vae-fp16-fix) 压缩图像到潜在空间
- **文本编码**：双语 CLIP（中英文）+ 多语言 T5 编码器
- **位置编码**：专为多分辨率设计的自定义编码方案
- **提示增强**：DialogGen MLLM（7B），支持多轮对话优化提示

## 版本历史

| 版本 | 发布日期 | 改进 |
|------|---------|------|
| v1.0 | 2024-05 | 初始发布，1.5B 参数 |
| v1.1 | 2024-06-13 | 缓解过饱和与水印问题 |
| v1.2 | 2024-07-08 | 质量进一步提升，当前最新版本 |

## 性能对比

在 50+ 专业评估人员的整体人类评估中：
- **整体评分 59.0%**：开源模型中超越 SDXL (42.7%)、PixArt-α (45.5%)、Playground 2.5 (54.3%)
- **文本一致性 74.2%**：超越多数开源模型
- **排除 AI 瑕疵 74.3%**：优于多数竞品

## 技术特性

1. **多分辨率支持**：不局限于固定分辨率，支持多种图像尺寸
2. **蒸馏加速**：50% 推理加速（Distillation v1.2）
3. **TensorRT 加速**：47% 推理加速
4. **6GB VRAM 推理**：lite 版本使用 bitsandbytes 量化，可在消费级 GPU 上运行
5. **LoRA 微调**：支持风格定制（青花瓷、玉器等示例）
6. **ControlNet**：支持 Canny/Depth/Pose 三种条件控制
7. **IP-Adapter**：支持图像参考生成

## 生态系统

- **ComfyUI**：标准化工作流，支持 v1.1/v1.2 模型、LoRA、ControlNet
- **Diffusers**：HuggingFace Diffusers 集成（0.28.1+）
- **Kohya_ss**：支持 DreamBooth 微调
- **Gradio**：WebUI 支持多轮 T2I 交互
- **Hunyuan-Captioner**：基于 LLaVA 的图像描述生成工具

## 训练框架

- **全参数训练**：DeepSpeed 分布式训练，最低 20GB GPU 显存
- **LoRA 训练**：Rank-64，~16GB GPU（Kohya）
- **数据管道**：Arrow 格式 + YAML 配置 + IndexKits 大规模数据管理
- **ControlNet 训练**：Canny/Depth/Pose 三种控制器

## 依赖

- PyTorch >= 2.7.1, transformers 4.39.1, diffusers 0.21.2
- DeepSpeed 0.6.3, PEFT 0.10.0, Flash Attention v2
- Gradio 3.50.2, timm, einops, accelerate

## 许可证

Tencent 自有许可条款（详见项目 Notice 文件）

## 相关链接

- GitHub: https://github.com/Tencent/HunyuanDiT
- HuggingFace: https://huggingface.co/Tencent-Hunyuan/HunyuanDiT
- 论文: [arXiv:2405.08748](https://arxiv.org/abs/2405.08748), [arXiv:2403.08857](https://arxiv.org/abs/2403.08857)
- 项目页面: https://dit.hunyuan.tencent.com

## 相关工具

- [[comfyui]] — ComfyUI 官方支持 HunyuanDiT 工作流
- [[controlnet]] — ControlNet 技术，HunyuanDiT 实现了 Canny/Depth/Pose 控制
- [[deepfloyd-if]] — 同为文本到图像扩散模型（级联像素方案）
