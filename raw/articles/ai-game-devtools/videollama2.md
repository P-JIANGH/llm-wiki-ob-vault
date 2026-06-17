# VideoLLaMA 2 — Source

> GitHub: https://github.com/DAMO-NLP-SG/VideoLLaMA2
> ArXiv: [2406.07476](https://arxiv.org/abs/2406.07476)
> License: Apache 2.0
> Organization: DAMO-NLP-SG ( Alibaba DAMO Academy / Nanyang Technological University)

## Overview

VideoLLaMA 2 is an advanced Video-LLM (Large Language Model) that supports video question answering, video captioning, audio understanding, and audio-visual joint reasoning. It is developed by the DAMO-NLP-SG team (Alibaba DAMO Academy + NTU Singapore).

## Model Architecture

Based on LLaVA 1.5 + FastChat codebase. Key components:

| Component | Detail |
|-----------|--------|
| Visual Encoder | CLIP ViT-L/14-336 (for VideoLLaMA2 series), SigLIP-SO400M-384 (for VideoLLaMA2.1 series) |
| Language Decoder | Mistral-7B-Instruct-v0.2, Mixtral-8x7B-Instruct, Qwen2-7B/72B-Instruct |
| Connector | MLP projector (connecting visual encoder to LLM) |
| Training Frames | 8 frames (base) or 16 frames (16F variants) |
| Audio Encoder | Fine-tuned BEATs_iter3+ (for AV models) |

## Model Series

### Vision-only Checkpoints
- VideoLLaMA2-7B-Base / VideoLLaMA2-7B (CLIP + Mistral-7B, 8 frames)
- VideoLLaMA2-7B-16F-Base / VideoLLaMA2-7B-16F (CLIP + Mistral-7B, 16 frames)
- VideoLLaMA2-8x7B-Base / VideoLLaMA2-8x7B (CLIP + Mixtral-8x7B, 8 frames)
- VideoLLaMA2-72B-Base / VideoLLaMA2-72B (CLIP + Qwen2-72B, 8 frames)
- VideoLLaMA2.1-7B-16F-Base / VideoLLaMA2.1-7B-16F (SigLIP + Qwen2-7B, 16 frames)

### Audio-Visual Checkpoints
- VideoLLaMA2.1-7B-AV (BEATs audio encoder + VideoLLaMA2.1-7B-16F)

## Benchmark Results

Top-ranked on multiple video-LLM benchmarks:
- **MLVU**: Top-1 ~7B-sized VideoLLM (June 2024)
- **VideoMME**: Top-1 ~7B-sized VideoLLM (June 2024)
- **EgoSchema**: SOTA zero-shot performance
- **MVBench**: SOTA multi-choice video QA
- **Video-MME**: SOTA zero-shot video understanding

Supports: Multi-Choice Video QA, Open-Ended Video QA, Video Captioning, Audio QA, Audio-Visual QA

## Key Files

```
videollama2/
├── model/
│   ├── encoder.py           # Visual encoder (CLIP/SigLIP) integration
│   ├── projector.py         # MLP connector between encoder and LLM
│   ├── videollama2_arch.py  # Main model architecture
│   ├── videollama2_llama.py # LLaMA2 variant
│   ├── videollama2_mistral.py # Mistral variant
│   ├── videollama2_mixtral.py # Mixtral MoE variant
│   └── videollama2_qwen2.py  # Qwen2 variant (VideoLLaMA2.1)
├── train.py                 # Training script
├── videollama2_trainer.py   # Custom trainer
├── conversation.py          # Conversation/template handling
├── serve/
│   ├── cli.py               # CLI inference interface
│   ├── controller.py        # Multi-model controller
│   ├── model_worker.py      # Model worker for distributed serving
│   └── gradio_web_server*.py # Gradio web UI
└── scripts/
    ├── vllava/pretrain.sh   # Pretraining script
    ├── vllava/finetune.sh   # Finetuning script
    └── eval/                # Evaluation scripts
```

## Dependencies

transformers==4.40.0, torch==2.2.0, CUDA>=11.8, deepspeed==0.13.1, accelerate==0.26.1, peft==0.4.0, timm==1.0.3, decord, imageio, imageio-ffmpeg, moviepy, opencv-python, gradio==3.50.0

## Usage

```python
from videollama2 import model_init, mm_infer

model, processor, tokenizer = model_init('DAMO-NLP-SG/VideoLLaMA2.1-7B-16F')
output = mm_infer(processor['video']('video.mp4'), 'What animals are in the video?', model=model, tokenizer=tokenizer, do_sample=False, modal='video')
```

## Related Projects

- [VideoLLaMA3](https://github.com/DAMO-NLP-SG/VideoLLaMA3) — Next generation with enhanced image/video performance
- [Video-LLaMA](https://github.com/DAMO-NLP-SG/Video-LLaMA) — Previous version
- [VCD](https://github.com/DAMO-NLP-SG/VCD) — Visual Contrastive Decoding (mitigating hallucinations)
- [CMM](https://github.com/DAMO-NLP-SG/CMM) — Curse of Multi-Modalities evaluation

## Citation

```bibtex
@article{damonlpsg2024videollama2,
  title={VideoLLaMA 2: Advancing Spatial-Temporal Modeling and Audio Understanding in Video-LLMs},
  author={Cheng, Zesen and Leng, Sicong and Zhang, Hang and Xin, Yifei and Li, Xin and Chen, Guanzheng and Zhu, Yongxin and Zhang, Wenqi and Luo, Ziyang and Zhao, Deli and Bing, Lidong},
  journal={arXiv preprint arXiv:2406.07476},
  year={2024}
}
```
