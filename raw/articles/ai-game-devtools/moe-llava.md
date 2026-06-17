# MoE-LLaVA

> Source: https://github.com/PKU-YuanGroup/MoE-LLaVA
> Captured: 2026-04-14

## Overview

MoE-LLaVA (Mixture of Experts for Large Vision-Language Models) is a VLM developed by PKU-YuanGroup that applies Mixture-of-Experts architecture to reduce activated parameters while maintaining competitive performance. Published Jan 2024, accepted at IEEE TMM 2025.

## Architecture

- **Base**: Built on LLaVA codebase
- **MoE Tuning Stage**: Simple additional MoE tuning stage; trains on 8×A100 in ~1 day
- **Language model backbones**: Phi-2 (2.7B), Qwen-1.8B, StableLM-1.6B
- **Visual encoder**: CLIP-based (from LLaVA)
- **Top-2 MoE**: Each model ×4 experts, sparse activation

## Key Files

```
moellava/
├── model/
│   ├── builder.py              # Model loading
│   ├── llava_arch.py           # LLaVA architecture
│   ├── language_model/
│   │   ├── llava_llama_moe.py  # MoELLaVALlamaForCausalLM
│   │   ├── llava_phi_moe.py    # MoELLaVAPhiForCausalLM
│   │   ├── llava_qwen_moe.py   # MoELLaVAQWenForCausalLM
│   │   └── llava_stablelm_moe.py
│   ├── multimodal_encoder/     # CLIP vision encoder
│   └── multimodal_projector/   # Vision-language projection
├── serve/
│   ├── gradio_web_server.py    # Web demo
│   └── cli.py                  # CLI inference
├── train/                      # Training scripts
└── predict.py                  # Inference script
```

## Dependencies

- Python 3.10, PyTorch 2.0.1, CUDA >= 11.7
- transformers==4.37.0, tokenizers==0.15.1
- timm==0.6.13, einops==0.6.1
- deepspeed (optional, for training)
- flash-attention (optional, but causes performance degradation)

## Model Variants

| Model | Activated Param | Avg | VQAv2 | GQA | MME | Notes |
|-------|----------------|-----|-------|-----|-----|-------|
| MoE-LLaVA-StableLM-1.6B×4 | 2.0B | 57.3 | 76.7 | 60.3 | 1318 | |
| MoE-LLaVA-Qwen-1.8B×4 | 2.2B | 56.7 | 76.2 | 61.5 | 1292 | |
| MoE-LLaVA-Phi2-2.7B×4 | 3.6B | 61.1 | 77.6 | 61.4 | 1423 | Avg surpasses LLaVA-1.5-7B |
| MoE-LLaVA-Phi2-2.7B×4-384 | 3.6B | 62.9 | 79.9 | 62.6 | 1431 | Best overall |
| LLaVA-1.5-7B (ref) | 7B | 62.0 | 78.5 | 62.0 | 1511 | |

## Key Insight

Uses only **3B sparsely activated parameters** to match LLaVA-1.5-7B performance. The trick: instead of fine-tuning all LLM parameters with MoE, they add a lightweight MoE tuning stage after standard VLM pretraining.

## Related Projects

- [Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA) — extends to video
- [LanguageBind](https://github.com/PKU-YuanGroup/LanguageBind) — multi-modality alignment
- [LLaVA](https://github.com/haotian-liu/LLaVA) — base codebase

## License

Apache 2.0 (research preview, non-commercial use only for LLaMA components)
