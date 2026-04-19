---
title: Lynx
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, video, diffusion, open-source, tool, multimodal]
sources: [raw/articles/ai-game-devtools/lynx.md]
---

# Lynx

字节跳动智能创作团队提出的**高保真个性化视频生成模型**，基于 Wan2.1-T2V-14B DiT，通过单张输入图像生成保持人物身份一致性的视频。CVPR 2026 接收。

## 概览

- **GitHub:** https://github.com/bytedance/lynx
- **论文:** [arXiv:2509.15496](https://arxiv.org/abs/2509.15496)
- **项目主页:** https://byteaigc.github.io/Lynx/
- **HuggingFace:** https://huggingface.co/ByteDance/lynx
- **许可证:** Apache 2.0

## 核心架构

### Diffusion Transformer 基础
- 基于 **Wan2.1-T2V-14B-Diffusers**（14B 参数文生视频模型）作为基础骨干
- 使用 Flash Attention 2/3 加速推理

### 双适配器设计
- **ID-Adapter（身份适配器）：** 使用 ArcFace（insightface）提取面部嵌入，通过 Resampler 映射到 DiT 潜空间，保持人物身份一致性
- **Ref-Adapter（参考适配器）：** 保留输入图像中的空间纹理和细节信息
- **Full 版本：** ID-Adapter + Ref-Adapter（最佳质量）
- **Lite 版本：** 仅 ID-Adapter，面向高效 24fps/121 帧视频生成

### 面部处理管线
- ArcFace 面部编码器 + onnxruntime-gpu 推理
- 自动面部关键点检测与图像预处理

## 技术规格

| 参数 | Full | Lite |
|:---|:---|:---|
| 基础模型 | Wan2.1-T2V-14B | Wan2.1-T2V-14B |
| 适配器 | ID + Ref | 仅 ID |
| 帧率 | 16 fps | 24 fps |
| 分辨率 | 480×832 | 480×832 |
| 推理步数 | 50 | 50 |

**依赖栈：** PyTorch 2.6.0, Diffusers 0.33.1, Transformers 4.50.2, insightface 0.7.3, OpenCV 4.11.0

## 在游戏开发中的应用

- **NPC 角色动画生成** — 输入角色概念图 → 生成自然动作视频，用于过场动画或宣传素材
- **玩家自定义角色预览** — 上传角色头像 → 生成动态展示视频
- **个性化营销内容** — 游戏角色 IP 的短视频自动生成
- **快速原型化** — 角色设计阶段验证视觉风格和动作表现

## 与同类工具对比

- 与 [[ai-game-devtools/hunyuan-video]]（腾讯混元视频）相比：Lynx 侧重**单图个性化**（输入图像保持身份），HunyuanVideo 侧重**通用文生视频**质量（13B 参数、运动质量排名 #1）；两者基础架构不同（Wan2.1 vs 自研 DiT）。
- 与 [[ai-game-devtools/cogvideox]]（智谱 CogVideoX）相比：Lynx 是图像条件生成（image-to-video），CogVideoX 主要是文本条件生成（text-to-video），且提供更完整的微调工具链。
- 与 [[ai-game-devtools/hunyuanvideo-avatar]]（混元音频驱动角色）相比：Lynx 通过文本 prompt 驱动动作，HunyuanVideo-Avatar 通过音频驱动口型同步。
