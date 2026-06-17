# Video-LLaVA

> Clone date: 2026-04-14
> Source: https://github.com/PKU-YuanGroup/Video-LLaVA (gitcode mirror)
> arXiv: 2311.10122 | EMNLP 2024

## 基本信息

- **全称**: Video-LLaVA: Learning United Visual Representation by Alignment Before Projection
- **团队**: PKU-YuanGroup (Bin Lin, Zhu Bin, Yang Ye, Ning Munan, Peng Jin, Li Yuan)
- **论文**: arXiv:2311.10122 | EMNLP 2024 (meta score 4)
- **许可证**: Apache 2.0
- **GitHub**: https://github.com/PKU-YuanGroup/Video-LLaVA
- **HuggingFace**: LanguageBind/Video-LLaVA-7B-hf

## 核心贡献

### Alignment Before Projection 范式

Video-LLaVA 的核心创新是"对齐后再投影"机制：
- 在投影到 LLM 空间之前，将图像和视频的视觉表示统一对齐到语言特征空间
- 使得同一个 LLM 能同时处理图像和视频，无需图像-视频配对训练数据

### 关键架构

```
视觉编码器 (ImageBind/Vision Encoder)
       ↓
视觉-语言对齐层 (Alignment Before Projection)
       ↓
LLM (Vicuna-7B)
       ↓
VideoLlavaForConditionalGeneration
```

**主要模块**:
- `videollava/model/llava_arch.py` — LLaVA 架构核心
- `videollava/model/multimodal_encoder/` — 视觉编码器
- `videollava/model/multimodal_projector/` — 投影层
- `videollava/model/language_model/` — 语言模型
- `videollava/model/builder.py` — 模型加载
- `videollava/conversation.py` — 对话模板

## 技术规格

- **基础模型**: Vicuna-7B (LLaMA fine-tuned)
- **视觉编码器**: ImageBind (统一多模态编码)
- **训练数据**: 无需图像-视频配对数据
- **依赖**: torch==2.0.1, transformers>=4.31.0, Python>=3.10, CUDA>=11.7
- **LoRA 微调**: 支持 (`scripts/v1_5/finetune_lora.sh`)
- **Transformers 集成**: 2024.05.15 起可通过 `transformers` 库直接加载

## 主要功能

### 推理模式

```python
# Gradio Web UI
python -m videollava.serve.gradio_web_server

# CLI 推理
CUDA_VISIBLE_DEVICES=0 python -m videollava.serve.cli \
  --model-path "LanguageBind/Video-LLaVA-7B" \
  --file "path/to/video.mp4" --load-4bit
```

### API 用法 (Transformers)

```python
from transformers import VideoLlavaProcessor, VideoLlavaForConditionalGeneration

model = VideoLlavaForConditionalGeneration.from_pretrained("LanguageBind/Video-LLaVA-7B-hf")
processor = VideoLlavaProcessor.from_pretrained("LanguageBind/Video-LLaVA-7B-hf")

prompt = "USER: <video>Why is this video funny? ASSISTANT:"
# 均匀采样 8 帧
inputs = processor(text=prompt, videos=clip, return_tensors="pt")
generate_ids = model.generate(**inputs, max_length=80)
```

## 性能表现

### Zero-shot Video QA SOTA

| Benchmark | Video-LLaVA |
|-----------|-------------|
| MSRVTT-QA | SOTA |
| MSVD-QA | SOTA |
| TGIF-QA | SOTA |

### 模态互补性

- 在图像和视频任务上均显著优于专门针对单一模态设计的模型
- 视频和图像的互补学习带来性能提升

## 游戏开发应用

### 游戏视觉理解

- **NPC 行为分析**: 理解游戏录屏中 NPC 的行为模式
- **游戏视频问答**: 对游戏过场动画进行问答分析
- **多模态游戏助手**: 结合视觉+语言理解游戏状态

### 技术集成

- 可通过 Unity ML Agent 集成到游戏引擎
- 支持 `transformers` 库的流式 API 集成到游戏对话系统
- LoRA 微调可针对特定游戏类型定制

## 相关项目

- [LanguageBind](https://github.com/PKU-YuanGroup/LanguageBind) — N模态语言语义对齐框架
- [MoE-LLaVA](https://github.com/PKU-YuanGroup/MoE-LLaVA) — MoE 稀疏多模态模型 (3B 超越 7B)
- [Chat-UniVi](https://github.com/PKU-YuanGroup/Chat-UniVi) — 高效利用有限视觉 token
- [Open-Sora-Plan](https://github.com/PKU-YuanGroup/Open-Sora-Plan) — 开源大视频生成模型
