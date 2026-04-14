---
title: Kwai Keye-VL
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, video-understanding, llm, open-source]
sources: [raw/articles/ai-game-devtools/kwai-keye-vl.md]
---

# Kwai Keye-VL

快手可灵团队（Kwai Keye Team）开发的多模态大语言模型，专注于视频理解、视觉感知和推理任务。

## Overview

Kwai Keye-VL 是快手可灵视频生成平台的 VLM 底座模型，三个版本：

| 版本 | 发布时间 | 参数 | 特点 |
|------|----------|------|------|
| Keye-VL-8B-Preview | 2025.06 | 8B | 初代发布 |
| Keye-VL-1.5-8B | 2025.08 | 8B | SlowFast Video Encoding，128K context |
| Keye-VL-671B-A37B | 2025.11 | 671B（激活37B） | 最强版本，顶级视频/推理 |

## Architecture

- **Base LLM**: Qwen3-8B
- **Vision Encoder**: SigLIP（开源）
- **SlowFast Video Encoding**: 同时处理高分辨率慢帧 + 低分辨率快帧
- **Native Dynamic Resolution**: 保持原始宽高比，14×14 patch 切分
- **3D RoPE**: 统一处理 text/image/video
- **MLP Layer**: visual token 映射与合并

## Training Strategy (Keye-VL-1.5)

Post-Train 分两阶段：

1. **Non-Reasoning**: SFT + MPO training
2. **Reasoning**: CoT Cold Start（五步构建 + model merging）→ General RL（GSPO + progressive hint sampling）→ Alignment RL

## Key Features

- 三种推理模式：Auto-Thinking / Thinking / Non-Thinking
- 图像 + 视频多模态输入
- 128K token 超长上下文（1.5 版本）
- vLLM 高效部署支持（`pip install keye-vl-utils`）
- ms-swift 训练框架支持

## Deployment

```python
from transformers import AutoModel, AutoProcessor
from keye_vl_utils import process_vision_info

model = AutoModel.from_pretrained("Kwai-Keye/Keye-VL-1.5-8B",
    torch_dtype="auto", device_map="auto", trust_remote_code=True)
processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)

# messages with image/video + text
text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
image_inputs, video_inputs, mm_processor_kwargs = process_vision_info(messages)
inputs = processor(text=[text], images=image_inputs, videos=video_inputs,
                   padding=True, return_tensors="pt", **mm_processor_kwargs)
generated_ids = model.generate(**inputs, max_new_tokens=1024)
```

## Performance

Keye-VL-1.5-8B 在同尺寸模型中达到顶级水平：

- **视频理解**: Video-MME, Video-MMMU, TempCompass, LongVideoBench, MMVU — 显著超越竞品
- **数学/逻辑**: WeMath, MathVerse, LogicVista — 强性能曲线
- **视觉感知**: 顶级水平

## Models

- [Keye-VL-8B-Preview](https://huggingface.co/Kwai-Keye/Keye-VL-8B-Preview)
- [Keye-VL-1.5-8B](https://huggingface.co/Kwai-Keye/Keye-VL-1.5-8B/)
- [Keye-VL-671B-A37B](https://huggingface.co/Kwai-Keye/Keye-VL-671B-A37B/)

## Related

- [[ai-game-devtools/cogvlm2]] — THUDM/ZhipuAI 第二代 VLM，TextVQA/DocVQA SOTA
- [[ai-game-devtools/kangaroo]] — KangarooGroup 8B 长视频理解 VLM
- [[ai-game-devtools/glm-v]] — ZhipuAI 开源 VLM 系列
- [[ai-game-devtools/minigpt-4]] — EAIST VLM，冻结 ViT + Q-Former 架构

## Citation

```bibtex
@misc{kwaikeyeteam2025kwaikeyevl15technical,
  title={Kwai Keye-VL 1.5 Technical Report},
  author={Kwai Keye Team}, year={2025},
  eprint={2509.01563}, archivePrefix={arXiv}, primaryClass={cs.CV},
  url={https://arxiv.org/abs/2509.01563},
}
```
