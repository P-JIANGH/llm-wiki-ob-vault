---
title: HunyuanVideo-Foley
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, audio, video, multimodal, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/hunyuanvideo-foley.md]
---

# HunyuanVideo-Foley

腾讯混元开源的端到端视频音效（Foley）生成模型，基于多模态扩散与表征对齐架构，为视频内容创作者提供专业级 AI 音效生成能力。适用于短视频创作、影视制作、广告创意和游戏开发。

## 概述

HunyuanVideo-Foley 解决 **TV2A（Text-Video-to-Audio）** 任务：输入视频 + 文本描述，输出与画面精准同步的高质量音效。模型在 MovieGen-Audio-Bench 和 Kling-Audio-Eval 两大评测基准上全面领先所有开源方案。

## 技术架构

### 混合 Transformer 架构
- **多模态 Transformer Block**: 同时处理视觉-音频流，实现跨模态交互
- **单模态 Transformer Block**: 专注音频流精炼
- **视觉编码**: 预训练编码器从视频帧提取视觉特征
- **文本处理**: 预训练文本编码器提取语义特征（SigLIP-2）
- **音频编码**: 自研 48kHz 音频 VAE，完美重建音效/音乐/人声
- **时间对齐**: Synchformer 帧级同步 + 门控调制

### 模型规格

| 模型 | 检查点 | 正常 VRAM | Offload VRAM |
|------|--------|-----------|-------------|
| **XXL**（默认，最佳质量） | hunyuanvideo_foley.pth | 20GB | 12GB |
| **XL**（内存友好） | hunyuanvideo_foley_xl.pth | 16GB | 8GB |

## 性能表现

### MovieGen-Audio-Bench
在所有指标上超越 FoleyGrafter、V-AURA、Frieren、[[ai-game-devtools/mmaudio]]、ThinkSound：
- **PQ**: 6.59（最高）、**CE**: 3.88（最高）、**CU**: 6.13（最高）
- **IB**: 0.35（最高）、**DeSync**: 0.74（最低最优）、**CLAP**: 0.33
- **MOS-Q**: 4.14±0.68、**MOS-S**: 4.12±0.77、**MOS-T**: 4.15±0.75（均为最高）

### Kling-Audio-Eval
- **FD_PANNs**: 6.07（最低最优）、**FD_PASST**: 202.12（最低最优）
- **KL**: 1.89（最低最优）、**IS**: 8.30、**PQ**: 6.12（最高）

## 使用方式

- **CLI 单视频生成**: `python3 infer.py --model_path PATH --single_video VIDEO --single_prompt PROMPT --output_dir OUTPUT`
- **批量处理**: CSV 文件指定视频路径和描述，`--csv_path` 参数
- **Web UI**: `python3 gradio_app.py`（Gradio 交互式界面）
- **ComfyUI 集成**: 社区节点支持 CPU offload + FP8 量化（if-ai/ComfyUI_HunyuanVideoFoley）

## 与同类工具差异

相比 [[ai-game-devtools/foley-crafter]]（基于 Auffusion + ControlNet 时间适配器的视频→音效），HunyuanVideo-Foley 采用更完整的端到端多模态扩散架构，同时处理视觉和文本输入，在同步精度和音质保真度上全面领先。与 [[ai-game-devtools/audioldm-2]] 等纯文本→音频模型不同，它额外利用视频视觉信息实现音画同步。

## 相关链接

- [GitHub](https://github.com/Tencent-Hunyuan/HunyuanVideo-Foley)
- [HuggingFace 模型](https://huggingface.co/tencent/HunyuanVideo-Foley)
- [HuggingFace Demo](https://huggingface.co/spaces/tencent/HunyuanVideo-Foley)
- [arXiv 论文](https://arxiv.org/abs/2508.16930)

## 许可证

Apache-2.0
