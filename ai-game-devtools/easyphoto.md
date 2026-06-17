---
title: EasyPhoto — AI Portrait Generator
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, open-source, image, multimodal]
sources: [raw/articles/ai-game-devtools/easyphoto.md]
---

# EasyPhoto

阿里巴巴 PAI 团队开发的 Stable Diffusion WebUI 插件，用于 AI 人像生成和数字分身训练。用户只需上传 5-20 张个人照片，即可训练专属 Face LoRA，然后通过预设模板或自定义模板生成高质量个人写真。

## 概述

- **GitHub:** [aigc-apps/sd-webui-EasyPhoto](https://github.com/aigc-apps/sd-webui-EasyPhoto)
- **许可证:** Apache 2.0
- **论文:** arXiv 2310.04672
- **Demo:** Hugging Face Spaces / ModelScope
- **独立版:** [aigc-apps/EasyPhoto (Diffusers Edition)](https://github.com/aigc-apps/EasyPhoto)

## 核心架构

### 两阶段扩散生成管线

1. **第一阶段扩散:** 人脸检测 → 面部融合 → ControlNet 修复（Canny + OpenPose 双条件）→ SD + LoRA 生成
2. **第二阶段扩散:** 更高分辨率重新生成，进一步提升画质

### 训练流程

- 输入 5-20 张人像照片（建议半身照，部分不戴眼镜）
- 显著性检测 + 磨皮模型获取干净面部训练图像
- Kohya-style LoRA 微调（默认 800 步，LR=1e-4，Rank=128）
- 训练期间实时模板验证 + Face ID Gap 计算确保 LoRA 融合质量

## 技术特点

| 特性 | 说明 |
|------|------|
| 多人生成 | 可配置 num_of_faceid > 1，支持多人模板 |
| LCM-LoRA 加速 | 12 步采样替代默认 50 步，大幅加速 |
| 虚拟试衣 | Concepts-Sliders 属性编辑 + TryOn 模块 |
| 视频生成 | 无需额外训练即可进行 Text2Video / Img2Video |
| SDXL 支持 | 高分辨率模板生成，需 16GB 显存 |
| 相似度评分 | 生成图像与用户原始照片的 Face ID 相似度计算 |

## 关键模块

```
scripts/
├── easyphoto_train.py        # LoRA 训练管线
├── easyphoto_infer.py        # 两阶段推理管线
├── easyphoto_tryon_infer.py  # 虚拟试衣推理
├── easyphoto_ui.py           # Gradio WebUI（训练/推理标签页）
├── easyphoto_config.py       # 配置管理
├── preprocess.py             # 图像预处理（人脸检测/显著性/磨皮）
├── api.py                    # REST API
├── easyphoto_utils/          # 面部处理/试衣/LoRA-CTL 工具
│   └── animatediff/          # AnimateDiff 视频生成集成
└── train_kohya/              # Kohya 风格训练模块（含 DDPO）
```

## 部署选项

- **阿里云 DSW:** 免费 GPU 额度，3 分钟内启动
- **AutoDL / 兰芮 AI:** 社区镜像，5 分钟内启动
- **Docker:** 官方镜像，一键部署
- **本地安装:** 作为 WebUI 扩展通过 Git URL 安装

## 依赖关系

- 必须安装 [[sd-webui-controlnet]]（需配置 Multi ControlNet ≥ 3）
- 依赖 ModelScope 模型（insightface 人脸检测、显著性检测、磨皮模型）
- 基于 [[AUTOMATIC1111/stable-diffusion-webui]] 插件生态

## 与同类工具对比

- vs [[comfyui]]：EasyPhoto 是专用人像生成插件，ComfyUI 是通用模块化扩散管线引擎
- vs [[controlnet]]：EasyPhoto 在 ControlNet 基础上增加了 LoRA 训练 + 两阶段生成 + 模板推理的完整工作流
- 与 ModelScope FaceChain 同源（阿里巴巴 PAI 团队），但 EasyPhoto 更聚焦 WebUI 插件形态
