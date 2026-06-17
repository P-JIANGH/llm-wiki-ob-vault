# CSGO: Content-Style Composition in Text-to-Image Generation

> Source: https://github.com/instantX-research/CSGO
> Extracted: 2026-04-17
> Note: GitHub clone timed out, gitcode 403, gitee auth failed — content from web_extract only

## Overview
CSGO is the official PyTorch implementation for advanced text-to-image generation, specializing in **content-style composition**. The framework enables highly controllable image synthesis across multiple driving modalities.

## Core Capabilities
- **Image-driven style transfer** — use a reference image to transfer its style to generated content
- **Text-driven stylized synthesis** — generate stylized images from text prompts
- **Text editing-driven stylized synthesis** — edit text prompts while maintaining style consistency
- **Cycle translation** & advanced content-style composition

## Model Variants
| Mode | Content Tokens | Style Tokens | Configuration Notes |
|:---|:---:|:---:|:---|
| `csgo.bin` | 4 | 16 | Standard release |
| `csgo_4_32.bin` | 4 | 32 | Trained with DeepSpeed Zero2 |
| `csgo_4_32_v2.bin` | 4 | 32 | DeepSpeed Zero2 + enhancements (coming soon) |

## Technical Architecture
- Based on **SDXL 1.0** as base diffusion model
- Uses **IP-Adapter** for image conditioning
- **ControlNet** (TTPLanet_SDXL_Controlnet_Tile_Realistic) for tile-based refinement
- Custom **sdxl-vae-fp16-fix** VAE
- Content and Style token decomposition (4 content + 16/32 style tokens)
- DeepSpeed Zero2 for distributed training

## Repository Structure
```
CSGO/
├── assets/          # Visual examples, pipeline diagrams & demo outputs
├── gradio/          # Gradio Web UI implementation
├── infer/           # Inference scripts & pipelines
├── ip_adapter/      # IP-Adapter integration modules
├── README.md        # Full documentation & setup instructions
└── requirements.txt # Python dependencies
```

## Key Links
- **Paper**: [ArXiv 2404.02733](https://arxiv.org/abs/2404.02733)
- **Project Page**: [csgo-gen.github.io](https://csgo-gen.github.io/)
- **Model Weights**: [Hugging Face - InstantX/CSGO](https://huggingface.co/InstantX/CSGO)
- **Live Demo**: [Hugging Face Space](https://huggingface.co/spaces/xingpng/CSGO/)
- **Source**: [GitHub](https://github.com/instantX-research/CSGO)

## Authors & Affiliations
- **Lead Contributors**: Peng Xing*, Haofan Wang*, Yanpeng Sun, Qixun Wang, Xu Bai, Hao Ai, Renyuan Huang, Zechao Li✉ (*equal contributions, ✉corresponding author)
- **Affiliations**: InstantX Team, Nanjing University of Science and Technology, Xiaohongshu, Beihang University, Peking University
- **Compute Support**: Xiaohongshu

## License
Not explicitly stated in README (check repository LICENSE file).

## Last Active
Commits on 2024/09/04, 2024/09/03, 2024/08/30, 2024/07/15
