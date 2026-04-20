---
title: Vitron
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, vision-llm, image-generation, image-segmentation, video-segmentation, image-editing, video-editing, open-source]
sources: [raw/articles/ai-game-devtools/vitron.md]
---

# Vitron

**Vitron** 是 Skywork AI 与新加坡国立大学（NUS）、南洋理工大学（NTU）联合开发的统一像素级视觉 LLM，发表在 **NeurIPS 2024**。一个模型同时覆盖图像和视频的理解、生成、分割、编辑四大任务。

## 核心能力

| 任务类型 | 具体能力 | 底层模块 |
|---------|---------|---------|
| 图像理解 | 实例级感知与推理 | LLaVA 架构 |
| 图像生成 | 文本/边界框条件生成 | GLIGEN |
| 图像分割 | 全景分割 + 区域级分割 | SEEM |
| 图像编辑 | 区域修复（inpainting） | GLIGEN |
| 视频生成 | 图生视频（I2V） | i2vgen-xl + ZeroScope |
| 视频分割 | 目标跟踪 + 语义分割 | SEEM |
| 视频编辑 | 条件视频编辑 | StableVideo |

## 技术架构

### 模型基座
- **LLM**: Vicuna（LLaMA-2-7B/13B）
- **视觉编码器**: OpenCLIP (ViT-L/14) + LanguageBind（统一图像/视频特征）
- **投影层**: 多模态投影器将视觉特征映射到 LLM 语义空间
- **区域提取器**: 提取细粒度像素级区域特征，用于分割和编辑任务

### 指令微调范式
Vitron 提出 **Invocation-oriented Instruction Tuning**，将视觉任务输出标准化为结构化文本格式：

```
<module>分割模块</module> <instruction>分割指令</instruction>
```

模块标识符统一了 7 种任务（A~G），使 LLM 能精确调用对应的视觉专家模型。

### 核心源码结构
```
vitron/model/
├── language_model/llava_llama.py   # LLaMA 架构 LLM
├── language_model/llava_mpt.py     # MPT 架构 LLM
├── multimodal_encoder/             # OpenCLIP + LanguageBind 编码器
├── multimodal_projector/           # 模态投影层
└── region_extractor/               # 区域特征提取
```

## 依赖的专家模型

| 模块 | 用途 | 来源 |
|-----|------|-----|
| GLIGEN | 图像生成/编辑 | 开源 |
| i2vgen-xl | 图像→视频 | 阿里 VGen |
| SEEM | 分割 | 微软 X-Decoder |
| StableVideo | 视频编辑 | Stability AI |
| ZeroScope | 视频生成 | HuggingFace |

## 与同类工具的差异

- **vs. [[Video-LLaVA]]**: Vitron 不仅做视频理解，还统一了生成、分割、编辑等输出任务；Video-LLaVA 主要侧重理解和对话
- **vs. [[LLaVA-OneVision]]**: LLaVA-OneVision 强调单图多视角，Vitron 强调像素级精确控制（分割+编辑）
- **vs. [[CogVLM2]]**: CogVLM2 主攻图文理解，Vitron 额外覆盖视频和生成任务

## 应用场景

- 游戏美术资产生成（角色/场景/道具）
- 游戏视频内容创作（图生视频、视频编辑）
- NPC 视觉交互（细粒度分割+生成结合）
- 游戏过场动画自动生成

## 部署

```bash
# 安装
git clone https://github.com/SkyworkAI/Vitron
cd Vitron
conda create -n vitron python=3.10 -y
conda activate vitron
pip install -e .
pip install -e ".[train]"
python app.py  # Gradio Demo
```

## 许可证
Apache 2.0（研究预览版，仅限非商业用途）

## 链接

- GitHub: https://github.com/SkyworkAI/Vitron
- 论文: https://is.gd/aGu0VV
- Demo: http://101.200.223.110:18088/
