# Kwai Keye-VL — Raw Source

> Captured from: https://github.com/Kwai-Keye/Keye
> Date: 2026-04-15

## Overview

Kwai Keye-VL 是快手可灵团队（Kwai Keye Team）开发的多模态大语言模型（VLM），支持视频理解、视觉感知和推理任务。

## Versions

- **Keye-VL-671B-A37B** (2025.11.20) — 最强版本，671B 参数（激活 37B），顶级视频理解、图像理解、复杂推理
- **Keye-VL-1.5-8B** (2025.08.28) — Slow-Fast Video Encoding、LongCoT Cold-Start、RL 训练，128K context
- **Keye-VL-8B-Preview** (2025.06.26) — 初代版本

## Architecture

基于 Qwen3-8B 语言模型：
- Vision Encoder: SigLIP (from open-source)
- SlowFast Video Encoding — 同时处理高分辨率慢帧 + 低分辨率快帧
- Native Dynamic Resolution — 保持原始宽高比，14×14 patch 切分
- 3D RoPE — 统一处理 text/image/video
- MLP Layer — visual token 映射与合并

## Training

### Pre-Train
- SlowFast Video Encoding 策略

### Post-Train (Keye-VL-1.5)
1. **Non-Reasoning Stage**: SFT + MPO training
2. **Reasoning Stage**:
   - CoT Cold Start — 五步构建 pipeline + model merging
   - General RL — GSPO + progressive hint sampling
   - Alignment RL — instruction following / format adherence / preference alignment / RAG

## Key Features

- Auto-Thinking Mode / Thinking Mode / Non-Thinking Mode
- 图像 + 视频输入支持
- 128K token 超长上下文（1.5 版本）
- vLLM 高效部署支持
- ms-swift 训练框架支持

## Inference

```python
from transformers import AutoModel, AutoTokenizer, AutoProcessor
from keye_vl_utils import process_vision_info

model = AutoModel.from_pretrained("Kwai-Keye/Keye-VL-1.5-8B", torch_dtype="auto", device_map="auto", trust_remote_code=True)
processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)
# messages with image/video + text
text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
image_inputs, video_inputs, mm_processor_kwargs = process_vision_info(messages)
inputs = processor(text=[text], images=image_inputs, videos=video_inputs, padding=True, return_tensors="pt", **mm_processor_kwargs)
inputs = inputs.to("cuda")
generated_ids = model.generate(**inputs, max_new_tokens=1024)
```

## Evaluation Results (Keye-VL-1.5-8B)

- **Video Understanding**: Video-MME, Video-MMMU, TempCompass, LongVideoBench, MMVU — 显著超越同尺寸竞品
- **Math/Logic**: WeMath, MathVerse, LogicVista — 强性能曲线
- **Perception**: 顶级感知能力

## Tech Reports

- Keye-VL 1.5: arXiv 2509.01563
- Keye-VL v1: arXiv 2507.01949

## Models on HuggingFace

- [Keye-VL-8B-Preview](https://huggingface.co/Kwai-Keye/Keye-VL-8B-Preview)
- [Keye-VL-1.5-8B](https://huggingface.co/Kwai-Keye/Keye-VL-1.5-8B/)
- [Keye-VL-671B-A37B](https://huggingface.co/Kwai-Keye/Keye-VL-671B-A37B/)

## Acknowledgements

Based on SigLIP, Qwen3, Qwen2.5-VL, VLMEvalKit.

## Related

- keye-vl-utils: `pip install keye-vl-utils`
- Deployment: vLLM `>=0.9.2`
