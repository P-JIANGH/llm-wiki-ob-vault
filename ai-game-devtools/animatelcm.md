---
title: AnimateLCM
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [animation, video, diffusion, ai-model, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/animatelcm.md]
---

# AnimateLCM

**AnimateLCM** (Animate Latent Consistency Model) 是由 CUHK-MMLab 团队（Fu-Yun Wang 等）开发的**计算高效个性化风格视频生成框架**，arXiv 2402.00769。核心创新：将扩散模型动画生成从 25-50 步推理加速至 **1-8 步（通常 4 步）**，质量媲美全步生成。

## 三种模型

| 模型 | 基础 | 用途 | 推理步数 | 特点 |
|------|------|------|----------|------|
| **AnimateLCM-T2V** | SD15 + LoRA + Motion Module | 文本到视频 | 4-8 步 | 兼容 Dreamshaper-LCM 等社区个性化模型，支持 IP-Adapter/ControlNet 零样本接入 |
| **AnimateLCM-SVD** | Stable Video Diffusion (SVD-xt/1.1) | 图像到视频 | 1-8 步 | 25帧高分辨率输出，双 CFG 控制（CFG_min/CFG_max），训练脚本已开源 |
| **AnimateLCM-I2V** | SD15 + 图像编码器 | 图像到视频 | 2-4 步 | 无需教师模型直接训练，motion scale 参数控制动画幅度（0.0=静止，0.8=默认） |

## 核心技术

### 解耦学习范式 (Decoupled Learning)
1. **先学图像生成先验** — 在空间维度训练 LCM-LoRA，掌握单帧生成能力
2. **再学时序生成先验** — 冻结空间权重，仅训练 Motion Module 学习时间动态
3. 大幅降低训练效率，避免时空联合优化的梯度冲突

### 一致性模型 (Consistency Model)
- 将多步扩散过程蒸馏为一步/少步映射
- 通过一致性损失函数训练，使得模型在任意时间步的输出趋于一致
- 推理时从任意步长采样均可得到合理结果

### SVD Pipeline 架构
- 自定义 `StableVideoDiffusionPipeline`（711 行，基于 diffusers）
- 组件：VAE (AutoencoderKLTemporalDecoder) + CLIP Vision 编码器 + UNetSpatioTemporalConditionModel + EulerDiscreteScheduler
- 支持 `decode_chunk_size` 分块解码控制内存消耗

## 关键参数建议

- **T2V**: 4 步可用，6-8 步质量更好；CFG=1.5 + 负向提示词最优；16 帧（训练长度）
- **SVD**: 1-4 步可用；CFG_min=1, CFG_max=1~1.5；其余参数遵循原版 SVD
- **I2V**: 2-4 步；CFG=1（无需 CFG）；motion_scale=0.8（可调至更大幅动作但可能生成失败）

## 生态集成

- **ComfyUI**: 有社区节点支持 ([ComfyUI-AnimateLCM](https://github.com/dezi-ai/ComfyUI-AnimateLCM))
- **HuggingFace**: 官方 Gradio Demo 托管，HF 团队提供 GPU 支持
- **Civitai**: 模型权重和快速生成教程
- **视频教程**: [YouTube Tutorial](https://www.youtube.com/watch?v=HxlZHsd6xAk)

## 与同类工具对比

| 工具 | 步数 | 用途 | 特点 |
|------|------|------|------|
| **AnimateLCM** | 1-8 步 | 个性化视频生成 | 解耦训练，速度极快，支持 SD 生态插件 |
| [[ai-game-devtools/animatediff]] | 20-50 步 | 通用文本到视频 | Motion Module 可插入任意 SD 模型，但速度慢 |
| [[ai-game-devtools/stable-video-diffusion]] | 25 步 | 图像到视频 | Stability AI 官方 I2V 模型，AnimateLCM-SVD 基于此加速 |
| [[ai-game-devtools/animatediff-lcm]] | 4-8 步 | 快速文本到视频 | AnimateDiff + LCM 结合方案 |

## 技术栈
- Python 3.9 / PyTorch 2.2.0 / diffusers 0.25.1
- Gradio 4.19.2 Web UI
- xformers 加速
- Safetensors 模型格式

## 许可证
**MIT License** — 完全开源商用友好

## 相关链接
- GitHub: https://github.com/G-U-N/AnimateLCM
- arXiv: https://arxiv.org/abs/2402.00769
- Project Page: https://animatelcm.github.io/
- HuggingFace: https://huggingface.co/wangfuyun/AnimateLCM
- Civitai: https://civitai.com/models/290375
