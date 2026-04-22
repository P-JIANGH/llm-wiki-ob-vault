# LLaVA++: Extending Visual Capabilities with LLaMA-3 and Phi-3

**Source:** https://github.com/mbzuai-oryx/LLaVA-pp  
**Authors:** Hanoona Rasheed, Muhammad Maaz, Salman Khan, Fahad Khan (MBZUAI)  
**Date Accessed:** 2026-04-23

## Overview

LLaVA++ enhances the LLaVA 1.5 visual-language model by integrating latest LLM backbones: **Phi-3 Mini Instruct 3.8B** and **LLaMA-3 Instruct 8B**. Released in April 2024 by MBZUAI's Oryx team.

## Key Features

- **Dual Backbone Support**: Integrates both Phi-3 Mini (3.8B) and LLaMA-3 (8B) as language backbones for LLaVA 1.5
- **Multiple Training Strategies**: Supports pretraining, LoRA fine-tuning, full fine-tuning, and S² (Scaling on Scales) fine-tuning
- **Strong Benchmark Performance**: Competitive results on instruction-following LMM benchmarks and academic vision-language tasks
- **Open Weights**: All model variants released on Hugging Face with training scripts

## Model Zoo

### Phi-3-V Variants
| Model | Type | HF Link |
|-------|------|---------|
| LLaVA-Phi-3-mini-4k-instruct-pretrain | Pretrained | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-pretrain |
| LLaVA-Phi-3-mini-4k-instruct-lora | LoRA | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-lora |
| LLaVA-Phi-3-mini-4k-instruct | Merged LoRA | MBZUAI/LLaVA-Phi-3-mini-4k-instruct |
| LLaVA-Phi-3-mini-4k-instruct-FT | Full Fine-tune | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-FT |

### LLaMA-3-V Variants
| Model | Type | HF Link |
|-------|------|---------|
| LLaVA-Meta-Llama-3-8B-Instruct-pretrain | Pretrained | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-pretrain |
| LLaVA-Meta-Llama-3-8B-Instruct-lora | LoRA | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-lora |
| LLaVA-Meta-Llama-3-8B-Instruct | Merged | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct |
| LLaVA-Meta-Llama-3-8B-Instruct-FT | Full Fine-tune | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT |
| LLaVA-Meta-Llama-3-8B-Instruct-FT-S2 | S² Fine-tune | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT-S2 |

## Architecture

Based on LLaVA 1.5 architecture with modifications:
- **Vision Encoder**: CLIP ViT-L/14 (openai/clip-vit-large-patch14-336)
- **Projection**: MLP2x_GELU multimodal projector
- **Language Model**: Phi-3 Mini Instruct or LLaMA-3 8B Instruct
- **Training**: DeepSpeed ZeRO-2, gradient checkpointing, bf16 mixed precision

## Key Code Files

- `Phi-3-V/llava_phi3.py`: Phi-3 language model integration with LLaVA architecture
- `LLaMA-3-V/llava_llama.py`: LLaMA-3 language model integration
- `scripts/Phi3-V_pretrain.sh`: Pretraining script (558K image-text pairs, 1 epoch, lr=1e-3)
- `scripts/Phi3-V_finetune_lora.sh`: LoRA fine-tuning script (665K instruction data)

## Installation

```bash
git clone https://github.com/mbzuai-oryx/LLaVA-pp.git
cd LLaVA-pp
git submodule update --init --recursive
pip install git+https://github.com/huggingface/transformers@a98c41798cf6ed99e1ff17e3792d6e06a2ff2ff3
```

## License

Code follows LLaVA's original license (Apache 2.0). Model weights available on Hugging Face.

## Citation

```bibtex
@misc{hanoona2024LLaVA++,
  title={LLaVA++: Extending Visual Capabilities with LLaMA-3 and Phi-3},
  author={Rasheed, Hanoona and Maaz, Muhammad and Khan, Salman and Khan, Fahad S.},
  url={https://github.com/mbzuai-oryx/LLaVA-pp},
  year={2024}
}
```
