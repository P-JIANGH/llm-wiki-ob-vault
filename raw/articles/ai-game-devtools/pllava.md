# PLLaVA: Parameter-free LLaVA Extension from Images to Videos

> Source: https://github.com/magic-research/PLLaVA

## Project Overview

**PLLaVA** (Pooling LLaVA) is a parameter-free extension of LLaVA (Large Language and Vision Assistant) that adapts image-language pretrained models for video understanding tasks. It addresses the performance saturation issue when directly fine-tuning image-language models with multiple video frames.

**Authors:** Lin Xu, Yilin Zhao, Daquan Zhou, Zhijie Lin, See-Kiong Ng, Jiashi Feng (National University of Singapore)

**arXiv:** [2404.16994](https://arxiv.org/abs/2404.16994)

## Key Innovation: Temporal Pooling Strategy

The core problem: directly fine-tuning image-language models with multiple video frames leads to:
1. Performance saturation on caption-related tasks
2. Vulnerability to prompts
3. Tendency to provide short descriptions

Root cause: **dominant patches** in some single video patches that overwhelm the temporal dimension.

Solution: A simple **pooling strategy along the temporal dimension** that:
- Smooths the feature distribution across time
- Reduces dominant impacts from extreme tokens
- Reduces spatial dimension with larger temporal dimension (empirically better than reducing temporal directly)

## Models Available

| Model | Base | Link |
|-------|------|------|
| PLLaVA-7B | LLaVA-v1.6-Vicuna-7B | [HF: ermu2001/pllava-7b](https://huggingface.co/ermu2001/pllava-7b) |
| PLLaVA-13B | LLaVA-v1.6-Vicuna-13B | [HF: ermu2001/pllava-13b](https://huggingface.co/ermu2001/pllava-13b) |
| PLLaVA-34B | LLaVA-v1.6-34B | [HF: ermu2001/pllava-34b](https://huggingface.co/ermu2001/pllava-34b) |

## Performance

State-of-the-art results on Video ChatGPT benchmark:
- **Score: 3.48/5** (average of 5 dimensions)
- **0.31 higher** than previous SOTA (GPT4V / IG-VLM)

On MVBench (20 sub-tasks):
- **58.1% accuracy** average
- **14.5% higher** than GPT4V (IG-VLM)

Papers with Code badges on: ActivityNet QA, MSRVTT QA, MSVD QA, MVBench, TGIF-QA, and multiple video captioning benchmarks.

## Architecture

Built upon:
- **LLaVA** — image-language pretrained model
- **Videochat2** — video instruction tuning data
- **transformers** — model construction
- **accelerate** — distributed training

Training: LoRA fine-tuning only for projector weights + LoRA weights (no full model fine-tuning).

## Usage

```bash
# Setup
conda create -n pllava python=3.10
pip install -r requirements.txt
python python_scripts/hf.py  # Download model weights

# Run demo
model_dir="MODELS/pllava-7b"
weights_dir="${model_dir}"
bash scripts/demo.sh ${model_dir} ${weights_dir}
```

## Training

Requires VideoChat2 instruction data. Training via Accelerate with configurable distributed training (example: 8 GPUs, bf16 mixed precision, DDP).

## Comparison to Related Work

Unlike [[Video-LLaVA]] which uses unified video-language representation, PLLaVA focuses on efficient adaptation from image models to video without full retraining. The temporal pooling is the key differentiator.

## License

Research use only (based on LLaVA/Vicuna licensing).
