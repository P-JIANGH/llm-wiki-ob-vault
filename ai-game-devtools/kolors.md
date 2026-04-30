---
title: Kolors
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, open-source, image-generation, diffusion, multimodal]
sources: [raw/articles/ai-game-devtools/kolors.md]
---

# Kolors

快手可图（Kolors）是由快手 Kolors 团队开发的大规模文生图（Text-to-Image）模型，基于潜空间扩散（Latent Diffusion）架构，在数十亿图文对数据上训练，支持中英双语 256 token 上下文生成。

## 概述

Kolors 于 2024 年 7 月开源，在视觉质量、复杂语义理解、中英文字渲染等方面均展现出超越同期开源及闭源模型的性能。在 FlagEval 多模态文生图榜单中获得第二名，中英文主观质量评估第一名。在人类评测中，可图综合满意度（3.59）和视觉吸引力（3.99）均排名第一，超越 Midjourney v6、DALL-E 3、SD3。

## 核心能力

- **中英双语生成**：原生支持中文理解和生成，ChatGLM3 作为文本编码器，深度理解中文语义
- **高质量人像**：精细光影、皮肤质感、服饰细节，适合游戏角色立绘和营销素材
- **中文元素生成**：中国传统文化元素（汉服、建筑、书法、节气等）生成能力强
- **文字渲染**：准确渲染中英文字符，适合生成带文字的宣传图、Logo、UI 素材
- **复杂语义理解**：多主体、多属性、多场景组合构图能力

## 模型与工具全家桶

| 组件 | 说明 |
|:---|:---|
| Kolors 基础模型 | 文本→图像生成，256 token 上下文 |
| IP-Adapter-Plus | 参考图引导生成，风格/构图迁移 |
| IP-Adapter-FaceID-Plus | 人脸身份保持，适合数字分身生成 |
| ControlNet（Canny/Depth/Pose） | 边缘/深度/姿态控制，精确构图控制 |
| Inpainting | 图像修复与局部编辑 |
| Dreambooth-LoRA | 主体定制化微调，游戏角色 LoRA 训练 |

## 技术规格

- **架构**：Latent Diffusion Model（UNet-based）+ ChatGLM3 文本编码器
- **上下文长度**：256 tokens
- **推荐推理参数**：guidance_scale=5.0, num_inference_steps=50（EulerDiscreteScheduler）
- **显存需求**：FP16 ~16GB（基础模型）
- **支持平台**：[[comfyui]]（原生集成）、HuggingFace Diffusers、Gradio WebUI、ModelScope

## 游戏美术应用场景

- 游戏角色立绘和场景原画的 AI 辅助生成
- 游戏 UI 素材（带中文字符的按钮、图标、宣传图）
- 角色换装/虚拟试穿（结合 IP-Adapter-FaceID）
- 场景概念设计的快速迭代（结合 ControlNet-Pose 控制人物姿态）
- 营销素材批量生成（活动海报、直播封面）

## 相关链接

- GitHub: https://github.com/Kwai-Kolors/Kolors
- HuggingFace: https://huggingface.co/Kwai-Kolors/Kolors
- Diffusers: https://huggingface.co/Kwai-Kolors/Kolors-diffusers
- ComfyUI Wrapper: https://github.com/kijai/ComfyUI-KwaiKolorsWrapper
- 官网: https://kolors.kuaishou.com/

## 与同类工具差异

- 与 [[hunyuan-dit]]（腾讯混元 DiT 1.5B）相比：Kolors 规模更大、ChatGLM3 中文编码器更强、中英双语支持更完善、IP-Adapter/ControlNet 生态更丰富
- 与 [[flux]]（Black Forest Labs flow matching）相比：Kolors 使用传统 latent diffusion 架构而非 flow matching，对中文支持更好，与 [[comfyui]] 生态无缝集成
- 与 [[instantid]] 结合使用时，Kolors 作为底座模型提供中文美学生成能力，配合 InstantID 实现人脸身份保持
