# VideoLLaMA 3 — Raw Source

**URL:** https://github.com/DAMO-NLP-SG/VideoLLaMA3
**License:** Apache 2.0
**Date:** 2026-04-15

## README Summary

VideoLLaMA 3 是 DAMO-NLP-SG 团队开发的前沿多模态基础模型，专注于图像和视频理解。

### 核心信息
- **ArXiv:** 2501.13106
- **基座模型:** Qwen2.5-7B / Qwen2.5-1.5B
- **视觉编码器:** SigLIP-SO400M-patch14-384 (NaViT 变长patch)
- **参数量:** 7B / 2B 两种规格

### 模型列表
| Model | Base Model | HuggingFace |
|-------|-----------|-------------|
| VideoLLaMA3-7B | Qwen2.5-7B | DAMO-NLP-SG/VideoLLaMA3-7B |
| VideoLLaMA3-2B | Qwen2.5-1.5B | DAMO-NLP-SG/VideoLLaMA3-2B |
| VideoLLaMA3-7B-Image | Qwen2.5-7B | DAMO-NLP-SG/VideoLLaMA3-7B-Image |
| VideoLLaMA3-2B-Image | Qwen2.5-1.5B | DAMO-NLP-SG/VideoLLaMA3-2B-Image |
| VideoLLaMA3-7B Vision Encoder | siglip-so400m-patch14-384 | DAMO-NLP-SG/VL3-SigLIP-NaViT |

### 技术亮点
- **Flash Attention 2** 加速推理
- **Transformer 4.46.3** + **accelerate** 库
- 两阶段训练：Stage 1 (2B) + Stage 2 (7B)
- 支持 DeepSpeed ZeRO-2/3 分布式训练
- Inf-CL (Contrastive Loss) tile-based 实现降低显存占用
- VL3-Syn7M 重新标注高质量图文数据集

### Benchmark 成绩
- **LVBench:** 2026-01-26 时 7B 模型排名第一
- **VideoMME:** 2026-01-24 时 7B 模型排名第一

### 项目结构
```
videollama3/
├── videollama3/
│   ├── model/
│   │   ├── videollama3_arch.py      # 模型架构
│   │   ├── videollama3_qwen2.py     # Qwen2 LLM 集成
│   │   ├── videollama3_encoder/      # 视觉编码器
│   │   ├── projector.py             # 投影层
│   │   └── processor.py             # 输入处理
│   ├── infer.py                     # 推理入口
│   └── train.py                     # 训练入口
├── inference/
│   ├── example_videollama3.py        # 推理示例
│   ├── notebooks/                   # Jupyter cookbook
│   └── launch_gradio_demo.py        # Gradio Web UI
├── scripts/
│   ├── train/stage1_2b.sh           # Stage 1 训练
│   └── train/stage2_2b.sh           # Stage 2 训练
└── evaluation/                      # Benchmark 评测代码
```

### 依赖
- Python >= 3.10
- PyTorch >= 2.4.0
- CUDA >= 11.8
- transformers >= 4.46.3
- flash-attn == 2.7.3 (CUDA 11.8)
