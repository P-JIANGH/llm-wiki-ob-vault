# Lumina-mGPT — Raw Source

**Source:** https://github.com/Alpha-VLLM/Lumina-mGPT
**Captured:** 2026-04-17

## README Summary

Lumina-mGPT is a family of multimodal autoregressive models by Alpha-VLLM (Shanghai AI Lab, CUHK, SJTU), capable of various vision and language tasks, particularly excelling in generating flexible photorealistic images from text descriptions.

- **Paper:** arXiv 2408.02657 (2024-08)
- **Based on:** Meta's Chameleon architecture (VQ-VAE + LLM)
- **Core:** xllmx module evolved from LLaMA2-Accessory for LLM-centered multimodal tasks

## Architecture

- Extends Meta's Chameleon (ChameleonForConditionalGeneration from transformers)
- `ChameleonXLLMXForConditionalGeneration` wraps Chameleon with FSDP support, z-loss, mixed-precision training
- Uses VQ-VAE tokenization for image tokens (separate from Chameleon's tokenizer)
- Supports any2any generation: text-to-image, image-to-text, Omni-SFT multi-task

## Key Modules

### lumina_mgpt/ (main implementation)
- `model/modeling_xllmx_chameleon.py` — ChameleonXLLMXForConditionalGeneration (67 lines, thin wrapper)
- `model/chameleon/` — HuggingFace Chameleon adaptation (modeling_chameleon.py 1641 lines)
- `model/chameleon_vae_ori/` — VQ-VAE image tokenizer (image_tokenizer.py, vqgan.py, vocab.py)
- `demos/demo_image_generation.py` — Gradio image generation demo
- `demos/demo_image2image.py` — Gradio Omni-SFT multi-task demo (depth/seg/pose/etc.)
- `demos/demo_freeform.py` — Freeform interactive demo
- `generate_examples/generate.py` — Simple inference script
- `finetune_solver.py` — Fine-tuning data processing
- `pre_tokenize/` — Pre-tokenization and record concatenation

### xllmx/ (multimodal framework)
- `solvers/finetune/finetune.py` — Distributed training loop with FSDP (656 lines)
- `data/` — Dataset, sampler, item processor, conversation templates
- `model/` — Tokenizer, model components
- `util/` — Checkpoint, distributed, LR scheduling, misc utilities

## Model Variants (7B family)

| Model | Resolution | HuggingFace |
|-------|-----------|-------------|
| FP-SFT@512 | 512×512 | Alpha-VLLM/Lumina-mGPT-7B-512 |
| FP-SFT@768 | 768×768 | Alpha-VLLM/Lumina-mGPT-7B-768 |
| Omni-SFT@768 | 768×768 | Alpha-VLLM/Lumina-mGPT-7B-768-Omni |
| FP-SFT@1024 | 1024×1024 | Alpha-VLLM/Lumina-mGPT-7B-1024 |
| FP-SFT@512 | 512×512 (34B) | Alpha-VLLM/Lumina-mGPT-34B-512 |

## Dependencies
- torch 2.3.0, torchvision 0.18.0
- transformers >= 4.43.3
- gradio 4.19.0
- fairscale (FSDP model parallelism)
- bitsandbytes, accelerate
- sentencepiece, einops

## License
LICENSE.txt — Apache 2.0 (based on Chameleon's terms)

## Key Technical Details

- Requires manual download of Meta's Chameleon VQ-VAE weights (tokenizer not in transformers)
- Uses FlexARInferenceSolver for unified generation interface
- Supports CFG (classifier-free guidance) via `create_logits_processor(cfg=4.0, image_top_k=2000)`
- Omni-SFT model handles multiple tasks: depth estimation, segmentation, pose estimation, image generation
- Training uses FSDP with activation checkpointing, mixed precision (BF16)
