---
title: LTX-Video
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, tool, open-source, video, multimodal]
sources:
  - raw/articles/ai-game-devtools/ltx-video.md
---

# LTX-Video

Lightricks 开发的 DiT 架构视频生成模型，首个将现代视频生成能力统一到单一架构的开源方案。

## 核心能力

- **DiT 架构**：基于 Diffusion Transformer，支持文本到视频、图像到视频、多关键帧条件化、关键帧动画、视频前后扩展、视频到视频等混合模式
- **高性能**：单次推理可达 50 FPS，原生支持 4K 分辨率
- **大规模训练数据**：多样化视频数据集训练，生成高保真画面

## 模型变体

| 版本 | 参数量 | 特点 |
|---|---|---|
| ltxv-13b-dev | 13B | 最高质量，需更多显存 |
| ltxv-13b-mix | 13B | 速度/质量平衡，多尺度工作流 |
| ltxv-13b-distilled | 13B | 快速迭代，低显存 |
| ltxv-2b-distilled | 2B | 轻量级，适合低显存/快速生成 |
| ltxv-2b-distilled (0.9.6) | 2B | 实时可用，15× 加速，无需 STG/CFG |
| *-fp8 | 量化版 | 更低显存占用，更快推理 |

## 推理配置建议

| 参数 | 推荐值 |
|---|---|
| 分辨率 | 32 的倍数，建议 <720×1280 |
| 帧数 | 8 的倍数+1（如 257），建议 <257 |
| Guidance Scale | 3.0–3.5 |
| 推理步数 | 40+（质量）/ 20–30（速度） |

## 提示词工程

- 格式：单一段落，按时间顺序，<200 字
- 结构：主要动作 → 动作/手势 → 物体出现 → 环境 → 摄像机角度 → 光线/颜色 → 突发事件
- 支持 `enhance_prompt=True` 自动增强提示词

## 生态系统

- **ComfyUI**：官方集成 ComfyUI-LTXVideo
- **Diffusers**：官方 pipeline 支持 + 8-bit 版本
- **ComfyUI-LTXTricks**：高级节点（RF-Inversion、RF-Edit、FlowEdit、STGuidance 等）
- **LTX-VideoQ8**：8-bit 优化版本，RTX 4060 (8GB) 上 720×480×121 视频 <1 分钟生成
- **TeaCache**：免训练缓存加速，最高 2× 速度提升

## 训练与微调

- **LTX-Video-Trainer**：支持 2B/13B 全量微调 + LoRA（Control/Effect LoRA）
- **IC-LoRA**：深度、姿态、Canny 边缘条件化控制模型
- **Upscaler**：时间/空间超分上采样器

## LTX-2（下一代）

开发已转向 [[ai-game-devtools/ltx-video]] 的下一代 LTX-2：
- 同步音频+视频生成
- 4K 画质 + 50 FPS
- 最长 10 秒带音频视频片段
- 多 GPU 推理栈降低 50% 计算成本
- 3D 摄像机逻辑、IC-LoRA 支持、潜空间上采样

## 技术栈

- Python 3.10.5+、CUDA 12.2、PyTorch ≥2.1.2
- 支持 macOS MPS 后端
- Apache-2.0 开源许可

## 相关链接

- GitHub: https://github.com/Lightricks/LTX-Video
- 文档: https://docs.ltx.video
- LTX-2: https://github.com/Lightricks/LTX-2

## 与同类工具对比

- 相比 [[ai-game-devtools/cogvideox]]（智谱 CogVideoX 系列）：LTX-Video 强调多模式统一（T2V/I2V/V2V/关键帧），CogVideoX 强调 3D Causal VAE 压缩和 INT8 低显存部署
- 相比 [[ai-game-devtools/hunyuan-video]]（腾讯混元视频生成）：混元 13B+ 参数规模更大（~60GB VRAM），LTX-Video 提供 2B 轻量版降低门槛
- 与 [[ai-game-devtools/stable-diffusion]] 相比：LTX-Video 使用 DiT 架构而非 UNet，专用于视频生成，支持更长视频和更高分辨率
