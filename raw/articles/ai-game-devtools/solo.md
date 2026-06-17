# SOLO - Single Transformer Vision-Language Model

> Extracted from: https://github.com/Yangyi-Chen/SOLO
> Date: 2026-04-15

## Project Overview

**SOLO** (A Single Transformer for Scalable Vision-Language Modeling) is a unified VLM architecture that accepts both raw image patches (in pixels) and texts as inputs, without using a separate pre-trained vision encoder.

- **Paper**: arXiv:2407.06438
- **Model**: [SOLO-7B on HuggingFace](https://huggingface.co/YangyiYY/SOLO-7B)
- **License**: Custom (see LICENSE file, ~11357 bytes)

## Architecture

SOLO uses a **single Transformer** architecture (based on Mistral-7B) modified to handle both vision and language modalities:

1. **Base Model**: Mistral-7B-v0.1 as the foundation
2. **Multi-modal Adaptation**: Converts Mistral (LLM) to "MMistral" (multi-modal version called SOLO) by resizing token embeddings and adding multimodal processing capabilities
3. **Training**: Uses Megatron for distributed pre-training, then HuggingFace format for inference

### Pre-training Pipeline

1. Raw data → OpenAI chat completion format (base64-encoded images + text)
2. Convert to Megatron-compatible dataset
3. Model conversion: HF Mistral → MMistral → Megatron format
4. Tensor-parallel sharding (TP=2 recommended for 7B model on 8xA100/H100 80G)
5. Curriculum pre-training with mixed datasets

**Pre-training Data**: 5M+ samples including:
- CC3M (LAION-CC3M image-caption pairs)
- LAION-400M subset
- ImageNet-21K

### Instruction Fine-Tuning

- Uses VLM-SFT dataset from HuggingFace
- SFT config: `config/SFT.yml`
- Output: `data/ckpts/SFT/`

## File Structure

```
solo/
├── README.md              # Main entry point
├── PRETRAIN_GUIDE.md     # Pre-training documentation
├── SFT_GUIDE.md          # Instruction fine-tuning guide
├── environment.yml       # Conda environment spec
├── requirements.txt      # pip dependencies
├── image_utils.py        # Image processing utilities
├── src/                  # Source code
│   ├── data/            # Data processing modules
│   └── scripts/          # Training/inference scripts
├── config/              # Config files
│   └── SFT.yml          # SFT configuration
├── scripts/
│   ├── notebook/demo.ipynb  # Inference demo
│   ├── data/               # Data processing scripts
│   └── sft/run.sh          # SFT training script
├── images/               # README images
└── Megatron-LLM         # Git submodule for Megatron training
```

## Key Dependencies

- **Framework**: Megatron-LLM (distributed training)
- **Base Model**: Mistral-7B-v0.1
- **Format**: HuggingFace for inference, Megatron for training
- **Image Encoding**: Raw pixel patches (no separate vision encoder)

## Citation

```bibtex
@article{chen2024single,
  title={A Single Transformer for Scalable Vision-Language Modeling},
  author={Chen, Yangyi and Wang, Xingyao and Peng, Hao and Ji, Heng},
  journal={arXiv preprint arXiv:2407.06438},
  year={2024}
}
```

## Relevance to AI Game DevTools

SOLO's unified single-transformer approach to VLM is architecturally interesting for game AI scenarios where:
- Real-time image understanding is needed (game state analysis, UI parsing)
- Multimodal game agent training (vision + language + action)
- Resource-constrained deployment on game servers

The approach of not relying on a separate frozen vision encoder means potentially faster training and adaptation to game-specific visual domains.
