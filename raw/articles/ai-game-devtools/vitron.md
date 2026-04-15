# Vitron — AI Game DevTools Source

## 基本信息
- **项目名**: Vitron
- **GitHub**: https://github.com/SkyworkAI/Vitron
- **论文**: NeurIPS 2024
- **机构**: Skywork AI, NUS, NTU
- **许可证**: Apache 2.0（部分代码基于 LLaMA 许可证）

## 概述
Vitron 是一个统一像素级视觉 LLM，同时支持图像和视频的理解、生成、分割、编辑四大任务。

## 核心能力
1. **图像理解** — 实例级感知与推理
2. **图像生成** — 基于 GLIGEN 模块
3. **图像分割** — 基于 SEEM 的全景分割
4. **图像编辑** — 区域级修复
5. **视频生成** — 基于 i2vgen-xl 和 ZeroScope
6. **视频分割** — 视频目标跟踪与分割
7. **视频编辑** — 基于 StableVideo

## 架构

### 模型结构
- **LLM 基座**: Vicuna (LLaMA-2-7B / LLaMA-2-13B)
- **视觉编码器**: OpenCLIP + LanguageBind（图像/视频编码器）
- **投影层**: multimodal_projector
- **区域提取器**: region_extractor

### 核心模块 (modules/)
- `GLIGEN` — 图像生成与编辑
- `i2vgen-xl` — 图像转视频
- `SEEM` — 图像/视频分割
- `StableVideo` — 视频编辑

### 核心源码 (vitron/model/)
- `language_model/llava_llama.py` — LLaMA 架构的 LLM
- `language_model/llava_mpt.py` —MPT 架构的 LLM
- `multimodal_encoder/` — 视觉编码器
- `multimodal_projector/` — 模态投影
- `region_extractor/` — 区域特征提取
- `llava_arch.py` — 统一架构封装

### 训练
- 指令微调方式：Invocation-oriented Instruction Tuning
- 数据集包含 6 大任务模块（A=图像生成，B=图像分割，C=图像编辑，D=视频生成，E=视频分割，F=视频编辑，G=图生视频）
- 支持 LoRA 微调：`scripts/finetune_lora.sh`

### Checkpoint 依赖
- Vitron-base (推理): HuggingFace `Vitron/vitron-base`
- Vitron-lora (推理): HuggingFace `Vitron/vitron-lora`
- 外部: GLIGEN, i2vgen-xl, LanguageBind, OpenCLIP, SEEM, StableVideo, ZeroScope

## 部署
- Gradio Demo: `python app.py`
- 要求: Python 3.8+, PyTorch 2.1.0, CUDA 11.8+

## 相关项目
- [[Video-LLaVA]] — 视频视觉语言模型参考
- [[LanguageBind]] — 多模态编码器
- [[SEEM]] — 全景分割
- [[StableVideo]] — 视频编辑
- [[i2vgen-xl]] — 图生视频
