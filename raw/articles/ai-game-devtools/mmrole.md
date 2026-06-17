# MMRole: A Comprehensive Framework for Developing and Evaluating Multimodal Role-Playing Agents

> Source: https://github.com/YanqiDai/MMRole
> Paper: https://arxiv.org/abs/2408.04203
> ICLR 2025

## Project Overview

*MMRole* is a comprehensive framework for developing and evaluating **Multimodal Role-Playing Agents (MRPAs)** — AI agents that emulate specific characters and engage in dialogues centered around images, with either human users or other characters.

## Three Core Components

### 1. MMRole-Data (Dataset)
- **85 characters** from various fiction/media
- **11,032 images** (character-related + MS-COCO)
- **14,346 dialogues** (single and multi-turn)
- **85,456 training samples + 294 test samples**
- Includes character profiles, images, dialogues, formatted instruction-following data
- Also includes reward model training/validation data (23K samples)
- HuggingFace: [MMRole_dataset](https://huggingface.co/datasets/YanqiDai/MMRole_dataset)

### 2. MMRole-Agent (Model)
- Built on **Qwen-VL-Chat** backbone via fine-tuning
- First specialized MRPA developed using MMRole-Data
- Uses DeepSpeed ZeRO-3 for distributed training
- LoRA fine-tuning supported (r=64, alpha=16, dropout=0.05)
- bf16 training, gradient checkpointing, fix ViT encoder
- HuggingFace: [MMRole-Agent](https://huggingface.co/YanqiDai/MMRole-Agent)

### 3. MMRole-Eval (Evaluation)
- **8 metrics across 3 dimensions:**
  - Fundamental conversational skills
  - Multimodal understanding abilities
  - Role-playing qualities
- Uses a trained **reward model** (also based on Qwen-VL-Chat) to score MRPAs
- GPT-4 used to generate evaluation trajectories for reward model training
- HuggingFace: [MMRole-Eval_RM](https://huggingface.co/YanqiDai/MMRole-Eval_RM)

## Technical Architecture

### Training Pipeline
```
Qwen-VL-Chat weights → DeepSpeed ZeRO-3 fine-tuning → MMRole-Agent
Qwen-VL-Chat weights → Reward Model fine-tuning → MMRole-Eval_RM
```

### Key Training Hyperparameters
- Model: Qwen-VL-Chat (fix ViT, train LLM)
- Epochs: 3, Batch: 8 per device × 4 accumulation
- LR: 1e-5, Weight decay: 0.05, Adam β2: 0.95
- Max length: 3072, Cosine scheduler, 1% warmup
- DeepSpeed ZeRO-3 config

### Inference
- System prompt: "You are a dedicated role-playing assistant designed to immerse yourself fully in the character you are portraying."
- Supports both full-model and LoRA inference
- Deterministic mode available (--no_random flag)

## Dependencies
- transformers==4.32.0, accelerate==0.29.3, deepspeed==0.14.2
- peft, tiktoken, einops, scipy, torchvision, pillow
- tensorboard, matplotlib, wandb
- PyTorch 1.12+ (2.0+ recommended), CUDA 11.4+, Python 3.8+

## License
MIT License

## Related Links
- Paper: arXiv:2408.04203
- HuggingFace Dataset: YanqiDai/MMRole_dataset
- HuggingFace Model: YanqiDai/MMRole-Agent
- HuggingFace Reward Model: YanqiDai/MMRole-Eval_RM
- Backbone: Qwen-VL-Chat
