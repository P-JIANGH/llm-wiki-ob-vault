---
title: MoviiGen 1.1
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/moviigen-1-1.md]
---

# MoviiGen 1.1

ZuluVision 团队开发的**电影级视频生成模型**，基于 Wan2.1 微调，在氛围营造、镜头运动和细节保留方面表现优异。

## 概览

- **GitHub:** https://github.com/ZulutionAI/MoviiGen1.1
- **HuggingFace:** https://huggingface.co/ZuluVision/MoviiGen1.1
- **Prompt Rewriter:** https://huggingface.co/ZuluVision/MoviiGen1.1_Prompt_Rewriter
- **许可证:** 需查看 LICENSE.txt（README 未明确声明）
- **发布时间:** 2025 年 5 月（权重 5/12，代码 5/17）

## 核心架构

### 基于 Wan2.1 微调
- **基座模型：** Wan2.1-T2V-14B（14B 参数文生视频 DiT 模型）
- **微调目标：** 电影美学质量提升，在 60 个审美维度上由 11 位专业电影人和 AIGC 创作者评估
- **优势维度：** 氛围营造（+14.6% 清晰度）、镜头运动、主体细节保留（+4.3% 真实感）

### 训练框架（FastVideo）
- **序列并行（Sequence Parallel）：** 自定义实现，将时间维度分配到多 GPU，降低单卡显存需求
- **Ring Attention：** 分布式注意力优化
- **多分辨率训练桶：** 支持多种分辨率混合训练
- **混合精度：** 支持 BF16/FP16
- **分布式：** 多节点多 GPU 训练支持

### Prompt 扩展系统
- 基于 **Qwen2.5-7B-Instruct** 微调的 Prompt Rewriter
- 将简短输入扩展为包含场景描述、主体、事件、美学描述和镜头运动的结构化 prompt
- 推荐 prompt 长度：100-200 tokens

### 推理流程
```
Prompt → T5 文本编码 → 随机噪声 + 条件 → DiT 迭代去噪（UniPC/DPM++） → 3D VAE 解码 → 视频
```

## 技术规格

| 参数 | 值 |
|:---|:---|
| 参数量 | 14B |
| 支持分辨率 | 720P / 1080P |
| 推荐比例 | 21:9 (1920×832) |
| 帧数 | 81 帧（4n+1 格式） |
| 采样步数 | 50（默认） |
| 引导系数 | 5.0 |
| 基础模型 | Wan2.1 |
| 文本编码器 | T5 |
| 采样器 | UniPC / DPM++ |

## 依赖环境

- torch >= 2.4.0, torchvision >= 0.19.0
- diffusers >= 0.31.0, transformers >= 4.49.0
- flash_attn, gradio >= 5.0.0
- xfuser（序列并行支持）
- FastVideo（训练框架依赖）

## 运行方式

- **CLI 推理:** `python scripts/inference/generate.py --ckpt_dir ./MoviiGen1.1 --prompt "..."`
- **带 Prompt 扩展:** 加上 `--use_prompt_extend --prompt_extend_model ZuluVision/MoviiGen1.1_Prompt_Rewriter`
- **Gradio UI:** `gradio/t2v_14B_singleGPU.py`
- **训练:** `bash scripts/train/finetune.sh`

## 在游戏开发中的应用

- **游戏预告片制作** — 输入场景描述生成高质量电影级视频
- **过场动画概念预演** — 快速生成 cinematic 风格场景概念
- **游戏内叙事视频** — 为剧情驱动游戏生成氛围视频
- **营销素材生成** — 社交媒体预告短片

## 与同类工具对比

- 与 [[hunyuan-video]] 相比：HunyuanVideo 13B+ 参数（自研 DiT，综合评测 #1），MoviiGen 1.1 基于 Wan2.1 14B 微调（电影美学优化）；HunyuanVideo 侧重通用视频生成质量，MoviiGen 1.1 侧重电影级美学效果
- 与 [[cogvideox]] 相比：CogVideoX 提供 2B/5B/12B 多尺寸 + 完整微调工具链，MoviiGen 1.1 仅 14B 单尺寸但电影质量更优
- 与 [[ltx-video]] 相比：LTX-Video 支持 T2V/I2V/V2V 多模式 + LoRA 微调，MoviiGen 1.1 专注 T2V 电影质量
- 与 [[longlive]] 相比：LongLive 基于 Wan2.1 实现 240s 实时交互长视频，MoviiGen 1.1 侧重单次生成质量（81 帧）
