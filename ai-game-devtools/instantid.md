---
title: InstantID
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, diffusion, image-generation, python, open-source]
sources: [raw/articles/ai-game-devtools/instantid.md]
---

# InstantID

**InstantID** 是由 InstantX Team（小红书、北京大学）开发的零样本身份保留图像生成方法，仅需单张参考图片即可在数秒内生成保持身份特征的图像，无需任何微调。

## 概述

InstantID 结合了两个核心技术：
- **IdentityNet** — 基于 [[controlnet]] 的控制网络，使用 InsightFace 提取的面部关键点引导扩散模型
- **IP-Adapter** — 身份保留适配器，将面部嵌入特征注入扩散过程

与 LoRA 等需要微调的方法不同，InstantID 是 tuning-free 的：只需一张图片即可保持身份特征，同时保留文本可控性。

## 技术架构

### 核心组件

| 模块 | 功能 |
|------|------|
| IdentityNet (ControlNet) | 面部关键点控制，使用零卷积架构确保小数据集友好 |
| IP-Adapter | 面部嵌入注入，通过自定义注意力处理器将 face_emb 注入 UNet |
| FaceAnalysis (InsightFace) | 面部检测、特征提取、关键点定位 |
| SDXL Pipeline | 基于 diffusers 的 StableDiffusionXL 定制 pipeline |

### 关键文件

- `pipeline_stable_diffusion_xl_instantid.py` — 主 pipeline，已合并入 diffusers 官方库
- `ip_adapter/attention_processor.py` — IP-Adapter 注意力处理器
- `ip_adapter/resampler.py` — 嵌入重采样器
- `gradio_demo/app.py` — Gradio Web UI 演示
- `infer.py` / `infer_full.py` — 推理脚本

### 使用方式

```python
# 加载 IdentityNet + IP-Adapter
controlnet = ControlNetModel.from_pretrained(controlnet_path)
pipe = StableDiffusionXLInstantIDPipeline.from_pretrained(base_model, controlnet=controlnet)
pipe.load_ip_adapter_instantid(face_adapter)

# 生成图像
image = pipe(prompt, image_embeds=face_emb, image=face_kps,
             controlnet_conditioning_scale=0.8, ip_adapter_scale=0.8).images[0]
```

## 特点

- **零样本** — 无需训练，单张图片即可使用
- **风格灵活** — 支持任意风格的身份保留生成（写实、动漫、水彩等）
- **LCM 加速** — 兼容 LCM-LoRA，10 步即可生成
- **CPU Offload** — 支持 `enable_model_cpu_offload()` 降低显存占用
- **Kolors 适配** — 支持 Kwai Kolors 模型，可同时生成身份+文字

## 与同类工具对比

| 工具 | 微调需求 | 图片数量 | 风格可控性 | 速度 |
|------|---------|---------|-----------|------|
| InstantID | ❌ 无需 | 1 张 | ✅ 高（文本控制） | 快 |
| LoRA | ✅ 需要 | 多张 | ✅ 高 | 快 |
| IP-Adapter | ❌ 无需 | 1 张 | ⚠️ 中 | 快 |
| RoOP/FaceSwap | ❌ 无需 | 1 张 | ❌ 低（仅换脸） | 快 |

InstantID 在零样本方法中实现了最高的保真度，同时保留了良好的文本编辑能力。

## 社区集成

- **ComfyUI**: cubiq/ComfyUI_InstantID, ZHO-ZHO-ZHO/ComfyUI-InstantID
- **WebUI**: sd-webui-controlnet 内置支持
- **Replicate**: zsxkib/instant-id 在线演示
- **OneDiff**: 加速推理支持

## 许可证

- 代码: Apache 2.0（学术 + 商业用途）
- InsightFace 模型: 仅限非商业研究
- 检查点: 仅限研究用途

## 相关链接

- [GitHub](https://github.com/InstantID/InstantID)
- [arXiv](https://arxiv.org/abs/2401.07519)
- [HuggingFace Demo](https://huggingface.co/spaces/InstantX/InstantID)
- [ModelScope](https://modelscope.cn/studios/instantx/InstantID)

## 相关项目

- [[controlnet]] — InstantID 的 IdentityNet 基于 ControlNet 架构
- [[ip-adapter]] — IP-Adapter 身份注入技术（InstantID 灵感来源之一）
- [[anytext]] — 同属 Image 分类的 AI 图像生成工具
- [[comfyui]] — 社区集成平台，支持 InstantID
